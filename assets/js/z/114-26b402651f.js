/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(114, function () {
"use strict";
return [
function (text) {
var low = " " + String(text || "").toLowerCase() + " ", best = null, at = -1;
WX_WORDS.forEach(function (w) { var re = new RegExp(w[1].source, "g"), m; while ((m = re.exec(low))) {
if (m.index >= at) {
at = m.index;
best = w[0];
}
} });
var strong = /\b(heavy|torrential|pouring|violent|raging|huge|massive|terrible|biggest|endless|thick)\b/.test(low) ? 1.6 : /\b(light|gentle|soft|faint|little)\b/.test(low) ? 0.6 : 1;
return best ? { kind: best, strength: strong } : null;
}
];
});
