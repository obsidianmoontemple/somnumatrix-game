/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(46, function () {
"use strict";
return [
function (seg) {
var m;
if ((m = /\b(a|an|one|two|three|four|five|six|seven|eight|nine|ten|a couple of|a few|several)\s+(blocks?|streets?|roads?)\s*(away|over|down|up|along|from here|further on|further)?\b/.exec(seg)))
return { blocks: WORDNUM[m[1]] || 1, why: m[0].trim() };
if (/\bnext door\b|\bnext to it\b|\bbeside it\b/.test(seg))
return { blocks: 0, near: true, why: "next door" };
if (/\b(down|up) the (street|road|lane)\b|\bfurther along\b|\bat the end of the (street|road)\b/.test(seg))
return { blocks: 0, along: true, why: "down the street" };
if (/\baround the corner\b|\bround the corner\b|\bon the corner of the next\b/.test(seg))
return { blocks: 1, corner: true, why: "around the corner" };
if (/\bacross town\b|\bother side of town\b|\bfar side of town\b|\bright across the city\b/.test(seg))
return { blocks: 5, far: true, why: "across town" };
if (/\b(the )?next neighbou?rhood\b|\bthe next part of town\b|\banother neighbou?rhood\b/.test(seg))
return { blocks: 3, hood: true, why: "the next neighbourhood" };
if (/\bin (my|our|the) (old )?neighbou?rhood\b|\bmy street\b|\bour street\b|\bmy road\b/.test(seg))
return { blocks: 0, home: true, why: "the home neighbourhood" };
if (/\bout of town\b|\boutside the town\b|\bon the edge of town\b|\bout past the houses\b/.test(seg))
return { blocks: 6, edge: true, why: "out of town" };
if (/\bmiles (away|off)\b|\ba long way (away|off)\b|\bfar away\b/.test(seg))
return { blocks: 9, far: true, why: "miles away" };
return null;
},
function (spans, nouns, low) {
var map = {};
spans.forEach(function (sp) {
var after = (low || "").slice(sp.end, sp.end + 14);
var pointsForward = /^\s*(stood|stands|sat|sits|was|were|there|lay|lies|rose|is|are|i (saw|found))/.test(after);
var best = null, bd = 1e9;
nouns.forEach(function (n) {
var forward = n.at >= sp.end;
var gap = forward ? (n.at - sp.end) : (sp.at - n.at);
if (gap < 0)
return;
if (pointsForward && !forward)
return;
var limit = forward ? 70 : 40;
var score = gap + (forward === pointsForward ? 0 : 25);
if (gap < limit && score < bd) {
bd = score;
best = n;
}
});
if (best && map[best.at] === undefined)
map[best.at] = sp.d;
});
return map;
},
function (d) {
if (!d)
return null;
var g = store.grid, from = { bx: g.bx, bz: g.bz, lot: g.lot };
if (d.near || d.along || d.home) {
var last = store.lastId ? specById(store.lastId) : null;
if (last && (last.realm || 0) === (store.here || 0) && last.bx !== undefined && last.bx !== null) {
g.bx = last.bx;
g.bz = last.bz;
g.lot = (last.lot === undefined || last.lot === null) ? 0 : ((last.lot + 1) % LOTS);
}
return from;
}
var n = d.blocks || 1;
if (d.far || d.edge) {
var minx = 1e9, maxx = -1e9, minz = 1e9, maxz = -1e9, any = false;
store.objects.forEach(function (o) {
if (o.filler || (o.realm || 0) !== (store.here || 0))
return;
var d2 = KIT[o.archetype];
if (!d2 || d2.cat !== "structure")
return;
any = true;
minx = Math.min(minx, o.x);
maxx = Math.max(maxx, o.x);
minz = Math.min(minz, o.z);
maxz = Math.max(maxz, o.z);
});
if (any) {
var cx = Math.round(((minx + maxx) / 2) / PITCH), cz = Math.round(((minz + maxz) / 2) / PITCH);
var away = Math.max(n, Math.ceil(Math.max(maxx - minx, maxz - minz) / PITCH));
var a = (hash(String(store.objects.length)) % 4);
g.bx = cx + (a === 0 ? away : a === 1 ? -away : 0);
g.bz = cz + (a === 2 ? away : a === 3 ? -away : 0);
}
else {
g.bx += n;
}
}
else if (d.corner) {
g.bx += (Math.random() < 0.5 ? 1 : -1);
}
else {
var dir = (typeof walkMode !== "undefined" && walkMode) ? yaw : (hash(String(g.bx + g.bz)) % 4) * Math.PI / 2;
var dx = Math.round(-Math.sin(dir)), dz = Math.round(-Math.cos(dir));
if (!dx && !dz)
dz = -1;
g.bx += dx * n;
g.bz += dz * n;
}
g.lot = 0;
if (d.hood || d.far || d.edge || (d.blocks || 0) >= 2)
hoodAt(g.bx, g.bz);
return from;
}
];
});
