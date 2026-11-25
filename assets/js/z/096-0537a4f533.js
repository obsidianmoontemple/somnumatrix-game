/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(96, function () {
"use strict";
return [
function (job) {
if (typeof amKeeper === "function" && amKeeper())
return true;
if (!inCityNow())
return false;
if (job.roams)
return true;
if (store.inside && INT && INT.spec)
return INT.spec.workplace === job.workplace || (INT.spec.label === job.workplace);
var w = wpAt(job.workplace);
if (!w)
return false;
return Math.hypot(camera.position.x - w.x, camera.position.z - w.z) < wpReach(job.workplace);
},
function (kinds, n) {
var P = camera.position, all = [];
kinds.forEach(function (k) { all = all.concat(targetsFor(k)); });
all.forEach(function (t) { t.d = Math.hypot(t.x - P.x, t.z - P.z); });
var farLim = kinds.indexOf("sector") > -1 ? 4000 : 420;
all = all.filter(function (t) { return t.d > 12 && t.d < farLim; }).sort(function (a, b) { return a.d - b.d; });
var out = [];
for (var i = 0; i < all.length && out.length < n; i++) {
var t = all[i], far = out.every(function (q) { return Math.hypot(q.x - t.x, q.z - t.z) > 25; });
if (far)
out.push(t);
}
if (out.length < n && farLim < 1000)
targetsFor("streets").forEach(function (t) { if (out.length < n && out.every(function (q) { return Math.hypot(q.x - t.x, q.z - t.z) > 25; }))
out.push(t); });
return out;
},
function (node, job) {
var re = NODE_RE[node], P = camera.position, w = wpAt(job.workplace), reach = wpReach(job.workplace), best = null, bd = 1e9;
if (re)
cityObjs().forEach(function (o) {
if (!re.test(o.archetype))
return;
if (w && Math.hypot(o.x - w.x, o.z - w.z) > reach)
return;
var d = Math.hypot(o.x - P.x, o.z - P.z);
if (d < bd) {
bd = d;
best = o;
}
});
if (!best && w)
best = { x: w.x, z: w.z, label: job.workplace, fallback: true };
return best;
},
function () {
var el = document.getElementById("work");
if (el || !document.body)
return el;
var css = document.createElement("style");
css.textContent = "#work-btn{position:fixed;right:12px;bottom:calc(96px + env(safe-area-inset-bottom,0px));z-index:45;display:none;" +
"background:rgba(10,12,18,.92);color:var(--bone);border:1px solid var(--gold,#C9A868);border-radius:3px;padding:9px 13px;font:13px var(--sans);cursor:pointer}" +
"#work{position:fixed;right:12px;bottom:calc(140px + env(safe-area-inset-bottom,0px));z-index:46;display:none;width:min(420px,calc(100vw - 24px));max-height:min(70vh,660px);overflow:auto;" +
"background:rgba(8,10,16,.96);border:1px solid var(--gold,#C9A868);border-radius:4px;padding:12px 14px;font:13px var(--sans);color:var(--bone)}" +
"#work .job{border-top:1px solid var(--line,#2A2C34);padding-top:8px;margin-top:8px}" +
"#work .tk{display:flex;justify-content:space-between;align-items:center;gap:8px;padding:4px 0}" +
"#work .bar{height:5px;background:#22252C;border-radius:3px;overflow:hidden;margin-top:2px}#work .bar i{display:block;height:5px;background:#C9A868}" +
"#work .on{color:#8FCB8A}#work .off{color:#C0603A}" +
"#work-run{position:fixed;left:50%;bottom:calc(150px + env(safe-area-inset-bottom,0px));transform:translateX(-50%);z-index:47;display:none;min-width:300px;max-width:calc(100vw - 24px);" +
"background:rgba(8,10,16,.95);border:1px solid var(--gold,#C9A868);border-radius:4px;padding:10px 14px;font:13px var(--sans);color:var(--bone);text-align:center}" +
"#work-run .bar{height:7px;background:#22252C;border-radius:3px;overflow:hidden;margin:8px 0 6px}#work-run .bar i{display:block;height:7px;background:#E8C27A}" +
"#work-run .arrow{display:inline-block;font-size:22px;color:#E8C27A;transition:transform .15s}" +
"#work-run .steps{display:flex;flex-wrap:wrap;gap:6px;justify-content:center;margin:8px 0 2px}#work-run .steps .btn{font-size:12.5px}" +
"#work-run .sw{display:inline-block;width:22px;height:22px;border-radius:50%;border:2px solid transparent;cursor:pointer;vertical-align:middle}#work-run .sw.on{border-color:#fff}" +
"#work-run select{background:#11141B;color:var(--bone);border:1px solid #3A3E48;border-radius:3px;padding:4px}";
document.head.appendChild(css);
var b = document.createElement("button");
b.id = "work-btn";
b.type = "button";
b.textContent = "Your work";
b.onclick = function () { WORK.open = !WORK.open; if (WORK.open)
workRefresh(true); workPaint(); };
document.body.appendChild(b);
el = document.createElement("div");
el.id = "work";
document.body.appendChild(el);
var run = document.createElement("div");
run.id = "work-run";
document.body.appendChild(run);
return el;
},
function () {
var el = workEl();
if (!el)
return;
var b = document.getElementById("work-btn"), jobs = (WORK.data && WORK.data.jobs) || [];
var show = inCityNow() && jobs.length > 0;
b.style.display = show ? "block" : "none";
if (!show || !WORK.open) {
el.style.display = "none";
return;
}
el.style.display = "block";
var h = '<div style="display:flex;justify-content:space-between;align-items:center"><b style="font-size:14px">Your work</b>' +
'<span><button class="btn" id="work-home">🏠 Way home</button> <button class="btn" id="work-pay">Draw pay</button> <button class="btn" id="work-x">Close</button></span></div>' +
'<div style="color:var(--dim);margin:6px 0 2px;line-height:1.5">City time <b style="color:var(--bone)">' + hm(cityHourNow()) + '</b>. Clock in at your post inside your hours, and out again whenever you need to: ' +
'every minute you are clocked in, at your post or out on patrol, counts toward your shift, the whole shift long. The tasks are the work you do while you are there.</div>';
jobs.forEach(function (j, ji) {
var here = onSite(j), inS = j.in_shift !== undefined ? (j.in_shift && shiftNow(j.shift, 0.25)) : shiftNow(j.shift, 0.25), hunt = j.panel === "hunt";
h += '<div class="job"><b>' + esc(j.title) + '</b> <span style="color:var(--dim)">· ' + esc(j.workplace || "") + '</span>' +
'<div style="margin-top:3px">Your hours: <b>' + esc(shiftWords(j.shift)) + '</b> <span style="color:var(--dim)">city time</span> · ' +
(inS ? '<span class="on">on shift now</span>' : '<span class="off">off shift</span> <span style="color:var(--dim)">· next in ' + inWords(shiftUntil(j.shift)) + '</span>') + '</div>' +
'<div style="color:var(--dim);margin-top:2px">' + (j.worked_min || 0) + ' min worked since you were last paid · ' + pay(j) +
(j.ward ? ' · your ward: <b style="color:var(--bone)">' + esc(wardName(j.ward)) + '</b>' : '') + '</div>' +
(j.quota ? ('<div style="color:var(--dim)">' + (hunt ? "Nightmares faced" : "Brought in") + ': <b style="color:var(--bone)">' + (j.units || 0) + '</b> · quota ' + j.quota + ' an hour · ' + j.bonus + ' gold for each over</div>') : '') +
'<div style="margin-top:6px">' + (j.clocked_in ? '<span class="on">Clocked in</span> <button class="btn" data-out="' + ji + '">Clock out</button>' :
(inS || (typeof amKeeper === "function" && amKeeper()) || anyHours(j) ? '<button class="btn" data-in="' + ji + '">' + (inS ? 'Clock in' : anyHours(j) ? 'Clock in (salaried: any time)' : 'Keeper: clock in now') + '</button>' : '<span style="color:var(--dim)">You can clock in when your shift starts.</span>')) +
(!here && !j.roams ? ' <button class="btn" data-way="' + esc(j.workplace) + '">Show me the way</button>' : '') + '</div>';
(j.tasks || []).forEach(function (t, ti) {
var mins = t.kind === "station" || t.kind === "gather" ? Math.round((t.items || 1) * ((t.steps || []).length || 1) * (t.step_secs || 10) / 60) : 0;
h += '<div class="tk"><span>' + esc(t.task) + ' <span style="color:var(--dim);font-size:12px">' + (KIND_WORDS[t.kind] || "") +
(mins ? ' · about ' + mins + ' min' : '') + (t.kind === "round" && t.stops ? ' · ' + t.stops + ' stops' : '') + '</span></span>' +
'<button class="btn" data-job="' + ji + '" data-task="' + ti + '"' + (WORK.busy || !j.clocked_in ? ' disabled' : '') + '>' + (t.kind === "hunt" ? "Go" : "Start") + '</button></div>';
});
h += '</div>';
});
var sv = (WORK.data && WORK.data.services) || [];
if (sv.length) {
h += '<div class="job"><b>What the city needs</b><div style="color:var(--dim);margin:2px 0 6px">Every service wears down by the hour unless somebody works at it.</div>';
sv.slice().sort(function (a, b) { return a.level - b.level; }).forEach(function (s) {
h += '<div style="margin:4px 0"><span>' + esc(s.name) + '</span> <span style="color:var(--dim)">' + s.level + '%</span><div class="bar"><i style="width:' + s.level + '%;background:' + (s.level < 30 ? '#C0603A' : s.level < 60 ? '#C9A868' : '#8FCB8A') + '"></i></div></div>';
});
h += '</div>';
}
el.innerHTML = h;
document.getElementById("work-x").onclick = function () { WORK.open = false; workPaint(); };
document.getElementById("work-pay").onclick = function () { drawPay().then(function () { workRefresh(true); }); };
document.getElementById("work-home").onclick = function () { showTheWayHome(); };
Array.prototype.forEach.call(el.querySelectorAll("[data-way]"), function (x) { x.onclick = function () { showTheWay(x.getAttribute("data-way")); }; });
Array.prototype.forEach.call(el.querySelectorAll("[data-in]"), function (x) { x.onclick = function () { clockIn(jobs[+x.getAttribute("data-in")]); }; });
Array.prototype.forEach.call(el.querySelectorAll("[data-out]"), function (x) { x.onclick = function () { clockOut(jobs[+x.getAttribute("data-out")]); }; });
Array.prototype.forEach.call(el.querySelectorAll("[data-task]"), function (x) {
x.onclick = function () {
var j = jobs[+x.getAttribute("data-job")], t = j.tasks[+x.getAttribute("data-task")];
workStart(j, t);
};
});
},
function (j) {
if (!(typeof amKeeper === "function" && amKeeper()) && !onSite(j) && !j.roams && !(j.tasks || []).every(function (t) { return /round|lamps|beds|hunt/.test(t.kind); })) {
setStatus("Clock in at <b>" + esc(j.workplace) + "</b>. Follow the pointer.");
showTheWay(j.workplace);
return;
}
if (typeof presenceSendNow === "function")
presenceSendNow();
setTimeout(function () {
cityRpc("clock_in", { p_job: j.job_id }).then(function (o) {
if (!o || !o.ok) {
setStatus(esc((o && o.say) || "Could not clock in."));
return;
}
setStatus("<b>Clocked in</b> as " + esc(j.title) + ". Choose a task on your panel. Every minute you are working counts.");
WORK.beatAt = 0;
workRefresh(true);
}).catch(function (e) { setStatus(esc(e.message)); });
}, 400);
},
function (job, task) {
if (WORK.busy)
return;
if (typeof heldNow === "function" && heldNow())
return setStatus("You are held. Work at the yard benches instead.");
if (!job.clocked_in)
return setStatus("Clock in first, inside your hours.");
var steps = (task.steps && task.steps.length ? task.steps : [task.task]);
var B = { job: job, task: task, steps: steps, item: 0, items: task.items || 1, s: 0, t: 0, stepSecs: task.step_secs || 10, chosen: false, stops: null, i: 0, node: null, ref: null, last: Date.now(), seed: (Date.now() % 9973) };
if (task.kind === "round") {
var tgt = task.target || (JOBWORK_TARGETS[job.title] && JOBWORK_TARGETS[job.title][task.task]) || ["streets"];
B.stops = pickStops(tgt, task.stops || JOBWORK_STOPS[job.title + "|" + task.task] || 8);
if (!B.stops.length)
return setStatus("Nowhere to go for that just now.");
var last = B.stops[B.stops.length - 1];
B.ref = last.plot ? last.plot.name : (last.name || null);
}
if (task.kind === "lamps") {
if (typeof wardLamps !== "function")
return setStatus("The lamps are not ready.");
B.stops = wardLamps(job.ward || wardOf(camera.position.x, camera.position.z), task.mode !== "douse");
if (!B.stops.length)
return setStatus(task.mode === "douse" ? "Every lamp in your ward is already out." : "Every lamp in your ward is already lit.");
}
if (task.kind === "beds") {
if (typeof wardBeds !== "function")
return setStatus("The gardens are not ready.");
B.stops = wardBeds(job.ward || wardOf(camera.position.x, camera.position.z));
if (!B.stops.length)
return setStatus("No beds to tend in your ward just now.");
}
if ((task.kind === "station" || task.kind === "desk" || task.kind === "gather") && !onSite(job)) {
setStatus("You have to be at <b>" + esc(job.workplace) + "</b> to do that. Follow the pointer.");
showTheWay(job.workplace);
return;
}
cityRpc("start_task", { p_job: job.job_id, p_task: task.task }).then(function (o) {
if (!o || !o.ok) {
setStatus(esc((o && o.say) || "Could not start."));
return;
}
WORK.busy = B;
WORK.open = false;
workPaint();
workRunPaint();
setStatus("<b>" + esc(task.task) + "</b> — started.");
}).catch(function (e) { setStatus(esc(e.message)); });
},
function () {
var B = WORK.busy;
if (!B)
return;
B.sending = true;
WORK.lastWork = Date.now();
workRunPaint();
cityRpc("do_task", { p_job: B.job.job_id, p_task: B.task.task, p_ref: B.ref }).then(function (o) {
WORK.busy = null;
var r = document.getElementById("work-run");
if (r)
r.style.display = "none";
if (!o || !o.ok) {
setStatus(esc((o && o.say) || "That did not count."));
workRefresh(true);
return;
}
if (o.service)
WORK.svc[o.service] = o.level;
setStatus("<b>" + esc(B.task.task) + "</b> — done." +
(o.units && o.stock ? (" " + o.units + " " + esc(o.stock) + " brought in.") : (B.task.kind === "hunt" ? " One more for the count." : "")) +
(o.service ? (" " + esc((WORK.data && (WORK.data.services || []).filter(function (s) { return s.key === o.service; })[0] || {}).name || o.service) + " stands at " + o.level + "%.") : ""));
workRefresh(true);
}).catch(function (e) { WORK.busy = null; setStatus(esc(e.message)); });
},
function () {
var el = document.getElementById("work-run");
if (!el)
return;
var B = WORK.busy;
if (!B) {
el.style.display = "none";
return;
}
el.style.display = "block";
var P = camera.position, h = "<b>" + esc(B.task.task) + "</b>", k = B.task.kind;
if (B.sending)
h += "<div style='margin-top:6px;color:var(--dim)'>Recording the work…</div>";
else if (k === "round" || k === "report" || k === "lamps" || k === "beds") {
var s = B.stops[B.i];
if (!s) {
el.style.display = "none";
return;
}
var d = Math.hypot(s.x - P.x, s.z - P.z), bearing = Math.atan2(s.x - P.x, s.z - P.z), rel = (bearing - (yaw + Math.PI)) * 180 / Math.PI;
h += "<div style='margin-top:6px'>" + (k === "lamps" ? "Lamp" : "Stop") + " " + (B.i + 1) + " of " + B.stops.length + ": <b>" + esc(s.name || "") + "</b> · " + Math.round(d) + " m " +
"<span class='arrow' style='transform:rotate(" + (-rel).toFixed(0) + "deg)'>↑</span></div>";
if (B.atStop && k !== "report") {
if (k === "beds")
h += bedCardHtml(B, s);
else if (B.chosen) {
var pct = Math.min(100, B.t / B.stepSecs * 100);
h += "<div class='bar'><i style='width:" + pct.toFixed(0) + "%'></i></div><span style='color:var(--dim)'>" + esc(B.steps[0]) + "…</span>";
}
else
h += "<div class='steps'><button class='btn' data-step='" + esc(B.steps[0]) + "'>" + esc(B.steps[0]) + " <span style='color:var(--dim)'>(E)</span></button></div>";
}
}
else if (k === "hunt") {
h += "<div style='margin-top:6px;color:var(--dim)'>" + (inWilds() ? "Find a nightmare and face it — walk up to one and press <b>H</b>." : "Go down past the Harvest Ring into the Nightmare Wilds.") + "</div>";
}
else {
var total = B.items * B.steps.length, done = B.item * B.steps.length + B.s;
if (k === "gather" && !B.atNode)
h += "<div style='margin-top:6px;color:var(--dim)'>Go to " + esc(B.node ? (B.node.label || B.node.archetype || "the work") : "the work") +
(B.node && !B.node.fallback ? " · " + Math.round(Math.hypot(B.node.x - P.x, B.node.z - P.z)) + " m" : "") + "</div>";
h += "<div style='margin-top:4px;color:var(--dim)'>" + (B.items > 1 ? (k === "gather" ? "Haul " : "") + (B.item + 1) + " of " + B.items + " · " : "") + "step " + (B.s + 1) + " of " + B.steps.length + "</div>";
h += "<div class='bar'><i style='width:" + (done / total * 100).toFixed(0) + "%'></i></div>";
if (B.paused)
h += "<span style='color:#C0603A'>Paused — come back to your post</span>";
else if (B.chosen) {
var p2 = Math.min(100, B.t / B.stepSecs * 100);
h += "<div><b>" + esc(B.steps[B.s]) + "</b>…</div><div class='bar'><i style='width:" + p2.toFixed(0) + "%;background:#8FCB8A'></i></div>";
}
else {
h += "<div style='color:var(--dim)'>What comes next?</div><div class='steps'>" + shuffleSteps(B.steps, B.seed + B.item * 7 + B.s).map(function (st) { return "<button class='btn' data-step='" + esc(st) + "'>" + esc(st) + "</button>"; }).join("") + "</div>";
if (B.penalty > 0)
h += "<div style='color:#C0603A;font-size:12px'>A moment…</div>";
}
}
h += "<div style='margin-top:6px'><button class='btn' id='work-stop'>Stop</button></div>";
if (el.dataset.h !== h) {
el.dataset.h = h;
el.innerHTML = h;
var st = document.getElementById("work-stop");
if (st)
st.onclick = function () { workCancel("Left off. You can start the task again."); };
Array.prototype.forEach.call(el.querySelectorAll("[data-step]"), function (x) { x.onclick = function () { workChoose(x.getAttribute("data-step")); }; });
if (B.task.kind === "beds" && typeof bedCardWire === "function")
bedCardWire(el, B);
}
},
function () {
var j = clockedJob();
if (!j)
return;
var B = WORK.busy, active = true;
WORK.moved = 0;
cityRpc("work_beat", { p_job: j.job_id, p_task: B && B.job === j ? B.task.task : ((j.tasks || [])[0] || {}).task || "", p_active: active }).then(function (o) {
if (!o)
return;
if (o.clocked === false) {
j.clocked_in = false;
if (o.say)
setStatus(esc(o.say));
if (WORK.busy)
workCancel();
workRefresh(true);
return;
}
j.worked_min = o.shift_min;
if (!o.ok && o.site && o.site !== "ok" && o.site !== "away" && WORK.offSite !== o.site)
setStatus("Your minutes are not counting while you are " + esc(o.site) + ".");
WORK.offSite = o.ok ? null : o.site;
if (WORK.open)
workPaint();
}).catch(function () { });
}
];
});
