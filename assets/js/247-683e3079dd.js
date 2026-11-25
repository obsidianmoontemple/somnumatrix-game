/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var PRO = { gAt: 0, cap: 99, capWhy: "", stopT: 0, alt: null, rev: 0, revS: 0, pauseUntil: 0, offAt: {}, warned: 0, poles: null, sol: null,
missing: false, roster: null, rosterAt: 0, local: null, lastS: 0 };
var PRO_POINTS = { speeding: 3, red_light: 3, wrong_side: 3, pavement: 3, collision: 3, pedestrian: 6, pole: 3 };
var PRO_FINE = { red_light: 150, wrong_side: 100, pavement: 120, collision: 200, pedestrian: 300, pole: 200 };
var PRO_WORD = { speeding: "Speeding", red_light: "Failing to stop at a red light", wrong_side: "Driving on the wrong side of the road",
pavement: "Driving on the pavement", collision: "Careless driving: a collision", pedestrian: "Careless driving: striking somebody on foot",
pole: "Careless driving: knocking over street furniture" };
var PRO_CAB_CO = "Somnucor Cabs", PRO_TOWER_CO = "The Somnucor Tower";
function proAiOn() { return typeof TGL !== "undefined" && !!TGL.auto && typeof DRIVE !== "undefined" && DRIVE.on; }
function proAiDriver() { return __ZC(247, 0, this, arguments, new.target); }
function proHitAt(x, z, h, S, back) { return __ZC(247, 1, this, arguments, new.target); }
function proSweep(x, z, h, steer, v, s, S, dist, back) { return __ZC(247, 2, this, arguments, new.target); }
var PRO_WHY = { p: "Slowing: a post close by", w: "Waiting: somebody close to the car", v: "Keeping clear of the car ahead", b: "Easing past the kerb and the wall" };
function proGovern(out) { return __ZC(247, 3, this, arguments, new.target); }
(function () {
if (typeof driveInput !== "function")
return;
var di = driveInput;
driveInput = function () {
var out = di.apply(this, arguments);
if (out && proAiOn() && DRIVE.mode === "road" && TGL.route) {
try {
return proGovern(out);
}
catch (e) {
if (PRO.warned++ < 3 && window.console)
console.warn("[pro-drivers]", e);
}
}
return out;
};
})();
(function () {
if (typeof tglTick !== "function")
return;
var tk = tglTick;
tglTick = function (dt) {
if (proAiOn()) {
var now = performance.now();
if (PRO.pauseUntil > now) {
TGL.chk = null;
return;
}
if (PRO.alt || PRO.rev > now)
TGL.chk = null;
var W = TGL.route && TGL.route[TGL.wi], P = camera.position;
if (PRO.heldNearEnd && W && W.x !== undefined && !W.lift && (W.park || TGL.wi === TGL.route.length - 1) && Math.hypot(W.x - P.x, W.z - P.z) < 14) {
PRO.endT = (PRO.endT || 0) + (dt || 0);
if (PRO.endT > 2.5) {
PRO.endT = 0;
TGL.wi = TGL.route.length;
}
}
else
PRO.endT = 0;
}
return tk.apply(this, arguments);
};
})();
function proKerbSpot(px, pz, dest, arch) { return __ZC(247, 4, this, arguments, new.target); }
(function () {
if (typeof txiCall !== "function")
return;
var tc = txiCall;
txiCall = function (k) {
var r = tc.apply(this, arguments);
try {
if (TXI.state === "coming" && TXI.coming) {
var T = txiTarget(k), P = camera.position, K = proKerbSpot(P.x, P.z, T && T.x !== undefined ? T : null, "taxicab");
if (K) {
TXI.coming.to = { x: K.x, z: K.z };
TXI.coming.from = { x: K.x - K.F.x * 30, z: K.z - K.F.z * 30 };
TXI.coming.rot = K.rot;
txiPlace(TXI.coming.from.x, TXI.coming.from.z, K.rot);
TXI.kerb = K;
setStatus("<b>A cab is on its way.</b> " + esc(TXI.drvName) + ", a licensed cab driver, will draw up at the kerb on " + esc(K.street) +
(K.m > 8 ? ", " + K.m + " m from you" : "") + ". Wait for it there.");
}
else
TXI.kerb = null;
}
}
catch (e) {
if (PRO.warned++ < 3 && window.console)
console.warn("[pro-drivers] kerb", e);
}
return r;
};
})();
(function () {
if (typeof txiTick !== "function")
return;
var tt = txiTick;
txiTick = function (dt) {
var was = TXI.state;
var r = tt.apply(this, arguments);
if (was === "coming" && TXI.state === "waiting" && TXI.kerb && TXI.kerb.m > 8)
setStatus("<b>Your cab is at the kerb</b> on " + esc(TXI.kerb.street) + ", " + TXI.kerb.m + " m away. Walk over and press E beside it (or tap it) to get in.");
return r;
};
})();
(function () {
if (typeof tglCall !== "function")
return;
var tc = tglCall;
tglCall = function () {
var r = tc.apply(this, arguments);
try {
if (TGL.coming && !(typeof TG !== "undefined" && TG.on)) {
var P = camera.position, K = proKerbSpot(P.x, P.z, null, "limousine");
if (K) {
TGL.coming.to = { x: K.x, z: K.z };
TGL.coming.from = { x: K.x - K.F.x * 30, z: K.z - K.F.z * 30 };
TGL.coming.rot = K.rot;
tglPlace(TGL.coming.from.x, TGL.coming.from.z, K.rot, "out");
if (K.m > 8)
setStatus("<b>Your limousine is coming</b> to the kerb on " + esc(K.street) + ", " + K.m + " m from you. " +
esc(typeof chaufActive === "function" ? chaufActive().name : "The chauffeur") + " at the wheel, a licensed chauffeur. Driver fit to drive ✓");
}
}
}
catch (e) { }
return r;
};
})();
function proAfterBump(who, what, mph, taxi) { return __ZC(247, 5, this, arguments, new.target); }
function proLocal() {
if (PRO.local)
return PRO.local;
var L = null;
try {
L = JSON.parse(localStorage.getItem("somnu.npcdrivers") || "null");
}
catch (e) { }
PRO.local = (L && typeof L === "object") ? L : {};
return PRO.local;
}
function proLocalSave() { try {
localStorage.setItem("somnu.npcdrivers", JSON.stringify(PRO.local));
}
catch (e) { } }
function proLocalBook(d, kind, mph, limit, atFault) { return __ZC(247, 6, this, arguments, new.target); }
function proStatusOf(name, employer) { return __ZC(247, 7, this, arguments, new.target); }
function proRosterFetch() { return __ZC(247, 8, this, arguments, new.target); }
function proCabDriverName(seed) { return __ZC(247, 9, this, arguments, new.target); }
(function () {
if (typeof txiEnsure !== "function")
return;
var te = txiEnsure;
txiEnsure = function () {
proRosterFetch();
var h = 0, id = String((typeof myUserId === "function" && myUserId()) || "x") + (Date.now() / 86400000 | 0);
for (var i = 0; i < id.length; i++)
h = (h * 31 + id.charCodeAt(i)) >>> 0;
var nm = proCabDriverName(h % TXI_NAMES.length);
if (TXI.driver && TXI.drvName !== nm && !(TGL.auto && TGL.auto.taxi)) {
if (TXI.driver.parent)
TXI.driver.parent.remove(TXI.driver);
TXI.driver = null;
}
if (!TXI.driver) {
TXI.drvName = nm;
TXI.driver = txiDriverFig(nm);
}
return te.apply(this, arguments);
};
})();
function proOffence(kind, what, mph, limit, atFault, later) { return __ZC(247, 10, this, arguments, new.target); }
(function () {
if (typeof trfOffence === "function") {
var to = trfOffence;
trfOffence = function (kind, what, mph, limit) {
if (typeof TGL !== "undefined" && TGL.auto)
return proOffence(kind, what, mph, limit, !!TGL.auto.taxi && (kind === "collision" || kind === "pedestrian"), kind === "collision" || kind === "pedestrian");
return to.apply(this, arguments);
};
}
if (typeof licenceOffence === "function") {
var lo = licenceOffence;
licenceOffence = function (kind, what) {
if (/without a licence/.test(String(what || "")) && typeof DRIVE !== "undefined" && DRIVE.on && ((DRIVE.test && DRIVE.test.active) || (DRIVE.trip && DRIVE.trip.learner)))
return Promise.resolve(null);
if (typeof TGL !== "undefined" && TGL.auto) {
var t = typeof trfKindOf === "function" ? trfKindOf(String(what || "")) : null, m = /(\d+) mph in a (\d+)/.exec(String(what || ""));
if (t && kind === "driving")
return proOffence(t, what, m ? +m[1] : null, m ? +m[2] : null, false);
return Promise.resolve(null);
}
return lo.apply(this, arguments);
};
}
})();
(function () {
if (typeof chaufCrash === "function") {
var cc = chaufCrash;
chaufCrash = function (what, mph) {
if (typeof TGL === "undefined" || !TGL.auto)
return cc.apply(this, arguments);
if (Date.now() - PRO.crashAt < 6000)
return;
PRO.crashAt = Date.now();
var d = proAiDriver(), kind = /struck/.test(what) ? "pedestrian" : /knocked over/.test(what) ? "pole" : "collision";
var lim = DRIVE && DRIVE.road && DRIVE.road.mph, taxi = !!TGL.auto.taxi;
if (taxi) {
if (typeof CHAUF !== "undefined") {
CHAUF.crashAt = Date.now();
CHAUF.said = null;
}
}
else {
cc.apply(this, arguments);
if (typeof CHAUF !== "undefined")
CHAUF.stopNow = false;
setTimeout(function () { if (typeof chaufAfterCrash === "function")
chaufAfterCrash(); }, 12000);
}
proOffence(kind, d.name + " " + what + " at " + Math.round(mph || 0) + " mph", mph, lim, taxi && (mph >= 4.5 || kind === "pedestrian"), true);
proAfterBump(d.name, what, mph, taxi);
};
}
})();
PRO.crashAt = 0;
(function () {
if (typeof crashLog !== "function")
return;
var cl = crashLog;
crashLog = function (kind, x, z, dir, mph, victim, what, then) {
if (!(typeof TGL !== "undefined" && TGL.auto && TGL.auto.taxi))
return cl.apply(this, arguments);
if (!(typeof signedIn === "function" && signedIn()) || PRO.missing || !ATLC) {
if (then)
then(null);
return;
}
var d = proAiDriver(), lim = DRIVE && DRIVE.road && DRIVE.road.mph ? DRIVE.road.mph : null;
cityRpc("npc_crash_log", { p_kind: kind, p_x: x - ATLC.x, p_z: z - ATLC.z, p_dir: dir, p_mph: Math.round((mph || 0) * 10) / 10, p_limit: lim, p_victim: victim || null,
p_what: String(what || "").slice(0, 60), p_name: d.name, p_employer: d.employer }).then(function (o) {
if (o && o.id && typeof CRASH !== "undefined")
CRASH.myEv[o.id] = 1;
if (then)
then(o);
}).catch(function (e) { if (typeof rpcMissing === "function" && rpcMissing(e))
PRO.missing = true; if (then)
then(null); });
};
})();
(function () {
if (typeof vehicleTakeWheel !== "function")
return;
var vt = vehicleTakeWheel;
vehicleTakeWheel = function (o) {
var r = vt.apply(this, arguments);
try {
var O = typeof licOffice === "function" ? licOffice() : null;
if (r && o && (o.learner || (O && ((O.car && o.id === O.car.id) || (O.broom && o.id === O.broom.id)))) && DRIVE.trip)
DRIVE.trip.learner = true;
}
catch (e) { }
return r;
};
})();
function proCanCarry() {
if (typeof amKeeper === "function" && amKeeper())
return true;
return typeof hasLicence !== "function" || !!hasLicence("driving");
}
var PRO_NO_LIFT = "<b>Only a licensed driver carries passengers.</b> Pass the theory and the practical at the Licensing Office in the Civic Ring, then you can give lifts.";
(function () {
if (typeof PASS_answer === "function") {
var pa = PASS_answer;
PASS_answer = function (id, yes) {
if (yes && !proCanCarry()) {
setStatus(PRO_NO_LIFT);
return pa.call(this, id, false);
}
return pa.apply(this, arguments);
};
}
if (typeof PASS_invite === "function") {
var pi = PASS_invite;
PASS_invite = function () {
if (!proCanCarry()) {
setStatus(PRO_NO_LIFT);
return Promise.resolve(null);
}
return pi.apply(this, arguments);
};
}
})();
var WT = { open: {}, q: "", cache: null, cacheN: -1, css: false, ringSet: false };
var WT_CSS = ".wt-q{width:100%;box-sizing:border-box;background:#15122A;color:#fff;border:1px solid #3A3160;border-radius:10px;padding:8px;font:14px system-ui,sans-serif;margin:6px 0}" +
".wt-l{max-height:min(44vh,360px);overflow:auto;border:1px solid #2A2448;border-radius:10px;padding:2px 4px;margin:2px 0 4px;-webkit-overflow-scrolling:touch}" +
".wt-h{display:flex;justify-content:space-between;align-items:center;gap:8px;padding:9px 6px;cursor:pointer;color:#EDE8F8;font-weight:600;border-bottom:1px solid #1E1A36}" +
".wt-h.l1{padding-left:18px;font-weight:500;color:#D8D0EE}.wt-h.l2{padding-left:30px;font-weight:500;color:#CFC6E6}" +
".wt-h .s{font-weight:400}.wt-p{padding:8px 6px 8px 30px;cursor:pointer;border-bottom:1px solid #17142C;color:#EDE8F8}" +
".wt-p.l0{padding-left:6px}.wt-p.l3{padding-left:42px}.wt-p.on{background:#3A3010;color:#FFE9A0;border-radius:6px}" +
".wt-to{margin:4px 0 2px;color:#EDE8F8}.wt-to b{color:#FFE9A0}";
function wtCss() { if (WT.css || !document.head)
return; WT.css = true; var st = document.createElement("style"); st.textContent = WT_CSS; document.head.appendChild(st); }
function wtName(k) { return String(k).replace(/^the /i, ""); }
function wtRingIdx(k, w) {
var wp = typeof WP_BY_KEY !== "undefined" && WP_BY_KEY[k];
if (wp && wp.ring)
for (var i = 0; i < ATL_RINGS.length; i++)
if (ATL_RINGS[i].k === wp.ring)
return i;
return w && typeof tglRingIdx === "function" ? tglRingIdx(w.x, w.z) : null;
}
function wtGroups() { return __ZC(247, 11, this, arguments, new.target); }
function wtLabel(k, home) { return __ZC(247, 12, this, arguments, new.target); }
function wtListHtml(sel, quick) { return __ZC(247, 13, this, arguments, new.target); }
function wtBlock(sel, quick) {
wtCss();
return "<input class='wt-q' data-wq type='search' placeholder='Find a place or a kind: bakery, bank, temple…' value='" + esc(WT.q || "") + "'>" +
"<div class='wt-l' data-wl>" + wtListHtml(sel, quick) + "</div>";
}
function wtWire(box, getSel, quick, onPick) { return __ZC(247, 14, this, arguments, new.target); }
(function () {
if (typeof txiOpen !== "function")
return;
var to = txiOpen;
txiOpen = function (on) {
var r = to.apply(this, arguments);
try {
if (!on || !TXI.box || TXI.state)
return r;
var s = TXI.box.querySelector("select[data-c='to']");
if (!s)
return r;
var H = typeof homeGuideFind === "function" ? homeGuideFind() : null, home = H && H.spec ? "Home (" + H.name + ")" : null;
if (!TXI.sel || (TXI.sel === "home" && !home))
TXI.sel = home ? "home" : "tower";
var q = TXI.box.querySelector("[data-c='quote']"), call = TXI.box.querySelector("[data-c='call']");
var to2 = document.createElement("div");
to2.className = "wt-to";
s.parentNode.insertBefore(to2, s);
var quick = (home ? [{ k: "home", name: home, icon: "🏠" }] : []).concat([{ k: "tower", name: "The Somnucor Tower", icon: "🏛" }]);
var blk = document.createElement("div");
blk.innerHTML = wtBlock(TXI.sel, quick);
s.parentNode.removeChild(s);
if (call && call.parentNode)
call.parentNode.insertBefore(blk, call.nextSibling);
var quote = function () {
to2.innerHTML = "To: <b>" + esc(wtLabel(TXI.sel, home)) + "</b>";
var T = txiTarget(TXI.sel);
if (!q)
return;
if (!T) {
q.textContent = "That place is not in the city yet.";
return;
}
var P = camera.position, m = txiMetres(P.x, P.z, txiRouteFrom(P.x, P.z, T)), f = txiFare(m);
q.textContent = "About " + (m < 1000 ? Math.round(m / 10) * 10 + " m" : (m / 1000).toFixed(1) + " km") + " by road · " + (f ? "fare about " + f + " gold" : "free");
};
quote();
wtWire(TXI.box, function () { return TXI.sel; }, quick, function (k) { TXI.sel = k; quote(); });
if (call)
call.onclick = function (ev) { ev.stopPropagation(); txiCall(TXI.sel); };
}
catch (e) {
if (PRO.warned++ < 3 && window.console)
console.warn("[pro-drivers] where to", e);
}
return r;
};
})();
(function () {
if (typeof tglOpen !== "function")
return;
var to = tglOpen;
tglOpen = function (on) {
var r = to.apply(this, arguments);
try {
if (!on || !TGL.box)
return r;
var s = TGL.box.querySelector("select[data-t='to']");
if (!s)
return r;
if (!TGL.sel)
TGL.sel = "tower";
var to2 = document.createElement("div");
to2.className = "wt-to";
s.parentNode.insertBefore(to2, s);
var go = TGL.box.querySelector("[data-t='go']");
var quick = [{ k: "tower", name: "The Somnucor Tower", icon: "🏛" }, { k: "garage", name: "The Tower Garage", icon: "🅿" }];
var blk = document.createElement("div");
blk.innerHTML = wtBlock(TGL.sel, quick);
s.parentNode.removeChild(s);
if (go && go.parentNode)
go.parentNode.insertBefore(blk, go.nextSibling);
var say = function () { to2.innerHTML = "To: <b>" + esc(wtLabel(TGL.sel, null)) + "</b>"; };
say();
wtWire(TGL.box, function () { return TGL.sel; }, quick, function (k) { TGL.sel = k; say(); });
if (go)
go.onclick = function (ev) { ev.stopPropagation(); tglGo(TGL.sel); };
}
catch (e) {
if (PRO.warned++ < 3 && window.console)
console.warn("[pro-drivers] limo where to", e);
}
return r;
};
})();
