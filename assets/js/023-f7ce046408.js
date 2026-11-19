/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var GEOCACHE = {};
function triPrism(W, H, D) {
var w = W / 2, d = D / 2, P = [], N = [], U = [], I = [];
function face(vs, uv) {
var b = P.length / 3, a = new THREE.Vector3().fromArray(vs, 0), c = new THREE.Vector3().fromArray(vs, 3), e = new THREE.Vector3().fromArray(vs, 6);
var n = c.clone().sub(a).cross(e.clone().sub(a)).normalize();
for (var i = 0; i < vs.length; i += 3) {
P.push(vs[i], vs[i + 1], vs[i + 2]);
N.push(n.x, n.y, n.z);
}
U.push.apply(U, uv);
if (vs.length === 9)
I.push(b, b + 1, b + 2);
else
I.push(b, b + 1, b + 2, b, b + 2, b + 3);
}
var sl = Math.hypot(d, H);
face([w, 0, d, w, 0, -d, w, H, 0], [D, 0, 0, 0, D / 2, H]);
face([-w, 0, -d, -w, 0, d, -w, H, 0], [D, 0, 0, 0, D / 2, H]);
face([-w, 0, d, w, 0, d, w, H, 0, -w, H, 0], [0, 0, W, 0, W, sl, 0, sl]);
face([w, 0, -d, -w, 0, -d, -w, H, 0, w, H, 0], [0, 0, W, 0, W, sl, 0, sl]);
face([-w, 0, -d, w, 0, -d, w, 0, d, -w, 0, d], [0, 0, W, 0, W, D, 0, D]);
var g = new THREE.BufferGeometry();
g.setAttribute("position", new THREE.Float32BufferAttribute(P, 3));
g.setAttribute("normal", new THREE.Float32BufferAttribute(N, 3));
g.setAttribute("uv", new THREE.Float32BufferAttribute(U, 2));
g.setIndex(I);
return g;
}
function geo(kind, s) {
var k = kind + ":" + s.join(",");
if (GEOCACHE[k])
return GEOCACHE[k];
var g;
if (kind === "box")
g = new THREE.BoxGeometry(s[0], s[1], s[2]);
else if (kind === "cyl")
g = new THREE.CylinderGeometry(s[0], s[1], s[2], s[3] || 10, s[4] || 1, !!s[5], s[6] || 0, s[7] || Math.PI * 2);
else if (kind === "cone")
g = new THREE.ConeGeometry(s[0], s[1], s[2] || 8);
else if (kind === "sph")
g = new THREE.SphereGeometry(s[0], 10, 8);
else if (kind === "ico")
g = new THREE.IcosahedronGeometry(s[0], 0);
else if (kind === "pln")
g = new THREE.PlaneGeometry(s[0], s[1]);
else if (kind === "tor")
g = new THREE.TorusGeometry(s[0], s[1], 6, Math.max(14, Math.round(s[0] * 9)));
else if (kind === "tri")
g = triPrism(s[0], s[1], s[2]);
else
g = new THREE.BoxGeometry(s[0] || 1, s[1] || 1, s[2] || 1);
if (kind !== "tri")
metreUVs(g, kind, s);
GEOCACHE[k] = g;
return g;
}
function resolveColor(c, spec) {
if (typeof c === "number")
return c;
if (c === "body" && spec.attrs && spec.attrs.c !== undefined)
return spec.attrs.c;
if (c === "nature")
return natureColor(spec);
if (c === "water")
return waterColor();
return ROLE[c] !== undefined ? ROLE[c] : ROLE.body;
}
function fidelity(spec) {
if (spec.city || spec.hub)
return 1;
if (spec.filler)
return spec.solid ? 1 : 0.34;
if (viewNight !== null && spec.nights && spec.nights.indexOf(viewNight) === -1)
return 0.06;
var d = 1, a = spec.attrs || {};
if (spec.nights && spec.nights.length > 1)
d += Math.min(3, spec.nights.length - 1);
if (a.c !== undefined)
d++;
if (a.m || a.rm)
d++;
if (a.s || a.h || a.w || a.d)
d++;
if (spec.sign)
d++;
if (spec.note)
d++;
if (spec.solid)
d += 2;
if (spec.placed)
d += 2;
return Math.max(0.8, Math.min(d / 5, 1));
}
function seenFidelity(spec) { var f = fidelity(spec); return f >= 0.3 ? 1 : f; }
function fitLines(x, text, maxW, maxLines, big, small, weight, face) { return __ZC(23, 0, this, arguments, new.target); }
var SIGN_TEX = {};
function boardPlane(w, h) {
var k = "board:" + w + "," + h;
return GEOCACHE[k] || (GEOCACHE[k] = new THREE.PlaneGeometry(w, h));
}
function signTexture(text) { return __ZC(23, 1, this, arguments, new.target); }
function boardTexture(title, note) { return __ZC(23, 2, this, arguments, new.target); }
var LEVELS = { house: 2, cottage: 1, apartment: 8, tower: 20, skyscraper: 40, motel: 2, hotel: 10, institution: 4,
hospital: 5, school: 3, church: 1, cathedral: 1, bank: 3, library: 3, station: 2, courthouse: 3, shop: 1,
warehouse: 1, factory: 2, barn: 1, shed: 1, garage: 1, gasstation: 1, bunker: 1, ruin: 1, lighthouse: 6, windmill: 4 };
function levelParts(def, spec) {
var base = LEVELS[spec.archetype], lv = spec.attrs && spec.attrs.lv;
if (!base || !lv || lv === base || def.cat !== "structure")
return def.parts;
var body = def.parts[0];
if (!body || body.g !== "box")
return def.parts;
var H = body.s[1], floor = H / base, dh = floor * (lv - base);
var top = body.p[1] + H / 2;
return def.parts.map(function (pt, i) {
var q = JSON.parse(JSON.stringify(pt));
if (i === 0) {
q.s[1] = Math.max(floor, H + dh);
q.p[1] = q.s[1] / 2;
return q;
}
var partTop = q.p[1] + (q.g === "box" ? q.s[1] / 2 : 0);
if (q.c === "glass" && q.p[1] < top) {
if (q.rep2) {
q.rep2[0] = Math.max(1, Math.round(q.rep2[0] * lv / base));
}
else if (lv > base) {
q.rep2 = [1 + (lv - base), 0, floor, 0];
}
return q;
}
if (q.p[1] >= top - 0.01 || partTop > top + 0.01) {
q.p[1] += dh;
}
else if (q.g === "box" && Math.abs(q.s[1] - H) < 0.01) {
q.s[1] = Math.max(floor, H + dh);
q.p[1] = q.s[1] / 2;
}
return q;
});
}
var HIDDEN_KINDS = { hiddenroom: 1, secretstair: 1, trapdoor: 1, secretdoor: 1 };
function isHidden(spec) { return !spec.found && ((spec.attrs && spec.attrs.hidden) || HIDDEN_KINDS[spec.archetype]); }
var FLATGROUND = { groundpad: 1, lawn: 1, snowfield: 1, blossomground: 1, leaffall: 1 };
function build(spec) {
var def = KIT[spec.archetype] || KIT.house;
var a = spec.attrs || {};
var f = seenFidelity(spec);
var opa = 0.20 + 0.80 * f;
if (isHidden(spec)) {
f = Math.min(f, 0.3);
opa = 0.12;
}
var ghosty = f < 0.99;
var sx = (a.s || 1) * (a.w || 1), sy = (a.s || 1) * (a.h || 1), sz = (a.s || 1) * (a.d || 1);
if (typeof CREATURE !== "undefined" && CREATURE[spec.archetype]) {
var cg = buildCreature(spec, f);
cg.userData.id = spec.id;
shadowsFor(cg, true);
cg.scale.set(sx, sy, sz);
return cg;
}
if (spec.archetype === "dragon") {
var dg = buildDragon(spec, f);
dg.userData.id = spec.id;
shadowsFor(dg, true);
if (spec.templerow && a.s)
dg.scale.multiplyScalar(a.s);
return dg;
}
if (isPerson(spec) || spec.archetype === "crowd") {
var pg = spec.archetype === "crowd" ? buildCrowd(spec, f) : spec.archetype === "deity" ? buildDeity(spec, f) : buildFigure(spec, f);
pg.userData.id = spec.id;
shadowsFor(pg, true);
pg.scale.set(sx, sy, sz);
return pg;
}
var g = new THREE.Group();
g.userData.id = spec.id;
var parts = levelParts(def, spec), B = def.cat === "structure" ? bodyOf(parts) : null;
parts.forEach(function (pt) {
if (B && pt.c === "glass" && !pt.glow && redrawsFront(spec))
return;
if (B && restylesDoor(spec) && isFrontDoor(pt, B, parts))
return;
var col = resolveColor(pt.c, spec);
var surf = surfaceOf(pt, def, spec, f);
if (surf && surf.wall && a.c === undefined)
col = MATCOLOR[surf.tex] || col;
else if (surf && surf.wall && !spec.city && !spec.hub && typeof pt.c === "number")
col = a.c;
if (surf && surf.roof)
col = (a.rc !== undefined) ? a.rc : (MATCOLOR[surf.tex] || col);
if (a.tc !== undefined && def.cat === "structure" && (pt.g === "cyl" || pt.g === "cone") && !pt.glow && pt.c !== "glass" && pt.c !== "dark")
col = pt.g === "cone" ? shade(a.tc, -0.22) : a.tc;
if (a.mc !== undefined && def.cat === "structure" && pt.g === "sph" && !pt.glow && pt.c !== "glass")
col = a.mc;
var mat;
if (pt.c === "glass" && !pt.glow && def.cat === "structure") {
mat = new THREE.MeshBasicMaterial({ color: 0x3A4654, transparent: true, opacity: 0.94, side: THREE.DoubleSide });
}
else if (pt.glow) {
mat = new THREE.MeshBasicMaterial({ color: col, transparent: true,
opacity: (pt.opa !== undefined ? pt.opa : 1) * Math.max(opa, 0.35), side: THREE.DoubleSide });
if (LAMPED[spec.archetype]) {
if (!g.userData.lamps)
g.userData.lamps = [];
g.userData.lamps.push(mat);
}
if (pt.pulse)
(mat.userData || (mat.userData = {})).pulse = 1;
}
else {
mat = new THREE.MeshLambertMaterial({ color: ghosty ? blend(col, 0x7C93B8, 1 - f) : col,
transparent: opa < 0.995 || pt.opa !== undefined,
opacity: (pt.opa !== undefined ? pt.opa : 1) * opa,
side: pt.g === "pln" ? THREE.DoubleSide : THREE.FrontSide,
depthWrite: opa > 0.24,
polygonOffset: pt.g === "pln", polygonOffsetFactor: -1, polygonOffsetUnits: -2 });
if (surf) {
var tx = texOf(surf.tex);
if (tx) {
mat.map = tx;
mat.needsUpdate = true;
}
}
}
if (pt.c === "glass" && !pt.glow) {
if (!g.userData.glass)
g.userData.glass = [];
g.userData.glass.push(mat);
mat.transparent = true;
}
var G = geo(pt.g, pt.s);
var n1 = pt.rep ? pt.rep[0] : 1, n2 = pt.rep2 ? pt.rep2[0] : 1;
for (var i = 0; i < n1; i++) {
for (var j = 0; j < n2; j++) {
var m = new THREE.Mesh(G, mat);
var px = pt.p[0] + (pt.rep ? pt.rep[1] * i : 0) + (pt.rep2 ? pt.rep2[1] * j : 0);
var py = pt.p[1] + (pt.rep ? pt.rep[2] * i : 0) + (pt.rep2 ? pt.rep2[2] * j : 0);
var pz = pt.p[2] + (pt.rep ? pt.rep[3] * i : 0) + (pt.rep2 ? pt.rep2[3] * j : 0);
m.position.set(px, py, pz);
if (pt.r)
m.rotation.set(pt.r[0], pt.r[1], pt.r[2]);
var big = Math.max(pt.s[0] || 0, pt.s[1] || 0, (pt.s[2] || 0));
m.castShadow = !pt.glow && pt.c !== "glass" && pt.g !== "pln" && big >= 1.2 && !FLATGROUND[spec.archetype];
m.receiveShadow = !pt.glow;
g.add(m);
}
}
});
if (B && !isHidden(spec))
addOpenings(g, spec, def, parts, f, opa);
if (spec.archetype === "signboard") {
var bt = spec.sign || spec.name || spec.label;
if (bt) {
var btex = boardTexture(bt, spec.note);
var bmat = new THREE.MeshLambertMaterial({ map: btex, transparent: opa < 1, opacity: opa, emissive: 0x111111 });
[1, -1].forEach(function (side) {
var bp = new THREE.Mesh(boardPlane(2.9, 1.2), bmat);
bp.position.set(0, 2.1, side * 0.13);
if (side < 0)
bp.rotation.y = Math.PI;
g.add(bp);
});
}
}
var signText = spec.sign || (spec.city && def.sign && (spec.workplace || spec.label || spec.signName)) || null;
if (signText && def.sign) {
var sg = def.sign;
var board = new THREE.Mesh(boardPlane(sg[3], sg[4]), new THREE.MeshLambertMaterial({ map: signTexture(signText), transparent: true, opacity: opa, side: THREE.DoubleSide, emissive: 0x222222 }));
board.position.set(sg[0], sg[1], sg[2]);
g.add(board);
}
if (LAMPED[spec.archetype]) {
var pool = new THREE.Mesh(new THREE.CircleGeometry(spec.archetype === "streetlight" ? 7 : 4.5, 24), new THREE.MeshBasicMaterial({ color: 0xE8C27A, transparent: true, opacity: 0, depthWrite: false }));
pool.rotation.x = -Math.PI / 2;
pool.position.set(spec.archetype === "streetlight" ? 2.1 : 0, 0.16, 0);
pool.material.polygonOffset = true;
pool.material.polygonOffsetFactor = -2;
pool.material.polygonOffsetUnits = -4;
g.add(pool);
g.userData.pool = pool;
}
if (DECOR[spec.archetype] && !isHidden(spec))
DECOR[spec.archetype](g, spec, f);
if (!isHidden(spec))
attachEffect(g, spec);
if (def.cat === "nature" && def.size[0] < 12)
g.add(contactShadow(def.size[0] * 0.42));
if (def.cat === "vehicle" && def.size[2] < 14)
g.add(contactShadow(Math.max(def.size[0], def.size[2]) * 0.55));
g.scale.set(sx, sy, sz);
return g;
}
var LAMPED = { streetlight: 1, brazier: 1, altar: 1, lighthouse: 1, gasstation: 1, busstop: 1 };
function lampsForNight(night) {
for (var id in meshes) {
var m = meshes[id];
if (m.userData.lamps)
m.userData.lamps.forEach(function (mat) { mat.opacity = 0.08 + night * 0.92; });
if (m.userData.pool)
m.userData.pool.material.opacity = night * 0.34;
}
if (typeof BAKE !== "undefined") {
BAKE.lamps.forEach(function (mat) { mat.opacity = 0.08 + night * 0.92; });
BAKE.pools.forEach(function (mat) { mat.opacity = night * 0.34; });
}
}
function blend(a, b, t) {
var ar = (a >> 16) & 255, ag = (a >> 8) & 255, ab = a & 255;
var br = (b >> 16) & 255, bg = (b >> 8) & 255, bb = b & 255;
return (Math.round(ar + (br - ar) * t) << 16) | (Math.round(ag + (bg - ag) * t) << 8) | Math.round(ab + (bb - ab) * t);
}
var scene, camera, renderer, clock, meshes = {}, raycaster, ground, SKY = 0x090B11;
function initWorld() {
scene = new THREE.Scene();
scene.background = new THREE.Color(SKY);
setFog(cfg().density);
camera = new THREE.PerspectiveCamera(70, innerWidth / innerHeight, 0.3, 6000);
var lowPhone = (/Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent || "") || (typeof TOUCH_ONLY !== "undefined" && TOUCH_ONLY)) && (navigator.deviceMemory || 4) <= 4;
try {
if ((JSON.parse(localStorage.getItem("somnu.phonefit") || "{}").level | 0) > 0)
lowPhone = true;
}
catch (e) { }
var rOpt = { antialias: !lowPhone, powerPreference: "high-performance", logarithmicDepthBuffer: canFragDepth() };
if (navigator.xr && /OculusBrowser|Quest|Pico|Wolvic|\bVR\b/.test(navigator.userAgent || ""))
try {
var xcv = document.createElement("canvas"), xat = { alpha: false, depth: true, stencil: true, antialias: !lowPhone, premultipliedAlpha: true, preserveDrawingBuffer: false, powerPreference: "high-performance", xrCompatible: true };
var xcx = xcv.getContext("webgl2", xat) || xcv.getContext("webgl", xat);
if (xcx) {
rOpt.canvas = xcv;
rOpt.context = xcx;
}
}
catch (e) { }
renderer = new THREE.WebGLRenderer(rOpt);
renderer.debug.checkShaderErrors = /[?&]shaders=check/.test(location.search);
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.setSize(innerWidth, innerHeight);
document.getElementById("world").appendChild(renderer.domElement);
hemi = new THREE.HemisphereLight(0x3A4160, 0x0A0C11, 0.9);
scene.add(hemi);
sun = new THREE.DirectionalLight(0xA6B6D0, 0.6);
sun.position.set(-300, 500, 180);
scene.add(sun);
ground = new THREE.Mesh(new THREE.PlaneGeometry(6000, 6000), new THREE.MeshLambertMaterial({ color: 0x101219 }));
ground.rotation.x = -Math.PI / 2;
scene.add(ground);
buildSky();
raycaster = new THREE.Raycaster();
clock = new THREE.Clock();
addEventListener("resize", onResize);
animate();
}
var fogBase = 26;
function setFog(sl) {
fogBase = sl;
if (scene) {
scene.fog = new THREE.FogExp2(SKY, 1.9 / (sl * 10));
}
}
function fogForLight(dl) {
if (!scene || !scene.fog)
return;
var dist = fogBase * 10 * (0.55 + dl * 1.1);
scene.fog.density = 1.9 / Math.max(dist, 20);
}
function onResize() {
camera.aspect = innerWidth / innerHeight;
camera.updateProjectionMatrix();
renderer.setSize(innerWidth, innerHeight);
}
function addMesh(spec) {
var g = build(spec);
g.position.set(spec.x, (typeof terrainY === "function") ? terrainY(spec.x, spec.z) + (spec.y || 0) : 0, spec.z);
g.rotation.y = spec.rot || 0;
var ch = charOf(spec);
if (ch) {
ch.x = spec.x;
ch.z = spec.z;
if (ch.awake && !ch.deity && spec.archetype !== "deity" && spec.archetype !== "dragon") {
var halo = new THREE.Mesh(new THREE.RingGeometry(0.62, 0.74, 28), new THREE.MeshBasicMaterial({ color: 0x9FB4D8, transparent: true, opacity: 0.18, side: THREE.DoubleSide, depthWrite: false }));
halo.rotation.x = -Math.PI / 2;
halo.position.y = 0.09;
g.add(halo);
g.userData.awake = 1;
}
}
if (typeof ROADGOING !== "undefined" && ROADGOING[spec.archetype]) {
g.userData.drives = 1;
var seat = new THREE.Group(), sm = new THREE.MeshLambertMaterial({ color: 0x6B5A4A }), cl = new THREE.MeshLambertMaterial({ color: 0x3E4A5E });
var dh = new THREE.Mesh(new THREE.SphereGeometry(0.11, 10, 8), sm);
dh.position.y = 0.28;
seat.add(dh);
var db = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.3, 0.22), cl);
db.position.y = 0.05;
seat.add(db);
if (spec.archetype === "bicycle") {
seat.position.set(0, 0.95, -0.05);
var la = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.035, 0.4, 6), cl);
la.position.set(0, 0.02, 0.3);
la.rotation.x = 1.1;
seat.add(la);
var ll = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.04, 0.45, 6), cl);
ll.position.set(0.08, -0.28, 0.05);
ll.rotation.x = -0.5;
seat.add(ll);
var lr = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.04, 0.45, 6), cl);
lr.position.set(-0.08, -0.3, 0.12);
lr.rotation.x = 0.3;
seat.add(lr);
var ch = charOf(spec);
seat.visible = !!((ch && ch.rider) || (spec.attrs && spec.attrs.ridden));
g.userData.seatRide = 1;
}
else {
seat.position.set(-0.32, 1.0, 0.35);
seat.visible = false;
}
g.userData.seat = seat;
g.add(seat);
}
scene.add(g);
meshes[spec.id] = g;
}
function refresh(spec) {
if (meshes[spec.id]) {
scene.remove(meshes[spec.id]);
}
addMesh(spec);
}
function removeSpec(spec) {
if (meshes[spec.id]) {
scene.remove(meshes[spec.id]);
delete meshes[spec.id];
}
var i = store.objects.indexOf(spec);
if (i > -1)
store.objects.splice(i, 1);
}
function canFragDepth() {
try {
var k = localStorage.getItem("somnu.fragdepth");
if (k === "1")
return true;
if (k === "0")
return false;
}
catch (e) { }
var ok = false;
try {
var c = document.createElement("canvas"), g = null;
if (c.getContext && (g = c.getContext("webgl2")))
ok = true;
else {
g = c.getContext && (c.getContext("webgl") || c.getContext("experimental-webgl"));
ok = !!(g && g.getExtension && g.getExtension("EXT_frag_depth"));
}
try {
var lc = g && g.getExtension && g.getExtension("WEBGL_lose_context");
if (lc)
lc.loseContext();
}
catch (e) { }
}
catch (e) {
ok = false;
}
try {
localStorage.setItem("somnu.fragdepth", ok ? "1" : "0");
}
catch (e) { }
return ok;
}
var drawnEdges = {};
function drawStreet(ax, az, bx2, bz2) { return __ZC(23, 3, this, arguments, new.target); }
