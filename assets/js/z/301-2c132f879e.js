/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(301, function () {
"use strict";
return [
function (n) {
return Object.keys(n || {}).map(function (k) {
var M = FG_MB[k] || { name: k, icon: "" }, ok = fgKeeper() || fgHas(k) >= n[k];
return "<span style='white-space:nowrap;color:" + (ok ? "#CFE8C0" : "#E8A890") + "'>" + M.icon + " " + n[k] + " " + esc(M.name.toLowerCase()) + " <span style='opacity:.6'>(" + fgHas(k) + ")</span></span>";
}).join(", ");
},
function () {
if (!(typeof signedIn === "function" && signedIn())) {
FG.loaded = true;
fgPaint();
return Promise.resolve();
}
FG.busy = true;
fgPaint();
var a = fgRpc("my_stock").then(function (rows) { var S = {}; (rows || []).forEach(function (r) { S[r.kind] = +r.amount || 0; }); FG.stock = S; }).catch(function () { });
var b = fgRpc("my_crafted").then(function (rows) { FG.missing = false; fgItems(Array.isArray(rows) ? rows : []); }).catch(function (e) { if (fgMissing(e))
FG.missing = true; });
return Promise.all([a, b]).then(function () { FG.busy = false; FG.loaded = true; fgPaint(); });
},
function (it) {
var R = FG_RB[it.recipe];
if (!R || R.use !== "weapon" || typeof BW_ARMS === "undefined")
return;
var base = BW_ARMS[R.x.arm];
if (!base)
return;
var k = "cr" + it.id, m = (R.mult || 1) * fgQ(it.quality), A = {};
for (var p in base)
A[p] = base[p];
A.name = it.name;
A.era = "Forged";
A.crafted = it.id;
A.made = R.label;
if (A.dmg)
A.dmg = Math.round(A.dmg * m * 10) / 10;
if (A.heal)
A.heal = Math.round(A.heal * m);
if (A.cool)
A.cool = +(A.cool / (1 + (m - 1) * 0.35)).toFixed(3);
var hk = "fgH" + it.id, bh = base.held;
if (typeof HELD !== "undefined" && HELD[bh]) {
HELD[hk] = function () { var g = HELD[bh](); fgTintHeld(g, R.tier, it.colour); return g; };
A.held = hk;
}
BW_ARMS[k] = A;
if (typeof ARMS !== "undefined") {
var shot = A.kind === "melee" ? null : A.p === "fire" || A.kind === "cone" ? "fire" : A.p === "frost" ? "ice" : A.p === "spark" ? "lightning" : A.p === "arrow" ? "arrow" : A.p === "bolt" ? "bolt" : "shot";
ARMS["bw_" + k] = { held: A.held || "dagger", shot: A.kind === "self" ? null : shot, name: it.name.toLowerCase() };
}
},
function () {
if (typeof bkpKept !== "function")
return;
var K = bkpKept(), have = {}, changed = false;
FG.items.forEach(function (it) { var R = FG_RB[it.recipe]; if (R && R.use === "weapon" && BW_ARMS["cr" + it.id])
have["bw_cr" + it.id] = it; });
for (var i = K.length - 1; i >= 0; i--) {
var q = K[i];
if (/^bw_cr\d+$/.test(q.a) && !have[q.a]) {
K.splice(i, 1);
changed = true;
}
}
Object.keys(have).forEach(function (a) {
var q = K.filter(function (x) { return x.a === a; })[0], it = have[a];
if (!q) {
K.push({ id: a + "_k", a: a, name: it.name, from: "your own forge-work" });
changed = true;
}
else if (q.name !== it.name) {
q.name = it.name;
changed = true;
}
});
if (changed)
try {
save();
}
catch (e) { }
},
function (g, tier, colour) {
var tc = FG_TINT[tier], pc = fgCol(colour), wood = /^(ash|yew|heartwood|starwood|dragonbone)$/.test(tier || ""), hsl = {};
g.traverse(function (o) {
if (!o.isMesh || !o.material || !o.material.color)
return;
var m = o.material;
m.color.getHSL(hsl);
var metal = hsl.s < 0.22 && hsl.l > 0.32, brown = hsl.h > 0.02 && hsl.h < 0.16 && hsl.s > 0.18 && hsl.l < 0.5;
var to = null;
if (!wood && metal && tc != null)
to = tc;
else if (wood && brown && tc != null)
to = tc;
else if (pc != null && hsl.l < 0.3)
to = pc;
if (to == null)
return;
m = m.clone();
m.color.setHex(to);
if (m.emissive && m.emissive.getHex() && metal)
m.emissive.setHex(0);
o.material = m;
});
},
function (g, colour) {
var pc = fgCol(colour);
if (pc == null || !g)
return;
var count = {}, hsl = {};
g.traverse(function (o) {
if (!o.isMesh || !o.material || !o.material.color || o.material.transparent)
return;
o.material.color.getHSL(hsl);
if (hsl.l < 0.12 || hsl.l > 0.9)
return;
var h = o.material.color.getHex();
count[h] = (count[h] || 0) + 1;
});
var best = null, n = 0;
Object.keys(count).forEach(function (h) { if (count[h] > n) {
n = count[h];
best = +h;
} });
if (best == null)
return;
var made = {};
g.traverse(function (o) {
if (!o.isMesh || !o.material || !o.material.color || o.material.color.getHex() !== best)
return;
var id = o.material.uuid;
if (!made[id]) {
made[id] = o.material.clone();
made[id].color.setHex(pc);
}
o.material = made[id];
});
},
function (station, ask) {
if (!FG_STATIONS[station])
station = "warforge";
FG.st = station;
FG.open = true;
FG.tab = "make";
FG.cat = null;
FG.design = null;
FG.tier = null;
FG.work = null;
FG.msg = "";
FG.ask = String(ask || "").trim().slice(0, 80);
if (document.exitPointerLock)
try {
document.exitPointerLock();
}
catch (e) { }
fgPaint();
fgLoad();
if (FG.st === "warforge" || FG.st === "engineer")
fgRules();
},
function () {
if (FG.el)
return FG.el;
var el = document.createElement("div");
el.id = "fg-panel";
el.style.cssText = "position:fixed;left:50%;top:50%;transform:translate(-50%,-50%);z-index:62;display:none;width:min(560px,calc(100vw - 24px));max-height:min(82vh,760px);overflow:auto;" +
"background:linear-gradient(180deg,rgba(26,18,14,.97),rgba(12,9,8,.98));border:1px solid #A8783A;border-radius:8px;padding:12px 14px 14px;color:#EDE2CC;" +
"font:13px/1.45 var(--sans,system-ui);box-shadow:0 14px 50px rgba(0,0,0,.6);-webkit-overflow-scrolling:touch";
el.addEventListener("keydown", function (e) { e.stopPropagation(); if (e.code === "Escape")
craftClose(); });
el.addEventListener("click", function (e) { var t = e.target && e.target.closest ? e.target.closest("[data-fg]") : null; if (!t)
return; e.stopPropagation(); fgClick(t.getAttribute("data-fg"), t); });
document.body.appendChild(el);
FG.el = el;
return el;
},
function () {
var ni = document.getElementById("fg-name");
if (ni)
FG.name = ni.value;
if (!FG.open) {
if (FG.el)
FG.el.style.display = "none";
return;
}
var el = fgPanel(), S = FG_STATIONS[FG.st] || FG_STATIONS.warforge, h = "";
h += "<div style='display:flex;justify-content:space-between;align-items:center;gap:8px'><b style='font:500 17px var(--serif,Georgia);color:#FFE2B0'>⚒️ " + esc(S.name) + "</b>" + fgB("close", "Close") + "</div>";
h += "<div style='margin:6px 0 2px'>" + fgB("tab:make", "Make something", FG.tab === "make") + fgB("tab:mats", "Materials", FG.tab === "mats") + fgB("tab:mine", "Your work" + (FG.items.length ? " (" + FG.items.length + ")" : ""), FG.tab === "mine") +
((FG.st === "warforge" || FG.st === "engineer") ? fgB("tab:bounty", "Bounties", FG.tab === "bounty") : "") + "</div>";
if (FG.msg)
h += "<div style='margin:6px 0;padding:6px 9px;border-radius:4px;background:rgba(232,198,106,.10);border:1px solid rgba(232,198,106,.35)'>" + FG.msg + "</div>";
if (!(typeof signedIn === "function" && signedIn()))
h += "<div style='margin-top:8px'>" + fgDim("Sign in to work at the forge: what you make is kept against your account, and traded like anything you own.") + "</div>";
else if (FG.missing)
h += "<div style='margin-top:8px'>" + fgDim("The forges open soon. Until then the fire is banked.") + "</div>";
else if (FG.work)
h += fgWorkHtml();
else if (FG.tab === "mats")
h += fgMatsHtml(S);
else if (FG.tab === "mine")
h += fgMineHtml();
else if (FG.tab === "bounty")
h += fgBountyHtml();
else
h += fgMakeHtml(S);
if (FG.busy && !FG.loaded)
h += "<div style='margin-top:8px'>" + fgDim("Opening the pattern book…") + "</div>";
el.innerHTML = h;
el.style.display = "block";
if (FG.work)
fgWorkFrame();
},
function (ask, S) {
var w = String(ask || "").toLowerCase().replace(/[^a-z0-9 ]/g, " ").split(/\s+/).filter(function (x) { return x.length > 2 && !/^(the|and|make|made|for|with|some|please|want|need|can|you|new|one|build|forge|craft|create|out|of|me|my|a)$/.test(x); });
if (!w.length)
return [];
var syn = { car: "saloon coupé roadster sports vintage van lorry hovercar", armor: "armour breastplate helm gauntlets greaves suit jerkin", armour: "breastplate helm gauntlets greaves suit jerkin",
gun: "pistol rifle shotgun musket six-shooter gatling blaster", sword: "sword sabre blade longsword greatsword rapier scimitar", truck: "lorry", bike: "motorbike scooter", helmet: "helm", shield: "shield",
tank: "tank", robot: "mech walker frame", mech: "mech walker", staff: "staff rod wand", bow: "bow crossbow", axe: "axe", hammer: "hammer", knife: "dagger", boots: "greaves boots", gloves: "gauntlets" };
var words = [];
w.forEach(function (x) { words.push(x); var s = syn[x] || syn[x.replace(/s$/, "")]; if (s)
words = words.concat(s.split(" ")); });
var out = [];
FG_DESIGNS.forEach(function (d) { var t = (d[2] + " " + d[3] + " " + d[1]).toLowerCase(), sc = 0; words.forEach(function (x) { if (t.indexOf(x.replace(/s$/, "")) > -1)
sc++; }); if (sc)
out.push({ d: d, sc: sc, here: d[7].some(function (s) { return S.st.indexOf(s) > -1; }) }); });
out.sort(function (a, b) { return (b.here - a.here) || (b.sc - a.sc); });
return out.slice(0, 8);
},
function (S) {
var h = "";
if (FG.ask && !FG.design) {
var f = fgFind(FG.ask, S);
h += fgHead("You asked for “" + esc(FG.ask) + "”");
if (!f.length)
h += fgDim("Nothing in the pattern book by that name. Have a look through it below.");
f.forEach(function (x) { var d = x.d; h += x.here ? fgB("design:" + d[0], esc(d[2]) + " " + fgDim("· " + esc(d[1]))) : "<div style='opacity:.65;margin:2px 0'>" + esc(d[2]) + ": made at " + fgWhereMade(d[7]) + "</div>"; });
}
if (!FG.cat && !FG.design) {
h += fgHead("What would you like to make?");
FG_CATS.forEach(function (c) {
var n = c === "Materials" ? FG_WORK.filter(function (w) { return w[5].some(function (s) { return S.st.indexOf(s) > -1; }); }).length : fgDesignsIn(c, S).length;
if (n)
h += fgB("cat:" + c, esc(c === "Materials" ? "Smelt, tan and make parts" : c) + " " + fgDim("(" + n + ")"));
});
var away = FG_CATS.filter(function (c) { return c !== "Materials" && !fgDesignsIn(c, S).length; });
if (away.length)
h += "<div style='margin-top:8px;opacity:.65;font-size:12px'>Made elsewhere: " + away.map(function (c) { return esc(c) + " (" + fgWhereMade(fgCatStations(c)) + ")"; }).join("; ") + ".</div>";
h += "<div style='margin-top:10px;opacity:.75;font-size:12px'>What you make is yours for good, in your backpack, with your name for it. Trade it from <b>The street</b> like anything you own.</div>";
return h;
}
if (FG.cat === "Materials") {
h += fgB("back:cats", "← Back") + fgHead("Smelt, tan and make parts");
FG_WORK.forEach(function (w) {
if (!w[5].some(function (s) { return S.st.indexOf(s) > -1; }))
return;
var R = FG_RB[w[0]], M = FG_MB[w[3]];
h += "<div style='margin:6px 0;padding:6px 8px;border:1px solid rgba(168,120,58,.35);border-radius:4px'><b>" + esc(w[1]) + "</b> → " + M.icon + " " + w[4] + " " + esc(M.name.toLowerCase()) + "<div style='font-size:12px'>" + fgNeedHtml(w[2]) + "</div>" +
fgB("work:" + w[0], (fgCan(R) ? "" : "🔒 ") + esc(w[1])) + "</div>";
});
return h;
}
if (!FG.design) {
h += fgB("back:cats", "← Back") + fgHead(esc(FG.cat));
fgDesignsIn(FG.cat, S).forEach(function (d) {
var any = (FG_TIERS[d[4]] || []).some(function (t) { return fgCan(FG_RB[d[0] + ":" + t[0]]); });
var T0 = (FG_TIERS[d[4]] || [])[0], R0 = T0 && FG_RB[d[0] + ":" + T0[0]];
h += "<div style='margin:4px 0'>" + fgB("design:" + d[0], (FG_PIC ? FG_PIC(d[0], 30) + " " : "") + (any ? "" : "🔒 ") + esc(d[2])) + (R0 ? " <span style='font-size:11.5px'>" + fgDim(esc(T0[1]) + ":") + " " + fgNeedHtml(R0.need) + "</span>" : "") + "</div>";
});
return h;
}
var D = FG_DB[FG.design];
if (!D) {
FG.design = null;
return fgMakeHtml(S);
}
h += fgB("back:designs", "← Back") + fgHead(esc(D.label) + " " + fgDim("· " + esc(D.cat)));
var pic = FG_PIC ? FG_PIC(D.key, 112) : "";
h += "<div style='font-size:12px;opacity:.85" + (pic ? ";display:flex;gap:10px;align-items:flex-start" : "") + "'>" + pic + "<span>" + fgAbout(D) + "</span></div>";
h += fgHead("Grade");
(FG_TIERS[D.tiers] || []).forEach(function (t) {
var R = FG_RB[D.key + ":" + t[0]], on = FG.tier === t[0];
h += "<div style='margin:5px 0;padding:6px 8px;border:1px solid " + (on ? "#E8C66A" : "rgba(168,120,58,.35)") + ";border-radius:4px'>" + fgB("tier:" + t[0], (fgCan(R) ? "" : "🔒 ") + esc(t[1]), on) +
" <span style='font-size:12px'>" + fgStatLine(D, R, 2) + "</span><div style='font-size:12px;margin-top:2px'>" + fgNeedHtml(R.need) + "</div></div>";
});
if (FG.tier) {
var R = FG_RB[D.key + ":" + FG.tier];
h += fgHead("Its name");
h += "<input id='fg-name' maxlength='40' value='" + esc(FG.name || "") + "' placeholder='Name it (or leave it, and it takes yours)' style='width:100%;box-sizing:border-box;padding:6px 8px;background:rgba(0,0,0,.35);color:#F0E6D0;border:1px solid #6A5030;border-radius:4px'>";
h += fgHead("Its colour") + "<div>" + FG_COLOURS.map(function (c, i) {
var on = FG.colour === c[1];
return "<button class='btn' data-fg='col:" + i + "' title='" + esc(c[0]) + "' style='margin:2px;min-width:30px;" + (on ? "border-color:#FFE7B0;" : "") + "'><span style='display:inline-block;width:14px;height:14px;border-radius:3px;vertical-align:-2px;background:" + (c[1] || "linear-gradient(135deg,#8a8c90,#6a4a32)") + "'></span> " + (on ? esc(c[0]) : "") + "</button>";
}).join("") + "</div>";
h += "<div style='margin-top:10px'>" + (fgCan(R) ? fgB("start", "⚒️ Start work: " + esc(R.label), true) : fgDim("You need more materials for this grade: see what each costs above. The <b>Materials</b> tab says where each is found.")) + "</div>";
}
return h;
},
function (st) {
var names = { forge: "any forge (the Smithy, Hephaestus's forge, Ironfray's War Forge)", joinery: "the Joinery, Hephaestus's forge or Ironfray's War Forge", garage: "the Transport Yard workshop, Hephaestus's forge or Ironfray's Motor Pool", engineer: "Ironfray's Motor Pool" };
return st.map(function (s) { return names[s] || s; }).join(" or ");
},
function (D) {
if (D.use === "weapon") {
var A = BW_ARMS[D.x.arm] || {};
return "Fights in Ironfray as the " + esc((A.name || D.label).toLowerCase()) + " does, but better by its grade and by how well you make it. Held anywhere.";
}
if (D.use === "armour")
return "Worn (you are seen in it, in its colour). In Ironfray it turns " + Math.round(D.x.prot * 100) + "% of every blow before its grade; armour pieces add up.";
if (D.use === "vehicle")
return "Yours to drive in Somnucor like any you buy, in your colour" + ((typeof FLYER !== "undefined" && FLYER[D.x.veh]) ? ", and it flies" : "") + ". A licence is the law on the city's roads.";
if (D.use === "machine")
return "Rolled out of Ironfray's Motor Pool in your colours, for you to drive into battle. Better grades take more punishment.";
return "";
},
function (D, R, q) {
var m = (R.mult || 1) * fgQ(q);
if (D.use === "weapon") {
var A = BW_ARMS[D.x.arm] || {};
return A.dmg ? fgDim("blow " + Math.round(A.dmg * m) + " (Armoury's: " + A.dmg + ")") : A.heal ? fgDim("mends " + Math.round(A.heal * m)) : "";
}
if (D.use === "armour")
return fgDim("turns " + Math.round(D.x.prot * m * 100) + "% of a blow");
if (D.use === "vehicle")
return fgDim("top speed ×" + Math.min(1.6, m).toFixed(2));
if (D.use === "machine") {
var T = (typeof BW_MACH !== "undefined" && BW_MACH[D.x.mach]) || { hp: 500 };
return fgDim("armour " + Math.round(T.hp * m));
}
return "";
},
function (S) {
var h = fgHead("Your materials, and the counter"), sells = S.sells || [];
FG_MATS.forEach(function (m) {
var k = m[0], M = FG_MB[k], n = fgHas(k), here = sells.indexOf(k) > -1 && M.price != null;
h += "<div style='display:flex;justify-content:space-between;gap:8px;align-items:center;padding:5px 0;border-bottom:1px solid rgba(255,255,255,.06)'><span>" + M.icon + " <b>" + esc(M.name) + "</b> " + fgDim("× " + n) +
"<br><span style='font-size:11.5px;opacity:.65'>" + esc(M.where) + "</span></span><span style='white-space:nowrap'>" +
(here ? fgDim(M.price + " gold each") + "<br>" + fgB("buy:" + k + ":1", "Buy 1") + fgB("buy:" + k + ":5", "5") + fgB("buy:" + k + ":10", "10") : fgDim(M.price != null ? "sold elsewhere" : "found, not sold")) + "</span></div>";
});
h += "<div style='margin-top:8px;font-size:12px;opacity:.75'>Materials are stock: the city buys them back at its own low price, and you can trade them to other dreamers from <b>The street</b>.</div>";
return h;
},
function () {
var h = fgHead("What you have made (and what was made for you)");
if (!FG.items.length)
return h + fgDim("Nothing yet. Choose <b>Make something</b>.");
FG.items.forEach(function (it) {
var R = FG_RB[it.recipe], D = R && FG_DB[R.design];
if (!R || !D)
return;
var acts = fgActs(it, R, D);
h += "<div style='margin:6px 0;padding:7px 9px;border:1px solid rgba(168,120,58,.35);border-radius:4px'>" +
(it.colour ? "<span style='display:inline-block;width:11px;height:11px;border-radius:2px;margin-right:5px;background:" + esc(it.colour) + "'></span>" : "") + "<b>" + esc(it.name) + "</b> " + fgDim("· " + esc(R.label) + " · " + esc(fgQName(it.quality))) +
"<div style='font-size:12px;opacity:.75'>" + fgStatLine(D, R, it.quality) + " · made by " + esc(it.maker || "a dreamer") + "</div>" + acts + fgB("rename:" + it.id, "Rename") + "</div>";
});
return h;
},
function (it, R, D) {
if (D.use === "weapon") {
var k = "cr" + it.id, held = typeof bwHeldKey === "function" && bwHeldKey() === k;
return fgB("hold:" + it.id, held ? "In hand" : "Hold", held);
}
if (D.use === "armour") {
var on = fgWorn(it);
return fgB("wear:" + it.id, on ? "Take off" : "Wear", on);
}
if (D.use === "vehicle") {
var on2 = FG.rideId === it.id && typeof riding !== "undefined" && riding;
return fgB("ride:" + it.id, on2 ? "Get out" : (typeof FLYER !== "undefined" && FLYER[D.x.veh]) ? "Fly it" : (typeof VEH !== "undefined" && VEH[D.x.veh] && VEH[D.x.veh].c === "carriage") ? "Take the reins" : "Drive it", on2);
}
if (D.use === "machine") {
var M = FG.rolled[it.id];
return fgB("roll:" + it.id, M && M.alive ? "Climb in" : "Roll it out");
}
if (FG_USE[D.use])
return fgB("use:" + D.use + ":" + it.id, FG_USE[D.use].act(it));
return "";
},
function () {
var r = FG.rules, h = fgHead("Gold for kills in Ironfray");
h += "<div style='font-size:12.5px'>Every foe you beat pays a bounty from the Treasury: about half its renown in gold (a goblin 4, a knight 6, a troll 18, the hill giant 45, Vharruk Cinderwing 250). Beating another dreamer pays a bounty too, on top of the tenth of their purse you take. Bounties go to dreamers who pay their dues; beasts leave hide, robots and machines leave scrap, the dragon a scale.</div>";
if (!r)
return h + "<div style='margin-top:6px'>" + fgDim("Asking the Treasury…") + "</div>";
h += "<div style='margin-top:8px'>Today you have earned <b>" + (+r.today || 0).toLocaleString() + "</b> of <b>" + (+r.per_day || 0).toLocaleString() + "</b> gold in bounties" + (r.on ? "" : " " + fgDim("(bounties are off)")) + ", and found <b>" + (+r.found || 0) + "</b> of 200 things.</div>";
h += "<div>A dreamer beaten pays <b>" + (+r.pvp_gold || 0) + "</b> gold.</div>";
if (fgKeeper())
h += fgHead("Keeper") + fgB("rule:day:-100", "Day limit −100") + fgB("rule:day:100", "+100") + fgB("rule:pvp:-5", "Dreamer bounty −5") + fgB("rule:pvp:5", "+5") + fgB("rule:on", r.on ? "Turn bounties off" : "Turn bounties on");
return h;
},
function (a, t) {
var p = a.split(":");
if (a === "close")
return craftClose();
if (p[0] === "tab") {
FG.tab = p[1];
FG.work = null;
FG.msg = "";
if (p[1] === "bounty")
fgRules();
fgPaint();
return;
}
if (p[0] === "cat") {
FG.cat = p.slice(1).join(":");
FG.design = null;
FG.tier = null;
FG.msg = "";
fgPaint();
return;
}
if (p[0] === "back") {
if (p[1] === "cats") {
FG.cat = null;
FG.design = null;
}
else {
FG.design = null;
}
FG.tier = null;
FG.msg = "";
fgPaint();
return;
}
if (p[0] === "design") {
FG.design = p[1];
FG.cat = FG_DB[p[1]] ? FG_DB[p[1]].cat : FG.cat;
FG.tier = null;
FG.name = "";
FG.msg = "";
fgPaint();
return;
}
if (p[0] === "tier") {
fgKeepName();
FG.tier = p[1];
fgPaint();
return;
}
if (p[0] === "col") {
fgKeepName();
var c = FG_COLOURS[+p[1]];
FG.colour = c ? c[1] : null;
fgPaint();
return;
}
if (a === "start") {
fgKeepName();
var R = FG_RB[FG.design + ":" + FG.tier];
if (R)
fgWorkStart(R);
return;
}
if (p[0] === "work") {
var W = FG_RB[p[1]];
if (W)
fgMakeNow(W, 0.5, null, null);
return;
}
if (a === "strike")
return fgStrike();
if (a === "stopwork") {
FG.work = null;
FG.msg = "You set the work aside. Nothing was used.";
fgPaint();
return;
}
if (p[0] === "buy")
return fgBuy(p[1], +p[2] || 1);
if (p[0] === "hold")
return fgHold(+p[1]);
if (p[0] === "wear")
return fgWear(+p[1]);
if (p[0] === "ride")
return fgRide(+p[1]);
if (p[0] === "roll")
return fgRollOut(+p[1]);
if (p[0] === "use" && FG_USE[p[1]]) {
FG_USE[p[1]].run(+p[2]);
fgPaint();
return;
}
if (p[0] === "rename")
return fgRename(+p[1]);
if (p[0] === "rule")
return fgRuleSet(p[1], p[2]);
},
function (R) {
var D = FG_DB[R.design], v = D && (D.use === "vehicle" || D.use === "machine") ? "Fit" : /^(ash|yew|heartwood|starwood|dragonbone|plain|fine|enchanted)$/.test(R.tier || "") ? "Shape" : "Strike";
FG.work = { R: R, verb: v, hits: [], t0: performance.now(), T: 1500 + Math.random() * 300, need: 3, name: FG.name, colour: FG.colour, shown: "", raf: 0 };
FG.msg = "";
fgPaint();
},
function () {
var W = FG.work, R = W.R, D = FG_DB[R.design] || {};
var h = fgHead(esc(R.label) + (W.name ? " · “" + esc(W.name) + "”" : ""));
h += "<div style='font-size:12.5px'>" + (W.verb === "Fit" ? "Fit each part as the work comes right: press <b>" + W.verb + "</b> when it reads <b>Now</b>."
: W.verb === "Shape" ? "Shape it when the grain lies right: press <b>" + W.verb + "</b> when it reads <b>Now</b>."
: "Strike the metal when it glows brightest: press <b>" + W.verb + "</b> when it reads <b>Now</b>.") + " Three times. The better your timing, the better it is made.</div>";
h += "<div style='position:relative;height:18px;margin:10px 0 4px;border-radius:9px;background:linear-gradient(90deg,#2a2222,#6a3a22 45%,#c8783a 80%,#e8b878);overflow:hidden'>" +
"<div id='fg-heat' style='position:absolute;top:0;bottom:0;width:6px;margin-left:-3px;border-radius:3px;background:#F4ECD8;left:0'></div></div>";
h += "<div id='fg-heatw' style='font-weight:600;min-height:20px'>" + fgHeatWord(fgHeat()) + "</div>";
h += "<div style='margin:4px 0'>" + W.hits.map(function (x) { return x >= 0.93 ? "🟨" : x >= 0.75 ? "🟧" : "🟫"; }).join(" ") + (W.hits.length < W.need ? " " + fgDim((W.need - W.hits.length) + " to go") : "") + "</div>";
h += "<div style='margin-top:6px'>" + fgB("strike", (W.verb === "Fit" ? "🔧 " : W.verb === "Shape" ? "🪚 " : "🔨 ") + W.verb + "!", true) + fgB("stopwork", "Set it aside") + "</div>";
if (fgTouch())
h += "<div style='font-size:11.5px;opacity:.6'>Tap the button.</div>";
else
h += "<div style='font-size:11.5px;opacity:.6'>Space also " + W.verb.toLowerCase() + "s.</div>";
return h;
},
function () {
var W = FG.work;
if (!W || W.raf)
return;
var step = function () {
W.raf = 0;
if (FG.work !== W || !FG.open)
return;
var h = fgHeat(), m = document.getElementById("fg-heat"), w = document.getElementById("fg-heatw");
if (m) {
m.style.left = (h * 100).toFixed(1) + "%";
}
if (w) {
var t = fgHeatWord(h);
if (w.textContent !== t) {
w.textContent = t;
}
w.style.color = "rgb(" + Math.round(200 + 55 * h) + "," + Math.round(170 + 40 * h) + "," + Math.round(140 - 60 * h) + ")";
}
W.raf = requestAnimationFrame(step);
};
W.raf = requestAnimationFrame(step);
},
function () {
var W = FG.work;
if (!W || FG.busy)
return;
var h = fgHeat();
W.hits.push(h);
if (typeof playTone === "function")
try {
playTone(W.verb === "Strike" ? 220 + h * 180 : W.verb === "Fit" ? 320 + h * 120 : 260 + h * 80, 0.09);
}
catch (e) { }
if (W.hits.length < W.need) {
if (W.raf)
cancelAnimationFrame(W.raf);
W.raf = 0;
fgPaint();
return;
}
var s = 0;
W.hits.forEach(function (x) { s += x * x; });
s /= W.hits.length;
if (W.raf)
cancelAnimationFrame(W.raf);
W.raf = 0;
fgMakeNow(W.R, s, W.name, W.colour);
},
function (R, skill, name, colour) {
if (FG.busy)
return;
FG.busy = true;
FG.msg = "Working…";
fgPaint();
fgRpc("craft_make", { p_recipe: R.key, p_skill: Math.round(skill * 1000) / 1000, p_name: name || null, p_colour: colour || null }).then(function (o) {
FG.busy = false;
FG.work = null;
if (!o || !o.ok) {
FG.msg = esc((o && o.say) || "That did not come out right.");
fgPaint();
return;
}
FG.msg = "<b>" + esc(o.say || "Done.") + "</b>" + (o.id ? " " + fgDim("(" + esc(fgQName(o.quality)) + ")") : "");
if (o.quality === 5)
fgSay("<b>A legendary piece!</b> " + esc(o.name) + " will be spoken of.");
else
fgSay(esc(o.say || "Done."));
if (o.id) {
FG.tab = "mine";
FG.design = null;
FG.tier = null;
FG.name = "";
}
return fgLoad().then(function () { if (o.id && typeof loadThings === "function")
loadThings(); if (typeof BKP !== "undefined" && BKP.open && typeof bkpLoad === "function")
bkpLoad(); });
}).catch(function (e) { FG.busy = false; FG.work = null; if (fgMissing(e))
FG.missing = true; FG.msg = esc((e && e.message) || String(e)); fgPaint(); });
},
function (k, n) {
if (FG.busy)
return;
FG.busy = true;
fgRpc("craft_buy", { p_kind: k, p_amount: n }).then(function (o) {
FG.busy = false;
FG.msg = esc((o && o.say) || "The counter is shut.");
if (o && o.ok) {
FG.stock[k] = fgHas(k) + (+o.amount || 0);
if (typeof refreshStanding === "function")
refreshStanding();
}
fgPaint();
})
.catch(function (e) { FG.busy = false; if (fgMissing(e))
FG.missing = true; FG.msg = esc((e && e.message) || String(e)); fgPaint(); });
},
function (what, by) {
var r = FG.rules || {};
var day = +r.per_day || 600, pvp = +r.pvp_gold || 25, on = !!r.on;
if (what === "day")
day = Math.max(0, day + (+by || 0));
else if (what === "pvp")
pvp = Math.max(0, pvp + (+by || 0));
else if (what === "on")
on = !on;
fgRpc("battle_bounty_set", { p_per_day: day, p_pvp: pvp, p_on: on }).then(function (o) { if (o && o.ok)
FG.rules = o;
else
FG.msg = esc((o && o.say) || ""); fgPaint(); }).catch(function () { });
},
function (id) {
var it = FG.byId[id];
if (!it)
return;
var k = "cr" + id;
if (!BW_ARMS[k])
fgRegister(it);
fgKeptSync();
if (typeof WLD !== "undefined" && WLD.on === "battle" && typeof bwEquip === "function") {
bwEquip(k);
bwSay("<b>" + esc(it.name) + "</b> in hand.");
}
else if (typeof bkpHold === "function") {
var q = (bkpKept() || []).filter(function (x) { return x.a === "bw_" + k; })[0];
bkpHold("bw_" + k, it.name, { keptId: q ? q.id : null });
}
fgPaint();
},
function (id) {
var it = FG.byId[id], R = it && FG_RB[it.recipe], D = R && FG_DB[R.design];
if (!D)
return;
var w = D.x.wear, K = FG_WEARKEY[w], L = meLook(), on = !fgWorn(it);
if (on) {
L[K[0]] = w;
var c = fgCol(it.colour);
if (c == null && FG_TINT[R.tier] != null && w !== "gloves")
c = FG_TINT[R.tier];
if (c != null)
L[K[1]] = c;
fgWornMap()[w] = id;
}
else {
L[K[0]] = w === "boots" ? "shoes" : null;
delete fgWornMap()[w];
}
L.src = L.src || {};
L.src[K[0]] = "chosen";
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
fgSay(on ? "<b>You put on " + esc(it.name) + ".</b>" + (typeof WLD !== "undefined" && WLD.on === "battle" ? " It turns " + Math.round(fgProt() * 100) + "% of every blow (with any other armour you wear)." : "") : "You take off " + esc(it.name) + ".");
fgPaint();
},
function (id) {
var it = FG.byId[id], R = it && FG_RB[it.recipe], D = R && FG_DB[R.design];
if (!D || typeof ride !== "function")
return;
if (FG.rideId === id && typeof riding !== "undefined" && riding) {
FG.rideId = null;
FG.rideItem = null;
ride(null);
fgPaint();
return;
}
if (typeof WLD !== "undefined" && WLD.on) {
FG.msg = "Vehicles are driven in Somnucor. Bring it out on the city's roads.";
fgPaint();
return;
}
if (store.inside) {
FG.msg = "Step outside first: it waits for you in the street.";
fgPaint();
return;
}
var go = function () {
if (!(myThings || []).some(function (t) { return t.name === D.item; })) {
FG.msg = "It is still being wheeled out. Try again in a moment.";
fgPaint();
return;
}
FG.rideId = id;
FG.rideItem = D.item;
if (typeof rideG !== "undefined" && rideG) {
try {
scene.remove(rideG);
}
catch (e) { }
rideG = null;
}
ride(D.item);
craftClose();
setStatus("<b>" + esc(it.name) + "</b>, your own " + esc(D.label.toLowerCase()) + ". " + ((typeof VEH !== "undefined" && VEH[D.x.veh] && VEH[D.x.veh].lic) ? "Mind the city's laws: a driving licence is needed on the road." : ""));
};
if (!(myThings || []).some(function (t) { return t.name === D.item; }) && typeof loadThings === "function")
loadThings().then(go);
else
go();
},
function (id) {
var it = FG.byId[id], R = it && FG_RB[it.recipe], D = R && FG_DB[R.design];
if (!D)
return;
if (!(typeof WLD !== "undefined" && WLD.on === "battle" && typeof bwMachine === "function")) {
FG.msg = "War machines roll out of the Motor Pool in Ironfray, in the Muster Camp.";
fgPaint();
return;
}
var M = FG.rolled[id];
if (M && BW.mach.indexOf(M) > -1) {
if (M.alive) {
craftClose();
bwMount(M);
}
else {
FG.msg = "Your " + esc(D.label.toLowerCase()) + " is being patched up; it rolls out again shortly.";
fgPaint();
}
return;
}
var used = {};
Object.keys(FG.rolled).forEach(function (k) { var m = FG.rolled[k]; if (m && BW.mach.indexOf(m) > -1)
used[m.bay] = 1; });
var bay = 0;
while (used[bay] && bay < FG_BAYS.length - 1)
bay++;
if (used[bay]) {
var old = Object.keys(FG.rolled).filter(function (k) { return FG.rolled[k] && FG.rolled[k].bay === bay; })[0];
fgPark(+old);
}
var team = "cr" + id, col = fgCol(it.colour) || FG_TINT[R.tier === "legend" ? "darksteel" : R.tier === "veteran" ? "steel" : "iron"] || 0x5A6A4A;
if (typeof BW_TEAMS !== "undefined")
BW_TEAMS[team] = { name: it.name, col: col, dark: col, css: "#ddd" };
var b = FG_BAYS[bay], t0 = BW.G ? BW.G : null;
if (!t0)
return;
var m = bwMachine(D.x.mach, team, b[0], b[1], Math.PI);
m.pool = true;
m.team = "pool";
m.crafted = id;
m.bay = bay;
m.home = { x: b[0], z: b[1], rot: Math.PI };
m.max = m.hp = Math.round(m.T.hp * (R.mult || 1) * fgQ(it.quality));
try {
m.g.traverse(function (o) { o.raycast = function () { }; });
}
catch (e) { }
if (typeof makeTag === "function")
try {
var tg = makeTag(it.name, false);
tg.position.y = (m.T.bar || 4) + 1.2;
m.g.add(tg);
}
catch (e) { }
FG.rolled[id] = m;
craftClose();
bwSay("<b>" + esc(it.name) + " rolls out of the Motor Pool.</b> Walk up to it and press E to climb in.", true);
},
function (G) {
var f = new THREE.Group();
f.position.set(34, 0, 0);
f.rotation.y = -Math.PI / 2;
G.add(f);
var stone = bwMat(0x6A6460), wood = bwMat(0x5A4028), dark = bwMat(0x2A2826), iron = bwMat(0x4A4C50);
wBox(12, 0.3, 8, bwMat(0x5A5048), 0, 0.15, 0, f);
[[-5.6, -3.6], [5.6, -3.6], [-5.6, 3.6], [5.6, 3.6], [0, -3.6]].forEach(function (p) { wCyl(0.22, 0.24, 4.6, wood, p[0], 2.3, p[1], f, 6); });
var roof = wBox(13, 0.25, 9, bwMat(0x4A3A2A), 0, 4.7, 0, f);
roof.rotation.x = 0.06;
wBox(3.2, 1.1, 2.2, stone, 0, 0.55, -2.9, f);
wBox(3.4, 0.2, 2.4, dark, 0, 1.15, -2.9, f);
wBox(2.4, 0.12, 1.4, new THREE.MeshBasicMaterial({ color: 0xD8682A }), 0, 1.28, -2.9, f);
wCone(1.9, 1.8, stone, 0, 2.6, -2.9, f, 4).rotation.y = Math.PI / 4;
wBox(0.9, 3.6, 0.9, stone, 0, 4.8, -2.9, f);
if (typeof wGlow === "function")
try {
var gl = wGlow(0xFF8A3A, 3.2, 0.3);
gl.position.set(0, 1.8, -2.6);
f.add(gl);
}
catch (e) { }
wBox(0.9, 0.3, 1.4, bwMat(0x6A4A2A), 2.3, 0.9, -2.9, f);
[[-1.4, -0.4], [1.4, -0.4]].forEach(function (p) {
var a = new THREE.Group();
a.position.set(p[0], 0, p[1]);
f.add(a);
wCyl(0.32, 0.4, 0.6, wood, 0, 0.3, 0, a, 8);
wBox(0.9, 0.28, 0.34, iron, 0, 0.75, 0, a);
wCone(0.17, 0.42, iron, 0.62, 0.75, 0, a, 4).rotation.z = -Math.PI / 2;
});
wBox(1.8, 0.6, 0.7, wood, 3.6, 0.3, -1.2, f);
wBox(1.6, 0.08, 0.5, new THREE.MeshPhongMaterial({ color: 0x2A3A44, shininess: 80 }), 3.6, 0.62, -1.2, f);
wBox(1.1, 0.12, 5, wood, -5, 1.0, 0, f);
[-2.2, 0, 2.2].forEach(function (z) { wBox(1.0, 1.0, 0.12, wood, -5, 0.5, z, f); });
wBox(0.12, 2.2, 6, wood, -5.7, 2.2, 0, f);
if (typeof HELD !== "undefined")
["sword", "axe", "bwHammer", "spear", "bwRifle", "bow"].forEach(function (h, i) { if (!HELD[h])
return; var m = HELD[h](); m.position.set(-5.55, 1.6, -2.4 + i * 0.95); m.rotation.y = Math.PI / 2; m.scale.setScalar(0.9); f.add(m); });
for (var i = 0; i < 6; i++)
wBox(0.24, 0.18, 0.5, bwMat(0x8A8C90), 5, 0.45 + Math.floor(i / 3) * 0.2, 1.2 + (i % 3) * 0.3, f);
for (var j = 0; j < 4; j++) {
wCyl(0.14, 0.14, 2.4, bwMat(0x7A5A3A), 5.2 - (j % 2) * 0.3, 0.18 + j * 0.28, -0.4, f, 6).rotation.x = Math.PI / 2;
}
wBox(1.4, 0.08, 1, bwMat(0x8A6A4A), 4.6, 0.9, 2.8, f);
var sg = wSign(["The War Forge", "Make your own weapons and armour"], 5, 1.5, "#2A1810", "#F0D8A0");
sg.position.set(0, 5.5, 4.7);
f.add(sg);
var fm = wPerson("bwforgemaster", { title: "Forgemaster", look: { sex: "f", layer: "apron", layerColor: 0x4A3020, top: 0x8A4A2A, bottom: 0x3A3028, hairStyle: "bun", hands: "gloves", accColor: 0x3A2A1A } });
fm.position.set(30.2, 0, 0.4);
fm.rotation.y = -Math.PI / 2;
G.add(fm);
bwSolid({ x: 36.9, z: 0, hw: 1.2, hd: 1.7, h: 2 });
bwSolid({ x: 34.4, z: -1.4, hw: 0.5, hd: 0.5, h: 1 });
bwSolid({ x: 34.4, z: 1.4, hw: 0.5, hd: 0.5, h: 1 });
bwSolid({ x: 35.2, z: 3.6, hw: 0.4, hd: 0.9, h: 1 });
bwSolid({ x: 34, z: -5.2, hw: 2.6, hd: 0.6, h: 1.2 });
bwSolid({ x: 34, z: 5, hw: 2.6, hd: 0.6, h: 1 });
BW.talk.push({ x: 29.4, z: 0, r: 4.2, name: "The War Forge", verb: "make weapons and armour of your own", fn: function () { craftOpen("warforge"); } });
BW.talk.push({ x: 0, z: 24.5, r: 3.2, name: "The Mechanic", verb: "build or roll out your own war machine", fn: function () { craftOpen("engineer"); } });
},
function (G) {
FG.spots = [];
FG_SPOTS.forEach(function (s) {
var Z = BW_Z[s[2]];
if (!Z)
return;
var ax = -Z.x, az = -Z.z, al = Math.hypot(ax, az) || 1;
ax /= al;
az /= al;
var c = Math.cos(s[3]), sn = Math.sin(s[3]), dx = ax * c - az * sn, dz = ax * sn + az * c;
var x = Z.x + dx * Z.r * s[4], z = Z.z + dz * Z.r * s[4];
for (var t = 0; t < 14 && (bwSolidAt(x, z, 0.5) || bwSolidAt(x + 1.5, z, 0.5) || bwSolidAt(x - 1.5, z, 0.5)); t++) {
x += dz * 2.5;
z -= dx * 2.5;
}
var g = fgSpotMesh(s[1]);
g.position.set(x, bwSupport(x, z, 0), z);
g.rotation.y = (s[3] * 7) % 6.28;
G.add(g);
var S = { id: s[0], kind: s[1], x: x, z: z, g: g, zone: s[2], regrow: s[7] };
bwSolid({ x: x, z: z, r: s[1] === "cr_wood" ? 0.6 : 1.0 });
FG.spots.push(S);
BW.talk.push({ x: x, z: z, r: 2.8, name: fgSpotName(s[1]), verb: fgSpotVerb(s[1]), fn: function () { fgGather(S); }, zone: s[2] });
});
},
function (k) {
var g = new THREE.Group();
if (k === "cr_wood") {
var t = wCyl(0.45, 0.55, 7, bwMat(0x5A4028), 0, 0.5, 0, g, 8);
t.rotation.z = Math.PI / 2;
for (var i = 0; i < 3; i++) {
var l = wCyl(0.22, 0.24, 2.2, bwMat(0x8A6A44), -1.4 + i * 1.2, 0.25, 1.2, g, 7);
l.rotation.z = Math.PI / 2;
l.rotation.y = 0.3 * i;
}
wCyl(0.5, 0.5, 0.18, bwMat(0xB89A6A), 3.5, 0.5, 0, g, 8).rotation.z = Math.PI / 2;
return g;
}
if (k === "cr_scrap") {
[[0, 0, 1.8], [1.2, 0.4, 1.1], [-1, 0.3, 1.2], [0.3, 1, 0.9]].forEach(function (p, i) { var b = wBox(p[2], p[2] * 0.5, p[2] * 0.8, bwMat(i % 2 ? 0x6A4A3A : 0x5A5C60), p[0], p[1] + p[2] * 0.25, (i - 1.5) * 0.4, g); b.rotation.set(i * 0.4, i * 0.7, i * 0.2); });
var wh = wCyl(0.5, 0.5, 0.3, bwMat(0x2A2A2A), 1.6, 0.5, 0.8, g, 10);
wh.rotation.x = 1.2;
return g;
}
var rockCol = k === "cr_ember" ? 0x3A2A26 : k === "cr_crystal" ? 0x3A4A52 : k === "cr_coal" ? 0x3A3634 : 0x6A625A;
var r = wSph(1.3, bwMat(rockCol), 0, 0.6, 0, g, 7);
r.scale.set(1.3, 0.8, 1.0);
wSph(0.8, bwMat(rockCol), 1.1, 0.4, 0.4, g, 6).scale.set(1, 0.7, 1);
if (k === "cr_ore") {
for (var o = 0; o < 6; o++)
wBox(0.2, 0.12, 0.2, bwMat(0x8A5A3A), Math.cos(o) * 0.9, 0.7 + (o % 3) * 0.2, Math.sin(o) * 0.6, g).rotation.y = o;
}
if (k === "cr_coal") {
for (var c = 0; c < 5; c++)
wBox(0.3, 0.2, 0.3, bwMat(0x141414), Math.cos(c * 1.3) * 0.8, 0.9, Math.sin(c * 1.3) * 0.6, g).rotation.y = c;
}
if (k === "cr_ember") {
var em = new THREE.MeshBasicMaterial({ color: 0xC8582A });
for (var e = 0; e < 4; e++) {
var s = wSph(0.22, em, Math.cos(e * 1.6) * 0.8, 0.8 + (e % 2) * 0.2, Math.sin(e * 1.6) * 0.6, g, 6);
s.scale.set(1, 0.5, 1);
}
}
if (k === "cr_crystal") {
var cm = new THREE.MeshPhongMaterial({ color: 0x8ACFE8, emissive: 0x1A3A48, shininess: 100, transparent: true, opacity: 0.88 });
for (var q = 0; q < 7; q++) {
var cr = wCone(0.22 + 0.08 * (q % 3), 1.2 + 0.5 * (q % 3), cm, Math.cos(q) * 0.7, 1.2, Math.sin(q) * 0.5, g, 6);
cr.rotation.set(Math.sin(q) * 0.4, 0, Math.cos(q) * 0.4);
}
}
return g;
},
function (S) {
if (BW.downT)
return;
if (!(typeof signedIn === "function" && signedIn())) {
bwSay("Sign in to gather: what you find is kept against your account.");
return;
}
if (FG.picked[S.id] && Date.now() < FG.picked[S.id]) {
bwSay("You have had what there is here for now. Worth another look in " + Math.ceil((FG.picked[S.id] - Date.now()) / 60000) + " minutes.");
return;
}
if (FG.gathering)
return;
FG.gathering = { S: S, t: 0 };
bwSay("<b>" + esc(fgSpotName(S.kind)) + "</b>: " + esc(fgSpotVerb(S.kind)) + "…");
if (typeof playTone === "function")
try {
playTone(200, 0.1);
}
catch (e) { }
setTimeout(function () { if (typeof playTone === "function")
try {
playTone(240, 0.1);
}
catch (e) { } }, 700);
setTimeout(function () {
var G0 = FG.gathering;
FG.gathering = null;
if (!G0 || BW.downT)
return;
var L = worldLocal();
if (Math.hypot(L.x - S.x, L.z - S.z) > 4.5) {
bwSay("You moved off before you were done.");
return;
}
fgRpc("craft_gather", { p_spot: S.id }).then(function (o) {
if (o && o.ok) {
FG.picked[S.id] = Date.now() + (+o.regrow || S.regrow) * 60000;
FG.stock[o.kind] = fgHas(o.kind) + (+o.got || 0);
var M = FG_MB[o.kind] || { icon: "" };
bwFeed(M.icon + " +" + o.got + " " + esc((M.name || o.kind).toLowerCase()), "#CFE8C0");
bwSay("<b>" + esc(o.say) + "</b> Take it to the War Forge in the Muster Camp.", true);
if (S.g)
S.g.scale.setScalar(0.82);
}
else {
if (o && o.wait)
FG.picked[S.id] = Date.now() + o.wait * 60000;
bwSay(esc((o && o.say) || "Nothing came of it."));
}
}).catch(function (e) { bwSay(fgMissing(e) ? "Gathering opens soon." : esc((e && e.message) || String(e))); });
}, 1600);
},
function () {
var q = FG.queue.shift();
if (!q) {
FG.qBusy = false;
return;
}
FG.qBusy = true;
fgRpc("battle_bounty", { p_foe: q.foe }).then(function (o) {
if (o && o.ok) {
if (o.gold > 0) {
bwFeed("💰 +" + o.gold + " gold" + (q.name ? " · " + esc(q.name) : ""), "#FFD88A");
BW.goldWon = (BW.goldWon || 0) + o.gold;
if (typeof refreshStanding === "function")
refreshStanding();
}
else if (o.why === "visitors are not paid in gold" && !FG.toldVisitor) {
FG.toldVisitor = 1;
bwSay("Bounties are paid in gold, and only to dreamers who pay their dues.");
}
else if (o.why === "the day's bounty is all paid" && !FG.toldCap) {
FG.toldCap = 1;
bwSay("You have earned all the bounty the Treasury pays one dreamer in a day. Renown and spoils still count.");
}
if (o.got > 0 && o.salvage) {
var M = FG_MB[o.salvage] || { icon: "", name: o.salvage };
FG.stock[o.salvage] = fgHas(o.salvage) + o.got;
bwFeed(M.icon + " +" + o.got + " " + esc(M.name.toLowerCase()), "#CFE8C0");
}
}
}).catch(function (e) { if (fgMissing(e))
FG.noBounty = true; }).then(function () { setTimeout(fgBountyNext, 250); });
},
function () {
var el = document.getElementById("fg-city");
if (!el) {
el = document.createElement("button");
el.id = "fg-city";
el.className = "btn";
el.style.cssText = "position:fixed;left:50%;transform:translateX(-50%);top:calc(74px + env(safe-area-inset-top,0px));z-index:44;display:none;border:1px solid #D8883A;background:rgba(24,16,10,.9);color:#F4DDB4;border-radius:10px;padding:9px 16px;font-size:15px;font-weight:600";
el.onclick = function () { var s = el.getAttribute("data-st"); if (s)
craftOpen(s); };
document.body.appendChild(el);
}
return el;
},
function (ctx) {
var p = String((ctx && (ctx.place || "")) + " " + (ctx && ctx.title || "")).toLowerCase(), w = ctx && ctx.world || "";
if (w === "battle")
return /mechanic|motor/.test(p) ? "engineer" : "warforge";
if (/volcano|hephaest/.test(p))
return "volcano";
if (/transport yard|garage|mechanic|motor/.test(p))
return "garage";
if (/joiner|carpent|wood/.test(p))
return "joinery";
if (/smith|forge|armour|armor|weapon/.test(p))
return "smithy";
return null;
}
];
});
