/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var ARMB = { el: null, held: false, timer: null, label: "" };
function armbTouch() { return !!(document.body && document.body.classList.contains("touch")) || (typeof touchRig !== "undefined" && !!touchRig); }
function armbShip() { return typeof WLD !== "undefined" && WLD && WLD.on === "space" && typeof scShipFire === "function"; }
function armbLabel() {
if (armbShip())
return "Fire";
if (typeof walkMode === "undefined" || !walkMode || typeof carrying === "undefined" || !carrying || typeof ARMS === "undefined")
return "";
var a = carrying.archetype, A = ARMS[a];
if (!A)
return "";
var s = A.shot;
if (s === "phaser")
return "Fire";
if (s === "arrow" || s === "bolt" || s === "stone" || s === "shot")
return "Shoot";
if (s === "fire" || s === "lightning" || s === "light" || s === "ice")
return "Cast";
if (s === "sound")
return "Blow";
if (A.held === "shield")
return "Block";
if (A.held === "torch")
return "Wave";
return "Swing";
}
function armbUse() {
if (armbShip()) {
scShipFire();
return;
}
if (typeof useCarried === "function")
useCarried();
}
function armbBuild() {
if (ARMB.el && ARMB.el.isConnected)
return ARMB.el;
var B = document.getElementById("tbtns");
if (!B)
return null;
var b = document.createElement("button");
b.id = "t-arm";
b.type = "button";
b.className = "gone";
b.setAttribute("aria-label", "Use what is in your hand");
var back = document.getElementById("t-back");
B.insertBefore(b, back || null);
var st = document.createElement("style");
st.textContent = "#t-arm{border-color:#E8C66A!important;color:#17120A!important;background:rgba(232,198,106,.92)!important;font-weight:700!important;min-width:74px!important;height:74px!important;border-radius:37px!important}" +
"#t-arm.on{background:rgba(201,160,64,.95)!important}";
document.head.appendChild(st);
function start(e) {
e.preventDefault();
e.stopPropagation();
if (ARMB.held)
return;
ARMB.held = true;
b.classList.add("on");
armbUse();
clearInterval(ARMB.timer);
ARMB.timer = setInterval(function () { if (ARMB.held)
armbUse(); }, 260);
}
function stop(e) { if (e)
e.stopPropagation(); ARMB.held = false; b.classList.remove("on"); clearInterval(ARMB.timer); ARMB.timer = null; }
b.addEventListener("touchstart", start, { passive: false });
b.addEventListener("pointerdown", function (e) { if (e.pointerType !== "touch")
start(e); });
["touchend", "touchcancel"].forEach(function (t) { b.addEventListener(t, stop); });
["pointerup", "pointercancel", "pointerleave"].forEach(function (t) { b.addEventListener(t, function (e) { if (e.pointerType !== "touch")
stop(e); }); });
ARMB.el = b;
return b;
}
function armbTick() {
if (!armbTouch()) {
if (ARMB.el)
ARMB.el.classList.add("gone");
return;
}
var lab = armbLabel(), b = armbBuild();
if (!b)
return;
var show = !!lab && !(typeof DRIVE !== "undefined" && DRIVE && DRIVE.on && !armbShip());
if (b.classList.contains("gone") === show)
b.classList.toggle("gone", !show);
if (!show && ARMB.held) {
ARMB.held = false;
clearInterval(ARMB.timer);
b.classList.remove("on");
}
if (lab && lab !== ARMB.label) {
ARMB.label = lab;
b.textContent = lab;
}
var pu = document.getElementById("pd-use");
if (pu && show && pu.style.display !== "none")
pu.style.display = "none";
}
(function () {
if (typeof setStatus !== "function")
return;
var ss = setStatus;
setStatus = function (h) {
if (typeof h === "string" && armbTouch() && /<b>F<\/b>|<b>G<\/b>/.test(h)) {
var lab = armbLabel() || "Fire";
h = h.replace(/Use it with <b>F<\/b>, or the <b>use<\/b> button\./, "Use it with the <b>" + lab + "</b> button.")
.replace(/<b>F<\/b> (fires|swings) it/g, "the <b>" + lab + "</b> button $1 it")
.replace(/: <b>F<\/b>/g, ": the <b>Fire</b> button")
.replace(/In your shuttle, F fires/, "In your shuttle, the Fire button fires")
.replace(/<b>G<\/b> puts it down/g, "<b>take</b> puts it down")
.replace(/Drop it with <b>G<\/b>/g, "Drop it with <b>take</b>")
.replace(/(\.\s+)the <b>/g, "$1The <b>");
}
return ss.apply(this, arguments.length > 1 ? [h].concat([].slice.call(arguments, 1)) : [h]);
};
})();
setInterval(function () { try {
armbTick();
}
catch (e) { } }, 250);
