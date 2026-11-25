/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var PST = { phone: typeof LITE !== "undefined" && !!LITE, liftMax: 220, liftTex: 280, liftGeo: 1400, cap: 0, cur: -1, base: 0, haze: 0, last: 0, man: null, total: 0, bytes: 0,
kept: 0, sw: null, busy: false, offerKey: "somnu.gfxoffer", allKey: "somnu.gfxall", offered: false, t0: Date.now() };
(function () {
if (!PST.phone)
return;
var lv = (typeof PF !== "undefined" && PF.level) | 0;
PST.cap = lv > 1 ? 256 : 512;
if (typeof PCU !== "undefined")
PCU.texMax = PST.cap;
[window.WebGLRenderingContext, window.WebGL2RenderingContext].forEach(function (C) {
if (!C || !C.prototype || C.prototype.__pstCap)
return;
var gp = C.prototype.getParameter;
C.prototype.getParameter = function (p) {
var v = gp.call(this, p);
if ((p === 0x0D33 || p === 0x851C) && typeof v === "number" && PST.cap)
return Math.min(v, PST.cap);
return v;
};
C.prototype.__pstCap = true;
});
if (window.console && console.warn) {
var cw = console.warn;
console.warn = function (m) { if (typeof m === "string" && m.indexOf("Texture has been resized") >= 0)
return; return cw.apply(console, arguments); };
}
})();
(function () {
if (!PST.phone || typeof pfInUse !== "function")
return;
pfInUse = function () {
var used = new Set();
if (typeof scene === "undefined" || !scene)
return used;
pfAddTex(used, scene.background);
pfAddTex(used, scene.environment);
var seen = new Set();
scene.traverseVisible(function (o) {
if (o.geometry)
used.add(o.geometry);
var ms = o.material ? (Array.isArray(o.material) ? o.material : [o.material]) : [];
if (o.customDepthMaterial)
ms = ms.concat([o.customDepthMaterial]);
if (o.customDistanceMaterial)
ms = ms.concat([o.customDistanceMaterial]);
for (var i = 0; i < ms.length; i++) {
var m = ms[i];
if (!m || seen.has(m))
continue;
seen.add(m);
for (var k = 0; k < PF_MAPS.length; k++) {
var v = m[PF_MAPS[k]];
if (v && v.isTexture)
used.add(v);
}
if (m.uniforms)
for (var u in m.uniforms) {
var uv = m.uniforms[u] && m.uniforms[u].value;
pfAddTex(used, uv);
if (Array.isArray(uv))
uv.forEach(function (x) { pfAddTex(used, x); });
}
if (m.userData)
for (var d in m.userData) {
var dv = m.userData[d];
pfAddTex(used, dv);
if (dv && typeof dv === "object" && dv.uniforms)
for (var du in dv.uniforms) {
pfAddTex(used, dv.uniforms[du] && dv.uniforms[du].value);
}
}
}
});
return used;
};
})();
function pstManaged() {
if (!PST.phone || typeof PCU === "undefined" || !PCU.on)
return false;
if (typeof INT !== "undefined" && INT)
return false;
if (typeof WLD !== "undefined" && WLD && WLD.on)
return false;
return !!(typeof inCityNow === "function" && inCityNow());
}
function pstLiftTick(dt) {
var P = camera.position, alt = 0;
var flying = (typeof canFly !== "undefined" && canFly) || (typeof DRIVE !== "undefined" && DRIVE && DRIVE.on && DRIVE.mode === "fly");
if (flying) {
try {
var ft = P.y - 1.72;
alt = ft - (typeof supportAt === "function" ? supportAt(P.x, P.z, ft) : terrainY(P.x, P.z));
}
catch (e) {
alt = 0;
}
}
var most = (typeof PF !== "undefined" && PF && PF.level > 1) ? PST.liftMax / 2 : PST.liftMax;
var want = Math.max(0, Math.min(most, (alt - 10) * 8));
try {
var M = renderer.info.memory;
if (M.textures > PST.liftTex || M.geometries > PST.liftGeo)
want = Math.min(want, Math.max(0, (PCU.lift || 0) - 1));
}
catch (e) { }
var L = PCU.lift || 0;
if (want > L)
L = Math.min(want, L + 260 * dt);
else
L = Math.max(want, L - 50 * dt);
PCU.lift = L;
}
function pstFogFor(now) {
var f = scene.fog, raw = f.density;
var dt = Math.min(0.25, Math.max(0, (now - (PST.last || now)) / 1000));
PST.last = now;
if (!pstManaged()) {
PST.cur = raw;
PST.base = raw;
if (typeof PCU !== "undefined")
PCU.lift = 0;
return raw;
}
var want = raw;
{
pstLiftTick(dt);
PST.haze = 1.8 / Math.max(120, PCU.far + (PCU.lift || 0));
want = Math.max(raw, PST.haze);
}
if (PST.cur < 0)
PST.cur = raw;
PST.cur += (want - PST.cur) * (1 - Math.exp(-dt * 1.6));
if (Math.abs(PST.cur - raw) < raw * 0.002)
PST.cur = raw;
PST.base = raw;
return PST.cur;
}
(function () {
if (!PST.phone)
return;
if (typeof PCU !== "undefined")
PCU.haze = 0;
var hook = function () {
if (typeof renderer === "undefined" || !renderer || renderer.__pstFog)
return false;
var rr = renderer.render;
renderer.render = function (sc, cam) {
var f = sc && sc.fog;
if (sc !== scene || !f || !f.isFogExp2)
return rr.apply(this, arguments);
var raw = f.density, d = pstFogFor(performance.now());
if (d === raw)
return rr.apply(this, arguments);
f.density = d;
try {
return rr.apply(this, arguments);
}
finally {
f.density = raw;
}
};
renderer.__pstFog = true;
return true;
};
if (!hook()) {
var iv = setInterval(function () { if (hook())
clearInterval(iv); }, 500);
}
})();
function pstMB(b) { return Math.round(b / 1048576) + " MB"; }
function pstSave(k, v) { try {
localStorage.setItem(k, v);
}
catch (e) { } }
function pstLoad(k) { try {
return localStorage.getItem(k);
}
catch (e) {
return null;
} }
function pstOnMsg(e) {
var d = e.data || {};
if (d.type === "progress" || d.type === "done") {
if (d.type === "done") {
PST.kept = d.kept;
if (!PST.busy && d.kept >= d.total) {
pstSave(PST.allKey, "1");
pstLabel("The whole game is on this device ✓");
}
}
var done = d.type === "done" ? Math.min(d.kept, d.total) : d.done;
if (PST.busy) {
pstLabel("Downloading the game… " + done + " of " + d.total + " (" + Math.floor(100 * done / Math.max(1, d.total)) + "%)");
if (d.type === "done") {
PST.busy = false;
var all = d.kept >= d.total;
if (all)
pstSave(PST.allKey, "1");
pstLabel(all ? "The whole game is on this device ✓" : "Download the rest of the game");
if (typeof setStatus === "function")
setStatus(all ? "<b>The whole game is on this device now.</b> Every world opens from here, not the Internet, and updates download by themselves." : "<b>A few files could not be downloaded.</b> Try again with a better connection.");
}
}
}
else if (d.type === "error" && PST.busy) {
PST.busy = false;
pstLabel("Download the whole game (" + pstMB(PST.bytes) + ")");
if (typeof setStatus === "function")
setStatus("<b>The download stopped.</b> Try again with a better connection.");
}
}
function pstLabel(t) { ["pst-dl", "set-dl"].forEach(function (id) { var b = document.getElementById(id); if (b) {
b.textContent = t;
b.disabled = false;
} }); }
function pstSync(all) {
if (!PST.sw || !PST.man)
return false;
var base = new URL(".", location.href).href;
PST.sw.postMessage({ type: "sync", all: !!all, manifest: PST.man, base: base });
return true;
}
function pstDownload() { return __ZC(241, 0, this, arguments, new.target); }
(function () {
function wire() {
var b = document.getElementById("set-dl");
if (!b || b.__w)
return;
b.__w = 1;
b.addEventListener("click", function () { pstDownload(); });
var sw = navigator.serviceWorker;
if (!sw || !(location.protocol === "https:" || location.hostname === "localhost" || location.hostname === "127.0.0.1") || /[?&]nosw\b/.test(location.search)) {
b.textContent = "Not available here";
var h = document.getElementById("set-dl-hint");
if (h)
h.textContent = "Open the game from its own web address, or the app, to download it.";
}
}
if (document.readyState === "loading")
document.addEventListener("DOMContentLoaded", wire);
else
wire();
})();
function pstButton() {
if (document.getElementById("pst-dl"))
return;
var g = document.getElementById("soundbtn");
g = g && g.parentNode;
if (!g)
return;
var b = document.createElement("button");
b.className = "btn";
b.id = "pst-dl";
b.type = "button";
b.addEventListener("click", function () { pstDownload(); });
g.insertBefore(b, g.querySelector("#exportbtn") || null);
pstLabel(pstLoad(PST.allKey) ? "The whole game is on this device ✓" : "Download the whole game (" + pstMB(PST.bytes) + ")");
}
function pstOffer() {
if (PST.offered || !PST.phone || !PST.man || !PST.sw || PST.busy)
return;
if (pstLoad(PST.allKey)) {
PST.offered = true;
return;
}
var said = pstLoad(PST.offerKey);
if (said === "yes") {
PST.offered = true;
return;
}
if (said && Date.now() - (+said || 0) < 3 * 864e5) {
PST.offered = true;
return;
}
if (!(typeof inCityNow === "function" && inCityNow()) || document.body.classList.contains("pf-tipping"))
return;
if (Date.now() - PST.t0 < 45000)
return;
PST.offered = true;
var st = document.createElement("style");
st.textContent = "#pst-offer{position:fixed;z-index:47;left:calc(12px + env(safe-area-inset-left,0px));bottom:calc(178px + env(safe-area-inset-bottom,0px));" +
"width:min(330px,calc(100vw - 124px));background:rgba(12,10,22,.94);color:#EDE8F8;border:1px solid rgba(232,198,106,.55);border-radius:12px;" +
"padding:10px 12px;font:14px/1.45 system-ui,sans-serif;box-shadow:0 6px 24px rgba(0,0,0,.45);opacity:0;transition:opacity .45s ease}" +
"#pst-offer.on{opacity:1}#pst-offer b{color:#F2D27A;font-weight:600}" +
"#pst-offer .r{display:flex;gap:8px;justify-content:flex-end;align-items:center;margin-top:8px}" +
"#pst-offer button{font:600 13px system-ui,sans-serif;border-radius:14px;padding:6px 12px;border:1px solid #C9A040;background:#2A2448;color:#F2D27A}" +
"#pst-offer button.no{border:0;background:none;color:#A8A0C0;font-weight:400;padding:6px 4px}" +
"body.pst-offering #walkhint{visibility:hidden}" +
"@media (max-height:500px){#pst-offer{bottom:auto;top:calc(94px + env(safe-area-inset-top,0px));width:min(360px,42vw)}}";
document.head.appendChild(st);
var d = document.createElement("div");
d.id = "pst-offer";
d.setAttribute("role", "dialog");
d.innerHTML = "<b>Smoother on this device.</b> Download the whole game once (" + pstMB(PST.bytes) + ") and every world opens from here from now on. Best on Wi-Fi." +
"<div class='r'><button type='button' class='no'>Not now</button><button type='button' class='yes'>Download</button></div>";
document.body.appendChild(d);
document.body.classList.add("pst-offering");
requestAnimationFrame(function () { d.classList.add("on"); });
var shut = function () { d.classList.remove("on"); document.body.classList.remove("pst-offering"); setTimeout(function () { if (d.parentNode)
d.parentNode.removeChild(d); }, 500); };
d.querySelector(".yes").addEventListener("click", function () { shut(); pstDownload(); });
d.querySelector(".no").addEventListener("click", function () { pstSave(PST.offerKey, String(Date.now())); shut(); });
}
(function () {
var sw = navigator.serviceWorker;
if (!sw || !window.fetch)
return;
if (/[?&]nosw\b/.test(location.search)) {
sw.getRegistrations().then(function (rs) { rs.forEach(function (r) { r.unregister(); }); }).catch(function () { });
if (window.caches)
caches.keys().then(function (ks) { ks.forEach(function (k) { if (/^somnu-/.test(k))
caches.delete(k); }); }).catch(function () { });
return;
}
if (!(location.protocol === "https:" || location.hostname === "localhost" || location.hostname === "127.0.0.1"))
return;
var start = function () {
fetch("assets-manifest.json", { cache: "no-cache" }).then(function (r) { return r.ok ? r.json() : null; }).then(function (m) {
if (!m || !m.files)
return;
PST.man = m;
PST.total = Object.keys(m.files).length;
PST.bytes = m.bytes || 0;
return sw.register("sw.js").then(function () { return sw.ready; }).then(function (reg) {
PST.sw = reg.active;
sw.addEventListener("message", pstOnMsg);
pstButton();
if (!PST.busy)
pstLabel(pstLoad(PST.allKey) ? "The whole game is on this device ✓" : "Download the whole game (" + pstMB(PST.bytes) + ")");
var c = navigator.connection || {};
var quiet = !c.saveData && (PST.phone ? c.type === "wifi" : c.type !== "cellular");
if (quiet && PST.phone) {
PST.offered = true;
try {
if (navigator.storage && navigator.storage.persist)
navigator.storage.persist();
}
catch (e) { }
}
pstSync(quiet || !!pstLoad(PST.allKey));
});
}).catch(function () { });
};
var go = function () { setTimeout(start, 8000); };
if (document.readyState === "complete")
go();
else
window.addEventListener("load", go);
})();
(function () {
function tick(now) {
if (now - (PST.oT || 0) > 2000) {
PST.oT = now;
try {
pstOffer();
}
catch (e) { }
}
requestAnimationFrame(tick);
}
requestAnimationFrame(tick);
})();
