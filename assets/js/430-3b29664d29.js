/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var YTM = { orig: {}, label0: {} };
var YTM_D = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], YTM_M = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
function ytmMine() { try {
return (typeof cfg === "function" ? cfg() : {}).timeMine !== false;
}
catch (e) {
return true;
} }
function ytmZone(ms) {
try {
var p = new Intl.DateTimeFormat(undefined, { timeZoneName: "short" }).formatToParts(new Date(ms || Date.now()));
for (var i = 0; i < p.length; i++)
if (p[i].type === "timeZoneName")
return p[i].value;
}
catch (e) { }
return "";
}
function ytmInArizona() {
try {
var z = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
if (z === "America/Phoenix")
return true;
}
catch (e) { }
var j = new Date(2026, 0, 1).getTimezoneOffset(), u = new Date(2026, 6, 1).getTimezoneOffset();
return j === 420 && u === 420;
}
function ytmLabel() { var z = ytmZone(); return "your time" + (z ? " (" + z + ")" : ""); }
function ytmClock(ms, day) {
var d = new Date(ms), h = d.getHours(), mi = d.getMinutes();
return (day ? YTM_D[d.getDay()] + " " + d.getDate() + " " + YTM_M[d.getMonth()] + ", " : "") + ((h + 11) % 12 + 1) + ":" + (mi < 10 ? "0" : "") + mi + (h < 12 ? " am" : " pm");
}
function ytmApply() {
var mine = ytmMine() && !ytmInArizona(), lab = ytmLabel();
function swap(name, fn) { if (typeof window[name] !== "function")
return; if (!YTM.orig[name])
YTM.orig[name] = window[name]; window[name] = mine ? fn : YTM.orig[name]; }
swap("otmSpClock", function (ms) { return ytmClock(ms, true); });
swap("scpClock", function (ms, day) { return ytmClock(ms, day); });
swap("scpLocal", function () { return ""; });
swap("sptWhen", function (ms) {
var d = new Date(ms), h = d.getHours(), mi = d.getMinutes();
return YTM_D[d.getDay()] + " " + YTM_M[d.getMonth()] + " " + d.getDate() + ", " + (h % 12 || 12) + (mi ? ":" + ("0" + mi).slice(-2) : "") + (h < 12 ? " am" : " pm") + " " + lab;
});
["OTM_SP_TZ", "SCP_TZ"].forEach(function (v) { if (typeof window[v] !== "string")
return; if (!(v in YTM.label0))
YTM.label0[v] = window[v]; window[v] = mine ? lab : YTM.label0[v]; });
YTM.mine = mine;
}
(function () { function go() { try {
ytmApply();
}
catch (e) { } } if (document.readyState === "loading")
document.addEventListener("DOMContentLoaded", go);
else
go(); })();
"use strict";
var EZA = { capT: null, shook: false };
var EZA_CB = {
deu: "1 0 0 0 0 0.163 0.725 0.112 0 0 0.455 -0.645 1.191 0 0 0 0 0 1 0",
pro: "1 0 0 0 0 0.479 0.477 0.044 0 0 0.597 -0.689 1.091 0 0 0 0 0 1 0",
tri: "0.871 -0.204 0.333 0 0 0.038 0.793 0.170 0 0 0 0 1 0 0 0 0 0 1 0"
};
function ezaCfg() {
var c = {};
try {
c = typeof cfg === "function" ? cfg() : {};
}
catch (e) { }
var calm0 = false;
try {
calm0 = matchMedia("(prefers-reduced-motion: reduce)").matches;
}
catch (e) { }
return { text: c.ezaText || "1", cap: c.ezaCap === true, calm: c.ezaCalm == null ? calm0 : c.ezaCalm === true, cb: c.ezaCb || "", timeMine: c.timeMine !== false };
}
function ezaSave(k, v) { try {
var c = cfg();
c[k] = v;
setCfg(c);
}
catch (e) { } ezaApply(); }
function ezaApply() {
var o = ezaCfg(), b = document.body;
if (!b)
return;
b.classList.toggle("eza-t1", o.text === "2");
b.classList.toggle("eza-t2", o.text === "3");
b.classList.toggle("eza-calm", o.calm);
var w = document.getElementById("world");
if (w)
w.style.filter = o.cb && EZA_CB[o.cb] ? "url(#eza-cb-" + o.cb + ")" : "";
EZA.calm = o.calm;
ezaShakeGuard();
if (!o.cap)
ezaCapHide();
if (typeof ytmApply === "function")
ytmApply();
}
(function () {
var st = document.createElement("style");
st.id = "eza-css";
st.textContent = "body.eza-t1>*:not(#world):not(script):not(style){zoom:1.15}body.eza-t2>*:not(#world):not(script):not(style){zoom:1.3}" +
"body.eza-calm *,body.eza-calm *::before,body.eza-calm *::after{animation-duration:.001s!important;animation-iteration-count:1!important;transition-duration:.001s!important;scroll-behavior:auto!important}" +
"#eza-cap{position:fixed;left:50%;bottom:16%;transform:translateX(-50%);z-index:70;max-width:min(720px,calc(100vw - 32px));padding:8px 14px;border-radius:8px;" +
"background:rgba(0,0,0,.82);color:#FFF;font:600 17px/1.4 var(--sans,system-ui);text-align:center;pointer-events:none;display:none}";
document.head.appendChild(st);
var ns = "http://www.w3.org/2000/svg", svg = document.createElementNS(ns, "svg");
svg.setAttribute("width", "0");
svg.setAttribute("height", "0");
svg.setAttribute("aria-hidden", "true");
svg.style.position = "absolute";
Object.keys(EZA_CB).forEach(function (k) {
var f = document.createElementNS(ns, "filter");
f.id = "eza-cb-" + k;
f.setAttribute("color-interpolation-filters", "sRGB");
var m = document.createElementNS(ns, "feColorMatrix");
m.setAttribute("type", "matrix");
m.setAttribute("values", EZA_CB[k]);
f.appendChild(m);
svg.appendChild(f);
});
function put() { document.body.appendChild(svg); ezaApply(); }
if (document.body)
put();
else
document.addEventListener("DOMContentLoaded", put);
})();
function ezaShakeGuard() {
if (EZA.shook)
return;
EZA.shook = true;
["TRF", "ORB", "SPB"].forEach(function (n) {
var o = window[n];
if (!o || typeof o !== "object")
return;
var v = o.shake || 0;
try {
Object.defineProperty(o, "shake", { configurable: true, enumerable: true, get: function () { return EZA.calm ? 0 : v; }, set: function (x) { v = x; } });
}
catch (e) { }
});
}
function ezaCapShow(text) { return __ZC(430, 0, this, arguments, new.target); }
function ezaCapHide() { var el = document.getElementById("eza-cap"); if (el)
el.style.display = "none"; }
(function () {
try {
if (typeof speechSynthesis === "undefined" || !speechSynthesis)
return;
var P = Object.getPrototypeOf(speechSynthesis), sp = P && P.speak;
if (typeof sp !== "function")
return;
P.speak = function (u) {
try {
if (ezaCfg().cap && u && u.text) {
ezaCapShow(u.text);
u.addEventListener("end", function () { setTimeout(ezaCapHide, 900); });
}
}
catch (e) { }
return sp.apply(this, arguments);
};
}
catch (e) { }
})();
function ezaSetHtml() { return __ZC(430, 1, this, arguments, new.target); }
function ezaSetMount() { return __ZC(430, 2, this, arguments, new.target); }
(function () {
if (typeof openPanel !== "function")
return;
var op = openPanel;
openPanel = function () { var r = op.apply(this, arguments); try {
ezaSetMount();
}
catch (e) { } return r; };
})();
function ezaOpen() { if (typeof openPanel !== "function")
return; openPanel(); var el = document.getElementById("eza-set"); if (el && el.scrollIntoView)
el.scrollIntoView({ block: "start" }); }
(function () {
try {
if (typeof PS_EXTRAS !== "undefined")
PS_EXTRAS.push({ id: "me-ease", label: "♿ Easier to see and hear", run: ezaOpen });
if (typeof PS_SECTIONS !== "undefined")
PS_SECTIONS.forEach(function (s) { if (s.k === "help" && s.ids.indexOf("me-ease") < 0)
s.ids.push("me-ease"); });
}
catch (e) { }
})();
"use strict";
var ACV = { open: false, tab: "badges", d: null, dirty: {}, syncT: null, synced: false, noServer: false, lastWorld: null };
var ACV_KEY = "sm_achievements_v1";
var ACV_LIST = [
["dream1", "📓", "First Dream", "Write a dream in your journal.", 1, "dream"],
["dream10", "📚", "Dream Keeper", "Write 10 dreams.", 10, "dream"],
["dream50", "🌙", "Night Scribe", "Write 50 dreams.", 50, "dream"],
["dream100", "✨", "Dream Walker", "Write 100 dreams.", 100, "dream"],
["world1", "🚪", "Through the Door", "Walk into another world.", 1, "worlds"],
["world5", "🧭", "Wanderer", "Walk in 5 different worlds.", 5, "worlds"],
["world10", "🗺️", "Far Traveller", "Walk in 10 different worlds.", 10, "worlds"],
["world20", "🌌", "Atlas Walker", "Walk in 20 different worlds.", 20, "worlds"],
["talk1", "💬", "Hello There", "Talk with one of the city's people.", 1, "people"],
["talk10", "🤝", "Friendly Face", "Talk with 10 different people.", 10, "people"],
["talk50", "🏙️", "Known Around Town", "Talk with 50 different people.", 50, "people"],
["call1", "📞", "On the Line", "Make a phone call.", 1, "call"],
["emote1", "💃", "Say It Without Words", "Use an emote.", 1, "emote"],
["photo1", "📷", "Snapshot", "Take a photo.", 1, "photo"],
["photo25", "🖼️", "Album Full", "Take 25 photos.", 25, "photo"],
["shift1", "⏱️", "First Shift", "Clock in at a job.", 1, "clock_in"],
["shift25", "🏅", "Steady Worker", "Clock in 25 times.", 25, "clock_in"],
["shift100", "🏆", "Pillar of the City", "Clock in 100 times.", 100, "clock_in"],
["task10", "🔨", "Hands On", "Finish 10 work tasks.", 10, "task"],
["school1", "🎓", "Top of the Class", "Pass a lesson at school.", 1, "school_pass"],
["school10", "📐", "Scholar", "Pass 10 lessons.", 10, "school_pass"],
["academy1", "🪄", "First Spell", "Learn something at an academy.", 1, "academy_learn"],
["gather1", "🌿", "Gatherer", "Gather something with a skill.", 1, "skill_gather"],
["craft1", "🧵", "Maker", "Craft something with a skill.", 1, "skill_craft"],
["harvest1", "🍎", "Green Thumb", "Harvest in the Greenwold.", 1, "green_harvest"],
["mine1", "⛏️", "Down the Mine", "Work the ground.", 1, "work_the_ground"],
["home1", "🏡", "A Place of My Own", "Buy a lot or take a lease.", 1, "home"],
["biz1", "🏪", "Open for Business", "Open a business.", 1, "open_business"],
["bank1", "🏦", "Saver", "Put gold in the bank.", 1, "bank_deposit"],
["trade1", "🔄", "Fair Trade", "Offer a trade to another dreamer.", 1, "offer_trade"],
["letter1", "✉️", "Dear Friend", "Send a letter.", 1, "mail_send"],
["press1", "📰", "Ink on the Fingers", "Write for the Gazette.", 1, "gazette_write"],
["book1", "📖", "Bookworm", "Visit the library.", 1, "library_visit"],
["party1", "🎉", "Party Goer", "Check in at a party.", 1, "party_checkin"],
["race1", "🏁", "Over the Line", "Finish a race.", 1, "race_finish"],
["candle1", "🕯️", "A Light Kept", "Light a candle at a temple.", 1, "candle"],
["wed1", "💍", "Wed", "Say your vows.", 1, "wed_vow"],
["hunt1", "🗝️", "Key Hunter", "Find a shard in the Dreamer's Keys hunt.", 1, "hunt_shard"],
["rare1", "💎", "Rare Find", "Find a rare treasure somewhere in the worlds.", 1, "rare_take"],
["nightmare1", "👁️", "Nightmare Hunter", "Win a nightmare trophy.", 1, "nightmare_trophy"],
["dreamw1", "🌀", "Guest in a Dream", "Walk in another dreamer's dream world.", 1, "dream_world_enter"],
["ride1", "🚇", "Mind the Gap", "Ride the underground.", 1, "ride_underground"],
["story1", "📜", "The End", "Finish a story world.", 1, "stories"],
["story3", "🏛️", "Teller of Tales", "Finish 3 story worlds.", 3, "stories"],
["story6", "👑", "Living Legend", "Finish 6 story worlds.", 6, "stories"]
];
var ACV_RPC = { clock_in: "clock_in", do_task: "task", start_task: "task", school_pass: "school_pass", academy_learn: "academy_learn",
skill_gather: "skill_gather", skill_craft: "skill_craft", green_harvest: "green_harvest", work_the_ground: "work_the_ground",
buy_lot: "home", take_lease: "home", open_business: "open_business", bank_deposit: "bank_deposit", offer_trade: "offer_trade",
mail_send: "mail_send", gazette_write: "gazette_write", library_visit: "library_visit", party_checkin: "party_checkin",
race_finish: "race_finish", race_solo_done: "race_finish", light_candle: "candle", temple_light: "candle", wed_vow: "wed_vow",
hunt_shard: "hunt_shard", rare_take: "rare_take", nightmare_trophy: "nightmare_trophy", dream_world_enter: "dream_world_enter",
ride_underground: "ride_underground" };
var ACV_STORY = { maze_done: "The Labyrinth", grimm_done: "The Grimm Wood", erebos_done: "Erebos", verne_done: "The Verne voyages",
dav_done: "Da Vinci's workshop", samhain_escape: "The Samhain escape", space_mission_done: "A space mission", race_planet_done: "The Race Planet" };
function acvData() {
if (ACV.d)
return ACV.d;
var d = null;
try {
d = JSON.parse(localStorage.getItem(ACV_KEY) || "null");
}
catch (e) { }
if (!d || typeof d !== "object")
d = {};
d.n = d.n || {};
d.got = d.got || {};
d.worlds = d.worlds || {};
d.people = d.people || {};
d.stories = d.stories || {};
ACV.d = d;
return d;
}
function acvStore() { try {
localStorage.setItem(ACV_KEY, JSON.stringify(acvData()));
}
catch (e) { } }
function acvCount(c) {
var d = acvData();
if (c === "worlds")
return Object.keys(d.worlds).length;
if (c === "people")
return Object.keys(d.people).length;
if (c === "stories")
return Object.keys(d.stories).length;
return d.n[c] || 0;
}
function acvCheck() { return __ZC(430, 3, this, arguments, new.target); }
function acvBump(c, by) { var d = acvData(); d.n[c] = (d.n[c] || 0) + (by || 1); ACV.dirty["n:" + c] = 1; acvCheck(); }
function acvToast(a) {
if (typeof lvlToast === "function")
return lvlToast("🏆 Achievement: " + a[1] + " " + a[2]);
if (typeof setStatus === "function")
setStatus("🏆 <b>Achievement: " + a[2] + "</b>. " + a[3]);
}
function acvEsc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#39;" }[c]; }); }
var ACV_IN = {};
function acvWrap(fn, run, before) {
var cur = window[fn];
if (typeof cur !== "function" || cur.__acv)
return;
var w = function () {
if (ACV_IN[fn])
return cur.apply(this, arguments);
if (before)
try {
run(undefined, arguments);
}
catch (e) { }
ACV_IN[fn] = 1;
var r;
try {
r = cur.apply(this, arguments);
}
finally {
ACV_IN[fn] = 0;
}
if (!before)
try {
run(r, arguments);
}
catch (e) { }
return r;
};
w.__acv = true;
window[fn] = w;
}
function acvRpcSeen(name, p) {
if (!(ACV_RPC[name] || ACV_STORY[name]) || !p || typeof p.then !== "function")
return;
p.then(function (r) {
if (r == null || r === false || (typeof r === "object" && (r.ok === false || r.error)))
return;
if (ACV_STORY[name]) {
var d = acvData();
if (!d.stories[name]) {
d.stories[name] = Date.now();
ACV.dirty["s:" + name] = 1;
acvCheck();
}
}
else
acvBump(ACV_RPC[name]);
}, function () { });
}
function acvWorldSeen(k) { return __ZC(430, 4, this, arguments, new.target); }
function acvHook() {
if (typeof window.cityRpc === "function" && !window.cityRpc.__acv) {
var cur = window.cityRpc;
var w = function (name) {
var f = ACV.stub || cur;
if (ACV_IN.rpc)
return f.apply(this, arguments);
ACV_IN.rpc = 1;
var p;
try {
p = f.apply(this, arguments);
}
finally {
ACV_IN.rpc = 0;
}
try {
acvRpcSeen(name, p);
}
catch (e) { }
return p;
};
w.__acv = true;
window.cityRpc = w;
}
acvWrap("closeNight", function (r) { if (r !== null)
acvBump("dream"); });
acvWrap("togEmote", function () { acvBump("emote"); });
acvWrap("pmSnap", function () { acvBump("photo"); });
acvWrap("fvoCallOpen", function (r, a) { if (a && a[0])
acvBump("call"); });
acvWrap("openTalk", function (r, a) {
var c = a && a[0], nm = c && c.name;
if (!nm)
return;
var d = acvData();
if (d.people[nm])
return;
if (Object.keys(d.people).length >= 3000) {
d.peopleElsewhere = (d.peopleElsewhere || 0) + 1;
}
else
d.people[nm] = Date.now();
ACV.dirty["p"] = 1;
acvCheck();
}, true);
acvWrap("worldGo", function (r, a) { if (r === false || !a || !a[0])
return; acvWorldSeen(String(a[0])); });
}
(function () {
function go() { setTimeout(function () { acvHook(); setInterval(acvHook, 5000); }, 3000); }
if (document.readyState === "complete")
go();
else
addEventListener("load", go);
})();
function acvSyncSoon() { clearTimeout(ACV.syncT); ACV.syncT = setTimeout(acvSync, 8000); }
function acvSync() {
if (ACV.noServer || typeof cityRpc !== "function" || typeof signedIn !== "function" || !signedIn())
return;
var d = acvData(), out = { n: d.n, got: d.got, worlds: d.worlds, people: Object.keys(d.people).length, stories: d.stories };
var keys = Object.keys(ACV.dirty);
if (!keys.length && ACV.synced)
return;
ACV.dirty = {};
cityRpc("ach_mark", { p_data: out }).then(function (r) { ACV.synced = true; if (r && r.data)
acvMerge(r.data); })
.catch(function (e) { if (/404|not find|does not exist|PGRST202/i.test(String(e && e.message || e)))
ACV.noServer = true; });
}
function acvMerge(s) { return __ZC(430, 5, this, arguments, new.target); }
(function () { setTimeout(function () { acvSync(); }, 25000); })();
function acvHtml() { return __ZC(430, 6, this, arguments, new.target); }
function acvPaint() { return __ZC(430, 7, this, arguments, new.target); }
function acvOpen(tab) { ACV.open = true; if (tab)
ACV.tab = tab; if (document.exitPointerLock)
try {
document.exitPointerLock();
}
catch (e) { } acvPaint(); acvSync(); }
if (typeof backRegister === "function")
backRegister({ order: 2, open: function () { return ACV.open; }, close: function () { ACV.open = false; acvPaint(); } });
(function () {
try {
if (typeof PS_EXTRAS !== "undefined")
PS_EXTRAS.push({ id: "me-ach", label: "🏆 Achievements", run: function () { acvOpen(); } });
if (typeof PS_SECTIONS !== "undefined")
PS_SECTIONS.forEach(function (s) { if (s.k === "you" && s.ids.indexOf("me-ach") < 0) {
var i = s.ids.indexOf("me-lvl");
s.ids.splice(i < 0 ? s.ids.length : i + 1, 0, "me-ach");
} });
}
catch (e) { }
})();
