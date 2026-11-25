/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(374, function () {
"use strict";
return [
function (c) {
var h = String(c.name || c.wKey || ""), yrs = 1 + fpnHash(h + "|y") % 28;
return "Your own personality (always the same, whoever you talk to): you are " + fpnPick(FPN_T, h, "t") + ". When you talk, " + fpnPick(FPN_S, h, "s") +
". You love " + fpnPick(FPN_L, h, "l") + ". Lately you worry about " + fpnPick(FPN_W, h, "w") + ". At home, " + fpnPick(FPN_H, h, "h") +
". " + fpnPick(FPN_X, h, "x").replace(/^you/, "You") + ". About the place you live: " + fpnPick(FPN_V, h, "v") + ". You have done your work for " + yrs + " year" + (yrs === 1 ? "" : "s") +
". Let all this show the way it does in a real person: now and then, in passing, never as a list, and never all at once." +
" If you are someone out of a story, a legend or history, your story's own character comes first and this only colours it.";
},
function (force) {
if (!(typeof signedIn === "function" && signedIn() && typeof cityRpc === "function"))
return Promise.resolve(false);
if (FPN.asking)
return FPN.asking;
if (!force && Date.now() - FPN.at < 15 * 60 * 1000)
return Promise.resolve(true);
FPN.asking = cityRpc("folk_personas").then(function (rows) {
var s = {};
(Array.isArray(rows) ? rows : []).forEach(function (r) { if (r && r.folk && r.persona)
s[String(r.folk).trim().toLowerCase()] = String(r.persona).slice(0, 1200); });
FPN.set = s;
FPN.at = Date.now();
return true;
}).catch(function () { return false; }).then(function (v) { FPN.asking = null; return v; });
return FPN.asking;
}
];
});
