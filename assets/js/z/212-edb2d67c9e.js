/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(212, function () {
return [
function (text) {
var el = document.getElementById("lvl-toast");
if (!el) {
el = document.createElement("div");
el.id = "lvl-toast";
el.style.cssText = "position:fixed;z-index:60;left:50%;top:22%;transform:translateX(-50%);max-width:calc(100vw - 40px);padding:10px 16px;border-radius:8px;" +
"background:rgba(14,16,28,.92);border:1px solid #C9A85A;color:#F2E6C4;font:600 15px var(--sans,system-ui);text-align:center;pointer-events:none;" +
"opacity:0;transition:opacity 1.2s ease";
document.body.appendChild(el);
}
el.textContent = text;
requestAnimationFrame(function () { el.style.opacity = "1"; });
clearTimeout(LVL.toastT);
LVL.toastT = setTimeout(function () { el.style.opacity = "0"; }, 4200);
},
function (list, ends) {
if (!list || !list.length)
return '<div style="color:#9AA3B5">No goals yet.</div>';
var h = '';
list.forEach(function (g) {
var c = g.done ? "#7FC48A" : "#C9A85A";
h += '<div style="border:1px solid ' + (g.done ? "#3E6A48" : "#39435A") + ';border-radius:6px;padding:8px 10px;margin-bottom:7px' + (g.bonus ? ';background:rgba(201,168,90,.07)' : '') + '">' +
'<div style="display:flex;gap:8px;align-items:baseline"><b style="flex:1">' + (g.done ? "✓ " : "") + esc(g.bonus ? "All three goals" : g.say) + '</b>' +
'<span style="color:#9AA3B5;font-size:12px;white-space:nowrap">' + g.have + ' / ' + g.need + '</span></div>' +
lvlBar(g.have, g.need, c) +
'<div style="margin-top:4px;color:#B9B2A2;font-size:12px">+' + lvlFmt(g.xp) + ' XP' + (g.gold ? ' · +' + lvlFmt(g.gold) + ' gold' : '') +
(g.own ? ' · <span title="Only the game can see this one, so it pays experience, not gold">experience only</span>' : '') + '</div></div>';
});
if (ends)
h += '<div style="color:#9AA3B5;font-size:12px">New goals in ' + lvlWhen(ends) + '.</div>';
return h;
},
function () {
var B = LVL.boards;
if (!B)
return '<div style="color:#9AA3B5">Fetching the boards…</div>';
if (!B.ok)
return '<div style="color:#E8C67A">' + esc(B.say || "The boards could not be fetched.") + '</div>';
var h = '';
LVL_BOARDS.forEach(function (d) {
var rows = B[d[0]] || [];
h += '<div style="margin-bottom:10px"><div style="font-weight:600;margin-bottom:3px">' + d[1] + '</div>';
if (!rows.length)
h += '<div style="color:#9AA3B5;font-size:12px">Nobody yet. It could be you.</div>';
rows.forEach(function (r, i) {
var val = d[0] === "racers" ? (r.ms / 1000).toFixed(2) + " s" : d[0] === "rank" ? "Lv " + r.n : d[0] === "rich" || d[0] === "shops" ? lvlFmt(r.n) + " gold" : lvlFmt(r.n);
h += '<div style="display:flex;gap:8px;padding:2px 0;border-bottom:1px solid #222839;font-size:12.5px">' +
'<span style="width:20px;color:#9AA3B5">' + (d[0] === "racers" ? "" : (i + 1) + ".") + '</span>' +
'<span style="flex:1">' + esc(r.name || "a dreamer") + (r.sub ? ' <span style="color:#9AA3B5">· ' + esc(r.sub) + '</span>' : '') + '</span>' +
'<span style="color:#E8D9B0;white-space:nowrap">' + val + '</span></div>';
});
h += '</div>';
});
return h;
},
function () {
var p = LVL.me, h = '<div style="display:flex;align-items:center;gap:8px;margin-bottom:8px"><b style="font-size:15px;flex:1">⭐ Progress</b><button class="btn" data-lv="close">Close</button></div>';
h += '<div style="display:flex;gap:6px;margin-bottom:10px;flex-wrap:wrap">' +
[["you", "You"], ["day", "Today"], ["week", "This week"], ["boards", "Leaderboards"]].map(function (t) {
return '<button class="btn" data-lv="tab" data-t="' + t[0] + '" style="' + (LVL.tab === t[0] ? 'border-color:#C9A85A;color:#F2E6C4' : '') + '">' + t[1] + '</button>';
}).join("") + '</div>';
if (LVL.tab === "boards")
return h + lvlBoardsHtml();
if (!p)
return h + '<div style="color:#9AA3B5">' + (typeof signedIn === "function" && signedIn() ? "Counting…" : "Sign in to earn levels and goals.") + '</div>';
if (!p.ok)
return h + '<div style="color:#E8C67A">' + esc(p.say || "Your progress could not be fetched just now.") + '</div>';
if (LVL.tab === "day")
return h + lvlGoals(p.day, p.day_ends) + (p.paid ? '' : '<div style="color:#9AA3B5;font-size:12px;margin-top:6px">Goals pay gold to dreamers whose dues are paid.</div>');
if (LVL.tab === "week")
return h + lvlGoals(p.week, p.week_ends) + (p.paid ? '' : '<div style="color:#9AA3B5;font-size:12px;margin-top:6px">Goals pay gold to dreamers whose dues are paid.</div>');
var span = Math.max(1, p.next_at - p.level_at), into = p.xp - p.level_at;
h += '<div style="text-align:center;margin:4px 0 10px"><div style="font-size:30px;font-weight:700;color:#F2E6C4">' + p.level + '</div>' +
'<div style="font-size:16px;color:#E8D9B0">' + esc(p.title) + '</div>' +
'<div style="color:#9AA3B5;font-size:12px;margin-top:2px">' + lvlFmt(p.xp) + ' XP</div></div>' +
lvlBar(into, span) + '<div style="display:flex;color:#9AA3B5;font-size:12px;margin-top:3px"><span style="flex:1">Level ' + p.level + '</span><span>' + lvlFmt(p.next_at - p.xp) + ' XP to level ' + (p.level + 1) + (p.next_title !== p.title ? ' (' + esc(p.next_title) + ')' : '') + '</span></div>';
var dl = (p.day || []).filter(function (g) { return !g.bonus; }), dd = dl.filter(function (g) { return g.done; }).length;
var wl = (p.week || []).filter(function (g) { return !g.bonus; }), wd = wl.filter(function (g) { return g.done; }).length;
h += '<div style="display:flex;gap:6px;margin:12px 0"><button class="btn" data-lv="tab" data-t="day" style="flex:1">Today: ' + dd + ' of ' + dl.length + ' goals</button>' +
'<button class="btn" data-lv="tab" data-t="week" style="flex:1">This week: ' + wd + ' of ' + wl.length + '</button></div>';
if (p.recent && p.recent.length) {
h += '<div style="font-weight:600;margin:6px 0 3px">Lately</div>';
p.recent.slice(0, 6).forEach(function (r) { h += '<div style="display:flex;gap:8px;font-size:12px;color:#B9B2A2;padding:1px 0"><span style="color:#E8D9B0;width:64px">+' + lvlFmt(r.xp) + ' XP</span><span style="flex:1">' + esc(lvlWhy(r.why)) + '</span></div>'; });
}
h += '<details style="margin-top:10px;color:#9AA3B5;font-size:12px"><summary style="cursor:pointer">How experience is earned</summary><div style="margin-top:5px;line-height:1.5">' +
'Everything real you do in Somnucor counts, and the city keeps the count: hours at work, good deeds, Nightmares brought down, dream shards, keys and secrets, Academy lessons, licences, races, games on Station Aurora, temple services and candles, Space Corp missions, cab rides, letters, shopping, gold finds, the library, the cinema, the Extravaganza hunt and friends. ' +
'Titles: Sleeper, Stirring (3), Dreamer (5), Wanderer (8), Lucid (12), Pathfinder (16), Starwalker (20), Mapmaker (25), Oneironaut (30), Dreamwright (40), Archdreamer (50).</div></details>';
return h;
},
function () {
var el = document.getElementById("lvl-box");
if (!LVL.open) {
if (el)
el.style.display = "none";
return;
}
if (!el) {
el = document.createElement("div");
el.id = "lvl-box";
el.style.cssText = "position:fixed;z-index:53;left:50%;top:50%;transform:translate(-50%,-50%);width:min(460px,calc(100vw - 32px));max-height:min(82vh,700px);overflow-y:auto;" +
"background:linear-gradient(180deg,rgba(16,18,30,.97),rgba(8,9,14,.98));border:1px solid #6A7A9A;border-radius:8px;padding:12px 14px 14px;color:var(--bone,#C9BEA8);" +
"font:13px var(--sans,system-ui);box-shadow:0 14px 50px rgba(0,0,0,.6);-webkit-overflow-scrolling:touch";
el.addEventListener("keydown", function (e) { e.stopPropagation(); });
el.addEventListener("click", function (e) {
var t = e.target && e.target.closest ? e.target.closest("[data-lv]") : null;
if (!t)
return;
var a = t.getAttribute("data-lv");
if (a === "close") {
LVL.open = false;
lvlPaint();
}
else if (a === "tab") {
LVL.tab = t.getAttribute("data-t");
if (LVL.tab === "boards")
lvlBoards();
lvlPaint();
}
});
document.body.appendChild(el);
}
el.innerHTML = lvlHtml();
el.style.display = "block";
}
];
});
