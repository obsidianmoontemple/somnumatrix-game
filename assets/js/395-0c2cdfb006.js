/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var MSC = { data: null, at: 0, open: false, missing: false, keepChanged: null, msg: "", tick: null, ask: { job: "", day: "", why: "" }, told: null };
var MSC_DAY = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], MSC_DAYW = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var MSC_MON = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
function mscEsc(s) { return typeof esc === "function" ? esc(s) : String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#39;" }[c]; }); }
function mscIn() { return typeof signedIn === "function" && signedIn(); }
function mscKeeper() { return typeof amKeeper === "function" && amKeeper(); }
function mscDefaultDays(t) { return __ZC(395, 0, this, arguments, new.target); }
function mscHour() { return typeof cityHourNow === "function" ? cityHourNow() : (new Date().getHours() + new Date().getMinutes() / 60); }
function mscToday() {
var off = (typeof CITYCLOCK !== "undefined" && CITYCLOCK.offset !== null) ? CITYCLOCK.offset : -new Date().getTimezoneOffset();
var t = new Date(Date.now() + off * 60000);
return Date.UTC(t.getUTCFullYear(), t.getUTCMonth(), t.getUTCDate()) / 86400000;
}
function mscDayNo(iso) { var p = String(iso || "").slice(0, 10).split("-"); return p.length === 3 ? Date.UTC(+p[0], +p[1] - 1, +p[2]) / 86400000 : null; }
function mscIso(n) { var d = new Date(n * 86400000); return d.toISOString().slice(0, 10); }
function mscDow(n) { return new Date(n * 86400000).getUTCDay(); }
function mscLabel(n, today) { var d = new Date(n * 86400000); return (n === today ? "Today" : n === today + 1 ? "Tomorrow" : MSC_DAY[d.getUTCDay()]) + " " + d.getUTCDate() + " " + MSC_MON[d.getUTCMonth()]; }
function mscHm(h) { return typeof hm === "function" ? hm(h) : (("0" + Math.floor(((h % 24) + 24) % 24)).slice(-2) + ":" + ("0" + Math.round((h % 1) * 60)).slice(-2)); }
function mscHours(sh) { if (!sh || sh.start1 == null)
return "any time"; return typeof shiftWords === "function" ? shiftWords(sh) : mscHm(+sh.start1) + "–" + mscHm(+sh.start1 + +sh.len1); }
function mscDaysWords(m) { return __ZC(395, 1, this, arguments, new.target); }
function mscOffWords(m) { var off = []; for (var i = 1; i <= 7; i++) {
if (!((m >> (i % 7)) & 1))
off.push(MSC_DAY[i % 7]);
} return off.length ? off.join(" and ") : "none"; }
function mscFromWork() {
var jobs = (typeof WORK !== "undefined" && WORK.data && WORK.data.jobs) || [];
return { ok: true, local: true, today: mscIso(mscToday()), enforce: true, asks: [], to_answer: [],
jobs: jobs.map(function (j) {
return { job_id: j.job_id, title: j.title, workplace: j.workplace, roams: !!j.roams, pay_kind: j.pay_kind, clocked_in: !!j.clocked_in, shift: j.shift || null,
days: mscDefaultDays(j.title), any_hours: typeof anyHours === "function" ? anyHours(j) : false, report_to: "the shift lead at " + (j.workplace || "your workplace"), note: null, changed: false };
}) };
}
function mscExample() { return __ZC(395, 2, this, arguments, new.target); }
function mscLoad(force) {
if (!mscIn())
return Promise.resolve(null);
if (!force && MSC.data && Date.now() - MSC.at < 60000)
return Promise.resolve(MSC.data);
MSC.at = Date.now();
var fromWork = function () {
var w = (typeof workRefresh === "function") ? workRefresh(true) : Promise.resolve(null);
return Promise.resolve(w).then(function () { return mscFromWork(); });
};
var p = MSC.missing ? fromWork() : (typeof cityRpc === "function" ? cityRpc("my_schedule") : Promise.reject(new Error("no server")))
.then(function (d) { if (!d || d.ok === false)
return d && d.say ? d : fromWork(); return d; })
.catch(function (e) { if (/my_schedule|PGRST202|Could not find/i.test(String(e && e.message)))
MSC.missing = true; return fromWork(); });
return p.then(function (d) {
if (MSC.open && d && d.ok !== false && !(d.jobs || []).length && (mscKeeper() || /[?&]schedule=1\b/.test(location.search)))
d = mscExample();
MSC.data = d;
mscAfterLoad();
return d;
});
}
function mscChangedJobs() { var d = MSC.data; return d && d.jobs ? d.jobs.filter(function (j) { return j.changed; }) : []; }
function mscAnswered() { var d = MSC.data; return d && d.asks ? d.asks.filter(function (a) { return a.changed && (a.status === "yes" || a.status === "no"); }) : []; }
function mscUnseen() { return mscChangedJobs().length + mscAnswered().length + ((MSC.data && MSC.data.to_answer) || []).length; }
function mscAfterLoad() {
mscSettings();
mscBadge();
if (typeof PH !== "undefined" && PH.open && PH.tab === "shifts")
phPaint();
if (MSC.open)
mscPaint();
var ch = mscChangedJobs(), an = mscAnswered(), key = ch.map(function (j) { return j.job_id + "@" + j.changed_at; }).concat(an.map(function (a) { return "a" + a.id + a.status; })).join(",");
if (key && key !== MSC.told) {
var seen = "";
try {
seen = localStorage.getItem("msc.told") || "";
}
catch (e) { }
MSC.told = key;
if (seen !== key) {
try {
localStorage.setItem("msc.told", key);
}
catch (e) { }
if (typeof setStatus === "function")
setStatus("📱 <b>New text about your work:</b> " + mscEsc(mscTextLine()) + " <b>Phone › Shifts</b>");
}
}
}
function mscTextLine() { return __ZC(395, 3, this, arguments, new.target); }
function mscSeen() {
if (!mscUnseen() || !MSC.data || MSC.data.local || MSC.data.example)
return;
if (typeof cityRpc === "function")
cityRpc("schedule_seen").catch(function () { });
}
function mscOffOn(j, n) {
var d = MSC.data || {}, iso = mscIso(n);
if (!((j.days >> mscDow(n)) & 1))
return "off";
if ((d.asks || []).some(function (a) { return a.job_id === j.job_id && String(a.day).slice(0, 10) === iso && a.status === "yes"; }))
return "given";
return null;
}
function mscAsked(j, n) { var iso = mscIso(n); return ((MSC.data && MSC.data.asks) || []).filter(function (a) { return a.job_id === j.job_id && String(a.day).slice(0, 10) === iso && a.status === "asked"; })[0] || null; }
function mscNext() { return __ZC(395, 4, this, arguments, new.target); }
function mscInWords(hrs) { var m = Math.max(1, Math.round(hrs * 60)); if (m < 60)
return m + " min"; if (hrs < 36) {
var H = Math.floor(m / 60), M = m % 60;
return H + " h" + (M ? " " + M + " min" : "");
} return Math.round(hrs / 24) + " days"; }
function mscNextHtml() { return __ZC(395, 5, this, arguments, new.target); }
function mscJobHtml(j) { return __ZC(395, 6, this, arguments, new.target); }
function mscAskHtml() { return __ZC(395, 7, this, arguments, new.target); }
function mscAnswerHtml() { return __ZC(395, 8, this, arguments, new.target); }
function mscBodyHtml() { return __ZC(395, 9, this, arguments, new.target); }
function mscWire(root) { return __ZC(395, 10, this, arguments, new.target); }
function mscCall(fn, body) { return __ZC(395, 11, this, arguments, new.target); }
function mscAsk() { return __ZC(395, 12, this, arguments, new.target); }
function mscRepaint() { if (MSC.open)
mscPaint(); if (typeof PH !== "undefined" && PH.open && PH.tab === "shifts")
phPaint(); }
function mscCss() {
if (document.getElementById("msc-css"))
return;
var c = document.createElement("style");
c.id = "msc-css";
c.textContent = "#msc{position:fixed;left:50%;top:50%;transform:translate(-50%,-50%);z-index:9050;width:min(560px,calc(100vw - 24px));max-height:calc(100vh - 40px);overflow:auto;-webkit-overflow-scrolling:touch;" +
"background:rgba(10,12,18,.97);border:1px solid var(--gold,#C9A868);border-radius:10px;padding:14px 16px 16px;font:14px var(--sans,system-ui);color:var(--bone,#EDE8F8);box-sizing:border-box;box-shadow:0 10px 40px rgba(0,0,0,.6)}" +
"#msc .msc-head{display:flex;justify-content:space-between;align-items:center;gap:10px;margin-bottom:8px}#msc .msc-head b{font-size:17px}" +
".msc-dim{color:#A9A2C0;font-size:12.5px;line-height:1.5}.msc-k{font-size:11.5px;letter-spacing:.08em;text-transform:uppercase;color:#E8C66A;margin-bottom:2px}" +
".msc-next{border:1px solid #E8C66A;border-radius:8px;padding:9px 11px;margin:6px 0 10px;background:rgba(232,198,106,.08);line-height:1.5}.msc-big{font-size:15.5px;font-weight:600}" +
".msc-job{border-top:1px solid rgba(255,255,255,.12);padding-top:9px;margin-top:9px}.msc-jt{margin-bottom:2px}" +
".msc-chg{display:inline-block;background:#C0392B;color:#fff;border-radius:9px;padding:1px 8px;font-size:11px;font-weight:700;letter-spacing:.03em;vertical-align:1px}" +
".msc-note{margin:4px 0;padding:5px 8px;border-left:3px solid #E8C66A;background:rgba(255,255,255,.04);font-size:13px}" +
".msc-days{margin-top:6px;display:grid;grid-template-columns:1fr;gap:3px}" +
".msc-day{display:flex;justify-content:space-between;gap:8px;padding:5px 9px;border-radius:6px;background:rgba(76,199,122,.10);border:1px solid rgba(76,199,122,.25);font-size:13px}" +
".msc-day.off{background:rgba(255,255,255,.03);border-color:rgba(255,255,255,.08);color:#A9A2C0}.msc-day.off .msc-dh{color:#8FB8FF;font-weight:600}" +
".msc-day.today{outline:2px solid #E8C66A;outline-offset:-1px}.msc-dl{white-space:nowrap}.msc-dh{text-align:right}" +
".msc-offw{color:#8FB8FF}.msc-ask{color:#E8C66A;font-size:12px}.msc-yes{color:#4CC77A}.msc-no{color:#E0705A}" +
".msc-sec{border-top:1px solid rgba(255,255,255,.12);margin-top:10px;padding-top:8px;display:flex;flex-direction:column;gap:6px}" +
".msc-sec select,.msc-sec input{width:100%;box-sizing:border-box;padding:8px;border-radius:6px;border:1px solid #3A3E48;background:#11141B;color:inherit;font:inherit;font-size:14px}" +
".msc-sec .btn{align-self:flex-start}.msc-row{display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap;font-size:13px;padding:3px 0}" +
".msc-text{background:#2B6CB0;color:#fff;border-radius:14px 14px 14px 4px;padding:8px 11px;margin:4px 0 8px;font-size:13.5px;line-height:1.45}.msc-text .msc-k{color:#DCEBFF}" +
".msc-msg{margin-top:8px;color:#E8C66A}#msc .btn{min-height:34px}" +
"#ph-box .msc-day{font-size:12px;padding:4px 7px}#ph-box .msc-sec .btn{padding:6px 12px}" +
"#msc-set{margin:0 0 10px;font-size:13px;line-height:1.55}";
document.head.appendChild(c);
}
function mscEl() { return __ZC(395, 13, this, arguments, new.target); }
function mscPaint() { return __ZC(395, 14, this, arguments, new.target); }
function mscOpen() {
MSC.open = true;
MSC.msg = "";
mscPaint();
if (!mscIn())
return;
mscLoad(true).then(function (d) {
if (d && !(d.jobs || []).length && (mscKeeper() || /[?&]schedule=1\b/.test(location.search))) {
MSC.data = mscExample();
}
mscPaint();
mscSeen();
});
}
function mscClose() {
MSC.open = false;
mscPaint();
if (MSC.data && MSC.data.jobs && !MSC.data.example && !MSC.data.local) {
MSC.data.jobs.forEach(function (j) { j.changed = false; });
(MSC.data.asks || []).forEach(function (a) { a.changed = false; });
mscBadge();
mscSettings();
}
}
function mscSettings() {
var st = document.getElementById("city-state");
if (!st)
return;
var box = document.getElementById("msc-set");
if (!box) {
mscCss();
box = document.createElement("div");
box.id = "msc-set";
st.parentNode.insertBefore(box, st.nextSibling);
}
var d = MSC.data, n = d && d.jobs && d.jobs.length ? mscNext() : null, u = mscUnseen();
if (!mscIn()) {
box.innerHTML = "";
return;
}
box.innerHTML = "<button type='button' class='btn' id='msc-set-btn'>📅 My schedule" + (u ? " <span class='msc-chg'>" + (mscChangedJobs().length ? "Changed" : u + " new") + "</span>" : "") + "</button>" +
(n ? " <span class='msc-dim'>" + (n.now ? "On shift now: " : "Next shift: ") + "<b style='color:var(--bone,#EDE8F8)'>" + mscEsc(n.job.title) + "</b>, " + mscEsc(mscLabel(n.day, mscDayNo(d.today) || mscToday())) + " " + mscHm(n.start) + "–" + mscHm(n.start + n.len) + "</span>" : "");
document.getElementById("msc-set-btn").onclick = function (e) { e.preventDefault(); mscOpen(); };
}
function mscBadge() { try {
if (typeof fpsBadge === "function")
fpsBadge();
}
catch (e) { } }
(function () {
if (typeof fpsBadge === "function") {
var fb = fpsBadge;
fpsBadge = function () {
var r = fb.apply(this, arguments);
try {
var u = mscUnseen();
if (!u)
return r;
var b = document.getElementById("ph-btn"), s = b && b.querySelector(".b");
if (!s)
return r;
var n = (parseInt(s.textContent, 10) || 0) * (s.style.display === "none" ? 0 : 1) + u;
s.textContent = n > 99 ? "99+" : String(n);
s.style.display = "block";
}
catch (e) { }
return r;
};
}
if (typeof phPaint !== "function")
return;
var pp = phPaint;
phPaint = function (scrollEnd) {
var mine = typeof PH !== "undefined" && PH.tab === "shifts";
var r = pp.apply(this, arguments);
try {
var box = document.getElementById("ph-box");
if (!box || box.style.display === "none")
return r;
var tabs = box.querySelector(".tabs");
if (tabs && !tabs.querySelector("[data-tab='shifts']")) {
var u = mscUnseen(), sp = document.createElement("span");
sp.setAttribute("data-tab", "shifts");
sp.className = mine ? "on" : "";
sp.innerHTML = "Shifts" + (u ? " <b style='color:#C0392B'>" + u + "</b>" : "");
sp.onclick = function (ev) {
ev.stopPropagation();
if (typeof fpsLeave === "function")
try {
fpsLeave();
}
catch (e) { }
PH.tab = "shifts";
PH.msg = "";
PH.withId = null;
phPaint();
mscLoad(false).then(function () { mscSeen(); });
};
tabs.appendChild(sp);
if (mine)
Array.prototype.forEach.call(tabs.querySelectorAll("span"), function (s) { if (s !== sp)
s.className = ""; });
}
if (!mine)
return r;
mscCss();
var body = box.querySelector(".body"), foot = box.querySelector(".send");
if (foot)
foot.remove();
if (body) {
body.innerHTML = "<div style='padding:2px 2px 8px'>" + mscBodyHtml() +
"<div style='margin-top:10px'><button type='button' class='btn' data-msc='big' style='" + (typeof PH_BTN2 === "string" ? PH_BTN2 : "") + "'>Open it big</button></div></div>";
mscWire(body);
var big = body.querySelector("[data-msc='big']");
if (big)
big.onclick = function (ev) { ev.stopPropagation(); PH.open = false; phPaint(); mscOpen(); };
if (!MSC.data && mscIn())
mscLoad(false);
}
}
catch (e) { }
return r;
};
})();
(function () {
if (typeof workPaint === "function") {
var wp = workPaint;
workPaint = function () {
var r = wp.apply(this, arguments);
try {
var el = document.getElementById("work");
if (el && el.style.display !== "none" && !document.getElementById("msc-work")) {
var d = document.createElement("div");
d.id = "msc-work";
d.style.cssText = "margin:6px 0 2px";
var n = MSC.data && MSC.data.jobs && MSC.data.jobs.length ? mscNext() : null;
d.innerHTML = "<button type='button' class='btn'>📅 My schedule" + (mscChangedJobs().length ? " <span class='msc-chg'>Changed</span>" : "") + "</button>" +
(n && !n.now ? " <span style='color:var(--dim)'>next: " + mscEsc(mscLabel(n.day, mscDayNo(MSC.data.today) || mscToday())) + " " + mscHm(n.start) + "</span>" : "");
d.querySelector("button").onclick = function (e) { e.stopPropagation(); mscOpen(); };
var first = el.children[0];
if (first && first.nextSibling)
el.insertBefore(d, first.nextSibling);
else
el.appendChild(d);
mscCss();
}
}
catch (e) { }
return r;
};
}
if (typeof clockIn === "function") {
var ci = clockIn;
clockIn = function (j) {
try {
var d = MSC.data, s = d && d.jobs && d.jobs.filter(function (x) { return x.job_id === j.job_id; })[0];
if (s && d.enforce !== false && !s.any_hours && !mscKeeper() && !d.local) {
var today = mscDayNo(d.today) || mscToday(), h = mscHour(), day = today;
if (s.shift && s.shift.start1 != null && +s.shift.start1 + +s.shift.len1 > 24 && h < +s.shift.start1 + +s.shift.len1 - 24 + 0.5 && h < +s.shift.start1 - 0.5)
day = today - 1;
var off = mscOffOn(s, day);
if (off) {
var n = mscNext();
if (typeof setStatus === "function")
setStatus("<b>Today is your day off</b> from " + mscEsc(s.title) + (off === "given" ? " (you asked for it)" : "") + ". " +
(n ? "Your next shift: " + mscEsc(n.job.title) + ", " + mscEsc(mscLabel(n.day, today)) + " " + mscHm(n.start) + ". " : "") + "See <b>📅 My schedule</b>.");
return;
}
}
}
catch (e) { }
return ci.apply(this, arguments);
};
}
})();
if (typeof PS_EXTRAS !== "undefined")
PS_EXTRAS.push({ id: "msc-ps", label: "📅 My schedule", run: function () { setTimeout(mscOpen, 10); } });
try {
if (typeof PS_SECTIONS !== "undefined")
PS_SECTIONS.forEach(function (S) { if (S.k === "you" && S.ids.indexOf("msc-ps") < 0)
S.ids.push("msc-ps"); });
}
catch (e) { }
(function () {
var go = function () {
try {
mscSettings();
}
catch (e) { }
var rb = document.getElementById("city-refresh");
if (rb)
rb.addEventListener("click", function () { mscLoad(true); });
if (/[?&]schedule=1\b/.test(location.search))
setTimeout(mscOpen, 3000);
var was = false;
MSC.tick = setInterval(function () {
var on = mscIn();
if (on && (!was || Date.now() - MSC.at > 300000))
mscLoad(true);
if (!on && was) {
MSC.data = null;
MSC.told = null;
mscSettings();
}
was = on;
}, 15000);
};
if (document.readyState === "loading")
document.addEventListener("DOMContentLoaded", go);
else
go();
})();
