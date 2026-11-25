/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var TFX = { el: null, shown: "", want: "", swapAt: 0, hideAt: 0, lastSeen: {}, on: false };
function tfxWalking() {
try {
if (typeof walkMode === "undefined" || !walkMode)
return false;
var sc = document.getElementById("scrim");
if (sc && !sc.classList.contains("hidden"))
return false;
if (typeof renderer !== "undefined" && renderer && renderer.xr && renderer.xr.isPresenting)
return false;
return true;
}
catch (e) {
return false;
}
}
function tfxEl() {
if (TFX.el)
return TFX.el;
var st = document.createElement("style");
st.textContent = "#tfx-say{position:fixed;left:50%;bottom:calc(172px + env(safe-area-inset-bottom,0px));transform:translateX(-50%);z-index:44;" +
"max-width:min(560px,calc(100vw - 32px));background:rgba(8,10,18,.86);border:1px solid rgba(232,226,210,.28);border-radius:4px;padding:8px 14px;" +
"font:13px/1.45 var(--sans,system-ui);color:var(--bone,#E8E2D2);text-align:center;pointer-events:none;opacity:0;transition:opacity .6s ease;visibility:hidden}" +
"#tfx-say.on{opacity:1;visibility:visible}#tfx-say b{color:#F2D27A;font-weight:600}#tfx-say i{font-style:normal;color:#E8A86A}" +
"body.touch #tfx-say{bottom:auto;top:calc(96px + env(safe-area-inset-top,0px))}" +
"body.drive-on #tfx-say{bottom:calc(210px + env(safe-area-inset-bottom,0px))}";
document.head.appendChild(st);
var d = document.createElement("div");
d.id = "tfx-say";
d.setAttribute("role", "status");
d.setAttribute("aria-live", "polite");
document.body.appendChild(d);
TFX.el = d;
return d;
}
function tfxPlain(h) { return String(h || "").replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim(); }
function tfxSaid() {
try {
if (!tfxWalking())
return;
var st = document.getElementById("status");
if (!st)
return;
var h = st.innerHTML, t = tfxPlain(h);
if (!t || t.length < 3)
return;
var now = performance.now();
if (TFX.on && h === TFX.shown)
return;
if (!TFX.on && TFX.lastSeen[t] && now - TFX.lastSeen[t] < 20000)
return;
TFX.want = h;
}
catch (e) { }
}
function tfxTick() {
try {
var now = performance.now();
if (!tfxWalking()) {
if (TFX.on) {
TFX.on = false;
if (TFX.el)
TFX.el.classList.remove("on");
}
TFX.want = "";
return;
}
if (TFX.want && TFX.want !== TFX.shown && now >= TFX.swapAt) {
var el = tfxEl(), t = tfxPlain(TFX.want);
el.innerHTML = TFX.want;
TFX.shown = TFX.want;
TFX.want = "";
TFX.swapAt = now + 1000;
TFX.hideAt = now + Math.min(10000, Math.max(5000, t.length * 70));
TFX.lastSeen[t] = now;
if (!TFX.on) {
TFX.on = true;
el.classList.add("on");
}
}
else if (TFX.want === TFX.shown)
TFX.want = "";
if (TFX.on && now > TFX.hideAt) {
TFX.on = false;
TFX.el.classList.remove("on");
TFX.shown = "";
}
}
catch (e) { }
}
(function () {
if (typeof setStatus !== "function")
return;
var ss = setStatus;
setStatus = function (h) { var r = ss.apply(this, arguments); tfxSaid(); return r; };
setInterval(tfxTick, 200);
})();
function tfxShielded() {
try {
if (typeof bugIsOpen === "function" && bugIsOpen()) {
TFX.bugAt = performance.now();
return true;
}
return !!TFX.bugAt && performance.now() - TFX.bugAt < 3000;
}
catch (e) {
return false;
}
}
(function () {
["dgrHurt", "cbtHarm", "mmHurt", "bwHurtMe", "pyHurt", "dgbHurt", "sbHurt", "dmkHurtMe", "sgaVigHurt", "ssxHurt", "alxHurt", "ltfOnHurt", "wdHurt", "cdmgHurt"].forEach(function (n) {
var f = window[n];
if (typeof f !== "function")
return;
window[n] = function () { if (tfxShielded())
return n === "cbtHarm" ? 0 : undefined; return f.apply(this, arguments); };
});
})();
var TFXP = { h: "", at: 0, nullSince: 0, target: null };
function tfxPromptHidden(html) {
try {
return !!html && /to strike/.test(String(html)) && document.body.classList.contains("cbt-on");
}
catch (e) {
return false;
}
}
function tfxPromptPaint() {
var p = WLD.prompt;
if (!p)
return;
if (TFXP.h) {
if (p.innerHTML !== TFXP.h)
p.innerHTML = TFXP.h;
p.dataset.h = TFXP.h;
p.style.display = "block";
p.classList.toggle("cbt-strikep", false);
}
else
p.style.display = "none";
}
function tfxPromptAfter(html) { return __ZC(528, 0, this, arguments, new.target); }
(function () {
if (typeof worldPrompt !== "function")
return;
var wp = worldPrompt;
worldPrompt = function (html, fn) { var r = wp.apply(this, arguments); try {
tfxPromptAfter(html);
}
catch (e) { } return r; };
setInterval(function () {
try {
if (typeof WLD === "undefined" || !WLD.prompt)
return;
var now = performance.now();
if (TFXP.h && TFXP.target === "" && TFXP.nullSince && now - TFXP.nullSince >= 330) {
TFXP.h = "";
TFXP.nullSince = 0;
TFXP.at = now;
tfxPromptPaint();
}
else if (TFXP.target && TFXP.target !== TFXP.h && now - TFXP.at >= 450) {
TFXP.h = TFXP.target;
TFXP.at = now;
tfxPromptPaint();
}
}
catch (e) { }
}, 100);
})();
var TFX_SEAT = { y: 0.6, back: 0.06, at: 0 };
function tfxSeatFit() {
if (typeof ORB === "undefined" || !ORB.crew || !ORB.seats || typeof WLD === "undefined" || WLD.on !== "shuttle")
return;
var v = TFX_SEAT.v || (TFX_SEAT.v = new THREE.Vector3()), B = (typeof WORLDS !== "undefined" && WORLDS.shuttle) ? WORLDS.shuttle.base : 0;
ORB.crew.forEach(function (c) {
var g = c.g;
if (!g || !g.userData.seated || c.role !== "pax")
return;
if (!c.seat) {
var best = null, bd = 0.5;
ORB.seats.forEach(function (s) { var d = Math.hypot(s.x - g.position.x, s.z - (g.position.z + 0.05)); if (d < bd) {
bd = d;
best = s;
} });
if (!best)
return;
c.seat = best;
}
var hips = null;
g.traverse(function (o) { if (!hips && o.isBone && /hips|pelvis/i.test(o.name))
hips = o; });
if (!hips) {
c.fitted = null;
return;
}
if (c.fitted === hips)
return;
if (c.hipsSeen !== hips) {
c.hipsSeen = hips;
c.hipsAt = performance.now();
return;
}
if (performance.now() - c.hipsAt < 2000)
return;
g.updateMatrixWorld(true);
hips.getWorldPosition(v);
var px = g.parent ? g.parent.position.x : 0;
var hx = v.x - px, hy = v.y, hz = v.z;
g.position.x += c.seat.x - hx;
g.position.z += (c.seat.z + TFX_SEAT.back) - hz;
g.position.y += TFX_SEAT.y - hy;
c.fitted = hips;
});
}
setInterval(function () { try {
tfxSeatFit();
}
catch (e) { } }, 700);
