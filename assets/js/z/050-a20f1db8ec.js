/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(50, function () {
"use strict";
return [
function (text) {
if (!text)
return 0;
var low = " " + String(text).toLowerCase().replace(/\s+/g, " ") + " ";
var d = dreamer(), found = 0;
ABILITY.forEach(function (pair) {
for (var i = 0; i < pair[1].length; i++) {
if (low.indexOf(pair[1][i]) > -1) {
var have = null;
d.abilities.forEach(function (a) { if (a.name === pair[0])
have = a; });
if (have) {
if (have.nights.indexOf(store.session) === -1)
have.nights.push(store.session);
}
else {
d.abilities.push({ name: pair[0], nights: [store.session], src: "stated" });
found++;
}
return;
}
}
});
return found;
},
function (fromId, toId, kind, hidden) {
if (!fromId || !toId || fromId === toId)
return null;
if (!store.passages)
store.passages = [];
for (var i = 0; i < store.passages.length; i++) {
var p = store.passages[i];
if ((p.from === fromId && p.to === toId) || (p.from === toId && p.to === fromId))
return p;
}
var pg = { id: uid(), from: fromId, to: toId, kind: kind || "door", hidden: !!hidden, found: !hidden };
store.passages.push(pg);
return pg;
},
function (x, z, r) {
if (!store.passages)
return null;
for (var i = 0; i < store.passages.length; i++) {
var p = store.passages[i];
if (p.kind !== "portal" && p.kind !== "secret")
continue;
if (!p.found)
continue;
var a = specById(p.from), b = specById(p.to);
if (!a || !b)
continue;
if ((a.x - x) * (a.x - x) + (a.z - z) * (a.z - z) < r * r)
return { at: a, to: b, p: p };
if ((b.x - x) * (b.x - x) + (b.z - z) * (b.z - z) < r * r)
return { at: b, to: a, p: p };
}
return null;
}
];
});
