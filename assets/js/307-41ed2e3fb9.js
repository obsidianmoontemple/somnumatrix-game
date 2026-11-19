/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var PHOTO_TEX = { kinds: { brick: 1, stone: 1, wood: 1, siding: 1, plaster: 1, concrete: 1, marble: 1, metal: 1, metalroof: 1,
shingle: 1, tile: 1, slate: 1, floortile: 1, bark: 1, asphalt: 1, grass: 1, earth: 1, sand: 1, snow: 1, paving: 1 },
img: {}, done: {}, failed: {},
hi: (function () { try {
if (typeof LITE !== "undefined" && LITE)
return false;
var m = navigator.deviceMemory;
return !m || m >= 8;
}
catch (e) {
return false;
} })() };
function phtUrl(k) { return "assets/textures/photo/" + k + (PHOTO_TEX.hi ? "-1k" : "") + ".jpg"; }
function phtLoad(k) {
if (!PHOTO_TEX.kinds[k] || PHOTO_TEX.img[k] || PHOTO_TEX.failed[k] || typeof Image === "undefined")
return;
var im = new Image();
PHOTO_TEX.img[k] = im;
im.onload = function () { PHOTO_TEX.done[k] = im; phtApply(k); };
im.onerror = function () { PHOTO_TEX.failed[k] = true; PHOTO_TEX.img[k] = null; };
im.src = phtUrl(k);
}
function phtPaint(t, k) {
var im = PHOTO_TEX.done[k], c = t && t.image;
if (!im || !c || c.__pht || !c.getContext)
return false;
try {
c.width = c.height = im.naturalWidth || im.width;
c.getContext("2d").drawImage(im, 0, 0, c.width, c.height);
}
catch (e) {
return false;
}
c.__pht = k;
t.needsUpdate = true;
return true;
}
function phtApply(k) {
var t = TEXCACHE[k];
if (!t || !phtPaint(t, k))
return;
var c = t.image, seen = new Set();
if (typeof scene === "undefined" || !scene)
return;
scene.traverse(function (o) {
var ms = o.material ? (Array.isArray(o.material) ? o.material : [o.material]) : [];
for (var i = 0; i < ms.length; i++) {
var m = ms[i];
if (!m || seen.has(m))
continue;
seen.add(m);
if (m.map && m.map !== t && m.map.image === c)
m.map.needsUpdate = true;
}
});
}
(function () {
var painted = texOf;
texOf = function (kind) {
var t = painted(kind);
if (t && PHOTO_TEX.kinds[kind]) {
if (PHOTO_TEX.done[kind])
phtPaint(t, kind);
else
phtLoad(kind);
}
return t;
};
Object.keys(PHOTO_TEX.kinds).forEach(phtLoad);
})();
var LEAF = { tex: null };
function leafTex() {
if (LEAF.tex || typeof THREE === "undefined")
return LEAF.tex;
var t = new THREE.TextureLoader().load("assets/textures/photo/leaves.png");
t.anisotropy = 4;
LEAF.tex = t;
return t;
}
function leafGeo(r) {
var R = rng(hash("leaves" + r)), pos = [], nor = [], uv = [], idx = [], n = 0;
function card(cx, cy, cz, ax, ay, size) {
var ca = Math.cos(ay), sa = Math.sin(ay), cb = Math.cos(ax), sb = Math.sin(ax), h = size / 2;
var ux = ca, uy = 0, uz = -sa, vx = sa * sb, vy = cb, vz = ca * sb;
[[-1, -1], [1, -1], [1, 1], [-1, 1]].forEach(function (q) {
var x = cx + (ux * q[0] + vx * q[1]) * h, y = cy + (uy * q[0] + vy * q[1]) * h, z = cz + (uz * q[0] + vz * q[1]) * h;
pos.push(x, y, z);
var l = Math.hypot(x, y * 1.2, z) || 1;
nor.push(x / l, y * 1.2 / l, z / l);
uv.push((q[0] + 1) / 2, (q[1] + 1) / 2);
});
idx.push(n, n + 1, n + 2, n, n + 2, n + 3);
n += 4;
}
for (var k = 0; k < 3; k++)
card(0, 0, 0, 0.25 * (R() - 0.5), k * Math.PI / 3, r * 1.9);
for (var i = 0; i < 10; i++) {
var a = R() * Math.PI * 2, e = (R() - 0.35) * 1.4, d = r * (0.45 + R() * 0.3);
card(Math.cos(a) * Math.cos(e) * d, Math.sin(e) * d * 0.8, Math.sin(a) * Math.cos(e) * d, (R() - 0.5) * 1.2, a + Math.PI / 2 + (R() - 0.5), r * (0.95 + R() * 0.35));
}
var g = new THREE.BufferGeometry();
g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
g.setAttribute("normal", new THREE.Float32BufferAttribute(nor, 3));
g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
g.setIndex(idx);
g.computeBoundingSphere();
g.computeBoundingBox();
g.userData.leaves = 1;
g.userData.mUV = 1;
g.userData.kit = 1;
return g;
}
(function () {
if (typeof geo !== "function")
return;
var gl = geo, cache = {};
geo = function (kind, s) {
if (kind !== "leaves")
return gl.apply(this, arguments);
var k = String(s && s[0] || 2);
return cache[k] || (cache[k] = leafGeo(+k));
};
})();
function leafMat(col) {
var m = new THREE.MeshLambertMaterial({ color: col, map: leafTex(), alphaTest: 0.42, side: THREE.DoubleSide });
return m;
}
function leafDress(g) {
if (!g || !g.traverse)
return;
g.traverse(function (o) {
if (!o.isMesh || !o.geometry || !o.geometry.userData.leaves || o.userData.leafDone)
return;
o.userData.leafDone = 1;
var m = o.material;
if (!m || Array.isArray(m))
return;
var t = leafTex();
if (!t)
return;
m.map = t;
m.alphaTest = 0.42;
m.side = THREE.DoubleSide;
m.polygonOffset = false;
if (!(m.opacity < 0.99)) {
m.transparent = false;
m.depthWrite = true;
}
m.needsUpdate = true;
o.castShadow = false;
});
}
function phtNoPhoto(g) {
if (!g || !g.traverse)
return g;
g.traverse(function (o) {
o.userData.noPhoto = 1;
var ms = o.material ? (Array.isArray(o.material) ? o.material : [o.material]) : [];
ms.forEach(function (m) { if (m && m.userData)
m.userData.noPhoto = 1; });
});
return g;
}
(function () {
if (typeof figMat === "function") {
var fm = figMat;
figMat = function () { var m = fm.apply(this, arguments); if (m && m.userData)
m.userData.noPhoto = 1; return m; };
}
if (typeof geo === "function") {
var g0 = geo;
geo = function (kind) { var g = g0.apply(this, arguments); if (g && kind !== "tri")
g.userData.mUV = 1; return g; };
}
if (typeof build === "function") {
var b0 = build;
build = function (spec) {
var g = b0.apply(this, arguments), d = spec && KIT[spec.archetype];
if (g && spec && d && d.cat === "nature")
leafDress(g);
if (g && spec && ((typeof isPerson === "function" && isPerson(spec)) || spec.archetype === "crowd" || spec.archetype === "dragon" ||
(typeof CREATURE !== "undefined" && CREATURE[spec.archetype]) || (d && /^(being|creature|animal)$/.test(d.cat))))
phtNoPhoto(g);
return g;
};
}
})();
var PHT_HSL = { h: 0, s: 0, l: 0 };
function phtWoody(m) {
if (!m || !(m.isMeshLambertMaterial || m.isMeshToonMaterial || m.isMeshPhongMaterial) || m.map || m.transparent || m.vertexColors || !m.color)
return false;
if (m.userData.noPhoto || m.userData.phtWood === 0)
return false;
if (m.emissive && (m.emissive.r + m.emissive.g + m.emissive.b) > 0.03)
return (m.userData.phtWood = 0, false);
m.color.getHSL(PHT_HSL);
var ok = PHT_HSL.h >= 0.025 && PHT_HSL.h <= 0.12 && PHT_HSL.s >= 0.25 && PHT_HSL.l >= 0.07 && PHT_HSL.l <= 0.55;
if (!ok)
m.userData.phtWood = 0;
return ok;
}
var PHT_GEO = typeof WeakMap !== "undefined" ? new WeakMap() : null;
function phtMetre(g) {
if (!g || g.userData.mUV || !PHT_GEO)
return g;
var have = PHT_GEO.get(g);
if (have)
return have;
var p = g.parameters || {}, c = g.clone();
c.parameters = Object.assign({}, p);
if (g.type === "BoxGeometry")
metreUVs(c, "box", [p.width, p.height, p.depth]);
else if (g.type === "CylinderGeometry")
metreUVs(c, "cyl", [p.radiusTop, p.radiusBottom, p.height]);
else
return g;
c.userData.mUV = 1;
PHT_GEO.set(g, c);
return c;
}
function phtSweep() {
if (typeof scene === "undefined" || !scene || typeof landOpt !== "function" || !landOpt("detail"))
return;
if (typeof ATL_JOB !== "undefined" && ATL_JOB)
return;
var wood = texOf("wood");
if (!wood)
return;
var n = 0, stack = [scene];
while (stack.length && n < 4000) {
var o = stack.pop();
if (o.userData && o.userData.noPhoto)
continue;
if (o.isMesh && !o.isSkinnedMesh && !o.userData.phtSeen) {
o.userData.phtSeen = 1;
n++;
var t = o.geometry && o.geometry.type;
if ((t === "BoxGeometry" || t === "CylinderGeometry") && !Array.isArray(o.material) && phtWoody(o.material)) {
o.geometry = phtMetre(o.geometry);
o.material.map = wood;
o.material.userData.phtWood = 1;
o.material.needsUpdate = true;
}
}
var c = o.children;
for (var i = 0; i < c.length; i++)
stack.push(c[i]);
}
}
setInterval(function () { try {
phtSweep();
}
catch (e) { } }, 2500);
var WIN_PANE = {};
function winPaneTex(leaded) {
var k = leaded ? "lead" : "bars";
if (WIN_PANE[k])
return WIN_PANE[k];
if (typeof document === "undefined")
return null;
var N = 128, c = document.createElement("canvas");
c.width = c.height = N;
var x = c.getContext("2d", { willReadFrequently: true });
if (!x)
return null;
var gr = x.createLinearGradient(0, 0, 0, N);
gr.addColorStop(0, "rgb(250,250,250)");
gr.addColorStop(0.55, "rgb(222,222,222)");
gr.addColorStop(1, "rgb(196,196,196)");
x.fillStyle = gr;
x.fillRect(0, 0, N, N);
x.globalAlpha = 0.16;
x.fillStyle = "#fff";
x.beginPath();
x.moveTo(N * 0.15, 0);
x.lineTo(N * 0.42, 0);
x.lineTo(N * 0.05, N);
x.lineTo(-N * 0.22, N);
x.fill();
x.globalAlpha = 0.08;
x.beginPath();
x.moveTo(N * 0.55, 0);
x.lineTo(N * 0.63, 0);
x.lineTo(N * 0.3, N);
x.lineTo(N * 0.22, N);
x.fill();
x.globalAlpha = 1;
x.fillStyle = "rgb(58,58,58)";
if (leaded) {
x.strokeStyle = "rgb(50,50,50)";
x.lineWidth = 2.5;
for (var i = -N; i < 2 * N; i += 24) {
x.beginPath();
x.moveTo(i, 0);
x.lineTo(i + N, N);
x.stroke();
x.beginPath();
x.moveTo(i + N, 0);
x.lineTo(i, N);
x.stroke();
}
}
else {
x.fillRect(N / 2 - 3, 0, 6, N);
x.fillRect(0, N / 2 - 3, N, 6);
}
x.fillStyle = "rgb(90,90,90)";
x.fillRect(0, 0, N, 4);
x.fillRect(0, 0, 4, N);
x.fillRect(0, N - 4, N, 4);
x.fillRect(N - 4, 0, 4, N);
var t = new THREE.CanvasTexture(c);
t.anisotropy = 4;
WIN_PANE[k] = t;
return t;
}
var GLASS_ENV = { tex: null, want: false };
function glassEnv() {
if (GLASS_ENV.tex || GLASS_ENV.want || typeof THREE === "undefined" || !THREE.TextureLoader)
return GLASS_ENV.tex;
GLASS_ENV.want = true;
new THREE.TextureLoader().load("assets/textures/env/city.jpg", function (t) {
t.mapping = THREE.EquirectangularReflectionMapping;
GLASS_ENV.tex = t;
}, undefined, function () { GLASS_ENV.failed = true; });
return null;
}
function glassShine(dl) {
var env = glassEnv();
if (!env || typeof meshes === "undefined")
return;
var r = 0.06 + 0.22 * Math.max(0, Math.min(1, dl));
for (var id in meshes) {
var m = meshes[id];
if (!m || !m.userData.glass)
continue;
m.userData.glass.forEach(function (mat) {
if (!mat || mat.isMeshToonMaterial || !("envMap" in mat))
return;
if (mat.envMap !== env) {
mat.envMap = env;
mat.combine = THREE.MixOperation;
mat.needsUpdate = true;
}
mat.reflectivity = r;
});
}
if (typeof BAKE_ENVMATS !== "undefined")
BAKE_ENVMATS.forEach(function (mat) { mat.reflectivity = r; });
}
(function () {
if (typeof moveEveryone !== "function")
return;
var mv = moveEveryone;
moveEveryone = function (h, dl) { var o = mv.apply(this, arguments); GLASS_ENV.dl = dl; try {
glassShine(dl);
}
catch (e) { } return o; };
glassEnv();
setInterval(function () { if (GLASS_ENV.dl !== undefined)
try {
glassShine(GLASS_ENV.dl);
}
catch (e) { } }, 4000);
})();
(function () {
if (typeof gwI !== "function" || typeof GW_IGEO === "undefined")
return;
GW_IGEO.canopy = new THREE.IcosahedronGeometry(0.27, 1);
GW_IGEO.spray = leafGeo(0.56);
var gi = gwI, gs = gwIShow, gc = gwIColour, gb = gwIBuild;
gwI = function (kind, x, y, z, sx, sy, sz, ry, col) {
var h = gi.apply(this, arguments);
if (kind === "canopy")
h.sp = gi("spray", x, y, z, sx, sy === undefined ? sx : sy, sz === undefined ? sx : sz, (ry || 0) + 1.3, col);
return h;
};
function sp(hs) { var o = []; (hs || []).forEach(function (h) { if (h && h.sp)
o.push(h.sp); }); return o; }
gwIShow = function (hs, on) { var r = gs.apply(this, arguments); var s2 = sp(hs); if (s2.length)
gs(s2, on); return r; };
gwIColour = function (hs, col) { var r = gc.apply(this, arguments); var s2 = sp(hs); if (s2.length)
gc(s2, col); return r; };
gwIBuild = function (G) {
var r = gb.apply(this, arguments), L = GW.ins.spray;
if (L && L.mesh) {
L.mesh.material = leafMat(0xFFFFFF);
L.mesh.castShadow = false;
}
var C = GW.ins.canopy;
if (C && C.mesh && C.mesh.material.color)
C.mesh.material.color.setHex(0x8A948A);
return r;
};
})();
var FACADE = { kinds: { house: 1, apartment: 1, tower: 1, skyscraper: 1, motel: 1, hotel: 1, institution: 1, hospital: 1, school: 1, bank: 1, library: 1, station: 1, courthouse: 1, shop: 1, tenementblock: 1, farmhouse: 1, museum: 1, warehouse: 0 }, mat: null, sill: null };
function facadeMat() {
if (!FACADE.mat) {
FACADE.mat = new THREE.MeshLambertMaterial({ color: 0x9C968A });
var t = texOf("concrete");
if (t)
FACADE.mat.map = t;
}
return FACADE.mat;
}
function facadeDress(g, spec, def, parts) {
var B = bodyOf(parts);
if (!B || B.h < 3 || B.w < 4 || B.d < 4)
return;
var a = spec.attrs || {}, M = facadeMat(), n = 0;
function bx(w, h, d, x, y, z) { var m = new THREE.Mesh(geo("box", [w, h, d]), M); m.position.set(x, y, z); m.castShadow = false; m.receiveShadow = true; m.userData.facade = 1; g.add(m); n++; return m; }
bx(B.w + 0.24, 0.5, B.d + 0.24, B.x, 0.25, B.z);
bx(B.w + 0.6, 0.42, B.d + 0.6, B.x, B.h - 0.21, B.z);
bx(B.w + 0.3, 0.22, B.d + 0.3, B.x, B.h - 0.55, B.z);
if (B.h >= 7.5) {
var bands = [];
parts.forEach(function (pt) {
if (pt.c !== "glass" || pt.glow)
return;
var n1 = pt.rep ? pt.rep[0] : 1, n2 = pt.rep2 ? pt.rep2[0] : 1;
for (var i = 0; i < n1; i++)
for (var j = 0; j < n2; j++) {
var cy = pt.p[1] + (pt.rep ? pt.rep[2] * i : 0) + (pt.rep2 ? pt.rep2[2] * j : 0);
bands.push([cy - pt.s[1] / 2 - 0.15, cy + pt.s[1] / 2 + 0.15]);
}
});
for (var y = 1.8 + 3.2; y < B.h - 1.1; y += 3.2) {
var ly = y - 0.82;
if (bands.some(function (b) { return ly + 0.11 > b[0] && ly - 0.11 < b[1]; }))
continue;
bx(B.w + 0.4, 0.22, B.d + 0.4, B.x, ly, B.z);
}
}
else if (!LITE && (a.ws === undefined || a.ws === "square") && a.sw !== false) {
var ry = B.h < 4.2 ? Math.min(B.h * 0.55, B.h - 1) : 1.8, list = [];
[["back", B.w], ["left", B.d], ["right", B.d]].forEach(function (F) {
var cols = Math.max(1, Math.min(12, Math.floor((F[1] - 2.4) / 3.2) + 1)), span = (cols - 1) * 3.2;
for (var c = 0; c < cols; c++) {
var u = -span / 2 + c * 3.2;
if (F[0] === "back")
list.push([B.x - u, B.z - B.d / 2 - 0.14, 0]);
else if (F[0] === "left")
list.push([B.x - B.w / 2 - 0.14, B.z + u, 1]);
else
list.push([B.x + B.w / 2 + 0.14, B.z - u, 1]);
}
});
list.forEach(function (q) { if (q[2])
bx(0.3, 0.14, 1.6, q[0], ry - 0.8, q[1]);
else
bx(1.6, 0.14, 0.3, q[0], ry - 0.8, q[1]); });
}
return n;
}
(function () {
if (typeof addOpenings !== "function")
return;
var ao = addOpenings;
addOpenings = function (g, spec, def, parts, f, opa) {
var r = ao.apply(this, arguments);
try {
if (spec && spec.city && !spec.traffic && FACADE.kinds[spec.archetype] && !(opa < 0.99))
facadeDress(g, spec, def, parts);
}
catch (e) {
if (window.console)
console.warn("facade:", e);
}
return r;
};
})();
var SHIP_DRESS = { sail: null };
function shipSailTex() { return __ZC(307, 0, this, arguments, new.target); }
function shipDress(g) { return __ZC(307, 1, this, arguments, new.target); }
(function () {
if (typeof nvShip !== "function")
return;
var ns = nvShip;
nvShip = function () { var g = ns.apply(this, arguments); try {
shipDress(g);
}
catch (e) {
if (window.console)
console.warn("ship dress:", e);
} return g; };
})();
var STN_DRESS = {};
function stnCanvas(key, w, h, paint, ru, rv) { return __ZC(307, 2, this, arguments, new.target); }
function stnGrain(x, w, h, R, n, a) { for (var i = 0; i < n; i++) {
var v = R() < 0.5 ? 0 : 255;
x.fillStyle = "rgba(" + v + "," + v + "," + v + "," + (a * R()) + ")";
x.fillRect(R() * w, R() * h, 1 + R() * 2, 1);
} }
function stnWallTex() { return __ZC(307, 3, this, arguments, new.target); }
function stnFloorTex() { return __ZC(307, 4, this, arguments, new.target); }
function stnCeilTex() {
return stnCanvas("ceil", 128, 128, function (x, w, h, R) {
x.fillStyle = "#646E7E";
x.fillRect(0, 0, w, h);
x.fillStyle = "#3E4654";
for (var yy = 8; yy < h; yy += 8)
for (var xx = 8; xx < w; xx += 8)
x.fillRect(xx - 1, yy - 1, 2, 2);
x.fillStyle = "#2E3440";
x.fillRect(0, 0, w, 2);
x.fillRect(0, 0, 2, h);
}, 1 / 2, 1 / 2);
}
function stnScreenTex(k) { return __ZC(307, 5, this, arguments, new.target); }
function stnDress(G) { return __ZC(307, 6, this, arguments, new.target); }
(function () {
if (typeof stnBuild !== "function")
return;
var sb = stnBuild;
stnBuild = function (G) { var r = sb.apply(this, arguments); try {
stnDress(G);
}
catch (e) {
if (window.console)
console.warn("station dress:", e);
} return r; };
})();
var WAVES = { tex: null, list: [], t0: 0, tile: 9 };
function wavesTex() { return __ZC(307, 7, this, arguments, new.target); }
function wavesOn(mesh, size, strength) { return __ZC(307, 8, this, arguments, new.target); }
function wavesTick() {
var now = performance.now() / 1000, tile = WAVES.tile, v = new THREE.Vector3();
if (typeof SEA !== "undefined" && SEA.deep && !SEA.deep.userData.waves)
wavesOn(SEA.deep, 40000, 0.32);
WAVES.list.forEach(function (w) { wavesOne(w, now, v); });
}
function wavesOne(w, now, v) {
if (!w.m.visible || !w.m.parent)
return;
v = v || new THREE.Vector3();
w.m.getWorldPosition(v);
w.t.offset.set((v.x / WAVES.tile + now * 0.018) % 1, (-v.z / WAVES.tile + now * 0.011) % 1);
}
(function () {
var V = new THREE.Vector3();
function after(w) { if (w && w.userData && w.userData.waves)
for (var i = 0; i < WAVES.list.length; i++)
if (WAVES.list[i].m === w) {
wavesOne(WAVES.list[i], performance.now() / 1000, V);
break;
} }
if (typeof wWaterTick === "function") {
var wt = wWaterTick;
wWaterTick = function (w) { var r = wt.apply(this, arguments); try {
after(w);
}
catch (e) { } return r; };
}
if (typeof seaTick === "function") {
var st = seaTick;
seaTick = function () { var r = st.apply(this, arguments); try {
if (SEA.deep) {
if (!SEA.deep.userData.waves)
wavesOn(SEA.deep, 40000, 0.32);
after(SEA.deep);
}
}
catch (e) { } return r; };
}
})();
(function () {
if (typeof wWater !== "function")
return;
var ww = wWater;
wWater = function (size, seg, col, amp, opts) { var w = ww.apply(this, arguments); try {
wavesOn(w, size, 0.4);
}
catch (e) { } return w; };
setInterval(function () { try {
if (typeof WLD !== "undefined" && WLD.on)
wavesTick();
}
catch (e) { } }, 40);
})();
var BW_SPRAY = [];
(function () {
if (typeof BW_CV === "undefined" || typeof bwFlush !== "function")
return;
var pine = BW_CV.pine, thicket = BW_CV.thicket;
if (pine)
BW_CV.pine = function (x, z, R) {
var seq = [];
function R2() { var v = R(); seq.push(v); return v; }
var r = pine.call(this, x, z, R2), y = bwH(x, z), h = 7 + seq[0] * 6;
for (var i = 0; i < 3; i++)
BW_SPRAY.push([x, y + h * (0.36 + i * 0.18), z, (2.6 - i * 0.6) * 0.85, h * 0.2, [0x3E5E30, 0x34542A, 0x46663A][i], i * 1.7 + x]);
BW_SPRAY.push([x, y + h * 0.9, z, 0.7, h * 0.12, 0x3A5A2E, z]);
return r;
};
if (thicket)
BW_CV.thicket = function (x, z, R, col) {
var seq = [];
function R2() { var v = R(); seq.push(v); return v; }
var r = thicket.call(this, x, z, R2, col), y = bwH(x, z), rr = 2.2 + (seq[1] || 0.5) * 1.6, n = GW_LITE_BW() ? 3 : 5;
for (var i = 0; i < n; i++) {
var a = i / n * 6.283 + (seq[i + 2] || 0) * 2, d = rr * 0.45 * ((seq[i + 3] || 0.5) + 0.3);
BW_SPRAY.push([x + Math.cos(a) * d, y + 1.15, z + Math.sin(a) * d, 2.1, 1.3, col || [0x5A7A3A, 0x4E6E34, 0x667E42][i % 3], a]);
}
return r;
};
function GW_LITE_BW() { return typeof LITE !== "undefined" && LITE; }
var bf = bwFlush;
bwFlush = function (G) {
var r = bf.apply(this, arguments);
try {
if (BW_SPRAY.length && typeof leafGeo === "function") {
var im = new THREE.InstancedMesh(leafGeo(1), leafMat(0xFFFFFF), BW_SPRAY.length), m4 = new THREE.Matrix4(), q = new THREE.Quaternion(), e = new THREE.Euler(), c = new THREE.Color();
BW_SPRAY.forEach(function (s, i) { e.set(0, s[6] || 0, 0); q.setFromEuler(e); m4.compose(new THREE.Vector3(s[0], s[1], s[2]), q, new THREE.Vector3(s[3], s[4], s[3])); im.setMatrixAt(i, m4); c.setHex(s[5]); im.setColorAt(i, c); });
im.instanceMatrix.needsUpdate = true;
if (im.instanceColor)
im.instanceColor.needsUpdate = true;
im.frustumCulled = false;
im.castShadow = false;
im.userData.noPhoto = 1;
G.add(im);
}
}
catch (e2) {
if (window.console)
console.warn("bw sprays:", e2);
}
BW_SPRAY = [];
return r;
};
})();
var SEA_SPR = null;
(function () {
if (typeof seaTree !== "function" || typeof seaIsland !== "function")
return;
var st = seaTree, si = seaIsland;
seaTree = function (g, x, y, z, kind, R) {
var seq = [];
function R2() { var v = R(); seq.push(v); return v; }
var n0 = g.children.length, r = st.call(this, g, x, y, z, kind, R2);
if (SEA_SPR) {
for (var ci = n0; ci < g.children.length; ci++) {
var o = g.children[ci];
if (o.isMesh && o.geometry && o.geometry.type === "SphereGeometry") {
o.scale.multiplyScalar(0.62);
if (o.material && o.material.color && !o.material.userData.seaCore) {
o.material = o.material.clone();
o.material.color.multiplyScalar(0.7);
o.material.userData.seaCore = 1;
}
}
}
if (kind === "oak" || kind === undefined)
SEA_SPR.push([x, y + 6.6, z, 3.9, 3.2, 0x5E9A46]);
else if (kind === "olive")
SEA_SPR.push([x, y + 4.2, z, 2.9, 2.0, 0xB4C496]);
else if (kind === "cypress") {
var h = 9 + (seq[0] || 0.5) * 3;
SEA_SPR.push([x, y + 6.5, z, 1.5, h * 0.5, 0x4E7A42]);
}
}
return r;
};
seaIsland = function (G, p) {
SEA_SPR = [];
var r;
try {
r = si.apply(this, arguments);
if (SEA_SPR.length && p.g && typeof leafGeo === "function") {
var im = new THREE.InstancedMesh(leafGeo(1), leafMat(0xFFFFFF), SEA_SPR.length), m4 = new THREE.Matrix4(), q = new THREE.Quaternion(), e = new THREE.Euler(), c = new THREE.Color();
SEA_SPR.forEach(function (s, i) { e.set(0, s[0] * 0.37 + s[2] * 0.11, 0); q.setFromEuler(e); m4.compose(new THREE.Vector3(s[0], s[1], s[2]), q, new THREE.Vector3(s[3], s[4], s[3])); im.setMatrixAt(i, m4); c.setHex(s[5]); im.setColorAt(i, c); });
im.instanceMatrix.needsUpdate = true;
if (im.instanceColor)
im.instanceColor.needsUpdate = true;
im.castShadow = false;
im.userData.noPhoto = 1;
im.geometry.computeBoundingSphere();
im.frustumCulled = false;
p.g.add(im);
}
}
finally {
SEA_SPR = null;
}
return r;
};
})();
function orbCabinTex() { return __ZC(307, 9, this, arguments, new.target); }
function orbFabricTex() { return __ZC(307, 10, this, arguments, new.target); }
function orbCarpetTex() { return __ZC(307, 11, this, arguments, new.target); }
function orbDress(G) { return __ZC(307, 12, this, arguments, new.target); }
(function () {
if (typeof orbBuild !== "function")
return;
var ob = orbBuild;
orbBuild = function (G) { var r = ob.apply(this, arguments); try {
orbDress(G);
}
catch (e) {
if (window.console)
console.warn("cabin dress:", e);
} return r; };
})();
function spHullTex() { return __ZC(307, 13, this, arguments, new.target); }
function spSolarTex() { return __ZC(307, 14, this, arguments, new.target); }
function spStationDress(g) { return __ZC(307, 15, this, arguments, new.target); }
(function () {
if (typeof spStation !== "function")
return;
var ss = spStation;
spStation = function () { var g = ss.apply(this, arguments); try {
spStationDress(g);
}
catch (e) {
if (window.console)
console.warn("station hull:", e);
} return g; };
})();
function sfFoilTex() { return __ZC(307, 16, this, arguments, new.target); }
function sfRegolithTex() { return __ZC(307, 17, this, arguments, new.target); }
var SF_ROCKS = null;
function sfRockGeos() { return __ZC(307, 18, this, arguments, new.target); }
function sfStrut(a, b, r, mat, parent) {
var d = new THREE.Vector3().subVectors(b, a), L = d.length(), m = new THREE.Mesh(new THREE.CylinderGeometry(r, r, L, 6), mat);
m.position.copy(a).add(b).multiplyScalar(0.5);
m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), d.normalize());
parent.add(m);
return m;
}
function sfLanderReal() { return __ZC(307, 19, this, arguments, new.target); }
function sfDress(G, k) { return __ZC(307, 20, this, arguments, new.target); }
(function () {
if (typeof sfLander === "function")
sfLander = function () { return sfLanderReal(); };
if (typeof sfBuild !== "function")
return;
var sb = sfBuild;
sfBuild = function (k) { var r = sb.apply(this, arguments); try {
sfDress(WORLDS.surface.g, k);
}
catch (e) {
if (window.console)
console.warn("surface dress:", e);
} return r; };
})();
var BLADE = { geo: {}, mat: null };
function bladeSteel() { return BLADE.mat || (BLADE.mat = new THREE.MeshPhongMaterial({ color: 0x969CA4, specular: 0x5A6068, shininess: 50 })); }
function bladeGeo(len, w, leaf) { return __ZC(307, 21, this, arguments, new.target); }
function bladeGrip(g, len, r, y, col) { return __ZC(307, 22, this, arguments, new.target); }
function bladeMake(o) { return __ZC(307, 23, this, arguments, new.target); }
(function () {
if (typeof HELD === "undefined")
return;
HELD.sword = function () { return bladeMake({ len: 0.8, w: 0.06, base: 0.05, guard: 0.22, grip: 0.15, gr: 0.017 }); };
HELD.dagger = function () { return bladeMake({ len: 0.3, w: 0.045, base: 0.04, guard: 0.12, grip: 0.1, gr: 0.014 }); };
if (HELD.bwGreatsword)
HELD.bwGreatsword = function () { return bladeMake({ len: 1.35, w: 0.09, base: 0.1, guard: 0.4, grip: 0.36, gr: 0.022, guardCol: 0x6A5A3A }); };
HELD.axe = function () {
var g = new THREE.Group();
var haft = new THREE.Mesh(new THREE.CylinderGeometry(0.016, 0.021, 0.62, 8), new THREE.MeshLambertMaterial({ color: 0x6A4A2C, map: (typeof texOf === "function" ? texOf("wood") : null) }));
haft.position.y = 0.1;
g.add(haft);
var s = new THREE.Shape();
s.moveTo(0, 0.05);
s.lineTo(0.08, 0.06);
s.quadraticCurveTo(0.17, 0.1, 0.2, 0.13);
s.quadraticCurveTo(0.21, 0, 0.19, -0.1);
s.quadraticCurveTo(0.12, -0.06, 0.07, -0.04);
s.lineTo(0, -0.04);
s.closePath();
var hg = new THREE.ExtrudeGeometry(s, { depth: 0.006, bevelEnabled: true, bevelThickness: 0.007, bevelSize: 0.01, bevelSegments: 1, curveSegments: 6 });
hg.translate(0, 0, -0.003);
var head = new THREE.Mesh(hg, bladeSteel());
head.position.set(0.01, 0.36, 0);
g.add(head);
var eye = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.1, 8), new THREE.MeshLambertMaterial({ color: 0x4A4E56 }));
eye.position.y = 0.36;
g.add(eye);
return g;
};
HELD.spear = function () {
var g = new THREE.Group();
var sh = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 2.1, 7), new THREE.MeshLambertMaterial({ color: 0x5A3A22, map: (typeof texOf === "function" ? texOf("wood") : null) }));
sh.position.y = 0.35;
g.add(sh);
var sk = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.022, 0.12, 8), new THREE.MeshLambertMaterial({ color: 0x4A4E56 }));
sk.position.y = 1.43;
g.add(sk);
var hd = new THREE.Mesh(bladeGeo(0.26, 0.07, true), bladeSteel());
hd.position.y = 1.48;
g.add(hd);
return g;
};
})();
function wGroundDetailTex() { return __ZC(307, 24, this, arguments, new.target); }
(function () {
if (typeof wGround !== "function")
return;
var wg = wGround;
wGround = function (s, n, fn, mat) {
var m = wg.apply(this, arguments);
try {
if (!mat && m.material && !m.material.map) {
var t = wGroundDetailTex().clone();
t.needsUpdate = true;
t.repeat.set(s / 5, s / 5);
m.material.map = t;
m.material.needsUpdate = true;
}
}
catch (e) { }
return m;
};
})();
(function () {
if (typeof nvHangmansTree !== "function")
return;
var nh = nvHangmansTree;
nvHangmansTree = function (G) {
var n0 = G.children.length, r = nh.apply(this, arguments);
try {
var g = G.children[n0];
if (g && typeof leafGeo === "function") {
var lm = leafMat(0x4A8A3A), bk = null;
g.children.slice().forEach(function (o) {
if (!o.isMesh || !o.material || !o.material.color)
return;
var hx = o.material.color.getHex(), t = o.geometry.type;
if ((hx === 0x2E6A26 || o.material.userData.nvCrown) && t === "SphereGeometry") {
var rad = o.geometry.parameters.radius;
o.scale.setScalar(0.7);
o.material.color.setHex(0x24501E);
o.material.userData.nvCrown = 1;
var sp = new THREE.Mesh(leafGeo(rad * 1.15), lm);
sp.position.copy(o.position);
sp.rotation.set(o.position.x * 0.3, o.position.z * 0.2, 0);
g.add(sp);
}
else if (hx === 0x5A3E26 && t === "CylinderGeometry" && typeof texOf === "function") {
if (!bk) {
bk = o.material;
var bt = texOf("bark");
if (bt) {
bt = bt.clone();
bt.needsUpdate = true;
bt.repeat.set(4, 3);
bk.map = bt;
bk.color.setHex(0x8A6A4A);
bk.needsUpdate = true;
}
}
}
});
}
}
catch (e) {
if (window.console)
console.warn("hangman's tree:", e);
}
return r;
};
})();
(function () {
if (typeof dkGuardMesh !== "function")
return;
var dg = dkGuardMesh;
dkGuardMesh = function () {
var g = dg.apply(this, arguments);
try {
var rocks = sfRockGeos(), n = 0, sm = null, extra = [];
g.children.forEach(function (o) {
if (!o.isMesh || o.geometry.type !== "BoxGeometry" || !o.material || !o.material.color)
return;
var P = o.geometry.parameters, hx = o.material.color.getHex();
if (hx === 0x6E6A78 || o.material === sm) {
if (!sm) {
sm = o.material;
var st = typeof texOf === "function" ? texOf("stone") : null;
if (st) {
sm.map = st;
sm.color.setHex(0x8A8694);
sm.needsUpdate = true;
}
}
o.geometry = rocks[(n++) % 3];
o.scale.set(P.width * 0.62, P.height * 0.7, P.depth * 0.72);
if (Math.abs(o.position.y - 0.65) < 0.01) {
o.scale.set(0.26, 0.75, 0.3);
o.position.x = -0.24;
var l2 = new THREE.Mesh(rocks[(n++) % 3], sm);
l2.position.set(0.24, 0.65, 0);
l2.scale.set(0.26, 0.75, 0.3);
extra.push(l2);
}
}
else if (P.height > 2) {
o.geometry = new THREE.OctahedronGeometry(1, 0);
o.scale.set(0.09, 1.15, 0.05);
}
});
extra.forEach(function (m) { g.add(m); });
}
catch (e) {
if (window.console)
console.warn("guardian dress:", e);
}
return g;
};
})();
