/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(131, function () {
"use strict";
return [
function (why) {
gateLast = { at: Date.now(), why: why };
if (typeof window !== "undefined" && window.SOMNU_ACCESS === true)
return;
if (typeof accessDenied === "function") {
try {
accessDenied();
}
catch (e) { }
}
if (typeof document === "undefined" || document.getElementById("buy-panel"))
return;
if (Date.now() - gatePanelAt < 90000)
return;
gatePanelAt = Date.now();
if (typeof buyPanel === "function")
buyPanel(why);
else if (typeof setStatus === "function")
setStatus(GATE_SAID[why] || GATE_SAID.city);
},
function (quiet) {
return keepToAccountUngated(quiet).catch(function (e) {
if (gateJustRefused("vault")) {
if (!quiet && typeof setStatus === "function")
setStatus(GATE_SAID.vault);
if (typeof syncStatus === "function")
syncStatus();
throw new Error(GATE_SAID.vault);
}
throw e;
});
}
];
});
