/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
var GUILD = { b: null, at: 0, busy: false, open: false, tab: "chat", chat: [], since: 0, chatAt: 0, unread: 0, form: null, halls: null, hallsAt: 0, banners: {}, choices: null, say: "" };
var GLD_MARKS = ["🌙", "⭐", "☀️", "🔥", "🌊", "🌿", "🗝️", "🦉", "🐉", "🦊", "🐺", "🦋", "⚓", "⚔️", "🛡️", "👑", "🎭", "🎵", "📜", "💎"];
var GLD_SHAPES = [["shield", "Shield"], ["round", "Round"], ["banner", "Banner"], ["diamond", "Diamond"]];
function gldCrestCanvas(cr, size) { return __ZC(213, 0, this, arguments, new.target); }
function gldCrestImg(cr, size) { try {
return '<img alt="" src="' + gldCrestCanvas(cr, (size || 40) * 2).toDataURL() + '" style="width:' + (size || 40) + 'px;height:' + (size || 40) + 'px;vertical-align:middle">';
}
catch (e) {
return "";
} }
function gldLoad(force) {
if (GUILD.busy || typeof signedIn !== "function" || !signedIn())
return;
if (!force && performance.now() - GUILD.at < 60000)
return;
GUILD.busy = true;
GUILD.at = performance.now();
cityRpc("guild_board", {}).then(function (b) {
GUILD.busy = false;
var had = GUILD.b && GUILD.b.mine && GUILD.b.mine.id;
GUILD.b = b || { ok: false };
if (b && b.mine && b.mine.id !== had) {
GUILD.chat = [];
GUILD.since = 0;
GUILD.chatAt = 0;
}
gldButton();
gldPaint();
}).catch(function () { GUILD.busy = false; });
}
function gldChat() { return __ZC(213, 1, this, arguments, new.target); }
function gldButton() {
var b = document.getElementById("me-guild");
if (!b)
return;
var g = GUILD.b && GUILD.b.mine, inv = GUILD.b && GUILD.b.invites && GUILD.b.invites.length;
b.textContent = "🛡️ " + (g ? g.tag : "Guild") + (GUILD.unread ? " · " + GUILD.unread : "") + (inv && !g ? " · " + inv + " invite" + (inv > 1 ? "s" : "") : "");
}
function gldAct(name, args, then) {
GUILD.say = "…";
gldPaint();
cityRpc(name, args).then(function (o) { GUILD.say = (o && o.say) || ""; if (then)
then(o); gldLoad(true); }).catch(function () { GUILD.say = "That did not go through. Try again in a moment."; gldPaint(); });
}
function gldHtml() { return __ZC(213, 2, this, arguments, new.target); }
function gldChatHtml() { return __ZC(213, 3, this, arguments, new.target); }
function gldMembers(B, g) { return __ZC(213, 4, this, arguments, new.target); }
function gldPurse(B, g) { return __ZC(213, 5, this, arguments, new.target); }
function gldCrestPicker(cr) { return __ZC(213, 6, this, arguments, new.target); }
function gldOutside(B) { return __ZC(213, 7, this, arguments, new.target); }
function gldSettings(g) { return __ZC(213, 8, this, arguments, new.target); }
function gldReadForm() {
var f = GUILD.form;
if (!f)
return;
var v = function (id) { var e = document.getElementById(id); return e ? e.value : ""; };
f.name = v("gld-name");
f.tag = v("gld-tag").toUpperCase();
f.motto = v("gld-motto");
if (document.getElementById("gld-a")) {
f.crest.a = v("gld-a");
f.crest.b = v("gld-b");
}
}
function gldReadSet() { return __ZC(213, 9, this, arguments, new.target); }
function gldPaint(keepInput) { return __ZC(213, 10, this, arguments, new.target); }
function gldCrestPrev() { var p = document.getElementById("gld-crest-prev"), cr = GUILD.form ? GUILD.form.crest : GUILD.set ? GUILD.set.crest : null; if (p && cr)
p.innerHTML = gldCrestImg(cr, 56); }
function gldSend() {
var t = document.getElementById("gld-say");
if (!t || !t.value.trim())
return;
var body = t.value.trim();
t.value = "";
cityRpc("guild_say", { p_body: body }).then(function (o) { if (o && o.ok === false && o.say) {
GUILD.say = o.say;
gldPaint();
} gldChat(); }).catch(function () { });
}
function gldClick(e) { return __ZC(213, 11, this, arguments, new.target); }
function gldOpen() { GUILD.open = true; GUILD.say = ""; gldPaint(); gldLoad(true); if (GUILD.b && GUILD.b.mine)
gldChat(); }
if (typeof backRegister === "function")
backRegister({ order: 2, open: function () { return GUILD.open; }, close: function () { GUILD.open = false; gldPaint(); } });
function gldBannerMake(h) { return __ZC(213, 12, this, arguments, new.target); }
function gldBannerSpot(x, z) { return __ZC(213, 13, this, arguments, new.target); }
function gldBannersTick() {
if (typeof scene === "undefined" || !scene)
return;
var inCity = typeof inCityNow === "function" && inCityNow() && !(typeof store !== "undefined" && store.inside);
if (!inCity) {
Object.keys(GUILD.banners).forEach(function (k) { var b = GUILD.banners[k]; if (b && b.g)
b.g.visible = false; });
return;
}
if (signedIn() && performance.now() - GUILD.hallsAt > 300000) {
GUILD.hallsAt = performance.now();
cityRpc("guild_halls", {}).then(function (rows) { GUILD.halls = rows || []; }).catch(function () { });
}
var P = camera.position, want = {};
(GUILD.halls || []).forEach(function (h) {
if (typeof h.x !== "number" || typeof h.z !== "number")
return;
var key = h.id + ":" + h.lot + ":" + JSON.stringify(h.crest || {}) + h.tag + h.name;
want[h.id] = 1;
var near = Math.hypot(h.x - P.x, h.z - P.z) < 260, b = GUILD.banners[h.id];
if (b && b.key !== key) {
if (b.g)
scene.remove(b.g);
b = GUILD.banners[h.id] = null;
}
if (!b && near) {
var s = gldBannerSpot(h.x, h.z);
if (!s)
return;
var g = gldBannerMake(h);
g.position.set(s.x, s.y, s.z);
g.rotation.y = -s.a + Math.PI / 2;
scene.add(g);
GUILD.banners[h.id] = { g: g, key: key };
}
else if (b && b.g)
b.g.visible = near;
});
Object.keys(GUILD.banners).forEach(function (k) { if (!want[k]) {
var b = GUILD.banners[k];
if (b && b.g)
scene.remove(b.g);
delete GUILD.banners[k];
} });
}
function gldBannersSway(t) {
Object.keys(GUILD.banners).forEach(function (k) { var b = GUILD.banners[k]; if (b && b.g && b.g.visible) {
b.g.userData.cloth.rotation.y = Math.sin(t * 0.0011 + (+k)) * 0.14;
} });
}
(function () {
function hook() {
var bar = document.getElementById("me-bar");
if (!bar)
return setTimeout(hook, 900);
if (document.getElementById("me-guild"))
return;
var b = document.createElement("button");
b.className = "btn";
b.id = "me-guild";
b.title = "Your guild: chat, members, purse and hall";
b.onclick = gldOpen;
var pk = document.getElementById("me-who");
if (pk && pk.parentNode === bar && pk.nextSibling)
bar.insertBefore(b, pk.nextSibling);
else
bar.appendChild(b);
gldButton();
}
if (document.readyState === "loading")
document.addEventListener("DOMContentLoaded", hook);
else
hook();
})();
setInterval(function () {
if (typeof signedIn !== "function" || !signedIn())
return;
gldLoad(false);
var fast = GUILD.open && GUILD.tab === "chat";
if (GUILD.b && GUILD.b.mine && performance.now() - GUILD.chatAt > (fast ? 3500 : 30000)) {
GUILD.chatAt = performance.now();
gldChat();
}
try {
gldBannersTick();
}
catch (e) { }
}, 3500);
(function sway() { try {
gldBannersSway(performance.now());
}
catch (e) { } setTimeout(sway, 100); })();
