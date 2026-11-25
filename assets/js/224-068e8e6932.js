/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var RR = { b: null, at: 0, busy: false, open: false, tab: "mine", say: "", offer: {}, zone: null, zoneEl: null, meshes: {}, t: 0, warned: 0, told: {} };
var RR_PLACE = { mall: "the World Mall", underground: "the Underground", neverland: "Neverland", sea: "the Endless Sea", underdark: "the Underdark", northpole: "the North Pole",
station: "Station Aurora", casino: "the Moon casino", space: "open space", moon: "the Moon", mars: "Mars", mercury: "Mercury", venus: "Venus", jupiter: "Jupiter", saturn: "Saturn",
uranus: "Uranus", neptune: "Neptune", pluto: "Pluto", veyar: "Veyar" };
function rrPlace(k) { if (RR_PLACE[k])
return RR_PLACE[k]; if (/^land_/.test(k || "")) {
try {
if (typeof dkPlaceName === "function") {
var n = dkPlaceName(k);
if (n)
return n;
}
}
catch (e) { }
return "the dream land of " + String(k).slice(5);
} return k || "somewhere"; }
function rrLoad(force) {
if (RR.busy || typeof cityRpc !== "function" || (!force && Date.now() - RR.at < 90000))
return Promise.resolve(RR.b);
RR.busy = true;
RR.at = Date.now();
return cityRpc("rare_board", {}).then(function (o) { if (o && o.ok) {
RR.b = o;
rrSyncRelics();
} RR.busy = false; if (RR.open)
rrPaint(); return o; })
.catch(function () { RR.busy = false; return null; });
}
function rrAct(name, args, then) { return __ZC(224, 0, this, arguments, new.target); }
function rrMine() { return (RR.b && RR.b.mine) || []; }
function rrSyncRelics() { try {
if (typeof rlEffects === "function")
rlEffects();
}
catch (e) { } }
function rrHolds(key) {
if (!RR.b)
return typeof RL !== "undefined" && !!(RL.worn && RL.worn[key]);
return rrMine().some(function (r) { return r.relic === key && r.carried; });
}
if (typeof rlOwned === "function") {
var rrRlOwned0 = rlOwned;
rlOwned = function (key) { return rrRlOwned0(key) || rrHolds(key); };
}
function rrUse(id) { return __ZC(224, 1, this, arguments, new.target); }
function rrCarry(id, carry) { return __ZC(224, 2, this, arguments, new.target); }
function rrZoneNow() {
if (typeof inCityNow !== "function" || !inCityNow())
return null;
if (typeof WLD !== "undefined" && WLD.on)
return null;
return (typeof inWilds === "function" && inWilds()) ? "wilds" : "rings";
}
function rrZoneTick() {
var z = rrZoneNow(), rule = (RR.b && RR.b.rings) || "protected";
if (!RR.zoneEl) {
var el = document.createElement("div");
el.id = "rr-zone";
el.style.cssText = "position:fixed;z-index:30;right:12px;top:156px;padding:3px 9px;border-radius:12px;font:12px var(--sans,system-ui);pointer-events:auto;cursor:help;" +
"background:rgba(10,12,16,.72);border:1px solid rgba(201,168,104,.45);color:#E8E0D0;display:none";
el.onclick = function () { rrZoneTell(true); };
if (typeof GFX_PHONE !== "undefined" && GFX_PHONE) {
el.style.right = "auto";
el.style.left = "10px";
el.style.top = "calc(env(safe-area-inset-top,0px) + 92px)";
}
document.body.appendChild(el);
RR.zoneEl = el;
}
if (z !== RR.zone) {
RR.zone = z;
if (!z) {
RR.zoneEl.style.display = "none";
return;
}
RR.zoneEl.innerHTML = z === "wilds" ? "⚔️ Danger zone" : "🛡️ Safe zone";
RR.zoneEl.style.borderColor = z === "wilds" ? "rgba(224,120,90,.7)" : "rgba(120,200,150,.55)";
RR.zoneEl.title = z === "wilds" ? "The Wilds: fighting is open here. Carried rare things can be taken." : "The rings: a safe zone.";
RR.zoneEl.style.display = "block";
rrZoneTell(false);
}
if (z && rule !== RR.zoneRule) {
RR.zoneRule = rule;
}
}
function rrZoneTell(force) {
var z = RR.zone, rule = (RR.b && RR.b.rings) || "protected";
if (!z || typeof setStatus !== "function")
return;
if (!force && RR.told[z] && Date.now() - RR.told[z] < 600000)
return;
RR.told[z] = Date.now();
var carried = rrMine().filter(function (r) { return r.carried; }).length;
if (z === "wilds")
setStatus("⚔️ <b>The Wilds: a danger zone.</b> Fighting is open out here, with no crime and no arrest." +
(carried ? " You carry " + carried + " rare thing" + (carried > 1 ? "s" : "") + ": go down here and one can be taken." : " Keep rare things at home if you would not lose them."));
else
setStatus("🛡️ <b>The rings: a safe zone.</b> " + (rule === "none" ? "Nobody can be struck here." : rule === "open" ? "Striking someone is a crime the Corp may arrest you for." : "Striking someone is a crime, and nobody can be knocked down here."));
}
if (typeof assaultDreamer === "function") {
assaultDreamer = function (v) { return __ZC(224, 3, this, arguments, new.target); };
}
function rrPos(k, seed) {
if (typeof dkShardPos !== "function" || typeof DK === "undefined")
return null;
var keep = DK.st;
try {
DK.st = Object.assign({}, keep || {}, { season: Object.assign({}, (keep && keep.season) || {}, { id: 700000 + (+seed || 0) }) });
return dkShardPos(k);
}
catch (e) {
return null;
}
finally {
DK.st = keep;
}
}
function rrMesh(icon) { return __ZC(224, 4, this, arguments, new.target); }
function rrClear(keep) {
Object.keys(RR.meshes).forEach(function (id) { if (keep && keep[id])
return; var m = RR.meshes[id]; if (m && m.parent)
m.parent.remove(m); delete RR.meshes[id]; });
}
function rrHere(dt) {
var b = RR.b;
if (!b)
return null;
var k = typeof dkWhere === "function" ? dkWhere() : null, P = camera.position, feet = P.y - 1.72, best = null, bestD = 1e9, live = {};
RR.t += dt || 0;
if (k) {
(b.wild || []).forEach(function (w) {
if (w.world !== k)
return;
var p = rrPos(k, w.seed);
if (!p)
return;
var id = "w" + w.id;
live[id] = 1;
var m = RR.meshes[id];
if (!m) {
m = RR.meshes[id] = rrMesh(w.icon);
scene.add(m);
if (p.space)
m.scale.setScalar(12);
}
m.position.set(p.x, (p.space ? p.y : p.y + 1.3) + Math.sin(RR.t * 1.1 + w.id) * 0.1, p.z);
m.userData.gem.rotation.y += (dt || 0) * 0.7;
var d = p.space ? P.distanceTo(m.position) : Math.hypot(P.x - p.x, P.z - p.z);
if (d < (p.r || 2.4) + 0.6 && (p.space || Math.abs(feet - p.y) < 3) && d < bestD) {
bestD = d;
best = { html: (w.icon || "💎") + " <b>" + esc(w.name) + "</b>, a rare thing · <b>press E</b> to take it", fn: function () { rrTake(w.id, k); } };
}
});
}
if (k === "city" && typeof ATLC !== "undefined" && ATLC && !(typeof store !== "undefined" && store.inside)) {
(b.dropped || []).forEach(function (w) {
var x = ATLC.x + (+w.x), z = ATLC.z + (+w.z);
if (Math.hypot(P.x - x, P.z - z) > 120)
return;
var id = "d" + w.id;
live[id] = 1;
var m = RR.meshes[id];
if (!m) {
m = RR.meshes[id] = rrMesh(w.icon);
scene.add(m);
}
var y = typeof terrainY === "function" ? terrainY(x, z) : 0;
m.position.set(x, y + 0.9 + Math.sin(RR.t * 1.1 + w.id) * 0.08, z);
m.userData.gem.rotation.y += (dt || 0) * 0.7;
var d = Math.hypot(P.x - x, P.z - z);
if (d < 3 && d < bestD) {
bestD = d;
best = { html: (w.icon || "💎") + " <b>" + esc(w.name) + "</b> lies here, dropped in a fight · <b>press E</b> to pick it up", fn: function () { rrTake(w.id, null); } };
}
});
}
rrClear(live);
return best;
}
function rrTake(id, world) { return __ZC(224, 5, this, arguments, new.target); }
if (typeof dkHere === "function") {
var rrDkHere0 = dkHere;
dkHere = function (dt) { var b = rrDkHere0.apply(this, arguments); var r = null; try {
r = rrHere(dt);
}
catch (e) {
if (!RR.warned && window.console) {
RR.warned = 1;
console.warn("[rare]", e);
}
} return b || r; };
}
function rrBtn(a, label, extra) { return "<button class='btn' data-rr='" + a + "'" + (extra || "") + " style='margin:2px 4px 2px 0'>" + label + "</button>"; }
function rrHtml() { return __ZC(224, 6, this, arguments, new.target); }
function rrPaint() { return __ZC(224, 7, this, arguments, new.target); }
function rrClick(e) { return __ZC(224, 8, this, arguments, new.target); }
function rrOpen(tab) { RR.open = true; RR.say = ""; if (tab)
RR.tab = tab; rrPaint(); rrLoad(true); if (document.exitPointerLock)
try {
document.exitPointerLock();
}
catch (e) { } }
function rrBkpSection() { return __ZC(224, 9, this, arguments, new.target); }
function rrBkpHook() {
if (RR.bkpIn)
return true;
if (typeof bkpHtml !== "function" || typeof bkpLoad !== "function")
return false;
var rrBkpHtml0 = bkpHtml, rrBkpLoad0 = bkpLoad;
bkpHtml = function () { var h = rrBkpHtml0.apply(this, arguments); try {
return h + rrBkpSection();
}
catch (e) {
return h;
} };
bkpLoad = function () { var p = rrBkpLoad0.apply(this, arguments); rrLoad(true).then(function () { if (typeof bkpPaint === "function" && typeof BKP !== "undefined" && BKP.open)
bkpPaint(); }); return p; };
RR.bkpIn = true;
return true;
}
function rrWardHook() {
if (RR.wardIn)
return true;
if (typeof renderWardrobe !== "function")
return false;
var rw = renderWardrobe;
renderWardrobe = function () {
var out = rw.apply(this, arguments);
try {
if (typeof WARD_TAB !== "undefined" && WARD_TAB !== "body")
return out;
var w = document.getElementById("me-ward");
if (!w || typeof RL_BY === "undefined")
return out;
var home = rrMine().filter(function (r) { return r.relic && RL_BY[r.relic] && !r.carried; });
if (!home.length)
return out;
var d = document.createElement("div");
d.className = "lk-row";
d.innerHTML = '<div class="lk-h">Found relics, kept at home</div>' + home.map(function (r) {
var R = RL_BY[r.relic];
return '<button class="btn" data-rrw="' + (+r.id) + '" title="' + esc(R.does) + '" style="margin:0 4px 4px 0">' + esc(R.name.split(",")[0]) + (R.kind === "armour" ? " (carry and wear)" : " (carry and take up)") + '</button>';
}).join("");
var foot = w.querySelector("p:last-of-type");
if (foot)
w.insertBefore(d, foot);
else
w.appendChild(d);
Array.prototype.forEach.call(d.querySelectorAll("[data-rrw]"), function (b) { b.onclick = function () { rrUse(+b.getAttribute("data-rrw")); }; });
}
catch (e) { }
return out;
};
RR.wardIn = true;
return true;
}
(function () {
function hook() { rrBkpHook(); rrWardHook(); }
if (document.readyState === "loading")
document.addEventListener("DOMContentLoaded", hook);
else
setTimeout(hook, 0);
})();
if (typeof backRegister === "function")
backRegister({ order: 2, open: function () { return RR.open; }, close: function () { RR.open = false; rrPaint(); } });
(function () {
function hook() {
var bar = document.getElementById("me-bar");
if (!bar)
return setTimeout(hook, 900);
if (document.getElementById("me-rare"))
return;
var b = document.createElement("button");
b.className = "btn";
b.id = "me-rare";
b.title = "Rare things: yours, offers, the Register, and the safe and danger zones";
b.textContent = "💎 Rare things";
b.onclick = function () { rrOpen(); };
var pk = document.getElementById("me-games");
if (pk && pk.parentNode === bar && pk.nextSibling)
bar.insertBefore(b, pk.nextSibling);
else
bar.appendChild(b);
}
if (document.readyState === "loading")
document.addEventListener("DOMContentLoaded", hook);
else
hook();
})();
setInterval(function () {
try {
rrZoneTick();
if (!RR.bkpIn)
rrBkpHook();
if (!RR.wardIn)
rrWardHook();
var away = typeof dkWhere === "function" && dkWhere() && dkWhere() !== "city";
if (!document.hidden)
rrLoad(false || (away && Date.now() - RR.at > 45000));
}
catch (e) {
if (!RR.warned && window.console) {
RR.warned = 1;
console.warn("[rare]", e);
}
}
}, 1000);
"use strict";
var AR = { open: false, tab: "live", live: null, board: null, watch: null, wst: null, draw: {}, busy: false, at: 0, say: "", timer: null, warned: 0 };
var AR_KIND = { tag: "Laser tag", teams: "Team battle", duel: "Duel" };
var AR_SIDE = [["Red", "#FF8A8A"], ["Blue", "#8AD8FF"]];
function arErr(e) { return __ZC(224, 10, this, arguments, new.target); }
function arLoad() { return __ZC(224, 11, this, arguments, new.target); }
function arWhen(ms) { var s = Math.max(0, Math.round((Date.now() - ms) / 1000)); return s < 60 ? "just now" : s < 3600 ? Math.round(s / 60) + " min ago" : s < 86400 ? Math.round(s / 3600) + " h ago" : Math.round(s / 86400) + " d ago"; }
function arPlayers(g) { return (g.players || []).filter(function (r) { return !r.out || g.status === "done"; }); }
function arScore(g) { return __ZC(224, 12, this, arguments, new.target); }
function arResult(res, kind) {
if (!res || !res.played)
return "";
if (kind === "teams")
return res.team != null ? "<b style='color:" + AR_SIDE[res.team][1] + "'>" + AR_SIDE[res.team][0] + " won</b>" : "a draw";
return res.draw || !(res.winners || []).length ? "a draw" : "<b>" + (res.winners || []).map(esc).join(", ") + "</b> won";
}
function arBtn(a, label, extra) { return "<button class='btn' data-ar='" + a + "'" + (extra || "") + " style='margin:2px 4px 2px 0'>" + label + "</button>"; }
function arHtml() { return __ZC(224, 13, this, arguments, new.target); }
function arPaint() { return __ZC(224, 14, this, arguments, new.target); }
function arClick(e) { return __ZC(224, 15, this, arguments, new.target); }
function arWatchPoll() { return __ZC(224, 16, this, arguments, new.target); }
function arMap() { return __ZC(224, 17, this, arguments, new.target); }
function arTick() {
if (!AR.open || !AR.watch)
return;
var moved = false;
Object.keys(AR.draw).forEach(function (k) { var d = AR.draw[k]; if (d.tx == null)
return; var nx = d.x + (d.tx - d.x) * 0.35, nz = d.z + (d.tz - d.z) * 0.35; if (Math.abs(nx - d.x) + Math.abs(nz - d.z) > 0.01) {
d.x = nx;
d.z = nz;
moved = true;
} });
if (moved)
arMap();
}
function arOpen(tab) { return __ZC(224, 18, this, arguments, new.target); }
function arClose() { AR.open = false; AR.watch = null; arPaint(); }
var RP = { open: false, tab: "me", card: null, other: null, found: [], q: "", say: "", note: "", busy: false };
var RP_LV = { Honoured: ["🏅", "#F2D27A"], Respected: ["🎖️", "#B8E0A0"], Ordinary: ["🙂", "#C9D2E0"], Doubtful: ["⚠️", "#E8B070"], Notorious: ["☠️", "#F08A8A"], Keeper: ["👑", "#F2D27A"] };
function rpErr(e) { return __ZC(224, 19, this, arguments, new.target); }
function rpLoad() {
if (!(typeof signedIn === "function" && signedIn())) {
RP.card = { ok: false, say: "Sign in to see your standing." };
rpPaint();
return;
}
cityRpc("rep_card", { p_user: null }).then(function (o) { RP.card = o; }).catch(function (e) { RP.card = { ok: false, say: rpErr(e) }; }).then(rpPaint);
}
function rpLevel(lv) { var v = RP_LV[lv] || ["", ""]; return "<b style='color:" + v[1] + "'>" + v[0] + " " + esc(lv || "") + "</b>"; }
function rpBtn(a, label, extra) { return "<button class='btn' data-rp='" + a + "'" + (extra || "") + " style='margin:2px 4px 2px 0'>" + label + "</button>"; }
function rpBreakdown(r) { return __ZC(224, 20, this, arguments, new.target); }
function rpHeard(list) { return __ZC(224, 21, this, arguments, new.target); }
function rpHtml() { return __ZC(224, 22, this, arguments, new.target); }
function rpPaint() { return __ZC(224, 23, this, arguments, new.target); }
function rpFocus() { var q = document.getElementById("rp-q"); if (q) {
q.focus();
try {
q.setSelectionRange(q.value.length, q.value.length);
}
catch (e) { }
} }
function rpSee(id) { cityRpc("rep_card", { p_user: id }).then(function (o) { if (o && o.ok) {
RP.other = o;
RP.note = "";
}
else
RP.say = (o && o.say) || "No such dreamer."; }).catch(function (e) { RP.say = rpErr(e); }).then(rpPaint); }
function rpClick(e) { return __ZC(224, 24, this, arguments, new.target); }
function rpOpen(tab) { RP.open = true; RP.say = ""; if (tab)
RP.tab = tab; rpPaint(); rpLoad(); if (document.exitPointerLock)
try {
document.exitPointerLock();
}
catch (e) { } }
if (typeof LVL_BOARDS !== "undefined" && LVL_BOARDS.push) {
LVL_BOARDS.push(["arena", "🏟️ Arena champions (wins, 30 days)"], ["honoured", "🏅 Most honoured"]);
}
if (typeof backRegister === "function") {
backRegister({ order: 2, open: function () { return AR.open; }, close: function () { if (AR.watch) {
AR.watch = null;
arPaint();
}
else
arClose(); } });
backRegister({ order: 2, open: function () { return RP.open; }, close: function () { RP.open = false; rpPaint(); } });
}
(function () {
function hook() {
var bar = document.getElementById("me-bar");
if (!bar)
return setTimeout(hook, 900);
if (document.getElementById("me-arena"))
return;
var b = document.createElement("button");
b.className = "btn";
b.id = "me-arena";
b.title = "Arenas: watch live matches, results and champions";
b.textContent = "🏟️ Arenas";
b.onclick = function () { arOpen(); };
var r = document.createElement("button");
r.className = "btn";
r.id = "me-rep";
r.title = "Reputation: your standing, and your neighbours' word";
r.textContent = "🏅 Reputation";
r.onclick = function () { rpOpen(); };
var pk = document.getElementById("me-rare") || document.getElementById("me-games");
if (pk && pk.parentNode === bar && pk.nextSibling) {
bar.insertBefore(b, pk.nextSibling);
bar.insertBefore(r, b.nextSibling);
}
else {
bar.appendChild(b);
bar.appendChild(r);
}
}
if (document.readyState === "loading")
document.addEventListener("DOMContentLoaded", hook);
else
hook();
})();
"use strict";
var HA = { since: 0, busy: false, at: 0, signs: {}, signMesh: {}, art: {}, artAt: {}, tex: {}, open: false, tab: "mine", d: null, gal: null, page: 0, say: "", price: {}, sign: {}, up: null, warned: 0, first: true };
function haInCity() {
var r = typeof somnucorRealm === "function" ? somnucorRealm() : null;
return !!(r && (store.here || 0) === r.id);
}
function haRpc(name, body) {
if (typeof signedIn === "function" && signedIn())
return cityRpc(name, body);
if (typeof restRpc === "function" && typeof DW_CONFIG !== "undefined" && DW_CONFIG.supabaseUrl)
return restRpc(name, body);
return Promise.resolve(null);
}
function haIntLot() { var k = typeof INT !== "undefined" && INT && INT.wpKey; var m = k && /^lot:(\d+)$/.exec(k); return m ? +m[1] : 0; }
function haPoll() {
if (HA.busy || document.hidden)
return;
if (!haInCity() && !haIntLot())
return;
HA.busy = true;
haRpc("lots_changed", { p_since: HA.since }).then(function (o) {
if (!o || !o.ok)
return;
var first = !HA.since;
HA.since = o.now;
var redraw = false, inLot = haIntLot(), rebuild = false;
(o.lots || []).forEach(function (r) {
var rec = null;
for (var i = 0; i < cityLots.length; i++)
if (cityLots[i].lot_id === r.lot_id) {
rec = cityLots[i];
break;
}
if (!rec)
return;
if (JSON.stringify(rec.decor || {}) === JSON.stringify(r.decor || {}))
return;
rec.decor = r.decor || {};
redraw = true;
if (r.lot_id === inLot)
rebuild = true;
});
if (redraw && typeof applyLotDecor === "function")
applyLotDecor();
var marked = {};
(o.marked || []).forEach(function (id) { marked[id] = 1; });
if (first)
HA.signs = {};
else
Object.keys(marked).forEach(function (id) { delete HA.signs[id]; });
(o.signs || []).forEach(function (s) { HA.signs[s.lot_id] = { text: s.text, colour: s.colour }; });
haSignsDraw(first ? null : marked);
if (inLot && marked[inLot] && !first) {
delete HA.artAt[inLot];
haArtLoad(inLot);
}
if (rebuild && !(typeof wpEditing !== "undefined" && wpEditing) && typeof rebuildHere === "function") {
rebuildHere();
setStatus("✨ This house was just rearranged by the one who lives here.");
}
}).catch(function () { }).then(function () { HA.busy = false; HA.at = Date.now(); });
}
function haSignTex(text, colour) { return __ZC(224, 25, this, arguments, new.target); }
function haBoardOf(name) {
var os = store.objects || [];
for (var i = 0; i < os.length; i++) {
var o = os[i];
if (o.plot && o.plot.name === name)
return o;
}
return null;
}
function haSignMesh(s) { return __ZC(224, 26, this, arguments, new.target); }
function haSignsDraw(only) { return __ZC(224, 27, this, arguments, new.target); }
function haSignsShow() {
var on = haInCity() && !(typeof store !== "undefined" && store.inside) && !(typeof WLD !== "undefined" && WLD.on);
Object.keys(HA.signMesh).forEach(function (id) { var m = HA.signMesh[id]; if (m.visible !== on)
m.visible = on; });
}
function haArtTex(a) {
if (HA.tex["a:" + a.art])
return HA.tex["a:" + a.art];
var img = new Image(), t = new THREE.Texture(img);
img.onload = function () { t.needsUpdate = true; };
img.src = a.data;
HA.tex["a:" + a.art] = t;
return t;
}
function haArtMesh(a) { return __ZC(224, 28, this, arguments, new.target); }
function haArtLoad(lot) { return __ZC(224, 29, this, arguments, new.target); }
if (typeof makeInterior === "function") {
var haMakeInt0 = makeInterior;
makeInterior = function (spec) { return __ZC(224, 30, this, arguments, new.target); };
}
function haShrink(file) { return __ZC(224, 31, this, arguments, new.target); }
function haErr(e) { return __ZC(224, 32, this, arguments, new.target); }
function haLoad() {
if (!(typeof signedIn === "function" && signedIn())) {
HA.d = { ok: false, say: "Sign in to put up pictures and signs." };
haPaint();
return;
}
cityRpc("art_mine", {}).then(function (o) { HA.d = o; }).catch(function (e) { HA.d = { ok: false, say: haErr(e) }; }).then(haPaint);
if (HA.tab === "gallery")
haGallery();
}
function haGallery() { cityRpc("art_gallery", { p_page: HA.page }).then(function (o) { HA.gal = o; }).catch(function (e) { HA.gal = { ok: false, say: haErr(e) }; }).then(haPaint); }
function haBtn(a, label, extra) { return "<button class='btn' data-ha='" + a + "'" + (extra || "") + " style='margin:2px 4px 2px 0'>" + label + "</button>"; }
function haMyLotHere() { var lot = haIntLot(); if (!lot)
return 0; return (typeof standing !== "undefined" && standing && (standing.lots || []).some(function (l) { return l.lot_id === lot; })) || (typeof amKeeper === "function" && amKeeper()) ? lot : 0; }
function haThumb(a) { return "<img src='" + esc(a.data) + "' alt='' style='width:72px;height:72px;object-fit:cover;border-radius:4px;border:1px solid #6A5A3A;flex:none'>"; }
var HA_ST = { pending: "⏳ waiting for a moderator", approved: "✅ approved", rejected: "❌ not approved" };
function haHtml() { return __ZC(224, 33, this, arguments, new.target); }
function haPaint() { return __ZC(224, 34, this, arguments, new.target); }
function haSignNow(id) { var l = ((HA.d && HA.d.lots) || []).filter(function (x) { return String(x.id) === String(id); })[0] || {}; return { text: l.sign || "", colour: l.colour || "#E8D9B0" }; }
function haAct(name, body, after) {
return cityRpc(name, body).then(function (o) { HA.say = (o && o.say) || ""; if (after)
after(o); }).catch(function (e) { HA.say = haErr(e); }).then(function () { haLoad(); });
}
function haUpload(file) { return __ZC(224, 35, this, arguments, new.target); }
function haWallAhead(I, lv, fx, fz) { return __ZC(224, 36, this, arguments, new.target); }
function haClick(e) { return __ZC(224, 37, this, arguments, new.target); }
function haOpen(tab) { HA.open = true; HA.say = ""; if (tab)
HA.tab = tab; haPaint(); haLoad(); var l = haIntLot(); if (l)
haArtLoad(l); if (document.exitPointerLock)
try {
document.exitPointerLock();
}
catch (e) { } }
if (typeof backRegister === "function")
backRegister({ order: 2, open: function () { return HA.open; }, close: function () { HA.open = false; haPaint(); } });
(function () {
function hook() {
var bar = document.getElementById("me-bar");
if (!bar)
return setTimeout(hook, 900);
if (document.getElementById("me-art"))
return;
var b = document.createElement("button");
b.className = "btn";
b.id = "me-art";
b.title = "Art and signs: your pictures, the Gallery, and your lot's sign";
b.textContent = "🖼️ Art and signs";
b.onclick = function () { haOpen(); };
var pk = document.getElementById("me-rep") || document.getElementById("me-rare");
if (pk && pk.parentNode === bar && pk.nextSibling)
bar.insertBefore(b, pk.nextSibling);
else
bar.appendChild(b);
}
if (document.readyState === "loading")
document.addEventListener("DOMContentLoaded", hook);
else
hook();
})();
setInterval(function () {
try {
haSignsShow();
if (Date.now() - HA.at > (haIntLot() ? 6000 : 10000))
haPoll();
}
catch (e) {
if (!HA.warned && window.console) {
HA.warned = 1;
console.warn("[homes]", e);
}
}
}, 1000);
