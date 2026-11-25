/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(432, function () {
"use strict";
return [
function () {
if (!signedIn())
return dtSay("Sign in first: dreaming together is between accounts.");
if (typeof visiting !== "undefined" && visiting)
return dtSay("Go back to your own dream first.");
dtRpc("dt_open", { p_name: dtName() }).then(function (o) {
if (!o.ok)
return dtSay(esc(o.say || "That didn't open."));
DT.code = o.code;
DT.host = true;
DT.hostId = myUserId();
DT.hostName = dtName();
DT.since = 0;
DT.feed = [];
DT.dirty = true;
DT.pushAt = 0;
dtStart();
dtPaint();
dtSay("<b>Your dream is open to friends.</b> The code is <b>" + esc(o.code) + "</b>. Invite friends from the 👥 Together card.");
}).catch(function (e) { dtSay(dtMissing(e) ? "Dreaming together needs the server's the latest server update first." : "That didn't open just now."); });
},
function (code) {
code = String(code || "").toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 6);
if (code.length !== 6)
return dtSay("A dream's code is six letters and numbers.");
if (!signedIn())
return dtSay("Sign in first, then join.");
if (DT.code === code)
return;
if (DT.code)
dtLeave(true);
if (typeof visiting !== "undefined" && visiting && typeof endVisit === "function")
endVisit();
dtRpc("dt_join", { p_code: code, p_name: dtName() }).then(function (o) {
if (!o.ok)
return dtSay(esc(o.say || "That didn't work."));
DT.code = o.code;
DT.host = !!o.host;
DT.hostId = o.host_id;
DT.hostName = o.host_name || "a dreamer";
DT.since = 0;
DT.have = 0;
DT.feed = [];
DT.waiting = !DT.host;
delete DT.dismissed[o.code];
DT.invites = DT.invites.filter(function (i) { return i.code !== o.code; });
dtStart();
dtPaint();
dtSay(DT.host ? "This is your own dream: it is open." : "<b>Joining " + esc(DT.hostName) + "'s dream…</b>");
}).catch(function (e) { dtSay(dtMissing(e) ? "Dreaming together needs the server's the latest server update first." : "That didn't work just now."); });
},
function (quiet, why) {
var code = DT.code, wasGuest = dtGuest();
if (!code)
return;
DT.code = null;
DT.host = false;
DT.have = 0;
DT.since = 0;
DT.people = [];
DT.pending = null;
DT.waiting = false;
clearInterval(DT.t);
DT.t = null;
if (signedIn())
dtRpc("dt_leave", { p_code: code }).catch(function () { });
if (wasGuest && typeof visiting !== "undefined" && visiting && visiting.dt) {
DT.leaving = true;
try {
endVisit();
}
finally {
DT.leaving = false;
}
}
dtPaint();
if (!quiet)
dtSay(why || (wasGuest ? "<b>Home.</b> Your own dream is exactly as you left it." : "Your dream is closed to others again. Everything built together stays in it."));
},
function () {
if (!DT.code || DT.busy)
return;
if (document.hidden && !DT.host)
return;
var code = DT.code;
DT.busy = true;
dtRpc("dt_poll", { p_code: code, p_since: DT.since, p_have: DT.have }).then(function (o) {
DT.busy = false;
if (DT.code !== code)
return;
if (!o.ok) {
return;
}
if (o.open === false) {
dtLeave(false, o.sent_out ? "The dreamer whose dream it was asked you to leave it. You are home." : (DT.host ? "Your dream room was closed." : "<b>" + esc(DT.hostName) + "'s dream has closed.</b> You are home, and your own dream is as you left it."));
return;
}
DT.people = o.people || [];
var me = myUserId();
(o.lines || []).forEach(function (l) {
DT.since = Math.max(DT.since, +l.id || 0);
DT.feed.push(l);
if (DT.feed.length > 40)
DT.feed.shift();
if (DT.host && l.by !== me)
dtBuild(l.text, l.name || "A friend");
});
if (!DT.host && o.scape && o.version > DT.have) {
DT.pending = { v: o.version, s: o.scape };
}
if (!DT.host)
dtTakeDream();
if (DT.host)
dtPush();
dtPaint();
}).catch(function (e) { DT.busy = false; if (dtMissing(e)) {
dtLeave(true);
dtSay("Dreaming together needs the server's the latest server update first.");
} });
},
function (text, name) {
text = String(text || "").trim();
if (!text)
return;
try {
var n = scanText(text);
feedContext(text);
committed += text + " ";
store.transcript = committed;
renderTranscript(committed, "");
populate();
scheduleParse(600);
save();
dtSay("<b>" + esc(name) + "</b> added to the dream" + (n ? " (" + n + " form" + (n > 1 ? "s" : "") + " took shape)" : "") + ": <i>" + esc(text.slice(0, 90)) + "</i>");
}
catch (e) {
console.warn("dream together build", e);
}
DT.dirty = true;
},
function () {
if (!DT.host || !DT.dirty || DT.pushing)
return;
if (typeof visiting !== "undefined" && visiting)
return;
var gap = DT.size > 1500000 ? 10000 : 2500;
if (performance.now() - DT.pushAt < gap)
return;
var sc;
try {
sc = scapeForVisitors(false);
}
catch (e) {
return;
}
var code = DT.code;
DT.dirty = false;
DT.pushing = true;
DT.pushAt = performance.now();
try {
DT.size = JSON.stringify(sc).length;
}
catch (e) { }
dtRpc("dt_push", { p_code: code, p_scape: sc }).then(function (o) { DT.pushing = false; if (!o.ok) {
if (o.say)
dtSay(esc(o.say));
} })
.catch(function () { DT.pushing = false; DT.dirty = true; });
},
function () {
var P = DT.pending;
if (!P)
return;
if (DT.waiting) {
DT.pending = null;
DT.have = P.v;
DT.waiting = false;
beginVisit({ dreamerDoor: DT.hostId, name: DT.hostName, doorLine: "" }, P.s);
if (visiting)
visiting.dt = DT.code;
if (typeof showVisitBar === "function")
showVisitBar(true);
dtVisitBar();
dtSay("<b>You are dreaming in " + esc(DT.hostName) + "'s dream.</b> Type in the journal box: what you write is built into the dream for everyone here.");
DT.applyAt = performance.now();
return;
}
if (store.inside || performance.now() - DT.applyAt < 3000)
return;
DT.pending = null;
DT.have = P.v;
DT.applyAt = performance.now();
dtApplyDream(P.s);
},
function (sc) {
if (!sc || !sc.store || !(typeof visiting !== "undefined" && visiting))
return;
var here = store.here || 0, p = camera.position.clone(), y = yaw;
Object.keys(meshes).forEach(function (id) {
var m = meshes[id];
if (!m)
return;
scene.remove(m);
m.traverse(function (o) { if (o.geometry && o.geometry.dispose && !(o.geometry.userData && o.geometry.userData.shared))
o.geometry.dispose(); });
});
Object.keys(store).forEach(function (k) { if (k !== "dreamer")
delete store[k]; });
Object.keys(sc.store).forEach(function (k) { store[k] = sc.store[k]; });
store.here = here;
store.inside = null;
store.visiting = true;
if (typeof rebuildAll === "function")
rebuildAll();
camera.position.copy(p);
yaw = y;
},
function (text) {
text = String(text || "").trim();
if (!text || !DT.code)
return Promise.resolve(false);
return dtRpc("dt_say", { p_code: DT.code, p_text: text }).then(function (o) {
if (!o.ok) {
dtSay(esc(o.say || "That didn't go."));
return false;
}
if (!DT.host)
dtSay("Sent. It rises in the dream for everyone in a moment.");
setTimeout(dtBeat, 350);
return true;
}).catch(function () { dtSay("That didn't go just now."); return false; });
},
function () {
var el = document.getElementById("dt-card");
if (!el && document.body) {
el = document.createElement("div");
el.id = "dt-card";
el.style.cssText = "position:fixed;right:12px;bottom:84px;z-index:41;width:min(330px,calc(100vw - 24px));max-height:min(62vh,520px);overflow:auto;" +
"background:rgba(10,12,18,.95);border:1px solid var(--gold,#C9A868);border-radius:6px;padding:10px 12px;font-family:var(--sans,system-ui);font-size:14px;color:#EDE6D6;display:none";
document.body.appendChild(el);
el.addEventListener("click", dtClick);
el.addEventListener("keydown", function (e) { if (e.key === "Enter") {
var t = e.target;
if (t.id === "dt-code-in") {
e.preventDefault();
dtJoin(t.value);
}
if (t.id === "dt-line") {
e.preventDefault();
dtSend(t.value).then(function (ok) { if (ok)
t.value = ""; });
}
} e.stopPropagation(); });
}
return el;
},
function () {
var el = dtCard();
if (!el)
return;
var show = DT.open || !!DT.code || DT.invites.some(function (i) { return !DT.dismissed[i.code]; });
el.style.display = show ? "block" : "none";
if (!show)
return;
var h = "<div style='display:flex;justify-content:space-between;align-items:center;gap:8px'><b style='color:#F2D27A'>👥 Dream together</b>" +
"<span><button data-dt='small' style='" + DT_B + "' aria-label='Make smaller'>" + (DT.small ? "▴" : "▾") + "</button>" + (DT.code ? "" : "<button data-dt='shut' style='" + DT_B + "' aria-label='Close'>✕</button>") + "</span></div>";
if (DT.small) {
el.innerHTML = h + (DT.code ? "<div style='opacity:.8'>" + (DT.host ? "Your dream · " : esc(DT.hostName) + "'s dream · ") + esc(DT.code) + " · " + DT.people.length + " here</div>" : "");
return;
}
DT.invites.forEach(function (i) {
if (DT.dismissed[i.code] || i.code === DT.code)
return;
h += "<div style='margin:8px 0;padding:8px;border:1px solid #6A5A9A;border-radius:4px'><b>" + esc(i.by || "A friend") + "</b> invites you to dream together." +
"<div><button data-dt='join' data-c='" + esc(i.code) + "' style='" + DT_B + "'>Join</button><button data-dt='no' data-c='" + esc(i.code) + "' style='" + DT_B + "'>No thanks</button></div></div>";
});
if (!DT.code) {
h += "<p style='margin:8px 0 6px;opacity:.85'>Open your dream to friends and write it together, live. Or join a friend's dream by its code.</p>" +
"<button data-dt='open' style='" + DT_B + "'>Open my dream to friends</button>" +
"<div style='margin-top:8px;display:flex;gap:6px'><input id='dt-code-in' maxlength='6' placeholder='Code' autocomplete='off' style='flex:1;min-width:0;text-transform:uppercase;background:#15131F;border:1px solid #6A5A9A;color:#EDE6D6;border-radius:4px;padding:5px 8px;font:inherit'>" +
"<button data-dt='joincode' style='" + DT_B + "'>Join</button></div>";
el.innerHTML = h;
return;
}
var me = myUserId();
h += "<div style='margin:6px 0'>" + (DT.host ? "Your dream is open. Code <b style='letter-spacing:1px'>" + esc(DT.code) + "</b> <button data-dt='copy' style='" + DT_B + "'>Copy link</button>" :
(DT.waiting ? "Joining <b>" + esc(DT.hostName) + "</b>'s dream… <i>waiting for it to arrive</i>" : "In <b>" + esc(DT.hostName) + "</b>'s dream · " + esc(DT.code))) + "</div>";
h += "<div style='margin:4px 0'><span style='opacity:.75'>Here:</span> " + (DT.people.length ? DT.people.map(function (p) {
return "<span style='display:inline-block;margin:2px 4px 2px 0;padding:2px 7px;border-radius:10px;background:#221E33'>" + (p.host ? "★ " : "") + esc(p.name || "a dreamer") +
(DT.host && p.id !== me ? " <button data-dt='out' data-u='" + esc(p.id) + "' data-n='" + esc(p.name || "") + "' title='Send out of your dream' style='background:none;border:0;color:#E89A8A;cursor:pointer;font:inherit'>✕</button>" : "") + "</span>";
}).join("") : "<i>just you so far</i>") + "</div>";
h += "<div id='dt-feed' style='margin:6px 0;max-height:150px;overflow:auto;border-top:1px solid #333;padding-top:4px'>" + (DT.feed.length ? DT.feed.slice(-12).map(function (l) {
return "<div style='margin:3px 0'><b style='color:#C9B8F0'>" + esc(l.name || "a dreamer") + ":</b> " + esc(l.text) + "</div>";
}).join("") : "<i style='opacity:.7'>Lines of the dream appear here as anyone writes them.</i>") + "</div>";
h += "<div style='display:flex;gap:6px'><input id='dt-line' maxlength='600' placeholder='Add to the dream…' autocomplete='off' style='flex:1;min-width:0;background:#15131F;border:1px solid #6A5A9A;color:#EDE6D6;border-radius:4px;padding:5px 8px;font:inherit'>" +
"<button data-dt='send' style='" + DT_B + "'>Add</button></div>";
if (DT.host) {
h += "<div style='margin-top:8px'><button data-dt='friends' style='" + DT_B + "'>Invite friends</button><button data-dt='leave' style='" + DT_B + "'>Close to others</button></div><div id='dt-friends'></div>";
}
else
h += "<div style='margin-top:8px'><button data-dt='leave' style='" + DT_B + "'>Leave, back to my own</button></div>";
var keep = document.getElementById("dt-line"), kv = keep ? keep.value : "", kf = keep && document.activeElement === keep, fr = document.getElementById("dt-friends"), frh = fr ? fr.innerHTML : "";
el.innerHTML = h;
var nl = document.getElementById("dt-line");
if (nl) {
nl.value = kv;
if (kf)
nl.focus();
}
if (frh) {
var nf = document.getElementById("dt-friends");
if (nf)
nf.innerHTML = frh;
}
var fd = document.getElementById("dt-feed");
if (fd)
fd.scrollTop = fd.scrollHeight;
},
function () {
var box = document.getElementById("dt-friends");
if (!box)
return;
box.innerHTML = "<i style='opacity:.7'>Finding your friends…</i>";
(typeof pfLoad === "function" ? pfLoad(true) : Promise.resolve(null)).then(function (d) {
var fs = (d && d.ok && d.friends) || [];
box.innerHTML = fs.length ? fs.map(function (f) {
return "<div style='display:flex;justify-content:space-between;align-items:center'><span>" + esc(f.name || "a friend") + "</span>" +
"<button data-dt='invite' data-u='" + esc(f.id) + "' style='" + DT_B + "'>Invite</button></div>";
}).join("") :
"<i style='opacity:.8'>No friends yet. Give them the code, or add them in 👥 Who's here.</i>";
});
},
function (e) {
var b = e.target.closest("[data-dt]");
if (!b)
return;
var a = b.getAttribute("data-dt");
if (a === "small") {
DT.small = !DT.small;
return dtPaint();
}
if (a === "shut") {
DT.open = false;
DT.invites.forEach(function (i) { DT.dismissed[i.code] = 1; });
return dtPaint();
}
if (a === "open")
return dtOpen();
if (a === "joincode") {
var ci = document.getElementById("dt-code-in");
return dtJoin(ci && ci.value);
}
if (a === "join")
return dtJoin(b.getAttribute("data-c"));
if (a === "no") {
var c = b.getAttribute("data-c");
DT.dismissed[c] = 1;
dtRpc("dt_decline", { p_code: c }).catch(function () { });
return dtPaint();
}
if (a === "send") {
var li = document.getElementById("dt-line");
return dtSend(li && li.value).then(function (ok) { if (ok && li)
li.value = ""; });
}
if (a === "leave")
return dtLeave(false);
if (a === "friends")
return dtFriends();
if (a === "invite") {
dtRpc("dt_invite", { p_code: DT.code, p_user: b.getAttribute("data-u") }).then(function (o) { b.textContent = o.ok ? "Invited" : "Can't"; b.disabled = true; if (!o.ok && o.say)
dtSay(esc(o.say)); });
return;
}
if (a === "out") {
if (!confirm("Send " + (b.getAttribute("data-n") || "them") + " out of your dream? They can't come back into this room."))
return;
dtRpc("dt_send_out", { p_code: DT.code, p_user: b.getAttribute("data-u") }).then(function (o) { dtSay(esc(o.say || "")); dtBeat(); });
return;
}
if (a === "copy") {
var url = location.origin + location.pathname + "?play&dream=" + DT.code;
try {
navigator.clipboard.writeText(url).then(function () { dtSay("Link copied: " + esc(url)); }, function () { dtSay("The link: " + esc(url)); });
}
catch (x) {
dtSay("The link: " + esc(url));
}
return;
}
}
];
});
