/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(200, function () {
"use strict";
return [
function (raid) {
if (raid._route)
return raid._route;
var rnd = nhRng(raid.seed), ac = 0.19 + (raid.sector - 0.5) * Math.PI / 4, pts = [];
function at(r, a) { return { x: ATLC.x + Math.cos(a) * r, z: ATLC.z + Math.sin(a) * r }; }
var W = atlRing("wilds");
pts.push(at(W.S + ATL_STAIR_RUN + 40, ac));
["harvest", "warrens", "commons"].forEach(function (k, ri) {
var R = atlRing(k);
if (!R)
return;
pts.push(at(R.E - 6, ac));
var n = ri === 2 ? 6 : 3;
for (var i = 0; i < n; i++)
pts.push(at(R.S + 14 + rnd() * (R.E - R.S - 28), ac + (rnd() - 0.5) * 0.62));
pts.push(at(R.S + 8, ac));
});
var segs = [], t = 0, sp = 1.25;
for (var i = 1; i < pts.length; i++) {
var d = Math.hypot(pts[i].x - pts[i - 1].x, pts[i].z - pts[i - 1].z);
segs.push({ a: pts[i - 1], b: pts[i], t0: t, t1: t + d / sp });
t += d / sp;
}
raid._route = { segs: segs, total: t };
return raid._route;
},
function (raid, age) {
var R = nhRoute(raid), t = age == null ? nhRaidAge(raid) : age, s = R.segs;
if (!s.length)
return null;
if (t >= R.total) {
var lo = Math.max(0, s.length - 7), span = Math.max(1, s[s.length - 1].t1 - s[lo].t0), u = (t - R.total) % (2 * span);
t = s[lo].t0 + (u < span ? span - u : u - span);
}
for (var i = 0; i < s.length; i++)
if (t <= s[i].t1) {
var f = (t - s[i].t0) / Math.max(0.001, s[i].t1 - s[i].t0);
return { x: s[i].a.x + (s[i].b.x - s[i].a.x) * f, z: s[i].a.z + (s[i].b.z - s[i].a.z) * f };
}
return { x: s[s.length - 1].b.x, z: s[s.length - 1].b.z };
},
function (force) {
if (!(typeof signedIn === "function" && signedIn()) || NH.missing)
return Promise.resolve(null);
if (!force && NH.trophies && Date.now() - NH.tAt < 60000)
return Promise.resolve(NH.trophies);
NH.tAt = Date.now();
return cityRpc("my_trophies", {}).then(function (d) { NH.trophies = d; nhPaint(); return d; }).catch(function (e) { NH.msg = nhErr(e); return null; });
},
function (raid) {
var p = nhReportPos(raid);
if (!p || typeof scene === "undefined")
return;
if (!NH.beacon) {
var m = new THREE.MeshBasicMaterial({ color: 0xE8A060, transparent: true, opacity: 0.28, depthWrite: false });
NH.beacon = new THREE.Mesh(new THREE.CylinderGeometry(2.2, 2.2, 90, 16, 1, true), m);
NH.beacon.userData.solid = false;
var ring = new THREE.Mesh(new THREE.RingGeometry(52, 55, 48), new THREE.MeshBasicMaterial({ color: 0xE8A060, transparent: true, opacity: 0.35, side: THREE.DoubleSide, depthWrite: false }));
ring.rotation.x = -Math.PI / 2;
ring.position.y = -44.6;
NH.beacon.add(ring);
}
var y = typeof terrainY === "function" ? terrainY(p.x, p.z) : 0;
NH.beacon.position.set(p.x, y + 45, p.z);
NH.beacon.userData.raid = raid.id;
NH.beacon.userData.until = Date.now() + 180000;
if (!NH.beacon.parent)
scene.add(NH.beacon);
NH.open = false;
nhPaint();
setStatus("<b>Last seen near the light</b> in sector " + raid.sector + ", " + esc(nhRingName(p.x, p.z)) + " — it has moved on since. Search within the ring of light and beyond it.");
}
];
});
