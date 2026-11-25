/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(120, function () {
"use strict";
return [
function () {
try {
localStorage.setItem(KITCACHE_KEY, JSON.stringify(kitCache));
}
catch (e) {
var ks = Object.keys(kitCache.defs);
ks.slice(0, Math.ceil(ks.length / 2)).forEach(function (k) { delete kitCache.defs[k]; });
try {
localStorage.setItem(KITCACHE_KEY, JSON.stringify(kitCache));
}
catch (e2) { }
}
}
];
});
