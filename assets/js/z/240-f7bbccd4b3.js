/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(240, function () {
"use strict";
return [
function (m) {
if (FALL.cool > 0)
return;
FALL.cool = 3;
var shown = m < 10 ? m.toFixed(0) : Math.round(m);
if (!(typeof signedIn === "function" && signedIn()) || FALL.missing || typeof cityRpc !== "function") {
setStatus("<b>You fall " + shown + " m and land hard.</b> Go gently.");
return;
}
cityRpc("fall_hurt", { p_metres: m }).then(function (d) {
if (!d)
return;
if (typeof d.hp === "number" && typeof harmApply === "function") {
FALL.quiet = true;
try {
harmApply({ hp: d.hp, state: d.state, recovers_at: d.recovers_at });
}
finally {
FALL.quiet = false;
}
}
if (d.ok === false || !d.harm)
return;
if (d.state === "down") {
var when = (d.recovers_at && typeof harmClock === "function") ? harmClock(d.recovers_at) : "";
setStatus("<b>You fall " + shown + " m and go down.</b> You are carried to the City Hospital" + (when ? " and will be on your feet about " + when : "") +
". A physician or a nurse can see to you sooner.");
}
else if (m >= 10) {
setStatus("<b>You fall " + shown + " m and land badly.</b> You are badly hurt: " + d.hp + " of 100. It mends by itself, or the City Hospital can see to you.");
}
else {
setStatus("<b>You fall " + shown + " m and land hard.</b> You are hurt: " + d.hp + " of 100. Go gently for a while.");
}
}).catch(function (e) {
if (typeof rpcMissing === "function" && rpcMissing(e))
FALL.missing = true;
setStatus("<b>You fall " + shown + " m and land hard.</b>");
});
},
function (m) {
m = Math.max(0, Math.min(200, +m || 0));
if (!fallEligible())
return "Be on foot, out in Somnucor, not flying or riding, first.";
var P = camera.position;
P.y += m;
if (typeof flyY !== "undefined")
flyY = fallFeet();
FALL.last = { x: P.x, z: P.z, f: fallFeet() };
FALL.calm = 0;
FALL.air = false;
FALL.cool = 0;
return "Falling " + m + " m.";
}
];
});
