/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(220, function () {
"use strict";
return [
function (p) {
var s = new Date(p.starts), e = new Date(p.ends), now = Date.now();
var t = function (d) { return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }); };
var day = s.toDateString() === new Date().toDateString() ? "today" : s.toLocaleDateString([], { weekday: "long", day: "numeric", month: "short" });
if (now >= s.getTime())
return "on now, until " + t(e);
return day + ", " + t(s) + " to " + t(e);
},
function (p) {
var w = p.world || "somnucor";
if (w !== "somnucor") {
PTY.say = "It is in " + ((typeof HL_WORLD !== "undefined" && HL_WORLD[w]) || w) + ". Go there, and the door opens for you.";
ptyPaint();
return;
}
var h = typeof lotHome === "function" ? lotHome(p.lot_name) : null;
if (!h) {
var L = typeof lotByName === "function" ? lotByName(p.lot_name) : null;
if (L && L.x != null)
h = { x: L.x, z: L.z };
}
if (!h) {
PTY.say = "I cannot find " + p.lot_name + " on the map yet. Go to Somnucor and try again.";
ptyPaint();
return;
}
guideTo = { key: p.lot_name, x: h.x, z: h.z };
var r = typeof somnucorRealm === "function" ? somnucorRealm() : null;
if (r && (store.here || 0) !== r.id && typeof toSomnucor === "function")
toSomnucor();
setStatus("🎉 <b>" + esc(p.title) + "</b>: follow the pointer at the top of the screen to " + esc(p.lot_name) + ".");
PTY.open = false;
ptyPaint();
},
function (p, host) {
var h = '<div style="border:1px solid ' + (p.on ? "#E8A0B0" : "#2A3040") + ';border-radius:6px;padding:8px 10px;margin-bottom:8px">';
h += '<b style="color:#F2E6C4">🎉 ' + esc(p.title) + '</b>' + (p.on ? ' <span style="color:#E8A0B0">· on now</span>' : '');
h += '<div style="color:#C8BCA8">' + ptyWhere(p) + ' · ' + ptyWhen(p) + '</div>';
if (!host)
h += '<div style="color:#9AA3B5">Hosted by ' + esc(p.host_name || "a dreamer") + (p.friends ? ' · all their friends are invited' : '') + ' · ' + p.going + ' coming</div>';
if (p.note)
h += '<div style="margin-top:3px">' + esc(p.note) + '</div>';
if (host) {
h += '<div style="color:#9AA3B5;margin-top:4px">' + p.going + ' coming of ' + p.invited + ' asked' + (p.friends ? ', and all your friends' : '') + '</div>';
(p.guests || []).forEach(function (g) {
h += '<div style="display:flex;gap:6px;align-items:center;border-top:1px solid #2A3040;padding:3px 0"><span style="flex:1">' + esc(g.name || "A dreamer") +
' <span style="color:' + (g.rsvp === "yes" ? "#8AD0A0" : g.rsvp === "no" ? "#E89A7A" : "#9AA3B5") + '">' + (g.rsvp === "yes" ? "coming" : g.rsvp === "no" ? "cannot come" : "asked") + '</span>' + (g.here ? ' · 🟢' : '') + '</span>' +
'<button class="btn" data-pty="unask" data-id="' + p.id + '" data-u="' + esc(g.id) + '" style="padding:2px 8px">Take off</button></div>';
});
var fr = (PTY.b.friends || []).filter(function (f) { return !(p.guests || []).some(function (g) { return g.id === f.id; }); });
if (fr.length)
h += '<div style="display:flex;gap:6px;margin-top:6px"><select id="pty-add-' + p.id + '" style="flex:1">' + fr.map(function (f) { return '<option value="' + esc(f.id) + '">' + esc(f.name || "A dreamer") + '</option>'; }).join("") + '</select><button class="btn" data-pty="ask" data-id="' + p.id + '">Invite</button></div>';
h += '<div style="display:flex;gap:6px;margin-top:6px"><button class="btn" data-pty="go" data-id="' + p.id + '">Show me the way</button><button class="btn" data-pty="cancel" data-id="' + p.id + '">' + (p.on ? "End the party" : "Call it off") + '</button></div>';
}
else {
h += '<div style="display:flex;gap:6px;margin-top:6px;flex-wrap:wrap">' +
'<button class="btn" data-pty="yes" data-id="' + p.id + '"' + (p.rsvp === "yes" ? ' style="border-color:#8AD0A0;color:#CFF0D8"' : '') + '>' + (p.rsvp === "yes" ? "✓ Coming" : "I'm coming") + '</button>' +
'<button class="btn" data-pty="no" data-id="' + p.id + '"' + (p.rsvp === "no" ? ' style="border-color:#E89A7A"' : '') + '>' + (p.rsvp === "no" ? "Cannot come" : "I can't come") + '</button>' +
(p.rsvp !== "no" ? '<button class="btn" data-pty="go" data-id="' + p.id + '">Show me the way</button>' : '') + '</div>';
}
return h + '</div>';
},
function () {
var B = PTY.b, h = '<div style="display:flex;align-items:center;gap:8px;margin-bottom:8px"><b style="font-size:15px;flex:1">🎉 Parties</b><button class="btn" data-pty="close">Close</button></div>';
h += '<div style="display:flex;gap:6px;margin-bottom:10px">' + [["invites", "Invitations"], ["mine", "My parties"], ["throw", "Throw a party"]].map(function (t) { return '<button class="btn" data-pty="tab" data-t="' + t[0] + '" style="' + (PTY.tab === t[0] ? "border-color:#E8A0B0;color:#F2E6C4" : "") + '">' + t[1] + '</button>'; }).join("") + '</div>';
if (PTY.say)
h += '<div style="margin:0 0 8px;color:#E8D9B0">' + esc(PTY.say) + '</div>';
if (!(typeof signedIn === "function" && signedIn()))
return h + '<div style="color:#9AA3B5">Sign in to be invited to parties and to throw your own.</div>';
if (!B)
return h + '<div style="color:#9AA3B5">Opening…</div>';
if (PTY.tab === "invites") {
if (!(B.invites || []).length)
h += '<div style="color:#9AA3B5">No invitations just now. When a friend throws a party and asks you, it shows here and on your phone.</div>';
(B.invites || []).forEach(function (p) { h += ptyCard(p, false); });
}
else if (PTY.tab === "mine") {
if (!(B.mine || []).length)
h += '<div style="color:#9AA3B5">You have no parties planned. "Throw a party" to start one.</div>';
(B.mine || []).forEach(function (p) { h += ptyCard(p, true); });
}
else {
if (!B.paid)
return h + '<div style="color:#9AA3B5">Throwing a party at home is for dreamers whose dues are paid. You can still go to friends\' parties.</div>';
if (!(B.homes || []).length)
return h + '<div style="color:#9AA3B5">You need a home of your own to throw a party. Buy or rent one at the Land Office.</div>';
var F = PTY.form;
if (F.lot == null)
F.lot = B.homes[0].id;
h += '<div style="display:grid;gap:8px">';
h += '<label>Where<br><select id="pty-lot" style="width:100%">' + B.homes.map(function (l) { return '<option value="' + l.id + '"' + (+F.lot === l.id ? " selected" : "") + '>' + esc(l.name) + (l.quarter ? ", " + esc(l.quarter) : "") + (typeof hlWhere === "function" ? hlWhere(l.world) : "") + '</option>'; }).join("") + '</select></label>';
h += '<label>What is it called<br><input id="pty-title" maxlength="80" placeholder="A party at my place" value="' + esc(F.title) + '" style="width:100%;box-sizing:border-box"></label>';
h += '<label>A note for your guests (optional)<br><input id="pty-note" maxlength="300" placeholder="Bring a lantern" value="' + esc(F.note) + '" style="width:100%;box-sizing:border-box"></label>';
h += '<div style="display:flex;gap:8px"><label style="flex:1">When<br><select id="pty-when" style="width:100%">' + PTY_WHEN.map(function (w) { return '<option value="' + w[0] + '"' + (+F.when === w[0] ? " selected" : "") + '>' + w[1] + '</option>'; }).join("") + '</select></label>' +
'<label style="flex:1">How long<br><select id="pty-hours" style="width:100%">' + [1, 2, 3, 4, 5, 6, 8].map(function (n) { return '<option value="' + n + '"' + (+F.hours === n ? " selected" : "") + '>' + n + ' hour' + (n === 1 ? "" : "s") + '</option>'; }).join("") + '</select></label></div>';
h += '<label style="display:flex;gap:6px;align-items:center"><input type="checkbox" id="pty-friends"' + (F.friends ? " checked" : "") + '> Invite all my friends</label>';
var fr = B.friends || [];
if (!fr.length)
h += '<div style="color:#9AA3B5">You have no friends on your phone yet. Add friends there (📱 Phone → Friends), then invite them here.</div>';
else if (!F.friends) {
h += '<div><b>Guests</b><div style="max-height:180px;overflow-y:auto;border:1px solid #2A3040;border-radius:6px;padding:4px 8px;margin-top:4px">' +
fr.map(function (f) { return '<label style="display:flex;gap:6px;align-items:center;padding:2px 0"><input type="checkbox" data-pick="' + esc(f.id) + '"' + (F.pick[f.id] ? " checked" : "") + '> ' + esc(f.name || "A dreamer") + '</label>'; }).join("") + '</div></div>';
}
h += '<button class="btn" data-pty="throw" style="justify-self:start;border-color:#E8A0B0">🎉 Send the invitations</button>';
h += '<div style="color:#9AA3B5">While the party is on, the door opens for your guests (from a quarter of an hour before). Blocked people are never let in.</div></div>';
}
return h;
},
function () {
var F = PTY.form, v = function (id) { var e = document.getElementById(id); return e ? e.value : null; };
if (v("pty-lot") != null)
F.lot = +v("pty-lot");
if (v("pty-title") != null)
F.title = v("pty-title");
if (v("pty-note") != null)
F.note = v("pty-note");
if (v("pty-when") != null)
F.when = +v("pty-when");
if (v("pty-hours") != null)
F.hours = +v("pty-hours");
var c = document.getElementById("pty-friends");
if (c)
F.friends = c.checked;
document.querySelectorAll("#pty-box [data-pick]").forEach(function (b) { F.pick[b.getAttribute("data-pick")] = b.checked; });
},
function (e) {
var t = e.target.closest && e.target.closest("[data-pty]");
if (!t)
return;
var a = t.getAttribute("data-pty"), id = +t.getAttribute("data-id");
if (a === "close") {
PTY.open = false;
ptyPaint();
return;
}
if (a === "tab") {
ptyKeep();
PTY.tab = t.getAttribute("data-t");
PTY.say = "";
ptyPaint();
return;
}
if (a === "yes" || a === "no") {
ptyAct("party_rsvp", { p_id: id, p_yes: a === "yes" });
return;
}
if (a === "go") {
var p = ptyFind(id);
if (p)
ptyGo(p);
return;
}
if (a === "cancel") {
var q = ptyFind(id);
if (!confirm((q && q.on ? "End " : "Call off ") + (q ? q.title : "the party") + "? Your guests are told."))
return;
ptyAct("party_cancel", { p_id: id });
return;
}
if (a === "unask") {
ptyAct("party_guests_set", { p_id: id, p_add: null, p_remove: t.getAttribute("data-u") });
return;
}
if (a === "ask") {
var s = document.getElementById("pty-add-" + id);
if (s && s.value)
ptyAct("party_guests_set", { p_id: id, p_add: [s.value], p_remove: null });
return;
}
if (a === "throw") {
ptyKeep();
var F = PTY.form, guests = Object.keys(F.pick).filter(function (k) { return F.pick[k]; });
if (!F.friends && !guests.length && !confirm("Nobody is invited yet. Throw it anyway? You can invite people afterwards."))
return;
ptyAct("party_throw", { p_lot: F.lot, p_title: F.title, p_note: F.note, p_start_in: F.when, p_hours: F.hours, p_guests: F.friends ? [] : guests, p_friends: !!F.friends }, function (o) {
if (o && o.ok) {
PTY.form = { lot: F.lot, title: "", note: "", when: 0, hours: 3, friends: false, pick: {} };
PTY.tab = "mine";
}
});
return;
}
}
];
});
