/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(316, function () {
"use strict";
return [
function (pt) {
if (typeof ATLC === "undefined" || !ATLC || typeof ATL_STREETS === "undefined")
return { x: pt.x, z: pt.z };
var r = Math.hypot(pt.x - ATLC.x, pt.z - ATLC.z), a = Math.atan2(pt.z - ATLC.z, pt.x - ATLC.x), best = null;
Object.keys(ATL_STREETS).forEach(function (k) { (ATL_STREETS[k] || []).forEach(function (s) { if (best === null || Math.abs(s - r) < Math.abs(best - r))
best = s; }); });
if (best === null)
return { x: pt.x, z: pt.z };
var rr = best + (r >= best ? 1 : -1) * 2.6;
return { x: ATLC.x + Math.cos(a) * rr, z: ATLC.z + Math.sin(a) * rr };
},
function () {
var P = camera.position, opts = [];
var H = typeof homeGuideFind === "function" ? homeGuideFind() : null;
if (H && H.spec) {
var f = (typeof awlFront === "function" && awlFront(H.spec)) || { x: H.spec.x, z: H.spec.z };
opts.push({ key: H.name, x: f.x, z: f.z, home: H.spec.id || true, word: "your home, " + H.name });
}
var T = store.workplaceAt && store.workplaceAt["The Tavern"];
if (T) {
var ts = typeof ktSpecFor === "function" ? ktSpecFor("The Tavern") : null, tf = ts ? pbDoor(ts) : { x: T.x, z: T.z };
opts.push({ key: "The Tavern", x: tf.x, z: tf.z, word: "the Tavern" });
}
opts.sort(function (a, b) { return Math.hypot(a.x - P.x, a.z - P.z) - Math.hypot(b.x - P.x, b.z - P.z); });
return opts[0] || null;
},
function (id, quiet) {
var P = pbById(id);
if (!P)
return false;
var say = function (t) { if (!quiet && typeof setStatus === "function")
setStatus(t); };
if (P.id === "north") {
if (typeof WLD !== "undefined" && WLD.on === "northpole") {
var g = pbNpGate();
if (!g) {
say("The palace is east of the village, up the snow hill.");
return false;
}
guideTo = { key: P.name, x: g.x, z: g.z };
say("<b>" + esc(P.name) + "</b>: up the snow hill east of the village. Follow the pointer at the top of the screen.");
return true;
}
if (typeof WLD !== "undefined" && WLD.on) {
say("<b>" + esc(P.name) + "</b> is at the North Pole. Go back to Somnucor first; the way there is up any cold fireplace.");
return false;
}
pbToCity();
var h = pbHearth();
if (!h) {
say("<b>" + esc(P.name) + "</b>: the way there is up any cold fireplace. Put the fire out, then examine it.");
return false;
}
guideTo = { key: h.key, x: h.x, z: h.z, np: 1 };
if (h.home)
guideTo.home = h.home;
PB.np = Date.now();
say("<b>" + esc(P.name) + "</b> is at the North Pole, and the way there is up a cold chimney. Follow the pointer to " + esc(h.word) +
", put the fire out (E), then examine the fireplace.");
return true;
}
if (typeof WLD !== "undefined" && WLD.on) {
say("<b>" + esc(P.name) + "</b> is in Somnucor, " + esc(P.where.replace(/^The /, "the ")) + ". Go back to Somnucor first.");
return false;
}
pbToCity();
var sp = pbSpec(P);
if (!sp) {
say("<b>" + esc(P.name) + "</b> is not in your city yet: join Somnucor once more to raise it.");
return false;
}
var d = pbDoor(sp);
guideTo = { key: P.name, x: d.x, z: d.z };
say("<b>" + esc(P.name) + "</b>, " + esc(P.where.replace(/^The /, "the ")) + ": follow the pointer at the top of the screen.");
return true;
}
];
});
