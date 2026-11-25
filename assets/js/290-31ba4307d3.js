/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
var FLK = (function () {
var KEY = "somnu.lock", TRY = "somnu.lock.tries";
var st = { on: false };
try {
var k = JSON.parse(localStorage.getItem(KEY) || "null");
if (k && typeof k === "object")
st = k;
}
catch (e) { }
return { st: st, key: KEY, tryKey: TRY, allowed: {}, server: null, me: null, leads: [], joined: [], syncAt: 0, busy: false };
})();
function flkOn() { return !!(FLK.st && FLK.st.on); }
function flkSave() { try {
localStorage.setItem(FLK.key, JSON.stringify(FLK.st));
}
catch (e) { } flkPill(); }
function flkEsc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
var FLK_SAY = "That is turned off by the teacher or parent lock.";
function flkSha256Hex(str) { return __ZC(290, 0, this, arguments, new.target); }
function flkSha256Plain(ascii) { return __ZC(290, 1, this, arguments, new.target); }
function flkPinHash(pin) { return flkSha256Hex("SOMNU-LOCK-PIN:" + String(pin || "").trim()); }
function flkPinOk(pin) { return /^[0-9]{4,8}$/.test(String(pin || "").trim()); }
function flkTries() { try {
var t = JSON.parse(localStorage.getItem(FLK.tryKey) || "[]");
return Array.isArray(t) ? t.filter(function (x) { return Date.now() - x < 600000; }) : [];
}
catch (e) {
return [];
} }
function flkTried() { var t = flkTries(); t.push(Date.now()); try {
localStorage.setItem(FLK.tryKey, JSON.stringify(t));
}
catch (e) { } }
function flkWaiting() { return flkTries().length >= 5; }
function flkMe() { try {
return (typeof session !== "undefined" && session && session.user && session.user.id) || null;
}
catch (e) {
return null;
} }
function flkAllowed(id) {
if (!id)
return true;
if (id === flkMe())
return true;
return !!FLK.allowed[id];
}
var FLK_UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
var FLK_WHO = ["user_id", "from", "from_user", "other", "user", "driver", "rider", "friend", "who", "host", "by_user", "author"];
function flkKeep(o) {
if (!o || typeof o !== "object" || Array.isArray(o))
return true;
for (var i = 0; i < FLK_WHO.length; i++) {
var v = o[FLK_WHO[i]];
if (typeof v === "string" && FLK_UUID.test(v) && !flkAllowed(v))
return false;
}
return true;
}
function flkFilter(v, depth) {
depth = depth || 0;
if (depth > 4 || !v || typeof v !== "object")
return v;
if (Array.isArray(v))
return v.filter(flkKeep).map(function (x) { return flkFilter(x, depth + 1); });
var o = {};
for (var k in v) {
if (Object.prototype.hasOwnProperty.call(v, k))
o[k] = flkFilter(v[k], depth + 1);
}
return o;
}
var FLK_OFF = { guild_found: 1, guild_join: 1, guild_say: 1, gazette_write: 1, notice_post: 1, party_throw: 1, party_rsvp: 1, party_guests_set: 1,
game_new: 1, game_join: 1, poker_new: 1, poker_sit: 1, race_join: 1, show_book: 1, show_tip: 1, stn_game_join: 1, stn_game_tag: 1, art_upload: 1,
rep_word: 1, court_jury_join: 1, court_jury_vote: 1 };
var FLK_TO = { phone_send: "p_to", friend_ask: "p_user", mail_send: "p_to_user", pass_invite: "p_user", pass_ask: "p_driver",
offer_trade: "p_to", pay_dreamer: "p_to", live_send: "p_to", phone_thread: "p_user" };
var FLK_SAYING = { world_say: 1, say_in_city: 1 };
var FLK_SIEVE = { list_presence: 1, city_chat_since: 1, world_chat_since: 1, live_poll: 1, friends_where: 1, friends_list: 1, phone_inbox: 1,
phone_book: 1, pass_nearby: 1, find_dreamer: 1, guild_chat_since: 1, games_lobby: 1, race_lobby: 1, party_board: 1, arena_live: 1, show_live: 1, shows_board: 1 };
var FLK_TEXT = { court_jury_join: 1, offer_trade: 1, pay_dreamer: 1, world_say: 1, say_in_city: 1, court_jury_vote: 1 };
function flkAnswer(name, data) { return __ZC(290, 2, this, arguments, new.target); }
function flkRpcName(url) {
if (typeof DW_CONFIG === "undefined" || !DW_CONFIG.supabaseUrl)
return null;
var base = DW_CONFIG.supabaseUrl.replace(/\/+$/, "");
if (url.indexOf(base) !== 0)
return null;
var m = /\/rest\/v1\/rpc\/([a-z0-9_]+)/.exec(url);
return m ? m[1] : null;
}
function flkBody(init) { try {
return (init && typeof init.body === "string") ? JSON.parse(init.body) : {};
}
catch (e) {
return {};
} }
function flkGate(name, init) { return __ZC(290, 3, this, arguments, new.target); }
if (typeof window !== "undefined" && typeof window.fetch === "function" && !window.fetch.somnuLock) {
(function () {
var fetchUnlocked = window.fetch;
var locked = function (input, init) {
if (!flkOn())
return fetchUnlocked.apply(this, arguments);
var url = (typeof input === "string") ? input : (input && input.url) || "";
var name = flkRpcName(url);
if (!name || /^lock_/.test(name))
return fetchUnlocked.apply(this, arguments);
var ans = flkGate(name, init);
if (ans)
return ans;
var p = fetchUnlocked.apply(this, arguments);
if (!FLK_SIEVE[name])
return p;
return p.then(function (r) {
if (!r || !r.ok || typeof r.clone !== "function")
return r;
return r.clone().json().then(function (j) { return flkAnswer(name, flkFilter(j)); }, function () { return r; });
});
};
locked.somnuLock = true;
locked.somnuGate = window.fetch.somnuGate;
window.fetch = locked;
})();
}
if (typeof vcStart === "function") {
var vcStartUnlocked = vcStart;
vcStart = function () { if (flkOn()) {
if (typeof setStatus === "function")
setStatus("🔒 Voice is off while the teacher or parent lock is on. Chat with your class still works.");
return;
} return vcStartUnlocked.apply(this, arguments); };
}
if (typeof shwGoLive === "function") {
var shwGoLiveUnlocked = shwGoLive;
shwGoLive = function () { if (flkOn()) {
if (typeof setStatus === "function")
setStatus("🔒 Live shows are off while the teacher or parent lock is on.");
return;
} return shwGoLiveUnlocked.apply(this, arguments); };
}
function flkRpc(name, body) {
if (typeof cloudOn !== "function" || !cloudOn() || typeof freshToken !== "function")
return Promise.reject(new Error("offline"));
return freshToken().then(function (tok) {
if (!tok)
throw new Error("signed out");
return fetch(DW_CONFIG.supabaseUrl.replace(/\/+$/, "") + "/rest/v1/rpc/" + name, { method: "POST",
headers: { "Content-Type": "application/json", apikey: DW_CONFIG.supabaseKey, Authorization: "Bearer " + tok }, body: JSON.stringify(body || {}) });
}).then(function (r) {
if (r.status === 404) {
FLK.server = false;
throw new Error("no the latest server update");
}
if (!r.ok)
throw new Error("http " + r.status);
FLK.server = true;
return r.json();
});
}
function flkSignedIn() { try {
return typeof signedIn === "function" && signedIn();
}
catch (e) {
return false;
} }
function flkSync(force) {
if (FLK.busy)
return Promise.resolve();
if (!flkSignedIn()) {
FLK.me = null;
FLK.leads = [];
FLK.joined = [];
if (flkOn())
FLK.allowed = {};
flkPaint();
return Promise.resolve();
}
if (!force && Date.now() - FLK.syncAt < 45000 && FLK.me === flkMe())
return Promise.resolve();
FLK.busy = true;
FLK.syncAt = Date.now();
FLK.me = flkMe();
return flkRpc("lock_status").then(function (s) {
if (!s || s.ok === false)
return;
var me = flkMe();
FLK.leads = s.leads || [];
FLK.joined = s.joined || [];
if (s.locked) {
if (!flkOn() || FLK.st.code !== s.code) {
FLK.st = { on: true, code: s.code, name: s.name, pinHash: (FLK.st.code === s.code) ? FLK.st.pinHash : null, boundTo: me, at: Date.now() };
}
FLK.st.boundTo = me;
FLK.st.name = s.name;
FLK.st.temples = (s.temples !== false);
flkSave();
flkRowApply();
FLK.allowed = {};
(s.allowed || []).forEach(function (id) { FLK.allowed[id] = true; });
return;
}
if (!flkOn()) {
FLK.allowed = {};
return;
}
if (FLK.st.boundTo === me) {
FLK.st = { on: false };
flkSave();
FLK.allowed = {};
flkRowApply();
if (typeof setStatus === "function")
setStatus("🔓 The teacher or parent lock was turned off by the grown-up who runs your class or family.");
return;
}
if (!FLK.st.pinHash)
return;
return flkRpc("lock_now", { p_pin_hash: FLK.st.pinHash, p_code: FLK.st.code || null, p_name: FLK.st.name || null }).then(function (r) {
if (r && r.ok) {
FLK.st.code = r.code;
FLK.st.name = r.name;
FLK.st.boundTo = me;
flkSave();
var row = (FLK.st.temples === false) ? flkRpc("lock_set_temples", { p_code: r.code, p_on: false, p_pin_hash: FLK.st.pinHash }).catch(function () { }) : Promise.resolve();
return row.then(function () { FLK.syncAt = 0; FLK.busy = false; return flkSync(true); });
}
});
}).catch(function () { }).then(function () { FLK.busy = false; flkPaint(); });
}
function flkLock(pin, code, name) { return __ZC(290, 4, this, arguments, new.target); }
function flkUnlock(pin) { return __ZC(290, 5, this, arguments, new.target); }
function flkPill() {
if (typeof document === "undefined" || !document.body)
return;
var p = document.getElementById("flk-pill");
if (!flkOn()) {
if (p)
p.remove();
return;
}
if (!p) {
p = document.createElement("div");
p.id = "flk-pill";
p.setAttribute("role", "button");
p.tabIndex = 0;
p.title = "The teacher or parent lock is on: only your class or family can see or reach you.";
p.style.cssText = "position:fixed;left:50%;transform:translateX(-50%);top:calc(env(safe-area-inset-top,0px) + 4px);z-index:40;" +
"font:12px var(--sans,system-ui);color:#E8DCC4;background:rgba(28,24,34,.78);border:1px solid rgba(232,220,196,.28);" +
"border-radius:999px;padding:3px 10px;pointer-events:auto;cursor:pointer;opacity:.85";
p.onclick = function () { var b = document.getElementById("setbtn"); if (b)
b.click(); setTimeout(function () { var c = document.getElementById("flk-card"); if (c && c.scrollIntoView)
c.scrollIntoView({ block: "start" }); }, 60); };
document.body.appendChild(p);
}
p.textContent = "🔒 " + (FLK.st.name ? FLK.st.name : "Lock on");
}
function flkCard() {
var panel = document.getElementById("panel");
if (!panel)
return null;
var c = document.getElementById("flk-card");
if (!c) {
c = document.createElement("div");
c.id = "flk-card";
c.style.cssText = "margin:6px 0 14px;padding:10px 12px;border:1px solid rgba(232,220,196,.22);border-radius:10px;font-family:var(--sans);font-size:13px;line-height:1.55";
var top = panel.querySelector(".set-top");
if (top && top.nextSibling)
panel.insertBefore(c, top.nextSibling);
else
panel.appendChild(c);
c.addEventListener("click", flkClick);
}
return c;
}
function flkSay(t, bad) { var m = document.getElementById("flk-msg"); if (m) {
m.textContent = t || "";
m.style.color = bad ? "#D08A6A" : "var(--dim)";
} }
var FLK_FORM = null;
function flkPaint() {
flkPill();
var c = flkCard();
if (!c)
return;
var h = "<h3 style='font-weight:500;margin:0 0 4px;color:var(--bone)'>🔒 Teacher / parent lock</h3>";
var inp = "style='width:100%;max-width:300px;margin:4px 0'", inpUp = "style='width:100%;max-width:300px;margin:4px 0;text-transform:uppercase'";
if (flkOn()) {
h += "<div>The lock is <b>on</b>" + (FLK.st.name ? " for <b>" + flkEsc(FLK.st.name) + "</b>" : "") + (FLK.st.code ? " (code <b>" + flkEsc(FLK.st.code) + "</b>)" : "") +
". This device sees and reaches only the players in this class or family. Everything else in the game works as always.</div>";
if (!flkSignedIn())
h += "<div class='hint' style='font-size:12px;color:var(--dim)'>Sign in on this device and the lock goes with the account, onto any device it signs in on.</div>";
else if (FLK.server === false)
h += "<div class='hint' style='font-size:12px;color:var(--dim)'>For now the lock is kept on this device, and it reaches no other players at all.</div>";
var rowOn = FLK.st.temples !== false;
h += "<div style='margin-top:4px'>Temple Row: <b>" + (rowOn ? "in the city" : "put away") + "</b>" + (FLK_ROW.pending ? " (waiting for you to step off it)" : "") + "</div>";
if (FLK_FORM === "row")
h += "<input id='flk-pin' type='password' inputmode='numeric' autocomplete='off' placeholder='the PIN' " + inp + ">" +
"<div class='row' style='gap:8px;flex-wrap:wrap'><button class='btn' type='button' data-flk='row-go'>" + (rowOn ? "Put Temple Row away" : "Bring Temple Row back") + "</button><button class='btn' type='button' data-flk='cancel'>Cancel</button></div>";
else if (FLK_FORM === "off")
h += "<input id='flk-pin' type='password' inputmode='numeric' autocomplete='off' placeholder='the PIN' " + inp + ">" +
"<div class='row' style='gap:8px;flex-wrap:wrap'><button class='btn' type='button' data-flk='off-go'>Turn the lock off</button><button class='btn' type='button' data-flk='cancel'>Keep it on</button></div>";
else
h += "<div class='row' style='gap:8px;margin-top:6px;flex-wrap:wrap'><button class='btn' type='button' data-flk='off'>Turn the lock off…</button>" +
"<button class='btn' type='button' data-flk='row'>" + (rowOn ? "Put Temple Row away…" : "Bring Temple Row back…") + "</button></div>";
}
else {
h += "<div>For a class, a home or a programme: the same full game, with no other live players except the ones a grown-up allows. A PIN keeps it on.</div>";
if (FLK_FORM === "lock") {
h += "<input id='flk-code' type='text' autocomplete='off' placeholder='class or family code, if there is one' " + inpUp + ">" +
"<input id='flk-name' type='text' autocomplete='off' maxlength='40' placeholder='or a name for a new family' " + inp + ">" +
"<input id='flk-pin' type='password' inputmode='numeric' autocomplete='off' placeholder='PIN, 4 to 8 numbers' " + inp + ">" +
"<input id='flk-pin2' type='password' inputmode='numeric' autocomplete='off' placeholder='the PIN again' " + inp + ">" +
"<div class='row' style='gap:8px;flex-wrap:wrap'><button class='btn' type='button' data-flk='lock-go'>Lock this device</button><button class='btn' type='button' data-flk='cancel'>Cancel</button></div>";
}
else if (FLK_FORM === "class") {
h += "<input id='flk-name' type='text' autocomplete='off' maxlength='40' placeholder='a name, like Room 4 or The Ashbys' " + inp + ">" +
"<input id='flk-pin' type='password' inputmode='numeric' autocomplete='off' placeholder='PIN, 4 to 8 numbers' " + inp + ">" +
"<input id='flk-pin2' type='password' inputmode='numeric' autocomplete='off' placeholder='the PIN again' " + inp + ">" +
"<div class='row' style='gap:8px;flex-wrap:wrap'><button class='btn' type='button' data-flk='class-go'>Start it</button><button class='btn' type='button' data-flk='cancel'>Cancel</button></div>";
}
else if (FLK_FORM === "join") {
h += "<input id='flk-code' type='text' autocomplete='off' placeholder='class or family code' " + inpUp + ">" +
"<input id='flk-pin' type='password' inputmode='numeric' autocomplete='off' placeholder='its PIN' " + inp + ">" +
"<div class='row' style='gap:8px;flex-wrap:wrap'><button class='btn' type='button' data-flk='join-go'>Join without a lock</button><button class='btn' type='button' data-flk='cancel'>Cancel</button></div>";
}
else {
h += "<div class='row' style='gap:8px;flex-wrap:wrap;margin-top:6px'><button class='btn' type='button' data-flk='lock'>Lock this device…</button>";
if (flkSignedIn())
h += "<button class='btn' type='button' data-flk='class'>Start a class or family…</button><button class='btn' type='button' data-flk='join'>Join one as a trusted grown-up…</button>";
h += "</div>";
if (!flkSignedIn())
h += "<div class='hint' style='font-size:12px;color:var(--dim)'>Sign in above to start a class or family that others can join with its code.</div>";
}
}
if (FLK.leads.length) {
h += "<div style='margin-top:10px;color:var(--bone)'>Classes and families you run</div>";
FLK.leads.forEach(function (k) {
h += "<div style='margin:6px 0 2px'><b>" + flkEsc(k.name) + "</b> &middot; code <b>" + flkEsc(k.code) + "</b> " +
"<button class='btn' type='button' style='font-size:11px;padding:1px 8px' data-flk='close' data-code='" + flkEsc(k.code) + "'>Close it</button></div>" +
"<div style='font-size:12.5px;padding-left:10px'>Temple Row: " + (k.temples === false ? "put away" : "in the city") +
" <button class='btn' type='button' style='font-size:11px;padding:1px 8px' data-flk='row-class' data-code='" + flkEsc(k.code) + "' data-on='" + (k.temples === false ? "1" : "0") + "'>" + (k.temples === false ? "Bring it back" : "Put it away") + "</button></div>";
if (!(k.members || []).length)
h += "<div class='hint' style='font-size:12px;color:var(--dim)'>Nobody yet. On each child's device: Settings, Lock this device, this code and the PIN.</div>";
(k.members || []).forEach(function (m) {
h += "<div style='font-size:12.5px;padding-left:10px'>" + flkEsc(m.name) + (m.locked ? " &middot; locked" : " &middot; trusted grown-up") +
" <button class='btn' type='button' style='font-size:11px;padding:1px 8px' data-flk='release' data-code='" + flkEsc(k.code) + "' data-id='" + flkEsc(m.id) + "'>" + (m.locked ? "Unlock" : "Remove") + "</button></div>";
});
});
}
if (FLK.joined.length) {
h += "<div style='margin-top:10px;color:var(--bone)'>Joined as a trusted grown-up</div>";
FLK.joined.forEach(function (k) {
h += "<div style='font-size:12.5px'>" + flkEsc(k.name) + " &middot; " + flkEsc(k.code) + " <button class='btn' type='button' style='font-size:11px;padding:1px 8px' data-flk='leave' data-code='" + flkEsc(k.code) + "'>Leave</button></div>";
});
}
h += "<div id='flk-msg' class='hint' style='font-size:12px;color:var(--dim);min-height:16px;margin-top:6px'></div>";
var keepMsg = document.getElementById("flk-msg"), said = keepMsg ? [keepMsg.textContent, keepMsg.style.color] : null;
c.innerHTML = h;
if (said && said[0]) {
var m = document.getElementById("flk-msg");
m.textContent = said[0];
m.style.color = said[1];
}
}
function flkVal(id) { var e = document.getElementById(id); return e ? String(e.value || "").trim() : ""; }
function flkClick(ev) { return __ZC(290, 6, this, arguments, new.target); }
var FLK_RINGS_ALL = (typeof ATL_RINGS !== "undefined") ? ATL_RINGS.slice() : null;
var FLK_TR_ALL = (typeof TR_RINGS !== "undefined") ? TR_RINGS.slice() : null;
var FLK_ROW = { hidden: false, objs: [], chars: [], wp: {}, busy: false, pending: false, band: [645, 975] };
function flkRowWanted() { return flkOn() && FLK.st.temples === false; }
function flkRowRings(hide) {
if (FLK_RINGS_ALL)
ATL_RINGS = hide ? FLK_RINGS_ALL.filter(function (R) { return R.k !== "temples"; }) : FLK_RINGS_ALL.slice();
if (FLK_TR_ALL)
TR_RINGS = hide ? FLK_TR_ALL.filter(function (R) { return R[0] !== "temples"; }) : FLK_TR_ALL.slice();
FLK_ROW.hidden = !!hide;
}
function flkRowCity() { try {
return (typeof somnucorRealm === "function") ? somnucorRealm() : null;
}
catch (e) {
return null;
} }
function flkRowIn(x, z) {
if (typeof ATLC === "undefined" || !ATLC)
return false;
var r = Math.hypot(x - ATLC.x, z - ATLC.z);
return r > FLK_ROW.band[0] && r < FLK_ROW.band[1];
}
function flkRowSweep() { return __ZC(290, 7, this, arguments, new.target); }
function flkRowRestore() { return __ZC(290, 8, this, arguments, new.target); }
function flkRowGround() {
var r = flkRowCity();
if (!r || !r.atlantis || typeof atlBuildTerrain !== "function" || typeof realmGrounds === "undefined" || !realmGrounds[r.id])
return null;
var G = atlBuildTerrain(r);
if (G)
realmGrounds[r.id] = G;
return G;
}
function flkRowStanding() {
var r = flkRowCity();
return !!(r && r.atlantis && typeof realmGrounds !== "undefined" && realmGrounds[r.id] && (typeof ATL_JOB === "undefined" || !ATL_JOB));
}
function flkRowHere() { var r = flkRowCity(); return !!(r && store.here === r.id); }
function flkRowPlayerOn() {
if (!flkRowHere() || typeof camera === "undefined" || !camera)
return false;
return flkRowIn(camera.position.x, camera.position.z);
}
function flkRowSlide(parts, down, done) { return __ZC(290, 9, this, arguments, new.target); }
function flkRowParts() { return __ZC(290, 10, this, arguments, new.target); }
function flkRowApply() { return __ZC(290, 11, this, arguments, new.target); }
if (flkRowWanted())
flkRowRings(true);
if (typeof atlCityJob === "function") {
var atlCityJobUnlocked = atlCityJob;
atlCityJob = function () {
var J = atlCityJobUnlocked.apply(this, arguments);
if (J && J.steps)
J.steps.push(function () { FLK_ROW.objs = []; FLK_ROW.chars = []; FLK_ROW.wp = {}; if (FLK_ROW.hidden)
flkRowSweep(); });
return J;
};
}
if (typeof document !== "undefined")
document.addEventListener("click", function (e) {
if (!FLK_ROW.hidden || !e.target || !e.target.closest || !e.target.closest("#l-row"))
return;
e.stopPropagation();
e.preventDefault();
if (typeof setStatus === "function")
setStatus("🔒 Temple Row is put away by the teacher or parent lock.");
}, true);
setInterval(function () {
if (document.hidden)
return;
if (FLK_ROW.pending)
flkRowApply();
if (FLK_ROW.hidden && !FLK_ROW.busy && flkRowStanding())
flkRowSweep();
}, 3000);
function flkSetRow(on, pin) { return __ZC(290, 12, this, arguments, new.target); }
(function () {
if (typeof document === "undefined")
return;
function go() {
flkPaint();
flkSync(true);
var sb = document.getElementById("setbtn");
if (sb)
sb.addEventListener("click", function () { flkSync(false); setTimeout(flkPaint, 30); });
setInterval(function () { if (document.hidden)
return; if (flkMe() !== FLK.me)
flkSync(true);
else if (flkOn())
flkSync(false); }, 15000);
window.addEventListener("storage", function (e) { if (e.key === FLK.key) {
try {
FLK.st = JSON.parse(e.newValue || "null") || { on: false };
}
catch (x) {
FLK.st = { on: false };
}
flkPaint();
} });
}
if (document.readyState === "loading")
document.addEventListener("DOMContentLoaded", go);
else
go();
})();
