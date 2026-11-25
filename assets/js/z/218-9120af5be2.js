/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(218, function () {
"use strict";
return [
function () {
var S = CWX.srv;
if (S && S.set && S.set.kind && new Date(S.set.until).getTime() > Date.now())
return (typeof tnWhen === "function" ? tnWhen(S.set.until) : "later");
var f = cwxForecast();
for (var i = 0; i < f.length; i++)
if (f[i].kind !== "storm")
return typeof tnWhen === "function" ? tnWhen(new Date(f[i].at).toISOString()) : "later";
return "later";
},
function () {
var h = cwxHolidays(1)[0];
if (!h || h.days !== 0)
return;
var key = "cwx-greet-" + new Date().toDateString();
if (CWX.greeted === key)
return;
CWX.greeted = key;
try {
if (localStorage.getItem(key))
return;
localStorage.setItem(key, "1");
}
catch (e) { }
if (typeof setStatus === "function")
setStatus(h.h.icon + " <b>Today is " + esc(h.h.name) + ".</b> " + esc(h.h.line));
}
];
});
