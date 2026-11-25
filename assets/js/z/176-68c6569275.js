/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(176, function () {
"use strict";
return [
function (x, z) {
if (!ATLC)
return null;
var L = garList();
for (var k = 0; k < L.length; k++) {
var G = L[k], u = garXZ(G.a, G.ru), l = garXZ(G.a, G.rl);
if (Math.hypot(x - u.x, z - u.z) < 3.6)
return { G: G, from: "up", to: l, toH: G.down.H, ring: G.down.name, out: 1 };
if (Math.hypot(x - l.x, z - l.z) < 3.6)
return { G: G, from: "down", to: u, toH: G.up.H, ring: G.up.name, out: -1 };
}
return null;
},
function (on) {
if (!GAR.fade && document.body) {
var f = document.createElement("div");
f.id = "gar-fade";
f.style.cssText = "position:fixed;inset:0;z-index:55;background:#05070A;opacity:0;pointer-events:none;transition:opacity .6s;display:flex;align-items:center;justify-content:center;color:#F2D27A;font:20px Georgia,serif";
document.body.appendChild(f);
GAR.fade = f;
}
if (GAR.fade)
GAR.fade.style.opacity = on ? "1" : "0";
},
function (p) {
var D = DRIVE, P = camera.position;
GAR.busy = true;
GAR.armed = false;
D.v = 0;
if (GAR.fade)
GAR.fade.textContent = "";
garFade(true);
if (GAR.fade)
GAR.fade.textContent = (p.from === "up" ? "The lift carries you down to " : "The lift carries you up to ") + p.ring + "…";
if (typeof audio !== "undefined" && audio.on && typeof playTone === "function")
try {
playTone(220, 0.4);
}
catch (e) { }
setTimeout(function () {
P.x = p.to.x;
P.z = p.to.z;
P.y = p.toH + 1.7;
var ox = Math.cos(p.G.a) * p.out, oz = Math.sin(p.G.a) * p.out;
D.h = Math.atan2(-ox, -oz);
if (typeof yaw !== "undefined") {
yaw = D.h;
D.yawSet = yaw;
}
D.v = 0;
D.cam = null;
garFade(false);
setTimeout(function () { GAR.busy = false; }, 500);
setStatus("<b>" + esc(p.ring) + ".</b> Off the lift and away; the guard lifts the barrier.");
}, 1600);
}
];
});
