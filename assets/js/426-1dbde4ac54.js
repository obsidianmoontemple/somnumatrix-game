/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var CR = { inst: [], near: null, fn: null, vend: null, vendEl: null, doorWalls: {} };
function crActs(m) { var a = m && m.acts; return (a && typeof a === "object" && a.kind) ? a : null; }
function crDress(g, m) { return __ZC(426, 0, this, arguments, new.target); }
if (typeof mwRegister === "function") {
var crReg0 = mwRegister;
mwRegister = function (m) { return __ZC(426, 1, this, arguments, new.target); };
}
function crLive(g) {
if (typeof scene === "undefined")
return false;
for (var o = g; o; o = o.parent) {
if (o === scene)
return true;
}
return false;
}
function crDoorWall(g, p) {
if (g.userData.crWall !== undefined)
return g.userData.crWall;
var best = null, bd = 0.3, W = (typeof INT !== "undefined" && INT && INT.walls) || [];
for (var i = 0; i < W.length; i++) {
var w = W[i], d = Math.hypot(w.x - p.x, w.z - p.z);
if (d < bd) {
bd = d;
best = w;
}
}
g.userData.crWall = best;
return best;
}
function crDoor(g) { return __ZC(426, 2, this, arguments, new.target); }
function crTick() {
var best = null, bd = 2.4;
var ok = typeof camera !== "undefined" && !(typeof wpEditing !== "undefined" && wpEditing) && !(typeof WLD !== "undefined" && WLD.on) && !CR.vend;
if (ok && CR.inst.length) {
var p = new THREE.Vector3();
CR.inst = CR.inst.filter(function (g) { return g.parent; });
for (var i = 0; i < CR.inst.length; i++) {
var g = CR.inst[i];
if (!crLive(g))
continue;
g.getWorldPosition(p);
var dy = camera.position.y - p.y;
if (dy < 0.3 || dy > 2.8)
continue;
var d = Math.hypot(camera.position.x - p.x, camera.position.z - p.z);
if (d < bd) {
bd = d;
best = g;
}
}
}
if (best !== CR.near) {
CR.near = best;
if (best) {
var A = best.userData.crA, m = best.userData.crM;
var html = A.kind === "door" ? "🚪 <b>" + esc(m.title) + "</b> · <b>press E</b> (or tap here) to " + ((best.userData.crBase && best.userData.crBase.open) ? "shut" : "open") + " it"
: "🥤 <b>" + esc(m.title) + "</b> · " + esc(m.maker || "a maker") + "'s models · <b>press E</b> (or tap here) to look";
CR.fn = function () { var g = CR.near; if (!g)
return; if (g.userData.crA.kind === "door") {
crDoor(g);
CR.near = null;
}
else
crVendOpen(g.userData.crM); };
if (typeof worldPromptCity === "function")
worldPromptCity(html, CR.fn);
}
else if (CR.fn && typeof WCITY !== "undefined" && WCITY.fn === CR.fn) {
worldPromptCity(null);
CR.fn = null;
}
}
}
setInterval(function () { try {
crTick();
}
catch (e) { } }, 300);
function crVendOpen(m) { return __ZC(426, 3, this, arguments, new.target); }
function crVendClose() { CR.vend = null; crVendPaint(); }
if (typeof backRegister === "function")
backRegister({ order: 2, open: function () { return !!CR.vend; }, close: crVendClose });
function crVendPaint() { return __ZC(426, 4, this, arguments, new.target); }
var CR_KINDS = [["none", "Ornament"], ["door", "🚪 Door"], ["sign", "🪧 Sign"], ["vending", "🥤 Vending"]];
if (typeof mwRow === "function") {
var crRow0 = mwRow;
mwRow = function (m, btns, sub) { return __ZC(426, 5, this, arguments, new.target); };
}
if (typeof mwClick === "function") {
var crClick0 = mwClick;
mwClick = function (ev) { return __ZC(426, 6, this, arguments, new.target); };
}
var CLIP = { rec: null, chunks: [], t0: 0, max: 20, timer: 0, dest: null, blob: null, url: null, secs: 0, mime: "" };
function clipLite() { return typeof LITE !== "undefined" && !!LITE; }
function clipMime() {
if (typeof MediaRecorder === "undefined")
return "";
var c = ["video/webm;codecs=vp9,opus", "video/webm;codecs=vp8,opus", "video/webm", "video/mp4"];
for (var i = 0; i < c.length; i++) {
try {
if (MediaRecorder.isTypeSupported(c[i]))
return c[i];
}
catch (e) { }
}
return "";
}
function clipCan() { return !!(clipMime() && typeof renderer !== "undefined" && renderer && renderer.domElement && renderer.domElement.captureStream); }
function clipStart() { return __ZC(426, 7, this, arguments, new.target); }
function clipStop() { clearInterval(CLIP.timer); CLIP.timer = 0; if (CLIP.rec && CLIP.rec.state !== "inactive")
try {
CLIP.rec.stop();
}
catch (e) { } }
function clipLetGo(st) {
try {
if (st)
st.getTracks().forEach(function (t) { t.stop(); });
}
catch (e) { }
try {
if (CLIP.dest && typeof audio !== "undefined" && audio.master)
audio.master.disconnect(CLIP.dest);
}
catch (e) { }
CLIP.dest = null;
}
function clipBar() { return __ZC(426, 8, this, arguments, new.target); }
if (typeof pmBar === "function") {
var clipPmBar0 = pmBar;
pmBar = function () { var r = clipPmBar0.apply(this, arguments); try {
clipBar();
}
catch (e) { } return r; };
}
if (typeof pmClose === "function") {
var clipPmClose0 = pmClose;
pmClose = function () { if (CLIP.rec)
clipStop(); return clipPmClose0.apply(this, arguments); };
}
document.addEventListener("click", function (e) {
var t = e.target && e.target.closest ? e.target.closest("#pm-bar [data-pm='clip']") : null;
if (!t)
return;
e.stopPropagation();
if (CLIP.rec)
clipStop();
else
clipStart();
}, true);
function clipPreview(blob, secs) { return __ZC(426, 9, this, arguments, new.target); }
function clipUpload(blob, secs, ext) { return __ZC(426, 10, this, arguments, new.target); }
