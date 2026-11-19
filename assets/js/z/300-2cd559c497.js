/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(300, function () {
"use strict";
return [
function () {
var out = [];
FG_WORK.forEach(function (w) { out.push({ key: w[0], cat: "Materials", design: w[0], tier: null, label: w[1], need: w[2], makes: w[3], amount: w[4], st: w[5], use: "stock" }); });
FG_DESIGNS.forEach(function (d) {
(FG_TIERS[d[4]] || []).forEach(function (t) {
out.push({ key: d[0] + ":" + t[0], cat: d[1], design: d[0], tier: t[0], tierName: t[1], mult: t[2], label: t[1] + " " + d[2].charAt(0).toLowerCase() + d[2].slice(1),
item: d[3], need: fgNeedAdd(d[6], t[3], Math.max(1, d[5])), st: d[7], use: d[8], x: d[9], size: d[5] });
});
});
return out;
}
];
});
