/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(66, function () {
"use strict";
return [
function (kind, secret, via, guide) {
var r = makeRealm(kind);
if (typeof realmScenery === "function")
realmScenery(r);
if (store.here === r.id)
return r;
var dep = via ? place("portal", via, secret ? { hidden: 1 } : {}) : null;
if (!dep)
dep = store.lastAny ? specById(store.lastAny) : null;
if (!dep || (dep.realm || 0) !== (store.here || 0))
dep = store.lastId ? specById(store.lastId) : null;
if (!dep || (dep.realm || 0) !== (store.here || 0) || dep.filler)
dep = place("secretdoor", "a door that shouldn't be there", { hidden: secret ? 1 : 0 });
if (!store.here)
store.townGrid = store.grid;
else {
var cur = realmById(store.here);
if (cur)
cur.grid = store.grid;
}
store.here = r.id;
store.grid = r.grid;
store.lastLot = null;
var arr = place("portal", "the way back", {});
addPassage(dep.id, arr.id, secret ? "secret" : "portal", !!secret);
store.lastId = arr.id;
store.lastAny = arr.id;
if (guide) {
guide.x = arr.x + 3;
guide.z = arr.z + 2;
guide.realm = r.id;
var gc = charOf(guide);
if (gc) {
gc.x = guide.x;
gc.z = guide.z;
gc.anchor = { x: guide.x, z: guide.z };
addDetail(gc, "led the dreamer into " + r.name);
}
refresh(guide);
}
setStatus("<b>Crossed into " + esc(r.name) + ".</b>");
return r;
},
function (low) {
var out = [];
REALM_WORDS.forEach(function (pair) {
pair[1].forEach(function (w) {
var needle = " " + w + " ", i = 0;
while ((i = low.indexOf(needle, i)) > -1) {
var before = low.slice(Math.max(0, i - 16), i);
if (typeof crossingMeant === "function" && !crossingMeant(low, i, w)) {
i += needle.length - 1;
continue;
}
out.push({ at: i, end: i + needle.length - 1, kind: pair[0], secret: /\b(hidden|secret)\b/.test(before) || /\b(hidden|secret) (door|way|passage|path|stair)/.test(low.slice(Math.max(0, i - 60), i)) });
i += needle.length - 1;
}
});
});
RETURN_WORDS.forEach(function (w) {
var needle = " " + w + " ", i = 0;
while ((i = low.indexOf(needle, i)) > -1) {
out.push({ at: i, end: i + needle.length - 1, kind: null });
i += needle.length - 1;
}
});
if (typeof CROSS_FALLBACK !== "undefined") {
var m = CROSS_FALLBACK.exec(low);
if (m && !out.length)
out.push({ at: m.index, end: m.index + m[0].length, kind: "elsewhere" });
}
out.sort(function (a, b) { return a.at - b.at || (b.end - b.at) - (a.end - a.at); });
var kept = [], last = -1;
out.forEach(function (s) { if (s.at > last) {
kept.push(s);
last = s.end;
} });
kept.forEach(function (s) { var w = low.slice(s.at, s.end); if (/mirror|looking glass/.test(w))
s.via = "mirror"; });
var merged = [];
kept.forEach(function (s) {
var p = merged[merged.length - 1];
if (p && p.kind && s.kind && s.at - p.end < 28) {
s.via = s.via || p.via;
s.secret = s.secret || p.secret;
s.at = p.at;
merged[merged.length - 1] = s;
}
else
merged.push(s);
});
return merged;
},
function () {
var el = document.getElementById("l-realms");
if (!el)
return;
var R = realms();
if (!R.length) {
el.innerHTML = '<p class="small-note">No other worlds yet. Dream your way into one &mdash; <i>"I went down into the underworld", "I found myself somewhere else"</i> &mdash; or cross straight into one here.</p>' +
(joined ? '' : '') + '<div class="l-realm"><span>Cross into\u2026</span><select id="l-cross"><option value="">choose a world</option>' +
Object.keys(REALMS).map(function (k) { return '<option value="' + k + '">' + esc(REALMS[k].name) + "</option>"; }).join("") + '</select></div>';
var c0 = document.getElementById("l-cross");
if (c0)
c0.onchange = function () {
var k = c0.value;
if (!k)
return;
enterRealm(k, false, null, null);
var r = realms()[realms().length - 1];
setStatus("<b>" + esc(REALMS[k].name) + ".</b> A way back stands where you came in.");
visitRealm(r ? r.id : 0);
closeLand();
save();
};
return;
}
var joined = (typeof joinedSomnucor === "function") && joinedSomnucor();
var chooser = !joined
? '<div class="l-realm"><span><b>Somnucor</b> &mdash; the shared city, if you want it. Joining is in Settings.</span></div>'
: '<div class="l-realm"><span><b>Somnucor</b> &mdash; the city at the middle of everything</span><button class="btn" id="l-hub">Go there</button></div>' +
(joined ? '<div class="l-realm"><span><b>Temple Row</b> &mdash; a house for every power the Atlas knows</span><button class="btn" id="l-row">Go there</button></div>' : '') +
(joined ? '<div class="l-realm"><span><b>The Hall of Doors</b> &mdash; a door for every world, and for every dreamer</span><button class="btn" id="l-hall">Go there</button></div>' : '') +
'<div class="l-realm"><span>Cross into\u2026</span><select id="l-cross">' +
'<option value="">choose a world</option>' +
Object.keys(REALMS).map(function (k) { return '<option value="' + k + '">' + esc(REALMS[k].name) + "</option>"; }).join("") +
'</select></div>';
el.innerHTML = chooser + R.map(function (r) {
return '<div class="l-realm"><span>' + esc(r.name) + '</span><button class="btn" data-visit="' + r.id + '">Go there</button></div>';
}).join("") + '<div class="l-realm"><span>The town</span><button class="btn" data-visit="0">Go there</button></div>';
var rowBtn = document.getElementById("l-row");
if (rowBtn)
rowBtn.onclick = function () { closeLand(); landWalk(); if (typeof toTempleRow === "function")
toTempleRow(); };
var hallBtn = document.getElementById("l-hall");
if (hallBtn)
hallBtn.onclick = function () { closeLand(); landWalk(); if (typeof toHall === "function")
toHall(); if (typeof openHall === "function")
openHall(); };
var hubBtn = document.getElementById("l-hub");
if (hubBtn)
hubBtn.onclick = function () { closeLand(); landWalk(); toSomnucor(); };
var cross = document.getElementById("l-cross");
if (cross)
cross.onchange = function () {
var k = cross.value;
if (!k)
return;
enterRealm(k, false, null, null);
var r = realms()[realms().length - 1];
setStatus("<b>" + esc(REALMS[k].name) + ".</b> A way back stands where you came in.");
visitRealm(r ? r.id : 0);
closeLand();
landWalk();
save();
};
Array.prototype.forEach.call(el.querySelectorAll("[data-visit]"), function (b) {
b.onclick = function () { visitRealm(+b.getAttribute("data-visit")); closeLand(); landWalk(); };
});
}
];
});
