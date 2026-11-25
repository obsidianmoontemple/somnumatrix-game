/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var PSTD = { key: "dreamwalker.resume", saveAt: 0, offered: false, menu: null, sheet: null, tucked: {}, sm: { f: 0, s: 0, c: 0 } };
function psSpot() {
try {
if (!walkMode || store.inside || !(typeof inSomnucorNow === "function" && inSomnucorNow()) || typeof ATLC === "undefined" || !ATLC)
return null;
if (typeof DRIVE !== "undefined" && DRIVE && DRIVE.on)
return null;
var P = camera.position;
return { x: P.x - ATLC.x, z: P.z - ATLC.z, yaw: yaw, t: Date.now() };
}
catch (e) {
return null;
}
}
function psSave(why) {
var s = psSpot();
if (!s)
return;
s.why = why || "";
try {
localStorage.setItem(PSTD.key, JSON.stringify(s));
}
catch (e) { }
}
function psLost(e) { return __ZC(233, 0, this, arguments, new.target); }
(function () {
var tries = 0;
(function hook() {
if (typeof renderer !== "undefined" && renderer && renderer.domElement) {
renderer.domElement.addEventListener("webglcontextlost", psLost, false);
return;
}
if (++tries < 120)
setTimeout(hook, 500);
})();
var away = function () { if (LITE || psIsPhone())
psSave("hidden"); };
document.addEventListener("visibilitychange", function () { if (document.hidden)
away(); });
addEventListener("pagehide", away);
})();
function psOffer() {
if (PSTD.offered)
return;
var r = null;
try {
r = JSON.parse(localStorage.getItem(PSTD.key) || "null");
}
catch (e) { }
if (!r || Date.now() - r.t > 20 * 60000) {
PSTD.offered = true;
return;
}
if (!walkMode || store.inside || !(typeof inSomnucorNow === "function" && inSomnucorNow()) || typeof ATLC === "undefined" || !ATLC)
return;
if (typeof ATL_JOB !== "undefined" && ATL_JOB)
return;
PSTD.offered = true;
if (Math.hypot(camera.position.x - ATLC.x - r.x, camera.position.z - ATLC.z - r.z) < 30)
return;
var X = ATLC.x + r.x, Z = ATLC.z + r.z, nm = null;
try {
var nb = typeof nearestNamed === "function" && nearestNamed(X, Z, 90);
if (nb && nb.name)
nm = nb.name;
}
catch (e) { }
if (!nm && store.workplaceAt) {
var bd = 8100;
Object.keys(store.workplaceAt).forEach(function (k) { var w = store.workplaceAt[k], dd = (w.x - X) * (w.x - X) + (w.z - Z) * (w.z - Z); if (dd < bd) {
bd = dd;
nm = k;
} });
}
var lost = r.why === "lost", where = nm ? "by " + esc(nm) : "where you were";
var d = document.createElement("div");
d.id = "ps-back";
d.innerHTML = '<span>' + (lost ? "The dream slipped for a moment. Back to where you were, " + where + "?" : "You were last " + where + ". Show the way back?") + '</span>' +
'<button type="button" data-a="go">' + (lost ? "Put me back" : "Show the way") + '</button><button type="button" data-a="no" class="b2">No</button>';
var at0 = { x: camera.position.x, z: camera.position.z };
d.addEventListener("click", function (ev) {
var a = ev.target && ev.target.getAttribute("data-a");
if (!a)
return;
if (a === "go" && lost) {
camera.position.x = X;
camera.position.z = Z;
if (typeof terrainY === "function")
camera.position.y = terrainY(X, Z) + 1.72;
if (typeof r.yaw === "number")
yaw = r.yaw;
if (typeof flyY !== "undefined")
flyY = 0;
}
else if (a === "go" && typeof guideTo !== "undefined") {
guideTo = { key: nm || "where you were", x: X, z: Z };
setStatus("<b>" + (nm ? esc(nm) : "Where you were") + "</b>: follow the pointer at the top of the screen.");
}
try {
localStorage.removeItem(PSTD.key);
}
catch (e) { }
d.remove();
});
document.body.appendChild(d);
var watch = setInterval(function () {
if (!d.parentNode) {
clearInterval(watch);
return;
}
var busy = (typeof WORK !== "undefined" && WORK && WORK.open) || !!document.querySelector("#ps-sheet.on");
d.style.display = busy ? "none" : "";
if (Math.hypot(camera.position.x - at0.x, camera.position.z - at0.z) > 12) {
d.remove();
clearInterval(watch);
}
}, 400);
setTimeout(function () { if (d.parentNode)
d.remove(); }, 20000);
}
function psGiveBack(root) { return __ZC(233, 1, this, arguments, new.target); }
(function () {
if (typeof worldOff !== "function")
return;
var wo = worldOff;
worldOff = function () {
var W = (typeof WLD !== "undefined" && WLD) ? WLD.w : null;
var r = wo.apply(this, arguments);
if (W && W.g && (LITE || psIsPhone())) {
var g = W.g;
setTimeout(function () { if (!g.visible)
try {
psGiveBack(g);
}
catch (e) { } }, 1500);
}
return r;
};
})();
(function () {
if (typeof driveInput !== "function")
return;
var di = driveInput;
driveInput = function () {
var r = di.apply(this, arguments);
if (!(typeof touchRig !== "undefined" && touchRig))
return r;
var D = (typeof DRIVE !== "undefined") ? DRIVE : null, dt = Math.min(0.1, (D && D.dt) || 0.016), k = 1 - Math.exp(-dt * 6), sm = PSTD.sm;
var s = r.s * (0.35 + 0.65 * Math.abs(r.s));
sm.s += (s - sm.s) * k;
sm.f += (r.f - sm.f) * k;
sm.c += (((r.up ? 1 : 0) - (r.down ? 1 : 0)) - sm.c) * (1 - Math.exp(-dt * 4));
if (!r.s && Math.abs(sm.s) < 0.02)
sm.s = 0;
if (!r.f && Math.abs(sm.f) < 0.02)
sm.f = 0;
r.s = sm.s;
r.f = sm.f;
if (D && D.mode === "fly")
r.c = Math.abs(sm.c) < 0.02 ? 0 : sm.c;
return r;
};
})();
var PS_CSS = "#ps-lost{position:fixed;inset:0;z-index:99999;background:#0B0A14;color:#EDE8F8;display:flex;align-items:center;justify-content:center;text-align:center;font:16px/1.5 Georgia,serif;padding:24px}" +
"#ps-back{position:fixed;left:50%;transform:translateX(-50%);top:calc(70px + env(safe-area-inset-top,0px));z-index:60;background:rgba(14,12,26,.94);color:#EDE8F8;border:1px solid #3A3160;border-radius:14px;padding:10px 12px;font:14px system-ui,sans-serif;display:flex;flex-wrap:wrap;gap:8px;align-items:center;max-width:calc(100vw - 32px)}" +
"#ps-back button{background:#E8C66A;color:#17120A;border:0;border-radius:12px;padding:6px 14px;font:600 14px system-ui,sans-serif}#ps-back button.b2{background:#2A2448;color:#EDE8F8}" +
"#ps-menu{display:none}" +
"#ps-phone{display:none;position:fixed;z-index:46;padding:0 12px;font:600 13px system-ui,sans-serif;color:#EDE8F8;cursor:pointer;white-space:nowrap}" +
"#ps-phone.ph{border-radius:20px;background:rgba(7,8,11,.66);border:1px solid rgba(232,198,106,.55)}" +
"#ps-phone.pc{border-radius:3px;background:rgba(7,8,11,.72);border:1px solid rgba(201,190,168,.45)}#ps-phone.pc:hover{background:rgba(30,26,52,.9)}" +
"#ps-phone i{font-style:normal;display:inline-block;min-width:16px;margin-left:6px;padding:0 5px;border-radius:9px;background:#E8C66A;color:#17120A;font-size:11px}" +
"body.ps-phone #ps-menu{display:block;position:fixed;z-index:46;right:calc(10px + env(safe-area-inset-right,0px));top:calc(48px + env(safe-area-inset-top,0px));height:40px;padding:0 14px;border-radius:20px;background:rgba(7,8,11,.66);color:#EDE8F8;border:1px solid rgba(232,198,106,.55);font:600 14px system-ui,sans-serif}" +
"body.ps-phone #ps-menu i{font-style:normal;display:inline-block;min-width:16px;margin-left:6px;padding:0 5px;border-radius:9px;background:#E8C66A;color:#17120A;font-size:11px}" +
"#ps-sheet{position:fixed;z-index:58;left:0;right:0;bottom:0;max-height:70vh;overflow:auto;background:rgba(12,10,22,.97);border-top:1px solid #3A3160;border-radius:18px 18px 0 0;padding:14px 12px calc(16px + env(safe-area-inset-bottom,0px));display:none;font:14px system-ui,sans-serif;color:#EDE8F8}" +
"#ps-sheet.on{display:block}#ps-sheet h3{margin:0 0 10px;font:600 16px Georgia,serif;display:flex;justify-content:space-between;align-items:center}" +
"#ps-sheet h3 button{background:#2A2448;color:#EDE8F8;border:0;border-radius:12px;padding:6px 12px;font:600 14px system-ui,sans-serif}" +
"#ps-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:8px}" +
"#ps-grid button{min-height:44px;border-radius:12px;background:#1E1A34;color:#EDE8F8;border:1px solid #3A3160;font:600 14px system-ui,sans-serif;padding:6px 8px;text-align:center}" +
"#ps-grid .ps-h{grid-column:1/-1;margin:8px 2px -2px;font:600 12px system-ui,sans-serif;letter-spacing:.06em;text-transform:uppercase;color:#C9B27A}" +
"#ps-grid .ps-h:first-child{margin-top:0}" +
"#ps-grid .ps-dd{display:flex;justify-content:space-between;align-items:center;margin:0;padding:11px 12px;border-radius:12px;background:#17142A;border:1px solid #3A3160;cursor:pointer;min-height:22px}" +
"#ps-grid .ps-dd.on{background:#221D3C;border-color:#8A7440}#ps-grid .ps-dd b{font-weight:600;color:#A8A0C0;letter-spacing:0}" +
"#ps-grid .ps-dd:hover{border-color:#C9B27A}#ps-grid button.ps-shut{display:none}" +
"body.ps-phone .ps-tuck{visibility:hidden!important;pointer-events:none!important}" +
"body.ps-phone.ps-walk #title,body.ps-phone.ps-walk #count{display:none!important}" +
"body.ps-phone.ps-walk #timebar:not(.ps-show){display:none!important}" +
"body.ps-phone.ps-walk #compass{top:calc(40px + env(safe-area-inset-top,0px))!important;left:8px!important}" +
"body.ps-phone.ps-walk #compass svg{width:46px!important;height:46px!important}" +
"body.ps-phone.ps-walk #compass>*:not(svg){display:none!important}" +
"body.ps-phone.ps-walk #realmname{top:calc(40px + env(safe-area-inset-top,0px))!important;font-size:12px!important;padding:2px 8px!important}" +
"body.ps-phone.ps-walk #place{top:calc(68px + env(safe-area-inset-top,0px))!important;font-size:12px!important}" +
"body.ps-phone.ps-walk #realmname:not(.gone)~#place{top:calc(68px + env(safe-area-inset-top,0px))!important}" +
"body.ps-phone #pdside{top:auto!important;bottom:calc(100px + env(safe-area-inset-bottom,0px))!important;transform:scale(.72);transform-origin:right bottom}" +
"body.ps-phone #pw-bar{top:calc(98px + env(safe-area-inset-top,0px))!important;bottom:auto!important;left:8px!important;right:52px!important;max-width:none!important;flex-wrap:nowrap!important;overflow-x:auto!important;overflow-y:hidden!important;-webkit-overflow-scrolling:touch;scrollbar-width:none}" +
"body.ps-phone #pw-bar button{flex:0 0 auto;height:38px!important;min-width:38px!important;padding:2px 9px!important}" +
"body.ps-phone #bug-btn{top:calc(94px + env(safe-area-inset-top,0px))!important;bottom:auto!important;left:auto!important;right:calc(10px + env(safe-area-inset-right,0px))!important;width:34px!important;height:34px!important}" +
"body.ps-pc #ps-menu{display:block;position:fixed;z-index:46;left:calc(12px + env(safe-area-inset-left,0px));top:calc(160px + env(safe-area-inset-top,0px));height:36px;padding:0 16px;border-radius:3px;background:rgba(7,8,11,.72);color:#EDE8F8;border:1px solid rgba(232,198,106,.55);font:600 14px system-ui,sans-serif;cursor:pointer}" +
"body.ps-pc #ps-menu:hover{background:rgba(30,26,52,.9)}" +
"body.ps-pc #ps-menu i{font-style:normal;display:inline-block;min-width:16px;margin-left:6px;padding:0 5px;border-radius:9px;background:#E8C66A;color:#17120A;font-size:11px}" +
"body.ps-pc #ps-sheet{left:calc(12px + env(safe-area-inset-left,0px));right:auto;bottom:auto;top:calc(202px + env(safe-area-inset-top,0px));width:min(360px,calc(100vw - 24px));max-height:calc(100vh - 220px);border:1px solid #3A3160;border-radius:10px;padding:12px;box-shadow:0 10px 30px rgba(0,0,0,.55)}" +
"body.ps-pc #ps-grid{grid-template-columns:1fr 1fr}" +
"body.ps-pc #ps-grid button{min-height:38px;cursor:pointer}body.ps-pc #ps-grid button:hover{border-color:#E8C66A}" +
"body.ps-pc #ps-sheet h3 button{cursor:pointer}" +
"body.ps-pc .ps-tuck{visibility:hidden!important;pointer-events:none!important}" +
"body.ps-pc #pdside #pd-abil.ps-tuck{position:absolute!important}" +
"body.ps-pc #pd-powers{z-index:48!important}";
var PS_KEEP = { "bug-btn": 1, "ps-menu": 1, "join-btn": 1 };
var PS_PC_KEEP = { "mb-prompt": 1, "desk-btn": 1, "street-btn": 1 };
function psIsPhone() {
return !!(typeof touchRig !== "undefined" && touchRig) && (Math.min(innerWidth, innerHeight) < 700 || innerHeight > innerWidth && innerWidth < 900);
}
function psCandidates(pc) {
var out = [];
["me-bar", "sp-bar"].forEach(function (id) {
var bar = document.getElementById(id);
if (bar)
Array.prototype.forEach.call(bar.querySelectorAll("button"), function (b) { out.push({ el: b, box: bar }); });
});
Array.prototype.forEach.call(document.querySelectorAll("body > button[id]"), function (b) {
if (PS_KEEP[b.id] || (pc && PS_PC_KEEP[b.id]))
return;
var cs = getComputedStyle(b);
if (cs.position !== "fixed")
return;
out.push({ el: b, box: b });
});
if (pc) {
var pa = document.getElementById("pd-abil");
if (pa)
out.push({ el: pa, box: pa, label: "✨ Powers" });
}
return out;
}
function psAvailable(el) { return __ZC(233, 2, this, arguments, new.target); }
var PS_ICON = { "work-btn": "💼", "post-btn": "📮", "gaz-btn": "📰", "wh-btn": "🛍️", "street-btn": "🚶", "me-dress": "👗", "me-view": "👁️", "me-cityview": "🔭" };
function psLabel(el) { return __ZC(233, 3, this, arguments, new.target); }
var PS_SECTIONS = [
{ k: "here", t: "Right here", ids: ["me-cityview", "me-hx", "me-wmw", "me-wmp", "rsy-btn", "wp-btn", "shape-btn", "desk-btn", "mb-prompt"] },
{ k: "you", t: "You", ids: ["ps-home-dream", "work-btn", "me-pack", "me-dress", "me-view", "me-emotes", "me-photo", "pd-abil", "me-breath", "me-lvl", "me-rep", "me-memory", "me-vr"] },
{ k: "people", t: "People", ids: ["ph-btn", "me-who", "street-btn", "me-family", "me-guild", "me-pets"] },
{ k: "news", t: "News and what's on", ids: ["post-btn", "gaz-btn", "me-tonight", "me-events", "fest-btn", "me-notices", "me-samhain"] },
{ k: "fun", t: "Fun and games", ids: ["me-parties", "me-shows", "me-media", "me-games", "me-arena", "me-battle", "me-hunt", "me-santa", "me-sports"] },
{ k: "stories", t: "Story worlds", ids: ["me-otemple", "me-maze", "me-grimm", "me-erebos", "me-verne", "me-bard", "me-davinci"] },
{ k: "places", t: "Places and getting about", ids: ["wtc-city", "wtc-hall", "me-worlds", "me-city", "me-door", "pass-btn", "tgl-btn", "me-wonders"] },
{ k: "work", t: "Work, crafts and guilds", ids: ["me-crafts", "me-mining", "me-guilds"] },
{ k: "shop", t: "Shops and making", ids: ["wh-btn", "me-bundles", "me-stalls", "me-rare", "me-elrelics", "me-art", "me-restyle", "me-homex", "me-models", "me-supply"] },
{ k: "more", t: "More", ids: [] },
{ k: "help", t: "Help and screen", ids: ["wgd-ps", "ps-time", "pd-fold"] }
];
var PS_EXTRAS = [];
function psSectionOf(id, box) { return __ZC(233, 4, this, arguments, new.target); }
function psMenuSections(pc, opt) { return __ZC(233, 5, this, arguments, new.target); }
function psPaintSheet() { return __ZC(233, 6, this, arguments, new.target); }
function psOpenSec(secs) {
if (PSTD.open === undefined) {
try {
PSTD.open = localStorage.getItem("somnu.ps.open") || "";
}
catch (e) {
PSTD.open = "";
}
}
if (PSTD.open === "-")
return "-";
for (var i = 0; i < secs.length; i++)
if (secs[i].k === PSTD.open)
return PSTD.open;
return secs.length ? secs[0].k : "";
}
PS_EXTRAS.push({ id: "ps-time",
show: function (pc) { return !pc && !!document.getElementById("timebar"); },
label: function () { var tb = document.getElementById("timebar"); return tb && tb.classList.contains("ps-show") ? "🕰️ Hide the time of day" : "🕰️ The time of day"; },
run: function () { var tb = document.getElementById("timebar"); if (tb)
tb.classList.toggle("ps-show"); } });
function psOpen() { psPaintSheet(); psPlace(); PSTD.sheet.classList.add("on"); }
function psPlace() {
if (!PSTD.pc) {
if (PSTD.placed) {
PSTD.placed = 0;
PSTD.menu.style.top = "";
PSTD.sheet.style.top = "";
PSTD.sheet.style.maxHeight = "";
}
return;
}
PSTD.placed = 1;
var bar = document.getElementById("me-bar"), r = bar && bar.getBoundingClientRect();
if (r && r.height > 0)
PSTD.pcTop = Math.round(r.top);
var top = PSTD.pcTop || 160;
if (PSTD.menu.style.top !== top + "px")
PSTD.menu.style.top = top + "px";
var st = top + 42 + "px";
if (PSTD.sheet.style.top !== st)
PSTD.sheet.style.top = st;
var mh = "calc(100vh - " + (top + 54) + "px)";
if (PSTD.sheet.style.maxHeight !== mh)
PSTD.sheet.style.maxHeight = mh;
}
function psClose() { if (PSTD.sheet)
PSTD.sheet.classList.remove("on"); }
function psPhonePill(show, n) {
var p = PSTD.pill;
if (!p) {
if (!show)
return false;
p = PSTD.pill = document.createElement("button");
p.id = "ps-phone";
p.type = "button";
p.title = "Your phone";
p.addEventListener("click", function (ev) { ev.stopPropagation(); psClose(); var b = document.getElementById("ph-btn"); if (b)
b.click(); });
document.body.appendChild(p);
}
var r = show && PSTD.menu ? PSTD.menu.getBoundingClientRect() : null;
if (!r || !r.width || !document.getElementById("ph-btn")) {
if (p.style.display !== "none")
p.style.display = "none";
return false;
}
var h = "📱 Phone" + (PSTD.pc ? " <small style='opacity:.7;font-weight:400'>(P)</small>" : "") + (n ? "<i>" + n + "</i>" : "");
if (p.innerHTML !== h)
p.innerHTML = h;
if (p.classList.contains("pc") !== !!PSTD.pc)
p.classList.toggle("pc", !!PSTD.pc);
if (p.classList.contains("ph") !== !PSTD.pc)
p.classList.toggle("ph", !PSTD.pc);
var st = PSTD.pc ? "display:block;left:" + Math.round(r.right + 8) + "px;right:auto;top:" + Math.round(r.top) + "px;height:" + Math.round(r.height) + "px"
: "display:block;right:" + Math.round(innerWidth - r.left + 8) + "px;left:auto;top:" + Math.round(r.top) + "px;height:" + Math.round(r.height) + "px";
if (p.getAttribute("data-st") !== st) {
p.setAttribute("data-st", st);
p.style.cssText = st;
}
return true;
}
function psBuild() {
if (PSTD.menu)
return;
var st = document.createElement("style");
st.textContent = PS_CSS;
document.head.appendChild(st);
var m = document.createElement("button");
m.id = "ps-menu";
m.type = "button";
m.innerHTML = "☰ Menu";
m.addEventListener("click", function () { if (PSTD.sheet.classList.contains("on"))
psClose();
else
psOpen(); });
document.body.appendChild(m);
PSTD.menu = m;
var s = document.createElement("div");
s.id = "ps-sheet";
s.innerHTML = '<h3><span>Menu</span><button type="button" id="ps-x">Close</button></h3><div id="ps-grid"></div>';
document.body.appendChild(s);
PSTD.sheet = s;
document.getElementById("ps-x").addEventListener("click", psClose);
document.addEventListener("keydown", function (e) { if (PSTD.pc && e.key === "Escape" && s.classList.contains("on"))
psClose(); });
document.addEventListener("mousedown", function (e) { if (PSTD.pc && s.classList.contains("on") && !s.contains(e.target) && !m.contains(e.target))
psClose(); }, true);
}
function psTick() {
psBuild();
var phone = psIsPhone(), walking = !!(typeof walkMode !== "undefined" && walkMode);
var pc = !phone && walking;
document.body.classList.toggle("ps-phone", phone);
document.body.classList.toggle("ps-walk", walking);
document.body.classList.toggle("ps-pc", pc);
if (PSTD.pc !== pc) {
psCandidates(true).forEach(function (c) { c.box.classList.remove("ps-tuck"); });
psClose();
PSTD.pc = pc;
}
psPlace();
psCandidates(pc).forEach(function (c) {
var want = (phone || pc) && walking;
if (c.box.classList.contains("ps-tuck") !== want)
c.box.classList.toggle("ps-tuck", want);
});
var pb = document.getElementById("ph-btn"), pn = pb && pb.querySelector(".b"), n = 0;
if (pn && pn.style.display !== "none")
n = parseInt(pn.textContent, 10) || 0;
var pill = psPhonePill(walking && (phone || pc), n);
var mh = "☰ Menu" + (n && !pill ? "<i>" + n + "</i>" : "");
if (PSTD.menu.innerHTML !== mh)
PSTD.menu.innerHTML = mh;
if (!walking || !(phone || pc))
psClose();
if (Date.now() - PSTD.saveAt > 15000) {
PSTD.saveAt = Date.now();
if (LITE || phone)
psSave("walk");
}
if (!PSTD.offered)
psOffer();
}
(function () {
var go = function () { psTick(); setInterval(function () { try {
psTick();
}
catch (e) {
if (window.console && !PSTD.warned) {
PSTD.warned = 1;
console.warn("[phone-steady]", e);
}
} }, 500); };
if (document.readyState === "loading")
document.addEventListener("DOMContentLoaded", go);
else
go();
})();
