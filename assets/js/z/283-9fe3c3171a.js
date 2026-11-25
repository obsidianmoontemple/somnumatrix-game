/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(283, function () {
"use strict";
return [
function (r) {
var out = [];
(store.objects || []).forEach(function (o) {
if ((o.realm || 0) !== r.id || o.filler)
return;
var d = KIT[o.archetype];
if (!d)
return;
var s = (o.attrs && o.attrs.s) || 1, rad = d.cat === "being" ? 1.2 : Math.max(d.size[0] * ((o.attrs && o.attrs.w) || 1), d.size[2] * ((o.attrs && o.attrs.d) || 1)) * s * 0.6 + 1.5;
if (o.archetype === "portal" || o.archetype === "secretdoor")
rad = Math.max(rad, 9);
if (o.scenery)
rad = Math.min(rad, 14);
out.push([o.x - LD.ox, o.z - LD.oz, Math.min(rad, 140)]);
});
return out;
},
function () {
var P = { items: [], R: ldRand(1), lite: !!(typeof LITE !== "undefined" && LITE) };
P.k = function (a, x, z, rot, s, o) { if (!KIT[a])
return null; var it = { t: "k", a: a, x: x, z: z, rot: rot || 0, s: s || 1, o: o || {} }; P.items.push(it); return it; };
P.row = function (a, n, x0, z0, dx, dz, rot, s, o) { for (var i = 0; i < n; i++)
P.k(a, x0 + dx * i, z0 + dz * i, rot, s, o); };
P.ring = function (a, n, r, cx, cz, s, o, face, a0) { for (var i = 0; i < n; i++) {
var t = (a0 || 0) + i / n * Math.PI * 2;
P.k(a, cx + Math.sin(t) * r, cz + Math.cos(t) * r, face ? t + Math.PI : t + Math.PI / 2, s, o);
} };
P.strew = function (a, n, rmin, rmax, seed, s0, s1, o, cx, cz) {
var R = ldRand(seed), m = (P.lite && !(o && o.keep)) ? Math.ceil(n * 0.5) : n;
for (var i = 0; i < n; i++) {
var t = R() * Math.PI * 2, d = rmin + Math.sqrt(R()) * (rmax - rmin), s = s0 + R() * ((s1 || s0) - s0), rr = R() * 6.283;
if (i < m)
P.k(a, (cx || 0) + Math.sin(t) * d, (cz || 0) + Math.cos(t) * d, rr, s, o);
}
};
P.person = function (seed, x, z, rot, o, talk, wander) { var it = { t: "p", seed: seed, x: x, z: z, rot: rot || 0, o: o || {}, talk: talk || null, wander: wander || null }; P.items.push(it); return it; };
P.being = function (a, x, z, rot, s, talk, wander, look) { if (!KIT[a])
return null; var it = { t: "b", a: a, x: x, z: z, rot: rot || 0, s: s || 1, talk: talk || null, wander: wander || null, look: look || null }; P.items.push(it); return it; };
P.sign = function (x, z, rot, lines, card, col) { var it = { t: "s", x: x, z: z, rot: rot || 0, lines: lines, card: card || null, col: col || null }; P.items.push(it); return it; };
P.make = function (x, z, rot, r, fn, solid) { var it = { t: "m", x: x, z: z, rot: rot || 0, r: r || 2, fn: fn, solid: solid || null }; P.items.push(it); return it; };
P.path = function (pts, w, col, lamp, every) { P.items.push({ t: "path", pts: pts, w: w || 3, col: col || 0x6A6458, o: {} }); if (lamp)
ldAlong(pts, every || 16, function (x, z, a, i) { var sd = i % 2 ? 1 : -1; P.k(lamp, x + Math.cos(a) * (w / 2 + 1.2) * sd, z - Math.sin(a) * (w / 2 + 1.2) * sd, a, 1, { small: 1 }); }); };
P.flow = function (pts, w, col, o) { P.items.push({ t: "flow", pts: pts, w: w, col: col, o: o || {} }); };
P.fact = function (x, z, r, name, verb, card) { P.items.push({ t: "f", x: x, z: z, r: r || 3, name: name, verb: verb || "look", card: card }); };
return P;
},
function (pts, every, fn) {
var carry = every * 0.5, n = 0;
for (var i = 1; i < pts.length; i++) {
var ax = pts[i - 1][0], az = pts[i - 1][1], bx = pts[i][0], bz = pts[i][1], L = Math.hypot(bx - ax, bz - az), a = Math.atan2(bx - ax, bz - az);
for (var d = carry; d < L; d += every) {
fn(ax + (bx - ax) * d / L, az + (bz - az) * d / L, a, n++);
}
carry = (carry - L) % every;
if (carry < 0)
carry += every;
}
},
function (pts, w, lift, yfn) {
var P = [], step = 4;
var dense = [pts[0]];
for (var i = 1; i < pts.length; i++) {
var a = pts[i - 1], b = pts[i], L = Math.hypot(b[0] - a[0], b[1] - a[1]), n = Math.max(1, Math.ceil(L / step));
for (var k = 1; k <= n; k++)
dense.push([a[0] + (b[0] - a[0]) * k / n, a[1] + (b[1] - a[1]) * k / n]);
}
var pos = [], idx = [];
dense.forEach(function (p, i) {
var q = dense[Math.min(i + 1, dense.length - 1)], o = dense[Math.max(i - 1, 0)], dx = q[0] - o[0], dz = q[1] - o[1], L = Math.hypot(dx, dz) || 1, nx = -dz / L * w / 2, nz = dx / L * w / 2;
var y1 = yfn(p[0] + nx, p[1] + nz) + lift, y2 = yfn(p[0] - nx, p[1] - nz) + lift;
pos.push(p[0] + nx, y1, p[1] + nz, p[0] - nx, y2, p[1] - nz);
if (i > 0) {
var b = (i - 1) * 2;
idx.push(b, b + 1, b + 2, b + 1, b + 3, b + 2);
}
});
var g = new THREE.BufferGeometry();
g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
g.setIndex(idx);
g.computeVertexNormals();
return g;
},
function (it, x, z) {
var d = KIT[it.a];
if (!d)
return;
if (it.o.solid === false || /^(bonegate|goldengate|gate|estategate|ringarch|torii|moongate|paifang|stargate|bridge|rainbowbridge|celestialstair|chessboard)$/.test(it.a))
return;
if (d.cat === "being" || d.cat === "vehicle" && !it.o.solid)
return;
var big = Math.max(d.size[0], d.size[2]) * it.s;
if (it.o.ring) {
LD.solids.push({ x: x, z: z, r: big * it.o.ring, h: d.size[1] * it.s });
return;
}
if (it.a === "crystalspire") {
LD.solids.push({ x: x, z: z, r: 3.9 * it.s, h: d.size[1] * it.s });
return;
}
if (it.o.small || big < 0.9) {
if (big >= 0.35)
LD.solids.push({ x: x, z: z, r: Math.min(0.4, big * 0.4), h: d.size[1] * it.s });
return;
}
if (d.cat === "nature" && /^(tree|pine|palm|deadtree|bonetree|giantmushroom|hollowtree|elventree|worldtree)$/.test(it.a)) {
LD.solids.push({ x: x, z: z, r: Math.max(0.5, big * 0.08), h: d.size[1] * it.s });
return;
}
if (/^(flowers|grass|glowflowers|wisps|bubbles|mistbank|cloudbank|emberfield|lavaflow|styx|frozenlake|moonpool|fairyring|shardfield|voidshards|dune|dustbowl|kelp|anemones|lightpillar|reeds|leaffall|blossomground|snowfield|lawn|field|pool|pond|koipond|reflectpool|landinglights|rug|puddle|groundpad|citypad|teleportpad|oasis|icecrystals|fairylights|stringlights|festoonlights|papelpicado|spiritlanterns|prayerflags|holosign)$/.test(it.a))
return;
LD.solids.push({ x: x, z: z, rot: it.rot, hw: d.size[0] * it.s / 2, hd: d.size[2] * it.s / 2, h: d.size[1] * it.s });
},
function (g) {
g.updateMatrixWorld(true);
var buckets = {}, keep = [];
g.traverse(function (m) {
if (!m.isMesh || m.isInstancedMesh || m.isSkinnedMesh)
return;
for (var p = m; p && p !== g; p = p.parent)
if (p.userData.ldKeep)
return;
var mt = m.material;
if (!mt || Array.isArray(mt))
return;
var basic = mt.type === "MeshBasicMaterial";
if (!basic && !/^Mesh(Lambert|Standard|Phong|Toon)Material$/.test(mt.type))
return;
var key = mt.type + "|" + (mt.gradientMap ? mt.gradientMap.uuid : "") + "|" + (mt.map ? mt.map.uuid : "") + "|" + (mt.transparent ? (Math.round(mt.opacity * 20)) : "o") + "|" + mt.side + "|" + (!basic && mt.emissive ? mt.emissive.getHex() + ":" + (mt.emissiveIntensity || 1).toFixed(1) : "") + "|" + (mt.flatShading ? 1 : 0) + "|" + (mt.depthWrite ? 1 : 0);
var geo = m.geometry.index ? m.geometry.toNonIndexed() : m.geometry.clone();
geo.applyMatrix4(m.matrixWorld);
var n = geo.attributes.position.count, col = new Float32Array(n * 3), c = mt.color || new THREE.Color(1, 1, 1);
for (var i = 0; i < n; i++) {
col[i * 3] = c.r;
col[i * 3 + 1] = c.g;
col[i * 3 + 2] = c.b;
}
geo.setAttribute("color", new THREE.BufferAttribute(col, 3));
if (!geo.attributes.uv)
geo.setAttribute("uv", new THREE.BufferAttribute(new Float32Array(n * 2), 2));
if (!geo.attributes.normal)
geo.computeVertexNormals();
var b = buckets[key] || (buckets[key] = { mat: mt, list: [], n: 0 });
b.list.push(geo);
b.n += n;
m.userData.ldGone = 1;
});
var out = new THREE.Group();
Object.keys(buckets).forEach(function (k) {
var b = buckets[k], pos = new Float32Array(b.n * 3), nor = new Float32Array(b.n * 3), uv = new Float32Array(b.n * 2), col = new Float32Array(b.n * 3), o = 0;
b.list.forEach(function (q) { pos.set(q.attributes.position.array, o * 3); nor.set(q.attributes.normal.array, o * 3); uv.set(q.attributes.uv.array, o * 2); col.set(q.attributes.color.array, o * 3); o += q.attributes.position.count; q.dispose(); });
var mg = new THREE.BufferGeometry();
mg.setAttribute("position", new THREE.BufferAttribute(pos, 3));
mg.setAttribute("normal", new THREE.BufferAttribute(nor, 3));
mg.setAttribute("uv", new THREE.BufferAttribute(uv, 2));
mg.setAttribute("color", new THREE.BufferAttribute(col, 3));
mg.computeBoundingSphere();
var mt = b.mat.clone();
mt.vertexColors = true;
if (mt.color)
mt.color.setRGB(1, 1, 1);
mt.needsUpdate = true;
var mesh = new THREE.Mesh(mg, mt);
mesh.receiveShadow = true;
mesh.castShadow = false;
mesh.frustumCulled = true;
out.add(mesh);
});
g.children.slice().forEach(function (c) { if (c.userData.ldKeep)
keep.push(c); });
var loose = [];
g.traverse(function (m) {
if (m === g || m.userData.ldGone)
return;
for (var p = m.parent; p && p !== g; p = p.parent)
if (p.userData.ldKeep || p.userData.ldLoose)
return;
if (m.isSprite || m.isPoints || m.isInstancedMesh || m.isLine || (m.isMesh && !m.userData.ldGone)) {
m.userData.ldLoose = 1;
loose.push(m);
}
});
loose.forEach(function (m) {
m.matrixWorld.decompose(m.position, m.quaternion, m.scale);
if (m.parent)
m.parent.remove(m);
out.add(m);
if (m.isInstancedMesh && !m.frustumCulled && !m.userData.noCull && typeof fieldBound === "function")
fieldBound(m, m.count);
});
keep.forEach(function (c) { out.add(c); });
g.traverse(function (m) { if (m.userData.ldGone) {
if (m.material && m.material.dispose && !m.material.userData.ldShared)
m.material.dispose();
} });
return out;
},
function (r) {
var recipe = LD_SETS[r.kind];
if (!recipe)
return;
ldDrop();
var o = (typeof blockOrigin === "function" && typeof PITCH !== "undefined") ? blockOrigin(Math.round(r.x0 / PITCH), 0) : { x: r.x0, z: 0 };
LD.ox = o.x;
LD.oz = o.z;
LD.rid = r.id;
LD.kind = r.kind;
LD.sig = ldSig(r);
LD.solids = [];
LD.talkers = [];
LD.movers = [];
var P = ldPlan();
P.R = ldRand(r.kind.length * 131 + 7);
try {
recipe(P);
}
catch (e) {
if (window.console)
console.warn("land-dress plan:", r.kind, e);
}
var taken = ldTaken(r), placed = [];
var G = new THREE.Group();
G.name = "land-dress-" + r.kind;
G.position.set(LD.ox, 0, LD.oz);
var still = new THREE.Group(), live = new THREE.Group();
P.items.forEach(function (it) {
var need = ldNeed(it);
if (it.t === "k" || it.t === "p" || it.t === "b" || it.t === "s" || it.t === "m") {
if (!ldClear(taken, it.x, it.z, need))
return;
}
try {
ldPut(it, still, live, taken);
}
catch (e) {
if (window.console)
console.warn("land-dress:", it.a || it.t, e);
}
});
var pressed;
try {
pressed = ldPress(still);
}
catch (e) {
if (window.console)
console.warn("land-dress press:", e);
pressed = still;
}
G.add(pressed);
G.add(live);
scene.add(G);
LD.g = G;
},
function (it, still, live, taken) {
var y = ldY(it.x, it.z);
if (it.t === "k") {
var spec = { id: "ld_" + LD.kind + "_" + it.a + "_" + Math.round(it.x) + "_" + Math.round(it.z), archetype: it.a, label: null, attrs: it.s !== 1 ? { s: it.s } : {}, x: 0, z: 0, rot: 0, solid: false, detail: 3, nights: [], city: true, hub: true };
var m = build(spec);
m.position.set(it.x, y + (it.o.y || 0), it.z);
m.rotation.y = it.rot;
var d = KIT[it.a];
if (d.cat === "being" || d.cat === "vehicle" && it.o.live) {
m.userData.ldKeep = 1;
live.add(m);
}
else
still.add(m);
ldSolidsFor(it, it.x, it.z);
return;
}
if (it.t === "p") {
if (typeof wPerson !== "function")
return;
var g = wPerson("ld_" + it.seed, it.o);
g.position.set(it.x, y + (it.o.y || 0), it.z);
g.rotation.y = it.rot;
g.userData.ldKeep = 1;
live.add(g);
var M = { g: g, wander: it.wander, home: [it.x, it.z] };
if (it.wander)
LD.movers.push(M);
if (it.talk)
LD.talkers.push({ p: M, r: 3.4, name: it.talk.name, t: it.talk });
return;
}
if (it.t === "b") {
var bs = { id: "ld_" + LD.kind + "_" + it.a + "_" + Math.round(it.x) + "_" + Math.round(it.z), archetype: it.a, label: null, attrs: {}, x: 0, z: 0, rot: 0, solid: false, detail: 3, nights: [], city: true, look: it.look || undefined };
var bm = build(bs);
bm.scale.multiplyScalar(it.s);
bm.position.set(it.x, y, it.z);
bm.rotation.y = it.rot;
bm.userData.ldKeep = 1;
live.add(bm);
var B = { g: bm, wander: it.wander, home: [it.x, it.z] };
if (it.wander)
LD.movers.push(B);
if (it.talk)
LD.talkers.push({ p: B, r: 3.6, name: it.talk.name, t: it.talk });
return;
}
if (it.t === "s") {
var sg = new THREE.Group();
sg.position.set(it.x, y, it.z);
sg.rotation.y = it.rot;
var c = it.col || ["#2A2018", "#E8D8A8"];
var post = ldMat(0x4A3A2A);
[-1, 1].forEach(function (s) { var p = new THREE.Mesh(new THREE.BoxGeometry(0.12, 1.9, 0.12), post); p.position.set(s * 1.05, 0.95, 0); sg.add(p); });
if (typeof wSign === "function") {
var b = wSign(it.lines, 2.4, 1.05, c[0], c[1]);
b.position.set(0, 1.55, 0.07);
sg.add(b);
}
still.add(sg);
LD.solids.push({ x: it.x, z: it.z, rot: it.rot, hw: 1.2, hd: 0.2, h: 2.1 });
if (it.card)
LD.talkers.push({ x: it.x, z: it.z, r: 3, name: it.lines[0], verb: "read it", card: it.card });
return;
}
if (it.t === "m") {
var mg = new THREE.Group();
mg.position.set(it.x, y, it.z);
mg.rotation.y = it.rot;
var keepOut = it.fn(mg, { y: function (lx, lz) { var c = Math.cos(it.rot), s = Math.sin(it.rot); return ldY(it.x + lx * c + lz * s, it.z - lx * s + lz * c) - y; } });
if (keepOut === true) {
mg.userData.ldKeep = 1;
live.add(mg);
}
else
still.add(mg);
if (it.solid) {
var S = it.solid;
if (S.r)
LD.solids.push({ x: it.x, z: it.z, r: S.r, h: S.h || 3 });
else
LD.solids.push({ x: it.x, z: it.z, rot: it.rot, hw: S.hw, hd: S.hd, h: S.h || 3 });
}
return;
}
if (it.t === "path" || it.t === "flow") {
var runs = [], cur = [];
var dense = [];
for (var i = 1; i < it.pts.length; i++) {
var a = it.pts[i - 1], b = it.pts[i], L = Math.hypot(b[0] - a[0], b[1] - a[1]), n = Math.max(1, Math.ceil(L / 4));
for (var k = (i === 1 ? 0 : 1); k <= n; k++)
dense.push([a[0] + (b[0] - a[0]) * k / n, a[1] + (b[1] - a[1]) * k / n]);
}
dense.forEach(function (p) { if (ldClear(taken, p[0], p[1], it.w * 0.5))
cur.push(p);
else {
if (cur.length > 1)
runs.push(cur);
cur = [];
} });
if (cur.length > 1)
runs.push(cur);
runs.forEach(function (run) {
var lift = it.t === "path" ? 0.06 : (it.o.lift || 0.09);
var geo = ldStrip(run, it.w, lift, ldY);
var mat = it.t === "flow" && it.o.glow ? ldGlowMat(it.col, it.o.op) : ldMat(it.col, it.o.op !== undefined ? { op: it.o.op } : {});
mat.polygonOffset = true;
mat.polygonOffsetFactor = -2;
mat.polygonOffsetUnits = -2;
var m = new THREE.Mesh(geo, mat);
m.receiveShadow = true;
still.add(m);
if (it.t === "flow" && it.o.bank) {
var bg = ldStrip(run, it.w + it.o.bank * 2, 0.04, ldY), bm = ldMat(it.o.bankCol || 0x3A3430);
bm.polygonOffset = true;
bm.polygonOffsetFactor = -1;
bm.polygonOffsetUnits = -1;
still.add(new THREE.Mesh(bg, bm));
}
});
return;
}
if (it.t === "f") {
LD.talkers.push({ x: it.x, z: it.z, r: it.r, name: it.name, verb: it.verb, card: it.card });
}
},
function () {
if (LD.g) {
scene.remove(LD.g);
LD.g.traverse(function (m) {
if (m.geometry && !m.geometry.userData.shared && m.geometry.dispose && !(typeof FIGGEO !== "undefined" && ldShared(m.geometry)))
m.geometry.dispose();
if (m.material && !Array.isArray(m.material) && m.material.map && m.material.map.isCanvasTexture)
m.material.map.dispose();
});
}
LD.g = null;
LD.rid = null;
LD.kind = null;
LD.solids = [];
LD.talkers = [];
LD.movers = [];
LD.near = null;
if (typeof worldPrompt === "function" && LD.prompted) {
worldPrompt(null);
LD.prompted = false;
}
},
function (T) {
if (!T)
return;
if (T.card) {
if (typeof worldCard === "function" && typeof worldFacts === "function")
worldCard(worldFacts(T.card[0], T.card[1], [], T.card[2]));
return;
}
if (T.t && typeof wTalk === "function") {
var p = T.p && T.p.g;
if (p) {
var P = camera.position;
p.rotation.y = Math.atan2(P.x - (LD.ox + p.position.x), P.z - (LD.oz + p.position.z));
}
wTalk(T.t);
LD.near = null;
}
},
function (name, land, who, greet, extra) {
return { name: name, greet: greet, persona: "You are " + who + ", in " + land + ", one of the dream lands of SomnuMatrix that dreamers cross into. Stay in character. Speak warmly and briefly, tell the dreamer about the place around you when asked, and keep everything suitable for all ages." + (extra ? " " + extra : "") };
},
function (n, w, d, col, stem, seed, h) {
return function (G, H) {
var R = ldRand(seed || 9), geo = new THREE.ConeGeometry(0.14, 0.28, 5), sg = new THREE.CylinderGeometry(0.018, 0.018, 1, 3);
geo.rotateX(Math.PI);
geo.translate(0, (h || 0.55) + 0.12, 0);
sg.translate(0, 0.5, 0);
sg.scale(1, h || 0.55, 1);
var fm = new THREE.InstancedMesh(geo, new THREE.MeshLambertMaterial({ color: col }), n), sm = new THREE.InstancedMesh(sg, new THREE.MeshLambertMaterial({ color: stem || 0x4A6A3A }), n), o = new THREE.Object3D();
for (var i = 0; i < n; i++) {
var x = (R() - 0.5) * w, z = (R() - 0.5) * d;
o.position.set(x, H && H.y ? H.y(x, z) : 0, z);
o.rotation.set(0, R() * 6, 0);
var s = 0.7 + R() * 0.6;
o.scale.set(s, s, s);
o.updateMatrix();
sm.setMatrixAt(i, o.matrix);
fm.setMatrixAt(i, o.matrix);
}
G.add(sm);
G.add(fm);
};
},
function (len, w, col) {
return function (G) {
var m = ldMat(col || 0x5A4230), d = new THREE.Mesh(new THREE.BoxGeometry(w, 0.18, len), m);
d.position.set(0, 0.35, -len / 2);
G.add(d);
for (var i = 0; i <= len; i += 3)
[-1, 1].forEach(function (sd) { var p = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 1.6, 6), m); p.position.set(sd * (w / 2 - 0.1), -0.2, -i); G.add(p); });
var rl = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.08, len), m);
rl.position.set(w / 2 - 0.1, 1.1, -len / 2);
G.add(rl);
var r2 = rl.clone();
r2.position.x = -(w / 2 - 0.1);
G.add(r2);
for (var j = 0; j <= len; j += 3)
[-1, 1].forEach(function (sd) { var q = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.8, 0.08), m); q.position.set(sd * (w / 2 - 0.1), 0.75, -j); G.add(q); });
};
},
function (G, x, y, z, s, col) {
var f = new THREE.Mesh(new THREE.ConeGeometry(0.3 * s, 0.9 * s, 7), ldGlowMat(col || 0xFF8A2A, 0.92));
f.position.set(x, y + 0.45 * s, z);
var c = new THREE.Mesh(new THREE.ConeGeometry(0.15 * s, 0.5 * s, 6), ldGlowMat(0xFFE08A));
c.position.set(0, -0.15 * s, 0);
f.add(c);
f.userData.ldAnim = function (m, t) { m.scale.y = 0.92 + 0.1 * Math.sin(t * 2.2 + x); m.rotation.z = 0.06 * Math.sin(t * 1.7 + z); };
G.add(f);
return f;
},
function (P) {
var L = "the Underworld";
P.path([[0, 6], [0, -40]], 4, 0x3A2C26, "brazier", 14);
P.path([[0, -62], [0, -178]], 4.5, 0x3A2C26, "brazier", 16);
P.path([[0, -120], [-60, -160], [-70, -190]], 3, 0x3A2C26);
P.path([[0, -120], [70, -150], [120, -170]], 3, 0x4A3A28);
P.flow([[-300, -58], [-180, -46], [-60, -54], [40, -48], [150, -60], [300, -52]], 16, 0x1C4A50, { glow: 1, bank: 3, bankCol: 0x2A2220, op: 0.85 });
P.flow([[-120, -58], [-140, -100], [-170, -150], [-200, -210]], 5, 0x7A8C98, { op: 0.7 });
P.make(0, -42, 0, 3, ldJetty(14, 3, 0x3A2A1E));
P.k("soulferry", 9, -52, Math.PI / 2, 1, { solid: false });
P.person("charon", 4, -40, 0, { sex: "m", look: { top: 0x2A2A2E, topKind: "shirt", bottom: 0x2A2A2E, shoes: 0x1A1A1A, skin: 0xC8BCA8, hair: 0x8A8A8A, beard: "full", topKind: "robe", hat: "hood", hatColor: 0x2A2A2E } }, ldWho("Charon the ferryman", L, "Charon, the ancient ferryman who poles the dead across the River Styx in his boat", "*leans on his pole* The fare is one coin, dreamer, though the living need not pay it. Where would you go?", "You are gruff, patient and dryly funny; you have seen every kind of soul. You never frighten anyone."));
P.sign(-6, -38, 0, ["The River Styx", "Press E to read"], ["The River Styx", "The river between the living and the dead", ["In Greek myth five rivers run through the underworld: the Styx (hate), the Acheron (woe), the Lethe (forgetting), the Phlegethon (fire) and the Cocytus (wailing).", "Charon the ferryman carried the dead across; the Greeks laid a small coin, an obol, with the dead to pay his fare.", "The gods swore their most solemn oaths by the Styx."]]);
P.k("bonegate", 0, -92, 0, 1);
P.being("cerberus", -10, -88, 0.3, 1.1, { name: "Cerberus", persona: "You are Cerberus, the great three-headed dog who guards the gate of the Underworld in SomnuMatrix. You speak (in this dream) as three heads who interrupt and finish each other's sentences: one grumpy, one sleepy, one cheerful. You let anyone in, but nobody out without good reason. Keep it friendly and suitable for all ages.", greet: "*three heads lift at once* Who goes— —there?— —Oh, hello!" });
P.k("spiritfire", 9, -90, 0, 1);
P.k("spiritfire", -18, -94, 0, 1);
P.k("darkfane", 0, -215, 0, 1.1);
P.k("diningtable", 0, -184, 0, 1.6);
[["minos", "Minos", -4], ["rhada", "Rhadamanthus", 0], ["aeacus", "Aeacus", 4]].forEach(function (j) {
P.person(j[0], j[2], -186.5, 0, { sex: "m", look: { top: 0xE8E0D0, topKind: "robe", bottom: 0xE8E0D0, shoes: 0x6A4A2A, skin: 0xC8A080, hair: 0xD8D8D8, beard: "full", layer: "longcoat", layerColor: 0x6A1A1A } }, ldWho(j[1], L, j[1] + ", one of the three judges of the dead in Greek myth, seated at the bench before the hall of judgement", "*looks up from a great scroll* Another traveller who is not yet dead. Sit, if you like; we judge only the departed.", "You are fair, solemn and kind, and like explaining how the ancient Greeks imagined the afterlife."));
});
P.ring("brazier", 8, 22, 0, -200, 1, { small: 1 }, 1);
P.sign(10, -176, 0, ["The Hall of Judgement", "Press E to read"], ["The judges of the dead", "Minos, Rhadamanthus and Aeacus", ["In Greek myth three kings, famed for justice in life, became judges of the dead.", "Souls who had lived well went on to Elysium; most went to the Asphodel Meadows; the very wicked went down to Tartarus."]]);
P.make(-120, 40, 0, 0, ldBloom(P.lite ? 500 : 1100, 150, 120, 0xE8E4D8, 0x5A6A50, 61, 0.6));
for (var i = 0; i < (P.lite ? 4 : 7); i++)
P.being("ghost", -150 + i * 18, 10 + (i % 3) * 28, i, 1, null, { r: 14, sp: 0.4 });
P.sign(-60, 10, 0.6, ["The Asphodel Meadows", "Press E to read"], ["The Asphodel Meadows", "Where most souls rest", ["In the Odyssey the dead walk a meadow of asphodel, a pale lily-like flower that grows wild round the Mediterranean.", "It was neither punishment nor reward: a quiet, grey place for ordinary souls."]]);
P.k("throne", -70, -200, 0.2, 1);
P.k("throne", -62, -202, 0.2, 1);
P.person("hades", -70, -197, 0.2, { sex: "m", look: { top: 0x1A1A22, bottom: 0x1A1A22, shoes: 0x0E0E10, skin: 0xC0A890, hair: 0x141414, beard: "full", topKind: "robe", hat: "crown", hatColor: 0x8A7A3A } }, ldWho("Hades", L, "Hades, king of the Underworld and god of the dead, in his garden beside his queen", "*rises courteously* A guest from the land of the living. Welcome to my house; mind the dog.", "You are stern, dignified and surprisingly hospitable; you are the god of riches under the earth as well as of the dead. You are not evil, and never threaten anyone."));
P.person("persephone", -62, -199, 0.2, { sex: "f", look: { top: 0x6A1A3A, topKind: "dress", bottom: 0x6A1A3A, shoes: 0x3A2A1A, skin: 0xE8C8A8, hair: 0x3A2010, hairStyle: "long", hat: "flowercrown" } }, ldWho("Persephone", L, "Persephone, queen of the Underworld, who spends part of each year here and part above, bringing spring when she returns", "Six seeds of a pomegranate, and here I am half the year. When I go up, the flowers come with me. Would you like to see my garden?", "You are warm, wise and a little homesick for the sunlight."));
P.make(-56, -212, 0, 3, function (G) {
var tr = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.45, 3, 7), ldMat(0x4A3426));
tr.position.y = 1.5;
G.add(tr);
var cr = new THREE.Mesh(new THREE.IcosahedronGeometry(typeof leafGeo === "function" ? 1.9 : 2.6, 0), ldMat(0x2A4A2A, { flat: 1 }));
cr.position.y = 4.2;
G.add(cr);
if (typeof leafGeo === "function") {
var sy = new THREE.Mesh(leafGeo(3.0), leafMat(0x355A30));
sy.position.y = 4.2;
sy.castShadow = false;
G.add(sy);
}
var R = ldRand(77);
for (var i = 0; i < 14; i++) {
var f = new THREE.Mesh(new THREE.SphereGeometry(0.22, 8, 6), ldMat(0xA8142A));
var a = R() * 6.28, h = 3.2 + R() * 2;
f.position.set(Math.cos(a) * 2.3, h, Math.sin(a) * 2.3);
G.add(f);
}
}, { r: 0.5, h: 6 });
P.fact(-56, -212, 3.5, "Persephone's pomegranate tree", "look", ["The pomegranate", "Persephone's tree", ["In the myth, Hades carried Persephone below. Because she ate pomegranate seeds there, she must return for part of every year.", "While she is below, her mother Demeter grieves and nothing grows: the Greeks' story of winter. When she returns, spring comes."]]);
P.k("fissure", 110, 40, 0.4, 1.6);
P.k("lavaflow", 150, 70, 1, 1.4);
P.k("lavaflow", 95, 95, 2, 1);
P.k("chains", 128, 30, 0, 1);
P.k("chains", 90, 58, 1, 1);
P.ring("spiritfire", 5, 26, 118, 52, 1, null, 0);
P.sign(80, 24, -0.8, ["Tartarus", "Press E to read"], ["Tartarus", "The deep pit", ["Below the Underworld, the Greeks said, lay Tartarus, as far beneath Hades as the sky is above the earth.", "The Titans were shut in it after their war with the gods, and the myths put the great wrongdoers there: Sisyphus with his boulder, Tantalus forever reaching for fruit."]]);
P.k("lightpillar", 150, -170, 0, 1.2);
P.k("tierfountain", 130, -160, 0, 1);
P.strew("tree", 9, 6, 30, 301, 0.9, 1.2, null, 140, -170);
P.make(140, -170, 0, 0, ldBloom(P.lite ? 160 : 320, 50, 40, 0xF4E070, 0x5A8A3A, 71, 0.45));
P.person("elysian", 128, -152, 2.4, { sex: "f", look: { top: 0xF0EAD8, topKind: "dress", bottom: 0xF0EAD8, shoes: 0xC8A060, skin: 0xD8A880, hair: 0xC8A040, hairStyle: "long" } }, ldWho("A hero of Elysium", L, "one of the blessed heroes who rest in the Elysian Fields, a place of sunlight and ease", "Sunlight, even here. This is Elysium. Rest a while; no one hurries in these fields.", "You are peaceful and kind, and talk of the old stories of heroes."), { r: 10, sp: 0.5 });
P.sign(118, -150, 2.2, ["The Elysian Fields", "Press E to read"], ["Elysium", "The fields of the blessed", ["Homer places Elysium at the ends of the earth, where life is easiest: no snow, no storms, only the cool west wind.", "Later writers moved it into the Underworld, as the reward of heroes and the good."]]);
P.strew("deadtree", 26, 40, 280, 401, 0.9, 1.5);
P.strew("rock", 22, 30, 280, 402, 0.8, 2);
P.strew("bonepile", 8, 50, 240, 403, 0.8, 1.2);
P.strew("spiritlanterns", 10, 20, 200, 404, 1, 1);
},
function (P) {
var L = "the Heavens";
P.path([[0, 6], [0, -52]], 5, 0xD8B860, "ornatelamp", 14);
P.path([[0, -70], [0, -160]], 6, 0xD8B860, "ornatelamp", 16);
P.path([[0, -112], [-80, -112]], 4, 0xE8D8A8);
P.path([[0, -112], [70, -112], [110, -60]], 4, 0xE8D8A8);
P.path([[0, -20], [90, -20], [120, -40]], 4, 0xE8D8A8);
P.k("goldengate", 0, -62, 0, 1.1);
P.k("lectern", 6, -55, 0.2, 1, { small: 1 });
P.being("angel", 5, -53, 0.2, 1.05, ldWho("The Gatekeeper", L, "the Gatekeeper of the Heavens, an angel with a great book of every visitor's name, standing at the golden gate", "*turns a page of the great book* There you are. Every dreamer is written here. The gate is open: go in and see."));
P.k("tierfountain", 0, -112, 0, 1.4);
P.ring("flowerbed", 8, 12, 0, -112, 1, { solid: false }, 1);
P.ring("bench", 6, 18, 0, -112, 1, { small: 1 }, 1, 0.26);
P.k("cloudpalace", 0, -200, 0, 1.2);
P.k("goldenhall", -100, -112, Math.PI / 2, 0.9);
P.person("archivist", -84, -108, Math.PI / 2, { sex: "f", look: { top: 0xF4EEDC, topKind: "robe", bottom: 0xF4EEDC, shoes: 0xD8B860, skin: 0xC89878, hair: 0x2A1A10, hairStyle: "bun" } }, ldWho("The Archivist", L, "the Archivist of the Hall of Light, who keeps the records of every good deed", "Every kindness ever done is written in this hall. Would you like to hear one? I have a favourite about a lighthouse keeper."));
P.k("celestialstair", 80, -150, 0.4, 1);
P.k("rainbowbridge", 130, -45, -0.6, 1);
P.ring("lightpillar", 6, 140, 0, -60, 1, null, 0, 0.3);
P.k("gazebo", 60, -90, 0, 1);
P.k("reflectpool", 40, -140, 0, 1.2);
P.k("topiary", 30, -80, 0, 1);
P.k("topiary", -30, -80, 0, 1);
for (var i = 0; i < 5; i++)
P.being("angel", -12 + i * 6, -168 + Math.abs(i - 2) * 2, 0, 1, i === 2 ? ldWho("The choir leader", L, "the leader of a choir of angels on the steps of the cloud palace", "*hums a long, soft note* We sing at sunrise and sunset. Stay and listen, if you like.") : null);
P.person("harpist", 14, -160, -0.4, { sex: "f", look: { top: 0xFFFFFF, topKind: "dress", bottom: 0xFFFFFF, shoes: 0xE8D8A8, skin: 0xE8C8A8, hair: 0xE8C060, hairStyle: "long", hat: "flowercrown" } }, ldWho("The harpist", L, "a harpist who plays on the steps of the cloud palace", "*lets a chord ring out* The harp is one of the oldest instruments there is. There were harps in Mesopotamia nearly five thousand years ago. Shall I play you something slow?"));
P.k("diningtable", -40, -150, 0.3, 1.2);
P.being("pegasus", 60, 10, 1.2, 1, null, { r: 30, sp: 1.2 });
P.being("pegasus", -70, -40, 2, 1, null, { r: 30, sp: 1 });
P.sign(-8, -48, 0, ["The Heavens", "Press E to read"], ["The sky as a home of the gods", "Heavens in many traditions", ["The ancient Greeks said their gods lived on Mount Olympus, a real mountain in Greece (2,918 m), whose top is often above the clouds.", "In Norse myth the gods' home, Asgard, is joined to the world of people by Bifröst, a burning rainbow bridge.", "Clouds are made of tiny drops of water or crystals of ice, so small and light that rising air holds them up."]]);
P.k("floatingisland", -150, -120, 0, 1, { y: 40, solid: false });
P.k("floatingisland", 160, -170, 1, 1.3, { y: 60, solid: false });
P.k("floatingisland", -60, -260, 2, 0.9, { y: 55, solid: false });
P.strew("cloudbank", 26, 30, 300, 501, 0.8, 1.6);
P.strew("flowers", 18, 20, 160, 502, 1, 1.2);
P.strew("tree", 12, 90, 200, 503, 0.9, 1.2);
},
function (P) {
var L = "the Depths";
P.path([[0, 6], [0, -62]], 4, 0xB8A888, "crystalbrazier", 15);
P.path([[0, -30], [-90, -40]], 3, 0xA89878);
P.path([[0, -30], [100, 10]], 3, 0xA89878);
P.k("merpalace", 0, -110, 0, 1.2);
P.being("merman", -7, -68, 0, 1.1, ldWho("A palace guard", L, "a merman guard with a trident at the gate of the mer-palace", "*grounds his trident* Halt, dry-lungs. Ha! Only joking. Breathe easy, it's a dream. The Queen receives visitors in the coral hall."));
P.being("merman", 7, -68, 0, 1.1);
P.being("mermaid", 0, -80, 0, 1.1, ldWho("Queen Maren of the Depths", L, "Queen Maren, ruler of the merfolk of the Depths, gracious and curious about the world above", "Welcome to my waters, traveller. Tell me: is the sky really as blue as they say? We see only its light, far above."));
P.strew("coral", 30, 10, 70, 601, 0.8, 1.6, null, -70, 40);
P.strew("anemones", 16, 8, 60, 602, 0.9, 1.3, null, -70, 40);
P.k("giantclam", -60, 30, 0, 1.4);
P.k("giantclam", -85, 52, 1, 1);
P.strew("kelp", 44, 10, 90, 603, 1, 1.8, null, -160, -60);
P.k("shipwreck", 120, 20, 0.7, 1.1);
P.k("treasurechest", 108, 30, 0.3, 1);
P.k("treasurechest", 130, 6, 2, 0.8);
P.k("sunkenruins", -110, -140, 0, 1.2);
P.ring("marketstall", 5, 16, 70, -60, 1, null, 1);
P.being("mermaid", 70, -46, Math.PI, 1, ldWho("A pearl trader", L, "a mermaid who trades pearls and shells at the reef market", "Pearls, sea-glass, a shell that whispers! Real pearls form when an oyster coats a bit of grit with nacre, layer on layer. It takes years."));
P.being("merman", 58, -68, 0.8, 1, null, { r: 6, sp: 0.5 });
P.person("diver", -20, -20, 0.6, { sex: "m", look: { top: 0xE8A030, topKind: "shirt", bottom: 0x2A2A30, shoes: 0x2A2A30, skin: 0xC89070, hair: 0x2A1A10, hat: "helmet", hatColor: 0xC8B070 } }, ldWho("A diver from the surface", L, "a deep-sea diver and ocean scientist who has come down to study the Depths", "Isn't it something? On the real ocean floor, sunlight runs out at about 200 metres; below a thousand metres it's black, and the only light is what the animals make themselves."), { r: 10, sp: 0.5 });
P.sign(-14, -14, 0.4, ["The Depths", "Press E to read"], ["The deep ocean", "What is really down there", ["The deepest place known is the Challenger Deep in the Mariana Trench, nearly 11,000 m down.", "Sunlight fades out by about 200 m; below about 1,000 m there is none at all.", "Most deep-sea animals make their own light (bioluminescence) to find food, mates, or to hide."]]);
for (var i = 0; i < (P.lite ? 5 : 9); i++)
P.being("fish", -60 + i * 15, -10 + (i % 3) * 12, i, 1, null, { r: 16, sp: 1 });
P.being("turtle", 40, 40, 1, 1.2, null, { r: 20, sp: 0.5 });
P.being("octopus", -48, 22, 0, 1);
P.being("seahorse", -75, 30, 0, 1);
for (var j = 0; j < (P.lite ? 3 : 6); j++)
P.being("jellyfish", -30 + j * 14, -150, 0, 1, null, { r: 10, sp: 0.3 });
P.being("dolphin", 30, -180, 0, 1.2, null, { r: 24, sp: 2 });
P.being("whale", 200, -220, 0.5, 1, null, { r: 40, sp: 1.5 });
P.strew("bubbles", 16, 20, 200, 604, 1, 1);
P.strew("rock", 18, 30, 260, 605, 0.8, 2);
P.strew("coral", 20, 90, 260, 606, 0.8, 1.4);
},
function (P) {
var L = "Faerie";
P.path([[0, 6], [0, -80]], 3, 0x4A5E36, "lanternpost", 14);
P.path([[0, -40], [-80, -10]], 2.5, 0x4A5E36, "lanternpost", 16);
P.path([[0, -40], [60, -70]], 2.5, 0x4A5E36);
P.path([[0, -20], [80, 40]], 2.5, 0x4A5E36);
P.k("fairycastle", 0, -130, 0, 1.1);
P.k("faethrone", 60, -80, -0.6, 1);
P.k("faethrone", 68, -74, -0.6, 1);
P.person("titania", 58, -76, -0.6, { sex: "f", look: { top: 0xB8E0C8, topKind: "dress", bottom: 0xB8E0C8, shoes: 0x8AA870, skin: 0xE8D0B8, hair: 0xE8E0F0, hairStyle: "long", hat: "tiara", hatColor: 0xE8E0F8 } }, ldWho("Titania", L, "Titania, queen of the fairies, as Shakespeare wrote her in A Midsummer Night's Dream (1595 or so)", "A mortal dreamer, in my glade! Sit, sit. The pixies will bring you dew in an acorn cup. What news from the waking world?", "You are graceful, merry and a little vain."));
P.person("oberon", 66, -70, -0.6, { sex: "m", look: { top: 0x2A4A3A, topKind: "robe", bottom: 0x2A4A3A, shoes: 0x3A2A1A, skin: 0xD8B898, hair: 0x1A1A2A, beard: "short", hat: "vinecrown", hatColor: 0x5A8A3A } }, ldWho("Oberon", L, "Oberon, king of the fairies, from A Midsummer Night's Dream", "Welcome, wanderer. Mind where you step: a fairy ring is a door, and not every door lets you out again. Ha! Only teasing.", "You are proud, playful and fond of riddles."));
P.ring("fairyring", 4, 8, 60, -80, 1, null, 0);
P.ring("toadstoolhouse", 6, 22, -80, 10, 1, null, 1);
P.k("well", -80, 10, 0, 1);
P.being("gnome", -72, 4, 0.5, 1, ldWho("A gnome of the village", L, "a cheerful gnome who lives in a toadstool house", "Mind the step, it's a bit springy. Toadstools, you know. We've lived here since the first rain."));
P.being("pixie", -86, 18, 2, 1, null, { r: 8, sp: 1 });
P.being("pixie", -92, 0, 1, 1, null, { r: 8, sp: 1 });
P.being("elf", -66, 22, 3, 1, null, { r: 10, sp: 0.6 });
P.ring("marketstall", 4, 12, 40, 30, 1, null, 1, 0.4);
P.being("elf", 40, 30, 0, 1, ldWho("A fae trader", L, "an elf who trades at the fairy market: moonlight in jars, songs, and wishes (small ones)", "Moonlight by the jar! A song for a smile! Fair trade only, here; a fairy bargain is always kept to the letter."));
P.k("elventree", 100, 60, 0, 1);
P.k("hollowtree", -30, -70, 0, 1.1);
P.k("moonpool", -40, -110, 0, 1.1);
P.k("standingstones", -140, -80, 0, 1);
P.k("faethrone", -140, -80, 0, 0.7);
P.being("unicorn", -120, 40, 1, 1, null, { r: 24, sp: 0.8 });
P.being("stag", 120, -40, 2, 1, null, { r: 20, sp: 0.6 });
P.being("fox", -20, 60, 0, 1, null, { r: 14, sp: 1 });
P.being("owl", -30, -72, 0, 0.8);
P.sign(-7, -14, 0.3, ["Faerie", "Press E to read"], ["Fairy rings", "Real, and the stories about them", ["A fairy ring is a circle of mushrooms. It is real: a fungus grows outward underground from where it started, and its mushrooms come up round the edge.", "Some rings are hundreds of years old and many metres across.", "Folk tales said fairies danced in them at night, and a person who stepped inside might dance for a hundred years."]]);
P.strew("giantmushroom", 16, 30, 220, 701, 0.8, 1.4);
P.strew("glowflowers", 40, 10, 200, 702, 1, 1.4);
P.strew("tree", 34, 90, 280, 703, 0.9, 1.4);
P.strew("wisps", 12, 20, 180, 704, 1, 1);
P.strew("fairyring", 8, 60, 240, 705, 1, 1.2);
P.strew("briar", 10, 120, 260, 706, 1, 1.2);
P.strew("flowers", 20, 20, 200, 707, 1, 1.2);
},
function (P) {
var L = "the Void";
P.path([[0, 6], [0, -60], [30, -110]], 3, 0x5A5A8A, "lanternpost", 14);
P.path([[0, -30], [-70, -50]], 2.5, 0x5A5A8A);
P.path([[0, -30], [70, -10]], 2.5, 0x5A5A8A);
P.k("lighthouse", 30, -120, 0, 1);
P.person("lamplighter", 26, -108, 0, { sex: "f", look: { top: 0x3A3A5A, topKind: "coat", bottom: 0x2A2A3A, shoes: 0x1A1A1A, skin: 0xD8B898, hair: 0xC8C8D8, hairStyle: "bun", hat: "brimmed", hatColor: 0x2A2A3A } }, ldWho("The Lamplighter", L, "the Lamplighter, who keeps the only lighthouse in the Void lit so that lost dreamers can find their way", "There you are. I saw you from the lamp. Nobody is ever truly lost here: walk towards the light and you will find a way."));
P.ring("standingstones", 1, 0, -70, -50, 1.2);
P.ring("monolith", 6, 18, -70, -50, 1, null, 1);
P.k("orrery", -70, -50, 0, 1.2);
P.k("stargate", 70, -10, -1.2, 1);
P.k("hourglass", -20, -90, 0, 1.5);
P.being("floatingeye", -70, -80, 0, 1.2, { name: "The Watcher", persona: "You are the Watcher, a great floating eye in the Void of SomnuMatrix that has seen everything and is never unkind. You speak slowly, in few words, and with gentle wonder. Keep it suitable for all ages.", greet: "...I see you. I have seen you since you first dreamed. Ask." });
P.k("floatingisland", -80, -150, 0, 1, { y: 25, solid: false });
P.k("floatingisland", 90, -170, 1, 1.2, { y: 45, solid: false });
P.k("floatingisland", 160, -40, 2, 0.8, { y: 18, solid: false });
P.k("floatingisland", -170, 30, 3, 1.1, { y: 35, solid: false });
P.k("floatingisland", 20, -260, 4, 1.4, { y: 70, solid: false });
P.k("crystalspire", -130, -110, 0, 1.2);
P.k("crystalspire", 130, -120, 1, 1);
P.sign(-8, -14, 0.3, ["The Void", "Press E to read"], ["Empty space", "Almost nothing, but not quite", ["Space between the stars holds about one atom in every cubic centimetre; between the galaxies, about one in every cubic metre.", "The best vacuum made in a laboratory still holds more than that.", "Even the emptiest space glows faintly with the cosmic microwave background: light left over from about 380,000 years after the Big Bang."]]);
P.strew("voidshards", 24, 20, 260, 801, 0.8, 1.6);
P.strew("orb", 10, 30, 200, 802, 0.8, 1.4, { y: 3 });
P.strew("crystal", 16, 20, 200, 803, 1, 1.6);
P.strew("wisps", 14, 20, 200, 804, 1, 1);
P.strew("monolith", 6, 120, 280, 805, 1, 1.6);
},
function (P) {
if (typeof lglPlan === "function") {
lglPlan(P);
return;
}
var L = "the Mirror World";
P.path([[0, 6], [0, -150]], 5, 0xC8CCD8, "ornatelamp", 14);
P.path([[-90, -60], [90, -60]], 4, 0xC8CCD8, "ornatelamp", 16);
P.k("mirrormaze", 0, -170, 0, 1.2);
P.k("reflectpool", 0, -60, 0, 1.4);
[[24, -26, "cottage"], [24, -44, "house"], [28, -90, "manor"], [24, -118, "cottage"], [60, -80, "teahouse"], [70, -40, "house"]].forEach(function (h) {
P.k(h[2], h[0], h[1], -Math.PI / 2, 1);
P.k(h[2], -h[0], h[1], Math.PI / 2, 1);
});
P.ring("mirrorstand", 10, 16, 0, -60, 1, null, 1);
P.k("clocktower", 0, -100, 0, 0.9);
P.k("chessboard", -80, 30, 0, 5, { solid: false });
P.person("redqueen", -90, 30, Math.PI / 2, { sex: "f", look: { top: 0xB81E22, topKind: "dress", bottom: 0xB81E22, shoes: 0x3A0A0A, skin: 0xE8C8A8, hair: 0x3A1A10, hairStyle: "bun", hat: "crown", hatColor: 0xE8C050 } }, ldWho("The Red Queen", L, "the Red Queen, a chess queen as in Lewis Carroll's Through the Looking-Glass (1871)", "Here, you see, it takes all the running you can do to keep in the same place! Now: are you a pawn? Every pawn may become a queen, if it reaches the eighth square.", "You are brisk, bossy, and fond of rules; never rude."));
P.person("whitequeen", -70, 30, -Math.PI / 2, { sex: "f", look: { top: 0xF4F4F4, topKind: "dress", bottom: 0xF4F4F4, shoes: 0xD8D8D8, skin: 0xF0D8C0, hair: 0xE8E8E8, hairStyle: "long", hat: "crown", hatColor: 0xE8E8F0 } }, ldWho("The White Queen", L, "the White Queen, as in Lewis Carroll's Through the Looking-Glass (1871): kind, muddled and living backwards", "Oh! I'll scream before I've pricked my finger, you know: I live backwards. Why, sometimes I've believed as many as six impossible things before breakfast."));
P.person("twinA", 10, -74, -0.5, { sex: "m", look: { top: 0x3A5AA8, bottom: 0x2A2A3A, hair: 0x2A1A10, hat: "cap", hatColor: 0xC8A040 } }, ldWho("A mirror twin", L, "one of a pair of twins in the Mirror World who copy each other exactly", "I'm the real one. He's the reflection. (He says the same about me.)"));
P.person("twinB", -10, -74, 0.5, { sex: "m", look: { top: 0x3A5AA8, bottom: 0x2A2A3A, hair: 0x2A1A10, hat: "cap", hatColor: 0xC8A040 } });
P.sign(-8, -14, 0.3, ["The Mirror World", "Press E to read"], ["Mirrors", "How they really work", ["A mirror does not swap left and right: it swaps front and back. Your reflection's right hand is on the same side as yours.", "Glass mirrors backed with a thin coat of silver were made practical by the chemist Justus von Liebig in 1835.", "Ancient mirrors were polished metal, such as bronze, or polished stone such as obsidian."]]);
P.strew("shardfield", 8, 90, 240, 901, 1, 1.4);
P.strew("mirrorstand", 14, 60, 240, 902, 1, 1.2);
P.strew("topiary", 14, 30, 200, 903, 1, 1.2);
P.strew("hedge", 8, 110, 240, 904, 1, 1.2);
},
function (P) {
var L = "the Land of the Dead";
P.path([[0, 6], [0, -120]], 4, 0x8A8478, "lanternpost", 12);
P.path([[0, -60], [-80, -60]], 3.5, 0x8A8478, "lanternpost", 14);
P.path([[0, -60], [80, -80]], 3.5, 0x8A8478);
[[-20, -30, "pueblo", Math.PI / 2], [-20, -48, "hacienda", Math.PI / 2], [-20, -74, "pueblo", Math.PI / 2], [20, -34, "hacienda", -Math.PI / 2], [20, -56, "pueblo", -Math.PI / 2], [20, -80, "cottage", -Math.PI / 2]].forEach(function (h) { P.k(h[2], h[0], h[1], h[3], 1); });
P.k("papelpicado", 0, -44, 0, 1.4);
P.k("papelpicado", 0, -66, 0, 1.4);
P.k("ofrenda", -9, -90, 0, 1);
P.k("ofrenda", 9, -90, 0, 1);
P.make(0, -100, 0, 0, ldBloom(P.lite ? 160 : 320, 30, 12, 0xF08A10, 0x4A6A2A, 111, 0.4));
P.k("chapel", 0, -140, 0, 1.1);
P.person("lanternkeeper", 4, -86, 0, { sex: "f", look: { top: 0x2A1A3A, topKind: "dress", bottom: 0x2A1A3A, shoes: 0x1A1A1A, skin: 0xC89068, hair: 0x1A1010, hairStyle: "bun", hat: "flowercrown", hatColor: 0xF08A10 } }, ldWho("The Lantern Keeper", L, "the Lantern Keeper, who lights a candle for every soul remembered by someone in the living world", "Every flame here is someone who is remembered. While anyone remembers them, their lantern burns. Is there someone you would like to light one for?", "You are tender, cheerful and never morbid."));
P.being("skeleton", -6, -58, 0.4, 1, ldWho("A skeleton fiddler", L, "a cheerful skeleton who plays the fiddle in the town square", "*plays a jaunty tune* No ears, no problem! Music goes straight to the bones."));
P.being("skeleton", 0, -60, 0, 1);
P.being("skeleton", 6, -58, -0.4, 1);
P.ring("marketstall", 4, 10, -80, -60, 1, null, 1);
P.k("graveyard", 80, -90, 0, 1.4);
P.k("crypt", 100, -120, 0, 1);
P.k("tomb", 60, -118, 0, 1);
P.k("tomb", 120, -80, 1, 1);
P.strew("gravestone", 20, 4, 30, 1101, 1, 1, null, 80, -90);
P.being("ghost", 86, -96, 0, 1, null, { r: 14, sp: 0.4 });
P.being("ghost", 70, -80, 0, 1, null, { r: 14, sp: 0.4 });
P.sign(-8, -14, 0.3, ["The Land of the Dead", "Press E to read"], ["The Day of the Dead", "Día de Muertos, 1 and 2 November", ["In Mexico, families build ofrendas (home altars) with photographs, candles, food and orange marigolds (cempasúchil) to welcome the spirits of those they loved.", "It is a happy time: a family reunion with those who have died, with sugar skulls, pan de muerto and music.", "UNESCO lists the festival among the world's intangible cultural heritage (2008)."]]);
P.strew("bonetree", 12, 40, 260, 1102, 0.9, 1.3);
P.strew("mistbank", 12, 60, 260, 1103, 1, 1.5);
P.strew("spiritlanterns", 14, 20, 200, 1104, 1, 1);
P.strew("deadtree", 16, 80, 280, 1105, 0.9, 1.4);
P.strew("gravestone", 16, 60, 240, 1106, 1, 1);
},
function (P) {
var L = "the Frozen Realm";
P.path([[0, 6], [0, -90]], 4, 0xD8E4EC, "lanternpost", 14);
P.path([[0, -40], [-70, -10]], 3, 0xD8E4EC, "lanternpost", 16);
P.path([[0, -40], [70, 10]], 3, 0xD8E4EC);
P.path([[0, -60], [90, -70]], 3, 0xD8E4EC);
P.k("icepalace", 0, -140, 0, 1.1);
P.person("steward", -6, -98, 0.2, { sex: "m", look: { top: 0xD8E8F8, topKind: "coat", bottom: 0x8AA8C8, shoes: 0xE8F0F8, skin: 0xE8D0C0, hair: 0xF0F4F8, beard: "full", hat: "crown", hatColor: 0xC8E0F8 } }, ldWho("The Steward of the Ice Palace", L, "the Steward of the Ice Palace, who looks after the palace while its queen is away on the north wind", "Mind the floors, they're polished ice. The Queen is out riding the north wind; I keep the halls swept and the icicles straight."));
P.ring("igloo", 6, 18, -80, -10, 1, null, 1);
P.k("firebarrel", -80, -10, 0, 1);
P.person("fisher", -74, -4, 0.8, { sex: "f", look: { top: 0x8A4A2A, topKind: "coat", bottom: 0x4A3A2A, shoes: 0x3A2A1A, skin: 0xB88860, hair: 0x1A1010, hat: "beanie", hatColor: 0xC83A3A } }, ldWho("An ice fisher", L, "an ice fisher from the igloo village who fishes through holes in the frozen lake", "Cold enough for you? A good igloo is warmer inside than you'd think: snow is full of trapped air, and that keeps the heat in."));
P.k("frozenlake", 70, 20, 0, 1.4);
for (var i = 0; i < (P.lite ? 2 : 4); i++)
P.person("skater" + i, 62 + i * 5, 16 + (i % 2) * 6, i, { sex: i % 2 ? "f" : "m", look: { top: [0xC83A3A, 0x3A6AC8, 0x3AA85A, 0xE8C040][i], topKind: "coat", hat: "beanie", hatColor: 0xFFFFFF } }, null, { r: 9, sp: 1.6 });
P.ring("yurt", 3, 12, 100, -80, 1, null, 1);
P.person("herder", 100, -80, 0, { sex: "m", look: { top: 0x2A4A8A, topKind: "coat", bottom: 0x3A2A1A, shoes: 0x3A2A1A, skin: 0xC89870, hair: 0x1A1010, hat: "beanie", hatColor: 0xC8A030 } }, ldWho("A herder", L, "a herder who keeps mammoths and great elk on the snowfields", "Easy, easy. The mammoths are gentle unless you get between a mother and her calf. Real woolly mammoths lived until about four thousand years ago, on an island in the Arctic called Wrangel."));
P.being("mammoth", 130, -60, 1, 1, null, { r: 20, sp: 0.4 });
P.being("mammoth", 140, -100, 2, 0.8, null, { r: 20, sp: 0.4 });
P.being("stag", 80, -110, 0, 1, null, { r: 16, sp: 0.6 });
P.being("bear", -130, 60, 0, 1, null, { r: 24, sp: 0.5 });
P.being("owl", -20, -60, 0, 0.8);
P.being("frostgiant", -200, -220, 0.6, 1.6);
P.ring("snowman", 4, 10, -30, 30, 1, { small: 1 }, 1);
P.sign(-8, -14, 0.3, ["The Frozen Realm", "Press E to read"], ["Ice and snow", "What is real", ["Snowflakes have six sides because water molecules lock together into a six-sided pattern when they freeze.", "The coldest temperature ever measured on Earth's surface was −89.2 °C, at Vostok Station in Antarctica, on 21 July 1983.", "Ice floats because water expands by about 9% as it freezes."]]);
P.strew("pine", 48, 40, 300, 1201, 0.9, 1.5);
P.strew("icespire", 12, 90, 280, 1202, 0.8, 1.4);
P.strew("icecrystals", 18, 20, 220, 1203, 1, 1.4);
P.strew("rock", 12, 40, 260, 1204, 0.8, 1.6);
},
function (P) {
var L = "Another World";
P.path([[0, 6], [0, -80]], 4, 0x6A8A9A, "lanternpost", 15);
P.path([[0, -40], [-80, -50]], 3, 0x6A8A9A);
P.path([[0, -40], [80, -20]], 3, 0x6A8A9A);
P.k("biodome", 0, -120, 0, 0.8);
P.k("habitat", -36, -90, 0.6, 1);
P.k("habitat", 36, -90, -0.6, 1);
P.k("researchlab", -80, -60, 1.2, 1);
P.ring("marketstall", 4, 12, 80, -20, 1, null, 1);
P.being("alien", 80, -20, 0, 1, ldWho("A trader of the domes", L, "a friendly trader from the settlement of domes on another world, curious about Earth", "Greetings, visitor! You have the look of someone from a blue world. Do you trade? I have a stone that is warm on one side and cold on the other."));
P.being("alien", -6, -96, 0.4, 1, ldWho("The dome keeper", L, "the keeper of the great dome, where the settlement grows its food under glass", "Under the dome we grow everything we eat. Outside, the air is thin, but in here it is like a summer garden. Come in and see."), { r: 6, sp: 0.4 });
P.being("grey", -80, -52, 1.2, 1, null, { r: 6, sp: 0.4 });
P.being("xeno", 40, -140, 2, 1, null, { r: 20, sp: 0.6 });
P.ring("monolith", 7, 16, -60, 40, 1, null, 1);
P.k("moonpool", -60, 40, 0, 1.2);
P.k("planet", -300, -500, 0, 1, { y: 160, solid: false });
P.sign(-8, -14, 0.3, ["Another World", "Press E to read"], ["Other worlds", "What astronomers have found", ["Astronomers have confirmed more than 5,000 planets round other stars since the first round a Sun-like star was found in 1995 (51 Pegasi b).", "Some lie in their star's habitable zone, where water could be liquid on the surface.", "The nearest star to the Sun, Proxima Centauri, about 4.2 light years away, has at least one planet."]]);
var SUIT = function (c, st) { return { top: c, topKind: "shirt", bottom: c, shoes: 0x5A5E66, layer: "jacket", layerColor: st, hat: "helmet", hatColor: 0xE8ECEE }; };
var ONDREN = function (robe, trim, skin) { return { skin: skin || 0x7AB8B0, top: robe, topKind: "robe", bottom: robe, shoes: 0x2A3A3A, layer: "longcoat", layerColor: trim, hair: 0xD8F0EC, hairStyle: "long" }; };
var nd = function (seed, x, z, rot, robe, trim, talk, wander, skin) { return P.person(seed, x, z, rot, { sex: seed.length % 2 ? "m" : "f", scale: 1.32, look: ONDREN(robe, trim, skin) }, talk || null, wander || null); };
P.person("aw_greeter", 7, -10, -0.6, { sex: "f", look: SUIT(0xE8ECEE, 0x2A9A8A) }, ldWho("Mira Castellane, settlement guide", L, "Mira Castellane, the settlement's guide, who meets every visitor at the way in, born on Earth and ten years on this world", "Welcome! Mind your breathing, the air's thin out here. The domes are straight ahead, the market's to the east, and the Ondren's singing stones are west by the moon pool."));
nd("aw_ond_path", -7, -34, 0.2, 0x3A6A8A, 0xC8E8E0, ldWho("Vessa Ul-Thaan, an Ondren walker", L, "Vessa Ul-Thaan, one of the Ondren, the tall slow native people of this world who speak by humming, walking the long road between Ondrevar and the domes", "*a low, warm hum* ...Hello, small quick one. I am walking to the domes. It takes me most of a day. There is no hurry on this world."), { r: 10, sp: 0.25 });
P.person("aw_walker1", 5, -48, 3.1, { sex: "m", look: SUIT(0xD8DCE0, 0xD86A2A) }, null, { r: 12, sp: 0.55 });
P.person("aw_grower1", 12, -104, 0.3, { sex: "f", look: SUIT(0xE0E8DC, 0x4A9A3A) }, ldWho("Ana Okafor, dome grower", L, "Ana Okafor, who grows potatoes, beans and wheat in the great dome, and knows exactly how much water every plant drinks", "Every litre of water in that dome goes round about three hundred times. We drink it, the plants drink it, it rains on the inside of the glass. Want to see the bean towers?"), { r: 5, sp: 0.4 });
P.person("aw_grower2", -12, -106, -0.4, { sex: "m", look: SUIT(0xE0E8DC, 0x4A9A3A) }, null, { r: 5, sp: 0.4 });
P.person("aw_parent", -24, -66, 0.9, { sex: "f", look: SUIT(0xE8E0D0, 0x3A6AB8) }, ldWho("Lena Varga, a settler mother", L, "Lena Varga, a settler who came here with her two children; she mends the habitats' air filters", "Those two were born on this world. They've never seen rain fall from a sky. They think it's the funniest thing I ever told them."));
P.person("aw_kid1", -18, -72, 0, { sex: "m", child: 1, look: SUIT(0xF0D860, 0x3A6AB8) }, null, { r: 6, sp: 0.9 });
P.person("aw_kid2", -16, -68, 2, { sex: "f", child: 1, look: SUIT(0xF08AA8, 0x3A6AB8) }, null, { r: 6, sp: 0.9 });
nd("aw_ond_kid", -13, -75, -1.4, 0x5A8AB8, 0xF0E8C0, null, { r: 6, sp: 0.7 }, 0x8AC8C0);
P.person("aw_hab", 44, -82, -0.6, { sex: "m", look: SUIT(0xDCE0E4, 0x8A8A90) }, null, { r: 5, sp: 0.4 });
P.person("aw_sci1", -68, -72, 1.6, { sex: "f", look: SUIT(0xF4F4F2, 0x6A4AB8) }, ldWho("Dr Ines Navarro, xenobiologist", L, "Dr Ines Navarro, who studies the life of this world in the research laboratory with an Ondren colleague", "The plants here glow because the light is dim: they store sunlight and give a little back at night. We think. Ask my colleague; the Ondren have known for ten thousand years."), { r: 4, sp: 0.35 });
nd("aw_ond_sci", -70, -48, 1.2, 0x2A5A5A, 0xE8D890, ldWho("Tavol Ka-Senn, Ondren scholar", L, "Tavol Ka-Senn, an Ondren scholar who works in the settlers' laboratory and teaches them the old names of every plant", "*hums a rising note* The glow-flowers drink the twin moons' light. We have sung to them for longer than your people have had cities. Now we measure them too. Both are true."));
nd("aw_ond_trade", 86, -12, -2.2, 0x7A4A8A, 0xE8C870, ldWho("Orrin Mal-Vey, an Ondren seed-seller", L, "Orrin Mal-Vey, an Ondren who sells strange seeds and singing crystals at the settlement market", "*a bright, short hum* Seeds of the spiral tree. Plant one, and in eighty of your years it will be taller than the dome. Patience is included at no extra charge."));
P.person("aw_shop1", 76, -24, 0.8, { sex: "f", look: SUIT(0xE8ECEE, 0xC84A4A) }, null, { r: 5, sp: 0.45 });
P.person("aw_shop2", 84, -28, -0.4, { sex: "m", look: SUIT(0xD8DCE0, 0x2A9A8A) }, null, { r: 5, sp: 0.45 });
nd("aw_ond_shop", 74, -14, 1.8, 0x3A6A4A, 0xD8E8F0, null, { r: 5, sp: 0.25 });
nd("aw_ond_elder", -68, 46, 2.4, 0xE8E0C8, 0x6AD8C8, ldWho("Aeloth Sun-Vael, Ondren elder", L, "Aeloth Sun-Vael, an Ondren elder who keeps the ring of singing stones by the moon pool, very old, very patient and very kind", "*a long, deep hum that you feel in your chest* The stones sing when the moons rise. Each Ondren knows one note; together we make the whole song. Will you stand in the ring and listen?"), null, 0x6AA8B8);
nd("aw_ond_sing1", -52, 30, -0.8, 0x3A5A8A, 0xC8E8F0, null, { r: 4, sp: 0.2 });
nd("aw_ond_sing2", -48, 46, -1.8, 0x5A3A7A, 0xF0D8A0, null, { r: 4, sp: 0.2 });
nd("aw_ond_sing3", -72, 30, 0.8, 0x2A6A6A, 0xE8E8D0, null, { r: 4, sp: 0.2 });
nd("aw_ond_herd", 116, -112, 0.5, 0x6A5A3A, 0xD8C8A0, ldWho("Kel Ur-Doran, an Ondren herder", L, "Kel Ur-Doran, an Ondren herder who walks the plain with the long-legged beasts of this world", "*hums low* The beasts follow the song, not the stick. I hum, they come. Your people shout. That is why your beasts run away."), { r: 14, sp: 0.3 });
P.being("xeno", 126, -118, 1, 1, null, { r: 16, sp: 0.5 });
P.being("xeno", 108, -126, 2, 0.9, null, { r: 16, sp: 0.5 });
P.person("aw_cutter", -20, -118, -1.4, { sex: "m", look: SUIT(0xC8CCD0, 0xE8A030) }, ldWho("Tomas Brandt, crystal-cutter", L, "Tomas Brandt, a settler who cuts singing crystals from the great clusters, only with the Ondren's leave", "You only take what the cluster lets go of. The Ondren showed me: tap it, and the piece that rings clear is the one that's ready."));
nd("aw_ond_road", -40, -46, -1.4, 0x4A6A9A, 0xE0E8F0, null, { r: 14, sp: 0.25 });
P.person("aw_walker2", 38, -30, 1.2, { sex: "f", look: SUIT(0xE0E4E8, 0x8A4AB8) }, null, { r: 14, sp: 0.5 });
P.strew("alienflora", 46, 20, 260, 1301, 0.8, 1.6);
P.strew("crystalspire", 14, 60, 280, 1302, 0.8, 1.4);
P.strew("standingstones", 4, 120, 240, 1303, 1, 1);
P.strew("rock", 16, 30, 260, 1304, 0.8, 1.8);
P.strew("glowflowers", 20, 20, 180, 1305, 1, 1.4);
},
function (P) {
var L = "the Burning Lands";
P.path([[0, 6], [0, -95]], 4, 0x3A2A22, "crystalbrazier", 14);
P.path([[0, -40], [70, -10]], 3, 0x3A2A22, "brazier", 14);
P.path([[0, -60], [-80, -70]], 3, 0x3A2A22);
P.k("firepalace", 0, -140, 0, 1.2);
P.flow([[-260, -50], [-120, -40], [-40, -52], [60, -46], [200, -60], [300, -48]], 10, 0xFF5A1A, { glow: 1, bank: 2, bankCol: 0x1A1210 });
P.k("bridge", 0, -48, 0, 1);
P.being("fireelemental", -8, -110, 0.3, 1.2, ldWho("A palace warden", L, "a fire elemental who guards the Fire Palace, warm-hearted though made of flame", "*crackles politely* Welcome, small cool one. Stay on the paths: the ground is warm, and in places it is very warm."));
P.being("fireelemental", 8, -110, -0.3, 1.2);
P.k("forge", 70, -6, -1.2, 1.2);
P.k("forge", 82, 4, -1.6, 1);
P.k("weaponrack", 76, -18, -1.2, 1);
P.k("weaponrack2", 90, -8, -1.6, 1);
P.being("dwarf", 66, 0, -1.2, 1, ldWho("A smith of the forges", L, "a dwarf smith who works the great forges of the Burning Lands", "*sets down the hammer* Iron melts at about 1,538 degrees. Lava's not that hot, mostly; we stoke the forge harder than any volcano."));
P.being("dwarf", 80, 10, -1.6, 1, null, { r: 4, sp: 0.4 });
P.k("volcano", -180, -220, 0, 1.6, { ring: 0.42 });
P.being("phoenix", -60, -100, 0, 1.2, { name: "The Phoenix", persona: "You are the Phoenix of the Burning Lands in SomnuMatrix: an ancient firebird who is reborn from her own ashes. You are serene, kind and speak in a few warm words. Keep it suitable for all ages.", greet: "*her feathers shimmer like embers* I have been ash a hundred times, and every time I rise. What would you ask of me?" });
P.sign(-8, -14, 0.3, ["The Burning Lands", "Press E to read"], ["Lava and fire", "What is real", ["Most lava erupts at about 700 to 1,200 °C. Runny basalt lava, the kind in Hawaii, is the hottest.", "Obsidian is volcanic glass: lava that cooled so quickly no crystals could form.", "The phoenix is a bird of Greek legend (from older Egyptian stories of the bennu bird) that burns and is reborn from its ashes."]]);
P.strew("obsidianspire", 18, 40, 260, 1401, 0.8, 1.5);
P.strew("emberfield", 12, 30, 240, 1402, 1, 1.4);
P.strew("firepillar", 8, 60, 240, 1403, 1, 1.2);
P.strew("rock", 22, 30, 280, 1404, 0.8, 2);
P.strew("lavaflow", 6, 110, 260, 1405, 1, 1.2);
},
function (P) {
var L = "Among the Stars";
P.path([[0, 6], [0, -80]], 4, 0xA8A8B0, "lanternpost", 15);
P.path([[0, -40], [-70, -40]], 3, 0xA8A8B0);
P.path([[0, -40], [70, -60]], 3, 0xA8A8B0);
P.k("researchlab", 0, -110, 0, 1);
P.make(20, -90, 0, 3, function (G) {
var m = ldMat(0xD8D8E0), d = ldMat(0x2A2A34);
var base = new THREE.Mesh(new THREE.CylinderGeometry(0.8, 1, 1.2, 10), d);
base.position.y = 0.6;
G.add(base);
var tube = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.6, 5, 14), m);
tube.position.set(0, 2.6, -0.6);
tube.rotation.x = 0.7;
G.add(tube);
var lens = new THREE.Mesh(new THREE.CircleGeometry(0.44, 14), ldGlowMat(0x8AB8FF, 0.8));
lens.position.set(0, 4.5, -2.2);
lens.rotation.x = -0.87;
G.add(lens);
}, { r: 1.1, h: 4 });
P.person("astronomer", 16, -88, 0.4, { sex: "f", look: { top: 0xF4F4F4, topKind: "coat", bottom: 0x2A2A3A, shoes: 0x2A2A2A, skin: 0x8A5A3A, hair: 0x1A1010, hairStyle: "bun", layer: "labcoat" } }, ldWho("The astronomer", L, "an astronomer who keeps the observatory among the stars", "Look up: that light left some of those stars before there were people on Earth. Even sunlight is eight minutes old by the time it reaches you."));
P.k("orrery", -70, -40, 0, 1.4);
P.k("satdish", 50, -130, 0, 1.2);
P.k("satdish", -50, -130, 0, 1);
P.k("landinglights", 70, -60, 0, 1);
P.k("shuttle", 70, -60, 0.4, 1);
P.person("pilot", 62, -52, -0.8, { sex: "m", look: { top: 0x2A3A5A, topKind: "shirt", bottom: 0x2A3A5A, shoes: 0x1A1A1A, skin: 0xD8B898, hair: 0x3A2A1A, hat: "cap", hatColor: 0x2A3A5A } }, ldWho("A shuttle pilot", L, "a shuttle pilot resting between flights among the stars", "She's a sweet ship. From here you can see the whole Milky Way edge-on: that bright band is the disc of our own galaxy, a hundred thousand light years across."));
P.being("spacewalker", -30, -60, 0, 1, null, { r: 18, sp: 0.4 });
P.being("spacewalker", 40, 30, 2, 1, null, { r: 18, sp: 0.4 });
P.k("planet", -260, -420, 0, 1, { y: 140, solid: false });
P.k("planet", 320, -380, 0, 0.6, { y: 90, solid: false });
P.k("floatingisland", -120, -160, 0, 1, { y: 30, solid: false });
P.sign(-8, -14, 0.3, ["Among the Stars", "Press E to read"], ["The stars", "What is real", ["Sunlight takes about 8 minutes 20 seconds to reach the Earth.", "The nearest star after the Sun is Proxima Centauri, about 4.2 light years away: its light set out over four years ago.", "On a clear, dark night a person can see roughly 2,500 stars with their own eyes."]]);
P.strew("crater", 10, 60, 280, 1501, 1, 1.6);
P.strew("moonrock", 28, 20, 260, 1502, 0.8, 1.6);
P.strew("starcrystal", 22, 20, 220, 1503, 1, 1.4);
P.strew("rock", 16, 30, 260, 1504, 0.8, 1.8);
},
function (P) {
if (typeof wslPlan === "function") {
wslPlan(P);
return;
}
var L = "the Wasteland";
P.path([[0, 6], [0, -100]], 5, 0x5A5246, "streetlight", 18);
P.path([[0, -60], [-80, -60]], 4, 0x5A5246);
P.path([[0, -60], [90, -40]], 4, 0x5A5246);
P.ring("shanty", 8, 28, 0, -70, 1, null, 1, 0.2);
P.k("watertower", -22, -90, 0, 1);
P.k("soupkitchen", 24, -92, -0.6, 1);
P.k("falloutshelter", 0, -118, 0, 1);
P.ring("marketstall", 4, 10, 0, -60, 1, null, 1, 0.4);
P.k("firebarrel", 0, -60, 0, 1);
P.k("firebarrel", -14, -40, 0, 1);
P.k("firebarrel", 14, -80, 0, 1);
P.row("barricade", 5, -40, -30, 20, 0, 0, 1);
P.k("watchtower", 44, -30, 0, 0.8);
P.person("trader", 6, -54, Math.PI, { sex: "f", look: { top: 0x6A5A3A, topKind: "coat", bottom: 0x4A4030, shoes: 0x2A2018, skin: 0xC89068, hair: 0x6A3A1A, hat: "bandana", hatColor: 0x8A2A1A } }, ldWho("Rook the trader", L, "Rook, who trades at the market of Haven, a town built from scrap in the Wasteland", "Water, batteries, seeds, stories: everything's for trade in Haven. Seeds are worth most. Things grow again, if you're patient."));
P.person("cook", 24, -86, -0.6, { sex: "m", look: { top: 0xD8D0C0, topKind: "shirt", bottom: 0x4A4030, shoes: 0x2A2018, skin: 0x8A5A3A, hair: 0x1A1010, beard: "short", layer: "apron", layerColor: 0xE8E0D0 } }, ldWho("The soup cook", L, "the cook at Haven's soup kitchen, who feeds anyone who comes, no questions asked", "Bowl's on the house. Always is. Bean and whatever-we-grew-this-week. Sit by the barrel, it's warm."));
P.person("lookout", 44, -30, 0, { sex: "f", look: { top: 0x4A5A3A, topKind: "coat", bottom: 0x3A3A2A, shoes: 0x2A2018, skin: 0xE8C8A8, hair: 0xC8A060, hat: "cap", hatColor: 0x4A5A3A }, y: 0 }, ldWho("The lookout", L, "the lookout of Haven, who watches the road from the tower", "Road's quiet. Dust storm maybe by evening. Good to see a friendly face."));
P.being("scavenger", -30, -20, 1, 1, null, { r: 20, sp: 0.6 });
P.being("scavenger", 40, -100, 2, 1, null, { r: 20, sp: 0.6 });
P.being("dog", 10, -48, 0, 1, null, { r: 10, sp: 1 });
P.k("brokenhighway", 120, -150, 0.6, 1);
P.k("collapsedtower", -160, -200, 0, 1);
P.k("collapsedtower", 180, -230, 1, 0.9);
P.k("collapsedtower", -60, -280, 2, 1.1);
P.sign(-10, -14, 0.3, ["Haven", "Press E to read"], ["Haven", "A town of what was left", ["Everything here was rebuilt from scrap: roofs of car bonnets, walls of pallets, a water tower made from an old tank.", "Its first rule: share the water. Its second: plant something.", "Its people trade, mend, and keep a lamp in every window."]]);
P.strew("wreckedcar", 16, 40, 260, 1601, 1, 1);
P.strew("scrapheap", 10, 60, 260, 1602, 1, 1.3);
P.strew("deadtree", 14, 40, 280, 1603, 0.9, 1.3);
P.strew("radsign", 5, 70, 200, 1604, 1, 1);
P.strew("rock", 14, 30, 260, 1605, 0.8, 1.8);
P.strew("dustbowl", 6, 100, 280, 1606, 1, 1.4);
},
function (P) {
if (typeof edsRecipe === "function") {
edsRecipe(P);
return;
}
var L = "the Endless Desert";
P.path([[0, 6], [0, -70]], 4, 0xC8B080, "lantern", 14);
P.path([[0, -50], [-80, -40]], 3, 0xC8B080);
P.path([[0, -50], [80, -30]], 3, 0xC8B080);
P.k("oasis", 0, -100, 0, 1.4);
P.ring("palm", 10, 26, 0, -100, 1, null, 0, 0.2);
P.k("well", -20, -70, 0, 1);
P.person("waterseller", -17, -68, 0.6, { sex: "m", look: { top: 0xF0E8D8, topKind: "robe", bottom: 0xF0E8D8, shoes: 0x8A6A4A, skin: 0x9A6A4A, hair: 0x1A1010, beard: "full", hat: "bandana", hatColor: 0xF0E8D8 } }, ldWho("The water-seller", L, "the water-seller at the oasis well, who greets every traveller", "Peace be with you, traveller. Drink: the first cup is always free. Out there the sand goes on for days."));
P.ring("bedouintent", 5, 20, -90, -30, 1, null, 1);
P.person("caravan", -90, -30, 0, { sex: "f", look: { top: 0x3A2A6A, topKind: "robe", bottom: 0x3A2A6A, shoes: 0x6A4A2A, skin: 0xB88060, hair: 0x1A1010, hat: "bandana", hatColor: 0x6A1A3A } }, ldWho("The caravan leader", L, "the leader of a camel caravan camped at the oasis", "Our camels can go a week without water in the heat; they don't store it in their humps, though. The humps are fat. We leave at dusk, when it's cool."));
P.being("camel", -70, -12, 1, 1, null, { r: 8, sp: 0.4 });
P.being("camel", -108, -14, 2, 1, null, { r: 8, sp: 0.4 });
P.being("camel", -60, -44, 0.5, 1);
P.ring("marketstall", 6, 14, 80, -30, 1, null, 1);
P.k("marketawning", 80, -30, 0, 1);
P.person("spicer", 80, -18, Math.PI, { sex: "m", look: { top: 0x8A2A1A, topKind: "robe", bottom: 0xE8D8C0, shoes: 0x6A4A2A, skin: 0xA87050, hair: 0x1A1010, beard: "short", hat: "bandana", hatColor: 0xE8C040 } }, ldWho("A spice merchant", L, "a spice merchant in the oasis bazaar", "Saffron, cumin, cinnamon! Saffron is the dearest spice in the world: it is the threads of a crocus flower, picked by hand, and it takes about 150,000 flowers to make a kilo."));
P.person("weaver", 92, -40, -2, { sex: "f", look: { top: 0x2A6A6A, topKind: "robe", bottom: 0x2A6A6A, shoes: 0x6A4A2A, skin: 0xB88060, hair: 0x1A1010, hat: "bandana", hatColor: 0xE8A030 } }, null, { r: 6, sp: 0.4 });
P.k("pyramid", -220, -300, 0.3, 1.4, { solid: false });
P.being("sphinx", -150, -230, 0.3, 1.8);
P.k("sandpillars", 160, -160, 0, 1.2);
P.sign(-8, -14, 0.3, ["The Endless Desert", "Press E to read"], ["Deserts", "What is real", ["A desert is a place with very little rain, less than about 250 mm a year, not necessarily a hot one.", "The largest hot desert is the Sahara, about 9 million square km; the largest desert of all is Antarctica.", "An oasis is where water from underground reaches the surface, so palms and gardens can grow."]]);
P.strew("dune", 22, 60, 300, 1701, 1, 1.6);
P.strew("rock", 14, 40, 260, 1702, 0.8, 1.6);
P.strew("cactus", 10, 40, 220, 1703, 1, 1.2);
P.strew("palm", 8, 60, 200, 1704, 0.9, 1.2);
},
function (P) {
var L = "the Orbital";
P.path([[0, 6], [0, -90]], 5, 0x4A5460, "lanternpost", 14);
P.path([[-90, -50], [90, -50]], 4, 0x4A5460, "lanternpost", 16);
P.k("controltower", 0, -120, 0, 1);
P.k("hangar", 80, -90, -0.4, 1);
P.k("habitat", -50, -90, 0.4, 1);
P.k("habitat", -80, -40, 1, 1);
P.k("reactor", -110, -110, 0, 0.9);
P.k("solarfarm", 120, 20, 0, 1.2);
P.k("satdish", -30, -140, 0, 1.2);
P.row("console", 4, -9, -70, 6, 0, 0, 1);
P.person("commander", 0, -66, Math.PI, { sex: "f", look: { top: 0x1A2A4A, topKind: "shirt", bottom: 0x1A2A4A, shoes: 0x1A1A1A, skin: 0x8A5A3A, hair: 0x1A1010, hairStyle: "bun", layer: "jacket", layerColor: 0x2A3A6A } }, ldWho("The station commander", L, "the commander of the Orbital, a great station circling a world", "Welcome aboard. We go round once every ninety minutes or so, like the real space station: sixteen sunrises a day. You get used to it."));
P.being("android", -9, -73, 0, 1);
P.being("android", 9, -73, 0, 1);
P.person("tech", 82, -74, 0, { sex: "m", look: { top: 0xE8A030, topKind: "shirt", bottom: 0x3A3A40, shoes: 0x2A2A2A, skin: 0xE8C8A8, hair: 0x6A3A1A, hat: "cap", hatColor: 0xE8A030 } }, ldWho("A hangar technician", L, "a technician who services shuttles in the hangar of the Orbital", "Mind the fuel lines. This one's due out at the top of the hour. Want to see how a docking clamp works?"));
P.k("shuttle", 60, -60, -0.4, 1);
P.k("starship", 140, -130, 0.5, 1, { solid: false });
P.row("cryopod", 4, -60, -110, 4, 0, 0.4, 1);
P.being("robot", -40, -30, 0, 1, null, { r: 20, sp: 0.8 });
P.being("robot", 40, -20, 0, 1, null, { r: 20, sp: 0.8 });
P.k("teleportpad", -60, -10, 0, 1);
P.k("forcefield", 0, -150, 0, 1.4);
P.k("spaceelevator", -260, -400, 0, 1, { solid: false });
P.sign(-8, -14, 0.3, ["The Orbital", "Press E to read"], ["Life in orbit", "The real space station", ["The International Space Station circles the Earth about 400 km up at roughly 28,000 km/h, once every 92 minutes or so.", "Its crew see about sixteen sunrises and sixteen sunsets every day.", "People have lived aboard it without a break since November 2000."]]);
P.strew("landinglights", 8, 40, 200, 1801, 1, 1);
P.strew("satdish", 6, 80, 240, 1802, 0.8, 1.2);
P.strew("solarfarm", 6, 120, 280, 1803, 1, 1.2);
},
function (P) {
var L = "the City to Come";
P.path([[0, 6], [0, -120]], 8, 0x2A2E3A, "streetlight", 16);
P.path([[-120, -60], [120, -60]], 8, 0x2A2E3A, "streetlight", 16);
[[-30, -30], [30, -30], [-30, -95], [30, -95], [-80, -30], [80, -30], [-80, -95], [80, -95], [-130, -30], [130, -95]].forEach(function (q, i) { P.k("skyscraper", q[0], q[1], (q[0] < 0 ? 1 : -1) * Math.PI / 2, 0.8 + (i % 3) * 0.15); });
P.k("tierfountain", 0, -60, 0, 1.2);
P.ring("pottedplant", 8, 10, 0, -60, 1, { small: 1 }, 1);
P.ring("bench", 4, 14, 0, -60, 1, { small: 1 }, 1, 0.4);
P.k("tramstop", 8, -14, Math.PI / 2, 1);
P.k("tram", 12, -40, 0, 1, { solid: false });
P.k("holosign", -14, -48, 0.6, 1);
P.k("holosign", 14, -74, -0.6, 1);
P.k("billboard", -40, -60, Math.PI / 2, 1);
P.k("neonsign", 40, -60, -Math.PI / 2, 1);
P.row("vendingmachine", 3, -12, -82, 1.4, 0, 0, 1);
P.k("booth", 12, -86, -Math.PI / 2, 1);
P.person("barista", 15, -86, -Math.PI / 2, { sex: "f", look: { top: 0x3A2A6A, topKind: "shirt", bottom: 0x1A1A2A, shoes: 0xE8E8F0, skin: 0xE8C8A8, hair: 0xC83AA8, hairStyle: "short", layer: "apron", layerColor: 0x1A1A2A } }, ldWho("A coffee-cart owner", L, "the owner of a coffee cart on the main plaza of the City to Come", "Morning! Or evening; the lights never go off here. Oat flat white? The beans are grown in the tower farms, forty floors up."));
P.person("guide", -6, -20, 0, { sex: "m", look: { top: 0xE8E8F0, topKind: "coat", bottom: 0x3A3A4A, shoes: 0x1A1A2A, skin: 0x8A5A3A, hair: 0x1A1010 } }, ldWho("A city guide", L, "a guide who shows visitors round the City to Come", "Welcome to the city to come! Every roof grows food, every window makes power, and the trams run all night. Where shall we start?"), { r: 8, sp: 0.6 });
for (var i = 0; i < (P.lite ? 3 : 6); i++)
P.person("walker" + i, -20 + i * 8, -50 - (i % 2) * 20, i, { sex: i % 2 ? "f" : "m" }, null, { r: 16, sp: 1 });
P.being("android", 20, -40, 2, 1, null, { r: 12, sp: 0.8 });
P.being("cyborg", -24, -70, 1, 1, null, { r: 12, sp: 0.8 });
P.being("drone", 0, -40, 0, 1, null, { r: 20, sp: 2 });
P.k("hovercar", -40, -120, 0.4, 1, { y: 6, solid: false });
P.k("hovercar", 60, -20, 2, 1, { y: 9, solid: false });
P.k("hovercar", 100, -140, 1, 1, { y: 14, solid: false });
P.sign(-14, -10, 0.3, ["The City to Come", "Press E to read"], ["Cities of the future", "Ideas being tried today", ["Vertical farms grow food indoors in stacked layers under LED light, using far less water than fields.", "Many cities are adding trams again: one tram can carry as many people as dozens of cars.", "Green roofs, covered in plants, keep buildings cooler in summer and soak up rain."]]);
P.strew("pottedplant", 20, 30, 200, 1901, 1, 1.3, { small: 1 });
P.strew("streetlight", 16, 40, 220, 1902, 1, 1);
P.strew("skyscraper", 10, 170, 300, 1903, 0.8, 1.2);
P.strew("tree", 14, 40, 220, 1904, 0.9, 1.2);
},
function (P) {
var L = "Temple Row (the dream's own street of houses; the full Row of 275 houses is in the city of Somnucor)";
var robe = function (c, sex, skin, hat, hc, extra) { var o = { top: c, topKind: "robe", bottom: c, shoes: 0x5A4030, skin: skin, hair: 0x2A1A10 }; if (hat) {
o.hat = hat;
o.hatColor = hc;
} for (var k in (extra || {}))
o[k] = extra[k]; return { sex: sex, look: o }; };
P.path([[0, 6], [0, -132]], 5, 0xE0D4B0, "lanternpost", 16);
P.path([[0, -160], [0, -262]], 5, 0xE0D4B0, "lanternpost", 16);
P.k("tierfountain", 0, -146, 0, 1.1);
P.ring("bench", 6, 13, 0, -146, 1, { small: 1 }, 1, 0.5);
P.person("pilgrim1", 9, -138, -2.4, { sex: "f", look: { top: 0x6A8AB8, bottom: 0x3A3A4A, shoes: 0x3A2A1A, skin: 0xC89878, hair: 0x6A3A1A } }, null, { r: 10, sp: 0.35 });
P.person("pilgrim2", -10, -154, 2.2, { sex: "m", look: { top: 0xB8783A, bottom: 0x4A4A3A, shoes: 0x3A2A1A, skin: 0x8A5A3A, hair: 0x1A1010, hat: "cap", hatColor: 0x3A4A2A } }, null, { r: 12, sp: 0.35 });
P.person("pilgrim3", 4, -60, 3.1, { sex: "f", look: { top: 0x8A3A6A, bottom: 0x2A2A3A, shoes: 0x2A1A1A, skin: 0xE8C8A8, hair: 0xD8B060 } }, null, { r: 16, sp: 0.35 });
P.sign(-8, -12, 0.3, ["Temple Row", "Press E to read"], ["Temple Row", "A street of houses for the powers people have honoured", ["In the city of Somnucor the full Row has 275 houses in 26 precincts. This dream has its own short street.", "Nothing here asks anything of anybody. What is left in a bowl is left."]]);
P.k("grandtemple", -38, -32, Math.PI / 2, 0.85);
P.k("altar", -16, -32, Math.PI / 2, 1, { solid: false });
P.k("incenseburner", -15, -27, 0, 1, { solid: false });
P.person("athena", -18, -36, Math.PI / 2, robe(0xF0ECE0, "f", 0xD8B090, "vinecrown", 0x6A8A3A, { layer: "longcoat", layerColor: 0x3A5A8A }), ldWho("The priestess of Athena", L, "a priestess who keeps a temple of Athena in the Greek style, with its marble columns", "Welcome to the house of grey-eyed Athena. Mind the steps; marble is slippery after rain.", "You know ancient Greek temples well and enjoy explaining them simply."));
P.sign(-16, -42, Math.PI / 2, ["A Greek temple", "Press E to read"], ["Greek temples", "Houses for a god, not halls for a crowd", ["A Greek temple held the god's statue in its inner room, the cella; the people gathered outside, at the altar in front.", "The Parthenon in Athens, finished in 432 BC, was built for Athena.", "The columns came in three orders: plain Doric, scrolled Ionic and leafy Corinthian."]]);
P.k("shintoshrine", -36, -80, Math.PI / 2, 0.9);
P.k("torii", -16, -80, Math.PI / 2, 1, { solid: false });
P.k("paperlanterns", -17, -72, Math.PI / 2, 1, { solid: false });
P.person("miko", -19, -86, Math.PI / 2, robe(0xF4F0EC, "f", 0xE8C8A8, null, 0, { bottom: 0xB8202A, hair: 0x101010 }), ldWho("The shrine maiden", L, "a shrine maiden (miko) who sweeps and tends a Shinto shrine", "Good day. Bow once as you pass under the torii, if you like; it marks where the everyday world ends and the sacred begins.", "You are calm and warm, and explain Shinto customs simply and respectfully."));
P.sign(-16, -90, Math.PI / 2, ["A Shinto shrine", "Press E to read"], ["Shinto shrines", "Where the kami are honoured", ["A torii gate marks the entrance to a Shinto shrine; passing through it, you enter the shrine's grounds.", "Visitors often rinse their hands and mouth at a water basin, then ring a bell, bow twice, clap twice and bow once.", "Japan has around 80,000 Shinto shrines."]]);
P.k("pagoda", -36, -200, Math.PI / 2, 1);
P.k("redlanterns", -18, -194, Math.PI / 2, 1, { solid: false });
P.k("incenseburner", -17, -204, 0, 1, { solid: false });
P.person("taoist", -19, -198, Math.PI / 2, robe(0x2A3A6A, "m", 0xD8B088, null, 0, { hair: 0x2A2A2A, beard: "short" }), ldWho("The keeper of the pagoda", L, "the keeper of a tall pagoda hung with red lanterns", "Come in out of the sun. Each roof of the pagoda is a storey; count them, there is always an odd number.", "You are gentle and funny, and like telling how pagodas came from the Indian stupa by way of China."));
P.sign(-16, -208, Math.PI / 2, ["A pagoda", "Press E to read"], ["Pagodas", "Towers of many roofs", ["Pagodas grew out of the Indian stupa, built to keep holy relics, and took their tower shape in China.", "They usually have an odd number of storeys: three, five, seven, nine or thirteen.", "The oldest standing wooden pagoda is at Horyu-ji in Japan, about 1,300 years old."]]);
P.k("ziggurat", -44, -248, Math.PI / 2, 0.8);
P.person("scribe", -22, -244, Math.PI / 2, robe(0xD8C090, "m", 0xB07850, null, 0, { hair: 0x1A1010, beard: "full" }), ldWho("The scribe of the ziggurat", L, "a scribe with a clay tablet and a reed stylus, at the foot of a stepped ziggurat in the style of ancient Mesopotamia", "*presses a wedge into wet clay* This is cuneiform, the first writing in the world. Want your name in it?", "You love ancient Sumer and Babylon and explain them simply and cheerfully."));
P.k("church", 34, -36, -Math.PI / 2, 0.8);
P.k("bench", 14, -30, -Math.PI / 2, 1);
P.k("bench", 14, -42, -Math.PI / 2, 1);
P.person("verger", 16, -36, -Math.PI / 2, { sex: "m", look: { top: 0x1A1A1A, bottom: 0x1A1A1A, shoes: 0x101010, skin: 0xE0B898, hair: 0x8A8A8A, layer: "longcoat", layerColor: 0x1A1A2A } }, ldWho("The verger", L, "the verger who looks after an old stone church and shows visitors round", "Come in, come in. The roof is fifteenth century and the bells are older than the town. Mind the step.", "You are kind and full of stories about old churches and their bells."));
P.sign(16, -46, -Math.PI / 2, ["A parish church", "Press E to read"], ["Churches", "How an old church is laid out", ["A traditional church points east: the altar stands at the east end, toward the sunrise.", "The long main part where people sit is the nave; the bells hang in the tower.", "Some English parish churches are more than a thousand years old."]]);
P.k("mosque", 38, -84, -Math.PI / 2, 0.85);
P.k("tiledfountain", 15, -84, 0, 0.9);
P.person("caretaker", 17, -92, -Math.PI / 2, robe(0xF0ECE0, "m", 0xA87050, "cap", 0xF0F0F0, { beard: "short" }), ldWho("The mosque's caretaker", L, "the caretaker of a mosque, who keeps its courtyard fountain clean and welcomes visitors", "Peace be upon you. Visitors are welcome; shoes off at the door, please, and there is a rack just inside.", "You are welcoming and explain mosque architecture and customs simply and respectfully."));
P.sign(16, -76, -Math.PI / 2, ["A mosque", "Press E to read"], ["Mosques", "What the parts are for", ["The minaret is the tower from which the call to prayer is given, five times a day.", "The mihrab, a niche in one wall, shows the direction of Mecca.", "Many mosques have a fountain or washing place in the courtyard, for washing before prayer."]]);
P.k("stupa", 36, -198, -Math.PI / 2, 1);
P.k("prayerflags", 22, -190, -Math.PI / 2, 1, { solid: false });
P.person("monk", 18, -204, -Math.PI / 2, robe(0xC8601A, "m", 0xB88860, null, 0, { hair: 0x101010 }), ldWho("A Buddhist monk", L, "a Buddhist monk in saffron robes who looks after a white stupa", "*smiles* Walk round the stupa clockwise, if you like; slowly is best.", "You are peaceful, light-hearted and explain Buddhist customs simply and respectfully."));
P.sign(16, -210, -Math.PI / 2, ["A stupa", "Press E to read"], ["Stupas", "A mound that holds a memory", ["A stupa is a dome-shaped monument that holds relics; the earliest ones held the Buddha's ashes.", "Visitors walk round a stupa clockwise, which is called circumambulation.", "The Great Stupa at Sanchi in India was begun in the 3rd century BC."]]);
P.k("darkfane", 42, -248, -Math.PI / 2, 0.75);
P.k("spiritlanterns", 22, -244, -Math.PI / 2, 1, { solid: false });
P.k("standingstones", 0, -290, 0, 1.2, { solid: false });
P.k("altar", 0, -290, 0, 1.2);
P.person("rowkeeper", 4, -282, 0, robe(0x3A5A3A, "f", 0xC8A080, "hood", 0x2A4A2A), ldWho("The keeper of the Row", L, "the keeper of Temple Row, who tends the stone circle at its far end and knows the way to every house", "Every power people ever honoured has a house on the Row in the city. Here in the dream there is room for only a few. Which would you like to see?", "You are wise and warm and know a little about every tradition, and never take sides."));
P.sign(-10, -276, 0.3, ["The stone circle", "Press E to read"], ["Stone circles", "Among the oldest temples of all", ["Stonehenge was raised in stages from about 3000 BC to 1500 BC.", "Its stones line up with the sunrise at midsummer and the sunset at midwinter.", "There are more than 1,000 stone circles in Britain and Ireland."]]);
[-56, -120, -170, -230].forEach(function (z) { P.k("glyphobelisk", -8, z, 0, 0.6, { small: 1 }); P.k("glyphobelisk", 8, z, 0, 0.6, { small: 1 }); });
P.strew("tree", 20, 70, 260, 1801, 0.9, 1.4);
P.strew("rock", 10, 60, 240, 1802, 0.6, 1.2);
}
];
});
