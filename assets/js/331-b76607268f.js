/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var JBX = { st: null, stAt: 0, busy: false, missing: false, skew: 0, built: false, lite: false,
domeOut: null, lights: [], marq: null, scr: [], conf: null, fw: null, beams: null, banner: null, bannerHide: "",
danceT: 0, stampSent: {}, disco: 0, trivia: null, lanternsMine: 0, slow: 0, lastNo: 0, t: 0, orb: null, heads: [], arch: null };
var JBX_KEYS = { dome: "The Starfall Dome", glow: "The Afterglow", pier: "Jubilee Fireworks Pier" };
var JBX_JOB0 = 4700, JBX_JOB1 = 4799;
var JBX_STAMPS = [["dome", "The Starfall Dome", "Walk into the Arena"], ["dance", "On the floor", "Dance on any floor for half a minute"],
["ride", "Round and round", "Ride the Ferris wheel or the carousel"], ["game", "Step right up", "Play a carnival game"],
["photo", "Say cheese", "Have your picture taken in the Photo Booth"], ["trivia", "Quiz night", "Answer three trivia questions right"],
["sing", "Mic drop", "Sing a song in a karaoke room"], ["lantern", "Make a wish", "Release a lantern on the pier"]];
var JBX_THEMES = {
starfall: ["Starfall (violet, rose and gold)", [[0.62, 0.36, 0.94], [0.94, 0.42, 0.70], [0.96, 0.74, 0.40], [0.42, 0.56, 0.96]]],
neon: ["Neon (violet and teal)", [[0.62, 0.30, 0.98], [0.24, 0.86, 0.84], [0.70, 0.30, 0.98], [0.20, 0.80, 0.90]]],
disco: ["Disco gold", [[0.98, 0.70, 0.30], [0.96, 0.40, 0.50], [0.90, 0.80, 0.40], [0.70, 0.40, 0.90]]],
garden: ["Glow garden (greens)", [[0.40, 0.90, 0.60], [0.70, 0.95, 0.50], [0.30, 0.80, 0.80], [0.90, 0.90, 0.50]]],
masquerade: ["Masquerade (gold and silver)", [[0.96, 0.82, 0.48], [0.98, 0.92, 0.70], [0.90, 0.70, 0.40], [0.80, 0.80, 0.86]]],
ocean: ["Ocean (blues and sea-green)", [[0.20, 0.60, 0.90], [0.30, 0.85, 0.80], [0.45, 0.50, 0.95], [0.25, 0.75, 0.65]]],
ember: ["Ember (amber and rose)", [[0.96, 0.56, 0.30], [0.92, 0.38, 0.46], [0.98, 0.74, 0.42], [0.80, 0.42, 0.62]]]
};
var JBX_FW_COLS = [0xE87AB8, 0xF0B860, 0x7AC8F0, 0xA890F0, 0x8AE0A8, 0xF09A7A, 0xD8A8F0, 0x70D8D0];
function jbxIn() { return typeof signedIn === "function" && signedIn(); }
function jbxKeeper() { return typeof amKeeper === "function" && amKeeper(); }
function jbxNow() { return Date.now() + (JBX.skew || 0); }
function jbxT(s) { var t = s ? Date.parse(s) : NaN; return isFinite(t) ? t : null; }
function jbxClock(ms) { try {
return new Date(ms).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
}
catch (e) {
return "";
} }
function jbxWhen(ms) {
try {
var d = new Date(ms), n = new Date(jbxNow()), same = d.toDateString() === n.toDateString();
return (same ? "today" : d.toLocaleDateString([], { weekday: "long", month: "long", day: "numeric" })) + " at " + jbxClock(ms);
}
catch (e) {
return "";
}
}
function jbxIn_(mins) {
mins = Math.max(0, Math.round(mins));
if (mins < 1)
return "any moment now";
if (mins < 60)
return "in " + mins + " minute" + (mins === 1 ? "" : "s");
var h = Math.floor(mins / 60), m = mins % 60;
return "in " + h + " hour" + (h === 1 ? "" : "s") + (m ? " " + m + " min" : "");
}
function jbxMissing(e) { return /PGRST202|Could not find the function|404|schema cache/i.test(String(e && e.message || e)); }
function jbxMsg(t) { var e = document.getElementById("jbx-msg"); if (e)
e.innerHTML = t;
else if (typeof setStatus === "function")
setStatus(t); }
var JBX_REAL = {};
function jbxReal(kind, col) {
var k = kind + "|" + col;
if (JBX_REAL[k])
return JBX_REAL[k];
var m = new THREE.MeshLambertMaterial({ color: col }), t = typeof texOf === "function" ? texOf(kind) : null;
if (t) {
m.map = t;
m.userData.jbxReal = 1;
}
JBX_REAL[k] = m;
return m;
}
function jbxFinish(G) { return __ZC(331, 0, this, arguments, new.target); }
function jbxLoad(force) {
if (!jbxIn())
return Promise.resolve(null);
var wait = (typeof WLD !== "undefined" && WLD.on === "party") ? 30000 : 90000;
if (JBX.busy || (!force && Date.now() - JBX.stAt < wait))
return Promise.resolve(JBX.st);
JBX.busy = true;
JBX.stAt = Date.now();
return cityRpc("party_blowout_state", {}).then(function (o) {
JBX.busy = false;
JBX.missing = false;
if (o && o.ok !== false) {
var srv = jbxT(o.now);
if (srv)
JBX.skew = srv - Date.now();
if (JBX.st && JBX.st.no !== o.no)
JBX.stampSent = {};
JBX.st = o;
jbxPaintAll();
}
return JBX.st;
}).catch(function (e) { JBX.busy = false; if (jbxMissing(e))
JBX.missing = true; return JBX.st; });
}
function jbxOn() {
var S = JBX.st;
if (!S || !S.title)
return false;
var a = jbxT(S.starts_at), b = jbxT(S.ends_at), n = jbxNow();
return a !== null && n >= a && (b === null || n < b);
}
function jbxSoon() {
var S = JBX.st;
if (!S || !S.title || jbxOn())
return false;
var a = jbxT(S.starts_at), n = jbxNow();
return a !== null && a > n && a - n < 36 * 3600000;
}
function jbxEnded() { var S = JBX.st; if (!S || !S.title)
return false; var b = jbxT(S.ends_at); return b !== null && jbxNow() >= b; }
function jbxTitle() { return (JBX.st && JBX.st.title) || "The Jubilee Blowout"; }
function jbxPal() { var S = JBX.st, T = JBX_THEMES[(S && S.theme) || "starfall"] || JBX_THEMES.starfall; return T[1]; }
(function () {
if (typeof ppMyJobs !== "function")
return;
ppMyJobs = function () {
return ((typeof standing !== "undefined" && standing && standing.jobs) || []).filter(function (j) {
var id = +(j.job_id || j.id || 0);
return (id >= PP_JOB0 && id <= PP_JOB1) || (id >= JBX_JOB0 && id <= JBX_JOB1);
});
};
})();
if (typeof PP_KEYS !== "undefined") {
PP_KEYS.dome = JBX_KEYS.dome;
PP_KEYS.glow = JBX_KEYS.glow;
PP_KEYS.pier = JBX_KEYS.pier;
}
if (typeof PP_ZONES !== "undefined") {
PP_ZONES.dome = { name: "The Starfall Dome", indoor: true, key: JBX_KEYS.dome, x0: 3860, x1: 4140, z0: -150, z1: 140, fog: 0x0C0818, hemi: 0.95, hemiCol: 0xE8E0FF };
PP_ZONES.glow = { name: "The Afterglow", indoor: true, key: JBX_KEYS.glow, x0: 4490, x1: 4710, z0: -70, z1: 90, fog: 0x140C20, hemi: 1.0, hemiCol: 0xFFE8F0 };
}
if (typeof PP_DOORS !== "undefined") {
PP_DOORS.dome = { out: [202, 96, Math.PI / 2], in: [4000, 114, 0], name: "The Starfall Dome" };
PP_DOORS.glow = { out: [95, 266, Math.PI / 2], in: [4600, 61, 0], name: "The Afterglow" };
}
if (typeof PP_PLACES !== "undefined") {
PP_PLACES.dome = { x: 203, z: 96, name: "The Starfall Dome" };
PP_PLACES.glow = { x: 96, z: 266, name: "The Afterglow" };
PP_PLACES.pier = { x: 284, z: -170, name: "The Fireworks Pier" };
PP_PLACES.lanterns = { x: 312, z: -114, name: "The Lantern Garden" };
}
if (typeof WMW_SPOTS !== "undefined")
WMW_SPOTS.forEach(function (s) { if (s[0] === "wm_jb_glass1" && s[3] === 256 && s[4] === -170) {
s[3] = 252;
s[4] = -184;
} });
"use strict";
function jbxBuildOut(G, L) {
var D = new THREE.Group();
D.name = "jbx-out";
G.add(D);
jbxDomeOut(D, L);
jbxGlowOut(D, L);
jbxPier(D, L);
jbxArch(D, L);
jbxFinish(D);
}
var JBX_DOME = { x: 250, z: 96, r: 40 };
function jbxDomeOut(G, L) { return __ZC(331, 1, this, arguments, new.target); }
function jbxPaintMarquee() {
var M = JBX.marq;
if (!M)
return;
var on = jbxOn(), soon = jbxSoon(), S = JBX.st || {};
var line = on ? (jbxTitle() + "  ·  TONIGHT" + (S.headline ? "  ·  " + S.headline : "") + "  ·  ") : soon ? (jbxTitle() + "  ·  " + jbxWhen(jbxT(S.starts_at)) + "  ·  ") : "THE STARFALL DOME  ·  JUBILEE  ·  ";
if (M.said === line)
return;
M.said = line;
var x = M.cv.getContext("2d"), W = M.cv.width, H = M.cv.height;
x.fillStyle = "#120A20";
x.fillRect(0, 0, W, H);
x.font = "bold 38px Georgia";
x.textBaseline = "middle";
x.fillStyle = on ? "#FFD9A0" : "#C8B8E8";
var w = Math.max(200, x.measureText(line).width), n = Math.max(1, Math.floor(W / w));
for (var i = 0; i < n; i++)
x.fillText(line.toUpperCase(), i * W / n + 8, H / 2 + 2);
M.tex.needsUpdate = true;
}
var JBX_GLOW = { x0: 100, x1: 140, z0: 250, z1: 282 };
function jbxGlowOut(G, L) { return __ZC(331, 2, this, arguments, new.target); }
var JBX_PIER = { x0: 214, x1: 300, z0: -173, z1: -167, y: 0.45, head: { x0: 214, x1: 234, z0: -182, z1: -158 } };
function jbxPier(G, L) { return __ZC(331, 3, this, arguments, new.target); }
(function () {
if (typeof ppWater !== "function")
return;
var pw = ppWater;
ppWater = function (x, z) { var P = JBX_PIER; if (ppIn(P, x, z) || ppIn(P.head, x, z))
return false; return pw.apply(this, arguments); };
if (typeof ppOutdoorKey === "function") {
var ok = ppOutdoorKey;
ppOutdoorKey = function (x, z) {
if (x > 200 && z < -100 && z > -200 && (ppIn(JBX_PIER, x, z) || ppIn(JBX_PIER.head, x, z) || x > 280))
return JBX_KEYS.pier;
if (Math.hypot(x - JBX_DOME.x, z - JBX_DOME.z) < JBX_DOME.r + 16)
return JBX_KEYS.dome;
if (x > 80 && x < 150 && z > 240 && z < 290)
return JBX_KEYS.glow;
return ok.apply(this, arguments);
};
}
})();
function jbxArch(G, L) { return __ZC(331, 4, this, arguments, new.target); }
function jbxPaintArch() {
var A = JBX.arch;
if (!A)
return;
var on = jbxOn(), soon = jbxSoon();
A.g.visible = on || soon || (jbxKeeper() && !!(JBX.st && JBX.st.title) && !jbxEnded());
var S = JBX.st || {}, line2 = on ? ("Tonight" + (S.headline ? " · " + S.headline + " at the Starfall Dome" : " · the Starfall Dome is open")) : soon ? jbxWhen(jbxT(S.starts_at)) : "";
var key = jbxTitle() + "|" + line2;
if (A.said === key)
return;
A.said = key;
var x = A.cv.getContext("2d"), W = A.cv.width, H = A.cv.height;
var g = x.createLinearGradient(0, 0, 0, H);
g.addColorStop(0, "#2A1440");
g.addColorStop(1, "#120A22");
x.fillStyle = g;
x.fillRect(0, 0, W, H);
x.strokeStyle = "#C9A868";
x.lineWidth = 8;
x.strokeRect(6, 6, W - 12, H - 12);
x.textAlign = "center";
x.fillStyle = "#FFD9A0";
x.font = "bold 62px Georgia";
x.fillText(jbxTitle().slice(0, 30), W / 2, 78);
x.fillStyle = "#E8D8F4";
x.font = "28px Georgia";
x.fillText(line2.slice(0, 64), W / 2, 128);
A.tex.needsUpdate = true;
}
"use strict";
function jbxWalls(G, x0, x1, z0, z1, h, mat, gaps, sides) { return __ZC(331, 5, this, arguments, new.target); }
function jbxRoom(R, x0, x1, z0, z1, h, floor, ceil, wall, gaps, sides, zone, y) {
y = y || 0;
ppWalk(x0, x1, z0, z1, zone, y);
ppFloor(R, x0, x1, z0, z1, floor, y);
if (ceil)
ppCeil(R, x0, x1, z0, z1, y + h, ceil);
if (wall)
jbxWalls(R, x0, x1, z0, z1, h, wall, gaps, sides);
}
function jbxScreen(Lv, w, h, x, y, z, ry, kind, zone) { return __ZC(331, 6, this, arguments, new.target); }
function jbxDomeIn(G) { return __ZC(331, 7, this, arguments, new.target); }
function jbxLift(dir) { return __ZC(331, 8, this, arguments, new.target); }
"use strict";
function jbxGlowIn(G) { return __ZC(331, 9, this, arguments, new.target); }
var JBX_CH = [null, { name: "Channel 1 · Rose", col: "#FF8AC8", bpm: 118, pal: [[0.96, 0.48, 0.74], [0.88, 0.40, 0.80], [0.98, 0.62, 0.70]] },
{ name: "Channel 2 · Teal", col: "#7AE0E8", bpm: 100, pal: [[0.40, 0.86, 0.90], [0.30, 0.70, 0.86], [0.48, 0.92, 0.78]] },
{ name: "Channel 3 · Gold", col: "#F0C870", bpm: 128, pal: [[0.96, 0.80, 0.44], [0.98, 0.66, 0.36], [0.90, 0.84, 0.56]] }];
function jbxDiscoCard() { return __ZC(331, 10, this, arguments, new.target); }
function jbxDisco(i) { return __ZC(331, 11, this, arguments, new.target); }
function jbxGlowHost() { return __ZC(331, 12, this, arguments, new.target); }
"use strict";
var JBX_SHOW_LEN = 150000;
function jbxShowList() { return __ZC(331, 13, this, arguments, new.target); }
function jbxShowNow() { var n = jbxNow(), L = jbxShowList(); for (var i = 0; i < L.length; i++)
if (n >= L[i] && n < L[i] + JBX_SHOW_LEN)
return L[i]; return null; }
function jbxShowNext() { var n = jbxNow(), L = jbxShowList(); for (var i = 0; i < L.length; i++)
if (L[i] > n)
return L[i]; return null; }
function jbxFwMake() { return __ZC(331, 14, this, arguments, new.target); }
function jbxFwTick() { return __ZC(331, 15, this, arguments, new.target); }
function jbxConfettiMake(Lv) { return __ZC(331, 16, this, arguments, new.target); }
function jbxConfettiTick(dt, t) { return __ZC(331, 17, this, arguments, new.target); }
function jbxLightsTick(dt, t) { return __ZC(331, 18, this, arguments, new.target); }
function jbxScreensTick(dt, t) { return __ZC(331, 19, this, arguments, new.target); }
function jbxPrize() { var S = JBX.st || {}, p = []; if (+S.raffle_gold > 0)
p.push((+S.raffle_gold).toLocaleString() + " gold"); if (S.raffle_note)
p.push(S.raffle_note); return p.join(" and "); }
function jbxTick(dt) {
JBX.t += dt;
var t = JBX.t;
JBX.slow -= dt;
if (JBX.slow <= 0) {
JBX.slow = 1;
jbxLoad(false);
jbxPassportTick(1);
jbxPaintAll();
}
if (!JBX.fw)
jbxFwMake();
jbxFwTick();
jbxConfettiTick(dt, t);
jbxLightsTick(dt, t);
jbxScreensTick(dt, t);
}
function jbxPaintAll() {
jbxPaintMarquee();
jbxPaintArch();
var pal = jbxPal();
PP.tiles.forEach(function (T) { if (T.key === "dome")
T.pal = pal; });
if (JBX.st && JBX.st.headline !== JBX.headSaid) {
JBX.headSaid = JBX.st.headline;
}
}
"use strict";
function jbxMe() { return (JBX.st && JBX.st.me) || {}; }
function jbxNoNight() { return "<div style='opacity:.85'>No big night is booked just now. The Dome is open every night all the same: the Arena DJ plays, the bars are open, and the Sky Boxes are up the lift.</div>"; }
function jbxTimes() { return __ZC(331, 20, this, arguments, new.target); }
function jbxBoxOffice() { return __ZC(331, 21, this, arguments, new.target); }
function jbxCheckin() { return __ZC(331, 22, this, arguments, new.target); }
function jbxRaffleEnter() {
if (!jbxIn())
return jbxMsg("Sign in first.");
jbxMsg("…");
cityRpc("party_raffle_enter", {}).then(function (o) { jbxMsg("<b>" + esc((o && o.say) || "Done.") + "</b>"); jbxLoad(true); })
.catch(function (e) { jbxMsg(jbxMissing(e) ? "The raffle opens soon." : esc(e.message)); });
}
function jbxRaffleCard() { return __ZC(331, 23, this, arguments, new.target); }
function jbxPassportCard() { return __ZC(331, 24, this, arguments, new.target); }
function jbxStamp(k) { return __ZC(331, 25, this, arguments, new.target); }
function jbxPassportTick(dt) {
if (!jbxOn() || !jbxIn())
return;
if (PP.zone === "dome") {
var L = worldLocal();
if (L.z < 81 && L.x > 3905)
jbxStamp("dome");
}
if (PP.dance) {
JBX.danceT += dt;
if (JBX.danceT >= 30)
jbxStamp("dance");
}
}
function jbxStageCard() { return __ZC(331, 26, this, arguments, new.target); }
function jbxFohCard() { return __ZC(331, 27, this, arguments, new.target); }
function jbxFireworksCard() { return __ZC(331, 28, this, arguments, new.target); }
function jbxLanternCard() { return __ZC(331, 29, this, arguments, new.target); }
function jbxLantern() { return __ZC(331, 30, this, arguments, new.target); }
JBX.mine = [];
function jbxLanternRise() {
if (!PP.outLive)
return;
var L = worldLocal(), m = ppSph(0.5, ppGlowMat(0xFFC070, 0.85), L.x, 2.4, L.z - 1, PP.outLive, 10);
m.scale.y = 1.3;
JBX.mine.push({ m: m, t: 0, x: L.x, z: L.z - 1 });
if (JBX.mine.length > 6) {
var o = JBX.mine.shift();
if (o.m.parent)
o.m.parent.remove(o.m);
}
}
function jbxLanternTick(dt) {
JBX.mine.forEach(function (o) { o.t += dt; o.m.position.set(o.x - o.t * 0.5, 2.4 + o.t * 1.6, o.z - o.t * 0.25 + Math.sin(o.t * 0.3) * 1.2); });
JBX.mine = JBX.mine.filter(function (o) { if (o.t < 240)
return true; if (o.m.parent)
o.m.parent.remove(o.m); return false; });
}
function jbxPhotoCard() { return __ZC(331, 31, this, arguments, new.target); }
function jbxPhoto() { return __ZC(331, 32, this, arguments, new.target); }
var JBX_QS = [
["How many moons does Jubilee have?", "Two", "One", "Three"],
["Which line flies from Launch Pad 1 to Jubilee?", "The Party Line", "The Lunar Line", "The Comet Express"],
["How many pins stand at the end of a bowling lane?", "Ten", "Nine", "Twelve"],
["Which planet is called the Red Planet?", "Mars", "Venus", "Jupiter"],
["How many keys does a standard piano have?", "88", "76", "100"],
["What colour is the wristband for guests aged 18 and over on Jubilee?", "Gold", "Blue", "Green"],
["What is a group of four musicians called?", "A quartet", "A trio", "A quintet"],
["How many sides does a hexagon have?", "Six", "Five", "Eight"],
["What gas do plants take in from the air?", "Carbon dioxide", "Oxygen", "Helium"],
["Which is the largest ocean on Earth?", "The Pacific", "The Atlantic", "The Indian"],
["How many minutes are there in three hours?", "180", "120", "160"],
["Which Jubilee venue has six karaoke rooms?", "The Echo Lounge", "The Glowworm Club", "The Gilded Hall"],
["How many players from one team are on a volleyball court?", "Six", "Five", "Eleven"],
["What do bees make?", "Honey", "Silk", "Wax paper"],
["Which way does the sun rise on Earth?", "In the east", "In the west", "In the north"]
];
function jbxTrivia() {
var R = ppRand((Date.now() / 1000) | 0), order = JBX_QS.map(function (q, i) { return [R(), i]; }).sort(function (a, b) { return a[0] - b[0]; }).slice(0, 5).map(function (p) { return p[1]; });
JBX.trivia = { order: order, n: 0, right: 0, q: true };
jbxTriviaAsk();
}
function jbxTriviaAsk() { return __ZC(331, 33, this, arguments, new.target); }
function jbxProdCard() { return __ZC(331, 34, this, arguments, new.target); }
function jbxKeeperSet(args) {
jbxMsg("…");
cityRpc("keeper_party_set", args).then(function (o) { jbxMsg("<b>" + esc((o && o.say) || "Saved.") + "</b>"); jbxLoad(true); })
.catch(function (e) { jbxMsg(jbxMissing(e) ? "The production desk needs SQL the latest server update on the server." : esc(e.message)); });
}
function jbxKeeperGo(what) {
jbxMsg("…");
cityRpc("keeper_party_go", { p_what: what }).then(function (o) { jbxMsg("<b>" + esc((o && o.say) || "Done.") + "</b>"); jbxLoad(true); })
.catch(function (e) { jbxMsg(jbxMissing(e) ? "The production desk needs SQL the latest server update on the server." : esc(e.message)); });
}
"use strict";
if (typeof PP_MENU !== "undefined") {
PP_MENU.dome = [["pp_dome_fizz", "Starfall fizz (cocktail)", 9, 0, 30, 1], ["pp_dome_beer", "Arena lager", 5, 0, 30, 1], ["pp_dome_mock", "Starlight lemonade (no alcohol)", 4, 0, 35, 0],
["pp_dome_water", "Bottle of water", 1, 0, 30, 0], ["pp_dome_popcorn", "Big tub of popcorn", 4, 25, 0, 0], ["pp_dome_pretzel", "Warm pretzel with mustard", 4, 30, 0, 0], ["pp_dome_hotdog", "Arena hot dog", 5, 35, 0, 0]];
PP_MENU.sky = [["pp_sky_champ", "Glass of champagne", 14, 0, 25, 1], ["pp_sky_old", "Old-fashioned", 12, 0, 25, 1], ["pp_sky_mock", "Sparkling peach (no alcohol)", 7, 0, 30, 0],
["pp_sky_platter", "Sharing platter: cheeses, cured meats, fruit", 22, 60, 0, 0], ["pp_sky_sushi", "Sushi boat", 20, 50, 0, 0], ["pp_sky_tart", "Little lemon tarts", 8, 20, 0, 0]];
PP_MENU.crew = [["pp_crew_coffee", "Mug of coffee", 0, 0, 30, 0], ["pp_crew_tea", "Mug of tea", 0, 0, 30, 0], ["pp_crew_stew", "Bowl of the caterer's stew", 0, 50, 0, 0], ["pp_crew_sand", "A sandwich from the tray", 0, 35, 0, 0], ["pp_crew_water", "Iced water", 0, 0, 30, 0]];
PP_MENU.glow = [["pp_glow_nightcap", "The Afterglow nightcap", 9, 0, 25, 1], ["pp_glow_espmart", "Espresso martini", 11, 0, 25, 1], ["pp_glow_mock", "Cucumber cooler (no alcohol)", 5, 0, 35, 0],
["pp_glow_cocoa", "Hot chocolate", 4, 10, 30, 0], ["pp_glow_toast", "Cheese toastie", 5, 40, 0, 0]];
PP_MENU.dessert = [["pp_des_sundae", "Starfall sundae", 7, 30, 0, 0], ["pp_des_cake", "Slice of rainbow layer cake", 6, 30, 0, 0], ["pp_des_crepe", "Crêpe with strawberries", 6, 30, 0, 0],
["pp_des_cookies", "Warm cookies and milk", 5, 25, 15, 0], ["pp_des_float", "Root beer float", 5, 10, 25, 0]];
}
if (typeof PP_SHOPS !== "undefined") {
PP_SHOPS.dome = { title: "The Starfall Dome merch stand", sub: "Keepsakes of the night. They go into your backpack.", pre: ["jbx_tee", "jbx_hoodie", "jbx_poster", "jbx_lightstick", "jbx_glowcrown", "jbx_programme", "jbx_scarf"] };
}
(function () {
if (typeof ppMenu !== "function")
return;
var pm = ppMenu;
ppMenu = function (k, title) {
var S = JBX.st;
if (!(jbxOn() && S && S.open_bar) || k === "hall")
return pm.apply(this, arguments);
var src = k === "truck" ? PP_TRUCKS : PP_MENU, key = k === "truck" ? title : k, keep = src[key];
if (!keep)
return pm.apply(this, arguments);
src[key] = keep.map(function (m) { var c = m.slice(); c[2] = 0; return c; });
try {
pm.apply(this, arguments);
}
finally {
src[key] = keep;
}
jbxMsgSoon("🥂 <b>Open bar tonight</b>: it is all on the Keeper.");
};
})();
function jbxMsgSoon(t) { setTimeout(function () { var e = document.getElementById("pp-msg"); if (e && !e.innerHTML)
e.innerHTML = t; }, 30); }
(function () {
if (typeof ppPeople !== "function")
return;
var pe = ppPeople;
ppPeople = function () {
if (!JBX.built) {
JBX.built = true;
JBX.lite = !!PP.lite;
try {
jbxBuildOut(PP.out, PP.outLive);
}
catch (e) {
if (window.console)
console.warn("jubilee blowout outside:", e);
}
try {
jbxDomeIn(PP.g);
}
catch (e) {
if (window.console)
console.warn("jubilee blowout dome:", e);
}
try {
jbxGlowIn(PP.g);
}
catch (e) {
if (window.console)
console.warn("jubilee blowout afterglow:", e);
}
}
var r = pe.apply(this, arguments);
try {
PP.g.traverse(function (o) { if (o.isInstancedMesh)
o.userData.noCull = true; });
}
catch (e) { }
try {
var hm = ppGlowMat(0x9AD8F0, 0.55);
(PP.dancers || []).concat(PP.djs_g || []).forEach(function (d) {
if (!d || d.zone !== "glow" || !d.g || d.g.userData.jbxHp)
return;
d.g.userData.jbxHp = 1;
var t = new THREE.Mesh(new THREE.TorusGeometry(0.13, 0.025, 6, 14, Math.PI), hm);
t.position.y = 1.72;
t.rotation.y = Math.PI / 2;
d.g.add(t);
});
}
catch (e) { }
return r;
};
})();
function jbxBannerLine() { return __ZC(331, 35, this, arguments, new.target); }
(function () {
if (typeof ppBannerTick === "function") {
var bt = ppBannerTick;
ppBannerTick = function (L) {
var line = "";
try {
line = jbxBannerLine();
}
catch (e) { }
if (!line)
return bt.apply(this, arguments);
var wb = worldBanner;
worldBanner = function (h) { return wb.call(this, h ? h + line : h); };
try {
return bt.apply(this, arguments);
}
finally {
worldBanner = wb;
}
};
}
if (typeof ppTick === "function") {
var tk = ppTick;
ppTick = function (dt) { var r = tk.apply(this, arguments); try {
jbxTick(dt);
jbxLanternTick(dt);
}
catch (e) { } return r; };
}
if (typeof ppEnter === "function") {
var en = ppEnter;
ppEnter = function (opt) {
var r = en.apply(this, arguments);
JBX.danceT = 0;
jbxLoad(true).then(function () { if (jbxOn())
setTimeout(function () { setStatus("✨ <b>" + esc(jbxTitle()) + "</b> is on tonight! The Starfall Dome is up the Dome Walk, east of the Glowworm: check in at its box office for your wristband and the raffle."); }, 2600); });
return r;
};
}
if (typeof ppGoIn === "function") {
var gi = ppGoIn;
ppGoIn = function (k) {
if (k !== "dome" && k !== "glow")
return gi.apply(this, arguments);
var D = PP_DOORS[k];
if (!D)
return;
if (typeof playTone === "function")
playTone(420, 0.2);
ppPut(D.in[0], D.in[1], D.in[2]);
setStatus("<b>" + esc(D.name) + ".</b> " + (k === "dome" ? "The Grand Foyer: the box office straight ahead, the cloakroom and the merch stand to the left, the bars to either side, the lift to the Sky Boxes on the right. The Arena is through the great doors north." + (jbxOn() ? " Tonight: <b>" + esc(jbxTitle()) + "</b>." : "") :
"Soft lamps and low music. The Silent Disco is straight on (headphones from the booth), the Photo Booth Studio east, the Quiet Room and the Trivia Parlour west, the Dessert Parlour beyond.") + " Back takes you outside.");
if (k === "dome")
jbxLoad(true);
};
}
if (typeof ppMusicTick === "function") {
var mt = ppMusicTick;
ppMusicTick = function (L, Z) {
(PP.music || []).forEach(function (m) { if (m.disco)
m.zone = JBX.disco > 0 ? "glow" : "-off-"; });
return mt.apply(this, arguments);
};
}
if (typeof ppDanceSet === "function") {
var ds = ppDanceSet;
ppDanceSet = function (on) { if (on && !PP.dance)
JBX.danceT = 0; return ds.apply(this, arguments); };
}
if (typeof ppRideStart === "function") {
var rs = ppRideStart;
ppRideStart = function (kind) { var was = !!PP.ride, r = rs.apply(this, arguments); if (!was && PP.ride)
jbxStamp("ride"); return r; };
}
if (typeof ppPlay === "function") {
var pl = ppPlay;
ppPlay = function () { var was = !!PP.playing, r = pl.apply(this, arguments); if (!was && PP.playing)
jbxStamp("game"); return r; };
}
if (typeof ppSing === "function") {
var sg = ppSing;
ppSing = function () { var r = sg.apply(this, arguments); jbxStamp("sing"); return r; };
}
if (typeof ppConcierge === "function") {
var cc = ppConcierge;
ppConcierge = function () {
var wc = worldCard;
worldCard = function (h, fns) {
fns = fns || {};
var add = (jbxOn() ? "<div style='margin:4px 0 6px;color:#F2D08A'>✨ Tonight: <b>" + esc(jbxTitle()) + "</b> at the Starfall Dome.</div>" : "") +
worldBtn("wdome", "The Starfall Dome", "The Arena, the great stage, the Sky Boxes, the box office") +
worldBtn("wglow", "The Afterglow", "The Silent Disco, the Photo Booth, trivia, desserts, the Quiet Room") +
worldBtn("wpier", "The Fireworks Pier", "The fireworks over the lagoon, the lantern stall, benches to watch");
fns.wdome = function () { ppShowWay("dome"); };
fns.wglow = function () { ppShowWay("glow"); };
fns.wpier = function () { ppShowWay("pier"); };
var at = h.indexOf("<button");
h = at >= 0 ? h.slice(0, at) + add + h.slice(at) : h + add;
return wc.call(this, h, fns);
};
try {
return cc.apply(this, arguments);
}
finally {
worldCard = wc;
}
};
}
if (typeof showTheWay === "function") {
var sw = showTheWay;
showTheWay = function (key) {
if (typeof WLD !== "undefined" && WLD.on === "party") {
for (var k in JBX_KEYS)
if (JBX_KEYS[k] === key)
return ppShowWay(k);
}
return sw.apply(this, arguments);
};
}
})();
function jbxPill() { return __ZC(331, 36, this, arguments, new.target); }
function jbxPillTick() {
try {
var e = document.getElementById("jbx-pill"), vr = typeof renderer !== "undefined" && renderer && renderer.xr && renderer.xr.isPresenting;
if (!jbxIn() || vr) {
if (e)
e.style.display = "none";
return;
}
jbxLoad(false);
var S = JBX.st, onJ = typeof WLD !== "undefined" && WLD.on === "party", tag = S ? (S.no + "|" + S.starts_at) : "";
var show = S && S.title && (jbxOn() || jbxSoon()) && !onJ;
var hid = "";
try {
hid = localStorage.getItem("jbx-pill-hide") || "";
}
catch (x) {
hid = JBX.bannerHide;
}
if (!show || hid === tag) {
if (e)
e.style.display = "none";
return;
}
e = jbxPill();
var hudUp = typeof WLD !== "undefined" && WLD.hud && WLD.hud.style.display === "block";
e.style.top = hudUp ? "112px" : "58px";
var txt = jbxOn() ? "🎉 <b>" + esc(jbxTitle()) + "</b> is on now on Jubilee, the Party Planet!" : "🎉 <b>" + esc(jbxTitle()) + "</b> on Jubilee: " + esc(jbxWhen(jbxT(S.starts_at))) + ".";
var html = txt + " <span style='opacity:.85'>Take the free Party Line from Launch Pad 1 at the Spaceport.</span> " +
"<button data-j='go' style='margin-left:6px;background:#C9A868;color:#1A1028;border:0;border-radius:12px;padding:3px 10px;font-weight:600;cursor:pointer'>Show me the way</button>" +
"<button data-j='x' aria-label='Hide' style='margin-left:4px;background:none;color:#F4ECDC;border:0;font-size:16px;cursor:pointer'>✕</button>";
if (e.dataset.h !== html) {
e.dataset.h = html;
e.innerHTML = html;
e.querySelector("[data-j=go]").onclick = function () { if (typeof showTheWay === "function" && typeof SPACEPORT_KEY !== "undefined")
showTheWay(SPACEPORT_KEY); };
e.querySelector("[data-j=x]").onclick = function () { JBX.bannerHide = tag; try {
localStorage.setItem("jbx-pill-hide", tag);
}
catch (x) { } e.style.display = "none"; };
}
e.style.display = "block";
}
catch (err) { }
}
setInterval(jbxPillTick, 5000);
