/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
var LVL = { me: null, at: 0, busy: false, open: false, tab: "you", boards: null, boardsAt: 0, ranks: {}, ranksAt: 0, ranksBusy: false, shownLevel: null };
function lvlTitleLine(p) { return "Level " + p.level + " · " + p.title; }
function lvlLoad(force) {
if (LVL.busy || typeof signedIn !== "function" || !signedIn())
return;
if (!force && performance.now() - LVL.at < 180000)
return;
LVL.busy = true;
LVL.at = performance.now();
cityRpc("my_progress", {}).then(function (p) {
LVL.busy = false;
if (!p || !p.ok) {
LVL.me = p || null;
lvlPaint();
return;
}
var before = LVL.shownLevel;
LVL.me = p;
LVL.ranks[myUserId()] = { level: p.level, title: p.title };
if (before !== null && p.level > before)
lvlToast("⭐ Level " + p.level + (p.title !== (LVL.prevTitle || p.title) ? " · you are now a " + p.title : " · " + p.title));
var doneNow = [];
["day", "week"].forEach(function (k) { (p[k] || []).forEach(function (g) { var id = k + ":" + g.key; if (g.done && LVL.doneSeen && !LVL.doneSeen[id])
doneNow.push(g); }); });
LVL.doneSeen = {};
["day", "week"].forEach(function (k) { (p[k] || []).forEach(function (g) { if (g.done)
LVL.doneSeen[k + ":" + g.key] = 1; }); });
if (doneNow.length && before !== null) {
var g = doneNow[0];
lvlToast("✓ " + (g.bonus ? "All three goals" : g.say) + " · +" + g.xp + " XP" + (g.gold ? " · +" + g.gold + " gold" : ""));
}
LVL.shownLevel = p.level;
LVL.prevTitle = p.title;
lvlButton();
lvlPaint();
}).catch(function () { LVL.busy = false; });
}
function lvlButton() {
var b = document.getElementById("me-lvl");
if (!b)
return;
b.textContent = LVL.me && LVL.me.ok ? "⭐ " + LVL.me.level : "⭐ Progress";
b.title = LVL.me && LVL.me.ok ? lvlTitleLine(LVL.me) + ": goals and leaderboards" : "Your level, goals and the leaderboards";
}
function lvlToast(text) { return __ZC(212, 0, this, arguments, new.target); }
function lvlFmt(n) { return (+n || 0).toLocaleString("en-US"); }
function lvlBar(have, need, col) {
var f = need > 0 ? Math.max(0, Math.min(1, have / need)) : 0;
return '<div style="height:8px;border-radius:4px;background:#232838;overflow:hidden;margin-top:4px"><div style="height:100%;width:' + (f * 100).toFixed(1) + '%;background:' + (col || "#C9A85A") + '"></div></div>';
}
function lvlWhen(iso) {
var ms = new Date(iso).getTime() - Date.now();
if (!(ms > 0))
return "soon";
var h = Math.floor(ms / 3600000), m = Math.floor(ms % 3600000 / 60000);
return h >= 48 ? Math.round(h / 24) + " days" : h > 0 ? h + " h " + m + " min" : m + " min";
}
function lvlGoals(list, ends) { return __ZC(212, 1, this, arguments, new.target); }
var LVL_BOARDS = [["rank", "⭐ Highest rank"], ["rich", "💰 Richest"], ["hunters", "🗡️ Nightmare hunters"], ["seekers", "🗝️ Key seekers"], ["secrets", "🔍 Most secrets found"], ["racers", "🏁 Fastest on each track"], ["shops", "🏪 Busiest shops this week"]];
function lvlBoardsHtml() { return __ZC(212, 2, this, arguments, new.target); }
function lvlHtml() { return __ZC(212, 3, this, arguments, new.target); }
var LVL_WHY = { work: "hours at work", merit: "good deeds", nightmare: "Nightmares", shard: "dream shards", key: "keys", gate: "the Gate of Dreams", secret: "secrets", lesson: "lessons", licence: "licences", race: "races", podium: "race podiums", station: "Station Aurora games", temple: "temple services", candle: "candles", mission: "missions", cab: "cab rides", letter: "letters", shop: "shopping", find: "gold finds", library: "the library", cinema: "the cinema", fest: "the Extravaganza hunt", friend: "friends" };
function lvlWhy(w) {
w = String(w || "");
if (/^goal: /.test(w))
return "Goal: " + w.slice(6);
return w.replace(/\b([a-z]+) (\d+)/g, function (m, k, n) { return LVL_WHY[k] ? (LVL_WHY[k] + " ×" + n) : m; });
}
function lvlPaint() { return __ZC(212, 4, this, arguments, new.target); }
function lvlBoards() {
if (performance.now() - LVL.boardsAt < 60000 && LVL.boards)
return;
LVL.boardsAt = performance.now();
cityRpc("leaderboards", {}).then(function (b) { LVL.boards = b || { ok: false }; lvlPaint(); }).catch(function () { LVL.boards = { ok: false, say: "The boards could not be fetched just now." }; lvlPaint(); });
}
function lvlOpen(tab) { LVL.open = true; if (tab)
LVL.tab = tab; lvlPaint(); lvlLoad(true); if (LVL.tab === "boards")
lvlBoards(); }
if (typeof backRegister === "function")
backRegister({ order: 2, open: function () { return LVL.open; }, close: function () { LVL.open = false; lvlPaint(); } });
function lvlTagText(p, r) {
var base = (p.name || "a dreamer") + (p.away ? " · " + "away" : "");
if (r && r.guild)
base += " [" + r.guild + "]";
return r ? base + " · ⭐" + r.level + " " + r.title : base;
}
function lvlTagsTick() {
if (typeof presenceOthers === "undefined")
return;
var ids = Object.keys(presenceOthers);
ids.forEach(function (id) {
var p = presenceOthers[id], g = p && p.group, r = LVL.ranks[id];
if (!g || !r)
return;
var want = r.level + "|" + r.title + "|" + (r.guild || "");
if (g.userData.lvlTag === want)
return;
if (p.away)
return;
try {
var old = g.userData.tag, tag = makeTag(lvlTagText(p, r), false);
tag.position.y = old ? old.position.y : 2.02;
g.add(tag);
g.userData.tag = tag;
if (old)
dropTag(old);
g.userData.lvlTag = want;
}
catch (e) { }
});
if (LVL.ranksBusy || !ids.length || performance.now() - LVL.ranksAt < 60000)
return;
if (typeof signedIn !== "function" || !signedIn())
return;
LVL.ranksBusy = true;
LVL.ranksAt = performance.now();
cityRpc("ranks_of", { p_ids: ids.slice(0, 60) }).then(function (rows) {
LVL.ranksBusy = false;
(rows || []).forEach(function (r) { if (r && r.id)
LVL.ranks[r.id] = { level: r.level, title: r.title, guild: r.guild || null }; });
}).catch(function () { LVL.ranksBusy = false; });
}
(function () {
if (typeof presenceTick !== "function")
return;
var tick = presenceTick, n = 0;
presenceTick = function (dt) {
var r = tick.apply(this, arguments);
if (++n % 30 === 0) {
try {
var ids = Object.keys(presenceOthers || {});
if (ids.some(function (id) { return !LVL.ranks[id]; }) && performance.now() - LVL.ranksAt > 8000)
LVL.ranksAt = 0;
lvlTagsTick();
}
catch (e) { }
}
return r;
};
})();
function lvlMark(kind) { if (typeof signedIn === "function" && signedIn())
cityRpc("goal_mark", { p_kind: kind }).then(function () { if (LVL.open)
lvlLoad(true); }).catch(function () { }); }
(function () {
if (typeof closeNight === "function") {
var cn = closeNight;
closeNight = function () { var r = cn.apply(this, arguments); if (r !== null)
lvlMark("dream"); return r; };
}
if (typeof togEmote === "function") {
var te = togEmote;
togEmote = function () { var r = te.apply(this, arguments); lvlMark("emote"); return r; };
}
if (typeof pmSnap === "function") {
var ps = pmSnap;
pmSnap = function () { var r = ps.apply(this, arguments); lvlMark("photo"); return r; };
}
})();
(function () {
function hook() {
var bar = document.getElementById("me-bar");
if (!bar)
return setTimeout(hook, 900);
if (document.getElementById("me-lvl"))
return;
var b = document.createElement("button");
b.className = "btn";
b.id = "me-lvl";
b.onclick = function () { lvlOpen(); };
var pk = document.getElementById("me-tonight") || document.getElementById("me-pack");
if (pk && pk.parentNode === bar)
bar.insertBefore(b, pk);
else
bar.appendChild(b);
lvlButton();
}
if (document.readyState === "loading")
document.addEventListener("DOMContentLoaded", hook);
else
hook();
})();
setInterval(function () {
if (typeof signedIn !== "function" || !signedIn())
return;
if (typeof walkMode !== "undefined" && !walkMode && !LVL.open)
return;
lvlLoad(false);
}, 20000);
