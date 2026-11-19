/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(326, function () {
return [
function (k) {
if (WMW_MB[k])
return WMW_MB[k];
if (typeof HX_MB !== "undefined" && HX_MB[k])
return HX_MB[k];
if (typeof FG_MB !== "undefined" && FG_MB[k])
return FG_MB[k];
try {
if (typeof gwKind === "function") {
var c = gwKind(k);
if (c)
return { kind: k, name: c.n, icon: c.e || "", buys: c.b || 1, price: null };
}
}
catch (e) { }
return { kind: k, name: k, icon: "", buys: 1, price: null };
},
function (w) {
if (w === "party")
return typeof PP !== "undefined" ? PP.spots : null;
if (w === "battle")
return typeof BW !== "undefined" ? BW.talk : null;
if (w === "greenwold")
return typeof GW !== "undefined" ? GW.spots : null;
if (w === "lounge")
return typeof LL !== "undefined" ? LL.spots : null;
if (w === "family")
return typeof FL !== "undefined" ? FL.spots : null;
return null;
},
function (S) {
if (WMW.busy)
return;
if (!wmwSigned()) {
wmwSay("Sign in to gather: what you find is kept against your account, in your backpack's stock.");
return;
}
var now = Date.now(), until = +WMW.picked[S.id] || 0;
if (until > now && !wmwKeeper()) {
wmwSay("<b>" + esc(S.name) + ".</b> You have had what there is here for now. Worth another look in " + Math.ceil((until - now) / 60000) + " minutes.");
return;
}
WMW.busy = true;
wmwSay("<b>" + esc(S.name) + "</b>: you " + esc(S.verb) + "…");
wmwTone(330, 0.1);
setTimeout(function () { wmwTone(392, 0.1); }, 600);
setTimeout(function () {
var L = wmwL();
if (Math.hypot(L.x - S.x, L.z - S.z) > 5) {
WMW.busy = false;
wmwSay("You moved off before you were done.");
return;
}
wmwGive(S.id, S.regrow, function () { if (S.g)
S.g.scale.setScalar(0.85); });
}, 1400);
},
function (id, regrow, ok, no) {
if (!wmwSigned()) {
WMW.busy = false;
wmwSay("Sign in, and what you find is kept in your backpack.");
if (no)
no();
return;
}
wmwRpc("craft_gather", { p_spot: id }).then(function (o) {
WMW.busy = false;
if (o && o.ok) {
WMW.picked[id] = Date.now() + (+o.regrow || regrow || 20) * 60000;
wmwSave();
WMW.stockAt = 0;
var M = wmwMat(o.kind), more = o.kind === "wmw_lostbag" ? " Hand it in at the Lost Property tent by the first-aid tent: the festival pays a finder's fee." : " It is in your backpack's stock: sell it at a stall here or to the city, or use it.";
wmwSay("<b>" + (M.icon || "") + " +" + (+o.got || 1) + " " + esc(M.name) + "</b>." + more);
wmwTone(523, 0.12);
setTimeout(function () { wmwTone(659, 0.14); }, 120);
if (ok)
ok(o);
}
else {
if (o && o.wait) {
WMW.picked[id] = Date.now() + o.wait * 60000;
wmwSave();
}
wmwSay(esc((o && o.say) || "Nothing came of it."));
if (no)
no(o);
}
}).catch(function (e) { WMW.busy = false; wmwSay(wmwMissing(e) ? "Gathering here opens soon." : esc((e && e.message) || String(e))); if (no)
no(e); });
},
function (id, msg) {
var T = WMW_STALLS[id];
if (!T)
return;
var draw = function () {
var h = wmwTitle(esc(T.name)) + "<div style='opacity:.85;margin:4px 0 8px'>" + esc(T.say) + "</div>", fns = {};
if (msg)
h += "<div style='margin:6px 0;color:#CFE8C0'>" + msg + "</div>";
if (!wmwSigned())
h += "<div style='margin:6px 0;color:#E8C8A0'>Sign in to trade: gold and stock are kept against your account.</div>";
var sells = T.sells.filter(function (k) { return wmwMat(k).price != null; });
if (sells.length) {
h += wmwHead("For sale");
sells.forEach(function (k) {
var M = wmwMat(k), p = M.price;
h += worldBtn("b1_" + k, (M.icon || "") + " " + esc(M.name) + " · " + (wmwKeeper() ? "free to you" : p + " gold"), "Buy one · you have " + wmwHave(k));
h += worldBtn("b5_" + k, "Buy five · " + (wmwKeeper() ? "free" : (p * 5) + " gold"), null);
fns["b1_" + k] = function () { wmwBuy(id, k, 1); };
fns["b5_" + k] = function () { wmwBuy(id, k, 5); };
});
}
var buys = T.buys.filter(function (k) { return wmwHave(k) > 0; });
h += wmwHead(id === "jb_lost" ? "Hand in, for a finder's fee" : "They buy");
if (!buys.length)
h += "<div style='opacity:.75'>" + esc(T.buys.map(function (k) { return wmwMat(k).name.toLowerCase(); }).join(", ")) + ". You have none of those with you yet" + (wmwSigned() ? "" : " (or you are signed out)") + ".</div>";
buys.forEach(function (k) {
var M = wmwMat(k), n = wmwHave(k), p = wmwSellPrice(k);
h += worldBtn("s1_" + k, (id === "jb_lost" ? "Hand in one · " : "Sell one " + esc(M.name.toLowerCase()) + " · ") + p + " gold", "You have " + n);
if (n > 1) {
h += worldBtn("sa_" + k, (id === "jb_lost" ? "Hand in all " : "Sell all ") + n + " · " + (p * n) + " gold", null);
fns["sa_" + k] = function () { wmwSell(id, k, n); };
}
fns["s1_" + k] = function () { wmwSell(id, k, 1); };
});
if (WMW_STALL_JOB[id]) {
h += worldBtn("job", "📋 Work here", "The stall takes on staff, in real shifts");
fns.job = function () { worldCard(null); wmwHire(id); };
}
h += "<div style='opacity:.6;font-size:12px;margin-top:8px'>What you buy and sell is your stock: 🎒 Backpack, Materials.</div>";
worldCard(h, fns);
};
draw();
wmwStock(true).then(function () { if (WLD.card && WLD.card.style.display === "block")
draw(); });
},
function (id, k, n) {
if (!wmwSigned())
return wmwStall(id, "Sign in first.");
wmwRpc("craft_buy", { p_kind: k, p_amount: n }).then(function (o) { WMW.stockAt = 0; wmwStock(true).then(function () { wmwStall(id, esc((o && o.say) || "Done.")); }); if (typeof refreshStanding === "function")
try {
refreshStanding();
}
catch (e) { } })
.catch(function (e) { wmwStall(id, esc(wmwMissing(e) ? "The stall opens soon." : ((e && e.message) || String(e)))); });
},
function (id, k, n) {
if (!wmwSigned())
return wmwStall(id, "Sign in first.");
wmwRpc("sell_stock", { p_kind: k, p_amount: n }).then(function (o) {
WMW.stockAt = 0;
var said = o === "ok" ? (id === "jb_lost" ? "Handed in: " + n + " item" + (n > 1 ? "s" : "") + ", logged for their owners. The finder's fee is " + (wmwSellPrice(k) * n) + " gold." : "Sold: " + n + " " + wmwMat(k).name.toLowerCase() + ", for " + (wmwSellPrice(k) * n) + " gold.") : String(o || "Not now.");
wmwStock(true).then(function () { wmwStall(id, esc(said)); });
if (typeof refreshStanding === "function")
try {
refreshStanding();
}
catch (e) { }
})
.catch(function (e) { wmwStall(id, esc((e && e.message) || String(e))); });
},
function (w, x, z, name) {
worldCard(null);
if (w === "lounge" && typeof LL !== "undefined") {
LL.guide = { x: x, z: z, name: name };
}
else if (w === "family" && typeof FL !== "undefined") {
FL.guide = { x: x, z: z, name: name };
}
else
WMW.guide = { w: w, x: x, z: z, name: name };
wmwSay("<b>" + esc(name) + "</b>: follow the arrow on the banner at the top.");
},
function () {
var G = WMW.guide;
if (!G || G.w !== wmwWorld())
return "";
var L = wmwL(), dx = G.x - L.x, dz = G.z - L.z, d = Math.hypot(dx, dz);
if (d < 5) {
WMW.guide = null;
wmwSay("<b>" + esc(G.name) + ".</b> You are here.");
return "";
}
var arrow = "➜";
try {
if (typeof bearingOf === "function" && typeof pfindArrow === "function")
arrow = pfindArrow(bearingOf(dx, dz));
}
catch (e) { }
return "<div>" + arrow + " <b>" + esc(G.name) + "</b> · " + (d < 1000 ? Math.round(d) + " m" : (d / 1000).toFixed(1) + " km") + "</div>";
},
function (l) {
var S = WMW.les, C = WMW_COURSES[l.course], all = wmwLList(l.course);
if (S.cur !== l.k) {
S.cur = l.k;
S.ans = {};
S.msg = "";
S.t0 = Date.now();
if (wmwSigned())
wmwRpc("school_begin", { p_course: l.course, p_unit: l.n }).catch(function () { });
}
var fns = {}, b = "";
b += "<div style='opacity:.7;font-size:12px'>Lesson " + l.n + " of " + all.length + " · " + esc(C.title) + " · the Department of Education" + (wmwLDone(l) ? " · ✓ stamped" : "") + "</div>";
b += "<div style='margin:6px 0'><b>What is true.</b> " + esc(l.real) + "</div><div style='margin:6px 0'><b>How it works.</b> " + esc(l.science) + "</div>";
b += "<div style='margin:6px 0'><b>A word from here: " + esc(l.word[0]) + "</b>, " + esc(l.word[1]) + "</div>";
b += "<div style='margin:6px 0'><b>Try it.</b> " + esc(l.tryit) + "</div>";
b += "<div style='margin:10px 0 4px'><b>Two questions</b> for your stamp</div>";
l.quiz.forEach(function (q, k) {
b += "<div style='margin:6px 0 2px'>" + (k + 1) + ". " + esc(q[0]) + "</div>";
wmwLOpt(l, k).forEach(function (o, j) {
var on = S.ans[k] === o, nm = "q" + k + "_" + j;
b += "<div role='button' data-w='" + nm + "' style='margin:3px 0;padding:5px 9px;border-radius:4px;border:1px solid " + (on ? (o === q[1] ? "#7AD08A" : "#E07A6A") : "rgba(143,180,232,.4)") + ";background:" + (on ? (o === q[1] ? "rgba(122,208,138,.15)" : "rgba(224,122,106,.15)") : "transparent") + "'>" + esc(o) + (on ? (o === q[1] ? " ✓" : " ✗") : "") + "</div>";
fns[nm] = function () { S.ans[k] = o; wmwLCheck(l); wmwLesson(l); };
});
});
if (S.msg)
b += "<div style='margin-top:8px;color:#FFE7B0'>" + S.msg + "</div>";
b += worldBtn("all", "🎓 Every lesson in this course", "your record: " + wmwLCount(l.course) + " of " + all.length + " stamped");
fns.all = function () { wmwCourse(l.course); };
worldCard(wmwTitle("🎓 " + esc(l.title), "#BFD8FF") + b, fns);
},
function (l) {
if (wmwLDone(l))
return;
if (!l.quiz.every(function (q, k) { return WMW.les.ans[k] === q[1]; }))
return;
var L = wmwLog(l.course);
L[l.n] = new Date().toISOString();
if (typeof save === "function")
try {
save();
}
catch (e) { }
var C = WMW_COURSES[l.course], n = wmwLCount(l.course), all = wmwLList(l.course).length;
WMW.les.msg = "🎓 Stamped: " + esc(l.title) + ". " + n + " of " + all + "." + (n === all ? " <b>" + esc(C.cert) + "!</b> The course is on your report card." : "");
wmwSay("<b>" + esc(C.short) + " stamp</b> (" + n + " of " + all + ")." + (n === all ? " <b>" + esc(C.cert) + ".</b>" : ""));
if (wmwSigned()) {
var wait = Math.max(0, 21000 - (Date.now() - WMW.les.t0));
setTimeout(function () { wmwRpc("school_pass", { p_course: l.course, p_unit: l.n }).catch(function () { }); }, wait);
}
},
function (course) {
var C = WMW_COURSES[course], fns = {}, here = wmwWorld();
var h = "<div style='opacity:.85'>Taught where it happens, in " + esc(C.where) + ". Get both questions right at each lesson for a stamp; all of them make you <b>" + esc(C.cert) + "</b>. " + wmwLCount(course) + " stamped so far.</div>";
wmwLList(course).forEach(function (l) {
var nm = "l-" + l.k;
h += worldBtn(nm, (wmwLDone(l) ? "🎓 " : "○ ") + l.n + ". " + esc(l.title), here === l.w ? "tap to be shown the way" : "in " + esc(WMW_WORLDS[l.w]));
fns[nm] = function () {
if (here !== l.w) {
wmwLesson(l);
return;
}
if (l.w === "family" && wmwFamSide(l.x) !== wmwFamSide(wmwL().x)) {
wmwSay("<b>" + esc(l.title) + "</b> is taught at " + (l.x > 500 ? "Hearthside Family House" : "the Everbloom Wedding House") + ": it has its own door in Somnucor.");
worldCard(null);
return;
}
wmwGuideTo(l.w, l.x, l.z, l.title);
};
});
worldCard(wmwTitle(esc(C.title), "#BFD8FF") + h, fns);
},
function (G, w, l) {
var y = wmwGround(w, l.x, l.z), g = new THREE.Group();
g.position.set(l.x, y, l.z);
G.add(g);
var wood = wM(0x5A3E26);
wBox(0.5, 1.05, 0.4, wood, 0, 0.52, 0, g);
var top = wBox(0.7, 0.06, 0.5, wood, 0, 1.1, 0, g);
top.rotation.x = -0.35;
wBox(0.5, 0.02, 0.36, wM(0xE8E0CC), 0, 1.14, 0.02, g).rotation.x = -0.35;
var s = wSign(["🎓 " + l.title, "World Learning · press E"], 1.6, 0.5, "#1E2A3A", "#E8E0C8");
s.position.set(0, 1.75, 0);
g.add(s);
wmwSolid(w, { x: l.x, z: l.z, r: 0.4 });
wmwAddSpot(w, { x: l.x, z: l.z + 0.1, r: 2.4, name: "🎓 " + l.title + (wmwLDone(l) ? " (stamped)" : ""), verb: "take the lesson", fn: function () { wmwLesson(l); } });
},
function () {
var w = wmwWorld();
if (!w)
return;
var h = wmwTitle("Things to do in " + esc(WMW_WORLDS[w])), fns = {}, n = 0;
function head(t) { h += wmwHead(t); }
function go(label, sub, fn) { var k = "h" + (n++); h += worldBtn(k, label, sub); fns[k] = fn; }
function way(name, x, z) { return function () { wmwGuideTo(w, x, z, name); }; }
function hire(key) { return function () { worldCard(null); if (typeof ahOpen === "function")
ahOpen(key); }; }
function sw(key) { return function () { worldCard(null); if (typeof showTheWay === "function")
showTheWay(key); }; }
function note(t) { h += "<div style='opacity:.75;margin:4px 0'>" + t + "</div>"; }
var L = wmwL();
head("Work · real shifts, paid like any post in the city");
if (w === "battle") {
WMW_WORK.forEach(function (r) {
var jobs = WMW_JOBS.filter(function (j) { return j[3] === r[0]; }).map(function (j) { return j[2]; });
go("📋 " + esc(r[0]), esc(jobs.join(", ")), hire(r[0]));
});
note("Ironfray's posts are for dreamers aged 18 and over who pay their dues, like every post in the city.");
}
else {
var keys = w === "party" ? ["Jubilee Starport", "The Glowworm Club", "The Echo Lounge", "Jubilee Festival Grounds", "Jubilee Beach Club", "Confetti & Co."] :
w === "greenwold" ? [typeof GW_KEY !== "undefined" ? GW_KEY : "The Greenwold Gate"] : w === "lounge" ? [typeof LL_KEY !== "undefined" ? LL_KEY : "GiGi's Lounge"] :
[typeof FL_WED !== "undefined" ? FL_WED : "The Everbloom Wedding House", typeof FL_FAM !== "undefined" ? FL_FAM : "Hearthside Family House"];
keys.forEach(function (k) {
var mine = WMW_JOBS.filter(function (j) { return j[3] === k; }).map(function (j) { return j[2]; });
go("📋 Hiring at " + esc(k), mine.length ? "Among the posts: " + esc(mine.join(", ")) : "See who is taking on staff", hire(k));
});
}
head("Trade · buy, and sell what you find");
Object.keys(WMW_STALLS).forEach(function (k) {
var T = WMW_STALLS[k];
if (T.world !== w)
return;
var sub = (T.sells.length ? "Sells " + T.sells.map(function (s) { return wmwMat(s).name.toLowerCase(); }).join(", ") + "; " : "") + "buys " + T.buys.slice(0, 5).map(function (s) { return wmwMat(s).name.toLowerCase(); }).join(", ") + (T.buys.length > 5 ? " and more" : "");
if (w === "family" && wmwFamSide(L.x) !== "wed")
go("🛒 " + esc(T.name), esc(sub) + " · at the Everbloom Wedding House", function () { worldCard(null); wmwSay("The Flower Cart is in the Everbloom Garden, at the Everbloom Wedding House: it has its own door in Somnucor."); });
else
go("🛒 " + esc(T.name), esc(sub), way(T.name, T.x, T.z));
});
if (w === "party") {
go("🛍️ The merch tent", "Shirts, posters and keepsakes, at the Festival Grounds", way("The merch tent", -112, -48));
go("🎈 Confetti & Co.", "The party shop: costumes, balloons and gifts", sw("Confetti & Co."));
}
if (w === "battle") {
go("⚒️ The War Forge's counter", "Ore, coal, timber, cloth, leather, crystal and emberstone", way("The War Forge", 29.4, 0));
go("🗡️ The Armoury", "Every weapon, free to take", way("The Armoury", -22, -27.5));
}
if (w === "greenwold")
go("🧺 The Harvest Hall", "The market counter buys your harvest; the Seed Library sells seed", way("The Harvest Hall", 0, 92));
if (w === "lounge") {
go("🎁 The Treasure Box", "Gifts to buy, and your prizes", function () { worldCard(null); if (typeof llShowWay === "function")
llShowWay("treasure"); });
go("🌹 The florist", "A buttonhole or a posy, in the Conservatory", way("The florist", 74.4, 51));
}
if (w === "family") {
go("💍 The Ring Counter", "Engagement rings and wedding bands", function () { worldCard(null); if (typeof flShowWay === "function")
flShowWay("rings"); });
go("👗 The Bridal Boutique", "Bouquets, buttonholes and keepsakes", function () { worldCard(null); if (typeof flShowWay === "function")
flShowWay("boutique"); });
}
head("Gather · into your stock");
var seen = {};
WMW_SPOTS.forEach(function (s) {
if (s[1] !== w || seen[s[8]])
return;
seen[s[8]] = 1;
var M = wmwMat(s[2]);
go((M.icon || "") + " " + esc(s[8]), esc(M.name), way(s[8], s[3], s[4]));
});
if (w === "battle") {
var nearest = null, nd = 1e9;
((typeof FG !== "undefined" && FG.spots) || []).forEach(function (S) { var d = Math.hypot(S.x - L.x, S.z - L.z); if (d < nd) {
nd = d;
nearest = S;
} });
go("⛏️ Ore, coal, emberstone, crystal, timber and war scrap", "On the eight fields, beyond the Truce Ground" + (nearest ? " · the nearest is " + Math.round(nd) + " m away" : ""), nearest ? way(typeof fgSpotName === "function" ? fgSpotName(nearest.kind) : "The nearest finding-spot", nearest.x, nearest.z) : function () { wmwSay("The finding-spots are out on the eight fields, past the palisade."); });
note("Beasts and machines beaten in the fields drop hides and scrap too. The Salvage Yard buys them.");
}
if (w === "greenwold")
go("🍎 Pick what is ripe", "Crops in their real season, all over the Greenwold", function () { if (typeof gwRipeCard === "function")
gwRipeCard();
else
wmwSay("Walk the gardens: anything ripe can be picked with E."); });
head("Play");
Object.keys(WMW_GAMES).forEach(function (k) {
var Gm = WMW_GAMES[k];
if (Gm.world !== w)
return;
if (w === "family" && wmwFamSide(L.x) !== "wed")
go("🏆 " + esc(Gm.name), "In the Everbloom Garden, at the Everbloom Wedding House", function () { worldCard(null); wmwSay("The Bouquet Challenge is in the Everbloom Garden, at the Everbloom Wedding House."); });
else
go("🏆 " + esc(Gm.name), "A daily prize for a good result (dues-payers)" + (wmwBest(k) ? " · your best " + wmwBest(k) : ""), way(Gm.name, Gm.x, Gm.z));
});
if (w === "party") {
go("🎯 The carnival games", "Ring toss, hook-a-duck, the high striker, balloon darts", way("The carnival games", -96, 54));
go("🎳 The Echo Lounge", "Bowling, karaoke, darts, pool and the arcade", sw("The Echo Lounge"));
go("🎡 The Ferris wheel and the carousel", "At the Festival Grounds", way("The Ferris wheel", -125, 110));
go("🏐 Beach volleyball", "At the Beach Club", way("Beach volleyball", 279, -202));
}
if (w === "battle") {
go("🏟️ The Trials of the Bowl", "Twelve waves, from goblins to a hill giant, in the Crimson Bowl", way("The Crimson Bowl", 185, 185));
go("⚔️ The eight battlefields", "Pick a banner at the War Herald, then go out", way("The War Herald", 0, -21));
}
if (w === "lounge") {
[["bingo", "🎱 Bingo", "In the Bingo Hall: the house game runs whenever nobody is hosting"], ["mahjong", "🀄 Mahjong", "At the tables of the Mahjong Parlour"], ["cards", "🃏 Solitaire, FreeCell, chess and cards", "In the Card Salon"], ["crown", "🏆 The tournaments", "In the Crown Room"]].forEach(function (q) {
go(q[1], q[2], function () { worldCard(null); if (typeof llShowWay === "function")
llShowWay(q[0]); });
});
}
head("Learn · World Learning, the Department of Education");
Object.keys(WMW_COURSES).forEach(function (c) {
var ls = wmwLList(c);
if (!ls.length || ls[0].w !== w)
return;
go("🎓 " + esc(WMW_COURSES[c].title), wmwLCount(c) + " of " + ls.length + " stamped · tap for every lesson and the way", function () { wmwCourse(c); });
});
if (w === "greenwold")
go("🎓 World Learning: Growing", "Sixteen lessons where things grow", function () { if (typeof gwCourseCard === "function")
gwCourseCard(); });
head("Stay");
if (WMW_HOMES[w]) {
var Hm = WMW_HOMES[w], f = Hm.lots[0];
go("🏠 " + esc(Hm.quarter), (Hm.price ? "For sale or to let" : "To let by the week") + " at the Land Office in Somnucor", way(Hm.quarter, f[1], f[2]));
}
else if (w === "greenwold")
go("🏡 Orchard Lane", "Farm cottages, bought and let at the Land Office", way("Orchard Lane", 198, 194));
else if (w === "lounge")
note("GiGi's House is GiGi's own. To rest here, take a table among the roses in the Conservatory.");
else
note("Families live in their own homes in Somnucor; children placed from Hearthside go home with their carers.");
if (w === "battle") {
head("Make your own");
go("⚒️ The War Forge", "Weapons and armour, made by you", way("The War Forge", 29.4, 0));
go("🔧 The Mechanic at the Motor Pool", "Build your own war machine", way("The Mechanic", 0, 24.5));
}
worldCard(h, fns);
},
function (look) {
var g = new THREE.Group(), R = wRand((look.length * 7919) ^ 4321);
function rnd(a, b) { return a + (b - a) * R(); }
if ((look === "shells" || look === "drift") && typeof hxProp === "function") {
try {
return hxProp(look);
}
catch (e) { }
}
if (look === "glass") {
var cols = [0x8AC8B8, 0x6AA88A, 0xA8D0E0, 0xC8DCC8, 0x8A9AC8];
for (var i = 0; i < 9; i++) {
var m = new THREE.MeshPhongMaterial({ color: cols[i % 5], shininess: 60, transparent: true, opacity: 0.8 });
var p = wSph(0.07 + R() * 0.05, m, rnd(-0.8, 0.8), 0.03, rnd(-0.8, 0.8), g, 6);
p.scale.set(1.2, 0.45, 0.9);
p.rotation.y = R() * 6;
}
var wr = wBox(1.8, 0.03, 0.25, wM(0x9A8A6A), 0, 0.015, 0.9, g);
wr.rotation.y = 0.3;
}
else if (look === "drift") {
for (var d = 0; d < 3; d++) {
var lg = wCyl(0.14 + d * 0.03, 0.18, 2.4 - d * 0.5, wM(0xA8A090), d * 0.35 - 0.3, 0.15, d * 0.4 - 0.4, g, 7);
lg.rotation.z = Math.PI / 2;
lg.rotation.y = d * 0.7;
}
}
else if (look === "shells") {
for (var s = 0; s < 8; s++) {
var sh = wSph(0.09 + R() * 0.05, wM([0xF2DCC8, 0xE8C0B0, 0xF4E8D8, 0xD8B898][s % 4]), rnd(-0.9, 0.9), 0.03, rnd(-0.9, 0.9), g, 7);
sh.scale.set(1, 0.45, 1.3);
}
}
else if (look === "lost") {
var bag = wBox(0.42, 0.22, 0.3, wM(0x3A5A7A), 0, 0.11, 0, g);
bag.rotation.y = 0.5;
wBox(0.3, 0.04, 0.04, wM(0x2A3A4A), 0.05, 0.24, 0, g).rotation.y = 0.5;
var cap = wSph(0.13, wM(0xC84A5A), 0.45, 0.06, 0.3, g, 8);
cap.scale.set(1, 0.5, 1);
wBox(0.14, 0.01, 0.1, wM(0xC84A5A), 0.55, 0.02, 0.36, g);
var bt = wCyl(0.05, 0.05, 0.24, wM(0x6AA8C8), -0.4, 0.05, 0.25, g, 8);
bt.rotation.z = Math.PI / 2;
}
else
wSph(0.4, wM(0x8A8070), 0, 0.25, 0, g, 7);
return g;
},
function (w, G) {
WMW_SPOTS.forEach(function (s) {
if (s[1] !== w)
return;
var S = { id: s[0], world: w, kind: s[2], x: s[3], z: s[4], regrow: s[7], name: s[8], verb: s[9], look: s[10] };
if (w === "party") {
var g = wmwProp(S.look);
g.position.set(S.x, wmwGround(w, S.x, S.z), S.z);
g.rotation.y = (S.x * 0.37 + S.z * 0.11) % 6.28;
G.add(g);
S.g = g;
}
WMW.spots.push(S);
wmwAddSpot(w, { x: S.x, z: S.z, r: 2.6, name: S.name, verb: S.verb, fn: function () { wmwGather(S); } });
});
},
function (G) {
wmwSpotsBuild("party", G);
var P = new THREE.Group(), hx = 160, hz = -95.4;
var wood = wM(0x8A6A4A), plank = wM(0xA8885E), thatch = wM(0xC8A060), dark = wM(0x5A3E26);
wBox(4.4, 0.2, 3.6, plank, hx, 0.1, hz, P);
wBox(4.2, 2.4, 0.12, wood, hx, 1.3, hz + 1.7, P);
wBox(0.12, 2.4, 3.4, wood, hx - 2.1, 1.3, hz, P);
wBox(0.12, 2.4, 3.4, wood, hx + 2.1, 1.3, hz, P);
wBox(4.2, 1.0, 0.5, dark, hx, 0.6, hz - 1.45, P);
wBox(4.4, 0.08, 0.7, plank, hx, 1.12, hz - 1.45, P);
[-2.05, 2.05].forEach(function (dx) { wCyl(0.1, 0.1, 2.8, wood, hx + dx, 1.5, hz - 1.7, P, 6); });
var roof = wCone(3.6, 1.6, thatch, hx, 3.4, hz, P, 4);
roof.rotation.y = Math.PI / 4;
roof.scale.set(1.15, 1, 1);
[0x8AC8B8, 0xA8D0E0, 0x6AA88A].forEach(function (c, i) { wCyl(0.14, 0.14, 0.32, new THREE.MeshPhongMaterial({ color: c, transparent: true, opacity: 0.75, shininess: 60 }), hx - 1.2 + i * 0.5, 1.32, hz - 1.45, G, 8); });
wCyl(0.28, 0.22, 0.22, wM(0xA8844A), hx + 1.0, 1.27, hz - 1.45, P, 10);
for (var s = 0; s < 5; s++)
wSph(0.06, wM(0xF2DCC8), hx + 0.9 + (s % 3) * 0.1, 1.4, hz - 1.5 + (s > 2 ? 0.1 : 0), P, 6);
for (var sh = 0; sh < 2; sh++) {
wBox(3.6, 0.06, 0.35, plank, hx, 1.3 + sh * 0.6, hz + 1.45, P);
for (var j = 0; j < 6; j++)
wBox(0.2, 0.2, 0.2, wM([0x8AC8B8, 0xC8A060, 0xE8D8C0][j % 3]), hx - 1.5 + j * 0.6, 1.43 + sh * 0.6, hz + 1.45, P);
}
wCyl(0.35, 0.3, 0.5, wM(0x6A4A2A), hx + 2.6, 0.25, hz - 1.2, P, 10);
for (var c = 0; c < 3; c++)
wSph(0.16, wM(0x6A4A2A), hx + 2.5 + c * 0.15, 0.6, hz - 1.2, P, 8);
G.add(wmwBake(P));
wmwSign(G, "party", ["THE BEACHCOMBER'S HUT", "Sea glass · coconuts · what the lagoon brings, bought"], hx, 3.0, hz - 1.9, Math.PI, 3.6, 0.9, "#0E2A3A", "#A8F0FF");
wmwPerson(G, "party", "wmw_marisol", { title: "Beachcomber", sex: "f", look: { top: 0xE8C8A0, bottom: 0x3A6A8A, hat: "brimmed", hatColor: 0xE8D8B0 } }, hx - 0.6, hz - 0.6, Math.PI);
PP.solids.push({ x: hx, z: hz, hw: 2.25, hd: 1.85 }, { x: hx + 2.6, z: hz - 1.2, r: 0.4 });
wmwStallSpot("jb_comber");
if (typeof ppTent === "function")
ppTent(G, -118, -72, 8, 6, 0x4A6A8A, "LOST PROPERTY", "Hand in what you find · finder's fee");
wmwPerson(G, "party", "wmw_lostclerk", { title: "Lost Property clerk" }, -116.6, -71, Math.PI / 2);
var shelf = new THREE.Group();
for (var b = 0; b < 6; b++)
wBox(0.5, 0.35, 0.4, wM([0x3A5A7A, 0xC84A5A, 0x6A8A3A, 0xE8C060, 0x5A3A6A, 0x8A6A4A][b]), -120.8 + (b % 3) * 0.6, 0.2 + Math.floor(b / 3) * 0.4, -74, shelf);
G.add(wmwBake(shelf));
wmwStallSpot("jb_lost");
wmwLecterns("party", G);
wmwHomes("party", WORLDS.party, G, PP.solids);
},
function (G) {
var P = new THREE.Group(), sx = -38.8, sz = -16;
var wood = wM(0x5A4028), iron = wM(0x4A4C50), rust = wM(0x6A4A3A);
wBox(3, 2.6, 4, wood, sx - 1.3, 1.3, sz, P);
wBox(3.4, 0.2, 4.4, wM(0x3A3028), sx - 1.3, 2.7, sz, P);
wBox(0.8, 1.05, 3.6, wM(0x6A5038), sx + 0.9, 0.52, sz, P);
wBox(1, 0.08, 3.8, wM(0x8A6A4A), sx + 0.9, 1.08, sz, P);
wBox(0.5, 0.05, 0.5, iron, sx + 0.9, 1.15, sz - 1.1, P);
wCyl(0.03, 0.03, 0.5, iron, sx + 0.9, 1.4, sz - 1.1, P, 5);
wBox(0.7, 0.03, 0.05, iron, sx + 0.9, 1.65, sz - 1.1, P);
wBox(3, 0.1, 2, wM(0x3A3A3C), sx + 1.2, 0.05, sz + 4.2, P);
[[sx - 1, sz - 4.4, 1.4], [sx + 0.6, sz - 4.8, 1.0]].forEach(function (q, i) { for (var k = 0; k < 4; k++) {
var b2 = wBox(q[2] * (0.6 + k * 0.15), q[2] * 0.4, q[2] * 0.7, k % 2 ? rust : iron, q[0] + k * 0.25, 0.25 + k * 0.2, q[1] + (k % 2) * 0.3, P);
b2.rotation.set(k * 0.4, k * 0.7 + i, k * 0.2);
} });
for (var h = 0; h < 3; h++)
wBox(1.1, 0.6, 0.8, wM(0x7A5A3A), sx - 1.6 + h * 0.1, 0.3 + h * 0.6, sz + 4.3, P);
G.add(wmwBake(P));
var sg = wSign(["The Salvage Yard", "Scrap, hides and ore bought at the city's price"], 3.6, 1.1, "#2A1810", "#F0D8A0");
sg.position.set(sx + 0.9, 3.4, sz);
sg.rotation.y = Math.PI / 2;
G.add(sg);
wmwPerson(G, "battle", "wmw_brannoch", { title: "Salvage master", sex: "m", look: { layer: "apron", layerColor: 0x4A3020, top: 0x5A5A4A, bottom: 0x3A3028, beard: true, hands: "gloves" } }, sx, sz + 0.4, Math.PI / 2);
bwSolid({ x: sx - 1.3, z: sz, hw: 1.6, hd: 2.1, h: 2.8 });
bwSolid({ x: sx + 0.9, z: sz, hw: 0.5, hd: 1.9, h: 1.2 });
bwSolid({ x: sx - 0.5, z: sz - 4.6, r: 1.2, h: 1.5 });
bwSolid({ x: sx - 1.5, z: sz + 4.3, hw: 0.7, hd: 0.5, h: 1.8 });
wmwStallSpot("if_salvage");
var K = new THREE.Group();
wBox(2.2, 0.08, 0.8, wM(0x6A5038), -4.6, 0.8, 4, K);
[-0.95, 0.95].forEach(function (d) { wBox(0.08, 0.8, 0.7, wM(0x5A4028), -4.6 + d, 0.4, 4, K); });
wCyl(0.32, 0.28, 0.4, iron, -5.2, 1.04, 4, K, 10);
for (var l = 0; l < 4; l++)
wCyl(0.11, 0.11, 0.06, wM(0xC8B890), -4.2 + l * 0.22, 0.86, 3.8, K, 8);
G.add(wmwBake(K));
bwSolid({ x: -4.6, z: 4, hw: 1.1, hd: 0.4, h: 1 });
wmwPerson(G, "battle", "wmw_campcook", { title: "Camp cook", look: { layer: "apron", layerColor: 0xD8D0C0 } }, -4.6, 4.9, Math.PI);
wmwPerson(G, "battle", "wmw_fieldmedic", { title: "Field medic", look: { top: 0x4A5A3A, bottom: 0x4A5A3A } }, 25.5, -25.2, 0.3);
[-5, 5].forEach(function (dx, i) { wmwPerson(G, "battle", "wmw_sentry" + i, { title: "Sentry", look: { layer: "armor", layerColor: 0x6A6A6A, hat: "helmet", hatColor: 0x5A5A5A } }, dx, 37.6, Math.PI); });
wmwLecterns("battle", G);
var sol = [];
wmwHomes("battle", WORLDS.battle, G, sol);
sol.forEach(function (o) { bwSolid(o); });
},
function (G) {
var P = new THREE.Group(), cx = -250, cz = -44, len = 24, wid = 8;
var soil = wM(0x5A3E28), soil2 = wM(0x4A3020), stub = wM(0xB8A870);
for (var r = 0; r < 8; r++) {
var z = cz - wid / 2 + 0.5 + r * 1.0, done = r < 5;
for (var s = 0; s < 4; s++) {
var x = cx - len / 2 + 3 + s * 6, y = gwHeight(x, z);
var b = wBox(6.05, done ? 0.22 : 0.06, done ? 0.55 : 0.9, done ? (r % 2 ? soil : soil2) : stub, x, y + (done ? 0.1 : 0.03), z, P);
b.rotation.z = Math.atan2(gwHeight(x + 3, z) - gwHeight(x - 3, z), 6);
}
}
[[cx - len / 2, cz - wid / 2], [cx - len / 2, cz + wid / 2], [cx + len / 2, cz - wid / 2], [cx + len / 2, cz + wid / 2]].forEach(function (q) {
var y = gwHeight(q[0], q[1]);
wCyl(0.04, 0.05, 1.2, wM(0x8A6A42), q[0], y + 0.6, q[1], P, 5);
wBox(0.3, 0.2, 0.02, wM(0xE8E4D8), q[0] + 0.16, y + 1.08, q[1], P);
});
var px = cx - len / 2 - 1.6, pz = cz + 1, py = gwHeight(px, pz), pl = new THREE.Group();
pl.position.set(px, py, pz);
P.add(pl);
wBox(2.4, 0.12, 0.12, wM(0x6A4A2E), 0, 0.6, 0, pl).rotation.z = 0.25;
[-0.25, 0.25].forEach(function (d) { var h = wBox(1.4, 0.08, 0.08, wM(0x6A4A2E), -1.3, 1.0, d, pl); h.rotation.z = -0.45; });
var share = wBox(0.6, 0.3, 0.06, wM(0x5A5C60), 1.1, 0.2, 0, pl);
share.rotation.y = 0.4;
wBox(0.06, 0.6, 0.5, wM(0x5A5C60), 0.8, 0.35, 0.1, pl);
var wh = wCyl(0.3, 0.3, 0.08, wM(0x3A3A3A), 1.3, 0.3, -0.35, pl, 12);
wh.rotation.x = Math.PI / 2;
var tx = cx + len / 2 + 5, tz = cz - 6, ty = gwHeight(tx, tz);
wBox(4, 2.2, 0.08, wM(0xE8E0D0), tx, ty + 1.1, tz - 1.5, P);
wBox(0.08, 2.2, 3, wM(0xE8E0D0), tx - 2, ty + 1.1, tz, P);
wBox(0.08, 2.2, 3, wM(0xE8E0D0), tx + 2, ty + 1.1, tz, P);
var tr = wCone(3.1, 1.3, wM(0x3A6A3A), tx, ty + 2.85, tz, P, 4);
tr.rotation.y = Math.PI / 4;
tr.scale.set(1, 1, 0.8);
wBox(2.4, 0.08, 0.8, wM(0x8A6A42), tx, ty + 0.85, tz, P);
[-1.1, 1.1].forEach(function (d) { wBox(0.08, 0.85, 0.7, wM(0x6A4A2E), tx + d, ty + 0.42, tz, P); });
[0xC83A3A, 0x3A5AA8, 0xE8C04A].forEach(function (c, i) { wCyl(0.12, 0.12, 0.03, wM(c), tx - 0.6 + i * 0.6, ty + 0.92, tz, P, 10); });
[[cx - 4, cz + 6.5], [cx + 2, cz + 6.5], [cx + 8, cz + 6.5]].forEach(function (q) { wBox(1.1, 0.45, 0.5, wM(0xD8C078), q[0], gwHeight(q[0], q[1]) + 0.22, q[1], P); });
G.add(wmwBake(P));
var s1 = wSign(["THE GREENWOLD PLOUGHING MATCH", "A straight furrow wins the rosette · press E at the sign"], 4.2, 1.2, "#22361E", "#E8E2C8");
s1.position.set(-250, gwHeight(-250, -37) + 2.2, -37);
s1.rotation.y = Math.PI;
G.add(s1);
wBox(0.1, 1.6, 0.1, wM(0x5A4030), -251.8, gwHeight(-251.8, -37) + 0.8, -37, G);
wBox(0.1, 1.6, 0.1, wM(0x5A4030), -248.2, gwHeight(-248.2, -37) + 0.8, -37, G);
wmwPerson(G, "greenwold", "wmw_judge", { title: "Ploughing match judge", sex: "f", look: { top: 0x5A6A3A, bottom: 0x4A3A2A, hat: "cap", hatColor: 0x5A4A3A } }, tx, tz + 1.2, Math.PI);
wmwPerson(G, "greenwold", "wmw_steward", { title: "Ploughing match steward", sex: "m", look: { top: 0x8A6A4A, bottom: 0x3A3A3A, hat: "cap", hatColor: 0x3A3A3A } }, cx - len / 2 - 1, cz - wid / 2 - 1.5, 0.6);
GW.solids.push({ x: tx, z: tz, hw: 2.1, hd: 1.6 }, { x: px, z: pz, r: 1.2 }, { x: -250, z: -37, hw: 1.9, hd: 0.15 });
var Gm = WMW_GAMES.gw_plough;
GW.spots.push({ x: Gm.x, z: Gm.z, r: 3, name: Gm.name, verb: "plough a furrow and be judged", fn: function () { wmwPloughCard(); } });
GW.spots.push({ x: tx, z: tz + 2.6, r: 2.6, name: "The judges' table", verb: "see the rules and the prize", fn: function () { wmwPloughCard(); } });
},
function (G) {
var P = new THREE.Group(), cream = wM(0xE8DCC8), wood = wM(0x7A5638), soil = wM(0x4A3424);
[[55.5, 51]].forEach(function (q) {
wBox(3.2, 0.62, 0.8, wM(0x8A8A90), q[0], 0.31, q[1], P);
wBox(3.24, 0.05, 0.84, wM(0xC9A868), q[0], 0.6, q[1], P);
wBox(3.0, 0.04, 0.66, soil, q[0], 0.62, q[1], P);
for (var i = 0; i < 9; i++) {
var hc = [0x4A8A4A, 0x6AA05A, 0x5A9A6A][i % 3];
var b = wSph(0.2, wM(hc), q[0] - 1.3 + i * 0.32, 0.76, q[1] + (i % 2 ? 0.12 : -0.12), P, 7);
b.scale.y = 0.75;
}
for (var f = 0; f < 6; f++)
wSph(0.04, wM(0xF4F0E0), q[0] + 0.5 + f * 0.14, 0.92, q[1] + (f % 2 ? 0.15 : -0.1), P, 5);
LL.solids.push({ x: q[0], z: q[1], hw: 1.6, hd: 0.4, h: 0.8 });
});
var bx = 50.95, bz = 57;
wBox(0.9, 0.9, 3.4, wood, bx, 0.45, bz, P);
wBox(1, 0.06, 3.5, wM(0x9A7450), bx, 0.93, bz, P);
wBox(0.08, 1.2, 3.4, wood, bx - 0.45, 1.5, bz, P);
wBox(0.3, 0.04, 3.2, wood, bx - 0.3, 1.6, bz, P);
for (var p = 0; p < 6; p++) {
wCyl(0.13, 0.1, 0.22, wM(0xB8643A), bx - 0.3, 1.73, bz - 1.4 + p * 0.56, P, 8);
wSph(0.12, wM(0x5A9A5A), bx - 0.3, 1.9, bz - 1.4 + p * 0.56, P, 6);
}
for (var t = 0; t < 2; t++) {
wBox(0.5, 0.08, 0.7, wM(0x3A3A3A), bx + 0.1, 1.0, bz - 0.9 + t * 1.0, P);
for (var k = 0; k < 4; k++)
wSph(0.05, wM(0x6AAA5A), bx + 0.1 + (k % 2 ? 0.12 : -0.12), 1.07, bz - 1.1 + t * 1.0 + Math.floor(k / 2) * 0.3, P, 5);
}
wBox(0.06, 0.02, 0.3, wM(0xB8BCC4), bx + 0.25, 0.97, bz + 1.2, P);
G.add(wmwBake(P));
LL.solids.push({ x: bx, z: bz, hw: 0.5, hd: 1.75, h: 2 });
var sg = wSign(["THE POTTING BENCH", "tea herbs for sale · good flowers bought"], 2.4, 0.6, "#2A1236", "#E8CFA0");
sg.position.set(bx - 0.35, 2.5, bz);
sg.rotation.y = Math.PI / 2;
G.add(sg);
wmwPerson(G, "lounge", "wmw_hyacinth", { title: "Conservatory gardener", sex: "f", look: { layer: "apron", layerColor: 0x6A8A5A, top: 0xE8C8D8, bottom: 0x5A4A6A, hands: "gloves" } }, 51.6, 54.5, Math.PI / 2);
wmwStallSpot("ll_bench");
wmwSpotsBuild("lounge", G);
wmwLecterns("lounge", G);
},
function (G) {
var P = new THREE.Group(), brick = wM(0x8A5A44), soil = wM(0x4A3424), leaf = wM(0x4A7A3A);
[[36, "peony"], [42, "sweetpea"], [48, "gyp"]].forEach(function (q) {
var x = q[0], z = 6;
wBox(4.4, 0.4, 1.6, brick, x, 0.2, z, P);
wBox(4.2, 0.04, 1.4, soil, x, 0.41, z, P);
if (q[1] === "peony")
for (var i = 0; i < 8; i++) {
var px = x - 1.7 + (i % 4) * 1.1, pz = z + (i < 4 ? -0.35 : 0.35);
wSph(0.26, leaf, px, 0.62, pz, P, 7).scale.y = 0.7;
wSph(0.15, wM(i % 3 ? 0xE8A8B8 : 0xF0D0D8), px, 0.86, pz, P, 8);
}
if (q[1] === "sweetpea")
for (var w2 = 0; w2 < 3; w2++) {
var wx = x - 1.4 + w2 * 1.4;
for (var c = 0; c < 4; c++) {
var cane = wCyl(0.015, 0.015, 1.7, wM(0x8A7A4A), wx + Math.cos(c * 1.57) * 0.3, 1.22, z + Math.sin(c * 1.57) * 0.3, P, 4);
cane.rotation.z = Math.cos(c * 1.57) * -0.17;
cane.rotation.x = Math.sin(c * 1.57) * 0.17;
}
var vine = wCyl(0.32, 0.12, 1.3, leaf, wx, 1.05, z, P, 7);
for (var f = 0; f < 7; f++)
wSph(0.05, wM([0xC88AC8, 0xE8A0B8, 0xF0E0F0, 0x9A6AC8][f % 4]), wx + Math.cos(f * 0.9) * 0.28, 0.7 + f * 0.14, z + Math.sin(f * 0.9) * 0.28, P, 5);
}
if (q[1] === "gyp")
for (var g = 0; g < 10; g++) {
var gx = x - 1.8 + (g % 5) * 0.9, gz = z + (g < 5 ? -0.35 : 0.35);
wSph(0.3, wM(0xE8E8E0), gx, 0.72, gz, P, 6).scale.y = 0.6;
wCyl(0.03, 0.03, 0.3, leaf, gx, 0.5, gz, P, 4);
}
FL.solids.push({ x: x, z: z, hw: 2.2, hd: 0.8, h: 0.9 });
});
var cx = 55.2, cz = 2;
wBox(1.3, 0.12, 2.6, wM(0x3A5A4A), cx, 0.8, cz, P);
wBox(1.3, 0.4, 0.06, wM(0x3A5A4A), cx, 1.06, cz - 1.28, P);
wBox(1.3, 0.4, 0.06, wM(0x3A5A4A), cx, 1.06, cz + 1.28, P);
[-1.0, 1.0].forEach(function (d) { var wl = wCyl(0.45, 0.45, 0.08, wM(0x5A3E26), cx + 0.7, 0.45, cz + d, P, 12); wl.rotation.z = Math.PI / 2; });
wBox(0.06, 0.06, 0.9, wM(0x5A3E26), cx - 0.9, 0.7, cz, P);
[[-0.9, 0xE8A8B8], [-0.3, 0xF0E8F0], [0.3, 0xC88AC8], [0.9, 0xE8E8E0]].forEach(function (q) {
wCyl(0.2, 0.16, 0.4, wM(0xA8ACB0), cx, 1.06, cz + q[0], P, 10);
for (var s = 0; s < 5; s++)
wSph(0.09, wM(q[1]), cx + (s % 2 ? 0.08 : -0.08), 1.36 + (s % 3) * 0.06, cz + q[0] + (s - 2) * 0.05, P, 6);
});
[-1.2, 1.2].forEach(function (d) { wCyl(0.03, 0.03, 1.6, wM(0xE8E0D0), cx + 0.55, 1.6, cz + d, P, 5); wCyl(0.03, 0.03, 1.6, wM(0xE8E0D0), cx - 0.55, 1.6, cz + d, P, 5); });
for (var st = 0; st < 6; st++)
wBox(1.5, 0.05, 0.46, wM(st % 2 ? 0xE8E0D0 : 0x5A8A6A), cx, 2.42, cz - 1.15 + st * 0.46, P);
var tx = 57.6, tz = 7;
wBox(1.8, 0.06, 0.9, wM(0xE8E0D0), tx, 0.78, tz, P);
[-0.8, 0.8].forEach(function (d) { wBox(0.06, 0.76, 0.8, wM(0x6A4A2E), tx + d, 0.38, tz, P); });
[0xE8E0D0, 0xE8A8B8, 0xC9A868].forEach(function (c, i) { var rb = wCyl(0.08, 0.08, 0.06, wM(c), tx - 0.5 + i * 0.3, 0.84, tz - 0.2, P, 10); rb.rotation.x = Math.PI / 2; });
wCyl(0.12, 0.09, 0.32, wM(0xD8E4E8), tx + 0.5, 0.97, tz, P, 10);
for (var v = 0; v < 5; v++)
wSph(0.08, wM([0xE8A8B8, 0xF0E8F0, 0xC88AC8][v % 3]), tx + 0.5 + (v % 2 ? 0.06 : -0.06), 1.2 + (v % 3) * 0.05, tz + (v - 2) * 0.04, P, 6);
G.add(wmwBake(P));
var sg = wSign(["THE EVERBLOOM FLOWER CART", "fresh stems · flowers bought"], 2, 0.55, "#3A3A30", "#E2CFA0");
sg.position.set(cx - 0.76, 2.15, cz);
sg.rotation.y = -Math.PI / 2;
G.add(sg);
var sg2 = wSign(["THE BOUQUET CHALLENGE", "remember the order, tie the posy"], 1.8, 0.5, "#3A3A30", "#E2CFA0");
sg2.position.set(tx, 1.6, tz + 0.5);
G.add(sg2);
wmwPerson(G, "family", "wmw_delphine", { title: "Flower seller", sex: "f", look: { layer: "apron", layerColor: 0x5A8A6A, top: 0xF0E0E0, bottom: 0x4A4A5A } }, cx + 1.3, cz, -Math.PI / 2);
FL.solids.push({ x: cx + 0.1, z: cz, hw: 0.85, hd: 1.5, h: 2.5 }, { x: tx, z: tz, hw: 0.9, hd: 0.45, h: 1 });
wmwStallSpot("fl_cart");
var Gm = WMW_GAMES.fl_bouquet;
FL.spots.push({ x: Gm.x, z: Gm.z, r: 2.2, name: Gm.name, verb: "have a go", fn: function () { wmwBouquetCard(); } });
wmwSpotsBuild("family", G);
wmwLecterns("family", G);
},
function (key, score, won, after) {
var Gm = WMW_GAMES[key];
if (score > wmwBest(key))
wmwSetBest(key, score);
if (!wmwSigned()) {
after(won ? "Sign in, and a winning result earns the day's prize." : "");
return;
}
if (WMW.noSql) {
after(won ? wmwSoon() : "");
return;
}
wmwRpc("wmw_play_done", { p_key: key, p_score: score }).then(function (o) {
if (o && o.paid && typeof refreshStanding === "function")
try {
refreshStanding();
}
catch (e) { }
WMW.stockAt = 0;
after(esc((o && o.say) || ""), o);
}).catch(function (e) { after(wmwMissing(e) ? wmwSoon() : esc((e && e.message) || String(e))); });
},
function (msg) {
var Gm = WMW_GAMES.gw_plough, P = WMW.game && WMW.game.kind === "plough" ? WMW.game : null, fns = {}, b = wmwBest("gw_plough"), h = wmwTitle("The Greenwold Ploughing Match", "#E8E2C8");
if (!P) {
h += "<div style='opacity:.85;margin:4px 0'>At a real ploughing match, judges walk the plot and score how straight and even the furrows are, how neat the start (the opening) and the finish are. Here you plough one furrow behind a steady pair of horses: the share catches on stones and the team pulls off line now and then. Keep the plough on the white line by easing it back, for thirty seconds.</div>" +
"<div style='opacity:.8'>The judge scores the furrow out of 100. <b>" + Gm.win + " or more</b> wins a rosette, and once a day the Show Committee adds " + Gm.gold + " gold for dreamers who pay their dues.</div>" +
"<div style='opacity:.75;margin-top:4px'>Your best: " + (b ? b + " of 100" : "not ploughed yet") + "</div>" +
worldBtn("go", "🐴 Take the plough handles", "The furrow starts when you press it") + worldBtn("job", "📋 Work here", "The Show Committee takes on a steward");
fns.go = function () { WMW.game = { world: "greenwold", kind: "plough", t: 0, dur: 30, d: 0, v: 0, sum: 0, n: 0, acc: 0, paint: 0, push: 0 }; wmwPlayStart("gw_plough"); wmwTone(392, 0.15); wmwPloughCard(); };
fns.job = function () { worldCard(null); if (typeof ahOpen === "function")
ahOpen(typeof GW_KEY !== "undefined" ? GW_KEY : "The Greenwold Gate"); };
}
else {
var pos = Math.max(2, Math.min(98, 50 + P.d * 32)), off = Math.abs(P.d), straight = P.n ? Math.max(0, Math.round(100 - (P.sum / P.n) * 120)) : 100;
h += "<div style='margin:4px 0'>" + Math.ceil(P.dur - P.t) + " s to the headland · straight so far: <b>" + straight + "</b></div>" +
"<div style='position:relative;height:30px;margin:10px 0;border-radius:4px;background:linear-gradient(90deg,#4A3020,#6A4A30 30%,#7A5A3A 50%,#6A4A30 70%,#4A3020)'>" +
"<div style='position:absolute;left:50%;top:0;bottom:0;width:2px;margin-left:-1px;background:#E8E4D8'></div>" +
"<div style='position:absolute;left:" + pos.toFixed(1) + "%;top:4px;width:14px;height:22px;margin-left:-7px;border-radius:3px;background:" + (off < 0.25 ? "#C8D8A0" : off < 0.6 ? "#E8C870" : "#E09A7A") + "'></div></div>" +
"<div style='opacity:.8;font-size:12px'>" + (P.d < -0.25 ? "The plough is running left of the line: ease it right." : P.d > 0.25 ? "The plough is running right of the line: ease it left." : "On the line. Steady.") + "</div>";
h += "<div style='display:flex;gap:8px'><div style='flex:1'>" + worldBtn("l", "⬅ Ease left", "") + "</div><div style='flex:1'>" + worldBtn("r", "Ease right ➡", "") + "</div></div>";
fns.l = function () { wmwPloughNudge(-1); };
fns.r = function () { wmwPloughNudge(1); };
h += worldBtn("stop", "Leave the plough", "");
fns.stop = function () { WMW.game = null; worldCard(null); };
}
if (msg)
h += "<div style='margin:6px 0;color:#CFE8C0'>" + msg + "</div>";
worldCard(h, fns);
},
function (dt) {
var P = WMW.game;
if (!P || P.kind !== "plough")
return;
if (!WLD.card || WLD.card.style.display !== "block") {
WMW.game = null;
return;
}
P.t += dt;
P.push -= dt;
if (P.push <= 0) {
P.push = 1.6 + Math.random() * 2.4;
P.v += (Math.random() < 0.5 ? -1 : 1) * (0.25 + Math.random() * 0.35);
}
P.v += (Math.random() - 0.5) * dt * 0.9;
P.v *= Math.pow(0.6, dt);
P.d += P.v * dt;
P.d = Math.max(-1.5, Math.min(1.5, P.d));
P.acc += dt;
while (P.acc >= 0.1) {
P.acc -= 0.1;
P.sum += Math.abs(P.d);
P.n++;
}
P.paint += dt;
if (P.paint >= 0.25) {
P.paint = 0;
if (P.t < P.dur)
wmwPloughCard();
}
if (P.t >= P.dur) {
var score = Math.max(0, Math.min(100, Math.round(100 - (P.sum / Math.max(1, P.n)) * 120))), Gm = WMW_GAMES.gw_plough, won = score >= Gm.win, best = wmwBest("gw_plough");
WMW.game = null;
wmwTone(won ? 523 : 262, 0.2);
if (won)
setTimeout(function () { wmwTone(659, 0.25); }, 180);
var say = "<b>The judge walks your furrow: " + score + " out of 100.</b> " + (won ? "\"As straight as a ruler.\"" : score >= 50 ? "\"Not bad. Keep your eye on the far peg.\"" : "\"It wanders like a stream. Try again.\"") + (best && score <= best ? " Your best is " + best + "." : "");
wmwPloughCard(say + " …");
wmwPlayDone("gw_plough", score, won, function (extra, o) { wmwPloughCard(say + (o && o.paid ? " \"That's a rosette.\"" : "") + (extra ? " " + extra : "")); });
}
},
function () {
var F = WMW_BQ.flowers.slice(), pick = [];
for (var i = 0; i < 3; i++) {
var j = Math.floor(Math.random() * F.length);
pick.push([F[j][0], 1 + Math.floor(Math.random() * 5)]);
F.splice(j, 1);
}
return { stems: pick, ribbon: WMW_BQ.ribbons[Math.floor(Math.random() * 4)], who: WMW_BQ.who[Math.floor(Math.random() * WMW_BQ.who.length)] };
},
function (msg) {
var Gm = WMW_GAMES.fl_bouquet, B = WMW.game && WMW.game.kind === "bouquet" ? WMW.game : null, fns = {}, best = wmwBest("fl_bouquet"), h = wmwTitle("The Bouquet Challenge", "#F0DEB0");
if (!B) {
h += "<div style='opacity:.85;margin:4px 0'>Delphine reads you a florist's order, then takes the card back. Tie the posy from memory: the right stems in the right numbers, and the right ribbon. Five orders.</div>" +
"<div style='opacity:.8'><b>" + Gm.win + " or more</b> right wins a hand-tied bouquet for your backpack, and once a day " + Gm.gold + " gold from the Everbloom for dreamers who pay their dues.</div>" +
"<div style='opacity:.75;margin-top:4px'>Your best: " + (best ? best + " of 5" : "none yet") + "</div>" + worldBtn("go", "💐 Take the first order", "") + worldBtn("job", "📋 Work here", "The Flower Cart takes on a seller");
fns.go = function () { WMW.game = { world: "family", kind: "bouquet", i: 0, right: 0, o: wmwBqOrder(), show: 7, made: {}, rib: null }; wmwPlayStart("fl_bouquet"); wmwBouquetCard(); };
fns.job = function () { worldCard(null); if (typeof ahOpen === "function")
ahOpen(typeof FL_WED !== "undefined" ? FL_WED : "The Everbloom Wedding House"); };
}
else if (B.show > 0) {
h += "<div style='margin:4px 0'>Order " + (B.i + 1) + " of 5 · Delphine takes the card back in " + Math.ceil(B.show) + " s</div>" +
"<div style='margin:8px 0;padding:8px 10px;border:1px dashed #C9A868;border-radius:4px;background:rgba(240,220,170,.08)'>📝 <b>A posy for " + esc(B.o.who) + ":</b><br>" +
B.o.stems.map(function (s) { return s[1] + " × " + esc(wmwBqName(s[0])); }).join("<br>") + "<br>tied with <b>" + B.o.ribbon + "</b> ribbon.</div>" + worldBtn("ready", "I have it: take the card", "");
fns.ready = function () { B.show = 0; wmwBouquetCard(); };
}
else {
h += "<div style='margin:4px 0'>Order " + (B.i + 1) + " of 5 · " + B.right + " right so far. Tie the posy for " + esc(B.o.who) + ":</div>";
WMW_BQ.flowers.forEach(function (f) {
var n = B.made[f[0]] || 0;
h += "<div style='display:flex;align-items:center;gap:6px;margin:3px 0'><div style='flex:1'>" + f[2] + " " + esc(f[1]) + ": <b>" + n + "</b></div>" +
"<div data-w='m_" + f[0] + "' role='button' tabindex='0' style='padding:4px 12px;border:1px solid rgba(143,180,232,.5);border-radius:4px'>−</div>" +
"<div data-w='p_" + f[0] + "' role='button' tabindex='0' style='padding:4px 12px;border:1px solid rgba(143,180,232,.5);border-radius:4px'>+</div></div>";
fns["m_" + f[0]] = function () { B.made[f[0]] = Math.max(0, n - 1); wmwBouquetCard(); };
fns["p_" + f[0]] = function () { B.made[f[0]] = Math.min(9, n + 1); wmwBouquetCard(); };
});
h += "<div style='margin:6px 0 2px'>Ribbon: " + (B.rib ? "<b>" + B.rib + "</b>" : "choose one") + "</div><div>";
WMW_BQ.ribbons.forEach(function (r) { h += "<span data-w='r_" + r + "' role='button' tabindex='0' style='display:inline-block;margin:3px;padding:5px 10px;border-radius:4px;border:1px solid " + (B.rib === r ? "#E8C870" : "rgba(143,180,232,.5)") + "'>" + r + "</span>"; fns["r_" + r] = function () { B.rib = r; wmwBouquetCard(); }; });
h += "</div>" + worldBtn("tie", "🎀 Tie it and hand it over", "");
fns.tie = wmwBqTie;
}
if (B) {
h += worldBtn("stop", "Stop", "");
fns.stop = function () { WMW.game = null; worldCard(null); };
}
if (msg)
h += "<div style='margin:6px 0;color:#CFE8C0'>" + msg + "</div>";
worldCard(h, fns);
},
function () {
var B = WMW.game;
if (!B || B.kind !== "bouquet")
return;
var want = {};
B.o.stems.forEach(function (s) { want[s[0]] = s[1]; });
var ok = B.rib === B.o.ribbon && WMW_BQ.flowers.every(function (f) { return (B.made[f[0]] || 0) === (want[f[0]] || 0); });
if (ok) {
B.right++;
wmwTone(659, 0.12);
}
else
wmwTone(247, 0.15);
var was = B.o.stems.map(function (s) { return s[1] + " " + wmwBqName(s[0]).replace(/^\S+ /, "").toLowerCase(); }).join(", ") + ", " + B.o.ribbon + " ribbon";
B.i++;
if (B.i >= 5) {
var n = B.right, Gm = WMW_GAMES.fl_bouquet, won = n >= Gm.win;
WMW.game = null;
var say = (ok ? "Right! " : "Not quite: it was " + esc(was) + ". ") + "<b>" + n + " of 5 posies right.</b> " + (won ? "Delphine nods: a winning set." : "Four right wins the bouquet. Have another go!");
wmwBouquetCard(say + " …");
wmwPlayDone("fl_bouquet", n, won, function (extra, o) { wmwBouquetCard(say + (o && o.paid ? " She ties the best of them into a bouquet for you." : "") + (extra ? " " + extra : "")); });
return;
}
B.o = wmwBqOrder();
B.show = 7;
B.made = {};
B.rib = null;
wmwBouquetCard(ok ? "Right! Delphine sets it in the bucket." : "Not quite: that order was " + esc(was) + ". Next one!");
},
function (x, z, rad) {
var S = SEA.solids || [], i;
for (i = 0; i < S.length; i++) {
var s = S[i];
if (s.r !== undefined) {
if (Math.hypot(x - s.x, z - s.z) < s.r + rad)
return true;
continue;
}
var c = Math.cos(-(s.rot || 0)), sn = Math.sin(-(s.rot || 0)), lx = (x - s.x) * c + (z - s.z) * sn, lz = -(x - s.x) * sn + (z - s.z) * c;
if (Math.abs(lx) < (s.hw || 0) + rad && Math.abs(lz) < (s.hd || 0) + rad)
return true;
}
for (i = 0; i < SEA.talkers.length; i++) {
var T = SEA.talkers[i], tx = T.p ? T.p.g.position.x : T.x, tz = T.p ? T.p.g.position.z : T.z;
if (tx !== undefined && Math.hypot(x - tx, z - tz) < rad + 1.6)
return true;
}
for (i = 0; i < HX.spots.length; i++)
if (Math.hypot(x - HX.spots[i].x, z - HX.spots[i].z) < rad + 2)
return true;
for (i = 0; i < WMS.taken.length; i++) {
var t = WMS.taken[i];
if (Math.hypot(x - t[0], z - t[1]) < t[2] + rad)
return true;
}
return false;
},
function (x, z, rad) {
var p = wmsIsle(x, z);
for (var d = 0; d <= 36; d += 3)
for (var a = 0; a < (d ? 10 : 1); a++) {
var cx = x + Math.cos(a * 0.628) * d, cz = z + Math.sin(a * 0.628) * d;
if (p) {
var h = seaIsleH(p, cx, cz);
if (h < 1.6)
continue;
if (p.land && Math.hypot(cx - p.land.x, cz - p.land.z) < 12)
continue;
}
if (wmsBlocked(cx, cz, rad))
continue;
WMS.taken.push([cx, cz, rad]);
return { x: cx, z: cz };
}
WMS.taken.push([x, z, rad]);
return { x: x, z: z };
},
function (S, x, z, ry, col, goods) {
var g = new THREE.Group(), y = wmsY(x, z, 1.3, 0.6);
g.position.set(x, y, z);
g.rotation.y = ry || 0;
S.add(g);
wBox(2.4, 0.9, 0.9, wM(0x6A4A2E), 0, 0.45, 0, g);
[-1.1, 1.1].forEach(function (s) { wCyl(0.05, 0.05, 2.4, wM(0x4A3A2A), s, 1.2, -0.35, g, 5); });
var aw = wBox(2.8, 0.06, 1.4, wM(col || 0x8A3A2A), 0, 2.4, 0.1, g);
aw.rotation.x = 0.18;
(goods || []).forEach(function (c, i) { if (i % 2)
wBox(0.26, 0.26, 0.26, wM(c), -0.9 + i * 0.36, 1.03, 0, g);
else
wSph(0.14, wM(c), -0.9 + i * 0.36, 1.04, 0, g, 7); });
wmsSolid({ x: x, z: z, hw: 1.25, hd: 0.5, rot: ry || 0 });
return g;
},
function (S, x, z, ry, w, d, h, wall, roof, inn) {
var g = new THREE.Group(), y = wmsY(x, z, w / 2, d / 2);
g.position.set(x, y, z);
g.rotation.y = ry || 0;
S.add(g);
wBox(w + 0.4, 1, d + 0.4, wM(0x8A8070), 0, -0.3, 0, g);
wBox(w, h, d, wM(wall), 0, h / 2, 0, g);
var r = wCone(Math.max(w, d) * 0.78, h * 0.55, wM(roof), 0, h + h * 0.27, 0, g, 4);
r.rotation.y = Math.PI / 4;
r.scale.z = d / w;
wBox(1.1, 1.9, 0.08, wB(0x2A1E14), 0, 0.95, d / 2 + 0.04, g);
if (inn && typeof evbWorldDoor === "function") {
wBox(0.08, 1.9, 1.0, wB(0x2A1E14), w / 2 + 0.04, 0.95, 0, g);
evbWorldDoor("sea", x, z, (ry || 0) + Math.PI / 2, w / 2, inn[0], inn[1], { doors: "the side door", y: y });
}
wmsSolid({ x: x, z: z, hw: w / 2 + 0.2, hd: d / 2 + 0.2, rot: ry || 0 });
return g;
},
function (name, id, work, extra) {
var T = HX_STALLS[id], opts = [];
if (T)
opts.push(["🛒 " + esc(T.name), T.sells.length ? "Buy and sell, into your stock" : "Hand in finds for the finder's fee", wmsTrade(id)]);
if (work)
opts.push(["📋 Work here", esc(work), wmsHire(work)]);
(extra || []).forEach(function (e) { opts.push(e); });
hxWrapKeeper("sea", name, opts);
},
function (G) {
if (WMS.built.sea)
return;
WMS.built.sea = 1;
var list = SEA.talkers;
WMS_SPOTS.forEach(function (s) {
if (s[10] === "aboard")
return;
var f = wmsFree(s[3], s[4], 2.2);
s[3] = Math.round(f.x * 10) / 10;
s[4] = Math.round(f.z * 10) / 10;
if (!HX_SPOTS.some(function (x) { return x[0] === s[0]; }))
HX_SPOTS.push(s);
var S = { id: s[0], world: "sea", kind: s[2], x: s[3], z: s[4], name: s[8], verb: s[9], look: s[10] };
var g = hxProp(S.look);
g.position.set(S.x, hxGround("sea", S.x, S.z), S.z);
g.rotation.y = (S.x * 0.37 + S.z * 0.11) % 6.28;
G.add(g);
S.g = g;
HX.spots.push(S);
list.push({ x: S.x, z: S.z, r: 2.8, name: S.name, verb: S.verb, fn: function () { hxGather(S); } });
});
Object.keys(WMS_DRESS).forEach(function (k) { if (!SEA_BY[k])
return; try {
WMS_DRESS[k](G, SEA_BY[k]);
}
catch (e) {
if (window.console)
console.warn("[world-more 20] " + k, e);
} });
},
function (G, p) {
var f = wmsFree(3770, -2300, 5), x = f.x, z = f.z, S = new THREE.Group(), stone = wM(0xB8B0A0), wood = wM(0x6A4A2A), y = wmsY(x, z, 3, 3);
wCyl(1.7, 1.8, 0.8, stone, x, y + 0.4, z, S, 16);
var cs = wCyl(0.7, 0.7, 0.45, wM(0xA8A090), x + 0.5, y + 1.5, z, S, 14);
cs.rotation.z = Math.PI / 2;
wCyl(0.08, 0.08, 1.2, wood, x, y + 1.3, z, S, 6);
var arm = wBox(3.4, 0.12, 0.12, wood, x + 0.6, y + 1.5, z, S);
arm.rotation.y = 0.3;
var bx = x - 4.2, bz = z + 1.6, by = wmsY(bx, bz, 2.4, 0.8);
[-2.2].forEach(function (o) { wBox(0.3, 2.4, 0.3, wood, bx + o, by + 1.2, bz, S); });
for (var m = 0; m < 5; m++)
wCyl(0.55, 0.55, 0.12, wM(0x9A8A5A), bx - 1.2, by + 0.3 + m * 0.14, bz, S, 10);
var beam = wBox(4.4, 0.28, 0.28, wood, bx, by + 1.4, bz, S);
beam.rotation.z = -0.12;
wBox(0.6, 0.6, 0.6, stone, bx + 2, by + 0.95, bz, S);
for (var j = 0; j < 3; j++)
wmsJar(S, x + 2.6 + j * 0.9, y, z - 1.8, 1, 0xB86A3A);
wmsSolid({ x: x, z: z, r: 2 });
wmsSolid({ x: bx, z: bz, hw: 2.4, hd: 0.5 });
var c = wmsFree(x + 1, z + 4.5, 1.6);
wmsCounter(S, c.x, c.z, wmsFace(c.x, c.z, p.land.x, p.land.z), 0x5A7A3A, [0x6A7A3A, 0xD8C85A, 0xC8A040, 0x3A4A22, 0xD8C85A]);
landBake(G, S);
var s = wmsFree(x + 3, z + 6.5, 1.4);
wmsSign(G, ["The Olive Press of Ithaca", "Oil, olives and pears", "Pickers welcome · 📋 Hiring"], s.x, s.z, wmsFace(s.x, s.z, p.land.x, p.land.z));
var k = wmsFree(c.x - 1.6, c.z - 1.2, 1);
var T = WMS_STALLS.wms_press;
T.x = c.x;
T.z = c.z;
wmsWorkMove("The Olive Press of Ithaca", x, z);
wmsKeeper(G, "wms_dolius", { sex: "m", look: { top: 0x7A6A4A, topKind: "robe", bottom: 0x6A5A3A, shoes: 0x6A4A2A, hair: 0xD8D8D8, hairStyle: "short", beard: 1, hat: "none" } }, k.x, k.z, { name: T.keeper, persona: "You are Dolius, the old servant who has worked the farm of Laertes, Odysseus' father, on Ithaca all your life, from Homer's Odyssey (Books 4 and 24). Now you keep the island's olive press above the harbour: you sell olive oil, olives and pears, and buy olives and fruit from anyone who picks them. You know how an olive press really works (crushing stone, rush mats, the weighted beam) and you are kind, slow-spoken and proud of the orchard's thirteen pear trees. Keep it friendly and suitable for all ages.", greet: "Good day to you. The press is turning; oil for sale, and I pay for any olives you pick." }, wmsFace(k.x, k.z, c.x, c.z));
wmsKeeperOffers(T.keeper, "wms_press", "The Olive Press of Ithaca");
wmsTalk({ x: c.x, z: c.z, r: 2.6, name: T.name, verb: "trade", fn: wmsTrade("wms_press") });
},
function (G, p) {
var f = wmsFree(-3240, -2730, 6), x = f.x, z = f.z, S = new THREE.Group(), ry = wmsFace(x, z, p.land.x, p.land.z);
wmsHut(S, x, z, ry, 5, 4, 2.6, 0x9A9080, 0x6A5A3A, ["cycladic", "The goatherds' dairy"]);
var rx = x + Math.cos(ry) * 4.2, rz = z - Math.sin(ry) * 4.2, rk = new THREE.Group(), y = wmsY(rx, rz, 1.3, 0.4);
rk.position.set(rx, y, rz);
rk.rotation.y = ry;
S.add(rk);
[-1.2, 1.2].forEach(function (s) { wBox(0.1, 1.8, 0.5, wM(0x6A4A2A), s, 0.9, 0, rk); });
[0.5, 1.1, 1.6].forEach(function (h) { wBox(2.5, 0.06, 0.5, wM(0x7A5A3A), 0, h, 0, rk); for (var c = 0; c < 4; c++)
wCyl(0.22, 0.22, 0.18, wM(0xF0E4C0), -0.9 + c * 0.6, h + 0.12, 0, rk, 10); });
for (var b = 0; b < 3; b++)
wCyl(0.3, 0.25, 0.4, wM(0xB8945A), x - Math.cos(ry) * 3.4 + b * 0.3, wmsY(x, z) + 0.2, z + Math.sin(ry) * 3.4 + b * 0.5, S, 10);
var px = x - Math.sin(ry) * -7, pz = z - Math.cos(ry) * -7;
for (var i = 0; i < 10; i++) {
var a = i / 10 * Math.PI * 2;
if (i === 0)
continue;
var hx = px + Math.cos(a) * 3.4, hz = pz + Math.sin(a) * 3.4, hy = hxGround("sea", hx, hz);
var hb = wBox(2, 1, 0.12, wM(0x8A6A42), hx, hy + 0.5, hz, S);
hb.rotation.y = -a + Math.PI / 2;
}
wmsSolid({ x: rx, z: rz, hw: 1.3, hd: 0.3, rot: ry });
WMS.taken.push([px, pz, 4]);
var c = wmsFree(x + Math.sin(ry) * 4.5, z + Math.cos(ry) * 4.5, 1.6);
wmsCounter(S, c.x, c.z, ry, 0x6A5A3A, [0xF0E4C0, 0xEDE6D6, 0xF0E4C0, 0x6A8A5A, 0xF0E4C0]);
landBake(G, S);
for (var sh = 0; sh < 4; sh++) {
try {
var a2 = sh * 1.5, sx = px + Math.cos(a2) * 1.6, sz = pz + Math.sin(a2) * 1.6, m = build({ id: "wms_sheep_" + sh, archetype: sh % 2 ? "goat" : "sheep", attrs: { s: 1.3 }, x: 0, z: 0, rot: 0, solid: false, detail: 3, nights: [] });
m.position.set(sx, hxGround("sea", sx, sz), sz);
m.rotation.y = a2;
G.add(m);
}
catch (e) { }
}
var s = wmsFree(c.x + 2.6, c.z + 1.2, 1.4);
wmsSign(G, ["The Goatherds' Dairy", "Cheese pressed in wicker", "Fleece bought · 📋 Hiring"], s.x, s.z, ry);
var T = WMS_STALLS.wms_dairy;
T.x = c.x;
T.z = c.z;
wmsWorkMove("The Goatherds' Dairy", x, z);
var k = wmsFree(c.x - Math.sin(ry) * 1.3, c.z - Math.cos(ry) * 1.3, 1);
wmsKeeper(G, "wms_glaukos", { sex: "m", look: GREEK(0x8A7A5A) }, k.x, k.z, { name: T.keeper, persona: "You are Glaukos, a goatherd who keeps a small dairy on the shore of the Cyclopes' island in the Endless Sea, as far as you can get from the cave of Polyphemus (Homer's Odyssey, Book 9), whom you avoid. You sell sheep's cheese made the old way (milk curdled with rennet, the curd pressed in wicker baskets, salted and dried on racks) and buy fleece. You are wry and careful, and you count your flock twice. Keep it friendly and suitable for all ages.", greet: "Keep your voice down: the big one sleeps on the other side of the hill. Cheese? Pressed this week." }, wmsFace(k.x, k.z, c.x, c.z));
wmsKeeperOffers(T.keeper, "wms_dairy", "The Goatherds' Dairy");
wmsTalk({ x: c.x, z: c.z, r: 2.6, name: T.name, verb: "trade", fn: wmsTrade("wms_dairy") });
},
function (G, p) {
var f = wmsFree(1440, -5070, 6), x = f.x, z = f.z, S = new THREE.Group(), y = wmsY(x, z, 3, 3), ry = wmsFace(x, z, p.land.x, p.land.z), white = wM(0xEDE8DC);
wCyl(2.8, 3.2, 7, white, x, y + 3.5, z, S, 16);
var rf = wCone(3.4, 2.6, wM(0x8A6A3A), x, y + 8.3, z, S, 16);
wBox(1.2, 2, 0.1, wB(0x2A1E14), x + Math.sin(ry) * 3.05, y + 1, z + Math.cos(ry) * 3.05, S).rotation.y = ry;
for (var w = 0; w < 2; w++)
wBox(0.6, 0.8, 0.1, wB(0x2A2A30), x + Math.sin(ry + 0.9 + w * 2) * 2.9, y + 4.5, z + Math.cos(ry + 0.9 + w * 2) * 2.9, S).rotation.y = ry + 0.9 + w * 2;
var ms = wmsFree(x + Math.sin(ry + 1.2) * 5, z + Math.cos(ry + 1.2) * 5, 1.2);
var mm = wCyl(0.9, 0.9, 0.3, wM(0x9A9488), ms.x, wmsY(ms.x, ms.z) + 0.15, ms.z, S, 16);
var m2 = wCyl(0.9, 0.9, 0.3, wM(0x9A9488), ms.x + 0.4, wmsY(ms.x, ms.z) + 0.6, ms.z, S, 16);
m2.rotation.z = 1.2;
wmsSolid({ x: x, z: z, r: 3.4 });
var c = wmsFree(x + Math.sin(ry) * 6, z + Math.cos(ry) * 6, 1.6);
wmsCounter(S, c.x, c.z, ry, 0x3A5A8A, [0xE8DCC0, 0xD8B860, 0xE8DCC0, 0xC8A060, 0xE8DCC0]);
landBake(G, S);
var sg = new THREE.Group();
sg.position.set(x + Math.sin(ry) * 3.3, y + 6.6, z + Math.cos(ry) * 3.3);
sg.rotation.y = ry;
G.add(sg);
var hub = new THREE.Group();
sg.add(hub);
wCyl(0.35, 0.35, 0.6, wM(0x5A4030), 0, 0, 0, hub, 8).rotation.x = Math.PI / 2;
var cloth = wM(0xF4EEDC, { ds: 1 }), spar = wM(0x6A4A2A);
for (var i = 0; i < 6; i++) {
var a = i / 6 * Math.PI * 2, arm = new THREE.Group();
arm.rotation.z = a;
hub.add(arm);
wBox(0.12, 5, 0.12, spar, 0, 2.6, 0.2, arm);
var tri = new THREE.BufferGeometry();
tri.setAttribute("position", new THREE.Float32BufferAttribute([0.06, 0.6, 0.22, 0.06, 5, 0.22, 1.5, 4.6, 0.22], 3));
tri.computeVertexNormals();
arm.add(new THREE.Mesh(tri, cloth));
}
WMS.mill = { g: hub };
var s = wmsFree(c.x + 2.6, c.z + 1, 1.4);
wmsSign(G, ["The Mill of the Winds", "Barley ground daily", "Grain bought · 📋 Hiring"], s.x, s.z, ry);
var T = WMS_STALLS.wms_mill;
T.x = c.x;
T.z = c.z;
wmsWorkMove("The Mill of the Winds", x, z);
var k = wmsFree(c.x - Math.sin(ry) * 1.3, c.z - Math.cos(ry) * 1.3, 1);
wmsKeeper(G, "wms_iope", { sex: "f", look: GREEK(0xC8B898, 1) }, k.x, k.z, { name: T.keeper, persona: "You are Iope, the miller of Aeolia, the floating island of Aeolus, keeper of the winds, ringed by a wall of bronze (Homer's Odyssey, Book 10). You keep the windmill inside the wall: you set the canvas on its six triangular sails to suit the wind, grind the island's barley into meal between millstones, sell meal and barley, and buy grain and fruit. You know real windmills came long after Homer (the first were in Persia, centuries later), and you laugh that Aeolus never lets the wind fail here. Keep it friendly and suitable for all ages.", greet: "Mind the sails! Barley meal, fresh from the stones. The wind here never takes a day off." }, wmsFace(k.x, k.z, c.x, c.z));
wmsKeeperOffers(T.keeper, "wms_mill", "The Mill of the Winds");
wmsTalk({ x: c.x, z: c.z, r: 2.6, name: T.name, verb: "trade", fn: wmsTrade("wms_mill") });
},
function (G, p) {
var f = wmsFree(-1835, 2385, 3), x = f.x, z = f.z, S = new THREE.Group(), y = wmsY(x, z, 2, 2), ry = wmsFace(x, z, p.land.x, p.land.z);
[[-1.6, -1.2], [1.6, -1.2], [-1.6, 1.2], [1.6, 1.2]].forEach(function (q) { wCyl(0.08, 0.1, 2.4, wM(0x8A7A4A), x + q[0], y + 1.2, z + q[1], S, 5); });
var rf = wBox(3.8, 0.12, 3, wM(0xC8B070), x, y + 2.45, z, S);
rf.rotation.y = ry;
wBox(2.4, 0.04, 1.6, wM(0xB8A060), x, y + 0.03, z, S).rotation.y = ry;
wmsSolid({ x: x, z: z, r: 2.2 });
landBake(G, S);
var s = wmsFree(x + Math.sin(ry) * 3.6, z + Math.cos(ry) * 3.6, 1.4);
wmsSign(G, ["Remember the Hold", "A game of not forgetting", "Ask Adra"], s.x, s.z, ry);
var P = wmsKeeper(G, "wms_adra", { sex: "f", look: { top: 0xD8C8A8, topKind: "robe", bottom: 0xE8E0C8, hat: "none" } }, x + 0.6, z + 0.4, { name: "Adra, who remembers", persona: "You are Adra, the one person on the Lotus-Eaters' shore (Homer's Odyssey, Book 9) who has never eaten the lotus. You remember everything, and you run a game for sailors: they watch what is loaded into the hold, then try to remember it after a breath of the lotus groves. You know many scholars think the real 'lotus' was the jujube fruit of North Africa. You are gentle, sharp and a little sad for your friends who forgot. Keep it friendly and suitable for all ages.", greet: "You still remember why you came? Good. Let us see how long that lasts. Shall we play?" }, ry + Math.PI);
if (P && P.g)
P.g.userData.pose = "sit";
hxWrapKeeper("sea", "Adra, who remembers", [["🧠 Remember the Hold", "A memory game · win a little gold once a day", function () { wmsGameCard("wms_g_lotus"); }]]);
wmsTalk({ x: s.x, z: s.z, r: 2.4, name: "Remember the Hold", verb: "play", fn: function () { wmsGameCard("wms_g_lotus"); } });
WMS_GAMES.wms_g_lotus.at = [x, z];
},
function (G, p) {
var f = wmsFree(-4960, 840, 6), x = f.x, z = f.z, S = new THREE.Group(), ry = wmsFace(x, z, p.land.x, p.land.z), y = wmsY(x, z, 3, 3);
for (var b = 0; b < 3; b++) {
var bx = x - Math.cos(ry) * (b - 1) * 2.6, bz = z + Math.sin(ry) * (b - 1) * 2.6, by = wmsY(bx, bz, 1, 1.6);
var bed = wBox(1.6, 0.4, 3, wM(0x6A4A2E), bx, by + 0.2, bz, S);
bed.rotation.y = ry;
for (var h = 0; h < 4; h++) {
var hb = wSph(0.32, wM([0x6A8A5A, 0x7A9A7A, 0x4A7A4A][h % 3]), bx + Math.sin(ry) * (h - 1.5) * 0.7, by + 0.5, bz + Math.cos(ry) * (h - 1.5) * 0.7, S, 6);
hb.scale.y = 0.6;
}
}
var dx = x + Math.sin(ry) * -3.4, dz = z + Math.cos(ry) * -3.4, dy = wmsY(dx, dz, 1.2, 0.3);
var rack = new THREE.Group();
rack.position.set(dx, dy, dz);
rack.rotation.y = ry;
S.add(rack);
[-1.2, 1.2].forEach(function (s) { wBox(0.08, 1.9, 0.08, wM(0x6A4A2A), s, 0.95, 0, rack); });
wBox(2.5, 0.06, 0.06, wM(0x6A4A2A), 0, 1.85, 0, rack);
for (var u = 0; u < 6; u++) {
var bun = wCyl(0.08, 0.14, 0.5, wM([0x7A8A5A, 0x8A9A6A][u % 2]), -1 + u * 0.4, 1.5, 0, rack, 5);
}
for (var hv = 0; hv < 3; hv++) {
var hx = x - Math.cos(ry) * (4.6 + hv * 1.1), hz = z + Math.sin(ry) * (4.6 + hv * 1.1), hy = wmsY(hx, hz);
wBox(0.8, 0.5, 0.8, wM(0x8A7A5A), hx, hy + 0.25, hz, S);
var sk = wSph(0.45, wM(0xC8A860), hx, hy + 0.75, hz, S, 8);
sk.scale.y = 1.2;
}
wmsSolid({ x: x, z: z, r: 4 });
wmsSolid({ x: dx, z: dz, hw: 1.3, hd: 0.2, rot: ry });
var c = wmsFree(x + Math.sin(ry) * 4.6, z + Math.cos(ry) * 4.6, 1.6);
wmsCounter(S, c.x, c.z, ry, 0x4A6A3A, [0x6A8A5A, 0xC8A040, 0x7A9A7A, 0xC8A040, 0x4A7A4A]);
landBake(G, S);
var s = wmsFree(c.x + 2.6, c.z + 1, 1.4);
wmsSign(G, ["The Herb Garden of Aeaea", "Herbs and honey · no potions", "📋 Hiring gatherers"], s.x, s.z, ry);
var T = WMS_STALLS.wms_herbs;
T.x = c.x;
T.z = c.z;
wmsWorkMove("The Herb Garden of Aeaea", x, z);
var k = wmsFree(c.x - Math.sin(ry) * 1.3, c.z - Math.cos(ry) * 1.3, 1);
wmsKeeper(G, "wms_melissa", { sex: "f", look: { top: 0x5A6A3A, topKind: "dress", bottom: 0x4A5A32, hair: 0x6A3A1A, hairStyle: "long", hat: "none" } }, k.x, k.z, { name: T.keeper, persona: "You are Melissa, a herb-woman of Aeaea, the island of the enchantress Circe (Homer's Odyssey, Books 10 and 12). You learned your herbs on her hillsides, but only the honest, everyday ones: thyme for a cough, mint for the stomach, sage and rosemary for the cook, and honey from your three straw hives. You sell herbs and honey and buy herbs, fennel and fruit. You never sell potions or anything to turn anyone into anything, and you say so with a smile. Never give medical advice beyond 'ask a doctor'. Keep it friendly and suitable for all ages.", greet: "Thyme, sage, mint, honey. Nothing that turns anyone into a pig, whatever you have heard." }, wmsFace(k.x, k.z, c.x, c.z));
wmsKeeperOffers(T.keeper, "wms_herbs", "The Herb Garden of Aeaea");
wmsTalk({ x: c.x, z: c.z, r: 2.6, name: T.name, verb: "trade", fn: wmsTrade("wms_herbs") });
},
function (G, p) {
var f = wmsFree(-6045, -5375, 5), x = f.x, z = f.z, S = new THREE.Group(), ry = wmsFace(x, z, p.land.x, p.land.z), y = wmsY(x, z, 3, 2.5), wood = wM(0x8A6A42);
var r = new THREE.Group();
r.position.set(x, y, z);
r.rotation.y = ry;
S.add(r);
for (var l = 0; l < 7; l++) {
var lg = wCyl(0.3, 0.32, 6, wood, -1.8 + l * 0.62, 0.35, 0, r, 8);
lg.rotation.x = Math.PI / 2;
}
[-1.8, 0, 1.8].forEach(function (o) { wBox(4.6, 0.12, 0.3, wM(0x6A4A2A), 0, 0.72, o, r); });
var mast = wCyl(0.12, 0.14, 4.4, wM(0x7A5A3A), 0, 2.9, 0, r, 6);
mast.rotation.z = 1.35;
mast.position.set(2.2, 0.9, 0.6);
var st = wmsFree(x + Math.sin(ry) * -4, z + Math.cos(ry) * -4, 1);
wCyl(0.5, 0.6, 0.7, wM(0x6A5A44), st.x, wmsY(st.x, st.z) + 0.35, st.z, S, 10);
var ax = wBox(0.08, 0.5, 0.08, wM(0x6A4A2A), st.x, wmsY(st.x, st.z) + 0.9, st.z, S);
ax.rotation.z = 0.4;
wBox(0.25, 0.18, 0.05, wM(0xB8864A), st.x + 0.1, wmsY(st.x, st.z) + 1.12, st.z, S);
for (var q = 0; q < 4; q++) {
var pl = wCyl(0.25, 0.28, 5, wood, x - Math.cos(ry) * 4.5, y + 0.25 + q * 0.45 * (q < 3 ? 1 : 0.5), z + Math.sin(ry) * 4.5 + (q % 3 - 1) * 0.5, S, 7);
pl.rotation.z = Math.PI / 2;
pl.rotation.y = ry;
}
wmsSolid({ x: x, z: z, hw: 2.4, hd: 3.2, rot: ry });
wmsSolid({ x: x - Math.cos(ry) * 4.5, z: z + Math.sin(ry) * 4.5, r: 1.4 });
landBake(G, S);
var s = wmsFree(x + Math.sin(ry) * 4.2, z + Math.cos(ry) * 4.2, 1.4);
wmsSign(G, ["The Raft Beach", "Build the Raft · a game", "📋 Raft builders hired"], s.x, s.z, ry);
wmsWorkMove("The Raft Beach of Ogygia", x, z);
wmsTalk({ x: s.x, z: s.z, r: 2.6, name: "The raft beach", verb: "build a raft (a game), or ask for work", fn: function () { hxKeeperCard({ name: "The raft beach of Ogygia" }, [["🪵 Build the Raft", "Put the work in the right order · a little gold once a day", function () { wmsGameCard("wms_g_raft"); }], ["📋 Work here", "Ogygia raft builder", wmsHire("The Raft Beach of Ogygia")]]); } });
hxWrapKeeper("sea", "Calypso", [["🪵 Build the Raft", "She gives you the tools, as she gave Odysseus · a game", function () { wmsGameCard("wms_g_raft"); }]]);
WMS_GAMES.wms_g_raft.at = [x, z];
},
function (G, p) {
var f = wmsFree(7600, -465, 4), x = f.x, z = f.z, S = new THREE.Group(), ry = wmsFace(x, z, p.land.x, p.land.z);
wmsCounter(S, x, z, ry, 0xC85A3A, [0xC87A3A, 0xE8E0D0, 0xF4F0EC, 0x8A8478, 0xD8C8A8]);
var c2 = wmsFree(x + Math.cos(ry) * 3, z - Math.sin(ry) * 3, 1.6);
wmsCounter(S, c2.x, c2.z, ry, 0x3A3A3A, [0xC8C8D0, 0xF4F0EC, 0xB8864A, 0xE8E0D0, 0xC85A3A]);
for (var j = 0; j < 2; j++)
wmsJar(S, x - Math.cos(ry) * 2.4, wmsY(x, z), z + Math.sin(ry) * 2.4 + j * 0.9, 0.9, 0xC8B898);
landBake(G, S);
var s = wmsFree(x + Math.sin(ry) * 2.6 + Math.cos(ry) * 1.5, z + Math.cos(ry) * 2.6, 1.4);
wmsSign(G, ["The Canal Market", "Copper, linen, oil", "Pearls and coral bought"], s.x, s.z, ry);
var T = WMS_STALLS.wms_canal;
T.x = x;
T.z = z;
var k = wmsFree(x - Math.sin(ry) * 1.3, z - Math.cos(ry) * 1.3, 1);
wmsKeeper(G, "wms_thyra", { sex: "f", look: GREEK(0x7AA8C8, 1) }, k.x, k.z, { name: T.keeper, persona: "You are Thyra, a merchant at the canal market of Atlantis, the ringed city Plato described in his dialogues Timaeus and Critias (around 360 BC): rings of land and water round the temple of Poseidon, joined to the sea by a great canal, walls of bronze, tin and orichalcum, buildings of white, black and red stone. You sell copper ore, linen and olive oil, and buy pearls, red coral and sponges for the city's craftsmen. If asked, you admit with a wink that most historians think Plato made Atlantis up to teach a lesson. Keep it friendly and suitable for all ages.", greet: "Up the canal and safe in harbour! Copper, linen, oil. Pearls? Coral? I pay the city's price." }, wmsFace(k.x, k.z, x, z));
wmsKeeperOffers(T.keeper, "wms_canal", null);
wmsTalk({ x: x, z: z, r: 2.6, name: T.name, verb: "trade", fn: wmsTrade("wms_canal") });
},
function (G, p) {
var f = wmsFree(5245, 6345, 4), x = f.x, z = f.z, S = new THREE.Group(), ry = wmsFace(x, z, p.land.x, p.land.z), y = wmsY(x, z, 2, 2), wood = wM(0x7A5A3A);
[[-1.8, -1.4], [1.8, -1.4], [-1.8, 1.4], [1.8, 1.4]].forEach(function (q) { wBox(0.18, 2.6, 0.18, wood, x + q[0], y + 1.3, z + q[1], S); });
var rf = wBox(4.2, 0.14, 3.4, wM(0xC8B070), x, y + 2.65, z, S);
rf.rotation.y = ry;
var tx = x + Math.sin(ry + 1.6) * 3.6, tz = z + Math.cos(ry + 1.6) * 3.6, ty = wmsY(tx, tz, 1.4, 0.4);
var tr = wBox(2.8, 0.6, 0.8, wM(0x9A9080), tx, ty + 0.3, tz, S);
tr.rotation.y = ry;
var tw = wBox(2.5, 0.04, 0.55, wM(0x5AA8C8), tx, ty + 0.58, tz, S);
tw.rotation.y = ry;
wmsSolid({ x: x, z: z, r: 2.4 });
wmsSolid({ x: tx, z: tz, hw: 1.4, hd: 0.4, rot: ry });
landBake(G, S);
var s = wmsFree(x + Math.sin(ry) * 3.6, z + Math.cos(ry) * 3.6, 1.4);
wmsSign(G, ["The Sun's Pastures", "Count the Herd · a game", "📋 Herd watchers hired"], s.x, s.z, ry);
wmsWorkMove("The Sun's Pastures", x, z);
wmsTalk({ x: s.x, z: s.z, r: 2.6, name: "The herders' post", verb: "count the herd (a game), or ask for work", fn: function () { hxKeeperCard({ name: "The herders' post on Thrinacia" }, [["🐄 Count the Herd", "Count truly for Lampetie · a little gold once a day", function () { wmsGameCard("wms_g_herd"); }], ["📋 Work here", "Thrinacia herd watcher", wmsHire("The Sun's Pastures")]]); } });
hxWrapKeeper("sea", "Lampetie", [["🐄 Count the Herd", "Help her count her father's cattle · a game", function () { wmsGameCard("wms_g_herd"); }], ["📋 Watch the herds", "Thrinacia herd watcher (work)", wmsHire("The Sun's Pastures")]]);
WMS_GAMES.wms_g_herd.at = [x, z];
},
function (G, p) {
var f = wmsFree(-6340, -2245, 3), x = f.x, z = f.z, S = new THREE.Group(), y = wmsY(x, z, 1.6, 1.6), wood = wM(0x6A4A2A);
[[-1.4, -1.4], [1.4, -1.4], [-1.4, 1.4], [1.4, 1.4]].forEach(function (q) { wBox(0.22, 5, 0.22, wood, x + q[0], y + 2.5, z + q[1], S); });
wBox(3.4, 0.2, 3.4, wM(0x7A5A3A), x, y + 5, z, S);
[[0, -1.65, 3.4, 0.1], [0, 1.65, 3.4, 0.1], [-1.65, 0, 0.1, 3.4], [1.65, 0, 0.1, 3.4]].forEach(function (r) { wBox(r[2], 0.9, r[3], wood, x + r[0], y + 5.5, z + r[1], S); });
var ld = wBox(0.6, 5.4, 0.1, wood, x + 1.7, y + 2.6, z + 1.8, S);
ld.rotation.x = 0.25;
wCyl(0.5, 0.35, 0.6, wM(0x3A3A3A), x, y + 5.4, z, S, 10);
wmsSolid({ x: x, z: z, hw: 1.6, hd: 1.6 });
landBake(G, S);
var gl = wGlow(0xFFB060, 2.2, 0.45);
gl.position.set(x, y + 6, z);
G.add(gl);
var s = wmsFree(x + 3, z + 2.5, 1.4);
wmsSign(G, ["The Watch on the Headland", "Ships: moor OUTSIDE", "📋 A lookout wanted"], s.x, s.z, Math.PI / 2);
wmsWorkMove("The Watch on the Headland", x, z);
wmsTalk({ x: x, z: z + 2.4, r: 2.6, name: "The headland lookout", verb: "ask for work", fn: function () { hxKeeperCard({ name: "The Watch on the Headland" }, [["📋 Work here", "Telepylus headland lookout: warn ships away from the giants' harbour", wmsHire("The Watch on the Headland")], ["🧭 Why a lookout?", "", function () { worldCard(worldFacts("The Watch on the Headland", "Telepylus", [], ["In the Odyssey (Book 10), the Laestrygonians smashed every ship that moored inside their harbour with boulders thrown from the cliffs. Only Odysseus, who tied up outside, got away.", "So the lookout watches for sails and warns them, with smoke by day and the brazier by night, to moor outside the harbour mouth."])); }]]); } });
},
function (G, p) {
var f = wmsFree(-4235, 6170, 4), x = f.x, z = f.z, S = new THREE.Group(), ry = wmsFace(x, z, p.land.x, p.land.z);
wmsHut(S, x, z, ry, 4, 3.4, 2.4, 0x6A6A68, 0x4A4440, ["cycladic", "The lamp store"]);
for (var j = 0; j < 4; j++)
wmsJar(S, x + Math.sin(ry) * 2.4 + Math.cos(ry) * (j - 1.5) * 0.9, wmsY(x, z), z + Math.cos(ry) * 2.4 - Math.sin(ry) * (j - 1.5) * 0.9, 0.8, 0xA89A80);
landBake(G, S);
var s = wmsFree(x + Math.sin(ry) * 4 + Math.cos(ry) * 2.4, z + Math.cos(ry) * 4, 1.4);
wmsSign(G, ["The Lamp Store", "Oil and wicks for the shore path", "📋 Lamplighters wanted"], s.x, s.z, ry);
wmsWorkMove("The Lamps of the Cimmerians", x, z);
wmsTalk({ x: x + Math.sin(ry) * 2.6, z: z + Math.cos(ry) * 2.6, r: 2.6, name: "The lamp store", verb: "ask for work", fn: function () { hxKeeperCard({ name: "The Lamps of the Cimmerians" }, [["📋 Work here", "Cimmerian lamplighter: keep the lamps on the shore path lit", wmsHire("The Lamps of the Cimmerians")], ["🧺 The willows", "Persephone's grove gives willow withies; the purser and the market of Lacedaemon buy them", function () { worldCard(null); var sp = HX_SPOTS.filter(function (r) { return r[0] === "wms_s_willow"; })[0]; if (sp)
hxGuideTo("sea", sp[3], sp[4], sp[8]); }]]); } });
hxWrapKeeper("sea", "A Cimmerian lamp-keeper", [["📋 Work with the lamps", "Cimmerian lamplighter", wmsHire("The Lamps of the Cimmerians")]]);
},
function (G, p) {
var f = wmsFree(2030, -335, 5), x = f.x, z = f.z, S = new THREE.Group(), ry = wmsFace(x, z, p.land.x, p.land.z);
wmsHut(S, x - Math.sin(ry) * 3, z - Math.cos(ry) * 3, ry, 6, 4, 3, 0xD8CCB0, 0xA8583A, ["cycladic", "Nestor's storehouse"]);
for (var j = 0; j < 4; j++)
wmsJar(S, x + Math.cos(ry) * (j - 1.5) * 1.2 - Math.sin(ry) * 0.4, wmsY(x, z), z - Math.sin(ry) * (j - 1.5) * 1.2 - Math.cos(ry) * 0.4, 1.4, 0xB8784A);
var c = wmsFree(x + Math.sin(ry) * 2.6, z + Math.cos(ry) * 2.6, 1.6);
var cg = wmsCounter(S, c.x, c.z, ry, 0x7A2A2A, [0xE8E6E0, 0xC8A040, 0xB8784A, 0xE8E6E0, 0xA87A4A]);
wBox(0.3, 0.04, 0.2, wM(0xA8946A), 0.4, 0.92, 0.1, cg);
wBox(0.3, 0.04, 0.2, wM(0xA8946A), 0.75, 0.92, 0.15, cg);
landBake(G, S);
var s = wmsFree(c.x + 2.6, c.z + 1, 1.4);
wmsSign(G, ["Nestor's Storehouse", "Salt, oil, leather", "Fish and salt bought"], s.x, s.z, ry);
var T = WMS_STALLS.wms_store;
T.x = c.x;
T.z = c.z;
var k = wmsFree(c.x - Math.sin(ry) * 1.3, c.z - Math.cos(ry) * 1.3, 1);
wmsKeeper(G, "wms_ereutha", { sex: "f", look: GREEK(0xE8D8B8, 1) }, k.x, k.z, { name: T.keeper, persona: "You are Ereutha, keeper of King Nestor's stores at sandy Pylos (Homer's Odyssey, Book 3). You keep oil in tall jars and note every jar, sheep and bale on a clay tablet. You sell salt, olive oil and leather and buy fish, tunny and salt for the king's table. You know (and love to tell) that archaeologists really found Nestor's palace at Pylos in 1939, with an archive of more than a thousand clay tablets in Linear B, the oldest written Greek, many of them lists of stores just like yours. Keep it friendly and suitable for all ages.", greet: "Welcome to Pylos. Salt, oil, leather. What you buy, I write down: everything here is written down." }, wmsFace(k.x, k.z, c.x, c.z));
wmsKeeperOffers(T.keeper, "wms_store", null);
wmsTalk({ x: c.x, z: c.z, r: 2.6, name: T.name, verb: "trade", fn: wmsTrade("wms_store") });
},
function (G, p) {
var f = wmsFree(-635, -4005, 5), x = f.x, z = f.z, S = new THREE.Group(), ry = wmsFace(x, z, p.land.x, p.land.z);
wmsCounter(S, x, z, ry, 0x7A4AA8, [0xE8E0D0, 0xC8A040, 0xF0E4C0, 0xD8B860, 0x8A6A9A]);
var c2 = wmsFree(x + Math.cos(ry) * 3.2, z - Math.sin(ry) * 3.2, 1.6);
wmsCounter(S, c2.x, c2.z, ry, 0x8A2A2A, [0x8A9A5A, 0xEDE6D6, 0xA8844A, 0x6A8A5A, 0xEDE6D6]);
for (var b = 0; b < 3; b++)
wCyl(0.32, 0.25, 0.4, wM(0xB8945A), x - Math.cos(ry) * (2.3 + b * 0.7), wmsY(x, z) + 0.2, z + Math.sin(ry) * (2.3 + b * 0.7), S, 10);
landBake(G, S);
var s = wmsFree(x + Math.sin(ry) * 2.8 + Math.cos(ry) * 1.6, z + Math.cos(ry) * 2.8, 1.4);
wmsSign(G, ["The Market of Lacedaemon", "Cloth, oil, cheese, meal", "Reeds and fleece bought · 📋 Porters"], s.x, s.z, ry);
var T = WMS_STALLS.wms_market;
T.x = x;
T.z = z;
wmsWorkMove("The Market of Lacedaemon", x, z);
var k = wmsFree(x - Math.sin(ry) * 1.3, z - Math.cos(ry) * 1.3, 1);
wmsKeeper(G, "wms_kleta", { sex: "f", look: GREEK(0x8A6A9A, 1) }, k.x, k.z, { name: T.keeper, persona: "You are Kleta, a market-woman of Lacedaemon (Sparta), below the shining hall of King Menelaus and Queen Helen (Homer's Odyssey, Book 4). You sell cloth, olive oil, cheese and barley meal, and buy reeds for mats, fleece for spinning, willow withies for baskets, and fruit and herbs. You are brisk, blunt and fair, as Spartans are said to be, and you know that later Spartan boys made their beds from reeds they pulled by hand from the river Eurotas. Keep it friendly and suitable for all ages.", greet: "Buy or sell, stranger, but do not dawdle. Cloth, oil, cheese, meal. Reeds? Fleece? I take them." }, wmsFace(k.x, k.z, x, z));
wmsKeeperOffers(T.keeper, "wms_market", "The Market of Lacedaemon");
wmsTalk({ x: x, z: z, r: 2.6, name: T.name, verb: "trade", fn: wmsTrade("wms_market") });
},
function (G, p) {
var f = wmsFree(1350, 6960, 6), x = f.x, z = f.z, S = new THREE.Group(), y = wmsY(x, z, 4, 2), ry = wmsFace(x, z, p.land.x, p.land.z);
var tg = new THREE.Group();
tg.position.set(x, y, z);
tg.rotation.y = ry;
S.add(tg);
wBox(8, 0.08, 4, wM(0x5A4030), 0, 0.05, 0, tg);
wBox(7.6, 0.06, 3.6, wM(0x4A3424), 0, 0.08, 0, tg);
for (var i = 0; i <= 4; i++)
wBox(0.03, 0.04, 4, wM(0xF0F0E8), -4 + i * 2, 0.14, 0, tg);
for (var j = 0; j <= 2; j++)
wBox(8, 0.04, 0.03, wM(0xF0F0E8), 0, 0.14, -2 + j * 2, tg);
[[-4, -2], [4, -2], [-4, 2], [4, 2], [0, -2], [0, 2]].forEach(function (q) { wBox(0.06, 0.5, 0.06, wM(0x8A6A42), q[0], 0.25, q[1], tg); });
var sp = wSph(1.8, wM(0x8A6A4A), 5.6, -0.5, 0.4, tg, 10);
sp.scale.set(1.2, 0.55, 1);
wCyl(0.25, 0.2, 0.35, wM(0x6A6A70), 3.6, 0.18, 2.6, tg, 8);
wCyl(0.25, 0.2, 0.35, wM(0x6A6A70), 4.2, 0.18, 2.5, tg, 8);
wmsSolid({ x: x + Math.sin(ry) * 0 + Math.cos(ry) * 5.6, z: z - Math.sin(ry) * 5.6, r: 1.8 });
WMS.taken.push([x, z, 4.5]);
var h = wmsFree(x - Math.cos(ry) * 7, z + Math.sin(ry) * 7, 2.6);
wmsHut(S, h.x, h.z, ry, 4, 3, 2.4, 0xC8B898, 0x8A6A42, ["cycladic", "The finds hut at Troy"]);
var c = wmsFree(h.x + Math.sin(ry) * 2.8, h.z + Math.cos(ry) * 2.8, 1.6);
wmsCounter(S, c.x, c.z, ry, 0x6A5A3A, [0xB8643A, 0xA85A32, 0xC8B898, 0xB8643A, 0xA85A32]);
landBake(G, S);
var s = wmsFree(x + Math.sin(ry) * 3.4, z + Math.cos(ry) * 3.4, 1.4);
wmsSign(G, ["The Dig at Troy", "Read the Layers · a game", "Finds hut · 📋 Diggers wanted"], s.x, s.z, ry);
var T = WMS_STALLS.wms_finds;
T.x = c.x;
T.z = c.z;
wmsWorkMove("The Dig at Troy", x, z);
var k = wmsFree(c.x - Math.sin(ry) * 1.3, c.z - Math.cos(ry) * 1.3, 1);
wmsKeeper(G, "wms_aster", { sex: "m", look: { top: 0xC8B898, topKind: "shirt", bottom: 0x6A5A42, hat: "cap", hatColor: 0xB8A878 } }, k.x, k.z, { name: T.keeper, persona: "You are Aster, the registrar of the dig below the walls of Troy on the Endless Sea. You record every find: wash it, number it, note its layer, draw it, and pack it for the museum. You pay a small finder's fee for potsherds brought in, and you never sell finds: a find out of its layer loses most of what it can tell us. You know the real Troy is the mound of Hisarlik in north-west Turkey, first dug by Heinrich Schliemann from 1870 (badly, by modern standards), with at least nine cities built one on another from about 3000 BC to Roman times. You run a game, Read the Layers. Keep it friendly and suitable for all ages.", greet: "Mind the strings! Every square has a number. Found a sherd? Bring it here and I'll record it, and pay you for your trouble." }, wmsFace(k.x, k.z, c.x, c.z));
wmsKeeperOffers(T.keeper, "wms_finds", "The Dig at Troy", [["🏺 Read the Layers", "Put Troy's cities in order, deepest first · a game", function () { wmsGameCard("wms_g_layers"); }]]);
wmsTalk({ x: c.x, z: c.z, r: 2.6, name: T.name, verb: "hand in finds", fn: wmsTrade("wms_finds") });
wmsTalk({ x: s.x, z: s.z, r: 2.4, name: "The dig's board", verb: "read the layers (a game), or ask for work", fn: function () { hxKeeperCard({ name: "The Dig at Troy" }, [["🏺 Read the Layers", "A game · a little gold once a day", function () { wmsGameCard("wms_g_layers"); }], ["📋 Work here", "Troy dig excavator, finds registrar", wmsHire("The Dig at Troy")]]); } });
WMS_GAMES.wms_g_layers.at = [x, z];
},
function (G, p) {
var f = wmsFree(-7760, 2650, 4), x = f.x, z = f.z, S = new THREE.Group(), y = wmsY(x, z, 2.4, 2.4), stone = wM(0xD8CCA0);
wCyl(2.2, 2.6, 5, stone, x, y + 2.5, z, S, 14);
wCyl(2.5, 2.5, 0.3, wM(0xB8AC88), x, y + 5.1, z, S, 14);
for (var i = 0; i < 8; i++) {
var a = i / 8 * Math.PI * 2;
var b = wBox(0.08, 1, 0.08, wM(0x3A3A3A), x + Math.cos(a) * 0.8, y + 5.7, z + Math.sin(a) * 0.8, S);
b.rotation.z = Math.cos(a) * 0.25;
b.rotation.x = -Math.sin(a) * 0.25;
}
wCyl(0.9, 0.6, 0.25, wM(0x3A3A3A), x, y + 5.4, z, S, 10);
var ld = wBox(0.6, 5.4, 0.1, wM(0x6A4A2A), x + 2.4, y + 2.6, z, S);
ld.rotation.z = -0.25;
ld.rotation.y = Math.PI / 2;
for (var w = 0; w < 5; w++) {
var lg = wCyl(0.14, 0.16, 1.6, wM(0xA8A090), x - 3.2, y + 0.15 + (w > 2 ? 0.3 : 0), z + (w % 3 - 1) * 0.35, S, 6);
lg.rotation.x = Math.PI / 2;
}
wmsSolid({ x: x, z: z, r: 2.7 });
landBake(G, S);
var gl = wGlow(0xFFB060, 4, 0.5);
gl.position.set(x, y + 6.4, z);
G.add(gl);
var s = wmsFree(x + 3.4, z + 3, 1.4);
wmsSign(G, ["The Beacon of Pharos", "Lit at dusk, fed all night", "📋 A keeper wanted"], s.x, s.z, wmsFace(s.x, s.z, p.land.x, p.land.z));
wmsWorkMove("The Beacon of Pharos", x, z);
wmsTalk({ x: s.x, z: s.z, r: 2.6, name: "The beacon", verb: "ask for work", fn: function () { hxKeeperCard({ name: "The Beacon of Pharos" }, [["📋 Work here", "Pharos beacon keeper", wmsHire("The Beacon of Pharos")], ["🤼 Hold the Old Man", "Proteus, by his cave, will let you try · a game", function () { wmsGameCard("wms_g_proteus"); }]]); } });
hxWrapKeeper("sea", "Proteus, the Old Man of the Sea", [["🤼 Hold the Old Man", "Hold on through every shape, as Menelaus did · a game", function () { wmsGameCard("wms_g_proteus"); }]]);
WMS_GAMES.wms_g_proteus.at = [p.x + 119, p.z + 43];
},
function (k, msg) {
var D = WMS_GAMES[k];
if (!D)
return;
var G = WMS.game && WMS.game.k === k ? WMS.game : null;
if (G && WMS_PLAY[k].card)
return WMS_PLAY[k].card(G, msg);
var h = wmsHead("🎲 " + esc(D[1])) + "<div style='opacity:.85;margin:4px 0'>" + WMS_PLAY[k].intro + "</div>";
h += "<div style='opacity:.8;margin:6px 0'>" + (wmsSigned() ? "Win: " + D[3] + " gold (once a day, for dreamers whose dues are paid) and " + esc(hxMat(D[4]).name.toLowerCase()) + " for your backpack." : "Sign in, and a win pays " + D[3] + " gold once a day, with a small reward for your backpack.") + wmsBestLine(k) + "</div>";
if (msg)
h += "<div style='margin:6px 0;color:#CFE8C0'>" + msg + "</div>";
var fns = { go: function () { wmsGameStart(k); } };
h += wmsBtn("go", "▶ Start", WMS_PLAY[k].start || "");
worldCard(h, fns);
},
function (k, line) {
var G = WMS.game;
WMS.game = null;
wmsTone(784, 0.18);
setTimeout(function () { wmsTone(988, 0.25); }, 180);
var D = WMS_GAMES[k], head = "<b>You won " + esc(D[1]) + "!</b> " + (line || "");
var show = function (m) { if (WMS_PLAY[k].onSea)
wmsSay(head + " " + m);
else
wmsGameCard(k, head + " " + m); };
if (!wmsSigned()) {
show("Sign in, and a win pays a little gold once a day.");
return;
}
show("…");
wmsRpc("wms_game_win", { p_key: k }).then(function (o) { HX.stockAt = 0; show(esc((o && o.say) || "")); if (typeof refreshStanding === "function")
try {
refreshStanding();
}
catch (e) { } })
.catch(function (e) { show(wmsMissing(e) ? "The prize opens soon." : esc((e && e.message) || String(e))); });
},
function (G, msg) {
var k = "wms_g_lotus", h = wmsHead("🧠 Remember the Hold"), fns = {};
if (G.phase === "look") {
h += "<div style='margin:6px 0'>Into the hold go:</div><div style='margin:6px 0;padding:8px;border:1px dashed #C9A868;border-radius:4px'>" + G.load.map(function (s) { return "📦 " + esc(s); }).join("<br>") + "</div><div style='opacity:.8'>" + Math.ceil(G.t) + " seconds…</div>";
}
else {
h += "<div style='margin:6px 0'>The scent of the lotus fades. What went into the hold? " + G.ok + " of 6 found · " + G.bad + " wrong</div>";
G.opts.forEach(function (s, i) { var p = G.picked[i]; h += wmsBtn("o" + i, (p === 1 ? "✓ " : p === -1 ? "✗ " : "") + esc(s), null); fns["o" + i] = function () { WMS_PLAY.wms_g_lotus.pick(G, i); }; });
}
if (msg)
h += "<div style='margin:6px 0;color:#CFE8C0'>" + msg + "</div>";
worldCard(h, fns);
},
function (G, i) {
if (G.picked[i])
return;
var good = G.load.indexOf(G.opts[i]) >= 0;
G.picked[i] = good ? 1 : -1;
if (good) {
G.ok++;
wmsTone(660, 0.08);
}
else {
G.bad++;
wmsTone(220, 0.12);
}
if (G.ok >= 6) {
wmsSetBest("wms_g_lotus", (6 - G.bad) + " of 6 with " + G.bad + " wrong");
return wmsGameWin("wms_g_lotus", "You remembered the hold, every thing in it.");
}
if (G.bad >= 2)
return wmsGameLose("wms_g_lotus", "The lotus won: you forgot. It was " + G.load.join(", ") + ".");
this.card(G);
},
function (G, msg) {
var h = wmsHead("🪵 Build the Raft") + "<div style='margin:6px 0'>Step " + (G.next + 1) + " of 8 · mistakes " + G.bad + " of 2</div>", fns = {}, me = this;
G.order.forEach(function (i) { if (i < G.next)
return; h += wmsBtn("s" + i, esc(me.steps[i]), null); fns["s" + i] = function () { me.pick(G, i); }; });
if (G.next)
h += "<div style='opacity:.75;font-size:12px;margin-top:6px'>Done: " + this.steps.slice(0, G.next).map(function (s) { return esc(s.split(":")[0].split(",")[0]); }).join(" · ") + "</div>";
if (msg)
h += "<div style='margin:6px 0;color:#CFE8C0'>" + msg + "</div>";
worldCard(h, fns);
},
function (G, i) {
if (i === G.next) {
G.next++;
wmsTone(600 + G.next * 30, 0.08);
if (G.next >= 8) {
wmsSetBest("wms_g_raft", G.bad + " mistakes");
return wmsGameWin("wms_g_raft", "Four days' work, and she floats. Homer says Odysseus did it in four days too.");
}
return this.card(G, "Right.");
}
G.bad++;
wmsTone(220, 0.12);
if (G.bad > 2)
return wmsGameLose("wms_g_raft", "Three wrong: the logs roll apart on the sand.");
this.card(G, "Not yet: something else comes first.");
},
function (G, msg) {
var h = wmsHead("🏐 Nausicaa's Ball") + "<div style='margin:6px 0'>Throw " + (G.n + 1) + " of 7 · caught " + G.ok + "</div>", fns = {}, me = this;
if (G.state === "fly") {
h += "<div style='margin:8px 0'>Up it goes… <i>wait for it.</i></div>" + wmsBtn("c", "Catch", null);
fns.c = function () { me.result(G, false, "Too soon: you grabbed at the air."); };
}
else if (G.state === "now") {
h += "<div style='margin:8px 0;color:#FFE7B0'><b>It's coming down to you!</b></div>" + wmsBtn("c", "🏐 Catch!", null);
fns.c = function () { me.result(G, true, "Caught! The maids laugh and clap."); };
}
if (msg)
h += "<div style='margin:6px 0;color:#CFE8C0'>" + msg + "</div>";
worldCard(h, fns);
},
function (G, ok, line) {
if (G.state === "done")
return;
G.n++;
if (ok) {
G.ok++;
wmsTone(660, 0.1);
}
else
wmsTone(240, 0.12);
if (G.ok >= 5) {
G.state = "done";
wmsSetBest("wms_g_ball", G.ok + " of " + G.n);
return wmsGameWin("wms_g_ball", "Nausicaa says you play ball like a Phaeacian.");
}
if (G.n - G.ok > 2) {
G.state = "done";
return wmsGameLose("wms_g_ball", line + " Three dropped.");
}
var me = this;
G.state = "wait";
this.card(G, line);
setTimeout(function () { if (WMS.game === G)
me.throwIt(G); }, 900);
},
function (G) {
var n = 30 + Math.floor(Math.random() * 21), s = 4 + Math.floor(Math.random() * 8), a = [], i;
for (i = 0; i < n; i++)
a.push("🐄");
for (i = 0; i < s; i++)
a.push("🐑");
G.field = wmsShuffle(a);
G.ans = n;
var o = [n, n + (Math.random() < 0.5 ? -1 : 1) * (1 + Math.floor(Math.random() * 3)), n + (Math.random() < 0.5 ? -1 : 1) * (4 + Math.floor(Math.random() * 4))];
G.opts = wmsShuffle(o);
this.card(G);
},
function (G, msg) {
var h = wmsHead("🐄 Count the Herd") + "<div style='margin:6px 0'>Meadow " + (G.round + 1) + " of 3. How many cattle (not sheep)?</div>", fns = {}, me = this;
h += "<div style='font-size:20px;line-height:1.35;letter-spacing:2px;word-break:break-all;margin:6px 0'>";
G.field.forEach(function (e, i) { h += e + ((i + 1) % 10 === 0 ? "<br>" : ""); });
h += "</div>";
G.opts.forEach(function (v, i) { h += wmsBtn("a" + i, v + " cattle", null); fns["a" + i] = function () { me.pick(G, v); }; });
if (msg)
h += "<div style='margin:6px 0;color:#CFE8C0'>" + msg + "</div>";
worldCard(h, fns);
},
function (G, v) {
if (v !== G.ans)
return wmsGameLose("wms_g_herd", "Not quite: there were " + G.ans + ". Lampetie counts them again, patiently.");
G.round++;
wmsTone(660, 0.1);
if (G.round >= 3) {
wmsSetBest("wms_g_herd", "three meadows");
return wmsGameWin("wms_g_herd", "Lampetie nods: every head counted, and not one harmed.");
}
this.next(G);
},
function (G, msg) {
var h = wmsHead("🏺 Read the Layers") + "<div style='margin:6px 0'>Next: layer " + (G.next + 1) + " from the bottom · mistakes " + G.bad + " of 1</div>", fns = {}, me = this;
G.order.forEach(function (i) { if (i < G.next)
return; h += wmsBtn("l" + i, esc(me.layers[i][1]), null); fns["l" + i] = function () { me.pick(G, i); }; });
if (G.next)
h += "<div style='opacity:.75;font-size:12px;margin-top:6px'>From the bottom: " + this.layers.slice(0, G.next).map(function (l) { return esc(l[0]); }).join(", ") + "</div>";
if (msg)
h += "<div style='margin:6px 0;color:#CFE8C0'>" + msg + "</div>";
worldCard(h, fns);
},
function (G, i) {
if (i === G.next) {
G.next++;
wmsTone(600 + G.next * 40, 0.08);
if (G.next >= 5) {
wmsSetBest("wms_g_layers", G.bad ? "one slip" : "perfect");
return wmsGameWin("wms_g_layers", "Read like an archaeologist: the deeper, the older.");
}
return this.card(G, "Right: " + esc(this.layers[i][0]) + ".");
}
G.bad++;
wmsTone(220, 0.12);
if (G.bad > 1)
return wmsGameLose("wms_g_layers", "Two out of order. Remember: what lies deeper was laid down first.");
this.card(G, "That one lies higher up.");
},
function (G, msg) {
var h = wmsHead("🤼 Hold the Old Man") + "<div style='margin:6px 0'>Shape " + (G.i + 1) + " of 6 · slips " + G.bad + " of 1</div>", fns = {}, me = this;
if (G.state === "wait") {
h += "<div style='margin:8px 0'>He lies still in your grip… <i>he is about to change.</i></div>" + wmsBtn("g", "Grip", null);
fns.g = function () { me.result(G, false, "Too soon: you loosened your hold to grip again, and he slid."); };
}
else if (G.state === "now") {
var s = this.shapes[G.i];
h += "<div style='margin:8px 0;font-size:30px'>" + s[0] + "</div><div style='color:#FFE7B0'><b>He is " + esc(s[1]) + "! Grip!</b></div>" + wmsBtn("g", "🤼 Grip!", null);
fns.g = function () { me.result(G, true, "You hold on."); };
}
if (msg)
h += "<div style='margin:6px 0;color:#CFE8C0'>" + msg + "</div>";
worldCard(h, fns);
},
function (G, ok, line) {
if (G.state === "done" || G.state === "pause")
return;
if (ok) {
G.i++;
wmsTone(640 + G.i * 30, 0.08);
}
else {
G.bad++;
wmsTone(220, 0.12);
}
if (G.i >= 6) {
G.state = "done";
wmsSetBest("wms_g_proteus", G.bad ? "one slip" : "no slips");
return wmsGameWin("wms_g_proteus", "He gives up, an old man again, and answers your question, as he answered Menelaus.");
}
if (G.bad > 1) {
G.state = "done";
return wmsGameLose("wms_g_proteus", line + " He is back in the sea.");
}
var me = this;
G.state = "pause";
this.card(G, line);
setTimeout(function () { if (WMS.game === G)
me.wait(G); }, 800);
},
function (G, dt) {
var r = SEA_BY.sirens, d = Math.hypot(SEA.sx - r.x, SEA.sz - r.z);
G.t -= dt;
G.min = Math.min(G.min, d);
if (!SEA.aboard)
return wmsGameLose("wms_g_sirens", "You went ashore.");
if (SEA.wax)
return wmsGameLose("wms_g_sirens", "You stopped your ears. Wise, but the passage is a test of nerve.");
if (d < 116)
return wmsGameLose("wms_g_sirens", "The keel grinds on the Sirens' rocks.");
if (G.min < 500 && d > 1200) {
wmsSetBest("wms_g_sirens", Math.round(G.min) + " m from the rocks", true);
return wmsGameWin("wms_g_sirens", "You heard the Sirens' song, and sailed on.");
}
if (G.t <= 0)
return wmsGameLose("wms_g_sirens", "Five minutes gone.");
G.say = (G.say || 0) - dt;
if (G.say <= 0) {
G.say = 0.5;
WMS.line = "<div>🎵 <b>The Sirens' Passage</b> · " + Math.round(d) + " m from the rocks · " + (G.min < 500 ? "now get 1,200 m clear" : "come within 500 m") + " · " + hxClock(G.t) + "</div>";
}
},
function (G, dt) {
var p = SEA_BY.strait, dz = SEA.sz - p.z, dx = SEA.sx - p.x;
G.t -= dt;
if (!SEA.aboard)
return wmsGameLose("wms_g_strait", "You went ashore.");
if (Math.hypot(SEA.sx - G.px, SEA.sz - G.pz) > 90)
return wmsGameLose("wms_g_strait", "Charybdis took you, and spat you out again.");
G.px = SEA.sx;
G.pz = SEA.sz;
if (Math.abs(dx) < 130 && Math.abs(dz) < p.r)
G.inside = true;
if (G.inside && dz * G.from < -(p.r + 20) && Math.abs(dx) < 300) {
wmsSetBest("wms_g_strait", hxClock(240 - G.t), true);
return wmsGameWin("wms_g_strait", "Through the strait, ship and crew whole.");
}
if (G.t <= 0)
return wmsGameLose("wms_g_strait", "Four minutes gone.");
G.say = (G.say || 0) - dt;
if (G.say <= 0) {
G.say = 0.5;
WMS.line = "<div>🌀 <b>Run the Strait</b> · " + (G.inside ? "in the strait: " + Math.round(p.r + 20 + dz * G.from) + " m to go" : "head into the strait") + " · " + hxClock(G.t) + "</div>";
}
},
function () {
var r = SEA_BY.sirens, d = Math.hypot(SEA.sx - r.x, SEA.sz - r.z);
if (d < 700 && d > 130 && SEA.wax && Math.abs(SEA.v) < 5)
return worldPrompt("<b>Red coral grows on these rocks</b> · <b>press E</b> to dive for it (your ears are stopped)", function () { wmsAboardGather("wms_s_coral"); });
var s = SEA_BY.strait, cx = s.x + 70, cd = Math.hypot(SEA.sx - cx, SEA.sz - s.z);
if (cd > 230 && cd < 520 && Math.abs(SEA.sx - s.x) < 240 && Math.abs(SEA.v) < 5)
return worldPrompt("<b>Timber floats here, spat out by Charybdis</b> · <b>press E</b> to haul it in", function () { wmsAboardGather("wms_s_flot"); });
if (d > 1200 && d < 2200 && !WMS.game)
return worldPrompt("<b>The Sirens' rocks lie ahead</b> · <b>press E</b> for the Sirens' Passage (a challenge)", function () { wmsGameCard("wms_g_sirens"); });
var dz = SEA.sz - s.z;
if (Math.abs(SEA.sx - s.x) < 300 && Math.abs(dz) > s.r + 40 && Math.abs(dz) < s.r + 700 && !WMS.game)
return worldPrompt("<b>The strait of Scylla and Charybdis</b> · <b>press E</b> for Run the Strait (a challenge)", function () { wmsGameCard("wms_g_strait"); });
},
function (id) {
if (Math.abs(SEA.v) > 5)
return wmsSay("<b>Shorten sail first</b> (S).");
var S = HX_SPOTS.filter(function (s) { return s[0] === id; })[0];
if (!S)
return;
if (!wmsSigned())
return wmsSay("Sign in, and what you bring up is kept in your backpack.");
if (HX.picked[id] > Date.now() && !hxKeeper())
return wmsSay("<b>" + esc(S[8]) + ".</b> You have had your share here for now. Worth another try in " + Math.ceil((HX.picked[id] - Date.now()) / 60000) + " minutes.");
wmsSay("<b>" + esc(S[8]) + "</b>: you " + esc(S[9]) + "…");
HX.busy = true;
setTimeout(function () { hxGive(id); }, 1200);
},
function (P, taken, cands, rad) {
for (var i = 0; i < cands.length; i++) {
var x = cands[i][0], z = cands[i][1];
if (Math.hypot(x, z) < 10)
continue;
if (z > 0 && Math.abs(x) < 4)
continue;
if (taken && !ldClear(taken, x, z, rad))
continue;
var hit = P.items.some(function (it) { if (it.x === undefined)
return false; var n = typeof ldNeed === "function" ? ldNeed(it) : 2; return Math.hypot(it.x - x, it.z - z) < n + rad; });
if (hit)
continue;
return [x, z];
}
return null;
},
function () {
var w = wmslHere(), fns = {}, h = wmsHead("🎓 World Learning: the hidden worlds", "#D8E8FF") + "<div style='opacity:.85;margin:4px 0 8px'>The Department of Education's lessons, each taught at a lectern beside what it is about. Both questions right for a stamp. " + wmslCount() + " of " + WMS_LESSONS.length + " stamped.</div>";
var hid = 0;
WMS_LESSONS.forEach(function (l) {
if (!wmslShown(l)) {
hid++;
return;
}
var here = l.at === w, nm = "l" + l.n;
h += worldBtn(nm, (wmslDone(l.n) ? "✓ " : "○ ") + l.n + ". " + esc(l.title), here ? "Here, in this world: show me the lectern" : "Taught in " + esc(WMS_HIDDEN_NAME[l.at]));
fns[nm] = function () { if (here)
wmslGuide(l);
else
wmsSay("<b>" + esc(l.title) + "</b> is taught at its lectern in " + esc(WMS_HIDDEN_NAME[l.at]) + "."); };
});
if (hid)
h += "<div style='opacity:.75;font-size:12px;margin-top:6px'>" + hid + " more lessons are taught in a hidden world of their own, for those who find their way there.</div>";
worldCard(h, fns);
},
function (l) {
if (!wmslShown(l))
return wmsLessonList();
if (WMSL.cur !== l.k) {
WMSL.cur = l.k;
WMSL.ans = {};
WMSL.msg = "";
WMSL.t0 = Date.now();
if (wmsSigned())
wmsRpc("school_begin", { p_course: WMS_COURSE, p_unit: l.n }).catch(function () { });
}
var fns = {}, b = "";
b += "<div style='opacity:.7;font-size:12px'>Lesson " + l.n + " of " + WMS_LESSONS.length + " · World Learning: the hidden worlds · the Department of Education" + (wmslDone(l.n) ? " · ✓ stamped" : "") + "</div>";
b += "<div style='margin:6px 0'><b>What is true.</b> " + esc(l.real) + "</div><div style='margin:6px 0'><b>How it works.</b> " + esc(l.science) + "</div>";
b += "<div style='margin:6px 0'><b>A word from here: " + esc(l.word[0]) + "</b>, " + esc(l.word[1]) + "</div>";
b += "<div style='margin:6px 0'><b>Try it.</b> " + esc(l.tryit) + "</div>";
b += "<div style='margin:10px 0 4px'><b>Two questions</b> for your stamp</div>";
l.quiz.forEach(function (q, k) {
b += "<div style='margin:6px 0 2px'>" + (k + 1) + ". " + esc(q[0]) + "</div>";
wmslOpt(l, k).forEach(function (o, j) {
var on = WMSL.ans[k] === o, nm = "q" + k + "_" + j;
b += "<div role='button' data-w='" + nm + "' style='margin:3px 0;padding:5px 9px;border-radius:4px;border:1px solid " + (on ? (o === q[1] ? "#7AD08A" : "#E07A6A") : "rgba(143,180,232,.4)") + ";background:" + (on ? (o === q[1] ? "rgba(122,208,138,.15)" : "rgba(224,122,106,.15)") : "transparent") + "'>" + esc(o) + (on ? (o === q[1] ? " ✓" : " ✗") : "") + "</div>";
fns[nm] = function () { WMSL.ans[k] = o; wmslCheck(l); wmsLessonCard(l); };
});
});
if (WMSL.msg)
b += "<div style='margin-top:8px;color:#FFE7B0'>" + WMSL.msg + "</div>";
b += worldBtn("all", "🎓 Every lesson", "your record: " + wmslCount() + " of " + WMS_LESSONS.length + " stamped");
fns.all = wmsLessonList;
worldCard(wmsHead("🎓 " + esc(l.title), "#D8E8FF") + b, fns);
},
function (l) {
if (wmslDone(l.n))
return;
if (!l.quiz.every(function (q, k) { return WMSL.ans[k] === q[1]; }))
return;
var L = wmslLog();
L[l.n] = new Date().toISOString();
if (typeof save === "function")
try {
save();
}
catch (e) { }
var n = wmslCount();
WMSL.msg = "Stamped: " + esc(l.title) + ". " + n + " of " + WMS_LESSONS.length + "." + (n === WMS_LESSONS.length ? " <b>The whole course is done.</b>" : "");
wmsSay("<b>World Learning stamp</b> (" + n + " of " + WMS_LESSONS.length + "): " + esc(l.title) + ".");
if (wmsSigned()) {
var wait = Math.max(0, 21000 - (Date.now() - WMSL.t0));
setTimeout(function () { wmsRpc("school_pass", { p_course: WMS_COURSE, p_unit: l.n }).catch(function (e) { if (wmsMissing(e))
wmsSay("Your stamp is kept on this device. The school's record opens soon."); }); }, wait);
}
},
function (w, x, z) {
var W = typeof WORLDS !== "undefined" ? WORLDS[w] : null, list = hxTalkers(w) || [];
function ok(cx, cz) {
var h = hxGround(w, cx, cz);
if (w === "underdark" && h < -50)
return false;
if (w === "neverland" && h < 0.3)
return false;
if (W && W.block) {
for (var i = 0; i < 5; i++) {
var q = [[0, 0], [1.2, 0], [-1.2, 0], [0, 1.2], [0, -1.2]][i];
try {
if (W.block(cx + q[0], cz + q[1], h + 0.2))
return false;
}
catch (e) { }
}
}
for (var j = 0; j < list.length; j++) {
var T = list[j], tx = T.p ? T.p.g.position.x : T.x, tz = T.p ? T.p.g.position.z : T.z;
if (tx !== undefined && Math.hypot(cx - tx, cz - tz) < 3)
return false;
}
for (var k = 0; k < HX.spots.length; k++)
if (HX.spots[k].world === w && Math.hypot(cx - HX.spots[k].x, cz - HX.spots[k].z) < 3)
return false;
var dh = Math.abs(hxGround(w, cx + 1, cz) - h) + Math.abs(hxGround(w, cx, cz + 1) - h);
return dh < 0.9;
}
for (var d = 0; d <= 30; d += 2)
for (var a = 0; a < (d ? 12 : 1); a++) {
var cx = x + Math.cos(a * 0.5236) * d, cz = z + Math.sin(a * 0.5236) * d;
if (ok(cx, cz))
return [cx, cz];
}
return [x, z];
},
function (G, w, l, x, z) {
var y = hxGround(w, x, z), g = new THREE.Group(), wood = wM(w === "northpole" ? 0x7A5A3A : w === "underdark" ? 0x4A4038 : 0x6A4A2A);
wCyl(0.32, 0.4, 0.12, wM(0x6A6258), 0, 0.06, 0, g, 10);
wBox(0.16, 1.05, 0.16, wood, 0, 0.58, 0, g);
var top = wBox(0.8, 0.06, 0.56, wood, 0, 1.16, 0, g);
top.rotation.x = 0.42;
var s = wSign(["World Learning", l.title], 0.72, 0.46, "#F4EEDC", "#2A3A5A");
s.position.set(0, 1.2, 0.015);
s.rotation.x = -(Math.PI / 2 - 0.42);
g.add(s);
g.position.set(x, y, z);
g.rotation.y = (x * 0.13 + z * 0.07) % 6.28;
G.add(g);
if (w === "underdark") {
var gl = wGlow(0xFFD8A0, 1.6, 0.35);
gl.position.set(x, y + 1.7, z);
G.add(gl);
}
return g;
},
function (w, G) {
if (WMSL.built[w])
return;
var mine = WMS_LESSONS.filter(function (l) { return l.at === w; });
if (!mine.length)
return;
WMSL.built[w] = 1;
var list = hxTalkers(w);
if (!list)
return;
mine.forEach(function (l) {
var p = wmslFree(w, l.near[0], l.near[1]);
WMSL.at[l.k] = p;
try {
wmslLectern(G, w, l, p[0], p[1]);
}
catch (e) {
if (window.console)
console.warn("[world-more 20] lectern", e);
}
list.push({ x: p[0], z: p[1], r: 2.6, name: "World Learning: " + l.title, verb: "read the lesson", fn: function () { wmsLessonCard(l); } });
});
},
function (S, lines, x, z, y, rot, solids, w, h) {
w = w || 3.2;
h = h || 1.2;
var g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = rot || 0;
S.add(g);
var pm = wM(0x8A8E96);
[-1, 1].forEach(function (s) { wBox(0.12, h + 1, 0.12, pm, s * (w / 2 - 0.2), (h + 1) / 2, 0, g); });
var b = wSign(lines, w, h, "#0E1A2E", "#BFD8FF");
b.position.set(0, 1 + h / 2, 0.08);
g.add(b);
if (solids)
solids.push({ x: x, z: z, hw: w / 2, hd: 0.25, rot: rot || 0 });
return g;
},
function (S, look, x, y, z, R) {
if (look !== "regolith" && look !== "ilmenite" && look !== "anorth" && look !== "clay" && look !== "bin")
return wmpNodeLook0.apply(this, arguments);
var g = new THREE.Group(), i;
g.position.set(x, y, z);
if (look === "regolith") {
var pt = wMesh(new THREE.CircleGeometry(1.8, 14), wM(0x77736C), 0, 0.03, 0, g);
pt.rotation.x = -Math.PI / 2;
for (i = 0; i < 3; i++)
wSph(0.3 + R() * 0.2, wM(0x8A867E), (R() - 0.5) * 1.8, 0.1, (R() - 0.5) * 1.8, g, 6);
wCyl(0.03, 0.03, 1.2, wM(0xC8C8C8), 1.4, 0.6, 0, g, 4);
wBox(0.4, 0.25, 0.02, wB(0xD8A040), 1.6, 1.1, 0, g);
}
else if (look === "ilmenite") {
var m = wM(0x16161A, { e: 0x0A0A12 });
for (i = 0; i < 5; i++) {
var r = wMesh(new THREE.OctahedronGeometry(0.22 + R() * 0.25, 0), m, (R() - 0.5) * 1.8, 0.15, (R() - 0.5) * 1.8, g);
r.rotation.set(R() * 3, R() * 3, 0);
}
var pa = wMesh(new THREE.CircleGeometry(1.5, 12), wM(0x2A2A2C), 0, 0.03, 0, g);
pa.rotation.x = -Math.PI / 2;
wCyl(0.03, 0.03, 1.2, wM(0xC8C8C8), 1.3, 0.6, 0.3, g, 4);
wBox(0.4, 0.25, 0.02, wB(0xD8A040), 1.5, 1.1, 0.3, g);
}
else if (look === "anorth") {
var am = wM(0xC8C6C0);
for (i = 0; i < 3; i++) {
var b = wMesh(new THREE.DodecahedronGeometry(0.4 + R() * 0.4, 0), am, (R() - 0.5) * 1.6, 0.3, (R() - 0.5) * 1.6, g);
b.rotation.set(R() * 3, R() * 3, 0);
b.scale.y = 0.7;
}
}
else if (look === "clay") {
var cl = wMesh(new THREE.CircleGeometry(2, 14), wM(0xA8705A), 0, 0.03, 0, g);
cl.rotation.x = -Math.PI / 2;
for (i = 0; i < 4; i++) {
var sl = wBox(0.9 + R() * 0.6, 0.12, 0.6, wM(i % 2 ? 0xB8846A : 0x9A5E48), (R() - 0.5) * 1.6, 0.08 + i * 0.05, (R() - 0.5) * 1.6, g);
sl.rotation.y = R() * 3;
}
wCyl(0.03, 0.03, 1.2, wM(0xC8C8C8), 1.6, 0.6, 0, g, 4);
wBox(0.4, 0.25, 0.02, wB(0x6AC8E8), 1.8, 1.1, 0, g);
}
else if (look === "bin") {
wBox(1.4, 1.0, 1.0, wM(0x5A6474), 0, 0.5, 0, g);
wBox(1.44, 0.1, 1.04, wM(0x3A8A6A), 0, 1.05, 0, g);
wBox(0.8, 0.25, 0.02, wB(0xE8E0C8), 0, 0.75, 0.51, g);
}
S.add(g);
return g;
},
function (id, place) {
if (place === "moon") {
if (id === "ops")
return ["OUTPOST STATUS", "seals good · power good · oxygen plant running", "Tranquillity Outpost · Space Corp"];
if (id === "icelab")
return ["POLAR ICE", "cores from craters the Sun never reaches", "handle with gloves: −230 °C"];
if (id === "mess")
return ["TODAY'S MENU", "ration stew · greenhouse salad · hot tea", "ask the cook"];
if (id === "power")
return ["DANGER", "authorised crew only", "solar arrays and fuel cells"];
}
if (place === "mars") {
if (id === "ops")
return ["DUST WATCH", "storm risk: watch the sky to the south", "Jezero Settlement · Space Corp"];
if (id === "workshop")
return ["WASH BEFORE YOU GROW", "perchlorate out · safe soil in", "test every batch"];
if (id === "mess")
return ["TODAY'S MENU", "potato stew · greenhouse salad · tea", "grown here, in washed soil"];
if (id === "power")
return ["DANGER", "authorised crew only", "the settlement's batteries"];
}
return wmpPoster0.apply(this, arguments);
},
function (S, L) {
var gr = function (x, z) { return sfHeight(x, z); }, P = OW_PLACES.moon, C = P.chal, lane = C.lane, sol = SF.solids;
var run = wM(0x4A4844), land = wM(0x6E6A64);
for (var x = 10; x < C.board; x += 2.5)
wBox(2.5, 0.06, 2.4, run, x + 1.25, gr(x + 1.25, lane) + 0.03, lane, S);
wBox(0.3, 0.08, 2.6, wM(0xD8D4C8), C.board, gr(C.board, lane) + 0.05, lane, S);
for (var x2 = C.board + 0.2; x2 < C.board + 120; x2 += 4)
wBox(4, 0.04, 0.12, land, x2 + 2, gr(x2 + 2, lane - 3) + 0.03, lane - 3, S);
for (var i = 1; i <= 12; i++) {
var mx = C.board + i * 10, my = gr(mx, lane + 3.4);
wBox(0.1, 1.1, 0.1, wM(0x8A8E96), mx, my + 0.55, lane + 3.4, S);
var t = wSign([i * 10 + " m"], 0.8, 0.45, "#0E1A2E", "#E8C27A");
t.position.set(mx, my + 1.3, lane + 3.4);
t.rotation.y = Math.PI;
S.add(t);
}
wmpBoard(S, ["THE LONG JUMP", "run up · jump before the white board", "a sixth of Earth's gravity: see how far you fly"], 2, lane - 2, gr(2, lane - 2), Math.PI, sol, 3.4, 1.3);
owChalBoard(S, "moon", 4, 32, gr, Math.PI);
owPiece(S, "rover", 109, gr(109, -19.5), -19.5, Math.PI / 2, 1.6, sol);
wmpBoard(S, ["POLAR ICE", "cored near the south pole · brought up by crawler", "help unload: press E at a hopper"], 104, -8, gr(104, -8), -Math.PI / 2, sol, 3.4, 1.2);
wmpBoard(S, ["THE REGOLITH FIELD", "the sea floor: scoop and seal", "Apollo 11's site is protected: keep away"], 15, -43, gr(15, -43), 0, sol);
wmpBoard(S, ["ILMENITE SANDS", "black iron-titanium sand", "oxygen is locked inside it"], -76, -10, gr(-76, -10), Math.PI / 2, sol);
wmpBoard(S, ["HIGHLAND ROCKS", "pale anorthosite, thrown here by old impacts", "more than 4 billion years old"], -78, -128, gr(-78, -128), 0.8, sol);
wmpBoard(S, ["TRANQUILLITY OUTPOST", "work · trade · gather · the Long Jump · lessons · homes", "press E: what to do here"], 20, -2, gr(20, -2), -Math.PI / 2, sol, 3.6, 1.3);
owSpot(20, -2, 3, "🧭 <b>What to do on the Moon</b> · work, trade, gather, play, learn, live", function () { wmpHub(); });
},
function (S, L) {
var gr = function (x, z) { return sfHeight(x, z); }, P = OW_PLACES.mars, C = P.chal, sol = SF.solids;
wBox(28, 0.15, 6, wM(0x5A4A44), -70, gr(-70, -40) + 0.08, -40, S);
wCyl(0.18, 0.18, 7, wM(0x8A8E96), -70, gr(-70, -36) + 0.5, -36.5, S, 8).rotation.x = Math.PI / 2;
wmpBoard(S, ["THE OXYGEN PLANT", "oxygen split from the carbon dioxide air", "as MOXIE first did, in 2021"], -85, -38, gr(-85, -38), 0, sol, 3.4, 1.2);
owPiece(S, "rover", -102, gr(-102, -19.5), -19.5, -Math.PI / 2, 1.6, sol);
wmpBoard(S, ["SCARP ICE", "from the northern slopes · by convoy", "help unload: press E at a hopper"], -97, -8, gr(-97, -8), Math.PI / 2, sol, 3.4, 1.2);
C.beacons.slice(0, 4).forEach(function (q, i) {
var y = gr(q[0], q[1]), g = new THREE.Group();
g.position.set(q[0], y, q[1]);
S.add(g);
[0, 1, 2].forEach(function (j) { var a = j / 3 * Math.PI * 2, l = wCyl(0.03, 0.03, 0.7, wM(0x8A8E96), Math.cos(a) * 0.25, 0.3, Math.sin(a) * 0.25, g, 4); l.rotation.z = Math.cos(a) * 0.3; l.rotation.x = -Math.sin(a) * 0.3; });
var tb = wCyl(0.07, 0.07, 0.6, wM(0xD8D8D0), 0, 0.85, 0, g, 8);
tb.rotation.z = 1.2;
wCyl(0.025, 0.025, 1.6, wM(0xC8C8C8), 0.7, 0.8, 0, g, 4);
var fl = wBox(0.5, 0.3, 0.02, wB(0xE07A50), 0.95, 1.45, 0, g);
var t = wSign(["Depot site " + (i + 1)], 1.2, 0.4, "#2A0E08", "#FFD0B0");
t.position.set(0, 1.6, 0);
g.add(t);
});
owChalBoard(S, "mars", -44, -12, gr, -Math.PI / 2);
wmpBoard(S, ["THE OLD DELTA", "clay laid down in a lake, 3.5 billion years ago", "dig gently: it is evidence"], 38, 42, gr(38, 42), -Math.PI / 2, sol);
wmpBoard(S, ["BASALT FIELD", "dark volcanic rock", "its iron rusts to the red dust"], -126, 20, gr(-126, 20), Math.PI / 2, sol);
wmpBoard(S, ["JEZERO SETTLEMENT", "work · trade · gather · the Sample Return · lessons · homes", "press E: what to do here"], -22, -4, gr(-22, -4), Math.PI / 2, sol, 3.6, 1.3);
owSpot(-22, -4, 3, "🧭 <b>What to do on Mars</b> · work, trade, gather, play, learn, live", function () { wmpHub(); });
},
function (k) {
var r = wmpSfBuild0.apply(this, arguments);
try {
if ((k === "moon" || k === "mars") && OW.k === k) {
var G = WORLDS.surface.g, S = new THREE.Group();
if (k === "moon")
wmpMoonExtras(S, OW.G);
else
wmpMarsExtras(S, OW.G);
wmpLessonSpots(k);
G.add(typeof ldPress === "function" ? ldPress(S) : S);
}
}
catch (e) {
if (window.console)
console.warn("[world-more near]", k, e);
}
return r;
},
function (G) {
var S = new THREE.Group(), L = new THREE.Group(), A = { g: new THREE.Group(), solids: [], crew: [], nodes: [], spots: [] };
A.g.add(S);
A.g.add(L);
G.add(A.g);
var sol = A.solids, blue = wM(0x3A6AB8), grey = wM(0x5A6474);
wBox(4.4, 1.1, 0.9, grey, 8, 0.55, -3.1, S);
wBox(4.6, 0.08, 1.1, wM(0xC8CCD4), 8, 1.14, -3.1, S);
wBox(4.4, 0.12, 0.05, blue, 8, 0.9, -2.62, S);
owPiece(S, "shopshelf", 6.2, 0, -5.9, 0, 1, sol);
owPiece(S, "shopshelf", 9.8, 0, -5.9, 0, 1, sol);
owPiece(S, "vendingmachine", 12.4, 0, -5.6, 0, 1, sol);
wmpSign(S, ["THE AURORA COMMISSARY", "buys and sells · press E at the counter"], 8, 2.6, -6.4, 0, 3.2, 0.9);
sol.push({ x: 8, z: -3.1, hw: 2.2, hd: 0.45 });
wBox(1.6, 1.4, 1.2, wM(0x6A707C), 15.4, 0.7, -2.2, S);
wBox(1.2, 0.06, 0.8, wM(0x3A3E46), 15.4, 1.43, -2.2, S);
wBox(1.2, 2.6, 1.4, wM(0xC8CCD4), 25.7, 1.3, -1.8, S);
wBox(0.05, 1.8, 1.0, wM(0x2A3440), 25.08, 1.4, -1.8, S);
[0, 1, 2].forEach(function (i) { wBox(0.04, 0.08, 0.3, wB(i === 1 ? 0x6AC8FF : 0x5AE07A, { fog: false }), 25.05, 2.2 - i * 0.3, -1.8, S); });
wmpSign(S, ["RECYCLING BAY", "water · air · scrap: nothing aboard is wasted"], 21, 2.9, -4.4, 0, 3.4, 0.9);
sol.push({ x: 15.4, z: -2.2, hw: 0.8, hd: 0.6 }, { x: 25.7, z: -1.8, hw: 0.6, hd: 0.7 });
wmpSign(S, ["HYDROPONIC BEDS", "mizuna and chile peppers · pick what is ready"], -26.6, 2.6, -10.5, Math.PI / 2, 3.2, 0.9);
var bd = new THREE.Group();
bd.position.set(-4, 0, 24);
bd.rotation.y = Math.PI;
S.add(bd);
[-1, 1].forEach(function (s) { wBox(0.12, 2.2, 0.12, wM(0x8A8E96), s * 1.5, 1.1, 0, bd); });
var bs = wSign(["STATION AURORA", "work · trade · gather · games · lessons · cabins", "press E: what to do here"], 3.4, 1.3, "#0E1A2E", "#BFD8FF");
bs.position.set(0, 1.75, 0.08);
bd.add(bs);
sol.push({ x: -4, z: 24, hw: 1.7, hd: 0.25 });
var P = OW_PLACES.aurora, R = wRand(4242);
P.gather.forEach(function (spec) {
spec.spots.forEach(function (q, i) {
var g = null, y = 1.7;
if (spec.look === "bin") {
g = owNodeLook(S, "bin", q[0], 0, q[1], R);
sol.push({ x: q[0], z: q[1], hw: 0.75, hd: 0.55 });
y = 1.6;
}
var gl = wGlow(spec.look === "bin" ? 0x9AD8FF : 0x9AF0C8, 2.4, 0.3);
gl.position.set(q[0], y, q[1]);
L.add(gl);
A.nodes.push({ id: "aurora-" + spec.k + "-" + i, k: spec.k, x: q[0], z: q[1], g: g, glow: gl, look: spec.look, place: "aurora", label: spec.look === "bin" ? "A recycling bin" : "A hydroponic bed" });
});
});
var keep = OW.crew;
OW.crew = [];
WMP_AUR_CREW.forEach(function (c) { owCrewAdd(L, c, "aurora", function () { return 0; }); });
A.crew = OW.crew;
OW.crew = keep;
var sp = function (x, z, r, label, fn, opt) { var s = { x: x, z: z, r: r, label: label, fn: fn }; if (opt)
Object.keys(opt).forEach(function (k) { s[k] = opt[k]; }); A.spots.push(s); };
sp(8, -1.4, 2.4, "🛒 <b>The Aurora Commissary</b> · buy, sell and refine", function () { owTradeCard("aurora"); });
sp(-4, 22, 2.6, "🧭 <b>What to do on Station Aurora</b> · work, trade, gather, play, learn, live", function () { wmpHub(); });
WMP_LESSONS.forEach(function (l) {
if (l.w !== "aurora")
return;
var s = P.spots[l.at];
if (!s)
return;
sp(s[0], s[1], s[2], "🎓 <b>" + esc(l.title) + "</b> · a World Learning lesson", function () { wmpLessonCard(l); }, { lesson: l.k });
});
if (typeof ldPress === "function") {
A.g.remove(S);
A.g.add(ldPress(S));
}
WMP.aur = A;
},
function (on) {
if (!WMP_OK || !WORLDS.station || !WORLDS.station.g)
return;
if (on && !WMP.aur)
try {
wmpAurBuild(WORLDS.station.g);
}
catch (e) {
if (window.console)
console.warn("[world-more aurora]", e);
}
var A = WMP.aur;
if (!A)
return;
A.g.visible = on;
A.solids.forEach(function (s) { var i = STN.solids.indexOf(s); if (on && i < 0)
STN.solids.push(s); if (!on && i >= 0)
STN.solids.splice(i, 1); });
if (on) {
owReset("aurora");
OW.G = A.g;
OW.crew = A.crew.slice();
OW.nodes = A.nodes;
OW.spots = A.spots.slice();
}
else if (OW.k === "aurora")
owReset(null);
},
function () {
var G = WORLDS.space && WORLDS.space.g;
if (!G)
return null;
var X = { g: new THREE.Group(), claims: [], buoy: null };
G.add(X.g);
var metal = wM(0xA8A296, { e: 0x1A1814 }), carbon = wM(0x34302C), mast = wM(0xC8CCD4);
WMP_CLAIMS.forEach(function (c, i) {
var p = new THREE.Vector3(Math.cos(c[0]) * c[1], c[2], Math.sin(c[0]) * c[1]), metalOne = c[3] === "ow_sp_nife";
var g = new THREE.Group();
g.position.copy(p);
X.g.add(g);
var rock = wMesh(new THREE.DodecahedronGeometry(16, 1), metalOne ? metal : carbon, 0, 0, 0, g);
rock.scale.set(1, 0.72, 0.9);
rock.rotation.set(i, i * 2, 0);
wCyl(0.5, 0.5, 14, mast, 0, 16, 0, g, 6);
var lamp = wSph(1.2, wB(metalOne ? 0xE8C27A : 0x8FD8FF, { fog: false }), 0, 23.5, 0, g, 10);
var gl = wGlow(metalOne ? 0xE8C27A : 0x8FD8FF, 70, 0.45);
gl.position.set(0, 23.5, 0);
g.add(gl);
X.claims.push({ i: i, pos: p, k: c[3], g: g, node: { id: "space-claim-" + (i + 1), k: c[3], x: 0, z: 0, label: "Claim " + (i + 1) + ": " + (metalOne ? "a metal asteroid" : "a carbon-rich asteroid"), place: "space" } });
});
var bu = new THREE.Group();
X.g.add(bu);
wSph(3, wM(0xE8C27A, { e: 0x4A3A10 }), 0, 0, 0, bu, 14);
wMesh(new THREE.TorusGeometry(6, 0.5, 8, 28), wM(0x3A6AB8), 0, 0, 0, bu).rotation.x = Math.PI / 2;
var bg = wGlow(0xE8C27A, 40, 0.5);
bu.add(bg);
X.buoy = bu;
return X;
},
function () {
var X = WMP.space;
if (!X)
return null;
var best = null, bd = 1e9;
X.claims.forEach(function (c) { var d = SP.pos.distanceTo(c.pos); if (d < 80 && d < bd) {
bd = d;
best = { kind: "claim", c: c };
} });
if (SP.comet) {
var cp = SP.comet.position, dc = SP.pos.distanceTo(cp);
if (dc < 140 && dc < bd) {
bd = dc;
best = { kind: "comet" };
}
}
var b = wmpBuoyPos();
if (b) {
var db = SP.pos.distanceTo(b);
if (db < 70 && db < bd) {
bd = db;
best = { kind: "buoy" };
}
}
return best;
},
function (c, msg) {
var g = OW_GOOD[c.k], fns = {}, h = owTitle("⛏️ " + esc(c.node.label), "#FFE7B0");
h += "<div style='opacity:.85;margin:4px 0'>A Space Corp mining claim in the asteroid belt. Your ship's arm anchors to the rock and cuts out a load; it goes to your backpack. " + (c.k === "ow_sp_nife" ? "This one is mostly metal: nickel and iron." : "This one is dark and crumbly, rich in carbon and water-bearing clay; now and then a nugget of metal comes with it.") + "</div>";
if (msg)
h += "<div style='margin:6px 0;color:#FFE7B0'>" + msg + "</div>";
h += owBtn("mine", (g ? g.e : "⛏️") + " Mine it", "worth " + (g ? g.b : "?") + " gold each to the city; Pip-Tullik pays a quarter more");
fns.mine = function () { worldCard(null); owGather(c.node); };
h += owBtn("learn", "🎓 The asteroid belt", "World Learning: The Moon, Mars and Orbit");
fns.learn = function () { wmpLessonCard(WMP_LESSON.sp_belt); };
h += owBtn("todo", "🧭 What to do in open space", "");
fns.todo = function () { wmpHub(); };
worldCard(h, fns);
},
function () {
var g = OW_GOOD.ow_sp_comet, fns = {}, h = owTitle("☄️ The comet", "#BFD8FF");
h += "<div style='opacity:.85;margin:4px 0'>Its nucleus is a lump of dark ice a few kilometres across, its tail blown away from the Sun. Keep your ship alongside and the scoop takes in ice for your backpack.</div>";
h += owBtn("take", g.e + " Collect comet ice", "worth " + g.b + " gold each to the city; melt it to water at a trade post");
fns.take = function () { worldCard(null); owGather(WMP_COMET_NODE); };
h += owBtn("learn", "🎓 Dirty snowballs", "World Learning: The Moon, Mars and Orbit");
fns.learn = function () { wmpLessonCard(WMP_LESSON.sp_comet); };
worldCard(h, fns);
},
function (msg) {
var R = WMP_RACE, best = owBestGet(R.k), fns = {}, on = !!WMP.race;
var h = owTitle("🏁 " + esc(R.name)) + "<div style='margin:6px 0'>" + esc(R.about) + "</div>";
h += "<div style='opacity:.8;font-size:12.5px'>Against the clock. Your best: " + (best == null ? "none yet" : owSecs(best)) + ". Finish it and, once a day, the Space Corp pays 20 gold and " + esc(owGoodName(R.reward).toLowerCase()) + " (for those who pay their dues).</div>";
if (msg)
h += "<div style='margin:8px 0;color:#FFE7B0'>" + msg + "</div>";
if (on) {
h += owBtn("stop", "Stop the run", "");
fns.stop = function () { wmpRaceStop(); worldCard(null); setStatus("The Ring Run: stopped."); };
}
else {
h += owBtn("go", "Start", "the clock starts now: the first ring is just ahead");
fns.go = function () { worldCard(null); wmpRaceStart(); };
}
if (wmpSigned()) {
h += owBtn("top", "🏆 The best so far", "on the Ring Run");
fns.top = function () { owChalTop("space", { k: R.k, kind: "heat", name: R.name }); };
}
worldCard(h, fns);
},
function () {
var G = WORLDS.space && WORLDS.space.g;
if (!G || !wmpRaseBase())
return;
wmpRaceStop();
var X = { t: 0, i: 0, rings: [], prev: SP.pos.clone() };
WMP_RING_PTS.forEach(function (q, i) {
var p = wmpRingPos(i), nx = i + 1 < WMP_RING_PTS.length ? wmpRingPos(i + 1) : wmpBuoyPos();
var m = new THREE.Mesh(new THREE.TorusGeometry(22, 1.3, 8, 36), wB(0x3A6AB8, { op: 0.7, fog: false }));
m.position.copy(p);
m.lookAt(nx.add(G.position));
m.position.copy(p);
G.add(m);
X.rings.push({ p: p, m: m });
});
WMP.race = X;
wmpRacePaint();
if (wmpSigned())
owRpc("ow_challenge_start", { p_key: WMP_RACE.k }).catch(function () { });
wmpTone(660, 0.25);
setStatus("<b>The Ring Run.</b> Go! Through each ring in turn: the gold one is next.");
},
function (dt) {
var X = WMP.race;
if (!X)
return;
if (WLD.on !== "space") {
wmpRaceStop();
return;
}
X.t += dt;
if (SP.vel && SP.vel.length() > WMP_RACE.cap)
SP.vel.setLength(WMP_RACE.cap);
var R = X.rings[X.i];
if (R && wmpSegNear(X.prev, SP.pos, R.p) < 23) {
X.i++;
wmpTone(880, 0.15);
wmpRacePaint();
if (X.i >= X.rings.length) {
var secs = X.t;
wmpRaceStop();
return wmpRaceDone(secs);
}
R = X.rings[X.i];
}
X.prev.copy(SP.pos);
if (X.t > 600) {
wmpRaceStop();
setStatus("<b>The Ring Run:</b> ten minutes is the limit. Try again?");
return;
}
var to = R.p.clone().sub(SP.pos), d = to.length();
to.normalize();
var fwd = new THREE.Vector3(-Math.sin(yaw) * Math.cos(pitch), Math.sin(pitch), -Math.cos(yaw) * Math.cos(pitch)), right = new THREE.Vector3(Math.cos(yaw), 0, -Math.sin(yaw)), up = new THREE.Vector3().crossVectors(right, fwd);
var f = to.dot(fwd), s = to.dot(right), u = to.dot(up), way = f > 0.94 ? "straight ahead" : (f < -0.2 ? "behind you: turn round" : (Math.abs(s) > Math.abs(u) ? (s > 0 ? "to your right ➡️" : "to your left ⬅️") : (u > 0 ? "above ⬆️" : "below ⬇️")));
owHud("<b>The Ring Run</b> · " + owSecs(X.t) + " · ring " + (X.i + 1) + " of " + X.rings.length + "<br>The gold ring: " + Math.round(d) + " m, " + way);
},
function (secs) {
var R = WMP_RACE, best = owBestGet(R.k), better = best == null || secs < best;
if (better)
owBestSet(R.k, secs);
wmpTone(660, 0.2);
setTimeout(function () { wmpTone(880, 0.35); }, 220);
var line = "Done in " + owSecs(secs) + "." + (better ? " A new best for you!" : "");
if (!wmpSigned()) {
wmpRaceCard(line + " Sign in to be paid and to go on the board.");
return;
}
owRpc("ow_challenge_done", { p_key: R.k, p_score: Math.round(secs) }).then(function (o) {
if (o && o.paid && typeof loadStock === "function")
loadStock();
if (o && o.paid && typeof refreshStanding === "function")
try {
refreshStanding();
}
catch (e) { }
wmpRaceCard(line + " " + esc((o && o.say) || ""));
}).catch(function (e) { wmpRaceCard(line + " " + wmpSoft(e)); });
},
function (name, args) {
var p = wmpRpc0.apply(this, arguments), a = args || {};
if (!(WMP_KINDS[a.p_kind] || WMP_KEYS[a.p_key] || /^(aurora|space)-/.test(String(a.p_spot || ""))))
return p;
return p.then(function (o) { if (o && o.ok === false && WMP_UNKNOWN.test(String(o.say || "")))
o.say = "This opens soon."; return o; }, function (e) { var m = String((e && e.message) || e || ""); if (/function|404|PGRST|does not exist|schema cache/i.test(m))
throw new Error("This opens soon."); throw e; });
},
function (place, msg) {
var C = OW_PLACES[place].chal, best = owBestGet(C.k), fns = {};
var h = owTitle("🏁 " + esc(C.name)) + "<div style='margin:6px 0'>" + esc(C.about) + "</div>";
h += "<div style='opacity:.8;font-size:12.5px'>Jump with Space, or the ⬆ button on a phone, or push the stick up in VR. Your best: " + (best == null ? "none yet" : (best / 10).toFixed(1) + " m") + ". Once a day, the Space Corp pays 20 gold and " + esc(owGoodName(C.reward).toLowerCase()) + " for a jump that counts (for those who pay their dues).</div>";
if (msg)
h += "<div style='margin:8px 0;color:#FFE7B0'>" + msg + "</div>";
h += owBtn("go", "Start", "walk to the runway, then run and jump");
fns.go = function () { worldCard(null); owChalStart(place); };
if (wmpSigned()) {
h += owBtn("top", "🏆 The longest so far", "on the Long Jump");
fns.top = function () {
owRpc("ow_challenge_top", { p_key: C.k }).then(function (rows) { worldCard(worldFacts("🏆 " + C.name, "The longest so far", (rows || []).map(function (r, i) { return [(i + 1) + ". " + (r.name || "A dreamer"), (r.score / 10).toFixed(1) + " m"]; }), (rows && rows.length) ? [] : ["No one yet. Be the first."]), {}); })
.catch(function (e) { worldCard(worldFacts(C.name, "", [], [wmpSoft(e)]), {}); });
};
}
worldCard(h, fns);
},
function (X, dt, L) {
var C = X.C, hop = (typeof WLD !== "undefined" && WLD.hop) || 0, lane = Math.abs(L.z - C.lane) < 3.4;
if (!X.air && hop > 0.05) {
X.air = true;
X.valid = lane && L.x >= 6 && L.x <= C.board + 0.4;
X.foul = lane && L.x > C.board + 0.4 && L.x < C.board + 8;
}
else if (X.air && hop <= 0.001) {
X.air = false;
if (X.valid || X.foul) {
X.tries++;
var d = L.x - C.board, say;
if (X.foul)
say = "No jump: you took off past the white board.";
else if (Math.abs(L.z - C.lane) > 9 || d <= 0)
say = "Out of the landing lane: no mark.";
else {
d = Math.round(d * 10) / 10;
if (d > X.best)
X.best = d;
say = "Jump " + X.tries + ": <b>" + d.toFixed(1) + " m</b>.";
}
wmpTone(X.foul ? 300 : 780, 0.15);
setStatus("<b>The Long Jump.</b> " + say + (X.tries < 3 ? " " + (3 - X.tries) + " to go." : ""));
if (X.tries >= 3)
return wmpJumpDone(Math.min(C.max, Math.round(X.best * 10)));
}
}
if (Math.hypot(L.x - 60, L.z - C.lane) > 260)
return owChalFail("You walked away from the runway.");
var near = Math.hypot(L.x - C.start[0], L.z - C.start[1]) < 4;
if (near && !X.air)
worldPrompt("<b>The Long Jump</b> · <b>press E</b> to stop", function () { owChalStop(); setStatus("The Long Jump: stopped."); });
else
worldPrompt(null);
owHud("<b>The Long Jump</b> · jump " + Math.min(3, X.tries + 1) + " of 3 · best " + (X.best > 0 ? X.best.toFixed(1) + " m" : "none yet") + "<br>" + (lane && L.x < C.board ? "Run at the board and jump before it (Space / ⬆)" : owArrow(L, C.start[0] + 4, C.lane, "the runway")));
},
function (score) {
var X = OW.chal;
if (!X)
return;
var C = X.C, place = X.place;
owChalStop();
var best = owBestGet(C.k), better = score > 0 && (best == null || score > best);
if (better)
owBestSet(C.k, score);
var line = score > 0 ? "Your longest: " + (score / 10).toFixed(1) + " m." + (better ? " A new best for you!" : "") : "No jump counted this time.";
wmpTone(660, 0.2);
setTimeout(function () { wmpTone(880, 0.35); }, 220);
if (!wmpSigned()) {
wmpJumpCard(place, line + " Sign in to be paid and to go on the board.");
return;
}
owRpc("ow_challenge_done", { p_key: C.k, p_score: score }).then(function (o) {
if (o && o.paid && typeof loadStock === "function")
loadStock();
if (o && o.paid && typeof refreshStanding === "function")
try {
refreshStanding();
}
catch (e) { }
wmpJumpCard(place, line + " " + esc((o && o.say) || ""));
}).catch(function (e) { wmpJumpCard(place, line + " " + wmpSoft(e)); });
},
function (place) {
var r = wmpChalStart0.apply(this, arguments), X = OW.chal;
if (X && X.kind === "jump") {
X.tries = 0;
X.best = 0;
X.air = false;
setStatus("<b>The Long Jump.</b> Three jumps. Run up the lane, jump before the white board, and land in the lane.");
}
if (X && X.kind === "sample")
setStatus("<b>The Sample Return.</b> Go! Four tubes, then home to the Commons before the storm arrives.");
return r;
},
function (dt, L) {
var X = OW.chal;
if (X && X.kind === "jump") {
X.t += dt;
return wmpJumpTick(X, dt, L);
}
var r = wmpChalTick0.apply(this, arguments);
if (X && X.kind === "sample" && OW.chal === X) {
var left = X.C.limit - X.t;
if (left <= 0)
return owChalFail("The dust storm closed in before you got the tubes home. The settlement's crawler brought you in.");
if (OW.hud && OW.hud.dataset.h)
owHud(OW.hud.dataset.h.replace(/<br><span class='wmp-st'>.*$/, "") + "<br><span class='wmp-st'>🌪️ The storm arrives in " + owSecs(left) + "</span>");
}
return r;
},
function (l) {
if (WMP.cur !== l.k) {
WMP.cur = l.k;
WMP.ans = {};
WMP.msg = "";
WMP.t0 = Date.now();
if (wmpSigned())
owRpc("school_begin", { p_course: WMP_COURSE, p_unit: l.n }).catch(function () { });
}
var fns = {}, b = "";
b += "<div style='opacity:.7;font-size:12px'>Lesson " + l.n + " of " + WMP_LESSONS.length + " · World Learning: The Moon, Mars and Orbit · the Department of Education" + (wmplDone(l.n) ? " · ✓ stamped" : "") + "</div>";
b += "<div style='margin:6px 0'><b>What is true.</b> " + esc(l.real) + "</div><div style='margin:6px 0'><b>The science.</b> " + esc(l.science) + "</div>";
b += "<div style='margin:6px 0'><b>A word from here: " + esc(l.word[0]) + "</b>, " + esc(l.word[1]) + "</div>";
b += "<div style='margin:6px 0'><b>Try it.</b> " + esc(l.tryit) + "</div>";
b += "<div style='margin:10px 0 4px'><b>Two questions</b> for your stamp</div>";
l.quiz.forEach(function (q, k) {
b += "<div style='margin:6px 0 2px'>" + (k + 1) + ". " + esc(q[0]) + "</div>";
wmplOpt(l, k).forEach(function (o, j) {
var on = WMP.ans[k] === o, nm = "q" + k + "_" + j;
b += "<div role='button' data-w='" + nm + "' style='margin:3px 0;padding:5px 9px;border-radius:4px;border:1px solid " + (on ? (o === q[1] ? "#7AD08A" : "#E07A6A") : "rgba(143,180,232,.4)") + ";background:" + (on ? (o === q[1] ? "rgba(122,208,138,.15)" : "rgba(224,122,106,.15)") : "transparent") + "'>" + esc(o) + (on ? (o === q[1] ? " ✓" : " ✗") : "") + "</div>";
fns[nm] = function () { WMP.ans[k] = o; wmplCheck(l); wmpLessonCard(l); };
});
});
if (WMP.msg)
b += "<div style='margin-top:8px;color:#FFE7B0'>" + WMP.msg + "</div>";
b += owBtn("all", "🎓 Every lesson", "your record: " + wmplCount() + " of " + WMP_LESSONS.length + " stamped");
fns.all = function () { wmpCourseCard(wmpHere()); };
worldCard(owTitle("🎓 " + esc(l.title), "#BFD8FF") + b, fns);
},
function (l) {
if (wmplDone(l.n))
return;
if (!l.quiz.every(function (q, k) { return WMP.ans[k] === q[1]; }))
return;
var L = wmplLog();
L[l.n] = new Date().toISOString();
if (typeof save === "function")
save();
var n = wmplCount(), all = n === WMP_LESSONS.length;
WMP.msg = "🌙 Stamped: " + esc(l.title) + ". " + n + " of " + WMP_LESSONS.length + "." + (all ? " <b>Moon and Mars Explorer!</b> The certificate is in your backpack." : "");
setStatus("<b>Moon, Mars and Orbit stamp</b> (" + n + " of " + WMP_LESSONS.length + ")." + (all ? " <b>You are a Moon and Mars Explorer.</b>" : ""));
if (wmpSigned()) {
var wait = Math.max(0, 21000 - (Date.now() - WMP.t0));
setTimeout(function () { owRpc("school_pass", { p_course: WMP_COURSE, p_unit: l.n }).catch(function () { }); }, wait);
}
},
function (place) {
var fns = {}, here = wmpHere();
var h = "<div style='opacity:.85'>Lessons taught where they happen: on the Moon at Tranquillity Outpost, on Mars at Jezero Settlement, aboard Station Aurora, and out in the asteroid belt and by the comet. Get both questions right at each for a stamp; all " + WMP_LESSONS.length + " make a <b>Moon and Mars Explorer</b>. " + wmplCount() + " stamped so far.</div>";
var list = place ? WMP_LESSONS.filter(function (l) { return l.w === place; }).concat(WMP_LESSONS.filter(function (l) { return l.w !== place; })) : WMP_LESSONS;
list.forEach(function (l) {
var nm = "l-" + l.k;
h += owBtn(nm, (wmplDone(l.n) ? "🌙 " : "○ ") + l.n + ". " + esc(l.title), "at " + esc(wmplWhere(l)) + (here === l.w ? " · tap for the lesson" : ""));
fns[nm] = function () { wmpLessonCard(l); };
});
if (typeof owCourseCard === "function") {
h += owBtn("outer", "🚀 The Outer Worlds", "the sibling course, from Mercury to Pluto");
fns.outer = function () { wmpCourse0 ? wmpCourse0() : owCourseCard(); };
}
worldCard(owTitle("World Learning: The Moon, Mars and Orbit", "#BFD8FF") + h, fns);
},
function (place) {
var key = WMP_WORK[place], list = WMP_JOBS.filter(function (j) { return j[2] === place; }), h = owTitle("📋 The Space Corp: " + esc(key)), fns = {};
h += "<div style='opacity:.85;margin-bottom:6px'>Real posts, paid by the hour like every job in Somnucor, in eight-hour shifts. Your shift counts while you are here" + (place === "space" ? ", out in open space" : " on " + esc(WMP_PLACE_NAME[place])) + ". Posts are for dreamers who pay their dues.</div>";
list.forEach(function (j) {
h += "<div style='margin:6px 0;padding:6px 9px;border:1px solid rgba(143,180,232,.35);border-radius:4px'><b>" + esc(j[1]) + "</b> · " + j[3] + " gold an hour · " + j[4] + " post" + (j[4] > 1 ? "s" : "") + (j[5] ? "" : " · chosen by the Keeper") +
"<div style='font-size:12px;opacity:.8'>" + esc(j[7].map(function (t) { return t[0] + ": " + t[2].join(", ").toLowerCase(); }).join("; ")) + "</div></div>";
});
if (typeof ahOpen === "function") {
h += owBtn("apply", "📋 Hiring here", "see the openings and take one or apply, on the spot");
fns.apply = function () { worldCard(null); ahOpen(key); };
}
else if (typeof showJobBoard === "function") {
h += owBtn("apply", "📋 Open the job board", "to apply");
fns.apply = function () { worldCard(null); showJobBoard(); };
}
worldCard(h, fns);
},
function (w) {
var place = w && w.place;
if (!(place === "moon" || place === "mars" || place === "aurora"))
return wmpCrewCard0.apply(this, arguments);
var cap = null, wc = worldCard;
worldCard = function (h, f) { cap = [h, f]; };
try {
wmpCrewCard0.apply(this, arguments);
}
finally {
worldCard = wc;
}
if (!cap)
return;
var h = cap[0], fns = cap[1] || {}, id = w.c && w.c.id;
if (place === "aurora" && (id === "hydro" || id === "recyc")) {
h += owBtn("wjobs", "📋 Work here", "the Space Corp's posts aboard");
fns.wjobs = function () { wmpJobsCard("aurora"); };
}
if (id === "icesci" || id === "geo" || id === "hydro" || id === "recyc" || id === "tech") {
h += owBtn("wlearn", "🎓 A lesson", "World Learning: The Moon, Mars and Orbit");
fns.wlearn = function () { wmpCourseCard(place); };
}
h += owBtn("wtodo", "🧭 What to do here", "work, trade, gather, play, learn, live");
fns.wtodo = function () { wmpHub(); };
worldCard(h, fns);
},
function () {
var w = wmpHere();
if (!w)
return;
var P = OW_PLACES[w] || {}, fns = {}, n = 0, h = owTitle("🧭 Things to do " + (w === "space" ? "in open space" : w === "aurora" ? "aboard Station Aurora" : "on " + WMP_PLACE_NAME[w]));
function head(t) { h += "<div style='margin:10px 0 2px;font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:#D8A868'>" + t + "</div>"; }
function go(label, sub, fn) { var k = "h" + (n++); h += owBtn(k, label, sub); fns[k] = fn; }
function way(name, x, z) { return function () { wmpGuideTo(w, x, z, name); }; }
function fly(name, pos, after) { return function () { worldCard(null); spFlyTo({ pos: pos, name: name, after: after }); }; }
head("Work · real shifts, paid like any post in the city");
go("📋 " + esc(WMP_WORK[w]), esc(WMP_JOBS.filter(function (j) { return j[2] === w; }).map(function (j) { return j[1] + " (" + j[3] + "/h)"; }).join(", ")), function () { wmpJobsCard(w); });
head("Trade · they sell, and they buy what you bring");
if (P.trade) {
var T = P.trade;
go("🛒 " + esc(T.name), "Sells " + esc(T.sells.map(function (k) { return owGoodName(k).toLowerCase(); }).join(", ")) + "; buys all you gather; refines", w === "aurora" ? way(T.name, T.at[0], T.at[1] + 1) : way(T.name, T.at[0], T.at[1]));
}
if (w === "space") {
go("🟢 Pip-Tullik the trader", "Buys outer goods at a quarter over the city's price, sells oddities and swaps. Hail the round green ship when it comes alongside, or find Pip moored at Cloud Station Cassini", function () { worldCard(null); spFlyTo({ k: "saturn", name: "Saturn", after: "Press E to descend to Cloud Station Cassini; Pip's stall is on the deck." }); });
}
head("Gather · into your backpack");
var seen = {};
if (w === "space") {
var X = WMP.space || (WMP.space = wmpSpaceBuild());
if (X)
X.claims.forEach(function (c) { go(owGoodIcon(c.k) + " " + esc(c.node.label), esc(owGoodName(c.k)) + " · " + (OW_GOOD[c.k] || {}).b + " gold each", fly(c.node.label, c.pos.clone().add(new THREE.Vector3(0, 30, 40)), "Press E to mine.")); });
go("☄️ The comet", "Comet ice", function () { worldCard(null); var A = { name: "the comet", after: "Press E alongside it to collect its ice." }; Object.defineProperty(A, "pos", { get: function () { return SP.comet.position.clone().add(new THREE.Vector3(0, 20, 60)); } }); spFlyTo(A); });
}
else
(P.gather || []).forEach(function (spec) {
if (seen[spec.k])
return;
seen[spec.k] = 1;
var g = OW_GOOD[spec.k] || {}, q = spec.spots ? spec.spots[0] : [spec.at[0], spec.at[1]];
go((g.e || "") + " " + esc(g.n || spec.k), (g.b || "?") + " gold each to the city" + (g.fd ? " · good to eat" : ""), way(g.n || spec.k, q[0], q[1] + (w === "aurora" ? 2.4 : 0)));
});
head("Play");
if (w === "moon" || w === "mars") {
var C = P.chal, best = owBestGet(C.k);
go("🏁 " + esc(C.name), C.kind === "jump" ? "Three jumps on the runway" + (best != null ? " · your best " + (best / 10).toFixed(1) + " m" : "") : "Against the clock and the storm" + (best != null ? " · your best " + owSecs(best) : ""), function () { owChalCard(w); });
}
if (w === "space") {
var b = owBestGet(WMP_RACE.k), bp = wmpBuoyPos();
go("🏁 The Ring Run", "Ten rings beyond Station Aurora" + (b != null ? " · your best " + owSecs(b) : ""), bp ? fly("the Ring Run's start buoy", bp.clone().add(new THREE.Vector3(0, 0, 30)), "Press E at the buoy.") : function () { wmpRaceCard(); });
}
if (w === "aurora") {
go("🔫 Laser tag", "The arena, east: the tag blaster rack", way("The tag blaster rack", 31, -26));
go("⚔️ The Duelling Deck", "East: the duelling master", function () { setStatus("<b>The Duelling Deck</b> is through the east doorway at the hangar end of the hall."); worldCard(null); });
go("🌀 The Zero-G Bay", "Three hoops, weightless", way("The Zero-G Bay", 69, 4));
}
head("Learn · World Learning, on the spot");
WMP_LESSONS.filter(function (l) { return l.w === w; }).forEach(function (l) {
var s = P.spots && P.spots[l.at];
go((wmplDone(l.n) ? "🌙 " : "○ ") + esc(l.title), "at " + esc(wmplWhere(l)), s && w !== "space" ? way(l.title, s[0], s[1]) : function () { wmpLessonCard(l); });
});
if (w === "aurora")
go("🤖 Lumen, the teaching robot", "The Aurora Learning Gallery, west", way("Lumen, the teaching robot", -51, -21.5));
head("Live · homes at the Land Office, Somnucor");
var hk = w === "aurora" ? "station" : w, homes = (typeof WHM !== "undefined" && WHM.homes && WHM.homes[hk]) || [];
if (w === "space")
h += "<div style='opacity:.8'>No one lives out in the belt. Homes nearby: the Station Ring Cabins aboard Station Aurora, the Tranquility Domes on the Moon and the Red Plain Habitats on Mars, bought or let at the Land Office in Somnucor.</div>";
else if (homes.length)
homes.forEach(function (o) { go("🏠 " + esc(o.name), esc(typeof whStatus === "function" ? whStatus(o.name) : "Ask at the Land Office"), way(o.name, o.x, o.z)); });
else
h += "<div style='opacity:.8'>Homes here are bought and let at the Land Office in Somnucor.</div>";
worldCard(h, fns);
},
function (force) {
if (!wmuSigned())
return Promise.resolve(null);
if (!force && WMU.today && Date.now() - WMU.todayAt < 30000)
return Promise.resolve(WMU.today);
return wmuRpc("wmu_today").then(function (o) {
WMU.today = o || null;
WMU.todayAt = Date.now();
if (o && o.wait)
Object.keys(o.wait).forEach(function (k) { WMU.picked[k] = Date.now() + (+o.wait[k] || 0) * 1000; });
return o;
})
.catch(function (e) { if (wmuMissing(e))
WMU.missing = true; return null; });
},
function (id, msg) {
var T = WMU_STALLS[id];
if (!T)
return;
var draw = function () {
var h = wmuTitle(esc(T.name), esc(T.say)), fns = {};
if (msg)
h += "<div style='margin:6px 0;color:#CFE8C0'>" + msg + "</div>";
if (!wmuSigned())
h += "<div style='margin:6px 0;color:#E8C8A0'>Sign in to trade: gold and stock are kept against your account.</div>";
if (T.menu) {
h += worldBtn("menu", "🍽 The menu", "Eat and drink here: it feeds you");
fns.menu = function () { if (typeof needsMenu === "function")
needsMenu(T.menu);
else
wmuSay("Food and drink open soon."); };
}
if (T.handin) {
var n = wmuHave("wmu_found"), rw = (WMU.today && WMU.today.reward) || 3;
h += worldBtn("hand", "🧳 Hand in lost property", n ? ("You carry " + n + " · the finder's reward is " + rw + " gold each, for dreamers whose dues are paid") : "Found something on a train, under a bench or in the Mall? Bring it here.");
fns.hand = function () { wmuHandIn(id); };
}
var sells = T.sells.filter(function (k) { return wmuMat(k).price != null; });
if (sells.length) {
h += wmuHead("For sale");
sells.forEach(function (k) {
var M = wmuMat(k), p = M.price;
h += worldBtn("b1_" + k, (M.icon || "") + " " + esc(M.name) + " · " + (wmuKeeper() ? "free to you" : p + " gold"), "Buy one · you have " + wmuHave(k));
fns["b1_" + k] = function () { wmuBuy(id, k, 1); };
});
}
if (T.buys.length) {
var buys = T.buys.filter(function (k) { return wmuHave(k) > 0; });
h += wmuHead("They buy");
if (!buys.length)
h += "<div style='opacity:.75'>" + esc(T.buys.map(function (k) { return wmuMat(k).name.toLowerCase(); }).join(", ")) + ". You have none of those with you" + (wmuSigned() ? "" : " (or you are signed out)") + ".</div>";
buys.forEach(function (k) {
var M = wmuMat(k), n2 = wmuHave(k), p = wmuSellPrice(k);
h += worldBtn("s1_" + k, "Sell one " + esc(M.name.toLowerCase()) + " · " + p + " gold", "You have " + n2);
fns["s1_" + k] = function () { wmuSell(id, k, 1); };
if (n2 > 1) {
h += worldBtn("sa_" + k, "Sell all " + n2 + " · " + (p * n2) + " gold", null);
fns["sa_" + k] = function () { wmuSell(id, k, n2); };
}
});
}
if (T.sells.length || T.buys.length)
h += "<div style='opacity:.6;font-size:12px;margin-top:8px'>What you buy and sell is your stock: 🎒 Backpack, Materials. Every counter sells for more than it buys: that difference pays its rent and its staff.</div>";
worldCard(h, fns);
};
draw();
if (wmuSigned())
Promise.all([wmuStock(true), wmuTodayLoad(false)]).then(function () { if (wmuCardOpen())
draw(); });
},
function (id, k, n) {
if (!wmuSigned())
return wmuStall(id, "Sign in first.");
var p = wmuSellPrice(k);
wmuRpc("sell_stock", { p_kind: k, p_amount: n }).then(function (o) {
WMU.stockAt = 0;
var said = o === "ok" ? "Sold: " + n + " × " + wmuMat(k).name.toLowerCase() + ", for " + (p * n) + " gold." : String(o || "Not now.");
wmuStock(true).then(function () { wmuStall(id, esc(said)); });
wmuStanding();
})
.catch(function (e) { wmuStall(id, esc((e && e.message) || String(e))); });
},
function (id) {
var T = WMU_STALLS[id];
if (!T || !T.handin)
return;
if (!wmuSigned())
return wmuStall(id, "Sign in first.");
wmuRpc("wmu_hand_in", { p_desk: T.handin }).then(function (o) {
WMU.stockAt = 0;
WMU.todayAt = 0;
if (o && o.ok)
wmuTone(660, 0.25);
wmuStock(true).then(function () { wmuStall(id, esc((o && o.say) || "Done.")); });
wmuStanding();
})
.catch(function (e) { wmuStall(id, esc(wmuErr(e))); });
},
function (id, label, after) {
var S = WMU_SPOTS[id];
if (!S)
return;
if (!wmuSigned()) {
wmuSay("Sign in first: what you find is kept against your account.");
return;
}
if (WMU.busy)
return;
WMU.busy = true;
wmuRpc("wmu_gather", { p_spot: id }).then(function (o) {
WMU.busy = false;
WMU.stockAt = 0;
if (o && o.ok) {
WMU.picked[id] = Date.now() + S.regrow * 60000;
wmuSave();
wmuTone(700, 0.2);
wmuSay((label ? "<b>" + esc(label) + ".</b> " : "") + esc(o.say || "") + (S.kind === "wmu_found" ? " Hand it in at the Lost Property Office or the Mall's information desk for the finder's reward." : ""));
}
else {
if (o && o.wait) {
WMU.picked[id] = Date.now() + o.wait * 1000;
wmuSave();
}
wmuSay(esc((o && o.say) || "Nothing there."));
}
if (after)
after(o);
}).catch(function (e) { WMU.busy = false; wmuSay(esc(wmuErr(e))); });
},
function (k) {
var g = new THREE.Group(), cols = [0x6A3A2A, 0x24335E, 0xD8B8C8], c = cols[k % 3];
var M = new THREE.MeshLambertMaterial({ color: c });
if (k % 3 === 1) {
var u = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.8, 8), M);
u.rotation.z = Math.PI / 2;
u.position.y = 0.06;
g.add(u);
var hdl = new THREE.Mesh(new THREE.TorusGeometry(0.07, 0.02, 6, 10, Math.PI), new THREE.MeshLambertMaterial({ color: 0x3A2A20 }));
hdl.position.set(0.42, 0.1, 0);
g.add(hdl);
}
else if (k % 3 === 2) {
var b = new THREE.Mesh(new THREE.SphereGeometry(0.14, 10, 8), M);
b.position.y = 0.14;
g.add(b);
var hd = new THREE.Mesh(new THREE.SphereGeometry(0.1, 10, 8), M);
hd.position.set(0, 0.32, 0.02);
g.add(hd);
[-1, 1].forEach(function (s) { var e = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.03, 0.18, 6), M); e.position.set(s * 0.05, 0.46, 0); g.add(e); });
}
else {
var p = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.04, 0.26), M);
p.position.y = 0.03;
g.add(p);
for (var f = 0; f < 4; f++) {
var fi = new THREE.Mesh(new THREE.BoxGeometry(0.035, 0.035, 0.12), M);
fi.position.set(-0.075 + f * 0.05, 0.03, 0.18);
g.add(fi);
}
}
g.traverse(function (m) { m.raycast = function () { }; });
return g;
},
function (parent, x, y, z, name) {
wmuMarkClear();
if (!parent)
return;
var g = new THREE.Group();
g.position.set(x, y, z);
var col = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.55, 7, 20, 1, true), new THREE.MeshBasicMaterial({ color: 0xFFD27A, transparent: true, opacity: 0, depthWrite: false, side: THREE.DoubleSide }));
col.position.y = 3.5;
g.add(col);
var ring = new THREE.Mesh(new THREE.RingGeometry(0.7, 1.0, 28), new THREE.MeshBasicMaterial({ color: 0xFFE6A8, transparent: true, opacity: 0, depthWrite: false, side: THREE.DoubleSide }));
ring.rotation.x = -Math.PI / 2;
ring.position.y = 0.05;
g.add(ring);
g.traverse(function (m) { m.raycast = function () { }; });
parent.add(g);
WMU.mark = { g: g, parent: parent, x: x, y: y, z: z, name: name, t: 0, where: wmuWhere() };
wmuSay("<b>" + esc(name) + "</b>: walk to the column of gold light.");
},
function (id, col, dress) {
if (typeof buildFigure !== "function")
return null;
try {
var look = (typeof randomLook === "function") ? randomLook("wmu_" + id, "human") : {};
if (typeof csLookFill === "function")
try {
csLookFill(look, "wmu_" + id);
}
catch (e) { }
look.top = col;
look.coat = col;
if (dress && typeof jobDress === "function")
try {
jobDress(look, dress[0], dress[1]);
}
catch (e) { }
var g = buildFigure({ id: "__wmu_" + id, archetype: "human", attrs: {}, look: look, solid: false, detail: 3, nights: [], city: true }, 1);
g.traverse(function (m) { m.raycast = function () { }; });
return g;
}
catch (e) {
return null;
}
},
function (lines, w, h, bg, fg) {
var c = document.createElement("canvas");
c.width = w;
c.height = h;
var x = c.getContext("2d");
x.fillStyle = bg;
x.fillRect(0, 0, w, h);
x.fillStyle = fg;
x.textAlign = "center";
x.textBaseline = "middle";
var n = lines.length;
lines.forEach(function (L, i) {
var sz = Math.round(i ? Math.min(h * 0.2, w * 0.09) : Math.min(h * 0.38, w * 0.16));
x.font = (i ? "" : "bold ") + sz + "px Georgia, serif";
x.fillText(String(L), w / 2, n === 1 ? h / 2 : (i ? h * (0.56 + (i - 0.5) * 0.34 / (n - 1)) : h * 0.3), w - 20);
});
return new THREE.CanvasTexture(c);
},
function () {
var g = new THREE.Group(), L = function (c) { return new THREE.MeshLambertMaterial({ color: c }); };
var green = L(0x24493A), cream = L(0xE8E0CC), brass = L(0xC9A050), dark = L(0x1C1D22), wood = L(0x6A4A30);
wmuBox(g, 3.6, 1.05, 1.5, green, 0, 0.52, 0);
wmuBox(g, 3.8, 0.06, 1.7, wood, 0, 1.08, 0);
wmuBox(g, 3.6, 1.3, 0.1, cream, 0, 1.75, 0);
[-1.75, 1.75].forEach(function (x) { wmuBox(g, 0.1, 1.4, 1.5, green, x, 1.8, 0); });
wmuBox(g, 4.0, 0.14, 1.9, green, 0, 2.55, 0);
wmuBox(g, 4.1, 0.06, 2.0, brass, 0, 2.65, 0);
var urn = new THREE.Mesh(new THREE.CylinderGeometry(0.17, 0.19, 0.5, 14), L(0xB8BCC2));
urn.position.set(-1.2, 1.36, 0.3);
g.add(urn);
for (var c = 0; c < 5; c++) {
var cup = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.04, 0.11, 8), cream);
cup.position.set(-0.8 + c * 0.13, 1.17, 0.45);
g.add(cup);
}
[0x7A2A2A, 0x2A3A6A, 0x3A5A3A, 0x8A6A2A].forEach(function (col, i) { var p = wmuBox(g, 0.42, 0.6, 0.05, L(col), 0.3 + i * 0.45, 0.55, 0.78); p.rotation.x = -0.18; });
[0xC03A2E, 0x1E2F6E].forEach(function (col, i) { wmuBox(g, 0.3, 0.02, 0.22, L(col), 0.7 + i * 0.4, 1.12, -0.4); });
var sign = new THREE.MeshBasicMaterial({ map: wmuUgTex(["Kiosk", "coffee · tea · papers · line maps"], 512, 128, "#24493A", "#F4F0E6") });
[1, -1].forEach(function (s) {
var p = new THREE.Mesh(new THREE.PlaneGeometry(3.4, 0.62), sign);
p.position.set(0, 2.95, s * 0.62);
if (s < 0)
p.rotation.y = Math.PI;
g.add(p);
var lamp = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.05, 0.12), new THREE.MeshBasicMaterial({ color: 0xFFF0C8 }));
lamp.position.set(0, 2.46, s * 0.8);
g.add(lamp);
});
var keep = wmuFig("kiosk", 0x24493A, ["Platform kiosk attendant", "The Underground"]);
if (keep) {
keep.position.set(0.9, 0, -0.1);
keep.rotation.y = 0;
g.add(keep);
}
g.traverse(function (m) { m.raycast = function () { }; });
return g;
},
function () {
var g = new THREE.Group(), L = function (c) { return new THREE.MeshLambertMaterial({ color: c }); };
var navy = L(0x1E2F6E), cream = L(0xE8E0CC), wood = L(0x6A4A30), red = L(0xC03A2E);
wmuBox(g, 3.6, 1.05, 1.5, navy, 0, 0.52, 0);
wmuBox(g, 3.8, 0.06, 1.7, wood, 0, 1.08, 0);
wmuBox(g, 3.6, 1.5, 0.1, navy, 0, 1.85, -0.7);
[-1.75, 1.75].forEach(function (x) { wmuBox(g, 0.1, 1.5, 1.5, navy, x, 1.85, 0); });
for (var s = 0; s < 2; s++)
wmuBox(g, 3.4, 0.05, 0.4, wood, 0, 1.55 + s * 0.5, -0.5);
var things = [0x24335E, 0x6A3A2A, 0x3A5A3A, 0x8A2A3A, 0x2A2A30, 0xC8B890, 0x5A4A7A];
for (var t = 0; t < 10; t++)
wmuBox(g, 0.22 + (t % 3) * 0.06, 0.26 + (t % 2) * 0.08, 0.22, L(things[t % things.length]), -1.4 + (t % 5) * 0.62, t < 5 ? 1.72 : 2.22, -0.5);
for (var u = 0; u < 4; u++) {
var um = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.9, 6), L(things[u]));
um.position.set(1.2 + u * 0.12, 1.55, -0.55);
um.rotation.z = 0.12;
g.add(um);
}
wmuBox(g, 4.0, 0.14, 1.9, red, 0, 2.68, 0);
var glass = new THREE.Mesh(new THREE.BoxGeometry(3.4, 0.9, 0.04), new THREE.MeshBasicMaterial({ color: 0xD8ECF4, transparent: true, opacity: 0.22, depthWrite: false }));
glass.position.set(0, 1.62, 0.7);
g.add(glass);
var sign = new THREE.MeshBasicMaterial({ map: wmuUgTex(["Lost Property", "finds handed in here · unclaimed goods for sale"], 512, 128, "#1E2F6E", "#FFFFFF") });
[1, -1].forEach(function (s) { var p = new THREE.Mesh(new THREE.PlaneGeometry(3.4, 0.62), sign); p.position.set(0, 3.08, s * 0.62); if (s < 0)
p.rotation.y = Math.PI; g.add(p); });
var keep = wmuFig("lost", 0x1E2F6E, ["Lost property clerk", "The Underground"]);
if (keep) {
keep.position.set(-0.4, 0, -0.15);
keep.rotation.y = 0;
g.add(keep);
}
g.traverse(function (m) { m.raycast = function () { }; });
return g;
},
function (lines, bg) {
var g = new THREE.Group(), frame = new THREE.MeshLambertMaterial({ color: 0x2A2C32 });
wmuBox(g, 1.3, 1.9, 0.12, frame, 0, 1.45, 0);
[-0.55, 0.55].forEach(function (x) { wmuBox(g, 0.08, 0.5, 0.3, frame, x, 0.25, 0); });
var m = new THREE.MeshBasicMaterial({ map: wmuUgTex(lines, 256, 384, bg, "#F4F0E6") });
[1, -1].forEach(function (s) { var p = new THREE.Mesh(new THREE.PlaneGeometry(1.15, 1.72), m); p.position.set(0, 1.46, s * 0.065); if (s < 0)
p.rotation.y = Math.PI; g.add(p); });
g.traverse(function (o) { o.raycast = function () { }; });
return g;
},
function (dt) {
if (!WMU_UG.g || typeof UG2 === "undefined")
return;
var home = wmuUgHome();
if (WMU_UG.lost.visible !== home)
WMU_UG.lost.visible = home;
if (WMU_UG.bench) {
var bv = wmuReady("ug_bench");
if (WMU_UG.bench.visible !== bv)
WMU_UG.bench.visible = bv;
}
WMU.ugAt = null;
if (UG2.ride) {
wmuUgRideTick(dt);
return;
}
wmuUgOfferClear();
if (UG2.prompt && UG2.prompt.style.display === "block")
return;
if (typeof UGJ !== "undefined" && UGJ.walk)
return;
var P = camera.position, lx = P.x - UG2.cx, lz = P.z - UG2.cz;
if (Math.abs(lz) > UG_PLAT)
return;
function near(a, r) { return Math.hypot(lx - a.x, lz - a.z) < r; }
if (near(WMU_UG.kioskAt, 2.9)) {
WMU.ugAt = "kiosk";
ugPrompt("<b>The Platform Kiosk</b> · coffee, a bite, papers and line maps · <b>press E</b> or tap", function () { wmuStall("ug_kiosk"); });
return;
}
if (home && near(WMU_UG.lostAt, 2.9)) {
WMU.ugAt = "lost";
ugPrompt("<b>The Lost Property Office</b> · hand in finds, buy unclaimed goods · <b>press E</b> or tap", function () { wmuStall("ug_lost"); });
return;
}
if (near(WMU_UG.histAt, 2.2)) {
ugPrompt("<b>Under the City</b> · World Learning: the history of underground railways · <b>press E</b> or tap", function () { wmuLessonPick("ug"); });
return;
}
if (near(WMU_UG.planAt, 2.2)) {
ugPrompt("<b>The journey planner</b> · play <b>Route Master</b> · <b>press E</b> or tap", function () { wmuRouteCard(); });
return;
}
var S = WMU_SPOTS.ug_bench;
if (wmuReady("ug_bench") && near(S, 1.9)) {
ugPrompt("Something has been left under the bench · <b>press E</b> or tap to pick it up and hand it in", function () { wmuGather("ug_bench", "Under the bench: a forgotten bag"); });
return;
}
},
function (dt) {
var R = UG2.ride;
if (R.cab || R.drive) {
wmuUgOfferClear();
return;
}
if (WMU_UG.ride !== R) {
wmuUgOfferClear();
WMU_UG.ride = R;
WMU_UG.rideT = 0;
WMU_UG.rideSeed = Math.random();
}
WMU_UG.rideT += dt;
var O = WMU_UG.offer;
if (!O && WMU_UG.rideT > 35 && WMU_UG.rideSeed < 0.6 && wmuSigned() && wmuReady("ug_train")) {
var T = UG2.train[R.d], what = WMU_TRAIN_FINDS[Math.floor(Math.random() * WMU_TRAIN_FINDS.length)];
var lx = camera.position.x - T.position.x, lz = camera.position.z - T.position.z, side = lz >= 0 ? 1 : -1;
var m = wmuLostMesh(Math.floor(Math.random() * 3));
m.position.set(lx + (lx > 0 ? -0.7 : 0.7), 0.68, side * 1.05);
T.add(m);
O = WMU_UG.offer = { what: what, m: m };
wmuSay("Someone has left <b>" + esc(what) + "</b> on the seat beside you.");
}
if (!O)
return;
if (O.taken || (UG2.prompt && UG2.prompt.style.display === "block"))
return;
ugPrompt("Left on the seat: <b>" + esc(O.what) + "</b> · <b>press E</b> or tap to pick it up and hand it in", function () {
var o = WMU_UG.offer;
if (!o)
return;
if (o.m && o.m.parent)
o.m.parent.remove(o.m);
o.m = null;
WMU_UG.offer = { what: o.what, taken: true };
ugPrompt(null);
wmuGather("ug_train", "Left on the train: " + o.what);
});
},
function () {
var L = ugLine().list, N = L.length;
if (N < 4)
return null;
var a = Math.floor(Math.random() * N), b = (a + 1 + Math.floor(Math.random() * (N - 1))) % N, k = (b - a + N) % N, t = Math.floor(Math.random() * 4);
var nm = function (i) { return ugName(((i % N) + N) % N); };
var q, ans, wrong;
if (t === 0 && k * 2 !== N) {
var outer = k < N - k;
q = "From <b>" + esc(nm(a)) + "</b> to <b>" + esc(nm(b)) + "</b>: which way is fewer stops?";
var st = function (c) { return c + (c === 1 ? " stop" : " stops"); };
ans = outer ? "Outer Rail, " + st(k) : "Inner Rail, " + st(N - k);
wrong = [outer ? "Inner Rail, " + st(N - k) : "Outer Rail, " + st(k), (outer ? "Outer Rail, " : "Inner Rail, ") + st((outer ? k : N - k) + 2)];
}
else if (t === 1) {
q = "On the <b>Outer Rail</b>, the next stop after <b>" + esc(nm(a)) + "</b> is…";
ans = nm(a + 1);
wrong = [nm(a - 1), nm(a + 2)];
}
else if (t === 2) {
q = "On the <b>Inner Rail</b>, the next stop after <b>" + esc(nm(a)) + "</b> is…";
ans = nm(a - 1);
wrong = [nm(a + 1), nm(a - 2)];
}
else {
q = "How many stops from <b>" + esc(nm(a)) + "</b> to <b>" + esc(nm(b)) + "</b> on the <b>Outer Rail</b>?";
ans = String(k);
wrong = [String(k + 1), String(k > 1 ? k - 1 : k + 2)];
}
if (wrong.indexOf(ans) >= 0 || wrong[0] === wrong[1])
return wmuRouteQ();
var opts = [ans, wrong[0], wrong[1]].sort(function () { return Math.random() - 0.5; });
return { q: q, ans: ans, opts: opts };
},
function () {
var G = WMU_UG.route;
var won = WMU.today && WMU.today.won;
var h = wmuTitle("🚇 Route Master", "The journey planner's puzzle: six questions about the line, both rails, in ninety seconds. Five right wins " + WMU_ROUTE_GOLD + " gold, once a day, for dreamers whose dues are paid."), fns = {};
if (won)
h += "<div style='color:#CFE8C0'>You have won today's prize. You can still play for the fun of it.</div>";
h += "<div style='opacity:.8;font-size:12px;margin:4px 0'>The Outer Rail runs one way round the Ring Line, the Inner Rail the other. See the line below, or carry a pocket map from the kiosk.</div>";
h += worldBtn("go", "▶ Start", "The clock starts at once");
fns.go = function () { WMU_UG.route = { n: 0, right: 0, t0: Date.now(), q: wmuRouteQ(), done: false }; wmuRoutePaint(); };
h += worldBtn("map", "🗺️ See the line", "Every stop, in Outer Rail order");
fns.map = function () { wmuRouteMap(); };
worldCard(h, fns);
},
function () {
var L = ugLine().list, h = wmuTitle("The Ring Line", "Outer Rail order; the Inner Rail runs the other way round."), fns = {};
h += "<ol style='margin:6px 0 0 18px;padding:0;columns:2;font-size:12.5px'>" + L.map(function (s) { return "<li>" + esc(s.name) + "</li>"; }).join("") + "</ol>";
h += worldBtn("back", "Back to Route Master", null);
fns.back = function () { wmuRouteCard(); };
worldCard(h, fns);
},
function (msg) {
var G = WMU_UG.route;
if (!G)
return;
if (!G.q) {
worldCard(wmuTitle("Route Master", "The line is not drawn yet. Try again in a moment."), {});
return;
}
var left = wmuRouteLeft(G), fns = {};
if (G.done || left <= 0 || G.n >= 6)
return wmuRouteEnd();
var h = wmuTitle("🚇 Route Master · question " + (G.n + 1) + " of 6", "<b>" + Math.ceil(left) + " s</b> left · " + G.right + " right so far");
if (msg)
h += "<div style='margin:4px 0;color:#FFE7B0'>" + msg + "</div>";
h += "<div style='margin:8px 0'>" + G.q.q + "</div>";
G.q.opts.forEach(function (o, i) { h += worldBtn("o" + i, esc(o), null); fns["o" + i] = function () { wmuRouteAnswer(o); }; });
worldCard(h, fns);
},
function (o) {
var G = WMU_UG.route;
if (!G || G.done)
return;
if (wmuRouteLeft(G) <= 0)
return wmuRouteEnd();
var ok = o === G.q.ans;
if (ok) {
G.right++;
wmuTone(740, 0.15);
}
else
wmuTone(300, 0.2);
var said = ok ? "Right." : "Not quite: it was " + esc(G.q.ans) + ".";
G.n++;
G.q = wmuRouteQ();
if (G.n >= 6)
return wmuRouteEnd(said);
wmuRoutePaint(said);
},
function (said) {
var G = WMU_UG.route;
if (!G || G.done)
return;
G.done = true;
var win = G.right >= 5, secs = Math.round((Date.now() - G.t0) / 1000);
var h = wmuTitle(win ? "🏆 Route Master!" : "Route Master", (said ? said + " " : "") + G.right + " of 6 right" + (secs <= 90 ? " in " + secs + " s." : ", but the ninety seconds ran out.")), fns = {};
h += "<div id='wmu-route-msg' style='margin:6px 0;color:#CFE8C0'>" + (win ? (wmuSigned() ? "Claiming the prize…" : "Sign in to claim the prize.") : "Five right are needed. Try again.") + "</div>";
h += worldBtn("again", "Play again", null);
fns.again = function () { wmuRouteCard(); };
worldCard(h, fns);
if (win && wmuSigned())
wmuRpc("wmu_game", { p_game: "ug_route", p_score: G.right }).then(function (o) {
WMU.todayAt = 0;
wmuTodayLoad(true);
var el = document.getElementById("wmu-route-msg");
if (el)
el.textContent = (o && o.say) || "Done.";
wmuStanding();
})
.catch(function (e) { var el = document.getElementById("wmu-route-msg"); if (el)
el.textContent = wmuErr(e); });
WMU_UG.route = null;
},
function () {
var h = wmuTitle("Things to do on the Underground", "The Ring Line runs both ways round the city: fifteen stops, the World Mall among them."), fns = {}, n = 0;
function go(label, sub, fn) { var k = "h" + (n++); h += worldBtn(k, label, sub); fns[k] = fn; }
function way(name, a) { return function () { worldCard(null); wmuMarkTo(UG2.g, a.x, 0, a.z + (a.z > 0 ? -1.4 : 1.4), name); }; }
var home = wmuUgHome();
h += wmuHead("Work · real shifts, paid like any post in the city");
go("📋 Somnucor Underground", "Drivers, guards, booking clerks, station masters, the signal box, track walkers · and on the platform: the lost property clerk and the kiosk attendants", function () { worldCard(null); if (typeof ahOpen === "function")
ahOpen("The Underground Office"); });
h += wmuHead("Eat and drink");
go("☕ The Platform Kiosk", "Coffee, tea, a flapjack, a sandwich, water (on every platform)", way("The Platform Kiosk", { x: WMU_UG.kioskAt.x, z: 1.6 }));
h += wmuHead("Trade");
go("🛒 The Platform Kiosk", "Pocket maps of the line, paperbacks", way("The Platform Kiosk", { x: WMU_UG.kioskAt.x, z: 1.6 }));
if (home)
go("🧳 The Lost Property Office", "Unclaimed umbrellas, scarves, gloves and books for sale; it buys good finds and old track coins", way("The Lost Property Office", { x: WMU_UG.lostAt.x, z: 1.6 }));
else
go("🧳 The Lost Property Office", "At " + esc(wmuUgHomeName()) + " station, the line's home: unclaimed goods for sale, finds bought, the finder's reward", function () { wmuSay("<b>The Lost Property Office</b> is on the platform at <b>" + esc(wmuUgHomeName()) + "</b>: ride there and walk along the platform."); });
h += wmuHead("Gather · into your backpack");
go("🧳 Lost property", "Left on the seats of the trains, and under the platform benches. Hand it in for the finder's reward: at the Lost Property Office or the World Mall's information desk", way("Under the platform bench", { x: WMU_SPOTS.ug_bench.x, z: 1.6 }));
go("🪙 Coins in the track bed", "For the track walker on duty, swept up at the end of a section walked at night", function () { wmuSay("Old coins turn up in the track bed: the <b>track walker</b> sweeps them up after walking a section. Take the post on the job board."); });
h += wmuHead("Play");
go("🚇 Route Master", "At the journey planner: six questions on the line in ninety seconds; five right wins " + WMU_ROUTE_GOLD + " gold, once a day" + (WMU.today && WMU.today.won ? " (won today)" : ""), way("The journey planner", { x: WMU_UG.planAt.x, z: 1.6 }));
h += wmuHead("Learn · World Learning");
go("🎓 Under the City", "Two lessons at the history board: the first underground railways, and signals and keeping trains apart", way("The history board", { x: WMU_UG.histAt.x, z: 1.6 }));
h += "<div style='opacity:.7;font-size:12px;margin-top:8px'>Nobody lives down here: homes are up in the city, on the Land Office's list.</div>";
worldCard(h, fns);
},
function (x, z) {
if (typeof MD === "undefined")
return true;
for (var i = 0; i < MD.solid.length; i++) {
var s = MD.solid[i];
if (s.y0 > 0.5)
continue;
if (Math.hypot(x - s.x, z - s.z) < s.r + 0.4)
return false;
}
for (var j = 0; j < MD.rects.length; j++) {
var q = MD.rects[j];
if (q.y0 > 0.5)
continue;
if (x > q.x0 - 0.4 && x < q.x1 + 0.4 && z > q.z0 - 0.4 && z < q.z1 + 0.4)
return false;
}
return true;
},
function () {
if (WMU_M.built || typeof MALL === "undefined" || !MALL.g)
return;
WMU_M.built = true;
var k = 0;
Object.keys(WMU_SPOTS).forEach(function (id) {
var S = WMU_SPOTS[id];
if (S.where !== "mall")
return;
var x = S.x, z = S.z;
for (var a = 0; a < 8 && !wmuMallClear(x, z); a++) {
x = S.x + Math.cos(a) * 1.6;
z = S.z + Math.sin(a) * 1.6;
}
var m = wmuLostMesh(k++);
m.position.set(x, 0.03, z);
m.rotation.y = k * 1.3;
MALL.g.add(m);
WMU_M.lost[id] = { m: m, x: x, z: z };
});
},
function (msg) {
var T = WMU_STALLS.m_info, n = wmuHave("wmu_found"), rw = (WMU.today && WMU.today.reward) || 3, fns = {};
var h = wmuTitle("The information desk", "Two of the Mall's own people: directions, lost and found, and the Mall's posts.");
if (msg)
h += "<div style='margin:6px 0;color:#CFE8C0'>" + msg + "</div>";
h += worldBtn("hand", "🧳 Hand in lost property", n ? ("You carry " + n + " · the finder's reward is " + rw + " gold each, for dreamers whose dues are paid") : "Found something in the Mall, on a train or under a platform bench? Bring it here.");
fns.hand = function () {
if (!wmuSigned())
return wmuDesk("Sign in first.");
wmuRpc("wmu_hand_in", { p_desk: "mall" }).then(function (o) { WMU.stockAt = 0; WMU.todayAt = 0; if (o && o.ok)
wmuTone(660, 0.25); wmuStock(true).then(function () { wmuDesk(esc((o && o.say) || "Done.")); }); wmuStanding(); })
.catch(function (e) { wmuDesk(esc(wmuErr(e))); });
};
h += worldBtn("learn", "🎓 World Learning: the World Mall", "How markets became malls · how a shop sets its price");
fns.learn = function () { wmuLessonPick("mall"); };
h += worldBtn("jobs", "📋 Work in the Mall", "Manager, information desk, security, cleaning, the food hall, the house shops, the Pixel Palace, tours");
fns.jobs = function () { worldCard(null); if (typeof ahOpen === "function")
ahOpen("The World Mall"); };
h += worldBtn("todo", "🧭 Things to do in the Mall", null);
fns.todo = function () { wmuMallHub(); };
h += worldBtn("stores", "🏬 The shops of the waking world", "Units let to real stores show their range here; what you buy is under My purchases");
fns.stores = function () { worldCard(null); if (typeof mallMine === "function")
mallMine(); };
worldCard(h, fns);
if (wmuSigned() && !msg)
Promise.all([wmuStock(false), wmuTodayLoad(false)]).then(function () { if (wmuCardOpen() && !msg && wmuHave("wmu_found") !== n)
wmuDesk(); });
},
function () {
if (WMU_M.arcBuilt || typeof TS === "undefined" || !TS.arc || typeof TS_ARC === "undefined")
return;
WMU_M.arcBuilt = true;
var A = TS_ARC, x0 = A.L / 2 - 44, cx = x0 + 3, cz = A.W / 2 - 3;
WMU_M.prize = { x: A.cx + cx, z: A.cz + cz };
var g = new THREE.Group();
g.position.set(cx, 0, cz);
TS.arc.add(g);
var L = function (c) { return new THREE.MeshLambertMaterial({ color: c }); };
var shelf = L(0x2A1A40);
wmuBox(g, 6.4, 2.6, 0.4, shelf, 0, 1.3, 2.4);
for (var s = 0; s < 3; s++)
wmuBox(g, 6.2, 0.06, 0.5, L(0x5A4A70), 0, 0.6 + s * 0.75, 2.15);
var cols = [0xF06080, 0x60B0F0, 0xF0D060, 0x70D080, 0xC080F0];
for (var r = 0; r < 3; r++)
for (var c = 0; c < 8; c++) {
var col = L(cols[(r * 3 + c) % cols.length]), px = -2.7 + c * 0.77, py = 0.85 + r * 0.75;
if ((r + c) % 3 === 0) {
var b = new THREE.Mesh(new THREE.SphereGeometry(0.18, 10, 8), col);
b.position.set(px, py, 2.1);
g.add(b);
}
else if ((r + c) % 3 === 1) {
wmuBox(g, 0.3, 0.3, 0.3, col, px, py, 2.1);
}
else {
var cy = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.36, 10), col);
cy.position.set(px, py, 2.1);
g.add(cy);
}
}
var sm = new THREE.MeshBasicMaterial({ map: (typeof tsTex === "function") ? tsTex(["PRIZE COUNTER", "tickets for prizes · ask the attendant"], "#FFE060", "#1A0A2A", 512, 96) : null });
var sg = new THREE.Mesh(new THREE.PlaneGeometry(6, 1), sm);
sg.position.set(0, 3.95, 2.15);
sg.rotation.y = Math.PI;
g.add(sg);
var keep = wmuFig("prize", 0x5A3E7A, null);
if (keep) {
keep.position.set(-1, 0, 1.2);
keep.rotation.y = Math.PI;
g.add(keep);
}
g.traverse(function (m) { m.raycast = function () { }; });
wmuBake(g);
},
function (id, score) {
var need = WMU_ARC[id], name = ARC_GAMES[id].name.toUpperCase();
if (score < need) {
wmuArcTitle(name + " · " + need + " FOR TICKETS");
return;
}
if (!wmuSigned()) {
wmuArcTitle(name + " · SIGN IN FOR TICKETS");
return;
}
wmuArcTitle(name + " · COUNTING TICKETS…");
wmuRpc("wmu_arcade", { p_game: id, p_score: score }).then(function (o) {
WMU.stockAt = 0;
wmuArcTitle(o && o.ok ? name + " · " + o.tickets + " TICKETS" : name);
if (o && o.ok)
wmuTone(880, 0.3);
wmuSay(esc((o && o.say) || ""));
}).catch(function (e) { wmuArcTitle(name); wmuSay(esc(wmuErr(e))); });
},
function (msg) {
var fns = {}, have = wmuHave("wmu_ticket"), t = WMU.today;
var h = wmuTitle("The Pixel Palace prize counter", "A good score on a machine pays prize tickets into your backpack (up to " + ((t && t.ticket_cap) || 30) + " a day, for dreamers whose dues are paid). Swap them here.");
if (msg)
h += "<div style='margin:6px 0;color:#CFE8C0'>" + msg + "</div>";
h += "<div style='margin:4px 0'>You have <b>" + have + "</b> tickets" + (t ? " · " + t.tickets + " won today" : "") + ".</div>";
h += wmuHead("Prizes");
WMU_PRIZES.forEach(function (p) {
var M = wmuMat(p[0]);
h += worldBtn("p_" + p[0], (M.icon || "") + " " + esc(M.name) + " · " + p[1] + " tickets", have >= p[1] ? "Swap for it" : "You need " + (p[1] - have) + " more");
fns["p_" + p[0]] = function () {
if (!wmuSigned())
return wmuPrizeCard("Sign in first.");
wmuRpc("wmu_redeem", { p_prize: p[0] }).then(function (o) { WMU.stockAt = 0; if (o && o.ok)
wmuTone(780, 0.25); wmuStock(true).then(function () { wmuPrizeCard(esc((o && o.say) || "Done.")); }); })
.catch(function (e) { wmuPrizeCard(esc(wmuErr(e))); });
};
});
h += wmuHead("Scores that win tickets");
h += "<div style='font-size:12.5px;opacity:.85'>" + ARC_ORDER.map(function (id) { return esc(ARC_GAMES[id].name) + " " + WMU_ARC[id]; }).join(" · ") + ". The better the score, the more tickets (up to 10 a game).</div>";
worldCard(h, fns);
if (wmuSigned() && !msg)
Promise.all([wmuStock(true), wmuTodayLoad(true)]).then(function () { if (wmuCardOpen() && wmuHave("wmu_ticket") !== have)
wmuPrizeCard(); });
},
function () {
var h = wmuTitle("Things to do in the World Mall", "Three floors round the atrium. Units let to real stores sell their own range; the Mall runs its own shops in the empty ones."), fns = {}, n = 0;
function go(label, sub, fn) { var k = "h" + (n++); h += worldBtn(k, label, sub); fns[k] = fn; }
var inArc = wmuWhere() === "arcade";
function way(name, x, z, lv) {
return function () {
worldCard(null);
if (inArc)
return wmuSay("<b>" + esc(name) + "</b> is in the hall: go back through the arch at the west end of the Arcade.");
wmuMarkTo(MALL.g, x, (lv || 0) * MD.FL, z, name);
};
}
function unitWay(id) {
var u = wmuHouseUnit(id), U = u && MALL.units[u - 1];
var nm = WMU_STALLS[id].name;
if (!U)
return function () { wmuSay("<b>" + esc(nm) + "</b> opens in the next empty unit."); };
return way(nm + " (unit " + u + ")", U.ex - U.nx * 4, U.ez - U.nz * 4, U.lv);
}
h += wmuHead("Work · real shifts, paid like any post in the city");
go("📋 The World Mall", "Manager, information desk, security, cleaners, the food hall cook, the house-shop clerks, the Pixel Palace attendant, the tour guides", function () { worldCard(null); if (typeof ahOpen === "function")
ahOpen("The World Mall"); });
h += wmuHead("Eat and drink · it feeds you");
go("🍜 The Mall Food Hall", "Noodle soup, curry, wraps, jacket potatoes, salads" + (wmuHouseUnit("m_food") ? " · unit " + wmuHouseUnit("m_food") : ""), unitWay("m_food"));
go("☕ The Cloud Café", "By the fountain: coffee, cloud tea, cocoa, moon cakes", way("The Cloud Café", 0, 28.6, 0));
go("🍬 The kiosks", "Moonbeam Sweets, Dream Teas and Cloud Floss, on the ground floor", way("Moonbeam Sweets", -34, -24.6, 0));
h += wmuHead("Trade · they sell and they buy");
go("🛒 The Mall General Store", "Umbrellas, torches, notebooks, sewing kits, mugs, scarves, gloves; buys good second-hand ones" + (wmuHouseUnit("m_general") ? " · unit " + wmuHouseUnit("m_general") : ""), unitWay("m_general"));
go("🎁 The Mall Gift Shop", "Keepsakes of the Mall; buys keepsakes from the other worlds: shells, pearls, feathers, gems" + (wmuHouseUnit("m_gift") ? " · unit " + wmuHouseUnit("m_gift") : ""), unitWay("m_gift"));
var pp = wmuKioskPos(5);
go("📿 Pearl & Shell", "The kiosk on the first floor: shell necklaces; buys shells, pearls and sponges", way("Pearl & Shell", pp.x, pp.z, 1));
go("🏬 The shops of the waking world", "Real stores' own ranges, in the units they have taken; what you buy is listed under My purchases", function () { worldCard(null); if (typeof mallMine === "function")
mallMine(); });
h += wmuHead("Gather · into your backpack");
go("🧳 Lost and found", "Things dropped round the hall turn up now and then: by the benches, at the café. Hand them in at the information desk for the finder's reward", way("A bench in the garden", WMU_M.lost.m_lost1 ? WMU_M.lost.m_lost1.x : -31, WMU_M.lost.m_lost1 ? WMU_M.lost.m_lost1.z + 1.6 : -20, 0));
h += wmuHead("Play");
go("🕹️ The Pixel Palace", "Through the Grand Arcade at the east end: seven machines; a good score pays prize tickets, swapped at the prize counter", inArc ? function () { worldCard(null); wmuSay("<b>The Pixel Palace</b> is at the far east end of this Arcade; the prize counter is by its door."); } : way("The Grand Arcade", MALL.A - 9, 0, 0));
h += wmuHead("Learn · World Learning");
go("🎓 How markets became malls · how a shop sets its price", "Two lessons, at the information desk", way("The information desk", -69.5, 0, 0));
h += "<div style='opacity:.7;font-size:12px;margin-top:8px'>Nobody lives in the Mall: homes are in the city, on the Land Office's list. The Underground home is at the west end.</div>";
worldCard(h, fns);
},
function (at) {
var fns = {}, h = wmuTitle("🎓 World Learning: Under the City and the World Mall", "The Department of Education's lessons, taught where they happen: two on the Underground's platforms, two at the World Mall's information desk. Both questions right for a stamp. " + wmulCount() + " of " + WMU_LESSONS.length + " stamped.");
WMU_LESSONS.forEach(function (l) {
var here = l.at === at, nm = "l_" + l.k;
h += worldBtn(nm, (wmulDone(l.n) ? "✓ " : "○ ") + l.n + ". " + esc(l.title), here ? "Here" : (l.at === "ug" ? "At the history board on any Underground platform" : "At the World Mall's information desk"));
fns[nm] = function () { if (here)
wmuLessonCard(l);
else
wmuSay("<b>" + esc(l.title) + "</b> is taught " + (l.at === "ug" ? "at the history board on any Underground platform." : "at the World Mall's information desk.")); };
});
worldCard(h, fns);
},
function (l) {
if (WMUL.cur !== l.k) {
WMUL.cur = l.k;
WMUL.ans = {};
WMUL.msg = "";
WMUL.t0 = Date.now();
if (wmuSigned())
wmuRpc("school_begin", { p_course: WMU_COURSE, p_unit: l.n }).catch(function () { });
}
var fns = {}, b = "";
b += "<div style='opacity:.7;font-size:12px'>Lesson " + l.n + " of " + WMU_LESSONS.length + " · World Learning: Under the City and the World Mall · the Department of Education" + (wmulDone(l.n) ? " · ✓ stamped" : "") + "</div>";
b += "<div style='margin:6px 0'><b>What is true.</b> " + esc(l.real) + "</div><div style='margin:6px 0'><b>How it works.</b> " + esc(l.science) + "</div>";
b += "<div style='margin:6px 0'><b>A word from here: " + esc(l.word[0]) + "</b>, " + esc(l.word[1]) + "</div>";
b += "<div style='margin:6px 0'><b>Try it.</b> " + esc(l.tryit) + "</div>";
b += "<div style='margin:10px 0 4px'><b>Two questions</b> for your stamp</div>";
l.quiz.forEach(function (q, k) {
b += "<div style='margin:6px 0 2px'>" + (k + 1) + ". " + esc(q[0]) + "</div>";
wmulOpt(l, k).forEach(function (o, j) {
var on = WMUL.ans[k] === o, nm = "q" + k + "_" + j;
b += "<div role='button' data-w='" + nm + "' style='margin:3px 0;padding:5px 9px;border-radius:4px;border:1px solid " + (on ? (o === q[1] ? "#7AD08A" : "#E07A6A") : "rgba(143,180,232,.4)") + ";background:" + (on ? (o === q[1] ? "rgba(122,208,138,.15)" : "rgba(224,122,106,.15)") : "transparent") + "'>" + esc(o) + (on ? (o === q[1] ? " ✓" : " ✗") : "") + "</div>";
fns[nm] = function () { WMUL.ans[k] = o; wmulCheck(l); wmuLessonCard(l); };
});
});
if (WMUL.msg)
b += "<div style='margin-top:8px;color:#FFE7B0'>" + WMUL.msg + "</div>";
b += worldBtn("all", "🎓 Every lesson", "your record: " + wmulCount() + " of " + WMU_LESSONS.length + " stamped");
fns.all = function () { wmuLessonPick(l.at); };
worldCard(wmuTitle("🎓 " + esc(l.title)) + b, fns);
},
function (l) {
if (wmulDone(l.n))
return;
if (!l.quiz.every(function (q, k) { return WMUL.ans[k] === q[1]; }))
return;
var L = wmulLog();
L[l.n] = new Date().toISOString();
if (typeof save === "function")
try {
save();
}
catch (e) { }
var n = wmulCount();
WMUL.msg = "Stamped: " + esc(l.title) + ". " + n + " of " + WMU_LESSONS.length + "." + (n === WMU_LESSONS.length ? " <b>The whole course is done.</b>" : "");
wmuSay("<b>World Learning stamp</b> (" + n + " of " + WMU_LESSONS.length + "): " + esc(l.title) + ".");
if (wmuSigned()) {
var wait = Math.max(0, 21000 - (Date.now() - WMUL.t0));
setTimeout(function () { wmuRpc("school_pass", { p_course: WMU_COURSE, p_unit: l.n }).catch(function () { }); }, wait);
}
}
];
});
