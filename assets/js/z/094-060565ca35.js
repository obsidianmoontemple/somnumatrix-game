/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(94, function () {
"use strict";
return [
function () {
var el = document.getElementById("ug");
if (el || !document.body)
return el;
var css = document.createElement("style");
css.textContent = "#ug{position:fixed;left:50%;top:50%;transform:translate(-50%,-50%);z-index:60;display:none;width:min(420px,calc(100vw - 24px));max-height:80vh;overflow:auto;" +
"background:rgba(8,10,16,.97);border:1px solid #C03A2E;border-radius:4px;padding:14px 16px;font:13px var(--sans);color:var(--bone)}" +
"#ug .st{display:flex;justify-content:space-between;align-items:center;padding:7px 0;border-bottom:1px solid var(--line,#2A2C34)}" +
"#ug-ride{position:fixed;inset:0;z-index:70;display:none;background:#05060A;overflow:hidden;font:15px var(--sans);color:#E8E2D2}" +
"#ug-ride .lt{position:absolute;left:-30%;width:28%;height:3px;background:linear-gradient(90deg,transparent,#FFD890,transparent);animation:ugl 2.4s linear infinite;opacity:.5}" +
"@keyframes ugl{from{left:-30%}to{left:110%}}" +
"#ug-ride .win{position:absolute;left:8%;right:8%;top:22%;bottom:30%;border:10px solid #1C2A24;border-radius:18px;box-shadow:inset 0 0 60px #000}" +
"#ug-ride .say{position:absolute;left:0;right:0;bottom:12%;text-align:center;letter-spacing:.06em}" +
"#ug-prompt{position:fixed;left:50%;bottom:calc(120px + env(safe-area-inset-bottom,0px));transform:translateX(-50%);z-index:45;display:none;" +
"background:rgba(10,12,18,.92);border:1px solid #C03A2E;border-radius:3px;padding:9px 14px;font:13px var(--sans);color:var(--bone);cursor:pointer}";
document.head.appendChild(css);
el = document.createElement("div");
el.id = "ug";
document.body.appendChild(el);
var rd = document.createElement("div");
rd.id = "ug-ride";
var h = '<div class="win"></div>';
for (var i = 0; i < 9; i++)
h += '<div class="lt" style="top:' + (26 + i * 5) + '%;animation-delay:' + (i * 0.07) + 's"></div>';
rd.innerHTML = h + '<div class="say" id="ug-say"></div>';
document.body.appendChild(rd);
var pr = document.createElement("div");
pr.id = "ug-prompt";
pr.onclick = function () { if (ugNear)
ugShow(ugNear); };
document.body.appendChild(pr);
return el;
},
function (from) {
var el = ugEl();
ugOpen = true;
var list = UNDERGROUND.filter(function (s) { return s !== from; });
var ringOrder = TR_RINGS.map(function (r) { return r[0]; });
list.sort(function (a, b) { return ringOrder.indexOf(a.ring) - ringOrder.indexOf(b.ring) || a.name.localeCompare(b.name); });
if (typeof MALL_STOP !== "undefined" && MALL_STOP && from.ring !== "mall")
list.push(MALL_STOP);
el.innerHTML = '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px"><b style="font-size:15px;color:#E8C27A">The Underground</b>' +
'<button class="btn" id="ug-x">Leave</button></div>' +
'<div style="color:var(--dim);margin-bottom:8px">You are at <b>' + esc(from.name) + '</b>. Every ride is one gold, to anywhere on the line.</div>' +
list.map(function (s) { return '<div class="st"><span>' + esc(s.name) + '</span><button class="btn" data-go="' + esc(s.key) + '">Ride — 1 gold</button></div>'; }).join("") +
'<div id="ug-msg" style="margin-top:8px;color:#C0603A"></div>';
el.style.display = "block";
if (document.exitPointerLock)
document.exitPointerLock();
document.getElementById("ug-x").onclick = ugHide;
Array.prototype.forEach.call(el.querySelectorAll("[data-go]"), function (b) {
b.onclick = function () {
var to = list.filter(function (s) { return s.key === b.getAttribute("data-go"); })[0];
if (to)
ugRide(from, to);
};
});
},
function (from, to) {
var msg = document.getElementById("ug-msg");
if (!(typeof signedIn === "function" && signedIn())) {
if (msg)
msg.textContent = "Sign in to ride: the fare comes from your purse.";
return;
}
if (msg) {
msg.style.color = "var(--dim)";
msg.textContent = "Paying the fare…";
}
cityRpc("ride_underground", { p_from: from.key, p_to: to.key }).then(function (o) {
if (o !== "ok") {
if (msg) {
msg.style.color = "#C0603A";
msg.textContent = String(o);
}
return;
}
ugHide();
var rd = document.getElementById("ug-ride"), say = document.getElementById("ug-say");
rd.style.display = "block";
say.innerHTML = "The Underground · next stop <b>" + esc(to.name) + "</b>";
if (typeof audio !== "undefined" && audio.on && typeof playTone === "function")
try {
playTone(110, 1.2);
}
catch (e) { }
setTimeout(function () {
ugArrive(to);
say.innerHTML = "<b>" + esc(to.name) + "</b> · mind the gap";
setTimeout(function () { rd.style.display = "none"; }, 700);
}, 2600);
if (typeof refreshStanding === "function")
refreshStanding();
}).catch(function (e) { if (msg) {
msg.style.color = "#C0603A";
msg.textContent = e.message;
} });
},
function (to) {
if (to.arrive) {
to.arrive();
return;
}
var sp = to.spec, fx = Math.sin(sp.rot || 0), fz = Math.cos(sp.rot || 0);
var x = sp.x + fx * 5.5, z = sp.z + fz * 5.5;
camera.position.set(x, terrainY(x, z) + 1.72, z);
yaw = Math.atan2(fx, fz);
pitch = 0;
if (typeof flyY !== "undefined")
flyY = 0;
if (typeof walkResume !== "undefined")
walkResume = null;
setStatus("<b>" + esc(to.name) + ".</b> Up the steps and out into the city.");
}
];
});
