/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(129, function () {
"use strict";
return [
function (role, i) {
var id = UG_JOBS[role].id, key = ugKeyOf(i), nm = null;
if (typeof TEMPS !== "undefined")
TEMPS.list.forEach(function (t) { if (!nm && t.post && t.post.job === id && t.home && UNDERGROUND[i] && Math.hypot(t.home.x - UNDERGROUND[i].x, t.home.z - UNDERGROUND[i].z) < 1)
nm = t.name; });
if (nm)
return nm;
var h = (typeof hash === "function") ? hash("ug" + role + key) : 7;
var F = typeof TEMP_GIVEN_F !== "undefined" ? TEMP_GIVEN_F : ["Mara"], Mn = typeof TEMP_GIVEN_M !== "undefined" ? TEMP_GIVEN_M : ["Oswin"], S = typeof SURNAME !== "undefined" ? SURNAME : ["Dray"];
return ((h >>> 3) % 2 ? F : Mn)[(h >>> 5) % 20 % ((h >>> 3) % 2 ? F : Mn).length] + " " + S[(h >>> 10) % S.length];
},
function (role) {
var j = ugjJob(role);
if (!j)
return Promise.resolve({ ok: false, say: "Clock in as " + UG_JOBS[role].title.toLowerCase() + " first, inside your hours." });
if (j.test)
return Promise.resolve({ ok: true });
return cityRpc("start_task", { p_job: j.job_id, p_task: UG_JOBS[role].task }).catch(function (e) { return { ok: false, say: e.message }; });
},
function (role, ref) {
var j = ugjJob(role);
if (!j)
return Promise.resolve({ ok: false, say: "You are not clocked in." });
if (typeof WORK !== "undefined")
WORK.lastWork = Date.now();
if (j.test)
return Promise.resolve({ ok: true, test: true });
return cityRpc("do_task", { p_job: j.job_id, p_task: UG_JOBS[role].task, p_ref: ref ? String(ref).slice(0, 120) : null })
.then(function (o) { if (typeof workRefresh === "function")
workRefresh(true); return o || { ok: false }; }).catch(function (e) { return { ok: false, say: e.message }; });
},
function (job, task) {
var role = Object.keys(UG_JOBS).filter(function (r) { return UG_JOBS[r].title === job.title; })[0];
if (typeof WORK !== "undefined") {
WORK.open = false;
if (typeof workPaint === "function")
workPaint();
}
if (!job.clocked_in)
return ugjSay("Clock in first, inside your hours.");
if (role === "clerk")
return ugjSay("Go to any station entrance and press <b>U</b>: take the window at its booking office.");
if (!(typeof UG2 !== "undefined" && UG2.on))
return ugjSay("Go to any station entrance and press <b>U</b>: show your staff pass at the booking office and go down. Your work is on the staff panel below.");
ugjStaffPaint(true);
ugjSay("Your work is on the staff panel.");
},
function () {
if (typeof UNDERGROUND === "undefined" || !UNDERGROUND.length || !UNDERGROUND[0].spec || typeof THREE === "undefined" || typeof scene === "undefined" || !scene)
return;
if (UGJ.kiosks && UGJ.kioskFor === UNDERGROUND[0].spec.id)
return;
if (UGJ.kiosks)
scene.remove(UGJ.kiosks);
var G = new THREE.Group(), wood = new THREE.MeshLambertMaterial({ color: 0x6A4A30 }), red = new THREE.MeshLambertMaterial({ color: UG_LINECOL }), glass = new THREE.MeshBasicMaterial({ color: 0xFFE9B0 }), dark = new THREE.MeshLambertMaterial({ color: 0x1C1D22 });
var sign = new THREE.MeshBasicMaterial({ map: ugTex("Tickets", "Booking office", 256, 96, "#1E2F6E", "#FFFFFF") });
UNDERGROUND.forEach(function (s) {
var sp = s.spec;
if (!sp)
return;
var rot = sp.rot || 0, fx = Math.sin(rot), fz = Math.cos(rot), sx = Math.cos(rot), sz = -Math.sin(rot);
var x = sp.x + sx * 4.8 + fx * 1.0, z = sp.z + sz * 4.8 + fz * 1.0, y = (typeof terrainY === "function") ? terrainY(x, z) : 0;
var k = new THREE.Group();
k.position.set(x, y, z);
k.rotation.y = rot;
function bx(w, h, d, px, py, pz, m) { var me = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m); me.position.set(px, py, pz); k.add(me); return me; }
bx(1.9, 1.0, 1.4, 0, 0.5, 0, wood);
bx(1.9, 0.9, 0.12, 0, 1.45, -0.64, wood);
bx(0.12, 0.9, 1.4, -0.89, 1.45, 0, wood);
bx(0.12, 0.9, 1.4, 0.89, 1.45, 0, wood);
bx(1.66, 0.82, 0.04, 0, 1.45, 0.66, glass);
bx(2.0, 0.14, 1.5, 0, 1.97, 0, red);
bx(2.1, 0.1, 1.6, 0, 2.08, 0, dark);
var sg = new THREE.Mesh(new THREE.PlaneGeometry(1.8, 0.66), sign);
sg.position.set(0, 2.5, 0.05);
k.add(sg);
var sg2 = sg.clone();
sg2.rotation.y = Math.PI;
sg2.position.z = -0.05;
k.add(sg2);
k.traverse(function (m) { m.raycast = function () { }; });
G.add(k);
});
scene.add(G);
UGJ.kiosks = G;
UGJ.kioskFor = UNDERGROUND[0].spec.id;
},
function (from) {
var el = ugbEl();
if (!el)
return;
var i = ugIndexOf(from);
if (i < 0)
return ugjSay("That station is not on the line.");
UGJ.book = { from: from, i: i, key: String(from.key), ticket: null, state: null, msg: "", waitAt: 0 };
if (typeof ugOpen !== "undefined")
ugOpen = true;
if (document.exitPointerLock)
document.exitPointerLock();
if (typeof UG2 !== "undefined")
UG2.liveAt = 0;
el.style.display = "block";
el.dataset.h = "";
ugbPaint();
},
function () {
var el = document.getElementById("ugb"), B = UGJ.book;
if (!el || !B)
return;
var clerk = ugbClerkAt(B.key), fare = ugFare(), staff = ugjRoles().length > 0, amClerk = !!ugjJob("clerk");
var h = '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px"><b style="font-size:15px;color:#E8C27A">Booking office · ' + esc(B.from.name) + '</b>' +
'<button class="btn" id="ugb-x">Leave</button></div>' +
'<div class="dim">A ticket to anywhere on the Ring Line, either rail, as far as you like: <b style="color:var(--bone,#E8E2D2)">' + (fare ? fare + " gold" : "free today") + '</b>.</div>' +
'<div class="row"><span>At the window: <b>' + (clerk ? esc(clerk.name) : esc(ugjStandIn("clerk", B.i))) + '</b>' + (clerk ? '' : ' <span class="dim">(stand-in)</span>') + '</span>' +
(B.state === "waiting" ? '<span class="dim">serving you…</span>' : '<button class="btn" id="ugb-buy"' + (B.state === "issued" ? ' disabled' : '') + '>Buy a ticket — ' + fare + ' gold</button>') + '</div>';
if (staff)
h += '<div class="row"><span>On duty: ' + ugjRoles().map(function (r) { return esc(UG_JOBS[r].title); }).join(", ") + '</span><button class="btn" id="ugb-pass">Staff pass — go down</button></div>';
if (amClerk) {
if (UGJ.window && UGJ.window.key === B.key) {
h += '<div style="margin-top:8px"><b>Your window</b> <span class="dim">· ' + UGJ.sold + ' sold this shift</span> <button class="btn" id="ugb-close">Close the window</button></div>';
if (UGJ.serve) {
var S = UGJ.serve, want = S.steps[S.s];
h += '<div style="margin-top:6px">Serving <b>' + esc(S.name) + '</b></div><div class="bar"><i style="width:' + Math.round((S.s + (S.busy ? Math.min(1, S.t / 3) : 0)) / S.steps.length * 100) + '%"></i></div>';
if (S.sending)
h += '<div class="dim">Recording the sale…</div>';
else if (S.busy)
h += '<div class="dim">' + esc(S.steps[S.s]) + '…</div>';
else
h += '<div class="dim">What comes next?</div><div>' + S.order.map(function (st) { return '<button class="btn" data-step="' + esc(st) + '" style="margin:3px 4px 0 0">' + esc(st) + '</button>'; }).join("") + '</div>' +
(S.pen > 0 ? '<div style="color:#C0603A">Not that yet: first, ' + esc(want.toLowerCase()) + '.</div>' : '');
}
else if (UGJ.queue.length) {
h += UGJ.queue.map(function (q) { return '<div class="row"><span>' + esc(q.name || "A passenger") + ' <span class="dim">· waiting ' + Math.round(q.age || 0) + ' s</span></span><button class="btn" data-serve="' + q.id + '">Serve</button></div>'; }).join("");
}
else
h += '<div class="dim" style="margin-top:4px">Nobody at the window just now. Passengers who buy here come to you.</div>';
}
else
h += '<div class="row"><span>You are on duty as a booking clerk.</span><button class="btn" id="ugb-take">Take the window here</button></div>';
}
h += '<div id="ugb-msg" style="margin-top:8px;color:#E8C27A">' + (B.msg || "") + '</div>';
if (el.dataset.h === h)
return;
el.dataset.h = h;
el.innerHTML = h;
function on(id, fn) { var b = document.getElementById(id); if (b)
b.onclick = fn; }
on("ugb-x", ugbClose);
on("ugb-buy", ugbBuy);
on("ugb-pass", ugbPass);
on("ugb-take", ugjWindowTake);
on("ugb-close", function () { ugjWindowClose(false); });
Array.prototype.forEach.call(el.querySelectorAll("[data-serve]"), function (b) { b.onclick = function () { ugjServe(+b.getAttribute("data-serve")); }; });
Array.prototype.forEach.call(el.querySelectorAll("[data-step]"), function (b) { b.onclick = function () { ugjServeStep(b.getAttribute("data-step")); }; });
},
function () {
var B = UGJ.book;
if (!B || B.state)
return;
if (UGJ.test) {
B.state = "issued";
ugbMsg("Your ticket, from " + esc(ugjStandIn("clerk", B.i)) + ". <i>(practice: no gold taken)</i>");
setTimeout(ugbDown, 900);
return;
}
if (!(typeof signedIn === "function" && signedIn()))
return ugbMsg("Sign in to ride: the fare comes from your purse.");
ugbMsg("Paying at the window…");
cityRpc("buy_ug_ticket", { p_station: B.key }).then(function (o) {
if (UGJ.book !== B)
return;
if (!o || !o.ok) {
ugbMsg(esc((o && o.say) || "That did not go through."));
return;
}
B.ticket = o.ticket;
B.state = o.state;
if (typeof refreshStanding === "function")
refreshStanding();
if (o.state === "issued") {
ugbMsg("Your ticket, from " + esc(o.clerk || ugjStandIn("clerk", B.i)) + ". Down you go.");
setTimeout(ugbDown, 900);
}
else {
B.clerk = o.clerk;
B.waitAt = 0;
ugbMsg("<b>" + esc(o.clerk || "The clerk") + "</b> is serving you. Your fare is paid; your ticket is coming.");
}
}).catch(function (e) {
if (/buy_ug_ticket|function|schema|404/i.test(e.message || "")) {
var f = B.from;
ugbClose();
ug2Enter(f);
}
else
ugbMsg(esc(e.message));
});
},
function () {
var B = UGJ.book;
if (!B)
return;
ugbMsg("Showing your pass…");
ugjRpc("ug_staff_pass", { p_station: B.key }).then(function (o) {
if (UGJ.book !== B)
return;
if (!o || !o.ok) {
ugbMsg(esc((o && o.say) || "Your pass was not taken."));
return;
}
var i = B.i;
ugbClose();
ug2Down(i);
ugjStaffPaint(true);
});
},
function () {
var B = UGJ.book;
if (!B)
return;
ugjRpc("ug_post", { p_role: "clerk", p_station: B.key, p_detail: {} }).then(function (o) {
if (!o || !o.ok) {
ugbMsg(esc((o && o.say) || "You cannot take the window."));
return;
}
var sp = UNDERGROUND.filter(function (s) { return String(s.key) === B.key; })[0];
UGJ.window = { key: B.key, i: B.i, x: sp ? sp.x : camera.position.x, z: sp ? sp.z : camera.position.z, mall: B.from.ring === "mall" };
UGJ.queue = [];
UGJ.queueAt = 0;
UGJ.postAt = 30;
ugjWorking();
ugbMsg("<b>The window is yours.</b> Passengers buying a ticket here come to you. Stay at the window.");
});
},
function (id) {
if (UGJ.serve)
return;
var q = UGJ.queue.filter(function (x) { return x.id === id; })[0];
if (!q)
return;
var steps = ["Take the fare", "Print the ticket", "Hand it over"];
UGJ.serve = { id: id, name: q.name || "A passenger", steps: steps, order: [steps[2], steps[0], steps[1]], s: 0, t: 0, busy: false, pen: 0, sending: false };
ugjStart("clerk").then(function (o) { if (!o || !o.ok) {
ugbMsg(esc((o && o.say) || "Could not start."));
UGJ.serve = null;
} ugbPaint(); });
},
function () {
var S = UGJ.serve;
if (!S)
return;
S.sending = true;
ugbPaint();
var done = function (o) {
UGJ.serve = null;
UGJ.queue = UGJ.queue.filter(function (q) { return q.id !== S.id; });
if (o && o.ok) {
UGJ.sold++;
ugbMsg("<b>Sold.</b> " + esc(S.name) + " goes down to the trains." + (o.test ? " <i>(practice)</i>" : ""));
}
else
ugbMsg(esc((o && o.say) || "That sale did not count."));
};
(S.id < 0 ? Promise.resolve({ ok: true, test: true }) : ugjRpc("ug_serve_ticket", { p_ticket: S.id })).then(function (o) {
if (!o || !o.ok) {
done(o);
return;
}
ugjDone("clerk", "ticket " + S.id).then(done);
});
},
function (a, k) {
if (a === "drv0" || a === "drv1")
ugDriveTake(a === "drv0" ? 0 : 1, { job: ugjJob("driver"), test: UGJ.test });
else if (a === "drv-cancel") {
UGD.pending = null;
}
else if (a === "grd0" || a === "grd1")
ugjGuardTake(a === "grd0" ? 0 : 1);
else if (a === "grd-cancel") {
if (UGJ.guard)
UGJ.guard.pending = null;
UGJ.guard = null;
}
else if (a === "grd-c")
ugjGuardKey("close");
else if (a === "grd-r")
ugjGuardKey("ra");
else if (a === "grd-off")
ugjLeaveCab();
else if (a === "ms")
ugjMasterTake();
else if (a === "ms-off")
ugjMasterEnd("You hand the platform back to the stand-in station master.");
else if (a === "ms-say")
ugjMasterSay(+k);
else if (a === "box")
ugjBoxOpen();
else if (a === "walk0" || a === "walk1")
ugjWalkStart(a === "walk0" ? 0 : 1);
else if (a === "walk-off")
ugjWalkEnd(false, "You climb back up. The section is left for another night.");
ugjStaffPaint(true);
},
function () {
var R = UG2.ride, G = UGJ.guard;
if (!R || R.cab !== "rear" || !G)
return null;
var t = ugNow(), L = UG2.live[R.key];
if (L) {
if (!L.doors || Math.abs(ugLiveS(L)) > 6) {
return null;
}
return { st: L.cur, live: L, open: true };
}
var el = t - R.t0, k = Math.floor(el / UG_SEG), ph = el - k * UG_SEG;
if (ph >= UG_DWELL)
return null;
return { st: ugStationAt(ugPos(R.from, R.d) + k, R.d), ph: ph, open: ph > 2 && ph < UG_DWELL - 3 };
},
function () {
var G = UGJ.guard, S = ugjGuardStop();
if (!G)
return "";
if (!S)
return "Rear cab · next stop " + ugName(ugNextStop(UG2.at, UG2.ride.d));
if (!G.stop)
return "At " + ugName(S.st);
if (G.stop.ra)
return "Right away given at " + ugName(S.st) + ".";
if (!ugjGuardReady())
return "At " + ugName(S.st) + " · let them on and off";
return G.stop.closed ? "Doors shut · give the right away (R)" : "Time: shut the doors (C)";
},
function (k) {
var G = UGJ.guard, S = ugjGuardStop();
if (!G || !G.stop || !S)
return;
if (!ugjGuardReady())
return ugjSay("Not yet — give the passengers their time.");
if (k === "close" && !G.stop.closed) {
G.stop.closed = true;
if (typeof playTone === "function")
playTone(600, 0.25);
ugjSay("Doors shut. Look down the platform, then give the right away (R).");
return;
}
if (k === "ra" && G.stop.closed && !G.stop.ra) {
G.stop.ra = true;
if (typeof playTone === "function")
playTone(990, 0.2);
if (S.live)
ugjRpc("ug_guard_rightaway", { p_d: G.d, p_run: ugRunCanon(S.live.run), p_station: S.st });
var st = S.st;
if (G.stop.started)
ugjDone("guard", ugName(st)).then(function (o) { ugjSay(o && o.ok ? "<b>Right away</b> at " + esc(ugName(st)) + ". That counts toward your work." : esc((o && o.say) || "That did not count.")); });
else
ugjSay("<b>Right away</b> at " + esc(ugName(st)) + ".");
G.done++;
}
},
function () {
var i = UG2.at;
ugjRpc("ug_post", { p_role: "master", p_station: ugKeyOf(i), p_detail: {} }).then(function (o) {
if (!o || !o.ok)
return ugjSay(esc((o && o.say) || "You cannot take charge here."));
UGJ.master = { i: i, good: 0, q: null, nextAt: 3, postAt: 30, started: false };
ugjStart("master").then(function (r) { if (UGJ.master)
UGJ.master.started = !!(r && r.ok); });
ugjSay("<b>You have charge of " + esc(ugName(i)) + ".</b> Make the announcements as the trains come and go.");
});
},
function () {
var i = UG2.at, t = ugNow(), N = ugN(), opts, right, why;
var open = [0, 1].filter(function (d) { var n = ugTrainNear(i, d, t); return n && Math.abs(n.x) < 6 && n.open > 0.6; });
var crowd = ugCrowdSize();
if (open.length) {
var d = open[0];
right = "Mind the gap. This is the " + UG_RAIL_NAMES[d] + " to " + ugName(ugNextStop(i, d)) + ".";
opts = [right, "This train terminates here. All change, please.", "Mind the gap. This is the " + UG_RAIL_NAMES[d] + " to " + ugName(ugPrevStop(i, d)) + "."];
why = "A train is in with its doors open.";
}
else if (crowd >= 22 && (Math.floor(t / 60) % 2 === 0)) {
right = "Please move right down the platform and use the whole length of the train.";
opts = [right, "Please wait by the stairs: the platform is closed.", "Please stand close to the edge, the train is due."];
why = "The rush hour: the crowd is bunched by the stairs.";
}
else {
var d2 = ugNextIn(i, 0, t) <= ugNextIn(i, 1, t) ? 0 : 1, due = Math.max(1, Math.round(ugNextIn(i, d2, t) / 60)), wrong = ugStationAt(ugPos(i, d2) + 2 + Math.floor(t) % (N - 3 || 1), d2);
right = "The next " + UG_RAIL_NAMES[d2] + " train is for " + ugName(ugNextStop(i, d2)) + ", due in " + due + " minute" + (due === 1 ? "" : "s") + ".";
opts = [right, "The next " + UG_RAIL_NAMES[1 - d2] + " train is for " + ugName(ugNextStop(i, 1 - d2)) + ", due in " + due + " minute" + (due === 1 ? "" : "s") + ".",
"The next " + UG_RAIL_NAMES[d2] + " train is for " + ugName(wrong) + ", due in " + due + " minute" + (due === 1 ? "" : "s") + "."];
why = "Look at the board: what is coming next?";
}
return { right: right, opts: ugjShuffle(opts, Math.floor(t)), why: why };
},
function (k) {
var M = UGJ.master;
if (!M || !M.q)
return;
var said = M.q.opts[k];
if (said !== M.q.right) {
ugjSay("Not quite — check the board and the platform before you speak.");
M.q = null;
M.nextAt = 6;
return;
}
ugjRpc("ug_announce", { p_station: ugKeyOf(M.i), p_body: said });
UG2.ann = (UG2.ann || []).concat([{ id: "me" + Date.now(), station: ugKeyOf(M.i), body: said, age: 0 }]);
M.good++;
M.q = null;
M.nextAt = 18;
if (M.good >= 3) {
M.good = 0;
var go = M.started;
M.started = false;
(go ? ugjDone("master", ugName(M.i)) : Promise.resolve({ ok: false, say: "" })).then(function (o) {
if (o && o.ok)
ugjSay("Three announcements well made. That counts toward your work.");
ugjStart("master").then(function (r) { if (UGJ.master)
UGJ.master.started = !!(r && r.ok); });
});
}
},
function () {
if (!ugjJob("signal"))
return ugjSay("Clock in as an Underground signal operator first.");
var el = ugbEl();
el = document.getElementById("ugs");
if (!UGJ.box) {
UGJ.box = { req: null, handled: 0, nextAt: 2, started: false };
ugjStart("signal").then(function (o) { if (UGJ.box)
UGJ.box.started = !!(o && o.ok); });
}
if (document.exitPointerLock)
document.exitPointerLock();
el.style.display = "block";
el.dataset.h = "";
ugjBoxPaint();
},
function () {
var el = document.getElementById("ugs"), B = UGJ.box;
if (!el || !B || el.style.display === "none")
return;
var t = ugNow(), L = ugLine().list;
var h = '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px"><b style="font-size:15px;color:#E8C27A">The signal box · Ring Line</b>' +
'<span><button class="btn" id="ugs-x">Close</button> <button class="btn" id="ugs-end">Leave the box</button></span></div>';
if (B.req) {
var rq = B.req, held = ugHeld(rq.i, rq.d);
h += '<div style="border:1px solid #E8C27A;border-radius:3px;padding:6px 8px;margin-bottom:6px">' + esc(rq.text) + '<br><span class="dim">' +
(rq.heldAt ? (t - rq.heldAt < rq.secs ? "Held " + Math.floor(t - rq.heldAt) + " of " + rq.secs + " s" : "Long enough: release it now.") : "Hold the starting signal at " + esc(ugName(rq.i)) + ", " + UG_RAIL_NAMES[rq.d] + ".") + '</span></div>';
}
else
h += '<div class="dim" style="margin-bottom:6px">The line is running to time. Requests come in from the platforms here. ' + B.handled + ' of 3 handled.</div>';
h += '<div class="row dim"><span style="flex:1">Station</span><span style="width:120px;text-align:center">Outer Rail</span><span style="width:120px;text-align:center">Inner Rail</span></div>';
L.forEach(function (s, i) {
h += '<div class="row"><span style="flex:1">' + esc(s.name) + '</span>' + [0, 1].map(function (d) {
var n = ugTrainNear(i, d, t), here = n && Math.abs(n.x) < 6, held = ugHeld(i, d);
return '<span style="width:120px;text-align:center">' + (here ? '<span class="tr">● </span>' : '<span class="dim">○ </span>') +
'<button class="btn" data-i="' + i + '" data-d="' + d + '" style="font-size:12px">' + (held ? '<span class="on">HELD</span>' : 'clear') + '</button></span>';
}).join("") + '</div>';
});
h += '<div class="dim" style="margin-top:6px">● a train at the platform. A held signal stays at danger for drivers until you clear it (three minutes at most).</div>';
if (el.dataset.h === h)
return;
el.dataset.h = h;
el.innerHTML = h;
document.getElementById("ugs-x").onclick = function () { ugjBoxClose(false); };
document.getElementById("ugs-end").onclick = function () { ugjBoxClose(true); ugjSay("You leave the signal box. The signals go back to working themselves."); };
Array.prototype.forEach.call(el.querySelectorAll("[data-i]"), function (b) { b.onclick = function () { ugjBoxToggle(+b.getAttribute("data-i"), +b.getAttribute("data-d")); }; });
},
function (i, d) {
var B = UGJ.box;
if (!B)
return;
var hold = !ugHeld(i, d), key = ugKeyOf(i) + "|" + d, t = ugNow();
if (hold)
UG2.holds[key] = true;
else
delete UG2.holds[key];
ugjRpc("ug_set_signal", { p_station: ugKeyOf(i), p_d: d, p_hold: hold });
ugjWorking();
var rq = B.req;
if (rq && rq.i === i && rq.d === d) {
if (hold && !rq.heldAt)
rq.heldAt = t;
else if (!hold && rq.heldAt) {
if (t - rq.heldAt < rq.secs) {
ugjSay("Released too soon — the train behind was not clear. Hold it again.");
rq.heldAt = 0;
}
else {
B.handled++;
B.req = null;
B.nextAt = 10;
ugjSay("Released. The " + UG_RAIL_NAMES[d] + " runs on at an even interval.");
if (B.handled >= 3) {
B.handled = 0;
var go = B.started;
B.started = false;
(go ? ugjDone("signal", "the Ring Line") : Promise.resolve({ ok: false })).then(function (o) {
if (o && o.ok)
ugjSay("Three requests handled. That counts toward your work.");
ugjStart("signal").then(function (r) { if (UGJ.box)
UGJ.box.started = !!(r && r.ok); });
});
}
}
}
}
ugjBoxPaint();
},
function (d) {
if (!ugjJob("walker"))
return ugjSay("Clock in as a track walker first.");
if (!UGJ.test && typeof cityHourNow === "function") {
var h = cityHourNow();
if (h >= 5.5 && h < 23.5)
return ugjSay("The tunnels are walked at night, when the line is quiet. Come back after half past eleven.");
}
var i = UG2.at, dir = d === 0 ? 1 : -1, sd = dir, base = UG2.cx, L = UG_SEGLEN;
var W = { d: d, i: i, nxt: ugNextStop(i, d), base: base, spots: [], k: 0, insp: null, started: false, meshes: new THREE.Group(), done: false };
[0.15, 0.3, 0.5, 0.7, 0.85].forEach(function (f, n) {
var s = L * f, x = base + dir * s, z = UG2.cz + sd * UG_TRACKZ;
var mark = new THREE.Mesh(new THREE.PlaneGeometry(0.8, 0.8), new THREE.MeshBasicMaterial({ map: ugTex("X", null, 64, 64, "#2A2B30", "#F4F0E6") }));
mark.position.set(x, 1.2, z + sd * 2.9);
mark.rotation.y = sd > 0 ? Math.PI : 0;
W.meshes.add(mark);
var lamp = new THREE.Mesh(new THREE.SphereGeometry(0.14, 8, 6), new THREE.MeshBasicMaterial({ color: 0xFF8A2A }));
lamp.position.set(x, -0.8, z + sd * 1.1);
W.meshes.add(lamp);
W.spots.push({ s: s, x: x, z: z, done: false, lamp: lamp, find: UGJ_FINDS[(n + i * 3) % UGJ_FINDS.length] });
});
scene.add(W.meshes);
UGJ.walk = W;
ugjStart("walker").then(function (o) { if (UGJ.walk === W)
W.started = !!(o && o.ok); });
ugjSay("<b>The " + UG_RAIL_NAMES[d] + " tunnel to " + esc(ugName(W.nxt)) + " is yours for the night.</b> Step down onto the track at the end of the platform and walk it: five marked places to inspect.");
},
function () {
var W = UGJ.walk;
if (!W)
return;
camera.position.z = UG2.cz + (W.d === 0 ? 1 : -1) * (UG_PLAT - 1);
camera.position.x = Math.max(UG2.cx - 44, Math.min(UG2.cx + 44, camera.position.x));
var go = W.started, words = "Section walked, " + ugName(W.i) + " to " + ugName(W.nxt) + ": " + W.spots.map(function (s) { return s.find; }).join(" ");
ugjWalkEnd(true, null);
(go ? ugjDone("walker", ugName(W.i) + " to " + ugName(W.nxt)) : Promise.resolve({ ok: false })).then(function (o) { ugjSay(esc(words) + (o && o.ok ? " That counts toward your work." : (o && o.say ? " " + esc(o.say) : ""))); });
},
function (x, z) {
var W = UGJ.walk;
if (!W)
return null;
var dir = W.d === 0 ? 1 : -1, sd = dir, sw = dir * (x - W.base), lz = z - UG2.cz;
if (sw < -50 || sw > UG_SEGLEN + 50)
return null;
if (Math.abs(lz - sd * UG_TRACKZ) < 1.4)
return false;
var lp = dir * (x - UG2.cx);
if (Math.abs(lp) < 46 && sd * lz > 0 && sd * lz < UG_TRACKZ + 1.4)
return false;
return null;
}
];
});
