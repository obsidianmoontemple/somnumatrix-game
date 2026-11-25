/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(483, function () {
"use strict";
return [
function () {
FCR.byMe = Date.now();
FCR.want = false;
try {
if (document.pointerLockElement && document.exitPointerLock)
document.exitPointerLock();
else if (typeof locked !== "undefined" && locked) {
locked = false;
var r = document.getElementById("recticle");
if (r)
r.classList.add("gone");
fcrSay("point");
}
}
catch (e) { }
},
function (mode) {
if (FCR.mode === mode)
return;
FCR.mode = mode;
var el = document.getElementById("fcr-tag");
if (!el)
return;
clearTimeout(FCR.tagT);
if (!mode || !fcrWalking() || !fcrPc() || (typeof touchRig !== "undefined" && touchRig)) {
el.classList.remove("on");
return;
}
el.innerHTML = mode === "look"
? "<b>Looking.</b> Tab frees the mouse for buttons."
: "<b>Mouse free.</b> Tab, or a click on the world, to look around again.";
el.classList.add("on");
FCR.tagT = setTimeout(function () { el.classList.remove("on"); }, mode === "look" ? 3200 : 5200);
},
function () {
if (!fcrPc()) {
if (typeof goBack === "function")
goBack();
return;
}
try {
if (typeof PSTD !== "undefined" && PSTD.sheet && PSTD.sheet.classList.contains("on") && typeof psClose === "function") {
psClose();
return;
}
}
catch (e) { }
var did = false;
try {
did = typeof goBack === "function" && goBack(true);
}
catch (e) { }
if (did || !fcrWalking())
return;
if (fcrLocked()) {
fcrFree();
return;
}
try {
if (typeof PSTD !== "undefined" && PSTD.sheet && PSTD.pc && typeof psOpen === "function")
psOpen();
}
catch (e) { }
}
];
});
