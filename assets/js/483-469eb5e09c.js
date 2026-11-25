/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var FCR = { want: false, seen: false, relAt: 0, goneAt: 0, byMe: 0, byScript: 0, tries: 0, tagT: 0, mode: "" };
function fcrCv() { return (typeof renderer !== "undefined" && renderer && renderer.domElement) || null; }
function fcrWalking() { return typeof walkMode !== "undefined" && !!walkMode; }
function fcrInVR() { try {
return !!(typeof renderer !== "undefined" && renderer && renderer.xr && renderer.xr.isPresenting);
}
catch (e) {
return false;
} }
function fcrPc() { return !/Android|iPhone|iPad|Mobile|OculusBrowser|Quest|Pico|Wolvic|\bVR\b/i.test(navigator.userAgent || "") && !fcrInVR(); }
function fcrLocked() { var cv = fcrCv(); return (!!cv && document.pointerLockElement === cv) || (typeof locked !== "undefined" && !!locked); }
function fcrTyping() { var a = document.activeElement; return !!a && a !== document.body && (/INPUT|TEXTAREA|SELECT/.test(a.tagName) || !!a.isContentEditable); }
function fcrPanel() { try {
return typeof gpdTopLayer === "function" ? gpdTopLayer() : null;
}
catch (e) {
return null;
} }
function fcrLook() {
var cv = fcrCv();
if (!cv || !cv.requestPointerLock)
return;
try {
var p = cv.requestPointerLock();
if (p && p.catch)
p.catch(function () { });
}
catch (e) { }
}
function fcrFree() { return __ZC(483, 0, this, arguments, new.target); }
function fcrSay(mode) { return __ZC(483, 1, this, arguments, new.target); }
function fcrEsc() { return __ZC(483, 2, this, arguments, new.target); }
function fcrCardSeen() { try {
return localStorage.getItem("somnu.fcr.card") === "1";
}
catch (e) {
return !!FCR.cardSeen;
} }
function fcrCardClose() { var c = document.getElementById("fcr-card"); if (c)
c.style.display = "none"; FCR.card = false; }
function fcrCardOpen() {
var c = document.getElementById("fcr-card");
if (!c) {
c = document.createElement("div");
c.id = "fcr-card";
c.setAttribute("role", "dialog");
c.setAttribute("aria-label", "New: the mouse and the Esc key");
c.innerHTML = '<h3>New: the mouse and the Esc key</h3>' +
'<p><b>Tab</b> frees your mouse so you can click buttons. Press <b>Tab</b> again, or click the world, to look around again.</p>' +
'<p>When you close a panel, the mouse goes back to looking by itself.</p>' +
'<p><b>Esc</b> now only closes what is open. It no longer throws you out of walking, out of a building, or out of full screen.</p>' +
'<p>To leave a building or to stop walking, open the <b>Menu</b>: they are the first buttons in it. With nothing open, Esc opens the Menu for you.</p>' +
'<p class="fcr-s">Read this again any time: Menu, Help and screen, Mouse and Esc keys.</p>' +
'<div class="fcr-r"><button type="button" class="btn primary" id="fcr-ok" aria-label="Got it, close">Got it</button></div>';
document.body.appendChild(c);
document.getElementById("fcr-ok").addEventListener("click", fcrCardClose);
}
FCR.cardSeen = true;
try {
localStorage.setItem("somnu.fcr.card", "1");
}
catch (e) { }
c.style.display = "block";
FCR.card = true;
try {
if (document.pointerLockElement && document.exitPointerLock)
document.exitPointerLock();
}
catch (e) { }
}
function fcrCardTick() {
if (FCR.cardDone)
return;
if (fcrCardSeen()) {
FCR.cardDone = true;
return;
}
if (!fcrWalking() || !fcrPc() || (typeof touchRig !== "undefined" && touchRig) || document.hidden) {
FCR.cardAt = 0;
return;
}
if (fcrPanel() || fcrTyping() || (typeof WGD !== "undefined" && WGD && WGD.open && !WGD.min)) {
FCR.cardAt = 0;
return;
}
if (!FCR.cardAt) {
FCR.cardAt = Date.now();
return;
}
if (Date.now() - FCR.cardAt < 1500)
return;
FCR.cardDone = true;
fcrCardOpen();
}
function fcrTick() {
if (!FCR.want)
return;
if (!fcrWalking() || !fcrPc()) {
FCR.want = false;
return;
}
if (document.hidden || (document.hasFocus && !document.hasFocus()))
return;
var now = Date.now();
if (fcrPanel() || fcrTyping()) {
FCR.seen = true;
FCR.goneAt = 0;
return;
}
if (!FCR.seen) {
if (now - FCR.relAt > 2500)
FCR.want = false;
return;
}
if (!FCR.goneAt) {
FCR.goneAt = now;
return;
}
if (now - FCR.goneAt < 280)
return;
if (FCR.tries >= 3) {
FCR.want = false;
return;
}
FCR.tries++;
FCR.goneAt = now;
fcrLook();
}
(function () {
if (typeof document === "undefined")
return;
var st = document.createElement("style");
st.textContent = "#fcr-tag{position:fixed;left:50%;bottom:74px;transform:translateX(-50%);z-index:12;background:rgba(7,8,11,.78);color:#EDE6D6;" +
"border:1px solid rgba(201,168,104,.55);border-radius:3px;padding:6px 12px;font:12.5px/1.4 var(--sans,system-ui,sans-serif);" +
"max-width:min(520px,90vw);text-align:center;opacity:0;pointer-events:none;transition:opacity .45s}" +
"#fcr-card{display:none;position:fixed;left:50%;top:50%;transform:translate(-50%,-50%);z-index:70;width:min(470px,92vw);max-height:86vh;overflow:auto;" +
"background:rgba(9,11,16,.96);color:#EDE6D6;border:1px solid #C9A868;border-radius:6px;padding:18px 22px 16px;font:14.5px/1.55 var(--sans,system-ui,sans-serif);box-shadow:0 14px 50px rgba(0,0,0,.6)}" +
"#fcr-card h3{margin:0 0 10px;font:600 19px/1.3 var(--serif,Georgia,serif);color:#E8C66A}#fcr-card p{margin:0 0 9px}#fcr-card b{color:#F3DFA6}" +
"#fcr-card .fcr-s{font-size:12.5px;color:#A8A294;margin-top:12px}#fcr-card .fcr-r{text-align:right;margin-top:12px}#fcr-card .btn{min-width:110px;cursor:pointer}" +
"#fcr-tag.on{opacity:1}#fcr-tag b{color:#E8C66A;font-weight:600}body.touch #fcr-tag,body.drive-on #fcr-tag{display:none}";
document.head.appendChild(st);
function ready() {
var t = document.createElement("div");
t.id = "fcr-tag";
t.setAttribute("role", "status");
document.body.appendChild(t);
try {
if (typeof PS_SECTIONS !== "undefined")
PS_SECTIONS.forEach(function (s) { if (s.k === "help")
s.ids.push("fcr-help"); });
if (typeof PS_EXTRAS !== "undefined")
PS_EXTRAS.push({ id: "fcr-help", label: "\ud83d\uddb1\ufe0f Mouse and Esc keys", show: function (pc) { return !!pc && fcrPc(); }, run: function () { setTimeout(fcrCardOpen, 10); } });
}
catch (e) { }
try {
if (typeof psPaintSheet === "function") {
var pp = psPaintSheet;
psPaintSheet = function () {
var r = pp.apply(this, arguments);
try {
var g = document.getElementById("ps-grid");
if (!g || !PSTD.pc || !fcrWalking() || !fcrPc())
return r;
var add = function (id, label, run) {
var b = document.createElement("button");
b.type = "button";
b.id = id;
b.textContent = label;
b.addEventListener("click", function () { psClose(); setTimeout(run, 30); });
g.insertBefore(b, g.firstChild);
};
add("fcr-out", "↩ Back to capture (stop walking)", function () { try {
setWalk(false);
}
catch (e) { } });
if (typeof store !== "undefined" && store.inside && typeof INT !== "undefined" && INT && typeof exitInterior === "function")
add("fcr-leave", "🚪 Leave this building", function () { try {
exitInterior();
}
catch (e) { } });
}
catch (e) { }
return r;
};
}
}
catch (e) { }
}
if (document.readyState === "loading")
document.addEventListener("DOMContentLoaded", ready);
else
ready();
try {
var xp = document.exitPointerLock;
if (typeof xp === "function")
document.exitPointerLock = function () { if (document.pointerLockElement)
FCR.byScript = Date.now(); return xp.apply(document, arguments); };
}
catch (e) { }
document.addEventListener("pointerlockchange", function () {
var now = Date.now(), cv = fcrCv();
if (cv && document.pointerLockElement === cv) {
FCR.want = false;
FCR.seen = false;
FCR.tries = 0;
FCR.goneAt = 0;
fcrSay("look");
return;
}
FCR.want = (now - FCR.byMe > 700) && (now - FCR.byScript < 700) && fcrWalking() && fcrPc();
FCR.seen = false;
FCR.goneAt = 0;
FCR.tries = 0;
FCR.relAt = now;
fcrSay(fcrWalking() ? "point" : "");
});
setInterval(fcrTick, 140);
setInterval(fcrCardTick, 500);
addEventListener("keydown", function (e) {
if (e.code !== "Tab" || e.ctrlKey || e.altKey || e.metaKey || e.repeat)
return;
if (!fcrWalking() || !fcrPc() || fcrTyping())
return;
if (fcrLocked()) {
e.preventDefault();
e.stopPropagation();
fcrFree();
return;
}
if (fcrPanel())
return;
e.preventDefault();
e.stopPropagation();
FCR.want = false;
fcrLook();
}, true);
function keyLock() {
try {
var k = navigator.keyboard;
if (!k || !k.lock || !fcrPc())
return;
if (document.fullscreenElement || document.webkitFullscreenElement) {
var p = k.lock(["Escape"]);
if (p && p.catch)
p.catch(function () { });
}
else if (k.unlock)
k.unlock();
}
catch (e) { }
}
document.addEventListener(("onfullscreenchange" in document) ? "fullscreenchange" : "webkitfullscreenchange", keyLock);
if (typeof setWalk === "function") {
var sw = setWalk;
setWalk = function (on) { var r = sw.apply(this, arguments); if (!on) {
FCR.want = false;
fcrSay("");
} return r; };
}
})();
