/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(106, function () {
"use strict";
return [
function () {
var a = [], fl = INT.floor || 3.5;
INT.root.children.forEach(function (c) {
var k = c.userData && c.userData.furn;
if (!k || !(TEMP_FRONT.test(k) || TEMP_WORK.test(k)))
return;
var y = c.position.y, lv = Math.max(0, Math.round(y / fl));
if (Math.abs(y - lv * fl) > 1)
return;
a.push(c);
c.userData.twLevel = lv;
});
return a.sort(function (x, y) { return (TEMP_FRONT.test(y.userData.furn) ? 1 : 0) - (TEMP_FRONT.test(x.userData.furn) ? 1 : 0); });
},
function (want) {
var st = tempStations(), used = {}, plan = {}, fl = INT.floor || 3.5, spots = (INT.spots || []).slice(), spotUsed = {};
function standAt(f) {
var k = f.userData.furn, front = TEMP_FRONT.test(k), r = f.rotation.y || 0, fx = Math.sin(r), fz = Math.cos(r), d = front ? -0.95 : 0.95;
if (k === "blackboard") {
d = 1.4;
}
if (k === "hospitalbed") {
return { x: f.position.x + Math.cos(r) * 0.95, z: f.position.z - Math.sin(r) * 0.95, y: (f.userData.twLevel || 0) * fl, ry: r - Math.PI / 2 };
}
return { x: f.position.x + fx * d, z: f.position.z + fz * d, y: (f.userData.twLevel || 0) * fl, ry: front ? r : r + Math.PI };
}
function take(re) { for (var i = 0; i < st.length; i++) {
if (used[i])
continue;
if (re.test(st[i].userData.furn)) {
used[i] = 1;
return standAt(st[i]);
}
} return null; }
var reuse = 0;
function spot() {
for (var i = 0; i < spots.length; i++) {
if (spotUsed[i])
continue;
spotUsed[i] = 1;
var q = spots[i];
return { x: q.x, z: q.z, y: (q.level || 0) * fl, ry: (i * 1.7) % 6.28 };
}
if (!spots.length)
return null;
var k = reuse++, q2 = spots[k % spots.length], a = k * 2.4, r = 1.6 + Math.floor(k / spots.length) * 0.9;
return { x: q2.x + Math.cos(a) * r, z: q2.z + Math.sin(a) * r, y: (q2.level || 0) * fl, ry: a };
}
var order = want.slice().sort(function (a, b) { return (TEMP_PATROL.test(a.post.title) ? 1 : 0) - (TEMP_PATROL.test(b.post.title) ? 1 : 0); });
order.forEach(function (t, i) {
var ti = String(t.post.title || ""), p = null;
if (TEMP_PATROL.test(ti)) {
p = spot();
if (p)
p.patrol = true;
}
for (var j = 0; j < TEMP_PREFER.length && !p; j++)
if (TEMP_PREFER[j][0].test(ti))
p = take(TEMP_PREFER[j][1]);
if (!p)
p = take(TEMP_FRONT) || take(TEMP_WORK) || spot();
if (p && !p.patrol && p.x !== undefined) {
Object.keys(plan).forEach(function (id) { var q = plan[id]; if (q.y === p.y && Math.hypot(q.x - p.x, q.z - p.z) < 0.7) {
p.x += 0.8 * Math.cos(i * 2.4);
p.z += 0.8 * Math.sin(i * 2.4);
} });
}
if (!p) {
var sp = (INT.spots || [])[0] || { x: 0, z: 0 };
p = { x: sp.x + (i % 2 ? 1.2 : -1.2) * Math.ceil((i + 1) / 2), z: sp.z - 0.8, y: 0, ry: 0 };
}
plan[t.id] = p;
});
return plan;
},
function () {
if (!INT || !INT.spec || INT.temple)
return;
var key = INT.spec.workplace || INT.wpKey;
if (!key)
return;
if (key === "The Courthouse" && typeof courtCastSync === "function")
return;
INT.tw = INT.tw || {};
var want = TEMPS.list.filter(function (t) { return t.post.workplace === key && t.mode !== "fly" && tempOnShift(t); });
var ids = {};
want.forEach(function (t) { ids[t.id] = 1; });
Object.keys(INT.tw).forEach(function (id) { if (!ids[id]) {
INT.root.remove(INT.tw[id]);
delete INT.tw[id];
} });
var fresh = want.filter(function (t) { return !INT.tw[t.id]; });
if (!fresh.length)
return;
var plan = INT.twPlan && INT.twPlanN === want.length ? INT.twPlan : (INT.twPlan = tempPostPlan(want));
INT.twPlanN = want.length;
fresh.forEach(function (t) {
var p = plan[t.id] || tempPostPlan([t])[t.id];
var L = tempLook(t);
if (typeof jobDress === "function")
try {
jobDress(L, t.post.title, key);
}
catch (e) { }
var g = buildFigure({ id: "__twin_" + t.id, archetype: "human", attrs: {}, look: L, solid: false, detail: 3, nights: [], city: true }, 1);
g.position.set(p.x, p.y || 0, p.z);
g.rotation.y = p.ry || 0;
var lm = g.userData.limbs;
if (lm && !p.patrol) {
if (lm.la)
lm.la.rotation.x = -0.7;
if (lm.ra)
lm.ra.rotation.x = -0.5;
}
if (p.patrol)
g.userData.twPatrol = { home: { x: p.x, z: p.z }, y: p.y || 0, ph: (t.seed % 100) / 10, to: null, wait: 2 };
var tag = makeTag(t.name + " · " + t.post.title, false);
tag.position.y = 2.15;
g.add(tag);
g.traverse(function (m) { m.raycast = function () { }; });
INT.root.add(g);
INT.tw[t.id] = g;
});
}
];
});
