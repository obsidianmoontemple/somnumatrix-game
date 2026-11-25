/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(173, function () {
"use strict";
return [
function () {
var b = document.getElementById("ep-btn"), waiting = EP.list.filter(function (p) { return !p.opened && p.holds; }).length;
if (!waiting) {
if (b)
b.style.display = "none";
return;
}
if (!b && document.body) {
b = document.createElement("button");
b.id = "ep-btn";
b.className = "btn";
b.style.cssText = "position:fixed;right:12px;bottom:182px;z-index:30;background:rgba(20,30,24,.92);border:1px solid #9AD8A0;color:#E8FFE8;padding:6px 12px;border-radius:3px;font:13px var(--sans,sans-serif)";
b.onclick = function () { var p = EP.list.filter(function (q) { return !q.opened && q.holds; })[0]; if (p)
epShow(p.id); };
document.body.appendChild(b);
}
if (b) {
b.textContent = "🎒 Your city entry pack" + (waiting > 1 ? " (" + waiting + ")" : "");
b.style.display = "block";
}
},
function () {
var el = document.getElementById("ep-panel");
if (el || !document.body)
return el;
el = document.createElement("div");
el.id = "ep-panel";
el.style.cssText = "position:fixed;left:50%;top:50%;transform:translate(-50%,-50%);z-index:46;width:min(440px,calc(100vw - 32px));max-height:calc(100vh - 80px);overflow-y:auto;display:none;" +
"background:linear-gradient(#1A1E2A,#12141C);border:1px solid #C9A868;border-radius:6px;padding:18px 20px;color:#EDE6D6;font:14px/1.5 var(--sans,sans-serif);box-shadow:0 10px 40px rgba(0,0,0,.6)";
document.body.appendChild(el);
el.addEventListener("click", function (e) {
var t = e.target.closest ? e.target.closest("[data-ep]") : null;
if (!t)
return;
e.preventDefault();
var k = t.getAttribute("data-ep"), p = EP.list.filter(function (q) { return q.id === EP.cur; })[0];
if (k === "close") {
epClose();
}
else if (k === "wear" && p) {
epWear(p);
epPaint();
}
else if (k === "own") {
epOwnClothes();
epPaint();
}
else if (k === "way" && p) {
epWay(p);
epClose();
}
});
return el;
},
function () {
var el = epEl();
if (!el)
return;
var p = EP.list.filter(function (q) { return q.id === EP.cur; })[0];
if (!p) {
el.style.display = "none";
return;
}
var w = (typeof jobWear === "function") ? jobWear(p.job, p.workplace) : {}, cols = [w.top, w.layerColor, w.bottom, w.hatColor, w.backColor].filter(function (c) { return c != null; });
var wearing = epWearing(p);
el.innerHTML = '<div style="text-align:center;margin-bottom:10px"><div style="font:600 12px var(--sans);letter-spacing:.18em;color:#C9A868">THE TOWER · OFFICE OF ARRIVALS</div>' +
'<div style="font:22px Georgia,serif;color:#FFF4D8;margin-top:4px">Your City Entry Pack</div><div style="color:#B8B0A0;font-size:12.5px">Welcome to Somnucor. Everything you need to start is in here.</div></div>' +
'<div style="border-top:1px solid #3A3A44;padding:10px 0"><div style="color:#9AD8A0;font-weight:600">1. Your post</div>' +
'<div><b>' + esc(p.job) + '</b> at ' + esc(p.workplace || p.employer) + '</div><div style="color:#B8B0A0;font-size:12.5px">Your shifts: ' + esc(p.shifts || "any time") + ' (city time). Clock in at your post to earn.</div></div>' +
'<div style="border-top:1px solid #3A3A44;padding:10px 0"><div style="color:#9AD8A0;font-weight:600">2. Your attire</div>' +
'<div>' + esc(p.attire || ("Work attire: " + p.job)) + ' ' + cols.map(epSwatch).join(" ") + '</div><div style="color:#B8B0A0;font-size:12.5px">It is in your things. Wear it to work, and change back whenever you like.</div>' +
'<div style="margin-top:6px">' + (wearing ? '<button class="btn" data-ep="own">Back to my own clothes</button> <span style="color:#9AD8A0">Wearing it.</span>' : '<button class="btn" data-ep="wear">Wear it now</button>') + '</div></div>' +
'<div style="border-top:1px solid #3A3A44;padding:10px 0"><div style="color:#9AD8A0;font-weight:600">3. Where you work</div>' +
'<div>' + esc(p.workplace || p.employer) + '</div><div style="margin-top:6px"><button class="btn" data-ep="way">Show me the way</button></div></div>' +
'<div style="border-top:1px solid #3A3A44;padding:10px 0"><div style="color:#9AD8A0;font-weight:600">4. Your advance</div>' +
(p.advance > 0 ? '<div style="font:20px Georgia,serif;color:#FFD040">' + (+p.advance).toLocaleString() + ' gold</div>' : '') + '<div style="color:#D8D0C0">' + esc(p.advance_note || "") + '</div></div>' +
'<div style="text-align:center;margin-top:8px"><button class="btn" data-ep="close">Close the pack</button></div>';
el.style.display = "block";
},
function (p) {
var L = meLook(), d = dreamer();
if (!d.offDuty) {
var keep = {};
EP_FIELDS.forEach(function (k) { keep[k] = L[k] === undefined ? null : L[k]; });
d.offDuty = { look: keep, job: p.job };
}
else
d.offDuty.job = p.job;
if (typeof jobDress === "function")
jobDress(L, p.job, p.workplace);
if (typeof rebuildMe === "function")
rebuildMe();
if (typeof save === "function")
save();
setStatus("<b>In your work attire.</b> " + esc(p.job) + ", ready for your shift.");
},
function (p) {
var key = p.workplace || p.employer;
if (store.workplaceAt && (typeof wayKey === "function" ? wayKey(key) : store.workplaceAt[key]) && typeof showTheWay === "function")
return showTheWay(key);
if (p.x != null && typeof ATLC !== "undefined" && ATLC && typeof guideTo !== "undefined") {
if (typeof landWalk === "function")
landWalk();
guideTo = { key: key, x: ATLC.x + (+p.x), z: ATLC.z + (+p.z) };
var r = typeof somnucorRealm === "function" && somnucorRealm();
if (r && (store.here || 0) !== r.id && typeof toSomnucor === "function")
toSomnucor();
setStatus("🧭 <b>" + esc(key) + "</b>: follow the pointer at the top of the screen.");
return;
}
if (typeof showTheWay === "function")
showTheWay(key);
}
];
});
