/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var HX = { spots: [], picked: {}, busy: false, guide: null, game: null, stock: null, stockAt: 0, btn: null, menuBtn: null, built: {}, keepers: {}, t: 0, glows: [], card: null };
var HX_MB = {};
HX_MATS.forEach(function (m) { HX_MB[m[0]] = { kind: m[0], name: m[1], icon: m[2], buys: m[3], price: m[4], where: m[5] }; });
var HX_WP = {};
HX_WORK.forEach(function (w) { HX_WP[w[0]] = { key: w[0], world: w[1], x: w[2], z: w[3], r: w[4], note: w[5] }; });
var HX_JOB0 = 4000, HX_JOB1 = 4099;
try {
HX.picked = JSON.parse(localStorage.getItem("somnu.hx.picked") || "{}") || {};
}
catch (e) {
HX.picked = {};
}
(function () { if (typeof FG_MB !== "undefined")
HX_MATS.forEach(function (m) { if (!FG_MB[m[0]])
FG_MB[m[0]] = { kind: m[0], name: m[1], icon: m[2], buys: m[3], price: m[4], where: m[5] }; }); })();
function hxMat(k) { return HX_MB[k] || (typeof FG_MB !== "undefined" && FG_MB[k]) || { kind: k, name: k, icon: "", buys: 1, price: null }; }
function hxOn() { return typeof WLD !== "undefined" && !!WLD.on && !!HX_WORLDS[WLD.on]; }
function hxWorld() { return hxOn() ? WLD.on : null; }
function hxSigned() { return typeof signedIn === "function" && signedIn(); }
function hxKeeper() { return typeof amKeeper === "function" && amKeeper(); }
function hxRpc(name, args) { return typeof cityRpc === "function" ? cityRpc(name, args || {}) : Promise.reject(new Error("offline")); }
function hxMissing(e) { return typeof rpcMissing === "function" ? rpcMissing(e) : /PGRST202|Could not find the function|does not exist|schema cache/i.test(String((e && e.message) || e)); }
function hxSay(html) { if (typeof setStatus === "function")
setStatus(html); }
function hxTone(f, d) { if (typeof playTone === "function")
try {
playTone(f, d);
}
catch (e) { } }
function hxL() { return typeof worldLocal === "function" ? worldLocal() : { x: 0, y: 0, z: 0 }; }
function hxGround(w, x, z) {
try {
if (w === "neverland")
return Math.max(nvHeight(x, z), -0.6);
if (w === "sea")
return Math.max(seaHeight(x, z), -0.6);
if (w === "underdark") {
var h = udHeight(x, z);
return h < -900 ? -60 : h;
}
if (w === "northpole")
return npHeight(x, z);
}
catch (e) { }
return 0;
}
function hxTalkers(w) { return w === "neverland" ? NV.talkers : w === "sea" ? SEA.talkers : w === "underdark" ? UD.talkers : w === "northpole" ? NP.talkers : null; }
function hxGather(S) { return __ZC(321, 0, this, arguments, new.target); }
function hxGive(id, ok, no) { return __ZC(321, 1, this, arguments, new.target); }
function hxSave() { try {
var n = Date.now(), o = {};
Object.keys(HX.picked).forEach(function (k) { if (HX.picked[k] > n)
o[k] = HX.picked[k]; });
HX.picked = o;
localStorage.setItem("somnu.hx.picked", JSON.stringify(o));
}
catch (e) { } }
setInterval(function () { var n = Date.now(); HX.spots.forEach(function (S) { if (S.g && S.g.scale.x < 1 && !(HX.picked[S.id] > n))
S.g.scale.setScalar(1); }); }, 15000);
function hxStock(force) {
if (!hxSigned())
return Promise.resolve([]);
if (!force && HX.stock && Date.now() - HX.stockAt < 20000)
return Promise.resolve(HX.stock);
return hxRpc("my_stock").then(function (rows) { HX.stock = rows || []; HX.stockAt = Date.now(); return HX.stock; }).catch(function () { return HX.stock || []; });
}
function hxHave(k) { var r = (HX.stock || []).filter(function (s) { return s.kind === k; })[0]; return r ? (+r.amount || 0) : 0; }
function hxSellPrice(k) { var r = (HX.stock || []).filter(function (s) { return s.kind === k; })[0]; return r && r.buys != null ? +r.buys : hxMat(k).buys; }
function hxBuyPrice(k) { var M = hxMat(k); return M.price; }
function hxStall(id, msg) { return __ZC(321, 2, this, arguments, new.target); }
function hxBuy(id, k, n) { return __ZC(321, 3, this, arguments, new.target); }
function hxSell(id, k, n) { return __ZC(321, 4, this, arguments, new.target); }
function hxMaps(T) { return __ZC(321, 5, this, arguments, new.target); }
function hxGuideTo(w, x, z, name) {
HX.guide = { w: w, x: x, z: z, name: name };
worldCard(null);
hxSay("<b>" + esc(name) + "</b>: follow the arrow on the banner at the top.");
}
function hxGuideLine() { return __ZC(321, 6, this, arguments, new.target); }
function hxKeeperCard(T, opts) {
var h = "<div style='font:600 17px var(--serif,Georgia);color:#FFE7B0'>" + esc(T.name) + "</div>", fns = {};
opts.forEach(function (o, i) { h += worldBtn("o" + i, o[0], o[1] || null); fns["o" + i] = function () { worldCard(null); o[2](); }; });
worldCard(h, fns);
}
function hxWrapKeeper(w, name, opts) { return __ZC(321, 7, this, arguments, new.target); }
function hxWpNear() { return __ZC(321, 8, this, arguments, new.target); }
function hxIsJob(job) { var id = +(job && (job.job_id || job.id)) || 0; return (id >= HX_JOB0 && id <= HX_JOB1) || !!(job && HX_WP[job.workplace]); }
function hxJobWorld(job) { var W = job && HX_WP[job.workplace]; if (W)
return W.world; var id = +(job && (job.job_id || job.id)) || 0; var r = HX_JOBS.filter(function (j) { return j[0] === id; })[0]; return r ? r[1] : null; }
var HX_WAYIN = {
neverland: "<i>Second to the right, and straight on till morning.</i> On a clear night, find the pair of bright stars low in the north-east, and fly.",
sea: "At the far edge of the Nightmare Wilds, past the last dead tree, a lone pier runs out into the dark, and a ship waits at it.",
underdark: "The miners say the cage in the mine shaft goes further down than the mine. At the end of the old tunnel, one rune is warm under the hand.",
northpole: "Every fireplace burns unless somebody puts it out. Put one out, and look up the cold chimney."
};
(function () {
if (typeof onSite === "function") {
var os = onSite;
onSite = function (job) { if (job && hxIsJob(job))
return hxWorld() === hxJobWorld(job); return os.apply(this, arguments); };
}
if (typeof ahWhere === "function") {
var aw = ahWhere;
ahWhere = function () { if (hxOn()) {
if (typeof walkMode !== "undefined" && !walkMode)
return null;
var W = hxWpNear();
return W ? { key: W.key, inside: true } : null;
} return aw.apply(this, arguments); };
}
if (typeof showTheWay === "function") {
var sw = showTheWay;
showTheWay = function (key) {
var W = HX_WP[key];
if (!W)
return sw.apply(this, arguments);
if (hxWorld() === W.world) {
if (W.key === "The Wayfarer")
return hxSay("<b>The Wayfarer</b> is the ship under your feet.");
return hxGuideTo(W.world, W.x, W.z, W.key);
}
hxSay("<b>" + esc(key) + "</b> is in " + esc(HX_WORLDS[W.world]) + ", a hidden world. The way in is for you to find: " + HX_WAYIN[W.world]);
};
}
})();
function hxProp(look) { return __ZC(321, 9, this, arguments, new.target); }
function hxSignAt(G, w, lines, x, z, ry, bg, fg) { return __ZC(321, 10, this, arguments, new.target); }
function hxPersonAt(G, w, seed, o, x, z, talk, ry) { return __ZC(321, 11, this, arguments, new.target); }
function hxCounter(G, w, x, z, ry, col, goods) { return __ZC(321, 12, this, arguments, new.target); }
function hxDress(w, G) { return __ZC(321, 13, this, arguments, new.target); }
function hxStallTalk(id) { return function () { hxStall(id); }; }
function hxDressNeverland(G, list) { return __ZC(321, 14, this, arguments, new.target); }
function hxDressSea(G, list) { return __ZC(321, 15, this, arguments, new.target); }
function hxMarketSpots() {
var M = UD_SPOTS.market, out = [];
for (var i = 0; i < 10; i++) {
var a = i / 10 * Math.PI * 2 + 0.15;
if (Math.abs(Math.sin(a)) > 0.8)
continue;
out.push({ a: a, x: M.x + Math.cos(a) * 13.4, z: M.z + Math.sin(a) * 13.4, sx: M.x + Math.cos(a) * 16, sz: M.z + Math.sin(a) * 16, ry: Math.atan2(-Math.cos(a), -Math.sin(a)) });
}
return out;
}
function hxDressUnderdark(G, list) { return __ZC(321, 16, this, arguments, new.target); }
function hxDressNorthPole(G, list) { return __ZC(321, 17, this, arguments, new.target); }
(function () {
Object.keys(HX_WORLDS).forEach(function (w) {
var W = typeof WORLDS !== "undefined" && WORLDS[w];
if (!W)
return;
var b = W.build;
W.build = function (G) { var r = b.apply(this, arguments); try {
hxDress(w, G);
}
catch (e) {
if (window.console)
console.warn("[hidden-life] dress", w, e);
} return r; };
if (W.g)
try {
hxDress(w, W.g);
}
catch (e) { }
W.places = (W.places || []).concat(HX_WORK.filter(function (r) { return r[1] === w && r[4]; }).map(function (r) { return { name: r[0], x: r[2], z: r[3] }; }));
});
if (typeof FG_STATIONS !== "undefined") {
FG_STATIONS.cinderwell = { name: "Cinderwell Forges", who: "Durra Anvilsong", st: ["forge", "joinery"], sells: ["cr_ore", "cr_coal", "cr_leather", "cr_cloth", "cr_crystal", "cr_ember"], verb: "Strike" };
FG_STATIONS.npbench = { name: "The workshop's spare bench", who: "the elves", st: ["joinery"], sells: ["cr_wood", "cr_cloth", "cr_glass", "cr_leather"], verb: "Plane" };
FG_STATIONS.scheria = { name: "The shipwrights' yard at Scheria", who: "the Phaeacian shipwrights", st: ["joinery"], sells: ["cr_wood", "cr_cloth", "cr_leather"], verb: "Plane" };
}
})();
var HX_RINGS = [];
function hxRingsBuild(G) { return __ZC(321, 18, this, arguments, new.target); }
function hxRingsPaint() {
var G = HX.game && HX.game.kind === "rings" ? HX.game : null;
HX_RINGS.forEach(function (R, i) { R.ring.material = !G ? R.leaf : i < G.i ? R.done : i === G.i ? R.next : R.leaf; });
}
function hxBest(k) { try {
return +localStorage.getItem("somnu.hx.best." + k) || 0;
}
catch (e) {
return 0;
} }
function hxSetBest(k, v) { try {
localStorage.setItem("somnu.hx.best." + k, String(v));
}
catch (e) { } }
function hxRingsCard() { return __ZC(321, 19, this, arguments, new.target); }
function hxClock(s) { var m = Math.floor(s / 60), r = Math.floor(s % 60); return m + ":" + (r < 10 ? "0" : "") + r; }
function hxRingsTick(dt) { return __ZC(321, 20, this, arguments, new.target); }
function hxRingsLine() { return __ZC(321, 21, this, arguments, new.target); }
function hxFishOpen(spot) {
if (hxWorld() === "sea" && SEA.aboard && Math.abs(SEA.v) > 4)
return hxSay("<b>Shorten sail first</b> (S): you can't fish at full speed.");
HX.fish = { spot: spot, state: "idle", t: 0 };
hxFishPaint();
}
function hxFishSpot() {
var F = HX.fish;
if (!F)
return null;
if (F.spot !== "sea")
return F.spot;
var tun = ["pylos", "ithaca"].some(function (k) { var p = SEA_BY[k]; return p && Math.hypot(SEA.sx - p.x, SEA.sz - p.z) < 1600; });
if (tun && !(HX.picked.sea_tunny > Date.now()))
return "sea_tunny";
return "sea_fish";
}
function hxFishPaint(msg) { return __ZC(321, 22, this, arguments, new.target); }
function hxFishCast() {
var F = HX.fish;
if (!F)
return;
F.state = "wait";
F.t = 2 + Math.random() * 4.5;
F.win = 1.6;
hxTone(260, 0.1);
hxFishPaint();
}
function hxFishTick(dt) { return __ZC(321, 23, this, arguments, new.target); }
function hxFishStrike() { return __ZC(321, 24, this, arguments, new.target); }
var HX_ECHO = { stones: [], notes: [392, 494, 587, 698], names: ["the violet stone", "the sea-green stone", "the blue stone", "the rose stone"], cols: [0x8A4AC8, 0x3AA88A, 0x4A6AD8, 0xC85A8A] };
function hxEchoBuild(G, list) { return __ZC(321, 25, this, arguments, new.target); }
function hxEchoCard(msg) { return __ZC(321, 26, this, arguments, new.target); }
function hxEchoNext() { var E = HX.game; E.seq.push(Math.floor(Math.random() * 4)); if (E.seq.length < 3) {
return hxEchoNext();
} E.at = 0; E.play = 0; E.pt = 0.6; hxEchoCard(); }
function hxEchoLight(i) { var S = HX_ECHO.stones[i]; if (S)
S.lit = 1; hxTone(HX_ECHO.notes[i], 0.6); }
function hxEchoTick(dt) { return __ZC(321, 27, this, arguments, new.target); }
function hxEchoPress(i) { return __ZC(321, 28, this, arguments, new.target); }
var HX_WRAP = { papers: [["red", 0xC82A2A], ["green", 0x2A8A3A], ["blue", 0x2A5AA8], ["gold", 0xE8C04A]], ribbons: ["silver", "gold", "white"],
who: ["Ana", "Bo", "Cass", "Dev", "Esme", "Finn", "Gus", "Hana", "Ivo", "Juno", "Kit", "Lark", "Milo", "Nell", "Oli", "Pia", "Rafe", "Sol", "Tam", "Vi"],
loves: ["the sea", "trains", "the stars", "dinosaurs", "painting", "football", "music", "dragons", "rockets", "the woods", "horses", "snow"] };
function hxWrapCard(msg) { return __ZC(321, 29, this, arguments, new.target); }
function hxWrapNew() { var W = HX_WRAP, r = function (a) { return a[Math.floor(Math.random() * a.length)]; }; return { who: r(W.who), loves: r(W.loves), paper: r(W.papers)[0], ribbon: r(W.ribbons) }; }
function hxWrapDone(rb) { return __ZC(321, 30, this, arguments, new.target); }
function hxWrapEnd(last) { return __ZC(321, 31, this, arguments, new.target); }
function hxPrize(id, show, cheer, verb, what) { return __ZC(321, 32, this, arguments, new.target); }
function hxWrapTick(dt) {
var G = HX.game;
if (!G || G.kind !== "wrap")
return;
if (hxWorld() !== "northpole") {
HX.game = null;
return;
}
var was = Math.ceil(G.t);
G.t -= dt;
if (G.t <= 0)
return hxWrapEnd("Time's up!");
if (Math.ceil(G.t) !== was && WLD.card && WLD.card.style.display === "block" && Math.ceil(G.t) % 5 === 0)
hxWrapCard();
}
function hxHub() { return __ZC(321, 33, this, arguments, new.target); }
function hxHudBtn() {
if (HX.btn || !document.body)
return HX.btn;
var b = document.createElement("button");
b.id = "hx-btn";
b.type = "button";
b.textContent = "🧭 Things to do";
b.style.cssText = "position:fixed;z-index:44;display:none;left:calc(12px + env(safe-area-inset-left,0px));bottom:calc(328px + env(safe-area-inset-bottom,0px));" +
"background:rgba(10,12,18,.92);color:#EDE8F8;border:1px solid #8FB4E8;border-radius:18px;padding:7px 14px;font:600 13px system-ui,sans-serif";
b.onclick = function () { hxHub(); };
document.body.appendChild(b);
HX.btn = b;
if (typeof PS_KEEP !== "undefined")
PS_KEEP["hx-btn"] = 1;
return b;
}
(function () {
function hook() {
var bar = document.getElementById("me-bar");
if (!bar)
return setTimeout(hook, 900);
if (document.getElementById("me-hx"))
return;
var b = document.createElement("button");
b.className = "btn";
b.id = "me-hx";
b.title = "Work, trade, gathering and games in this world";
b.textContent = "🧭 Things to do here";
b.style.display = "none";
b.onclick = function () { hxHub(); };
bar.appendChild(b);
HX.menuBtn = b;
}
if (document.readyState === "loading")
document.addEventListener("DOMContentLoaded", hook);
else
hook();
})();
function hxTick(dt) {
HX.t += dt;
var on = hxOn() && (typeof walkMode === "undefined" || walkMode);
var b = hxHudBtn();
if (b) {
var tk = document.getElementById("talk"), show = on && !(WLD.card && WLD.card.style.display === "block") && !(tk && tk.classList.contains("open"));
if ((b.style.display === "block") !== show)
b.style.display = show ? "block" : "none";
}
if (HX.menuBtn) {
var ms = hxOn() ? "" : "none";
if (HX.menuBtn.style.display !== ms)
HX.menuBtn.style.display = ms;
}
if (!hxOn())
return;
HX.glows.forEach(function (G) { G.m.material.opacity = G.b * (0.75 + 0.25 * Math.sin(HX.t * 0.8 + G.ph)); });
hxRingsTick(dt);
hxFishTick(dt);
hxEchoTick(dt);
hxWrapTick(dt);
}
(function () {
if (typeof transitTick === "function") {
var tt = transitTick;
transitTick = function (dt) { tt(dt); try {
hxTick(dt);
}
catch (e) {
if (window.console)
console.warn("[hidden-life]", e);
} };
}
if (typeof worldBanner === "function") {
var wb = worldBanner;
worldBanner = function (html) { if (html && hxOn()) {
var x = "";
try {
x = hxRingsLine() + hxGuideLine();
}
catch (e) { }
if (x)
html = html + x;
} return wb.call(this, html); };
}
if (typeof backRegister === "function")
backRegister({ order: 3, open: function () { return !!(HX.game && HX.game.kind === "rings"); }, close: function () { HX.game = null; hxRingsPaint(); hxSay("The Never Rings: course abandoned."); } });
})();
function hxSoon(fn) { if (typeof stfSoon === "function")
return stfSoon(fn); setTimeout(function () { if (typeof closeTalk === "function")
try {
closeTalk();
}
catch (e) { } fn(); }, 600); }
function hxStallOf(ctx) {
if (!ctx || !HX_WORLDS[ctx.world])
return null;
var n = String(ctx.name || "");
for (var k in HX_STALLS) {
var T = HX_STALLS[k];
if (T.world === ctx.world && T.keeper === n)
return k;
}
return null;
}
function hxForgeOf(ctx) {
if (!ctx)
return null;
var n = String(ctx.name || "");
if (ctx.world === "underdark" && /Durra Anvilsong|Kesh, a silversmith/.test(n))
return "cinderwell";
if (ctx.world === "northpole" && / the elf$/.test(n))
return "npbench";
return null;
}
(function () {
if (typeof fgStationFor === "function") {
var fs = fgStationFor;
fgStationFor = function (ctx) { return hxForgeOf(ctx) || fs.apply(this, arguments); };
}
function add(def) { if (typeof staffDeedAdd === "function")
staffDeedAdd(def);
else
(window.SD_PENDING = window.SD_PENDING || []).push(def); }
add({ tag: "TRADE", label: "🛒 Trade", hint: "opens this stall: the dreamer buys and sells here for real (it goes to their backpack's stock)",
when: function (ctx) { return !!hxStallOf(ctx); },
run: function (ctx) { var k = hxStallOf(ctx); hxSoon(function () { hxStall(k); }); return { ok: true }; } });
if (typeof stfDef === "function") {
var hire = stfDef("HIRE");
if (hire)
add({ tag: "HIRE", label: hire.label, hint: hire.hint,
when: function (ctx) { if (HX_WORLDS[ctx && ctx.world])
return !!hxWpNear() && typeof ahOpen === "function"; return hire.when ? hire.when(ctx) : true; },
run: function (ctx, arg) { if (HX_WORLDS[ctx && ctx.world]) {
var W = hxWpNear();
if (!W)
return { ok: false, say: "Nobody is hiring just here." };
hxSoon(function () { ahOpen(W.key); });
return { ok: true };
} return hire.run(ctx, arg); } });
}
})();
