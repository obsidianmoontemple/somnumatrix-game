/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var NJ = { KEY: "somnu.nightjournal", cfg: null, booted: false, warned: {}, ui: false };
function njTest() { return typeof DW_TESTING !== "undefined" && DW_TESTING; }
function njKey(k) { return (njTest() ? "test." : "") + NJ.KEY + (k ? "." + k : ""); }
function njGet(k, d) { try {
var v = localStorage.getItem(njKey(k));
return v == null ? d : JSON.parse(v);
}
catch (e) {
return d;
} }
function njPut(k, v) { try {
if (v == null)
localStorage.removeItem(njKey(k));
else
localStorage.setItem(njKey(k), JSON.stringify(v));
}
catch (e) { } }
function njCfg() {
if (!NJ.cfg) {
var c = njGet("", null) || {};
NJ.cfg = {
remind: Object.assign({ on: false, time: "07:00", buzz: false }, c.remind || {}),
lucid: Object.assign({ on: true, every: 120, from: 9, to: 21 }, c.lucid || {}),
share: c.share !== false,
rang: c.rang || "", pinged: +c.pinged || 0
};
}
return NJ.cfg;
}
function njSave() { njPut("", njCfg()); }
function njSay(h) { if (typeof setStatus === "function")
try {
setStatus(h);
}
catch (e) { } }
function njE(s) { return typeof esc === "function" ? esc(s) : String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
function njWarn(k, e) { if (NJ.warned[k])
return; NJ.warned[k] = 1; if (window.console)
console.warn("[night-journal " + k + "]", e); }
function njSigned() { return typeof signedIn === "function" && signedIn(); }
function njVisiting() { return typeof visiting !== "undefined" && !!visiting; }
function njInVR() { return typeof renderer !== "undefined" && renderer && renderer.xr && renderer.xr.isPresenting; }
function njLite() { return (typeof LITE !== "undefined" && !!LITE) || njInVR(); }
function njOnline() { return !(typeof navigator !== "undefined" && navigator.onLine === false); }
function njDay(d) { d = d || new Date(); return d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2); }
function njSealedDay(r) { try {
return njDay(new Date(r.sealedAt));
}
catch (e) {
return r.date || "";
} }
function njSessions() { return (typeof store !== "undefined" && !njVisiting() && store.sessions) || []; }
function njTyping() { var a = document.activeElement; return !!(a && (a.tagName === "TEXTAREA" || a.tagName === "INPUT" || a.isContentEditable)); }
function njCard(id, html, buttons, ms) { return __ZC(440, 0, this, arguments, new.target); }
function njStyle() {
if (document.getElementById("nj-style"))
return;
var st = document.createElement("style");
st.id = "nj-style";
st.textContent =
".nj-card{position:fixed;z-index:46;right:calc(14px + env(safe-area-inset-right,0px));top:calc(70px + env(safe-area-inset-top,0px));width:min(340px,calc(100vw - 28px));" +
"background:rgba(12,10,22,.95);color:#EDE8F8;border:1px solid rgba(232,198,106,.6);border-radius:12px;padding:12px 14px;font:14px/1.5 system-ui,sans-serif;" +
"box-shadow:0 6px 24px rgba(0,0,0,.45);opacity:0;transform:translateY(-6px);transition:opacity .45s ease,transform .45s ease}" +
".nj-card.on{opacity:1;transform:none}.nj-card b{color:#F2D27A;font-weight:600}.nj-card i{color:#C8C0E0}" +
".nj-card-r{display:flex;flex-wrap:wrap;gap:8px;justify-content:flex-end;margin-top:10px}" +
".nj-card button,.nj-btn{font:600 13px system-ui,sans-serif;border-radius:14px;padding:7px 13px;border:1px solid #C9A040;background:#2A2448;color:#F2D27A;cursor:pointer}" +
".nj-card button.no{border:0;background:none;color:#A8A0C0;font-weight:400;padding:7px 4px}" +
".nj-sec{margin:8px 0}.nj-sec p{margin:6px 0}.nj-row{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin:8px 0}" +
".nj-sec input[type=time],.nj-sec select{padding:4px 6px;border-radius:6px;border:1px solid #4A4470;background:#141022;color:#EDE8F8;font-size:13px}" +
".nj-dim{color:#A8A0C0;font-size:13px}.nj-score{font-size:15px}.nj-bar{height:6px;background:#2A2448;border-radius:3px;overflow:hidden;margin:4px 0 8px}" +
".nj-bar i{display:block;height:100%;background:linear-gradient(90deg,#8A7AE0,#F2D27A)}" +
"@media (max-height:500px){.nj-card{top:calc(12px + env(safe-area-inset-top,0px));width:min(360px,46vw)}}";
document.head.appendChild(st);
}
function njPanels() {
var foot = document.getElementById("j-foot");
if (!foot || document.getElementById("nj-morning"))
return;
njStyle();
var mk = function (id, title) {
var d = document.createElement("details");
d.id = id;
d.className = "nj-sec";
d.innerHTML = '<summary>' + title + '</summary><div class="nj-body"></div>';
foot.appendChild(d);
d.addEventListener("toggle", function () { if (d.open)
njPaint(); });
return d;
};
mk("nj-morning", "🌅 Morning reminder &mdash; <span id=\"nj-m-state\">off</span>");
mk("nj-atlas", "🗺️ Your dream atlas &mdash; <span id=\"nj-a-state\"></span>");
mk("nj-lucid", "👁️ Lucid training &mdash; <span id=\"nj-l-state\"></span>");
mk("nj-shared", "🌙 The shared night &mdash; <span id=\"nj-s-state\"></span>");
NJ.ui = true;
}
var NJ_PAINT = [];
function njPaint() { NJ_PAINT.forEach(function (f) { try {
f();
}
catch (e) {
njWarn("paint", e);
} }); }
function njBody(id) { var d = document.getElementById(id); return d ? d.querySelector(".nj-body") : null; }
function njSetText(id, t) { var el = document.getElementById(id); if (el)
el.textContent = t; }
function njDeepLink() {
if (!/[?&]write\b/.test(location.search))
return;
var tries = 0, t = setInterval(function () {
tries++;
if (typeof openStory === "function" && document.getElementById("story") && (typeof store !== "undefined") && (document.readyState === "complete" || tries > 20)) {
clearInterval(t);
try {
if (!njVisiting())
openStory();
}
catch (e) {
njWarn("write", e);
}
try {
history.replaceState(null, "", location.pathname + location.search.replace(/([?&])write\b(=[^&]*)?&?/, "$1").replace(/[?&]$/, "") + location.hash);
}
catch (e) { }
}
else if (tries > 120)
clearInterval(t);
}, 500);
}
(function () {
function hook() {
njPanels();
if (typeof openJournal === "function" && !openJournal.nj) {
var oj = openJournal;
openJournal = function () { var r = oj.apply(this, arguments); try {
njPanels();
njPaint();
}
catch (e) {
njWarn("open", e);
} return r; };
openJournal.nj = 1;
var jb = document.getElementById("journalbtn");
if (jb)
jb.addEventListener("click", function () { setTimeout(function () { try {
njPanels();
njPaint();
}
catch (e) { } }, 0); });
}
njDeepLink();
NJ.booted = true;
}
if (document.readyState === "loading")
document.addEventListener("DOMContentLoaded", hook);
else
setTimeout(hook, 0);
})();
function njAppUrl() { return location.origin + location.pathname + "?play&write"; }
function njMinutes(t) { var m = /^(\d{1,2}):(\d{2})$/.exec(String(t || "")); return m ? (+m[1]) * 60 + (+m[2]) : 7 * 60; }
function njWroteToday() { var d = njDay(); return njSessions().some(function (r) { return njSealedDay(r) === d; }); }
function njNotify(title, body, tag, url) { return __ZC(440, 1, this, arguments, new.target); }
function njAskBuzz() { return __ZC(440, 2, this, arguments, new.target); }
function njIcsTime(d) { return d.getFullYear() + ("0" + (d.getMonth() + 1)).slice(-2) + ("0" + d.getDate()).slice(-2) + "T" + ("0" + d.getHours()).slice(-2) + ("0" + d.getMinutes()).slice(-2) + "00"; }
function njIcsEsc(s) { return String(s).replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n"); }
function njIcsEvent(uid, start, title, text, url) { return __ZC(440, 3, this, arguments, new.target); }
function njIcsFile(events, name) { return __ZC(440, 4, this, arguments, new.target); }
function njAtTime(mins) { var d = new Date(); d.setHours(Math.floor(mins / 60), mins % 60, 0, 0); if (d.getTime() < Date.now())
d.setDate(d.getDate() + 1); return d; }
function njMorningIcs() { return __ZC(440, 5, this, arguments, new.target); }
function njMorningCard() { return __ZC(440, 6, this, arguments, new.target); }
function njMorningTick() {
var c = njCfg(), R = c.remind;
if (!R.on)
return;
var now = new Date(), mins = now.getHours() * 60 + now.getMinutes(), at = njMinutes(R.time), day = njDay(now);
if (c.rang === day || mins < at || mins > at + 240)
return;
if (njWroteToday()) {
c.rang = day;
njSave();
return;
}
var hidden = document.hidden;
if (hidden && R.buzz) {
c.rang = day;
njSave();
njNotify("What did you dream?", "Write it down before it fades. Tap to open your journal.", "somnu-morning");
return;
}
if (!hidden && njMorningCard()) {
c.rang = day;
njSave();
}
}
NJ_PAINT.push(function () {
var b = njBody("nj-morning");
if (!b)
return;
var R = njCfg().remind;
njSetText("nj-m-state", R.on ? ("every morning at " + R.time) : "off");
if (!b.firstChild) {
b.innerHTML = '<p>Most dreams are gone within minutes of waking. At the time you set, the game asks <i>"What did you dream?"</i> and opens straight to the writing box.</p>' +
'<div class="nj-row"><label class="j-check" style="margin:0"><input type="checkbox" id="nj-m-on"> Remind me each morning at</label> <input type="time" id="nj-m-time" aria-label="reminder time"></div>' +
'<div class="nj-row"><label class="j-check" style="margin:0"><input type="checkbox" id="nj-m-buzz"> Let this device buzz while the game is open</label></div>' +
'<div class="nj-row"><button type="button" class="nj-btn" id="nj-m-ics">⏰ Add to my phone\'s alarms</button><button type="button" class="nj-btn" id="nj-m-try">Try it now</button></div>' +
'<p class="nj-dim">When the game is shut, the game itself can\'t ring. <b>Add to my phone\'s alarms</b> puts a daily alarm on your phone\'s (or computer\'s) own calendar: it rings at your time whether the game is open or not, and a tap opens the journal.</p>';
var on = document.getElementById("nj-m-on"), tm = document.getElementById("nj-m-time"), bz = document.getElementById("nj-m-buzz");
on.onchange = function () {
R.on = on.checked;
if (R.on) {
var nw = new Date();
njCfg().rang = (nw.getHours() * 60 + nw.getMinutes() >= njMinutes(R.time)) ? njDay() : "";
}
njSave();
njPaint();
njSay(R.on ? "<b>Morning reminder on</b> at " + njE(R.time) + ". Add it to your phone's alarms too, so it rings when the game is shut." : "Morning reminder off.");
};
tm.onchange = function () { if (/^\d{2}:\d{2}$/.test(tm.value)) {
R.time = tm.value;
njSave();
njPaint();
} };
bz.onchange = function () {
if (bz.checked)
njAskBuzz().then(function (ok) { R.buzz = ok; bz.checked = ok; njSave(); });
else {
R.buzz = false;
njSave();
}
};
document.getElementById("nj-m-ics").onclick = njMorningIcs;
document.getElementById("nj-m-try").onclick = function () {
if (R.buzz)
njNotify("What did you dream?", "This is how the morning reminder looks. Tap to open your journal.", "somnu-morning-try");
if (typeof closeJournal === "function")
closeJournal();
setTimeout(njMorningCard, 300);
};
}
document.getElementById("nj-m-on").checked = !!R.on;
document.getElementById("nj-m-time").value = R.time;
document.getElementById("nj-m-buzz").checked = !!R.buzz && typeof Notification !== "undefined" && Notification.permission === "granted";
});
(function () {
setInterval(function () { try {
njMorningTick();
}
catch (e) {
njWarn("morning", e);
} }, 30000);
setTimeout(function () { try {
njMorningTick();
}
catch (e) { } }, 20000);
document.addEventListener("visibilitychange", function () { if (!document.hidden)
setTimeout(function () { try {
njMorningTick();
}
catch (e) { } }, 3000); });
})();
var NJ_OFF = { owedKey: "owed", syncKey: "syncowed", draftKey: "draft", restored: false, syncing: false };
function njOwedKeep() {
if (typeof AI_OWED === "undefined" || njVisiting())
return;
try {
njPut(NJ_OFF.owedKey, AI_OWED.length ? AI_OWED.map(function (j) { return { n: j.n, text: String(j.text || "").slice(0, 60000), tries: Math.min(+j.tries || 0, 6) }; }) : null);
}
catch (e) { }
}
function njOwedRestore() {
if (NJ_OFF.restored || typeof AI_OWED === "undefined" || typeof nightRecord !== "function" || njVisiting())
return;
NJ_OFF.restored = true;
var kept = njGet(NJ_OFF.owedKey, null);
if (!kept || !kept.length)
return;
var added = 0;
kept.forEach(function (j) {
if (!j || !nightRecord(j.n) || !String(j.text || "").trim())
return;
if (AI_OWED.some(function (x) { return x.n === j.n; }))
return;
AI_OWED.push({ n: j.n, text: j.text, tries: +j.tries || 0, inflight: false, at: 0 });
added++;
});
if (added && typeof scheduleParse === "function" && njOnline())
scheduleParse(4000);
}
(function () {
if (typeof AI_OWED === "undefined")
return;
["push", "shift", "splice", "unshift"].forEach(function (m) {
var f = Array.prototype[m];
AI_OWED[m] = function () { var r = f.apply(this, arguments); njOwedKeep(); return r; };
});
})();
function njSyncWanted() {
return typeof syncOn === "function" && syncOn() && njSigned() && !(typeof vaultLocked === "function" && vaultLocked()) && !(typeof hasAccess === "function" && !hasAccess());
}
function njSyncOwed() { return !!njGet(NJ_OFF.syncKey, false); }
function njSyncTry() {
if (!njSyncOwed() || NJ_OFF.syncing || njVisiting() || !njOnline() || !njSyncWanted() || typeof keepToAccount !== "function")
return;
NJ_OFF.syncing = true;
keepToAccount(true).then(function (ok) { if (ok !== null)
njPut(NJ_OFF.syncKey, null); })
.catch(function () { }).then(function () { NJ_OFF.syncing = false; njPaint(); });
}
(function () {
if (typeof syncAfterNight !== "function")
return;
var sa = syncAfterNight;
syncAfterNight = function () {
if (njSyncWanted())
njPut(NJ_OFF.syncKey, Date.now());
if (!njOnline())
return;
var r = sa.apply(this, arguments);
setTimeout(njSyncTry, 9000);
return r;
};
if (typeof keepToAccount === "function") {
var kt = keepToAccount;
keepToAccount = function () {
var p = kt.apply(this, arguments);
if (p && p.then)
p.then(function (ok) { if (ok === true)
njPut(NJ_OFF.syncKey, null); }).catch(function () { });
return p;
};
}
})();
function njDraftKeep() { return __ZC(440, 7, this, arguments, new.target); }
(function () {
function hook() {
var t = document.getElementById("story-text"), h = document.getElementById("story-title");
if (!t)
return;
var tm = null, later = function () { clearTimeout(tm); tm = setTimeout(njDraftKeep, 400); };
t.addEventListener("input", later);
if (h)
h.addEventListener("input", later);
document.addEventListener("visibilitychange", function () { if (document.hidden)
njDraftKeep(); });
window.addEventListener("pagehide", function () { njDraftKeep(); njOwedKeep(); });
if (typeof closeStory === "function") {
var cs = closeStory;
closeStory = function () { try {
njDraftKeep();
}
catch (e) { } return cs.apply(this, arguments); };
var sc = document.getElementById("story-close");
if (sc)
sc.addEventListener("click", function () { njDraftKeep(); }, true);
}
if (typeof openStory === "function") {
var os = openStory;
openStory = function () {
var r = os.apply(this, arguments);
var d = njGet(NJ_OFF.draftKey, null);
if (d && d.text && !t.value.trim() && !njVisiting()) {
t.value = d.text;
if (h && d.title)
h.value = d.title;
if (typeof updateStoryCount === "function")
try {
updateStoryCount();
}
catch (e) { }
njSay("<b>Your unfinished dream is back</b>, just as you left it " + njE(new Date(d.at).toLocaleString()) + ".");
}
return r;
};
["storybtn", "writebtn"].forEach(function (id) {
var b = document.getElementById(id);
if (b)
b.addEventListener("click", function () {
setTimeout(function () {
var d = njGet(NJ_OFF.draftKey, null);
if (d && d.text && !t.value.trim() && !njVisiting()) {
t.value = d.text;
if (h && d.title)
h.value = d.title;
if (typeof updateStoryCount === "function")
try {
updateStoryCount();
}
catch (e) { }
}
}, 0);
});
});
}
}
if (document.readyState === "loading")
document.addEventListener("DOMContentLoaded", hook);
else
setTimeout(hook, 0);
})();
(function () {
if (typeof closeNight !== "function")
return;
var cn = closeNight;
closeNight = function () {
var rec = cn.apply(this, arguments);
if (rec && !njVisiting()) {
njPut(NJ_OFF.draftKey, null);
var st = document.getElementById("story-text"), sh = document.getElementById("story-title");
if (st)
st.value = "";
if (sh)
sh.value = "";
njOwedKeep();
if (!njOnline())
setTimeout(function () {
njCard("nj-offline-card", "<b>📶 Saved on this device.</b> There's no signal just now, so your dream is kept here, sealed. The AI will finish building it, and it will go up to your account, as soon as you're back online.", [["OK", null]], 20000);
}, 1600);
setTimeout(function () { try {
if (typeof njSharedSend === "function")
njSharedSend();
}
catch (e) { } }, 2500);
}
return rec;
};
})();
NJ_PAINT.push(function () {
var tl = document.getElementById("j-tally");
if (!tl)
return;
var w = document.getElementById("nj-wait");
if (!w) {
w = document.createElement("span");
w.id = "nj-wait";
tl.appendChild(w);
}
if (!tl.contains(w))
tl.appendChild(w);
var n = typeof AI_OWED !== "undefined" ? AI_OWED.length : 0, s = njSyncOwed() && njSyncWanted();
w.innerHTML = (!njOnline() && (n || s)) ? ("📶 <b>" + (n || 1) + "</b> waiting for signal") : (n ? ("<b>" + n + "</b> still being read by the AI") : "");
w.style.display = w.innerHTML ? "" : "none";
});
(function () {
window.addEventListener("online", function () { setTimeout(function () { njSyncTry(); if (typeof AI_OWED !== "undefined" && AI_OWED.length && typeof scheduleParse === "function")
scheduleParse(2500); njPaint(); }, 3000); });
window.addEventListener("offline", function () { njPaint(); });
var go = function () { setTimeout(function () { try {
njOwedRestore();
njSyncTry();
}
catch (e) {
njWarn("offline", e);
} }, 12000); };
if (document.readyState === "complete")
go();
else
window.addEventListener("load", go);
setInterval(function () { try {
njSyncTry();
}
catch (e) { } }, 5 * 60 * 1000);
})();
var NJA = { open: false, sel: null, busy: false, msg: "", hit: [], geo: null };
var NJ_BEINGS = { human: 1, child: 1, crowd: 1, shadow: 1, creature: 1, deity: 1, dragon: 1, dog: 1, cat: 1, horse: 1, bird: 1 };
function njOwnRealmOk(o) {
if (!o || o.filler || o.city || o.hub || o.deity || o.summoned)
return false;
try {
var sr = typeof somnucorRealm === "function" ? somnucorRealm() : null;
if (sr && (o.realm || 0) === sr.id)
return false;
}
catch (e) { }
try {
var hr = typeof hallRealm === "function" ? hallRealm() : null;
if (hr && (o.realm || 0) === hr.id)
return false;
}
catch (e) { }
return true;
}
function njNightsOf(list) {
var sealed = {};
njSessions().forEach(function (r) { sealed[r.n] = 1; });
var seen = {}, out = [];
(list || []).forEach(function (n) { if (sealed[n] && !seen[n]) {
seen[n] = 1;
out.push(n);
} });
return out.sort(function (a, b) { return a - b; });
}
function njNameOf(o) {
try {
if (typeof placeName === "function") {
var p = placeName(o);
if (p)
return String(p);
}
}
catch (e) { }
return String(o.label || o.name || o.archetype || "a place");
}
function njArchName(k) { return __ZC(440, 8, this, arguments, new.target); }
var NJG = { sig: "", at: 0, list: [], by: {} };
function njGroups() {
if (typeof store === "undefined" || njVisiting())
return [];
var sig = (store.objects || []).length + "|" + njSessions().length;
if (sig === NJG.sig && performance.now() - NJG.at < 3000)
return NJG.list;
var by = {};
(store.objects || []).forEach(function (o) {
if (!njOwnRealmOk(o) || !o.nights || o.charId)
return;
var k = KIT[o.archetype];
if (!k || k.cat === "being" || k.cat === "infra" && !/^(bridge|stairs|tunnel|gate|fountain|well|portal|secretdoor|impossiblestair|statue)$/.test(o.archetype))
return;
if (o.workplace || o.eyrie || o.xpAnnex || /^(shore|grass|road|sidewalk|driveway|citypad|parking)$/.test(o.archetype))
return;
var key = o.archetype + "@" + (o.realm || 0), G = by[key] || (by[key] = { rep: o, nights: [], first: 1e9 });
var ns = njNightsOf(o.nights);
if (!ns.length)
return;
ns.forEach(function (n) { if (G.nights.indexOf(n) < 0)
G.nights.push(n); });
if (o.atlas || ns[0] < G.first && !G.rep.atlas) {
G.rep = o;
G.first = ns[0];
}
});
var list = Object.keys(by).map(function (k) { var G = by[k]; G.nights.sort(function (a, b) { return a - b; }); return G; });
NJG.sig = sig;
NJG.at = performance.now();
NJG.list = list;
NJG.by = {};
list.forEach(function (G) { NJG.by[G.rep.id] = G.nights.length; });
return list;
}
function njRecurring() { return __ZC(440, 9, this, arguments, new.target); }
function njDreamSigns(max) { return __ZC(440, 10, this, arguments, new.target); }
function njAtlasAsk() { return __ZC(440, 11, this, arguments, new.target); }
function njAtlasMsg(h) { NJA.msg = h; var el = document.getElementById("nja-msg"); if (el)
el.innerHTML = h; }
function njFindBuilt(name) { return __ZC(440, 12, this, arguments, new.target); }
function njMakeLasting(item) { return __ZC(440, 13, this, arguments, new.target); }
function njWalkTo(x, z, realm, name) { return __ZC(440, 14, this, arguments, new.target); }
function njAtlasOpen() { return __ZC(440, 15, this, arguments, new.target); }
function njAtlasClose() { NJA.open = false; var d = document.getElementById("nja"); if (d)
d.classList.remove("on"); }
function njNightsText(ns) { ns = ns || []; if (typeof ns === "number")
return ns + " nights"; return ns.length + " nights (" + ns.slice(0, 8).map(function (n) { return "#" + n; }).join(", ") + (ns.length > 8 ? "…" : "") + ")"; }
function njAtlasPaint() { return __ZC(440, 16, this, arguments, new.target); }
function njAtlasSel() { return __ZC(440, 17, this, arguments, new.target); }
function njAtlasMap(R) { return __ZC(440, 18, this, arguments, new.target); }
function njGrowKit() { return __ZC(440, 19, this, arguments, new.target); }
function njGrowNights(spec) {
if (!spec || !spec.nights || njVisiting() || !njOwnRealmOk(spec))
return 0;
var k = KIT[spec.archetype];
if (!k || k.cat !== "structure")
return 0;
if (spec.workplace || spec.eyrie || spec.xpAnnex)
return 0;
njGroups();
return NJG.by[spec.id] || 0;
}
function njGrow(spec, grp) { return __ZC(440, 20, this, arguments, new.target); }
(function () {
if (typeof addMesh !== "function")
return;
var am = addMesh;
addMesh = function (spec) {
var r = am.apply(this, arguments);
try {
if (spec && !spec.filler && !spec.city && typeof meshes !== "undefined" && meshes[spec.id] && njGrowNights(spec) >= 2)
njGrow(spec, meshes[spec.id]);
}
catch (e) {
njWarn("grow", e);
}
return r;
};
setInterval(function () {
try {
if (njVisiting() || typeof meshes === "undefined" || typeof refresh !== "function")
return;
njGroups().forEach(function (G) {
var o = G.rep, g = meshes[o.id];
if (!g || KIT[o.archetype].cat !== "structure")
return;
var want = G.nights.length >= 2 ? G.nights.length : 0, have = 0;
g.children.forEach(function (c) { if (c.name === "nj-grow")
have = c.userData.njGrow; });
if (want !== have)
refresh(o);
});
}
catch (e) {
njWarn("regrow", e);
}
}, 5000);
if (typeof dreamscapeText === "function") {
var dt = dreamscapeText;
dreamscapeText = function () {
var s = dt.apply(this, arguments);
if (!store.atlas && !store.lucidTrain)
return s;
try {
var o = JSON.parse(s);
if (o && o.store) {
if (store.atlas)
o.store.atlas = store.atlas;
if (store.lucidTrain)
o.store.lucidTrain = store.lucidTrain;
return JSON.stringify(o);
}
}
catch (e) { }
return s;
};
}
})();
NJ_PAINT.push(function () {
var b = njBody("nj-atlas");
if (!b)
return;
var R = njRecurring(), n = R.places.length + R.people.length + R.things.length;
njSetText("nj-a-state", n ? (n + " things keep coming back") : "nothing has come back twice yet");
if (!b.firstChild) {
b.innerHTML = '<p>The people, places and things that keep coming back, drawn as a map of your inner world. A place you dream again and again grows each time you return to it.</p>' +
'<div class="nj-row"><button type="button" class="nj-btn" id="nj-a-open">🗺️ Open my dream atlas</button></div><div id="nj-a-sum" class="nj-dim"></div>';
document.getElementById("nj-a-open").onclick = njAtlasOpen;
}
var top = R.places.slice(0, 3).map(function (x) { return x.name; }).concat(R.people.slice(0, 2).map(function (x) { return x.name; }));
document.getElementById("nj-a-sum").innerHTML = top.length ? ("Most often: " + top.map(njE).join(", ") + ".") : "";
});
var NJS = { now: null, at: 0, missing: false, busy: false, spot: null, g: null, near: false, prompt: null, inside: null, t: 0, sentAt: 0 };
var NJ_EVENT_KIT = { flood: "flood", fire: "fire", storm: "stormcloud", earthquake: "fissure", collapse: "ruin", crash: "crater", death: "graveyard",
conflict: "banner", falling: "impossiblestair", pursuit: "shadow", crowd: "crowd", darkness: "wisps" };
var NJ_SIGN_BEINGS = { dog: 1, cat: 1, horse: 1, bird: 1, dragon: 1, creature: 1, shadow: 1 };
var NJ_EVENT_NAME = { flood: "a flood", fire: "fire", storm: "a storm", earthquake: "the ground shaking", collapse: "something collapsing", crash: "a crash", illness: "sickness",
death: "death", conflict: "war", falling: "falling", pursuit: "being chased", darkness: "the dark", crowd: "a crowd", explosion: "a blast" };
function njSignName(s) { if (NJ_EVENT_NAME[s])
return NJ_EVENT_NAME[s]; var n = njArchName(s); return (/^[aeiou]/i.test(n) ? "an " : "a ") + n; }
function njSignsOf(r) { return __ZC(440, 21, this, arguments, new.target); }
function njSharedOn() { return njCfg().share !== false; }
function njSharedSend() {
if (!njSharedOn() || !njSigned() || njVisiting() || NJS.missing || !njOnline() || typeof cityRpc !== "function")
return;
if (Date.now() - NJS.sentAt < 15000)
return;
var cut = Date.now() - 40 * 3600 * 1000;
var due = njSessions().filter(function (r) {
if (r.njShared)
return false;
var t = Date.parse(r.sealedAt || "");
if (!(t > cut))
return false;
return !(typeof AI_OWED !== "undefined" && AI_OWED.some(function (j) { return j.n === r.n; }));
});
if (!due.length)
return;
NJS.sentAt = Date.now();
var i = 0, next = function () {
if (i >= due.length)
return;
var r = due[i++], signs = njSignsOf(r);
if (!signs.length) {
r.njShared = 1;
if (typeof save === "function")
save();
return next();
}
cityRpc("sn_add", { p_night: njSealedDay(r), p_signs: signs }).then(function (o) {
if (o && o.ok === false && o.off)
return;
r.njShared = 1;
if (typeof save === "function")
save();
next();
}).catch(function (e) { var m = String((e && e.message) || e || ""); if (/function|404|PGRST|does not exist/i.test(m))
NJS.missing = true; });
};
next();
}
function njSharedFetch() {
if (!njSigned() || NJS.missing || NJS.busy || typeof cityRpc !== "function" || !njOnline())
return;
NJS.busy = true;
cityRpc("sn_now", {}).then(function (o) { NJS.busy = false; NJS.at = Date.now(); NJS.now = (o && o.ok && !o.off && Array.isArray(o.signs)) ? o : (o && o.ok ? { signs: [], off: !!o.off, dreamers: o.dreamers || 0 } : null); njPaint(); })
.catch(function (e) { NJS.busy = false; var m = String((e && e.message) || e || ""); if (/function|404|PGRST|does not exist/i.test(m))
NJS.missing = true; });
}
function njSharedOpen() { return !!(NJS.now && NJS.now.signs && NJS.now.signs.length); }
function njSharedTitle() { return njSharedOpen() ? NJS.now.signs.slice(0, 3).map(function (s) { return njSignName(s.sign); }).join(", ") : ""; }
function njSharedSpot() { return __ZC(440, 22, this, arguments, new.target); }
function njSharedMesh() { return __ZC(440, 23, this, arguments, new.target); }
function njSharedPrompt() { return __ZC(440, 24, this, arguments, new.target); }
function njSharedTick(dt) {
var inCity = typeof inCityNow === "function" && inCityNow() && !store.inside && !njVisiting() && !(typeof WLD !== "undefined" && WLD && WLD.on);
var show = inCity && njSharedOpen(), g = NJS.g;
if (!show) {
if (g && g.parent)
g.parent.remove(g);
if (NJS.near) {
NJS.near = false;
if (NJS.prompt)
NJS.prompt.style.display = "none";
}
return;
}
var sp = njSharedSpot();
if (!sp)
return;
g = njSharedMesh();
if (g.parent !== scene)
scene.add(g);
var y = 0;
try {
y = typeof terrainY === "function" ? terrainY(sp.x, sp.z) || 0 : 0;
}
catch (e) { }
g.position.set(sp.x, y, sp.z);
var P = camera.position, t = performance.now() / 1000, U = g.userData;
U.ring.rotation.y = U.veil.rotation.y = Math.atan2(P.x - sp.x, P.z - sp.z);
U.veil.material.opacity = 0.34 + 0.14 * Math.sin(t * (Math.PI * 2 / 6));
U.moon.position.y = 5.9 + Math.sin(t * 0.6) * 0.25;
var near = Math.hypot(P.x - sp.x, P.z - sp.z) < 7.5;
if (near !== NJS.near) {
NJS.near = near;
var el = njSharedPrompt();
if (el) {
el.textContent = "🌙 Walk into the Shared Night (E)";
el.style.display = near ? "block" : "none";
}
}
}
function njSharedRand(seed) {
var h = 2166136261;
seed = String(seed);
for (var i = 0; i < seed.length; i++) {
h ^= seed.charCodeAt(i);
h = Math.imul(h, 16777619);
}
return function () { h += 0x6D2B79F5; var t = h; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}
function njSharedEnter() { return __ZC(440, 25, this, arguments, new.target); }
function njSharedHere() { return njVisiting() && !!visiting.sn && !store.inside; }
(function () {
if (typeof bcnList === "function") {
var bl = bcnList;
bcnList = function (W) {
var L = bl.apply(this, arguments);
try {
if (W && W.key === "city" && njSharedOpen() && !njVisiting()) {
var sp = njSharedSpot();
if (sp) {
var o = { id: "njsn", x: sp.x - W.ox, z: sp.z - W.oz, y: null, lift: 0, color: "#C69CFF", height: njLite() ? 110 : 170, width: 1.8, bright: 2, glow: true, swirl: true, fade: 0,
text: "🌙 The Shared Night", name: "The Shared Night: " + njSharedTitle() };
o.sig = [o.color, o.text, "s"].join("|");
L.push(o);
}
}
}
catch (e) { }
return L;
};
}
if (typeof transitTick === "function") {
var tt = transitTick;
transitTick = function (dt) { try {
return tt.apply(this, arguments);
}
finally {
try {
njSharedTick(dt);
}
catch (e) {
njWarn("shared", e);
}
} };
}
addEventListener("keydown", function (e) { if (e.code === "KeyE" && NJS.near && !njTyping() && !e.repeat) {
e.preventDefault();
njSharedEnter();
} });
if (typeof presenceSharedHere === "function") {
var ps = presenceSharedHere;
presenceSharedHere = function () { return njSharedHere() || ps.apply(this, arguments); };
}
if (typeof myPlace === "function") {
var mp = myPlace;
myPlace = function () {
if (njSharedHere())
return { place: "night:" + visiting.sn, level: 0, x: camera.position.x, z: camera.position.z };
return mp.apply(this, arguments);
};
}
if (typeof placeToWorld === "function") {
var pw = placeToWorld;
placeToWorld = function (row) {
if (row && /^night:/.test(row.place || "")) {
if (!njSharedHere() || row.place !== "night:" + visiting.sn)
return null;
return { x: row.x, y: (typeof terrainY === "function") ? terrainY(row.x, row.z) : 0, z: row.z };
}
return pw.apply(this, arguments);
};
}
if (typeof presenceTick === "function") {
var pt = presenceTick;
presenceTick = function () {
if (!njSharedHere())
return pt.apply(this, arguments);
var av = amVisiting;
amVisiting = function () { return false; };
try {
return pt.apply(this, arguments);
}
finally {
amVisiting = av;
}
};
}
if (typeof tempsPlan === "function") {
var tp = tempsPlan;
tempsPlan = function () { if (typeof store === "undefined" || !store.workplaceAt)
return; return tp.apply(this, arguments); };
}
setTimeout(function () { njSharedFetch(); njSharedSend(); }, 25000);
setInterval(function () { try {
njSharedFetch();
njSharedSend();
}
catch (e) { } }, 10 * 60 * 1000);
})();
NJ_PAINT.push(function () {
var b = njBody("nj-shared");
if (!b)
return;
var on = njSharedOn();
njSetText("nj-s-state", !on ? "off" : njSharedOpen() ? ("open now: " + njSharedTitle()) : "on");
if (!b.firstChild) {
b.innerHTML = '<p>When several dreamers dream of the same thing on the same night (a flood, a white horse, a door), it opens in Somnucor the next day as a shared dream everyone can walk into: a ring of moonlight in the Tower Plaza, under a violet beam.</p>' +
'<p class="nj-dim">Only the kind of thing in each dream is counted (the catalogue\'s own word, like "horse" or "flood"), never your words, names or places, and never who dreamt it. Nothing shows until enough different dreamers have dreamt it.</p>' +
'<label class="j-check"><input type="checkbox" id="nj-s-on"> Count my dreams in the shared night</label><div id="nj-s-now" class="nj-dim" style="margin-top:6px"></div>';
var cb = document.getElementById("nj-s-on");
cb.onchange = function () { njCfg().share = cb.checked; njSave(); njPaint(); if (cb.checked)
njSharedSend(); };
}
document.getElementById("nj-s-on").checked = on;
var nowEl = document.getElementById("nj-s-now");
nowEl.innerHTML = NJS.missing ? "The shared night opens with the next server update." :
njSharedOpen() ? ("<b>Open now</b> in the Tower Plaza: " + njE(njSharedTitle()) + ". " + (+NJS.now.dreamers > 1 ? NJS.now.dreamers + " dreamers wrote last night." : "")) :
(NJS.now && NJS.now.off ? "The Keeper has the shared night closed just now." : "Nothing shared yet from last night.");
});
var NJL_LEVELS = [[0, "Sleeper"], [20, "Noticer"], [60, "Questioner"], [150, "Lucid Dreamer"], [300, "Dream Walker"], [600, "Waking Dreamer"]];
var NJL_CHECKS = ["Look at your hands and count your fingers.", "Read a line of writing, look away, and read it again: does it stay the same?",
"Look at a clock, look away, and look back.", "Pinch your nose shut and try to breathe through it.", "Push a finger gently against your palm: does it go through?",
"Ask yourself how you got here. Can you remember the last few minutes?", "Flick a light switch. Does the light behave?"];
function njLucidData() {
if (typeof store === "undefined" || njVisiting())
return { checks: 0, days: {} };
if (!store.lucidTrain || typeof store.lucidTrain !== "object")
store.lucidTrain = { checks: 0, days: {} };
if (!store.lucidTrain.days)
store.lucidTrain.days = {};
return store.lucidTrain;
}
function njLucidScore() { return __ZC(440, 26, this, arguments, new.target); }
function njLucidCheckDone() { return __ZC(440, 27, this, arguments, new.target); }
function njLucidPingText() { return __ZC(440, 28, this, arguments, new.target); }
function njLucidPing(force) { return __ZC(440, 29, this, arguments, new.target); }
function njLucidTick() {
var c = njCfg(), L = c.lucid;
if (!L.on || !L.every)
return;
var now = new Date(), h = now.getHours();
if (h < (L.from || 9) || h >= (L.to || 21))
return;
if (!c.pinged) {
c.pinged = Date.now();
njSave();
return;
}
if (Date.now() - c.pinged < L.every * 60000)
return;
var sent = false;
if (document.hidden) {
if (c.remind.buzz) {
njNotify("Are you dreaming?", NJL_CHECKS[Math.floor(Math.random() * NJL_CHECKS.length)], "somnu-lucid");
sent = true;
}
}
else
sent = njLucidPing(false);
if (sent) {
c.pinged = Date.now();
njSave();
}
}
function njLucidIcs() { return __ZC(440, 30, this, arguments, new.target); }
function njLucidHtml() { return __ZC(440, 31, this, arguments, new.target); }
NJ_PAINT.push(function () {
var b = njBody("nj-lucid");
if (!b)
return;
var L = njCfg().lucid, S = njLucidScore();
njSetText("nj-l-state", S.name + ", " + S.pts + " points");
if (!b.firstChild) {
b.innerHTML = '<div id="nj-l-score"></div>' +
'<p>Reality checks through the waking day become a habit, and the habit follows you into your dreams. Your dream signs, taken from your own entries: <span id="nj-l-signs" class="nj-dim"></span></p>' +
'<div class="nj-row"><label class="j-check" style="margin:0"><input type="checkbox" id="nj-l-on"> Ask me "Are you dreaming?" while I play, every</label> ' +
'<select id="nj-l-every" aria-label="how often"><option value="45">45 minutes</option><option value="90">90 minutes</option><option value="120">2 hours</option><option value="180">3 hours</option></select></div>' +
'<div class="nj-row"><button type="button" class="nj-btn" id="nj-l-now">👁️ Do a reality check now</button><button type="button" class="nj-btn" id="nj-l-ics">⏰ Add the pings to my phone</button></div>' +
'<p class="nj-dim">Only between 9 in the morning and 9 at night, never in the headset, and never while you are typing. Writing a lucid dream down counts the most.</p>';
var on = document.getElementById("nj-l-on"), ev = document.getElementById("nj-l-every");
on.onchange = function () { L.on = on.checked; njSave(); njPaint(); };
ev.onchange = function () { L.every = +ev.value || 120; njSave(); };
document.getElementById("nj-l-now").onclick = function () { if (typeof closeJournal === "function")
closeJournal(); setTimeout(function () { njLucidPing(true); }, 300); };
document.getElementById("nj-l-ics").onclick = njLucidIcs;
}
document.getElementById("nj-l-score").innerHTML = njLucidHtml();
document.getElementById("nj-l-on").checked = !!L.on;
document.getElementById("nj-l-every").value = String(L.every || 120);
var sg = njDreamSigns(6);
document.getElementById("nj-l-signs").textContent = sg.length ? sg.join(", ") + "." : "none yet: they come from things that return in your dreams.";
});
(function () {
setInterval(function () { try {
njLucidTick();
}
catch (e) {
njWarn("lucid", e);
} }, 60000);
if (typeof openPowers === "function") {
var op = openPowers;
openPowers = function () {
var r = op.apply(this, arguments);
try {
var p = document.getElementById("pd-powers");
if (p && p.style.display !== "none" && !njVisiting()) {
var s = document.getElementById("nj-pw-lucid");
if (!s) {
s = document.createElement("div");
s.id = "nj-pw-lucid";
s.style.cssText = "margin-top:12px;padding-top:10px;border-top:1px solid #3A3460;font:14px/1.5 system-ui,sans-serif;color:#EDE8F8";
}
njStyle();
s.innerHTML = '<div style="color:#C8B8F8;margin-bottom:4px">👁️ Lucid training</div>' + njLucidHtml();
p.appendChild(s);
}
}
catch (e) {
njWarn("powers", e);
}
return r;
};
}
})();
