/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(155, function () {
"use strict";
return [
function (spec) {
try {
var here = spec.realm || 0, cx = spec.x || 0, cz = spec.z || 0, R = (+spec.field.r || 60) + 20, list = [];
store.objects.forEach(function (o) {
if (o === spec || o.archetype === "field" || (o.realm || 0) !== here)
return;
if (typeof isPerson === "function" && isPerson(o))
return;
var k = KIT[o.archetype];
if (!k || k.cat === "being")
return;
var a = o.attrs || {}, s = a.s || 1;
var pad = (k.cat === "structure" ? 4 : (/water|lake|pond|river|sea|ocean/.test(o.archetype) ? 3 : 1.2));
var m = (typeof meshes !== "undefined") && meshes[o.id];
if (m && m.parent && !m.userData.field) {
try {
var B = new THREE.Box3().setFromObject(m);
if (isFinite(B.min.x) && B.max.x - B.min.x < 600) {
list.push([B.min.x - pad - cx, B.max.x + pad - cx, B.min.z - pad - cz, B.max.z + pad - cz]);
return;
}
}
catch (e) { }
}
var r = Math.max(k.size[0] * (a.w || 1), k.size[2] * (a.d || 1)) * 0.5 * s + pad;
var dx = o.x - cx, dz = o.z - cz;
if (Math.sqrt(dx * dx + dz * dz) > R + r)
return;
list.push([dx - r, dx + r, dz - r, dz + r]);
});
var streets = [];
if (store.streets && typeof blockOrigin === "function" && typeof BLOCK !== "undefined") {
var h = (BLOCK + STREET) / 2, w = STREET / 2 + 1.5;
store.streets.forEach(function (key) {
var p = String(key).split(":"), o = blockOrigin(+p[0], +p[1]);
var dx = o.x - cx, dz = o.z - cz;
if (Math.abs(dx) > R + h + w || Math.abs(dz) > R + h + w)
return;
streets.push([dx, dz]);
});
}
if (!list.length && !streets.length)
return null;
return function (x, z) {
for (var i = 0; i < list.length; i++) {
var b = list[i];
if (x > b[0] && x < b[1] && z > b[2] && z < b[3])
return true;
}
for (var j = 0; j < streets.length; j++) {
var q = streets[j], ax = Math.abs(x - q[0]), az = Math.abs(z - q[1]);
if (ax <= h + w && az <= h + w && (Math.abs(ax - h) < w || Math.abs(az - h) < w))
return true;
}
return false;
};
}
catch (e) {
return null;
}
},
function (spec) {
if (!spec || !spec.field || !spec.field.hole)
return;
var C = (typeof dreamCluster === "function") ? dreamCluster() : null;
if (!C)
return;
var F = spec.field, width = F.width || F.r;
var hole = Math.max(16, C.spread * 0.3);
spec.x = C.x;
spec.z = C.z;
F.hole = hole;
F.width = width;
F.r = Math.min(450, hole + width);
var area = Math.PI * (F.r * F.r - hole * hole), was = Math.PI * width * width;
F.n = Math.max(F.n0 || F.n, Math.min(FIELD_MAX, Math.round((F.n0 || F.n) * area / Math.max(1, was))));
if (!F.n0)
F.n0 = Math.min(F.n, FIELD_MAX);
},
function () {
var here = store.here || 0, urban = 0, built = 0;
store.objects.forEach(function (o) {
if ((o.realm || 0) !== here || o.archetype === "field")
return;
if (DP_URBAN[o.archetype] && !o.filler)
urban++;
var k = KIT[o.archetype];
if (k && k.cat === "structure" && !o.filler)
built++;
});
return urban ? "city" : (built ? "village" : "wild");
},
function () {
try {
if (typeof scene === "undefined" || !scene)
return;
var kind = dpLandKind();
scene.children.forEach(function (m) {
if (!m.userData || !m.userData.street || m.userData.realmPath)
return;
if (m.userData.dash) {
m.visible = (kind === "city");
return;
}
if (!m.userData.asphalt)
m.userData.asphalt = m.material;
var want = kind === "city" ? m.userData.asphalt : dpLaneMat(kind);
if (m.material !== want)
m.material = want;
});
}
catch (e) {
if (window.console)
console.warn("dream-polish:", e);
}
},
function (spec) {
var a = spec && spec.attrs || {};
if (a.c !== undefined && a.c !== null)
return a.c;
if (typeof NAMED === "undefined")
return null;
var w = String(spec && spec.label || "").toLowerCase().split(/[^a-z]+/);
for (var i = 0; i < w.length; i++) {
var k = w[i] === "golden" ? "gold" : w[i];
if (NAMED[k] !== undefined)
return NAMED[k];
}
return null;
},
function (root, col) {
var main = new THREE.Color(col);
if (typeof LOOK_OFF === "undefined" || !LOOK_OFF)
main.convertSRGBToLinear();
var second = main.clone().multiplyScalar(0.45), done = {};
root.traverse(function (m) {
if (!m.isMesh || !m.material)
return;
var one = function (x) {
var want = /_Main$|^Main/.test(x.name) ? main : (/_Secondary$|^Secondary/.test(x.name) ? second : null);
if (!want)
return x;
if (done[x.uuid])
return done[x.uuid];
var n = x.clone();
n.skinning = x.skinning;
n.color.copy(want);
return (done[x.uuid] = n);
};
m.material = Array.isArray(m.material) ? m.material.map(one) : one(m.material);
});
},
function (chunk, had) {
try {
var low = chunk.toLowerCase(), sentences = low.split(/[.!?;]+/), used = {}, ch = 0;
store.objects.forEach(function (o) {
if (had[o.id] || o.archetype !== "dragon" || o.deity || o.city)
return;
var lab = String(o.label || "dragon").toLowerCase(), word = lab.split(/\s+/).pop();
var k = -1;
sentences.forEach(function (x, i) { if (k < 0 && !used[i] && x.indexOf(lab) > -1)
k = i; });
if (k < 0)
sentences.forEach(function (x, i) { if (k < 0 && !used[i] && x.indexOf(word) > -1)
k = i; });
if (k > -1)
used[k] = 1;
var sen = k > -1 ? sentences[k] : "";
var small = DP_SMALL.test(sen) || DP_SMALL.test(lab) || (o.attrs && o.attrs.s < 1 && !DP_BIG.test(sen));
if (!small && !DP_REST.test(sen))
return;
var c = dpWordColour(o);
o.archetype = "human";
var L = (typeof lookOf === "function") ? lookOf(o) : (o.look || (o.look = {}));
L.species = "dragonbeast";
if (!L.src)
L.src = {};
L.src.species = "dream";
o.attrs = o.attrs || {};
o.attrs.s = small ? 0.9 : (DP_BIG.test(sen) ? 6.5 : 4.5);
if (c !== null && c !== undefined)
o.attrs.c = c;
o.dpSized = 1;
if (typeof refresh === "function")
refresh(o);
ch++;
});
if (ch && typeof save === "function")
save();
}
catch (e) {
if (window.console)
console.warn("dream-polish:", e);
}
},
function () {
try {
var here = store.here || 0, ch = 0;
store.objects.forEach(function (o) {
if (o.archetype !== "dragon" || o.deity || o.city || (o.realm || 0) !== here || o.dpSized)
return;
o.dpSized = 1;
var a = o.attrs || (o.attrs = {}), lab = String(o.label || "").toLowerCase();
if (a.s === undefined) {
if (DP_SMALL.test(lab))
a.s = 0.18;
else if (!DP_BIG.test(lab))
a.s = 0.5;
}
if (a.c === undefined) {
var c = dpWordColour(o);
if (c !== null && c !== undefined)
a.c = c;
}
if (typeof refresh === "function")
refresh(o);
ch++;
});
if (ch && typeof save === "function")
save();
}
catch (e) {
if (window.console)
console.warn("dream-polish:", e);
}
},
function () {
var C = (typeof dreamCluster === "function") ? dreamCluster() : null;
var cx = C ? C.x : (camera ? camera.position.x : 0), cz = C ? C.z : (camera ? camera.position.z : 0);
var r = Math.max(90, Math.min(260, (C ? C.spread : 0) * 1.6 + 50));
var here = store.here || 0, best = 0, bestN = 1e9, s0 = r * 0.3;
for (var k = 0; k < 8; k++) {
var a = k * Math.PI / 4, dx = Math.cos(a), dz = Math.sin(a), n = 0;
if (70 * dz > s0 - 25)
continue;
store.objects.forEach(function (o) { if ((o.realm || 0) !== here || DREAM_GROUND[o.archetype] || DP_AFLOAT[o.archetype])
return; if ((o.x - cx) * dx + (o.z - cz) * dz > s0 - 6)
n++; });
n -= (-dz) * 0.9;
if (n < bestN) {
bestN = n;
best = a;
}
}
var spec = place("shore", "beach", {}, {});
if (!spec)
return null;
spec.x = cx;
spec.z = cz;
spec.rot = 0;
spec.solid = false;
spec.shore = { r: r, dir: best, s0: s0 };
return spec;
},
function (S) {
if (!S || !S.shore)
return;
var F = dpShoreFrame(S), s0 = S.shore.s0, here = S.realm || 0, n = 0, moved = 0;
store.objects.filter(function (o) { return o.archetype === "water" && (o.realm || 0) === here && !o.city && F.along(o) > s0 - 10; })
.forEach(function (o) { if (typeof removeSpec === "function")
removeSpec(o); });
store.objects.forEach(function (o) {
if (o === S || (o.realm || 0) !== here || o.city || o.hub || o.archetype === "field" || o.archetype === "shore")
return;
var a = F.along(o), sd = F.side(o), k = KIT[o.archetype];
if (!k)
return;
var half = Math.max(k.size[0], k.size[2]) * 0.5 * ((o.attrs && o.attrs.s) || 1);
var p = null, rot = null;
if (DP_AFLOAT[o.archetype]) {
if (a < s0 + half + 8) {
p = F.at(s0 + half + 14 + (n++ % 3) * 18, Math.max(-60, Math.min(60, sd)));
rot = S.shore.dir + Math.PI / 2;
}
}
else if (o.archetype === "pier") {
if (Math.abs(a - (s0 + half * 0.6)) > 4) {
p = F.at(s0 + half * 0.6, Math.max(-40, Math.min(40, sd)));
rot = -S.shore.dir + Math.PI / 2;
}
}
else if (o.archetype === "lighthouse") {
if (Math.abs(a - (s0 - half - 4)) > 3) {
p = F.at(s0 - half - 4, sd);
}
}
else if (o.archetype !== "water" && !(typeof isPerson === "function" && isPerson(o) && o.filler)) {
if (a > s0 - half - 3) {
p = F.at(s0 - half - 6 - (moved % 4) * 3, sd);
}
}
else if (typeof isPerson === "function" && isPerson(o) && a > s0 - 2) {
p = F.at(s0 - 4 - (moved % 5) * 2, sd);
}
if (p) {
o.x = p.x;
o.z = p.z;
if (rot !== null)
o.rot = rot;
moved++;
if (typeof refresh === "function")
refresh(o);
}
});
return moved;
},
function (spec) {
var Sh = spec.shore, g = new THREE.Group();
g.userData.id = spec.id;
g.userData.shore = 1;
var r = Sh.r, s0 = Sh.s0, detail = (typeof landOpt === "function") && landOpt("detail");
function flat(geo, mat, y) { var m = new THREE.Mesh(geo, mat); m.rotation.x = -Math.PI / 2; m.position.y = y; m.receiveShadow = true; return m; }
var sg = new THREE.CircleGeometry(r, 72);
if (typeof metreUVs === "function")
metreUVs(sg, "pln", [2 * r, 2 * r]);
var sandT = detail && typeof texOf === "function" ? texOf("sand") : null;
g.add(flat(sg, new THREE.MeshLambertMaterial({ color: sandT ? 0xCDB68A : 0xD8C498, map: sandT, polygonOffset: true, polygonOffsetFactor: -1, polygonOffsetUnits: -2 }), 0.05));
var sea = new THREE.Group();
sea.rotation.y = -Sh.dir - (spec.rot || 0);
g.add(sea);
var wet = flat(new THREE.PlaneGeometry(10, Math.min(2 * r, 1400)), new THREE.MeshLambertMaterial({ color: 0xB8A47C, map: sandT, polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -3 }), 0.07);
wet.position.x = s0 - 4;
sea.add(wet);
var wc = (typeof waterColor === "function" && waterColor()) || 0x2E6E8E;
var water = flat(new THREE.PlaneGeometry(3200, 3200), new THREE.MeshLambertMaterial({ color: wc, transparent: true, opacity: 0.94, polygonOffset: true, polygonOffsetFactor: -3, polygonOffsetUnits: -4 }), 0.12);
water.position.x = s0 + 1600;
sea.add(water);
var shallow = flat(new THREE.PlaneGeometry(14, 3200), new THREE.MeshLambertMaterial({ color: (typeof blend === "function") ? blend(wc, 0x9AE0D8, 0.3) : 0x5AA8B0, transparent: true, opacity: 0.7, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -4, polygonOffsetUnits: -5 }), 0.13);
shallow.position.x = s0 + 7;
sea.add(shallow);
var foams = [];
for (var i = 0; i < 2; i++) {
var fm = new THREE.MeshBasicMaterial({ color: 0xF4F8F8, transparent: true, opacity: 0.75, depthWrite: false });
var f = flat(new THREE.PlaneGeometry(2.2, 3200), fm, 0.15 + i * 0.01);
f.position.x = s0 + 2 + i * 9;
sea.add(f);
foams.push({ m: f, x0: s0, ph: i * 0.5 });
}
g.userData.foam = foams;
g.userData.water = water;
return g;
},
function () {
var gold = mL(0x8A600E), shine = mL(0xB88A20), g = F([P(cone(1.3, .9, 10), gold, 0, .45, 0), P(cone(.9, .6, 9), shine, .25, .32, .2)]);
for (var i = 0; i < 26; i++) {
var a = i * 2.39, r = .4 + (i % 7) * .18;
g.add(P(cyl(.07, .07, .02, 8), gold, Math.cos(a) * r, .02 + (i % 3) * .01, Math.sin(a) * r));
}
g.add(P(box(.7, .45, .45), mL(0x6B4A32), 1.2, .23, .3));
g.add(P(box(.72, .06, .47), gold, 1.2, .46, .3));
g.add(P(sph(.12), mL(0xC0392B), -.5, .62, .3));
g.add(P(sph(.1), mL(0x2F9E6E), .3, .7, -.35));
return g;
},
function (phrase, had) {
if (typeof VOCAB === "undefined")
return null;
var s = " " + phrase + " ", best = null, here = store.here || 0;
store.objects.forEach(function (o) {
var d = KIT[o.archetype];
if (!d || d.cat !== "structure" || o.filler || o.city || o.hub || (o.realm || 0) !== here)
return;
if ((VOCAB[o.archetype] || []).some(function (w) { return s.indexOf(" " + w + " ") > -1; })) {
if (!best || (!had[o.id] && had[best.id]))
best = o;
}
});
return best && typeof enterable === "function" && enterable(best) ? best : null;
},
function (chunk, had) {
try {
var low = " " + (typeof deaccent === "function" ? deaccent(String(chunk || "")) : String(chunk || "")).toLowerCase() + " ";
var m = DP_SETTING.exec(low), b = null;
if (m)
b = dpIndoorOwner(m[1], had);
if (!b && store.dpIndoorId) {
var b0 = specById(store.dpIndoorId);
if (b0 && (b0.nights || []).indexOf(store.session) > -1 && (b0.realm || 0) === (store.here || 0))
b = b0;
m = m || ["", ""];
}
if (!b)
return;
store.dpIndoorId = b.id;
var I = b.inside || (b.inside = { rooms: [], items: [] });
var add = function (k) { if (!I.items.some(function (x) { return x.k === k && !x.room; }))
I.items.push({ k: k, room: null }); };
if (typeof ROOMWORDS !== "undefined")
ROOMWORDS.forEach(function (r) { if (r[1].test(low) && I.rooms.indexOf(r[0]) === -1)
I.rooms.push(r[0]); });
if (typeof ITEMWORDS !== "undefined")
ITEMWORDS.forEach(function (it) { if (it[1].test(low))
add(it[0]); });
DP_ITEMS.forEach(function (it) { if (it[1].test(low))
add(it[0]); });
if (/\b(endless|never-ending|went on forever|kept going|as far as i could see|countless|thousands of)\b/.test(low))
I.endless = true;
if (/\b(huge|vast|enormous|immense|cavernous|grand|great)\b/.test(m[0] + " " + m[1]))
I.big = true;
var FL = (typeof FLOORWORD !== "undefined") ? FLOORWORD : [];
FL.forEach(function (f) { if (f[1].test(low))
I.floor = f[0]; });
store.objects.filter(function (o) {
if (had[o.id] || o === b || o.city || o.hub)
return false;
if (o.archetype === "field" && o.field) {
var k0 = (o.field.of[0] || [])[0];
return !!(DP_FURNISH[k0] || (KIT[k0] && KIT[k0].grown));
}
var k = KIT[o.archetype];
if (!k || k.cat === "being" || k.cat === "structure")
return false;
return !!(DP_FURNISH[o.archetype] || (k.grown && DP_FURN_WORD.test(String(o.label || "").toLowerCase())));
}).forEach(function (o) { if (typeof removeSpec === "function")
removeSpec(o); });
(store.characters || []).forEach(function (c) {
var sp = c.objId && typeof specById === "function" ? specById(c.objId) : null;
if (!sp || had[sp.id] || sp.filler)
return;
c.atId = b.id;
});
b.dpInside = 1;
store.dpStartIn = b.id;
if (String(b.dpText || "").indexOf(low.trim()) < 0)
b.dpText = String(b.dpText || "") + " " + low.trim();
if (typeof INT !== "undefined" && INT && INT.spec === b && typeof rebuildInterior === "function")
rebuildInterior();
if (typeof save === "function")
save();
if (typeof walkMode !== "undefined" && walkMode && !store.inside && typeof enterBuilding === "function") {
delete store.dpStartIn;
enterBuilding(b);
}
}
catch (e) {
if (window.console)
console.warn("dream-polish indoor:", e);
}
},
function (chunk) {
try {
var low = " " + String(chunk || "").toLowerCase() + " ";
if (!DP_CITY_WORDS.test(low) || store.inside)
return;
var here = store.here || 0;
var C = (typeof dreamCluster === "function") ? dreamCluster() : null;
if (!C)
return;
if (store.dpCityAt && store.dpCityAt[here])
return;
(store.dpCityAt || (store.dpCityAt = {}))[here] = 1;
var tall = /\b(skyscrapers?|high-?rises?|tall|towering|tower blocks?|manhattan|new york|downtown|metropolis)\b/.test(low);
var mix = tall ? DP_CITY_TALL : DP_CITY_LOW;
var cb = String(blockKeyOf(C.x, C.z)).split(":").map(Number), made = 0, seed = fieldHash(low) >>> 0;
var taken = store.objects.filter(function (o) { return (o.realm || 0) === here && KIT[o.archetype] && !(typeof isPerson === "function" && isPerson(o)); })
.map(function (o) { var k = KIT[o.archetype], s = (o.attrs && o.attrs.s) || 1; return [o.x, o.z, Math.max(k.size[0], k.size[2]) * 0.5 * s]; });
function clear(x, z, r) { for (var i = 0; i < taken.length; i++) {
var t = taken[i], dx = x - t[0], dz = z - t[1];
if (Math.sqrt(dx * dx + dz * dz) < r + t[2] + 2)
return false;
} return true; }
for (var bx = cb[0] - 1; bx <= cb[0] + 1; bx++)
for (var bz = cb[1] - 1; bz <= cb[1] + 1; bz++) {
if (typeof ensureStreets === "function")
ensureStreets(bx, bz);
var o = blockOrigin(bx, bz), centre = (bx === cb[0] && bz === cb[1]);
var pad = { id: uid(), archetype: "citypad", label: null, attrs: {}, x: o.x, z: o.z, rot: 0, sign: null, note: null, solid: true, detail: 1,
nights: [store.session], addr: null, name: null, named: null, filler: true, scenery: true, dpCity: 1 };
if (here)
pad.realm = here;
store.objects.push(pad);
if (typeof addMesh === "function")
addMesh(pad);
for (var side = 0; side < 4; side++) {
var run = side % 2 ? [-13, 13] : [-43, 43], a = run[0];
while (a < run[1] - 6) {
var k = mix[(seed = (seed * 1103515245 + 12345) >>> 0) % mix.length];
if (!centre && k === "skyscraper" && (seed >>> 8) % 3)
k = "tower";
var K = KIT[k];
if (!K) {
a += 8;
continue;
}
var w = K.size[0], d = Math.min(30, K.size[2]);
if (a + w > run[1] + 2) {
k = "shop";
K = KIT.shop;
w = K.size[0];
d = K.size[2];
if (a + w > run[1] + 2)
break;
}
var ac = a + w / 2, back = 43 - d / 2, x, z, rot;
if (side === 0) {
x = o.x + ac;
z = o.z + back;
rot = 0;
}
else if (side === 1) {
x = o.x + back;
z = o.z - ac;
rot = Math.PI / 2;
}
else if (side === 2) {
x = o.x - ac;
z = o.z - back;
rot = Math.PI;
}
else {
x = o.x - back;
z = o.z + ac;
rot = -Math.PI / 2;
}
a += w + 2;
if (!clear(x, z, Math.max(w, d) * 0.5))
continue;
var spec = { id: uid(), archetype: k, label: null, attrs: {}, x: x, z: z, rot: rot, sign: null, note: null, solid: true, detail: 1,
nights: [store.session], addr: null, name: null, named: null, filler: true, scenery: true, dpCity: 1 };
if (here)
spec.realm = here;
store.objects.push(spec);
taken.push([x, z, Math.max(w, d) * 0.5]);
if (typeof addMesh === "function")
addMesh(spec);
made++;
}
}
}
if (made && typeof save === "function")
save();
if (typeof dpStreets === "function")
dpStreets();
}
catch (e) {
if (window.console)
console.warn("dream-polish city:", e);
}
}
];
});
