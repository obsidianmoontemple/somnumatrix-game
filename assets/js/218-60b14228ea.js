/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var CTY = { open: false, tab: "weather", pj: null, pr: null, say: "", busy: {}, at: {}, sel: 0, warned: 0, sites: {}, q: {}, giveUp: {}, promptKey: null, bank: null };
var CTY_SPOT = { monument: { r0: 250, r1: 430, R: 6 }, fountain: { r0: 250, r1: 440, R: 9 }, carousel: { r0: 260, r1: 520, R: 10 }, library: { r0: 300, r1: 760, R: 21 }, windmill: { r0: 1760, r1: 1900, R: 9 } };
function ctyIn() { return typeof inCityNow === "function" && inCityNow() && !(typeof store !== "undefined" && store.inside) && !(typeof WLD !== "undefined" && WLD.on); }
function ctyHash(s) { var h = 2166136261; s = String(s); for (var i = 0; i < s.length; i++) {
h ^= s.charCodeAt(i);
h = Math.imul(h, 16777619);
} return h >>> 0; }
function ctyLoad(which, force) {
var name = which === "pj" ? "projects_board" : "prices_board";
if (CTY.busy[which] || (!force && Date.now() - (CTY.at[which] || 0) < (which === "pj" ? 30000 : 120000)) || typeof cityRpc !== "function")
return;
CTY.busy[which] = true;
CTY.at[which] = Date.now();
cityRpc(name, {}).then(function (o) { if (o && o.ok) {
CTY[which] = o;
if (which === "pj")
ctySitesDress();
if (which === "pr")
ctyBankDraw();
} })
.catch(function () { }).then(function () { CTY.busy[which] = false; ctyPaint(); });
}
function ctyAct(name, args, then) { return __ZC(218, 0, this, arguments, new.target); }
function ctyProgress(p) { return Math.min(1, (Math.min(1, p.gold / Math.max(1, p.gold_goal)) + Math.min(1, p.work / Math.max(1, p.work_goal))) / 2); }
function ctyClear(x, z, R, cityId) { return __ZC(218, 1, this, arguments, new.target); }
function ctyPlaceTick() {
var B = CTY.pj;
if (!B || !B.projects)
return;
if (typeof ATLC === "undefined" || !ATLC || typeof RMAP === "undefined" || !RMAP.list || !RMAP.list.length)
return;
var cr = somnucorRealm();
if (!cr || (store.here || 0) !== cr.id)
return;
var p = B.projects.filter(function (p) { return (p.status === "open" || p.status === "built") && !CTY.sites[p.key] && !CTY.giveUp[p.key] && CTY_SPOT[p.key]; })[0];
if (!p)
return;
var C = CTY_SPOT[p.key], salt = ctyHash(p.key) % 628 / 100, phone = typeof LITE !== "undefined" && !!LITE;
CTY.q[p.key] = CTY.q[p.key] || 0;
for (var t = 0; t < (phone ? 3 : 6); t++) {
var nA = 48, ri = Math.floor(CTY.q[p.key] / nA), qa = CTY.q[p.key] % nA, rad = C.r0 + ri * 10;
if (rad > C.r1) {
CTY.giveUp[p.key] = true;
return;
}
var a = salt + (qa % 2 ? 1 : -1) * Math.ceil(qa / 2) * Math.PI * 2 / nA, x = ATLC.x + Math.cos(a) * rad, z = ATLC.z + Math.sin(a) * rad;
CTY.q[p.key]++;
if (ctyClear(x, z, C.R, cr.id)) {
ctySiteBuild(p, x, z, Math.atan2(ATLC.x - x, ATLC.z - z));
return;
}
}
}
function ctyM(c, o) { return new THREE.MeshLambertMaterial(Object.assign({ color: c }, o || {})); }
function ctySignTex(p) { return __ZC(218, 2, this, arguments, new.target); }
function ctySiteBuild(p, x, z, th) { return __ZC(218, 3, this, arguments, new.target); }
function ctySiteDress(S, p) { return __ZC(218, 4, this, arguments, new.target); }
function ctySitesDress() {
var B = CTY.pj;
if (!B || !B.projects)
return;
B.projects.forEach(function (p) {
var S = CTY.sites[p.key];
if (!S)
return;
if (p.status !== "open" && p.status !== "built") {
scene.remove(S.g);
delete CTY.sites[p.key];
return;
}
ctySiteDress(S, p);
});
}
(function () {
if (typeof blockedAt !== "function")
return;
var ba = blockedAt;
blockedAt = function (x, z, feet) {
if (!(typeof store !== "undefined" && store.inside)) {
for (var k in CTY.sites) {
var S = CTY.sites[k];
if (!S || !S.body || S.signKey.indexOf("built") !== 0)
continue;
if (Math.abs(x - S.x) > S.R || Math.abs(z - S.z) > S.R || feet > S.y + 30)
continue;
var K = KIT[(CTY.pj.projects.filter(function (p) { return p.key === k; })[0] || {}).arch], r = K ? Math.min(K.size[0], K.size[2]) * 0.42 : 2;
if (Math.hypot(x - S.x, z - S.z) < r)
return true;
}
}
return ba.apply(this, arguments);
};
})();
function ctySiteNear() {
if (!ctyIn())
return null;
var P = camera.position, best = null, bd = 1e9;
for (var k in CTY.sites) {
var S = CTY.sites[k];
if (!S)
continue;
var d = Math.hypot(P.x - S.x, P.z - S.z);
if (d < S.R + 5 && d < bd) {
bd = d;
best = S;
}
}
return best;
}
function ctyBankTick() {
var I = (typeof INT !== "undefined") ? INT : null;
if (!I || !I.spec || I.spec.archetype !== "bank") {
CTY.bank = null;
return;
}
if (!CTY.bank || CTY.bank.root !== I.root) {
var c = document.createElement("canvas");
c.width = 512;
c.height = 384;
var t = new THREE.CanvasTexture(c);
if (THREE.SRGBColorSpace)
t.colorSpace = THREE.SRGBColorSpace;
var m = new THREE.Mesh(new THREE.PlaneGeometry(2.6, 1.95), new THREE.MeshBasicMaterial({ map: t }));
var lx = -I.W / 2 + 0.14, lz = I.D / 4;
m.position.set(lx, 2.0, lz);
m.rotation.y = Math.PI / 2;
I.root.add(m);
var fr = new THREE.Mesh(new THREE.BoxGeometry(0.06, 2.1, 2.75), ctyM(0x3A2A1C));
fr.position.set(lx - 0.05, 2.0, lz);
I.root.add(fr);
CTY.bank = { root: I.root, ctx: c.getContext("2d"), tex: t, x: I.ox + lx, z: I.oz + lz };
ctyBankDraw();
ctyLoad("pr", false);
}
}
function ctyBankDraw() { return __ZC(218, 5, this, arguments, new.target); }
var CTY_KIND = { home: "Home goods", wear: "Clothes", food: "Food and drink", ride: "Rides", tool: "Tools", book: "Books", pet: "Pets", art: "Art", gem: "Gems and jewels", magic: "Magic", music: "Music", garden: "Garden" };
function ctyKindName(k) { return CTY_KIND[k] || (String(k).charAt(0).toUpperCase() + String(k).slice(1)); }
(function () {
if (typeof tsTick !== "function")
return;
var tt = tsTick;
tsTick = function () {
var r = tt.apply(this, arguments);
try {
ctyBankTick();
var Bk = CTY.bank;
if (Bk && Math.hypot(camera.position.x - Bk.x, camera.position.z - Bk.z) < 3.2 && typeof tsPrompt === "function")
tsPrompt("📈 <b>Market prices</b> · <b>press E</b> to see what is dearer and cheaper, and city wages", function () { CTY.tab = "prices"; ctyOpen(); });
}
catch (e) { }
return r;
};
})();
function ctyPromptTick() {
if (typeof WLD !== "undefined" && WLD.on)
return;
var S = ctySiteNear(), b = null;
if (S) {
var p = (CTY.pj && CTY.pj.projects || []).filter(function (q) { return q.key === S.key; })[0];
if (p && p.status === "open")
b = { html: "🏗️ <b>" + esc(p.name) + "</b> · " + Math.round(ctyProgress(p) * 100) + "% built · <b>press E</b> to lend a hand or give gold", fn: function () { CTY.tab = "projects"; CTY.sel = p.id; ctyOpen(); } };
else if (p && p.status === "built")
b = { html: "🏛️ <b>" + esc(p.name) + "</b> · built by the dreamers of Somnucor · <b>press E</b> to read who gave", fn: function () { CTY.tab = "projects"; CTY.sel = p.id; ctyOpen(); } };
}
var key = b ? b.html : null;
if (key !== CTY.promptKey) {
CTY.promptKey = key;
if (typeof worldPromptCity === "function")
worldPromptCity(b ? b.html : null, b ? b.fn : null);
}
}
function ctyBar(v, max, col) { var f = Math.min(1, v / Math.max(1, max)); return '<div style="height:10px;background:#2A2620;border-radius:5px;overflow:hidden;margin:3px 0 6px"><div style="height:100%;width:' + Math.round(f * 100) + '%;background:' + col + '"></div></div>'; }
function ctyWhen(ms) { var d = new Date(ms); return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }); }
function ctyWeatherHtml() { return __ZC(218, 6, this, arguments, new.target); }
function ctyProjectsHtml() { return __ZC(218, 7, this, arguments, new.target); }
function ctyPricesHtml() { return __ZC(218, 8, this, arguments, new.target); }
function ctyHtml() { return __ZC(218, 9, this, arguments, new.target); }
function ctyPaint() {
var el = document.getElementById("cty-box");
if (!CTY.open) {
if (el)
el.style.display = "none";
return;
}
if (!el) {
el = document.createElement("div");
el.id = "cty-box";
el.style.cssText = "position:fixed;z-index:53;left:50%;top:50%;transform:translate(-50%,-50%);width:min(520px,calc(100vw - 32px));max-height:min(84vh,760px);overflow-y:auto;" +
"background:linear-gradient(180deg,rgba(16,20,28,.97),rgba(8,9,13,.98));border:1px solid #C9A868;border-radius:8px;padding:12px 14px 14px;color:var(--bone,#C9BEA8);" +
"font:13px var(--sans,system-ui);box-shadow:0 14px 50px rgba(0,0,0,.6);-webkit-overflow-scrolling:touch";
el.addEventListener("keydown", function (e) { e.stopPropagation(); });
el.addEventListener("click", ctyClick);
document.body.appendChild(el);
}
var keep = {};
el.querySelectorAll("input[id^=cty-g-]").forEach(function (f) { keep[f.id] = f.value; });
el.innerHTML = ctyHtml();
el.style.display = "block";
Object.keys(keep).forEach(function (id) { var f = document.getElementById(id); if (f)
f.value = keep[id]; });
}
function ctyClick(e) { return __ZC(218, 10, this, arguments, new.target); }
function ctyOpen() { CTY.open = true; CTY.say = ""; ctyPaint(); ctyLoad("pj", true); if (CTY.tab === "prices")
ctyLoad("pr", true); if (typeof cwxLoad === "function")
cwxLoad(true); if (document.exitPointerLock)
try {
document.exitPointerLock();
}
catch (e) { } }
if (typeof backRegister === "function")
backRegister({ order: 2, open: function () { return CTY.open; }, close: function () { CTY.open = false; ctyPaint(); } });
(function () {
if (typeof tnRows !== "function")
return;
var tr = tnRows;
tnRows = function () {
var rows = tr.apply(this, arguments);
try {
var p = (CTY.pj && CTY.pj.projects || []).filter(function (q) { return q.status === "open"; })[0];
if (p)
rows.push(["🏗️", "<b>" + esc(p.name) + "</b> · the city is building it, " + Math.round(ctyProgress(p) * 100) + "% done · give gold or lend a hand (☰ Menu → 🏙️ City)", false]);
}
catch (e) { }
return rows;
};
})();
(function () {
function hook() {
var bar = document.getElementById("me-bar");
if (!bar)
return setTimeout(hook, 900);
if (document.getElementById("me-city"))
return;
var b = document.createElement("button");
b.className = "btn";
b.id = "me-city";
b.title = "The city's weather, its building projects and its market prices";
b.textContent = "🏙️ City";
b.onclick = function () { ctyOpen(); };
var pk = document.getElementById("me-stalls") || document.getElementById("me-shows");
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
if (ctyIn())
ctyPlaceTick();
}
catch (e) {
if (!CTY.warned && window.console) {
CTY.warned = 1;
console.warn("[city-life]", e);
}
}
try {
for (var k in CTY.sites) {
var S = CTY.sites[k];
if (S)
S.g.visible = ctyIn() && Math.hypot(camera.position.x - S.x, camera.position.z - S.z) < 520;
}
}
catch (e) { }
try {
ctyPromptTick();
}
catch (e) { }
}, 400);
setInterval(function () {
try {
if (ctyIn() || CTY.open)
ctyLoad("pj", false);
}
catch (e) { }
try {
if (CTY.bank || (CTY.open && CTY.tab === "prices"))
ctyLoad("pr", false);
}
catch (e) { }
}, 10000);
