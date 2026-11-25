/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(152, function () {
"use strict";
return [
function (p, h) {
var d = ccDuty(p, h), j = p.job.title.toLowerCase();
var what = d === "work" ? "at work" : d === "lunch" ? "on a lunch break" : d === "going" ? "on the way to work" : d === "home" ? "on the way home from work" : (h >= 19.5 || h < 4) ? "out for the evening" : "off duty";
return p.name + " \u00b7 " + (p.k % 9 === 4 ? "at play" : p.job.title + ", " + what);
}
];
});
