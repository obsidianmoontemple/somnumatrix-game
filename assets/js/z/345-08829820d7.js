/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(345, function () {
"use strict";
return [
function (home) {
if (xpKeeper())
return true;
var m = /^lot:(\d+)$/.exec(home || "");
if (m) {
var id = +m[1];
return !!(typeof standing !== "undefined" && standing && (standing.lots || []).some(function (l) { return +l.lot_id === id; }));
}
m = /^eyrie:(\d+)$/.exec(home || "");
if (m)
return !!(typeof CORP !== "undefined" && CORP && CORP.data && +CORP.data.apartment === +m[1]);
m = /^dream:([^:]+):/.exec(home || "");
return !!(m && m[1] === xpUid());
},
function (id) {
id = +id;
var n = null;
try {
(typeof cityLots !== "undefined" && cityLots || []).forEach(function (l) { if (!n && +l.lot_id === id)
n = l.name; });
}
catch (e) { }
try {
(typeof WHM !== "undefined" && WHM.rows || []).forEach(function (l) { if (!n && +l.id === id)
n = l.name; });
}
catch (e) { }
try {
(typeof standing !== "undefined" && standing && standing.lots || []).forEach(function (l) { if (!n && +l.lot_id === id)
n = l.lot; });
}
catch (e) { }
try {
(XP.mine || []).forEach(function (h) { if (!n && h.home === "lot:" + id)
n = h.name; });
}
catch (e) { }
return n;
},
function (spec) {
try {
if (!spec || spec.xpAnnex || typeof HW_HOMES === "undefined" || !HW_HOMES[spec.archetype] || spec.archetype === "xpannex")
return false;
if (spec.eyrie || (typeof WLD !== "undefined" && WLD && WLD.on))
return false;
if (typeof inSomnucorRealm === "function" && inSomnucorRealm())
return false;
if (typeof amVisiting === "function" && amVisiting())
return false;
if (typeof hlPlotOf === "function" && hlPlotOf(spec))
return false;
var wk = typeof workplaceKeyOf === "function" ? workplaceKeyOf(spec) : null;
return !(wk && !/^lot:/.test(wk));
}
catch (e) {
return false;
}
},
function () {
if (XP_DOOR_TEX)
return XP_DOOR_TEX;
var c = document.createElement("canvas");
c.width = 256;
c.height = 64;
var x = c.getContext("2d");
x.fillStyle = "#B8964E";
x.fillRect(0, 0, 256, 64);
x.strokeStyle = "#6E5426";
x.lineWidth = 6;
x.strokeRect(4, 4, 248, 56);
x.fillStyle = "#2A1E0E";
x.font = "600 26px Georgia,serif";
x.textAlign = "center";
x.textBaseline = "middle";
x.fillText("Your new rooms", 128, 34);
XP_DOOR_TEX = new THREE.CanvasTexture(c);
return XP_DOOR_TEX;
},
function () {
var g = new THREE.Group();
g.name = "xp-door";
g.userData.xpDoor = 1;
var frame = new THREE.MeshStandardMaterial({ color: 0x4A3020, roughness: 0.6, metalness: 0.05 });
var wood = new THREE.MeshStandardMaterial({ color: 0x8A5A34, roughness: 0.55, metalness: 0.05 });
var inset = new THREE.MeshStandardMaterial({ color: 0x7A4C2A, roughness: 0.6, metalness: 0.05 });
var brass = new THREE.MeshStandardMaterial({ color: 0xC8A050, roughness: 0.3, metalness: 0.85 });
function bx(w, h, d, m, x, y, z) { var o = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m); o.position.set(x, y, z); g.add(o); return o; }
bx(0.1, 2.25, 0.1, frame, -0.55, 1.125, 0.05);
bx(0.1, 2.25, 0.1, frame, 0.55, 1.125, 0.05);
bx(1.2, 0.12, 0.1, frame, 0, 2.25, 0.05);
bx(1.0, 2.16, 0.05, wood, 0, 1.08, 0.04);
bx(0.36, 0.78, 0.02, inset, -0.22, 1.55, 0.07);
bx(0.36, 0.78, 0.02, inset, 0.22, 1.55, 0.07);
bx(0.36, 0.62, 0.02, inset, -0.22, 0.55, 0.07);
bx(0.36, 0.62, 0.02, inset, 0.22, 0.55, 0.07);
var knob = new THREE.Mesh(new THREE.SphereGeometry(0.035, 12, 10), brass);
knob.position.set(0.38, 1.02, 0.1);
g.add(knob);
var pl = new THREE.Mesh(new THREE.PlaneGeometry(0.56, 0.14), new THREE.MeshBasicMaterial({ map: xpPlaqueTex() }));
pl.position.set(0, 2.02, 0.072);
g.add(pl);
return g;
},
function (I, L, B, ax, az) {
var F = I.floor || 4, y0 = L * F, ox = I.ox || 0, oz = I.oz || 0;
var walls = (I.walls || []).filter(function (w) { return (w.level || 0) === L && !w.rot; });
var furn = [], wins = [];
I.root.children.forEach(function (c) {
var u = c.userData || {};
if (u.xpDoor) {
furn.push({ x: c.position.x, z: c.position.z, soft: false });
return;
}
if (u.furn) {
if (Math.abs(c.position.y - y0) > 1.2)
return;
if (/rug|carpet|runner|playmat|gymmat/i.test(u.furn))
return;
furn.push({ x: c.position.x, z: c.position.z, soft: !(typeof SOLIDFURN !== "undefined" && SOLIDFURN[u.furn]) });
return;
}
if (c.isMesh && I.winMats && I.winMats.indexOf(c.material) >= 0 && Math.abs(c.position.y - y0 - 1.8) < 1.6)
wins.push({ x: c.position.x, z: c.position.z });
});
var blocks = [];
(I.stairs || []).forEach(function (s) { if (s.from === L || s.from === L - 1)
blocks.push({ x: s.x - ox, z: s.z - oz, hw: s.hw + 0.7, hd: s.hd + 1.2 }); });
(I.lifts || []).forEach(function (l) { blocks.push({ x: l.x - ox, z: l.z - oz, hw: 2.2, hd: 2.2 }); });
var ex = (L === 0 && I.exit) ? { x: I.exit.x - ox, z: I.exit.z - oz } : null;
function wallAt(x, z) {
var X = x + ox, Z = z + oz;
for (var i = 0; i < walls.length; i++) {
var w = walls[i];
if (w.h && w.h < 2.2)
continue;
if (Math.abs(X - w.x) <= w.hw + 0.03 && Math.abs(Z - w.z) <= w.hd + 0.03)
return true;
}
return false;
}
function overlap(cx, cz, hx, hz, b) { return Math.abs(cx - b.x) < hx + b.hw && Math.abs(cz - b.z) < hz + b.hd; }
var edges = [
{ a: "x", at: B.z1, lo: B.x0, hi: B.x1, nx: 0, nz: -1 }, { a: "x", at: B.z0, lo: B.x0, hi: B.x1, nx: 0, nz: 1 },
{ a: "z", at: B.x0, lo: B.z0, hi: B.z1, nx: 1, nz: 0 }, { a: "z", at: B.x1, lo: B.z0, hi: B.z1, nx: -1, nz: 0 }
];
var cands = [];
edges.forEach(function (e, ei) {
for (var t = e.lo + 0.95; t <= e.hi - 0.95; t += 0.5) {
var px = e.a === "x" ? t : e.at, pz = e.a === "x" ? e.at : t;
var d = (ax == null) ? ei * 100 + Math.abs(t - (e.lo + e.hi) / 2) : Math.hypot(px - ax, pz - az);
cands.push({ x: px, z: pz, nx: e.nx, nz: e.nz, d: d });
}
});
cands.sort(function (p, q) { return p.d - q.d; });
function ok(c, strict) {
var tx = Math.abs(c.nz), tz = Math.abs(c.nx);
if (!wallAt(c.x, c.z) || !wallAt(c.x + tx * 0.45, c.z + tz * 0.45) || !wallAt(c.x - tx * 0.45, c.z - tz * 0.45))
return false;
if (ex && Math.hypot(c.x - ex.x, c.z - ex.z) < 1.75)
return false;
var cx = c.x + c.nx * 0.97, cz = c.z + c.nz * 0.97, hx = tx * 0.75 + tz * 0.85, hz = tz * 0.75 + tx * 0.85;
for (var i = 0; i < walls.length; i++) {
var w = walls[i];
if (overlap(cx, cz, hx, hz, { x: w.x - ox, z: w.z - oz, hw: w.hw, hd: w.hd }))
return false;
}
for (var b = 0; b < blocks.length; b++)
if (overlap(cx, cz, hx, hz, blocks[b]))
return false;
for (var f = 0; f < furn.length; f++) {
if (!strict && furn[f].soft)
continue;
if (overlap(cx, cz, hx + 0.35, hz + 0.35, { x: furn[f].x, z: furn[f].z, hw: 0, hd: 0 }))
return false;
}
if (strict)
for (var k = 0; k < wins.length; k++)
if (Math.abs((wins[k].x - c.x) * tx + (wins[k].z - c.z) * tz) < 1.5 && Math.abs((wins[k].x - c.x) * c.nx + (wins[k].z - c.z) * c.nz) < 0.6)
return false;
return true;
}
for (var pass = 0; pass < 2; pass++)
for (var i = 0; i < cands.length; i++)
if (ok(cands[i], pass === 0)) {
var c = cands[i];
return { x: c.x + c.nx * 0.11, z: c.z + c.nz * 0.11, rot: Math.atan2(c.nx, c.nz) };
}
return null;
},
function (I) {
if (!I || !I.root || !I.spec || I.spec.xpAnnex)
return;
var want = [];
if (I.spec.eyrie && typeof eyrieSlot === "function" && typeof eydRoom === "function") {
Object.keys(XP.rows).forEach(function (h) {
var m = /^eyrie:(\d+)$/.exec(h);
if (!m || !xpHas(h))
return;
var S = eyrieSlot(+m[1]);
if (!S || S.f >= (I.levels || 1))
return;
want.push({ home: h, L: S.f, B: eydRoom(S.side, I.W, I.D), ax: null, az: null });
});
}
else {
var h = xpHomeOfSpec(I.spec, I);
if (h && xpHas(h))
want.push({ home: h, L: 0, B: { x0: -I.W / 2, x1: I.W / 2, z0: -I.D / 2, z1: I.D / 2 }, ax: 1.8, az: I.D / 2 });
}
I.xpDoors = (I.xpDoors || []).filter(function (d) {
var keep = want.some(function (w) { return w.home === d.home; });
if (!keep && d.mesh && d.mesh.parent)
d.mesh.parent.remove(d.mesh);
return keep;
});
want.forEach(function (w) {
if (I.xpDoors.some(function (d) { return d.home === w.home; }))
return;
var s = xpSpot(I, w.L, w.B, w.ax, w.az);
if (!s)
return;
var m = xpDoorMesh();
m.position.set(s.x, w.L * (I.floor || 4), s.z);
m.rotation.y = s.rot;
I.root.add(m);
I.xpDoors.push({ home: w.home, L: w.L, x: s.x, z: s.z, rot: s.rot, mesh: m });
});
},
function (h) {
var id = null;
try {
(typeof WHM !== "undefined" && WHM.rows || []).forEach(function (r) { if (id == null && r.name === h.name)
id = r.id; });
}
catch (e) { }
try {
(typeof WR !== "undefined" && WR.board || []).forEach(function (r) { if (id == null && r.name === h.name)
id = r.id; });
}
catch (e) { }
try {
(typeof standing !== "undefined" && standing && standing.lots || []).forEach(function (l) { if (id == null && l.lot === h.name && l.lot_id != null)
id = l.lot_id; });
}
catch (e) { }
try {
(XP.mine || []).forEach(function (m) { if (id == null && m.name === h.name && /^lot:\d+$/.test(m.home))
id = +m.home.slice(4); });
}
catch (e) { }
return id;
},
function (key) {
var P = typeof WH_PLAN !== "undefined" && WH_PLAN[key], S = P && typeof WH_STYLE !== "undefined" && WH_STYLE[P.style];
if (!S)
return null;
if (P.style === "dome") {
var a = 1.5 / 14 * Math.PI * 2, r = (S.r || 5) - 0.16;
return { x: Math.sin(a) * r, z: Math.cos(a) * r, rot: a + Math.PI };
}
var x = Math.min(S.w / 2 - 1.2, 0.9 + 1.3);
if (x < 1.45)
x = 1.45;
return { x: x, z: S.d / 2 - 0.12, rot: Math.PI };
},
function () {
var key = xpWorldKey(), L = key && typeof WHM !== "undefined" && WHM.homes && WHM.homes[key];
if (!L)
return;
L.forEach(function (h) {
if (!h || !h.g)
return;
var id = xpCabinLot(h), home = id != null ? "lot:" + id : null, want = home && xpHas(home);
if (h.xpDoor && (!want || h.xpDoor.home !== home)) {
if (h.xpDoor.mesh.parent)
h.xpDoor.mesh.parent.remove(h.xpDoor.mesh);
h.xpDoor = null;
}
if (want && !h.xpDoor) {
var s = xpCabinSpot(key);
if (!s)
return;
var m = xpDoorMesh();
m.position.set(s.x, 0.06, s.z);
m.rotation.y = s.rot;
h.g.add(m);
h.xpDoor = { home: home, x: s.x, z: s.z, rot: s.rot, mesh: m };
}
});
},
function () {
var P = camera.position, lx = P.x - INT.ox, lz = P.z - INT.oz, lv = INT.level || 0, best = null;
INT.xpDoors.forEach(function (d) {
if (d.L !== lv)
return;
var nx = Math.sin(d.rot), nz = Math.cos(d.rot), ahead = (lx - d.x) * nx + (lz - d.z) * nz, side = Math.abs((lx - d.x) * nz - (lz - d.z) * nx);
if (ahead > 0.1 && ahead < 2.1 && side < 0.95)
best = d;
});
if (!best)
return null;
return { kind: "int", home: best.home, door: best, name: xpHomeName(best.home), mine: xpHolds(best.home) };
},
function () {
var key = xpWorldKey(), L = key && WHM.homes && WHM.homes[key];
if (!L)
return null;
var P = camera.position, lx = P.x - xpBase(), lz = P.z, best = null;
L.forEach(function (h) {
var d = h && h.xpDoor;
if (!d)
return;
if (Math.abs(P.y - 1.72 - h.floor) > 1.6)
return;
var dx = lx - h.x, dz = lz - h.z, c = Math.cos(h.rot), s = Math.sin(h.rot), hx = dx * c - dz * s, hz = dx * s + dz * c;
var nx = Math.sin(d.rot), nz = Math.cos(d.rot), ahead = (hx - d.x) * nx + (hz - d.z) * nz, side = Math.abs((hx - d.x) * nz - (hz - d.z) * nx);
if (ahead > 0.1 && ahead < 1.9 && side < 0.9)
best = { h: h, d: d };
});
if (!best)
return null;
return { kind: "world", home: best.d.home, house: best.h, door: best.d, name: best.h.name, mine: xpHolds(best.d.home) };
},
function (home, o) {
var rooms = xpRooms(home);
var s = XP.specs[home] || (XP.specs[home] = { id: "xp|" + home, archetype: "xpannex", attrs: { s: 0.01, lv: 1 }, inside: {}, xpAnnex: {} });
s.attrs.lv = Math.max(1, Math.min(4, Math.ceil(rooms.length / 10)));
s.label = o.name || "your home";
s.xpAnnex = { home: home, rooms: rooms, full: !!o.full, grand: !!o.grand, wall: o.wall != null ? o.wall : 0xE6DCC8, floor: o.floor || "wood", look: o.look || null, name: o.name || "your home", where: o.where || null };
return s;
},
function (spec) {
var o = { full: false, grand: false, wall: 0xE6DCC8, floor: "wood", look: null };
if (!spec)
return o;
try {
var pl = planOf(spec);
if (pl) {
if (pl.wall != null)
o.wall = pl.wall;
if (pl.floor)
o.floor = pl.floor;
}
}
catch (e) { }
try {
var I = spec.inside || {};
if (I.wall != null)
o.wall = I.wall;
if (I.floor)
o.floor = I.floor;
}
catch (e) { }
try {
var plot = (typeof hlPlotOf === "function") ? hlPlotOf(spec) : null, q = String((plot && plot.quarter) || "") + " " + ((plot && plot.street) || "") + " " + ((plot && plot.name) || "");
var great = !!plot && /Northgate|Employee & Backer|Crescent|Backers/i.test(q);
if (great || spec.archetype === "palace" || spec.archetype === "castle" && plot) {
o.full = true;
o.grand = true;
}
else if (!plot && !spec.eyrie && xpDreamSpec(spec)) {
o.full = true;
o.grand = spec.archetype === "manor" || spec.archetype === "hacienda" || spec.archetype === "palace";
}
}
catch (e) { }
try {
o.look = (typeof rsyKeyOf === "function") ? rsyKeyOf(spec) : null;
}
catch (e) { }
return o;
},
function (n) {
if (!n || !xpHas(n.home) || XP.back)
return;
if (typeof walkMode !== "undefined" && !walkMode)
return;
var o, back;
if (n.kind === "int") {
var d = n.door, nx = Math.sin(d.rot), nz = Math.cos(d.rot), lv = INT.level || 0;
o = xpParentLook(INT.spec);
o.where = (typeof fnHomeWhere === "function") ? fnHomeWhere() : null;
if (/^eyrie:/.test(n.home)) {
o.full = false;
o.grand = false;
}
back = { kind: "int", I: INT, level: lv, x: INT.ox + d.x + nx * 1.25, z: INT.oz + d.z + nz * 1.25, y: 1.72 + lv * (INT.floor || 4), yaw: Math.atan2(-nx, -nz) };
}
else {
var h = n.house, dd = n.door, c = Math.cos(h.rot), s = Math.sin(h.rot), qx = dd.x + Math.sin(dd.rot) * 1.2, qz = dd.z + Math.cos(dd.rot) * 1.2;
var wnx = Math.sin(dd.rot) * c + Math.cos(dd.rot) * s, wnz = -Math.sin(dd.rot) * s + Math.cos(dd.rot) * c;
o = { full: false, grand: false, wall: 0xE6DCC8, floor: "wood", look: null, where: xpHolds(n.home) ? "home" : null };
back = { kind: "world", x: xpBase() + h.x + qx * c + qz * s, z: h.z - qx * s + qz * c, y: h.floor + 0.06 + 1.72, yaw: Math.atan2(-wnx, -wnz) };
}
o.name = n.name;
var spec = xpSpec(n.home, o);
if (back.kind === "int")
scene.remove(INT.root);
var A;
try {
A = makeInterior(spec);
}
catch (e) {
if (window.console)
console.warn("[home expansions]", e);
if (back.kind === "int")
scene.add(INT.root);
return;
}
XP.back = back;
scene.add(A.root);
INT = A;
INT.level = 0;
INT.toldDoor = 1;
if (back.kind === "world")
store.inside = spec.id;
camera.position.set(A.start.x, 1.72, A.start.z);
yaw = 0;
pitch = 0;
if (typeof flyY !== "undefined")
flyY = 0;
if (typeof pinnedLevel !== "undefined")
pinnedLevel = null;
wallsAt = -1;
intCool = 1.2;
var nr = spec.xpAnnex.rooms.length;
setStatus("<b>The new rooms of " + esc(n.name) + ".</b> " + nr + " room" + (nr === 1 ? "" : "s") + " off this hall" + (spec.attrs.lv > 1 ? ", up the stairs as well" : "") + ". Walk back out through the door (or press E there) to return to the house.");
},
function () {
var b = XP.back;
if (!b)
return;
XP.back = null;
if (INT && INT.root)
scene.remove(INT.root);
if (b.kind === "int" && b.I) {
INT = b.I;
scene.add(INT.root);
INT.level = b.level;
}
else {
INT = null;
store.inside = null;
}
camera.position.set(b.x, b.y, b.z);
yaw = b.yaw;
pitch = 0;
if (typeof flyY !== "undefined")
flyY = 0;
if (typeof pinnedLevel !== "undefined")
pinnedLevel = null;
wallsAt = -1;
intCool = 1.2;
if (typeof wpEditing !== "undefined" && wpEditing && /^lot:x:/.test(wpEditing)) {
wpEditing = null;
wpDraft = null;
if (typeof paintArranger === "function")
paintArranger();
}
setStatus("<b>Back in the house.</b>");
},
function (I, spec) {
if (!I || !I.root)
return;
I.toldDoor = 1;
if (spec.xpAnnex.full)
return;
var keep = (I.wpSaved && typeof workplaceDecor === "function" ? workplaceDecor(I.wpKey) : null) || I.asBuilt || [], F = I.floor || 4, gone = [];
I.root.children.forEach(function (c) {
var k = c.userData && c.userData.furn;
if (!k || k === "stairs" || (typeof FIXED_FURN !== "undefined" && FIXED_FURN[k]))
return;
if (/^(rug_|paint_)/.test(k.replace(/^sg_/, "")))
return;
var L = Math.round(c.position.y / F);
var ok = keep.some(function (p) { return p && p.k === k && Math.abs((+p.x || 0) - c.position.x) < 0.03 && Math.abs((+p.z || 0) - c.position.z) < 0.03 && ((p.l | 0) === L); });
if (!ok)
gone.push(c);
});
gone.forEach(function (c) {
I.root.remove(c);
var wx = I.ox + c.position.x, wz = I.oz + c.position.z;
I.walls = I.walls.filter(function (w) { return !(w.h === 1.2 && Math.abs(w.x - wx) < 0.01 && Math.abs(w.z - wz) < 0.01); });
});
},
function () {
var home = null;
try {
if (typeof INT !== "undefined" && INT && INT.spec) {
if (INT.spec.xpAnnex)
home = INT.spec.xpAnnex.home;
else if (INT.spec.eyrie && typeof eydHereNum === "function") {
var n = eydHereNum();
if (n)
home = "eyrie:" + n;
}
else
home = xpHomeOfSpec(INT.spec, INT);
}
else if (typeof WLD !== "undefined" && WLD && WLD.on) {
var key = xpWorldKey(), L = key && WHM.homes && WHM.homes[key], P = camera.position, lx = P.x - xpBase(), lz = P.z;
(L || []).forEach(function (h) {
if (home || !h)
return;
var dx = lx - h.x, dz = lz - h.z, c = Math.cos(h.rot), s = Math.sin(h.rot);
if (Math.abs(dx * c - dz * s) < h.hw + 0.5 && Math.abs(dx * s + dz * c) < h.hd + 0.5) {
var id = xpCabinLot(h);
if (id != null)
home = "lot:" + id;
}
});
}
}
catch (e) {
home = null;
}
if (!home || !xpHolds(home))
return null;
return { home: home, name: xpHomeName(home), role: xpKeeper() ? "keeper" : "here", may: true, here: true };
},
function () {
var out = [], here = xbHere();
(XP.mine || []).forEach(function (h) { out.push(h); });
if (XB.want && xpKeeper() && !out.filter(function (h) { return h.home === XB.want; }).length)
out.unshift({ home: XB.want, name: xpHomeName(XB.want), role: "keeper", may: true });
if (here) {
var had = out.filter(function (h) { return h.home === here.home; })[0];
if (had)
had.here = true;
else
out.unshift(here);
}
return out;
},
function () {
var box = document.getElementById("xb-box");
if (!XB.open) {
if (box)
box.style.display = "none";
return;
}
if (!box) {
box = document.createElement("div");
box.id = "xb-box";
box.style.cssText = XB_BOX;
document.body.appendChild(box);
["keydown", "keyup", "keypress"].forEach(function (k) { box.addEventListener(k, function (e) { if (/INPUT|SELECT|TEXTAREA/.test(e.target.tagName))
e.stopPropagation(); }); });
box.addEventListener("click", function (e) { var t = e.target && e.target.closest ? e.target.closest("[data-xb]") : null; if (t)
xbAct(t.getAttribute("data-xb"), t.getAttribute("data-v")); });
}
box.style.display = "block";
var free = xpKeeper(), h = xbPick(), H = '';
H += '<div style="display:flex;justify-content:space-between;align-items:center;gap:8px"><b style="font:600 17px var(--serif,Georgia);color:#E8C27A">🏗️ Hearth &amp; Beam Builders</b>' +
'<button class="btn" data-xb="close">Close</button></div>';
H += '<div style="color:#bbb;margin:4px 0 10px">We build new rooms onto your home. A door marked <b>Your new rooms</b> appears in the house, and through it is everything we have built for you, furnished with the basics' +
' (the great houses\' in full). Buy better furniture in the shops and set it out with <b>Rearrange your house</b>.</div>';
if (!(typeof signedIn === "function" && signedIn()))
H += '<div style="color:#E8A0A0">Sign in first.</div>';
else if (XP.missing && !XP.kinds)
H += '<div style="color:#E8A0A0">' + (XP.err || "The builders open soon.") + '</div>';
else if (!h)
H += '<div style="color:#bbb">You have no home to build onto yet. Homes are bought and let at the Land Office, in Somnucor. An officer of the Dragon Corp builds onto their Eyrie apartment, and anyone onto a home in their own dream, standing in it.</div>';
else {
var homes = xbHomes();
if (homes.length > 1) {
H += '<div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:8px">' + homes.map(function (x) {
return '<button class="btn" data-xb="home" data-v="' + esc(x.home) + '"' + (x.home === h.home ? ' style="border-color:#E8C27A;color:#E8C27A"' : '') + '>' + esc(x.name || xpHomeName(x.home)) + (x.here ? " (here)" : "") + '</button>';
}).join("") + '</div>';
}
var built = xpRooms(h.home), left = Math.max(0, XP_MAX_ROOMS - built.length);
H += '<div style="margin:4px 0 8px"><b>' + esc(h.name || xpHomeName(h.home)) + '</b>' +
'<span style="color:#aaa"> · ' + built.length + ' new room' + (built.length === 1 ? '' : 's') + ' built' + (free ? '' : (', room for ' + left + ' more')) + '</span></div>';
if (h.may === false)
H += '<div style="color:#E8B080;margin-bottom:8px">' + esc(h.why || "Only the owner adds rooms to this home.") + '</div>';
if (h.role === "owner" && h.has_tenant) {
H += '<div style="margin:0 0 10px;padding:8px;border:1px solid #3A342A;border-radius:4px">Your tenant ' + (h.tenants_may ? '<b>may</b>' : 'may <b>not</b>') + ' add rooms to this home. ' +
'<button class="btn" data-xb="tenants" data-v="' + (h.tenants_may ? "0" : "1") + '">' + (h.tenants_may ? "Stop them" : "Let them") + '</button></div>';
}
var kinds = xpKinds().filter(function (k) { return k.on_sale !== false || free; });
[[false, "Rooms"], [true, "Bigger additions"]].forEach(function (sec) {
var L = kinds.filter(function (k) { return !!k.big === sec[0]; });
if (!L.length)
return;
H += '<div style="margin:12px 0 4px;color:#E8C27A;font-size:14px">' + sec[1] + '</div>';
L.forEach(function (k) {
var n = (k.rooms || []).length, can = h.may !== false && (free || n <= left), btn;
if (XB.ask === k.kind)
btn = '<button class="btn primary" data-xb="buy" data-v="' + esc(k.kind) + '">' + (free ? "Yes, build it (free)" : "Yes, build it for " + xbMoney(k.price)) + '</button> <button class="btn" data-xb="no">No</button>';
else
btn = can ? '<button class="btn" data-xb="ask" data-v="' + esc(k.kind) + '">' + (free ? "Add it, free" : "Add it, " + xbMoney(k.price)) + '</button>' :
'<span style="color:#888">' + (h.may === false ? "not yours to add" : "no room for " + n + " more") + '</span>';
H += '<div style="border-top:1px solid #2A2620;padding:7px 0"><b>' + esc(k.name) + '</b>' + (k.on_sale === false ? ' <span style="color:#C9A868">(off sale: Keeper only)</span>' : '') +
'<div style="color:#bbb">' + esc(k.blurb || "") + '</div><div style="margin-top:4px">' + btn + '</div></div>';
});
});
if (built.length) {
var names = {};
built.forEach(function (r) { var nm = (XP_ROOMNAME[r] || r).replace(/^the /, ""); names[nm] = (names[nm] || 0) + 1; });
H += '<div style="margin:12px 0 4px;color:#E8C27A;font-size:14px">Already built here</div><div style="color:#ccc">' +
Object.keys(names).map(function (nm) { return names[nm] > 1 ? names[nm] + " × " + esc(nm) : esc(nm); }).join(", ") + '.</div>';
}
}
H += '<div id="xb-msg" style="margin-top:10px;min-height:18px;color:' + (XB.bad ? "#E8A0A0" : "#9FD89F") + '">' + (XB.busy ? "Talking to the builders…" : XB.msg) + '</div>';
box.innerHTML = H;
},
function (a, v) {
if (a === "close")
return xbClose();
if (a === "home") {
XB.home = v;
XB.ask = null;
XB.msg = "";
return xbPaint(true);
}
if (a === "ask") {
XB.ask = v;
XB.msg = "";
return xbPaint(true);
}
if (a === "no") {
XB.ask = null;
return xbPaint(true);
}
if (XB.busy)
return;
if (a === "buy") {
var h = xbPick();
if (!h)
return;
var k = xpKind(v);
XB.busy = true;
XB.ask = null;
xbPaint(true);
cityRpc("expansion_buy", { p_home: h.home, p_kind: v }).then(function (o) {
XB.busy = false;
XB.bad = !o || o.ok === false;
XB.msg = (o && o.say) || (XB.bad ? "The builders could not do that." : "Built.");
if (!XB.bad && typeof refreshStanding === "function")
try {
refreshStanding();
}
catch (e) { }
return xpLoad(true);
}, function (e) { XB.busy = false; XB.bad = true; XB.msg = xpErr(e); }).then(function () { xbPaint(true); });
return;
}
if (a === "tenants") {
var t = xbPick();
if (!t)
return;
var lot = +String(t.home).slice(4);
XB.busy = true;
xbPaint(true);
cityRpc("expansion_tenants", { p_lot: lot, p_may: v === "1" }).then(function (o) {
XB.busy = false;
XB.bad = !o || o.ok === false;
XB.msg = (o && o.say) || "";
return xpLoad(true);
}, function (e) { XB.busy = false; XB.bad = true; XB.msg = xpErr(e); }).then(function () { xbPaint(true); });
}
}
];
});
