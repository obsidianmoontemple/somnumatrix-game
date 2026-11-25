/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var WKC = { KEY: "somnu.workcalls.", on: true, rate: null, cfgAt: 0, jobsAt: 0, jobs: null, busy: false, away: { calls: 0, texts: 0 } };
var WKC_F = ["Mara", "Edith", "Rosa", "Nell", "Ada", "Ivy", "June", "Tilda", "Hazel", "Greta", "Lena", "Priya", "Odile", "Mabel", "Freya", "Wren", "Sadie", "Agnes", "Lucia", "Bea"];
var WKC_M = ["Tom", "Alf", "Jonah", "Silas", "Ned", "Owen", "Felix", "Ravi", "Hugh", "Bram", "Cyril", "Dale", "Ezra", "Gil", "Kit", "Leon", "Milo", "Abe", "Rory", "Sam"];
var WKC_S = ["Ashby", "Brook", "Calder", "Dunn", "Elwood", "Fenn", "Garrow", "Hale", "Ives", "Kerr", "Lark", "Moss", "Noble", "Orme", "Pike", "Quill", "Rowe", "Stroud", "Thorne", "Vance", "Webb", "Yarrow"];
function wkcPick(L, h) { return L[h % L.length]; }
function wkcUid() { try {
return (session && session.user && session.user.id) || "";
}
catch (e) {
return "";
} }
function wkcKind(title, place, panel) { return __ZC(396, 0, this, arguments, new.target); }
function wkcHeadWord(t) { return /\b(head|chief|commander|director|manager|owner|principal|boss|master|chair|captain|president|executive|proprietor|governor|superintendent|foreman|landlord|landlady)\b/i.test(String(t || "")); }
function wkcJobs() { return __ZC(396, 1, this, arguments, new.target); }
function wkcLoadJobs() {
if (Date.now() - WKC.jobsAt < 10 * 60000 || typeof cityRpc !== "function")
return;
WKC.jobsAt = Date.now();
if (typeof standing !== "undefined" && standing) {
WKC.jobs = 1;
return;
}
cityRpc("my_standing").then(function (s) { if (s && typeof standing !== "undefined" && !standing) {
try {
standing = s;
}
catch (e) { }
} WKC.jobs = 1; }).catch(function () { });
}
function wkcLoadCfg() {
if (Date.now() - WKC.cfgAt < 30 * 60000 || typeof cityRpc !== "function")
return;
WKC.cfgAt = Date.now();
cityRpc("city_life_state").then(function (o) {
var s = (o && o.settings) || {};
if (s.jobcalls !== undefined && s.jobcalls !== null)
WKC.on = !!+s.jobcalls;
}).catch(function () { });
}
function wkcMine() { var c = typeof cfg === "function" ? cfg() : {}; return c.workCalls !== false; }
function wkcStore() {
var uid = wkcUid(), k = WKC.KEY + uid;
if (WKC.s && WKC.s.uid === uid)
return WKC.s;
var s = null;
try {
s = JSON.parse(localStorage.getItem(k) || "null");
}
catch (e) { }
if (!s || typeof s !== "object")
s = { keys: {}, list: [] };
s.uid = uid;
s.list = s.list || [];
s.keys = s.keys || {};
WKC.s = s;
return s;
}
function wkcSave() { var s = wkcStore(); if (s.list.length > 40)
s.list.splice(0, s.list.length - 40); try {
localStorage.setItem(WKC.KEY + s.uid, JSON.stringify({ keys: s.keys, list: s.list }));
}
catch (e) { } }
function wkcMeet(e) { return __ZC(396, 2, this, arguments, new.target); }
function wkcAI() {
var key = typeof okyKey === "function" ? okyKey() : "", cf = typeof cfg === "function" ? cfg() : { mode: "off" };
var quiet = !key && typeof okyQuiet === "function" && okyQuiet();
return !!(key || (!quiet && cf.mode !== "off" && typeof aiBought === "function" && aiBought()));
}
function wkcLog(e, missed) {
var s = wkcStore();
s.list.push({ slot: e.slot, at: e.at, name: e.name, post: e.post, what: e.what, how: e.how, missed: !!missed, act: e.act || null });
wkcSave();
}
function wkcText(e, live) { return __ZC(396, 3, this, arguments, new.target); }
function wkcCall(e) { return __ZC(396, 4, this, arguments, new.target); }
(function () {
if (typeof fpsAsk !== "function")
return;
var fa = fpsAsk;
fpsAsk = function (c, log, extra, voice) {
var o = WKC.opener;
if (o && c && c.name === o.name && voice && Date.now() - o.at < 90000) {
WKC.opener = null;
if (!wkcAI())
return Promise.resolve(o.line);
}
return fa.apply(this, arguments);
};
})();
function wkcMayRingNow() {
if (document.visibilityState === "hidden" || (typeof fvoBusy === "function" && fvoBusy()))
return false;
if (typeof talkOpen !== "undefined" && talkOpen)
return false;
return typeof fvoMayRing === "function" ? fvoMayRing() : true;
}
function wkcMissed(e) { return __ZC(396, 5, this, arguments, new.target); }
function wkcTick() {
try {
if (!(typeof signedIn === "function" && signedIn()) || !wkcUid() || typeof fpsHash !== "function" || typeof fpsStore !== "function" || typeof cinWorkEvents !== "function")
return;
wkcLoadCfg();
wkcLoadJobs();
if (!WKC.jobs || typeof INCD === "undefined" || INCD.ok === null)
return;
if (typeof fvoSettled === "function" && !fvoSettled())
return;
var s = wkcStore(), now = Date.now(), evs = cinWorkEvents(wkcJobs()), due = [];
evs.forEach(function (e) { if (!s.keys[e.slot]) {
s.keys[e.slot] = now;
if (WKC.on && wkcMine() && now - e.at < 12 * 3600000)
due.push(e);
} });
var K = Object.keys(s.keys);
if (K.length > 400)
K.sort(function (a, b) { return s.keys[a] - s.keys[b]; }).slice(0, K.length - 400).forEach(function (k) { delete s.keys[k]; });
wkcSave();
if (!due.length)
return;
due.sort(function (a, b) { return a.at - b.at; });
var live = due.filter(function (e) { return now - e.at < 4 * 60000; }), old = due.filter(function (e) { return now - e.at >= 4 * 60000; }).slice(-10);
WKC.away = { calls: 0, texts: 0 };
old.forEach(function (e) { wkcMeet(e); if (e.how === "either")
e.how = "text"; wkcMissed(e); });
var rang = false;
live.forEach(function (e) {
wkcMeet(e);
if (e.how === "either")
e.how = (fpsHash(e.slot) % 3 === 0) ? "call" : "text";
if (e.how === "call" && !e.quiet && !rang && wkcMayRingNow() && wkcCall(e)) {
rang = true;
wkcLog(e, false);
return;
}
if (document.visibilityState === "hidden") {
wkcMissed(e);
return;
}
e.how = "text";
wkcText(e, true);
wkcLog(e, false);
});
fpsSave();
if (WKC.away.si && !WKC.away.calls && !WKC.away.texts && typeof setStatus === "function")
setStatus("🧍 While you were away your stand-in took <b>" + WKC.away.si + " call" + (WKC.away.si > 1 ? "s" : "") + "</b> about your work. Phone &gt; Town.");
if (WKC.away.calls || WKC.away.texts) {
if (typeof fpsBadge === "function")
fpsBadge();
if (typeof setStatus === "function")
setStatus("📱 While you were away: <b>" + (WKC.away.si ? "your stand-in took " + WKC.away.si + " call" + (WKC.away.si > 1 ? "s" : "") + ", " : "") + (WKC.away.calls ? WKC.away.calls + " missed call" + (WKC.away.calls > 1 ? "s" : "") : "") +
(WKC.away.calls && WKC.away.texts ? " and " : "") + (WKC.away.texts ? WKC.away.texts + " text" + (WKC.away.texts > 1 ? "s" : "") : "") + "</b> about your work. Phone &gt; Town.");
}
}
catch (err) {
if (window.console)
console.warn("[work-calls]", err);
}
}
setInterval(wkcTick, 30000);
setTimeout(wkcTick, 8000);
document.addEventListener("visibilitychange", function () { if (document.visibilityState === "visible")
setTimeout(wkcTick, 1500); });
function wkcActBtn(x) { return __ZC(396, 6, this, arguments, new.target); }
(function () {
if (typeof phPaint !== "function")
return;
var pp = phPaint;
phPaint = function () {
var r = pp.apply(this, arguments);
try {
if (typeof PH === "undefined" || PH.tab !== "town" || typeof FPS === "undefined" || FPS.with)
return r;
var box = document.getElementById("ph-box"), body = box && box.querySelector(".body");
if (!body || !wkcUid())
return r;
var L = wkcStore().list.slice(-12).reverse(), T = fpsStore();
var h = "<div id='wkc-town'><div class='s' style='margin:4px 2px 0;font-weight:600'>About your work</div>";
if (!L.length)
h += "<div class='row'><div class='s'>" + (wkcJobs().length ? "When the people of your work ring or text you, it shows here, missed calls too." : "Take a job (Settings &gt; Your work and your purse) and the people of your work will ring and text you here.") + "</div></div>";
L.forEach(function (x) {
var u = T.unread[x.name] || 0;
h += "<div class='row' data-wkcwith='" + esc(x.name) + "' style='cursor:pointer'><div style='display:flex;justify-content:space-between'><span class='n'>" + (x.how === "call" ? (x.missed ? "📞 <span style='color:#E06060'>Missed call</span> · " : "📞 ") : "💬 ") + esc(x.name) + "</span><span class='s'>" + phWhen(x.at) + "</span></div>" +
"<div class='s'>" + esc(x.post) + " · " + esc(String(x.what).slice(0, 80)) + (u ? " <b style='color:#E8C66A'>· " + u + " new</b>" : "") + "</div>" + wkcActBtn(x) + "</div>";
});
h += "</div>";
body.insertAdjacentHTML("afterbegin", h);
body.querySelectorAll("[data-wkcwith]").forEach(function (el) { el.onclick = function (ev) { ev.stopPropagation(); var n = el.getAttribute("data-wkcwith"); FPS.with = n; FPS.from = (fpsStore().log[n] || []).length; fpsStore().unread[n] = 0; fpsSave(); if (typeof fpsBadge === "function")
fpsBadge(); phPaint(true); }; });
}
catch (e) {
if (window.console)
console.warn("[work-calls]", e);
}
return r;
};
})();
(function () {
if (typeof openPanel !== "function")
return;
var op = openPanel;
openPanel = function () {
var r = op.apply(this, arguments);
try {
var cb = document.getElementById("wkc-set-on");
if (!cb) {
var anchor = document.getElementById("fvo-set");
if (!anchor)
return r;
var d = document.createElement("label");
d.id = "wkc-set";
d.style.cssText = "display:flex;gap:8px;align-items:center;cursor:pointer;margin-top:8px";
d.innerHTML = "<input type='checkbox' id='wkc-set-on'> Calls and texts about my work";
anchor.appendChild(d);
cb = document.getElementById("wkc-set-on");
cb.onchange = function () { var c = cfg(); c.workCalls = cb.checked; setCfg(c); };
}
cb.checked = wkcMine();
}
catch (e) { }
return r;
};
})();
