/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(124, function () {
"use strict";
return [
function (kind) {
if (typeof DRIVE !== "undefined" && DRIVE.test && DRIVE.test.active && DRIVE.test.kind === kind)
return { word: "Learner · on test", cls: "learn" };
if (kind === "flying" && typeof driveCorpOnDuty === "function" && driveCorpOnDuty() && !hasLicence(kind))
return { word: "Corp patrol · on duty", cls: "learn" };
if (kind === "flying" && !hasLicence(kind) && typeof DRIVE !== "undefined" && DRIVE.on && DRIVE.src === "corp" && typeof CORP !== "undefined" && CORP.mounted)
return { word: "Corp dragon · Corp-trained", cls: "ok" };
if (hasLicence(kind)) {
var r = licenceRow(kind);
return { word: (kind === "flying" ? "Flying" : "Driving") + " licence" + (r.points ? " · " + r.points + " pts" : ""), cls: "ok" };
}
var rv = licenceRow(kind);
return { word: rv && rv.revoked ? "Licence revoked" : "No licence", cls: "no" };
},
function (kind, what) {
what = String(what || "an offence");
LIC.local.push({ kind: kind, what: what, at: Date.now() });
if (LIC.local.length > 20)
LIC.local.shift();
var crime = /without a licence/.test(what) ? (kind === "flying" ? "unlicensed_flying" : "unlicensed_driving") : "reckless";
try {
if (typeof reportCrime === "function")
reportCrime(crime, (kind === "flying" ? "Flying" : "Driving") + ": " + what, null);
}
catch (e) { }
if (!(typeof signedIn === "function" && signedIn()))
return Promise.resolve({ ok: false, offline: true });
return cityRpc("licence_offence", { p_kind: kind, p_what: what }).then(function (o) {
if (o && o.points)
setStatus("<b>" + o.points + " penalty points</b> on your " + kind + " licence for " + esc(what) + " — " + o.total + " in all." +
(o.revoked ? " <b>That is twelve: your licence is revoked.</b> Sit both tests again at the Licensing Office." : ""));
if (o && (o.points || o.revoked))
licRefresh(true);
return o;
}).catch(function () { return { ok: false }; });
},
function () {
var el = document.getElementById("lic");
if (el || !document.body)
return el;
var css = document.createElement("style");
css.textContent = "#lic{position:fixed;left:50%;top:50%;transform:translate(-50%,-50%);z-index:60;display:none;width:min(520px,calc(100vw - 24px));max-height:86vh;overflow:auto;" +
"background:rgba(11,13,19,.97);border:1px solid var(--line);border-radius:3px;padding:18px 20px 20px;font:13.5px/1.55 var(--sans);color:var(--bone);box-shadow:0 18px 60px rgba(0,0,0,.6)}" +
"#lic h2{font-family:var(--serif);font-weight:400;font-size:20px;margin:0}" +
"#lic .lh{display:flex;justify-content:space-between;align-items:center;gap:10px;margin-bottom:6px}" +
"#lic .ld{color:var(--dim);font-size:12.5px;margin:0 0 12px}" +
"#lic .lk{border-top:1px solid var(--line);padding:12px 0 6px}" +
"#lic .lk h3{font-family:var(--serif);font-weight:400;font-size:16px;margin:0 0 6px;display:flex;justify-content:space-between;align-items:baseline;gap:8px}" +
"#lic .chip{font:11px var(--sans);letter-spacing:.06em;text-transform:uppercase;padding:2px 8px;border:1px solid var(--line);border-radius:10px;color:var(--dim)}" +
"#lic .chip.ok{color:#8FCB8A;border-color:rgba(143,203,138,.45)} #lic .chip.no{color:var(--ember)}" +
"#lic .st{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:5px 0}" +
"#lic .st .m{width:18px;color:var(--dim);display:inline-block} #lic .st .m.y{color:#8FCB8A}" +
"#lic .st span.t{flex:1}" +
"#lic .q{font-family:var(--serif);font-size:17px;line-height:1.5;margin:10px 0 12px}" +
"#lic .ch{display:block;width:100%;text-align:left;margin:0 0 7px;padding:10px 12px;font-size:14px;color:var(--bone);line-height:1.4}" +
"#lic .ch.on{border-color:#C9A868;color:#E8C27A;background:rgba(201,168,104,.08)}" +
"#lic .prog{height:3px;background:rgba(201,190,168,.12);margin:4px 0 0}#lic .prog i{display:block;height:100%;background:#C9A868}" +
"#lic .res{padding:9px 0;border-top:1px solid var(--line)}#lic .res b.y{color:#8FCB8A}#lic .res b.n{color:var(--ember)}" +
"#lic .why{color:var(--dim);font-size:12.5px;margin-top:3px}" +
"#lic .msg{margin-top:10px;color:var(--ember);font-size:13px}#lic .msg.ok{color:#8FCB8A}#lic .msg:empty{display:none}" +
"#lic .score{font-family:var(--serif);font-size:22px;margin:6px 0}" +
"body.touch #lic .ch{min-height:46px}";
document.head.appendChild(css);
el = document.createElement("div");
el.id = "lic";
el.setAttribute("role", "dialog");
el.setAttribute("aria-label", "The Licensing Office");
document.body.appendChild(el);
return el;
},
function () {
var el = licEl();
if (!el)
return;
var h;
if (LIC.view === "paper")
h = licPaperHtml();
else if (LIC.view === "marked")
h = licMarkedHtml();
else if (LIC.view === "result")
h = licResultHtml();
else
h = licHomeHtml();
el.innerHTML = h + '<div class="msg' + (LIC.msgOk ? " ok" : "") + '">' + (LIC.msg || "") + '</div>';
licWire(el);
},
function () {
var D = LIC.data, fees = (D && D.fees) || { driving: 30, flying: 45 };
var h = '<div class="lh"><h2>The Licensing Office</h2><button class="btn" data-a="close">Close</button></div>' +
'<p class="ld">Everyone who drives a motor vehicle in Somnucor, or flies over its streets, holds a licence. ' +
'Three steps: the theory test, the practical test, then the licence at the counter. A licence lasts a year.' +
(licWho() ? '' : ' <b style="color:var(--bone)">Sign in to sit the tests for real</b>: a licence is kept against your account. You may still try a paper and the route.') + '</p>';
LIC_KINDS.forEach(function (k) {
var row = licenceRow(k), has = hasLicence(k), th = D && D.theory && D.theory[k], pr = D && D.practical && D.practical[k];
var name = k === "flying" ? "Flying licence" : "Driving licence";
var chip = has ? '<span class="chip ok">held' + (row.points ? ' · ' + row.points + ' points' : '') + '</span>' : (row && row.revoked ? '<span class="chip no">revoked</span>' : '<span class="chip">not held</span>');
h += '<div class="lk"><h3><span>' + name + '</span>' + chip + '</h3>';
if (has)
h += '<div style="color:var(--dim);font-size:12.5px;margin-bottom:6px">Good until ' + esc(fmtDate(row.expires_at)) + '. ' + (k === "flying" ? 'Mind the ceiling (300 m) and the Tower\'s no-fly zone.' : 'Keep right, and keep to the limits.') + '</div>';
if (row && row.revoked)
h += '<div style="color:var(--ember);font-size:12.5px;margin-bottom:6px">' + esc(row.revoked_reason || "Revoked") + '. Sit both tests again to have it back.</div>';
h += '<div class="st"><span class="m' + (th ? " y" : "") + '">' + (th ? "&#10003;" : "1") + '</span><span class="t">Theory test' +
(th ? ' <span style="color:var(--dim)">· passed, ' + th.score + ' of 10</span>' : ' <span style="color:var(--dim)">· 10 questions, 9 to pass</span>') + '</span>' +
'<button class="btn" data-a="theory" data-k="' + k + '">' + (th ? "Sit again" : "Sit the theory test") + '</button></div>';
h += '<div class="st"><span class="m' + (pr ? " y" : "") + '">' + (pr ? "&#10003;" : "2") + '</span><span class="t">Practical test' +
(pr ? ' <span style="color:var(--dim)">· passed, ' + pr.score + (pr.ready ? '' : ' · waiting for the examiner') + '</span>' :
' <span style="color:var(--dim)">· ' + (k === "flying" ? 'the learner broom, through five rings' : 'the learner car, round the block') + '</span>') + '</span>' +
'<button class="btn" data-a="practical" data-k="' + k + '">' + (pr ? "Take it again" : "Take the practical") + '</button></div>';
h += '<div class="st"><span class="m' + (has ? " y" : "") + '">' + (has ? "&#10003;" : "3") + '</span><span class="t">The licence <span style="color:var(--dim)">· ' + (fees[k] || 0) + ' gold at the counter</span></span>' +
(has ? '' : '<button class="btn" data-a="buy" data-k="' + k + '"' + ((th && pr && pr.ready) || !licWho() ? '' : ' disabled') + '>Pay and take it</button>') + '</div></div>';
});
var X = D && D.examiner;
if (X && (X.driving || X.flying)) {
h += '<div class="lk"><h3><span>The examiners\' desk</span><span class="chip ok">on duty</span></h3>';
var B = LIC.board || [];
if (!B.length)
h += '<div style="color:var(--dim);font-size:12.5px">No practical passes are waiting for your signature.</div>';
B.forEach(function (c) { h += '<div class="st"><span class="t">' + esc(c.name) + ' <span style="color:var(--dim)">· ' + esc(c.kind) + ' · ' + c.score + '</span></span><button class="btn" data-a="sign" data-u="' + esc(c.user_id) + '" data-k="' + esc(c.kind) + '">Sign it off</button></div>'; });
var near = licNearby();
if (near.length) {
h += '<div style="color:var(--dim);font-size:12.5px;margin-top:8px">Candidates beside you, who drove or flew with you:</div>';
near.forEach(function (p) { LIC_KINDS.forEach(function (k) { if (X[k])
h += '<div class="st"><span class="t">' + esc(p.name) + ' <span style="color:var(--dim)">· ' + k + '</span></span><button class="btn" data-a="sign" data-u="' + esc(p.id) + '" data-k="' + k + '">Pass in person</button></div>'; }); });
}
h += '</div>';
}
if (D && D.officer) {
var nb = licNearby();
h += '<div class="lk"><h3><span>Check a licence</span><span class="chip">officers</span></h3>';
if (!nb.length)
h += '<div style="color:var(--dim);font-size:12.5px">Nobody close enough to ask.</div>';
nb.forEach(function (p) { h += '<div class="st"><span class="t">' + esc(p.name) + '</span><button class="btn" data-a="check" data-u="' + esc(p.id) + '">Check</button></div>'; });
if (LIC.check)
h += '<div style="font-size:12.5px;margin-top:6px">' + LIC.check + '</div>';
h += '</div>';
}
var off = (D && D.offences) || [];
if (off.length) {
h += '<div class="lk"><h3><span>On your record</span></h3>' + off.map(function (o) { return '<div style="font-size:12.5px;color:var(--dim)">' + esc(fmtDate(o.at)) + ' · ' + esc(o.kind) + ' · ' + esc(o.what) + (o.points ? ' · <b style="color:var(--ember)">' + o.points + ' points</b>' : '') + '</div>'; }).join("") + '</div>';
}
return h;
},
function (kind) {
var src = (LIC.oldBank && typeof LIC_PAPER_OLD !== "undefined" && LIC_PAPER_OLD[kind]) ? LIC_PAPER_OLD : LIC_PAPER;
var bank = ((typeof src !== "undefined" && src[kind]) || []).slice();
for (var i = bank.length - 1; i > 0; i--) {
var k = Math.floor(Math.random() * (i + 1));
var t = bank[i];
bank[i] = bank[k];
bank[k] = t;
}
return { kind: kind, qs: bank.slice(0, 10), i: 0, ans: [], marked: null };
},
function () {
var P = LIC.paper, q = P.qs[P.i], chosen = P.ans[P.i];
if (!q)
return '<div class="lh"><h2>Theory test</h2><button class="btn" data-a="home">Back</button></div><p class="ld">The question paper is empty.</p>';
return '<div class="lh"><h2>' + (P.kind === "flying" ? "Flying" : "Driving") + ' theory · ' + (P.i + 1) + ' of ' + P.qs.length + '</h2><button class="btn" data-a="home">Leave</button></div>' +
'<div class="prog"><i style="width:' + Math.round(P.i / P.qs.length * 100) + '%"></i></div>' +
'<div class="q">' + esc(q.q) + '</div>' +
q.c.map(function (c, ci) { return '<button class="btn ch' + (chosen === ci ? " on" : "") + '" data-a="choose" data-c="' + ci + '">' + esc(c) + '</button>'; }).join("") +
'<div style="display:flex;justify-content:space-between;margin-top:8px">' +
'<button class="btn" data-a="prev"' + (P.i ? '' : ' disabled') + '>Back a question</button>' +
(P.i < P.qs.length - 1 ? '<button class="btn" data-a="next"' + (chosen === undefined ? ' disabled' : '') + '>Next</button>' :
'<button class="btn" data-a="submit"' + (P.ans.filter(function (x) { return x !== undefined; }).length < P.qs.length ? ' disabled' : '') + ' style="border-color:#C9A868;color:#E8C27A">Hand in the paper</button>') + '</div>';
},
function () {
var P = LIC.paper;
if (!P)
return;
var answers = P.qs.map(function (q, i) { return { q: q.id, a: P.ans[i] }; });
licSay("Marking…", true);
var go = licWho() ? cityRpc("sit_licence_theory", { p_kind: P.kind, p_answers: answers }) : Promise.reject(new Error("offline"));
go.then(function (o) {
if (o && !o.ok && /does not set/.test(o.say || "") && !LIC.oldBank && typeof LIC_PAPER_OLD !== "undefined" && LIC_PAPER_OLD[P.kind]) {
LIC.oldBank = true;
LIC.paper = licNewPaper(P.kind);
LIC.view = "paper";
licPaint();
licSay("The office is still marking last year's paper, so here is that one instead. Nothing was counted against you.");
return;
}
if (!o || !o.ok) {
LIC.msg = "";
licSay(esc((o && o.say) || "The paper could not be marked."));
return;
}
P.marked = o;
LIC.view = "marked";
LIC.msg = "";
LIC.msgOk = false;
licPaint();
licRefresh(true);
}).catch(function (e) {
var why = !licWho() ? "You are not signed in, so the Licensing Office cannot mark it: the answers are kept on its own books." :
"The Licensing Office could not be reached just now, so the paper has not been marked or recorded.";
licSay("<b>Not marked.</b> " + why + " Nothing has been counted against you — try again when you are connected.");
});
},
function () {
var P = LIC.paper, M = P.marked, byId = {};
P.qs.forEach(function (q) { byId[q.id] = q; });
var h = '<div class="lh"><h2>' + (P.kind === "flying" ? "Flying" : "Driving") + ' theory · marked</h2><button class="btn" data-a="home">Done</button></div>' +
'<div class="score">' + M.score + ' of ' + M.total + (M.passed ? ' — <span style="color:#8FCB8A">passed</span>' : ' — <span style="color:var(--ember)">not yet</span>') + '</div>' +
'<p class="ld">' + (M.passed ? 'Well done. Next, the practical test.' : 'You need ' + M.need + '. Read why each answer is right, and sit it again in a couple of minutes.') + '</p>';
(M.results || []).forEach(function (r, i) {
var q = byId[r.q] || { q: "", c: [] };
h += '<div class="res"><div>' + (i + 1) + '. ' + esc(q.q) + '</div>' +
'<div style="margin-top:3px">' + (r.right ? '<b class="y">&#10003; Right</b> — ' + esc(q.c[r.answer] || "") :
'<b class="n">&#10007; You chose</b> ' + esc(q.c[r.chose] || "—") + '. <b class="y">Right:</b> ' + esc(q.c[r.answer] || "")) + '</div>' +
'<div class="why">' + esc(r.why || "") + '</div></div>';
});
return h;
},
function (kind) {
if (!licWho()) {
licSay("Sign in to take a licence: it is kept against your account, and the fee comes from your purse.");
return;
}
licSay("At the counter…", true);
cityRpc("buy_licence", { p_kind: kind }).then(function (o) {
if (!o || !o.ok) {
licSay(esc((o && o.say) || "The counter could not issue it."));
return;
}
licSay("<b>" + esc(o.say) + "</b> " + o.fee + " gold paid to the city.", true);
licRefresh(true);
if (typeof refreshStanding === "function")
refreshStanding();
if (typeof DriveHUD !== "undefined")
DriveHUD.refreshLicence();
}).catch(function (e) { licSay("The counter could not be reached just now. Nothing was taken from your purse."); });
},
function (user) {
cityRpc("licence_check", { p_user: user }).then(function (o) {
if (!o || !o.ok) {
LIC.check = esc((o && o.say) || "No answer.");
licPaint();
return;
}
var L = o.licences || [];
LIC.check = "<b>" + esc(o.name) + "</b>: " + (L.length ? L.map(function (l) { return esc(l.kind) + " " + (l.valid ? "valid" : (l.revoked ? "revoked" : "expired")) + (l.points ? " (" + l.points + " points)" : ""); }).join(", ") : "holds no licence") +
((o.offences || []).length ? "<br><span style='color:var(--dim)'>" + o.offences.slice(0, 3).map(function (f) { return esc(f.what); }).join(" · ") + "</span>" : "");
licPaint();
}).catch(function () { LIC.check = "The register could not be reached."; licPaint(); });
},
function (el) {
Array.prototype.forEach.call(el.querySelectorAll("[data-a]"), function (b) {
b.onclick = function () {
var a = b.getAttribute("data-a"), k = b.getAttribute("data-k");
if (a === "close")
return licClose();
if (a === "home") {
LIC.view = "home";
LIC.msg = "";
return licPaint();
}
if (a === "theory") {
LIC.paper = licNewPaper(k);
LIC.view = "paper";
LIC.msg = "";
return licPaint();
}
if (a === "choose") {
LIC.paper.ans[LIC.paper.i] = +b.getAttribute("data-c");
return licPaint();
}
if (a === "next") {
LIC.paper.i = Math.min(LIC.paper.qs.length - 1, LIC.paper.i + 1);
return licPaint();
}
if (a === "prev") {
LIC.paper.i = Math.max(0, LIC.paper.i - 1);
return licPaint();
}
if (a === "submit")
return licSubmitPaper();
if (a === "practical") {
licClose();
return licenceTestStart(k);
}
if (a === "buy")
return licBuy(k);
if (a === "sign")
return licSign(b.getAttribute("data-u"), k);
if (a === "check")
return licCheck(b.getAttribute("data-u"));
if (a === "again") {
LIC.view = "home";
licClose();
return licenceTestStart(LIC.result && LIC.result.kind);
}
};
});
},
function (kind) {
var O = licOffice();
if (!O) {
setStatus("The Licensing Office is in the Civic Ring of Somnucor. Go there to take a practical test.");
return false;
}
if (typeof DRIVE === "undefined")
return false;
if (DRIVE.on) {
setStatus("Get out of what you are in first; the test is taken in the office's own " + (kind === "flying" ? "broom" : "car") + ".");
return false;
}
var P = camera.position;
if (Math.hypot(O.x - P.x, O.z - P.z) > 120 && !store.inside) {
setStatus("Practical tests start at the Licensing Office in the Civic Ring.");
return false;
}
if (store.inside && typeof exitInterior === "function")
try {
exitInterior(true);
}
catch (e) { }
var v = kind === "flying" ? O.broom : O.car;
if (!v) {
setStatus("The learner " + (kind === "flying" ? "broom" : "car") + " is out just now.");
return false;
}
if (v.home) {
v.x = v.home.x;
v.z = v.home.z;
v.rot = v.home.rot;
var g = meshes[v.id];
if (g) {
g.position.x = v.x;
g.position.z = v.z;
g.rotation.y = v.rot;
}
}
if (!vehicleTakeWheel(v))
return false;
var T = kind === "flying" ? licFlyRoute(O) : licDriveRoute(O);
T.kind = kind;
T.active = true;
T.t = 0;
T.faults = [];
T.score = 100;
T.bumps = DRIVE.bumps;
T.practice = !licWho();
DRIVE.test = T;
LTEST = T;
DRIVE.trip.learner = kind;
licTestDraw(T);
setStatus(kind === "flying"
? "<b>Flight test.</b> Through the five gold rings in order, at their heights, then land back at the Licensing Office. Space climbs, C descends, A and D bank."
: "<b>Driving test.</b> Follow the beacon along the Civic Ring, keeping right. Stop completely at each stop line, keep to 15 mph past the school, then signal right (full stop) and pull up at the finish.");
if (typeof DriveHUD !== "undefined")
DriveHUD.refreshLicence();
return true;
},
function (O) {
var rs = O.rs, dir = (O.side > 0 ? 1 : -1) * ROAD_SIDE, a0 = O.car ? Math.atan2(O.car.z - ATLC.z, O.car.x - ATLC.x) : O.a;
var ahead = ATL_STAIRS.map(function (s) { var d = atlWrap(s.a - a0) * dir; if (d < 0)
d += Math.PI * 2; return { s: s, d: d }; })
.sort(function (p, q) { return p.d - q.d; }).filter(function (p) { return p.d * rs > p.s.half + 25; });
var j1 = ahead[0], j2 = ahead[1];
var stop1 = j1.d - (j1.s.half + 4) / rs, stop2 = j2.d - (j2.s.half + 4) / rs;
var slow0 = j1.d + (j1.s.half + 12) / rs, slow1 = stop2 - 25 / rs, fin = j2.d + (j2.s.half + 45) / rs;
var lane = rs + O.side * 2.6, nm = function (s) { return s.main ? "the Grand Stair" : "the stair lane"; };
return { mode: "drive", rs: rs, dir: dir, a0: a0, lane: lane, stage: 0,
wps: [{ k: "stop", d: stop1, name: "the stop line at " + nm(j1.s) }, { k: "stop", d: stop2, name: "the stop line at " + nm(j2.s) }, { k: "finish", d: fin, name: "the finish: signal right and pull up" }],
slow: [slow0, slow1], slowMph: 15, stopped: false, signalled: false, overT: 0, overN: 0, wrongT: 0, offN: 0 };
},
function (O) {
var dir = O.side > 0 ? 1 : -1, rr = O.rs + O.side * 70, H = [25, 45, 65, 45, 25], rings = [];
for (var i = 0; i < 5; i++) {
var a = O.a + dir * ((i + 1) * 80) / rr, r2 = rr + (i % 2 ? 18 : -18);
var x = ATLC.x + Math.cos(a) * r2, z = ATLC.z + Math.sin(a) * r2;
rings.push({ x: x, z: z, y: terrainY(x, z) + H[i], h: H[i], tx: -Math.sin(a) * dir, tz: Math.cos(a) * dir, best: 1e9 });
}
var home = O.broom && O.broom.home ? O.broom.home : { x: O.x, z: O.z };
return { mode: "fly", rings: rings, stage: 0, home: { x: home.x, z: home.z }, nofly: 0 };
},
function (dt, D) {
var T = D.test;
if (!T || !T.active)
return;
T.t += dt;
if (T.t > 420) {
licenceTestEnd(false, "Out of time: a test is seven minutes at most.");
return;
}
if (D.bumps > T.bumps) {
T.bumps = D.bumps;
if (Date.now() - (T.lastBump || 0) > 1500) {
T.lastBump = Date.now();
licFault(T, T.mode === "fly" ? 5 : 10, T.mode === "fly" ? "Struck a building" : "Hit something");
}
}
if (T.mode === "drive")
licDriveTick(dt, D, T);
else
licFlyTick(dt, D, T);
licTestDrawTick(T);
},
function (dt, D, T) {
var P = camera.position, a = Math.atan2(P.z - ATLC.z, P.x - ATLC.x), r = Math.hypot(P.x - ATLC.x, P.z - ATLC.z);
var prog = atlWrap(a - T.a0) * T.dir;
T.prog = prog;
var m = prog * T.rs, sp = Math.abs(D.v);
if (Math.abs(r - T.rs) > 70 || m < -40) {
licenceTestEnd(false, "You left the test route.");
return;
}
var W = T.wps[T.stage];
if (!W)
return;
var wm = W.d * T.rs, togo = wm - m;
var inSlow = prog > T.slow[0] && prog < T.slow[1];
T.note = inSlow ? "School: 15 mph" : "";
if (inSlow && sp > T.slowMph * MPH_MS * 1.05 + 0.4) {
T.overT += dt;
if (T.overT > 0.8 && !T.overOn) {
T.overOn = true;
licFault(T, 8, "Over 15 mph past the school");
}
}
else {
T.overT = 0;
T.overOn = false;
}
if (D.overT > 2 && !T.limOn) {
T.limOn = true;
licFault(T, 5, "Over the speed limit");
}
else if (D.overT === 0)
T.limOn = false;
if (D.wrongT > 1.5 && !T.wrongOn) {
T.wrongOn = true;
licFault(T, 10, "On the wrong side of the road");
}
else if (D.wrongT === 0)
T.wrongOn = false;
if (D.offT > 1 && !T.offOn) {
T.offOn = true;
licFault(T, 10, "Off the road");
}
else if (D.offT === 0)
T.offOn = false;
if (W.k === "stop") {
if (togo < 9 && togo > -1.5 && sp < 0.35) {
if (!T.stopped) {
T.stopped = true;
driveNote("Stopped at the line. Look, then go.", 2);
}
}
if (togo < -2.5) {
if (!T.stopped)
licFault(T, 20, "Did not stop at the stop line");
T.stage++;
T.stopped = false;
}
}
else {
if (togo < 70 && D.ind === (ROAD_SIDE < 0 ? "right" : "left"))
T.signalled = true;
if (togo < 12 && togo > -12 && sp < 0.35) {
if (!T.signalled)
licFault(T, 10, "Pulled up without signalling " + (ROAD_SIDE < 0 ? "right" : "left"));
var kerbSide = (r - T.rs) * (T.dir) * ROAD_SIDE;
if (kerbSide < 1)
licFault(T, 5, "Did not pull up on the " + (ROAD_SIDE < 0 ? "right" : "left"));
licenceTestEnd(true);
return;
}
if (togo < -30) {
licFault(T, 10, "Drove past the finish");
licenceTestEnd(true);
return;
}
}
W = T.wps[T.stage];
if (W) {
var wm2 = W.d * T.rs, aim = T.a0 + T.dir * W.d, tx = ATLC.x + Math.cos(aim) * T.lane, tz = ATLC.z + Math.sin(aim) * T.lane;
var brg = Math.atan2(tx - P.x, -(tz - P.z)), rel = atlWrap(brg - bearingOfHeading(D.h));
T.next = (W.k === "stop" ? "Stop line" : "Finish") + " · " + Math.max(0, Math.round(wm2 - m)) + " m — " + W.name;
T.turn = rel;
}
},
function (dt, D, T) {
var P = camera.position, seat = (typeof rideSeatNow === "function") ? rideSeatNow() : 0, y = P.y - 1.72 - seat + 0.4;
var R = T.rings[T.stage];
if (D.nofly) {
if (!T.noflyOn) {
T.noflyOn = true;
licFault(T, 30, "Entered the Tower's no-fly zone");
}
}
else
T.noflyOn = false;
if (R) {
var d = Math.hypot(R.x - P.x, R.z - P.z, R.y - y);
if (d < R.best)
R.best = d;
if (d < 6.5) {
R.done = true;
T.stage++;
driveNote("Ring " + T.stage + " of 5", 1.5);
if (typeof audio !== "undefined" && audio.on && typeof playTone === "function")
try {
playTone(660, 0.12);
}
catch (e) { }
}
else if (R.best < 30 && d > R.best + 25) {
licFault(T, 15, "Missed ring " + (T.stage + 1) + (Math.abs(R.y - y) > 6 ? " (wrong height: it is at " + R.h + " m)" : ""));
T.stage++;
}
R = T.rings[T.stage];
}
if (R) {
var brg = Math.atan2(R.x - P.x, -(R.z - P.z)), rel = atlWrap(brg - bearingOfHeading(D.h)), up = Math.round(R.y - y);
T.next = "Ring " + (T.stage + 1) + " of 5 · " + Math.round(Math.hypot(R.x - P.x, R.z - P.z)) + " m · at " + R.h + " m" + (Math.abs(up) > 3 ? (up > 0 ? " — climb " + up + " m" : " — descend " + (-up) + " m") : " — level");
T.turn = rel;
}
else {
var dh = Math.hypot(T.home.x - P.x, T.home.z - P.z), b2 = Math.atan2(T.home.x - P.x, -(T.home.z - P.z));
T.next = "Land back at the Licensing Office · " + Math.round(dh) + " m";
T.turn = atlWrap(b2 - bearingOfHeading(D.h));
if (dh < 30 && D.alt < 1.2 && Math.abs(D.v) < 1) {
licenceTestEnd(true);
}
}
},
function (done, why) {
var T = LTEST;
if (!T || !T.active)
return;
T.active = false;
licTestClear();
if (!done) {
setStatus("<b>Test stopped.</b> " + esc(why || "") + " Take it again from the Licensing Office.");
LTEST = null;
if (typeof DRIVE !== "undefined")
DRIVE.test = null;
return;
}
var res = { kind: T.kind, score: T.score, faults: T.faults, passed: T.score >= 80, recorded: null, say: "" };
LIC.result = res;
if (typeof DRIVE !== "undefined")
DRIVE.test = null;
LTEST = null;
var detail = { faults: T.faults.slice(0, 20), secs: Math.round(T.t) };
var go = licWho() ? cityRpc("record_licence_practical", { p_kind: T.kind, p_score: T.score, p_detail: detail }) : Promise.reject(new Error("offline"));
LIC.view = "result";
licOpenResult();
go.then(function (o) { res.recorded = !!(o && o.ok); res.say = (o && o.say) || ""; if (o && o.ok)
res.passed = o.passed; licRefresh(true); if (LIC.open && LIC.view === "result")
licPaint(); })
.catch(function () { res.recorded = false; res.say = licWho() ? "The Licensing Office could not be reached, so this result has not been recorded." : "You are not signed in, so this was a practice run: the result has not been recorded."; if (LIC.open && LIC.view === "result")
licPaint(); });
},
function () {
var R = LIC.result || { score: 0, faults: [] };
return '<div class="lh"><h2>' + (R.kind === "flying" ? "Flight" : "Driving") + ' test</h2><button class="btn" data-a="home">Done</button></div>' +
'<div class="score">' + R.score + ' of 100' + (R.passed ? ' — <span style="color:#8FCB8A">passed</span>' : ' — <span style="color:var(--ember)">not yet</span>') + '</div>' +
'<p class="ld">80 is needed to pass. ' + (R.faults.length ? 'What cost marks:' : 'A clean run: no marks lost.') + '</p>' +
R.faults.map(function (f) { return '<div class="res"><b class="n">−' + f.pts + '</b> ' + esc(f.what) + '</div>'; }).join("") +
'<p class="ld" style="margin-top:10px">' + (R.recorded === null ? "Recording the result…" : esc(R.say)) + '</p>' +
'<div style="display:flex;gap:8px;justify-content:flex-end"><button class="btn" data-a="again">Take it again</button></div>';
},
function (T) {
licTestClear();
if (typeof THREE === "undefined" || typeof scene === "undefined")
return;
var G = new THREE.Group();
G.userData.lic = 1;
var white = new THREE.MeshBasicMaterial({ color: 0xF4F0E6 });
function flat(geo, mat, x, z, rot, lift) { var m = new THREE.Mesh(geo, mat); m.rotation.x = -Math.PI / 2; m.rotation.z = rot || 0; m.position.set(x, terrainY(x, z) + (lift || 0.06), z); m.raycast = function () { }; G.add(m); return m; }
if (T.mode === "drive") {
var stopTex = licPaintTex(function (x, w, h) { x.fillStyle = "rgba(0,0,0,0)"; x.clearRect(0, 0, w, h); x.fillStyle = "#F4F0E6"; x.font = "bold 92px sans-serif"; x.textAlign = "center"; x.textBaseline = "middle"; x.fillText("STOP", w / 2, h / 2); }, 256, 128);
var slowTex = licPaintTex(function (x, w, h) { x.clearRect(0, 0, w, h); x.strokeStyle = "#C0392B"; x.lineWidth = 22; x.beginPath(); x.arc(w / 2, h / 2, w / 2 - 14, 0, 7); x.stroke(); x.fillStyle = "#F4F0E6"; x.font = "bold 110px sans-serif"; x.textAlign = "center"; x.textBaseline = "middle"; x.fillText("15", w / 2, h / 2 + 6); }, 256, 256);
T.wps.forEach(function (W) {
var a = T.a0 + T.dir * W.d, x = ATLC.x + Math.cos(a) * T.lane, z = ATLC.z + Math.sin(a) * T.lane, rot = -a;
if (W.k === "stop") {
flat(new THREE.PlaneGeometry(5.6, 0.45), white, x, z, rot);
var b = -T.dir * 3.2 / T.rs, x2 = ATLC.x + Math.cos(a + b) * T.lane, z2 = ATLC.z + Math.sin(a + b) * T.lane;
flat(new THREE.PlaneGeometry(4.6, 2.3), new THREE.MeshBasicMaterial({ map: stopTex, transparent: true, depthWrite: false }), x2, z2, rot + (T.dir > 0 ? Math.PI : 0), 0.07);
}
else {
var chk = licPaintTex(function (cx, w, h) { for (var i = 0; i < 8; i++)
for (var j = 0; j < 2; j++) {
cx.fillStyle = (i + j) % 2 ? "#16171C" : "#F4F0E6";
cx.fillRect(i * w / 8, j * h / 2, w / 8, h / 2);
} }, 256, 64);
flat(new THREE.PlaneGeometry(5.6, 1.4), new THREE.MeshBasicMaterial({ map: chk }), x, z, rot);
}
});
[T.slow[0]].forEach(function (d) {
var a = T.a0 + T.dir * d, x = ATLC.x + Math.cos(a) * T.lane, z = ATLC.z + Math.sin(a) * T.lane;
flat(new THREE.PlaneGeometry(3.2, 3.2), new THREE.MeshBasicMaterial({ map: slowTex, transparent: true, depthWrite: false }), x, z, -a + (T.dir > 0 ? Math.PI : 0), 0.07);
});
}
else {
T.rings.forEach(function (R, i) {
var m = new THREE.Mesh(new THREE.TorusGeometry(6, 0.35, 10, 48), new THREE.MeshBasicMaterial({ color: 0xE8C27A, transparent: true, opacity: 0.9 }));
m.position.set(R.x, R.y, R.z);
m.rotation.y = Math.atan2(R.tx, R.tz);
m.raycast = function () { };
m.userData.ring = i;
G.add(m);
R.mesh = m;
});
}
var beacon = new THREE.Mesh(new THREE.CylinderGeometry(0.9, 0.9, 60, 12, 1, true), new THREE.MeshBasicMaterial({ color: 0xE8C27A, transparent: true, opacity: 0.22, depthWrite: false, side: THREE.DoubleSide, blending: THREE.AdditiveBlending }));
beacon.raycast = function () { };
G.add(beacon);
G.userData.beacon = beacon;
scene.add(G);
LTEST_G = G;
licTestDrawTick(T);
},
function (T) {
var G = LTEST_G;
if (!G)
return;
var b = G.userData.beacon, x = null, z = null, y = 0;
if (T.mode === "drive") {
var W = T.wps[T.stage];
if (W) {
var a = T.a0 + T.dir * W.d;
x = ATLC.x + Math.cos(a) * T.lane;
z = ATLC.z + Math.sin(a) * T.lane;
y = terrainY(x, z) + 30;
}
}
else {
var R = T.rings[T.stage];
T.rings.forEach(function (Q, i) { if (Q.mesh) {
Q.mesh.material.opacity = Q.done ? 0.12 : (i === T.stage ? 0.95 : 0.45);
Q.mesh.material.color.setHex(Q.done ? 0x8FCB8A : (i === T.stage ? 0xFFD890 : 0xC9A868));
} });
if (R) {
x = R.x;
z = R.z;
y = R.y + 36;
}
else {
x = T.home.x;
z = T.home.z;
y = terrainY(x, z) + 30;
}
}
b.visible = x !== null;
if (x !== null)
b.position.set(x, y, z);
}
];
});
