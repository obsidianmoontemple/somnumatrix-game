/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var OW = { k: null, G: null, nodes: [], picked: {}, crew: [], spots: [], doors: [], halls: [], rooms: [], busy: false, hud: null, chal: null, best: {}, sky: [], fx: [], near: null, built: {} };
var OW_JOB0 = 3700, OW_JOB1 = 3799;
function owSigned() { return typeof signedIn === "function" && signedIn(); }
function owKeeper() { return typeof amKeeper === "function" && amKeeper(); }
function owRpc(name, args) { return typeof cityRpc === "function" ? cityRpc(name, args || {}) : Promise.reject(new Error("offline")); }
function owSoft(e) { var m = String((e && e.message) || e || ""); return /function|404|PGRST|does not exist|schema cache/i.test(m) ? "This opens soon." : esc(m); }
function owBtn(name, label, sub) { return worldBtn(name, label, sub); }
function owTitle(t, col) { return "<div style='font:600 17px var(--serif,Georgia);color:" + (col || "#FFE7B0") + "'>" + t + "</div>"; }
function owHave(k) { var r = (typeof myStock !== "undefined" ? myStock : []).filter(function (s) { return s.kind === k; })[0]; return r ? (+r.amount || 0) : 0; }
function owGoodName(k) { var g = OW_GOOD[k]; if (g)
return g.n; if (typeof FG_MB !== "undefined" && FG_MB[k])
return FG_MB[k].name; return k; }
function owGoodIcon(k) { var g = OW_GOOD[k]; if (g)
return g.e; if (typeof FG_MB !== "undefined" && FG_MB[k])
return FG_MB[k].icon; return "📦"; }
function owLite() { return typeof LITE !== "undefined" && !!LITE; }
function owHere() {
if (typeof WLD === "undefined" || !WLD.on)
return null;
if (WLD.on === "surface" && typeof SF !== "undefined" && OW_PLACES[SF.k])
return SF.k;
if (WLD.on === "station" && typeof STN !== "undefined" && STN.k === "ares")
return "ares";
return null;
}
function owBadge() {
if (owKeeper())
return true;
var jobs = (typeof WORK !== "undefined" && WORK.data && WORK.data.jobs) || [];
return jobs.some(function (j) { var id = +j.job_id; return id >= OW_JOB0 && id <= OW_JOB1 || id >= 1700 && id <= 1710; });
}
function owJobOf(id) { for (var i = 0; i < OW_JOBS.length; i++)
if (OW_JOBS[i][0] === +id)
return OW_JOBS[i]; return null; }
function owPickedLoad() { try {
var o = JSON.parse(localStorage.getItem("ow_picked") || "{}"), now = Date.now();
Object.keys(o).forEach(function (k) { if (o[k] > now)
OW.picked[k] = o[k]; });
}
catch (e) { } }
function owPickedSave() { try {
localStorage.setItem("ow_picked", JSON.stringify(OW.picked));
}
catch (e) { } }
owPickedLoad();
function owBestGet(k) { try {
var o = JSON.parse(localStorage.getItem("ow_best") || "{}");
return o[k];
}
catch (e) {
return null;
} }
function owBestSet(k, v) { try {
var o = JSON.parse(localStorage.getItem("ow_best") || "{}");
o[k] = v;
localStorage.setItem("ow_best", JSON.stringify(o));
}
catch (e) { } }
function owHud(html) { return __ZC(324, 0, this, arguments, new.target); }
function owBar(v, col) { v = Math.max(0, Math.min(100, v)); return "<span style='display:inline-block;vertical-align:middle;width:120px;height:9px;border-radius:5px;background:rgba(255,255,255,.15);overflow:hidden'><span style='display:block;height:100%;width:" + v.toFixed(0) + "%;background:" + col + "'></span></span>"; }
function owArrow(L, x, z, label) { return __ZC(324, 1, this, arguments, new.target); }
var OW_WALL_H = 3.6;
function owMats() { return __ZC(324, 2, this, arguments, new.target); }
function owPiece(S, a, x, y, z, rot, s, solids, label) { return __ZC(324, 3, this, arguments, new.target); }
function owFurnish(S, R, y, solids, place) { return __ZC(324, 4, this, arguments, new.target); }
function owPoster(id, place) { return __ZC(324, 5, this, arguments, new.target); }
function owHall(S, L, H, solids, place) { return __ZC(324, 6, this, arguments, new.target); }
function owGround(x, z, h) {
for (var i = 0; i < OW.halls.length; i++) {
var A = OW.halls[i];
if (x > A.x0 - 0.3 && x < A.x1 + 0.3 && z > A.z0 - 0.3 && z < A.z1 + 0.3)
return A.y;
var d = Math.hypot(x - A.dx, z - A.dz);
if (d < 4) {
var t = d / 4;
return Math.max(h, A.y * (1 - t) + h * t);
}
}
return h;
}
function owRoomAt(x, z) { for (var i = 0; i < OW.rooms.length; i++) {
var r = OW.rooms[i];
if (x > r.x0 && x < r.x1 && z > r.z0 && z < r.z1)
return r;
} return null; }
function owInHall(x, z) { for (var i = 0; i < OW.halls.length; i++) {
var A = OW.halls[i];
if (x > A.x0 && x < A.x1 && z > A.z0 && z < A.z1)
return true;
} return false; }
function owNodeLook(S, look, x, y, z, R) { return __ZC(324, 7, this, arguments, new.target); }
function owNodesBuild(G, place, P, ground, solids) { return __ZC(324, 8, this, arguments, new.target); }
function owCrewAdd(L, c, place, ground) { return __ZC(324, 9, this, arguments, new.target); }
var OW_CLOUD_NAMES = { jupiter: ["Ines Carvalho", "Dmitri Volkov"], saturn: ["Abena Owusu", "Henrik Dahl"], uranus: ["Mei-Ling Zhou", "Patrick Doyle"], neptune: ["Sofia Reyes", "Arjun Mehta"] };
function owReset(k) {
OW.k = k;
OW.nodes = [];
OW.crew = [];
OW.rooms = [];
OW.halls = [];
OW.doors = [];
OW.spots = [];
OW.fx = [];
OW.chalG = null;
OW.song = null;
OW.drop = null;
if (OW.chal)
owChalStop(true);
}
function owSpot(x, z, r, label, fn, opt) { var s = { x: x, z: z, r: r, label: label, fn: fn }; if (opt)
Object.keys(opt).forEach(function (k) { s[k] = opt[k]; }); OW.spots.push(s); return s; }
function owLessonSpots(k) {
var P = OW_PLACES[k];
OW_LESSONS.forEach(function (l) {
if (l.w !== k)
return;
var s = P.spots && P.spots[l.at];
if (!s)
return;
owSpot(s[0], s[1], s[2], "🎓 <b>" + esc(l.title) + "</b> · a World Learning lesson", function () { owLessonCard(l); }, { lesson: l.k });
});
}
function owPad(S, k, ground) { return __ZC(324, 10, this, arguments, new.target); }
function owChalBoard(S, k, x, z, ground, rot) { return __ZC(324, 11, this, arguments, new.target); }
function owTent(S, x, z, y) { return __ZC(324, 12, this, arguments, new.target); }
function owCoolPost(S, x, z, y) {
wBox(1.2, 2, 1.2, wM(0xD8DCE2), x, y + 1, z, S);
wBox(1.0, 0.4, 0.06, wB(0x6AC8FF, { fog: false }), x, y + 1.5, z + 0.62, S);
var sg = wSign(["COOLING POST", "press E to top up"], 1.6, 0.6, "#0E1A2E", "#8FD8FF");
sg.position.set(x, y + 2.5, z + 0.62);
S.add(sg);
SF.solids.push({ x: x, z: z, hw: 0.6, hd: 0.6 });
}
function owBuildSurface(k) { return __ZC(324, 13, this, arguments, new.target); }
function owCloudBuild(S, L, k) { return __ZC(324, 14, this, arguments, new.target); }
var OW_SONG_COL = [0xFF9AD8, 0xC8A0FF, 0x8FD8FF, 0x9AF0C8, 0xFFE89A], OW_SONG_NOTE = [523.25, 587.33, 659.25, 783.99, 880];
function owVeyarBuild(S, L, ground) { return __ZC(324, 15, this, arguments, new.target); }
(function () {
if (typeof sfBuild !== "function")
return;
var fb = sfBuild;
sfBuild = function (k) {
var r = fb.apply(this, arguments);
try {
if (OW_PLACES[k] && !OW_PLACES[k].station)
owBuildSurface(k);
else
owReset(null);
}
catch (e) {
if (window.console)
console.warn("[outer worlds]", k, e);
}
return r;
};
if (typeof worldLetGo === "function") {
var lg0 = worldLetGo;
worldLetGo = function (key) { var r = lg0.apply(this, arguments); if (r && key === "surface") {
try {
owReset(null);
OW.G = null;
}
catch (e) { }
} return r; };
}
var SFW = WORLDS.surface;
if (SFW && typeof SFW.env === "function") {
var e0 = SFW.env;
SFW.env = function (dt) {
var E = e0.apply(this, arguments);
try {
if (OW.halls.length && OW_PLACES[SF.k]) {
var L = worldLocal();
if (owInHall(L.x, L.z)) {
E = Object.assign({}, E);
E.sun = (E.sun || 0) * 0.12;
E.hemi = 0.72;
E.hemiCol = 0xE6EAF2;
E.hemiGround = 0x4A505A;
}
}
}
catch (e) { }
return E;
};
}
if (SFW) {
var g0 = SFW.ground;
SFW.ground = function (x, z, feet) { var h = g0.apply(this, arguments); return OW.halls.length && OW_PLACES[SF.k] ? owGround(x, z, h) : h; };
}
if (typeof sfTick === "function") {
var ft = sfTick;
sfTick = function (dt) { var r = ft.apply(this, arguments); try {
if (OW.k && OW.k === SF.k)
owTick(dt);
}
catch (e) {
if (window.console)
console.warn("[outer worlds]", e);
} return r; };
}
})();
function owTick(dt) { return __ZC(324, 16, this, arguments, new.target); }
function owNearest(L, now, badge) { return __ZC(324, 17, this, arguments, new.target); }
function owStaffOnly() {
worldCard(owTitle("🔒 Staff only") + "<div style='margin:6px 0'>The crew's bunks and the plant rooms are for the Space Corp's own people. The door reads your badge: work here (the jobs board at the Spaceport, or ask the crew) and it opens for you.</div>", {});
}
function owNodePrompt(n, now) { return __ZC(324, 18, this, arguments, new.target); }
function owCrewCard(w) { return __ZC(324, 19, this, arguments, new.target); }
function owJobsCard(place) { return __ZC(324, 20, this, arguments, new.target); }
function owGather(n) { return __ZC(324, 21, this, arguments, new.target); }
function owGoodCard(k) { return __ZC(324, 22, this, arguments, new.target); }
function owOuterStock() { return (typeof myStock !== "undefined" ? myStock : []).filter(function (s) { return (+s.amount || 0) > 0 && (OW_GOOD[s.kind] || /^cr_(crystal|parts|glass|cloth|ore)$/.test(s.kind)); }); }
function owTradeCard(place, msg, tab) { return __ZC(324, 23, this, arguments, new.target); }
function owBuy(k, n, after) { return __ZC(324, 24, this, arguments, new.target); }
function owEat(k, after) { return __ZC(324, 25, this, arguments, new.target); }
function owSell(k, n, after) { return __ZC(324, 26, this, arguments, new.target); }
function owRefine(rk, after) { return __ZC(324, 27, this, arguments, new.target); }
function owSwapRows(who, fns, back) { return __ZC(324, 28, this, arguments, new.target); }
function owSwap(s, back) { return __ZC(324, 29, this, arguments, new.target); }
function owGiftCard(msg) { return __ZC(324, 30, this, arguments, new.target); }
(function () {
if (typeof bkpHtml !== "function")
return;
var bh = bkpHtml;
bkpHtml = function () {
var D = (typeof BKP !== "undefined" && BKP.d) || {}, all = D.stock, mine = [];
if (Array.isArray(all)) {
mine = all.filter(function (s) { return (+s.amount || 0) > 0 && /^ow_/.test(s.kind) && OW_GOOD[s.kind]; });
D.stock = all.filter(function (s) { return !(/^ow_/.test(s.kind) && OW_GOOD[s.kind]); });
}
var h;
try {
h = bh.apply(this, arguments);
}
finally {
if (Array.isArray(all))
D.stock = all;
}
var n = owlCount();
if (n && owSigned())
h += n >= OW_LESSONS.length ? bkpRow("🚀 Certificate: <b>Outer Worlds Explorer</b>", bkpDim("the Department of Education")) : bkpRow("🚀 World Learning: The Outer Worlds", bkpDim(n + " of " + OW_LESSONS.length + " stamps"));
if (!mine.length)
return h;
var x = bkpHead("🚀 From the outer worlds") + "<div style='color:var(--dim);font-size:12px'>Gathered, bought or traded out past the Moon. Sell it anywhere stock is sold, refine it at a station's trade post or the Ares Gateway's fab shop, or eat it.</div>";
mine.forEach(function (s) {
var g = OW_GOOD[s.kind], b = "";
if (g.fd || g.dr)
b += ' <button class="btn" data-owb="eat:' + esc(s.kind) + '">' + (g.fd ? "Eat" : "Drink") + '</button>';
b += ' <button class="btn" data-owb="sell:' + esc(s.kind) + '">Sell one (' + (+s.buys || g.b) + ')</button>';
b += ' <button class="btn" data-owb="about:' + esc(s.kind) + '">About</button>';
x += bkpRow(g.e + " " + esc(g.n) + " " + bkpDim("× " + s.amount), b);
});
return h + x;
};
addEventListener("click", function (e) {
var b = e.target && e.target.closest ? e.target.closest("[data-owb]") : null;
if (!b)
return;
e.stopPropagation();
var v = b.getAttribute("data-owb").split(":"), k = v[1];
var again = function () { if (typeof bkpLoad === "function")
bkpLoad(); };
if (v[0] === "eat")
owEat(k, again);
else if (v[0] === "sell")
owSell(k, 1, function (m) { setStatus(m); again(); });
else if (v[0] === "about")
owGoodCard(k);
});
})();
var OWL = { cur: null, ans: {}, t0: 0, msg: "", guide: null };
function owlLog() { var st = (typeof eduStore === "function") ? eduStore() : {}; return st["world-outer"] || (st["world-outer"] = {}); }
function owlDone(n) { return !!owlLog()[n]; }
function owlCount() { return OW_LESSONS.filter(function (l) { return owlDone(l.n); }).length; }
function owlOpt(l, k) { var q = l.quiz[k], o = [q[1], q[2], q[3]], r = (l.n * 5 + k * 2) % 3; return [o[r], o[(r + 1) % 3], o[(r + 2) % 3]]; }
function owlSeen(l) { return l.w !== "veyar" || (typeof spKnowsGate === "function" && spKnowsGate()); }
function owlWhere(l) { var P = OW_PLACES[l.w], s = P && P.spots && P.spots[l.at]; return (s && s[3] ? s[3] + ", " : "") + (P ? (P.cloud ? P.post : P.name) : l.w); }
function owLessonCard(l) { return __ZC(324, 31, this, arguments, new.target); }
function owlCheck(l) { return __ZC(324, 32, this, arguments, new.target); }
function owCourseCard(place) { return __ZC(324, 33, this, arguments, new.target); }
function owlArrow(L) {
if (!OWL.guide)
return "";
var l = OW_LESSON[OWL.guide], P = l && OW_PLACES[l.w], s = P && P.spots && P.spots[l.at];
if (!s || owHere() !== l.w)
return "";
if (Math.hypot(s[0] - L.x, s[1] - L.z) < 3)
return "";
return "<div style='color:#BFD8FF'>" + owArrow(L, s[0], s[1], l.title) + "</div>";
}
(function () {
if (typeof eduReportHtml === "function") {
var er = eduReportHtml;
eduReportHtml = function () { var h = er.apply(this, arguments); return h + '<div style="margin-top:6px">World Learning: The Outer Worlds, out past the Moon, ' + owlCount() + ' of ' + OW_LESSONS.length + ' lessons learned.' + (owlCount() >= OW_LESSONS.length ? ' <b style="color:#2A4A8A">Outer Worlds Explorer.</b>' : '') + '</div>'; };
}
if (typeof eduWorldCard === "function") {
var ew = eduWorldCard;
eduWorldCard = function () {
ew.apply(this, arguments);
try {
if (!EDU.lesson)
return;
var box = '<div style="border:1px solid #C8CCD2;border-radius:6px;padding:10px;margin:8px 0"><b>The Outer Worlds</b> · Mercury to Pluto<br>Board the Grand Tour Line at the Space Corp Spaceport. Lessons on Mercury\'s heat, its polar ice, Venus\'s greenhouse, machines that survive it, Pluto\'s glaciers and its story, Jupiter\'s storm and the Juno probe, Saturn\'s rings and moons, Uranus\'s tilt, the ice giants, Neptune\'s discovery and winds, and landing on Mars, each taught where it happens, with two questions for a stamp.<br><span style="color:#2A4A8A">You have learned ' + owlCount() + ' of ' + OW_LESSONS.length + '.</span></div>';
var i = EDU.lesson.html.indexOf('<div style="border:1px solid #C8CCD2;border-radius:6px;padding:10px;margin:8px 0"><b>Already teaching');
EDU.lesson.html = i >= 0 ? EDU.lesson.html.slice(0, i) + box + EDU.lesson.html.slice(i) : EDU.lesson.html + box;
if (typeof eduLessonPaintHtml === "function")
eduLessonPaintHtml();
}
catch (e) { }
};
}
})();
var OW_CHAL_TIMED = { heat: 1, cool: 1, run: 1 };
function owChalSpec(place) { return __ZC(324, 34, this, arguments, new.target); }
function owChalCard(place, msg) { return __ZC(324, 35, this, arguments, new.target); }
function owSecs(s) { s = Math.round(s); return Math.floor(s / 60) + ":" + (s % 60 < 10 ? "0" : "") + (s % 60); }
function owChalTop(place, C) { return __ZC(324, 36, this, arguments, new.target); }
function owBeacon(x, z, y, col) { return __ZC(324, 37, this, arguments, new.target); }
function owChalStart(place) { return __ZC(324, 38, this, arguments, new.target); }
function owAt(x, z) { return SF.cfg && !SF.cfg.cloud && WLD.on === "surface" ? sfHeight(x, z) : 0; }
function owChalStop(quiet) {
var X = OW.chal;
if (!X)
return;
if (X.b && X.b.parent)
X.b.parent.remove(X.b);
(X.objs || []).forEach(function (o) { if (o.parent)
o.parent.remove(o); });
OW.chal = null;
owHud(null);
if (!quiet)
worldPrompt(null);
}
function owChalFail(why) { var X = OW.chal; if (!X)
return; var place = X.place; owChalStop(); setStatus("<b>" + esc(X.C.name) + ":</b> " + why); owChalCard(place, why + " Try again?"); }
function owChalDone(score) { return __ZC(324, 39, this, arguments, new.target); }
function owChalTick(dt, L) { return __ZC(324, 40, this, arguments, new.target); }
function owSongStart(X) { X.seq = []; X.round = 0; X.pos = 0; owSongNext(X); }
function owSongNext(X) {
X.round++;
X.seq = [];
var R = wRand(Date.now() % 100000 + X.round);
for (var i = 0; i < X.round + 2; i++)
X.seq.push(Math.floor(R() * 5));
X.pos = 0;
X.play = 0;
X.playing = true;
X.playT = 0.8;
owSongCard(X, "Listen…");
}
function owSongHit(i) {
var S = OW.song;
if (!S)
return;
S.glows[i].material.opacity = 0.75;
S.crystals[i].emissiveIntensity = 0.9;
S.lit = S.lit || [];
S.lit[i] = 0.7;
if (typeof playTone === "function")
playTone(OW_SONG_NOTE[i], 0.5);
}
function owSongTick(dt) { return __ZC(324, 41, this, arguments, new.target); }
function owSongHud(X) { if (!(WLD.card && WLD.card.style.display === "block"))
worldPrompt("<b>The Crystal Song</b> · <b>press E</b> to sing", function () { owSongCard(X, X.playing ? "Listen…" : "Your turn."); }); owHud("<b>The Crystal Song</b> · round " + X.round + (X.playing ? " · listen…" : " · your turn: " + X.pos + " of " + X.seq.length)); }
function owSongCard(X, msg) { return __ZC(324, 42, this, arguments, new.target); }
function owSongPress(i) { return __ZC(324, 43, this, arguments, new.target); }
function owDropStart(X) { return __ZC(324, 44, this, arguments, new.target); }
function owDropTick(X, dt, L) { return __ZC(324, 45, this, arguments, new.target); }
function owDropRelease() { var X = OW.chal; if (!X || X.kind !== "drop" || X.phase !== "aim")
return; X.phase = "fall"; X.ft = 0; X.px = 0; if (typeof playTone === "function")
playTone(300, 0.3); }
var OW_EDL = [
{ at: "chute", say: "Deploy the parachute", best: 11000, lo: 13500, hi: 8500, unit: "m", tip: "at about 11 km, when the capsule has slowed to about 1,500 km/h" },
{ at: "shield", say: "Drop the heat shield", best: 9000, lo: 10200, hi: 7000, unit: "m", tip: "about 20 seconds after the parachute opens, near 9 km" },
{ at: "backshell", say: "Cut loose from the backshell", best: 2100, lo: 3000, hi: 1200, unit: "m", tip: "at about 2.1 km: the descent stage flies free on its rockets" },
{ at: "crane", say: "Start the sky crane", best: 20, lo: 60, hi: 6, unit: "m", tip: "about 20 m up: the rover is lowered on cables" }
];
function owEdlAlt(t) { return __ZC(324, 46, this, arguments, new.target); }
function owEdlSpeed(t) { if (t < 14)
return 20000 - t * 200; if (t < 30)
return 17200 - (t - 14) * 980; if (t < 44)
return 1500 - (t - 30) * 80; if (t < 54)
return 380 - (t - 44) * 10; var u = Math.min(1, (t - 54) / 12); return Math.max(2, 280 * (1 - u)); }
function owEdlStart(X) { X.step = 0; X.pts = []; X.t = 0; setStatus("<b>The Descent Simulator.</b> Strapped in. Entry at 125 km, 20,000 km/h. Watch the height."); }
function owEdlTick(X, dt) { return __ZC(324, 47, this, arguments, new.target); }
function owEdlAct() { return __ZC(324, 48, this, arguments, new.target); }
var OWA = { g: null, solids: [], crew: [], nodes: [], spots: [], moons: [] };
var OW_ARES_CREW = [
{ id: "chief", name: "Commander Nadia Petrova", title: "Ares Gateway commander", x: 3.4, z: -16, rot: -Math.PI / 2, room: 1, greet: "Welcome to the Ares Gateway. Below us is the whole red planet: pick a landing site on the table and I'll tell you about it.", who: "the commander of the Ares Gateway, the Space Corp's station over Mars, calm and proud of her crew" },
{ id: "clerk", name: "Tomás Herrera", title: "Ares ore broker", x: 8, z: -4.3, rot: 0, room: 1, greet: "Phobos regolith, fresh off the barge. Three of it smelts to good iron ore in the fab shop.", who: "the ore broker at the Ares Gateway's ore desk, who buys and sells for the city" },
{ id: "fab", name: "Grace Adeyemi", title: "Fab shop engineer", x: 22, z: -3.1, rot: 0, room: 1, greet: "Bring me parts, crystal, glass or cloth and I'll fabricate what the forges make, here in orbit.", who: "the fab shop engineer at the Ares Gateway, who makes tools, armour and machines from materials" },
{ id: "sim", name: "Captain Leo Brandt", title: "Descent controller", x: -11.4, z: 6.5, rot: Math.PI / 2, room: 1, greet: "Seven minutes from the top of the air to the ground, and nobody on Earth can help: the signal takes too long. Want to try it in the simulator?", who: "a descent controller who brings landers down to Mars and runs the descent simulator" },
{ id: "hydro", name: "Yuki Tanaka", title: "Hydroponics grower", x: -18.4, z: -10, rot: -Math.PI / 2, room: 1, wander: 2.5, greet: "Potatoes and lettuce, in water under lamps. Pick what's ready: the Gateway eats what it grows.", who: "the hydroponics grower who keeps the Ares Gateway fed" }
];
function owAresBuild(G) { return __ZC(324, 49, this, arguments, new.target); }
function owAresOn(on) { return __ZC(324, 50, this, arguments, new.target); }
(function () {
var W = typeof WORLDS !== "undefined" && WORLDS.station;
if (!W)
return;
var en = W.enter;
W.enter = function (opt) {
var r = en.apply(this, arguments);
owAresOn(STN.k === "ares");
if (STN.k === "ares")
setStatus("<b>The Ares Gateway.</b> The Space Corp's station over Mars: the Mars table, the descent simulator, the ore desk, the fab shop and the hydroponics bay, with the red planet filling the great window. Back to return to your shuttle.");
return r;
};
var lv = W.leave;
W.leave = function () { if (OW.k === "ares") {
owChalStop(true);
owHud(null);
} return lv ? lv.apply(this, arguments) : undefined; };
if (typeof stnTick === "function") {
var st = stnTick;
stnTick = function (dt) {
var r = st.apply(this, arguments);
try {
if (OW.k === "ares" && STN.k === "ares") {
owAresTick(dt);
owTick(dt);
}
}
catch (e) {
if (window.console)
console.warn("[outer worlds] ares", e);
}
return r;
};
}
})();
function owAresTick(dt) {
if (OWA.globe)
OWA.globe.rotation.y += dt * 0.08;
var t = (typeof WLD !== "undefined" ? WLD.t : 0);
OWA.moons.forEach(function (o) { var a = t * o.w; o.m.position.set(Math.cos(a) * o.r, 2.5 + Math.sin(a) * 0.12, -16 + Math.sin(a) * o.r); });
}
function owMarsTable() { return __ZC(324, 51, this, arguments, new.target); }
function owFabCard() { return __ZC(324, 52, this, arguments, new.target); }
var OW_TULLIK_SELLS = ["ow_tk_cake", "ow_tk_hum", "ow_tk_map"];
function owTullikCard(msg) { return __ZC(324, 53, this, arguments, new.target); }
function owTullikTalk() { return __ZC(324, 54, this, arguments, new.target); }
function owTullikSell(k, n) { return __ZC(324, 55, this, arguments, new.target); }
(function () {
if (typeof spHail !== "function")
return;
var sh = spHail;
spHail = function (who) { if (who === "tullik") {
owTullikCard();
return;
} return sh.apply(this, arguments); };
})();
function owTullikMoor(S, L) { return __ZC(324, 56, this, arguments, new.target); }
function owTalk(t, place) {
wTalk(t);
try {
(store.characters || []).forEach(function (c) { if (c.wKey === "wtalk:" + t.name) {
c.stfTitle = t.title || "";
c.stfPlace = place || "";
} });
}
catch (e) { }
}
(function () {
if (typeof onSite !== "function")
return;
var os = onSite;
onSite = function (job) {
var id = job && +(job.job_id || job.id || 0);
if (id >= OW_JOB0 && id <= OW_JOB1) {
var J = owJobOf(id), here = owHere();
if (J && (J[2] === here || J[2] === "any" && here || J[2] === "space" && (WLD.on === "space" || here === "saturn")))
return true;
}
return os.apply(this, arguments);
};
})();
(function () {
if (typeof WP_BY_KEY === "undefined" || typeof SPACEPORT_KEY === "undefined")
return;
var wp = WP_BY_KEY[SPACEPORT_KEY];
if (!wp)
return;
OW_JOBS.forEach(function (j) { if (wp.jobs.indexOf(j[0]) < 0)
wp.jobs.push(j[0]); if (typeof WP_BY_JOB !== "undefined")
WP_BY_JOB[j[0]] = wp; });
})();
if (typeof ORB_LINES !== "undefined" && !ORB_LINES.some(function (l) { return l.k === "tour"; }))
ORB_LINES.push({ k: "tour", name: "Grand Tour Line", col: "#8FD8FF", off: 40, express: true, stops: [
{ k: "earth", name: "Earth: the Space Corp Spaceport" },
{ k: "mercury", name: "Mercury: Caloris Station", kind: "surface", host: "mercury", facts: ["Mercury goes round the Sun in 88 days, faster than any other planet.", "From Mercury the Sun looks about three times as wide as from Earth, and its light is about seven times as strong."] },
{ k: "venus", name: "Venus: the Lavinia Control Bunker", kind: "surface", host: "venus", facts: ["Venus is the hottest planet, about 465 °C, though Mercury is closer to the Sun: its thick air traps the heat.", "Venus spins backwards and so slowly that its day is longer than its year."] },
{ k: "jupiter", name: "Jupiter: Cloud Station Galileo", kind: "surface", host: "jupiter", facts: ["Jupiter is so big that more than 1,300 Earths would fit inside it.", "Its Great Red Spot is a storm wider than the whole Earth."] },
{ k: "saturn", name: "Saturn: Cloud Station Cassini", kind: "surface", host: "saturn", facts: ["Saturn's rings are about 280,000 km across, but mostly only about 10 metres thick.", "Saturn is the least dense planet: it would float, if you could find a bath big enough."] },
{ k: "uranus", name: "Uranus: Cloud Station Herschel", kind: "surface", host: "uranus", facts: ["Uranus rolls round the Sun on its side, tipped over by about 98 degrees.", "William Herschel found it in 1781, the first planet found with a telescope."] },
{ k: "neptune", name: "Neptune: Cloud Station Le Verrier", kind: "surface", host: "neptune", facts: ["Neptune was found by mathematics before anyone saw it, in 1846.", "Its winds blow at up to about 2,000 km/h, the fastest in the Solar System."] },
{ k: "pluto", name: "Pluto: Tombaugh Station", kind: "surface", host: "pluto", facts: ["Sunlight takes about five and a half hours to reach Pluto.", "New Horizons flew past Pluto on 14 July 2015 and found its great pale heart, a glacier of frozen nitrogen."] }
] });
(function () {
if (typeof orbDepartures !== "function")
return;
var od = orbDepartures;
orbDepartures = function (here) {
var T = orbLine("tour");
if (!T)
return od.apply(this, arguments);
var cap = null, wc = worldCard;
worldCard = function (h, f) { cap = [h, f]; };
try {
od.apply(this, arguments);
}
finally {
worldCard = wc;
}
if (!cap)
return;
var html = cap[0], fns = cap[1] || {}, i = orbStop(T, here);
var box = document.createElement("div");
box.innerHTML = html;
box.querySelectorAll("[data-w^='b-tour-']").forEach(function (b) { b.remove(); });
html = box.innerHTML;
var t = orbNext(T, orbNow() + 20), extra = "";
if (here === "earth" || i >= 0) {
extra += "<div style='margin:8px 0 2px'><b style='color:" + T.col + "'>" + esc(T.name) + "</b> · express, straight to any stop · departs in " + orbMins(t - orbNow()) + "</div>";
T.stops.forEach(function (s) {
if (s.k === here)
return;
var key = "x-tour-" + s.k;
extra += worldBtn(key, esc(s.name), s.k === "earth" ? "home to Somnucor" : "press to board");
fns[key] = function () { orbBoard("tour", here, s.k); };
});
}
worldCard(html + extra, fns);
};
})();
function orbSurfCol(k) { return { mars: 0xD07A4A, mercury: 0x8A847C, venus: 0xC89A5A, pluto: 0xD8D0C4, jupiter: 0xD8B48A, saturn: 0xE6CF96, uranus: 0x9ED8E0, neptune: 0x4A6ED8 }[k] || 0xA8A49C; }
if (typeof FG_STATIONS !== "undefined" && !FG_STATIONS.fabshop)
FG_STATIONS.fabshop = { name: "The Ares Gateway fab shop", who: "the fabricator", st: ["engineer", "garage", "forge"], sells: ["cr_parts", "cr_glass", "cr_rubber", "cr_cloth", "cr_crystal"], verb: "Fabricate" };
(function () {
if (typeof fgStationFor !== "function")
return;
var fs = fgStationFor;
fgStationFor = function (ctx) {
var p = String((ctx && (ctx.place || "")) + " " + (ctx && ctx.title || "")).toLowerCase();
if (/ares gateway/.test(p) && /fab|engineer/.test(p))
return "fabshop";
return fs.apply(this, arguments);
};
})();
(function () {
var defs = [
{ tag: "OUTERTRADE", label: "🛒 The trade post", hint: "opens this station's trade post: buy supplies, sell what was gathered, refine it",
when: function () { var h = owHere(); return !!(h && (OW_PLACES[h].trade || OW_PLACES[h].cloud)); }, run: function () { owTradeCard(owHere()); } },
{ tag: "OUTERLESSON", label: "🎓 A lesson about this world", hint: "opens World Learning: The Outer Worlds, with this world's lessons first",
when: function () { return !!owHere(); }, run: function () { owCourseCard(owHere()); } },
{ tag: "OUTERCHALLENGE", label: "🏁 This world's challenge", hint: "opens the challenge here (the Shadow Run, the Probe Relay, the Glacier Traverse, the probe drop, the Crystal Song or the Descent Simulator)",
when: function () { return !!(owHere() && owChalSpec(owHere())); }, run: function () { owChalCard(owHere()); } },
{ tag: "OUTERJOBS", label: "📋 Work here", hint: "shows the Space Corp's posts on this world and how to apply",
when: function () { var h = owHere(); return !!(h && OW_JOBS.some(function (j) { return j[2] === h; })); }, run: function () { owJobsCard(owHere()); } }
];
defs.forEach(function (d) { if (typeof staffDeedAdd === "function")
staffDeedAdd(d);
else
(window.SD_PENDING = window.SD_PENDING || []).push(d); });
})();
if (typeof WH_PLAN !== "undefined") {
WH_PLAN.mercury = { style: "dome", face: { x: 96, z: 0 }, lots: [["Caloris Domes 1", 132, 30], ["Caloris Domes 2", 146, 46], ["Caloris Domes 3", 160, 30], ["Caloris Domes 4", 146, 14]] };
WH_PLAN.pluto = { style: "dome", face: { x: 96, z: 0 }, lots: [["Tombaugh Domes 1", 132, 30], ["Tombaugh Domes 2", 146, 46], ["Tombaugh Domes 3", 160, 30], ["Tombaugh Domes 4", 146, 14]] };
WH_PLAN.veyar = { style: "spire", face: { x: 70, z: 40 }, lots: [["Veyari Guest Spire 1", 110, 60], ["Veyari Guest Spire 2", 130, 72], ["Veyari Guest Spire 3", 150, 60], ["Veyari Guest Spire 4", 130, 46]] };
if (typeof WR_WORLD !== "undefined") {
WR_WORLD.mercury = "Mercury";
WR_WORLD.pluto = "Pluto";
WR_WORLD.veyar = "Veyar";
["mercury", "pluto", "veyar"].forEach(function (k) { if (WR_ORDER.indexOf(k) < 0)
WR_ORDER.push(k); });
}
}
