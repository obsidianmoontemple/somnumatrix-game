/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
function hallPanel(id, col) {
var el = document.getElementById(id);
if (el)
return el;
if (!document.body)
return null;
if (!document.getElementById("hall-css")) {
var css = document.createElement("style");
css.id = "hall-css";
css.textContent = ".hall-panel{position:fixed;left:12px;bottom:calc(96px + env(safe-area-inset-bottom,0px));z-index:44;display:none;width:min(380px,calc(100vw - 24px));max-height:min(62vh,560px);overflow:auto;" +
"background:rgba(8,10,16,.94);border-radius:4px;padding:10px 12px;font:13px var(--sans);color:var(--bone);line-height:1.45}" +
".hall-panel .row{display:flex;flex-wrap:wrap;gap:6px;margin-top:7px}.hall-panel .btn{font-size:12.5px}.hall-panel .dim{color:var(--dim)}" +
".hall-panel .item{border-top:1px solid rgba(255,255,255,.08);padding:7px 0}.hall-panel h4{margin:0 0 4px;font-size:14px}" +
".hall-view{position:fixed;inset:0;z-index:9000;background:rgba(3,4,8,.88);display:flex;flex-direction:column;align-items:center;justify-content:center;padding:12px}" +
".hall-view .bar{width:min(1100px,100%);display:flex;justify-content:space-between;align-items:center;gap:10px;color:var(--bone);font:13px var(--sans);margin-bottom:8px}" +
".hall-view iframe{width:min(1100px,100%);aspect-ratio:16/9;max-height:calc(100vh - 110px);border:0;background:#000;border-radius:3px}" +
".hall-view .tall{aspect-ratio:auto;height:calc(100vh - 110px)}" +
".hall-view .foot{width:min(1100px,100%);color:var(--dim);font:12px var(--sans);margin-top:6px}";
document.head.appendChild(css);
}
el = document.createElement("div");
el.id = id;
el.className = "hall-panel";
el.style.border = "1px solid " + (col || "var(--gold,#C9A868)");
document.body.appendChild(el);
return el;
}
function hallOnJob(ids) {
var jobs = (typeof WORK !== "undefined" && WORK.data && WORK.data.jobs) || [];
return jobs.some(function (j) { return ids.indexOf(j.job_id) >= 0 && j.clocked_in; });
}
function hallCanvas(w, h, paint) { return __ZC(139, 0, this, arguments, new.target); }
function hallText(g, txt, x, y, maxW, font, col, align) {
g.font = font;
g.fillStyle = col;
g.textAlign = align || "center";
g.textBaseline = "middle";
var t = String(txt || "");
while (t.length > 3 && g.measureText(t).width > maxW)
t = t.slice(0, -2);
if (t !== String(txt || ""))
t = t.replace(/\s*\S?$/, "") + "…";
g.fillText(t, x, y);
}
var HALL = { view: null };
function hallViewer(title, url, foot, opt) { return __ZC(139, 1, this, arguments, new.target); }
function hallViewerClose() {
if (!HALL.view)
return;
if (HALL.view.parentNode)
HALL.view.parentNode.removeChild(HALL.view);
HALL.view = null;
var f = HALL.onClose;
HALL.onClose = null;
if (f)
try {
f();
}
catch (e) { }
}
addEventListener("keydown", function (e) { if (e.key === "Escape" && HALL.view) {
e.preventDefault();
hallViewerClose();
} }, true);
function hallInside(key) { return !!(store.inside && typeof INT !== "undefined" && INT && INT.spec && (INT.spec.workplace === key || INT.spec.label === key)); }
var CIN_KEY = "The Somnucor Picture House";
S("picturehouse", "structure", [26, 13, 22], [
{ g: "box", s: [26, 11, 22], p: [0, 5.5, 0], c: 0x7A2E2E },
{ g: "box", s: [27, 1.2, 23], p: [0, 11.6, 0], c: 0xC9B48A },
{ g: "box", s: [26.4, .5, 22.4], p: [0, 7.2, 0], c: 0xC9B48A },
{ g: "box", s: [16, .8, 4], p: [0, 4.6, 12.8], c: 0x2A2622 },
{ g: "box", s: [16.2, .9, .3], p: [0, 5.1, 14.8], c: 0xF4E6C0, glow: 1 },
{ g: "sph", s: [.12], p: [-7.6, 4.55, 14.9], c: 0xFFD27A, glow: 1, pulse: 1, rep: [20, .8, 0, 0] },
{ g: "box", s: [1.6, 7.5, .5], p: [-9.6, 8.2, 11.6], c: 0x2A2622 },
{ g: "box", s: [1.2, 7, .6], p: [-9.6, 8.2, 11.7], c: 0xFFC040, glow: 1, pulse: 1 },
{ g: "box", s: [4.4, 3, .3], p: [0, 1.5, 11.1], c: "dark" },
{ g: "box", s: [3, 2.6, .2], p: [-6, 1.6, 11.05], c: "glass", rep: [2, 12, 0, 0] },
{ g: "box", s: [1.5, 2.2, .15], p: [-3.4, 1.8, 11.12], c: 0xE0761E, glow: 1, rep: [2, 6.8, 0, 0] },
{ g: "box", s: [1.5, 2.2, .15], p: [-10.6, 1.8, 11.12], c: 0x8E3B8E, glow: 1, rep: [2, 21.2, 0, 0] },
{ g: "box", s: [12, .4, 4], p: [0, .2, 13], c: 0xB8AE9A }
], ["picture house", "cinema", "movie theatre", "movie theater", "picture palace", "the pictures", "the movies"], { sign: [0, 9.3, 11.3, 14, 2] });
cityWorkplace({ key: CIN_KEY, ring: "markets", arch: "picturehouse", s: 1, jobs: [1610, 1611, 1612, 1613, 1614, 1615], fit: [],
note: "Five screens of films that belong to everyone: comedy, family, cartoons, action, drama, Christmas and Halloween classics. Tickets at the box office." });
cityMore("xpx", function (C) { var f = cityFrontage(C, CIN_KEY, 1080, 2); if (f && f.spec)
f.spec.attrs.c = 0x7A2E2E; });
var CIN_FILMS = {
"Nosferatu1922": ["Nosferatu", 1922, 92, "teen"],
"DasKabinettdesDoktorCaligariTheCabinetofDrCaligari": ["The Cabinet of Dr. Caligari", 1920, 51, "teen"],
"ThePhantomoftheOpera": ["The Phantom of the Opera", 1925, 106, "teen"],
"Haxan_tinted_and_subtitled": ["Häxan: Witchcraft Through the Ages", 1922, 105, "adult"],
"TheGolem_893": ["The Golem: How He Came into the World", 1920, 85, "teen"],
"DrJekyllandMrHyde": ["Dr. Jekyll and Mr. Hyde", 1920, 82, "teen"],
"The_Hunchback_of_Notre_Dame": ["The Hunchback of Notre Dame", 1923, 101, "teen"],
"Frankenstein1910": ["Frankenstein", 1910, 13, "family"],
"night_of_the_living_dead_dvd": ["Night of the Living Dead", 1968, 96, "adult"],
"HouseOnHauntedHill1959": ["House on Haunted Hill", 1959, 75, "teen"],
"CarnivalOfSouls1962": ["Carnival of Souls", 1962, 82, "teen"],
"WhiteZombie": ["White Zombie", 1932, 68, "teen"],
"Little_ShopOf_Horrors.avi": ["The Little Shop of Horrors", 1960, 72, "teen"],
"lastmanonearth-1964": ["The Last Man on Earth", 1964, 86, "teen"],
"dementia-13-1963_202312": ["Dementia 13", 1963, 75, "adult"],
"The_Bat.mpeg": ["The Bat", 1959, 80, "teen"],
"TheTerror": ["The Terror", 1963, 79, "teen"],
"ABucketofBlood": ["A Bucket of Blood", 1959, 66, "teen"],
"the-skeleton-dance-1929": ["The Skeleton Dance", 1929, 6, "family"],
"hells-bells_1929": ["Hell's Bells", 1929, 6, "family"],
"swing-you-sinners-1930": ["Swing You Sinners!", 1930, 8, "family"]
};
var CIN_RATING = { family: "For everyone", teen: "Some frights", adult: "Horror: grown-ups" };
var CIN_DEFAULT = [
{ n: 1, name: "The Grand", films: ["Nosferatu1922", "DasKabinettdesDoktorCaligariTheCabinetofDrCaligari", "ThePhantomoftheOpera", "TheGolem_893", "DrJekyllandMrHyde", "The_Hunchback_of_Notre_Dame"] },
{ n: 2, name: "The Vincent", films: ["HouseOnHauntedHill1959", "The_Bat.mpeg", "lastmanonearth-1964", "TheTerror", "ABucketofBlood", "Little_ShopOf_Horrors.avi"] },
{ n: 3, name: "The Lantern (family)", films: ["the-skeleton-dance-1929", "hells-bells_1929", "swing-you-sinners-1930", "Frankenstein1910"] },
{ n: 4, name: "The Midnight", films: ["night_of_the_living_dead_dvd", "CarnivalOfSouls1962", "dementia-13-1963_202312", "Haxan_tinted_and_subtitled", "WhiteZombie"] },
{ n: 5, name: "The Matinee", films: ["Frankenstein1910", "WhiteZombie", "CarnivalOfSouls1962", "ThePhantomoftheOpera", "the-skeleton-dance-1929", "Nosferatu1922"] }
];
var CIN_SNACKS = [["popcorn", "Popcorn", 2], ["toffee_apple", "Toffee apple", 2], ["lemonade", "Lemonade", 1], ["cocoa", "Hot cocoa", 1]];
var CIN = { state: null, at: 0, busy: false, tickets: {}, open: true, watching: null, boardAt: 0, feed: null, feedAt: 0, prog: false, warned: false };
function cinFilm(f) {
if (typeof f === "string") {
var d = CIN_FILMS[f];
return d ? { id: f, title: d[0], year: d[1], minutes: d[2], rating: d[3] } : { id: f, title: f, minutes: 90, rating: "teen" };
}
return f;
}
function cinScreens() {
var s = CIN.state && CIN.state.screens;
var list = (s && s.length ? s : CIN_DEFAULT).map(function (q) { return { n: q.n, name: q.name || ("Screen " + q.n), films: (q.films || []).map(cinFilm).filter(function (f) { return f && f.id; }) }; });
list.sort(function (a, b) { return a.n - b.n; });
return list;
}
var CIN_EPOCH = Date.UTC(2026, 0, 1, 12, 0, 0), CIN_GAP = 15;
function cinNow(sc, at) { return __ZC(139, 2, this, arguments, new.target); }
function cinFeedScreen(n) {
var f = CIN.feed;
if (!f || !f.screens)
return null;
var s = f.screens[String(n)];
if (!s || !(/^https:\/\//.test(String(s.embed || "")) || /^https:\/\//.test(String(s.mp4 || ""))))
return null;
return s;
}
function cinFeedTimes(fs) {
return (Array.isArray(fs && fs.showtimes) ? fs.showtimes : []).map(function (t) { return t && t.at; }).filter(Boolean).slice(0, 6).join("  ·  ");
}
function cinMins(m) { m = Math.max(0, Math.round(m)); return m < 60 ? m + " min" : Math.floor(m / 60) + " h " + (m % 60 ? (m % 60) + " min" : ""); }
function cinLoad(force) { return __ZC(139, 3, this, arguments, new.target); }
function cinFeedPoll() { return __ZC(139, 4, this, arguments, new.target); }
var CIN_W = 40, CIN_D = 36, CIN_H = 7, CIN_ZA = 3;
function cinIsHouse(spec) { return !!(spec && (spec.workplace === CIN_KEY || spec.label === CIN_KEY) && spec.city); }
function cinAudX(i) { return -CIN_W / 2 + 8 * (i + 0.5); }
function makeCinemaInterior(spec) { return __ZC(139, 5, this, arguments, new.target); }
function cinBoardPaint(i) { return __ZC(139, 6, this, arguments, new.target); }
function cinScreenPaint(i) { return __ZC(139, 7, this, arguments, new.target); }
function cinPosterPaint(f, j) { return __ZC(139, 8, this, arguments, new.target); }
function cinBoards(force) {
if (!(typeof INT !== "undefined" && INT && INT.cinema))
return;
if (!force && Date.now() - CIN.boardAt < 15000)
return;
CIN.boardAt = Date.now();
INT.cinema.boards.forEach(function (b) { b.paint(); });
INT.cinema.screens.forEach(function (s) { s.paint(); });
}
function cinWhere() {
if (!(typeof INT !== "undefined" && INT && INT.cinema))
return null;
var lx = camera.position.x - INT.ox, lz = camera.position.z - INT.oz;
if (lz > CIN_ZA)
return -1;
return Math.max(0, Math.min(4, Math.floor((lx + CIN_W / 2) / 8)));
}
function cinHasTicket(n) { var t = CIN.tickets[n]; return !!(t && t > Date.now()); }
function cinBuy(n) { return __ZC(139, 9, this, arguments, new.target); }
function cinSnack(k) {
if (!(typeof signedIn === "function" && signedIn())) {
setStatus("Sign in to buy at the counter.");
return;
}
cityRpc("cinema_snack", { p_item: k }).then(function (o) { setStatus(esc((o && o.say) || "")); }).catch(function (e) { setStatus(esc(e.message || String(e))); });
}
function cinWatch(i) { return __ZC(139, 10, this, arguments, new.target); }
function cinStand() { CIN.watching = null; setStatus("You get up from your seat."); }
function cinPaint() { return __ZC(139, 11, this, arguments, new.target); }
function cinMayProgramme() { return (typeof amKeeper === "function" && amKeeper()) || hallOnJob([1610, 1615]); }
addEventListener("click", function (e) {
var b = e.target && e.target.closest ? e.target.closest("[data-cin]") : null;
if (!b)
return;
var a = b.getAttribute("data-cin").split(":");
if (a[0] === "buy")
cinBuy(+a[1]);
else if (a[0] === "snack")
cinSnack(a[1]);
else if (a[0] === "watch")
cinWatch(+a[1]);
else if (a[0] === "prog")
cinProgramme();
});
function cinProgramme() { return __ZC(139, 12, this, arguments, new.target); }
(function () {
if (typeof makeInterior === "function") {
var mi = makeInterior;
makeInterior = function (spec) {
if (cinIsHouse(spec)) {
try {
return makeCinemaInterior(spec);
}
catch (e) {
if (window.console)
console.warn("picture house:", e);
}
}
return mi.apply(this, arguments);
};
}
if (typeof enterBuilding === "function") {
var eb = enterBuilding;
enterBuilding = function (spec) {
eb.apply(this, arguments);
if (typeof INT !== "undefined" && INT && INT.cinema) {
cinLoad(false);
cinBoards(true);
cinPaint();
setStatus("<b>Inside the Picture House.</b> Buy a ticket at the box office, then find your screen: each board over a door says what is on.");
}
};
}
if (typeof exitInterior === "function") {
var ex = exitInterior;
exitInterior = function () { var was = typeof INT !== "undefined" && INT && INT.cinema; ex.apply(this, arguments); if (was) {
hallViewerClose();
var el = document.getElementById("cin-panel");
if (el)
el.style.display = "none";
} };
}
if (typeof interiorTick === "function") {
var it = interiorTick, lastW = null, t = 0;
interiorTick = function (dt) {
it.apply(this, arguments);
try {
if (typeof INT !== "undefined" && INT && INT.cinema) {
cinBoards(false);
var w = cinWhere();
t += dt;
if (w !== lastW || t > 5) {
lastW = w;
t = 0;
cinPaint();
}
}
else if (lastW !== null) {
lastW = null;
var el = document.getElementById("cin-panel");
if (el)
el.style.display = "none";
}
}
catch (e) {
if (window.console && !CIN.warned) {
CIN.warned = true;
console.warn("picture house:", e);
}
}
};
}
})();
(function () {
var done = false;
function mark() {
if (done)
return;
var o = cityPlaceOf(CIN_KEY);
if (!o)
return;
done = true;
var r = o.rot || 0, x = o.x + Math.sin(r) * 14, z = o.z + Math.cos(r) * 14;
if (typeof nightGlowSpot === "function")
nightGlowSpot("cinema-marquee", { x: x, y: ((typeof terrainY === "function") ? terrainY(x, z) : 0) + 5, z: z, col: 0xFFD27A, k: 2.2, r: 26, pri: 0.6 });
}
if (typeof transitTick === "function") {
var tt = transitTick, acc = 0;
transitTick = function (dt) { tt.apply(this, arguments); if (!done && (acc += dt) > 3) {
acc = 0;
try {
mark();
}
catch (e) { }
} };
}
})();
CIN.enter = function () { var s = cityPlaceOf(CIN_KEY); if (!s)
return false; if (!walkMode && typeof setWalk === "function")
setWalk(true); enterBuilding(s); return !!(typeof INT !== "undefined" && INT && INT.cinema); };
var CINL = { vid: null, key: null, tex: null, ok: false, src: {}, asked: {}, bar: null, seat: null, syncAt: 0, audAt: 0, beams: null };
function cinSrc(id, cb) { return __ZC(139, 13, this, arguments, new.target); }
function cinVidStop() { return __ZC(139, 14, this, arguments, new.target); }
function cinFeedVid(i, fs) { return __ZC(139, 15, this, arguments, new.target); }
function cinVidFor(i, sc, now) { return __ZC(139, 16, this, arguments, new.target); }
function cinBeams() { return __ZC(139, 17, this, arguments, new.target); }
function cinAudience() { return __ZC(139, 18, this, arguments, new.target); }
function cinSeatBar(on) { return __ZC(139, 19, this, arguments, new.target); }
function cinFullMp4(url, f, at) { return __ZC(139, 20, this, arguments, new.target); }
function cinLeaveSeat() {
if (CINL.vid)
CINL.vid.muted = true;
CINL.seat = null;
cinSeatBar(false);
cinStand();
}
(function () {
var cw = cinWatch;
cinWatch = function (i) {
var sc = cinScreens()[i], now = sc && cinNow(sc);
if (sc && now && now.showing && !cinFeedScreen(sc.n) && cinHasTicket(sc.n) && CINL.ok && CINL.key === i + "|" + now.film.id) {
var xc = cinAudX(i);
CINL.seat = { i: i, x: xc + 0.55, z: -CIN_D / 2 + 5 + 4 * 1.45 };
camera.position.x = INT.ox + CINL.seat.x;
camera.position.z = INT.oz + CINL.seat.z;
yaw = 0;
if (typeof pitch !== "undefined")
pitch = 0.08;
CIN.watching = { i: i, n: sc.n, id: now.film.id };
CINL.vid.muted = false;
CINL.vid.volume = 0.7;
cinSeatBar(true);
setStatus("<b>You take your seat.</b> " + esc(now.film.title) + " is on the screen.");
return;
}
return cw.apply(this, arguments);
};
var it = interiorTick;
interiorTick = function (dt) {
it.apply(this, arguments);
try {
var inCin = typeof INT !== "undefined" && INT && INT.cinema;
if (!inCin) {
if (CINL.key)
cinVidStop();
if (CINL.bar)
cinSeatBar(false);
CINL.seat = null;
return;
}
var w = cinWhere(), list = cinScreens(), B = cinBeams(), t = performance.now() / 1000;
list.forEach(function (sc, i) {
var now = cinNow(sc), on = !!(now && now.showing), b = B[i];
if (!b)
return;
b.beam.visible = on;
b.lamp.visible = on;
if (b.dust)
b.dust.visible = on && w === i;
if (on) {
b.beam.material.opacity = 0.05;
if (b.dust && b.dust.visible && typeof swirl === "function")
swirl(b.dust, dt, 0.05, 0.08, false);
}
var S = INT.cinema.screens[i];
if (S && S.light)
S.light.intensity = on ? 0.55 : 0.2;
});
if (w >= 0 && list[w]) {
var now = cinNow(list[w]);
var fsw = cinFeedScreen(list[w].n);
if (fsw && fsw.mp4)
cinFeedVid(w, fsw);
else if (now && now.showing && !fsw)
cinVidFor(w, list[w], now);
else if (CINL.key)
cinVidStop();
}
else if (CINL.key && !CIN.watching)
cinVidStop();
if (CINL.vid && CINL.ok && (CINL.syncAt -= dt) <= 0) {
CINL.syncAt = 8;
var k = CINL.key.split("|"), n2 = cinNow(list[+k[0]]);
if (n2 && n2.showing && Math.abs(CINL.vid.currentTime - n2.into * 60) > 5)
try {
CINL.vid.currentTime = n2.into * 60;
}
catch (e) { }
if (CINL.vid.paused) {
var p = CINL.vid.play();
if (p && p.catch)
p.catch(function () { });
}
}
if (CINL.seat && Math.hypot(camera.position.x - INT.ox - CINL.seat.x, camera.position.z - INT.oz - CINL.seat.z) > 2.2)
cinLeaveSeat();
if ((CINL.audAt -= dt) <= 0) {
CINL.audAt = 20;
cinAudience();
}
}
catch (e) {
if (window.console && !CINL.warned) {
CINL.warned = 1;
console.warn("picture house films:", e);
}
}
};
var ec = exitInterior;
exitInterior = function () { cinVidStop(); cinSeatBar(false); CINL.seat = null; CINL.beams = null; return ec.apply(this, arguments); };
})();
