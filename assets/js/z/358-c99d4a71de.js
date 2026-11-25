/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(358, function () {
return [
function () {
if (!hndSigned())
return Promise.resolve(HNDP.stock);
return cityRpc("my_stock", {}).then(function (rows) {
var o = {};
(Array.isArray(rows) ? rows : []).forEach(function (r) { o[r.kind] = +r.amount || 0; });
HNDP.stock = o;
if (typeof myStock !== "undefined" && Array.isArray(rows)) {
try {
myStock = rows;
if (typeof paintStock === "function")
paintStock();
}
catch (e) { }
}
return o;
}).catch(function () { return HNDP.stock; });
},
function (k) {
var m = null;
HND_MATS.forEach(function (r) { if (r[0] === k)
m = r; });
if (m)
return m[1];
var t = /^sk_t_(\w+)_(\d)$/.exec(k);
if (t)
return HND_TOOL_TIERS[+t[2] - 1][1] + " " + HND_TOOL_NAME[t[1]];
var d = HND_DISHES.concat(HND_DRAUGHTS).filter(function (x) { return x[0] === k; })[0];
if (d)
return d[1];
var r = /^sk_ring_(\w+)_(\d)$/.exec(k);
if (r)
return ["Silver", "Gold", "Moonsilver", "Starstone"][+r[2] - 1] + " ring of " + HND_BY[r[1]].name;
var b = /^sk_brace_(\d)$/.exec(k);
if (b)
return ["Silver", "Gold", "Moonsilver", "Starstone"][+b[1] - 1] + " Artisan's bracelet";
if (typeof grMatOf === "function") {
var g = grMatOf(k);
if (g && g.name && g.name !== k)
return g.name;
}
var my = (typeof myStock !== "undefined" && myStock) || [];
for (var i = 0; i < my.length; i++)
if (my[i].kind === k && my[i].name)
return my[i].name;
return k;
},
function (o) {
if (!o || !o.skill || !HNDP.me)
return;
HNDP.me.xp = HNDP.me.xp || {};
var was = hndLvl(o.skill);
HNDP.me.xp[o.skill] = +o.total || hndXp(o.skill) + (+o.xp || 0);
var S = HND_BY[o.skill], now = hndLvl(o.skill);
hndFeed(S.icon + " +" + (+o.xp || 0) + " " + S.name + " XP" + (o.extra > 0 ? " · +" + o.extra + " from your skill" : "") + (o.rare ? " · a rare find!" : ""));
if (now > was) {
hndTone(523, 0.18);
setTimeout(function () { hndTone(784, 0.22); }, 160);
var nx = HND_TIERS.filter(function (t) { return t === now; })[0];
setStatus(S.icon + " <b>" + esc(S.name) + " level " + now + ".</b> " + (now >= HND_MAX ? "You are a <b>Master of " + esc(S.name) + "</b>: your Master's cape is in your 🎒 Backpack, under Clothes." : nx ? "A new tier opens: " + esc(hndTierWord(o.skill, HND_TIERS.indexOf(nx))) + "." : "Every level adds a little to what you get."));
}
if (o.rare)
setTimeout(function () { setStatus("✨ <b>A rare find:</b> " + esc(hndMatName(o.rare)) + ". It is only ever found, never sold at a counter. In your 🎒 Backpack, under Materials."); }, 1800);
},
function (t) {
if (!HNDP.feedEl) {
var d = document.createElement("div");
d.id = "hnd-feed";
d.style.cssText = "position:fixed;left:50%;transform:translateX(-50%);bottom:132px;z-index:60;pointer-events:none;padding:5px 12px;border-radius:14px;background:rgba(18,22,30,.78);border:1px solid rgba(200,170,110,.45);color:#F2E2B0;font:600 13px var(--sans,system-ui);transition:opacity 1.2s ease;opacity:0";
document.body.appendChild(d);
HNDP.feedEl = d;
}
HNDP.feedEl.textContent = t;
HNDP.feedEl.style.opacity = "1";
clearTimeout(HNDP.feedT);
HNDP.feedT = setTimeout(function () { if (HNDP.feedEl)
HNDP.feedEl.style.opacity = "0"; }, 3200);
},
function (k, t) {
var S = HND_BY[k];
if (!S)
return "";
if (S.gather) {
var N = HND_NODES[k][t];
return N.name.replace(/^(A|An) /, "") + (N.altName ? " and " + N.altName.replace(/^(A|An) /, "").toLowerCase() : "") + ", and " + HND_TOOL_TIERS[t][1].toLowerCase() + " " + HND_TOOL_NAME[k] + "s";
}
var r = HND_RECIPES.filter(function (R) { return R.sk === k && R.lvl === HND_TIERS[t]; }).map(function (R) { return R.label; });
return r.length ? r.slice(0, 3).join(", ").toLowerCase() : "finer work at every forge";
},
function (k) {
var x = hndXp(k), L = hndLvl(k), a = hndXpFor(L), b = hndXpFor(Math.min(HND_MAX, L + 1)), p = L >= HND_MAX ? 1 : Math.max(0, Math.min(1, (x - a) / Math.max(1, b - a)));
return "<div style='height:5px;background:rgba(255,255,255,.12);border-radius:3px;margin-top:3px'><div style='height:5px;width:" + Math.round(p * 100) + "%;background:" + HND_BY[k].col + ";border-radius:3px'></div></div>";
},
function () {
if (!hndSigned()) {
worldCard(worldFacts("⚒️ The Guild of Hands", "The crafts", [], ["Sign in first: your crafts and levels are kept against your account."]), {});
return;
}
hndFetch(true).then(function () {
if (HNDP.missing) {
worldCard(worldFacts("⚒️ The Guild of Hands", "The crafts", [], [hndNotOpen()]), {});
return;
}
if (!hndJoined())
return hndInvite();
HNDP.confirmLeave = false;
hndHome();
});
},
function () {
var fns = {}, h = worldFacts("⚒️ The Guild of Hands", "Take up the crafts, if you like", [
["Gathering", "Woodcutting, Mining, Fishing, Foraging, Hunting"], ["Making", "Smithing, Woodworking, Tailoring, Engineering, Cooking, Alchemy, Jewelcrafting"],
["Levels", "1 to 60 in each, with a new tier at 12, 24, 36 and 48, and a Master's cape at 60"]
], ["It is entirely your choice. Nothing changes unless you take them up, and it never takes anything away: every gathering spot and forge works just as it does now.",
"Members learn as they work, everywhere in the game, and their levels and tools add to what they get. They may also go to the Guildlands, a valley of forest, quarry, lake and moor with the Guild town of Anvilmere.",
"You can put the crafts down whenever you like; your levels are kept."]);
h += worldBtn("join", "Take up the crafts", "Join the Guild of Hands (free)");
h += worldBtn("no", "Not now", "");
fns.join = function () {
cityRpc("skill_join", {}).then(function (o) { if (o && o.ok) {
hndTone(440, 0.2);
hndFetch(true).then(function () { hndHome("<b>Welcome to the Guild of Hands.</b> You start at level 1 in every craft. Gather or make anything, anywhere, and you learn. The Toolmaker in the Guildhall, in the Guildlands, sells your first tools."); });
}
else
worldCard(worldFacts("⚒️ The Guild of Hands", "", [], [(o && o.say) || "That did not go through."]), {}); })
.catch(function (e) { worldCard(worldFacts("⚒️ The Guild of Hands", "", [], [hndMissingErr(e) ? hndNotOpen() : "Couldn't reach the city."]), {}); });
};
fns.no = function () { worldCard(null); };
worldCard(h, fns);
},
function (msg) {
var fns = {}, h = HND_H + "⚒️ Your crafts</div><div style='opacity:.8;font-size:12px;margin:2px 0 6px'>Total level " + hndTotal() + " of " + (HND_SKILLS.length * HND_MAX) + (HNDP.me && HNDP.me.open === false ? " · <b>the Keeper has closed the Guildlands for now</b>" : "") + "</div>";
if (msg)
h += "<div style='margin:4px 0 8px;padding:6px 8px;border-left:3px solid #C8A868;background:rgba(200,168,104,.08);font-size:12.5px'>" + msg + "</div>";
var bf = [];
if (hndBuff("fed"))
bf.push("Well fed (+" + Math.round(+hndBuff("fed").val) + "% XP)");
if (hndBuff("plenty"))
bf.push("Plenty");
if (hndBuff("steady"))
bf.push("Steady hands");
if (hndBuff("keen"))
bf.push("Keen eyes");
if (hndBuff("insight"))
bf.push("Insight");
if (bf.length)
h += "<div style='font-size:12px;opacity:.85;margin-bottom:6px'>Now: " + esc(bf.join(", ")) + "</div>";
h += "<div style='display:grid;grid-template-columns:repeat(auto-fill,minmax(132px,1fr));gap:6px'>";
HND_SKILLS.forEach(function (S) {
var b = hndBoost(S.k);
h += "<div data-w='s_" + S.k + "' role='button' tabindex='0' style='padding:6px 8px;border:1px solid rgba(143,180,232,.4);border-radius:5px;background:rgba(143,180,232,.06)" + (hndOff(S.k) ? ";opacity:.5" : "") + "'><div style='font-size:12.5px'>" + S.icon + " <b>" + esc(S.name) + "</b></div><div style='font-size:12px;opacity:.85'>Level " + hndLvl(S.k) + (b ? " <span style='color:#9FD8A8'>(+" + b + ")</span>" : "") + (hndLvl(S.k) >= HND_MAX ? " · Master" : "") + "</div>" + hndBar(S.k) + "</div>";
fns["s_" + S.k] = function () { hndSkillCard(S.k); };
});
h += "</div>";
h += worldBtn("pantry", "🍲 Dishes and draughts", "Eat or drink what you have made");
fns.pantry = function () { hndPantry(); };
if (typeof WLD !== "undefined" && WLD.on === HND_KEY) {
h += worldBtn("leavew", "Leave the Guildlands", "Back to where you came from");
fns.leavew = function () { worldCard(null); hndHomeWorld(); };
}
else if (!(typeof WLD !== "undefined" && WLD.on)) {
h += worldBtn("go", "Go to the Guildlands", "Arrive in Anvilmere, the Guild town");
fns.go = function () { worldCard(null); hndGo({}); };
}
h += worldBtn("board", "📜 The Guild's board", "The Masters of each craft, and the highest totals");
fns.board = function () { hndBoard(); };
h += worldBtn("leave", HNDP.confirmLeave ? "Tap again to put the crafts down" : "Put the crafts down", "Everything about them hides again; your levels are kept");
fns.leave = function () {
if (!HNDP.confirmLeave) {
HNDP.confirmLeave = true;
hndHome();
return;
}
HNDP.confirmLeave = false;
cityRpc("skill_leave", {}).then(function (o) { hndFetch(true).then(function () { if (typeof WLD !== "undefined" && WLD.on === HND_KEY)
hndHomeWorld(); worldCard(worldFacts("⚒️ The Guild of Hands", "", [], [(o && o.say) || "Done."]), {}); }); }).catch(function () { });
};
worldCard(h, fns);
},
function (k) {
var S = HND_BY[k], L = hndLvl(k), x = hndXp(k), fns = {}, rows = [["Level", L + (hndBoost(k) ? " (+" + hndBoost(k) + " while you hold your " + (S.gather ? "ring" : "bracelet") + ")" : "") + " of " + HND_MAX],
["XP", x.toLocaleString() + (L < HND_MAX ? " · " + (hndXpFor(L + 1) - x).toLocaleString() + " to level " + (L + 1) : " · Master")]];
if (S.gather) {
var t = hndTool(k);
rows.push(["Your " + HND_TOOL_NAME[k], t ? HND_TOOL_TIERS[t - 1][1] : "none yet (the Toolmaker in the Guildhall)"]);
}
var notes = [S.about];
HND_TIERS.forEach(function (lv, t) { notes.push((hndEff(k) >= lv ? "✓ " : "○ ") + "Level " + lv + ": " + hndTierWord(k, t)); });
notes.push("Level 60: Master of " + S.name + ", and the Master's cape.");
if (S.gather)
notes.push("Each level adds to what every gather gives you (about one more at 30, two at 60); from level 24 the rare find (" + hndMatName(HND_RARE[k]) + ") grows more likely.");
else if (k === "cook" || k === "alch" || k === "jewel")
notes.push("Each level opens the next recipe at the Guild's bench in Anvilmere.");
else
notes.push("Each level adds half a point in a hundred to your hammer score at every forge (up to 30 at 60), so your pieces come out finer more often.");
if (hndOff(k))
notes.push("The Keeper has paused this craft for now: no XP until it is back.");
var h = worldFacts(S.icon + " " + S.name, S.gather ? "A gathering craft" : "A making craft", rows, notes) + hndBar(k);
h += worldBtn("back", "Back to your crafts", "");
fns.back = function () { hndHome(); };
worldCard(h, fns);
},
function (msg) {
hndStockLoad().then(function () {
var fns = {}, h = HND_H + "🍲 Dishes and draughts</div>";
if (msg)
h += "<div style='margin:4px 0 8px;font-size:12.5px'>" + msg + "</div>";
var any = false;
HND_DISHES.forEach(function (D) {
var n = hndHave(D[0]);
if (!n && !hndKeeper())
return;
any = true;
h += worldBtn("e_" + D[0], "Eat: " + esc(D[1]) + (n ? " ×" + n : ""), "+" + D[3] + " Food · Well fed " + D[4] + " min, +" + D[5] + "% XP");
fns["e_" + D[0]] = function () { hndUse(D[0]); };
});
HND_DRAUGHTS.forEach(function (D) {
var n = hndHave(D[0]);
if (!n && !hndKeeper())
return;
any = true;
h += worldBtn("e_" + D[0], "Drink: " + esc(D[1]) + (n ? " ×" + n : ""), esc(D[6]) + ", " + D[4] + " min");
fns["e_" + D[0]] = function () { hndUse(D[0]); };
});
if (!any)
h += "<div style='opacity:.8;font-size:12.5px'>None yet. Cook at the Guild kitchen and brew at the Apothecary's bench, both in Anvilmere.</div>";
h += worldBtn("back", "Back to your crafts", "");
fns.back = function () { hndHome(); };
worldCard(h, fns);
});
},
function (kind) {
cityRpc("skill_use", { p_kind: kind }).then(function (o) {
hndTone(392, 0.15);
hndFetch(true).then(function () { hndPantry(esc((o && o.say) || "")); });
if (o && o.food != null && typeof needsPoll === "function")
try {
needsPoll();
}
catch (e) { }
})
.catch(function (e) { hndPantry(esc(hndMissingErr(e) ? hndNotOpen() : "Couldn't reach the city.")); });
},
function (st, msg) {
if (!hndJoined()) {
worldCard(worldFacts(HND_STATIONS[st].name, "", [], ["Members of the Guild of Hands work here. Take up the crafts from the ⚒️ Crafts card."]), {});
return;
}
hndStockLoad().then(function () {
var Z = HND_STATIONS[st], S = HND_BY[Z.sk], fns = {}, h = HND_H + esc(Z.name) + "</div><div style='opacity:.8;font-size:12px;margin-bottom:6px'>" + S.icon + " " + esc(S.name) + " level " + hndEff(S.k) + "</div>";
if (msg)
h += "<div style='margin:4px 0 8px;padding:6px 8px;border-left:3px solid #C8A868;background:rgba(200,168,104,.08);font-size:12.5px'>" + msg + "</div>";
if (st === "toolsmith" || st === "rodbench" || st === "tailorbench" || st === "smelter" || st === "sawpit") { }
HND_RECIPES.filter(function (R) { return R.st === st; }).forEach(function (R) {
var ok = hndEff(R.sk) >= R.lvl || hndKeeper(), can = hndKeeper(), parts = [];
Object.keys(R.need).forEach(function (k) { var n = R.need[k], hv = hndHave(k); if (hv < n)
can = can || false; parts.push(n + " " + hndMatName(k).toLowerCase() + " (" + hv + ")"); });
var enough = hndKeeper() || Object.keys(R.need).every(function (k) { return hndHave(k) >= R.need[k]; });
var sub = "Level " + R.lvl + " · needs " + parts.join(", ") + " · " + R.xp + " XP";
if (!ok) {
h += "<div style='margin:6px 0;padding:7px 10px;border:1px solid rgba(255,255,255,.12);border-radius:4px;opacity:.55'><b>" + esc(R.label) + "</b><div style='font-size:12px'>" + esc(sub) + "</div></div>";
return;
}
h += worldBtn("m_" + R.key, (enough ? "" : "<span style='opacity:.6'>") + esc(R.label) + (R.n > 1 ? " (makes " + R.n + ")" : "") + (enough ? "" : "</span>"), esc(sub));
fns["m_" + R.key] = function () { hndCraft(st, R, 1); };
if (enough && !hndKeeper()) {
var times = Math.min(10, Math.min.apply(null, Object.keys(R.need).map(function (k) { return Math.floor(hndHave(k) / R.need[k]); })));
if (times > 1) {
h += "<div data-w='x_" + R.key + "' role='button' tabindex='0' style='margin:-2px 0 8px 12px;font-size:12px;text-decoration:underline;opacity:.85'>Make " + times + " at once</div>";
fns["x_" + R.key] = function () { hndCraft(st, R, times); };
}
}
});
worldCard(h, fns);
});
},
function (st, R, times) {
if (HNDP.busy)
return;
HNDP.busy = true;
hndTone(300, 0.1);
cityRpc("skill_craft", { p_recipe: R.key, p_times: times }).then(function (o) {
HNDP.busy = false;
if (o && o.ok) {
hndTone(523, 0.12);
try {
hndAfter(o);
}
catch (e) { }
}
hndStation(st, esc((o && o.say) || "Nothing came of it."));
})
.catch(function (e) { HNDP.busy = false; hndStation(st, esc(hndMissingErr(e) ? hndNotOpen() : "Couldn't reach the city.")); });
},
function (msg) {
if (!hndJoined()) {
worldCard(worldFacts("The Toolmaker", "", [], ["Members of the Guild of Hands buy their tools here. Take up the crafts from the ⚒️ Crafts card."]), {});
return;
}
hndFetch(true).then(function () {
var fns = {}, pr = (HNDP.me && HNDP.me.prices) || {}, h = HND_H + "🧰 The Toolmaker</div><div style='opacity:.8;font-size:12px;margin-bottom:6px'>Iron, steel and darksteel tools for the gathering crafts. Starmetal and Dreamforged ones are made by members, at the Toolsmith's anvil, the rod-maker's bench and the Tanner's bench. Holding a tool in your Backpack is enough.</div>";
if (msg)
h += "<div style='margin:4px 0 8px;padding:6px 8px;border-left:3px solid #C8A868;background:rgba(200,168,104,.08);font-size:12.5px'>" + msg + "</div>";
HND_GATHER.forEach(function (k) {
var t = hndTool(k), S = HND_BY[k];
h += "<div style='margin:8px 0 2px;font-size:12.5px'>" + S.icon + " <b>" + esc(S.tools) + "</b> · yours: " + (t ? HND_TOOL_TIERS[t - 1][1] : "none") + "</div>";
for (var i = 0; i < 3; i++) {
(function (i) {
var T = HND_TOOL_TIERS[i], cost = +(pr[String(i + 1)] || T[3]);
if (t >= i + 1)
return;
var ok = hndEff(k) >= T[2] || hndKeeper();
if (!ok) {
h += "<div style='margin:4px 0 4px 10px;font-size:12px;opacity:.55'>" + esc(T[1] + " " + HND_TOOL_NAME[k]) + " · level " + T[2] + "</div>";
return;
}
h += worldBtn("b_" + k + i, esc(T[1] + " " + HND_TOOL_NAME[k]), (hndKeeper() ? "free for the Keeper" : cost.toLocaleString() + " gold") + " · level " + T[2]);
fns["b_" + k + i] = function () {
cityRpc("skill_buy_tool", { p_skill: k, p_tier: i + 1 }).then(function (o) { if (o && o.ok)
hndTone(523, 0.12); hndToolmaker(esc((o && o.say) || "")); if (typeof refreshStanding === "function")
try {
refreshStanding();
}
catch (e) { } })
.catch(function (e) { hndToolmaker(esc(hndMissingErr(e) ? hndNotOpen() : "Couldn't reach the city.")); });
};
})(i);
}
});
worldCard(h, fns);
});
},
function () {
cityRpc("skill_board", {}).then(function (o) {
var m = (o && o.masters) || [], t = (o && o.top) || [], h = HND_H + "📜 The Guild's board</div>";
h += "<div style='margin:6px 0 2px;font-size:12px;opacity:.8'>MASTERS</div>" + (m.length ? m.map(function (x) { var S = HND_BY[x.skill] || { icon: "", name: x.skill }; return "<div style='font-size:12.5px'>" + S.icon + " " + esc(x.name) + ", Master of " + esc(S.name) + "</div>"; }).join("") : "<div style='font-size:12.5px;opacity:.75'>None yet. Level 60 in any craft.</div>");
h += "<div style='margin:10px 0 2px;font-size:12px;opacity:.8'>HIGHEST TOTALS</div>" + t.map(function (x, i) { return "<div style='font-size:12.5px'>" + (i + 1) + ". " + esc(x.name) + " · " + Number(x.total) + "</div>"; }).join("");
var fns = {};
h += worldBtn("back", "Back to your crafts", "");
fns.back = function () { hndHome(); };
worldCard(h, fns);
}).catch(function (e) { worldCard(worldFacts("📜 The Guild's board", "", [], [hndMissingErr(e) ? hndNotOpen() : "Couldn't reach the city."]), {}); });
},
function (x, z) {
var h = 3 + wFbm(x * 0.0045, z * 0.0045, 11, 4) * 8;
if (z < -230)
h += Math.pow(Math.min(1, (-z - 230) / 880), 1.15) * 30 + wFbm(x * 0.012, z * 0.012, 23, 3) * 5 * Math.min(1, (-z - 230) / 200);
var dp = Math.hypot(x - HND_PIT.x, z - HND_PIT.z);
h += 16 * Math.exp(-dp * dp / (430 * 430));
var dm = Math.hypot(x - HND_MOOR.x, z - HND_MOOR.z);
h += 30 * Math.exp(-dm * dm / (HND_MOOR.r * HND_MOOR.r));
var dt = Math.hypot(x - HND_MOOR.tx, z - HND_MOOR.tz);
h += 12 * Math.exp(-dt * dt / (140 * 140));
var df = Math.hypot(x - HND_FALLS.x - 40, z - HND_FALLS.z + 80);
h += 20 * Math.exp(-df * df / (160 * 160));
var dtw = Math.hypot(x - HND_TOWN.x, z - HND_TOWN.z);
h = h + (HND_TOWN.y - h) * (1 - hndSmooth(HND_TOWN.r - 40, HND_TOWN.r + 60, dtw));
if (dp < HND_PIT.R + 30) {
var rim = h, py = rim + hndPitY(dp);
h = dp < HND_PIT.R ? py : rim + (py - rim) * (1 - hndSmooth(HND_PIT.R, HND_PIT.R + 30, dp));
}
var ld = hndLakeD(x, z);
if (ld < 1.25)
h = h + ((HND_W - 8 * (1 - Math.min(1, ld))) - h) * (1 - hndSmooth(0.9, 1.25, ld));
var rd = hndRiverD(x, z);
if (rd < 34) {
var bed = HND_W - 3.6 + Math.min(3, rd * 0.22);
var k = 1 - hndSmooth(8, 34, rd);
h = h + (Math.min(h, bed) - h) * k;
}
var cz = hndCoast(x);
if (z > cz - 70) {
var sea = hndSmooth(cz - 70, cz + 60, z);
h = h * (1 - sea) + (HND_W - 7) * sea;
if (z > cz - 70 && z < cz + 10)
h = Math.max(h, HND_W - 0.4 + (cz - z) * 0.05);
}
return h;
},
function (x, z) {
var dp = Math.hypot(x - HND_PIT.x, z - HND_PIT.z);
if (dp < HND_PIT.R + 34)
return hndRaw(x, z);
var g = HND.grid;
if (!g)
return hndRaw(x, z);
var B = HND_BOUND, fx = (x - B.x0) / g.S, fz = (z - B.z0) / g.S, i = Math.max(0, Math.min(g.nx - 2, Math.floor(fx))), j = Math.max(0, Math.min(g.nz - 2, Math.floor(fz))), u = Math.max(0, Math.min(1, fx - i)), v = Math.max(0, Math.min(1, fz - j));
var a = g.H[j * g.nx + i], b = g.H[j * g.nx + i + 1], c = g.H[(j + 1) * g.nx + i], d = g.H[(j + 1) * g.nx + i + 1];
return u + v <= 1 ? a + (b - a) * u + (c - a) * v : d + (c - d) * (1 - u) + (b - d) * (1 - v);
},
function (x, z, h, sl, c) {
var n = wNoise(x * 0.05, z * 0.05, 5), base;
var dtw = Math.hypot(x - HND_TOWN.x, z - HND_TOWN.z), dp = Math.hypot(x - HND_PIT.x, z - HND_PIT.z), dm = Math.hypot(x - HND_MOOR.x, z - HND_MOOR.z);
if (h < HND_W + 0.6 && (z > hndCoast(x) - 80 || hndLakeD(x, z) < 1.12 || hndRiverD(x, z) < 14))
base = z > hndCoast(x) - 80 ? 0xD8C8A0 : 0x8A8060;
else if (dp < HND_PIT.R)
base = n > 0.5 ? 0x8A7E70 : 0x7A6E62;
else if (dm < HND_MOOR.r * 0.85 && h > 16)
base = n > 0.55 ? 0x7A5A6A : n > 0.3 ? 0x6A6A3A : 0x8A7A4A;
else if (z < -250)
base = n > 0.5 ? 0x3E5A26 : 0x4A6A2E;
else if (dtw < HND_TOWN.r)
base = n > 0.6 ? 0x6A8A3A : 0x5E8436;
else
base = n > 0.6 ? 0x6E9A3E : n > 0.25 ? 0x5E8E36 : 0x7AA048;
c.setHex(base);
if (sl > 0.7)
c.lerp(new THREE.Color(0x6A645A), Math.min(1, (sl - 0.7) * 1.5));
var v = 0.92 + wNoise(x * 0.2, z * 0.2, 9) * 0.16;
c.multiplyScalar(v);
},
function (name, mpt) {
var key = name + ":" + mpt;
if (HND.tex[key])
return HND.tex[key];
var t = new THREE.TextureLoader().load("assets/textures/photo/" + name + (HND.lite ? "" : "-1k") + ".jpg");
t.wrapS = t.wrapT = THREE.RepeatWrapping;
t.repeat.set(1 / mpt, 1 / mpt);
try {
t.anisotropy = Math.min(HND.lite ? 2 : 8, renderer.capabilities.getMaxAnisotropy());
}
catch (e) { }
if (THREE.sRGBEncoding && renderer && renderer.outputEncoding === THREE.sRGBEncoding)
t.encoding = THREE.sRGBEncoding;
return (HND.tex[key] = t);
},
function (name, tint, mpt, o) {
o = o || {};
var key = "s:" + name + ":" + tint + ":" + mpt + ":" + (o.vc ? 1 : 0) + (o.ds ? 1 : 0);
if (HND.mats[key])
return HND.mats[key];
var map = name ? hndTex(name, mpt) : null, m = HND.lite ? new THREE.MeshLambertMaterial({ color: tint, map: map }) : new THREE.MeshPhongMaterial({ color: tint, map: map, shininess: o.shine || 4, specular: 0x141210 });
if (o.vc)
m.vertexColors = true;
if (o.ds)
m.side = THREE.DoubleSide;
return (HND.mats[key] = m);
},
function (col, o) {
var k = "c" + col + (o ? JSON.stringify(o) : "");
if (HND.mats[k])
return HND.mats[k];
var m = HND.lite ? wM(col, o) : new THREE.MeshPhongMaterial({ color: col, shininess: (o && o.shine) || 8, specular: (o && o.spec) || 0x161410 });
if (!HND.lite && o) {
if (o.e !== undefined) {
m.emissive = new THREE.Color(o.e);
m.emissiveIntensity = o.ei || 1;
}
if (o.op !== undefined) {
m.transparent = true;
m.opacity = o.op;
m.depthWrite = false;
}
if (o.ds)
m.side = THREE.DoubleSide;
}
return (HND.mats[k] = m);
},
function (G) {
var g = HND.grid, B = HND_BOUND, S = g.S, nx = g.nx, nz = g.nz, c = new THREE.Color(), P = Math.round(600 / S);
var mat = hndSurf("grass", 0xFFFFFF, HND.lite ? 9 : 6, { vc: true });
for (var J = 0; J < nz - 1; J += P)
for (var I = 0; I < nx - 1; I += P) {
var i1 = Math.min(nx - 1, I + P), j1 = Math.min(nz - 1, J + P), w = i1 - I + 1, d = j1 - J + 1, pos = new Float32Array(w * d * 3), col = new Float32Array(w * d * 3), uv = new Float32Array(w * d * 2), idx = [];
for (var b = 0; b < d; b++)
for (var a = 0; a < w; a++) {
var i = I + a, j = J + b, k = b * w + a, x = B.x0 + i * S, z = B.z0 + j * S, h = g.H[j * nx + i];
var dp = Math.hypot(x - HND_PIT.x, z - HND_PIT.z);
if (dp < HND_PIT.R + 20)
h -= 3;
var hx = g.H[j * nx + Math.min(nx - 1, i + 1)] - g.H[j * nx + Math.max(0, i - 1)], hz = g.H[Math.min(nz - 1, j + 1) * nx + i] - g.H[Math.max(0, j - 1) * nx + i];
pos[k * 3] = x;
pos[k * 3 + 1] = h;
pos[k * 3 + 2] = z;
uv[k * 2] = x;
uv[k * 2 + 1] = z;
hndLandCol(x, z, h, Math.hypot(hx, hz) / (2 * S), c);
col[k * 3] = c.r;
col[k * 3 + 1] = c.g;
col[k * 3 + 2] = c.b;
}
for (var b2 = 0; b2 < d - 1; b2++)
for (var a2 = 0; a2 < w - 1; a2++) {
var A = b2 * w + a2, Bv = A + 1, C = A + w, D = C + 1;
idx.push(A, C, Bv, Bv, C, D);
}
var geo = new THREE.BufferGeometry();
geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
geo.setAttribute("color", new THREE.BufferAttribute(col, 3));
geo.setAttribute("uv", new THREE.BufferAttribute(uv, 2));
geo.setIndex(idx);
geo.computeVertexNormals();
geo.computeBoundingSphere();
var m = new THREE.Mesh(geo, mat);
m.name = "hnd-land";
m.userData.keep = 1;
G.add(m);
}
var R = HND_PIT.R + 34, Sq = HND.lite ? 5 : 2.5, n = Math.round(2 * R / Sq) + 1, qp = new Float32Array(n * n * 3), qc = new Float32Array(n * n * 3), qu = new Float32Array(n * n * 2), qi = [];
for (var jj = 0; jj < n; jj++)
for (var ii = 0; ii < n; ii++) {
var kk = jj * n + ii, qx = HND_PIT.x - R + ii * Sq, qz = HND_PIT.z - R + jj * Sq, qh = hndRaw(qx, qz), dd = Math.hypot(qx - HND_PIT.x, qz - HND_PIT.z);
qp[kk * 3] = qx;
qp[kk * 3 + 1] = qh;
qp[kk * 3 + 2] = qz;
qu[kk * 2] = qx;
qu[kk * 2 + 1] = qz;
var sl = Math.abs(hndRaw(qx + 1, qz) - qh) + Math.abs(hndRaw(qx, qz + 1) - qh);
hndLandCol(qx, qz, qh, dd < HND_PIT.R ? sl * 1.2 : sl, c);
if (dd < HND_PIT.R && sl < 0.25)
c.lerp(new THREE.Color(0x9A8E7E), 0.4);
qc[kk * 3] = c.r;
qc[kk * 3 + 1] = c.g;
qc[kk * 3 + 2] = c.b;
}
for (var b3 = 0; b3 < n - 1; b3++)
for (var a3 = 0; a3 < n - 1; a3++) {
var A3 = b3 * n + a3, cx = HND_PIT.x - R + (a3 + 0.5) * Sq, cz = HND_PIT.z - R + (b3 + 0.5) * Sq;
if (Math.hypot(cx - HND_PIT.x, cz - HND_PIT.z) > R)
continue;
qi.push(A3, A3 + n, A3 + 1, A3 + 1, A3 + n, A3 + n + 1);
}
var qg = new THREE.BufferGeometry();
qg.setAttribute("position", new THREE.BufferAttribute(qp, 3));
qg.setAttribute("color", new THREE.BufferAttribute(qc, 3));
qg.setAttribute("uv", new THREE.BufferAttribute(qu, 2));
qg.setIndex(qi);
qg.computeVertexNormals();
var qm = new THREE.Mesh(qg, hndSurf("stone", 0xFFFFFF, HND.lite ? 6 : 4, { vc: true }));
qm.name = "hnd-quarry";
qm.userData.keep = 1;
G.add(qm);
},
function (col) {
var k = "w" + col;
if (HND.mats[k])
return HND.mats[k];
if (!HND_RIPT)
HND_RIPT = wTex(256, 256, function (x, W, H) {
x.fillStyle = "#808080";
x.fillRect(0, 0, W, H);
for (var i = 0; i < 900; i++) {
var a = Math.random(), px = Math.random() * W, py = Math.random() * H;
x.fillStyle = "rgba(" + (a > 0.5 ? 255 : 0) + "," + (a > 0.5 ? 255 : 0) + "," + (a > 0.5 ? 255 : 0) + "," + (0.04 + Math.random() * 0.06) + ")";
x.beginPath();
x.ellipse(px, py, 6 + Math.random() * 16, 1.2 + Math.random() * 2.4, Math.random() * 0.4, 0, 7);
x.fill();
}
});
var t = HND_RIPT.clone();
t.needsUpdate = true;
t.wrapS = t.wrapT = THREE.RepeatWrapping;
t.repeat.set(1 / 14, 1 / 14);
var m = HND.lite ? new THREE.MeshLambertMaterial({ color: col, map: t, transparent: true, opacity: 0.9 }) : new THREE.MeshPhongMaterial({ color: col, map: t, shininess: 70, specular: 0x5A6A70, transparent: true, opacity: 0.86 });
m.depthWrite = false;
HND.rip.push(t);
return (HND.mats[k] = m);
},
function (G) {
var lake = new THREE.Mesh(new THREE.CircleGeometry(1, 64), hndWaterMat(0x3A6A88));
lake.rotation.x = -Math.PI / 2;
lake.scale.set(HND_LAKE.rx * 1.03, HND_LAKE.rz * 1.03, 1);
lake.position.set(HND_LAKE.x, HND_W, HND_LAKE.z);
hndFixUV(lake);
G.add(lake);
var sea = new THREE.Mesh(new THREE.PlaneGeometry(2600, 600, 1, 1), hndWaterMat(0x2E5E80));
sea.rotation.x = -Math.PI / 2;
sea.position.set(0, HND_W - 0.05, hndCoast(0) + 250);
hndFixUV(sea);
G.add(sea);
HND_RIVERS.forEach(function (R) {
var pts = [];
for (var i = 0; i < R.length - 1; i++)
for (var s = 0; s < 8; s++) {
var t = s / 8;
pts.push([R[i][0] + (R[i + 1][0] - R[i][0]) * t, R[i][1] + (R[i + 1][1] - R[i][1]) * t]);
}
pts.push(R[R.length - 1]);
var pos = [], idx = [];
pts.forEach(function (p, i) {
var q = pts[Math.min(pts.length - 1, i + 1)], o = pts[Math.max(0, i - 1)], dx = q[0] - o[0], dz = q[1] - o[1], l = Math.hypot(dx, dz) || 1, nx = -dz / l * 10, nz = dx / l * 10;
pos.push(p[0] + nx, HND_W + 0.02, p[1] + nz, p[0] - nx, HND_W + 0.02, p[1] - nz);
if (i)
idx.push((i - 1) * 2, (i - 1) * 2 + 1, i * 2, (i - 1) * 2 + 1, i * 2 + 1, i * 2);
});
var g = new THREE.BufferGeometry();
g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
var uv = [];
for (var u = 0; u < pos.length; u += 3)
uv.push(pos[u], pos[u + 2]);
g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
g.setIndex(idx);
g.computeVertexNormals();
var m = new THREE.Mesh(g, hndWaterMat(0x3A7090));
m.material.side = THREE.DoubleSide;
G.add(m);
});
var F = HND_FALLS, top = hndLand(F.x - 14, F.z - 14) + 1, bot = HND_W, ft = wTex(64, 256, function (x, W, H) {
var gr = x.createLinearGradient(0, 0, W, 0);
gr.addColorStop(0, "rgba(220,235,245,0.55)");
gr.addColorStop(0.5, "rgba(245,250,255,0.85)");
gr.addColorStop(1, "rgba(220,235,245,0.55)");
x.fillStyle = gr;
x.fillRect(0, 0, W, H);
for (var i = 0; i < 120; i++) {
x.fillStyle = "rgba(180,205,225," + (0.15 + Math.random() * 0.2) + ")";
x.fillRect(Math.random() * W, Math.random() * H, 1 + Math.random() * 2, 10 + Math.random() * 30);
}
});
ft.wrapS = ft.wrapT = THREE.RepeatWrapping;
ft.repeat.set(2, Math.max(1, (top - bot) / 12));
var sheet = new THREE.Mesh(new THREE.PlaneGeometry(16, Math.max(6, top - bot)), new THREE.MeshLambertMaterial({ map: ft, transparent: true, opacity: 0.88, depthWrite: false, side: THREE.DoubleSide }));
sheet.position.set(F.x - 4, (top + bot) / 2, F.z - 4);
sheet.rotation.y = Math.atan2(70, 130);
G.add(sheet);
HND.falls = { t: ft, m: sheet };
for (var i = 0; i < (HND.lite ? 3 : 6); i++) {
var foam = new THREE.Mesh(new THREE.SphereGeometry(2.2 + i * 0.4, 10, 6), hndC(0xE8F0F4, { op: 0.55 }));
foam.scale.y = 0.3;
foam.position.set(F.x + 2 + Math.cos(i * 1.7) * 4, HND_W + 0.2, F.z + 4 + Math.sin(i * 1.7) * 4);
G.add(foam);
}
for (var r = 0; r < (HND.lite ? 6 : 14); r++) {
var a = -0.9 + r * 0.14, px = F.x - 20 + Math.cos(a) * 22, pz = F.z - 20 + Math.sin(a) * 22, rk = hndBoulder(5 + (r % 3) * 2, 0x6A6460, r + 40);
rk.position.set(px, hndLand(px, pz) - 1, pz);
G.add(rk);
}
},
function (parts) {
var n = 0;
parts.forEach(function (p) { var g = p.geo.index ? p.geo.toNonIndexed() : p.geo; p.g2 = g; n += g.attributes.position.count; });
var pos = new Float32Array(n * 3), nor = new Float32Array(n * 3), col = new Float32Array(n * 3), o = 0, v = new THREE.Vector3(), c = new THREE.Color();
parts.forEach(function (p) {
var g = p.g2, M = p.m, Nm = new THREE.Matrix3().getNormalMatrix(M);
if (!g.attributes.normal)
g.computeVertexNormals();
c.setHex(p.col);
for (var i = 0; i < g.attributes.position.count; i++) {
v.fromBufferAttribute(g.attributes.position, i).applyMatrix4(M);
pos[o * 3] = v.x;
pos[o * 3 + 1] = v.y;
pos[o * 3 + 2] = v.z;
v.fromBufferAttribute(g.attributes.normal, i).applyMatrix3(Nm).normalize();
nor[o * 3] = v.x;
nor[o * 3 + 1] = v.y;
nor[o * 3 + 2] = v.z;
var sh = p.shade ? 0.86 + ((i * 7919) % 97) / 97 * 0.28 : 1;
col[o * 3] = c.r * sh;
col[o * 3 + 1] = c.g * sh;
col[o * 3 + 2] = c.b * sh;
o++;
}
});
var geo = new THREE.BufferGeometry();
geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
geo.setAttribute("normal", new THREE.BufferAttribute(nor, 3));
geo.setAttribute("color", new THREE.BufferAttribute(col, 3));
geo.computeBoundingSphere();
return geo;
},
function (seed, detail) {
var g = new THREE.IcosahedronGeometry(1, detail === undefined ? (HND.lite ? 1 : 2) : detail), p = g.attributes.position, v = new THREE.Vector3();
for (var i = 0; i < p.count; i++) {
v.fromBufferAttribute(p, i);
var k = 0.82 + wNoise(v.x * 1.7 + seed, v.z * 1.7 + v.y * 1.3, seed) * 0.36;
p.setXYZ(i, v.x * k, v.y * k, v.z * k);
}
g.computeVertexNormals();
return g;
},
function (kind) {
if (HND_TREE[kind])
return HND_TREE[kind];
var T = [], C = [], i, R = wRand(kind.length * 977 + 13);
function tr(r0, r1, h, x, y, z, rx, rz, col) { T.push({ geo: new THREE.CylinderGeometry(r1, r0, h, HND.lite ? 6 : 9), m: hndMx(x, y + h / 2, z, 1, 1, 1, rx || 0, 0, rz || 0), col: col }); }
function cr(s, x, y, z, sy, col) { C.push({ geo: hndBlob(Math.floor(R() * 90), 1), m: hndMx(x, y, z, s, s * (sy || 0.85), s, 0, R() * 6, 0), col: col, shade: true }); }
if (kind === "birch") {
tr(0.26, 0.16, 10, 0, 0, 0, 0, 0, 0xE4E0D6);
tr(0.08, 0.05, 3, 0.4, 5.5, 0, 0, -0.6, 0xE4E0D6);
tr(0.08, 0.05, 3, -0.4, 6.5, 0.2, 0, 0.6, 0xE4E0D6);
for (i = 0; i < 6; i++)
cr(1.5 + R() * 0.7, (R() - 0.5) * 2.6, 7 + R() * 4, (R() - 0.5) * 2.6, 1.1, i % 2 ? 0x8AB04A : 0x9CC058);
}
else if (kind === "oak") {
tr(0.75, 0.5, 5.5, 0, 0, 0, 0, 0, 0x5A4430);
tr(0.3, 0.18, 4.5, 1.2, 4.2, 0, 0, -0.7, 0x5A4430);
tr(0.3, 0.18, 4.5, -1.1, 4.6, 0.4, 0.2, 0.7, 0x5A4430);
for (i = 0; i < 8; i++) {
var a = i / 8 * 6.28;
cr(2.6 + R() * 1.1, Math.cos(a) * 3, 8 + R() * 2.5, Math.sin(a) * 3, 0.8, i % 3 ? 0x4A7A2A : 0x5A8A34);
}
cr(3.2, 0, 10.5, 0, 0.8, 0x527F2E);
}
else if (kind === "maple") {
tr(0.5, 0.32, 6.5, 0, 0, 0, 0, 0, 0x6A4E3A);
tr(0.2, 0.12, 3.5, 0.8, 5, 0, 0, -0.6, 0x6A4E3A);
for (i = 0; i < 7; i++) {
var b = i / 7 * 6.28;
cr(2 + R() * 0.9, Math.cos(b) * 2.2, 8.5 + R() * 2.6, Math.sin(b) * 2.2, 0.85, [0xC8582A, 0xD87A2A, 0xB84A26][i % 3]);
}
cr(2.4, 0, 11, 0, 0.85, 0xD86A2A);
}
else if (kind === "yew") {
for (i = 0; i < 3; i++)
tr(0.45, 0.3, 4, (i - 1) * 0.5, 0, (i % 2) * 0.4, (i - 1) * 0.12, (i - 1) * 0.15, 0x7A3A2A);
for (i = 0; i < 9; i++) {
var e = i / 9 * 6.28, yy = 2.5 + i * 0.75;
cr(2.8 - i * 0.18, Math.cos(e) * 1.2, yy, Math.sin(e) * 1.2, 0.9, i % 2 ? 0x24401E : 0x2E4E24);
}
}
else if (kind === "ironbark") {
tr(0.85, 0.55, 17, 0, 0, 0, 0, 0, 0x3A3836);
tr(0.25, 0.14, 5, 1.4, 13, 0, 0, -0.7, 0x3A3836);
tr(0.25, 0.14, 5, -1.3, 14, 0.4, 0.2, 0.7, 0x3A3836);
for (i = 0; i < 6; i++) {
var f = i / 6 * 6.28;
cr(2.6 + R() * 0.8, Math.cos(f) * 2.6, 17.5 + R() * 2.5, Math.sin(f) * 2.6, 0.7, i % 2 ? 0x34462A : 0x3E5230);
}
cr(3, 0, 20, 0, 0.7, 0x3A4C2C);
}
else {
tr(0.4, 0.22, 12, 0, 0, 0, 0, 0, 0x5A4430);
for (i = 0; i < 6; i++) {
C.push({ geo: new THREE.ConeGeometry(3.4 - i * 0.48, 3.2, HND.lite ? 7 : 10), m: hndMx(0, 3.5 + i * 1.6, 0, 1, 1, 1, 0, R() * 6, 0), col: i % 2 ? 0x2E4A2A : 0x36542E, shade: true });
}
}
return (HND_TREE[kind] = { trunk: hndMerge(T), crown: hndMerge(C) });
},
function (G) {
var R = wRand(2024), lists = { birch: [], oak: [], maple: [], yew: [], ironbark: [], pine: [] }, n = HND.lite ? 420 : 1400, tries = 0;
function ok(x, z) {
if (hndWaterAt(x, z) !== null || hndRiverD(x, z) < 16 || hndLakeD(x, z) < 1.12)
return false;
if (Math.hypot(x - HND_TOWN.x, z - HND_TOWN.z) < HND_TOWN.r + 30)
return false;
if (Math.hypot(x - HND_PIT.x, z - HND_PIT.z) < HND_PIT.R + 20)
return false;
if (z > hndCoast(x) - 90)
return false;
if (Math.abs(x) < 9 && z < 0 && z > -1100)
return false;
return true;
}
while (n > 0 && tries < 20000) {
tries++;
var x = HND_BOUND.x0 + 30 + R() * (HND_BOUND.x1 - HND_BOUND.x0 - 60), z = HND_BOUND.z0 + 30 + R() * (HND_BOUND.z1 - HND_BOUND.z0 - 60);
if (!ok(x, z))
continue;
var kind = null;
if (z < -240) {
var dep = -z;
if (R() < 0.85)
kind = dep < 420 ? "birch" : dep < 580 ? (R() < 0.5 ? "oak" : "birch") : dep < 750 ? (R() < 0.6 ? "maple" : "oak") : dep < 900 ? (R() < 0.6 ? "yew" : "maple") : (R() < 0.55 ? "ironbark" : "yew");
}
else if (Math.hypot(x - HND_MOOR.x, z - HND_MOOR.z) < HND_MOOR.r) {
if (R() < 0.15)
kind = "pine";
}
else if (R() < 0.22)
kind = R() < 0.5 ? "oak" : R() < 0.5 ? "birch" : "pine";
if (!kind)
continue;
var s = 0.8 + R() * 0.45;
lists[kind].push([x, hndLand(x, z) - 0.2, z, s, R() * 6.28]);
n--;
HND.solids.push({ c: 1, x: x, z: z, r: (kind === "oak" || kind === "ironbark" ? 0.9 : 0.55) * s, y0: -1e3, y1: 1e3 });
}
var M = hndTreeMats(), tiles = {};
Object.keys(lists).forEach(function (k) { lists[k].forEach(function (t) { var key = k + ":" + Math.floor(t[0] / 300) + ":" + Math.floor(t[2] / 300); (tiles[key] = tiles[key] || { k: k, L: [], x: 0, z: 0 }).L.push(t); }); });
Object.keys(tiles).forEach(function (key) {
var T = tiles[key], g = hndTreeGeo(T.k), tm = new THREE.InstancedMesh(g.trunk, M[0], T.L.length), cm = new THREE.InstancedMesh(g.crown, M[1], T.L.length);
T.L.forEach(function (t, i) { var mx = hndMx(t[0], t[1], t[2], t[3], t[3], t[3], 0, t[4], 0); tm.setMatrixAt(i, mx); cm.setMatrixAt(i, mx); T.x += t[0] / T.L.length; T.z += t[2] / T.L.length; });
tm.instanceMatrix.needsUpdate = true;
cm.instanceMatrix.needsUpdate = true;
tm.frustumCulled = false;
cm.frustumCulled = false;
tm.userData.keep = 1;
cm.userData.keep = 1;
G.add(tm);
G.add(cm);
HND.inst.push({ a: tm, b: cm, x: T.x, z: T.z });
});
},
function (kind, x, z, s, par) {
var g = new THREE.Group(), M = hndTreeMats(), T = hndTreeGeo(kind);
g.position.set(x, hndLand(x, z) - 0.2, z);
g.scale.setScalar(s || 1);
var trunk = new THREE.Mesh(T.trunk, M[0]), crown = new THREE.Mesh(T.crown, M[1]);
g.add(trunk);
g.add(crown);
var stump = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.7, 0.9, 10), hndC(0xB89A6A));
stump.position.y = 0.45;
stump.visible = false;
g.add(stump);
g.userData.parts = { trunk: trunk, crown: crown, stump: stump };
g.userData.keep = 1;
(par || HND.G).add(g);
return g;
},
function (G, o) {
var F = hndFrame(o), g = new THREE.Group(), w = o.w, d = o.d, h = o.h, y = HND_TOWN.y, t = 0.5, dw = o.door || 3.2, dh = Math.min(h - 0.6, o.doorH || 3.4);
g.position.set(o.x, y, o.z);
g.rotation.y = F.a;
G.add(g);
var wallM = o.stone ? hndSurf("stone", HND_STONE, 2.2) : hndSurf("plaster", HND_PLASTER, 2.5), tim = hndSurf("wood", HND_TIMBER, 1.5), floorM = hndSurf("wood", 0xB08A5A, 1.4);
hndBox(w + 0.6, 0.6, d + 0.6, hndSurf("stone", 0x9A9282, 2), 0, 0.3, 0, g);
hndBox(w - 0.2, 0.12, d - 0.2, floorM, 0, 0.62, 0, g);
hndBox(w, h, t, wallM, 0, 0.6 + h / 2, -d / 2 + t / 2, g);
hndBox(t, h, d, wallM, -w / 2 + t / 2, 0.6 + h / 2, 0, g);
hndBox(t, h, d, wallM, w / 2 - t / 2, 0.6 + h / 2, 0, g);
var side = (w - dw) / 2;
hndBox(side, h, t, wallM, -w / 2 + side / 2, 0.6 + h / 2, d / 2 - t / 2, g);
hndBox(side, h, t, wallM, w / 2 - side / 2, 0.6 + h / 2, d / 2 - t / 2, g);
hndBox(dw, h - dh, t, wallM, 0, 0.6 + dh + (h - dh) / 2, d / 2 - t / 2, g);
hndBox(dw + 0.5, 0.3, t + 0.12, tim, 0, 0.6 + dh + 0.15, d / 2 - t / 2, g);
if (!o.stone) {
[-w / 2 + 0.1, w / 2 - 0.1].forEach(function (px) { hndBox(0.28, h, 0.62, tim, px, 0.6 + h / 2, d / 2 - 0.25, g); hndBox(0.28, h, 0.62, tim, px, 0.6 + h / 2, -d / 2 + 0.25, g); });
hndBox(w + 0.1, 0.3, 0.6, tim, 0, 0.6 + h - 0.15, d / 2 - 0.25, g);
hndBox(w + 0.1, 0.3, 0.6, tim, 0, 0.6 + h * 0.5, d / 2 - 0.25, g);
}
var nw = Math.max(1, Math.floor(d / 6));
for (var i = 0; i < nw; i++) {
var wz = -d / 2 + (i + 0.5) * d / nw;
[-1, 1].forEach(function (sd) { hndBox(0.14, 1.6, 1.3, hndC(0x2A3440, { shine: 60, spec: 0x8090A0 }), sd * (w / 2 - 0.02), 0.6 + h * 0.55, wz, g); hndBox(0.2, 1.8, 0.12, tim, sd * (w / 2 + 0.02), 0.6 + h * 0.55, wz, g); });
}
var pitch = o.pitch || 0.6, rh = Math.tan(pitch) * (w / 2), sl = Math.hypot(w / 2, rh) + 0.5, roofM = hndSurf(o.slate ? "slate" : "shingle", o.slate ? HND_SLATE : HND_ROOF, 2);
[-1, 1].forEach(function (sd) { var r = hndBox(sl, 0.25, d + 1.2, roofM, sd * w / 4, 0.6 + h + rh / 2, 0, g); r.rotation.z = -sd * pitch; });
var gab2 = new THREE.Mesh(new THREE.BufferGeometry(), wallM);
var tri = new Float32Array([-w / 2, 0, 0, w / 2, 0, 0, 0, rh, 0]);
gab2.geometry.setAttribute("position", new THREE.BufferAttribute(tri, 3));
gab2.geometry.computeVertexNormals();
gab2.material = hndC(o.stone ? HND_STONE : HND_PLASTER, { ds: true });
[-d / 2 + 0.1, d / 2 - 0.1].forEach(function (gz) { var m = gab2.clone(); m.position.set(0, 0.6 + h, gz); g.add(m); });
if (o.chimney)
hndBox(1.2, rh + 2.5, 1.2, hndSurf("brick", 0xA86A4A, 1.2), w / 2 - 1.6, 0.6 + h + (rh + 2.5) / 2 - 0.5, -d / 2 + 2, g);
hndBoxW(F, -w / 2, w / 2, -d / 2, -d / 2 + t, y, y + h + 1);
hndBoxW(F, -w / 2, -w / 2 + t, -d / 2, d / 2, y, y + h + 1);
hndBoxW(F, w / 2 - t, w / 2, -d / 2, d / 2, y, y + h + 1);
hndBoxW(F, -w / 2, -dw / 2, d / 2 - t, d / 2, y, y + h + 1);
hndBoxW(F, dw / 2, w / 2, d / 2 - t, d / 2, y, y + h + 1);
var p0 = F.to(-w / 2, -d / 2), p1 = F.to(w / 2, d / 2);
hndFloor(p0[0], p1[0], p0[1], p1[1], y + 0.68, { inside: true, name: o.name });
if (o.sign) {
var sg = wSign(o.sign, Math.min(w - 1, 7), 1.2, "#2E2216", "#EAD8A8");
sg.position.set(0, 0.6 + dh + 1.2, d / 2 + 0.08);
g.add(sg);
}
return { g: g, F: F, y: y + 0.68 };
},
function (B, seed, lx, lz, face, o, talk) {
var p = B ? B.F.to(lx, lz) : [lx, lz], y = B ? B.y : hndLand(lx, lz), g = null;
try {
g = typeof wPerson === "function" ? wPerson("hnd_" + seed, o) : null;
}
catch (e) { }
if (!g) {
g = new THREE.Group();
var b = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.34, 1.7, 10), hndC(0x6A5A4A));
b.position.y = 0.85;
g.add(b);
}
g.position.set(p[0], y, p[1]);
g.rotation.y = (B ? B.F.a : 0) + (face || 0);
HND.G.add(g);
var P = { g: g, t: talk, name: talk && talk.name };
HND.people.push(P);
if (talk)
HND.talk.push({ p: P, r: 2.6, name: talk.name, t: talk });
return P;
},
function (B, lx, lz) {
var g = new THREE.Group(), iron = hndC(0x3A3A3E, { shine: 40, spec: 0x606068 });
var s = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.5, 0.7, 10), hndSurf("wood", 0x6A4A30, 1));
s.position.y = 0.35;
g.add(s);
hndBox(0.5, 0.32, 0.36, iron, 0, 0.86, 0, g);
hndBox(0.9, 0.18, 0.42, iron, 0, 1.1, 0, g);
var horn = new THREE.Mesh(new THREE.ConeGeometry(0.2, 0.6, 10), iron);
horn.rotation.z = Math.PI / 2;
horn.position.set(-0.72, 1.1, 0);
g.add(horn);
return hndIn(B, g, lx, 0, lz);
},
function (B, lx, lz, w, jar) {
var g = new THREE.Group(), wd = hndSurf("wood", 0x7A5634, 1.2);
hndBox(w, 2.6, 0.4, wd, 0, 1.3, -0.05, g);
for (var r = 0; r < 4; r++) {
hndBox(w - 0.1, 0.06, 0.42, wd, 0, 0.4 + r * 0.62, 0.02, g);
for (var i = 0; i < Math.floor(w / 0.35); i++) {
var c = [0x8A6A4A, 0x5A8A6A, 0x8A4A5A, 0xC8A868, 0x4A6A8A][(i + r) % 5];
if (jar) {
var j = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.12, 0.28, 8), hndC(c, { shine: 50, spec: 0x707070 }));
j.position.set(-w / 2 + 0.25 + i * 0.35, 0.58 + r * 0.62, 0.05);
g.add(j);
}
else
hndBox(0.22, 0.32, 0.28, hndC(c), -w / 2 + 0.25 + i * 0.35, 0.6 + r * 0.62, 0.05, g);
}
}
return hndIn(B, g, lx, 0, lz);
},
function (B, lx, lz) {
var g = new THREE.Group(), iron = hndC(0x2A2A2C, { shine: 30 });
hndBox(3, 1, 1.2, iron, 0, 0.5, 0, g);
hndBox(3.2, 0.08, 1.3, iron, 0, 1.04, 0, g);
[-0.9, 0, 0.9].forEach(function (px, i) { var p = new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.3, 0.36, 12), hndC(i === 1 ? 0x8A5A3A : 0x5A5A60, { shine: 50 })); p.position.set(px, 1.26, 0); g.add(p); });
hndBox(0.8, 0.5, 0.1, hndC(0xD86A2A, { e: 0xA84A1A, ei: 0.6 }), 0, 0.45, 0.62, g);
hndBox(0.8, 3, 0.8, hndSurf("brick", 0x9A5A3A, 1), 0, 2.6, -0.3, g);
return hndIn(B, g, lx, 0, lz);
},
function (B, lx, lz) {
var b = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.36, 1, 12), hndSurf("wood", 0x7A5232, 0.8));
b.position.y = 0.5;
var g = new THREE.Group();
g.add(b);
[0.15, 0.85].forEach(function (y) { var r = new THREE.Mesh(new THREE.TorusGeometry(0.41, 0.025, 4, 16), hndC(0x3A3A3A)); r.rotation.x = Math.PI / 2; r.position.y = y; g.add(r); });
return hndIn(B, g, lx, 0, lz);
},
function (B, lx, lz) {
var g = new THREE.Group(), wd = hndSurf("wood", 0x8A6440, 1);
[[-0.9, -0.6], [0.9, -0.6], [-0.9, 0.6], [0.9, 0.6]].forEach(function (q) { hndBox(0.12, 1.8, 0.12, wd, q[0], 0.9, q[1], g); });
hndBox(1.9, 0.1, 0.1, wd, 0, 1.75, -0.6, g);
hndBox(1.9, 0.1, 0.1, wd, 0, 1.0, 0.6, g);
hndBox(1.7, 0.02, 1.1, hndC(0xB84A4A, { ds: true }), 0, 1.0, 0, g).rotation.x = 0.6;
return hndIn(B, g, lx, 0, lz);
},
function (G, x, z) {
var y = hndLand(x, z), g = new THREE.Group();
g.position.set(x, y, z);
var ir = hndC(0x2A2A2C);
var p = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.12, 3.6, 8), ir);
p.position.y = 1.8;
g.add(p);
var l = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.46, 0.36), hndC(0xFFE0A0, { e: 0xC8A060, ei: 0.5 }));
l.position.y = 3.75;
g.add(l);
G.add(g);
HND.solids.push({ c: 1, x: x, z: z, r: 0.25, y0: -1e3, y1: 1e3 });
},
function (G, x, z, arms) {
var y = hndLand(x, z), g = new THREE.Group();
g.position.set(x, y, z);
var wd = hndSurf("wood", 0x7A5A3A, 1);
var p = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.12, 3.4, 8), wd);
p.position.y = 1.7;
g.add(p);
arms.forEach(function (A, i) { var s = wSign([A[0]], 2.4, 0.45, "#3A2A1C", "#F0E0B0"); s.position.set(Math.sin(A[1]) * 1.25, 3.0 - i * 0.55, Math.cos(A[1]) * 1.25); s.rotation.y = A[1] + Math.PI / 2; g.add(s); });
G.add(g);
},
function (G, pts, w) {
var pos = [], idx = [], uv = [], L = 0;
for (var i = 0; i < pts.length; i++) {
var q = pts[Math.min(pts.length - 1, i + 1)], o = pts[Math.max(0, i - 1)], dx = q[0] - o[0], dz = q[1] - o[1], l = Math.hypot(dx, dz) || 1, nx = -dz / l * w / 2, nz = dx / l * w / 2;
if (i)
L += Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
var a = [pts[i][0] + nx, pts[i][1] + nz], b = [pts[i][0] - nx, pts[i][1] - nz];
pos.push(a[0], hndLand(a[0], a[1]) + 0.12, a[1], b[0], hndLand(b[0], b[1]) + 0.12, b[1]);
uv.push(0, L / 3, w / 3, L / 3);
if (i)
idx.push((i - 1) * 2, (i - 1) * 2 + 1, i * 2, (i - 1) * 2 + 1, i * 2 + 1, i * 2);
}
var g = new THREE.BufferGeometry();
g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
g.setIndex(idx);
g.computeVertexNormals();
var m = new THREE.Mesh(g, hndSurf("earth", 0xB09A78, 1));
m.renderOrder = 1;
m.material.polygonOffset = true;
m.material.polygonOffsetFactor = -2;
G.add(m);
return m;
},
function (G) {
var T = HND_TOWN, y = T.y;
var sq = new THREE.Mesh(new THREE.CircleGeometry(34, 40), hndSurf("paving", 0xC8BCA8, 2));
sq.rotation.x = -Math.PI / 2;
sq.position.set(0, y + 0.06, 32);
var su = sq.geometry.attributes.uv, sp = sq.geometry.attributes.position;
for (var i = 0; i < su.count; i++)
su.setXY(i, sp.getX(i), sp.getY(i));
G.add(sq);
var well = new THREE.Mesh(new THREE.CylinderGeometry(1.6, 1.7, 1, 16, 1, true), hndSurf("stone", HND_STONE, 1.5));
well.material.side = THREE.DoubleSide;
well.position.set(0, y + 0.5, 32);
G.add(well);
var wr = new THREE.Mesh(new THREE.CircleGeometry(1.5, 16), hndWaterMat(0x2A4A5A));
wr.rotation.x = -Math.PI / 2;
wr.position.set(0, y + 0.2, 32);
G.add(wr);
[-1.5, 1.5].forEach(function (px) { hndBox(0.18, 2.4, 0.18, hndSurf("wood", HND_TIMBER, 1), px, y + 1.2, 32, G); });
var wroof = hndBox(3.6, 0.15, 2.4, hndSurf("shingle", HND_ROOF, 1.5), 0, y + 2.5, 32, G);
wroof.rotation.x = 0;
HND.solids.push({ c: 1, x: 0, z: 32, r: 1.9, y0: -1e3, y1: 1e3 });
for (var l = 0; l < 8; l++) {
var a = l / 8 * 6.283 + 0.2;
hndLampPost(G, Math.cos(a) * 36, 32 + Math.sin(a) * 36);
}
hndMarket(G, y);
var GH = hndBuilding(G, { x: 0, z: -48, f: "s", w: 44, d: 30, h: 11, stone: true, slate: true, door: 6, doorH: 5.5, pitch: 0.55, name: "The Guildhall", sign: ["THE GUILDHALL", "The Guild of Hands · Anvilmere"] });
HND_SKILLS.forEach(function (S, i) {
var side = i < 6 ? -1 : 1, k = i % 6, bz = -11 + k * 4.4;
var ban = new THREE.Mesh(new THREE.PlaneGeometry(1.6, 4), hndC(parseInt(S.col.slice(1), 16), { ds: true }));
ban.position.set(side * 21.4, 6.2, bz);
ban.rotation.y = side * Math.PI / 2 * -1;
GH.g.add(ban);
var lb = wSign([S.icon + " " + S.name], 1.8, 0.5, "#241A10", "#F0E0B0");
lb.position.set(side * 21.3, 3.6, bz);
lb.rotation.y = -side * Math.PI / 2;
GH.g.add(lb);
});
var bd = wSign(["THE BOARD OF MASTERS", "the Masters of each craft", "and the highest totals"], 5, 2.4, "#2A2016", "#F2E2B0");
bd.position.set(-8, 3.4, -14.6);
GH.g.add(bd);
hndInSpot(GH, -8, -12.5, 3.2, "The board of Masters", "read it", function () { hndBoard(); });
hndBench(GH, 10, -9, 6, 1.2, 0x6A4A30);
hndShelves(GH, 10, -14.3, 6, false);
hndInSolid(GH, 7, 13, -9.6, -8.4);
for (var ti = 0; ti < 5; ti++) {
var tg = new THREE.Group(), S2 = HND_GATHER[ti];
hndBox(0.08, 0.9, 0.08, hndC(0x6A4A30), 0, 0.45, 0, tg);
var head = hndBox(0.4, 0.16, 0.08, hndC(0x8A8A90, { shine: 50 }), 0.12, 0.9, 0, tg);
hndIn(GH, tg, 7.6 + ti * 1.2, 0.36, -9);
}
hndPerson(GH, "toolmaker", 10, -10.6, 0, { title: "Toolmaker", sex: "m" }, { name: "Ottilie Hammerwright, the Toolmaker", greet: "Axes, picks, rods, satchels, snares. Iron, steel or darksteel. Better than that, you'll have to make yourself.",
persona: "the Toolmaker of the Guild of Hands in Anvilmere: brisk, practical, proud of a good edge. She sells iron, steel and darksteel tools for woodcutting, mining, fishing, foraging and hunting, and explains that the Starmetal and Dreamforged tools are only made by members with materials that are only found." });
hndInSpot(GH, 10, -7.4, 2.6, "The Toolmaker's counter", "buy tools", function () { hndToolmaker(); });
hndBench(GH, 0, -10, 5, 2, 0x5A3E28);
hndInSolid(GH, -2.5, 2.5, -11, -9);
hndPerson(GH, "guildmaster", 0, -12.2, 0, { title: "Guildmaster", sex: "f" }, { name: "Guildmaster Hesper Vane", greet: "Welcome to the Guild of Hands. Twelve crafts, and a lifetime in each, if you want it.",
persona: "the Guildmaster of the Guild of Hands in Anvilmere, warm and exacting. She explains the twelve crafts (woodcutting, mining, fishing, foraging, hunting, smithing, woodworking, tailoring, engineering, cooking, alchemy, jewelcrafting), levels 1 to 60 with new tiers at 12, 24, 36 and 48, Masters at 60 with a cape, that members learn from every gathering spot and forge in every world, and that it is all a dreamer's own choice to take up." });
hndInSpot(GH, 0, -8, 2.6, "The Guildmaster's table", "see your crafts", function () { hndHome(); });
var SM = hndBuilding(G, { x: 72, z: 22, f: "w", w: 18, d: 22, h: 6.5, stone: true, door: 4, chimney: true, name: "The Smithy and Smelter", sign: ["THE SMITHY", "and the Smelter"] });
hndFurnace(SM, -5, -8, 2.6);
hndInSolid(SM, -6.4, -3.6, -9.4, -6.8, 3);
hndInSpot(SM, -5, -5.6, 2.6, "The smelter", "smelt bars", function () { hndStation("smelter"); });
hndAnvil(SM, 3, -4);
hndInSpot(SM, 3, -2.4, 2.4, "The Toolsmith's anvil", "make tools", function () { hndStation("toolsmith"); });
hndAnvil(SM, -2, 3);
hndFurnace(SM, -6.5, 4, 2);
hndInSolid(SM, -7.8, -5.2, 2.8, 5.2, 3);
hndInSpot(SM, -2, 5, 2.4, "The Guild forge", "work at the forge", function () { worldCard(null); if (typeof craftOpen === "function")
craftOpen("smithy"); });
hndBarrel(SM, 7, -9);
hndBarrel(SM, 7.4, -7.8);
hndPerson(SM, "smith", 0, -6, 0, { title: "Blacksmith", sex: "m" }, { name: "Master Brannock, the Guild smith", greet: "Bars at the smelter, tools at my anvil, blades and armour at the forge. Mind the sparks.",
persona: "the Master Smith of the Guild of Hands in Anvilmere: a big, patient man who loves iron. He explains smelting silver, gold, moonsilver and starstone bars, making steel to Dreamforged axes and pickaxes, and that every Smithing level steadies a smith's hammer at any forge." });
var JN = hndBuilding(G, { x: -72, z: 22, f: "e", w: 18, d: 22, h: 6.5, door: 4.5, name: "The Joinery and Sawpit", sign: ["THE JOINERY", "and the Sawpit"] });
hndBench(JN, 3, -7, 4, 1.4);
hndInSolid(JN, 1, 5, -7.7, -6.3);
hndInSpot(JN, 3, -5.4, 2.4, "The rod-maker's bench", "make rods", function () { hndStation("rodbench"); });
var pit = hndIn(JN, new THREE.Group(), -4, 0, -4);
hndBox(5, 0.3, 1.6, hndSurf("wood", 0x9A7444, 1), 0, 0.6, 0, pit);
var lg = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.45, 6, 12), hndSurf("bark", 0xFFFFFF, 1));
lg.rotation.z = Math.PI / 2;
lg.position.set(0, 1.2, 0);
pit.add(lg);
hndInSolid(JN, -6.6, -1.4, -4.9, -3.1);
hndInSpot(JN, -4, -2, 2.6, "The sawpit", "saw logs", function () { hndStation("sawpit"); });
hndBench(JN, -2, 5, 4, 1.4);
hndInSpot(JN, -2, 6.8, 2.4, "The Guild joinery bench", "work at the bench", function () { worldCard(null); if (typeof craftOpen === "function")
craftOpen("joinery"); });
hndShelves(JN, 6, 8.6, 5, false);
hndPerson(JN, "joiner", 0, -6.5, 0, { title: "Carpenter", sex: "f" }, { name: "Master Elinor Ashgrove, the Guild joiner", greet: "Birch to ironbark, it all comes here. Better logs saw into more timber.",
persona: "the Master Joiner of the Guild of Hands: quiet, precise, smells of sawdust. She explains sawing logs into seasoned hardwood (better logs give more), making steel to Dreamforged fishing rods, and bows, staves, carts and brooms at the joinery bench." });
var KT = hndBuilding(G, { x: 46, z: 92, f: "n", w: 16, d: 14, h: 5.5, door: 3.4, chimney: true, name: "The Guild kitchen", sign: ["THE GUILD KITCHEN"] });
hndRange(KT, 0, -5.4);
hndInSolid(KT, -1.6, 1.6, -6.2, -4.8);
hndInSpot(KT, 0, -3.6, 2.6, "The Guild kitchen", "cook", function () { hndStation("kitchen"); });
hndBench(KT, -4, 1, 3, 1.4, 0x9A7448);
hndBench(KT, 4, 1, 3, 1.4, 0x9A7448);
hndShelves(KT, -5, -6.4, 4, true);
hndPerson(KT, "cook", 2.6, -3.6, Math.PI * 0.2, { title: "Cook", sex: "f" }, { name: "Mother Pell, the Guild cook", greet: "Hungry? Bring me a trout and I'll teach you to grill it. Bring me an elk and we'll talk about a feast.",
persona: "the Master Cook of the Guild of Hands: round, loud, generous. She teaches dishes from what members catch, snare and forage (grilled trout, berry tart, roast pheasant with thyme, pike and mushroom pie, salmon with sage, venison stew, sea bass with thyme, boar roast with brambles, swordfish steak, the elk feast). A dish fills the Food bar and makes you Well fed, so you learn every craft faster." });
var AP = hndBuilding(G, { x: -46, z: 92, f: "n", w: 14, d: 14, h: 5.5, door: 3, name: "The Apothecary", sign: ["THE APOTHECARY"] });
hndBench(AP, 0, -4.6, 5, 1.4, 0x6A4A30);
hndInSolid(AP, -2.5, 2.5, -5.3, -3.9);
hndShelves(AP, 0, -6.3, 6, true);
hndShelves(AP, -6.2, 0, 4, true).rotation.y = Math.PI / 2;
var still = new THREE.Group();
var flask = new THREE.Mesh(new THREE.SphereGeometry(0.32, 12, 8), hndC(0x8AC8B8, { op: 0.6, shine: 90 }));
flask.position.y = 1.3;
still.add(flask);
var tube = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.9, 6), hndC(0xB87A3A, { shine: 60 }));
tube.rotation.z = 1;
tube.position.set(0.4, 1.5, 0);
still.add(tube);
hndIn(AP, still, 0.6, 0, -4.6);
hndInSpot(AP, 0, -3, 2.6, "The Apothecary's bench", "brew", function () { hndStation("apoth"); });
hndPerson(AP, "alchemist", -2.6, -3, Math.PI * 0.15, { title: "Apothecary", sex: "m" }, { name: "Master Quillon Moss, the Guild apothecary", greet: "Thyme for plenty, sage for steady hands, feverfew for keen eyes, moonpetal for insight. And starbloom, for those who can find it.",
persona: "the Master Apothecary of the Guild of Hands: thin, curious, ink-stained. He teaches draughts from herbs: Plenty (more from every gather), Steady Hands (a steadier hammer at the forge), Keen Eyes (rare finds twice as likely), Insight (quicker learning) and the Elixir of the Masters. Each needs a glass vial." });
var TN = hndBuilding(G, { x: 74, z: -40, f: "w", w: 16, d: 18, h: 6, door: 3.6, name: "The Tanner's and Weaver's Hall", sign: ["TANNER AND WEAVER"] });
hndLoom(TN, -3, 4);
hndInSolid(TN, -4.1, -1.9, 3.3, 4.7);
hndHide(TN, 3, -6.5, 0);
hndHide(TN, -3, -6.5, 0);
hndBench(TN, 2.5, 2, 3, 1.4);
hndInSpot(TN, 2.5, 3.7, 2.6, "The Tanner's and Weaver's bench", "make satchels and snares", function () { hndStation("tailorbench"); });
hndPerson(TN, "tanner", 0, -3, 0, { title: "Tanner", sex: "f" }, { name: "Master Wren Calloway, the Guild tanner", greet: "Leather for the satchel, wire for the snare. The good ones need something you have to find.",
persona: "the Master Tanner and Weaver of the Guild of Hands: wiry, dry-humoured. She explains tanning hides into leather, and making steel to Dreamforged forager's satchels and snare kits from leather, canvas and wire." });
var JW = hndBuilding(G, { x: -74, z: -40, f: "e", w: 14, d: 14, h: 5.5, stone: true, door: 3, name: "The Jeweller's", sign: ["THE JEWELLER'S"] });
hndBench(JW, 0, -4, 4, 1.2, 0x4A3020);
hndInSolid(JW, -2, 2, -4.6, -3.4);
var lamp = new THREE.Mesh(new THREE.SphereGeometry(0.18, 10, 8), hndC(0xFFF0C0, { e: 0xC8B080, ei: 0.6 }));
hndIn(JW, lamp, 0.8, 1.5, -4);
hndShelves(JW, -5.6, 0, 4, false).rotation.y = Math.PI / 2;
hndInSpot(JW, 0, -2.4, 2.4, "The Jeweller's bench", "cut gems and set rings", function () { hndStation("jewel"); });
hndPerson(JW, "jeweller", 2.4, -2.4, Math.PI * -0.2, { title: "Jeweller", sex: "m" }, { name: "Master Aurelio Finch, the Guild jeweller", greet: "A cut garnet in a silver band, and the wearer cuts timber like a woodsman three years older.",
persona: "the Master Jeweller of the Guild of Hands: soft-spoken, exact, loupe always in his eye. He cuts quartz, garnet, sapphire, emerald and ruby, and sets rings of silver, gold, moonsilver and starstone that raise a gathering craft's level while held, and the Artisan's bracelet for the making crafts." });
var EN = hndBuilding(G, { x: 0, z: 136, f: "n", w: 24, d: 18, h: 7.5, door: 9, doorH: 6, slate: true, name: "The Engine Shed", sign: ["THE ENGINE SHED"] });
hndBench(EN, -7, -5, 4, 1.4, 0x5A5A60);
hndShelves(EN, 8, -8.3, 6, false);
hndBarrel(EN, -9, 5);
hndBarrel(EN, -8, 6);
hndInSpot(EN, 0, -2, 3.4, "The engine bay", "build a vehicle", function () { worldCard(null); if (typeof craftOpen === "function")
craftOpen("garage"); });
hndPerson(EN, "engineer", -4, -3, 0, { title: "Mechanic", sex: "m" }, { name: "Master Isambard Cole, the Guild engineer", greet: "Every Engineering level is a truer gear and a better weld. You'll feel it on the road.",
persona: "the Master Engineer of the Guild of Hands: cheerful, oil to the elbows. He explains that Engineering is learned building cars, motorbikes, lorries, hovercars, war machines, firearms and machine parts at the Transport Yard, the Motor Pool or here, and every level makes the work finer." });
hndRoad(G, hndRoadLine([0, -70], [0, -1080], 60), 5);
hndRoad(G, hndRoadLine([40, 10], [HND_PIT.x - HND_PIT.R - 10, HND_PIT.z + 30], 24), 4.5);
hndRoad(G, hndRoadLine([-40, 40], [HND_LAKE.x + HND_LAKE.rx + 6, HND_LAKE.z + 10], 24), 4.5);
hndRoad(G, hndRoadLine([0, 150], [HND_PIER.x, HND_PIER.z0 - 4], 40), 4.5);
hndRoad(G, hndRoadLine([40, 110], [HND_MOOR.x - 160, HND_MOOR.z - 80], 30), 4);
hndSignpost(G, -8, 64, [["N · The Greatwood", Math.PI], ["E · Hollowfell quarry", Math.PI / 2], ["W · Mirrormere", -Math.PI / 2], ["S · The Saltreach and the pier", 0]]);
hndSignpost(G, 24, 62, [["SE · Thymewold and the High Moor", Math.PI / 4]]);
},
function (G) {
function lodge(x, z, f, name, sign, who, talk) {
var y = hndLand(x, z), F = hndFrame({ x: x, z: z, f: f }), B = { g: new THREE.Group(), F: F, y: y + 0.1 };
B.g.position.set(x, y, z);
B.g.rotation.y = F.a;
G.add(B.g);
var wd = hndSurf("wood", 0x7A5634, 1.2), roof = hndSurf("shingle", HND_ROOF, 1.5);
hndBox(8, 0.3, 6, hndSurf("stone", 0x9A9282, 1.5), 0, 0.15, 0, B.g);
[[-3.8, -2.8], [3.8, -2.8], [-3.8, 2.8], [3.8, 2.8]].forEach(function (q) { hndBox(0.3, 3.2, 0.3, wd, q[0], 1.8, q[1], B.g); });
hndBox(8, 3, 0.25, wd, 0, 1.8, -2.9, B.g);
var top = hndBox(8.6, 0.2, 3.6, roof, 0, 4.2, -1.4, B.g);
top.rotation.x = 0.42;
var top2 = hndBox(8.6, 0.2, 3.6, roof, 0, 4.2, 1.4, B.g);
top2.rotation.x = -0.42;
var sg = wSign(sign, 4.2, 0.9, "#2E2216", "#EAD8A8");
sg.position.set(0, 3.2, 3.05);
B.g.add(sg);
hndBench(B, 0, -1.8, 3, 1, 0x8A6440);
hndBoxW(F, -4, 4, -3.1, -2.7, y - 1, y + 3.6);
hndFloor(F.to(-4, -3)[0], F.to(4, 3)[0], F.to(-4, -3)[1], F.to(4, 3)[1], y + 0.3, { name: name });
hndPerson(B, who, 0, 0.6, 0, talk.o, talk.t);
hndInSpot(B, 0, 1.8, 3, name, "ask about the craft", function () { hndSkillCard(talk.k); });
return B;
}
lodge(40, -250, "s", "The Forester's Lodge", ["THE FORESTER'S LODGE", "Woodcutting"], "forester", { k: "wood", o: { title: "Forester", sex: "m" }, t: { name: "Master Corwen Holt, the Forester", greet: "Birch near the road, oak past the first stream, maple where it turns red, then yew, then the ironbarks. Take what's marked.",
persona: "the Master Forester of the Guild of Hands, keeper of the Greatwood north of Anvilmere: weathered, calm, fond of trees. The best trees grow deeper in: birch (level 1), oak (12), maple (24), yew (36), ironbark (48). The trees members may fell have a ribbon tied round them; a felled one grows back. Each needs an axe. Sometimes a Dreamheart burl is found in a good tree." } });
lodge(HND_PIT.x - HND_PIT.R - 24, HND_PIT.z + 40, "e", "The Pit Office", ["HOLLOWFELL QUARRY", "Mining"], "quarry", { k: "mine", o: { title: "Miner", sex: "f" }, t: { name: "Master Dagny Flint, the Quarrymaster", greet: "Iron and coal on the top bench. Silver, gold, moonsilver down the benches. Starstone right at the bottom. Hard hats are a good idea.",
persona: "the Quarrymaster of Hollowfell, the open quarry east of Anvilmere: blunt, safety-minded, proud. The pit has five benches: iron and coal (level 1), silver (12), gold (24), moonsilver (36) and starstone (48) at the bottom, and rough gems turn up in the rock. Each needs a pickaxe. Sometimes star crystal is found deep down." } });
lodge(HND_LAKE.x + HND_LAKE.rx + 20, HND_LAKE.z + 40, "w", "The Boathouse", ["THE BOATHOUSE", "Fishing"], "bailiff", { k: "fish", o: { title: "Fisherman", sex: "m" }, t: { name: "Master Tobias Reed, the Water-bailiff", greet: "Trout in the river, pike in Mirrormere, salmon at the falls. Sea bass off the rocks and swordfish off the end of the long pier, if you've the arms for it.",
persona: "the Water-bailiff of the Guild of Hands, at the boathouse on Mirrormere: patient, a teller of fish stories. Trout in the river (level 1), pike in Mirrormere (12), salmon at the falls to the north-west (24), sea bass off the rocks of the Saltreach coast (36), swordfish from the end of the long pier (48). Each needs a rod. A Moonpearl is a rare find." } });
lodge(-40, 232, "n", "The Herb Garden Shed", ["THYMEWOLD", "Foraging"], "herbwife", { k: "forage", o: { title: "Gardener", sex: "f" }, t: { name: "Mistress Marjory Thyme, the Herbwife", greet: "Thyme and brambles all over Thymewold. Sage and mushroom rings to the east. Feverfew on the slopes, moonpetal on the moor, starbloom at the top.",
persona: "the Herbwife of the Guild of Hands, in Thymewold south of Anvilmere: kindly, sharp-eyed. Thyme and bramble berries in the meadows (level 1), wild sage and mushroom rings to the south-east (12), feverfew on the hillsides (24), moonpetal on the High Moor (36), starbloom on its tops (48). Each needs a forager's satchel. Dreamer's clover is a rare find." } });
lodge(-200, 140, "e", "The Hunting Lodge", ["THE HUNTING LODGE", "Hunting"], "huntsman", { k: "hunt", o: { title: "Hunter", sex: "m" }, t: { name: "Master Garrick Venn, the Huntsman", greet: "Warrens west of here, pheasants in the cover east of town, deer trails in the east woods, boar down by the marsh, and elk up on the far moor.",
persona: "the Huntsman of the Guild of Hands: quiet, respectful of the animals, all snares and tracking, no needless cruelty. Rabbit warrens in the western meadows (level 1), pheasant cover between the town and the quarry (12), deer trails in the eastern woods (24), boar wallows by the marsh south of Mirrormere (36), elk on the far moor (48). Each needs a snare kit. A Silverwhite antler is a rare find." } });
},
function (G, y) {
if (typeof build !== "function" || typeof KIT === "undefined")
return;
var cx = 0, cz = 32, lite = HND.lite, R = wRand(4417);
function put(a, x, z, ry, s, solid) {
if (!KIT[a])
return null;
var m;
try {
m = build({ id: "hnd_" + a + "_" + Math.round(x * 10) + "_" + Math.round(z * 10), archetype: a, label: null, attrs: Object.assign(s && s !== 1 ? { s: s } : {}, a === "hedge" ? { c: 0x3F6E34 } : {}), x: 0, z: 0, rot: 0, solid: false, detail: 3, nights: [], city: true, hub: true });
}
catch (e) {
return null;
}
if (!m)
return null;
m.position.set(x, hndLand(x, z), z);
m.rotation.y = ry || 0;
G.add(m);
if (solid)
HND.solids.push({ c: 1, x: x, z: z, r: solid, y0: -1e3, y1: 1e3 });
return m;
}
var arcs = [[0.25, 1.2], [1.95, 2.7], [-1.25, -0.75], [-2.4, -1.9]], n = 0;
arcs.forEach(function (A) {
for (var a = A[0]; a <= A[1]; a += (lite ? 0.42 : 0.28)) {
var r = 27.5, x = cx + Math.cos(a) * r, z = cz + Math.sin(a) * r;
put("marketstall", x, z, Math.atan2(-Math.cos(a), -Math.sin(a)), 1, 2.2);
n++;
}
});
for (var b = 0; b < (lite ? 4 : 8); b++) {
var a2 = b / (lite ? 4 : 8) * 6.283 + 0.55, r2 = 17, x2 = cx + Math.cos(a2) * r2, z2 = cz + Math.sin(a2) * r2;
if (Math.abs(x2) < 5 && z2 > cz)
continue;
if (b % 2)
put("bench", x2, z2, Math.atan2(-Math.cos(a2), -Math.sin(a2)), 1, 1.0);
else {
var bt = hndTree("birch", x2, z2, 0.55, G);
if (bt && !bt.parent)
G.add(bt);
HND.solids.push({ c: 1, x: x2, z: z2, r: 0.4, y0: -1e3, y1: 1e3 });
}
}
put("tree", -24, 52, 0, 1.1, 0.6);
put("tree", 24, 52, 1.3, 1.0, 0.6);
},
function () {
var out = [], taken = [];
function free(x, z, r) { for (var i = 0; i < taken.length; i++)
if (Math.hypot(taken[i][0] - x, taken[i][1] - z) < (r || 12))
return false; return true; }
function dry(x, z) { return hndWaterAt(x, z) === null && hndRiverD(x, z) > 12 && hndLakeD(x, z) > 1.08; }
function add(s, t, i, x, z, o) { taken.push([x, z]); var N = HND_NODES[s][t], k = hndNodeKind(s, t, i); out.push(Object.assign({ id: hndSpotId(s, t, i), s: s, t: t, i: i, x: x, z: z, kind: k, name: (N.alt && k === N.alt ? N.altName : N.name), verb: N.verb, xp: N.xp, rg: N.rg }, o || {})); }
function scatter(s, t, box, test, sp) {
var R = wRand(9100 + HND_GATHER.indexOf(s) * 97 + t * 13), n = HND_NODE_N[t], i = 0, tries = 0;
while (i < n && tries < 6000) {
tries++;
var x = box[0] + R() * (box[1] - box[0]), z = box[2] + R() * (box[3] - box[2]);
if (!dry(x, z) || (test && !test(x, z)) || !free(x, z, sp))
continue;
add(s, t, i, x, z);
i++;
}
for (; i < n; i++) {
var fx = (box[0] + box[1]) / 2 + i * 7, fz = (box[2] + box[3]) / 2;
add(s, t, i, fx, fz);
}
}
[[-260, -410], [-430, -570], [-590, -740], [-760, -890], [-910, -1060]].forEach(function (b, t) { scatter("wood", t, [-170, 170, b[1], b[0]], function (x) { return Math.abs(x) > 14; }, 14); });
for (var t = 0; t < 5; t++) {
var R = HND_PIT.R, d = R * (1 - (t + 0.27) / 5), n = HND_NODE_N[t];
for (var i = 0; i < n; i++) {
var a = (i / n) * Math.PI * 2 + t * 0.5 + 0.3;
add("mine", t, i, HND_PIT.x + Math.cos(a) * d, HND_PIT.z + Math.sin(a) * d);
}
}
(function () {
var n = HND_NODE_N[0];
for (var i = 0; i < n; i++) {
var Rv = HND_RIVERS[i % 2], f = ((i >> 1) + 0.5) / Math.ceil(n / 2), seg = Math.min(Rv.length - 2, Math.floor(f * (Rv.length - 1))), u = f * (Rv.length - 1) - seg, A = Rv[seg], B = Rv[seg + 1];
var x = A[0] + (B[0] - A[0]) * u, z = A[1] + (B[1] - A[1]) * u, dx = B[0] - A[0], dz = B[1] - A[1], l = Math.hypot(dx, dz) || 1, sd = i % 4 < 2 ? 1 : -1;
add("fish", 0, i, x - dz / l * 12 * sd, z + dx / l * 12 * sd, { face: Math.atan2(dz / l * sd, -dx / l * sd) });
}
})();
(function () { var n = HND_NODE_N[1]; for (var i = 0; i < n; i++) {
var a = -0.4 + i / n * Math.PI * 1.7;
add("fish", 1, i, HND_LAKE.x + Math.cos(a) * HND_LAKE.rx * 1.07, HND_LAKE.z + Math.sin(a) * HND_LAKE.rz * 1.07, { water: [HND_LAKE.x, HND_LAKE.z] });
} })();
(function () { var n = HND_NODE_N[2], F = HND_FALLS; for (var i = 0; i < n; i++) {
var a = 0.1 + i / (n - 1) * Math.PI * 0.9;
add("fish", 2, i, F.x + 8 + Math.cos(a) * 20, F.z + 10 + Math.sin(a) * 20, { water: [F.x + 6, F.z + 8] });
} })();
(function () { var n = HND_NODE_N[3]; for (var i = 0; i < n; i++) {
var x = -760 + i * 95, z = hndCoast(x) + 9;
add("fish", 3, i, x, z, { rock: true, water: [x, z + 30] });
} })();
(function () { var n = HND_NODE_N[4], P = HND_PIER; for (var i = 0; i < n; i++) {
add("fish", 4, i, P.x + (i % 2 ? 1.4 : -1.4), P.z1 - 2 - Math.floor(i / 2) * 5, { pier: true, water: [P.x + (i % 2 ? 10 : -10), P.z1 - 2 - Math.floor(i / 2) * 5] });
} })();
scatter("forage", 0, [-230, 230, 190, 430], function (x, z) { return Math.hypot(x + 40, z - 232) > 16; }, 12);
scatter("forage", 1, [200, 430, 150, 380], null, 14);
scatter("forage", 2, [420, 640, 280, 520], null, 14);
scatter("forage", 3, [600, 960, 380, 760], function (x, z) { return hndLand(x, z) > 22 && Math.hypot(x - HND_MOOR.tx, z - HND_MOOR.tz) > 130; }, 16);
scatter("forage", 4, [HND_MOOR.tx - 110, HND_MOOR.tx + 110, HND_MOOR.tz - 110, HND_MOOR.tz + 110], null, 16);
scatter("hunt", 0, [-400, -210, 170, 430], null, 14);
scatter("hunt", 1, [230, 470, -310, -190], null, 14);
scatter("hunt", 2, [300, 560, -570, -380], null, 16);
scatter("hunt", 3, [-780, -560, 270, 440], function (x, z) { return hndRiverD(x, z) > 24; }, 16);
scatter("hunt", 4, [960, 1110, 300, 580], null, 18);
return out;
},
function (N) {
var g = new THREE.Group(), s = N.s, t = N.t, y = hndLand(N.x, N.z), parts = {};
g.position.set(N.x, y, N.z);
if (s === "wood") {
HND.G.remove(g);
var T = hndTree(HND_TREEKIND[t], N.x, N.z, 1 + t * 0.06);
var rib = new THREE.Mesh(new THREE.TorusGeometry(0.62 + t * 0.05, 0.07, 6, 18), hndC(HND_RIBBON[t]));
rib.rotation.x = Math.PI / 2;
rib.position.y = 1.5;
T.add(rib);
HND.solids.push({ c: 1, x: N.x, z: N.z, r: 0.8, y0: -1e3, y1: 1e3 });
N.g = T;
N.parts = T.userData.parts;
N.r = 3.2;
return;
}
if (s === "mine") {
var vc = HND_VEIN[t][N.i % HND_VEIN[t].length], rock = hndBoulder(2.2, t === 4 ? 0x4A4A56 : 0x7A746A, N.i + t * 9);
rock.position.y = 0.5;
g.add(rock);
var r2 = hndBoulder(1.4, 0x6E685E, N.i + t * 9 + 3);
r2.position.set(1.6, 0.3, 0.8);
g.add(r2);
var vein = new THREE.Group(), vm = hndC(vc, t >= 3 ? { e: vc, ei: 0.25, shine: 80 } : { shine: t ? 70 : 10, spec: 0x8A8A8A }), R = wRand(77 + N.i + t * 31);
for (var i = 0; i < (HND.lite ? 7 : 14); i++) {
var a = R() * 6.28, el = R() * 1.1, f = new THREE.Mesh(new THREE.IcosahedronGeometry(0.16 + R() * 0.14, 0), vm);
f.position.set(Math.cos(a) * 1.9 * Math.cos(el), 0.5 + Math.sin(el) * 1.15, Math.sin(a) * 1.6 * Math.cos(el));
vein.add(f);
}
if (t === 4)
for (var j = 0; j < 6; j++) {
var sp = new THREE.Mesh(new THREE.SphereGeometry(0.05, 5, 4), hndC(0xE8F0FF, { e: 0xC8D8FF, ei: 0.5 }));
sp.position.set((R() - 0.5) * 3, 0.4 + R() * 1.2, (R() - 0.5) * 2.6);
vein.add(sp);
}
g.add(vein);
parts.vein = vein;
HND.solids.push({ c: 1, x: N.x, z: N.z, r: 1.9, y0: -1e3, y1: 1e3 });
N.r = 3.6;
}
else if (s === "fish") {
var wx = N.water ? N.water[0] : N.x, wz = N.water ? N.water[1] : N.z, dx = wx - N.x, dz = wz - N.z, l = Math.hypot(dx, dz) || 1, ux = dx / l, uz = dz / l;
if (N.pier) {
y = HND_W + 1.6;
g.position.y = y;
}
if (N.rock) {
var rk = hndBoulder(4.2, 0x6A6660, N.i + 50);
rk.scale.set(4.2, 1.4, 4.2);
rk.position.set(0, -0.6, 0);
g.add(rk);
y = HND_W + 0.9;
g.position.y = y;
hndFloor(N.x - 3.4, N.x + 3.4, N.z - 3.4, N.z + 3.4, y);
}
if (!N.pier) {
var post = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.14, 1.4, 8), hndSurf("wood", 0x7A5A3A, 0.8));
post.position.set(ux * 1.2, 0.7, uz * 1.2);
g.add(post);
var stone = hndBoulder(0.6, 0x7A746A, N.i + t);
stone.position.set(-uz * 1.2, 0.15, ux * 1.2);
g.add(stone);
}
var off = N.pier ? 4.5 : N.rock ? 5 : 6, rp = hndRipple(HND.G, N.x + ux * off, HND_W, N.z + uz * off);
parts.rip = rp;
HND.ripples.push(rp);
var fl = new THREE.Mesh(new THREE.SphereGeometry(0.12, 8, 6), hndC(0xD83A2A));
fl.position.set(N.x + ux * off, HND_W + 0.08, N.z + uz * off);
HND.G.add(fl);
parts.float = fl;
N.r = N.pier ? 2.4 : 3.2;
}
else if (s === "forage") {
var col = HND_BLOOM[t][N.kind === HND_NODES.forage[t].alt ? 1 : 0] || HND_BLOOM[t][0], R2 = wRand(310 + N.i + t * 41), bl = new THREE.Group(), glow = t >= 3;
if (N.kind === "sk_berry") {
for (var b = 0; b < 4; b++) {
var bush = new THREE.Mesh(hndBlob(b + N.i, 1), hndC(0x2E4A22));
bush.scale.set(1.1, 0.8, 1.1);
bush.position.set((R2() - 0.5) * 2, 0.6, (R2() - 0.5) * 2);
g.add(bush);
}
for (var q = 0; q < 18; q++) {
var be = new THREE.Mesh(new THREE.SphereGeometry(0.07, 5, 4), hndC(col, { shine: 60 }));
be.position.set((R2() - 0.5) * 2.6, 0.4 + R2() * 1, (R2() - 0.5) * 2.6);
bl.add(be);
}
}
else if (N.kind === "sk_mush") {
for (var m = 0; m < 10; m++) {
var a2 = m / 10 * 6.28, mg = new THREE.Group();
var st = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.07, 0.22, 6), hndC(0xB8AC96));
st.position.y = 0.11;
mg.add(st);
var cap = new THREE.Mesh(new THREE.SphereGeometry(0.16, 8, 5, 0, 6.29, 0, 1.5), hndC(col));
cap.position.y = 0.22;
mg.add(cap);
mg.position.set(Math.cos(a2) * 1.6, 0, Math.sin(a2) * 1.6);
bl.add(mg);
}
}
else {
for (var c = 0; c < (HND.lite ? 7 : 14); c++) {
var px = (R2() - 0.5) * 2.4, pz = (R2() - 0.5) * 2.4, lf = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.5 + R2() * 0.3, 4), hndC(t === 1 ? 0x8AA08A : 0x4A7A34));
lf.position.set(px, 0.25, pz);
g.add(lf);
var fw = new THREE.Mesh(new THREE.SphereGeometry(t === 0 ? 0.06 : 0.1, 6, 4), hndC(col, glow ? { e: col, ei: 0.35 } : {}));
fw.position.set(px, 0.55 + R2() * 0.2, pz);
bl.add(fw);
if (t === 2) {
var ctr = new THREE.Mesh(new THREE.SphereGeometry(0.04, 5, 4), hndC(0xE8C83A));
ctr.position.set(px, fw.position.y + 0.05, pz);
bl.add(ctr);
}
}
}
g.add(bl);
parts.bloom = bl;
N.r = 2.8;
}
else if (s === "hunt") {
var earth = hndSurf("earth", 0x8A7050, 1.2), Rh = wRand(500 + N.i + t * 7);
if (t === 0) {
var mound = new THREE.Mesh(new THREE.SphereGeometry(2.2, 14, 8, 0, 6.29, 0, 1.4), hndSurf("grass", 0x6A8A3A, 2));
mound.scale.y = 0.35;
g.add(mound);
for (var h = 0; h < 3; h++) {
var hole = new THREE.Mesh(new THREE.CircleGeometry(0.28, 10), hndC(0x1A140E));
hole.position.set(Math.cos(h * 2) * 1.4, 0.32, Math.sin(h * 2) * 1.4);
hole.lookAt(hole.position.x * 3, 0.2, hole.position.z * 3);
g.add(hole);
}
}
else if (t === 1) {
for (var gr = 0; gr < (HND.lite ? 14 : 28); gr++) {
var bl2 = new THREE.Mesh(new THREE.ConeGeometry(0.08, 1.1 + Rh() * 0.7, 5), hndC(gr % 3 ? 0xA89A5C : 0x7E8E46));
bl2.position.set((Rh() - 0.5) * 3, 0.55, (Rh() - 0.5) * 3);
bl2.rotation.z = (Rh() - 0.5) * 0.3;
g.add(bl2);
}
}
else if (t === 2) {
var tr = hndBox(1.2, 0.04, 9, earth, 0, 0.05, 0, g);
tr.rotation.y = Rh() * 3;
for (var k = 0; k < 6; k++) {
var hp = new THREE.Mesh(new THREE.CircleGeometry(0.1, 6), hndC(0x3A2A1A));
hp.rotation.x = -Math.PI / 2;
hp.position.set(Math.sin(tr.rotation.y) * (k - 3) * 1.3, 0.08, Math.cos(tr.rotation.y) * (k - 3) * 1.3);
g.add(hp);
}
}
else if (t === 3) {
var mud = new THREE.Mesh(new THREE.CircleGeometry(2.6, 20), hndC(0x3A2A1A, { shine: 70, spec: 0x4A4A4A }));
mud.rotation.x = -Math.PI / 2;
mud.position.y = 0.06;
g.add(mud);
var rim = new THREE.Mesh(new THREE.TorusGeometry(2.7, 0.25, 5, 20), earth);
rim.rotation.x = Math.PI / 2;
rim.position.y = 0.05;
g.add(rim);
}
else {
var lick = hndBoulder(0.9, 0xD8D0C0, N.i + 70);
lick.position.y = 0.3;
g.add(lick);
}
var stake = new THREE.Group();
var sk2 = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.05, 0.7, 6), hndSurf("wood", 0x8A6A44, 0.5));
sk2.position.y = 0.35;
stake.add(sk2);
var loop = new THREE.Mesh(new THREE.TorusGeometry(0.22, 0.015, 4, 14), hndC(0xA8A8A0, { shine: 60 }));
loop.position.set(0.2, 0.2, 0);
loop.rotation.y = Math.PI / 2;
stake.add(loop);
stake.position.set(2.6, 0, 0.6);
g.add(stake);
parts.snare = stake;
N.r = 3.4;
}
HND.G.add(g);
N.g = g;
N.parts = parts;
},
function () {
HND.ripples = [];
HND.nodes = hndNodeSpots();
HND.nodes.forEach(function (N) { try {
hndNodeLook(N);
hndNodeShow(N, !(HND.picked[N.id] > Date.now()));
}
catch (e) {
if (window.console)
console.warn("[guildlands] spot", N.id, e);
} });
var P = HND_PIER, deck = hndBox(P.w, 0.3, P.z1 - P.z0, hndSurf("wood", 0x8A6A48, 1.2), P.x, HND_W + 1.45, (P.z0 + P.z1) / 2, HND.G);
for (var z = P.z0; z <= P.z1; z += 6)
[-1, 1].forEach(function (sd) { var post = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.18, 5, 8), hndSurf("wood", 0x5A4430, 0.8)); post.position.set(P.x + sd * (P.w / 2 - 0.1), HND_W - 0.9, z); HND.G.add(post); });
[-1, 1].forEach(function (sd) { hndBox(0.12, 0.9, P.z1 - P.z0, hndSurf("wood", 0x7A5A3A, 1), P.x + sd * (P.w / 2 - 0.06), HND_W + 2.05, (P.z0 + P.z1) / 2, HND.G); hndSolidBox(P.x + sd * (P.w / 2) - 0.1, P.x + sd * (P.w / 2) + 0.1, P.z0 + 2, P.z1, HND_W + 1, HND_W + 3); });
hndFloor(P.x - P.w / 2, P.x + P.w / 2, P.z0 - 6, P.z1, HND_W + 1.6, { name: "the long pier" });
hndBox(P.w + 2, 0.3, 6, hndSurf("wood", 0x8A6A48, 1.2), P.x, HND_W + 1.45, P.z0 - 3, HND.G);
},
function () {
if (typeof build !== "function")
return;
var list = [["deer", 400, -470, 3, 1], ["stag", 440, -520, 1, 1], ["stag", 1030, 420, HND.lite ? 2 : 3, 1.35], ["fox", -300, 300, HND.lite ? 1 : 2, 1], ["deer", -640, 360, HND.lite ? 1 : 2, 1]];
list.forEach(function (L, j) {
for (var i = 0; i < L[3]; i++) {
var a = L[0], x = L[1] + Math.cos(i * 2.3 + j) * 18, z = L[2] + Math.sin(i * 2.3 + j) * 18, g = null;
try {
g = build({ id: "hnd_" + a + "_" + j + "_" + i, archetype: a, label: null, attrs: {}, x: 0, z: 0, rot: 0, solid: false, detail: 3, nights: [] });
}
catch (e) {
g = null;
}
if (!g)
continue;
var B = new THREE.Box3().setFromObject(g), V = new THREE.Vector3();
B.getSize(V);
var Ln = Math.max(V.x, V.z) || 1, want = { deer: 1.9, stag: 2.1, fox: 1 }[a] * L[4];
g.scale.multiplyScalar(want / Ln);
g.position.set(x, hndLand(x, z), z);
g.rotation.y = i * 1.7;
g.userData.keep = 1;
HND.G.add(g);
HND.beasts.push({ g: g, r: a === "fox" ? 14 : 22 });
}
});
},
function (N) {
if (HND.busy)
return;
var S = HND_BY[N.s], lv = HND_TIERS[N.t];
if (!hndJoined()) {
hndCard();
return;
}
if (hndOff(N.s) && !hndKeeper()) {
setStatus(S.icon + " The Keeper has paused " + esc(S.name) + " for now.");
return;
}
if (hndEff(N.s) < lv && !hndKeeper()) {
setStatus(S.icon + " <b>" + esc(N.name) + "</b> needs level " + lv + " in " + esc(S.name) + ". You are level " + hndEff(N.s) + ". " + esc(HND_BY[N.s].name) + " grows as you work the spots you can: every gather teaches you.");
return;
}
if (!hndTool(N.s)) {
setStatus(S.icon + " You need a " + esc(HND_TOOL_NAME[N.s]) + " for that. The Toolmaker in the Guildhall sells them (iron ones for 40 gold).");
return;
}
var until = +HND.picked[N.id] || 0;
if (until > Date.now() && !hndKeeper()) {
setStatus("<b>" + esc(N.name) + ".</b> You have had what there is here for now. Worth another go in " + Math.ceil((until - Date.now()) / 60000) + " minutes.");
return;
}
HND.busy = true;
var tool = hndTool(N.s), ms = Math.max(800, 1800 - tool * 200);
setStatus(S.icon + " <b>" + esc(N.name) + "</b>: you " + esc(N.verb) + (N.s === "wood" || N.s === "mine" ? "…" : " it…"));
hndTone(260, 0.1);
setTimeout(function () { hndTone(310, 0.1); }, ms / 2);
setTimeout(function () {
var L = worldLocal();
if (Math.hypot(L.x - N.x, L.z - N.z) > (N.r || 3) + 2.5) {
HND.busy = false;
setStatus("You moved off before you were done.");
return;
}
cityRpc("skill_gather", { p_spot: N.id }).then(function (o) {
HND.busy = false;
if (o && o.ok) {
HND.picked[N.id] = Date.now() + (+o.regrow || N.rg) * 60000;
hndPickedSave();
hndNodeShow(N, false);
hndTone(523, 0.12);
setTimeout(function () { hndTone(659, 0.14); }, 120);
try {
hndAfter(o);
}
catch (e) { }
setStatus("<b>" + esc(o.say || "") + "</b> It is in your 🎒 Backpack, under Materials.");
if (typeof loadStock === "function")
try {
loadStock();
}
catch (e) { }
}
else {
if (o && o.wait) {
HND.picked[N.id] = Date.now() + o.wait * 60000;
hndPickedSave();
}
setStatus(esc((o && o.say) || "Nothing came of it."));
if (o && (o.need || o.tool))
hndFetch(true);
}
}).catch(function (e) { HND.busy = false; setStatus(esc(hndMissingErr(e) ? hndNotOpen() : "Couldn't reach the city.")); });
}, ms);
},
function (x, z, feet) {
var F = hndFloorAt(x, z, feet === undefined ? 1e9 : feet);
if (F && F.name)
return F.inside ? "in:" + F.name : F.name;
if (Math.hypot(x - HND_TOWN.x, z - HND_TOWN.z) < HND_TOWN.r)
return "Anvilmere";
var dp = Math.hypot(x - HND_PIT.x, z - HND_PIT.z);
if (dp < HND_PIT.R + 20)
return dp < HND_PIT.R ? "Hollowfell quarry, bench " + (hndPitTier(dp) + 1) : "the rim of Hollowfell quarry";
if (Math.hypot(x - HND_FALLS.x, z - HND_FALLS.z) < 60)
return "the falls";
if (hndLakeD(x, z) < 1.3)
return "Mirrormere";
if (z < -240) {
var d = -z;
return "the Greatwood" + (d < 420 ? " (the birches)" : d < 580 ? " (the oaks)" : d < 750 ? " (the maples)" : d < 900 ? " (the yews)" : " (the ironbarks)");
}
if (z > hndCoast(x) - 120)
return "the Saltreach";
if (hndRiverD(x, z) < 30)
return "the river";
var dm = Math.hypot(x - HND_MOOR.x, z - HND_MOOR.z);
if (dm < HND_MOOR.r)
return Math.hypot(x - HND_MOOR.tx, z - HND_MOOR.tz) < 140 ? "the tops of the High Moor" : "the High Moor";
if (z > 150 && z < 460 && Math.abs(x) < 300)
return "Thymewold";
return "the Guildlands";
},
function () {
var G = {};
HND.solids.forEach(function (s) {
var x0 = s.c ? s.x - s.r : s.x0, x1 = s.c ? s.x + s.r : s.x1, z0 = s.c ? s.z - s.r : s.z0, z1 = s.c ? s.z + s.r : s.z1;
for (var i = Math.floor(x0 / HND_CELL); i <= Math.floor(x1 / HND_CELL); i++)
for (var j = Math.floor(z0 / HND_CELL); j <= Math.floor(z1 / HND_CELL); j++) {
var k = i + "," + j;
(G[k] = G[k] || []).push(s);
}
});
HND.sgrid = G;
},
function (x, z, feet) {
var B = HND_BOUND;
if (x < B.x0 || x > B.x1 || z < B.z0 || z > B.z1)
return true;
var L = HND.sgrid[Math.floor(x / HND_CELL) + "," + Math.floor(z / HND_CELL)];
if (!L)
return false;
for (var i = 0; i < L.length; i++) {
var s = L[i];
if (feet >= s.y1 - 0.35 || feet + 1.7 <= s.y0)
continue;
if (s.c) {
if (Math.hypot(x - s.x, z - s.z) < s.r + 0.25)
return true;
}
else if (x > s.x0 - 0.25 && x < s.x1 + 0.25 && z > s.z0 - 0.25 && z < s.z1 + 0.25)
return true;
}
return false;
},
function (dt) {
var L = worldLocal();
HND.t += dt;
if (!HND.built)
return;
var feet = camera.position.y - 1.72, zone = hndZoneAt(L.x, L.z, feet);
if (zone !== HND.zone) {
HND.zone = zone;
HND.inside = zone.indexOf("in:") === 0;
}
if (WLD.arrive && (WLD.arrive.x !== HND_ARRIVE.x || WLD.arrive.z !== HND_ARRIVE.z))
WLD.arrive = { x: HND_ARRIVE.x, z: HND_ARRIVE.z };
(HND.ripples || []).forEach(function (r, i) { if (!r.visible)
return; var p = ((HND.t * 0.33 + i * 0.37) % 1); r.scale.setScalar(1 + p * 2.2); r.material.opacity = 0.5 * (1 - p); });
if (HND.falls)
HND.falls.t.offset.y = (HND.falls.t.offset.y + dt * 0.9) % 1;
(HND.rip || []).forEach(function (t) { t.offset.x = (t.offset.x + dt * 0.004) % 1; });
HND.vt += dt;
if (HND.vt > 0.5) {
HND.vt = 0;
hndVisTick(L);
}
HND.bt = (HND.bt || 0) + dt;
if (HND.bt > 0.1) {
var bdt = HND.bt;
HND.bt = 0;
HND.beasts.forEach(function (Bs) { var p = Bs.g.position; if (Math.abs(p.x - L.x) > 200 || Math.abs(p.z - L.z) > 200)
return; wWander(Bs.g, bdt, function () { return hndLand(Bs.g.position.x, Bs.g.position.z); }, { r: Bs.r, sp: 0.7 }); });
}
HND.rt = (HND.rt || 0) + dt;
if (HND.rt > 10) {
HND.rt = 0;
var n = Date.now();
HND.nodes.forEach(function (N) { if (!N.full && !(HND.picked[N.id] > n))
hndNodeShow(N, true); });
}
worldBanner("<b>⚒️ The Guildlands</b> · " + esc(HND.inside ? zone.slice(3) : zone) + (hndJoined() ? " · total level " + hndTotal() : ""));
HND.pt += dt;
if (HND.pt < 0.15)
return;
HND.pt = 0;
if (WLD.card && WLD.card.style.display === "block") {
worldPrompt(null);
return;
}
if (typeof FG !== "undefined" && FG.open) {
worldPrompt(null);
return;
}
var best = null, bd = 1e9;
function cand(x, z, r, fn, html) { var d = Math.hypot(L.x - x, L.z - z); if (d < r && d / r < bd) {
bd = d / r;
best = { fn: fn, html: html };
} }
HND.talk.forEach(function (T) { var p = T.p.g.position; if (Math.abs(p.y - feet) > 3)
return; cand(p.x, p.z, T.r, function () { wTalk(T.t); }, "<b>" + esc(T.name) + "</b> · <b>press E</b> to talk"); });
HND.spots.forEach(function (s) {
if (Math.abs(s.x - L.x) > s.r + 1 || Math.abs(s.z - L.z) > s.r + 1)
return;
var sy = s.y !== undefined ? s.y : hndLand(s.x, s.z);
if (Math.abs(sy - feet) > 2.8)
return;
cand(s.x, s.z, s.r, s.fn, "<b>" + esc(s.name) + "</b> · <b>press E</b> to " + esc(s.verb));
});
HND.nodes.forEach(function (N) {
if (Math.abs(N.x - L.x) > 8 || Math.abs(N.z - L.z) > 8)
return;
var r = N.r || 3;
var lock = hndJoined() && hndEff(N.s) < HND_TIERS[N.t] && !hndKeeper(), wait = HND.picked[N.id] > Date.now() && !hndKeeper();
cand(N.x, N.z, r, function () { hndGather(N); }, hndNodeWord(N) + (lock ? " · <span style='opacity:.8'>needs level " + HND_TIERS[N.t] + "</span>" : wait ? " · <span style='opacity:.8'>worked; back in " + Math.ceil((HND.picked[N.id] - Date.now()) / 60000) + " min</span>" : " · <b>press E</b> to " + esc(N.verb)));
});
if (best)
worldPrompt(best.html, best.fn);
else
worldPrompt(null);
},
function (L) {
var far = HND.lite ? 430 : 760;
HND.inst.forEach(function (T) { var on = !HND.inside && Math.abs(T.x - L.x) < far + 150 && Math.abs(T.z - L.z) < far + 150; if (T.a.visible !== on) {
T.a.visible = on;
T.b.visible = on;
} });
(HND.districts || []).forEach(function (D) { var on = Math.hypot(L.x - D.x, L.z - D.z) < D.r + far; if (D.g.visible !== on)
D.g.visible = on; });
HND.nodes.forEach(function (N) { if (!N.g)
return; var on = Math.abs(N.x - L.x) < far && Math.abs(N.z - L.z) < far; if (N.g.visible !== on)
N.g.visible = on; });
},
function (G) {
HND.G = G;
HND.lite = typeof LITE !== "undefined" && !!LITE;
HND.solids = [];
HND.sgrid = {};
HND.floors = [];
HND.spots = [];
HND.talk = [];
HND.people = [];
HND.nodes = [];
HND.beasts = [];
HND.rip = [];
HND.ripples = [];
HND.inst = [];
HND.districts = [];
hndPickedLoad();
hndGridMake();
function step(name, fn) { try {
fn();
}
catch (e) {
if (window.console)
console.warn("[guildlands] " + name, e);
} }
step("terrain", function () { hndTerrain(G); });
step("water", function () { hndWater(G); });
step("forest", function () { hndForest(G); });
var TG = new THREE.Group();
TG.name = "hnd-town";
G.add(TG);
step("town", function () { hndTown(TG); });
HND.districts.push({ g: TG, x: 0, z: 40, r: 200 });
var LG = new THREE.Group();
LG.name = "hnd-lodges";
G.add(LG);
step("lodges", function () { hndLodges(LG); });
step("nodes", function () { hndNodes(); });
step("beasts", function () { hndBeasts(); });
step("quarry", function () { hndQuarryDress(G); });
hndBake(TG);
hndBake(LG);
hndSolidGrid();
HND.built = true;
},
function (G) {
var P = HND_PIT, wd = hndSurf("wood", 0x7A5A3A, 1), y = hndLand(P.x - P.R - 6, P.z - 60), g = new THREE.Group();
g.position.set(P.x - P.R - 6, y, P.z - 60);
G.add(g);
hndBox(0.5, 12, 0.5, wd, 0, 6, 0, g);
var jib = hndBox(16, 0.4, 0.4, wd, 7, 11.6, 0, g);
jib.rotation.z = -0.12;
var rope = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 9, 4), hndC(0xB8A880));
rope.position.set(14.5, 7, 0);
g.add(rope);
hndBox(1.4, 1, 1.4, hndSurf("wood", 0x6A4A30, 0.8), 14.5, 2.4, 0, g);
HND.solids.push({ c: 1, x: P.x - P.R - 6, z: P.z - 60, r: 0.6, y0: -1e3, y1: 1e3 });
for (var i = 0; i < (HND.lite ? 14 : 28); i++) {
var a = i * 0.9, d = P.R * (0.15 + ((i * 37) % 80) / 100), x = P.x + Math.cos(a) * d, z = P.z + Math.sin(a) * d, r = hndBoulder(0.6 + (i % 4) * 0.35, 0x8A8476, i + 200);
r.position.set(x, hndLand(x, z) + 0.1, z);
G.add(r);
}
},
function (opt) {
var A = HND_ARRIVE;
HND.zone = "Anvilmere";
HND.inside = false;
camera.position.set(HND.base + A.x, hndGround(A.x, A.z, 1e4) + 1.72, A.z);
yaw = Math.atan2(-(0 - A.x), -(-48 - A.z));
pitch = 0;
hndFetch(true);
setStatus("<b>The Guildlands.</b> Anvilmere's square, the Guildhall before you: the Guildmaster and the Toolmaker are inside. The workshops stand round the square; the roads go out to the Greatwood (north), Hollowfell quarry (east), Mirrormere (west), the Saltreach and the long pier (south) and the High Moor (south-east). <b>Safe</b> everywhere.");
},
function () {
for (var k in HND.mats) {
var m = HND.mats[k];
if (Array.isArray(m))
m.forEach(function (x) { if (x && x.dispose)
try {
x.dispose();
}
catch (e) { } });
else if (m && m.dispose)
try {
m.dispose();
}
catch (e) { }
}
for (var t in HND.tex) {
var x = HND.tex[t];
if (x && x.dispose)
try {
x.dispose();
}
catch (e) { }
}
HND.mats = {};
HND.tex = {};
HND_TREE = {};
HND_RIPT = null;
HND.grid = null;
HND.G = null;
HND.falls = null;
HND.solids = [];
HND.sgrid = {};
HND.floors = [];
HND.spots = [];
HND.talk = [];
HND.people = [];
HND.nodes = [];
HND.beasts = [];
HND.rip = [];
HND.ripples = [];
HND.inst = [];
HND.districts = [];
HND.built = false;
},
function (G) {
if (typeof swkM !== "function")
return;
var lite = HND.lite, gr = function (x, z) { return hndLand(x, z); };
function clear(x, z, r) { r = r || 3; for (var i = 0; i < HND.nodes.length; i++) {
var N = HND.nodes[i];
if (Math.hypot(N.x - x, N.z - z) < r + 2.5)
return false;
} return true; }
function free(x, z, r) { for (var k = 0; k < 60; k++) {
var a = k * 2.4, d = k * 1.6, px = x + Math.cos(a) * d, pz = z + Math.sin(a) * d;
if (clear(px, pz, r))
return [px, pz];
} return null; }
function solid(x, z, r) { HND.solids.push({ c: 1, x: x, z: z, r: r, y0: -1e3, y1: 1e3 }); }
function solidBox(x0, x1, z0, z1) { HND.solids.push({ x0: Math.min(x0, x1), x1: Math.max(x0, x1), z0: Math.min(z0, z1), z1: Math.max(z0, z1), y0: -1e3, y1: 1e3 }); }
function district(name, x, z, r) { var D = new THREE.Group(); D.name = "hnd-sweep-" + name; G.add(D); HND.districts.push({ g: D, x: x, z: z, r: r }); return D; }
function at(D, x, z, ry) { return swkAt(D, x, gr(x, z), z, ry || 0); }
function put(D, a, x, z, ry, s) {
if (typeof build !== "function" || typeof KIT === "undefined" || !KIT[a])
return null;
var m = null;
try {
m = build({ id: "hnds_" + a + "_" + Math.round(x) + "_" + Math.round(z), archetype: a, label: null, attrs: s && s !== 1 ? { s: s } : {}, x: 0, z: 0, rot: 0, solid: false, detail: 3, nights: [] });
}
catch (e) {
m = null;
}
if (!m)
return null;
m.position.set(x, gr(x, z), z);
m.rotation.y = ry || 0;
D.add(m);
return m;
}
var wood = swkM(0x6A4A2E, "wood"), dark = swkM(0x4A3420, "wood"), stoneM = swkM(0x847E72, "stone"), slate = swkM(0x4E525A, "slate"), straw = swkM(0xB89A50, "thatch");
function cart(D, x, z, ry, load) {
var C = at(D, x, z, ry);
swkBox(C, 2.8, 0.12, 1.4, wood, 0, 0.85, 0);
[-0.68, 0.68].forEach(function (e) { swkBox(C, 2.8, 0.4, 0.08, wood, 0, 1.1, e); });
[-1, 1].forEach(function (s) { var w = swkCyl(C, 0.55, 0.55, 0.1, dark, -0.3, 0.55, s * 0.76, 14); w.rotation.x = Math.PI / 2; });
swkBox(C, 1.8, 0.08, 0.08, wood, 2.2, 0.7, 0.25);
swkBox(C, 1.8, 0.08, 0.08, wood, 2.2, 0.7, -0.25);
for (var i = 0; i < 6; i++) {
if (load === "logs") {
var lg = swkCyl(C, 0.2, 0.2, 2.6, swkM(0x6A5038, "bark"), 0, 1.15 + Math.floor(i / 3) * 0.36, -0.4 + (i % 3) * 0.4, 8);
lg.rotation.z = Math.PI / 2;
}
else if (load === "hay")
swkBox(C, 0.8, 0.45, 0.6, straw, -0.9 + (i % 3) * 0.9, 1.15 + (i < 3 ? 0 : 0.45), 0);
else
swkBall(C, 0.3, swkM(load || 0xC88A3A), -1.0 + (i % 3) * 0.8, 1.18, (i < 3 ? -0.3 : 0.3), 1);
}
solid(x, z, 1.4);
return C;
}
function crate(D, x, z, ry, fruit) { var K = at(D, x, z, ry); swkBox(K, 0.7, 0.4, 0.5, swkM(0x8A6A44, "wood"), 0, 0.2, 0); if (fruit)
for (var f = 0; f < 4; f++)
swkBall(K, 0.11, swkM(fruit), -0.18 + (f % 2) * 0.3, 0.42, -0.1 + Math.floor(f / 2) * 0.2, 0); return K; }
function woodpile(D, x, z, ry, n) { var W = at(D, x, z, ry); for (var l = 0; l < n; l++) {
var row = Math.floor(l / 6), lg = swkCyl(W, 0.16, 0.16, 1.6, swkM(l % 2 ? 0x7A5A3A : 0x6A4E34, "bark"), -1.25 + (l % 6) * 0.34 + (row % 2) * 0.17, 0.17 + row * 0.3, 0, 7);
lg.rotation.x = Math.PI / 2;
} solid(x, z, 1.5); return W; }
function bale(D, x, z, ry, yy) { var B = at(D, x, z, ry); swkBox(B, 1.1, 0.5, 0.6, straw, 0, 0.25 + (yy || 0), 0); return B; }
function stook(D, x, z) { var S = at(D, x, z, x * 0.7); for (var i = 0; i < 5; i++) {
var c = swkCyl(S, 0.08, 0.22, 1.3, straw, Math.cos(i * 1.26) * 0.18, 0.62, Math.sin(i * 1.26) * 0.18, 6);
c.rotation.x = Math.sin(i * 1.26) * 0.2;
c.rotation.z = -Math.cos(i * 1.26) * 0.2;
} return S; }
function basket(D, x, z, col) { var B = at(D, x, z, 0); swkCyl(B, 0.3, 0.22, 0.3, swkM(0x9A7A4A, "thatch"), 0, 0.15, 0, 10); swkBall(B, 0.2, swkM(col || 0x6A8A3A, "foliage"), 0, 0.3, 0, 1).scale.y = 0.45; return B; }
function hut(D, x, z, ry, w, d, o) {
o = o || {};
var H = at(D, x, z, ry), h = o.h || 2.4, wall = o.stone ? stoneM : swkM(0x7A5E40, "wood");
swkBox(H, w, h, d, wall, 0, h / 2, 0);
var p = 0.5, rw = d / 2 / Math.cos(p) + 0.3;
[-1, 1].forEach(function (s) { var r = swkBox(H, w + 0.5, 0.14, rw, o.stone ? slate : swkM(0x5A4A3A, "shingle"), 0, h + Math.sin(p) * d / 4 + 0.05, s * d / 4); r.rotation.x = s * p; });
var gab = new THREE.Shape();
gab.moveTo(-d / 2, 0);
gab.lineTo(d / 2, 0);
gab.lineTo(0, Math.tan(p) * d / 2);
var gg = new THREE.ShapeGeometry(gab);
[-1, 1].forEach(function (s) { var m = swkMesh(H, gg, wall, s * w / 2, h, 0); m.rotation.y = s * Math.PI / 2; });
swkBox(H, 0.9, 1.8, 0.06, dark, w * 0.2, 0.9, d / 2 + 0.03);
swkBox(H, 0.6, 0.5, 0.05, swkM(0x2A2C30), -w * 0.25, 1.4, d / 2 + 0.03);
if (o.chimney)
swkBox(H, 0.5, 1.4, 0.5, stoneM, w / 2 - 0.4, h + 0.9, -d / 4);
var c = Math.cos(ry || 0), s2 = Math.sin(ry || 0), hw = w / 2, hd = d / 2;
HND.solids.push({ x0: x - Math.abs(c * hw) - Math.abs(s2 * hd), x1: x + Math.abs(c * hw) + Math.abs(s2 * hd), z0: z - Math.abs(s2 * hw) - Math.abs(c * hd), z1: z + Math.abs(s2 * hw) + Math.abs(c * hd), y0: -1e3, y1: 1e3 });
return H;
}
function drystone(D, x, z, len, ry) {
var W = at(D, x, z, ry);
swkBox(W, len, 0.9, 0.6, stoneM, 0, 0.45, 0);
swkBox(W, len, 0.12, 0.7, swkM(0x6E6A62, "stone"), 0, 0.95, 0);
var c = Math.cos(ry), s = Math.sin(ry);
for (var t = -len / 2 + 0.5; t < len / 2; t += 1.2)
solid(x + c * t, z - s * t, 0.5);
return W;
}
function gorse(D, x, z, s) { var B = at(D, x, z, 0); var b = swkBall(B, 0.9 * s, swkM(0x3E5A2A, "foliage"), 0, 0.55 * s, 0, 1); b.scale.y = 0.7; if (!lite)
for (var f = 0; f < 5; f++)
swkBall(B, 0.1, swkM(0xC8A030), Math.cos(f * 1.3) * 0.7 * s, 0.7 * s, Math.sin(f * 1.3) * 0.7 * s, 0); return B; }
function sheep(D, x, z, ry) {
var S = at(D, x, z, ry), wool = swkM(0xBEB8AA, "plaster"), face = swkM(0x2E2A26);
var b = swkBall(S, 0.42, wool, 0, 0.62, 0, 1);
b.scale.set(1, 0.85, 1.35);
swkBall(S, 0.17, face, 0, 0.78, 0.6, 1).scale.z = 1.3;
[[-0.18, -0.32], [0.18, -0.32], [-0.18, 0.32], [0.18, 0.32]].forEach(function (q) { swkCyl(S, 0.05, 0.05, 0.45, face, q[0], 0.22, q[1], 5); });
return S;
}
function folk(D, seed, L) { return swkPeople(D, seed, L, gr); }
var L;
var A = district("town", 0, 40, 200);
if (clear(-56, 6))
woodpile(A, -56, 6, 0, lite ? 12 : 24);
if (clear(-56, 40))
woodpile(A, -56, 40, 0.1, lite ? 12 : 18);
var saw = at(A, -52, 12, 0.4);
[-0.6, 0.6].forEach(function (e) { var l1 = swkBox(saw, 0.08, 1.0, 0.08, wood, e, 0.45, 0.25); l1.rotation.x = 0.3; var l2 = swkBox(saw, 0.08, 1.0, 0.08, wood, e, 0.45, -0.25); l2.rotation.x = -0.3; });
var sl = swkCyl(saw, 0.2, 0.2, 2.2, swkM(0x8A6A48, "bark"), 0, 0.95, 0, 8);
sl.rotation.z = Math.PI / 2;
solid(-52, 12, 0.9);
cart(A, -50, 46, 0.5, "logs");
for (var pl = 0; pl < (lite ? 2 : 4); pl++)
swkBox(at(A, -58, 24 + pl * 0.01, 0), 3.2, 0.12, 0.4, swkM(0xA07C50, "wood"), 0, 0.08 + pl * 0.13, (pl % 2) * 0.1);
woodpile(A, 57, 92, Math.PI / 2, lite ? 12 : 18);
swkBarrel(A, 40, 83, { y: gr(40, 83) });
swkBarrel(A, 40.9, 83.4, { y: gr(40.9, 83.4) });
solid(40.5, 83.2, 1);
[[52, 83, 0xC8822A], [53, 83.4, 0x8A3A5A], [52.5, 84.2, 0xD8C890]].forEach(function (c) { crate(A, c[0], c[1], 0.3, c[2]); });
solid(52.5, 83.6, 1);
swkBench(A, 36, 86, Math.PI / 2, gr(36, 86));
var tr = at(A, 44, 40, Math.PI / 2);
swkBox(tr, 2.4, 0.6, 0.7, swkM(0x6A6A6A, "stone"), 0, 0.3, 0);
swkFlat(tr, 2.2, 0.5, swkM(0x3A5A6A), 0, 0.56, 0);
solid(44, 40, 1.3);
var hs = put(A, "horse", 46.5, 40, Math.PI / 2);
if (hs) {
hs.userData.keep = 1;
solid(46.5, 40, 1.2);
}
L = [[-54, 10, 1.8, "Carpenter", { look: { top: 0x7A5A3A, layer: "apron", layerColor: 0xB89A70 } }], [-50, 44, -1.2, "Carpenter", { walk: 6 }], [-30, 12, 0.4, "", { walk: 12 }], [-20, 60, 2.2, "", { walk: 10, sex: "f" }],
[30, 66, -2.4, "", { walk: 9 }], [50, 86, 0.2, "Cook", { look: { top: 0xE0D8C8, layer: "apron", layerColor: 0xE8E0D0 }, sex: "f" }], [45, 42, -1.6, "", { look: { top: 0x5A4A3A, hat: "cap" } }],
[20, -20, 0.3, "", { walk: 14, sex: "f" }], [-28, -18, 1.0, "", { walk: 8, child: true }], [62, -30, -1.0, "Tanner", { walk: 6, sex: "f" }]];
folk(A, "hnd_town", L);
var T = district("thyme", -40, 232, 120);
for (var bd = 0; bd < (lite ? 3 : 5); bd++) {
var bx = -62 + bd * 0.1, bz = 218 + bd * 4;
if (!clear(bx, bz, 2))
continue;
var B = at(T, bx, bz, 0);
swkBox(B, 5, 0.3, 1.6, swkM(0x5A4632, "earth"), 0, 0.15, 0);
swkBox(B, 5.1, 0.32, 0.1, wood, 0, 0.16, 0.82);
swkBox(B, 5.1, 0.32, 0.1, wood, 0, 0.16, -0.82);
for (var hb = 0; hb < (lite ? 5 : 9); hb++)
swkBall(B, 0.28, swkM([0x6A8A4A, 0x8A9A6A, 0x5A7A3A][hb % 3], "foliage"), -2.1 + hb * 0.52, 0.42, (hb % 2 - 0.5) * 0.6, 1).scale.y = 0.7;
}
var rk = at(T, -28, 224, 0.2);
[-1.2, 1.2].forEach(function (e) { swkBox(rk, 0.1, 2.0, 0.1, wood, e, 1, 0); });
for (var rr = 0; rr < 3; rr++) {
swkBox(rk, 2.6, 0.05, 0.05, wood, 0, 0.9 + rr * 0.45, 0);
for (var bn = 0; bn < 6; bn++)
swkCyl(rk, 0.06, 0.12, 0.4, swkM([0x6A7A4A, 0x8A6A7A, 0x9A8A4A][(bn + rr) % 3], "foliage"), -1 + bn * 0.4, 0.68 + rr * 0.45, 0, 5);
}
solid(-28, 224, 1.3);
for (var sk = 0; sk < (lite ? 2 : 4); sk++) {
var S = at(T, -24 + sk * 1.4, 240, 0);
swkBox(S, 0.7, 0.6, 0.7, wood, 0, 0.3, 0);
var dome = swkBall(S, 0.42, straw, 0, 0.8, 0, 1);
dome.scale.y = 1.05;
solid(-24 + sk * 1.4, 240, 0.5);
}
basket(T, -45, 224, 0x6A8A3A);
basket(T, -44.2, 223.4, 0x8A3A5A);
basket(T, -33, 222, 0xA89A50);
L = [[-56, 222, 1.6, "Gardener", { sex: "f", look: { top: 0x6A7A4A, layer: "apron", layerColor: 0xD8D0B8 } }], [-30, 226, -0.4, "Gardener", {}], [-20, 210, 0.8, "", { walk: 10, sex: "f" }], [-70, 250, 2.0, "Gardener", { walk: 8 }]];
folk(T, "hnd_thyme", L);
var F = district("fields", 300, 240, 200);
var fs = free(300, 220, 3.5);
if (fs)
hut(F, fs[0], fs[1], 0.3, 5, 3.4, { h: 2.3 });
for (var sr = 0; sr < (lite ? 10 : 22); sr++) {
var sx = 262 + (sr % 6) * 7, sz = 238 + Math.floor(sr / 6) * 7;
if (clear(sx, sz, 1))
stook(F, sx, sz);
}
var rp = free(322, 205, 3);
if (rp) {
var rick = at(F, rp[0], rp[1], 0.4);
swkBox(rick, 4, 2.2, 2.6, straw, 0, 1.1, 0);
[-1, 1].forEach(function (s) { var r = swkBox(rick, 4.3, 0.2, 1.7, swkM(0x9A8040, "thatch"), 0, 2.55, s * 0.65); r.rotation.x = s * 0.65; });
solid(rp[0], rp[1], 2.2);
}
if (clear(285, 200, 2))
cart(F, 285, 200, 1.1, "hay");
if (clear(310, 250, 1)) {
var sc = put(F, "scarecrow", 310, 250, 0.4);
}
for (var fb = 0; fb < (lite ? 2 : 4); fb++) {
var bx2 = 296 + fb * 1.3, bz2 = 213;
if (clear(bx2, bz2, 1))
bale(F, bx2, bz2, 0.2);
}
L = [[292, 226, 0.6, "Gardener", { sex: "f" }], [318, 236, -1.4, "", { walk: 12 }], [276, 262, 2.0, "", { walk: 10, sex: "f" }], [288, 204, 1.2, "Farmer", {}]];
folk(F, "hnd_fields", L);
var P = district("cover", 350, -260, 200);
var kp = free(352, -236, 4) || [352, -236];
hut(P, kp[0], kp[1], -0.2, 4.2, 3.6, { chimney: true });
for (var fe = 0; fe < (lite ? 3 : 6); fe++) {
var fx = 260 + fe * 36, fz = -250 - ((fe * 37) % 50);
if (!clear(fx, fz, 1))
continue;
var Fd = at(P, fx, fz, fe);
[0, 2.1, 4.2].forEach(function (a) { var l = swkBox(Fd, 0.06, 1.4, 0.06, wood, Math.cos(a) * 0.35, 0.65, Math.sin(a) * 0.35); l.rotation.z = Math.cos(a) * 0.2; l.rotation.x = -Math.sin(a) * 0.2; });
swkCyl(Fd, 0.25, 0.25, 0.5, swkM(0x5A5E52, "metal"), 0, 1.35, 0, 10);
swkCyl(Fd, 0.3, 0.25, 0.08, swkM(0x3A3E36, "metal"), 0, 1.62, 0, 10);
}
for (var lp = 0; lp < (lite ? 3 : 7); lp++) {
var lx = 270 + lp * 29, lz = -205 - ((lp * 53) % 90);
if (!clear(lx, lz, 2))
continue;
var Lg = at(P, lx, lz, lp * 0.9);
var big = swkCyl(Lg, 0.4, 0.45, 5, swkM(0x6A5440, "bark"), 0, 0.4, 0, 10);
big.rotation.z = Math.PI / 2;
swkBall(Lg, 0.9, swkM(0x6A5A3A, "foliage"), 2.8, 0.4, 0.6, 1).scale.y = 0.5;
solid(lx, lz, 1.6);
}
woodpile(P, kp[0] + 3.2, kp[1] + 2.6, -0.2, lite ? 6 : 12);
var dg = put(P, "dog", kp[0] - 6, kp[1] + 8, 1.2);
if (dg)
dg.userData.keep = 1;
L = [[kp[0] - 4, kp[1] + 7, 1.0, "Hunter", { look: { top: 0x4A5A3A, bottom: 0x5A4A3A, hat: "cap", hatColor: 0x3A4A2A } }], [300, -262, -0.6, "Hunter", { walk: 14 }], [420, -280, 2.4, "", { walk: 10, sex: "f" }]];
folk(P, "hnd_cover", L);
var M = district("moor", 1000, 520, 260);
var by = free(1000, 525, 4) || [1000, 525];
hut(M, by[0], by[1], 0.5, 5, 4, { stone: true, chimney: true, h: 2.2 });
var fp = free(by[0] + 20, by[1] - 14, 9) || [by[0] + 20, by[1] - 14], fx0 = fp[0], fz0 = fp[1], fr = 7;
for (var ws = 0; ws < 8; ws++) {
if (ws === 2)
continue;
var a = ws / 8 * 6.283, wx = fx0 + Math.cos(a) * fr, wz = fz0 + Math.sin(a) * fr;
if (clear(wx, wz, 1))
drystone(M, wx, wz, 5.4, -a + Math.PI / 2);
}
for (var sh = 0; sh < (lite ? 6 : 14); sh++) {
var a3 = sh * 2.39, d3 = sh < 5 ? 3 + sh * 0.6 : 12 + sh * 1.6, sx2 = fx0 + Math.cos(a3) * d3, sz2 = fz0 + Math.sin(a3) * d3;
if (clear(sx2, sz2, 0.5))
sheep(M, sx2, sz2, a3 * 1.7);
}
for (var g2 = 0; g2 < (lite ? 14 : 34); g2++) {
var gx = 940 + ((g2 * 61) % 180), gz = 440 + ((g2 * 97) % 200);
if (Math.hypot(gx - fx0, gz - fz0) < 12 || Math.hypot(gx - by[0], gz - by[1]) < 6)
continue;
if (clear(gx, gz, 1))
gorse(M, gx, gz, 0.8 + (g2 % 3) * 0.3);
}
var ck = [960, 470];
if (clear(ck[0], ck[1], 2)) {
var C = at(M, ck[0], ck[1], 0);
for (var cs = 0; cs < 7; cs++) {
var st = swkBall(C, 0.75 - cs * 0.08, swkM(0x7E786C, "stone"), Math.sin(cs * 2) * 0.2, 0.4 + cs * 0.42, Math.cos(cs * 2) * 0.2, 1);
st.scale.y = 0.6;
}
solid(ck[0], ck[1], 1);
}
var sd = put(M, "dog", fx0 - 9, fz0 + 3, 2.2);
if (sd)
sd.userData.keep = 1;
L = [[fx0 - 8, fz0 + 5, 2.4, "Shepherd", { look: { top: 0x5A5248, bottom: 0x4A4238, hat: "cap", hatColor: 0x3A3630 } }], [by[0] + 3, by[1] + 5, 0.2, "", { sex: "f", look: { top: 0x7A3A2A } }]];
folk(M, "hnd_moor", L);
HND.sweepAt = { keeper: kp, bothy: by, fold: [fx0, fz0], shelter: fs };
hndSweepEdge(G);
hndSolidGrid();
},
function (G) {
var B = HND_BOUND, S = HND.lite ? 80 : 48, OUT = 1100, mat = hndSurf("grass", 0xFFFFFF, HND.lite ? 9 : 6, { vc: true }), c = new THREE.Color(), R = wRand(7177), trees = [];
function hAt(x, z) {
var dx = Math.max(0, B.x0 - x, x - B.x1), dz = Math.max(0, B.z0 - z), d = Math.max(dx, dz), h = hndRaw(Math.max(B.x0, Math.min(B.x1, x)), Math.max(B.z0, Math.min(B.z1, z)));
var fade = 1 - hndSmooth(620, 860, z);
return d <= 0 ? h - 2.5 : h - 2.5 + (d * 0.07 + (wFbm(x * 0.004, z * 0.004, 31, 3) + 0.5) * Math.min(1, d / 200) * 60) * fade;
}
function strip(x0, x1, z0, z1) {
var nx = Math.round((x1 - x0) / S) + 1, nz = Math.round((z1 - z0) / S) + 1, pos = new Float32Array(nx * nz * 3), col = new Float32Array(nx * nz * 3), uv = new Float32Array(nx * nz * 2), idx = [];
for (var j = 0; j < nz; j++)
for (var i = 0; i < nx; i++) {
var k = j * nx + i, x = x0 + i * (x1 - x0) / (nx - 1), z = z0 + j * (z1 - z0) / (nz - 1), h = hAt(x, z);
pos[k * 3] = x;
pos[k * 3 + 1] = h;
pos[k * 3 + 2] = z;
uv[k * 2] = x;
uv[k * 2 + 1] = z;
var n = wNoise(x * 0.02, z * 0.02, 5);
c.setHex(n > 0.5 ? 0x3A5424 : 0x46622C);
c.multiplyScalar(0.9 + wNoise(x * 0.1, z * 0.1, 9) * 0.15);
col[k * 3] = c.r;
col[k * 3 + 1] = c.g;
col[k * 3 + 2] = c.b;
var inside = x > B.x0 + 30 && x < B.x1 - 30 && z > B.z0 + 30;
if (!inside && z < 640 && R() < (HND.lite ? 0.7 : 1.6))
for (var t = 0; t < (HND.lite ? 1 : 2); t++) {
var tx = x + (R() - 0.5) * S, tz = z + (R() - 0.5) * S;
if (tx > B.x0 + 8 && tx < B.x1 - 8 && tz > B.z0 + 8)
continue;
trees.push([tx, hAt(tx, tz) - 0.4, tz, 1.1 + R() * 0.7, R() * 6.28]);
}
}
for (var b = 0; b < nz - 1; b++)
for (var a = 0; a < nx - 1; a++) {
var A = b * nx + a;
idx.push(A, A + nx, A + 1, A + 1, A + nx, A + nx + 1);
}
var g = new THREE.BufferGeometry();
g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
g.setAttribute("color", new THREE.BufferAttribute(col, 3));
g.setAttribute("uv", new THREE.BufferAttribute(uv, 2));
g.setIndex(idx);
g.computeVertexNormals();
g.computeBoundingSphere();
var m = new THREE.Mesh(g, mat);
m.name = "hnd-edge";
m.userData.keep = 1;
G.add(m);
}
strip(B.x0 - OUT, B.x1 + OUT, B.z0 - OUT, B.z0 + 24);
strip(B.x0 - OUT, B.x0 + 24, B.z0 + 24 - S, 1000);
strip(B.x1 - 24, B.x1 + OUT, B.z0 + 24 - S, 1000);
var M = hndTreeMats();
["pine", "yew"].forEach(function (k, ki) {
var L = trees.filter(function (t, i) { return i % 2 === ki; });
if (!L.length)
return;
var g = hndTreeGeo(k), tm = new THREE.InstancedMesh(g.trunk, M[0], L.length), cm = new THREE.InstancedMesh(g.crown, M[1], L.length);
L.forEach(function (t, i) { var mx = hndMx(t[0], t[1], t[2], t[3], t[3], t[3], 0, t[4], 0); tm.setMatrixAt(i, mx); cm.setMatrixAt(i, mx); });
tm.instanceMatrix.needsUpdate = true;
cm.instanceMatrix.needsUpdate = true;
tm.frustumCulled = false;
cm.frustumCulled = false;
tm.userData.keep = 1;
cm.userData.keep = 1;
tm.name = cm.name = "hnd-edge";
G.add(tm);
G.add(cm);
});
var sea = new THREE.Mesh(new THREE.PlaneGeometry(B.x1 - B.x0 + 2 * OUT + 400, 1600, 1, 1), hndWaterMat(0x2E5E80));
sea.rotation.x = -Math.PI / 2;
sea.position.set(0, HND_W - 0.12, 860 + 800);
hndFixUV(sea);
sea.name = "hnd-edge";
G.add(sea);
}
];
});
