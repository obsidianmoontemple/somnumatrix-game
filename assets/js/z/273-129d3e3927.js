/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(273, function () {
"use strict";
return [
function (key) {
var c = AH.spec[key];
if (c && c.s && store.objects.indexOf(c.s) >= 0)
return c.s;
if (c && !c.s && Date.now() - c.at < 10000)
return null;
var s = null;
var m = /^lot:(\d+)$/.exec(key);
if (m) {
var id = +m[1], rec = (typeof cityLots !== "undefined" && cityLots || []).filter(function (l) { return l.lot_id === id; })[0];
if (rec && typeof lotHome === "function")
s = lotHome(rec.name);
}
else {
var at = store.workplaceAt && store.workplaceAt[key];
if (at && at.id && typeof specById === "function")
s = specById(at.id);
}
AH.spec[key] = { s: s, at: Date.now() };
delete AH.door[key];
return s;
},
function (key) {
return ahAsk("job_board", {}).then(function (rows) {
var held = {};
((typeof standing !== "undefined" && standing && standing.jobs) || []).forEach(function (j) { if (j.job_id)
held[j.job_id] = 1; });
var jobs = (rows || []).filter(function (r) { return r.workplace === key && !r.roams; }).map(function (r) {
var free = Math.max(0, (+r.positions || 0) - (+r.taken || 0));
return { job_id: r.job_id, title: r.title, rate: r.rate, pay_kind: r.pay_kind, positions: r.positions, taken: r.taken, free: free,
auto_hire: r.auto_hire !== false, employer: r.employer || "", city: (r.city != null ? !!r.city : !/^lot:/.test(key)), mine: !!held[r.job_id], applied: !!AH.said[r.job_id] };
});
return { ok: true, place: key, jobs: jobs, old: true };
});
},
function (key) {
AH.busy = true;
ahPanelPaint();
var p = AH.v74 === false ? ahFromJobBoard(key) : ahAsk("openings_here", { p_place: key }).catch(function (e) {
if (ahMissing(e)) {
AH.v74 = false;
return ahFromJobBoard(key);
}
throw e;
});
return p.then(function (o) {
AH.busy = false;
if (!o || !o.ok) {
AH.data = { ok: true, place: key, jobs: [] };
AH.msg = (o && o.say) || "";
}
else {
(o.jobs || []).forEach(function (j) { if (AH.said[j.job_id])
j.applied = true; });
AH.data = o;
var free = (o.jobs || []).reduce(function (a, j) { return a + (j.mine ? 0 : (+j.free || 0)); }, 0);
if (free > 0)
AH.board[key] = free;
else
delete AH.board[key];
}
ahPanelPaint();
}).catch(function (e) { AH.busy = false; AH.msg = String(e && e.message || "The place did not answer. Try again in a moment."); ahPanelPaint(); });
},
function () {
var p = document.getElementById("ah-panel");
if (!p) {
p = document.createElement("div");
p.id = "ah-panel";
p.style.cssText = "position:fixed;left:50%;top:50%;transform:translate(-50%,-50%);z-index:61;width:min(560px,calc(100vw - 24px));max-height:calc(100vh - 40px);" +
"overflow-y:auto;background:rgba(8,10,16,.97);border:1px solid var(--gold,#C9A868);border-radius:6px;padding:16px 18px;font:14px var(--sans,system-ui,sans-serif);color:var(--bone,#EDE8F8)";
p.addEventListener("click", ahClick);
document.body.appendChild(p);
}
p.style.display = "block";
return p;
},
function () {
var p = document.getElementById("ah-panel");
if (!p || !AH.open)
return;
var key = AH.place, name = ahPlaceName(key), signed = typeof signedIn === "function" && signedIn(), member = signed && ahMember();
var h = '<div style="display:flex;justify-content:space-between;align-items:center;gap:10px;margin-bottom:8px">' +
'<b style="font-family:var(--serif,serif);font-size:19px;color:var(--gold,#C9A868)">📋 Hiring at ' + esc(name) + '</b>' +
'<button class="btn" data-ah="close">Close</button></div>';
if (AH.msg)
h += '<div style="margin:0 0 8px;color:#E8C67A">' + AH.msg + '</div>';
if (AH.busy && !AH.data)
return void (p.innerHTML = h + ahDim("Asking at the front desk…"));
var jobs = (AH.data && AH.data.jobs) || [];
var open = jobs.filter(function (j) { return (+j.free || 0) > 0 || j.mine || j.applied; });
if (!open.length)
h += '<p>' + ahDim("No openings here just now. The job board in your panel lists every post in the city.") + '</p>';
if (!signed)
h += '<div style="margin:6px 0 10px;padding:8px 10px;border:1px solid var(--line,rgba(255,255,255,.12));border-radius:4px">Anyone may look. To apply, sign in first. ' +
'<button class="btn" data-ah="signin">Sign in</button></div>';
else if (!member && open.some(function (j) { return j.city; }))
h += '<div style="margin:6px 0 10px;padding:8px 10px;border:1px solid var(--line,rgba(255,255,255,.12));border-radius:4px">' +
'You are visiting. <b>City posts are for members who pay their dues</b>: a job, a home of your own and gold come with membership. ' +
'<button class="btn" data-ah="member">Become a member</button></div>';
open.forEach(function (j) {
var free = +j.free || 0, act = "";
if (j.mine)
act = '<span style="color:#8FCB8A">You work here</span>';
else if (j.applied)
act = ahDim("Your application is in");
else if (free <= 0)
act = ahDim("Full");
else if (!signed)
act = ahDim(free + " free");
else if (j.city && !member)
act = '<button class="btn" data-ah="member">Members only</button>';
else
act = '<button class="btn" data-ah="apply:' + j.job_id + '">' + (j.auto_hire ? "Take it" : "Apply") + '</button> ' + ahDim(free + " free");
if (signed && ahIsKeeper() && !j.mine)
act += ' <button class="btn" data-ah="ktake:' + j.job_id + '" title="Keeper override: take it and clock in now">Keeper: work it</button>';
h += '<div style="padding:9px 0;border-top:1px solid var(--line,rgba(255,255,255,.12))">' +
'<div style="display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap">' +
'<span><b>' + esc(j.title) + '</b>' + (j.employer && j.employer !== name ? ' ' + ahDim('· ' + esc(j.employer)) : '') + '<br>' +
ahDim(esc(ahPay(j)) + ' · ' + (j.auto_hire ? "taken on at once while there is room" : (j.city ? "a keeper chooses" : "the owner chooses"))) + '</span>' +
'<span style="white-space:nowrap">' + act + '</span></div>' +
(AH.asking === j.job_id ? '<div style="margin-top:6px;display:flex;gap:6px;flex-wrap:wrap"><input id="ah-said" maxlength="200" placeholder="A word about why you want it (you can leave it blank)" ' +
'style="flex:1;min-width:180px;background:var(--void,#05060A);border:1px solid var(--line,rgba(255,255,255,.2));color:var(--bone,#EDE8F8);padding:6px 8px;font:14px system-ui,sans-serif">' +
'<button class="btn" data-ah="send:' + j.job_id + '">Send application</button></div>' : '') +
(signed && !member && !j.city && !j.mine && !j.applied && free > 0 ? '<div style="font-size:12px;margin-top:3px">' + ahDim("A visitor may work for a dreamer's business, but no gold reaches a visitor until their dues are paid.") + '</div>' : '') +
'</div>';
});
if (open.length)
h += '<div style="margin-top:10px;font-size:12px">' + ahDim("Posts a keeper or the owner chooses for wait on their answer: you will see it in your standing. Posts taken on at once are yours straight away; clock in at your post in your hours.") + '</div>';
p.innerHTML = h;
var inp = document.getElementById("ah-said");
if (inp && !inp.dataset.f) {
inp.dataset.f = 1;
try {
inp.focus({ preventScroll: true });
}
catch (e) { }
}
},
function (jobId, said) {
AH.busy = true;
AH.msg = "";
ahPanelPaint();
cityRpc("apply_for", { p_job: jobId, p_said: said || null }).then(function (out) {
AH.busy = false;
AH.asking = null;
if (out === "hired") {
AH.msg = "<b>You are hired.</b> Your pay counts the hours you are actually at your post. Clock in from the Work panel when your hours start.";
if (typeof setStatus === "function")
setStatus("<b>You are hired at " + esc(ahPlaceName(AH.place)) + ".</b>");
if (typeof refreshStanding === "function")
refreshStanding();
if (typeof loadWork === "function")
try {
loadWork();
}
catch (e) { }
}
else if (out === "ok") {
AH.said[jobId] = 1;
AH.msg = "<b>Your application is in.</b> Whoever chooses for this post will see it.";
}
else
AH.msg = esc(String(out));
ahLoad(AH.place);
ahLoadBoard(true);
}).catch(function (e) {
AH.busy = false;
AH.asking = null;
var m = String(e && e.message || ""), j = null;
try {
j = JSON.parse(m);
}
catch (x) { }
AH.msg = j && j.message === "reputation" ? "🏅 " + esc(j.hint || "Your reputation closes that door for now.") : esc((j && (j.hint || j.message)) || m || "That didn't go through.");
ahPanelPaint();
});
},
function (e) {
var b = e.target && e.target.closest ? e.target.closest("[data-ah]") : null;
if (!b)
return;
var a = b.getAttribute("data-ah").split(":"), id = +a[1];
if (a[0] === "close")
return ahClose();
if (a[0] === "signin") {
ahClose();
if (typeof openAccountForm === "function")
openAccountForm();
return;
}
if (a[0] === "member") {
ahClose();
if (typeof buyPanel === "function")
buyPanel("city");
else if (typeof setStatus === "function")
setStatus("A job, a home of your own and gold come with membership.");
return;
}
if (a[0] === "ktake") {
if (typeof keeperTakeJob === "function")
keeperTakeJob(id).then(function () { ahLoad(AH.place); });
return;
}
if (a[0] === "apply") {
var j = ((AH.data && AH.data.jobs) || []).filter(function (x) { return x.job_id === id; })[0];
if (j && !j.auto_hire) {
AH.asking = id;
return ahPanelPaint();
}
return ahApply(id, null);
}
if (a[0] === "send") {
var inp = document.getElementById("ah-said");
return ahApply(id, inp ? inp.value.trim() : null);
}
}
];
});
