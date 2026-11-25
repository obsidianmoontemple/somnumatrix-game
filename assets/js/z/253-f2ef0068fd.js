/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(253, function () {
"use strict";
return [
function (K) {
rmapCss();
var el = document.getElementById("rmap");
if (!el) {
el = document.createElement("div");
el.id = "rmap";
document.body.appendChild(el);
["keydown", "keyup"].forEach(function (k) { el.addEventListener(k, function (e) { if (e.code !== "Escape")
e.stopPropagation(); }); });
}
if (document.exitPointerLock && document.pointerLockElement)
document.exitPointerLock();
RMAP.open = true;
RMAP.openAt = K;
RMAP.pick = null;
var D = rmapOf(), H = [];
H.push("<button class='rm-x' type='button'>Close</button><div class='rm-in'><div class='rm-map'><canvas width='900' height='900'></canvas><div class='rm-where'></div></div><div class='rm-list'>");
H.push("<h2>Somnucor, ring by ring</h2><div class='rm-sub'>You are on " + esc(ATL_RINGS[K.ring].name) + ". Tap a place to see it on the map.</div>");
D.rings.forEach(function (B) {
var R = B.R, here = B.i === K.ring, pl = function (it) { return "<span class='rm-p' data-x='" + it.x.toFixed(1) + "' data-z='" + it.z.toFixed(1) + "' data-n='" + esc(it.name) + "'>" + esc(it.name) + "</span>"; };
var srt = function (o) { return Object.keys(o).sort(function (a, b) { return a.replace(/^The /, "").localeCompare(b.replace(/^The /, "")); }).map(function (k) { return o[k]; }); };
var body = [];
var w = srt(B.work), l = srt(B.land), a = srt(B.area), tk = Object.keys(B.temples).sort();
if (w.length)
body.push("<div class='rm-h'>Workplaces and services</div>" + w.map(pl).join(""));
if (tk.length) {
body.push("<div class='rm-h'>The houses of the powers, by tradition</div>");
tk.forEach(function (t) { var L = srt(B.temples[t]); body.push("<div style='margin:6px 0 2px;color:#E8D8B0;font-size:13px'>" + esc(rmapTrad(t)) + " <span class='rm-sub'>(" + L.length + ")</span></div>" + L.map(pl).join("")); });
}
if (l.length)
body.push("<div class='rm-h'>Landmarks</div>" + l.map(pl).join(""));
if (a.length)
body.push("<div class='rm-h'>Streets, quarters and markets</div>" + a.map(pl).join(""));
if (!body.length)
body.push("<div class='rm-sub' style='margin-top:4px'>" + (R.k === "wilds" ? "No streets here: only the wild, and what waits in it." : "Nothing listed yet.") + "</div>");
H.push("<details" + (here ? " open" : "") + "><summary><span class='sw' style='background:" + rmapHex(R.col, 0.12) + "'></span>" + (B.i ? B.i + ". " : "") + esc(R.name) + (here ? "<span class='hr'>● you are here</span>" : "") + "</summary>" +
"<div class='rm-sub' style='margin:4px 0'>" + esc(RMAP_ABOUT[R.k] || "") + "</div>" + body.join("") + "</details>");
});
H.push("</div></div>");
el.innerHTML = H.join("");
el.style.display = "block";
el.querySelector(".rm-x").onclick = rmapClose;
el.querySelectorAll(".rm-p").forEach(function (p) {
p.onclick = function () {
el.querySelectorAll(".rm-p.on").forEach(function (q) { q.classList.remove("on"); });
p.classList.add("on");
RMAP.pick = { x: +p.getAttribute("data-x"), z: +p.getAttribute("data-z"), name: p.getAttribute("data-n") };
rmapPanelPaint();
};
});
rmapPanelPaint();
},
function () {
var el = document.getElementById("rmap");
if (!el)
return;
var cv = el.querySelector("canvas"), g = cv.getContext("2d"), K = RMAP.openAt;
g.fillStyle = RMAP_PAPER;
g.fillRect(0, 0, 900, 900);
var ring = K.ring;
if (RMAP.pick) {
var pr = rmapRingAt(RMAP.pick.x, RMAP.pick.z);
if (pr !== null)
ring = pr;
}
var M = rmapDrawCity(g, 0, 0, 900, { hi: ring });
var P = (typeof camera !== "undefined" && camera) ? camera.position : K;
rmapDot(g, M, P.x, P.z, "#C8202A", 10, "You are here", 26);
var w = el.querySelector(".rm-where");
if (RMAP.pick) {
rmapDot(g, M, RMAP.pick.x, RMAP.pick.z, "#1E4AA8", 9, RMAP.pick.name, 24);
var dx = RMAP.pick.x - P.x, dz = RMAP.pick.z - P.z, d = Math.hypot(dx, dz);
var b = typeof bearingOf === "function" ? bearingOf(dx, dz) : 0, pt = typeof pointOf === "function" ? pointOf(b) : "";
var pr2 = rmapRingAt(RMAP.pick.x, RMAP.pick.z);
w.innerHTML = "<b>" + esc(RMAP.pick.name) + "</b>" + (pr2 !== null ? " on " + esc(ATL_RINGS[pr2].name) : "") + ": about " + (d < 1000 ? Math.round(d / 10) * 10 + " m" : (d / 1000).toFixed(1) + " km") + (d > 15 && pt ? " to the " + esc(String(pt).toLowerCase().replace(/^n$/, "north").replace(/^s$/, "south").replace(/^e$/, "east").replace(/^w$/, "west").replace(/^ne$/, "north-east").replace(/^nw$/, "north-west").replace(/^se$/, "south-east").replace(/^sw$/, "south-west")) : "") + ".";
}
else
w.textContent = "North is at the top.";
}
];
});
