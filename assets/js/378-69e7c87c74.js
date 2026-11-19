/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var EDR_LET = [[97, "A+", 4], [93, "A", 4], [90, "A-", 3.7], [87, "B+", 3.3], [83, "B", 3], [80, "B-", 2.7], [77, "C+", 2.3], [73, "C", 2], [70, "C-", 1.7], [67, "D+", 1.3], [63, "D", 1], [60, "D-", 0.7], [0, "F", 0]];
var EDR_GRADES = ["K", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
var EDR_SUBJ = { ela: "English & Reading", math: "Mathematics", sci: "Science", soc: "Social Studies", lang: "Spanish", art: "Art", mus: "Music", pe: "Health & PE", cs: "Computer Science" };
var EDR_FRAME = [["English & Reading, Mathematics", "Common Core State Standards (CCSS)"], ["Science", "Next Generation Science Standards (NGSS)"], ["Social Studies", "C3 Framework for Social Studies State Standards"], ["Art, Music", "National Core Arts Standards (NCAS)"], ["Health & PE", "SHAPE America National PE Standards; National Health Education Standards (NHES)"], ["Computer Science", "CSTA K-12 Computer Science Standards"], ["Spanish", "ACTFL World-Readiness Standards for Learning Languages"]];
function edrGradeName(g) { return g === "K" ? "Kindergarten" : "Grade " + g; }
function edrEsc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
function edrLetter(p) { for (var i = 0; i < EDR_LET.length; i++)
if (p >= EDR_LET[i][0])
return EDR_LET[i][1]; return "F"; }
function edrPoints(m) { for (var i = 0; i < EDR_LET.length; i++)
if (EDR_LET[i][1] === m)
return EDR_LET[i][2]; return null; }
function edrToday() { var d = new Date(); return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0"); }
function edrCourseGrade(rec, cid, units) { return __ZC(378, 0, this, arguments, new.target); }
function edrSummary(rec, courses) { return __ZC(378, 1, this, arguments, new.target); }
function edrTranscriptDoc(rec, courses, o) { return __ZC(378, 2, this, arguments, new.target); }
function edrShowDoc(html) { return __ZC(378, 3, this, arguments, new.target); }
function edrFromServer(o) { return __ZC(378, 4, this, arguments, new.target); }
var EDR = { busy: false, at: 0, mins: 0, sent: 0, cls: null };
function edrCfg() { return __ZC(378, 5, this, arguments, new.target); }
function edrHidden(c) { if (!c)
return false; var H = edrCfg().hide; return H.indexOf(c[2]) >= 0 || H.indexOf(c[0]) >= 0; }
function edrStore() {
var d = dreamer();
if (!d.schoolRec || typeof d.schoolRec !== "object")
d.schoolRec = {};
var R = d.schoolRec;
if (!R.scores || typeof R.scores !== "object")
R.scores = {};
if (!R.days || typeof R.days !== "object")
R.days = {};
if (!R.marks || typeof R.marks !== "object")
R.marks = {};
return R;
}
function edrRec() { var R = edrStore(); return { passed: eduStore(), scores: R.scores, marks: R.marks, days: R.days, grade: R.grade || null, clubs: R.clubs || null }; }
function edrIn() { return typeof signedIn === "function" && signedIn(); }
function edrScore(cid, u, right, of) { return __ZC(378, 6, this, arguments, new.target); }
function edrLoad(force) {
if (EDR.busy || !edrIn())
return;
if (!force && Date.now() - EDR.at < 300000)
return;
EDR.busy = true;
EDR.at = Date.now();
cityRpc("school_record", {}).then(function (o) {
EDR.busy = false;
if (!o || !o.ok)
return;
var R = edrStore(), V = edrFromServer(o);
Object.keys(V.scores).forEach(function (c) {
var L = R.scores[c] || (R.scores[c] = {});
Object.keys(V.scores[c]).forEach(function (u) {
var s = V.scores[c][u], l = L[u];
L[u] = l ? { f: s.f, b: Math.max(s.b, l.b || 0), n: s.n, t: Math.max(s.t || 1, l.t || 1) } : s;
});
});
Object.keys(V.days).forEach(function (d) { R.days[d] = Math.max(+R.days[d] || 0, +V.days[d] || 0); });
R.marks = V.marks || {};
if (V.grade)
R.grade = V.grade;
R.office = !!(o.enrol && o.enrol.by_office);
if (typeof save === "function")
save();
if (EDU.lesson && EDU.lesson.tab === "report")
eduLessonPaint();
}).catch(function () { EDR.busy = false; });
}
function edrDayN() { var d = new Date(); return Math.floor((d.getTime() - d.getTimezoneOffset() * 60000) / 864e5); }
function edrHour(h) { var hh = Math.floor(h + 1e-6), mm = Math.round((h - hh) * 60); if (mm === 60) {
hh++;
mm = 0;
} return (hh % 12 || 12) + ":" + String(mm).padStart(2, "0") + (hh < 12 ? " am" : " pm"); }
var EDR_SOCIAL = { meet: ["Morning meeting with your homeroom", "the classroom of your grade's first lesson"], recess: ["Recess on the playground", "the playground"],
brk: ["Break: time with friends", "the atrium and the playground"], lunch: ["Lunch together in the cafeteria (free for every pupil)", "the cafeteria"],
clubs: ["Clubs and electives: art studio, music room, drama club, sports in the gym", "the art and music rooms, the auditorium and the gym"] };
function edrDay(g, dayN) { return __ZC(378, 7, this, arguments, new.target); }
function edrNow(g) {
var h = (typeof cityHourNow === "function") ? cityHourNow() : 12, D = edrDay(g, edrDayN());
for (var i = 0; i < D.length; i++)
if (h >= D[i].h && h < D[i].h + D[i].m / 60)
return D[i];
return null;
}
function edrSlotName(p) { if (p.kind === "class")
return 'Period ' + p.n + ': ' + (p.c ? '<b>' + esc(p.c[3]) + '</b>' : 'Study hall in the library'); var S = EDR_SOCIAL[p.kind]; return '<span style="color:#2A6A5A">' + esc(S[0]) + '</span>'; }
function edrTimetableHtml(g) { return __ZC(378, 8, this, arguments, new.target); }
function edrTestNew(Ls) { return __ZC(378, 9, this, arguments, new.target); }
function edrTestHtml(Ls) { return __ZC(378, 10, this, arguments, new.target); }
function edrTestHand() { return __ZC(378, 11, this, arguments, new.target); }
function edrMarkChip(c, rec) { return __ZC(378, 12, this, arguments, new.target); }
function edrReportHtml() { return __ZC(378, 13, this, arguments, new.target); }
function edrCard(title, h) { EDU.lesson = { cid: "gK-ela", g: "K", subj: "ela", title: title, unit: 1, tab: "html", picks: {}, html: h }; eduLessonPaintHtml(); }
function edrEnrolCard() { return __ZC(378, 14, this, arguments, new.target); }
function edrEnrol(g) { return __ZC(378, 15, this, arguments, new.target); }
function edrMyTranscript() {
var nm = (dreamer().name || "").trim() || "Dreamer";
edrShowDoc(edrTranscriptDoc(edrRec(), EDU_COURSES.filter(function (c) { return !edrHidden(c) || eduCount(c[0]); }), { name: nm }));
}
function edrClass() { return __ZC(378, 16, this, arguments, new.target); }
function edrPupilTranscript(id, name) { return __ZC(378, 17, this, arguments, new.target); }
function edrCurriculumCard() { return __ZC(378, 18, this, arguments, new.target); }
(function () {
if (typeof eduLessonPaint !== "function" || typeof eduHandIn !== "function")
return;
var oHand = eduHandIn;
eduHandIn = function () {
try {
var Ls = EDU.lesson, U = Ls && Ls.data && Ls.data.units[Ls.unit - 1], qs = (U && U.check) || [];
if (qs.length && qs.every(function (q, k) { return Ls.picks[k] != null; })) {
var sig = Ls.cid + "|" + Ls.unit + "|" + qs.map(function (q, k) { return Ls.picks[k]; }).join("|");
if (Ls.edrSig !== sig) {
Ls.edrSig = sig;
edrScore(Ls.cid, Ls.unit, qs.filter(function (q, k) { return Ls.picks[k] === q[1]; }).length, qs.length);
}
}
}
catch (e) { }
return oHand.apply(this, arguments);
};
var oPaint = eduLessonPaint;
eduLessonPaint = function () {
var r = oPaint.apply(this, arguments), Ls = EDU.lesson, el = document.getElementById("sch-lesson");
if (!Ls || !el || Ls.tab === "html")
return r;
try {
var card = el.firstElementChild, t0 = card && card.querySelector('[data-sl="tab"]');
if (t0) {
var row = t0.parentNode;
row.insertAdjacentHTML("beforeend", eduTab("test", "Course test", Ls.tab) + eduTab("timetable", "Timetable", Ls.tab));
}
if (Ls.tab === "learn" && Ls.data) {
var U = Ls.data.units[Ls.unit - 1];
if (U && U.std) {
var heads = card.querySelectorAll("div"), want = "Unit " + Ls.unit + ": ";
for (var i = 0; i < heads.length; i++)
if (heads[i].children.length === 0 && heads[i].textContent.indexOf(want) === 0) {
heads[i].insertAdjacentHTML("afterend", '<div style="color:#5A6068;font-size:12.5px;margin:-2px 0 8px">Standards: ' + esc(U.std) + '</div>');
break;
}
}
}
if (Ls.tab === "test")
card.insertAdjacentHTML("beforeend", edrTestHtml(Ls));
if (Ls.tab === "timetable")
card.insertAdjacentHTML("beforeend", edrTimetableHtml(edrStore().grade || Ls.g));
}
catch (e) { }
return r;
};
eduReportHtml = edrReportHtml;
var oOpen = eduOpen;
eduOpen = function (cid) {
var c = eduCourse(cid);
if (c && edrHidden(c) && !(typeof amKeeper === "function" && amKeeper())) {
setStatus("<b>" + esc(c[3]) + "</b> is not taught this term.");
return;
}
return oOpen.apply(this, arguments);
};
var oHours = eduHours;
eduHours = function (job) { if (EDU_POSTS[job])
return oHours.apply(this, arguments); var C = edrCfg(); return [C.open, C.close - C.open]; };
var oLoad = eduLoad;
eduLoad = function (force) { var r = oLoad.apply(this, arguments); try {
edrLoad(force);
}
catch (e) { } return r; };
var oPanel = eduPaint;
eduPaint = function () {
var r = oPanel.apply(this, arguments), el = document.getElementById("sch-panel");
if (!el || el.style.display !== "block" || document.getElementById("edr-x"))
return r;
try {
var w = eduWhere();
if (!w)
return r;
Array.prototype.forEach.call(el.querySelectorAll('[data-sch][data-c]'), function (b) { var c = eduCourse(b.getAttribute("data-c")); if (c && edrHidden(c) && w.kind === "hall")
b.outerHTML = '<span class="dim">not taught this term</span>'; });
var x = '';
if (w.kind === "class") {
var c = eduCourse(w.id);
if (c && edrHidden(c)) {
el.innerHTML = '<h4 style="color:#BFD4F4">' + esc(w.name) + '</h4><div class="dim" id="edr-x">This subject is not taught this term.</div>';
return r;
}
var D = edrDay(c[1], edrDayN()).filter(function (p) { return p.c && p.c[0] === w.id; })[0], N = edrNow(edrStore().grade || c[1]);
x = '<div class="dim" style="margin-top:4px">' + (D ? 'This class meets at ' + edrHour(D.h) + ' today.' : 'This class does not meet today; the lesson book is always open.') +
(N ? ' Now: ' + (N.kind === "class" ? (N.c ? 'period ' + N.n + ', ' + esc(N.c[3]) : 'study hall') : esc(EDR_SOCIAL[N.kind][0]) + ', in ' + esc(EDR_SOCIAL[N.kind][1])) + '.' : ' School is out.') + '</div>' +
'<div class="row"><button class="btn" data-edr="ctest" data-c="' + w.id + '">Course test</button></div>';
}
else {
var row = '';
if (w.id === "reception" || w.id === "attend")
row += '<button class="btn" data-edr="enrol">Enrol in a grade</button>';
if (w.id === "reception" || w.id === "attend" || w.id === "atrium")
row += '<button class="btn" data-edr="transcript">Print my transcript</button><button class="btn" data-edr="tt">Today\'s timetable</button>';
if (w.id === "reception" || w.id === "district" || w.id === "principal")
row += '<button class="btn" data-edr="class">My class (teacher / parent)</button>';
if (w.id === "reception" || w.id === "library" || w.id === "atrium" || w.id === "district")
row += '<button class="btn" data-edr="curr">About our curriculum</button>';
if (w.id === "reception" || w.id === "library" || w.id === "atrium")
row += '<button class="btn" data-clg="open">College courses</button>';
if (row)
x = '<div class="row">' + row + '</div>';
}
if (x)
el.insertAdjacentHTML("beforeend", '<div id="edr-x">' + x + '</div>');
}
catch (e) { }
return r;
};
})();
addEventListener("click", function (e) {
var b = e.target && e.target.closest ? e.target.closest("[data-edr]") : null;
if (!b)
return;
e.preventDefault();
var k = b.getAttribute("data-edr"), Ls = EDU.lesson;
if (k === "tpick" && Ls && Ls.edrT && !Ls.edrT.marked) {
Ls.edrT.picks[+b.getAttribute("data-k")] = +b.getAttribute("data-o");
Ls.edrT.msg = "";
var sc = document.getElementById("sch-lesson"), y = sc ? sc.scrollTop : 0;
eduLessonPaint();
if (sc)
sc.scrollTop = y;
}
else if (k === "thand")
edrTestHand();
else if (k === "tnew" && Ls) {
Ls.edrT = null;
eduLessonPaint();
var el = document.getElementById("sch-lesson");
if (el)
el.scrollTop = 0;
}
else if (k === "ctest")
eduOpen(b.getAttribute("data-c"), "test");
else if (k === "transcript")
edrMyTranscript();
else if (k === "enrol")
edrEnrolCard();
else if (k === "enrolg")
edrEnrol(b.getAttribute("data-g"));
else if (k === "tt") {
var g = edrStore().grade;
if (!g) {
edrEnrolCard();
return;
}
edrCard("The timetable", edrTimetableHtml(g));
}
else if (k === "class")
edrClass();
else if (k === "ptrans")
edrPupilTranscript(b.getAttribute("data-u"), b.getAttribute("data-n"));
else if (k === "curr")
edrCurriculumCard();
});
setInterval(function () {
try {
var Ls = EDU.lesson;
if (document.hidden || (!EDR.elective && (!Ls || Ls.tab === "html")))
return;
var R = edrStore(), d = edrToday();
R.days[d] = (+R.days[d] || 0) + 1;
EDR.mins++;
if (EDR.mins >= 5) {
EDR.mins = 0;
if (typeof save === "function")
save();
if (edrIn())
cityRpc("school_attend", { p_minutes: 5 }).catch(function () { });
}
}
catch (e) { }
}, 60000);
var EDR_AGE = { K: 5, "1": 6, "2": 7, "3": 8, "4": 9, "5": 10, "6": 11, "7": 12, "8": 13, "9": 14, "10": 15, "11": 16, "12": 17 };
function edrTeacherOf(cid) { var r = EDU_ROOM[cid]; return r ? eduTeacherName(r) : "The teacher"; }
function edrTeacherBrief(T) { return __ZC(378, 19, this, arguments, new.target); }
function edrAskTeacher(cid, unit) { return __ZC(378, 20, this, arguments, new.target); }
(function () {
if (typeof charSystem !== "function")
return;
var cs = charSystem;
charSystem = function (c) { if (c && c.edrT) {
try {
return edrTeacherBrief(c.edrT);
}
catch (e) { }
} return cs.apply(this, arguments); };
})();
(function () {
if (typeof localVoice !== "function")
return;
var lv = localVoice;
localVoice = function (c, q) {
if (!(c && c.edrT))
return lv.apply(this, arguments);
try {
var T = c.edrT, k = eduCourse(T.cid), D = k && EDU.data[k[1]] && EDU.data[k[1]][k[2]], U = D && D.units[(T.unit || 1) - 1];
if (!U)
return "Open the lesson book on my desk and we'll start from unit one.";
var s = String(q || "").toLowerCase(), n = (c.edrN = (c.edrN || 0) + 1);
if (/quiz|test me|question|ask me/.test(s) && U.check && U.check.length) {
var Q = U.check[n % U.check.length];
c.edrQ = Q;
var o = [Q[1], Q[2], Q[3]].sort();
return "Here's one: " + Q[0] + " Is it " + o[0] + ", " + o[1] + ", or " + o[2] + "?";
}
if (c.edrQ) {
var Q2 = c.edrQ;
c.edrQ = null;
var ok = s.indexOf(String(Q2[1]).toLowerCase().slice(0, 12)) >= 0;
return ok ? "Yes, that's right: " + Q2[1] + ". Well done. Want another?" : "Not quite. The answer is " + Q2[1] + ". Read that part of the unit again and I'll ask you another.";
}
if (/hello|^hi\b|hey/.test(s))
return "Hello! We're on " + U.t + ". Ask me to explain it, or say quiz me.";
if (/try|practice|example/.test(s) && U["try"])
return "Try this: " + U["try"];
var L = U.learn || [];
return L.length ? L[n % L.length] + " Ask me to quiz you when you're ready." : "Let's read the unit together in the lesson book.";
}
catch (e) {
return lv.apply(this, arguments);
}
};
})();
(function () {
var pp = eduPaint;
eduPaint = function () {
var r = pp.apply(this, arguments), el = document.getElementById("sch-panel");
try {
var w = eduWhere(), x = document.getElementById("edr-x");
if (el && x && w && w.kind === "class" && !x.querySelector('[data-edr="ask"]') && !edrHidden(eduCourse(w.id))) {
var row = x.querySelector(".row");
if (row)
row.insertAdjacentHTML("afterbegin", '<button class="btn" data-edr="ask" data-c="' + w.id + '">🧑‍🏫 Ask the teacher</button>');
}
}
catch (e) { }
return r;
};
var lp = eduLessonPaint;
eduLessonPaint = function () {
var r = lp.apply(this, arguments), Ls = EDU.lesson, el = document.getElementById("sch-lesson");
try {
if (Ls && el && (Ls.tab === "learn" || Ls.tab === "test")) {
var b = el.querySelector('[data-sl="read"]') || el.querySelector('[data-edr="thand"]');
if (b && !el.querySelector('[data-edr="ask"]'))
b.insertAdjacentHTML("afterend", ' <button data-edr="ask" data-c="' + esc(Ls.cid) + '" data-u="' + Ls.unit + '" style="' + eduBtnCss("#2A7A6A") + '">🧑‍🏫 Ask your teacher</button>');
}
}
catch (e) { }
return r;
};
})();
addEventListener("click", function (e) {
var b = e.target && e.target.closest ? e.target.closest('[data-edr="ask"]') : null;
if (!b)
return;
e.preventDefault();
edrAskTeacher(b.getAttribute("data-c"), +b.getAttribute("data-u") || 0);
});
function edrClubs() { var R = edrStore(); if (!R.clubs || typeof R.clubs !== "object")
R.clubs = { art: 0, music: 0, drama: 0 }; if (!Array.isArray(R.art))
R.art = []; if (!Array.isArray(R.tunes))
R.tunes = []; return R; }
function edrClubLine() {
var R = edrClubs(), C = R.clubs, a = [];
if (C.art)
a.push(C.art + " painting" + (C.art === 1 ? "" : "s"));
if (C.music)
a.push(C.music + " tune" + (C.music === 1 ? "" : "s") + " played or written");
if (C.drama)
a.push(C.drama + " scene" + (C.drama === 1 ? "" : "s") + " performed");
return a.join(", ");
}
function edrElShell(title, col, body) { return __ZC(378, 21, this, arguments, new.target); }
function edrElClose() { var w = document.getElementById("edr-el"); if (w)
w.parentNode.removeChild(w); EDR.elective = null; try {
if (EDR.ac && EDR.ac.state === "running")
EDR.ac.suspend();
}
catch (e) { } try {
speechSynthesis.cancel();
}
catch (e) { } }
var EDR_PAINT = ["#1E2228", "#FFFFFF", "#C8503A", "#E87A2A", "#F2C84A", "#3AA86A", "#2A7A6A", "#3A6AC8", "#7A4AB8", "#C83A8A", "#8A5A3A", "#B8B4AC"];
function edrArtStudio() { return __ZC(378, 22, this, arguments, new.target); }
var EDR_KEYS = [["C", 261.63, 0], ["C#", 277.18, 1], ["D", 293.66, 0], ["D#", 311.13, 1], ["E", 329.63, 0], ["F", 349.23, 0], ["F#", 369.99, 1], ["G", 392, 0], ["G#", 415.3, 1], ["A", 440, 0], ["A#", 466.16, 1], ["B", 493.88, 0], ["C'", 523.25, 0]];
var EDR_ODE = [4, 4, 5, 7, 7, 5, 4, 2, 0, 0, 2, 4, 4, 2, 2, 4, 4, 5, 7, 7, 5, 4, 2, 0, 0, 2, 4, 2, 0, 0];
function edrNote(i, len) { return __ZC(378, 23, this, arguments, new.target); }
function edrMusicRoom() { return __ZC(378, 24, this, arguments, new.target); }
var EDR_SCENE = [["Romeo", "But, soft! what light through yonder window breaks? It is the east, and Juliet is the sun."],
["Juliet", "O Romeo, Romeo! wherefore art thou Romeo? Deny thy father and refuse thy name."],
["Romeo", "Shall I hear more, or shall I speak at this?"],
["Juliet", "'Tis but thy name that is my enemy. What's in a name? That which we call a rose by any other name would smell as sweet."],
["Romeo", "I take thee at thy word: call me but love, and I'll be new baptized; henceforth I never will be Romeo."],
["Juliet", "What man art thou that thus bescreen'd in night so stumblest on my counsel?"],
["Romeo", "By a name I know not how to tell thee who I am: my name, dear saint, is hateful to myself, because it is an enemy to thee."],
["Juliet", "My ears have not yet drunk a hundred words of that tongue's utterance, yet I know the sound: art thou not Romeo and a Montague?"],
["Romeo", "Neither, fair saint, if either thee dislike."],
["Juliet", "Good night, good night! parting is such sweet sorrow, that I shall say good night till it be morrow."]];
function edrDrama() { return __ZC(378, 25, this, arguments, new.target); }
(function () {
var pp = eduPaint;
eduPaint = function () {
var r = pp.apply(this, arguments), el = document.getElementById("sch-panel");
try {
var w = eduWhere(), x = document.getElementById("edr-x");
if (!el || !w || el.style.display !== "block")
return r;
var c = w.kind === "class" ? eduCourse(w.id) : null, btn = "";
if (c && c[2] === "art")
btn = '<button class="btn" data-edr="art">🎨 Art studio: paint</button>';
if (c && c[2] === "mus")
btn = '<button class="btn" data-edr="music">🎹 Music room: play</button>';
if (w.id === "auditorium")
btn = '<button class="btn" data-edr="drama">🎭 Drama club</button>';
if (btn && !el.querySelector('[data-edr="art"],[data-edr="music"],[data-edr="drama"]')) {
var row = x && x.querySelector(".row");
if (row)
row.insertAdjacentHTML("beforeend", btn);
else
el.insertAdjacentHTML("beforeend", '<div class="row" id="' + (x ? "" : "edr-x") + '">' + btn + '</div>');
}
}
catch (e) { }
return r;
};
var rh = eduReportHtml;
eduReportHtml = function () {
var h = rh.apply(this, arguments), l = edrClubLine();
return h + '<div style="margin-top:6px">Clubs and electives: ' + (l ? esc(l) : 'none yet (the art studio, the music room and the drama club are open every day; clubs time is at the end of the school day)') + '.</div>';
};
})();
addEventListener("click", function (e) {
var b = e.target && e.target.closest ? e.target.closest('[data-edr="art"],[data-edr="music"],[data-edr="drama"]') : null;
if (!b)
return;
var k = b.getAttribute("data-edr");
if (k === "art")
edrArtStudio();
else if (k === "music")
edrMusicRoom();
else
edrDrama();
});
EDR.lx = {};
EDR.lxq = {};
function edrLx(cid, cb) { return __ZC(378, 26, this, arguments, new.target); }
function edrLxUnit(cid, u) { var d = EDR.lx[cid]; return d && d.units && d.units[u - 1] || null; }
function edrMix(a) { for (var i = a.length - 1; i > 0; i--) {
var j = Math.floor(Math.random() * (i + 1)), t = a[i];
a[i] = a[j];
a[j] = t;
} return a; }
function edrQuizNew(Ls) { return __ZC(378, 27, this, arguments, new.target); }
function edrPartsBar(Ls, X, col) { return __ZC(378, 28, this, arguments, new.target); }
function edrLessonHtml(Ls, X, col) { return __ZC(378, 29, this, arguments, new.target); }
function edrQuizHtml(Ls, col) { return __ZC(378, 30, this, arguments, new.target); }
function edrPassUnit(Ls, then) { return __ZC(378, 31, this, arguments, new.target); }
function edrQuizHand() { return __ZC(378, 32, this, arguments, new.target); }
(function () {
var oo = eduOpen;
eduOpen = function (cid) { var r = oo.apply(this, arguments); edrLx(cid, function () { if (EDU.lesson && EDU.lesson.cid === cid)
eduLessonPaint(); }); return r; };
var lp = eduLessonPaint;
eduLessonPaint = function () {
var r = lp.apply(this, arguments), Ls = EDU.lesson, el = document.getElementById("sch-lesson");
try {
if (!Ls || !el || Ls.tab !== "learn" || !Ls.data)
return r;
var X = edrLxUnit(Ls.cid, Ls.unit);
if (!X || !(X.lessons || []).length)
return r;
if (Ls.edrPartU !== Ls.unit) {
Ls.edrPartU = Ls.unit;
Ls.edrPart = 0;
}
var col = "#" + (EDU_SCOL[Ls.subj] || 0x5A6A7A).toString(16).padStart(6, "0"), card = el.firstElementChild, want = "Unit " + Ls.unit + ": ", head = null, ds = card.querySelectorAll("div");
for (var i = 0; i < ds.length; i++)
if (ds[i].children.length === 0 && ds[i].textContent.indexOf(want) === 0) {
head = ds[i];
break;
}
if (!head)
return r;
var anchor = head.nextElementSibling && /^Standards:/.test(head.nextElementSibling.textContent) ? head.nextElementSibling : head;
var bar = edrPartsBar(Ls, X, col);
if (!Ls.edrPart) {
var n = anchor.nextElementSibling, cut = false;
while (n) {
var nx = n.nextElementSibling;
if (!cut && /^Check what you learned/.test(n.textContent))
cut = true;
if (cut)
n.parentNode.removeChild(n);
n = nx;
}
anchor.insertAdjacentHTML("afterend", '<div style="color:#5A6068;font-size:13px;margin:0 0 6px">This unit has ' + X.lessons.length + ' lessons and a quiz. Start with the overview below.</div>' + bar);
card.insertAdjacentHTML("beforeend", '<div style="margin-top:10px"><button data-edr="part" data-p="1" style="' + eduBtnCss(col) + '">Start lesson 1: ' + esc(X.lessons[0].t) + '</button></div>');
}
else {
var m = anchor.nextElementSibling;
while (m) {
var mx = m.nextElementSibling;
m.parentNode.removeChild(m);
m = mx;
}
card.insertAdjacentHTML("beforeend", bar + (Ls.edrPart <= X.lessons.length ? edrLessonHtml(Ls, X, col) : edrQuizHtml(Ls, col)));
}
}
catch (e) {
if (window.console)
console.warn("[school lessons]", e);
}
return r;
};
var tn = edrTestNew;
edrTestNew = function (Ls) {
var t = tn.apply(this, arguments), d = EDR.lx[Ls.cid];
if (!t || !d)
return t;
var add = [];
d.units.forEach(function (U, ui) { (U.lessons || []).forEach(function (L) { (L.check || []).forEach(function (q) { add.push({ q: q[0], o: edrMix([q[1], q[2], q[3]]), a: q[1], u: ui + 1 }); }); }); });
t.qs = edrMix(t.qs.concat(add)).slice(0, 30);
return t;
};
var tb = edrTeacherBrief;
edrTeacherBrief = function (T) {
var s = tb.apply(this, arguments), X = edrLxUnit(T.cid, T.unit || 1);
if (!X)
return s;
var L = T.part && X.lessons[T.part - 1];
return s + " This unit's lessons: " + X.lessons.map(function (q, i) { return (i + 1) + ". " + q.t; }).join("; ") + "." + (L ? " The pupil is on lesson " + T.part + ", “" + L.t + "”: " + (L.learn || []).join(" ") : "");
};
var at = edrAskTeacher;
edrAskTeacher = function (cid, unit) {
var Ls = EDU.lesson, p = Ls && Ls.cid === cid ? Ls.edrPart || 0 : 0;
var r = at.apply(this, arguments);
try {
(store.characters || []).forEach(function (x) { if (x.edrT && x.edrT.cid === cid) {
x.edrT.part = p;
x.details = [edrTeacherBrief(x.edrT)];
} });
}
catch (e) { }
return r;
};
})();
addEventListener("click", function (e) {
var b = e.target && e.target.closest ? e.target.closest('[data-edr="part"],[data-edr="spick"],[data-edr="qpick"],[data-edr="qhand"],[data-edr="qnew"],[data-edr="lread"]') : null;
if (!b)
return;
var Ls = EDU.lesson;
if (!Ls)
return;
var k = b.getAttribute("data-edr"), sc = document.getElementById("sch-lesson");
if (k === "part") {
Ls.edrPart = +b.getAttribute("data-p");
eduLessonPaint();
if (sc)
sc.scrollTop = 0;
return;
}
var y = sc ? sc.scrollTop : 0;
if (k === "spick") {
var key = Ls.unit + "." + Ls.edrPart;
(Ls.edrSelf[key] || (Ls.edrSelf[key] = {}))[+b.getAttribute("data-k")] = b.getAttribute("data-o");
}
else if (k === "qpick" && Ls.edrQ && !Ls.edrQ.marked) {
Ls.edrQ.picks[+b.getAttribute("data-k")] = +b.getAttribute("data-o");
Ls.edrQ.msg = "";
}
else if (k === "qhand") {
edrQuizHand();
}
else if (k === "qnew") {
Ls.edrQ = null;
y = 0;
}
else if (k === "lread") {
var X = edrLxUnit(Ls.cid, Ls.unit), L = X && X.lessons[Ls.edrPart - 1];
if (L && typeof speechSynthesis !== "undefined")
try {
speechSynthesis.cancel();
var s = new SpeechSynthesisUtterance([L.t].concat(L.learn || []).concat(L["try"] ? ["Try it. " + L["try"]] : []).join(". "));
s.rate = EDU_GRADES.indexOf(Ls.g) < 3 ? 0.9 : 1;
speechSynthesis.speak(s);
}
catch (x) { }
return;
}
eduLessonPaint();
if (sc)
sc.scrollTop = y;
});
