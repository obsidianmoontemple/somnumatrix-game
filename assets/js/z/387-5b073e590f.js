/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(387, function () {
return [
function (name, body) {
if (typeof signedIn === "function" && signedIn())
return cityRpc(name, body);
if (typeof DW_CONFIG === "undefined" || !DW_CONFIG.supabaseUrl)
return Promise.reject(new Error("offline"));
return fetch(DW_CONFIG.supabaseUrl.replace(/\/+$/, "") + "/rest/v1/rpc/" + name, { method: "POST",
headers: { apikey: DW_CONFIG.supabaseKey, Authorization: "Bearer " + DW_CONFIG.supabaseKey, "Content-Type": "application/json" }, body: JSON.stringify(body || {}) })
.then(function (r) { return r.ok ? r.json() : r.text().then(function (t) { throw new Error(t || "that didn't go through"); }); });
},
function (force) {
if (CLG.busy)
return Promise.resolve();
if (!force && CLG.list && Date.now() - CLG.at < 600000)
return Promise.resolve();
CLG.busy = true;
var a = clgRpc("college_list", {}).then(function (L) { CLG.list = Array.isArray(L) ? L : []; CLG.at = Date.now(); }, function () { if (!CLG.list)
CLG.list = []; CLG.msg = CLG.msg || ""; });
var b = (typeof signedIn === "function" && signedIn()) ? cityRpc("college_my", {}).then(function (M) { CLG.mine = Array.isArray(M) ? M : []; }, function () { }) : Promise.resolve();
return Promise.all([a, b]).then(function () { CLG.busy = false; }, function () { CLG.busy = false; });
},
function () {
var p = document.getElementById("clg-panel");
if (!p || p.style.display === "none")
return;
var L = CLG.list || [], M = CLG.mine || [], inn = typeof signedIn === "function" && signedIn();
var h = "<div style='display:flex;justify-content:space-between;align-items:center'><div style='font:600 19px var(--serif,Georgia);color:#FFE7B0'>🎓 College courses</div><span data-clg='x' role='button' tabindex='0' aria-label='Close' style='cursor:pointer;font-size:18px;opacity:.75'>✕</span></div>" +
"<p style='margin:6px 0 10px;opacity:.85'>Online colleges that partner with the City School. Pick a course to go to the college's own page: you apply, enrol and pay there, with the college, and the college awards the credit. Your referral code shows the college you came from SomnuMatrix. Under 18? Ask a parent or guardian first.</p>";
if (CLG.list === null)
h += "<p style='opacity:.8'>Looking up the partner colleges…</p>";
else if (!L.length)
h += "<p style='opacity:.8'>No partner colleges are taking students just now. They appear here as they join.</p>";
L.forEach(function (P, pi) {
var site = clgSafeUrl(P.site);
h += "<div style='margin:10px 0;padding:10px 12px;border:1px solid rgba(143,180,232,.35);border-radius:8px;background:rgba(143,180,232,.06)'>" +
"<div style='font-weight:600;font-size:15.5px'>" + esc(P.name) + (site ? " <a href='" + esc(site) + "' target='_blank' rel='noopener' style='font-weight:400;font-size:12.5px;color:#8FB4E8'>website</a>" : "") + "</div>" +
(P.about ? "<div style='opacity:.8;font-size:13px;margin:3px 0 6px'>" + esc(P.about) + "</div>" : "") +
(Array.isArray(P.courses) ? P.courses : []).map(function (c, ci) {
var my = M.filter(function (m) { return m.partner === P.id && m.course === c.code; })[0];
return "<div style='display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin:5px 0;padding:6px 0;border-top:1px solid rgba(143,180,232,.15)'>" +
"<div style='flex:1 1 220px;font-size:13.5px'><b>" + esc(c.code) + "</b> · " + esc(c.title) +
"<div style='opacity:.7;font-size:12px'>" + [c.credits ? esc(c.credits) + " credits" : "", c.price ? esc(c.price) + " at the college" : "", my ? "<span style='color:#9FE0A8'>" + esc(CLG_STATUS[my.status] || my.status) + " · " + esc(my.code) + "</span>" : ""].filter(Boolean).join(" · ") + "</div></div>" +
"<button class='btn" + (my ? "" : " primary") + "' type='button' data-clg='go' data-p='" + pi + "' data-c='" + ci + "'>" + (my ? "Open again" : "Go to this course") + "</button></div>";
}).join("") +
"</div>";
});
if (inn && M.length)
h += "<div style='margin-top:12px;font-weight:600;opacity:.9'>My college courses</div>" + M.slice(0, 20).map(function (m) {
return "<div style='font-size:13px;margin:4px 0'>" + esc(m.college) + " · " + esc(m.title || m.course) + " · <b>" + esc(CLG_STATUS[m.status] || m.status) + "</b> <span style='opacity:.6'>(" + esc(m.code) + ")</span></div>";
}).join("");
if (!inn)
h += "<p style='font-size:13px;color:#F0C040'>Sign in to go to a course, so the college and your City School record know it is you.</p>";
h += "<div id='clg-msg' style='min-height:18px;font-size:13px;color:#F0C040;margin-top:6px'>" + (CLG.msg || "") + "</div>" +
"<p style='font-size:12px;opacity:.6;margin:8px 0 0'>The City School is a standards-aligned, openly licensed K-12 curriculum. College courses, admission, fees and credit are the partner college's own.</p>";
p.innerHTML = h;
},
function () {
var p = document.getElementById("clg-panel");
if (!p) {
p = document.createElement("div");
p.id = "clg-panel";
p.style.cssText = "position:fixed;left:50%;top:50%;transform:translate(-50%,-50%);z-index:70;width:min(560px,calc(100vw - 24px));max-height:calc(100vh - 40px);overflow:auto;box-sizing:border-box;" +
"background:rgba(10,14,24,.97);border:1px solid #8FB4E8;border-radius:10px;padding:16px 18px;font:14px/1.5 var(--sans,system-ui);color:#E8ECF4;box-shadow:0 10px 40px rgba(0,0,0,.5)";
document.body.appendChild(p);
p.addEventListener("keydown", function (e) { e.stopPropagation(); if (e.key === "Escape")
clgClose(); });
p.addEventListener("keyup", function (e) { e.stopPropagation(); });
}
p.style.display = "block";
CLG.msg = "";
clgPaint();
try {
if (document.pointerLockElement)
document.exitPointerLock();
}
catch (e) { }
clgLoad(true).then(clgPaint);
},
function (pi, ci) {
var P = (CLG.list || [])[pi], c = P && P.courses && P.courses[ci];
if (!c)
return;
if (!(typeof signedIn === "function" && signedIn())) {
CLG.msg = "Sign in first, then come back to College courses.";
clgPaint();
return;
}
var w = null;
try {
w = window.open("about:blank", "_blank");
if (w)
w.opener = null;
}
catch (e) { }
CLG.msg = "Getting your referral code…";
clgPaint();
cityRpc("college_refer", { p_partner: P.id, p_course: c.code }).then(function (o) {
if (!o || !o.ok) {
if (w)
try {
w.close();
}
catch (e) { }
CLG.msg = esc((o && o.say) || "That did not go through.");
clgPaint();
return;
}
var url = clgLink(o.url, o.code);
if (url && w)
w.location.href = url;
else if (url)
window.open(url, "_blank", "noopener");
else if (w)
try {
w.close();
}
catch (e) { }
CLG.msg = "Your referral code is <b>" + esc(o.code) + "</b>. If the college asks how you heard of them, give them this code." + (url ? " <a href='" + esc(url) + "' target='_blank' rel='noopener' style='color:#8FB4E8'>Open the course page</a>" : " The college's page is not set yet; ask the Keeper.");
if (typeof setStatus === "function")
setStatus("🎓 Off to " + esc(P.name) + " · " + esc(c.title) + ". Referral code <b>" + esc(o.code) + "</b>.");
return clgLoad(true).then(clgPaint);
}).catch(function (e) { if (w)
try {
w.close();
}
catch (x) { } CLG.msg = /college_refer|PGRST202|schema cache/.test(String(e && e.message)) ? "College courses are not open on the server yet." : "That did not go through. Try again."; clgPaint(); });
}
];
});
