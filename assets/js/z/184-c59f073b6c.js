/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(184, function () {
"use strict";
return [
function (arch, x, z, attrs, extra) {
var spec = { id: uid(), archetype: arch, label: null, attrs: attrs || {}, x: x, z: z, rot: 0, sign: null, note: null, solid: true, detail: 1,
nights: [store.session], addr: null, name: null, named: null };
if (extra)
Object.keys(extra).forEach(function (k) { spec[k] = extra[k]; });
if (store.here)
spec.realm = store.here;
store.objects.push(spec);
if (typeof addMesh === "function")
addMesh(spec);
return spec;
},
function (x, feet, z, faceX, faceZ) {
if (typeof camera === "undefined")
return;
var gy = (typeof terrainY === "function") ? (terrainY(x, z) || 0) : 0;
DL.stand = { x: x, y: (feet || 0) + 1.72, z: z, flyY: Math.max(0, (feet || 0) - gy), here: store.here || 0, session: store.session,
yaw: (faceX !== undefined) ? Math.atan2(-(faceX - x), -(faceZ - z)) : null };
if (typeof walkMode !== "undefined" && walkMode && !store.inside)
dlApplyStand();
},
function () {
var T = DL.stand;
DL.stand = null;
if (!T || (store.here || 0) !== T.here)
return false;
camera.position.set(T.x, T.y, T.z);
if (typeof flyY !== "undefined")
flyY = T.flyY;
if (T.yaw != null && typeof yaw !== "undefined") {
yaw = T.yaw;
if (typeof pitch !== "undefined")
pitch = 0;
}
if (typeof surfAt !== "undefined")
surfAt = 0;
return true;
},
function (sent) {
var m = DL_BOAT_RE.exec(sent);
if (!m)
return false;
var word = m[1], deep = /\b(deep|open sea|ocean|the sea|a sea|middle of|far out|out at sea)\b/.test(sent);
var wantArch = /ship|trawler/.test(word) && dlKit("ship") ? "ship" : (dlKit(word.replace(/\s+/g, "")) ? word.replace(/\s+/g, "") : "boat");
var boat = dlFind(DL_BOATS, function (o) { return dlLabelHas(o, /boat|canoe|raft|yacht|dinghy|kayak|ship|skiff|gondola/); });
var me = dlMe();
if (!boat)
boat = dlNew(wantArch, me.x, me.z, {}, { label: word });
if (boat.dlFloat)
return true;
var water = dlFind(DL_WATERS, function (o) { return dlLabelHas(o, /water|sea|ocean|lake/) && (KIT[o.archetype] || {}).cat === "nature"; });
var wide = deep ? 5 : 3;
if (!water)
water = dlNew("water", me.x, me.z, { s: wide, d: deep ? 6 : 2 }, { label: deep ? "deep water" : "water", dlMade: 1 });
else {
water.attrs = water.attrs || {};
water.attrs.s = Math.max(water.attrs.s || 1, wide);
if (deep)
water.attrs.d = Math.max(water.attrs.d || 0, 6);
water.y = 0;
}
me = { x: water.x, z: water.z };
if (water.sea && typeof dreamCluster === "function") {
var C = dreamCluster(), half = 35 * ((water.attrs && water.attrs.s) || 1);
if (C) {
var ox = C.x - water.x, oz = C.z - water.z, L = Math.hypot(ox, oz);
if (L > 1) {
var t = Math.max(0, half - 70);
me = { x: water.x + ox / L * t, z: water.z + oz / L * t };
}
}
}
water.dlMade = 1;
if (typeof refresh === "function")
refresh(water);
var wg = meshes[water.id], top = 0.2;
if (wg) {
var wb = new THREE.Box3().setFromObject(wg);
if (!wb.isEmpty())
top = wb.max.y - (typeof terrainY === "function" ? terrainY(water.x, water.z) : 0);
}
boat.x = me.x;
boat.z = me.z;
boat.dlFloat = 1;
var gy = (typeof terrainY === "function") ? terrainY(boat.x, boat.z) : 0;
boat.y = 0;
if (typeof refresh === "function")
refresh(boat);
var g = meshes[boat.id], hull = 0, deck = 0.55;
if (g) {
var b = new THREE.Box3().setFromObject(g);
if (!b.isEmpty()) {
var low = b.min.y - gy, high = b.max.y - gy, length = Math.max(b.max.x - b.min.x, b.max.z - b.min.z);
var hullH = Math.min(high - low, Math.max(0.8, length * 0.12));
hull = top - (low + hullH * 0.35);
deck = dlDeckHeight(g, gy) - gy;
if (!(deck > low + 0.1 && deck < low + hullH * 1.6))
deck = low + hullH * 0.85;
}
}
boat.y = hull;
if (typeof refresh === "function")
refresh(boat);
var dk = dlKit(boat.archetype) || { size: [3, 3, 10] }, s = (boat.attrs && boat.attrs.s) || 1;
boat.dlDeck = { y: gy + hull + deck, hw: dk.size[0] * s * 0.32, hd: dk.size[2] * s * 0.38 };
var gm = meshes[boat.id];
if (gm) {
try {
gm.updateMatrixWorld(true);
var inv = gm.matrixWorld.clone().invert(), lb = new THREE.Box3();
gm.traverse(function (m) {
if (m.isMesh && m.visible !== false) {
var bb = new THREE.Box3().setFromObject(m);
if (bb.isEmpty())
return;
[[bb.min.x, bb.min.z], [bb.min.x, bb.max.z], [bb.max.x, bb.min.z], [bb.max.x, bb.max.z]].forEach(function (c) { lb.expandByPoint(new THREE.Vector3(c[0], (bb.min.y + bb.max.y) / 2, c[1]).applyMatrix4(inv)); });
}
});
if (!lb.isEmpty()) {
var sc = gm.scale.x || 1;
boat.dlDeck.hw = Math.max(boat.dlDeck.hw, (lb.max.x - lb.min.x) * sc * 0.36);
boat.dlDeck.hd = Math.max(boat.dlDeck.hd, (lb.max.z - lb.min.z) * sc * 0.4);
}
}
catch (e) { }
}
var gg = meshes[boat.id], ry = gg ? gg.rotation.y : 0;
var along = boat.dlDeck.hd >= boat.dlDeck.hw, ax = { x: along ? Math.sin(ry) : Math.cos(ry), z: along ? Math.cos(ry) : -Math.sin(ry), L: 2.5 * Math.max(boat.dlDeck.hd, boat.dlDeck.hw) };
var spot = gg ? (dlDeckSpot(gg, gy + top, ax) || dlDeckSpot(gg, gy + top)) : null;
if (spot)
boat.dlDeck.y = spot.y;
else
spot = { x: boat.x, z: boat.z, y: boat.dlDeck.y };
var bc = gg ? new THREE.Box3().setFromObject(gg).getCenter(new THREE.Vector3()) : { x: boat.x, z: boat.z };
var ox = spot.x - bc.x, oz = spot.z - bc.z;
if (Math.hypot(ox, oz) < 0.3) {
ox = ax.x;
oz = ax.z;
}
dlStand(spot.x, spot.y, spot.z, spot.x + ox * 20, spot.z + oz * 20);
boat.dlStood = 1;
boat.dlAt = { x: boat.x, z: boat.z, y: boat.y };
[1500, 3500].forEach(function (t) { setTimeout(dlBoatKeep, t); });
return true;
},
function (x, z) {
var feet = camera.position.y - 1.72, here = store.here || 0;
for (var i = 0; i < store.objects.length; i++) {
var o = store.objects[i];
if (!o.dlDeck || (o.realm || 0) !== here)
continue;
var g = meshes[o.id];
if (!g)
continue;
var dx = x - g.position.x, dz = z - g.position.z, r = -(g.rotation.y || 0), c = Math.cos(r), sn = Math.sin(r);
var lx = dx * c + dz * sn, lz = -dx * sn + dz * c;
if (Math.abs(lx) < o.dlDeck.hw + 0.4 && Math.abs(lz) < o.dlDeck.hd + 0.4 && feet > o.dlDeck.y - 0.5)
return true;
}
return false;
},
function (g, waterY, axis) {
var b = new THREE.Box3().setFromObject(g), best = null;
var cx = (b.min.x + b.max.x) / 2, cz = (b.min.z + b.max.z) / 2, ex = (b.max.x - b.min.x) * 0.4, ez = (b.max.z - b.min.z) * 0.4;
var meshesL = [];
g.traverse(function (m) { if (m.isMesh && m.visible !== false)
meshesL.push(m); });
for (var i = -4; i <= 4; i++)
for (var j = -4; j <= 4; j++) {
var x = cx + ex * i / 4, z = cz + ez * j / 4;
var rc = new THREE.Raycaster(new THREE.Vector3(x, b.max.y + 2, z), new THREE.Vector3(0, -1, 0), 0, b.max.y - b.min.y + 4);
var h = rc.intersectObjects(meshesL, false);
if (!h.length)
continue;
var y = h[0].point.y;
if (y < waterY + 0.15)
continue;
var d = Math.hypot(x - cx, z - cz);
if (axis && Math.abs((x - cx) * axis.x + (z - cz) * axis.z) < axis.L * 0.22)
continue;
if (!best || y < best.y - 0.25 || (Math.abs(y - best.y) <= 0.25 && d < best.d))
best = { x: x, z: z, y: y, d: d };
}
return best;
},
function (words) {
if (typeof VOCAB === "undefined")
return null;
var s = " " + words.trim() + " ", best = null;
store.objects.forEach(function (o) {
if (!dlHere(o) || o.filler || DL_FENCES.indexOf(o.archetype) > -1)
return;
var hit = (VOCAB[o.archetype] || []).some(function (w) { return s.indexOf(" " + w + " ") > -1; }) || s.indexOf(" " + o.archetype + " ") > -1 ||
(o.label && s.indexOf(" " + String(o.label).toLowerCase() + " ") > -1);
if (hit)
best = o;
});
return best;
},
function (sent) {
var m = DL_ROUND_RE.exec(sent), word, what;
if (m) {
word = m[2];
what = m[3];
}
else {
m = DL_ROUND_RE2.exec(sent);
if (!m)
return false;
word = m[2];
what = m[1];
}
var arch = dlFenceArch(word);
if (!arch)
return false;
var T = dlTargetFor(what);
if (!T || T.dlRinged)
return false;
var K = KIT[T.archetype], s = (T.attrs && T.attrs.s) || 1, a = T.attrs || {};
var hw = K.size[0] * s * (a.w || 1) / 2 + 3.5, hd = K.size[2] * s * (a.d || 1) / 2 + 3.5, r = T.rot || 0;
var old = store.objects.filter(function (o) { return dlHere(o) && o.archetype === arch && !o.dlRing && !o.filler; });
var col = old.length && old[old.length - 1].attrs ? old[old.length - 1].attrs.c : undefined;
old.forEach(function (o) { var i = store.objects.indexOf(o); if (i > -1)
store.objects.splice(i, 1); if (meshes[o.id]) {
scene.remove(meshes[o.id]);
delete meshes[o.id];
} });
var seg = KIT[arch].size[0];
[[0, hd, 0, 2 * hw], [hw, 0, Math.PI / 2, 2 * hd], [0, -hd, Math.PI, 2 * hw], [-hw, 0, -Math.PI / 2, 2 * hd]].forEach(function (side, si) {
var n = Math.max(1, Math.round(side[3] / seg)), sc = side[3] / (n * seg);
for (var i = 0; i < n; i++) {
var t = -side[3] / 2 + (i + 0.5) * side[3] / n;
if (si === 0 && n >= 3 && i === Math.floor(n / 2))
continue;
var lx = side[2] === 0 || side[2] === Math.PI ? t : side[0], lz = side[2] === 0 || side[2] === Math.PI ? side[1] : t;
var x = T.x + lx * Math.cos(r) + lz * Math.sin(r), z = T.z - lx * Math.sin(r) + lz * Math.cos(r);
var at = { w: sc };
if (col !== undefined)
at.c = col;
var f = dlNew(arch, x, z, at, { rot: r + side[2], dlRing: T.id, dlMade: 1 });
if (T.y) {
f.y = T.y;
if (typeof refresh === "function")
refresh(f);
}
}
});
T.dlRinged = 1;
return true;
},
function (sent) {
var m = DL_SKY_RE.exec(sent);
if (!m)
return false;
var here = store.here || 0;
if (store.dlSkyAt && store.dlSkyAt[here]) {
dlSkyKeep();
return true;
}
var kind = (m[2] || m[3] || "city");
var things = store.objects.filter(function (o) { var k = KIT[o.archetype]; return dlHere(o) && k && !o.y && (k.cat === "structure" || o.dpCity || o.archetype === "citypad"); });
if (things.length < 4 && /city|town|village|kingdom/.test(kind) && !DL.skyBuilt) {
DL.skyBuilt = 1;
try {
DL.busy = true;
dlInner(/city|kingdom/.test(kind) ? "a palace. a tower. a tower. houses. shops. a hotel. a city with tall towers." : "a town hall. houses. houses. shops. a church.");
}
catch (e) { }
DL.busy = false;
things = store.objects.filter(function (o) { var k = KIT[o.archetype]; return dlHere(o) && k && !o.y && (k.cat === "structure" || o.dpCity || o.archetype === "citypad"); });
}
if (!things.length)
return false;
var x0 = 1e9, x1 = -1e9, z0 = 1e9, z1 = -1e9;
things.forEach(function (o) {
var k = KIT[o.archetype], s = (o.attrs && o.attrs.s) || 1, r = Math.max(k.size[0], k.size[2]) * s * 0.5;
x0 = Math.min(x0, o.x - r);
x1 = Math.max(x1, o.x + r);
z0 = Math.min(z0, o.z - r);
z1 = Math.max(z1, o.z + r);
});
var cx = (x0 + x1) / 2, cz = (z0 + z1) / 2, span = Math.max(x1 - x0, z1 - z0) + 24;
var people = store.objects.filter(function (o) { return dlHere(o) && !o.y && typeof isPerson === "function" && isPerson(o) && o.x > x0 - 10 && o.x < x1 + 10 && o.z > z0 - 10 && o.z < z1 + 10; });
things.concat(people).forEach(function (o) { o.y = DL_SKY_Y; o.dlSky = 1; if (typeof refresh === "function")
refresh(o); });
if (dlKit("floatingisland")) {
var isl = dlNew("floatingisland", cx, cz, { s: span / 20 }, { dlMade: 1, scenery: true, solid: false, dlSkyRock: 1, label: "the rock the " + kind + " stands on" });
isl.y = DL_SKY_Y - 22.2 * (span / 20) - 0.15;
if (typeof refresh === "function")
refresh(isl);
isl.dlDeck = { y: ((typeof terrainY === "function") ? terrainY(cx, cz) : 0) + DL_SKY_Y, hw: span / 2, hd: span / 2 };
}
dlLiftStreets(cx, cz, span / 2);
(store.dlSkyAt || (store.dlSkyAt = {}))[here] = { cx: cx, cz: cz, R: span / 2 };
[1400, 3000, 6000].forEach(function (t) { setTimeout(dlSkyKeep, t); });
dlStand(cx, ((typeof terrainY === "function") ? terrainY(cx, cz) : 0) + DL_SKY_Y, cz + span * 0.3, cx, cz);
DL.stoodSky = store.session;
return true;
},
function () {
var here = store.here || 0, K = store.dlSkyAt && store.dlSkyAt[here];
if (!K || typeof K !== "object")
return;
store.objects.forEach(function (o) {
if (!dlHere(o) || o.y || o.dlSkyRock)
return;
var k = KIT[o.archetype];
if (!k)
return;
if (!(k.cat === "structure" || o.dpCity || o.archetype === "citypad" || o.filler || (typeof isPerson === "function" && isPerson(o))))
return;
var edge = (typeof isPerson === "function" && isPerson(o)) ? K.R - 1 : K.R + 10;
if (Math.abs(o.x - K.cx) > edge || Math.abs(o.z - K.cz) > edge)
return;
o.y = DL_SKY_Y;
o.dlSky = 1;
if (typeof refresh === "function")
refresh(o);
});
var x0 = 1e9, x1 = -1e9, z0 = 1e9, z1 = -1e9;
store.objects.forEach(function (o) {
if (!o.dlSky || !dlHere(o) || (typeof isPerson === "function" && isPerson(o)))
return;
var k = KIT[o.archetype];
if (!k)
return;
var s = (o.attrs && o.attrs.s) || 1, r = Math.max(k.size[0], k.size[2]) * s * 0.5;
x0 = Math.min(x0, o.x - r);
x1 = Math.max(x1, o.x + r);
z0 = Math.min(z0, o.z - r);
z1 = Math.max(z1, o.z + r);
});
if (x0 < x1) {
var cx = (x0 + x1) / 2, cz = (z0 + z1) / 2, R = Math.max(x1 - x0, z1 - z0) / 2 + 12;
if (Math.abs(cx - K.cx) > 2 || Math.abs(cz - K.cz) > 2 || R > K.R + 2) {
K.cx = cx;
K.cz = cz;
K.R = Math.max(R, K.R);
var isl = store.objects.filter(function (o) { return o.dlSkyRock && dlHere(o); })[0];
if (isl) {
var span = K.R * 2 * 1.3;
isl.x = cx;
isl.z = cz;
isl.attrs.s = span / 20;
isl.y = DL_SKY_Y - 22.2 * (span / 20) - 0.15;
isl.dlDeck = { y: ((typeof terrainY === "function") ? terrainY(cx, cz) : 0) + DL_SKY_Y, hw: K.R, hd: K.R };
if (typeof refresh === "function")
refresh(isl);
}
if (typeof save === "function")
save();
}
}
dlLiftStreets(K.cx, K.cz, K.R + 10);
},
function (cx, cz, R) {
if (typeof scene === "undefined")
return;
scene.children.forEach(function (c) {
if (!c.isMesh || !c.userData || !c.userData.street || c.userData.dlUp)
return;
var b = new THREE.Box3().setFromObject(c);
if (b.isEmpty())
return;
var mx = (b.min.x + b.max.x) / 2, mz = (b.min.z + b.max.z) / 2;
if (Math.abs(mx - cx) < R && Math.abs(mz - cz) < R) {
c.position.y += DL_SKY_Y;
c.userData.dlUp = 1;
}
});
},
function (word) {
var arch = /volcano/.test(word) ? "volcano" : /hill|fell|highland/.test(word) ? "hill" : "mountain";
var want = arch === "hill" ? ["hill", "mountain", "volcano"] : arch === "volcano" ? ["volcano", "mountain"] : ["mountain", "volcano", "hill"];
var L = null;
want.some(function (a) { L = dlFind([a]); return !!L; });
if (!L && dlKit(arch)) {
var me = dlMe();
L = dlNew(arch, me.x, me.z - 70, {}, { label: word });
}
return L;
},
function (sent) {
var m = DL_NEST_RE.exec(sent);
if (!m)
return false;
var T = dlSubjectFor(m[1]);
if (!T || DL_LAND_ARCH.indexOf(T.archetype) > -1 || T.dlNest)
return false;
var Tk = KIT[T.archetype];
if (!Tk || (Tk.cat !== "structure" && T.archetype !== "cave"))
return false;
var L = dlLandFor(m[2]);
if (!L)
return false;
var lg = meshes[L.id];
if (!lg)
return false;
var lb = new THREE.Box3().setFromObject(lg);
if (lb.isEmpty())
return false;
var R = Math.max(lb.max.x - lb.min.x, lb.max.z - lb.min.z) / 2, H = Math.max(1, lb.max.y - lb.min.y);
var lc = lb.getCenter(new THREE.Vector3());
var C = (typeof dreamCluster === "function") ? dreamCluster() : null, me = dlMe();
var fx = (C ? C.x : me.x) - lc.x, fz = (C ? C.z : me.z) - lc.z, fl = Math.hypot(fx, fz);
if (fl < 5) {
fx = me.x - lc.x;
fz = me.z - lc.z;
fl = Math.hypot(fx, fz);
}
if (fl < 1) {
fx = 0;
fz = 1;
fl = 1;
}
fx /= fl;
fz /= fl;
var tg = meshes[T.id], th = 4, td = 6;
if (tg) {
var tb = new THREE.Box3().setFromObject(tg);
if (!tb.isEmpty()) {
th = tb.max.y - tb.min.y;
td = Math.max(tb.max.x - tb.min.x, tb.max.z - tb.min.z);
}
}
var d = Math.max(R * 0.5, R * (1 - Math.min(0.9, th * 0.8 / H))) - td * 0.15;
T.x = lc.x + fx * d;
T.z = lc.z + fz * d;
T.rot = Math.atan2(fx, fz);
T.y = 0;
T.dlNest = 1;
if (typeof refresh === "function")
refresh(T);
T.dlAt = { x: T.x, z: T.z, y: 0 };
[1500, 3500, 6000].forEach(function (t) { setTimeout(dlBoatKeep, t); });
var side = 0;
store.objects.forEach(function (o) {
if (!dlHere(o) || o.archetype !== "tunnel" || o.dlNest)
return;
var sd = (side++ % 2 ? 1 : -1) * (td * 0.5 + 8 + Math.floor(side / 2) * 10), px = -fz, pz = fx;
o.x = T.x + px * sd - fx * 2;
o.z = T.z + pz * sd - fz * 2;
o.rot = T.rot;
o.y = 0;
o.dlNest = 1;
if (typeof refresh === "function")
refresh(o);
});
var fm = DL_FALLS_RE.exec(sent);
if (fm) {
var W = dlFind(["waterfall"], function (o) { return dlLabelHas(o, /waterfall|falls|cascade/); });
if (!W && dlKit("waterfall"))
W = dlNew("waterfall", T.x, T.z, {}, { label: fm[1] });
if (W) {
var off = td * 0.5 + 1.2;
W.x = T.x + fx * off;
W.z = T.z + fz * off;
W.rot = T.rot;
W.y = 0;
W.dlNest = 1;
W.dlAt = { x: W.x, z: W.z, y: 0 };
if (typeof refresh === "function")
refresh(W);
}
}
var sd = td * 0.5 + (fm ? 10 : 8), sx = T.x + fx * sd, sz = T.z + fz * sd;
dlStand(sx, (typeof terrainY === "function") ? terrainY(sx, sz) : 0, sz, T.x, T.z);
if (DL.stand)
DL.stand.firm = 1;
return true;
},
function (words) {
if (typeof VOCAB === "undefined")
return dlTargetFor(words);
var s = " " + words.trim() + " ", best = null, at = 1e9;
store.objects.forEach(function (o) {
if (!dlHere(o) || o.filler || DL_FENCES.indexOf(o.archetype) > -1)
return;
var cand = (VOCAB[o.archetype] || []).concat([o.archetype]);
if (o.label)
cand.push(String(o.label).toLowerCase());
cand.forEach(function (w) { var i = s.indexOf(" " + w + " "); if (i < 0)
i = s.indexOf(" " + w + "s "); if (i > -1 && i < at) {
at = i;
best = o;
} });
});
return best;
},
function (sent) {
if (DL_NEST_RE.test(sent))
return false;
var fm = DL_FALLS_RE.exec(sent);
if (!fm)
return false;
var T = dlTargetFor(sent.slice(0, fm.index));
if (!T || T.dlFalls)
return false;
var W = dlFind(["waterfall"], function (o) { return dlLabelHas(o, /waterfall|falls|cascade/); });
if (!W && dlKit("waterfall"))
W = dlNew("waterfall", T.x, T.z, {}, { label: fm[1] });
if (!W || W === T)
return false;
var tg = meshes[T.id], td = 6;
if (tg) {
var tb = new THREE.Box3().setFromObject(tg);
if (!tb.isEmpty())
td = Math.max(tb.max.x - tb.min.x, tb.max.z - tb.min.z);
}
var r = T.rot || 0, fx = Math.sin(r), fz = Math.cos(r), off = td * 0.5 + 1.2;
W.x = T.x + fx * off;
W.z = T.z + fz * off;
W.rot = r;
W.y = 0;
T.dlFalls = 1;
W.dlAt = { x: W.x, z: W.z, y: 0 };
T.dlAt = { x: T.x, z: T.z, y: T.y || 0 };
if (typeof refresh === "function")
refresh(W);
[1500, 3500].forEach(function (t) { setTimeout(dlBoatKeep, t); });
var sx = T.x + fx * (td * 0.5 + 10), sz = T.z + fz * (td * 0.5 + 10);
dlStand(sx, (typeof terrainY === "function") ? terrainY(sx, sz) : 0, sz, T.x, T.z);
if (DL.stand)
DL.stand.firm = 1;
return true;
},
function (sent) {
var B = dlSubjectFor(sent);
if (B && DL_GRAND.indexOf(B.archetype) > -1)
return B;
var best = null, bs = 0;
store.objects.forEach(function (o) {
if (!dlHere(o) || o.filler || DL_GRAND.indexOf(o.archetype) < 0)
return;
var k = KIT[o.archetype], sz = k ? k.size[0] * k.size[2] * Math.pow((o.attrs && o.attrs.s) || 1, 2) : 0;
if (sz > bs) {
bs = sz;
best = o;
}
});
return best;
},
function (sent) {
if (/\b(?:my|his|her|their|our|for)\s+(?:own\s+)?crafts?\b/.test(sent))
store.objects.slice().forEach(function (o) {
if (dlHere(o) && /^crafts?$/i.test(String(o.label || "")) && (KIT[o.archetype] || {}).cat === "vehicle" && typeof removeSpec === "function")
removeSpec(o);
});
var found = [];
DL_ROOMS.forEach(function (r) { if (r[0].test(sent))
found.push(r); });
if (!found.length)
return false;
var B = dlGrandFor(sent);
if (!B)
return false;
var rooms = B.dlRooms || [];
found.forEach(function (r) { if (rooms.indexOf(r[1]) < 0)
rooms.push(r[1]); });
B.dlRooms = rooms.slice(0, 10);
var labels = new RegExp("\\b(?:" + found.map(function (r) { return r[2]; }).join("|") + ")", "i");
store.objects.slice().forEach(function (o) {
if (o === B || !dlHere(o) || o.filler || o.dlMade || isPerson(o))
return;
var k = KIT[o.archetype];
if (!k || k.cat === "nature" || k.cat === "being")
return;
if (DL_GRAND.indexOf(o.archetype) > -1)
return;
if (!labels.test(String(o.label || o.name || "")))
return;
if (typeof removeSpec === "function")
removeSpec(o);
});
var low = " " + sent.replace(/[^a-z' -]+/g, " ") + " ", n = 0, r = B.rot || 0, fx = Math.sin(r), fz = Math.cos(r), kb = KIT[B.archetype], half = kb ? Math.max(kb.size[0], kb.size[2]) * ((B.attrs && B.attrs.s) || 1) * 0.5 : 10;
store.objects.forEach(function (o) {
if (!dlHere(o) || o === B || o.dlGathered)
return;
var nm = String(o.label || o.name || "").toLowerCase();
if (!nm)
return;
var named = low.indexOf(" " + nm + " ") > -1 || low.indexOf(" " + nm.replace(/s$/, "") + " ") > -1 || low.indexOf(" " + nm + "s ") > -1;
if (!named)
return;
var k = KIT[o.archetype];
if (!(isPerson(o) || (k && (k.cat === "being" || o.archetype === "robot"))))
return;
var a = (n % 7 - 3) * 0.32, d = half + 6 + (n % 3) * 3;
n++;
o.x = B.x + Math.sin(r + a) * d;
o.z = B.z + Math.cos(r + a) * d;
o.y = B.y || 0;
o.dlGathered = 1;
if (typeof refresh === "function")
refresh(o);
(store.characters || []).forEach(function (c) { if (c.objId === o.id) {
c.x = o.x;
c.z = o.z;
c.anchor = { x: o.x, z: o.z };
c.atId = B.id;
} });
});
if (typeof INT !== "undefined" && INT && INT.spec === B && typeof rebuildInterior === "function")
rebuildInterior();
return true;
},
function (k, W, D, put, spots) {
var x, z, n = 0, edge = function (list, step) { for (z = -D / 2 + 3; z < D / 2 - 4; z += step || 4.5) {
put(list[n % list.length], -W / 2 + 1.2, z, Math.PI / 2);
put(list[(n + 1) % list.length], W / 2 - 1.2, z, -Math.PI / 2);
n++;
} };
if (k === "banquet") {
for (x = -W / 2 + 5; x <= W / 2 - 5; x += Math.max(5, (W - 10) / 2))
for (z = -D / 2 + 5; z < D / 2 - 6; z += 5.2)
put("longtable", x, z, Math.PI / 2);
put("chandelier", 0, -D / 4, 0);
put("chandelier", 0, D / 4, 0);
put("fireplace", 0, -D / 2 + .5, 0);
edge(["hallbanner", "candles"], 5);
}
else if (k === "treasury") {
for (z = -D / 2 + 4; z < D / 2 - 6; z += 5)
for (x = -W / 2 + 4; x < W / 2 - 3; x += 6)
put("goldpile", x + (z % 2 ? 1.5 : 0), z, (x + z) * .7);
put("vaultround", 0, -D / 2 + .2, 0);
edge(["crates", "barrel", "candles"], 4);
}
else if (k === "forge") {
for (x = -W / 2 + 5; x < W / 2 - 4; x += 7) {
put("hearthforge", x, -D / 2 + 2, 0);
put("anvil", x, -D / 2 + 5, 0);
}
for (z = -D / 2 + 8; z < D / 2 - 6; z += 5) {
put("anvil", -W / 4, z, 0.3);
put("anvil", W / 4, z, -0.3);
}
edge(["crates", "barrel"], 4);
}
else if (k === "mine") {
for (z = -D / 2 + 3; z < D / 2 - 5; z += 4)
for (x = -W / 2 + 3; x < W / 2 - 2; x += 5) {
var r = (x * 7 + z * 13) % 3;
put(r === 0 ? "crystals" : r === 1 ? "boulder" : "stalagmite", x + (z % 3), z, (x + z));
}
put("cavepool", 0, 0, 0);
edge(["crates", "barrel"], 5);
}
else if (k === "engine") {
for (z = -D / 2 + 4; z < D / 2 - 6; z += 5)
for (x = -W / 2 + 4; x < W / 2 - 3; x += 6)
put("machine", x, z, 0);
edge(["barrel", "crates"], 4);
}
else if (k === "bedroom") {
for (z = -D / 2 + 3; z < D / 2 - 5; z += 4) {
put("bed", -W / 2 + 2, z, Math.PI / 2);
put("bed", W / 2 - 2, z, -Math.PI / 2);
}
put("rug", 0, 0, 0);
put("chandelier", 0, 0, 0);
put("wardrobe", 0, -D / 2 + .4, 0);
}
else if (k === "armoury") {
edge(["banner", "crates", "barrel"], 3);
put("anvil", 0, 0, 0);
}
else if (k === "kitchen") {
for (x = -W / 2 + 3; x < W / 2 - 2; x += 2.4)
put("stove", x, -D / 2 + .6, 0);
put("longtable", 0, 0, 0);
edge(["counter", "barrel"], 3);
}
else if (k === "study") {
for (z = -D / 2 + 3; z < D / 2 - 6; z += 3)
for (x = -W / 4; x <= W / 4; x += W / 2) {
put("bookshelf", x - .9, z, 0);
put("bookshelf", x + .9, z, 0);
}
put("desk", 0, D / 2 - 5, Math.PI);
}
else if (k === "cell") {
for (z = -D / 2 + 3; z < D / 2 - 4; z += 4) {
put("cellbars", -W / 4, z, Math.PI / 2);
put("bed", -W / 2 + 1.5, z, 0);
}
}
else if (k === "chapel") {
for (z = -D / 2 + 6; z < D / 2 - 4; z += 1.6) {
put("pew", -W / 4, z, Math.PI);
put("pew", W / 4, z, Math.PI);
}
put("altarinside", 0, -D / 2 + 2, Math.PI);
put("candles", 0, -D / 2 + 1, 0);
}
else if (k === "ballroom") {
put("chandelier", 0, -D / 4, 0);
put("chandelier", 0, D / 4, 0);
put("piano", W / 2 - 3, -D / 2 + 3, 0);
}
spots.push({ x: 0, z: 0, room: (typeof ROOMNAME !== "undefined" && ROOMNAME[k]) || k });
},
function (sent) {
if (!/\bigloos?\b/.test(sent) || !dlKit("igloo"))
return false;
var done = false;
store.objects.forEach(function (o) {
if (!dlHere(o) || o.archetype === "igloo")
return;
if (dlLabelHas(o, /\bigloo/)) {
o.archetype = "igloo";
o.attrs = {};
if (typeof refresh === "function")
refresh(o);
done = true;
}
});
if (!store.objects.some(function (o) { return dlHere(o) && o.archetype === "igloo"; })) {
var me = dlMe();
dlNew("igloo", me.x, me.z - 14, {}, { label: "igloo" });
done = true;
}
return done;
},
function (text) {
var low = " " + String(text || "").toLowerCase() + " ";
var lastStop = -1, re = new RegExp(DL_STOP_RE.source, "g"), m;
while ((m = re.exec(low)))
lastStop = m.index + m[0].length;
if (lastStop < 0)
return false;
var lastWx = -1;
if (typeof WX_WORDS !== "undefined")
WX_WORDS.forEach(function (w) {
if (w[0] === "clear")
return;
var r2 = new RegExp(w[1].source, "g"), k;
while ((k = r2.exec(low))) {
var e = k.index + k[0].length;
if (e > lastStop || k.index >= lastStop)
lastWx = Math.max(lastWx, k.index);
}
});
return lastWx < lastStop;
},
function () {
var t = dlText();
if (!dlWeatherStopped(t))
return false;
var st = (typeof wxState === "function") ? wxState() : { kind: "clear" };
var was = st.kind;
if (was !== "clear" && typeof wxSet === "function")
wxSet("clear", 1, "stopped");
var gone = [].concat.apply([], Object.keys(DL_WX_THINGS).map(function (k) { return DL_WX_THINGS[k]; }));
store.objects.slice().forEach(function (o) {
if (!dlHere(o) || gone.indexOf(o.archetype) < 0)
return;
var i = store.objects.indexOf(o);
if (i > -1)
store.objects.splice(i, 1);
if (meshes[o.id]) {
scene.remove(meshes[o.id]);
delete meshes[o.id];
}
});
return true;
},
function () {
try {
if (typeof wxInCity === "function" && wxInCity())
return false;
var st = (typeof wxState === "function") ? wxState() : null;
if (st && (st.kind === "snow"))
return true;
var t = dlLow(dlText());
return /\b(snowy (?:ground|field|fields|plain|plains|land|landscape|valley|hills?|mountains?|forest|woods|street|town|village)|in the snow|deep snow|covered in snow|snow-covered|snow covered|thick snow|blanket of snow|arctic|tundra|antarctic|north pole|south pole|frozen wasteland|ice field|ice fields|polar)\b/.test(t) && !dlWeatherStopped(dlText());
}
catch (e) {
return false;
}
},
function (before) {
if (store.inside || DL.stoodSky === store.session)
return;
var walking = typeof walkMode !== "undefined" && walkMode;
var fresh = store.objects.slice(before).filter(function (o) {
var k = KIT[o.archetype];
return dlHere(o) && k && !o.filler && !o.scenery && !o.dlMade && !o.dlStood &&
(k.cat === "structure" || k.cat === "nature" || k.cat === "vehicle" || k.cat === "infra") && DL_WATERS.indexOf(o.archetype) < 0;
});
if (!fresh.length)
return;
var me = dlMe(), near = walking && fresh.some(function (o) { return Math.hypot(o.x - me.x, o.z - me.z) < 26; });
if (near)
return;
if (!walking && DL.stand && DL.stand.session === store.session)
return;
var T = fresh[0], K = KIT[T.archetype], s = (T.attrs && T.attrs.s) || 1, r = T.rot || 0;
var off = Math.max(K.size[0], K.size[2]) * s * 0.5 + 7;
var x = T.x + Math.sin(r) * off, z = T.z + Math.cos(r) * off;
var feet = ((typeof terrainY === "function") ? terrainY(x, z) : 0) + (T.y || 0);
dlStand(x, feet, z, T.x, T.z);
},
function (before, chunk) {
if (DL.busy)
return;
DL.busy = true;
try {
var said = dlSaid(chunk);
dlWeather();
var sents = dlSentences(said);
var stood = false;
sents.forEach(function (s) {
try {
dlIgloo(s);
}
catch (e) { }
try {
if (dlBoat(s))
stood = true;
}
catch (e) {
if (window.console)
console.warn("[layers] boat", e);
}
try {
dlFence(s);
}
catch (e) {
if (window.console)
console.warn("[layers] fence", e);
}
try {
if (dlSky(s))
stood = true;
}
catch (e) {
if (window.console)
console.warn("[layers] sky", e);
}
try {
dlRooms(s);
}
catch (e) {
if (window.console)
console.warn("[layers] rooms", e);
}
try {
if (dlNestle(s) || dlFallsBehind(s))
stood = true;
}
catch (e) {
if (window.console)
console.warn("[layers] nestle", e);
}
});
dlGround();
if (!stood && before != null)
dlBringNear(before);
if (typeof save === "function")
save();
}
catch (e) {
if (window.console)
console.warn("[layers]", e);
}
DL.busy = false;
}
];
});
