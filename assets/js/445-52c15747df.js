/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var FSC = { key: "somnu.fs", cfg: null, armed: false, btn: null, rt: 0, f0: -1, still: 0, heals: 0 };
function fscCfg() {
if (FSC.cfg)
return FSC.cfg;
var o = { on: false, turn: "any", btn: true };
try {
var s = JSON.parse(localStorage.getItem(FSC.key) || "null");
if (s && typeof s === "object") {
o.on = !!s.on;
if (s.turn === "landscape" || s.turn === "portrait")
o.turn = s.turn;
if (s.btn === false)
o.btn = false;
}
}
catch (e) { }
return FSC.cfg = o;
}
function fscSave() { try {
localStorage.setItem(FSC.key, JSON.stringify(fscCfg()));
}
catch (e) { } }
function fscEl() { return document.fullscreenElement || document.webkitFullscreenElement || null; }
function fscCan() { var d = document.documentElement; return !!(document.fullscreenEnabled || document.webkitFullscreenEnabled) && !!(d.requestFullscreen || d.webkitRequestFullscreen); }
function fscIsOn() { return !!fscEl(); }
function fscInVR() { try {
return !!(typeof renderer !== "undefined" && renderer && renderer.xr && renderer.xr.isPresenting);
}
catch (e) {
return false;
} }
function fscEnter() {
if (fscEl() || !fscCan() || fscInVR())
return;
var d = document.documentElement, p = null;
try {
p = d.requestFullscreen ? d.requestFullscreen({ navigationUI: "hide" }) : d.webkitRequestFullscreen();
}
catch (e) { }
if (p && p.catch)
p.catch(function () { });
}
function fscExit() {
if (!fscEl())
return;
var p = null;
try {
p = document.exitFullscreen ? document.exitFullscreen() : document.webkitExitFullscreen();
}
catch (e) { }
if (p && p.catch)
p.catch(function () { });
}
function fscToggle() { var c = fscCfg(); if (fscIsOn()) {
c.on = false;
fscExit();
}
else {
c.on = true;
fscEnter();
} fscSave(); fscPaint(); }
function fscTurn() {
var o = screen.orientation, t = fscCfg().turn;
if (!o)
return;
try {
if (t === "any") {
if (o.unlock)
o.unlock();
}
else if (fscEl() && o.lock) {
var p = o.lock(t);
if (p && p.catch)
p.catch(function () { });
}
}
catch (e) { }
}
function fscRefit() { clearTimeout(FSC.rt); FSC.rt = setTimeout(function () { try {
dispatchEvent(new Event("resize"));
}
catch (e) { } fscHeal(true); }, 320); }
function fscRen() { return (typeof renderer !== "undefined" && renderer && renderer.domElement) ? renderer : null; }
function fscTouch() { return typeof GFX_PHONE !== "undefined" && !!GFX_PHONE; }
function fscHeal(force) { return __ZC(445, 0, this, arguments, new.target); }
function fscFrames() { return (typeof GLG !== "undefined" && GLG) ? GLG.f : -1; }
function fscPaint() {
var on = fscIsOn(), c = fscCfg(), b = FSC.btn;
if (b) {
b.textContent = on ? "🗗" : "⛶";
b.title = on ? "Leave full screen (F11, or hold Esc)" : "Full screen (F11)";
b.setAttribute("aria-label", b.title);
var show = c.btn && fscCan() && !fscInVR();
b.style.display = show ? "" : "none";
document.body && document.body.classList.toggle("fsc-has", show);
}
var s = document.getElementById("fsc-on");
if (s)
s.value = on || c.on ? "1" : "0";
var m = document.getElementById("me-fs");
if (m)
m.textContent = on ? "🗗 Leave full screen" : "⛶ Full screen";
document.body && document.body.classList.toggle("fsc-full", on);
}
function fscSetHtml() { return __ZC(445, 1, this, arguments, new.target); }
function fscSetMount() { return __ZC(445, 2, this, arguments, new.target); }
function fscStart() {
if (FSC.started)
return;
FSC.started = true;
var st = document.createElement("style");
st.textContent = "#fsc-btn{position:fixed;z-index:12;top:calc(8px + env(safe-area-inset-top,0px));right:calc(8px + env(safe-area-inset-right,0px));" +
"width:34px;height:34px;border-radius:9px;border:1px solid rgba(201,190,168,0.28);background:rgba(7,8,11,0.55);color:#C9BEA8;" +
"font:18px/1 ui-sans-serif,system-ui,sans-serif;cursor:pointer;padding:0;display:flex;align-items:center;justify-content:center;opacity:.85}" +
"#fsc-btn:hover,#fsc-btn:focus-visible{opacity:1;border-color:rgba(201,190,168,0.6)}" +
"body.fsc-has #hud{padding-right:max(clamp(18px,5vw,64px),calc(50px + env(safe-area-inset-right,0px)))}" +
"body.touch.ps-pc #needs-hud{top:calc(206px + env(safe-area-inset-top,0px))!important}" +
"html,body{overscroll-behavior:none}" +
"body.touch.ps-pc #rr-zone{left:auto!important;right:calc(12px + env(safe-area-inset-right,0px))!important;top:calc(92px + env(safe-area-inset-top,0px))!important}";
document.head.appendChild(st);
var b = document.createElement("button");
b.id = "fsc-btn";
b.type = "button";
b.addEventListener("click", function (e) { e.stopPropagation(); fscToggle(); b.blur(); });
["pointerdown", "mousedown", "touchstart"].forEach(function (k) { b.addEventListener(k, function (e) { e.stopPropagation(); }, { passive: true }); });
document.body.appendChild(b);
FSC.btn = b;
addEventListener("keydown", function (e) {
if (e.key === "F11" || (e.key === "Enter" && e.altKey)) {
if (!fscCan())
return;
e.preventDefault();
e.stopPropagation();
fscToggle();
}
}, true);
function again(e) {
if (FSC.armed)
return;
if (e && e.target && e.target.id === "fsc-btn")
return;
if (e && e.type === "keydown" && (e.key === "F11" || e.key === "Escape" || e.key === "Enter" && e.altKey))
return;
FSC.armed = true;
["pointerup", "keydown"].forEach(function (k) { removeEventListener(k, again, true); });
if (fscCfg().on && !fscEl())
fscEnter();
}
if (fscCfg().on && fscCan())
["pointerup", "keydown"].forEach(function (k) { addEventListener(k, again, true); });
function changed() {
if (!fscEl() && FSC.was) {
fscCfg().on = false;
fscSave();
}
FSC.was = !!fscEl();
fscTurn();
fscPaint();
fscRefit();
}
document.addEventListener(("onfullscreenchange" in document) ? "fullscreenchange" : "webkitfullscreenchange", changed);
if (screen.orientation && screen.orientation.addEventListener)
screen.orientation.addEventListener("change", fscRefit);
else
addEventListener("orientationchange", fscRefit);
if (window.visualViewport)
visualViewport.addEventListener("resize", function () { if (fscEl())
fscRefit(); });
document.addEventListener("visibilitychange", function () { if (!document.hidden && fscEl())
fscRefit(); });
addEventListener("focus", function () { if (fscEl())
fscRefit(); });
setInterval(function () {
if (!fscEl() || document.hidden || !fscTouch()) {
FSC.f0 = -1;
return;
}
var f = fscFrames();
if (f >= 0 && f === FSC.f0) {
if (++FSC.still >= 2) {
FSC.still = 0;
fscHeal(true);
}
}
else
FSC.still = 0;
FSC.f0 = f;
fscHeal(false);
var se = document.scrollingElement;
if (se && (se.scrollTop || se.scrollLeft)) {
se.scrollTop = 0;
se.scrollLeft = 0;
}
}, 1000);
fscPaint();
setInterval(function () { var show = fscCfg().btn && fscCan() && !fscInVR(); if (FSC.btn && (FSC.btn.style.display === "none") === show)
fscPaint(); }, 1500);
}
(function () {
if (typeof openPanel !== "function")
return;
var op = openPanel;
openPanel = function () { var r = op.apply(this, arguments); try {
fscSetMount();
}
catch (e) { } return r; };
})();
if (typeof PS_KEEP !== "undefined")
PS_KEEP["fsc-btn"] = 1;
(function () {
try {
if (typeof PS_EXTRAS !== "undefined" && fscCan())
PS_EXTRAS.push({ id: "me-fs", label: "⛶ Full screen", run: fscToggle });
if (typeof PS_SECTIONS !== "undefined")
PS_SECTIONS.forEach(function (s) { if (s.k === "help" && s.ids.indexOf("me-fs") < 0)
s.ids.push("me-fs"); });
}
catch (e) { }
})();
if (document.readyState === "loading")
document.addEventListener("DOMContentLoaded", fscStart);
else
fscStart();
