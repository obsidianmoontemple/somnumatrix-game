/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
function festCrescent(r) {
var d = 0.5 * r, r2 = 0.833 * r, x = (d * d + r * r - r2 * r2) / (2 * d), y = Math.sqrt(Math.max(0, r * r - x * x)), sh = new THREE.Shape();
var a1 = Math.atan2(y, x), b1 = Math.atan2(-y, x - d), b2 = Math.atan2(y, x - d);
sh.absarc(0, 0, r, a1, 2 * Math.PI - a1, false);
sh.absarc(d, 0, r2, b1, b2, true);
return sh;
}
var FEST_QRINGS = { plaza: [112, 140], civic: [245], estates: [430, 565], temples: [740, 880], markets: [1080], commons: [1280, 1420], harvest: [1790] };
var FEST_RPAR = [{ h: 11, q: "civic", R: 245, name: "Civic Ring" }, { h: 13, q: "estates", R: 430, name: "High Ring" }, { h: 14, q: "temples", R: 740, name: "Temple Row" },
{ h: 15, q: "markets", R: 1080, name: "Market Ring" }, { h: 16, q: "commons", R: 1280, name: "Commons" }, { h: 17, q: "harvest", R: 1790, name: "Harvest Ring" }];
var FEST_HUNTS = [["The Seven Keys of Somnucor", "key", ["plaza"], "keys"], ["Lost Lanterns", "lantern", ["civic"], "lanterns"], ["Dragon Eggs", "egg", ["estates"], "dragon eggs"],
["Masks of the Revels", "mask", ["temples"], "masks"], ["Fallen Stars", "star", ["markets"], "fallen stars"], ["Harvest Moons", "moon", ["harvest"], "harvest moons"],
["Golden Grapes", "grapes", ["commons"], "golden grapes"], ["Paint Pots", "paint", ["markets"], "paint pots"], ["Fire Opals", "opal", ["civic"], "fire opals"],
["Mermaid Pearls", "pearl", ["harvest"], "mermaid pearls"], ["Circus Tickets", "ticket", ["commons"], "circus tickets"], ["Lost Music Notes", "note", ["temples"], "music notes"],
["Wishing Stones", "stone", ["estates"], "wishing stones"], ["Crowns of the Finale", "crown", ["plaza", "civic", "estates", "temples", "markets", "commons", "harvest"], "crowns"]];
var FEST_SPECIAL = ["The Keeper opens the Extravaganza at 10:00; the first fireworks show", "Sky lanterns rise over the Plaza all evening", "The great dragon float leads every parade",
"Best Masquerade Costume, judged by the Keeper at 20:30", "A slow, soft star shower after the fireworks", "Feast tables in the Harvest Ring from 18:00",
"The Bacchanal starts at 20:00, two hours early", "Colour-themed floats and costumes", "A second fire dancers' show at 16:30", "Sea shanty singers at the docks at 18:00",
"Two extra circus shows, at 13:00 and 18:00", "An extra music set at 21:30", "Players release wish lanterns at 20:00", "The Grand Finale Champion is crowned at 22:30; a long fireworks show"];
function festThemeIdx(day) { day = day || festDay(); return day >= FEST.days ? 13 : (day - 1) % 13; }
var FRP = { g: null, key: null, near: false, cur: null, items: [], conf: null, warned: {}, nearAt: 0 };
function festRingParadeNow() { var h = dreamHour(); for (var i = 0; i < FEST_RPAR.length; i++) {
var p = FEST_RPAR[i];
if (h >= p.h && h < p.h + 1 / 3)
return p;
} return null; }
function festRingNear() { return !!(FRP.near && FRP.cur); }
var FRP_V = 1.6;
function frpFig(id, i, role, col) { return __ZC(229, 0, this, arguments, new.target); }
function frpFloat(w, l, col) { return __ZC(229, 1, this, arguments, new.target); }
function frpHorse(col, horn) { return __ZC(229, 2, this, arguments, new.target); }
function frpTheme(ti) { return __ZC(229, 3, this, arguments, new.target); }
function frpBalloon(kind) { return __ZC(229, 4, this, arguments, new.target); }
function frpTowerFloat() { return __ZC(229, 5, this, arguments, new.target); }
function frpCarouselFloat() { return __ZC(229, 6, this, arguments, new.target); }
function frpWagon() { return __ZC(229, 7, this, arguments, new.target); }
function frpConfetti() { return __ZC(229, 8, this, arguments, new.target); }
function frpBuild() { return __ZC(229, 9, this, arguments, new.target); }
function frpClear() { if (FRP.g) {
FRP.g.parent && FRP.g.parent.remove(FRP.g);
FRP.g = null;
FRP.items = [];
} }
function frpTick(dt, t) {
var p = festRingParadeNow(), on = !!p && festOn() && careInCityLoose();
if (!on) {
if (FRP.g)
frpClear();
FRP.near = false;
FRP.cur = null;
return;
}
var R = p.R, P = camera.position, secs = (dreamHour() - p.h) * 3600, K = Math.max(1, Math.ceil(2 * Math.PI * R / (FRP_V * 1200)));
var ap = Math.atan2(P.z - ATLC.z, P.x - ATLC.x), best = 0, bd = 1e9, a0 = R * 0.37 + FRP_V * secs / R;
for (var k = 0; k < K; k++) {
var ah = a0 + k * 2 * Math.PI / K, mid = ah - (FRP.len || 90) / 2 / R;
var d = Math.abs(((ap - mid) % (2 * Math.PI) + 3 * Math.PI) % (2 * Math.PI) - Math.PI);
if (d < bd) {
bd = d;
best = k;
}
}
var head = a0 + best * 2 * Math.PI / K, hx = ATLC.x + Math.cos(head - (FRP.len || 90) / 2 / R) * R, hz = ATLC.z + Math.sin(head - (FRP.len || 90) / 2 / R) * R;
var dist = Math.hypot(hx - P.x, hz - P.z);
FRP.cur = p;
if (dist > 360 || Math.abs(Math.hypot(P.x - ATLC.x, P.z - ATLC.z) - R) > 140) {
if (FRP.g)
FRP.g.visible = false;
FRP.near = false;
return;
}
if (!FRP.g || FRP.key !== p.q + "|" + festDay()) {
frpClear();
frpBuild();
FRP.key = p.q + "|" + festDay();
}
FRP.g.visible = true;
var near = false;
FRP.items.forEach(function (it, i) {
var a = head - it.s / R, rr = R + it.l, x = ATLC.x + Math.cos(a) * rr, z = ATLC.z + Math.sin(a) * rr, ry = Math.atan2(-Math.sin(a), Math.cos(a));
var o = it.o, y = terrainY(x, z) + (it.lift || 0);
if (it.role === "dragon") {
y += Math.sin(t * 2 - i * 0.5) * 0.35;
o.rotation.y = ry;
}
else if (it.role === "balloon") {
y += Math.sin(t * 0.6 + i) * 0.3;
o.rotation.y = ry + Math.sin(t * 0.3 + i) * 0.1;
}
else if (it.role === "float" || it.role === "carousel") {
o.rotation.y = ry;
}
else {
o.rotation.y = ry;
var lm = o.userData.limbs, sw = Math.sin(t * 5 + i);
if (lm) {
if (lm.ll)
lm.ll.rotation.x = sw * 0.45;
if (lm.rl)
lm.rl.rotation.x = -sw * 0.45;
if (it.role === "flag") {
if (lm.ra)
lm.ra.rotation.x = -1.4 + Math.sin(t * 1.5 + i) * 0.5;
if (lm.la)
lm.la.rotation.x = -sw * 0.5;
}
else if (it.role === "juggle" || it.role === "dance") {
if (lm.la)
lm.la.rotation.x = -1.6 - Math.sin(t * 2 + i) * 0.3;
if (lm.ra)
lm.ra.rotation.x = -1.6 + Math.sin(t * 2 + i) * 0.3;
}
else {
if (lm.la)
lm.la.rotation.x = -sw * 0.5;
if (lm.ra)
lm.ra.rotation.x = sw * 0.5;
}
}
if (o.userData.flag)
o.userData.flag.rotation.y = Math.sin(t * 1.5 + i) * 0.5;
o.children.forEach(function (c) { if (c.userData.jb !== undefined) {
var ja = t * 2.2 + c.userData.jb * 2.09;
c.position.set(Math.cos(ja) * 0.35, 1.9 + Math.abs(Math.sin(ja)) * 0.6, 0.35);
} });
y += Math.abs(sw) * 0.04;
}
o.position.set(x, y, z);
if (Math.hypot(x - P.x, z - P.z) < 22)
near = true;
});
if (FRP.car && FRP.car.userData.spin) {
FRP.car.userData.spin.rotation.y = t * 0.4;
FRP.car.userData.horses.forEach(function (h, k) { h.position.y = 1.3 + Math.sin(t * 1.4 + k) * 0.18; });
}
if (FRP.tower && FRP.tower.userData.acro)
FRP.tower.userData.acro.forEach(function (a, k) { var lm = a.userData.limbs; if (lm) {
if (lm.la)
lm.la.rotation.x = -2.8;
if (lm.ra)
lm.ra.rotation.x = -2.8;
} a.position.y = 1.2 + Math.abs(Math.sin(t * 1.2 + k * 1.3)) * 0.4; });
if (FRP.conf) {
var pa = FRP.conf.geometry.attributes.position.array;
for (var q = 0; q < pa.length; q += 3) {
pa[q + 1] -= dt * 0.5;
pa[q] += Math.sin(t + q) * dt * 0.15;
if (pa[q + 1] < 0.2)
pa[q + 1] = 7;
}
FRP.conf.geometry.attributes.position.needsUpdate = true;
}
if (near && !FRP.near && Date.now() - FRP.nearAt > 60000) {
FRP.nearAt = Date.now();
setStatus("<b>The " + esc(p.name) + " Parade is passing!</b> Open ✦ Extravaganza and cheer it for 10 tickets.");
}
FRP.near = near;
}
function festCheer() { return __ZC(229, 10, this, arguments, new.target); }
var FHUNT = { day: 0, spots: null, found: {}, g: null, meshes: {}, busy: false, clues: {}, loaded: 0 };
function festHunt() { return FEST_HUNTS[festThemeIdx()]; }
function festHuntOpen() { var h = dreamHour(); return festOn() && h >= 10 && h < 22; }
function fhRand(seed) { var s = seed >>> 0; return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; }
function festHuntSpots() { return __ZC(229, 11, this, arguments, new.target); }
function festHuntLoad(force) { return __ZC(229, 12, this, arguments, new.target); }
function fhMesh(kind) { return __ZC(229, 13, this, arguments, new.target); }
function festHuntTick(t) {
var on = festHuntOpen() && careInCityLoose() && ATLC;
if (!on) {
if (FHUNT.g) {
FHUNT.g.parent && FHUNT.g.parent.remove(FHUNT.g);
FHUNT.g = null;
FHUNT.meshes = {};
}
return;
}
var spots = festHuntSpots(), H = festHunt(), P = camera.position;
if (!FHUNT.g || FHUNT.gDay !== FHUNT.day) {
if (FHUNT.g)
FHUNT.g.parent && FHUNT.g.parent.remove(FHUNT.g);
FHUNT.g = new THREE.Group();
FHUNT.g.name = "daily hunt";
scene.add(FHUNT.g);
FHUNT.meshes = {};
FHUNT.gDay = FHUNT.day;
}
festHuntLoad(false);
spots.forEach(function (s) {
var m = FHUNT.meshes[s.n];
if (FHUNT.found[s.n]) {
if (m) {
FHUNT.g.remove(m);
delete FHUNT.meshes[s.n];
}
return;
}
var d = Math.hypot(s.x - P.x, s.z - P.z);
if (d > 70) {
if (m)
m.visible = false;
return;
}
if (!m) {
m = fhMesh(H[1]);
FHUNT.g.add(m);
FHUNT.meshes[s.n] = m;
}
m.visible = true;
m.position.set(s.x, terrainY(s.x, s.z) + 1.2 + Math.sin(t * 1.2 + s.n) * 0.08, s.z);
m.rotation.y = t * 0.6 + s.n;
m.userData.halo.material.opacity = d < 15 ? Math.min(0.75, (15 - d) / 15 * 0.9) : 0;
if (d < 2.6 && !FHUNT.busy)
festHuntFind(s);
});
}
function festHuntFind(s) { return __ZC(229, 14, this, arguments, new.target); }
var FEST_WINDS = ["east", "south-east", "south", "south-west", "west", "north-west", "north", "north-east"];
function festHuntClue() { return __ZC(229, 15, this, arguments, new.target); }
(function () {
if (typeof festGame !== "function")
return;
var fg = festGame;
festGame = function (kind) {
var r = fg.apply(this, arguments);
if (kind === "fortune") {
var c = festHuntClue();
if (c) {
var el = document.getElementById("fg-res");
if (el && el.parentNode) {
var d = document.createElement("div");
d.style.cssText = "margin-top:8px;padding:8px 10px;border:1px dashed #C8A0E8;border-radius:6px;color:#E8D8FF";
d.innerHTML = "<b>And for today's hunt:</b> " + esc(c);
el.parentNode.insertBefore(d, el);
}
}
}
return r;
};
})();
var FEST_ACTS = {
marine: { who: "United States Marine Band", lic: "Public domain", q: 'creator:("United States Marine Band") AND mediatype:(audio) AND NOT collection:(78rpm OR georgeblood OR cylinder OR cylinders OR 78rpm_bostonpubliclibrary)', gov: 1 },
army: { who: "United States Army Band", lic: "Public domain", q: 'creator:("United States Army Band" OR "U.S. Army Band") AND mediatype:(audio) AND NOT collection:(78rpm OR georgeblood OR cylinder OR cylinders OR 78rpm_bostonpubliclibrary)', gov: 1 },
musopen: { who: "Musopen performers", lic: "Public domain", q: 'collection:(musopen) AND mediatype:(audio)' },
macleod: { who: "Kevin MacLeod", lic: "CC BY 4.0", q: 'creator:("Kevin MacLeod") AND mediatype:(audio)' },
woodward: { who: "Josh Woodward", lic: "CC BY 4.0", q: 'creator:("Josh Woodward") AND mediatype:(audio)' },
shaw: { who: "Jason Shaw (Audionautix)", lic: "CC BY 4.0", q: '(creator:("Jason Shaw") OR creator:(Audionautix)) AND mediatype:(audio)' },
zabriskie: { who: "Chris Zabriskie", lic: "CC BY 4.0", q: 'creator:("Chris Zabriskie") AND mediatype:(audio)' },
pop: { who: "Pop from the Free Music Archive", lic: "Creative Commons", q: 'collection:(freemusicarchive) AND subject:(pop) AND mediatype:(audio)', many: 1 },
hiphop: { who: "Hip-hop from the Free Music Archive", lic: "Creative Commons", q: 'collection:(freemusicarchive) AND subject:("hip-hop" OR "hip hop") AND mediatype:(audio)', many: 1 },
electronic: { who: "Electronic from the Free Music Archive", lic: "Creative Commons", q: 'collection:(freemusicarchive) AND subject:(electronic) AND mediatype:(audio)', many: 1 },
rock: { who: "Rock from the Free Music Archive", lic: "Creative Commons", q: 'collection:(freemusicarchive) AND subject:(rock) AND mediatype:(audio)', many: 1 },
holiday: { who: "Christmas songs from the Free Music Archive", lic: "Creative Commons", q: 'collection:(freemusicarchive) AND subject:(christmas OR holiday) AND mediatype:(audio)', many: 1 }
};
var FEST_MODERN = ["pop", "electronic", "hiphop", "rock", "macleod"];
var FMUS = { el: null, act: null, tracks: {}, asked: {}, title: "", fail: {}, vol: 0, syn: null, synAt: 0, step: 0, credit: "" };
function festStageSet() { return __ZC(229, 16, this, arguments, new.target); }
function festStagePiece() { return (FEST.layout || []).filter(function (q) { return q.kind === "stage"; })[0] || null; }
function fmusLicName(u) { u = String(u || "").toLowerCase(); return /zero/.test(u) ? "CC0" : /publicdomain/.test(u) ? "Public domain" : /by-sa/.test(u) ? "CC BY-SA" : /by-nd/.test(u) ? "CC BY-ND" : /\/by\//.test(u) ? "CC BY" : ""; }
function fmusLicOk(u, gov) { u = String(u || "").toLowerCase(); if (!u)
return !!gov; if (/-nc|\/nc/.test(u))
return false; return /publicdomain|\/zero\/|\/by\/|\/by-sa\/|\/by-nd\//.test(u); }
function fmusFind(act, cb) { return __ZC(229, 17, this, arguments, new.target); }
function fmusPlay(act) { return __ZC(229, 18, this, arguments, new.target); }
function fmusStop() { if (FMUS.el) {
try {
FMUS.el.pause();
}
catch (e) { }
} FMUS.act = null; FMUS.title = ""; }
var FMUS_SCALE = [0, 2, 4, 7, 9, 12, 14, 16, 19];
function fmusSynth(vol) {
if (typeof audio === "undefined" || !audio.ctx)
return;
var ctx = audio.ctx;
if (!FMUS.syn) {
var g = ctx.createGain();
g.gain.value = 0;
g.connect(audio.master);
FMUS.syn = g;
FMUS.synAt = ctx.currentTime + 0.1;
}
FMUS.syn.gain.setTargetAtTime(vol * 0.35, ctx.currentTime, 0.4);
if (vol < 0.01) {
FMUS.synAt = ctx.currentTime + 0.1;
return;
}
if (FMUS.synAt < ctx.currentTime)
FMUS.synAt = ctx.currentTime + 0.05;
while (FMUS.synAt < ctx.currentTime + 1.0) {
var t0 = FMUS.synAt, s = FMUS.step++ % 16, root = [0, 5, 7, 0][Math.floor(FMUS.step / 16) % 4];
var n = FMUS_SCALE[(s * 3 + Math.floor(FMUS.step / 16)) % FMUS_SCALE.length] + root, o = ctx.createOscillator(), og = ctx.createGain();
o.type = "triangle";
o.frequency.value = 330 * Math.pow(2, n / 12);
og.gain.setValueAtTime(0.0001, t0);
og.gain.exponentialRampToValueAtTime(0.5, t0 + 0.02);
og.gain.exponentialRampToValueAtTime(0.001, t0 + 0.5);
o.connect(og);
og.connect(FMUS.syn);
o.start(t0);
o.stop(t0 + 0.55);
if (s % 4 === 0) {
var b = ctx.createOscillator(), bg = ctx.createGain();
b.type = "sine";
b.frequency.value = 110 * Math.pow(2, root / 12);
bg.gain.setValueAtTime(0.6, t0);
bg.gain.exponentialRampToValueAtTime(0.001, t0 + 0.9);
b.connect(bg);
bg.connect(FMUS.syn);
b.start(t0);
b.stop(t0 + 1);
}
FMUS.synAt += 0.3;
}
}
function fmusCredit() { return __ZC(229, 19, this, arguments, new.target); }
function fmusBand(on) { return __ZC(229, 20, this, arguments, new.target); }
function fmusTick(dt, t) {
var P = camera.position, want = null, vol = 0;
if (festOn() && careInCityLoose()) {
if (FRP.g && FRP.g.visible && FRP.items.length) {
var dmin = 1e9;
FRP.items.forEach(function (it) { dmin = Math.min(dmin, Math.hypot(it.o.position.x - P.x, it.o.position.z - P.z)); });
if (dmin < 80) {
want = festDay() % 2 ? "marine" : "army";
vol = Math.max(0, 1 - dmin / 80);
}
}
if (!want && FEST.parade && FEST.parade.walkers && FEST.parade.walkers.length) {
var w = FEST.parade.walkers[0].g.position, dp = Math.hypot(w.x - P.x, w.z - P.z);
if (dp < 80) {
want = FEST.parade.when === "evening" ? "zabriskie" : "marine";
vol = Math.max(0, 1 - dp / 80);
}
}
var st = festStagePiece(), set = festStageSet();
if (st) {
var ds = Math.hypot(st.x - P.x, st.z - P.z);
var hh = dreamHour();
fmusBand(!!set && (set === "musopen" || set === "woodward" || set === "shaw" || (hh >= 14.5 && hh < 15)));
if (!want && set && ds < 110) {
want = set;
vol = Math.max(0, 1 - ds / 110);
}
}
}
var sound = typeof audio !== "undefined" && audio.on;
if (!sound)
vol = 0;
if (want !== FMUS.act) {
fmusStop();
FMUS.act = want;
if (want) {
fmusFind(want, function (L) { if (FMUS.act === want && L)
fmusPlay(want); fmusCredit(); });
}
fmusCredit();
}
var useArchive = want && FMUS.tracks[want];
if (FMUS.el) {
var v = useArchive ? vol * 0.8 : 0;
FMUS.el.volume = Math.max(0, Math.min(1, FMUS.el.volume + (v - FMUS.el.volume) * Math.min(1, dt * 2)));
if (!useArchive && !FMUS.el.paused && !want)
try {
FMUS.el.pause();
}
catch (e) { }
}
FMUS.synVol = want && FMUS.tracks[want] === null ? vol : 0;
FMUS.synTick = performance.now();
fmusSynth(FMUS.synVol);
}
function festMusicLine() { return __ZC(229, 21, this, arguments, new.target); }
function festDayDate(d) { if (!FEST.start)
return ""; var dt = new Date(FEST.start.getTime() + (d - 1) * 86400000); return dt.toLocaleDateString(undefined, { weekday: "short", day: "numeric", month: "short" }); }
function festMoreTab(tab) { return __ZC(229, 22, this, arguments, new.target); }
var FPB = { day: 0, data: null, busy: false, msg: "" };
function festPrizeLoad(day) { return __ZC(229, 23, this, arguments, new.target); }
function festPrizeBoardHtml() { return __ZC(229, 24, this, arguments, new.target); }
addEventListener("click", function (e) {
var t = e.target;
if (!t || !t.closest)
return;
var b = t.closest("[data-fpb]");
if (b) {
festPrizeLoad(+b.getAttribute("data-fpb"));
return;
}
var c = t.closest("[data-fpcopy]");
if (c) {
var id = c.getAttribute("data-fpcopy");
try {
navigator.clipboard.writeText(id);
c.textContent = "Copied";
}
catch (er) {
window.prompt("The dreamer's id:", id);
}
}
});
(function () {
if (typeof arcOver !== "function")
return;
var ao = arcOver;
arcOver = function (msg) {
var was = ARC.over, r = ao.apply(this, arguments);
try {
if (!was && ARC.score > 0 && festOn() && festSigned())
cityRpc("fest_arcade", { p_game: String(ARC.open || ""), p_score: ARC.score }).catch(function () { });
}
catch (er) { }
return r;
};
})();
(function () {
var ft = festTick;
festTick = function (dt) {
ft.apply(this, arguments);
try {
var t = performance.now() / 1000;
frpTick(dt, t);
festHuntTick(t);
fmusTick(Math.min(dt, 0.1), t);
}
catch (e) {
if (window.console && !FRP.warned.tick) {
FRP.warned.tick = 1;
console.warn("fest-more:", e);
}
}
};
})();
