/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var FEST = { halos: [], st: null, at: 0, busy: false, start: null, days: 14, group: null, mid: null, cell: null, street: null, built: false, open: false, tab: "today",
fw: [], fwAt: 0, lanterns: [], parade: null, ride: null, game: null, near: null, masks: null, maskG: null, local: null, preview: false, msg: "", lit: 0, anim: [], warned: false };
var FEST_OFF = "2000-01-01T00:00:00Z";
var FEST_THEMES = ["Grand Opening Night", "Night of a Thousand Lanterns", "The Dragon Parade", "The Masquerade of Masks", "Starfall Night", "Feast of the Harvest Moon",
"The Midweek Bacchanal", "Carnival of Colours", "Night of the Fire Dancers", "Mermaids and Sea Shanties", "Circus of Wonders", "A Night of Music", "Lantern Wish Night", "The Grand Finale"];
var FEST_PROGRAM = [[10, "The Midway opens: games, rides and food carts. The daily hunt opens"], [11, "Civic Ring Parade"], [11.5, "Classical set: Musopen performers, on the Midway stage"],
[12, "The Parade of Dreams winds round the Tower"], [13, "High Ring Parade"], [14, "Temple Row Parade"], [14.5, "Carnival set: Kevin MacLeod, on the Midway stage"],
[15, "Market Ring Parade, and the Circus of Wonders in the big top"], [16, "Commons Parade"], [17, "Harvest Ring Parade"], [17.5, "Acoustic set: Josh Woodward, on the Midway stage"],
[19, "The Lantern Parade round the Tower"], [20, "Fire dancers to Jason Shaw's music, till eleven"], [21, "Fireworks over the Tower"],
[22, "The daily hunt closes. The Bacchus Procession goes round every ring but the Warrens: the Bacchanal, till two"], [22.5, "The Keeper reads out the day's winners from the Prize Board"], [0, "Midnight fireworks"]];
function festHM(h) { var H = Math.floor(h), M = Math.round((h - H) * 60); return (H < 10 ? "0" : "") + H + ":" + (M < 10 ? "0" : "") + M; }
function festNowItem() { var h = dreamHour(); if (h >= 2 && h < 10)
return null; var hh = h < 2 ? h + 24 : h, best = null; FEST_PROGRAM.forEach(function (p) { var t = p[0] < 2 ? p[0] + 24 : p[0]; if (t <= hh && (!best || t > best.t))
best = { t: t, p: p }; }); return best && best.p; }
var FEST_COLS = [0xFF3A5A, 0xFFC83A, 0x3AE8FF, 0x8AFF5A, 0xC86AFF, 0xFF8A2A, 0xFFFFFF];
var FEST_FORTUNES = ["A door you have walked past a hundred times will open.", "Someone is about to write you a letter. Check your mailbox.", "You will learn something at the Academy that surprises you.",
"The thing you lost is closer than you think.", "Tonight, look up at nine o'clock.", "A stranger in a mask is a friend you have not met.", "Your luck at the Ring of Stars is about to turn.",
"A dragon will remember your kindness.", "The Tower sees you. It approves.", "Ask the librarian about the book nobody reads.", "You will dream of water, and it will be kind to you.",
"Fortune favours the dreamer who keeps walking.", "A golden mask is hidden where the market sleeps.", "Something small you do today will be talked about in the Gazette.",
"The carousel knows your name.", "You will win, but not the prize you expected.", "Count your fingers tonight. Just in case.", "A song you have forgotten will find you again.",
"The stars over the Midway are arranged for you this evening.", "Generosity returns, like a boomerang made of light.", "You will find the secret behind a bookcase.",
"Beware of puddles that reflect the wrong sky.", "A cat will choose you.", "The thirteenth mask is the hardest. Do not give up at twelve."];
function festLoad(force) {
if (FEST.busy || (!force && Date.now() - FEST.at < 120000))
return;
FEST.busy = true;
FEST.at = Date.now();
var signed = typeof signedIn === "function" && signedIn();
var p = signed ? cityRpc("fest_state", {}) : (typeof carePublicRpc === "function" ? carePublicRpc("fest_state") : Promise.resolve(null));
p.then(function (s) { FEST.busy = false; if (s && typeof s === "object" && (s.start || s.on !== undefined)) {
FEST.st = s;
if (s.start)
FEST.start = new Date(s.start);
FEST.days = +s.days || 14;
festPaint();
}
else
festLocalStart(); })
.catch(function () { FEST.busy = false; festLocalStart(); });
}
function festLocalStart() {
if (FEST.start)
return;
FEST.start = new Date(FEST_OFF);
FEST.days = 1;
}
function festNow() { return Date.now(); }
function festOn() {
if (FEST.preview)
return true;
if (!FEST.start)
festLocalStart();
var t = festNow(), s = FEST.start.getTime();
return t >= s && t < s + FEST.days * 86400000;
}
function festDay() { if (!FEST.start)
festLocalStart(); return Math.max(1, Math.min(FEST.days, Math.floor((festNow() - FEST.start.getTime()) / 86400000) + 1)); }
function festLeft() { return Math.max(0, FEST.start.getTime() + FEST.days * 86400000 - festNow()); }
function festNight() { var h = dreamHour(); return typeof daylight === "function" ? daylight(h) < 0.45 : (h > 19 || h < 6); }
function festFinale() { return festDay() === FEST.days; }
function festShow() {
var h = dreamHour();
if (h >= 21 && h < (festFinale() ? 21.5 : 21.25))
return 2;
if (h >= 0 && h < 0.17)
return 2;
if (festNight() && (h >= 19.5 || h < 2))
return 1;
return 0;
}
function festParadeNow() { var h = dreamHour(); return (h >= 12 && h < 12 + 1 / 3) ? "noon" : (h >= 19 && h < 19 + 1 / 3) ? "evening" : null; }
function festLocal() {
if (FEST.local)
return FEST.local;
try {
FEST.local = JSON.parse(localStorage.getItem("somnu_fest") || "null");
}
catch (e) { }
if (!FEST.local || typeof FEST.local !== "object")
FEST.local = { tickets: 0, masks: [], day: "", today: 0 };
return FEST.local;
}
function festLocalSave() { try {
localStorage.setItem("somnu_fest", JSON.stringify(FEST.local));
}
catch (e) { } }
function festSigned() { return typeof signedIn === "function" && signedIn(); }
function festTickets() { return festSigned() && FEST.st && FEST.st.signed ? (+FEST.st.tickets || 0) : festLocal().tickets; }
function festMasks() { return festSigned() && FEST.st && FEST.st.signed ? (FEST.st.masks || []) : festLocal().masks; }
function festPlay(game, score) { return __ZC(170, 0, this, arguments, new.target); }
function festStand() { return __ZC(170, 1, this, arguments, new.target); }
var FEST_PIECES = [["wheel", 13], ["carousel", 8.5], ["bigtop", 13], ["stage", 7.5], ["rings", 3], ["lanterns", 3], ["hammer", 3], ["wheelw", 3], ["ducks", 3], ["fortune", 3], ["prizes", 3.5], ["tickets", 3], ["food", 2.5], ["food", 2.5], ["food", 2.5], ["balloons", 2]];
function festLayout() { return __ZC(170, 2, this, arguments, new.target); }
function fM(c, kind) { return tlm(c, kind); }
function fBulb() { return FEST.bulbGeo || (FEST.bulbGeo = new THREE.SphereGeometry(0.11, 6, 4)); }
function festBulbs(list, parent) { return __ZC(170, 3, this, arguments, new.target); }
function festGlowTex() { return __ZC(170, 4, this, arguments, new.target); }
function festHaloTick(night) { return __ZC(170, 5, this, arguments, new.target); }
function festBulbTick(IM, t, night) { return __ZC(170, 6, this, arguments, new.target); }
function festCanvasSign(txt, sub, w, h, bg, fg) { return __ZC(170, 7, this, arguments, new.target); }
function festFit(g, txt, x, y, maxW, pre, px, post, col) {
var t = String(txt || "");
g.font = pre + px + post;
while (px > 10 && g.measureText(t).width > maxW) {
px -= 2;
g.font = pre + px + post;
}
hallText(g, t, x, y, maxW, pre + px + post, col);
}
function festTwoFace(geo, mat) {
var g = new THREE.Group();
mat.side = THREE.FrontSide;
var a = new THREE.Mesh(geo, mat), b = new THREE.Mesh(geo, mat);
b.rotation.y = Math.PI;
a.position.z = 0.004;
b.position.z = -0.004;
a.raycast = b.raycast = function () { };
g.add(a);
g.add(b);
g.raycast = function () { };
return g;
}
function festSignMesh(txt, sub, w, h) { var sc = festCanvasSign(txt, sub); return festTwoFace(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ map: sc.tex })); }
function festStripes(c1, c2, n) {
var cv = hallCanvas(256, 64, function (g, w, h) { for (var i = 0; i < n; i++) {
g.fillStyle = i % 2 ? c2 : c1;
g.fillRect(i * w / n, 0, w / n + 1, h);
} });
cv.tex.wrapS = THREE.RepeatWrapping;
return cv.tex;
}
function festMergeVC(root, skip) { return __ZC(170, 8, this, arguments, new.target); }
function festWheel(P) { return __ZC(170, 9, this, arguments, new.target); }
function festCarousel(P) { return __ZC(170, 10, this, arguments, new.target); }
function festBigTop() { return __ZC(170, 11, this, arguments, new.target); }
function festStage(P) { return __ZC(170, 12, this, arguments, new.target); }
var FEST_BOOTHS = { rings: ["RING OF STARS", "toss a ring, win tickets", "#2A5AC8"], lanterns: ["THE LANTERN GALLERY", "pop the lanterns", "#C8282A"], hammer: ["THE DRAGON'S HAMMER", "ring the bell", "#2A8A3A"],
wheelw: ["WHEEL OF WONDERS", "spin to win", "#8A2AC8"], ducks: ["THE DUCK POND", "pick a duck", "#2A9AB8"], fortune: ["MADAME ZELDA", "your fortune told", "#5A1A6A"], prizes: ["THE PRIZE BOOTH", "trade your tickets", "#C8A02A"], tickets: ["TICKETS & PROGRAMME", "the fourteen days", "#C84A8A"] };
function festBooth(kind) { return __ZC(170, 13, this, arguments, new.target); }
function festFood(i) { return __ZC(170, 14, this, arguments, new.target); }
function festBalloons() { return __ZC(170, 15, this, arguments, new.target); }
function festBuildMidway() { return __ZC(170, 16, this, arguments, new.target); }
function festArch(w, txt, sub) { return __ZC(170, 17, this, arguments, new.target); }
function festKeeper(p) { return __ZC(170, 18, this, arguments, new.target); }
function festDropStreet(OLD) { return __ZC(170, 19, this, arguments, new.target); }
var FEST_RINGS = [245, 430, 565, 740, 880, 1080, 1280, 1420, 1620, 1790];
function festBuildStreets(P) { return __ZC(170, 20, this, arguments, new.target); }
function festFireworksMake() { return __ZC(170, 21, this, arguments, new.target); }
function festBurst(x, y, z, big) { return __ZC(170, 22, this, arguments, new.target); }
function festFireworksTick(dt) { return __ZC(170, 23, this, arguments, new.target); }
function careInCityLoose() { return typeof careInCity === "function" && careInCity(); }
function festParadeTick(dt, t) {
var when = festParadeNow(), on = !!when && festOn() && careInCityLoose();
if (!on) {
if (FEST.parade) {
FEST.parade.g.parent && FEST.parade.g.parent.remove(FEST.parade.g);
FEST.parade = null;
}
return;
}
var P = camera.position;
if (Math.hypot(P.x - ATLC.x, P.z - ATLC.z) > 500)
return;
if (!FEST.parade)
festParadeMake(when);
var D = FEST.parade, R = D.R, base = D.a0 + ((dreamHour() - (when === "noon" ? 12 : 19)) * 60 * 60) * 0.012;
D.walkers.forEach(function (w, i) {
var a = base - i * 0.045, x = ATLC.x + Math.cos(a) * R, z = ATLC.z + Math.sin(a) * R;
w.g.position.set(x, terrainY(x, z) + (w.lift || 0), z);
w.g.rotation.y = Math.atan2(-Math.sin(a), Math.cos(a));
var lm = w.g.userData.limbs;
if (lm) {
var s = Math.sin(t * 6 + i);
if (lm.ll)
lm.ll.rotation.x = s * 0.5;
if (lm.rl)
lm.rl.rotation.x = -s * 0.5;
if (lm.la)
lm.la.rotation.x = w.drum ? -1.2 + Math.abs(s) * 0.4 : -s * 0.6 - (w.wave ? 1.6 : 0);
if (lm.ra)
lm.ra.rotation.x = w.drum ? -1.2 + Math.abs(Math.cos(t * 6 + i)) * 0.4 : s * 0.6;
}
});
D.dragon.forEach(function (seg, k) {
var a = base - (D.walkers.length + 2) * 0.045 - k * 0.012, x = ATLC.x + Math.cos(a) * R, z = ATLC.z + Math.sin(a) * R;
seg.position.set(x, terrainY(x, z) + 2.2 + Math.sin(t * 3 - k * 0.6) * 0.6, z);
seg.rotation.y = Math.atan2(-Math.sin(a), Math.cos(a));
});
var near = false;
D.walkers.forEach(function (w) { if (Math.hypot(w.g.position.x - P.x, w.g.position.z - P.z) < 18)
near = true; });
D.near = near;
}
function festParadeMake(when) { return __ZC(170, 24, this, arguments, new.target); }
function festParadeRadius() { return __ZC(170, 25, this, arguments, new.target); }
function festMaskSpots() { return __ZC(170, 26, this, arguments, new.target); }
var FEST_QNAME = { plaza: "the Tower Plaza", civic: "the Civic Ring", estates: "the High Ring", temples: "Temple Row", markets: "the Market Ring", commons: "the Commons", warrens: "the Warrens", harvest: "the Harvest Ring" };
function festMaskMesh() { return __ZC(170, 27, this, arguments, new.target); }
function festMasksTick(t) {
var on = festOn() && careInCityLoose();
if (!on) {
if (FEST.maskG) {
FEST.maskG.parent && FEST.maskG.parent.remove(FEST.maskG);
FEST.maskG = null;
}
return;
}
if (!FEST.maskG) {
FEST.maskG = new THREE.Group();
FEST.maskG.name = "golden masks";
scene.add(FEST.maskG);
FEST.maskM = {};
}
var have = festMasks(), P = camera.position;
festMaskSpots().forEach(function (m) {
var got = have.indexOf(m.n) >= 0, mesh = FEST.maskM[m.n];
if (got) {
if (mesh) {
FEST.maskG.remove(mesh);
delete FEST.maskM[m.n];
}
return;
}
var d = Math.hypot(m.x - P.x, m.z - P.z);
if (d > 260) {
if (mesh)
mesh.visible = false;
return;
}
if (!mesh) {
mesh = festMaskMesh();
mesh.position.set(m.x, terrainY(m.x, m.z) + 1.6, m.z);
FEST.maskG.add(mesh);
FEST.maskM[m.n] = mesh;
}
mesh.visible = true;
mesh.rotation.y = t * 1.2 + m.n;
mesh.position.y = terrainY(m.x, m.z) + 1.6 + Math.sin(t * 2 + m.n) * 0.15;
mesh.userData.halo.rotation.x = t;
if (d < 2.6 && !FEST.maskBusy) {
festMaskFind(m);
}
});
}
function festMaskFind(m) { return __ZC(170, 28, this, arguments, new.target); }
function festRide(kind) { return __ZC(170, 29, this, arguments, new.target); }
function festRideTick(dt) { return __ZC(170, 30, this, arguments, new.target); }
function festRideOff() { return __ZC(170, 31, this, arguments, new.target); }
addEventListener("click", function (e) { var b = e.target && e.target.closest ? e.target.closest("[data-festoff]") : null; if (b) {
e.preventDefault();
festRideOff();
} });
function festGameEl() { return __ZC(170, 32, this, arguments, new.target); }
if (typeof backRegister === "function")
backRegister({ order: 1, open: function () { var el = document.getElementById("fest-game"); return !!(FEST.game && el && el.style.display !== "none"); }, close: festGameClose });
function festGameClose() { if (FEST.game && FEST.game.stop)
FEST.game.stop(); FEST.game = null; var el = document.getElementById("fest-game"); if (el) {
el.style.display = "none";
el.innerHTML = "";
} }
function festBox(title, col, inner) { return __ZC(170, 33, this, arguments, new.target); }
function festResult(o) { return __ZC(170, 34, this, arguments, new.target); }
function festGame(kind) { return __ZC(170, 35, this, arguments, new.target); }
function festPrizes(el, B) { return __ZC(170, 36, this, arguments, new.target); }
addEventListener("click", function (e) {
var t = e.target && e.target.closest ? e.target : null;
if (!t)
return;
var b;
if ((b = t.closest("[data-fgx]"))) {
festGameClose();
return;
}
if ((b = t.closest("[data-fprize]"))) {
var id = +b.getAttribute("data-fprize");
b.disabled = true;
cityRpc("fest_redeem", { p_prize: id }).then(function (o) {
if (o && o.ok && FEST.st)
FEST.st.tickets = o.tickets;
var r = document.getElementById("fg-res");
if (r)
r.innerHTML = o && o.ok ? '<b style="color:#9AFFA0">' + esc(o.say) + '</b>' : '<span style="color:#FFB89A">' + esc((o && o.say) || "No.") + '</span>';
if (o && o.ok) {
setStatus("<b>" + esc(o.say) + "</b> It is in your backpack.");
try {
if (typeof loadThings === "function")
loadThings();
if (typeof renderWardrobe === "function")
renderWardrobe._loaded = 0;
}
catch (e) { }
setTimeout(function () { if (FEST.game && FEST.game.kind === "prizes")
festPrizes(festGameEl(), FEST_BOOTHS.prizes); }, 1200);
}
festPaint();
})
.catch(function (err) { var r = document.getElementById("fg-res"); if (r)
r.textContent = String(err && err.message || err); });
return;
}
if ((b = t.closest("[data-fplay]"))) {
var k = b.getAttribute("data-fplay");
if (k === "wheel" || k === "carousel")
festRide(k);
else
festGame(k);
return;
}
if ((b = t.closest("[data-fest]"))) {
var a = b.getAttribute("data-fest");
if (a === "go") {
if (typeof guideTo !== "undefined" && ATLC) {
var w = (FEST.layout || []).filter(function (q) { return q.kind === "wheel"; })[0];
guideTo = { key: "the Midway", x: w ? w.x : ATLC.x, z: w ? w.z : ATLC.z };
}
setStatus("<b>The Midway, round the Tower.</b> Follow the pointer.");
}
else if (a === "cheer" && typeof festCheer === "function" && festCheer()) { }
else if (a === "cheer") {
festPlay("parade", 0).then(function (o) { setStatus(o && o.ok ? "<b>You cheer the parade!</b> " + o.won + " tickets." : esc((o && o.say) || "")); festPaint(); });
}
else if (a === "preview") {
FEST.preview = !FEST.preview;
festPaint();
}
else if (a === "restart") {
cityRpc("fest_set", { p_start: new Date().toISOString(), p_days: 14 }).then(function (o) { FEST.msg = (o && o.say) || "Done."; festLoad(true); festPaint(); }).catch(function (err) { FEST.msg = String(err && err.message || err); festPaint(); });
}
else if (a === "off") {
FEST.preview = false;
cityRpc("fest_set", { p_start: FEST_OFF, p_days: 1 }).then(function (o) { FEST.msg = o && o.ok ? "The Extravaganza is off for everyone: the Midway, decorations, parades and fireworks are gone. Start it again with the button above." : ((o && o.say) || "Done."); festLoad(true); festPaint(); }).catch(function (err) { FEST.msg = String(err && err.message || err); festPaint(); });
}
else if (a.indexOf("tab:") === 0) {
FEST.tab = a.slice(4);
festPaint();
}
else if (a === "close") {
FEST.open = false;
festPaint();
}
return;
}
});
function festButton() {
var show = festOn() && (careInCityLoose() || (typeof amKeeper === "function" && amKeeper() && typeof careInCity === "function" && ATLC));
var keeperOnly = !festOn() && typeof amKeeper === "function" && amKeeper() && careInCityLoose();
var b = document.getElementById("fest-btn");
if (!b) {
if (!(show || keeperOnly) || !document.body)
return;
b = document.createElement("button");
b.id = "fest-btn";
b.type = "button";
b.innerHTML = "✦ Extravaganza";
b.style.cssText = "position:fixed;right:12px;bottom:calc(140px + env(safe-area-inset-bottom,0px));z-index:45;background:linear-gradient(90deg,#5A1A7A,#A82A6A);color:#FFF4D0;border:1px solid #FFD040;border-radius:3px;padding:9px 13px;font:13px var(--sans);cursor:pointer;box-shadow:0 0 14px rgba(255,200,80,.35)";
b.onclick = function () { FEST.open = !FEST.open; if (FEST.open)
festLoad(true); festPaint(); };
document.body.appendChild(b);
}
b.style.display = (show || keeperOnly) ? "block" : "none";
if (!(show || keeperOnly) && FEST.open) {
FEST.open = false;
festPaint();
}
}
function festDur(ms) { var d = Math.floor(ms / 86400000), h = Math.floor(ms % 86400000 / 3600000), m = Math.floor(ms % 3600000 / 60000); return d ? d + " day" + (d === 1 ? "" : "s") + " " + h + " h" : h ? h + " h " + m + " min" : m + " min"; }
function festNext() {
var h = dreamHour(), best = null;
FEST_PROGRAM.forEach(function (p) { var d = (p[0] - h + 24) % 24; if (d > 0.001 && (!best || d < best.d))
best = { d: d, p: p }; });
return best;
}
function festPaint() { return __ZC(170, 37, this, arguments, new.target); }
function festNearTick() { return __ZC(170, 38, this, arguments, new.target); }
function festNearPanel(p) {
var key = p ? p.kind + p.i : "";
if (key === FEST.near)
return;
FEST.near = key;
var el = hallPanel("fest-near", "#FFD040");
if (!el)
return;
if (!p || FEST.ride) {
el.style.display = "none";
return;
}
var B = FEST_BOOTHS[p.kind], h;
if (p.kind === "wheel")
h = '<h4 style="color:#FFD040">The Great Wheel</h4><div class="dim">Thirty metres up, sixteen gondolas, the whole of Somnucor below. Free, for everyone.</div><div class="row"><button class="btn" data-fplay="wheel">Ride the wheel</button></div>';
else if (p.kind === "carousel")
h = '<h4 style="color:#FFD040">The Carousel</h4><div class="dim">Horses and unicorns, round and round. Free, for everyone.</div><div class="row"><button class="btn" data-fplay="carousel">Ride the carousel</button></div>';
else
h = '<h4 style="color:#FFD040">' + esc(B[0].charAt(0) + B[0].slice(1).toLowerCase()) + '</h4><div class="dim">' + esc(B[1]) + '. You have ' + festTickets() + ' tickets.</div><div class="row"><button class="btn" data-fplay="' + p.kind + '">' + (p.kind === "prizes" ? "See the prizes" : p.kind === "tickets" ? "The programme" : "Play") + '</button></div>';
el.innerHTML = h;
el.style.display = "block";
}
function festTick(dt) {
festLoad(false);
var inCity = careInCityLoose(), on = festOn();
FEST.fr = (FEST.fr || 0) + 1;
festButton();
if (!ATLC || !on || !inCity) {
if (FEST.mid && (!on || !ATLC)) {
FEST.mid.parent && FEST.mid.parent.remove(FEST.mid);
FEST.mid = null;
FEST.anim = [];
FEST.layout = null;
}
if (FEST.street) {
FEST.street.parent && FEST.street.parent.remove(FEST.street);
festDropStreet(FEST.street);
FEST.street = null;
FEST.cell = null;
}
if (FEST.mid)
FEST.mid.visible = false;
festMasksTick(0);
festParadeTick(dt, 0);
if (FEST.fwP)
FEST.fwP.visible = false;
if (FEST.ride)
FEST.ride = null;
festNearPanel(null);
return;
}
var P = camera.position, t = performance.now() / 1000, night = festNight();
if (!FEST.mid)
festBuildMidway();
FEST.mid.visible = true;
var lite = typeof LITE !== "undefined" && LITE, far = lite ? 55 : 90;
if (!FEST.street || !FEST.cell || (!FEST.ride && Math.hypot(P.x - FEST.cell.x, P.z - FEST.cell.z) > far)) {
FEST.cell = { x: P.x, z: P.z };
festBuildStreets(P);
}
for (var i = 0; i < FEST.anim.length; i++)
FEST.anim[i](t, dt, night);
if (FEST.streetBulbs && FEST.fr % 4 === 3)
festBulbTick(FEST.streetBulbs, t, night);
festHaloTick(night);
(FEST.search || []).forEach(function (s) { s.piv.visible = night; if (night) {
s.piv.rotation.z = Math.sin(t * 0.3 + s.p) * 0.5;
s.piv.rotation.x = Math.cos(t * 0.23 + s.p) * 0.4;
} });
if (FEST.lanternG) {
FEST.lanternG.visible = night;
if (night) {
var base = terrainY(ATLC.x, ATLC.z);
FEST.lanterns.forEach(function (l) { l.t += dt; var y = (l.t * 2.2) % 180; l.m.position.set(ATLC.x + Math.cos(l.a + l.t * 0.01) * l.r, base + 8 + y, ATLC.z + Math.sin(l.a + l.t * 0.01) * l.r); l.m.material.opacity = y > 150 ? (180 - y) / 30 : 0.95; });
}
}
festFireworksTick(dt);
festParadeTick(dt, t);
festMasksTick(t);
festRideTick(dt);
festNearTick();
if (FEST.open && FEST.fr % 60 === 0)
festPaint();
}
(function () {
if (typeof transitTick !== "function")
return;
var tt = transitTick;
transitTick = function (dt) { tt.apply(this, arguments); try {
festTick(dt);
}
catch (e) {
if (window.console && !FEST.warned) {
FEST.warned = true;
console.warn("extravaganza:", e);
}
} };
})();
(function () {
if (typeof blockedAt !== "function")
return;
var ba = blockedAt;
blockedAt = function (x, z, feet) {
if (FEST.solids && FEST.mid && FEST.mid.visible && !store.inside && !FEST.ride) {
var P = camera.position;
for (var i = 0; i < FEST.solids.length; i++) {
var s = FEST.solids[i];
if (Math.abs(x - s.x) < s.r && Math.abs(z - s.z) < s.r) {
var dn = Math.hypot(x - s.x, z - s.z);
if (dn < s.r && !(Math.hypot(P.x - s.x, P.z - s.z) < s.r && dn >= Math.hypot(P.x - s.x, P.z - s.z)))
return true;
}
}
}
return ba.apply(this, arguments);
};
})();
