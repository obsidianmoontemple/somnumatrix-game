/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var WCHAT = { open: false, tab: "world", after: 0, lines: [], cool: 0, unread: 0, me: null, meAt: 0, board: null, pick: null,
struckAt: 0, el: null, btn: null, sent: 0, noServer: false, lastLoc: "" };
var WC_WORLD_NAMES = { space: "Outer space", surface: "the planet's surface", station: "the space station", shuttle: "the shuttle",
casino: "the Moon Casino", neverland: "Neverland", sea: "the Endless Sea", underdark: "the Underdark", northpole: "the North Pole" };
function wcLocalBlocked() { try {
return JSON.parse(localStorage.getItem("somnu.chatblock") || "{}") || {};
}
catch (e) {
return {};
} }
function wcBlocked() { var o = wcLocalBlocked(); if (typeof pfBlockedIds === "function") {
var b = pfBlockedIds();
for (var k in b)
o[k] = b[k];
} return o; }
function wcSetBlocked(o) { try {
localStorage.setItem("somnu.chatblock", JSON.stringify(o));
}
catch (e) { } }
function wcSigned() { return typeof signedIn === "function" && signedIn(); }
function wcInCity() { return typeof presenceActive !== "undefined" && presenceActive; }
function wcHere() {
try {
if (typeof WLD !== "undefined" && WLD && WLD.on)
return { k: "w:" + WLD.on, n: WC_WORLD_NAMES[WLD.on] || WLD.on };
var city = typeof inSomnucorRealm === "function" && inSomnucorRealm();
if (city) {
if (store.inside && typeof INT !== "undefined" && INT && INT.spec) {
var p = typeof myPlace === "function" ? myPlace().place : "building";
return { k: "b:" + p, n: String(INT.spec.label || INT.spec.name || "this building") };
}
if (typeof undergroundSpot === "function" && undergroundSpot())
return { k: "u:underground", n: "the Underground" };
if (typeof MALL !== "undefined" && MALL && MALL.on)
return { k: "m:mall", n: "the World Mall" };
if (typeof ATLC !== "undefined" && ATLC && typeof sectorAt === "function") {
var s = sectorAt(camera.position.x, camera.position.z), r = typeof atlRingAt === "function" ? atlRingAt(camera.position.x, camera.position.z) : null;
return { k: "s:" + s, n: "Sector " + s + (r && r.name ? " · " + r.name : "") };
}
return { k: "s:0", n: "Somnucor" };
}
if (store && store.here && typeof realmById === "function") {
var rm = realmById(store.here);
if (rm)
return { k: "r:" + store.here, n: rm.name || "this dream" };
}
}
catch (e) { }
return { k: "", n: "your own dream" };
}
function wcCss() {
var st = document.createElement("style");
st.textContent =
"#wc-btn{position:fixed;z-index:45;left:calc(10px + env(safe-area-inset-left,0px));bottom:calc(132px + env(safe-area-inset-bottom,0px));" +
"width:42px;height:42px;border-radius:50%;border:1px solid rgba(232,198,106,.6);background:rgba(10,10,18,.82);color:#EDE8F8;" +
"font:18px system-ui,sans-serif;padding:0;cursor:pointer}" +
"#wc-btn i{position:absolute;right:-4px;top:-4px;min-width:18px;height:18px;line-height:18px;border-radius:9px;background:#E8C66A;color:#17120A;" +
"font:700 11px system-ui,sans-serif;font-style:normal;padding:0 4px;display:none}" +
"#wc-btn i.on{display:block}" +
"#wc-btn b{position:absolute;right:-4px;bottom:-4px;min-width:16px;height:16px;line-height:16px;border-radius:8px;background:#8FC0E8;color:#0C1420;" +
"font:700 10px system-ui,sans-serif;padding:0 3px;display:none}" +
"#wc-btn b.on{display:block}" +
"body.ps-phone #wc-btn{left:auto;bottom:auto;right:calc(10px + env(safe-area-inset-right,0px));width:38px;height:38px;font-size:16px}" +
"#wc{position:fixed;z-index:59;left:calc(10px + env(safe-area-inset-left,0px));bottom:calc(84px + env(safe-area-inset-bottom,0px));" +
"width:min(400px,calc(100vw - 20px));height:min(460px,70vh);display:none;flex-direction:column;" +
"background:#0C0B14;border:1px solid rgba(201,190,168,.4);border-radius:10px;color:#E6E0D2;font:14px system-ui,sans-serif;box-shadow:0 10px 30px rgba(0,0,0,.6)}" +
"#wc.on{display:flex}" +
"body.ps-phone #wc{left:0;right:0;bottom:0;width:auto;height:min(62vh,520px);border-radius:16px 16px 0 0;padding-bottom:env(safe-area-inset-bottom,0px)}" +
"@media (max-height:500px){body.ps-phone #wc{left:auto;right:0;top:0;bottom:0;height:auto;width:min(420px,60vw);border-radius:16px 0 0 16px}}" +
"#wc .wc-top{display:flex;align-items:center;border-bottom:1px solid rgba(201,190,168,.25)}" +
"#wc .wc-tabs{display:flex;flex:1;overflow-x:auto}" +
"#wc .wc-tabs button{flex:0 0 auto;background:none;border:0;color:#9A93A8;padding:11px 12px;font:600 13px system-ui,sans-serif;cursor:pointer}" +
"#wc .wc-tabs button.on{color:#F2E6C8;box-shadow:inset 0 -2px 0 #E8C66A}" +
"#wc .wc-x{background:none;border:0;color:#C9BEA8;font:600 13px system-ui,sans-serif;padding:10px 12px;cursor:pointer}" +
"#wc .wc-where{padding:6px 12px;color:#8E87A0;font-size:12px;border-bottom:1px solid rgba(201,190,168,.12)}" +
"#wc .wc-body{flex:1;overflow-y:auto;padding:8px 12px;-webkit-overflow-scrolling:touch}" +
"#wc .wc-line{padding:5px 4px;line-height:1.4;word-wrap:break-word;border-radius:6px;cursor:pointer}" +
"#wc .wc-line.pick{background:#1B1828}" +
"#wc .wc-who{color:#E8C66A;font-weight:600}#wc .wc-who.mod{color:#8FC0E8}" +
"#wc .wc-tag{color:#7C93B8;font-size:11px;margin-right:4px}" +
"#wc .wc-dim{color:#8E87A0;font-size:12.5px}" +
"#wc .wc-acts{display:flex;flex-wrap:wrap;gap:6px;margin:6px 0 4px}" +
"#wc .wc-acts button,#wc .wc-row button{background:#211D33;color:#EDE8F8;border:1px solid #3A3160;border-radius:8px;padding:6px 10px;font:600 12.5px system-ui,sans-serif;cursor:pointer}" +
"#wc .wc-acts button.warn{border-color:#8A4A3A;color:#F2C2B0}" +
"#wc .wc-foot{display:flex;gap:6px;padding:8px;border-top:1px solid rgba(201,190,168,.25)}" +
"#wc .wc-foot input{flex:1;min-width:0;background:#07070C;border:1px solid rgba(201,190,168,.3);color:#EDE8F8;border-radius:8px;padding:9px 10px;font:15px system-ui,sans-serif}" +
"#wc .wc-foot button{background:#E8C66A;color:#17120A;border:0;border-radius:8px;padding:0 14px;font:700 14px system-ui,sans-serif;cursor:pointer}" +
"#wc .wc-row{display:flex;justify-content:space-between;align-items:center;gap:8px;padding:7px 0;border-bottom:1px solid rgba(201,190,168,.12)}" +
"#wc h4{margin:10px 0 4px;font:600 12px system-ui,sans-serif;color:#9A93A8;text-transform:uppercase;letter-spacing:.06em}" +
"#street [data-st=\"talk\"]{display:none!important}";
document.head.appendChild(st);
}
function wcBuild() {
if (WCHAT.el || !document.body)
return;
wcCss();
var b = document.createElement("button");
b.id = "wc-btn";
b.type = "button";
b.setAttribute("aria-label", "Chat");
b.innerHTML = "💬<i></i><b title='Reports waiting for a moderator'></b>";
b.addEventListener("click", function () { wcShow(!WCHAT.open); });
document.body.appendChild(b);
WCHAT.btn = b;
if (typeof PS_KEEP !== "undefined")
PS_KEEP["wc-btn"] = 1;
var d = document.createElement("div");
d.id = "wc";
d.setAttribute("role", "dialog");
d.setAttribute("aria-label", "Chat");
d.innerHTML = '<div class="wc-top"><div class="wc-tabs"></div><button type="button" class="wc-x">Close</button></div>' +
'<div class="wc-where"></div><div class="wc-body" aria-live="polite"></div>' +
'<div class="wc-foot"><input type="text" maxlength="240" autocomplete="off" placeholder="Say something…" aria-label="Your message"><button type="button">Send</button></div>';
document.body.appendChild(d);
WCHAT.el = d;
d.querySelector(".wc-x").addEventListener("click", function () { wcShow(false); });
var inp = d.querySelector(".wc-foot input");
d.querySelector(".wc-foot button").addEventListener("click", wcSend);
["keydown", "keyup", "keypress"].forEach(function (k) {
d.addEventListener(k, function (e) {
if (e.target && /INPUT|TEXTAREA/.test(e.target.tagName)) {
e.stopPropagation();
if (k === "keydown" && e.key === "Enter") {
e.preventDefault();
wcSend();
}
if (k === "keydown" && e.key === "Escape")
e.target.blur();
}
});
});
d.addEventListener("pointerdown", function (e) { e.stopPropagation(); });
d.addEventListener("touchstart", function (e) { e.stopPropagation(); }, { passive: true });
d.addEventListener("click", function (e) {
var t = e.target;
var tab = t.closest && t.closest("[data-wct]");
if (tab) {
WCHAT.tab = tab.getAttribute("data-wct");
WCHAT.pick = null;
if (WCHAT.tab === "mod")
wcLoadBoard();
wcPaint(true);
return;
}
var act = t.closest && t.closest("[data-wca]");
if (act) {
wcAct(act.getAttribute("data-wca"), act);
return;
}
var ln = t.closest && t.closest("[data-wcl]");
if (ln) {
var k = ln.getAttribute("data-wcl");
WCHAT.pick = WCHAT.pick === k ? null : k;
wcPaint(false);
}
});
}
function wcShow(on) {
wcBuild();
WCHAT.open = !!on;
WCHAT.el.classList.toggle("on", WCHAT.open);
if (WCHAT.open && typeof pfLoad === "function")
pfLoad(false);
if (on) {
WCHAT.unread = 0;
WCHAT.cool = 0;
wcMine(true);
wcPaint(true);
}
wcBadge();
}
function wcBadge() {
if (!WCHAT.btn)
return;
var i = WCHAT.btn.querySelector("i"), n = WCHAT.unread;
i.textContent = n > 99 ? "99+" : String(n);
i.classList.toggle("on", n > 0 && !WCHAT.open);
var r = WCHAT.btn.querySelector("b"), k = (WCHAT.me && WCHAT.me.mod && +WCHAT.me.reports) || 0;
if (r) {
r.textContent = k > 99 ? "99+" : String(k);
r.classList.toggle("on", k > 0);
}
}
function wcTabs() {
var t = [["world", "World"], ["here", "Here"]];
if (wcInCity()) {
t.push(["city", "City"]);
t.push(["near", "Nearby"]);
}
if (WCHAT.me && WCHAT.me.mod)
t.push(["mod", "Moderate" + (+WCHAT.me.reports ? " · " + (+WCHAT.me.reports) : "")]);
return t;
}
function wcWho(l) { return '<span class="wc-who' + (l.mod ? " mod" : "") + '">' + esc(l.mine ? "You" : (l.name || "a dreamer")) + (l.mod ? " ✦" : "") + '</span> '; }
function wcRows() { return __ZC(237, 0, this, arguments, new.target); }
function wcPaint(full) {
if (!WCHAT.el || !WCHAT.open)
return;
var tabs = wcTabs(), ok = tabs.some(function (t) { return t[0] === WCHAT.tab; });
if (!ok)
WCHAT.tab = "world";
var tb = WCHAT.el.querySelector(".wc-tabs"), here = wcHere();
tb.innerHTML = tabs.map(function (t) { return '<button type="button" data-wct="' + t[0] + '" class="' + (t[0] === WCHAT.tab ? "on" : "") + '">' + t[1] + '</button>'; }).join("");
var where = WCHAT.el.querySelector(".wc-where"), foot = WCHAT.el.querySelector(".wc-foot"), inp = foot.querySelector("input");
var W = { world: "Everyone in the game, wherever they are.", here: here.k ? "Everyone in " + esc(here.n) + "." : "You are in " + esc(here.n) + ": nobody else is here. Try World.",
city: "Everyone walking Somnucor.", near: "Whoever stands within forty paces of you, in the same room.", mod: "Reports, mutes" + (WCHAT.me && WCHAT.me.keeper ? ", moderators and banned words." : ".") };
where.innerHTML = W[WCHAT.tab] || "";
foot.style.display = (WCHAT.tab === "mod" || (WCHAT.tab === "here" && !here.k)) ? "none" : "flex";
inp.placeholder = WCHAT.tab === "world" ? "Say something to everyone…" : WCHAT.tab === "here" ? "Say something to " + here.n + "…" : "Say something…";
var body = WCHAT.el.querySelector(".wc-body");
if (!wcSigned()) {
body.innerHTML = '<div class="wc-dim">Sign in to chat. Settings has the sign-in.</div>';
foot.style.display = "none";
return;
}
if (WCHAT.noServer) {
body.innerHTML = '<div class="wc-dim">World chat is not open just now. Try again in a little while.</div>';
return;
}
if (WCHAT.tab === "mod") {
wcPaintBoard(body);
return;
}
var atEnd = full || body.scrollTop + body.clientHeight >= body.scrollHeight - 24;
var rows = wcRows(), mute = WCHAT.me && WCHAT.me.muted_until, bl0 = wcBlocked();
var h = '<div class="wc-dim" style="margin-bottom:6px">Be kind. No hate, threats or personal details. Tap a line to report it.</div>';
var bl2 = Object.keys(bl0);
if (bl2.length)
h += '<div class="wc-dim" style="margin-bottom:6px">Hidden from you: ' + bl2.map(function (u) {
return '<span class="wc-acts" style="display:inline-flex;margin:2px 4px 2px 0" data-k="" data-id="0" data-u="' + esc(u) + '" data-n=""><button type="button" data-wca="unblock">' + esc(bl0[u] || "someone") + ' · show</button></span>';
}).join("") + '</div>';
if (mute)
h += '<div class="wc-dim" style="color:#F2C2B0;margin-bottom:6px">A moderator has muted you' + (String(mute).indexOf("infinity") >= 0 ? " until they lift it." : " for a while.") + '</div>';
h += rows.length ? rows.map(function (l) {
var s = '<div class="wc-line' + (WCHAT.pick === l.key ? " pick" : "") + '" data-wcl="' + l.key + '">' + wcWho(l) + esc(l.body) + '</div>';
if (WCHAT.pick === l.key && !l.mine)
s += wcActs(l);
return s;
}).join("") : '<div class="wc-dim">Nothing said yet.</div>';
body.innerHTML = h;
if (atEnd)
body.scrollTop = body.scrollHeight;
}
function wcActs(l) { return __ZC(237, 1, this, arguments, new.target); }
function wcSay(t) { if (typeof setStatus === "function")
setStatus(t); var b = WCHAT.el && WCHAT.el.querySelector(".wc-where"); if (b)
b.innerHTML = t; }
function wcAct(kind, el) { return __ZC(237, 2, this, arguments, new.target); }
function wcDrop(k, id) {
if (k === "world")
WCHAT.lines = WCHAT.lines.filter(function (l) { return l.id !== id; });
else if (typeof chatLines !== "undefined")
for (var i = chatLines.length - 1; i >= 0; i--)
if (chatLines[i].id === id)
chatLines.splice(i, 1);
wcPaint(false);
}
function wcLoadBoard() {
return cityRpc("chat_mod_board", {}).then(function (b) { WCHAT.board = b || {}; wcPaint(false); }).catch(function () { });
}
function wcPaintBoard(body) { return __ZC(237, 3, this, arguments, new.target); }
function wcSend() { return __ZC(237, 4, this, arguments, new.target); }
function wcMine(force) {
if (!wcSigned()) {
WCHAT.me = null;
return;
}
if (!force && Date.now() - WCHAT.meAt < 60000)
return;
WCHAT.meAt = Date.now();
cityRpc("my_chat", {}).then(function (m) { WCHAT.me = m || null; wcBadge(); if (WCHAT.open)
wcPaint(false); }).catch(function () { });
}
function wcPoll() {
var here = wcHere();
var after = WCHAT.after;
if (here.k !== WCHAT.lastLoc) {
WCHAT.lastLoc = here.k;
after = 0;
}
cityRpc("world_chat_since", { p_after: after, p_loc: here.k }).then(function (rows) {
WCHAT.noServer = false;
var add = 0;
(rows || []).forEach(function (r) {
WCHAT.after = Math.max(WCHAT.after, +r.id || 0);
if (WCHAT.lines.some(function (l) { return l.id === r.id; }))
return;
WCHAT.lines.push({ id: r.id, user_id: r.user_id, name: r.name, channel: r.channel, loc: r.channel === "here" ? here.k : "", body: r.body, mine: !!r.mine, mod: !!r.mod });
if (!r.mine && !wcBlocked()[r.user_id])
add++;
});
if (WCHAT.lines.length > 200)
WCHAT.lines.splice(0, WCHAT.lines.length - 200);
if (add && !WCHAT.open) {
WCHAT.unread += add;
wcBadge();
}
if ((rows || []).length && WCHAT.open)
wcPaint(false);
}).catch(function (e) {
if (/world_chat_since|Could not find|PGRST202|404/.test((e && e.message) || "")) {
WCHAT.noServer = true;
if (WCHAT.open)
wcPaint(false);
}
});
if (WCHAT.open && Date.now() - WCHAT.struckAt > 15000 && WCHAT.lines.length) {
WCHAT.struckAt = Date.now();
cityRpc("world_chat_struck", { p_ids: WCHAT.lines.slice(-80).map(function (l) { return l.id; }) }).then(function (ids) {
if (ids && ids.length) {
var s = {};
ids.forEach(function (i) { s[typeof i === "object" ? i.world_chat_struck : i] = 1; });
WCHAT.lines = WCHAT.lines.filter(function (l) { return !s[l.id]; });
wcPaint(false);
}
}).catch(function () { });
}
}
function wcTick() {
wcBuild();
if (!WCHAT.btn)
return;
var signed = wcSigned();
if (document.body.classList.contains("ps-phone")) {
var bug = document.getElementById("bug-btn"), top = 136;
if (bug && bug.getBoundingClientRect().height > 0)
top = Math.round(bug.getBoundingClientRect().bottom + 8);
WCHAT.btn.style.top = top + "px";
}
else
WCHAT.btn.style.top = "";
if (!signed) {
if (WCHAT.open)
wcPaint(false);
return;
}
if (document.hidden)
return;
WCHAT.cool -= 0.5;
if (WCHAT.cool <= 0) {
WCHAT.cool = WCHAT.open ? 3 : 10;
wcPoll();
wcMine(false);
}
if (WCHAT.open) {
var cl = (typeof chatLines !== "undefined" && chatLines) || [], here = wcHere(), key = here.k + "|" + wcInCity() + "|" + cl.length + "|" + (cl.length ? cl[cl.length - 1].id : 0);
if (key !== WCHAT.paintKey) {
WCHAT.paintKey = key;
wcPaint(false);
}
}
if (typeof streetTab !== "undefined" && streetTab === "talk") {
streetTab = "people";
if (typeof paintStreet === "function" && typeof streetOpen !== "undefined" && streetOpen)
paintStreet();
}
}
(function () {
var go = function () { try {
wcTick();
}
catch (e) { } setInterval(function () { try {
wcTick();
}
catch (e) {
if (window.console && !WCHAT.warned) {
WCHAT.warned = 1;
console.warn("[world-chat]", e);
}
} }, 500); };
if (document.readyState === "loading")
document.addEventListener("DOMContentLoaded", go);
else
go();
})();
