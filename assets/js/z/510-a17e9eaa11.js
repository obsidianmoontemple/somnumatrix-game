/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(510, function () {
return [
function (W, nx, msg, then) {
RUS.busy = true;
var go = function () {
try {
var y = typeof terrainY === "function" ? terrainY(W.x, W.z) : 0, h = nx && nx.x !== undefined ? rusHeading(W, nx) : (typeof DRIVE !== "undefined" ? DRIVE.h : 0);
tgPut(W.x, W.z, y, h);
if (typeof DRIVE !== "undefined")
DRIVE.v = 0;
}
catch (e) {
if (window.console)
console.warn("[road-unstick]", e);
}
try {
if (then)
then();
}
catch (e) { }
TGL.chk = null;
rusReset();
try {
if (typeof CHAUF !== "undefined") {
CHAUF.holdT = 0;
CHAUF.dec = null;
CHAUF.roundTill = 0;
}
}
catch (e) { }
setTimeout(function () { RUS.busy = false; }, 1200);
};
if (typeof tgFade === "function")
tgFade(msg, go);
else
go();
},
function (dt) {
if (!rusOn() || RUS.busy) {
if (!rusOn()) {
rusReset();
RUS.skips = [];
RUS.route = null;
}
return;
}
if ((typeof TG !== "undefined" && TG.busy) || (typeof GAR !== "undefined" && GAR.busy))
return;
if (RUS.route !== TGL.route) {
RUS.route = TGL.route;
RUS.skips = [];
rusReset();
}
var R = TGL.route, W = R[TGL.wi];
if (!W || W.lift || W.exitUp || W.gate || W.x === undefined) {
rusReset();
return;
}
var P = camera.position, d = Math.hypot(W.x - P.x, W.z - P.z);
if (TGL.wi !== RUS.wi) {
RUS.wi = TGL.wi;
RUS.best = d;
RUS.stuck = 0;
return;
}
if (d < RUS.best - 2) {
RUS.best = d;
RUS.stuck = 0;
return;
}
var atLight = false;
try {
atLight = typeof CHAUF !== "undefined" && CHAUF.lightWhy && CHAUF.note === CHAUF.lightWhy;
}
catch (e) { }
var last = TGL.wi === R.length - 1;
if ((last || W.park) && d < 4) {
RUS.stuck = 0;
return;
}
RUS.stuck += Math.min(dt || 0, 0.1) * (atLight ? 0.25 : 1);
if (RUS.stuck < 12)
return;
var now = performance.now();
RUS.skips = RUS.skips.filter(function (t) { return now - t < 60000; });
var taxi = TGL.auto && TGL.auto.taxi, who = taxi ? "The cab driver" : "The chauffeur";
if (RUS.skips.length >= 3 || last) {
var E = R[R.length - 1];
for (var i = R.length - 1; i >= TGL.wi; i--) {
if (R[i] && R[i].x !== undefined && !R[i].lift && !R[i].gate && !R[i].exitUp) {
E = R[i];
break;
}
}
var prev = R[Math.max(TGL.wi, R.indexOf(E) - 1)];
RUS.skips = [];
rusPut(E, null, who + " knows another way, and takes you the rest of it…", function () { TGL.wi = R.indexOf(E); if (prev && prev !== E) {
try {
tgPut(E.x, E.z, typeof terrainY === "function" ? terrainY(E.x, E.z) : 0, rusHeading(prev, E));
}
catch (e) { }
} });
return;
}
RUS.skips.push(now);
var nx = R[TGL.wi + 1] && R[TGL.wi + 1].x !== undefined && !R[TGL.wi + 1].lift ? R[TGL.wi + 1] : null;
rusPut(W, nx, who + " finds a way round…", function () { TGL.wi++; });
}
];
});
