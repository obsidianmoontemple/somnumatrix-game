/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var padOn = false, padHidden = false, padKeys = { f: 0, b: 0, l: 0, r: 0 }, padRun = false, PADKEY = "dreamwalker.pad";
function padMode() { var m = cfg().pad; return m === "always" || m === "never" ? m : "automatic"; }
function padCoarse() { return typeof matchMedia === "function" && matchMedia("(pointer:coarse)").matches; }
function padTouch() { return (typeof isTouch !== "undefined" && isTouch) || padCoarse(); }
function padWanted() {
var m = padMode();
if (m === "always")
return true;
if (m === "never")
return false;
if (/OculusBrowser|Quest|Pico|Wolvic|\bVR\b/.test(navigator.userAgent || ""))
return true;
return padCoarse() && !(typeof touchRig !== "undefined" && touchRig);
}
function padSideWanted() { return padMode() !== "never" && (padWanted() || padTouch()); }
function padInput() {
var f = (padKeys.f ? 1 : 0) - (padKeys.b ? 1 : 0), s = (padKeys.r ? 1 : 0) - (padKeys.l ? 1 : 0);
if (!f && !s)
return null;
var m = Math.min(1, Math.sqrt(f * f + s * s));
return { f: f, s: s, mag: padRun ? 1 : 0.62, run: padRun, pad: true };
}
function padBuild() {
if (padOn || typeof document === "undefined" || !document.body)
return;
padOn = true;
var wrap = document.createElement("div");
wrap.id = "dpad";
wrap.innerHTML =
'<button class="pd" data-d="f" aria-label="Forward">&#9650;</button>' +
'<button class="pd" data-d="l" aria-label="Left">&#9664;</button>' +
'<button class="pd pd-run" id="pd-run" aria-label="Run">run</button>' +
'<button class="pd" data-d="r" aria-label="Right">&#9654;</button>' +
'<button class="pd" data-d="b" aria-label="Back">&#9660;</button>';
var fold = document.createElement("button");
fold.id = "pd-fold";
fold.type = "button";
fold.title = "Fold the pad away so you can reach what's under it";
fold.textContent = "pad";
var side = document.createElement("div");
side.id = "pdside";
side.innerHTML =
'<button class="pd pd-wide" id="pd-back">back</button>' +
'<button class="pd pd-wide" id="pd-abil">powers</button>' +
'<button class="pd pd-wide" id="pd-take">take</button>' +
'<button class="pd pd-wide" id="pd-use">use</button>' +
'<button class="pd pd-wide" id="pd-desk">desk</button>' +
'<button class="pd" id="pd-rise" aria-label="Rise">&#9650;</button>' +
'<button class="pd" id="pd-fall" aria-label="Fall">&#9660;</button>';
document.body.appendChild(side);
var view = document.createElement("div");
view.id = "pdview";
view.innerHTML =
'<button class="pd" data-v="in" aria-label="Closer">+</button>' +
'<button class="pd" data-v="out" aria-label="Further">&minus;</button>' +
'<button class="pd" data-v="turn" aria-label="Turn the view">&#x27F3;</button>' +
'<button class="pd" data-v="up" aria-label="Move north">&#9650;</button>' +
'<button class="pd" data-v="down" aria-label="Move south">&#9660;</button>' +
'<button class="pd" data-v="left" aria-label="Move west">&#9664;</button>' +
'<button class="pd" data-v="right" aria-label="Move east">&#9654;</button>';
document.body.appendChild(wrap);
document.body.appendChild(view);
document.body.appendChild(fold);
function hold(el, d, on) { padKeys[d] = on ? 1 : 0; el.classList.toggle("on", !!on); }
Array.prototype.forEach.call(wrap.querySelectorAll("[data-d]"), function (b) {
var d = b.getAttribute("data-d");
["pointerdown", "touchstart"].forEach(function (ev) { b.addEventListener(ev, function (e) { e.preventDefault(); hold(b, d, true); }, { passive: false }); });
["pointerup", "pointerleave", "pointercancel", "touchend", "touchcancel"].forEach(function (ev) { b.addEventListener(ev, function () { hold(b, d, false); }); });
});
document.getElementById("pd-run").onclick = function () { padRun = !padRun; this.classList.toggle("on", padRun); };
Array.prototype.forEach.call(view.querySelectorAll("[data-v]"), function (b) {
var v = b.getAttribute("data-v"), held = false, timer = null;
function act() {
var step = Math.max(6, orb.r * 0.08);
if (v === "in")
orb.r = Math.max(20, orb.r * 0.88);
if (v === "out")
orb.r = Math.min(4000, orb.r * 1.14);
if (v === "turn")
orb.t += 0.22;
var c = Math.cos(orb.t), s = Math.sin(orb.t);
if (v === "up") {
orb.tx -= s * step;
orb.tz -= c * step;
}
if (v === "down") {
orb.tx += s * step;
orb.tz += c * step;
}
if (v === "left") {
orb.tx -= c * step;
orb.tz += s * step;
}
if (v === "right") {
orb.tx += c * step;
orb.tz -= s * step;
}
}
function start(e) { e.preventDefault(); held = true; act(); timer = setInterval(function () { if (held)
act(); }, 110); }
function stop() { held = false; if (timer)
clearInterval(timer); timer = null; }
["pointerdown", "touchstart"].forEach(function (ev) { b.addEventListener(ev, start, { passive: false }); });
["pointerup", "pointerleave", "pointercancel", "touchend", "touchcancel"].forEach(function (ev) { b.addEventListener(ev, stop); });
});
document.getElementById("pd-back").onclick = function () {
if (typeof INT !== "undefined" && INT)
return exitInterior(false);
if (typeof talkOpen !== "undefined" && talkOpen && typeof closeTalk === "function")
return closeTalk();
if (typeof picked !== "undefined" && picked)
closeInspect();
if (typeof plotOn !== "undefined" && plotOn)
return setPlot(false);
if (walkMode)
return setWalk(false);
};
["pd-rise", "pd-fall"].forEach(function (id) {
var b = document.getElementById(id), up = (id === "pd-rise"), held = false, tick = null;
function go() {
if (store.inside && typeof liftMove === "function" && liftMove(up ? 1 : -1))
return;
if (typeof flyY === "undefined")
return;
flyY += (up ? 1 : -1) * 0.55;
var flo = typeof flyFloor === "function" ? flyFloor() : 0;
if (flyY < flo)
flyY = flo;
}
function start(e) { e.preventDefault(); held = true; go(); tick = setInterval(function () { if (held)
go(); }, 60); b.classList.add("on"); }
function stop() { held = false; if (tick)
clearInterval(tick); tick = null; b.classList.remove("on"); }
["pointerdown", "touchstart"].forEach(function (ev) { b.addEventListener(ev, start, { passive: false }); });
["pointerup", "pointerleave", "pointercancel", "touchend", "touchcancel"].forEach(function (ev) { b.addEventListener(ev, stop); });
});
document.getElementById("pd-abil").onclick = openPowers;
document.getElementById("pd-take").onclick = function () { if (typeof armsReach === "function")
armsReach(); };
document.getElementById("pd-use").onclick = function () { if (typeof useCarried === "function")
useCarried(); };
document.getElementById("pd-desk").onclick = function () { if (typeof openDesk === "function")
openDesk(); };
fold.onclick = function () {
padHidden = !padHidden;
try {
localStorage.setItem(PADKEY, padHidden ? "1" : "");
}
catch (e) { }
fold.textContent = padHidden ? "pad" : "hide";
padTick();
};
try {
padHidden = !!localStorage.getItem(PADKEY);
}
catch (e) { }
fold.textContent = padHidden ? "pad" : "hide";
}
function openPowers() { return __ZC(91, 0, this, arguments, new.target); }
function padTick() {
var dp = padWanted(), sd = padSideWanted();
if (typeof document !== "undefined" && document.body)
document.body.classList.toggle("pad-on", dp && !padHidden && !!walkMode);
if (!dp && !sd) {
if (padOn) {
["dpad", "pdview", "pd-fold", "pdside"].forEach(function (id) { var e = document.getElementById(id); if (e)
e.style.display = "none"; });
}
return;
}
padBuild();
var pad = document.getElementById("dpad"), view = document.getElementById("pdview"), fold = document.getElementById("pd-fold");
if (!pad)
return;
var talking = (typeof talkOpen !== "undefined" && talkOpen) || (typeof greetOpen !== "undefined" && greetOpen);
var plotting = typeof plotOn !== "undefined" && plotOn;
var wantPad = dp && walkMode && !talking;
var wantView = dp && plotting && !walkMode && !talking;
pad.style.display = (wantPad && !padHidden) ? "grid" : "none";
view.style.display = (wantView && !padHidden) ? "grid" : "none";
fold.style.display = (wantPad || wantView) ? "block" : "none";
var side = document.getElementById("pdside");
if (side) {
var rig = typeof touchRig !== "undefined" && touchRig;
var anySide = (walkMode && !talking) || (plotting && dp);
side.style.display = anySide ? "grid" : "none";
var fly = (typeof canFly !== "undefined" && canFly) && walkMode && !rig;
document.getElementById("pd-back").style.display = (walkMode && !rig) ? "flex" : "none";
document.getElementById("pd-rise").style.display = fly ? "flex" : "none";
document.getElementById("pd-fall").style.display = fly ? "flex" : "none";
document.getElementById("pd-abil").style.display = walkMode ? "flex" : "none";
document.getElementById("pd-take").style.display = walkMode ? "flex" : "none";
document.getElementById("pd-use").style.display = (walkMode && typeof carrying !== "undefined" && carrying && !(typeof ARMB !== "undefined" && ARMB.el && !ARMB.el.classList.contains("gone"))) ? "flex" : "none";
document.getElementById("pd-desk").style.display = (typeof deskNear !== "undefined" && (deskNear || deskOpen)) ? "flex" : "none";
}
if (padHidden && (padKeys.f || padKeys.b || padKeys.l || padKeys.r))
padKeys = { f: 0, b: 0, l: 0, r: 0 };
}
