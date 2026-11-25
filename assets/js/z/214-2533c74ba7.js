/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(214, function () {
return [
function (cr, size) {
cr = cr || {};
var S = size || 96, c = document.createElement("canvas");
c.width = c.height = S;
var x = c.getContext("2d"), a = cr.a || "#2A3F7A", b = cr.b || "#C9A85A", sh = cr.shape || "shield", m = S / 96;
x.beginPath();
if (sh === "round")
x.arc(S / 2, S / 2, S * 0.44, 0, Math.PI * 2);
else if (sh === "diamond") {
x.moveTo(S / 2, S * 0.04);
x.lineTo(S * 0.94, S / 2);
x.lineTo(S / 2, S * 0.96);
x.lineTo(S * 0.06, S / 2);
x.closePath();
}
else if (sh === "banner") {
x.moveTo(S * 0.14, S * 0.06);
x.lineTo(S * 0.86, S * 0.06);
x.lineTo(S * 0.86, S * 0.94);
x.lineTo(S / 2, S * 0.74);
x.lineTo(S * 0.14, S * 0.94);
x.closePath();
}
else {
x.moveTo(S * 0.1, S * 0.08);
x.lineTo(S * 0.9, S * 0.08);
x.lineTo(S * 0.9, S * 0.5);
x.quadraticCurveTo(S * 0.88, S * 0.82, S / 2, S * 0.96);
x.quadraticCurveTo(S * 0.12, S * 0.82, S * 0.1, S * 0.5);
x.closePath();
}
x.fillStyle = a;
x.fill();
x.lineWidth = 5 * m;
x.strokeStyle = b;
x.stroke();
x.font = Math.round(S * 0.42) + "px system-ui,'Apple Color Emoji','Segoe UI Emoji',sans-serif";
x.textAlign = "center";
x.textBaseline = "middle";
x.fillText(cr.mark || "🌙", S / 2, S * (sh === "banner" ? 0.42 : 0.52));
return c;
},
function () {
if (!GUILD.b || !GUILD.b.mine)
return;
cityRpc("guild_chat_since", { p_since: GUILD.since }).then(function (rows) {
rows = rows || [];
if (!rows.length)
return;
var first = GUILD.since === 0;
rows.forEach(function (r) { if (r.id > GUILD.since) {
GUILD.chat.push(r);
GUILD.since = r.id;
if (!first && !r.mine && !(GUILD.open && GUILD.tab === "chat"))
GUILD.unread++;
} });
if (GUILD.chat.length > 80)
GUILD.chat = GUILD.chat.slice(-80);
gldButton();
if (GUILD.open && GUILD.tab === "chat")
gldPaint(true);
}).catch(function () { });
},
function () {
var B = GUILD.b, h = '<div style="display:flex;align-items:center;gap:8px;margin-bottom:8px"><b style="font-size:15px;flex:1">🛡️ Guilds</b><button class="btn" data-gd="close">Close</button></div>';
if (!B)
return h + '<div style="color:#9AA3B5">' + (typeof signedIn === "function" && signedIn() ? "Opening…" : "Sign in to join or found a guild.") + '</div>';
if (!B.ok)
return h + '<div style="color:#E8C67A">' + esc(B.say || "Guilds could not be opened just now.") + '</div>';
if (GUILD.say)
h += '<div style="margin:0 0 8px;color:#E8D9B0">' + esc(GUILD.say) + '</div>';
var g = B.mine;
if (!g)
return h + gldOutside(B);
h += '<div style="display:flex;gap:10px;align-items:center;margin-bottom:8px">' + gldCrestImg(g.crest, 48) +
'<div style="flex:1"><div style="font-size:16px;font-weight:700;color:#F2E6C4">' + esc(g.name) + ' <span style="color:#C9A85A">[' + esc(g.tag) + ']</span></div>' +
(g.motto ? '<div style="color:#B9B2A2;font-style:italic">"' + esc(g.motto) + '"</div>' : '') +
'<div style="color:#9AA3B5;font-size:12px">' + g.members + ' member' + (g.members === 1 ? '' : 's') + ' · ' + (g.open ? 'open to all' : 'by invitation') + (g.hall ? ' · hall: ' + esc(g.hall.name) : '') + '</div></div></div>';
var tabs = [["chat", "Chat" + (GUILD.unread ? " (" + GUILD.unread + ")" : "")], ["members", "Members"], ["purse", "Purse"]];
if (B.role === "leader")
tabs.push(["settings", "Settings"]);
h += '<div style="display:flex;gap:6px;margin-bottom:10px;flex-wrap:wrap">' + tabs.map(function (t) { return '<button class="btn" data-gd="tab" data-t="' + t[0] + '" style="' + (GUILD.tab === t[0] ? 'border-color:#C9A85A;color:#F2E6C4' : '') + '">' + t[1] + '</button>'; }).join("") + '</div>';
if (GUILD.tab === "members")
h += gldMembers(B, g);
else if (GUILD.tab === "purse")
h += gldPurse(B, g);
else if (GUILD.tab === "settings" && B.role === "leader")
h += gldSettings(g);
else
h += gldChatHtml();
return h;
},
function () {
var h = '<div id="gld-log" style="height:min(42vh,320px);overflow-y:auto;border:1px solid #2A3145;border-radius:6px;padding:6px 8px;background:rgba(0,0,0,.25)">';
if (!GUILD.chat.length)
h += '<div style="color:#9AA3B5">No words yet. Say hello to your guild.</div>';
GUILD.chat.forEach(function (r) { h += '<div style="padding:2px 0"><b style="color:' + (r.mine ? "#C9A85A" : "#B7C6E6") + '">' + esc(r.name || "a dreamer") + '</b> ' + esc(r.body) + '</div>'; });
h += '</div><div style="display:flex;gap:6px;margin-top:6px"><input id="gld-say" maxlength="240" placeholder="Say something to your guild" style="flex:1;min-width:0;padding:7px 8px;border-radius:5px;border:1px solid #39435A;background:#0E111B;color:#EDE6D6;font:13px var(--sans,system-ui)">' +
'<button class="btn" data-gd="say">Send</button></div>';
return h;
},
function (B, g) {
var boss = B.role === "leader", off = B.role === "officer" || boss, me = myUserId(), h = '';
(g.roster || []).forEach(function (m) {
h += '<div style="display:flex;gap:6px;align-items:center;padding:4px 0;border-bottom:1px solid #222839;flex-wrap:wrap">' +
'<span style="width:9px;height:9px;border-radius:5px;background:' + (m.here ? "#7FC48A" : "#3A4155") + '" title="' + (m.here ? "In Somnucor now" : "Away") + '"></span>' +
'<span style="flex:1;min-width:120px">' + esc(m.name || "a dreamer") + ' <span style="color:#9AA3B5;font-size:12px">· ⭐' + m.level + (m.role !== "member" ? ' · ' + (m.role === "leader" ? "👑 leader" : "officer") : '') + '</span></span>';
if (m.id !== me && m.role !== "leader") {
if (boss)
h += (m.role === "officer" ? '<button class="btn" data-gd="role" data-r="member" data-id="' + m.id + '" style="padding:2px 7px">Make member</button>' : '<button class="btn" data-gd="role" data-r="officer" data-id="' + m.id + '" style="padding:2px 7px">Make officer</button>') +
'<button class="btn" data-gd="handover" data-id="' + m.id + '" data-n="' + esc(m.name || "") + '" style="padding:2px 7px">Hand over</button>';
if (boss || (off && m.role === "member"))
h += '<button class="btn" data-gd="remove" data-id="' + m.id + '" data-n="' + esc(m.name || "") + '" style="padding:2px 7px">Remove</button>';
}
h += '</div>';
});
if (off) {
var cands = [], seen = {};
(g.roster || []).forEach(function (m) { seen[m.id] = 1; });
if (typeof presenceList === "function")
presenceList().slice(0, 12).forEach(function (p) { if (!seen[p.id]) {
seen[p.id] = 1;
cands.push({ id: p.id, name: p.name, why: Math.round(p.dist) + " m away" });
} });
if (typeof TOG !== "undefined" && TOG.friends)
TOG.friends.forEach(function (f) { if (!seen[f.id]) {
seen[f.id] = 1;
cands.push({ id: f.id, name: f.name, why: "friend" });
} });
h += '<div style="font-weight:600;margin:10px 0 4px">Invite</div>';
if (!cands.length)
h += '<div style="color:#9AA3B5;font-size:12px">Stand near someone, or add friends from your phone, to invite them.</div>';
cands.forEach(function (c) { h += '<div style="display:flex;gap:6px;align-items:center;padding:2px 0"><span style="flex:1">' + esc(c.name || "a dreamer") + ' <span style="color:#9AA3B5;font-size:12px">· ' + c.why + '</span></span><button class="btn" data-gd="invite" data-id="' + c.id + '" style="padding:2px 8px">Invite</button></div>'; });
if (g.invited && g.invited.length)
h += '<div style="color:#9AA3B5;font-size:12px;margin-top:4px">Invited: ' + g.invited.map(esc).join(", ") + '</div>';
}
h += '<div style="margin-top:12px"><button class="btn" data-gd="leave">Leave the guild</button></div>';
return h;
},
function (B, g) {
var h = '<div style="text-align:center;margin:4px 0 10px"><div style="font-size:24px;font-weight:700;color:#F2E6C4">' + (+g.purse || 0).toLocaleString("en-US") + ' gold</div><div style="color:#9AA3B5;font-size:12px">in the guild purse</div></div>';
h += '<div style="display:flex;gap:6px;flex-wrap:wrap"><input id="gld-gold" type="number" min="1" step="1" placeholder="Gold" style="width:110px;padding:7px 8px;border-radius:5px;border:1px solid #39435A;background:#0E111B;color:#EDE6D6">' +
'<input id="gld-note" maxlength="100" placeholder="What for (optional)" style="flex:1;min-width:120px;padding:7px 8px;border-radius:5px;border:1px solid #39435A;background:#0E111B;color:#EDE6D6"></div>' +
'<div style="display:flex;gap:6px;margin-top:6px">' + (B.keeper ? '' : '<button class="btn" data-gd="in">Put in</button>') + (B.role === "leader" ? '<button class="btn" data-gd="out">Take out</button>' : '') + '</div>' +
'<div style="color:#9AA3B5;font-size:12px;margin-top:5px">Any member may put gold in. Only the leader' + (B.role === "leader" && !B.paid ? ' (with dues paid)' : '') + ' may take it out, and every coin is written in the book below for all members to see.</div>';
h += '<div style="font-weight:600;margin:10px 0 4px">The purse book</div>';
if (!(g.book || []).length)
h += '<div style="color:#9AA3B5;font-size:12px">Nothing yet.</div>';
(g.book || []).forEach(function (r) { h += '<div style="display:flex;gap:8px;font-size:12.5px;padding:2px 0;border-bottom:1px solid #222839"><span style="width:70px;color:' + (r.gold > 0 ? "#7FC48A" : "#E8A08A") + '">' + (r.gold > 0 ? "+" : "") + (+r.gold).toLocaleString("en-US") + '</span><span style="flex:1">' + esc(r.who || "a dreamer") + (r.note ? ' · ' + esc(r.note) : '') + '</span><span style="color:#9AA3B5">' + new Date(r.at).toLocaleDateString() + '</span></div>'; });
return h;
},
function (cr) {
cr = cr || {};
var h = '<div style="display:flex;gap:10px;align-items:center;margin:6px 0"><span id="gld-crest-prev">' + gldCrestImg(cr, 56) + '</span><div style="flex:1">' +
'<div style="display:flex;gap:4px;flex-wrap:wrap;margin-bottom:5px">' + GLD_SHAPES.map(function (s) { return '<button class="btn" data-gd="shape" data-v="' + s[0] + '" style="padding:2px 7px;' + ((cr.shape || "shield") === s[0] ? 'border-color:#C9A85A' : '') + '">' + s[1] + '</button>'; }).join("") + '</div>' +
'<label style="font-size:12px">Field <input type="color" id="gld-a" value="' + (cr.a || "#2A3F7A") + '"></label> <label style="font-size:12px;margin-left:8px">Border <input type="color" id="gld-b" value="' + (cr.b || "#C9A85A") + '"></label></div></div>' +
'<div style="display:flex;gap:3px;flex-wrap:wrap">' + GLD_MARKS.map(function (m) { return '<button class="btn" data-gd="mark" data-v="' + m + '" style="padding:2px 6px;font-size:16px;' + ((cr.mark || "🌙") === m ? 'border-color:#C9A85A' : '') + '">' + m + '</button>'; }).join("") + '</div>';
return h;
},
function (B) {
var h = '', f = GUILD.form;
(B.invites || []).forEach(function (g) {
h += '<div style="border:1px solid #C9A85A;border-radius:6px;padding:8px 10px;margin-bottom:8px;display:flex;gap:8px;align-items:center">' + gldCrestImg(g.crest, 36) +
'<div style="flex:1"><b>' + esc(g.name) + ' [' + esc(g.tag) + ']</b> invites you<div style="color:#9AA3B5;font-size:12px">' + g.members + ' members · led by ' + esc(g.leader || "a dreamer") + '</div></div>' +
'<button class="btn" data-gd="join" data-id="' + g.id + '">Join</button><button class="btn" data-gd="decline" data-id="' + g.id + '">No thanks</button></div>';
});
if (f) {
h += '<div style="border:1px solid #39435A;border-radius:6px;padding:9px 10px;margin-bottom:10px"><b>Found a guild</b>' +
'<div style="display:flex;gap:6px;margin-top:6px;flex-wrap:wrap"><input id="gld-name" maxlength="32" placeholder="Name (3 to 32 letters)" value="' + esc(f.name || "") + '" style="flex:1;min-width:150px;padding:7px 8px;border-radius:5px;border:1px solid #39435A;background:#0E111B;color:#EDE6D6">' +
'<input id="gld-tag" maxlength="5" placeholder="TAG" value="' + esc(f.tag || "") + '" style="width:80px;text-transform:uppercase;padding:7px 8px;border-radius:5px;border:1px solid #39435A;background:#0E111B;color:#EDE6D6"></div>' +
'<input id="gld-motto" maxlength="120" placeholder="Motto (optional)" value="' + esc(f.motto || "") + '" style="width:100%;box-sizing:border-box;margin-top:6px;padding:7px 8px;border-radius:5px;border:1px solid #39435A;background:#0E111B;color:#EDE6D6">' +
gldCrestPicker(f.crest) +
'<div style="display:flex;gap:6px;margin-top:8px;align-items:center"><button class="btn" data-gd="found" style="font-weight:600">Found it' + (B.keeper ? '' : ' · 1,000 gold') + '</button><button class="btn" data-gd="unform">Not now</button></div>' +
(B.paid || B.keeper ? '' : '<div style="color:#E8C67A;font-size:12px;margin-top:5px">Founding a guild is for dreamers whose dues are paid. You can still join one.</div>') + '</div>';
}
else
h += '<div style="margin-bottom:10px"><button class="btn" data-gd="form" style="font-weight:600">🛡️ Found a guild</button> <span style="color:#9AA3B5;font-size:12px">or join one below</span></div>';
h += '<div style="font-weight:600;margin:4px 0">The guilds of Somnucor, largest first</div>';
if (!(B.all || []).length)
h += '<div style="color:#9AA3B5;font-size:12px">No guilds yet. Be the first.</div>';
(B.all || []).forEach(function (g) {
h += '<div style="display:flex;gap:8px;align-items:center;padding:5px 0;border-bottom:1px solid #222839">' + gldCrestImg(g.crest, 30) +
'<div style="flex:1"><b>' + esc(g.name) + '</b> <span style="color:#C9A85A">[' + esc(g.tag) + ']</span><div style="color:#9AA3B5;font-size:12px">' + g.members + ' members' + (g.motto ? ' · "' + esc(g.motto) + '"' : '') + '</div></div>' +
(g.open ? '<button class="btn" data-gd="join" data-id="' + g.id + '" style="padding:2px 9px">Join</button>' : '<span style="color:#9AA3B5;font-size:12px">by invitation</span>') + '</div>';
});
return h;
},
function (g) {
var f = GUILD.set || (GUILD.set = { motto: g.motto, crest: JSON.parse(JSON.stringify(g.crest || {})), open: g.open });
var h = '<input id="gld-motto2" maxlength="120" placeholder="Motto" value="' + esc(f.motto || "") + '" style="width:100%;box-sizing:border-box;padding:7px 8px;border-radius:5px;border:1px solid #39435A;background:#0E111B;color:#EDE6D6">' +
gldCrestPicker(f.crest) +
'<label style="display:block;margin-top:8px"><input type="checkbox" id="gld-open"' + (f.open ? ' checked' : '') + '> Open: anyone may join (otherwise by invitation)</label>' +
'<div style="margin-top:8px"><b>The hall</b> <span style="color:#9AA3B5;font-size:12px">a lot you own or rent; the guild\'s banners fly outside it</span><div id="gld-halls" style="margin-top:4px">';
if (!GUILD.choices)
h += '<span style="color:#9AA3B5">Looking at your lots…</span>';
else if (!GUILD.choices.length)
h += '<span style="color:#9AA3B5;font-size:12px">You own or rent no lot yet. Find one at the Realty office.</span>';
else {
h += '<select id="gld-hall" style="padding:6px;border-radius:5px;background:#0E111B;color:#EDE6D6;border:1px solid #39435A"><option value="">No hall</option>';
GUILD.choices.forEach(function (l) { h += '<option value="' + l.id + '"' + (g.hall && g.hall.id === l.id ? ' selected' : '') + '>' + esc(l.name || ("Lot " + l.id)) + (l.quarter ? ' · ' + esc(l.quarter) : '') + '</option>'; });
h += '</select>';
}
h += '</div></div><div style="margin-top:10px"><button class="btn" data-gd="save" style="font-weight:600">Save</button></div>';
return h;
},
function () {
var f = GUILD.set;
if (!f)
return;
var e = document.getElementById("gld-motto2");
if (e)
f.motto = e.value;
if (document.getElementById("gld-a")) {
f.crest.a = document.getElementById("gld-a").value;
f.crest.b = document.getElementById("gld-b").value;
}
var o = document.getElementById("gld-open");
if (o)
f.open = o.checked;
},
function (keepInput) {
var el = document.getElementById("gld-box");
if (!GUILD.open) {
if (el)
el.style.display = "none";
return;
}
if (!el) {
el = document.createElement("div");
el.id = "gld-box";
el.style.cssText = "position:fixed;z-index:53;left:50%;top:50%;transform:translate(-50%,-50%);width:min(480px,calc(100vw - 32px));max-height:min(84vh,720px);overflow-y:auto;" +
"background:linear-gradient(180deg,rgba(16,18,30,.97),rgba(8,9,14,.98));border:1px solid #6A7A9A;border-radius:8px;padding:12px 14px 14px;color:var(--bone,#C9BEA8);" +
"font:13px var(--sans,system-ui);box-shadow:0 14px 50px rgba(0,0,0,.6);-webkit-overflow-scrolling:touch";
el.addEventListener("keydown", function (e) { e.stopPropagation(); if (e.key === "Enter" && e.target && e.target.id === "gld-say") {
e.preventDefault();
gldSend();
} });
el.addEventListener("input", function (e) { if (e.target && /^gld-(a|b)$/.test(e.target.id)) {
if (GUILD.form)
gldReadForm();
if (GUILD.set)
gldReadSet();
gldCrestPrev();
} });
el.addEventListener("click", gldClick);
document.body.appendChild(el);
}
var typed = document.getElementById("gld-say"), keep = typed ? typed.value : "", focus = typed && document.activeElement === typed;
if (GUILD.form && document.getElementById("gld-name"))
gldReadForm();
if (GUILD.set && document.getElementById("gld-motto2"))
gldReadSet();
el.innerHTML = gldHtml();
el.style.display = "block";
var t2 = document.getElementById("gld-say");
if (t2 && keep) {
t2.value = keep;
}
if (t2 && focus)
t2.focus();
var log = document.getElementById("gld-log");
if (log)
log.scrollTop = log.scrollHeight;
if (GUILD.tab === "chat" && GUILD.open && GUILD.unread) {
GUILD.unread = 0;
gldButton();
}
},
function (e) {
var t = e.target && e.target.closest ? e.target.closest("[data-gd]") : null;
if (!t)
return;
var a = t.getAttribute("data-gd"), id = t.getAttribute("data-id"), n = t.getAttribute("data-n");
if (a === "close") {
GUILD.open = false;
gldPaint();
return;
}
if (a === "tab") {
GUILD.tab = t.getAttribute("data-t");
GUILD.say = "";
if (GUILD.tab === "settings") {
GUILD.set = null;
if (!GUILD.choices)
cityRpc("guild_hall_choices", {}).then(function (c) { GUILD.choices = c || []; gldPaint(); }).catch(function () { GUILD.choices = []; gldPaint(); });
}
gldPaint();
if (GUILD.tab === "chat")
gldChat();
return;
}
if (a === "say")
return gldSend();
if (a === "form") {
GUILD.form = { name: "", tag: "", motto: "", crest: { shape: "shield", a: "#2A3F7A", b: "#C9A85A", mark: "🌙" } };
gldPaint();
return;
}
if (a === "unform") {
GUILD.form = null;
gldPaint();
return;
}
if (a === "shape" || a === "mark") {
var tgt = GUILD.form ? GUILD.form : GUILD.set;
if (!tgt)
return;
if (GUILD.form)
gldReadForm();
else
gldReadSet();
tgt.crest[a === "shape" ? "shape" : "mark"] = t.getAttribute("data-v");
gldPaint();
return;
}
if (a === "found") {
gldReadForm();
var f = GUILD.form;
gldAct("guild_found", { p_name: f.name, p_tag: f.tag, p_motto: f.motto, p_crest: f.crest }, function (o) { if (o && o.ok) {
GUILD.form = null;
GUILD.tab = "members";
} });
return;
}
if (a === "join")
return gldAct("guild_join", { p_guild: +id }, function (o) { if (o && o.ok)
GUILD.tab = "chat"; });
if (a === "decline")
return gldAct("guild_decline", { p_guild: +id });
if (a === "leave") {
var g = GUILD.b && GUILD.b.mine;
if (!g)
return;
var last = g.members <= 1;
if (!confirm(last ? "You are the last one in " + g.name + ". Leaving closes the guild, and the purse comes back to you. Leave?" : "Leave " + g.name + "?"))
return;
return gldAct("guild_leave", {}, function () { GUILD.chat = []; GUILD.since = 0; });
}
if (a === "invite")
return gldAct("guild_manage", { p_act: "invite", p_user: id, p_data: null });
if (a === "remove") {
if (!confirm("Remove " + (n || "them") + " from the guild?"))
return;
return gldAct("guild_manage", { p_act: "remove", p_user: id, p_data: null });
}
if (a === "role")
return gldAct("guild_manage", { p_act: t.getAttribute("data-r"), p_user: id, p_data: null });
if (a === "handover") {
if (!confirm("Hand the guild to " + (n || "them") + "? They will lead it, and you will be an officer."))
return;
return gldAct("guild_manage", { p_act: "handover", p_user: id, p_data: null });
}
if (a === "in" || a === "out") {
var gv = Math.floor(+(document.getElementById("gld-gold") || {}).value || 0), nt = (document.getElementById("gld-note") || {}).value || "";
if (!(gv > 0)) {
GUILD.say = "How much gold?";
gldPaint();
return;
}
return gldAct("guild_purse", { p_gold: a === "in" ? gv : -gv, p_note: nt });
}
if (a === "save") {
gldReadSet();
var s = GUILD.set, hall = document.getElementById("gld-hall");
var data = { motto: s.motto, crest: s.crest, open: s.open };
if (hall)
data.hall = hall.value;
return gldAct("guild_manage", { p_act: "settings", p_user: null, p_data: data }, function (o) { if (o && o.ok) {
GUILD.set = null;
GUILD.hallsAt = 0;
} });
}
},
function (h) {
var grp = new THREE.Group();
grp.name = "guild-banner-" + h.id;
var poleM = new THREE.MeshStandardMaterial({ color: 0x2A2620, roughness: 0.6, metalness: 0.4 });
var c = document.createElement("canvas");
c.width = 256;
c.height = 512;
var x = c.getContext("2d");
var cr = h.crest || {};
x.fillStyle = cr.a || "#2A3F7A";
x.fillRect(0, 0, 256, 512);
x.fillStyle = cr.b || "#C9A85A";
x.fillRect(0, 0, 256, 14);
x.fillRect(0, 0, 14, 470);
x.fillRect(242, 0, 14, 470);
x.beginPath();
x.moveTo(0, 470);
x.lineTo(128, 512);
x.lineTo(256, 470);
x.lineTo(256, 460);
x.lineTo(128, 500);
x.lineTo(0, 460);
x.fill();
x.drawImage(gldCrestCanvas(cr, 180), 38, 70);
x.fillStyle = "#F2E6C4";
x.textAlign = "center";
x.font = "700 34px Georgia,serif";
x.fillText(h.tag || "", 128, 310);
x.font = "600 22px Georgia,serif";
var nm = h.name || "";
x.fillText(nm.length > 18 ? nm.slice(0, 17) + "…" : nm, 128, 350);
var tex = new THREE.CanvasTexture(c);
var cloth = new THREE.Mesh(new THREE.PlaneGeometry(1.1, 2.2), new THREE.MeshStandardMaterial({ map: tex, side: THREE.DoubleSide, roughness: 0.9 }));
cloth.position.set(0.58, 3.9, 0);
var pole = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.06, 5.2, 8), poleM);
pole.position.y = 2.6;
var arm = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 1.3, 6), poleM);
arm.rotation.z = Math.PI / 2;
arm.position.set(0.6, 5.05, 0);
var cap = new THREE.Mesh(new THREE.SphereGeometry(0.09, 10, 8), new THREE.MeshStandardMaterial({ color: 0xC9A85A, metalness: 0.7, roughness: 0.3 }));
cap.position.y = 5.25;
grp.add(pole);
grp.add(arm);
grp.add(cloth);
grp.add(cap);
grp.userData.cloth = cloth;
return grp;
},
function (x, z) {
for (var r = 6; r <= 30; r += 3) {
for (var k = 0; k < 12; k++) {
var a = k / 12 * Math.PI * 2, px = x + Math.cos(a) * r, pz = z + Math.sin(a) * r;
var gy = typeof terrainY === "function" ? terrainY(px, pz) : 0;
try {
if (typeof blockedAt === "function" && (blockedAt(px, pz, gy + 0.2) || blockedAt(px + 0.6, pz, gy + 0.2) || blockedAt(px - 0.6, pz, gy + 0.2)))
continue;
}
catch (e) { }
return { x: px, z: pz, y: gy, a: a };
}
}
return null;
}
];
});
