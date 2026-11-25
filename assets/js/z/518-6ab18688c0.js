/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(518, function () {
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
}
];
});
