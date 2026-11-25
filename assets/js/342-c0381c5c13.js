/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var DGR_NAME = ["Safe", "Guarded", "Risky", "Dangerous", "Deadly"];
var DGR_ICON = ["🛡️", "🤝", "⚠️", "⚔️", "☠️"];
var DGR_COL = ["#8FDCA4", "#A8CCF0", "#F2D684", "#F2AA6A", "#F28A84"];
var DGR_RULE = [
"Nobody can hurt anyone here.",
"Dreamers fight only when both agree: challenge someone, and they accept. Beaten, you lose nothing.",
"Any grown-up may attack another out in the open. Beaten, you wake by the way in and lose nothing.",
"Any grown-up may attack another out in the open. Beaten, you wake by the way in, and the winner takes a twentieth of your purse (at most 250 gold).",
"Anything goes. Beaten, the winner takes a tenth of your purse (at most 1,000 gold)."
];
var DGR_UNLISTED = 1;
var DGR_GROUPS = [["home", "Somnucor and your dreams"], ["space", "Space"], ["hidden", "The other worlds"], ["land", "The great cities of the dream lands"]];
var DGR_WORLDS = [
["city", "Somnucor: the streets, every building, the Nightmare Wilds", 0, "home"],
["dream", "Your own dream, and any dream you visit", 0, "home"],
["mall", "The World Mall", 0, "home"],
["underground", "The Underground", 1, "home"],
["aurora", "Station Aurora", 0, "space"],
["ares", "The Ares Gateway", 0, "space"],
["jupiter", "Jupiter's cloud station", 0, "space"],
["saturn", "Saturn's cloud station", 0, "space"],
["uranus", "Uranus's cloud station", 0, "space"],
["neptune", "Neptune's cloud station", 0, "space"],
["casino", "The hidden Crescent casino on the Moon", 0, "space"],
["shuttle", "Aboard a shuttle", 1, "space"],
["moon", "The Moon and Mare Haven", 1, "space"],
["space", "Open space and the Far Reach", 4, "space"],
["mars", "Mars and New Jezero", 2, "space"],
["pluto", "Pluto and Tombaugh Halls", 2, "space"],
["gr_jupiter", "Vellamar, Jupiter's great city", 2, "space"],
["gr_saturn", "Halcyra, Saturn's great city", 2, "space"],
["gr_uranus", "Celadine, Uranus's great city", 2, "space"],
["gr_neptune", "Saphirel, Neptune's great city", 2, "space"],
["mercury", "Mercury and Caloris Deep", 3, "space"],
["venus", "Venus and Aphelia", 3, "space"],
["veyar", "Veyar and Ilvessa, the Singing City", 3, "space"],
["race", "Pyreline, the race planet", 4, "space"],
["greenwold", "The Greenwold and Harrowmead", 0, "hidden"],
["party", "Jubilee, the Party Planet", 0, "hidden"],
["northpole", "The North Pole and Starhearth", 0, "hidden"],
["lounge", "GiGi's Lounge", 0, "hidden"],
["family", "The Family houses", 0, "hidden"],
["mmin", "Inside a mythic machine", 1, "hidden"],
["neverland", "Neverland and Aerieholm", 2, "hidden"],
["sea", "The Endless Sea, the Odyssey islands and Saltcrown", 2, "hidden"],
["underdark", "The Underdark: Zhaelvorn and Stonehallow", 3, "hidden"],
["battle", "Ironfray and Bastion Varr (18+)", 4, "hidden"],
["hall", "The Hall of Doors", 0, "land"],
["heavens", "The Heavens and Lumenreach", 0, "land"],
["orbital", "The Orbital (a station)", 0, "land"],
["kidszone", "The Kids Zone in Faerie (always safe)", 0, "land"],
["faerie", "Faerie and Glimmerwold", 1, "land"],
["future", "The City to Come and Brightwater", 1, "land"],
["depths", "The Deep and Coralmere", 2, "land"],
["mirror", "The Mirror World and Gemelline", 2, "land"],
["dead", "The Land of the Dead and Lanternhome", 2, "land"],
["frozen", "The Frozen Realm and Isvarden", 2, "land"],
["elsewhere", "Another World and Ondrevar", 2, "land"],
["stars", "Among the Stars and Celestara", 2, "land"],
["desert", "The Endless Desert and Sahmira", 2, "land"],
["underworld", "The Underworld and Hearthdeep", 3, "land"],
["void", "The Void and Stillspire", 3, "land"],
["fire", "The Burning Lands and Kilnhaven", 3, "land"],
["wasteland", "The Wasteland and Wellspring", 3, "land"]
];
var DGR_W = {};
DGR_WORLDS.forEach(function (r) { DGR_W[r[0]] = { id: r[0], name: r[1], def: r[2], group: r[3] }; });
var DGR = { lv: {}, lvAt: 0, lvBusy: false, here: null, hereAt: 0, said: {}, prev: null, sayT: 0,
hp: 100, max: 100, quiet: 99, hurt: 0, downT: 0, guard: 0, cool: 0, fought: -99,
net: { since: 0, busy: false, at: 0, missing: false }, drops: {}, dropsAt: {}, ask: null, ok: {}, no: {}, mine: {}, t: 0, hud: null, veil: null, btn: null };
function dgrSigned() { return typeof signedIn === "function" && signedIn(); }
function dgrKeeper() { return typeof amKeeper === "function" && amKeeper(); }
function dgrRpc(n, a) { try {
return typeof cityRpc === "function" ? cityRpc(n, a || {}) : Promise.reject(new Error("offline"));
}
catch (e) {
return Promise.reject(e);
} }
function dgrMissing(e) { return typeof rpcMissing === "function" ? rpcMissing(e) : /PGRST202|Could not find the function|does not exist|schema cache/i.test(String((e && e.message) || e || "")); }
function dgrLevelOf(id) {
if (DGR.lv[id] !== undefined)
return DGR.lv[id];
var W = DGR_W[id];
return W ? W.def : DGR_UNLISTED;
}
function dgrLoad(force) {
if (DGR.lvBusy || (!force && Date.now() - DGR.lvAt < 300000))
return;
DGR.lvBusy = true;
DGR.lvAt = Date.now();
dgrRpc("danger_levels", {}).then(function (o) {
if (o && o.ok && o.rows) {
var m = {};
o.rows.forEach(function (r) { var n = +r.level; if (r.w && n >= 0 && n <= 4)
m[r.w] = n; });
DGR.lv = m;
}
}).catch(function () { }).then(function () { DGR.lvBusy = false; });
}
function dgrWhere() {
try {
if (typeof kidsZoneHere === "function" && kidsZoneHere())
return "kidszone";
if (typeof WLD !== "undefined" && WLD && WLD.on) {
var k = WLD.on;
if (k === "surface")
return (typeof SF !== "undefined" && SF && SF.k) || "moon";
if (k === "station")
return (typeof STN !== "undefined" && STN && STN.k === "ares") ? "ares" : "aurora";
if (/^gr_/.test(k)) {
var id = k.slice(3);
return DGR_W[k] ? k : id;
}
return k;
}
if (typeof MALL !== "undefined" && MALL && MALL.on)
return "mall";
if (typeof UG2 !== "undefined" && UG2 && UG2.on)
return "underground";
if (typeof inSomnucorRealm === "function" && !inSomnucorRealm())
return "dream";
}
catch (e) { }
return "city";
}
function dgrNameOf(id) { var W = DGR_W[id]; return W ? W.name : "this world"; }
function dgrHereLevel() { return dgrLevelOf(dgrWhere()); }
function dgrProtected() {
if (!dgrSigned())
return true;
if (typeof ageAdult === "function" && !ageAdult())
return true;
if (typeof flkOn === "function" && flkOn())
return true;
return false;
}
function dgrChip(lv) {
return "<span style='display:inline-block;margin-left:6px;padding:0 8px;border-radius:9px;border:1px solid " + DGR_COL[lv] + ";color:" + DGR_COL[lv] + ";font-size:12px;white-space:nowrap'>" +
DGR_ICON[lv] + " " + DGR_NAME[lv] + (lv ? " · danger " + lv : "") + "</span>";
}
(function () {
if (typeof worldBanner !== "function")
return;
var wb = worldBanner;
worldBanner = function (html) {
try {
if (html && typeof WLD !== "undefined" && WLD.on)
html = html + dgrChip(dgrHereLevel());
}
catch (e) { }
return wb.call(this, html);
};
})();
function dgrArrive(id) {
var lv = dgrLevelOf(id), was = DGR.prev;
DGR.prev = id;
if ((id === "city" || id === "dream") && !(was && dgrLevelOf(was) > 0))
return;
if (was === null && lv === 0)
return;
var h = "<b>" + DGR_ICON[lv] + " " + DGR_NAME[lv] + (lv ? " (danger " + lv + " of 4)" : "") + "</b> · " + esc(dgrNameOf(id)) + ". " + DGR_RULE[lv];
if (typeof dgrBookPlay === "function" && dgrBookPlay(id))
h = h.replace(DGR_RULE[lv], "Here you are the chapter's own person, and you fight with their powers, as the book gives them.");
else if (lv > 0 && id !== "race") {
h += " Indoors, and round the way in, nobody can be hurt.";
if (dgrProtected())
h += " " + (dgrSigned() ? "You are under 18 or under a family lock, so nobody can fight you anywhere." : "Sign in to take part; until then nobody can fight you.");
}
DGR.sayT = 3.2;
DGR.say = h;
}
function dgrWatch(dt) {
DGR.hereAt -= dt;
if (DGR.hereAt > 0)
return;
DGR.hereAt = 0.5;
var id = dgrWhere();
if (id !== DGR.here) {
DGR.here = id;
dgrArrive(id);
dgrLoad(false);
DGR.hp = DGR.max;
DGR.hurt = 0;
DGR.ask = null;
}
}
function dgrSayTick(dt) {
if (!DGR.say)
return;
DGR.sayT -= dt;
if (DGR.sayT > 0)
return;
var h = DGR.say;
DGR.say = null;
if (typeof setStatus === "function")
setStatus(h);
}
function dgrList() { return __ZC(342, 0, this, arguments, new.target); }
if (typeof PS_EXTRAS !== "undefined") {
PS_EXTRAS.push({ id: "dgr-ps", label: "⚔️ Danger by world", run: function () { setTimeout(dgrList, 10); } });
try {
PS_SECTIONS.filter(function (s) { return s.k === "places"; })[0].ids.push("dgr-ps");
}
catch (e) { }
}
(function () {
if (typeof bwPvpList === "function") {
var bl = bwPvpList;
bwPvpList = function () { if (dgrLevelOf(dgrWhere()) === 0)
return []; return bl.apply(this, arguments); };
}
if (typeof assaultDreamer === "function") {
var ad = assaultDreamer;
assaultDreamer = function (v) {
var id = dgrWhere();
if (dgrLevelOf(id) === 0 && !(typeof WLD !== "undefined" && WLD.on === "battle")) {
if (typeof setStatus === "function")
setStatus("<b>🛡️ " + esc(dgrNameOf(id).split(":")[0]) + " is a safe place.</b> No dreamer can hurt another here.");
return;
}
return ad.apply(this, arguments);
};
}
})();
var DGR_REACH = 3.2, DGR_SHOT_REACH = 16, DGR_RING = 30, DGR_ASK_S = 20, DGR_AGREE_S = 900;
function dgrBookPlay(id) { if (id !== "drakkyn" && id !== "winters-heart")
return false; try {
return !(typeof cbtBookFree === "function" && cbtBookFree(id));
}
catch (e) {
return true;
} }
function dgrOwnFight(id) { return id === "battle" || id === "race" || dgrBookPlay(id); }
function dgrFightHere() {
if (!(typeof WLD !== "undefined" && WLD && WLD.on && WLD.w) || (typeof walkMode !== "undefined" && !walkMode))
return false;
if (store.inside)
return false;
var id = dgrWhere();
if (dgrOwnFight(id) || dgrLevelOf(id) < 1)
return false;
return true;
}
function dgrInRing(x, z) { var A = WLD.arrive; if (!A)
return false; return Math.hypot(x - A.x, z - A.z) < DGR_RING; }
function dgrMeLocal() { var P = camera.position; return { x: P.x - WLD.w.base, z: P.z }; }
function dgrOthers() { return __ZC(342, 1, this, arguments, new.target); }
function dgrShooting() { try {
var A = carrying && ARMS[carrying.archetype];
return !!(A && A.shot);
}
catch (e) {
return false;
} }
function dgrTarget() { return __ZC(342, 2, this, arguments, new.target); }
function dgrAgreed(id) { return DGR.ok[id] > Date.now(); }
function dgrStrike(o) { return __ZC(342, 3, this, arguments, new.target); }
function dgrChallenge(o) { return __ZC(342, 4, this, arguments, new.target); }
function dgrAnswer(yes) { return __ZC(342, 5, this, arguments, new.target); }
function dgrHurt(d, from, name) { return __ZC(342, 6, this, arguments, new.target); }
function dgrBeaten(by, name) { return __ZC(342, 7, this, arguments, new.target); }
function dgrWake() {
DGR.downT = 0;
DGR.hp = DGR.max;
DGR.hurt = 0;
DGR.guard = 20;
var W = WLD.w, A = WLD.arrive;
if (!W || !A)
return;
var gy = 0;
try {
if (W.ground)
gy = +W.ground(A.x, A.z, 0) || 0;
}
catch (e) { }
camera.position.set(W.base + A.x, gy + 1.72, A.z);
if (typeof flyY !== "undefined")
flyY = 0;
pitch = 0;
}
function dgrWon(r) {
var g = +((r.body && r.body.gold) || 0), n = r.name || "They";
setStatus("⚔️ <b>" + esc(n) + " is beaten.</b>" + (g > 0 ? " You take <b>" + g.toLocaleString() + " gold</b> from their purse." : ""));
if (typeof playTone === "function")
try {
playTone(660, 0.2);
}
catch (e) { }
}
function dgrPoll() { return __ZC(342, 8, this, arguments, new.target); }
function dgrAsked(from, name, w) { return __ZC(342, 9, this, arguments, new.target); }
function dgrHudEl() {
if (DGR.hud || !document.body)
return;
var h = document.createElement("div");
h.id = "dgr-hud";
h.style.cssText = "position:fixed;left:50%;top:calc(52px + env(safe-area-inset-top,0px));transform:translateX(-50%);z-index:44;display:none;pointer-events:none;" +
"background:rgba(10,12,20,.82);border:1px solid #8A6A5A;border-radius:10px;padding:3px 10px;font:12px var(--sans,system-ui);color:#F0E8E0;white-space:nowrap";
document.body.appendChild(h);
DGR.hud = h;
var v = document.createElement("div");
v.id = "dgr-veil";
v.style.cssText = "position:fixed;inset:0;z-index:43;pointer-events:none;opacity:0;background:radial-gradient(ellipse at center,rgba(0,0,0,0) 55%,rgba(150,20,20,.75) 100%)";
document.body.appendChild(v);
DGR.veil = v;
var b = document.createElement("button");
b.id = "dgr-btn";
b.type = "button";
b.textContent = "⚔️ Strike";
b.style.cssText = "position:fixed;z-index:45;display:none;right:calc(12px + env(safe-area-inset-right,0px));bottom:calc(250px + env(safe-area-inset-bottom,0px));" +
"background:rgba(40,14,12,.92);color:#FFE0D0;border:1px solid #C86A5A;border-radius:18px;padding:9px 16px;font:600 14px system-ui,sans-serif";
b.onclick = function (ev) { ev.stopPropagation(); var o = dgrTarget(); if (o)
dgrStrike(o); };
document.body.appendChild(b);
DGR.btn = b;
if (typeof PS_KEEP !== "undefined")
PS_KEEP["dgr-btn"] = 1;
}
function dgrHudTick(dt, tgt) {
dgrHudEl();
if (!DGR.hud)
return;
var fight = dgrFightHere(), show = fight && (DGR.hp < DGR.max || DGR.t - DGR.fought < 10);
if (show) {
var pc = Math.max(0, DGR.hp / DGR.max), col = pc > 0.5 ? "#8FDCA4" : pc > 0.25 ? "#F2D684" : "#F28A84";
var h = "Vigour <span style='display:inline-block;vertical-align:middle;width:110px;height:8px;border-radius:4px;background:rgba(255,255,255,.15);overflow:hidden'><span style='display:block;height:100%;width:" + Math.round(pc * 100) + "%;background:" + col + "'></span></span> " + Math.round(DGR.hp);
if (DGR.hud.dataset.h !== h) {
DGR.hud.dataset.h = h;
DGR.hud.innerHTML = h;
}
}
var hs = show ? "block" : "none";
if (DGR.hud.style.display !== hs)
DGR.hud.style.display = hs;
DGR.hurt = Math.max(0, DGR.hurt - dt * 0.8);
var want = fight ? Math.min(0.45, DGR.hurt * 0.6) : 0;
var cur = +DGR.veil.style.opacity || 0, nx = cur + (want - cur) * Math.min(1, dt * 4);
if (Math.abs(nx - cur) > 0.002 || (!want && cur))
DGR.veil.style.opacity = nx < 0.003 ? "0" : nx.toFixed(3);
var touch = typeof padTouch === "function" ? padTouch() : (typeof matchMedia === "function" && matchMedia("(pointer:coarse)").matches);
var bs = (tgt && touch && (dgrLevelOf(dgrWhere()) > 1 || dgrAgreed(tgt.id))) ? "block" : "none";
if (DGR.btn.style.display !== bs)
DGR.btn.style.display = bs;
}
function dgrTick(dt) {
DGR.t += dt;
if (DGR.cool > 0)
DGR.cool -= dt;
if (DGR.guard > 0)
DGR.guard -= dt;
dgrWatch(dt);
dgrSayTick(dt);
if (DGR.downT > 0) {
DGR.downT -= dt;
if (DGR.veil)
DGR.veil.style.opacity = "0.5";
if (DGR.downT <= 0)
dgrWake();
return;
}
var fight = dgrFightHere();
if (fight) {
DGR.quiet += dt;
if (DGR.quiet > 8 && DGR.hp < DGR.max)
DGR.hp = Math.min(DGR.max, DGR.hp + dt * 5);
DGR.net.at -= dt;
if (DGR.net.at <= 0) {
DGR.net.at = (DGR.t - DGR.fought < 15) ? 0.9 : 1.6;
dgrPoll();
}
}
else if (typeof WLD !== "undefined" && WLD.on === "battle" && !store.inside) {
DGR.net.at -= dt;
if (DGR.net.at <= 0) {
DGR.net.at = 1.6;
dgrPoll();
}
}
else if (DGR.hp < DGR.max && !(typeof WLD !== "undefined" && WLD.on)) {
DGR.hp = DGR.max;
}
dgrDropsTick(dt);
if (DGR.ask && DGR.ask.until < Date.now()) {
DGR.ask = null;
}
var tgt = fight ? dgrTarget() : null;
if (DGR.dropNear) {
dgrHudTick(dt, null);
return;
}
var mine = !!WLD.promptFn && WLD.promptFn === DGR.myFn;
if (tgt && (!WLD.promptFn || mine)) {
var lv = dgrLevelOf(dgrWhere()), fn;
if (lv === 1 && !dgrAgreed(tgt.id)) {
fn = function () { if (!(DGR.mine[tgt.id] > Date.now()))
dgrChallenge(tgt); };
worldPrompt(DGR.mine[tgt.id] > Date.now() ? "🤝 Waiting for <b>" + esc(tgt.name) + "</b> to answer your challenge" : "🤝 <b>" + esc(tgt.name) + "</b> · <b>press E</b> to challenge them to a fight", fn);
}
else {
fn = function () { dgrStrike(tgt); };
worldPrompt("⚔️ <b>" + esc(tgt.name) + "</b> · <b>press E</b> to strike", fn);
}
DGR.myFn = fn;
}
else if (mine) {
worldPrompt(null);
DGR.myFn = null;
}
dgrHudTick(dt, tgt);
}
(function () {
if (typeof transitTick !== "function")
return;
var tt = transitTick;
transitTick = function (dt) { tt(dt); try {
dgrTick(dt);
}
catch (e) {
if (!DGR.e1) {
DGR.e1 = 1;
if (window.console)
console.warn("[dgr] tick", e);
}
} };
})();
(function () {
if (typeof useCarried !== "function")
return;
var uc = useCarried;
useCarried = function () { try {
var o = dgrTarget();
if (o && (dgrLevelOf(dgrWhere()) > 1 || dgrAgreed(o.id))) {
dgrStrike(o);
return;
}
}
catch (e) { } return uc.apply(this, arguments); };
})();
if (typeof addEventListener === "function")
addEventListener("keydown", function (e) {
if (e.code !== "KeyF" || e.repeat || carrying || /INPUT|TEXTAREA|SELECT/.test((e.target && e.target.tagName) || ""))
return;
try {
var o = dgrTarget();
if (o && (dgrLevelOf(dgrWhere()) > 1 || dgrAgreed(o.id))) {
e.preventDefault();
e.stopImmediatePropagation();
dgrStrike(o);
}
}
catch (er) { }
}, true);
setTimeout(function () { dgrLoad(true); }, 4000);
function dgrDropName(d) {
if (d && d.kind === "artifact" && typeof RA !== "undefined" && RA.list && RA.list[d.ref] && RA.list[d.ref].name)
return RA.list[d.ref].name;
return (d && d.name) || "something rare";
}
function dgrDropHeard(d) {
if (!d || !d.id || DGR.drops[d.id])
return;
DGR.drops[d.id] = d;
if (d.quiet)
return;
setStatus("✨ <b>" + esc(d.by || "They") + " dropped " + esc(dgrDropName(d)) + "</b> where they fell. It is yours if you pick it up within ten minutes.");
}
function dgrDropsHere(d) { var id = dgrWhere(); return d.w === id || (d.w === "battle" && WLD.on === "battle"); }
function dgrDropMark(d) { return __ZC(342, 10, this, arguments, new.target); }
function dgrDropUnmark(d) { if (d.g) {
if (d.g.parent)
d.g.parent.remove(d.g);
d.g.traverse(function (m) { if (m.geometry)
m.geometry.dispose(); if (m.material)
m.material.dispose(); });
d.g = null;
} }
function dgrDropsTick(dt) {
DGR.dropNear = null;
var now = Date.now(), inW = typeof WLD !== "undefined" && WLD.on && WLD.w && !store.inside;
if (inW && dgrSigned() && !DGR.net.missing) {
var k = WLD.on;
if (!(DGR.dropsAt[k] > now)) {
DGR.dropsAt[k] = now + 120000;
dgrRpc("danger_drops_mine", {}).then(function (o) { (o && o.rows || []).forEach(function (r) { dgrDropHeard({ id: r.id, kind: r.kind, ref: r.ref, name: r.name, x: +r.x, z: +r.z, w: r.w, by: null, until: Date.now() + (+r.left || 0) * 1000, quiet: 1 }); }); }).catch(function () { });
}
}
Object.keys(DGR.drops).forEach(function (id) {
var d = DGR.drops[id];
if (d.until < now || d.taken) {
dgrDropUnmark(d);
delete DGR.drops[id];
return;
}
if (!inW || !dgrDropsHere(d)) {
if (d.g && (!inW || d.wg !== WLD.w.g))
dgrDropUnmark(d);
return;
}
dgrDropMark(d);
if (d.g && d.g.userData.gem)
d.g.userData.gem.rotation.y += dt * 0.8;
var L = dgrMeLocal();
if (Math.hypot(L.x - d.x, L.z - d.z) < 2.6)
DGR.dropNear = d;
});
var D = DGR.dropNear;
if (!D && DGR.dropFn && WLD.promptFn === DGR.dropFn) {
worldPrompt(null);
DGR.dropFn = null;
}
if (D)
DGR.dropFn = function () { dgrDropTake(D); };
if (D)
worldPrompt("✨ <b>" + esc(dgrDropName(D)) + "</b>" + (D.by ? " · dropped by " + esc(D.by) : "") + " · <b>press E</b> to pick it up", DGR.dropFn);
}
function dgrDropTake(d) { return __ZC(342, 11, this, arguments, new.target); }
(function () {
if (typeof bwPaidOut !== "function")
return;
var bp = bwPaidOut;
bwPaidOut = function (src) {
var r = bp.apply(this, arguments);
try {
if (src && src.pvp && src.id && dgrSigned() && dgrLevelOf("battle") >= 3) {
var L = dgrMeLocal();
dgrRpc("danger_drop_ironfray", { p_by: src.id, p_x: L.x, p_z: L.z }).then(function (o) {
if (o && o.ok && o.drop)
setTimeout(function () {
if (typeof bwSay === "function")
bwSay("<b>You drop " + esc(dgrDropName(o.drop)) + "</b> where you fell. " + esc(src.name || "Whoever beat you") + " has ten minutes to pick it up.", true);
}, 2500);
}).catch(function () { });
}
}
catch (e) { }
return r;
};
})();
var ELW = { built: false, task: null, step: 0, busy: null, t: 0, ring: null, pillar: null, drifts: [], lamps: [], gifts: null, giftsAt: 0, giftsBusy: false, today: null, cap: null, missing: false, started: 0, lastSay: "" };
var ELW_HUT = { x: 42, z: 30 };
var ELW_LAMPS = (function () { var o = []; for (var i = 0; i < 6; i++) {
var a = Math.PI / 6 + i * Math.PI / 3;
o.push([Math.round(Math.cos(a) * 16 * 10) / 10, Math.round((18 + Math.sin(a) * 16) * 10) / 10]);
} return o; })();
var ELW_DRIFTS = [[-18, 22], [18, 24], [-30, 0], [32, 4], [-8, 38], [12, -14]];
var ELW_TASKS = [
{ k: "firewood", n: "Firewood for the workshop", icon: "🪵", min: 45, say: "The workshop stove eats logs all night. Three armfuls from the woodpile by my hut to the log basket at the workshop door would warm a hundred elves.",
steps: [[35, 25, "The woodpile", "take an armful of logs", 2, "an armful of logs"], [7, -24, "The log basket by the workshop door", "stack the logs", 2, null],
[35, 25, "The woodpile", "take an armful of logs", 2, "an armful of logs"], [7, -24, "The log basket by the workshop door", "stack the logs", 2, null],
[35, 25, "The woodpile", "take an armful of logs", 2, "an armful of logs"], [7, -24, "The log basket by the workshop door", "stack the logs", 2, null]] },
{ k: "hay", n: "Hay for the reindeer", icon: "🌾", min: 40, say: "Santa's reindeer need their supper. Fetch hay from the bales at the end of the stable, and give a forkful to Dasher, Vixen, Donner, and Rudolph last of all.",
steps: [[-78, -22, "The hay bales", "fork up some hay", 2, "a forkful of hay"], [-72, -12, "Dasher's stall", "give Dasher the hay", 2, null],
[-78, -22, "The hay bales", "fork up some hay", 2, "a forkful of hay"], [-63, -12, "Vixen's stall", "give Vixen the hay", 2, null],
[-78, -22, "The hay bales", "fork up some hay", 2, "a forkful of hay"], [-54, -12, "Donner's stall", "give Donner the hay", 2, null],
[-78, -22, "The hay bales", "fork up some hay", 2, "a forkful of hay"], [-62, -3, "Rudolph", "give Rudolph the hay", 2, null]] },
{ k: "letters", n: "Letters for the List", icon: "✉️", min: 80, say: "The post box is full to the brim with letters. Carry the sacks to Penwick at the Office of the List, out past the workshop, so every letter is read.",
steps: [[59, 1.5, "The post box", "lift a sack of letters", 2, "a sack of letters"], [14, -108, "The Office of the List", "hand the sack to Penwick", 2, null],
[59, 1.5, "The post box", "lift a sack of letters", 2, "a sack of letters"], [14, -108, "The Office of the List", "hand the sack to Penwick", 2, null]] },
{ k: "paths", n: "Clear the village paths", icon: "❄️", min: 40, say: "It snowed again in the night (it always does). Six drifts are blocking the paths round the green. A shovel is by each one.",
steps: ELW_DRIFTS.map(function (d, i) { return [d[0], d[1], "A snowdrift on the path", "shovel it clear", 3, null, "drift", i]; }) },
{ k: "cocoa", n: "A cocoa round", icon: "☕", min: 120, say: "The elves out at the far workshops have been at it since dawn. Take a mug of cocoa to Tamsin at the Foundry, Fizz at the Toy-Testing Hall, Sorrel at the Flying Paddock and Tansy at the Wrapping House.",
steps: [[35.5, 30, "The cocoa table by the hut", "take four mugs of cocoa", 2, "four mugs of cocoa"], [89, -94, "Tamsin at the Sleigh-Bell Foundry", "hand Tamsin a mug", 2, "three mugs of cocoa"],
[-56, 121, "Fizz at the Toy-Testing Hall", "hand Fizz a mug", 2, "two mugs of cocoa"], [-89, -95, "Sorrel at the Flying Paddock", "hand Sorrel a mug", 2, "a mug of cocoa"],
[15, 134, "Tansy at the Wrapping House", "hand Tansy the last mug", 2, null]] },
{ k: "mend", n: "Mend the broken toys", icon: "🧸", min: 20, say: "A basket of toys came back from testing a little worse for wear. At the mending bench by my hut: glue, sand, paint, varnish, and a new tag.",
steps: [[35, 35, "The mending bench", "glue the broken pieces", 4, null], [35, 35, "The mending bench", "sand the edges smooth", 4, null], [35, 35, "The mending bench", "paint them bright again", 4, null],
[35, 35, "The mending bench", "varnish them", 4, null], [35, 35, "The mending bench", "tie on new tags", 3, null]] },
{ k: "lights", n: "String the lights", icon: "💡", min: 40, say: "The lamp posts round the great tree have lost their lights. Hang a fresh string on each of the six, and the green will glow again.",
steps: ELW_LAMPS.map(function (d, i) { return [d[0] + 1.2, d[1], "A lamp post by the great tree", "hang a string of lights", 2, null, "lamp", i]; }) }
];
var ELW_T = {};
ELW_TASKS.forEach(function (T) { ELW_T[T.k] = T; });
var ELW_WARDEN = "Clementine, the elves' volunteer warden";
function elwOn() { return typeof WLD !== "undefined" && WLD.on === "northpole"; }
function elwSigned() { return typeof signedIn === "function" && signedIn(); }
function elwRpc(n, a) { return typeof cityRpc === "function" ? cityRpc(n, a || {}) : Promise.reject(new Error("offline")); }
function elwSoft(e) { return dgrMissing(e) ? "The elves' gift room opens very soon." : esc((e && e.message) || e || ""); }
function elwSay(h) { ELW.lastSay = h; if (typeof setStatus === "function")
setStatus(h); }
function elwBuild(G) { return __ZC(342, 12, this, arguments, new.target); }
(function () {
if (typeof npBuild !== "function")
return;
var nb = npBuild;
npBuild = function (G) { var r = nb.apply(this, arguments); try {
elwBuild(G);
}
catch (e) {
if (window.console)
console.warn("[elv] build", e);
} return r; };
})();
function elwOpen() { return __ZC(342, 13, this, arguments, new.target); }
function elwStart(k) { return __ZC(342, 14, this, arguments, new.target); }
function elwStop(msg) {
var k = ELW.task;
ELW.task = null;
ELW.step = 0;
ELW.busy = null;
if (k === "paths")
ELW.drifts.forEach(function (g) { g.visible = false; });
if (k === "lights")
ELW.lamps.forEach(function (L) { elwLamp(L, true); });
if (ELW.ring) {
ELW.ring.visible = false;
ELW.pillar.visible = false;
}
if (msg)
elwSay(msg);
}
function elwLamp(L, on) { L.bulbs.children.forEach(function (b) { b.material.color.setHex(on ? b.userData.on : 0x3A3A40); }); }
function elwCarry() { var T = ELW.task && ELW_T[ELW.task]; if (!T || !ELW.step)
return null; var s = T.steps[ELW.step - 1]; return s && s[5]; }
function elwDoStep() {
var T = ELW_T[ELW.task];
if (!T)
return;
var s = T.steps[ELW.step];
if (!s)
return;
if (s[4] > 0) {
ELW.busy = { until: ELW.t + s[4], s: s, total: s[4] };
if (typeof playTone === "function")
try {
playTone(520, 0.12);
}
catch (e) { }
return;
}
elwStepDone(s);
}
function elwStepDone(s) { return __ZC(342, 15, this, arguments, new.target); }
function elwFinish(T) { return __ZC(342, 16, this, arguments, new.target); }
function elwGiftCard(g) { return __ZC(342, 17, this, arguments, new.target); }
function elwBannerLine() { return __ZC(342, 18, this, arguments, new.target); }
(function () {
if (typeof worldBanner !== "function")
return;
var wb = worldBanner;
worldBanner = function (html) { try {
if (html) {
var l = elwBannerLine();
if (l)
html = html + l;
}
}
catch (e) { } return wb.call(this, html); };
})();
function elwTick(dt) {
ELW.t += dt;
if (!elwOn()) {
if (ELW.task && !(typeof WLD !== "undefined" && WLD.on))
elwStop(null);
return;
}
if (ELW.pillar && ELW.pillar.visible)
ELW.ring.rotation.z += dt * 0.4;
var T = ELW.task && ELW_T[ELW.task];
if (!T || store.inside)
return;
var s = T.steps[ELW.step];
if (!s)
return;
var y = npHeight(s[0], s[1]);
if (ELW.ring) {
ELW.ring.visible = true;
ELW.pillar.visible = true;
ELW.ring.position.set(s[0], y + 0.08, s[1]);
ELW.pillar.position.set(s[0], y + 3.5, s[1]);
}
var L = worldLocal(), d = Math.hypot(L.x - s[0], L.z - s[1]);
if (ELW.busy) {
if (d > 4) {
ELW.busy = null;
elwSay("You step away before it is done. Come back to the golden ring to finish.");
return;
}
var left = ELW.busy.until - ELW.t;
if (left <= 0)
return elwStepDone(ELW.busy.s);
var pc = Math.round((1 - left / ELW.busy.total) * 100);
worldPrompt("<b>" + esc(s[2]) + "</b> · you " + esc(s[3]) + "… " + pc + "%", function () { });
return;
}
if (d < 2.6)
worldPrompt("<b>" + esc(s[2]) + "</b> · <b>press E</b> to " + esc(s[3]), elwDoStep);
}
(function () {
if (typeof transitTick !== "function")
return;
var tt = transitTick;
transitTick = function (dt) { tt(dt); try {
elwTick(dt);
}
catch (e) {
if (!ELW.e1) {
ELW.e1 = 1;
if (window.console)
console.warn("[elv] tick", e);
}
} };
})();
function elwGiftsLoad() { return __ZC(342, 19, this, arguments, new.target); }
(function () {
if (typeof bkpHtml !== "function")
return;
var bh = bkpHtml;
bkpHtml = function () {
var h = bh.apply(this, arguments);
try {
if (!elwSigned())
return h;
if (ELW.gifts === null || Date.now() - ELW.giftsAt > 60000) {
if (!ELW.missing)
elwGiftsLoad();
}
var G = ELW.gifts || [];
if (!G.length)
return h;
h += bkpHead("🎁 Gifts from the North Pole");
G.forEach(function (g) {
h += bkpRow((g.icon || "🎁") + " <b>" + esc(g.name) + "</b>", bkpDim("by " + esc(g.maker || "an elf") + " · No. " + esc(String(g.id))) +
" <button class='btn' data-elwgive='" + esc(String(g.id)) + "' style='padding:2px 8px;font-size:12px'>Give</button>");
});
}
catch (e) { }
return h;
};
})();
if (typeof document !== "undefined")
document.addEventListener("click", function (e) {
var t = e.target && e.target.closest ? e.target.closest("[data-elwgive]") : null;
if (!t)
return;
e.preventDefault();
e.stopPropagation();
elwGiveCard(+t.getAttribute("data-elwgive"));
}, true);
function elwGiveCard(id) { return __ZC(342, 20, this, arguments, new.target); }
function elwGive(g, p) { return __ZC(342, 21, this, arguments, new.target); }
(function () {
if (typeof hxHub !== "function")
return;
var hh = hxHub;
hxHub = function () {
var r = hh.apply(this, arguments);
try {
if (elwOn() && WLD.card && WLD.card.style.display === "block" && !WLD.card.querySelector("[data-elw]")) {
var d = document.createElement("div");
d.setAttribute("data-elw", "1");
d.innerHTML = "<div style='margin:12px 0 2px;font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:#C9A868'>Volunteer</div>" + worldBtn("elw", "🎄 Help the elves", "Jobs at the Helpers' Hut on the green; every one done earns a one-of-a-kind gift");
WLD.card.appendChild(d);
var b = d.querySelector("[data-w='elw']");
b.style.cursor = "pointer";
b.onclick = function (ev) { ev.stopPropagation(); worldCard(null); if (typeof hxGuideTo === "function")
hxGuideTo("northpole", ELW_HUT.x - 6, ELW_HUT.z - 2, "The Helpers' Hut"); };
}
}
catch (e) { }
return r;
};
})();
(function () {
var q = null;
try {
q = new URLSearchParams(location.search);
}
catch (e) {
return;
}
if (!q.get("kelf"))
return;
var tries = 0;
function tick() {
if (++tries > 80)
return;
if (!(typeof amKeeper === "function" && amKeeper()) || typeof worldGo !== "function") {
setTimeout(tick, 1500);
return;
}
try {
q.delete("kelf");
var s = q.toString().replace(/^play=(&|$)/, "play$1");
history.replaceState(null, "", location.pathname + (s ? "?" + s : "") + location.hash);
}
catch (e) { }
worldGo("northpole");
setTimeout(function () { camera.position.set(NP.base + ELW_HUT.x - 8, 1.72, ELW_HUT.z - 2); yaw = -Math.PI / 2; }, 400);
}
setTimeout(tick, 3000);
})();
var DGR_BOOKS = [
["poe", "Poe's Dream-Land and Paris (Dangerous; the Catacombs are Deadly)", 3],
["grimm", "The Grimm Wood and Kassel (Dangerous: wolves, witches and worse)", 3],
["dracula", "Dracula's land (Dangerous)", 3],
["frankenstein", "Frankenstein (Dangerous: the creature, the ice)", 3],
["warworlds", "The War of the Worlds (Deadly: the Martians spare no one)", 4],
["invisible", "The Invisible Man (Risky)", 2],
["phantom", "The Phantom of the Opera (Risky)", 2],
["tarzan", "Tarzan's jungle (Dangerous)", 3],
["wonderland", "Wonderland (Guarded: much shouting of 'off with her head', little harm)", 1],
["lookingglass", "Through the Looking-Glass (Guarded)", 1],
["homer", "Greece of the myths: Troy, the Odyssey, the heroes (Dangerous)", 3],
["cthulhu", "The Call of Cthulhu (Deadly)", 4],
["drakkyn", "Heart of the Drakkyn (Dangerous)", 3],
["winters-heart", "Winter's Heart (Risky)", 2],
["arcturus", "A Voyage to Arcturus (Risky)", 2],
["laputa", "Laputa and Balnibarbi (Guarded)", 1],
["lostworld", "The Lost World (Dangerous: dinosaurs and ape-men)", 3],
["timemachine", "The Time Machine (Dangerous: the Morlocks)", 3],
["bard", "Shakespeare's worlds (Risky: swords and poison)", 2]
];
function dgrBookLevels() {
DGR_BOOKS.forEach(function (b) {
var row = null;
DGR_WORLDS.forEach(function (r) { if (r[0] === b[0])
row = r; });
if (row) {
row[1] = b[1];
row[2] = b[2];
}
else
DGR_WORLDS.push(row = [b[0], b[1], b[2], "hidden"]);
DGR_W[b[0]] = { id: b[0], name: b[1], def: b[2], group: row[3] };
});
var lo = dgrLevelOf;
dgrLevelOf = function (id) {
var n = lo.apply(this, arguments);
try {
if (id === "poe" && typeof WLD !== "undefined" && WLD.on === "poe" && typeof POE !== "undefined" && POE.room && typeof POE_RX !== "undefined" && (POE.room === POE_RX.x_cat || POE.room === POE_RX.x_flamel) && n >= 1)
return Math.max(n, 4);
}
catch (e) { }
return n;
};
}
if (document.readyState === "complete")
setTimeout(dgrBookLevels, 0);
else
addEventListener("load", function () { setTimeout(dgrBookLevels, 0); });
