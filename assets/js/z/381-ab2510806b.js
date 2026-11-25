/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(381, function () {
"use strict";
return [
function (rec, cid, units) {
units = units || 10;
var P = (rec.passed && rec.passed[cid]) || {}, S = (rec.scores && rec.scores[cid]) || {}, done = 0, sum = 0;
for (var u = 1; u <= units; u++)
if (P[u]) {
done++;
var s = S[u];
sum += s && s.n ? Math.min(1, s.f / s.n) : 1;
}
var unitPct = done ? Math.round(100 * sum / done) : null, t = S[0], testPct = t && t.n ? Math.round(100 * t.b / t.n) : null;
var fin = done >= units && testPct != null, pct = unitPct == null ? null : testPct == null ? unitPct : Math.round(unitPct * 0.5 + testPct * 0.5);
var ov = rec.marks && rec.marks[cid], mark = ov && ov.m ? ov.m : fin ? edrLetter(pct) : null;
var pass = !!mark && mark !== "F" && mark !== "I" && mark !== "W";
return { done: done, units: units, unitPct: unitPct, testPct: testPct, tries: t ? t.t : 0, pct: pct, final: fin || !!(ov && ov.m), mark: mark, hand: !!(ov && ov.m), pass: pass, started: done > 0 || !!(ov && ov.m) };
},
function (rec, courses) {
var pts = 0, n = 0, credits = 0, doneC = 0, hs = 0;
courses.forEach(function (c) {
var g = edrCourseGrade(rec, c[0]);
if (["9", "10", "11", "12"].indexOf(c[1]) >= 0)
hs++;
if (!g.final)
return;
var p = edrPoints(g.mark);
if (p != null) {
pts += p;
n++;
}
if (g.pass) {
doneC++;
if (["9", "10", "11", "12"].indexOf(c[1]) >= 0)
credits++;
}
});
var days = 0, mins = 0;
Object.keys(rec.days || {}).forEach(function (d) { var m = +rec.days[d] || 0; mins += m; if (m >= 30)
days++; });
return { gpa: n ? (pts / n).toFixed(2) : null, graded: n, credits: credits, hsCourses: hs, courses: doneC, days: days, hours: Math.round(mins / 6) / 10, diploma: hs > 0 && credits >= hs };
},
function (rec, courses, o) {
o = o || {};
var S = edrSummary(rec, courses), now = new Date();
var h = '<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Transcript · ' + edrEsc(o.name || "Pupil") + '</title><style>' +
'body{font:13px/1.45 Georgia,serif;color:#1A1C20;background:#fff;margin:0;padding:18px}h1{font-size:20px;margin:0}h2{font-size:15px;margin:16px 0 4px;border-bottom:1px solid #888}' +
'table{border-collapse:collapse;width:100%;font-size:12px}td,th{border:1px solid #BBB;padding:3px 6px;text-align:left}th{background:#F0EEE8}.dim{color:#555}.sum td{border:none;padding:2px 12px 2px 0}' +
'.noprint{margin:0 0 12px}@media print{.noprint{display:none}body{padding:0}}</style></head><body>' +
'<div class="noprint"><button onclick="window.print()" style="font-size:15px;padding:6px 14px">Print</button></div>' +
'<h1>The City School, Somnucor · Academic transcript</h1><div class="dim">A Kindergarten to Grade 12 school inside the virtual world of SomnuMatrix · Printed ' + edrEsc(now.toLocaleDateString()) + (o.by ? ' by ' + edrEsc(o.by) : '') + '</div>' +
'<table class="sum" style="margin-top:10px;width:auto"><tr><td><b>Pupil</b></td><td>' + edrEsc(o.name || "") + '</td><td><b>Enrolled in</b></td><td>' + (rec.grade ? edrGradeName(rec.grade) : 'not enrolled') + '</td></tr>' +
'<tr><td><b>Grade point average</b></td><td>' + (S.gpa || 'none yet') + (S.graded ? ' (from ' + S.graded + ' graded course' + (S.graded === 1 ? '' : 's') + ')' : '') + '</td><td><b>High school credits</b></td><td>' + S.credits + ' of ' + S.hsCourses + '</td></tr>' +
'<tr><td><b>Days present</b></td><td>' + S.days + ' (a day with 30 minutes or more of lessons)</td><td><b>Hours of instruction</b></td><td>' + S.hours + '</td></tr>' +
'<tr><td><b>Diploma</b></td><td colspan="3">' + (S.diploma ? 'Earned: every Grade 9 to 12 course passed.' : 'Not yet: the diploma needs every Grade 9 to 12 course passed.') + '</td></tr>' +
(rec.clubs && (rec.clubs.art || rec.clubs.music || rec.clubs.drama) ? '<tr><td><b>Clubs and electives</b></td><td colspan="3">' + [rec.clubs.art ? rec.clubs.art + ' painting(s) in the art studio' : '', rec.clubs.music ? rec.clubs.music + ' tune(s) played or written in the music room' : '', rec.clubs.drama ? rec.clubs.drama + ' scene(s) performed in the drama club' : ''].filter(Boolean).join('; ') + '</td></tr>' : '') +
(o.id ? '<tr><td><b>Record</b></td><td colspan="3" class="dim">' + edrEsc(o.id) + '</td></tr>' : '') + '</table>';
EDR_GRADES.forEach(function (g) {
var cs = courses.filter(function (c) { return c[1] === g; }), rows = cs.map(function (c) { return [c, edrCourseGrade(rec, c[0])]; }).filter(function (x) { return x[1].started; });
if (!rows.length)
return;
h += '<h2>' + edrGradeName(g) + '</h2><table><tr><th>Course</th><th>Units passed</th><th>Unit checks (first try)</th><th>Course test (best)</th><th>Grade</th>' + (+g >= 9 ? '<th>Credit</th>' : '') + '</tr>' +
rows.map(function (x) { var c = x[0], G = x[1]; return '<tr><td>' + edrEsc(c[3]) + '</td><td>' + G.done + ' of ' + G.units + '</td><td>' + (G.unitPct == null ? '' : G.unitPct + '%') + '</td><td>' + (G.testPct == null ? '' : G.testPct + '%') + '</td><td><b>' + (G.mark || 'In progress') + '</b>' + (G.hand ? ' <span class="dim">(set by the school office)</span>' : '') + '</td>' + (+g >= 9 ? '<td>' + (G.pass ? '1.0' : '') + '</td>' : '') + '</tr>'; }).join("") + '</table>';
});
h += '<h2>Grading</h2><div>A unit is passed when every check question is right; its score is the first try. A course\'s grade is half the unit checks and half the course test, once every unit is passed and the test is taken. ' +
'A+ 97, A 93, A- 90, B+ 87, B 83, B- 80, C+ 77, C 73, C- 70, D+ 67, D 63, D- 60, F below 60 (4.0 scale). P pass, I incomplete and W withdrawn are set by the school office.</div>' +
'<h2>Curriculum</h2><div>Standards-aligned and openly licensed: ' + EDR_FRAME.map(function (f) { return edrEsc(f[0]) + ': ' + edrEsc(f[1]); }).join("; ") + '. Lessons are the school\'s own; books from Project Gutenberg (public domain); activities from PhET Interactive Simulations, University of Colorado Boulder (CC BY 4.0); textbooks from OpenStax (CC BY 4.0) and Wikibooks (CC BY-SA).</div>' +
'<p class="dim" style="margin-top:12px">The City School is a school inside a game. It is not accredited by any accrediting body. Hours are counted by the game while a lesson is open. A parent, home-school teacher or school using this record may sign below.</p>' +
'<p style="margin-top:26px">Signed ______________________________ &nbsp; Title ______________________ &nbsp; Date ____________</p></body></html>';
return h;
},
function (html) {
if (typeof EDR_ADMIN !== "undefined") {
var pw = window.open("", "_blank");
if (pw) {
pw.document.open();
pw.document.write(html);
pw.document.close();
return;
}
}
var old = document.getElementById("edr-doc");
if (old)
old.parentNode.removeChild(old);
var w = document.createElement("div");
w.id = "edr-doc";
w.style.cssText = "position:fixed;inset:0;z-index:9300;background:rgba(6,8,14,.86);display:flex;flex-direction:column;padding:max(8px,env(safe-area-inset-top)) 8px 8px";
w.innerHTML = '<div style="display:flex;gap:8px;justify-content:flex-end;margin-bottom:6px"><button data-edrdoc="print" style="padding:7px 14px;border-radius:5px;border:0;background:#3A6AA8;color:#fff;font-weight:600">Print</button><button data-edrdoc="close" style="padding:7px 14px;border-radius:5px;border:0;background:#5A6068;color:#fff;font-weight:600">Close</button></div>';
var f = document.createElement("iframe");
f.style.cssText = "flex:1;width:100%;border:0;border-radius:6px;background:#fff";
f.srcdoc = html;
w.appendChild(f);
w.addEventListener("keydown", function (e) { e.stopPropagation(); });
w.addEventListener("click", function (e) {
var b = e.target.closest && e.target.closest("[data-edrdoc]");
if (!b)
return;
if (b.getAttribute("data-edrdoc") === "print") {
try {
f.contentWindow.focus();
f.contentWindow.print();
}
catch (x) { }
}
else
w.parentNode.removeChild(w);
});
document.body.appendChild(w);
},
function (o) {
var rec = { passed: {}, scores: {}, marks: (o && o.marks) || {}, days: (o && o.days) || {}, grade: o && o.enrol ? o.enrol.grade : null };
((o && o.passed) || []).forEach(function (r) { (rec.passed[r.c] || (rec.passed[r.c] = {}))[r.u] = r.at || true; });
((o && o.scores) || []).forEach(function (r) { (rec.scores[r.c] || (rec.scores[r.c] = {}))[r.u] = { f: r.f, b: r.b, n: r.n, t: r.t }; });
return rec;
},
function () {
var c = null;
try {
c = typeof DW_CLOUD !== "undefined" && DW_CLOUD.config && DW_CLOUD.config.school;
}
catch (e) { }
c = (c && typeof c === "object") ? c : {};
var o = Math.round(+c.open), cl = Math.round(+c.close);
if (!(o >= 5 && o <= 12))
o = 8;
if (!(cl > o + 2 && cl <= 21))
cl = Math.max(o + 3, 16);
return { hide: Array.isArray(c.hide) ? c.hide : [], open: o, close: cl };
},
function (cid, u, right, of) {
var R = edrStore(), S = R.scores[cid] || (R.scores[cid] = {}), s = S[u];
if (!s)
S[u] = { f: right, b: right, n: of, t: 1 };
else {
s.b = Math.max(s.b || 0, right);
s.n = of;
s.t = (s.t || 1) + 1;
}
if (typeof save === "function")
save();
if (edrIn())
cityRpc("school_score", { p_course: cid, p_unit: u, p_right: right, p_of: of }).catch(function () { });
},
function (g, dayN) {
var C = edrCfg(), subs = EDU_COURSES.filter(function (c) { return c[1] === g && !edrHidden(c); }), T = (C.close - C.open) * 60, little = g === "K" || +g <= 5;
var out = [], t = C.open * 60, k = 0;
function add(kind, len, c) { out.push({ h: t / 60, m: len, kind: kind, n: 0, c: c || null }); t += len; }
if (edrBlocks(g) && T >= 465) {
var ab = edrAB(dayN), A = subs.filter(function (c) { return EDR_CORE.indexOf(c[2]) >= 0; }), B = subs.filter(function (c) { return EDR_CORE.indexOf(c[2]) < 0; });
var arts = B.filter(function (c) { return c[2] === "art" || c[2] === "mus"; }), rest = B.filter(function (c) { return c[2] !== "art" && c[2] !== "mus"; });
if (arts.length)
rest.push(arts[Math.floor((dayN || 0) / 2) % arts.length]);
var list = (ab === "A" ? A : rest).slice(0, 4);
add("meet", 15);
for (var b = 0; b < 4; b++) {
add("class", 90, list[b] || null);
var L = out[out.length - 1];
L.n = b + 1;
L.block = true;
L.ab = ab;
if (b === 1)
add("lunch", 40);
else if (b < 3)
add("pass", 10);
}
add("clubs", Math.max(30, T - (t - C.open * 60)));
}
else {
var per = Math.max(1, Math.min(7, Math.floor((T - 135) / 50))), m = subs.length, rot = m > per ? ((dayN || 0) * per) % m : 0;
function lesson() { var i = k++; add("class", 45, m > per ? subs[(rot + i) % m] : (i < m ? subs[i] : null)); out[out.length - 1].n = i + 1; }
add("meet", 15);
var recessAt = Math.min(2, per), lunchAt = Math.min(Math.max(recessAt, Math.ceil(per / 2)), per);
for (var i = 0; i < per; i++) {
lesson();
var br = false;
if (k === recessAt && per > 2) {
add(little ? "recess" : "brk", 30);
br = true;
}
if (k === lunchAt) {
add("lunch", 45);
br = true;
}
if (!br && k < per)
add("pass", 5);
}
add("clubs", Math.max(30, T - (t - C.open * 60)));
}
out.forEach(function (p, i) { if (p.kind === "pass") {
for (var j = i + 1; j < out.length; j++)
if (out[j].kind === "class") {
p.next = out[j];
break;
}
} });
return out;
},
function (p) {
if (p.kind === "class") {
var rn = p.c && edrRoomNo(p.c[0]);
return (p.block ? 'Block ' + p.n : 'Period ' + p.n) + ': ' + (p.c ? '<b>' + esc(p.c[3]) + '</b>' + (rn ? ' · <b style="color:#1A5A9A">Room ' + rn + '</b>' : '') : 'Study hall in the library');
}
if (p.kind === "pass") {
var nx = p.next && p.next.c, r2 = nx && edrRoomNo(nx[0]);
return '<span style="color:#8A5A1A">🚶 ' + p.m + ' minutes to walk' + (r2 ? ' to Room ' + r2 : '') + '</span>';
}
var S = EDR_SOCIAL[p.kind];
return '<span style="color:#2A6A5A">' + esc(S[0]) + '</span>';
},
function (g) {
var C = edrCfg(), n = edrDayN(), bl = edrBlocks(g);
function day(dn, label) {
return '<div style="font-weight:600;margin:10px 0 4px">' + label + (bl ? ' (' + edrAB(dn) + ' day)' : '') + '</div><table style="border-collapse:collapse;font-size:13.5px;width:100%">' +
edrDay(g, dn).map(function (p) { return '<tr><td style="padding:3px 10px 3px 0;white-space:nowrap;color:#5A6068">' + edrHour(p.h) + '</td><td style="padding:3px 0">' + edrSlotName(p) + '</td></tr>'; }).join("") + '</table>';
}
var P = typeof cslPunct === "function" ? cslPunct() : null;
return '<div style="font-weight:600;margin:8px 0 2px">The timetable: ' + esc(eduGradeName(g)) + '</div>' +
'<div style="color:#5A6068;font-size:13px">School runs from ' + edrHour(C.open) + ' to ' + edrHour(C.close) + ' city time. ' +
(bl ? 'High school runs on blocks: four lessons of 90 minutes a day, on A days and B days in turn, with 10 minutes to walk between them.' : 'Lessons are 45 minutes, with 5 minutes to walk to the next room, ' + (g === "K" || +g <= 5 ? 'recess' : 'a break') + ', lunch together and clubs and electives at the end of the day.') +
' Be in the room when the bell rings: the class marks who is on time.</div>' +
(P ? '<div style="margin-top:6px;font-size:13px">This month: <b>' + P.on + '</b> on time · <b style="color:#A0522D">' + P.late + '</b> late · <b style="color:#A02A2A">' + P.miss + '</b> missed</div>' : '') +
day(n, "Today") + day(n + 1, "Tomorrow") +
(bl ? '' : '<div style="margin-top:8px;font-size:13px;color:#5A6068">Grades with more subjects than periods take them in turn, day by day.</div>');
},
function (Ls) {
var D = Ls.data, qs = [];
if (!D)
return null;
(D.units || []).forEach(function (U, ui) {
(U.check || []).forEach(function (q) {
var o = [q[1], q[2], q[3]];
for (var i = o.length - 1; i > 0; i--) {
var j = Math.floor(Math.random() * (i + 1)), t = o[i];
o[i] = o[j];
o[j] = t;
}
qs.push({ q: q[0], o: o, a: q[1], u: ui + 1 });
});
});
for (var i = qs.length - 1; i > 0; i--) {
var j = Math.floor(Math.random() * (i + 1)), t = qs[i];
qs[i] = qs[j];
qs[j] = t;
}
return { qs: qs, picks: {}, marked: false, msg: "" };
},
function (Ls) {
var col = "#" + (EDU_SCOL[Ls.subj] || 0x5A6A7A).toString(16).padStart(6, "0"), n = eduCount(Ls.cid), S = (edrStore().scores[Ls.cid] || {})[0];
var h = '<div style="font-weight:600;margin:8px 0 4px">Course test</div>';
if (n < 10)
return h + '<p>The course test opens when all ten units are passed. You have passed ' + n + ' of 10.</p>' + (S ? '<p>Your best so far: ' + Math.round(100 * S.b / S.n) + '%.</p>' : '');
if (!Ls.data)
return h + '<p style="color:#5A6068">Taking the test paper from the drawer…</p>';
var T = Ls.edrT || (Ls.edrT = edrTestNew(Ls));
h += '<p style="color:#3A4048;font-size:13.5px">Every check question from the whole course, in a new order: ' + T.qs.length + ' questions. Your best score counts for half of the course grade (the unit checks are the other half). You can take it again.' + (S ? ' Best so far: <b>' + Math.round(100 * S.b / S.n) + '%</b> (' + S.t + ' tr' + (S.t === 1 ? 'y' : 'ies') + ').' : '') + '</p>';
T.qs.forEach(function (q, k) {
h += '<div style="margin:9px 0 4px">' + (k + 1) + '. ' + esc(q.q) + '</div><div style="display:flex;flex-direction:column;gap:5px">';
q.o.forEach(function (o, oi) {
var pk = T.picks[k] === oi, show = T.marked;
h += '<button data-edr="tpick" data-k="' + k + '" data-o="' + oi + '" style="text-align:left;padding:7px 10px;border-radius:5px;border:1px solid ' + (pk ? col : "#C8CCD2") + ';background:' + (show && o === q.a ? "#DFF2E2" : show && pk ? "#F8E0DC" : pk ? "#EEF2F8" : "#FFF") + ';color:#1E2228">' + esc(o) + '</button>';
});
h += '</div>';
});
h += '<div style="margin-top:12px;display:flex;gap:8px;flex-wrap:wrap;align-items:center">' + (T.marked ? '<button data-edr="tnew" style="' + eduBtnCss("#5A6068") + '">Take it again</button>' : '<button data-edr="thand" style="' + eduBtnCss(col) + '">Hand in the test</button>') +
(T.msg ? '<span style="font-size:14px">' + T.msg + '</span>' : '') + '</div>';
return h;
},
function () {
var Ls = EDU.lesson, T = Ls && Ls.edrT;
if (!T || T.marked)
return;
var miss = T.qs.filter(function (q, k) { return T.picks[k] == null; }).length;
if (miss) {
T.msg = "Answer every question first (" + miss + " left).";
eduLessonPaint();
return;
}
var right = T.qs.filter(function (q, k) { return q.o[T.picks[k]] === q.a; }).length, pct = Math.round(100 * right / T.qs.length);
T.marked = true;
edrScore(Ls.cid, 0, right, T.qs.length);
var G = edrCourseGrade(edrRec(), Ls.cid);
T.msg = '<b style="color:' + (pct >= 70 ? "#2A8A3A" : "#B03A2A") + '">' + right + ' of ' + T.qs.length + ' right (' + pct + '%).</b> The course grade is now <b>' + esc(G.mark || "") + '</b>. ' + (pct >= 70 ? 'Well done.' : 'Read the units with red answers again, then take it again.');
if (pct >= 70)
setStatus("<b>Course test: " + pct + "%.</b> " + esc(Ls.title) + ", grade " + esc(G.mark || "") + ".");
eduLessonPaint();
},
function (c, rec) {
var G = edrCourseGrade(rec, c[0]);
return '<span title="' + esc(c[3]) + '" style="display:inline-block;margin:2px 4px 2px 0;padding:2px 6px;border-radius:4px;background:' + (G.final ? (G.pass ? "#DFF2E2" : "#F8E0DC") : G.done ? "#FFF4D8" : "#F0F2F4") + '">' + esc(EDU_SUBJ[c[2]]) + ' ' + G.done + '/10' + (G.mark ? ' · <b>' + esc(G.mark) + '</b>' : G.done >= 10 ? ' · test' : '') + '</span>';
},
function () {
var rec = edrRec(), cs = EDU_COURSES.filter(function (c) { return !edrHidden(c) || eduCount(c[0]); }), S = edrSummary(rec, cs);
var h = '<div style="font-weight:600;margin:8px 0 6px">Report card</div>' +
'<div style="display:flex;flex-wrap:wrap;gap:6px 16px;font-size:13.5px;margin-bottom:8px"><span>Enrolled: <b>' + (rec.grade ? esc(eduGradeName(rec.grade)) : 'not yet') + '</b></span><span>Grade point average: <b>' + (S.gpa || 'none yet') + '</b></span>' +
'<span>Days present: <b>' + S.days + '</b></span><span>Hours of lessons: <b>' + S.hours + '</b></span><span>High school credits: <b>' + S.credits + ' of ' + S.hsCourses + '</b></span></div>' +
'<div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:8px"><button data-edr="transcript" style="' + eduBtnCss("#3A6AA8") + '">Print my transcript</button><button data-edr="enrol" style="' + eduBtnCss("#5A6068") + '">' + (rec.grade ? 'Change my grade' : 'Enrol in a grade') + '</button><button data-edr="tt" style="' + eduBtnCss("#5A6068") + '">My timetable</button><button data-clg="open" style="' + eduBtnCss("#7A5A2A") + '">College courses</button></div>' +
'<div style="overflow-x:auto"><table style="border-collapse:collapse;font-size:13px;min-width:100%">';
EDU_GRADES.forEach(function (g) {
var gc = cs.filter(function (c) { return c[1] === g; }), done = eduGradeDone(g);
h += '<tr><td style="padding:4px 8px 4px 0;font-weight:600;white-space:nowrap;vertical-align:top">' + esc(eduGradeName(g)) + (done ? ' <span style="color:#2A8A3A">✓ promoted</span>' : '') + '</td><td style="padding:4px 0">' + gc.map(function (c) { return edrMarkChip(c, rec); }).join("") + '</td></tr>';
});
h += '</table></div><div style="margin-top:8px;font-size:12.5px;color:#5A6068">A course\'s grade is half its unit checks (first try) and half its course test, once all ten units are passed. A day with 30 minutes or more of lessons counts as present.</div>';
var w = (eduStore()["world-odyssey"] || {}), wn = Object.keys(w).length;
h += '<div style="margin-top:10px">' + (eduDiploma() ? '<b style="color:#8A6A1A">🎓 Somnucor City School Diploma: earned.</b>' : 'The diploma is earned by finishing every course of Grades 9 to 12.') + '</div>' +
'<div style="margin-top:6px">World Learning: the Odyssey voyage, ' + wn + ' of ' + (typeof ODL_STOPS !== "undefined" ? ODL_STOPS.length : 17) + ' places learned.</div>';
return h;
},
function () {
var R = edrStore();
edrCard("Enrolment · the school office", '<p>Choose the grade you are in. Your timetable, report card and transcript follow it; every classroom stays open to you, so you can go back over earlier work or work ahead.' + (R.office ? ' <b>Your grade was set by the school office</b>; ask the Keeper to change it.' : '') + '</p>' +
'<div style="display:flex;flex-wrap:wrap;gap:6px">' + EDU_GRADES.map(function (g) { return '<button data-edr="enrolg" data-g="' + g + '" style="' + eduBtnCss(R.grade === g ? "#2A8A3A" : "#3A6AA8") + '">' + esc(eduGradeName(g)) + '</button>'; }).join("") + '</div>');
},
function (g) {
var R = edrStore();
if (R.office && edrIn()) {
setStatus("Your grade was set by the school office. Ask the Keeper to change it.");
return;
}
function ok() { R.grade = g; if (typeof save === "function")
save(); setStatus("<b>Enrolled in " + esc(eduGradeName(g)) + ".</b> Your timetable is at the front office and in every lesson book."); edrCard("The timetable", edrTimetableHtml(g)); eduPaint(true); }
if (!edrIn())
return ok();
cityRpc("school_enrol_me", { p_grade: g }).then(function (o) { if (o && o.ok === false && o.say) {
setStatus(esc(o.say));
if (o.grade) {
R.grade = o.grade;
R.office = true;
}
return;
} ok(); }).catch(ok);
},
function () {
if (!edrIn()) {
setStatus("Sign in to see your class.");
return;
}
cityRpc("school_class", {}).then(function (o) {
var P = (o && o.pupils) || [];
var h = '<p>The pupils in the classes and families you made with the teacher / parent lock (Settings, 🔒). Days present and hours are for the last 30 days.</p>';
h += P.length ? '<div style="overflow-x:auto"><table style="border-collapse:collapse;font-size:13px;width:100%"><tr><th style="text-align:left">Pupil</th><th>Grade</th><th>Units</th><th>This week</th><th>Days</th><th>Hours</th><th></th></tr>' +
P.map(function (p) {
return '<tr><td>' + esc(p.name || "") + ' <span style="color:#5A6068">· ' + esc(p.circle || "") + '</span></td><td>' + (p.grade ? esc(eduGradeName(p.grade)) : '') + '</td><td>' + (+p.units || 0) + '</td><td>' + (+p.week || 0) + '</td><td>' + (+p.days30 || 0) + '</td><td>' + Math.round((+p.mins30 || 0) / 6) / 10 + '</td>' +
'<td><button data-edr="ptrans" data-u="' + esc(p.id) + '" data-n="' + esc(p.name || "") + '" style="' + eduBtnCss("#3A6AA8") + '">Transcript</button></td></tr>';
}).join("") + '</table></div>'
: '<p style="color:#5A6068">Nobody yet. Start a class or family under Settings → 🔒 Teacher / parent lock and lock your pupils\' devices into it; they appear here.</p>';
edrCard("My class · teacher and parent", h);
}).catch(function () { setStatus("The class list could not be fetched."); });
},
function (id, name) {
cityRpc("school_record", { p_user: id }).then(function (o) {
if (!o || !o.ok) {
setStatus(esc((o && o.say) || "That record could not be read."));
return;
}
edrShowDoc(edrTranscriptDoc(edrFromServer(o), EDU_COURSES, { name: o.name || name, by: (dreamer().name || "") }));
}).catch(function () { setStatus("That record could not be read."); });
},
function () {
edrCard("About our curriculum", '<p>The City School teaches Kindergarten to Grade 12: 117 courses, one for every subject of every grade, each in ten units with teaching, something to try, a check and a course test. ' +
'Every unit is aligned to the published US standards for its subject, and every unit shows them:</p><ul style="margin:4px 0 8px 18px;padding:0">' + EDR_FRAME.map(function (f) { return '<li><b>' + esc(f[0]) + ':</b> ' + esc(f[1]) + '</li>'; }).join("") + '</ul>' +
'<p>The lessons are the school\'s own writing. The books are whole public-domain books from Project Gutenberg; the activities are PhET Interactive Simulations from the University of Colorado Boulder (CC BY 4.0); the textbooks are OpenStax (CC BY 4.0) and Wikibooks (CC BY-SA). Everything is free to use.</p>' +
'<p style="color:#5A6068;font-size:13px">The City School is a school inside a game: its curriculum is standards-aligned and openly licensed, but the school itself is not accredited by an accrediting body. A real school or home-school using it keeps its own accreditation. The report card, the transcript and the hours log are there for a parent or teacher to sign.</p>');
},
function (T) {
var c = eduCourse(T.cid);
if (!c)
return "";
var D = EDU.data[c[1]] && EDU.data[c[1]][c[2]], U = D && D.units[(T.unit || 1) - 1], age = EDR_AGE[c[1]] || 10;
return [
"You are " + T.name + ", the AI teacher of " + c[3] + " (" + eduGradeName(c[1]) + ") at the City School in Somnucor, a real K-12 school run inside the game SomnuMatrix.",
"You are an AI teacher: say so plainly if asked. A human teacher of record oversees the school, and the pupil's parent or teacher can see their report card.",
D ? "The course: " + D.about : "",
U ? "The pupil is on unit " + T.unit + " of 10: “" + U.t + "”. The lesson book says: " + (U.learn || []).join(" ") + (U["try"] ? " Try it: " + U["try"] : "") + (U.std ? " Standards: " + U.std + "." : "") : "",
"Teach a pupil of about " + age + " at that level: warm, patient and encouraging, in plain words, one idea at a time, with a small example. Check understanding with one question at a time.",
"When the pupil asks for the answer to a check or test question, do not give it: give a hint, a simpler example or a guiding question. After two honest tries you may walk through a similar example.",
"If they ask to be quizzed, ask one question at a time, then say kindly whether it was right and why.",
"Speak naturally, like a real teacher in the room, never robotic. Keep each reply under 120 words. Stay on school learning; steer gently back if the talk wanders.",
"Never ask for personal details (full name, address, school, phone, photos). Never give instructions for weapons, explosives, dangerous chemicals or drugs, even in Chemistry: teach the science safely and as ideas.",
"If the pupil says they are unsafe, being hurt, or thinking of hurting themselves, kindly tell them to talk to a trusted adult right now and, in the US, to call or text 988 (or their local emergency number)."
].filter(Boolean).join(" ");
},
function (cid, unit) {
var c = eduCourse(cid);
if (!c || typeof wTalk !== "function")
return;
var u = unit || (function () { var st = eduStore()[cid] || {}, n = 1; while (n < 10 && st[n])
n++; return n; })();
function go() {
var T = { cid: cid, unit: u, name: edrTeacherOf(cid) }, nm = T.name + " (AI teacher)";
if (EDU.lesson) {
EDU.lesson = null;
eduLessonPaint();
}
var D = EDU.data[c[1]] && EDU.data[c[1]][c[2]], U = D && D.units[u - 1];
wTalk({ name: nm, title: c[3] + " teacher", persona: edrTeacherBrief(T),
greet: "Hello! I'm " + T.name + ", your " + c[3] + " teacher." + (U ? " We're on unit " + u + ", " + U.t + ". What would you like to go over? I can explain it, give you a hint, or quiz you." : " What would you like to learn?") });
(store.characters || []).forEach(function (x) { if (x.wKey === "wtalk:" + nm) {
x.edrT = T;
x.details = [edrTeacherBrief(T)];
} });
}
if (EDU.data[c[1]])
go();
else
eduData(c[1], function () { go(); });
},
function (title, col, body) {
var old = document.getElementById("edr-el");
if (old)
old.parentNode.removeChild(old);
var w = document.createElement("div");
w.id = "edr-el";
EDR.elective = title;
w.style.cssText = "position:fixed;inset:0;z-index:9200;background:rgba(6,8,14,.9);display:flex;justify-content:center;align-items:flex-start;overflow:auto;padding:max(8px,env(safe-area-inset-top)) 8px 8px";
w.innerHTML = '<div style="width:min(720px,100%);background:#FBFAF6;color:#1E2228;border-radius:8px;border-top:6px solid ' + col + ';padding:12px 14px 16px;font:15px/1.5 var(--sans,system-ui)">' +
'<div style="display:flex;justify-content:space-between;align-items:center;gap:8px"><div style="font:600 19px Georgia,serif">' + esc(title) + '</div><button data-edl="close" style="' + eduBtnCss("#5A6068") + '">Close</button></div>' + body + '</div>';
w.addEventListener("keydown", function (e) { e.stopPropagation(); });
document.body.appendChild(w);
if (document.exitPointerLock)
try {
document.exitPointerLock();
}
catch (e) { }
return w;
},
function () {
var R = edrClubs();
var w = edrElShell("The art studio", "#E87A2A", '<div style="color:#5A6068;font-size:13px;margin:4px 0 8px">Paint at the easel: pick a colour and a brush, then draw with your finger, mouse or controller. Hang it up to keep it in your gallery.</div>' +
'<div style="display:flex;flex-wrap:wrap;gap:5px;margin-bottom:6px">' + EDR_PAINT.map(function (c, i) { return '<button data-edl="col" data-c="' + c + '" aria-label="colour ' + (i + 1) + '" style="width:30px;height:30px;border-radius:50%;border:2px solid ' + (i ? "#C8CCD2" : "#1E2228") + ';background:' + c + '"></button>'; }).join("") + '</div>' +
'<div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:6px;align-items:center">' + [3, 8, 16, 30].map(function (s) { return '<button data-edl="size" data-s="' + s + '" style="' + eduBtnCss("#5A6068") + '">' + (s < 8 ? "Fine" : s < 16 ? "Brush" : s < 30 ? "Wide" : "Big") + '</button>'; }).join("") +
'<button data-edl="erase" style="' + eduBtnCss("#8A8E94") + '">Eraser</button><button data-edl="clear" style="' + eduBtnCss("#B03A2A") + '">Fresh paper</button><button data-edl="hang" style="' + eduBtnCss("#2A8A3A") + '">Hang it up</button></div>' +
'<canvas id="edr-cv" width="640" height="440" style="width:100%;max-width:640px;aspect-ratio:640/440;background:#fff;border:1px solid #C8CCD2;border-radius:4px;touch-action:none;display:block"></canvas>' +
'<div id="edr-msg" style="font-size:14px;margin-top:6px"></div><div style="font-weight:600;margin:10px 0 4px">Your gallery</div><div id="edr-gal" style="display:flex;flex-wrap:wrap;gap:6px"></div>');
var cv = document.getElementById("edr-cv"), x = cv.getContext("2d"), st = { col: "#1E2228", size: 8, down: false, lx: 0, ly: 0, strokes: 0 };
x.fillStyle = "#fff";
x.fillRect(0, 0, cv.width, cv.height);
x.lineCap = "round";
x.lineJoin = "round";
function pt(e) { var r = cv.getBoundingClientRect(); return [(e.clientX - r.left) * cv.width / r.width, (e.clientY - r.top) * cv.height / r.height]; }
cv.addEventListener("pointerdown", function (e) { st.down = true; var p = pt(e); st.lx = p[0]; st.ly = p[1]; try {
cv.setPointerCapture(e.pointerId);
}
catch (q) { } x.beginPath(); x.fillStyle = st.col; x.arc(p[0], p[1], st.size / 2, 0, 7); x.fill(); st.strokes++; });
cv.addEventListener("pointermove", function (e) { if (!st.down)
return; var p = pt(e); x.strokeStyle = st.col; x.lineWidth = st.size; x.beginPath(); x.moveTo(st.lx, st.ly); x.lineTo(p[0], p[1]); x.stroke(); st.lx = p[0]; st.ly = p[1]; });
["pointerup", "pointercancel", "pointerleave"].forEach(function (k) { cv.addEventListener(k, function () { st.down = false; }); });
function gal() { document.getElementById("edr-gal").innerHTML = R.art.length ? R.art.map(function (a) { return '<img src="' + a.img + '" alt="your painting" style="width:120px;border:4px solid #8A6A3A;border-radius:2px;background:#fff">'; }).join("") : '<span style="color:#5A6068">Nothing hung yet.</span>'; }
gal();
w.addEventListener("click", function (e) {
var b = e.target.closest && e.target.closest("[data-edl]");
if (!b)
return;
var k = b.getAttribute("data-edl");
if (k === "col") {
st.col = b.getAttribute("data-c");
Array.prototype.forEach.call(w.querySelectorAll('[data-edl="col"]'), function (q) { q.style.borderColor = q === b ? "#1E2228" : "#C8CCD2"; });
}
else if (k === "size")
st.size = +b.getAttribute("data-s");
else if (k === "erase")
st.col = "#FFFFFF";
else if (k === "clear") {
x.fillStyle = "#fff";
x.fillRect(0, 0, cv.width, cv.height);
st.strokes = 0;
}
else if (k === "hang") {
if (st.strokes < 3) {
document.getElementById("edr-msg").textContent = "Paint a little more first.";
return;
}
var t = document.createElement("canvas");
t.width = 240;
t.height = 165;
t.getContext("2d").drawImage(cv, 0, 0, 240, 165);
R.art.unshift({ img: t.toDataURL("image/jpeg", 0.7), at: new Date().toISOString() });
if (R.art.length > 8)
R.art.length = 8;
R.clubs.art++;
if (typeof save === "function")
save();
document.getElementById("edr-msg").innerHTML = '<b style="color:#2A8A3A">Hung in your gallery.</b> It is on your report card too.';
gal();
x.fillStyle = "#fff";
x.fillRect(0, 0, cv.width, cv.height);
st.strokes = 0;
}
else if (k === "close")
edrElClose();
});
},
function (i, len) {
try {
var AC = window.AudioContext || window.webkitAudioContext;
if (!AC)
return;
if (!EDR.ac)
EDR.ac = new AC();
var c = EDR.ac;
if (c.state === "suspended")
c.resume();
var o = c.createOscillator(), o2 = c.createOscillator(), g = c.createGain(), t = c.currentTime, f = EDR_KEYS[i][1];
o.type = "triangle";
o.frequency.value = f;
o2.type = "sine";
o2.frequency.value = f * 2;
o.connect(g);
o2.connect(g);
g.connect(c.destination);
g.gain.setValueAtTime(0.0001, t);
g.gain.exponentialRampToValueAtTime(0.22, t + 0.02);
g.gain.exponentialRampToValueAtTime(0.0001, t + (len || 0.9));
o.start(t);
o2.start(t);
o.stop(t + (len || 0.9) + 0.05);
o2.stop(t + (len || 0.9) + 0.05);
}
catch (e) { }
},
function () {
var R = edrClubs(), st = { rec: null, t0: 0, learn: -1, right: 0 };
var white = EDR_KEYS.map(function (k, i) { return [k, i]; }).filter(function (q) { return !q[0][2]; });
var keys = '<div id="edr-kb" style="position:relative;height:150px;user-select:none;touch-action:manipulation;margin:8px 0">' +
white.map(function (q, j) { return '<button data-edl="key" data-i="' + q[1] + '" style="position:absolute;left:' + (j * 100 / white.length) + '%;width:' + (100 / white.length) + '%;top:0;height:150px;background:#fff;border:1px solid #8A8E94;border-radius:0 0 5px 5px;color:#5A6068;font-size:12px;display:flex;align-items:flex-end;justify-content:center;padding-bottom:6px">' + q[0][0] + '</button>'; }).join("") +
EDR_KEYS.map(function (k, i) { if (!k[2])
return ""; var j = white.filter(function (q) { return q[1] < i; }).length; return '<button data-edl="key" data-i="' + i + '" aria-label="' + k[0] + '" style="position:absolute;left:calc(' + (j * 100 / white.length) + '% - ' + (35 / white.length) + '%);width:' + (70 / white.length) + '%;top:0;height:92px;background:#1E2228;border:1px solid #000;border-radius:0 0 4px 4px;z-index:2"></button>'; }).join("") + '</div>';
var w = edrElShell("The music room", "#8A5AC8", '<div style="color:#5A6068;font-size:13px;margin:4px 0 4px">Play the keyboard (tap, click or press A S D F G H J K for the white keys). Learn a tune by following the lit key, or record a tune of your own.</div>' + keys +
'<div style="display:flex;flex-wrap:wrap;gap:6px;align-items:center"><button data-edl="learn" style="' + eduBtnCss("#8A5AC8") + '">Learn Ode to Joy</button><button data-edl="demo" style="' + eduBtnCss("#5A6068") + '">Hear it</button>' +
'<button data-edl="rec" style="' + eduBtnCss("#B03A2A") + '">● Record my tune</button></div><div id="edr-msg" style="font-size:14px;margin-top:6px"></div>' +
'<div style="font-weight:600;margin:10px 0 4px">Your tunes</div><div id="edr-tunes"></div>');
function lit(i) {
Array.prototype.forEach.call(w.querySelectorAll('[data-edl="key"]'), function (b) {
var on = +b.getAttribute("data-i") === i, black = EDR_KEYS[+b.getAttribute("data-i")][2];
b.style.background = on ? "#F2C84A" : (black ? "#1E2228" : "#fff");
});
}
function msg(h) { document.getElementById("edr-msg").innerHTML = h; }
function tunes() { document.getElementById("edr-tunes").innerHTML = R.tunes.length ? R.tunes.map(function (t, i) { return '<div style="margin:3px 0"><button data-edl="play" data-n="' + i + '" style="' + eduBtnCss("#3A6AA8") + '">▶ Play</button> Tune ' + (R.tunes.length - i) + ' · ' + t.n.length + ' notes</div>'; }).join("") : '<span style="color:#5A6068">None yet.</span>'; }
function playSeq(seq) { seq.forEach(function (s) { setTimeout(function () { if (!document.getElementById("edr-el"))
return; edrNote(s[0], 0.5); lit(s[0]); setTimeout(function () { lit(-1); }, 260); }, s[1]); }); }
function press(i) {
edrNote(i);
lit(i);
setTimeout(function () { if (st.learn < 0)
lit(-1);
else
lit(EDR_ODE[st.learn]); }, 180);
if (st.rec)
st.rec.push([i, Date.now() - st.t0]);
if (st.learn >= 0) {
if (i === EDR_ODE[st.learn]) {
st.learn++;
st.right++;
if (st.learn >= EDR_ODE.length) {
st.learn = -1;
R.clubs.music++;
if (typeof save === "function")
save();
lit(-1);
msg('<b style="color:#2A8A3A">You played the whole of Ode to Joy!</b> It is on your report card.');
}
else {
lit(EDR_ODE[st.learn]);
msg("Good. Next: the lit key (" + (st.learn) + " of " + EDR_ODE.length + ").");
}
}
else
msg("Try the lit key: " + EDR_KEYS[EDR_ODE[st.learn]][0] + ".");
}
}
tunes();
w.addEventListener("pointerdown", function (e) { var b = e.target.closest && e.target.closest('[data-edl="key"]'); if (!b)
return; e.preventDefault(); press(+b.getAttribute("data-i")); });
w.addEventListener("keydown", function (e) { var m = "asdfghjk".indexOf((e.key || "").toLowerCase()); if (m >= 0 && !e.repeat)
press(white[m][1]); });
w.tabIndex = -1;
w.focus();
w.addEventListener("click", function (e) {
var b = e.target.closest && e.target.closest("[data-edl]");
if (!b)
return;
var k = b.getAttribute("data-edl");
if (k === "learn") {
st.learn = 0;
st.right = 0;
lit(EDR_ODE[0]);
msg("Press the lit key, one note at a time.");
}
else if (k === "demo")
playSeq(EDR_ODE.map(function (n, i) { return [n, i * 420]; }));
else if (k === "rec") {
if (!st.rec) {
st.rec = [];
st.t0 = Date.now();
b.textContent = "■ Stop and keep it";
msg("Recording: play your tune.");
}
else {
var n = st.rec;
st.rec = null;
b.textContent = "● Record my tune";
if (n.length < 4) {
msg("Play at least four notes.");
return;
}
R.tunes.unshift({ n: n.slice(0, 200), at: new Date().toISOString() });
if (R.tunes.length > 8)
R.tunes.length = 8;
R.clubs.music++;
if (typeof save === "function")
save();
tunes();
msg('<b style="color:#2A8A3A">Kept.</b> Press Play to hear it.');
}
}
else if (k === "play") {
var t = R.tunes[+b.getAttribute("data-n")];
if (t)
playSeq(t.n);
}
else if (k === "close")
edrElClose();
});
},
function () {
var R = edrClubs(), st = { me: null, i: 0 };
var w = edrElShell("The drama club: readers' theatre", "#C8503A", '<div style="color:#5A6068;font-size:13px;margin:4px 0 8px">Romeo and Juliet, the balcony scene (William Shakespeare, 1597). Choose your part. Read your lines aloud, then press Next; the stage reads the other part to you.</div>' +
'<div style="display:flex;gap:6px;flex-wrap:wrap"><button data-edl="part" data-p="Romeo" style="' + eduBtnCss("#3A6AA8") + '">I\'ll read Romeo</button><button data-edl="part" data-p="Juliet" style="' + eduBtnCss("#C83A8A") + '">I\'ll read Juliet</button></div>' +
'<div id="edr-stage" style="margin-top:10px"></div><div id="edr-msg" style="font-size:14px;margin-top:6px"></div>');
function say(t, who) { try {
speechSynthesis.cancel();
var u = new SpeechSynthesisUtterance(t);
u.rate = 0.92;
u.pitch = who === "Juliet" ? 1.25 : 0.85;
speechSynthesis.speak(u);
}
catch (e) { } }
function paint() {
var L = EDR_SCENE[st.i], h = '';
if (!L) {
R.clubs.drama++;
if (typeof save === "function")
save();
document.getElementById("edr-stage").innerHTML = '<div style="font:600 17px Georgia,serif">Curtain. Bravo!</div><p>The scene is on your report card. Try the other part next time.</p>';
return;
}
for (var k = Math.max(0, st.i - 2); k <= st.i; k++) {
var q = EDR_SCENE[k], mine = q[0] === st.me;
h += '<div style="margin:6px 0;padding:8px 10px;border-radius:6px;background:' + (k === st.i ? (mine ? "#FFF4D8" : "#EEF2F8") : "#F4F4F2") + ';opacity:' + (k === st.i ? 1 : 0.6) + '"><b>' + q[0] + (mine ? " (you)" : "") + ':</b> ' + esc(q[1]) + '</div>';
}
h += '<button data-edl="next" style="' + eduBtnCss("#2A8A3A") + '">' + (L[0] === st.me ? "I've said my line: next" : "Next") + '</button>';
document.getElementById("edr-stage").innerHTML = h;
if (L[0] !== st.me)
say(L[1], L[0]);
}
w.addEventListener("click", function (e) {
var b = e.target.closest && e.target.closest("[data-edl]");
if (!b)
return;
var k = b.getAttribute("data-edl");
if (k === "part") {
st.me = b.getAttribute("data-p");
st.i = 0;
paint();
}
else if (k === "next") {
st.i++;
paint();
}
else if (k === "close")
edrElClose();
});
},
function (cid, cb) {
if (EDR.lx[cid] !== undefined)
return cb && cb(EDR.lx[cid]);
(EDR.lxq[cid] || (EDR.lxq[cid] = [])).push(cb);
if (EDR.lxq[cid].length > 1)
return;
fetch("data/school/lessons/" + cid + ".json").then(function (r) { if (!r.ok)
throw 0; return r.json(); }).then(function (d) { EDR.lx[cid] = d && d.units ? d : false; }, function () { EDR.lx[cid] = false; })
.then(function () { var q = EDR.lxq[cid]; EDR.lxq[cid] = null; (q || []).forEach(function (f) { try {
if (f)
f(EDR.lx[cid]);
}
catch (e) { } }); });
},
function (Ls) {
var X = edrLxUnit(Ls.cid, Ls.unit), U = Ls.data && Ls.data.units[Ls.unit - 1], qs = [];
(X && X.lessons || []).forEach(function (L) { (L.check || []).forEach(function (q) { qs.push(q); }); });
((U && U.check) || []).forEach(function (q) { qs.push(q); });
return { u: Ls.unit, qs: edrMix(qs.map(function (q) { return { q: q[0], o: edrMix([q[1], q[2], q[3]]), a: q[1] }; })).slice(0, 20), picks: {}, marked: false, msg: "" };
},
function (Ls, X, col) {
var p = Ls.edrPart || 0, n = X.lessons.length, h = '<div style="display:flex;flex-wrap:wrap;gap:5px;margin:2px 0 10px">';
for (var i = 0; i <= n + 1; i++) {
var on = i === p, lab = i === 0 ? "Overview" : i <= n ? "Lesson " + i : "Unit quiz";
h += '<button data-edr="part" data-p="' + i + '" style="padding:5px 10px;border-radius:14px;border:1px solid ' + (on ? col : "#C8CCD2") + ';background:' + (on ? col : "#FFF") + ';color:' + (on ? "#FFF" : "#1E2228") + ';font-size:13.5px">' + lab + '</button>';
}
return h + '</div>';
},
function (Ls, X, col) {
var L = X.lessons[(Ls.edrPart || 1) - 1];
if (!L)
return "";
var mine = Ls.edrSelf || (Ls.edrSelf = {}), key = Ls.unit + "." + Ls.edrPart, P = mine[key] || (mine[key] = {});
var h = '<div style="font:600 16px Georgia,serif;margin:2px 0 6px">Lesson ' + Ls.edrPart + ': ' + esc(L.t) + '</div>' +
(L.learn || []).map(function (t) { return '<p style="margin:0 0 9px">' + esc(t) + '</p>'; }).join("") +
(L["try"] ? '<div style="background:#F0F4FA;border-left:4px solid ' + col + ';padding:8px 10px;border-radius:4px;margin:10px 0"><b>Try it.</b> ' + esc(L["try"]) + '</div>' : "") +
'<div style="margin:6px 0 10px"><button data-edr="lread" style="' + eduBtnCss("#3A6AA8") + '">🔊 Read it to me</button> <button data-edr="ask" data-c="' + esc(Ls.cid) + '" data-u="' + Ls.unit + '" style="' + eduBtnCss("#2A7A6A") + '">🧑‍🏫 Ask your teacher</button></div>';
if ((L.check || []).length) {
h += '<div style="font-weight:600;margin:10px 0 4px">Check yourself</div>';
L.check.forEach(function (q, k) {
var o = [q[1], q[2], q[3]], s = (Ls.unit * 5 + Ls.edrPart * 3 + k) % 3;
o = [o[s], o[(s + 1) % 3], o[(s + 2) % 3]];
h += '<div style="margin:8px 0 4px">' + (k + 1) + '. ' + esc(q[0]) + '</div><div style="display:flex;flex-direction:column;gap:5px">' +
o.map(function (a) { var pk = P[k] === a; return '<button data-edr="spick" data-k="' + k + '" data-o="' + esc(a) + '" style="text-align:left;padding:7px 10px;border-radius:5px;border:1px solid ' + (pk ? col : "#C8CCD2") + ';background:' + (pk ? (a === q[1] ? "#DFF2E2" : "#F8E0DC") : "#FFF") + ';color:#1E2228">' + esc(a) + (pk ? (a === q[1] ? " ✓" : " ✗") : "") + '</button>'; }).join("") + '</div>';
});
}
var n = X.lessons.length;
return h + '<div style="margin-top:12px"><button data-edr="part" data-p="' + (Ls.edrPart + 1) + '" style="' + eduBtnCss(col) + '">' + (Ls.edrPart < n ? "Next: lesson " + (Ls.edrPart + 1) : "Next: the unit quiz") + '</button></div>';
},
function (Ls, col) {
var Q = Ls.edrQ && Ls.edrQ.u === Ls.unit ? Ls.edrQ : (Ls.edrQ = edrQuizNew(Ls)), done = eduPassed(Ls.cid, Ls.unit), S = (edrStore().scores[Ls.cid] || {})[Ls.unit];
var h = '<div style="font:600 16px Georgia,serif;margin:2px 0 4px">Unit ' + Ls.unit + ' quiz</div><div style="color:#3A4048;font-size:13.5px;margin-bottom:6px">' + Q.qs.length + ' questions from the whole unit. Get 80% or more to pass the unit; your first try is your score.' + (done ? ' <b style="color:#2A8A3A">Passed.</b>' : '') + (S ? ' First try: ' + Math.round(100 * S.f / S.n) + '%.' : '') + '</div>';
Q.qs.forEach(function (q, k) {
h += '<div style="margin:8px 0 4px">' + (k + 1) + '. ' + esc(q.q) + '</div><div style="display:flex;flex-direction:column;gap:5px">';
q.o.forEach(function (o, oi) {
var pk = Q.picks[k] === oi, sh = Q.marked;
h += '<button data-edr="qpick" data-k="' + k + '" data-o="' + oi + '" style="text-align:left;padding:7px 10px;border-radius:5px;border:1px solid ' + (pk ? col : "#C8CCD2") + ';background:' + (sh && o === q.a ? "#DFF2E2" : sh && pk ? "#F8E0DC" : pk ? "#EEF2F8" : "#FFF") + ';color:#1E2228">' + esc(o) + '</button>';
});
h += '</div>';
});
return h + '<div style="margin-top:12px;display:flex;gap:8px;flex-wrap:wrap;align-items:center">' + (Q.marked ? '<button data-edr="qnew" style="' + eduBtnCss("#5A6068") + '">Take it again</button>' + (Ls.unit < 10 ? '<button data-sl="unit" data-u="' + (Ls.unit + 1) + '" style="' + eduBtnCss(col) + '">Next unit</button>' : '') : '<button data-edr="qhand" style="' + eduBtnCss(col) + '">Hand in the quiz</button>') +
(Q.msg ? '<span style="font-size:14px">' + Q.msg + '</span>' : '') + '</div>';
},
function (Ls, then) {
var cid = Ls.cid, u = Ls.unit, title = Ls.title;
function done(say) {
var st = eduStore(), c = st[cid] || (st[cid] = {}), was = eduCourseDone(cid);
c[u] = c[u] || new Date().toISOString();
if (typeof save === "function")
save();
var m = '<b style="color:#2A8A3A">' + esc(say || ("Unit " + u + " passed.")) + '</b>';
if (!was && eduCourseDone(cid)) {
m += ' <b>The whole course is done: a certificate is in your backpack, and the course test is open.</b>';
setStatus("<b>Course complete: " + esc(title) + ".</b> The certificate is in your backpack.");
}
then(m);
eduPaint(true);
}
if (!edrIn())
return done("Unit " + u + " passed (kept on this device; sign in to keep it on your record).");
var wait = 20000 - (Date.now() - Ls.t0);
if (wait > 0)
return then("Read the unit through first: hand it in again in " + Math.ceil(wait / 1000) + " seconds.");
cityRpc("school_pass", { p_course: cid, p_unit: u }).then(function (o) { if (o && o.ok)
done(o.say);
else if (o && o.say && /not over|read/i.test(o.say))
then(esc(o.say));
else
done(); }).catch(function () { done(); });
},
function () {
var Ls = EDU.lesson, Q = Ls && Ls.edrQ;
if (!Q || Q.marked)
return;
var miss = Q.qs.filter(function (q, k) { return Q.picks[k] == null; }).length;
if (miss) {
Q.msg = "Answer every question first (" + miss + " left).";
eduLessonPaint();
return;
}
var right = Q.qs.filter(function (q, k) { return q.o[Q.picks[k]] === q.a; }).length, pct = Math.round(100 * right / Q.qs.length);
Q.marked = true;
edrScore(Ls.cid, Ls.unit, right, Q.qs.length);
if (pct < 80) {
Q.msg = '<span style="color:#B03A2A">' + right + ' of ' + Q.qs.length + ' (' + pct + '%). Not yet: go back over the lessons with red answers, then take it again.</span>';
eduLessonPaint();
return;
}
Q.msg = '<b>' + right + ' of ' + Q.qs.length + ' (' + pct + '%).</b> ';
eduLessonPaint();
edrPassUnit(Ls, function (m) { if (EDU.lesson === Ls) {
Q.msg = '<b>' + right + ' of ' + Q.qs.length + ' (' + pct + '%).</b> ' + m;
eduLessonPaint();
} });
}
];
});
