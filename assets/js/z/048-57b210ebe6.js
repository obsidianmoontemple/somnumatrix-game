/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(48, function () {
"use strict";
return [
function (text, role, shift) {
if (!text && !shift)
return null;
var low = " " + String(text || "").toLowerCase() + " ";
var win = null, act = null;
for (var i = 0; i < TIMEWORD.length; i++)
if (low.indexOf(" " + TIMEWORD[i][0] + " ") > -1) {
win = TIMEWORD[i][1];
break;
}
for (var j = 0; j < ACTWORD.length; j++)
if (low.indexOf(" " + ACTWORD[j][0] + " ") > -1) {
act = ACTWORD[j][1];
break;
}
if (shift === "night") {
win = [21, 6];
if (act !== "home")
act = "work";
}
else if (shift === "day") {
if (!win)
win = [8.5, 17.5];
if (act !== "home")
act = "work";
}
if (!win && !act)
return null;
if (!win)
win = [8.5, 17.5];
if (!act)
act = role ? "work" : "out";
if (role && act === "out" && !shift)
act = "work";
var a = win[0], b = win[1], verb = act === "work" ? "at work" : act === "home" ? "at home" : act === "roam" ? "abroad" : "out";
var rest = act === "home" ? "out" : "home";
var restVerb = rest === "home" ? "at home" : "out";
var r = [];
if (b > a) {
if (a > 0)
r.push([0, a, rest, restVerb]);
r.push([a, b, act, verb]);
if (b < 24)
r.push([b, 24, rest, restVerb]);
}
else {
r.push([0, b, act, verb]);
r.push([b, a, rest, restVerb]);
r.push([a, 24, act, verb]);
}
return r;
},
function (keepId, dropId) {
var keep = null, drop = null;
store.characters.forEach(function (c) {
if (c.id === keepId)
keep = c;
if (c.id === dropId)
drop = c;
});
if (!keep || !drop || keep === drop)
return false;
drop.aka.forEach(function (a) { if (keep.aka.indexOf(a) === -1)
keep.aka.push(a); });
if (drop.name && keep.aka.indexOf(normName(drop.name)) === -1)
keep.aka.push(normName(drop.name));
drop.details.forEach(function (d) { addDetail(keep, d); });
drop.sessions.forEach(function (n) { if (keep.sessions.indexOf(n) === -1)
keep.sessions.push(n); });
keep.sessions.sort(function (a, b) { return a - b; });
keep.log = (drop.log || []).concat(keep.log || []);
if (drop.born && (!keep.born || drop.born < keep.born))
keep.born = drop.born;
["home", "work", "routine", "role", "shift"].forEach(function (k) {
var ks = (keep.src && keep.src[k]) || null, ds = (drop.src && drop.src[k]) || null;
var rank = { stated: 3, parsed: 2, filled: 1 };
if (drop[k] && (!keep[k] || (rank[ds] || 0) > (rank[ks] || 0))) {
keep[k] = drop[k];
if (!keep.src)
keep.src = {};
keep.src[k] = ds;
}
});
var dropSpec = drop.objId ? specById(drop.objId) : null;
var keepSpec = keep.objId ? specById(keep.objId) : null;
if (dropSpec) {
if (keepSpec && keepSpec.id !== dropSpec.id) {
if (meshes[keepSpec.id]) {
scene.remove(meshes[keepSpec.id]);
delete meshes[keepSpec.id];
}
var ki = store.objects.indexOf(keepSpec);
if (ki > -1)
store.objects.splice(ki, 1);
}
dropSpec.charId = keep.id;
dropSpec.label = keep.name;
keep.objId = dropSpec.id;
keep.x = dropSpec.x;
keep.z = dropSpec.z;
keep.anchor = { x: dropSpec.x, z: dropSpec.z };
refresh(dropSpec);
}
var di = store.characters.indexOf(drop);
if (di > -1)
store.characters.splice(di, 1);
checkWake(keep);
save();
tickClock(true);
updateCount();
return true;
},
function (c) {
if (!c.src)
c.src = {};
var h = nearestOf(c.anchor.x, c.anchor.z, RESIDENTIAL);
if (h && !c.home) {
c.home = h.id;
c.src.home = "filled";
}
var w = nearestOf(c.anchor.x, c.anchor.z, WORKPLACE);
if (w && !c.work) {
c.work = w.id;
c.src.work = "filled";
}
if (!c.routine) {
c.routine = (ROUTINE[c.archetype] || ROUTINE.human).slice();
c.src.routine = "filled";
}
save();
tickClock(true);
}
];
});
