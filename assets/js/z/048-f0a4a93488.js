/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(48, function () {
"use strict";
return [
function (x, z, lane) {
lane = lane || DRIVE_LANE;
var sx = streetLine(x), sz = streetLine(z), dx = Math.abs(x - sx), dz = Math.abs(z - sz);
if (dx <= dz) {
var sd = x >= sx ? 1 : -1;
return { x: sx + sd * lane, z: z, rot: sd > 0 ? Math.PI : 0, street: "x", line: sx };
}
var sz2 = z >= sz ? 1 : -1;
return { x: x, z: sz + sz2 * lane, rot: sz2 > 0 ? -Math.PI / 2 : Math.PI / 2, street: "z", line: sz };
},
function (house) {
var d = KIT[house.archetype] || KIT.house, a = house.attrs || {}, s = a.s || 1;
var hw = d.size[0] * s * (a.w || 1) / 2, hd = d.size[2] * s * (a.d || 1) / 2, F = frontOf(house);
var kerb = Math.max(hd + 1, kerbDistance(house)), side = hw + 2.3, back = -hd + 1;
var len = kerb - back, mid = (kerb + back) / 2;
return { x: house.x + F.sx * side + F.fx * mid, z: house.z + F.sz * side + F.fz * mid, rot: house.rot || 0, len: len,
park: { x: house.x + F.sx * side + F.fx * (hd - 1.5), z: house.z + F.sz * side + F.fz * (hd - 1.5), rot: house.rot || 0 } };
},
function (house) {
if (house.driveway && specById(house.driveway))
return specById(house.driveway);
var D = drivewayOf(house);
var dw = { id: uid(), archetype: "driveway", label: "driveway", attrs: { d: D.len / 10 }, x: D.x, z: D.z, rot: D.rot, solid: false, detail: 1,
nights: [store.session], addr: house.addr || null, name: null, of: house.id };
if (house.realm)
dw.realm = house.realm;
store.objects.push(dw);
addMesh(dw);
house.driveway = dw.id;
return dw;
},
function (arch) {
var home = dwellingForVehicle();
if (home && arch !== "bus") {
ensureDriveway(home);
var P = drivewayOf(home).park;
return { x: P.x, z: P.z, rot: P.rot, addr: home.addr, home: home.id };
}
var g = store.grid, base = lotSpot(g.bx, g.bz, Math.max(0, g.lot - 1));
var F = frontOf(base), t = kerbDistance(base) + STREET / 2;
var along = (Math.random() - .5) * 12;
var p = { x: base.x + F.fx * t + F.sx * along, z: base.z + F.fz * t + F.sz * along };
var R = roadSpot(p.x, p.z, KERB_LANE);
var toward = Math.sign((R.street === "x" ? base.x - R.line : base.z - R.line)) || 1;
if (R.street === "x")
R.x = R.line + toward * KERB_LANE;
else
R.z = R.line + toward * KERB_LANE;
R.addr = addressOf(g.bx, g.bz, Math.max(0, g.lot - 1));
return R;
},
function (spec) {
if (!ROADGOING[spec.archetype])
return;
var best = null, bd = 14 * 14;
store.objects.forEach(function (o) {
if (!DRIVEWAYED[o.archetype] || (o.realm || 0) !== (spec.realm || 0))
return;
var P = drivewayOf(o).park, d = (P.x - spec.x) * (P.x - spec.x) + (P.z - spec.z) * (P.z - spec.z);
if (d < bd) {
bd = d;
best = o;
}
});
if (best) {
ensureDriveway(best);
var P = drivewayOf(best).park;
spec.x = P.x;
spec.z = P.z;
spec.rot = P.rot;
best.parked = spec.id;
}
else {
var R = roadSpot(spec.x, spec.z, KERB_LANE);
spec.x = R.x;
spec.z = R.z;
spec.rot = R.rot;
}
var g = meshes[spec.id];
if (g) {
g.position.x = spec.x;
g.position.z = spec.z;
g.rotation.y = spec.rot;
}
},
function (ax, az, bx, bz) {
var a = roadSpot(ax, az), b = roadSpot(bx, bz);
if (a.street === b.street && Math.abs(a.line - b.line) < 1)
return [b];
if (a.street === "x" && b.street === "z")
return [{ x: a.x, z: b.z }, b];
if (a.street === "z" && b.street === "x")
return [{ x: b.x, z: a.z }, b];
if (a.street === "x") {
var hz = streetLine(a.z) + DRIVE_LANE;
return [{ x: a.x, z: hz }, { x: b.x, z: hz }, b];
}
var vx = streetLine(a.x) + DRIVE_LANE;
return [{ x: vx, z: a.z }, { x: vx, z: b.z }, b];
}
];
});
