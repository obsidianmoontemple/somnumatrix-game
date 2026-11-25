/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(127, function () {
"use strict";
return [
function (force) {
if (COURT.missing || !(typeof signedIn === "function" && signedIn()))
return Promise.resolve(null);
var every = inCourthouse() || (COURT.now && COURT.now.session && COURT.now.session.me === "defendant") ? 5000 : 30000;
if (!force && Date.now() - COURT.at < every)
return Promise.resolve(COURT.now);
if (COURT.busy)
return Promise.resolve(COURT.now);
COURT.at = Date.now();
COURT.busy = true;
var ask = COURT.legacy ? courtLegacyNow() : cityRpc("court_now");
return ask.then(function (n) { COURT.busy = false; courtTake(n); return n; }).catch(function (e) {
COURT.busy = false;
if (rpcMissing(e) && !COURT.legacy) {
COURT.legacy = true;
COURT.at = 0;
return null;
}
if (rpcMissing(e))
COURT.missing = true;
return null;
});
},
function () {
return cityRpc("court_docket", { p_open: true }).then(function (d) {
var cs = (d && d.cases) || (Array.isArray(d) ? d : []);
return { session: null, listed: cs.map(function (c) { return { id: c.id, defendant: c.defendant, charge: c.charge, hearing_at: c.hearing_at, phase: c.status === "hearing" ? "listed" : "waiting" }; }),
posts: {}, role: null, police: !!(d && d.police), court: !!(d && d.court), judge: !!(d && d.judge), legacy: true };
});
},
function (n) {
if (!n)
return;
var prev = COURT.now && COURT.now.session, s = n.session;
COURT.now = n;
if (prev && prev.me === "defendant" && (!s || s.id !== prev.id || s.phase === "decided")) {
COURT.holdUntil = Date.now() + 25000;
COURT.mineAt = 0;
cityRpc("court_case", { p_case: prev.id }).then(function (c) {
if (c && c.status && c.status !== "hearing")
setStatus("<b>The verdict: " + esc(c.status.replace("_", " ")) + ".</b> " + esc(c.verdict_note || ""));
}).catch(function () { });
setTimeout(function () { if (typeof refreshStanding === "function")
refreshStanding(); }, 1500);
}
if (s)
courtLines(s);
if (inCourthouse())
courtCastSync();
var sig = JSON.stringify([n.session, n.listed]);
if (COURT.open && sig !== COURT.sig && (COURT.tab === "session" || COURT.tab === "list"))
courtPaint();
COURT.sig = sig;
},
function (role) {
var titles = COURT_ROLES[role] || [], t = (typeof TEMPS !== "undefined" ? TEMPS.list : []).filter(function (x) { return x.post && x.post.workplace === "The Courthouse" && titles.indexOf(x.post.title) >= 0; })[0];
if (t)
return t.name;
var h = hash("court-" + role), f = (h >>> 3) % 2 === 0, given = typeof TEMP_GIVEN_F !== "undefined" ? (f ? TEMP_GIVEN_F : TEMP_GIVEN_M) : ["A"];
return given[(h >>> 5) % given.length] + " " + (typeof SURNAME !== "undefined" ? SURNAME[(h >>> 10) % SURNAME.length] : "");
},
function (role, id) {
var L = randomLook(id, "human");
L.sex = hash(id) % 2 ? "f" : "m";
if (typeof csLookFill === "function")
csLookFill(L, id);
if (typeof jobDress === "function") {
jobDress(L, { judge: "Judge", prosecutor: "Prosecutor", defence: "Public defender", clerk: "Court clerk", bailiff: "Bailiff", usher: "Court usher" }[role] || "Court clerk", "The Courthouse");
if (role === "judge") {
L.backColor = 0x141418;
L.neck = "bowtie";
L.accColor = 0xF2EEE6;
}
return L;
}
if (role === "judge") {
L.top = 0x141418;
L.bottom = 0x141418;
L.gear = "cloak";
L.gearColor = 0x7A1A22;
}
else if (role === "prosecutor" || role === "defence") {
L.top = 0x1E1E24;
L.bottom = 0x26262E;
L.gear = "cloak";
L.gearColor = 0x141418;
}
else if (role === "clerk") {
L.top = 0x3A3A44;
L.bottom = 0x26262E;
L.gear = "none";
}
else {
L.top = 0x23324E;
L.bottom = 0x1E2638;
L.gear = "belt";
}
return L;
},
function () {
if (!inCourthouse()) {
if (COURT.castFor) {
COURT.cast = {};
COURT.castFor = null;
}
return;
}
if (COURT.castFor !== INT) {
COURT.cast = {};
COURT.castFor = INT;
}
Object.keys(COURT_SPOT).forEach(function (role) {
var want = !courtRoleHere(role), have = COURT.cast[role];
if (want && !have) {
var sp = (INT.spots || []).filter(function (q) { return q.room === COURT_SPOT[role]; })[0];
if (!sp)
return;
var id = "__court_" + role, nm = courtStandinName(role);
var g = buildFigure({ id: id, archetype: "human", attrs: {}, look: courtLook(role, id), solid: false, detail: 3, nights: [], city: true }, 1);
g.position.set(sp.x, (sp.level || 0) * (INT.floor || 0), sp.z);
if (role === "judge")
g.position.y += 0.5;
if (role === "clerk") {
g.position.y += 0.08;
g.userData.seated = true;
g.userData.pose = "sit";
}
g.rotation.y = (role === "judge" || role === "clerk") ? 0 : Math.PI;
if (role === "usher")
g.rotation.y = -Math.PI / 2;
var lm = g.userData.limbs;
if (lm && role === "judge") {
lm.la.rotation.x = -0.7;
lm.ra.rotation.x = -0.6;
}
var tag = makeTag(nm + " · " + (role === "defence" ? "Public defender" : COURT_ROLE_WORDS[role]) + " (stand-in)", false);
tag.position.y = 2.15;
g.add(tag);
g.traverse(function (m) { m.raycast = function () { }; });
INT.root.add(g);
COURT.cast[role] = { g: g, name: nm, bub: null, left: 0 };
}
else if (!want && have) {
if (have.g.parent)
have.g.parent.remove(have.g);
delete COURT.cast[role];
}
});
},
function (s) {
var fresh = (s.lines || []).filter(function (l) { return l.id > COURT.lastLine; });
if (!fresh.length)
return;
var first = COURT.lastLine === 0;
COURT.lastLine = Math.max.apply(null, fresh.map(function (l) { return l.id; }));
if (first && fresh.length > 1)
fresh = fresh.slice(-1);
if (!inCourthouse())
return;
fresh.forEach(function (l, i) { setTimeout(function () { courtSpeak(l); }, i * 2200); });
},
function (l) {
var me = typeof myUserId === "function" && myUserId();
var txt = String(l.body || "").slice(0, 220);
if (l.speaker && l.speaker !== me && typeof presenceOthers !== "undefined" && presenceOthers[l.speaker]) {
sayOver(l.speaker, txt);
return;
}
var c = COURT.cast[l.role];
if (c && c.g) {
if (c.bub)
dropTag(c.bub);
c.bub = makeTag(txt, true);
c.bub.position.y = 2.02 + c.bub.scale.y / 2 + 0.28;
c.g.add(c.bub);
c.left = Math.max(6, txt.length / 14);
return;
}
if (l.speaker !== me)
setStatus("<b>" + esc(COURT_ROLE_WORDS[l.role] || l.role) + (l.name ? " (" + esc(l.name) + ")" : "") + ":</b> " + esc(txt));
},
function (msg) {
var s = courtSpec();
if (!s)
return false;
if (!inCourthouse())
enterBuilding(s);
INT.level = 0;
if (typeof wallsAt !== "undefined")
wallsAt = -1;
var d = (INT.spots || []).filter(function (q) { return q.room === "dock"; })[0] || INT.start || { x: 0, z: 0 };
if (d === INT.start)
camera.position.set(d.x, 1.72, d.z);
else
camera.position.set(INT.ox + d.x, 1.72, INT.oz + d.z);
yaw = 0;
if (typeof flyY !== "undefined")
flyY = 0;
if (msg)
setStatus(msg);
return true;
},
function () {
(COURT.mine || []).forEach(function (c) {
var k = c.id + ":" + c.status + ":" + (c.hearing_at || "");
if (COURT.seen[k])
return;
COURT.seen[k] = 1;
if (c.status === "hearing" && c.hearing_at)
setStatus("<b>You are summoned.</b> " + esc(c.charge) + ": the hearing is at The Courthouse at " + courtTime(c.hearing_at) + " city time.");
else if (c.status === "guilty" && (c.fine || 0) > (c.fine_paid || 0))
setStatus("<b>A fine is owing</b> on " + esc(c.charge) + ": " + ((c.fine || 0) - (c.fine_paid || 0)) + " gold. Pay it from the court panel.");
});
},
function () {
var el = document.getElementById("court");
if (el || !document.body)
return el;
var css = document.createElement("style");
css.textContent = "#court-btn{position:fixed;left:12px;bottom:calc(96px + env(safe-area-inset-bottom,0px));z-index:45;display:none;" +
"background:rgba(10,12,18,.92);color:var(--bone);border:1px solid var(--gold,#C9A868);border-radius:3px;padding:9px 13px;font:13px var(--sans);cursor:pointer}" +
"#court{position:fixed;left:12px;bottom:calc(140px + env(safe-area-inset-bottom,0px));z-index:46;display:none;width:min(440px,calc(100vw - 24px));max-height:min(72vh,680px);overflow:auto;" +
"background:rgba(8,10,16,.96);border:1px solid var(--gold,#C9A868);border-radius:4px;padding:12px 14px;font:13px var(--sans);color:var(--bone)}" +
"#court .tabs{display:flex;gap:6px;flex-wrap:wrap;margin:8px 0}#court .tabs .on{border-color:#E8C27A;color:#E8C27A}" +
"#court .ln{padding:3px 0;border-bottom:1px solid var(--line,#2A2C34);line-height:1.45}#court .ln b{color:#E8C27A}" +
"#court .row{display:flex;justify-content:space-between;align-items:center;gap:8px;padding:5px 0;border-bottom:1px solid var(--line,#2A2C34)}" +
"#court textarea,#court input,#court select{background:var(--void,#0A0C10);border:1px solid var(--line,#2A2C34);color:var(--bone);padding:5px 7px;font:13px var(--sans);border-radius:3px}" +
"#court textarea{width:100%;box-sizing:border-box;min-height:52px}#court .dim{color:var(--dim)}#court .act{display:flex;gap:6px;flex-wrap:wrap;margin-top:6px}";
document.head.appendChild(css);
var b = document.createElement("button");
b.id = "court-btn";
b.type = "button";
b.textContent = "The court";
b.onclick = function () { courtToggle(); };
document.body.appendChild(b);
el = document.createElement("div");
el.id = "court";
document.body.appendChild(el);
["keydown", "keyup", "keypress"].forEach(function (k) { el.addEventListener(k, function (e) { if (/INPUT|SELECT|TEXTAREA/.test(e.target.tagName))
e.stopPropagation(); }); });
return el;
},
function () {
var el = courtEls();
if (!el)
return;
if (!COURT.open) {
el.style.display = "none";
return;
}
var kept = {};
Array.prototype.forEach.call(el.querySelectorAll("textarea[id],input[id]"), function (i) { if (i.type !== "checkbox")
kept[i.id] = i.value; });
el.style.display = "block";
var n = COURT.now || {}, roles = courtMyRoles(), staff = courtStaff(), police = !!(n.police || (typeof justiceRoles === "function" && justiceRoles().police));
var tabs = [["session", "In session"], ["list", "The list"], ["mine", "Your cases"]];
if (police || n.court)
tabs.push(["file", "Bring a charge"]);
var h = '<div style="display:flex;justify-content:space-between;align-items:center"><b style="font-size:14px;color:var(--gold,#C9A868)">The Courts of Somnucor</b>' +
'<button class="btn" id="court-x">Close</button></div>' +
'<div class="dim" style="margin-top:4px">City time <b style="color:var(--bone)">' + (typeof hm === "function" && typeof cityHourNow === "function" ? hm(cityHourNow()) : "") + '</b> · the court sits 08:00 to 22:00' +
(Object.keys(roles).length ? ' · you sit as <b style="color:var(--bone)">' + Object.keys(roles).map(function (r) { return COURT_ROLE_WORDS[r]; }).join(", ") + '</b>' : '') + '</div>' +
'<div class="tabs">' + tabs.map(function (t) { return '<button class="btn' + (COURT.tab === t[0] ? " on" : "") + '" data-ctab="' + t[0] + '">' + t[1] + '</button>'; }).join("") + '</div>' +
'<div id="court-msg" class="dim" style="min-height:16px"></div><div id="court-body"></div>';
el.innerHTML = h;
document.getElementById("court-x").onclick = function () { COURT.open = false; courtPaint(); };
Array.prototype.forEach.call(el.querySelectorAll("[data-ctab]"), function (b) { b.onclick = function () { COURT.tab = b.getAttribute("data-ctab"); if (COURT.tab === "mine")
courtMine(true); courtPaint(); }; });
var body = document.getElementById("court-body");
if (COURT.tab === "list")
courtPaintList(body, staff);
else if (COURT.tab === "mine")
courtPaintMine(body);
else if (COURT.tab === "file")
courtPaintFile(body);
else
courtPaintSession(body);
Object.keys(kept).forEach(function (id) { var i = document.getElementById(id); if (i && kept[id])
i.value = kept[id]; });
},
function (name, args, okWords) {
if (typeof WORK !== "undefined")
WORK.lastWork = Date.now();
return cityRpc(name, args).then(function (o) {
var ok = o === "ok" || (o && o.ok);
courtMsg(ok ? (okWords || "Done.") : String((o && o.say) || o), !ok);
courtRefresh(true);
courtMine(true);
return o;
}).catch(function (e) { courtMsg(rpcMissing(e) ? "The court's books need the justice update on the server." : e.message, true); });
},
function (body) {
var s = COURT.now && COURT.now.session;
if (!s) {
var next = ((COURT.now && COURT.now.listed) || []).filter(function (c) { return c.hearing_at; })[0];
body.innerHTML = '<p class="dim" style="line-height:1.6">The court is not sitting just now.' + (next ? ' Next: <b style="color:var(--bone)">' + esc(next.defendant) + '</b>, ' + esc(next.charge) + ', at ' + courtTime(next.hearing_at) + '.' : '') + '</p>' +
(courtMyRoles().usher || courtMyRoles().clerk || courtMyRoles().judge ? (next ? '<div class="act"><button class="btn" data-call="' + next.id + '">Call the next case</button></div>' : '') : '') +
(!inCourthouse() ? '<div class="act"><button class="btn" id="court-way">The way to The Courthouse</button></div>' : '');
courtWire(body);
return;
}
var me = s.me || "gallery", left = courtPhaseLeft(s);
var h = '<div><b>Somnucor against ' + esc(s.defendant) + '</b> · ' + esc(s.charge) + '</div>' +
'<div class="dim" style="margin:2px 0 6px">Now: <b style="color:var(--bone)">' + esc(COURT_PHASE[s.phase] || s.phase) + '</b>' + (left ? ' · ' + left : '') +
(s.absent ? ' · <span style="color:#C0603A">heard in their absence</span>' : '') + (s.remand ? ' · held on remand' : '') + '</div>';
h += '<div style="max-height:200px;overflow:auto;margin-bottom:6px">' + (s.lines || []).slice(-14).map(function (l) {
return '<div class="ln"><b>' + esc(COURT_ROLE_WORDS[l.role] || l.role) + '</b>' + (l.name ? ' <span class="dim">(' + esc(l.name) + ')</span>' : '') + ' ' + esc(l.body) + '</div>';
}).join("") + '</div>';
if (s.phase === "decided") {
h += '<div class="ln"><b>Verdict</b> ' + esc(s.status === "not_guilty" ? "not guilty" : s.status) + ' — ' + esc(s.verdict_note || "") + '</div>';
}
var act = "", live = !!COURT_LIVE[s.phase];
if (me === "defendant") {
if (live && !inCourthouse())
act += '<button class="btn" id="court-dock">Go to the dock</button>';
if (s.phase === "plea" && !s.plea)
act += '<div style="width:100%"><textarea id="court-stmt" placeholder="anything you want to say for yourself (optional)"></textarea></div>' +
'<button class="btn" data-plea="guilty">Plead guilty</button><button class="btn" data-plea="not_guilty">Plead not guilty</button>';
if (s.phase === "defence" || s.phase === "plea" && s.plea)
act += '<button class="btn" data-adv="1">I have said my piece</button>';
if (s.phase === "called" && inCourthouse())
act += '<button class="btn" data-adv="1">I am here</button>';
}
if (me === "prosecutor" && s.phase === "prosecution")
act += '<button class="btn" data-adv="1">Rest the case for Somnucor</button>';
if (me === "defence" && s.phase === "defence")
act += '<button class="btn" data-adv="1">Rest the defence</button>';
if ((me === "usher" || me === "clerk") && live && s.phase !== "deliberation")
act += '<button class="btn" data-adv="1">Move the court on</button>';
if ((me === "bailiff" || me === "judge" || me === "usher") && live && !s.here)
act += '<button class="btn" data-bring="1">Bring the defendant</button>';
if (me === "judge" && live)
act += '<button class="btn" data-adv="1">Move on</button>';
if (me === "juror" && s.phase === "deliberation")
act += '<button class="btn" data-vote="guilty">Guilty</button><button class="btn" data-vote="not_guilty">Not guilty</button>' +
(s.jury && s.jury.mine && s.jury.mine !== "joined" ? ' <span class="dim">you said: ' + esc(s.jury.mine.replace("_", " ")) + '</span>' : '');
if (me === "gallery" && (s.phase === "called" || s.phase === "plea") && !(s.jury && s.jury.mine))
act += '<button class="btn" data-jury="' + s.id + '">Sit on the jury</button>';
if (live && me !== "gallery" && !(me === "juror" && s.phase !== "deliberation"))
act = '<div style="width:100%"><textarea id="court-say" placeholder="speak to the court, as ' + esc(COURT_ROLE_WORDS[me] || me) + '"></textarea></div><button class="btn" id="court-speak">Speak</button>' + act;
if (act)
h += '<div class="act">' + act + '</div>';
if (me === "judge" && live && s.phase !== "deliberation")
h += '<div class="dim" style="margin-top:8px">The verdict is given at the end of the trial, from the bench, once the plea, both cases and the evidence are heard.</div>';
if (me === "judge" && s.phase === "deliberation") {
h += '<div style="margin-top:10px;border-top:1px solid var(--line);padding-top:8px"><b>The verdict</b>' +
(s.jury && s.jury.n ? ' <span class="dim">· the jury: ' + s.jury.voted + ' of ' + s.jury.n + ' have voted</span>' : '') +
'<div class="act"><select id="court-v"><option value="guilty">Guilty</option><option value="not_guilty">Not guilty</option><option value="dismissed">Dismissed</option></select>' +
'<label>Gaol hours <input id="court-h" type="number" min="0" max="720" value="2" style="width:56px"></label>' +
'<label><input id="court-wo" type="checkbox" checked> or worked off in <input id="court-wh" type="number" min="1" value="1" style="width:48px"> h</label>' +
'<label>Fine <input id="court-f" type="number" min="0" value="20" style="width:64px"></label></div>' +
'<input id="court-note" placeholder="your reasons, for the record" style="width:100%;box-sizing:border-box;margin-top:6px">' +
'<div class="act"><button class="btn" id="court-rule">Give the verdict</button></div></div>';
}
if (!inCourthouse() && me !== "defendant")
h += '<div class="act"><button class="btn" id="court-way">The way to The Courthouse</button></div>';
body.innerHTML = h;
courtWire(body, s);
},
function (body, s) {
var $ = function (id) { return document.getElementById(id); };
var way = $("court-way");
if (way)
way.onclick = function () { if (typeof showTheWay === "function")
showTheWay("The Courthouse"); };
var dock = $("court-dock");
if (dock)
dock.onclick = function () { courtToDock("<b>You take your place in the dock.</b>"); COURT.open = true; courtPaint(); };
var sp = $("court-speak");
if (sp)
sp.onclick = function () {
var t = ($("court-say").value || "").trim();
if (!t)
return;
var role = s.me;
if (role === "prosecutor" && !s.prosecution)
cityRpc("case_argue", { p_case: s.id, p_side: "prosecution", p_text: t }).catch(function () { });
courtDo("court_say", { p_case: s.id, p_text: t }, "Said.");
};
Array.prototype.forEach.call(body.querySelectorAll("[data-plea]"), function (b) {
b.onclick = function () {
var st = $("court-stmt");
courtDo("plead", { p_case: s.id, p_plea: b.getAttribute("data-plea"), p_statement: st ? (st.value || "").trim() || null : null }, "Your plea is entered.");
};
});
Array.prototype.forEach.call(body.querySelectorAll("[data-adv]"), function (b) { b.onclick = function () { courtDo("court_advance", { p_case: s.id }, "The court moves on."); }; });
Array.prototype.forEach.call(body.querySelectorAll("[data-bring]"), function (b) { b.onclick = function () { courtDo("court_bring", { p_case: s.id }, "The defendant is sent for."); }; });
Array.prototype.forEach.call(body.querySelectorAll("[data-vote]"), function (b) { b.onclick = function () { courtDo("court_jury_vote", { p_case: s.id, p_vote: b.getAttribute("data-vote") }, "Your vote is given."); }; });
Array.prototype.forEach.call(body.querySelectorAll("[data-jury]"), function (b) { b.onclick = function () { courtDo("court_jury_join", { p_case: +b.getAttribute("data-jury") }, "You are sworn to the jury."); }; });
Array.prototype.forEach.call(body.querySelectorAll("[data-call]"), function (b) { b.onclick = function () { courtDo("court_call", { p_case: +b.getAttribute("data-call") }, "The case is called."); }; });
var ru = $("court-rule");
if (ru)
ru.onclick = function () {
var v = $("court-v").value, g = v === "guilty";
var args = { p_case: s.id, p_verdict: v, p_hours: g ? Math.max(0, +$("court-h").value || 0) : null, p_work_off: g && $("court-wo").checked,
p_work_hours: g && $("court-wo").checked ? Math.max(1, +$("court-wh").value || 1) : null, p_fine: g ? Math.max(0, +$("court-f").value || 0) : 0, p_note: ($("court-note").value || "").trim() || null };
cityRpc("court_rule", args).then(function (o) { courtMsg(o === "ok" ? "The verdict is given." : String(o), o !== "ok"); courtRefresh(true); })
.catch(function (e) { if (rpcMissing(e))
courtDo("rule", args, "The verdict is given.");
else
courtMsg(e.message, true); });
};
},
function (body, staff) {
var rows = (COURT.now && COURT.now.listed) || [], r = courtMyRoles(), lister = r.clerk || r.judge || !!(COURT.now && COURT.now.court);
body.innerHTML = (rows.length ? rows.map(function (c) {
return '<div class="row"><span><b>' + esc(c.defendant) + '</b> · ' + esc(c.charge) + '<br><span class="dim" style="font-size:12px">' + esc(COURT_PHASE[c.phase] || c.phase) +
(c.hearing_at ? ' · ' + courtTime(c.hearing_at) + ' city time' : '') + (c.mine ? ' · your case' : '') + '</span></span><span style="white-space:nowrap">' +
(lister && (c.phase === "waiting" || c.phase === "listed") ? '<input data-at="' + c.id + '" placeholder="hh:mm" style="width:58px"> <button class="btn" data-list="' + c.id + '">List</button> ' : '') +
((r.usher || r.clerk || r.judge) && c.phase === "listed" ? '<button class="btn" data-call="' + c.id + '">Call</button> ' : '') +
(!staff && !c.mine && (c.phase === "listed" || c.phase === "waiting") ? '<button class="btn" data-jury="' + c.id + '">Jury</button>' : '') +
'</span></div>';
}).join("") : '<p class="dim">Nothing on the list. The city is keeping the peace.</p>') +
'<p class="dim" style="font-size:12px;line-height:1.5;margin-top:8px">The clerk lists every charge for a sitting; any not listed in three minutes, the stand-in clerk lists for the next one. Anyone not of the court or the Corp may sit on a jury, up to six to a case.</p>';
Array.prototype.forEach.call(body.querySelectorAll("[data-list]"), function (b) {
b.onclick = function () {
var id = b.getAttribute("data-list"), at = courtAt((body.querySelector('[data-at="' + id + '"]') || {}).value);
if (!at)
return courtMsg("A time, city time, like 14:30.", true);
cityRpc("court_list", { p_case: +id, p_at: at }).then(function (o) { courtMsg(o === "ok" ? "Listed." : String(o), o !== "ok"); courtRefresh(true); })
.catch(function (e) { if (rpcMissing(e))
courtDo("set_hearing", { p_case: +id, p_at: at }, "Listed.");
else
courtMsg(e.message, true); });
};
});
courtWire(body, null);
},
function (body) {
var rows = COURT.mine || [];
body.innerHTML = rows.length ? rows.map(function (c) {
var open = c.status === "filed" || c.status === "pleaded" || c.status === "hearing", owe = (c.fine || 0) - (c.fine_paid || 0);
return '<div class="row" style="display:block"><div><b>' + esc(c.charge) + '</b> · <span class="dim">' + esc(c.status.replace("_", " ")) + '</span>' +
(c.hearing_at && open ? ' · hearing at <b>' + courtTime(c.hearing_at) + '</b> city time' : '') + '</div>' +
(c.detail ? '<div class="dim" style="font-size:12px">' + esc(c.detail) + '</div>' : '') +
(c.verdict_note ? '<div style="font-size:12px;margin-top:3px">' + esc(c.verdict_note) + '</div>' : '') +
(c.advocate ? '<div class="dim" style="font-size:12px">Your advocate: ' + esc(c.advocate) + '</div>' : (open ? '<div class="dim" style="font-size:12px">A public defender will speak for you if no advocate does.</div>' : '')) +
(open && !c.plea ? '<div class="act"><textarea data-st="' + c.id + '" placeholder="your own account (optional)"></textarea>' +
'<button class="btn" data-mplea="' + c.id + '" data-p="not_guilty">Plead not guilty</button><button class="btn" data-mplea="' + c.id + '" data-p="guilty">Plead guilty</button></div>' :
(open && c.plea ? '<div class="dim" style="font-size:12px">You have pleaded ' + esc(c.plea.replace("_", " ")) + '.</div>' : '')) +
(open ? '<div class="act"><button class="btn" id="court-way">The way to The Courthouse</button></div>' : '') +
(c.status === "guilty" && owe > 0 ? '<div class="act"><span>' + owe + ' gold of the fine is owing.</span><button class="btn" data-pay="' + c.id + '">Pay the fine</button></div>' : '') +
'</div>';
}).join("") : '<p class="dim">No cases against you. Long may it last.</p>';
Array.prototype.forEach.call(body.querySelectorAll("[data-mplea]"), function (b) {
b.onclick = function () {
var id = b.getAttribute("data-mplea"), st = body.querySelector('[data-st="' + id + '"]');
courtDo("plead", { p_case: +id, p_plea: b.getAttribute("data-p"), p_statement: st ? (st.value || "").trim() || null : null }, "Your plea is entered.");
};
});
Array.prototype.forEach.call(body.querySelectorAll("[data-pay]"), function (b) {
b.onclick = function () {
courtDo("pay_fine", { p_case: +b.getAttribute("data-pay") }, "Paid into the treasury.").then(function () { if (typeof refreshStanding === "function")
refreshStanding(); });
};
});
courtWire(body, null);
},
function (body) {
body.innerHTML = '<p class="dim" style="line-height:1.5">A charge goes to the clerk, who lists it for a sitting. The Corp\'s report, if there is one, is the evidence.</p>' +
'<div class="act"><input id="court-q" placeholder="their name" style="flex:1"><button class="btn" id="court-find">Find</button></div>' +
'<div id="court-found" style="margin:6px 0"></div>' +
'<div class="act"><input id="court-charge" placeholder="the charge, e.g. assault" style="flex:1"></div>' +
'<textarea id="court-detail" placeholder="what happened, and what was seen" style="margin-top:6px"></textarea>' +
'<div class="act"><button class="btn" id="court-file">File the charge</button></div>';
dreamerPicker(document.getElementById("court-q"), document.getElementById("court-find"), document.getElementById("court-found"));
document.getElementById("court-file").onclick = function () {
var who = (document.querySelector('#court-found input[name="dp"]:checked') || {}).value;
var ch = (document.getElementById("court-charge").value || "").trim(), de = (document.getElementById("court-detail").value || "").trim();
if (!who || !ch)
return courtMsg("Whom, and the charge.", true);
courtDo("file_charge", { p_user: who, p_charge: ch, p_detail: de || null }, "Filed. The clerk will list it.");
};
},
function (input, btn, out) {
var go = function () {
var q = (input.value || "").trim();
if (q.length < 2) {
out.innerHTML = '<span class="dim">Two letters at least.</span>';
return;
}
out.innerHTML = '<span class="dim">Looking…</span>';
cityRpc("find_dreamer", { p_q: q }).then(function (rows) {
rows = rows || [];
out.innerHTML = rows.length ? rows.map(function (r, i) { return '<label style="display:block;padding:2px 0"><input type="radio" name="dp" value="' + esc(r.user_id) + '"' + (i === 0 ? " checked" : "") + '> ' + esc(r.name || "a dreamer") + '</label>'; }).join("") :
'<span class="dim">Nobody by that name — or you are not of the Corp or the court.</span>';
}).catch(function (e) { out.innerHTML = '<span style="color:#C0603A">' + esc(e.message) + '</span>'; });
};
btn.onclick = go;
input.onkeydown = function (e) { if (e.key === "Enter")
go(); };
}
];
});
