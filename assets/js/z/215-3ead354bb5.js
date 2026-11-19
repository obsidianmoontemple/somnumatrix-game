/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(215, function () {
"use strict";
return [
function (n, withWords) {
var base = scapeForVisitors(!!withWords), S = base.store, city = (typeof somnucorRealm === "function") ? somnucorRealm() : null, cityId = city ? city.id : -1;
var objs = (store.objects || []).filter(function (o) { return o.nights && o.nights.indexOf(n) >= 0 && (o.realm || 0) !== cityId && !o.city; });
var used = {};
objs.forEach(function (o) { used[o.realm || 0] = 1; });
S.objects = objs;
S.realms = (store.realms || []).filter(function (r) { return used[r.id] && r.kind !== "somnucor"; });
S.characters = (S.characters || []).filter(function (c) { return c.sessions && c.sessions.indexOf(n) >= 0; });
var rec = (store.sessions || []).filter(function (r) { return r.n === n; })[0];
S.sessions = rec ? [withWords ? rec : { n: rec.n, date: rec.date, title: "Night " + rec.n }] : [];
if (!withWords)
S.transcript = "";
base.night = n;
return base;
},
function () {
if (!(typeof signedIn === "function" && signedIn()) || DWL.busy)
return;
DWL.busy = true;
cityRpc("dream_worlds_board", {}).then(function (o) { DWL.b = o || null; }).catch(function () { DWL.b = { ok: false, say: "Dream worlds could not be opened just now." }; })
.then(function () { DWL.busy = false; dwlPaint(); });
},
function () {
var f = DWL.share;
if (!f)
return;
if (!(typeof signedIn === "function" && signedIn())) {
DWL.say = "Sign in first: a dream world belongs to an account.";
dwlPaint();
return;
}
var sc = dwlScape(f.n, f.words);
if (!sc.store.objects.filter(function (o) { return !o.filler; }).length) {
DWL.say = "That dream has no forms in the world yet, so there is nothing to walk into.";
dwlPaint();
return;
}
dwlAct("dream_world_publish", { p_night: f.n, p_title: f.title, p_scape: sc, p_words: !!f.words, p_open: !!f.open }, function (o) { if (o && o.ok) {
DWL.share = null;
DWL.tab = "mine";
} });
},
function (id) {
if (typeof amVisiting === "function" && amVisiting()) {
DWL.say = "Go back to your own world first.";
dwlPaint();
return;
}
DWL.say = "Opening the door…";
dwlPaint();
cityRpc("dream_world_enter", { p_id: id }).then(function (o) {
if (!o || !o.ok || !o.scape || !o.scape.store) {
DWL.say = (o && o.say) || "That door would not open just now.";
dwlPaint();
return;
}
DWL.open = false;
dwlPaint();
if (typeof store !== "undefined" && store.inside && typeof leaveInterior === "function")
try {
leaveInterior();
}
catch (e) { }
beginVisit({ dreamerDoor: "world:" + o.id, name: o.name || "a dreamer", doorLine: o.title || "" }, o.scape);
var first = (store.objects || []).filter(function (x) { return !x.filler; })[0];
if (first) {
var K = (typeof KIT !== "undefined" && KIT[first.archetype]) ? KIT[first.archetype].size : [2, 2, 2], sc = (first.attrs && first.attrs.s) || 1;
var back = Math.max(8, Math.max(K[0], K[2]) * sc * 0.6 + 6);
camera.position.set(first.x, (typeof terrainY === "function" ? terrainY(first.x, first.z + back) : 0) + 1.72, first.z + back);
if (typeof yaw !== "undefined")
yaw = 0;
}
setStatus("<b>You are walking in \"" + esc(o.title || "a dream") + "\"</b>, " + esc(o.name || "a dreamer") + "'s dream. Nothing you do here changes anything. Press <b>Back to your own</b> when you are done.");
}).catch(function () { DWL.say = "That door would not open just now."; dwlPaint(); });
},
function (w, mine) {
var h = '<div style="border-top:1px solid #2A3040;padding:7px 0"><b style="color:#F2E6C4">🌍 ' + esc(w.title) + '</b>' + (mine ? "" : ' · ' + esc(w.name || "")) +
'<br><span style="color:#9AA3B5">' + (w.open ? "Open to everyone" : "By invitation") + ' · ' + (w.visits || 0) + ' visit' + (w.visits === 1 ? "" : "s") + (mine && w.earned ? " · earned " + w.earned + " gold" : "") + (w.words ? " · with the words" : "") + '</span><div style="margin-top:4px">';
h += '<button class="btn" data-dw="enter" data-id="' + w.id + '" style="padding:2px 8px">Walk in</button> ';
if (mine) {
h += '<button class="btn" data-dw="' + (w.open ? "invite_only" : "open") + '" data-id="' + w.id + '" style="padding:2px 8px">' + (w.open ? "Make it invitation only" : "Open the door to everyone") + '</button> ' +
'<button class="btn" data-dw="remove" data-id="' + w.id + '" style="padding:2px 8px">Take it down</button>';
var fr = (DWL.friends || []).filter(function (f) { return !(w.guests || []).some(function (g) { return g.id === f.id; }); });
h += '<div style="margin-top:4px">Invited: ' + ((w.guests || []).length ? (w.guests || []).map(function (g) { return esc(g.name || "a friend") + ' <button class="btn" data-dw="uninvite" data-id="' + w.id + '" data-u="' + esc(g.id) + '" style="padding:0 6px">✕</button>'; }).join(" ") : '<span style="color:#9AA3B5">nobody yet</span>') + '</div>';
if (fr.length)
h += '<div style="margin-top:4px"><select id="dw-inv-' + w.id + '">' + fr.map(function (f) { return '<option value="' + esc(f.id) + '">' + esc(f.name || "a friend") + '</option>'; }).join("") + '</select> <button class="btn" data-dw="invite" data-id="' + w.id + '" style="padding:2px 8px">Invite</button></div>';
}
return h + '</div></div>';
},
function () {
var B = DWL.b, h = '<div style="display:flex;align-items:center;gap:8px;margin-bottom:8px"><b style="font-size:15px;flex:1">🌍 Dream worlds</b><button class="btn" data-dw="close">Close</button></div>';
if (!(typeof signedIn === "function" && signedIn()))
return h + '<div style="color:#9AA3B5">Sign in to visit dream worlds, or to share your own.</div>';
h += '<div style="display:flex;gap:6px;margin-bottom:10px">' + [["visit", "Visit"], ["mine", "Mine"]].concat(DWL.share ? [["share", "Share a dream"]] : []).map(function (t) { return '<button class="btn" data-dw="tab" data-t="' + t[0] + '" style="' + (DWL.tab === t[0] ? "border-color:#E8C67A;color:#F2E6C4" : "") + '">' + t[1] + '</button>'; }).join("") + '</div>';
if (DWL.say)
h += '<div style="margin:0 0 8px;color:#E8D9B0">' + esc(DWL.say) + '</div>';
if (DWL.tab === "share" && DWL.share) {
var f = DWL.share;
return h + '<div>Share <b>Night ' + f.n + '</b> as a world others can walk into. Only the forms and figures of that night go.</div>' +
'<label style="display:block;margin-top:8px">Its name</label><input id="dw-title" maxlength="60" style="width:100%" value="' + esc(f.title) + '">' +
'<label style="display:block;margin-top:8px">The door</label><select id="dw-open" style="width:100%"><option value="1"' + (f.open ? " selected" : "") + '>Open to everyone</option><option value="0"' + (f.open ? "" : " selected") + '>By invitation (friends you choose)</option></select>' +
'<label style="display:flex;gap:6px;align-items:center;margin-top:8px"><input type="checkbox" id="dw-words"' + (f.words ? " checked" : "") + '> and the words I wrote about it</label>' +
'<div style="color:#9AA3B5;margin:8px 0">Visitors cannot change anything. You earn 2 gold for each new visitor in a day (dues paid, up to 100 gold a day). You can shut the door or take it down any time.</div>' +
'<button class="btn" data-dw="publish">Share it</button>';
}
if (!B)
return h + '<div style="color:#9AA3B5">Opening…</div>';
if (!B.ok)
return h + '<div style="color:#E8C67A">' + esc(B.say || "") + '</div>';
if (DWL.tab === "mine") {
if (!B.mine.length)
h += '<div style="color:#9AA3B5">You have not shared a dream yet. Open the Journal, choose a dream, and press "🌍 Share as a world".</div>';
B.mine.forEach(function (w) { h += dwlRow(w, true); });
return h;
}
if (B.invited.length) {
h += '<b>Invited</b>';
B.invited.forEach(function (w) { h += dwlRow(w, false); });
}
h += '<b style="display:block;margin-top:8px">Open to everyone</b>';
if (!B.open.length)
h += '<div style="color:#9AA3B5;margin-top:4px">No open dream worlds yet. Share one of yours from the Journal.</div>';
B.open.forEach(function (w) { h += dwlRow(w, false); });
return h;
},
function () {
var el = document.getElementById("dwl-box");
if (!DWL.open) {
if (el)
el.style.display = "none";
return;
}
if (!el) {
el = document.createElement("div");
el.id = "dwl-box";
el.style.cssText = "position:fixed;z-index:53;left:50%;top:50%;transform:translate(-50%,-50%);width:min(480px,calc(100vw - 32px));max-height:min(84vh,720px);overflow-y:auto;" +
"background:linear-gradient(180deg,rgba(14,20,30,.97),rgba(7,9,14,.98));border:1px solid #5A8AA0;border-radius:8px;padding:12px 14px 14px;color:var(--bone,#C9BEA8);" +
"font:13px var(--sans,system-ui);box-shadow:0 14px 50px rgba(0,0,0,.6);-webkit-overflow-scrolling:touch";
el.addEventListener("keydown", function (e) { e.stopPropagation(); });
el.addEventListener("click", dwlClick);
document.body.appendChild(el);
}
if (DWL.tab === "share")
dwlReadShare();
el.innerHTML = dwlHtml();
el.style.display = "block";
},
function (e) {
var t = e.target.closest && e.target.closest("[data-dw]");
if (!t)
return;
var a = t.getAttribute("data-dw"), id = +t.getAttribute("data-id");
if (a === "close") {
DWL.open = false;
dwlPaint();
return;
}
if (a === "tab") {
dwlReadShare();
DWL.tab = t.getAttribute("data-t");
DWL.say = "";
dwlPaint();
return;
}
if (a === "publish") {
dwlReadShare();
dwlPublish();
return;
}
if (a === "enter") {
dwlEnter(id);
return;
}
if (a === "remove") {
if (!confirm("Take this dream world down? Visitors can no longer walk in."))
return;
dwlAct("dream_world_manage", { p_id: id, p_act: "remove", p_user: null, p_text: null });
return;
}
if (a === "open" || a === "invite_only") {
dwlAct("dream_world_manage", { p_id: id, p_act: a, p_user: null, p_text: null });
return;
}
if (a === "uninvite") {
dwlAct("dream_world_manage", { p_id: id, p_act: "uninvite", p_user: t.getAttribute("data-u"), p_text: null });
return;
}
if (a === "invite") {
var s = document.getElementById("dw-inv-" + id);
if (s && s.value)
dwlAct("dream_world_manage", { p_id: id, p_act: "invite", p_user: s.value, p_text: null });
return;
}
}
];
});
