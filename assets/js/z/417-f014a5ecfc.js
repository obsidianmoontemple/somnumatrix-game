/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(417, function () {
"use strict";
return [
function (b) {
AIC.b = b;
var s = aicSession();
if (s)
aicLines(s);
aicDockSync();
aicCellsSync();
var sig = JSON.stringify([s && [s.id, s.phase, s.lines.length, s.jury], b.listed, b.held.length, b.record.length && b.record[0].id]);
if (COURT.open && sig !== AIC.sig && (COURT.tab === "session" || COURT.tab === "gaol" || COURT.tab === "record"))
courtPaint();
AIC.sig = sig;
},
function (s) {
var last = AIC.lastN[s.id] || 0, fresh = (s.lines || []).filter(function (l) { return l.n > last; });
if (!fresh.length)
return;
AIC.lastN[s.id] = fresh[fresh.length - 1].n;
if (!inCourthouse())
return;
if (!last && fresh.length > 1)
fresh = fresh.slice(-1);
fresh.forEach(function (l, i) { setTimeout(function () { aicSpeak(l); }, i * 2400); });
},
function (l) {
if (!inCourthouse())
return;
var txt = String(l.body || "").slice(0, 220);
if (l.role === "defendant" && AIC.dock) {
if (AIC.dock.bub)
dropTag(AIC.dock.bub);
AIC.dock.bub = makeTag(txt, true);
AIC.dock.bub.position.y = 2.02 + AIC.dock.bub.scale.y / 2 + 0.28;
AIC.dock.g.add(AIC.dock.bub);
AIC.dock.left = Math.max(6, txt.length / 14);
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
setStatus("<b>" + esc(COURT_ROLE_WORDS[l.role] || l.role) + (l.name ? " (" + esc(aicWho(l)) + ")" : "") + ":</b> " + esc(txt));
},
function (p, tagText, seat) {
var id = "__aic_" + p.id, L = randomLook(id, "human");
L.sex = p.sex === "f" || p.sex === "m" ? p.sex : (hash(id) % 2 ? "f" : "m");
if (typeof csLookFill === "function")
csLookFill(L, id);
L.top = 0x8A8478;
L.bottom = 0x5E5A52;
L.gear = "none";
var g = buildFigure({ id: id, archetype: "human", attrs: {}, look: L, solid: false, detail: 3, nights: [], city: true }, 1);
if (seat) {
g.userData.seated = true;
g.userData.pose = "sit";
}
var tag = makeTag(tagText, false);
tag.position.y = 2.15;
g.add(tag);
g.traverse(function (m) { m.raycast = function () { }; });
return g;
},
function () {
var s = aicSession(), want = inCourthouse() && s && AIC_LIVE[s.phase] && s.phase !== "appeal" ? s.id : null;
if (AIC.dock && (AIC.dock.id !== want || AIC.dockFor !== INT)) {
aicDrop(AIC.dock);
AIC.dock = null;
}
if (!want || AIC.dock)
return;
var sp = (INT.spots || []).filter(function (q) { return q.room === "dock"; })[0];
if (!sp)
return;
var g = aicFigure(s, s.name + " · the defendant", false);
g.position.set(sp.x, (sp.level || 0) * (INT.floor || 0), sp.z);
g.rotation.y = Math.PI;
INT.root.add(g);
AIC.dock = { id: s.id, g: g, bub: null, left: 0 };
AIC.dockFor = INT;
},
function () {
var inG = aicInGaol();
if (AIC.gaolFor !== (inG ? INT : null)) {
Object.keys(AIC.cells).forEach(function (k) { aicDrop(AIC.cells[k]); });
AIC.cells = {};
AIC.gaolFor = inG ? INT : null;
}
if (!inG)
return;
var held = ((AIC.b && AIC.b.held) || []).filter(function (p) { return p.cell && p.status !== "trial"; }), keep = {};
held.forEach(function (p) {
var k = String(p.id), txt = aicCellText(p), have = AIC.cells[k];
keep[k] = 1;
if (have && have.txt === txt)
return;
if (have)
aicDrop(have);
var sp = (INT.spots || []).filter(function (q) { return q.room === "cell" && q.cell === p.cell; })[0];
if (!sp) {
delete AIC.cells[k];
return;
}
var seat = hash("cell" + p.id) % 2 === 0, g = aicFigure(p, txt, seat);
g.position.set(sp.x, (sp.level || 0) * (INT.floor || 0), sp.z);
g.rotation.y = hash("r" + p.id) % 628 / 100;
INT.root.add(g);
AIC.cells[k] = { g: g, txt: txt };
});
Object.keys(AIC.cells).forEach(function (k) { if (!keep[k]) {
aicDrop(AIC.cells[k]);
delete AIC.cells[k];
} });
if (Date.now() - AIC.told > 120000) {
AIC.told = Date.now();
setStatus(held.length ? "<b>The Gaol.</b> " + held.length + " held in the cells. Each name plate says what for, and when they go before the court or come out." : "<b>The Gaol.</b> The cells are empty just now.");
}
},
function (body, s) {
var b = AIC.b || {}, me = s.me || "gallery", here = inCourthouse(), live = !!AIC_LIVE[s.phase];
var h = '<div><b>Somnucor against ' + esc(s.name) + '</b> · ' + esc(s.charge) + ' at ' + esc(s.place) + '</div>' +
'<div class="dim" style="margin:2px 0 6px">Now: <b style="color:var(--bone)">' + esc(AIC_PHASE[s.phase] || s.phase) + '</b>' +
(s.plea ? ' · pleads ' + esc(s.plea.replace("_", " ")) : '') + (s.jury && s.jury.n ? ' · a jury of ' + s.jury.n : '') + '</div>' +
'<div style="max-height:200px;overflow:auto;margin-bottom:6px">' + (s.lines || []).slice(-14).map(aicLn).join("") + '</div>';
var act = "";
if (here && live && me !== "gallery")
act += '<div style="width:100%"><textarea id="aic-say" placeholder="speak to the court, as ' + esc(COURT_ROLE_WORDS[me] || me) + '"></textarea></div><button class="btn" id="aic-speak">Speak</button>';
if (here && (me === "judge" || me === "clerk" || me === "usher" || me === "prosecutor" || me === "defence") && live && s.phase !== "deliberation" && s.phase !== "appeal")
act += '<button class="btn" id="aic-move">Move the court on</button>';
if (here && b.adult && me !== "juror" && (s.phase === "called" || s.phase === "plea" || s.phase === "prosecution") && !(s.jury && s.jury.mine))
act += '<button class="btn" data-aicvote="join">Sit on the jury</button>';
if (me === "juror" && s.phase === "deliberation")
act += '<button class="btn" data-aicvote="guilty">Guilty</button><button class="btn" data-aicvote="not_guilty">Not guilty</button>' +
(s.jury && s.jury.mine && s.jury.mine !== "joined" ? ' <span class="dim">you said: ' + esc(s.jury.mine.replace("_", " ")) + '</span>' : '');
if (act)
h += '<div class="act">' + act + '</div>';
if (me === "judge" && s.phase === "deliberation") {
h += '<div style="margin-top:10px;border-top:1px solid var(--line);padding-top:8px"><b>The verdict</b>' +
'<div class="act"><select id="aic-v"><option value="guilty">Guilty</option><option value="not_guilty">Not guilty</option><option value="dismissed">Dismissed</option></select>' +
'<select id="aic-k"><option value="gaol">Gaol</option><option value="community">Community work</option><option value="fine">A fine</option></select>' +
'<label>Minutes <input id="aic-m" type="number" min="0" max="' + (b.max_minutes || 120) + '" value="30" style="width:56px"></label></div>' +
'<input id="aic-note" placeholder="your reasons, for the record" style="width:100%;box-sizing:border-box;margin-top:6px">' +
'<div class="act"><button class="btn" id="aic-rule">Give the verdict</button></div>' +
'<div class="dim">Never more than ' + (b.max_minutes || 120) + ' minutes. Time held on remand counts.</div></div>';
}
if (!here)
h += '<div class="act"><button class="btn" id="court-way">The way to The Courthouse</button></div>';
else if (me === "gallery")
h += '<div class="dim" style="margin-top:6px">You watch from the gallery.' + (b.adult ? ' Grown-ups may sit on the jury before the evidence.' : '') + '</div>';
body.innerHTML = h;
aicWire(body, s);
},
function (name, args) {
if (typeof WORK !== "undefined")
WORK.lastWork = Date.now();
return cityRpc(name, args).then(function (o) { courtMsg(String((o && o.say) || "Done."), !(o && o.ok)); aicRefresh(true); })
.catch(function (e) { courtMsg(rpcMissing(e) ? "The court's books for the city's own cases need the latest server update on the server." : e.message, true); });
},
function (body, s) {
var $ = function (id) { return document.getElementById(id); };
var way = $("court-way");
if (way)
way.onclick = function () { if (typeof showTheWay === "function")
showTheWay("The Courthouse"); };
var sp = $("aic-speak");
if (sp)
sp.onclick = function () { var t = ($("aic-say").value || "").trim(); if (t) {
$("aic-say").value = "";
aicDo("ai_court_say", { p_case: s.id, p_body: t });
} };
var mv = $("aic-move");
if (mv)
mv.onclick = function () { aicDo("ai_court_move", { p_case: s.id }); };
Array.prototype.forEach.call(body.querySelectorAll("[data-aicvote]"), function (b) { b.onclick = function () { aicDo("ai_court_jury", { p_case: s.id, p_vote: b.getAttribute("data-aicvote") }); }; });
var ru = $("aic-rule");
if (ru)
ru.onclick = function () {
aicDo("ai_court_rule", { p_case: s.id, p_verdict: $("aic-v").value, p_kind: $("aic-k").value, p_minutes: Math.max(0, +$("aic-m").value || 0), p_note: ($("aic-note").value || "").trim() || null });
};
},
function (body) {
var b = AIC.b;
if (!b) {
body.innerHTML = '<p class="dim">' + (AIC.missing ? "The Gaol's book for the city's own cases needs the latest server update on the server." : "Opening the Gaol's book...") + '</p>';
aicRefresh(true);
return;
}
var held = b.held || [], listed = b.listed || [];
var h = '<p class="dim" style="line-height:1.6">Those the Corp has caught. Held on remand until the court hears them, or bailed on a light charge; after a verdict, serving their minutes or working them off where they did the harm. Nobody under 18 is ever held.</p>';
h += held.length ? held.map(function (p) {
var where = p.cell ? "cell " + p.cell : (p.status === "community" ? "at " + p.place : "on bail");
var when = p.status === "serving" || p.status === "community" ? (p.release_at ? "done at " + courtTime(p.release_at) : "") : (p.hearing_at ? "before the court at " + courtTime(p.hearing_at) : "in court now");
return '<div class="ln"><b>' + esc(p.name) + '</b> · ' + esc(p.charge) + ' <span class="dim">· ' + esc(where) + ' · ' + esc({ remand: "on remand", bailed: "bailed", trial: "in court", serving: "serving", community: "community work" }[p.status] || p.status) + (when ? ' · ' + esc(when) : '') + '</span></div>';
}).join("") : '<p class="dim">Nobody is held just now.</p>';
if (listed.length)
h += '<div style="margin-top:8px"><b>Listed for hearing</b></div>' + listed.map(function (c) {
return '<div class="ln">' + esc(c.name) + ' · ' + esc(c.charge) + (c.appeal === "lodged" ? ' · <i>appeal</i>' : '') + ' <span class="dim">· ' + courtTime(c.hearing_at) + '</span></div>';
}).join("");
if (!aicInGaol())
h += '<div class="act"><button class="btn" id="aic-gaol-way">The way to The Gaol</button></div>';
body.innerHTML = h;
var w = document.getElementById("aic-gaol-way");
if (w)
w.onclick = function () { if (typeof showTheWay === "function")
showTheWay("The Gaol"); };
},
function (body) {
var b = AIC.b;
if (!b) {
body.innerHTML = '<p class="dim">Opening the record...</p>';
aicRefresh(true);
return;
}
var defence = courtMyRoles().defence;
var rec = b.record || [];
body.innerHTML = '<p class="dim">The city\'s cases decided in the last fortnight, newest first.</p>' + (rec.length ? rec.map(function (c) {
var v = c.verdict === "not_guilty" ? "not guilty" : c.verdict, sn = c.sentence || {};
var what = c.verdict === "guilty" ? (sn.kind === "community" ? sn.minutes + " min community work" : sn.kind === "fine" || !sn.minutes ? "a fine" : sn.minutes + " min in the Gaol") : "";
return '<div class="ln"><b>' + esc(c.name) + '</b> · ' + esc(c.charge) + ' at ' + esc(c.place) + ' · <b>' + esc(v) + '</b>' + (what ? ' · ' + esc(what) : '') +
(c.appeal === "upheld" ? ' · appeal dismissed' : c.appeal === "lodged" ? ' · appeal listed' : '') +
'<br><span class="dim" style="font-size:12px">' + esc(c.note || "") + ' Arrested by ' + esc(c.by || "the Corp") + '.</span>' +
(defence && c.verdict === "guilty" && !c.appeal ? ' <button class="btn" data-aicappeal="' + c.id + '">Appeal</button>' : '') + '</div>';
}).join("") : '<p class="dim">Nothing decided yet.</p>');
Array.prototype.forEach.call(body.querySelectorAll("[data-aicappeal]"), function (x) { x.onclick = function () { aicDo("ai_court_appeal", { p_case: +x.getAttribute("data-aicappeal") }); }; });
}
];
});
