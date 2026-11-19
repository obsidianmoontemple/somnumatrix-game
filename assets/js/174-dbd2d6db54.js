/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
function dbExtent(pt) { return __ZC(174, 0, this, arguments, new.target); }
function dbHex(c) { if (typeof c === "number")
return c; if (typeof c === "string" && /^#?[0-9a-f]{6}$/i.test(c))
return parseInt(c.replace("#", ""), 16); return null; }
function dbStructure(def) { return __ZC(174, 1, this, arguments, new.target); }
(function () {
if (typeof compileArchetype === "function") {
var ca = compileArchetype;
compileArchetype = function (key, def) {
try {
if (def && typeof aidDef === "function" && !KIT[key])
def = dbStructure(aidDef(def));
}
catch (e) { }
return ca(key, def);
};
}
})();
function dbKitWord(label) { return __ZC(174, 2, this, arguments, new.target); }
(function () {
if (typeof reconcile !== "function")
return;
var rc = reconcile;
reconcile = function (p) {
try {
(p && p.objects || []).forEach(function (o, i) {
if (!o || !o.archetype || KIT[o.archetype])
return;
var nd = (p.newArchetypes || []).filter(function (n) { return n && n.key === o.archetype; })[0];
var cat = nd && typeof AID_CAT !== "undefined" ? AID_CAT[String(nd.cat || "").toLowerCase()] : null;
if (nd && cat && cat !== "structure")
return;
var k = dbKitWord(o.label) || dbKitWord(o.archetype);
if (!k)
return;
var c = o.attrs && o.attrs.c;
if (!c && nd && Array.isArray(nd.parts) && nd.parts[0])
c = nd.parts[0].c || nd.parts[0].color;
p.objects[i] = Object.assign({}, o, { archetype: k, attrs: Object.assign({}, o.attrs || {}, c ? { c: c } : {}) });
});
}
catch (e) { }
return rc.apply(this, arguments);
};
})();
function dbGiantR(o) {
if (!o || o.filler || o.city || o.hub || o.charId)
return 0;
var d = KIT[o.archetype];
if (!d || d.cat === "being" || d.cat === "vehicle")
return 0;
if ((d.parts || []).some(function (p) { return p.opa !== undefined && p.opa < 0.5; }))
return 0;
var a = o.attrs || {}, s = a.s || 1, r = Math.max(d.size[0] * s * (a.w || 1), d.size[2] * s * (a.d || 1)) / 2, h = d.size[1] * s * (a.h || 1);
return (r >= 28 && h >= 12) ? r : 0;
}
function dbRadius(o) { var d = KIT[o.archetype]; if (!d)
return 2; var a = o.attrs || {}, s = a.s || 1; return Math.max(d.size[0] * s * (a.w || 1), d.size[2] * s * (a.d || 1)) / 2; }
function dbGiants() { var here = store.here || 0; return store.objects.filter(function (o) { return (o.realm || 0) === here && dbGiantR(o) > 0; }); }
function dbClearGiants() {
var G = dbGiants();
if (!G.length)
return 0;
var here = store.here || 0, moved = 0;
store.objects.forEach(function (o) {
if (o.filler || o.placed || o.city || o.hub || (o.realm || 0) !== here || G.indexOf(o) > -1)
return;
if (dbGiantR(o) > 0)
return;
G.forEach(function (g) {
var R = dbGiantR(g), dx = o.x - g.x, dz = o.z - g.z, d = Math.hypot(dx, dz), need = R + dbRadius(o) + 6;
if (d >= need)
return;
if (d < 0.5) {
dx = 1;
dz = 0.3;
d = Math.hypot(dx, dz);
}
o.x = g.x + dx / d * need;
o.z = g.z + dz / d * need;
moved++;
if (typeof refresh === "function")
try {
refresh(o);
}
catch (e) { }
else if (meshes[o.id]) {
meshes[o.id].position.x = o.x;
meshes[o.id].position.z = o.z;
}
});
});
return moved;
}
function dbWalkerOut() {
if (typeof careInCity === "function" && careInCity())
return;
var P = camera.position;
dbGiants().forEach(function (g) {
var R = dbGiantR(g), dx = P.x - g.x, dz = P.z - g.z, d = Math.hypot(dx, dz);
if (d >= R + 2)
return;
if (d < 0.5) {
dx = 0;
dz = 1;
d = 1;
}
P.x = g.x + dx / d * (R + 10);
P.z = g.z + dz / d * (R + 10);
if (typeof flyY !== "undefined")
flyY = 0;
P.y = ((typeof terrainY === "function") ? terrainY(P.x, P.z) : 0) + 1.72;
yaw = Math.atan2(-(g.x - P.x), -(g.z - P.z));
if (typeof pitch !== "undefined")
pitch = 0.15;
});
}
(function () {
if (typeof reconcile === "function") {
var rc2 = reconcile;
reconcile = function () { var r = rc2.apply(this, arguments); try {
dbClearGiants();
}
catch (e) { } return r; };
}
if (typeof setWalk === "function") {
var sw = setWalk;
setWalk = function (on) { var r = sw.apply(this, arguments); if (on)
try {
dbClearGiants();
dbWalkerOut();
}
catch (e) { } return r; };
}
if (typeof addMesh === "function") {
var am = addMesh;
addMesh = function (spec) {
var g = am.apply(this, arguments);
try {
var m = g || meshes[spec && spec.id];
if (m && dbGiantR(spec) > 0)
m.traverse(function (c) { if (c.isMesh && c.material && !Array.isArray(c.material) && c.material.side !== THREE.DoubleSide) {
c.material = c.material.clone();
c.material.side = THREE.DoubleSide;
} });
}
catch (e) { }
return g;
};
}
})();
(function () {
if (typeof interiorTick !== "function")
return;
var it = interiorTick;
interiorTick = function (dt) {
var r = it.apply(this, arguments);
try {
if (INT || store.inside || !walkMode || (typeof intCool !== "undefined" && intCool > 0))
return r;
var P = camera.position, gy = (typeof terrainY === "function") ? terrainY(P.x, P.z) : 0;
if (P.y - 1.72 - gy > 2)
return r;
var near = intNearEnterable(P);
for (var i = 0; i < near.length; i++) {
var o = near[i];
if ((o.realm || 0) !== (store.here || 0) || o.filler || !enterable(o))
continue;
if (Math.abs(o.x - P.x) > 60 || Math.abs(o.z - P.z) > 60)
continue;
var d = KIT[o.archetype], a = o.attrs || {}, s = a.s || 1, hw = d.size[0] * s * (a.w || 1) / 2, hd = d.size[2] * s * (a.d || 1) / 2, rot = o.rot || 0;
var dx = P.x - o.x, dz = P.z - o.z, lx = dx * Math.cos(rot) - dz * Math.sin(rot), lz = dx * Math.sin(rot) + dz * Math.cos(rot);
if (lz > hd - 0.8 && lz < hd + 1.1 && Math.abs(lx) < Math.max(1.6, Math.min(3.2, hw * 0.55))) {
var D = doorWorld(o), dl = (D.x - o.x) * Math.sin(rot) + (D.z - o.z) * Math.cos(rot) - 0.6;
if (Math.abs(dl - hd) > 2)
continue;
enterBuilding(o);
return r;
}
}
}
catch (e) { }
return r;
};
})();
var DB_DOORS = {};
var DB_MODEL_DOOR = { "kenney/city-kit-suburban/building-type-a.glb": 0, "kenney/city-kit-suburban/building-type-c.glb": 0, "kenney/city-kit-suburban/building-type-f.glb": 0.04, "kenney/city-kit-suburban/building-type-h.glb": 0, "kenney/city-kit-suburban/building-type-k.glb": 0.22, "kenney/city-kit-suburban/building-type-m.glb": 0, "kaykit/medieval-hexagon/building_home_a_blue.glb": 0, "kaykit/medieval-hexagon/building_home_a_red.glb": 0, "kaykit/medieval-hexagon/building_home_b_red.glb": 0.155, "kenney/city-kit-suburban/building-type-t.glb": 0, "kenney/city-kit-suburban/building-type-u.glb": 0.04, "kenney/city-kit-commercial/building-e.glb": 0.12, "kenney/city-kit-commercial/building-i.glb": 0, "kenney/city-kit-commercial/building-l.glb": 0.05, "kenney/city-kit-commercial/building-m.glb": 0, "kenney/city-kit-industrial/building-b.glb": -0.37, "kenney/city-kit-industrial/building-c.glb": 0.36, "kenney/city-kit-industrial/building-e.glb": 0.13, "kaykit/medieval-hexagon/building_church_blue.glb": 0, "kaykit/medieval-hexagon/building_church_red.glb": 0, "kaykit/medieval-hexagon/building_tower_a_blue.glb": 0, "kaykit/medieval-hexagon/building_tower_a_red.glb": 0, "kaykit/medieval-hexagon/building_tower_b_blue.glb": 0, "kaykit/medieval-hexagon/building_castle_blue.glb": 0, "kaykit/medieval-hexagon/building_castle_red.glb": 0, "kaykit/medieval-hexagon/building_windmill_red.glb": 0, "kaykit/medieval-hexagon/building_tavern_red.glb": -0.12, "kenney/graveyard-kit/crypt.glb": 0, "kaykit/halloween/crypt.glb": 0, "kenney/graveyard-kit/crypt-small.glb": 0, "kenney/city-kit-industrial/building-g.glb": 0.1, "kenney/city-kit-commercial/building-skyscraper-a.glb": 0, "kenney/city-kit-commercial/building-skyscraper-b.glb": 0, "kenney/city-kit-commercial/building-skyscraper-c.glb": 0, "kenney/city-kit-commercial/building-skyscraper-d.glb": 0, "kenney/city-kit-commercial/building-skyscraper-e.glb": 0, "kaykit/medieval-hexagon/building_mine_blue.glb": 0, "kaykit/medieval-hexagon/building_market_red.glb": 0.08, "kenney/nature-kit/tent_detailedopen.glb": 0, "kenney/nature-kit/tent_smallclosed.glb": 0, "kenney/survival-kit/tent.glb": 0 };
function dbDoorFace(g, list, x, y, zFar) { return __ZC(174, 3, this, arguments, new.target); }
var DB_MODEL_DOOR_SIZE = { "kaykit/medieval-hexagon/building_home_a_blue.glb": [0.3, 0.32], "kaykit/medieval-hexagon/building_home_a_red.glb": [0.3, 0.32], "kaykit/medieval-hexagon/building_home_b_red.glb": [0.26, 0.37],
"kaykit/medieval-hexagon/building_church_blue.glb": [0.23, 0.46], "kaykit/medieval-hexagon/building_church_red.glb": [0.23, 0.46],
"kaykit/medieval-hexagon/building_tower_a_blue.glb": [0.22, 0.8], "kaykit/medieval-hexagon/building_tower_a_red.glb": [0.22, 0.8], "kaykit/medieval-hexagon/building_tower_b_blue.glb": [0.2, 0.39],
"kaykit/medieval-hexagon/building_castle_blue.glb": [0.2, 0.19], "kaykit/medieval-hexagon/building_castle_red.glb": [0.2, 0.19], "kaykit/medieval-hexagon/building_windmill_red.glb": [0.2, 0.45],
"kaykit/medieval-hexagon/building_tavern_red.glb": [0.19, 0.32], "kaykit/medieval-hexagon/building_mine_blue.glb": [0.32, 0.39], "kaykit/medieval-hexagon/building_market_red.glb": [0.2, 0.3],
"kenney/graveyard-kit/crypt.glb": [0.46, 0.37], "kaykit/halloween/crypt.glb": [0.46, 0.37], "kenney/graveyard-kit/crypt-small.glb": [0.29, 0.36],
"kenney/city-kit-commercial/building-skyscraper-a.glb": [0.15, 0.76], "kenney/city-kit-commercial/building-skyscraper-b.glb": [0.15, 0.62], "kenney/city-kit-commercial/building-skyscraper-c.glb": [0.15, 0.62],
"kenney/city-kit-commercial/building-skyscraper-d.glb": [0.15, 0.55], "kenney/city-kit-commercial/building-skyscraper-e.glb": [0.15, 0.62] };
function dbDoorMake(spec, gs, k, size) { return __ZC(174, 4, this, arguments, new.target); }
function dbDoorHang(g, spec) {
if (!g || !spec || spec.city || spec.hub || !enterable(spec))
return;
var old = g.userData.dbDoorObj;
if (old) {
g.remove(old);
g.userData.dbDoorObj = null;
}
var def = KIT[spec.archetype], parts = levelParts(def, spec), B = bodyOf(parts), modelled = g.userData.modelled;
if (!modelled && (frontDoorOf(parts) || restylesDoor(spec))) {
delete DB_DOORS[spec.id];
return;
}
var own = modelled && g.userData.dbFile && DB_MODEL_DOOR.hasOwnProperty(g.userData.dbFile) ? DB_MODEL_DOOR[g.userData.dbFile] : null;
var list = modelled ? [modelled] : g.children.filter(function (c) { return c.visible !== false && !c.userData.opening && !c.userData.openings && !c.userData.dbDoor; });
var base = 0, tall = def.size[1];
var MB = null;
if (modelled) {
MB = modelBoxOf(g, [modelled]);
if (!MB.isEmpty()) {
base = MB.min.y;
tall = MB.max.y - MB.min.y;
}
}
var k = Math.max(1, Math.min(1.8, tall * g.scale.y / 10));
var x = modelled ? 0 : (B ? B.x : 0), far = def.size[2] * 2 + 10;
if (own != null && MB && !MB.isEmpty())
x = (MB.min.x + MB.max.x) / 2 + own * (MB.max.x - MB.min.x);
var zs = [-0.6, -0.3, 0, 0.3, 0.6].map(function (o) { return dbDoorFace(g, list, x + o / g.scale.x, base + 1.2 / g.scale.y, far); }).filter(function (v) { return v !== null; }).sort(function (p, q) { return p - q; });
var z = zs.length ? zs[Math.floor(zs.length / 2)] : dbDoorFace(g, list, x, base + 0.5 / g.scale.y, far);
if (z === null)
z = B ? B.z + B.d / 2 : def.size[2] / 2;
var cover = null;
if (own != null && MB && !MB.isEmpty()) {
var Wm = (MB.max.x - MB.min.x) * g.scale.x, fz = DB_MODEL_DOOR_SIZE[g.userData.dbFile] || [0.13, 0.24];
cover = [fz[0] * Wm + 0.3, fz[1] * Wm + 0.15];
}
if (own == null || restylesDoor(spec)) {
var dg = dbDoorMake(spec, g.scale, k, cover);
dg.position.set(x, base, z + 0.07 / g.scale.z);
g.add(dg);
g.userData.dbDoorObj = dg;
}
var a = spec.attrs || {}, sx = (a.s || 1) * (a.w || 1), sz = (a.s || 1) * (a.d || 1), r = spec.rot || 0, lx = x * sx, lz = z * sz;
DB_DOORS[spec.id] = { x: spec.x + lx * Math.cos(r) + lz * Math.sin(r), z: spec.z - lx * Math.sin(r) + lz * Math.cos(r), rot: r };
}
var DB_NEAR = { at: -1e9, x: 0, z: 0, here: null, n: -1, list: [] };
(function () {
if (typeof build === "function") {
var b = build;
build = function (spec) { var g = b.apply(this, arguments); try {
if (g && g.isGroup)
dbDoorHang(g, spec);
}
catch (e) {
if (window.console)
console.warn("[door]", e);
} return g; };
}
if (typeof modelSwap === "function") {
var ms = modelSwap;
modelSwap = function (g, spec, e, F) {
try {
if (!g.userData.modelled && typeof MODELS !== "undefined")
for (var fk in MODELS.files)
if (MODELS.files[fk] === F) {
g.userData.dbFile = fk;
break;
}
}
catch (x) { }
var r = ms.apply(this, arguments);
try {
if (g && g.userData.modelled)
dbDoorHang(g, spec);
}
catch (e) {
if (window.console)
console.warn("[door]", e);
}
return r;
};
}
if (typeof interiorTick === "function") {
var it = interiorTick;
interiorTick = function (dt) {
var r = it.apply(this, arguments);
try {
if (INT || store.inside || !walkMode || (typeof intCool !== "undefined" && intCool > 0))
return r;
var P = camera.position, gy = (typeof terrainY === "function") ? terrainY(P.x, P.z) : 0;
if (P.y - 1.72 - gy > 2)
return r;
var now = performance.now(), N = DB_NEAR;
if (now - N.at > 500 || Math.abs(P.x - N.x) > 10 || Math.abs(P.z - N.z) > 10 || N.here !== (store.here || 0) || N.n !== store.objects.length) {
N.at = now;
N.x = P.x;
N.z = P.z;
N.here = store.here || 0;
N.n = store.objects.length;
N.list.length = 0;
for (var j = 0; j < store.objects.length; j++) {
var oj = store.objects[j], Dj = DB_DOORS[oj.id];
if (!Dj)
continue;
if ((oj.realm || 0) !== N.here)
continue;
if (Math.abs(P.x - Dj.x) > 40 || Math.abs(P.z - Dj.z) > 40)
continue;
N.list.push(oj);
}
}
for (var i = 0; i < N.list.length; i++) {
var o = N.list[i], D = DB_DOORS[o.id];
if (!D)
continue;
if ((o.realm || 0) !== (store.here || 0))
continue;
var dx = P.x - D.x, dz = P.z - D.z;
if (dx * dx + dz * dz > 2.6)
continue;
if (dx * Math.sin(D.rot) + dz * Math.cos(D.rot) < -0.6)
continue;
enterBuilding(o);
return r;
}
}
catch (e) { }
return r;
};
}
})();
