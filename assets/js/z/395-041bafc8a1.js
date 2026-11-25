/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(395, function () {
"use strict";
return [
function (t) {
t = String(t || "");
if (/(teacher|principal|school|educat|curriculum|counsel|library|tutor|lecturer|professor|attendance)/i.test(t))
return 62;
if (/(bank|clerk|office|registrar|licens|examiner|treasur|account|secretary|court|judge|notary|archiv|records)/i.test(t))
return 62;
if (/(temple|priest|acolyte|chaplain|oracle|monk|nun|cantor)/i.test(t))
return 121;
if (/(watch|officer|guard|sentry|patrol|police|nurse|doctor|medic|surgeon|orderly|fire|rescue|security|rider|courier|driver|pilot|lamplight|warden)/i.test(t))
return 79;
if (/(shop|store|seller|stall|cafe|café|cook|chef|baker|bar|tavern|waiter|server|host|dealer|casino|croupier|show|music|stage|cinema|usher|games|fair|vendor|barista)/i.test(t))
return 121;
return 62;
},
function (m) {
var on = [];
for (var i = 1; i <= 7; i++) {
if ((m >> (i % 7)) & 1)
on.push(i % 7);
}
if (m === 127)
return "every day";
if (m === 62)
return "Monday to Friday";
if (!on.length)
return "no days";
var s = on.map(function (d) { return MSC_DAY[d]; });
var run = true;
for (var k = 1; k < on.length; k++) {
if (((on[k] - on[k - 1]) + 7) % 7 !== 1)
run = false;
}
return run && on.length > 2 ? s[0] + " to " + s[s.length - 1] : s.join(", ");
},
function () {
var t = mscIso(mscToday());
return { ok: true, example: true, today: t, enforce: true, to_answer: [],
asks: [{ id: 0, job_id: -1, day: mscIso(mscToday() + 9), why: "My sister's wedding", status: "asked" }],
jobs: [{ job_id: -1, title: "Baker", workplace: "The Bakery", pay_kind: "hourly", shift: { start1: 6, len1: 8, start2: null, len2: null }, days: 121, report_to: "the head baker",
note: "Bread for the Samhain Fair: come in half an hour early on Friday.", changed: true, changed_at: new Date().toISOString() },
{ job_id: -2, title: "Lamplighter", workplace: "Ward 3", roams: true, pay_kind: "hourly", shift: { start1: 18, len1: 4, start2: null, len2: null }, days: 79, report_to: "the shift lead at the Lamp House", changed: false }] };
},
function () {
var ch = mscChangedJobs(), an = mscAnswered(), s = [];
ch.forEach(function (j) { s.push("Your schedule as " + j.title + " has changed: " + mscDaysWords(j.days) + ", " + mscHours(j.shift) + "."); });
an.forEach(function (a) { s.push("Your day off on " + mscLabel(mscDayNo(a.day), mscDayNo(MSC.data.today)) + (a.status === "yes" ? " is given." : " was turned down.")); });
return s.join(" ");
},
function () {
var d = MSC.data;
if (!d || !d.jobs || !d.jobs.length)
return null;
var today = mscDayNo(d.today) || mscToday(), h = mscHour(), best = null;
for (var i = -1; i < 8; i++) {
d.jobs.forEach(function (j) {
if (!j.shift || j.shift.start1 == null)
return;
if (mscOffOn(j, today + i))
return;
[[j.shift.start1, j.shift.len1], [j.shift.start2, j.shift.len2]].forEach(function (w) {
if (w[0] == null)
return;
var inH = i * 24 + (+w[0]) - h;
if (inH + (+w[1]) <= 0)
return;
if (!best || inH < best.inH)
best = { job: j, day: today + i, start: +w[0], len: +w[1], inH: inH, now: inH <= 0 };
});
});
}
return best;
},
function () {
var n = mscNext(), today = mscDayNo(MSC.data && MSC.data.today) || mscToday();
if (!n)
return "<div class='msc-next'><b>No shifts coming up.</b></div>";
return "<div class='msc-next'><div class='msc-k'>" + (n.now ? "On shift now" : "Your next shift") + "</div>" +
"<div class='msc-big'>" + mscEsc(n.job.title) + " <span class='msc-dim'>at</span> " + mscEsc(n.job.workplace || "") + "</div>" +
"<div>" + mscEsc(mscLabel(n.day, today)) + " · <b>" + mscHm(n.start) + "–" + mscHm(n.start + n.len) + "</b> city time" + (n.now ? "" : " · in " + mscEsc(mscInWords(n.inH))) + "</div>" +
(n.job.report_to ? "<div class='msc-dim'>Report to " + mscEsc(n.job.report_to) + "</div>" : "") + "</div>";
},
function (j) {
var d = MSC.data, today = mscDayNo(d.today) || mscToday(), h = [];
h.push("<div class='msc-job'><div class='msc-jt'><b>" + mscEsc(j.title) + "</b>" + (j.changed ? " <span class='msc-chg'>Changed</span>" : "") +
"<span class='msc-dim'> · " + mscEsc(j.roams ? (j.workplace || "out on your round") + " (your round)" : (j.workplace || "")) + "</span></div>" +
"<div class='msc-dim'>Works " + mscEsc(mscDaysWords(j.days)) + " · days off: <b class='msc-offw'>" + mscEsc(mscOffWords(j.days)) + "</b> · report to " + mscEsc(j.report_to || "the shift lead") + "</div>" +
(j.any_hours ? "<div class='msc-dim'>Salaried or in charge: you may also come in any time. These are your usual days.</div>" : "") +
(j.note ? "<div class='msc-note'>📌 " + mscEsc(j.note) + "</div>" : ""));
h.push("<div class='msc-days'>");
for (var i = 0; i < 7; i++) {
var n = today + i, off = mscOffOn(j, n), ask = mscAsked(j, n);
h.push("<div class='msc-day" + (off ? " off" : "") + (i === 0 ? " today" : "") + "'><span class='msc-dl'>" + mscEsc(mscLabel(n, today)) + "</span>" +
"<span class='msc-dh'>" + (off === "given" ? "Day off (given)" : off ? "Day off" : mscEsc(mscHours(j.shift))) + (ask ? " <span class='msc-ask'>day off asked</span>" : "") + "</span></div>");
}
h.push("</div></div>");
return h.join("");
},
function () {
var d = MSC.data, today = mscDayNo(d.today) || mscToday(), h = [], jobs = d.jobs || [];
if (!jobs.length)
return "";
var A = MSC.ask;
if (!A.job || !jobs.some(function (j) { return String(j.job_id) === String(A.job); }))
A.job = String(jobs[0].job_id);
var j = jobs.filter(function (x) { return String(x.job_id) === String(A.job); })[0], opts = [];
for (var i = 0; i <= 28; i++) {
var n = today + i;
if (!mscOffOn(j, n) && !mscAsked(j, n))
opts.push("<option value='" + mscIso(n) + "'" + (A.day === mscIso(n) ? " selected" : "") + ">" + mscEsc(mscLabel(n, today)) + "</option>");
}
h.push("<div class='msc-sec'><b>Ask for a day off</b>" +
(jobs.length > 1 ? "<select data-msck='job'>" + jobs.map(function (x) { return "<option value='" + x.job_id + "'" + (String(x.job_id) === String(A.job) ? " selected" : "") + ">" + mscEsc(x.title) + "</option>"; }).join("") + "</select>" : "") +
"<select data-msck='day'>" + opts.join("") + "</select>" +
"<input data-msck='why' maxlength='200' placeholder='Why? (optional)' value='" + mscEsc(A.why) + "'>" +
"<button type='button' class='btn' data-msc='ask'>Ask</button>" +
"<div class='msc-dim'>The Keeper, or the owner or a head of where you work, says yes or no. You'll get a text.</div></div>");
var asks = (d.asks || []).filter(function (a) { return mscDayNo(a.day) >= today; });
if (asks.length) {
h.push("<div class='msc-sec'><b>Your asks</b>");
asks.forEach(function (a) {
var jj = jobs.filter(function (x) { return x.job_id === a.job_id; })[0];
h.push("<div class='msc-row'><span>" + mscEsc(mscLabel(mscDayNo(a.day), today)) + " · " + mscEsc(jj ? jj.title : "") + (a.why ? " <span class='msc-dim'>“" + mscEsc(a.why) + "”</span>" : "") + "</span>" +
"<span>" + (a.status === "yes" ? "<b class='msc-yes'>Given</b>" : a.status === "no" ? "<b class='msc-no'>Turned down</b>" : "<span class='msc-ask'>Waiting</span>") +
(a.changed ? " <span class='msc-chg'>New</span>" : "") + (a.status !== "no" && a.id ? " <button type='button' class='btn' data-mscw='" + a.id + "'>Take back</button>" : "") + "</span></div>");
});
h.push("</div>");
}
return h.join("");
},
function () {
var L = (MSC.data && MSC.data.to_answer) || [], today = mscDayNo(MSC.data.today) || mscToday();
if (!L.length)
return "";
return "<div class='msc-sec'><b>Days off your staff asked for</b>" + L.map(function (a) {
return "<div class='msc-row'><span><b>" + mscEsc(a.who || "Someone") + "</b> · " + mscEsc(a.job) + " · " + mscEsc(mscLabel(mscDayNo(a.day), today)) + (a.why ? " <span class='msc-dim'>“" + mscEsc(a.why) + "”</span>" : "") + "</span>" +
"<span><button type='button' class='btn' data-mscy='" + a.id + "'>Yes</button> <button type='button' class='btn' data-mscn='" + a.id + "'>No</button></span></div>";
}).join("") + "</div>";
},
function () {
var d = MSC.data;
if (!mscIn())
return "<p>Sign in to see your schedule.</p>";
if (!d)
return "<p class='msc-dim'>Looking at your week…</p>";
if (d.ok === false)
return "<p>" + mscEsc(d.say || "Your schedule is not available just now.") + "</p>";
var h = [];
if (d.example)
h.push("<div class='msc-text'>You hold no job, so this is an <b>example week</b>: what a dreamer with two jobs sees.</div>");
var ch = mscChangedJobs(), an = mscAnswered();
if (ch.length || an.length)
h.push("<div class='msc-text'><div class='msc-k'>💬 Text from work</div>" + mscEsc(mscTextLine()) + "</div>");
if (!(d.jobs || []).length) {
h.push("<p>You don't hold a job yet, so there is no schedule. The job board is in <b>Settings › Your work and your purse</b>" +
(typeof chsMember === "function" && !chsMember() && !mscKeeper() ? " (jobs come with membership)" : "") + ".</p>");
}
else {
h.push(mscNextHtml());
d.jobs.forEach(function (j) { h.push(mscJobHtml(j)); });
if (d.enforce !== false)
h.push("<div class='msc-dim' style='margin-top:6px'>On a day off you can't clock in. Times are city time (" + mscHm(mscHour()) + " now).</div>");
if (!d.example)
h.push(mscAskHtml());
else
h.push("<div class='msc-sec'><b>Asking for a day off</b><div class='msc-dim'>A dreamer picks a day, says why, and taps Ask. Their ask: " + mscEsc(mscLabel(mscDayNo(d.asks[0].day), mscDayNo(d.today))) + ", “" + mscEsc(d.asks[0].why) + "” · <span class='msc-ask'>Waiting</span></div></div>");
}
h.push(mscAnswerHtml());
if (MSC.msg)
h.push("<div class='msc-msg'>" + mscEsc(MSC.msg) + "</div>");
if (d.local && (d.jobs || []).length)
h.push("<div class='msc-dim' style='margin-top:6px'>Your usual week for this kind of work. Asking for days off opens soon.</div>");
return h.join("");
},
function (root) {
if (!root)
return;
root.querySelectorAll("[data-msck]").forEach(function (i) {
var k = i.getAttribute("data-msck");
i.addEventListener("keydown", function (e) { e.stopPropagation(); });
i.onchange = i.oninput = function () { MSC.ask[k] = i.value; if (k === "job") {
MSC.ask.day = "";
mscRepaint();
} };
i.onclick = function (e) { e.stopPropagation(); };
});
var day = root.querySelector("[data-msck='day']");
if (day && !MSC.ask.day)
MSC.ask.day = day.value;
var ask = root.querySelector("[data-msc='ask']");
if (ask)
ask.onclick = function (e) { e.stopPropagation(); mscAsk(); };
root.querySelectorAll("[data-mscw]").forEach(function (b) { b.onclick = function (e) { e.stopPropagation(); mscCall("withdraw_day_off", { p_id: +b.getAttribute("data-mscw") }); }; });
root.querySelectorAll("[data-mscy]").forEach(function (b) { b.onclick = function (e) { e.stopPropagation(); mscCall("answer_day_off", { p_id: +b.getAttribute("data-mscy"), p_yes: true }); }; });
root.querySelectorAll("[data-mscn]").forEach(function (b) { b.onclick = function (e) { e.stopPropagation(); mscCall("answer_day_off", { p_id: +b.getAttribute("data-mscn"), p_yes: false }); }; });
},
function (fn, body) {
MSC.msg = "…";
mscRepaint();
return cityRpc(fn, body).then(function (r) { MSC.msg = (r && r.say) || "Done."; return mscLoad(true); })
.catch(function (e) { MSC.msg = /Could not find|PGRST202/.test(String(e.message)) ? "Days off open once the city's next update is in." : "That didn't go through. Try again."; mscRepaint(); });
},
function () {
var d = MSC.data;
if (!d || d.local) {
MSC.msg = "Asking for days off opens once the city's next update is in.";
mscRepaint();
return;
}
if (!MSC.ask.day) {
MSC.msg = "Pick a day.";
mscRepaint();
return;
}
mscCall("ask_day_off", { p_job: +MSC.ask.job, p_day: MSC.ask.day, p_why: MSC.ask.why || null }).then(function () { MSC.ask.why = ""; MSC.ask.day = ""; mscRepaint(); });
},
function () {
var el = document.getElementById("msc");
if (el)
return el;
mscCss();
el = document.createElement("div");
el.id = "msc";
el.style.display = "none";
el.addEventListener("keydown", function (e) { if (e.key === "Escape") {
mscClose();
} e.stopPropagation(); });
["pointerdown", "mousedown", "touchstart", "wheel"].forEach(function (t) { el.addEventListener(t, function (e) { e.stopPropagation(); }, { passive: true }); });
document.body.appendChild(el);
return el;
},
function () {
var el = mscEl();
if (!MSC.open) {
el.style.display = "none";
return;
}
var sc = el.scrollTop;
el.innerHTML = "<div class='msc-head'><b>📅 My schedule</b><span><button type='button' class='btn' data-msc='refresh'>Refresh</button> <button type='button' class='btn' data-msc='close'>Close</button></span></div>" + mscBodyHtml();
el.style.display = "block";
el.scrollTop = sc;
el.querySelector("[data-msc='close']").onclick = mscClose;
el.querySelector("[data-msc='refresh']").onclick = function () { MSC.msg = ""; mscLoad(true); };
mscWire(el);
}
];
});
