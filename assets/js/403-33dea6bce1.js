/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var KOR = { rows: [], ok: null, set: {}, at: 0, busy: false, ringAt: 0, tagged: false, TOLD: "kor-told" };
var KOR_ORDERS = { rider: "send another Dragon Corp rider", drone: "put a tracker drone up", hospital: "have the City Hospital check who was brought in",
crews: "send more crews", cordon: "close off the street", wanted: "put the culprit on the wanted list", update: "ring them back with news",
arrest: "arrest the culprit now", letgo: "let the culprit go", close: "close the case" };
var KOR_TAG = /\[\[?\s*DO\s*:?\s*([a-z ]+?)\s*\]\]?/gi;
function korKeeper() { return typeof amKeeper === "function" && amKeeper(); }
function korCase(id) {
var r = null;
(KOR.rows || []).forEach(function (x) { if (x.id === id)
r = x; });
if (!r && typeof INCD !== "undefined")
(INCD.rows || []).forEach(function (x) { if (x.id === id)
r = x; });
return r;
}
function korTold() { try {
return JSON.parse(localStorage.getItem(KOR.TOLD) || "{}") || {};
}
catch (e) {
return {};
} }
function korTell(k) {
var T = korTold();
T[k] = Date.now();
var keys = Object.keys(T);
if (keys.length > 300)
keys.sort(function (a, b) { return T[a] - T[b]; }).slice(0, 100).forEach(function (x) { delete T[x]; });
try {
localStorage.setItem(KOR.TOLD, JSON.stringify(T));
}
catch (e) { }
}
(function () {
if (typeof fpsChar !== "function")
return;
var fc = fpsChar;
fpsChar = function (name) { var c = fc.apply(this, arguments); try {
var w = fpsStore().who[name];
if (c && w && w.inc)
c.korInc = w.inc;
}
catch (e) { } return c; };
})();
function korFacts(r) { return __ZC(403, 0, this, arguments, new.target); }
function korRule(c, voice) { return __ZC(403, 1, this, arguments, new.target); }
function korOrder(id, o, note) { return __ZC(403, 2, this, arguments, new.target); }
function korLastSaid(log) { return ((log || []).filter(function (m) { return m.me; }).slice(-1)[0] || {}).t || ""; }
function korFromReply(c, raw, log) { return __ZC(403, 3, this, arguments, new.target); }
var KOR_WORDS = [["rider", /\b(another|more|extra|second|send (a|an|the)?\s*)\s*(riders?|officers?|cops?|police|men|backup|back-up|help)\b|\bback ?up\b/i],
["drone", /\bdrones?\b/i], ["hospital", /\bhospital|\bward\b|\bcasualt/i], ["crews", /\bmore (crews?|hands|firemen|people|workers)|\bsend (in )?(the )?crews?\b/i],
["cordon", /\bcordon|close (off )?the (street|road)|block (off )?the (street|road)|tape (it )?off/i], ["wanted", /\bwanted\b|\bmanhunt|\bhunt (him|her|them) down/i],
["update", /\b(call|ring|phone) me back|\bkeep me (posted|updated|informed)|\blet me know\b/i], ["arrest", /\barrest (him|her|them)\b|\bbring (him|her|them) in\b/i]];
function korWords(t) {
var out = [];
t = String(t || "");
t.split(/[.!?;,]|\band\b|\bthen\b|\bbut\b/i).forEach(function (part) {
if (/\b(don'?t|do not|no need|never|not)\b/i.test(part))
return;
KOR_WORDS.forEach(function (w) { if (w[1].test(part) && out.indexOf(w[0]) < 0)
out.push(w[0]); });
});
return out;
}
(function () {
if (typeof fpsAsk !== "function")
return;
var fa = fpsAsk;
fpsAsk = function (c, log) {
if (!c || !c.korInc || !korKeeper())
return fa.apply(this, arguments);
KOR.tagged = false;
var said = String(korLastSaid(log)).replace(/^📞 /, "");
return fa.apply(this, arguments).then(function (t) {
if (!KOR.tagged && said)
korWords(said).forEach(function (o) { korOrder(c.korInc, o, said); });
return t;
});
};
})();
function korPoll() {
if (!korKeeper() || !(typeof signedIn === "function" && signedIn()) || typeof cityRpc !== "function")
return;
if (KOR.busy && Date.now() - KOR.at < 20000)
return;
KOR.busy = true;
KOR.at = Date.now();
cityRpc("keeper_orders_now").then(function (o) {
KOR.busy = false;
if (!o || !o.ok) {
KOR.ok = false;
return;
}
KOR.ok = true;
KOR.rows = o.rows || [];
KOR.set = o.settings || {};
korFollow();
}).catch(function () { KOR.busy = false; KOR.ok = false; });
}
setInterval(function () { if (Date.now() - KOR.at >= 60000)
korPoll(); }, 10000);
function korPerson(p, post, place) { return __ZC(403, 4, this, arguments, new.target); }
function korText(name, t) {
var T = fpsStore(), L = T.log[name] || (T.log[name] = []);
L.push({ t: t, at: Date.now() });
T.unread[name] = (T.unread[name] || 0) + 1;
fpsSave();
if (typeof fpsBadge === "function")
fpsBadge();
if (typeof fpsToast === "function")
fpsToast(name, t);
}
function korFree() { return !(typeof fvoBusy === "function" && fvoBusy()) && document.visibilityState !== "hidden" && !(typeof talkOpen !== "undefined" && talkOpen); }
function korRing(name, why, inc, opener, about) {
var T = fpsStore();
if (T.who[name])
T.who[name].inc = inc;
fpsSave();
return typeof fvoIncoming === "function" && fvoIncoming(name, why, opener, about);
}
var KOR_STATE = { reported: "just reported, riders on their way", responding: "riders on their way", at_scene: "riders at the scene", chasing: "riders chasing the suspect",
arrested: "suspect arrested", escaped: "suspect got away", under_control: "under control" };
function korState(st) { return KOR_STATE[st] || String(st || "").replace(/_/g, " "); }
function korAbout(kind, r, extra) { return "🚨 <b>" + kind + "</b>: " + esc(r.what) + " at " + esc(r.place) + "<br><span style='color:#C9C2E0'>Now: " + esc(korState(r.state)) + (extra ? " · " + esc(extra) : "") + "</span>"; }
var KOR_END = { arrested: 1, escaped: 1, under_control: 1 };
function korFollow() { return __ZC(403, 5, this, arguments, new.target); }
function korCrimeRing() { return __ZC(403, 6, this, arguments, new.target); }
setInterval(korCrimeRing, 60000);
