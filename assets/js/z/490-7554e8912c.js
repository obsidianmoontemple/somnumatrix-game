/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(490, function () {
"use strict";
return [
function (x, z) {
var best = -9, i, L, d;
for (i = 0; i < NVG_LAND.length; i++) {
L = NVG_LAND[i];
var dx = x - L.x, dz = z - L.z;
d = Math.sqrt(dx * dx + dz * dz);
if (d > L.r * 1.45)
continue;
var a = Math.atan2(dz, dx), edge = L.r + Math.sin(a * 3 + L.s) * L.r * 0.07 + Math.sin(a * 7 + L.s * 2) * L.r * 0.035 + (wFbm(Math.cos(a) * 2 + L.s, Math.sin(a) * 2 + L.s, 60 + L.s, 3) - 0.5) * L.r * 0.22;
var t = (edge - d) / 90;
if (t > best)
best = t;
}
for (i = 0; i < NVG_NECK.length; i++) {
var N = NVG_NECK[i];
d = nvgSegD(x, z, N[0], N[1], N[2], N[3]);
if (d > N[4])
continue;
var tn = (N[4] / 2 - d + (wFbm(x * 0.01, z * 0.01, 71, 2) - 0.5) * 40) / 60;
if (tn > best)
best = tn;
}
for (i = 0; i < NVG_ISLE.length; i++) {
var I = NVG_ISLE[i];
d = Math.hypot(x - I.x, z - I.z);
if (d > I.r * 2)
continue;
var ti = (I.r - d) / 22;
if (ti > best)
best = ti;
}
return best;
},
function () {
if (NVG.river)
return NVG.river;
var P = NVG_RIVER, segs = [], tot = 0, i;
for (i = 0; i < P.length - 1; i++) {
var l = Math.hypot(P[i + 1][0] - P[i][0], P[i + 1][1] - P[i][1]);
segs.push({ a: P[i], b: P[i + 1], l: l, s0: tot });
tot += l;
}
var n = 120, lv = [], run = 1e9;
for (i = 0; i <= n; i++) {
var s = i / n * tot, p = nvgRiverAt(segs, s), h = nvgRaw(p[0], p[1]);
run = Math.min(run, h - 2.4);
lv.push(Math.max(0.25, i === n ? 0.25 : run));
}
for (i = n - 14; i <= n; i++) {
var k = (i - (n - 14)) / 14;
lv[i] = lv[i] * (1 - k) + 0.25 * k;
}
NVG.river = { segs: segs, tot: tot, lv: lv, n: n };
return NVG.river;
},
function (x, z) {
var R = NVG.river;
if (!R)
return null;
var best = null;
for (var i = 0; i < R.segs.length; i++) {
var S = R.segs[i], dx = S.b[0] - S.a[0], dz = S.b[1] - S.a[1], t = Math.max(0, Math.min(1, ((x - S.a[0]) * dx + (z - S.a[1]) * dz) / (S.l * S.l)));
var d = Math.hypot(x - S.a[0] - dx * t, z - S.a[1] - dz * t);
if (!best || d < best.d)
best = { d: d, s: S.s0 + t * S.l };
}
var f = best.s / R.tot * R.n, i0 = Math.floor(f), k = f - i0;
best.y = R.lv[Math.min(R.n, i0)] * (1 - k) + R.lv[Math.min(R.n, i0 + 1)] * k;
best.w = 6 + best.s / R.tot * 9;
return best;
},
function (x, z) {
var t = nvgLandT(x, z);
if (t <= 0)
return Math.max(-6, t * 14);
var land = Math.min(1, t), hills = (wFbm(x * 0.004 + 3, z * 0.004 + 5, 91, 4) - 0.36) * 72, h = 1.2 + Math.max(0, hills) * land;
for (var i = 0; i < NVG_PEAK.length; i++) {
var P = NVG_PEAK[i], d = Math.hypot(x - P.x, z - P.z);
if (d >= P.r)
continue;
var k = 1 - d / P.r, rid = 1 - Math.abs(wFbm(x * 0.008 + P.x * 0.001, z * 0.008, 5 + i, 3) * 2 - 1);
h += P.h * k * k * (0.72 + 0.42 * rid) * land;
}
if (t < 1)
h = 1.2 * t + (h - 1.2) * t * t;
for (var j = 0; j < NVG_PADS.length; j++) {
var Q = NVG_PADS[j], dq = Math.hypot(x - Q[0], z - Q[1]);
if (dq < Q[2]) {
var kq = Math.min(1, (1 - dq / Q[2]) * 2.2);
h = h + (Q[3] - h) * kq;
}
}
return h;
},
function (x, z) {
var h = nvgRaw(x, z);
if (h <= -1)
return h;
var R = NVG.river || nvgRiverMake(), q = nvgRiverNear(x, z);
if (q && q.d < q.w + 46) {
if (q.d < q.w)
h = Math.min(h, q.y - 1.7 + Math.pow(q.d / q.w, 2) * 1.3);
else {
var k = nvgS(0, 46, q.d - q.w);
h = Math.min(h, (q.y + 0.5) * (1 - k) + h * k);
h = Math.max(h, q.y + 0.35 * (1 - k));
}
}
return h;
},
function (name, mpt) {
var key = name + ":" + mpt;
if (NVG.tex[key])
return NVG.tex[key];
var t = new THREE.TextureLoader().load("assets/textures/photo/" + name + (NVG.lite ? "" : "-1k") + ".jpg");
t.wrapS = t.wrapT = THREE.RepeatWrapping;
t.repeat.set(1 / mpt, 1 / mpt);
try {
t.anisotropy = Math.min(NVG.lite ? 2 : 8, renderer.capabilities.getMaxAnisotropy());
}
catch (e) { }
if (THREE.sRGBEncoding && typeof renderer !== "undefined" && renderer && renderer.outputEncoding === THREE.sRGBEncoding)
t.encoding = THREE.sRGBEncoding;
return (NVG.tex[key] = t);
},
function (g) {
var p = g.attributes.position, n = g.attributes.normal, uv = g.attributes.uv;
if (!uv || !n)
return g;
for (var i = 0; i < uv.count; i++) {
var nx = Math.abs(n.getX(i)), ny = Math.abs(n.getY(i)), X = p.getX(i), Y = p.getY(i), Z = p.getZ(i);
if (ny > 0.5)
uv.setXY(i, X, Z);
else if (nx > 0.5)
uv.setXY(i, Z, Y);
else
uv.setXY(i, X, Y);
}
uv.needsUpdate = true;
return g;
},
function (name, tint, mpt, o) {
o = o || {};
var key = "s:" + name + ":" + tint + ":" + mpt + (o.ds ? 1 : 0);
if (NVG.mats[key])
return NVG.mats[key];
var map = name ? nvgTex(name, mpt) : null, m;
if (NVG.lite)
m = new THREE.MeshLambertMaterial({ color: tint, map: map });
else
m = new THREE.MeshPhongMaterial({ color: tint, map: map, shininess: o.shine || 5, specular: o.spec || 0x141210 });
if (o.ds)
m.side = THREE.DoubleSide;
return (NVG.mats[key] = m);
},
function () {
if (NVG.mats.ground)
return NVG.mats.ground;
var m = new THREE.MeshLambertMaterial({ color: 0xFFFFFF, vertexColors: true });
var U = { tS: { value: nvgTex("sand", 1) }, tG: { value: nvgTex("grass", 1) }, tR: { value: nvgTex("stone", 1) }, tN: { value: nvgTex("snow", 1) }, tE: { value: nvgTex("earth", 1) } };
var lin = THREE.sRGBEncoding && typeof renderer !== "undefined" && renderer && renderer.outputEncoding === THREE.sRGBEncoding;
["tS", "tG", "tR", "tN", "tE"].forEach(function (k) { U[k].value.encoding = THREE.LinearEncoding; });
m.onBeforeCompile = function (sh) {
for (var k in U)
sh.uniforms[k] = U[k];
sh.vertexShader = NVG_GROUND_VS + sh.vertexShader.replace("#include <begin_vertex>", "#include <begin_vertex>\n vNvgW=nvgW; vNvgP=position.xz;");
sh.fragmentShader = "uniform sampler2D tS; uniform sampler2D tG; uniform sampler2D tR; uniform sampler2D tN; uniform sampler2D tE;\nvarying vec4 vNvgW;\nvarying vec2 vNvgP;\n" +
"vec3 nvgL(vec3 c){ " + (lin ? "return pow(c,vec3(2.2));" : "return c;") + " }\n" + sh.fragmentShader.replace("#include <color_fragment>", "#include <color_fragment>\n" +
" vec2 P=vNvgP;\n" +
" vec3 cs=nvgL(texture2D(tS,P/5.0).rgb);\n" +
" vec3 cg=mix(nvgL(texture2D(tG,P/4.0).rgb),nvgL(texture2D(tG,P/17.0+0.37).rgb),0.45);\n" +
" vec3 cr=mix(nvgL(texture2D(tR,P/7.0).rgb),nvgL(texture2D(tR,P/23.0).rgb),0.4);\n" +
" vec3 cn=nvgL(texture2D(tN,P/6.0).rgb);\n" +
" vec3 ce=nvgL(texture2D(tE,P/5.0).rgb);\n" +
" float sg=max(0.0,1.0-vNvgW.x-vNvgW.y-vNvgW.z-vNvgW.w);\n" +
" vec3 cm=cs*vNvgW.x+cg*vNvgW.y+cr*vNvgW.z+cn*vNvgW.w+ce*sg;\n" +
" diffuseColor.rgb*=cm*" + (lin ? "1.6" : "1.25") + ";\n");
};
m.customProgramCacheKey = function () { return "nvgGround" + (lin ? 1 : 0); };
return (NVG.mats.ground = m);
},
function (G) {
G.children.slice().forEach(function (c) { var p = c.geometry && c.geometry.parameters; if (c.isMesh && p && p.width === 2000 && p.height === 2000 && c.material && c.material.vertexColors) {
G.remove(c);
c.geometry.dispose();
} });
var T = 400, segs = NVG.lite ? 24 : 44, mat = nvgGroundMat(), cTmp = new THREE.Color();
for (var tx = -2200; tx < 1400; tx += T)
for (var tz = -2800; tz < 1200; tz += T) {
var cx = tx + T / 2, cz = tz + T / 2, any = false;
for (var a = 0; a <= 6 && !any; a++)
for (var b = 0; b <= 6 && !any; b++) {
if (nvHeight(tx + a * T / 6, tz + b * T / 6) > -4.5)
any = true;
}
if (!any)
continue;
var g = new THREE.PlaneGeometry(T, T, segs, segs);
g.rotateX(-Math.PI / 2);
var p = g.attributes.position, n = p.count, W = new Float32Array(n * 4), C = new Float32Array(n * 3);
for (var i = 0; i < n; i++) {
var x = p.getX(i) + cx, z = p.getZ(i) + cz;
p.setXYZ(i, x, nvHeight(x, z), z);
}
g.computeVertexNormals();
var nr = g.attributes.normal;
for (var j = 0; j < n; j++) {
var X = p.getX(j), Y = p.getY(j), Z = p.getZ(j), ny = nr.getY(j);
var sand = 1 - nvgS(1.6, 3.4, Y), rock = Math.max(nvgS(0.86, 0.7, ny), nvgS(150, 215, Y) * 0.85), snow = nvgS(228, 262, Y) * nvgS(0.62, 0.8, ny);
if (Y < -0.3) {
sand = 0.4;
rock = 0.6;
}
var wood = nvgS(0.5, 0.62, nvgWoodK(X, Z)) * (1 - sand) * (1 - rock) * 0.75, rv = nvgRiverNear(X, Z), wet = rv && rv.d < rv.w + 3 ? 1 : 0;
if (wet) {
rock = Math.max(rock, 0.55);
sand = Math.max(sand, 0.25);
}
var tk = typeof nvgTownK === "function" ? nvgTownK(X, Z) : 0;
if (tk > 0.3) {
var tl = nvgTL(X, Z), core = tk > 0.9 && tl.lx < 215 ? 1 : 0.35;
sand = sand * (1 - tk) + 0.2 * tk;
rock = rock * (1 - tk);
snow = 0;
wood = 0.8 * tk * core;
}
var grass = Math.max(0, 1 - sand - rock - snow - wood);
rock = rock * (1 - snow);
var sum = sand + grass + rock + snow + wood;
W[j * 4] = sand / sum;
W[j * 4 + 1] = grass / sum;
W[j * 4 + 2] = rock / sum;
W[j * 4 + 3] = snow / sum;
var nz = wFbm(X * 0.02, Z * 0.02, 12, 3), gc = NVG_GC.grass.clone().lerp(NVG_GC.lush, Math.max(0, 0.55 - nz) * 1.4).lerp(NVG_GC.dry, Math.max(0, nz - 0.55) * 1.6);
var we = Math.max(0, 1 - W[j * 4] - W[j * 4 + 1] - W[j * 4 + 2] - W[j * 4 + 3]), cs = [NVG_GC.sand, gc, NVG_GC.rock, NVG_GC.snow, NVG_GC.earth], ws = [W[j * 4], W[j * 4 + 1], W[j * 4 + 2], W[j * 4 + 3], we], cc = cTmp.setRGB(0, 0, 0);
for (var q = 0; q < 5; q++) {
cc.r += cs[q].r * ws[q];
cc.g += cs[q].g * ws[q];
cc.b += cs[q].b * ws[q];
}
if (Y < -0.3)
cc.lerp(NVG_GC.wet, 0.6);
C[j * 3] = cc.r;
C[j * 3 + 1] = cc.g;
C[j * 3 + 2] = cc.b;
}
g.setAttribute("nvgW", new THREE.BufferAttribute(W, 4));
g.setAttribute("color", new THREE.BufferAttribute(C, 3));
g.computeBoundingSphere();
var mesh = new THREE.Mesh(g, mat);
mesh.name = "nvg-ground";
mesh.receiveShadow = true;
mesh.userData.keep = 1;
G.add(mesh);
NVG.tiles.push({ g: mesh, x: cx, z: cz });
}
},
function (G) {
var R = nvgRiverMake(), n = R.n, pos = [], uv = [], idx = [];
for (var i = 0; i <= n; i++) {
var s = i / n * R.tot, p = nvgRiverAt(R.segs, s), p2 = nvgRiverAt(R.segs, Math.min(R.tot, s + 4)), dx = p2[0] - p[0], dz = p2[1] - p[1], l = Math.hypot(dx, dz) || 1, w = 6 + s / R.tot * 9 + 1.5;
var nx = -dz / l, nz = dx / l, y = R.lv[i] - 0.35;
pos.push(p[0] + nx * w, y, p[1] + nz * w, p[0] - nx * w, y, p[1] - nz * w);
uv.push(0, s / 9, w / 4.5, s / 9);
if (i) {
var b = (i - 1) * 2;
idx.push(b, b + 2, b + 1, b + 1, b + 2, b + 3);
}
}
var g = new THREE.BufferGeometry();
g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
g.setIndex(idx);
g.computeVertexNormals();
var t = wTex(64, 256, function (x, W, H) { x.fillStyle = "#3A7A98"; x.fillRect(0, 0, W, H); for (var k = 0; k < 140; k++) {
x.fillStyle = "rgba(220,240,250," + (0.05 + Math.random() * 0.12) + ")";
x.fillRect(Math.random() * W, Math.random() * H, 2 + Math.random() * 10, 1 + Math.random() * 2);
} }, [1, 1]);
var m = new THREE.MeshPhongMaterial({ color: 0x6AA8C0, map: t, transparent: true, opacity: 0.86, shininess: 90, specular: 0xA8C8D8, side: THREE.DoubleSide, depthWrite: false });
var w = new THREE.Mesh(g, m);
w.renderOrder = 2;
w.name = "nvg-river";
G.add(w);
NVG.riverMesh = t;
},
function (col) {
var k = "leaf" + col;
if (NVG.mats[k])
return NVG.mats[k];
var m;
if (NVG.lite)
m = new THREE.MeshLambertMaterial({ color: col, side: THREE.DoubleSide });
else {
var t = new THREE.TextureLoader().load("assets/textures/photo/leaves.png");
t.wrapS = t.wrapT = THREE.RepeatWrapping;
m = new THREE.MeshLambertMaterial({ color: col, map: t, side: THREE.DoubleSide });
}
return (NVG.mats[k] = m);
},
function (seed, sx, sy, sz, det) {
var g = new THREE.IcosahedronGeometry(1, det), p = g.attributes.position;
for (var i = 0; i < p.count; i++) {
var x = p.getX(i), y = p.getY(i), z = p.getZ(i), n = 0.74 + 0.5 * wFbm(x * 1.7 + seed, z * 1.7 + y * 1.3, seed, 2);
p.setXYZ(i, x * sx * n, y * sy * n, z * sz * n);
}
g.computeVertexNormals();
var uv = g.attributes.uv;
for (var j = 0; j < uv.count; j++)
uv.setXY(j, p.getX(j) * 0.35 + p.getZ(j) * 0.2, p.getY(j) * 0.35);
return g;
},
function (n, len, wid, droop, top) {
var pos = [], uv = [], idx = [], seg = NVG.lite ? 4 : 7, base = 0;
for (var f = 0; f < n; f++) {
var a = f / n * Math.PI * 2 + (f % 2) * 0.2, ca = Math.cos(a), sa = Math.sin(a), lift = 0.5 + ((f * 7) % 3) * 0.18;
for (var s = 0; s <= seg; s++) {
var t = s / seg, r = t * len, y = top + Math.sin(t * Math.PI * 0.7) * lift * len * 0.3 - t * t * droop * len, w = wid * (1 - t * 0.85) * (0.4 + Math.sin(Math.min(1, t * 3) * Math.PI / 2) * 0.6);
var px = ca * r, pz = sa * r;
pos.push(px - sa * w, y, pz + ca * w, px + sa * w, y, pz - ca * w);
uv.push(0, t * 4, 1, t * 4);
if (s) {
var b = base + (s - 1) * 2;
idx.push(b, b + 1, b + 2, b + 1, b + 3, b + 2);
}
}
base += (seg + 1) * 2;
}
var g = new THREE.BufferGeometry();
g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
g.setIndex(idx);
g.computeVertexNormals();
return g;
},
function (r0, r1, h, bend, seg) {
var g = new THREE.CylinderGeometry(r1, r0, h, seg || (NVG.lite ? 5 : 8), NVG.lite ? 2 : 5);
g.translate(0, h / 2, 0);
var p = g.attributes.position;
for (var i = 0; i < p.count; i++) {
var y = p.getY(i) / h;
p.setX(i, p.getX(i) + y * y * (bend || 0));
if (y < 0.12) {
var fl = 1 + (0.12 - y) * 3.2;
p.setX(i, p.getX(i) * fl);
p.setZ(i, p.getZ(i) * fl);
}
}
g.computeVertexNormals();
nvgUV(g);
return g;
},
function () {
if (NVG_TREE.kinds && NVG_TREE.lite === NVG.lite)
return NVG_TREE.kinds;
var d = NVG.lite ? 0 : 1, bark = nvgSurf("bark", 0x9A8A78, 1.4), palmBark = nvgSurf("bark", 0xC0A47C, 1.0), dark = nvgSurf("bark", 0x6A5A4A, 1.2);
NVG_TREE.lite = NVG.lite;
return (NVG_TREE.kinds = {
broad: [{ g: nvgCrownGeo(3, 5.6, 3.6, 5.2, d).translate(0, 11.5, 0), m: nvgLeafMat(0x3E7A30) }, { g: nvgCrownGeo(9, 3.6, 2.6, 3.4, d).translate(3.2, 9.0, 1.2), m: nvgLeafMat(0x4A8A38) },
{ g: nvgCrownGeo(15, 3.2, 2.4, 3.0, d).translate(-2.8, 8.8, -1.6), m: nvgLeafMat(0x36702A) }, { g: nvgTrunkGeo(0.75, 0.38, 10, 0.5), m: bark }],
tall: [{ g: nvgCrownGeo(21, 4.6, 4.4, 4.6, d).translate(0, 19, 0), m: nvgLeafMat(0x2E6428) }, { g: nvgCrownGeo(27, 3.0, 2.4, 3.0, d).translate(1.6, 14.6, 0.8), m: nvgLeafMat(0x3A7430) }, { g: nvgTrunkGeo(0.85, 0.4, 18, 0.3), m: dark }],
fern: [{ g: nvgFrondGeo(NVG.lite ? 6 : 10, 2.9, 0.55, 0.75, 4.2), m: nvgLeafMat(0x427E36) }, { g: nvgTrunkGeo(0.22, 0.18, 4.3, 0.2, 5), m: dark }],
palm: [{ g: nvgFrondGeo(NVG.lite ? 7 : 11, 5.4, 0.75, 0.55, 11.4).translate(1.4, 0, 0), m: nvgLeafMat(0x4E8E3C) }, { g: nvgTrunkGeo(0.34, 0.2, 11.6, 1.4, 6), m: palmBark }],
pine: [{ g: new THREE.ConeGeometry(2.6, 7.5, NVG.lite ? 6 : 9).translate(0, 10.5, 0), m: nvgLeafMat(0x2E5028) }, { g: new THREE.ConeGeometry(3.3, 6, NVG.lite ? 6 : 9).translate(0, 7, 0), m: nvgLeafMat(0x34582C) }, { g: nvgTrunkGeo(0.34, 0.18, 9, 0.1), m: bark }],
bush: [{ g: nvgCrownGeo(33, 1.6, 1.1, 1.5, d).translate(0, 0.9, 0), m: nvgLeafMat(0x46803A) }]
});
},
function (x, z, R) {
var h = nvHeight(x, z);
if (h < 2.4)
return null;
var gx = nvHeight(x + 5, z) - nvHeight(x - 5, z), gz = nvHeight(x, z + 5) - nvHeight(x, z - 5), slope = Math.hypot(gx, gz) / 10;
if (slope > 0.95)
return null;
if (nvgClear(x, z))
return null;
var rv = nvgRiverNear(x, z);
if (rv && rv.d < rv.w + 4)
return null;
var r = R(), wood = nvgWoodK(x, z);
if (h < 5.5)
return r < 0.32 ? "palm" : r < 0.4 ? "bush" : null;
if (h > 230)
return null;
if (h > 140)
return r < 0.42 ? "pine" : null;
if (h > 95)
return r < 0.35 ? "pine" : r < 0.5 ? "broad" : null;
if (wood > 0.55)
return r < 0.34 ? "broad" : r < 0.58 ? "tall" : r < 0.78 ? "fern" : r < 0.9 ? "bush" : null;
if (wood > 0.45)
return r < 0.25 ? "broad" : r < 0.33 ? "tall" : r < 0.45 ? "fern" : r < 0.55 ? "bush" : null;
return r < 0.08 ? "broad" : r < 0.12 ? "palm" : r < 0.2 ? "bush" : null;
},
function (G) {
var old = null;
G.children.forEach(function (c) { var p = c.geometry && c.geometry.parameters; if (!old && c.isInstancedMesh && c.geometry.type === "CylinderGeometry" && p && p.radiusTop === 0.35 && p.height === 8)
old = c; });
if (old) {
var n = old.count, at = {}, m4 = new THREE.Matrix4(), v = new THREE.Vector3();
for (var i = 0; i < n; i++) {
old.getMatrixAt(i, m4);
v.setFromMatrixPosition(m4);
at[Math.round(v.x * 10) + "|" + Math.round(v.z * 10)] = 1;
}
G.children.slice().forEach(function (c) { if (c.isInstancedMesh && c.count === n && n !== 500) {
G.remove(c);
} });
NV.solids = NV.solids.filter(function (s) { return !(s.r !== undefined && s.r < 1.1 && at[Math.round(s.x * 10) + "|" + Math.round(s.z * 10)]); });
}
var K = nvgTreeKinds(), tile = 500, per = {}, R = wRand(1911), step = NVG.lite ? 24 : 13;
for (var z = -2700; z < 1150; z += step)
for (var x = -2150; x < 1350; x += step) {
var jx = x + (R() - 0.5) * step * 0.9, jz = z + (R() - 0.5) * step * 0.9;
var k = nvgTreeAt(jx, jz, R);
if (!k)
continue;
var key = Math.floor(jx / tile) + "," + Math.floor(jz / tile), L = per[key] || (per[key] = {});
(L[k] || (L[k] = [])).push([jx, nvHeight(jx, jz) - 0.25, jz, 0.72 + R() * 0.6, R() * 6.28]);
if (k !== "bush" && k !== "fern")
NV.solids.push({ x: jx, z: jz, r: k === "palm" ? 0.35 : k === "pine" ? 0.4 : 0.7 });
}
var m4 = new THREE.Matrix4(), q = new THREE.Quaternion(), e = new THREE.Euler(), v = new THREE.Vector3(), s = new THREE.Vector3(), col = new THREE.Color();
Object.keys(per).forEach(function (key) {
var L = per[key], ab = key.split(","), cx = (+ab[0] + 0.5) * tile, cz = (+ab[1] + 0.5) * tile, grp = new THREE.Group();
grp.name = "nvg-trees";
grp.userData.keep = 1;
G.add(grp);
Object.keys(L).forEach(function (k) {
var list = L[k];
K[k].forEach(function (part, pi) {
var mesh = new THREE.InstancedMesh(part.g, part.m, list.length);
mesh.userData.keep = 1;
list.forEach(function (t, i) {
e.set(0, t[4], 0);
q.setFromEuler(e);
v.set(t[0], t[1], t[2]);
s.set(t[3], t[3] * (0.9 + ((i * 7) % 5) * 0.05), t[3]);
m4.compose(v, q, s);
mesh.setMatrixAt(i, m4);
if (!NVG.lite && pi < K[k].length - 1) {
var hh = ((i * 2654435761) >>> 0) % 100 / 100;
col.setRGB(0.8 + hh * 0.26, 0.84 + hh * 0.2, 0.78 + hh * 0.2);
mesh.setColorAt(i, col);
}
});
mesh.instanceMatrix.needsUpdate = true;
if (mesh.instanceColor)
mesh.instanceColor.needsUpdate = true;
mesh.geometry.userData.shared = true;
mesh.frustumCulled = false;
grp.add(mesh);
});
});
NVG.treeTiles.push({ g: grp, x: cx, z: cz });
});
},
function (G) {
var R = wRand(4111), geos = [0, 1, 2].map(function (k) {
var g = new THREE.DodecahedronGeometry(1, NVG.lite ? 0 : 1), p = g.attributes.position;
for (var i = 0; i < p.count; i++) {
var x = p.getX(i), y = p.getY(i), z = p.getZ(i), n = 0.7 + 0.5 * wFbm(x * 1.3 + k * 5, z * 1.3 + y, 40 + k, 2);
p.setXYZ(i, x * n * 1.2, y * n * 0.7, z * n);
}
g.computeVertexNormals();
nvgUV(g);
return g;
});
var mat = nvgSurf("stone", 0xB0A898, 3), list = [[], [], []], n = NVG.lite ? 700 : 1800;
for (var i = 0; i < n * 3 && (list[0].length + list[1].length + list[2].length) < n; i++) {
var x = -2150 + R() * 3500, z = -2700 + R() * 3850, h = nvHeight(x, z);
if (h < 0.6 || h > 250)
continue;
if (nvgClear(x, z, 4))
continue;
var gx = nvHeight(x + 4, z) - nvHeight(x - 4, z), gz = nvHeight(x, z + 4) - nvHeight(x, z - 4), sl = Math.hypot(gx, gz) / 8;
if (!(h < 3 || sl > 0.45 || h > 120) && R() > 0.25)
continue;
var sc = 0.5 + R() * R() * (h > 100 ? 6 : 3);
list[i % 3].push([x, h - sc * 0.25, z, sc, R() * 6.28]);
if (sc > 1.4)
NV.solids.push({ x: x, z: z, r: sc * 0.9 });
}
var m4 = new THREE.Matrix4(), q = new THREE.Quaternion(), e = new THREE.Euler(), v = new THREE.Vector3(), s = new THREE.Vector3();
list.forEach(function (L, k) {
if (!L.length)
return;
var mesh = new THREE.InstancedMesh(geos[k], mat, L.length);
L.forEach(function (t, i) { e.set(0, t[4], 0); q.setFromEuler(e); v.set(t[0], t[1], t[2]); s.set(t[3], t[3], t[3]); m4.compose(v, q, s); mesh.setMatrixAt(i, m4); });
mesh.name = "nvg-rocks";
mesh.userData.keep = 1;
G.add(mesh);
});
var dw = new THREE.InstancedMesh(nvgTrunkGeo(0.18, 0.12, 3.2, 0.3, 6).rotateZ(Math.PI / 2), nvgSurf("wood", 0xB8A890, 1.5), NVG.lite ? 80 : 240), k2 = 0;
for (var j = 0; j < 4000 && k2 < dw.count; j++) {
var a = R() * 6.283, rr = 300 + R() * 2400, x2 = Math.cos(a) * rr - 400, z2 = Math.sin(a) * rr - 600, h2 = nvHeight(x2, z2);
if (h2 < 0.5 || h2 > 1.8 || nvgClear(x2, z2))
continue;
e.set(0, R() * 6.28, 0);
q.setFromEuler(e);
v.set(x2, h2 + 0.1, z2);
s.set(0.6 + R(), 1, 1);
m4.compose(v, q, s);
dw.setMatrixAt(k2++, m4);
}
dw.count = k2;
dw.name = "nvg-driftwood";
G.add(dw);
},
function () {
var pos = [], col = [], nb = 9, R = wRand(4402);
for (var b = 0; b < nb; b++) {
var a = b / nb * 6.283 + R() * 0.8, lean = 0.18 + R() * 0.35, h = 0.2 + R() * 0.32, w = 0.024 + R() * 0.014, ca = Math.cos(a), sa = Math.sin(a), ox = ca * R() * 0.12, oz = sa * R() * 0.12;
var px = -sa * w, pz = ca * w, tx = ox + ca * lean * h, tz = oz + sa * lean * h, mx = ox + ca * lean * h * 0.35, mz = oz + sa * lean * h * 0.35;
var v = [[ox - px, 0, oz - pz], [ox + px, 0, oz + pz], [mx + px * 0.7, h * 0.55, mz + pz * 0.7], [mx - px * 0.7, h * 0.55, mz - pz * 0.7], [tx, h, tz]], c = [0.6, 0.6, 0.86, 0.86, 1.08];
[[0, 1, 2], [0, 2, 3], [3, 2, 4]].forEach(function (t) { t.forEach(function (i) { pos.push(v[i][0], v[i][1], v[i][2]); col.push(c[i], c[i], c[i]); }); });
}
var g = new THREE.BufferGeometry();
g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
g.setAttribute("color", new THREE.Float32BufferAttribute(col, 3));
g.computeVertexNormals();
var n = g.attributes.normal;
for (var i = 0; i < n.count; i++)
n.setXYZ(i, n.getX(i) * 0.35, 0.94, n.getZ(i) * 0.35);
g.computeBoundingSphere();
return g;
},
function (G) {
var RAD = NVG.lite ? 16 : 28, STEP = NVG.lite ? 0.75 : 0.5, cap = Math.ceil(Math.PI * RAD * RAD / (STEP * STEP) * 1.05);
var mat = new THREE.MeshLambertMaterial({ vertexColors: true, side: THREE.DoubleSide }), U = { value: 0 };
mat.onBeforeCompile = function (sh) {
sh.uniforms.uWind = U;
sh.vertexShader = "uniform float uWind;\n" + sh.vertexShader.replace("#include <begin_vertex>", "#include <begin_vertex>\n#ifdef USE_INSTANCING\n vec2 wp=vec2(instanceMatrix[3][0],instanceMatrix[3][2]);\n#else\n vec2 wp=vec2(0.0);\n#endif\n float sw=sin(uWind*1.2+wp.x*0.21+wp.y*0.17)*0.6+sin(uWind*1.9+wp.x*0.5)*0.4;\n transformed.x+=sw*0.12*position.y*position.y; transformed.z+=sw*0.07*position.y*position.y;");
};
mat.customProgramCacheKey = function () { return "nvgGrass"; };
var im = new THREE.InstancedMesh(nvgGrassGeo(), mat, cap), m4 = new THREE.Matrix4(), q = new THREE.Quaternion(), e = new THREE.Euler(), v = new THREE.Vector3(), s3 = new THREE.Vector3(), c = new THREE.Color(), at = { x: 1e9, z: 1e9 };
var base = new THREE.Color(0x6A9A40), lush = new THREE.Color(0x4E8A34), dry = new THREE.Color(0xB8A868);
function hsh(i, j, k) { var h = Math.sin(i * 127.1 + j * 311.7 + k * 74.7) * 43758.5453; return h - Math.floor(h); }
function lay(cx, cz) {
var k = 0, n = Math.ceil(RAD / STEP), i0 = Math.round(cx / STEP), j0 = Math.round(cz / STEP);
if (NV.home || NVG.inBelow || (typeof NVB !== "undefined" && NVB.room)) {
im.count = 0;
at.x = cx;
at.z = cz;
return;
}
for (var i = i0 - n; i <= i0 + n; i++)
for (var j = j0 - n; j <= j0 + n; j++) {
var x = (i + hsh(i, j, 1) - 0.5) * STEP, z = (j + hsh(i, j, 2) - 0.5) * STEP, dx = x - cx, dz = z - cz;
if (dx * dx + dz * dz > RAD * RAD || k >= cap)
continue;
var dr = wFbm(x * 0.04, z * 0.04, 77, 2);
if (hsh(i, j, 3) > 0.42 + dr * 0.8)
continue;
var h = nvHeight(x, z);
if (h < 2.8 || h > 150)
continue;
if (nvgTownK(x, z) > 0.5)
continue;
if (nvgClear(x, z, -6) && hsh(i, j, 9) < 0.7)
continue;
var sz = (0.55 + hsh(i, j, 4) * 0.5 + dr * 0.5) * Math.min(1, (RAD - Math.sqrt(dx * dx + dz * dz)) / (RAD * 0.35) + 0.15);
e.set(0, hsh(i, j, 5) * 6.283, 0);
q.setFromEuler(e);
v.set(x, h - 0.03, z);
s3.set(sz, sz * (0.6 + hsh(i, j, 6) * 0.6 + dr * 0.6), sz);
m4.compose(v, q, s3);
im.setMatrixAt(k, m4);
c.copy(base).lerp(lush, Math.max(0, 0.5 - dr) * 0.8).lerp(dry, hsh(i, j, 7) * 0.3 + Math.max(0, dr - 0.5) * 0.5).multiplyScalar(0.9 + hsh(i, j, 8) * 0.25);
im.setColorAt(k, c);
k++;
}
im.count = k;
im.instanceMatrix.needsUpdate = true;
if (im.instanceColor)
im.instanceColor.needsUpdate = true;
at.x = cx;
at.z = cz;
}
im.setColorAt(0, base);
im.instanceColor.needsUpdate = true;
im.name = "nvg-grass";
im.userData.keep = 1;
im.frustumCulled = false;
im.raycast = function () { };
im.count = 0;
im.onBeforeRender = function () {
U.value = performance.now() / 1000;
var cx = camera.position.x - NV.base, cz = camera.position.z;
if (Math.abs(cx - at.x) > RAD * 0.18 || Math.abs(cz - at.z) > RAD * 0.18)
lay(cx, cz);
};
G.add(im);
NVG.grass = im;
},
function (i, o) {
var tops = [0xE8E0D0, 0xB83A2A, 0x3A3A6A, 0xD8C8A8, 0x6A3A2A, 0x2A2A2A, 0x8A6A3A, 0x2A4A3A, 0xC8B890, 0x5A2A4A], bots = [0x3A2A1A, 0x2A2A3A, 0x5A4A3A, 0x6A5A40, 0x1A1A1A];
var hats = ["bandana", "bandana", "tricorn", "beanie", "bandana", "none", "brimmed"], hc = [0xB82A2A, 0x141414, 0x2A4A8A, 0x8A1A22, 0xE8D8A8, 0x3A5A2A];
var L = { top: tops[i % tops.length], topKind: "shirt", bottom: bots[i % bots.length], shoes: i % 3 ? 0x141414 : 0x3A2A1A, hat: hats[i % hats.length], hatColor: hc[i % hc.length], beard: i % 3 === 0 ? "full" : i % 3 === 1 ? "mustache" : null,
hair: [0x1A1A1A, 0x5A3A1A, 0x8A6A3A, 0x2A1A12, 0xA8A098][i % 5], hairStyle: i % 4 ? "short" : "long", skin: [0xE8C8A8, 0xC89A78, 0xA87A58, 0x7A5038, 0xF0D0B0][i % 5] };
if (i % 4 === 1) {
L.layer = "vest";
L.layerColor = [0x3A2A1A, 0x6A1A1A, 0x1A2A3A][i % 3];
}
if (o)
for (var k in o)
L[k] = o[k];
return { sex: "m", look: L };
},
function (G, seed, o, x, z, talk, wander, ry, y) {
var g = wPerson(seed, o);
g.position.set(x, y !== undefined ? y : Math.max(nvHeight(x, z), 0), z);
g.rotation.y = ry || 0;
if (o.pose)
g.userData.pose = o.pose;
G.add(g);
var P = { g: g, wander: wander, talk: talk, nvg: 1 };
NV.people.push(P);
NVG.people.push(P);
if (talk)
NV.talkers.push({ p: P, r: 4, name: talk.name, t: talk });
return P;
},
function () {
var s = NV.ship;
if (!s || s.userData.nvg)
return;
s.userData.nvg = 1;
var wood = nvgSurf("wood", 0x6A4A30, 2.2), deckW = nvgSurf("wood", 0xB89870, 1.6), tar = nvgSurf("wood", 0x2A2018, 2.4), gold = nvgC(0xC8A040), iron = nvgC(0x2A2A2A), rope = new THREE.LineBasicMaterial({ color: 0x2A2016 });
s.children.forEach(function (c) {
if (!c.isMesh || !c.material || !c.material.color)
return;
var hx = c.material.color.getHex();
if (hx === 0x3A2A1C) {
nvgUV(c.geometry);
c.material = tar;
}
else if (hx === 0x8A6A42) {
nvgUV(c.geometry);
c.material = deckW;
}
});
[-1, 1].forEach(function (sd) {
for (var z = -9.5; z <= 9.6; z += 1.6) {
var hw = 3.7 * (1 - Math.pow(Math.abs(z / 17), 2.2) * (z > 0 ? 0.85 : 0.45));
nvgBox(0.12, 0.9, 0.12, wood, sd * hw, 4.45, z, s);
}
var r = nvgBox(0.16, 0.12, 19.4, wood, sd * 3.62, 4.92, 0, s);
r.rotation.y = sd * 0.02;
nvgBox(0.14, 0.8, 7, wood, sd * 3.95, 7.35, -13, s);
});
nvgBox(7.8, 0.8, 0.14, wood, 0, 7.35, -16.5, s);
[-1, 1].forEach(function (sd) {
[-6, -1, 4].forEach(function (z) {
var c = new THREE.Group();
c.position.set(sd * 2.9, 4, z);
s.add(c);
nvgBox(0.9, 0.35, 1.2, wood, 0, 0.25, 0, c);
var b = wCyl(0.14, 0.2, 1.8, iron, sd * 0.6, 0.62, 0, c, 10);
b.rotation.z = Math.PI / 2;
[-0.35, 0.35].forEach(function (w) { var wh = wCyl(0.2, 0.2, 0.1, wood, sd * 0, 0.2, w, c, 10); wh.rotation.x = Math.PI / 2; });
for (var k = 0; k < 4; k++)
wSph(0.09, iron, -sd * 0.6, 0.12, -0.4 + k * 0.22, c, 6);
});
});
nvgBox(2.2, 0.4, 2.2, wood, 0, 4.15, -4, s);
var hole = wBox(1.6, 0.05, 1.6, wB(0x0A0604), 0, 4.36, -4, s);
var boat = new THREE.Group();
var bh = wMesh(new THREE.SphereGeometry(1, 12, 6, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2), nvgSurf("wood", 0x8A5A34, 1.2, { ds: true }), 0, 0.55, 0, boat);
bh.scale.set(1.1, 0.6, 3);
boat.position.set(0, 4.2, 6.8);
s.add(boat);
for (var bb = 0; bb < 6; bb++) {
var bar = wCyl(0.32, 0.32, 0.8, wood, (bb % 2 ? 1 : -1) * 2.4, 4.4, -8.5 + Math.floor(bb / 2) * 0.75, s, 10);
}
[[-2.2, 9], [2.3, -2.2], [1.9, 10.5]].forEach(function (p) { var co = wMesh(new THREE.TorusGeometry(0.32, 0.09, 6, 14), nvgC(0xB8A070), p[0], 4.1, p[1], s); co.rotation.x = Math.PI / 2; });
var wh = new THREE.Group();
wh.position.set(0, 7.9, -11);
s.add(wh);
var rim = wMesh(new THREE.TorusGeometry(0.7, 0.05, 6, 20), wood, 0, 0, 0, wh);
for (var sp = 0; sp < 8; sp++) {
var spk = wCyl(0.03, 0.03, 1.7, wood, 0, 0, 0, wh, 5);
spk.rotation.z = sp / 8 * Math.PI;
}
nvgBox(0.3, 1.2, 0.3, wood, 0, 7.4, -10.6, s);
nvgBox(0.5, 1, 0.5, wood, 0, 7.45, -12.5, s);
wCyl(0.2, 0.2, 0.1, gold, 0, 8, -12.5, s, 12);
var nm = wSign(["JOLLY ROGER"], 4.8, 0.6, "#1A120A", "#D8B04A");
nm.position.set(0, 4.6, -17.05);
nm.rotation.y = Math.PI;
s.add(nm);
nvgBox(8.2, 0.18, 0.3, gold, 0, 6.15, -16.75, s);
nvgBox(8.2, 0.18, 0.3, gold, 0, 4.25, -16.75, s);
var lan = new THREE.Group();
lan.position.set(0, 9.4, -16.9);
s.add(lan);
nvgCyl(0.35, 0.28, 0.9, gold, 0, 0, 0, lan, 8);
wSph(0.3, wB(0xFFD890), 0, 0, 0, lan, 10);
var lg = wGlow(0xFFD890, 2.2, 0.55);
lan.add(lg);
nvgBox(0.12, 1.3, 0.12, iron, 0, -0.9, 0.3, lan);
var fh = new THREE.Group();
fh.position.set(0, 4.2, 17.6);
fh.rotation.x = -0.6;
s.add(fh);
wSph(0.35, gold, 0, 0.9, 0.2, fh, 10);
var fb = wCyl(0.3, 0.12, 1.6, gold, 0, 0, 0, fh, 8);
fb.rotation.x = 0.3;
var ft = wCone(0.35, 0.5, gold, 0, -0.9, -0.3, fh, 4);
ft.scale.z = 0.3;
var pts = [], masts = [[-8, 22], [2, 26], [11, 19]];
masts.forEach(function (m) {
var top = 4 + m[1] * 0.82, mid = 4 + m[1] * 0.5;
[-1, 1].forEach(function (sd) {
var hw = 3.7 * (1 - Math.pow(Math.abs(m[0] / 17), 2.2) * (m[0] > 0 ? 0.85 : 0.45));
for (var k = -2; k <= 2; k++) {
pts.push(sd * hw, 4.9, m[0] + k * 0.7, sd * 0.3, top, m[0]);
}
for (var y = 5.6; y < top - 1; y += 0.9) {
var f = (y - 4.9) / (top - 4.9), xx = sd * (hw + (0.3 - hw) * f);
pts.push(xx, y, m[0] - 1.4 * (1 - f), xx, y, m[0] + 1.4 * (1 - f));
}
});
});
pts.push(0, 4 + 22 * 0.95, -8, 0, 4 + 26 * 0.95, 2);
pts.push(0, 4 + 26 * 0.95, 2, 0, 4 + 19 * 0.95, 11);
pts.push(0, 4 + 19 * 0.95, 11, 0, 6, 21.5);
pts.push(0, 4 + 22 * 0.9, -8, 0, 7, -16.5);
pts.push(1.4, 3.6, 16.5, 3.4, -3, 26);
var lg2 = new THREE.BufferGeometry();
lg2.setAttribute("position", new THREE.Float32BufferAttribute(pts, 3));
var rig = new THREE.LineSegments(lg2, rope);
rig.name = "nvg-rigging";
s.add(rig);
var pn = wMesh(new THREE.PlaneGeometry(3, 0.4, 6, 1), new THREE.MeshLambertMaterial({ color: 0x8A1A1A, side: THREE.DoubleSide }), 1.5, 30.6, 2, s);
NVG.flags.push(pn);
s.userData.decks.push({ x: 0, z: 12, hw: 3, hd: 2.4, y: 5.4 });
},
function (G) {
var s = NV.ship;
if (!s)
return;
var n = NVG.lite ? 3 : NVG_DECK.length;
for (var i = 0; i < n; i++) {
var d = NVG_DECK[i];
var P = nvgPut(G, "nvg_deck_" + i, nvgPirateLook(i + 3, d[0] === "The Black Pirate" ? { skin: 0x4A3020, hat: "none", hairStyle: "bald" } : null), s.position.x, s.position.z, { name: d[0], persona: NVG_PIRATE_P + "You are " + d[1], greet: d[2] }, null, 0, 4);
P.deck = { x: d[3], z: d[4] };
P.nvgDeck = 1;
NVG.deck.push(P);
}
},
function () {
var x = -1180, z = -520, tx = -790, tz = -170, l = Math.hypot(tx - x, tz - z), dx = (tx - x) / l, dz = (tz - z) / l, last = { x: x, z: z };
for (var d = 0; d < l; d += 2) {
var px = x + dx * d, pz = z + dz * d;
if (nvHeight(px, pz) < 0.3)
return { x: last.x, z: last.z, dx: dx, dz: dz };
last = { x: px, z: pz };
}
return { x: -1000, z: -380, dx: dx, dz: dz };
},
function (G) {
var S = new THREE.Group();
S.name = "nvg-pirate-shore";
var log = nvgSurf("bark", 0x8A7660, 1.4), plank = nvgSurf("wood", 0x9A7A58, 1.6), thatch = nvgC(0x9A8A5A), canvas = nvgC(0xC8BCA0, { ds: true }), stone = nvgSurf("stone", 0xA09888, 2.5), dark = wB(0x120C08);
var cx = -1180, cz = -520, cy = nvHeight(cx, cz), B = nvgShoreFind();
NVG.shore = B;
var face = Math.atan2(B.dx, B.dz);
var R0 = 44, logs = [], n = NVG.lite ? 90 : 140;
for (var i = 0; i < n; i++) {
var a = i / n * Math.PI * 2, ga = Math.atan2(B.dx, B.dz) - Math.PI / 2;
var da = Math.atan2(Math.sin(a - (Math.atan2(B.dz, B.dx))), Math.cos(a - (Math.atan2(B.dz, B.dx))));
if (Math.abs(da) < 0.09)
continue;
var x = cx + Math.cos(a) * R0, z = cz + Math.sin(a) * R0;
logs.push([x, nvHeight(x, z) - 0.4, z, 0.85 + ((i * 37) % 10) * 0.03]);
NV.solids.push({ x: x, z: z, r: 0.55 });
}
var lg = new THREE.InstancedMesh(nvgTrunkGeo(0.32, 0.28, 5.2, 0, 7), log, logs.length), tip = new THREE.InstancedMesh(new THREE.ConeGeometry(0.3, 0.8, 7), log, logs.length), m4 = new THREE.Matrix4(), q = new THREE.Quaternion(), v = new THREE.Vector3(), sc = new THREE.Vector3();
logs.forEach(function (L, i) { v.set(L[0], L[1], L[2]); sc.set(1, L[3], 1); m4.compose(v, q, sc); lg.setMatrixAt(i, m4); v.y = L[1] + 5.2 * L[3] + 0.4; sc.set(1, 1, 1); m4.compose(v, q, sc); tip.setMatrixAt(i, m4); });
lg.userData.keep = 1;
tip.userData.keep = 1;
G.add(lg);
G.add(tip);
var ga2 = Math.atan2(B.dz, B.dx), gx = cx + Math.cos(ga2) * R0, gz = cz + Math.sin(ga2) * R0, gy = nvHeight(gx, gz);
[-1, 1].forEach(function (sd) { var px = gx - Math.sin(ga2) * sd * 4.2, pz = gz + Math.cos(ga2) * sd * 4.2; nvgCyl(0.45, 0.5, 7, log, px, gy + 3.2, pz, S, 8); });
var gs = wSign(["THE PIRATE SHORE", "Hook's crew. Keep out, or else."], 7, 1.6, "#1A120A", "#E8DCC0");
gs.position.set(gx, gy + 6.4, gz);
gs.rotation.y = face;
S.add(gs);
function hut(lx, lz, ry, w, d, label) {
var hx = cx + lx, hz = cz + lz, hy = nvHeight(hx, hz), g = new THREE.Group();
g.position.set(hx, hy, hz);
g.rotation.y = ry;
S.add(g);
nvgBox(w, 0.15, d, plank, 0, 0.08, 0, g);
nvgBox(w, 2.8, 0.2, plank, 0, 1.4, -d / 2, g);
nvgBox(0.2, 2.8, d, plank, -w / 2, 1.4, 0, g);
nvgBox(0.2, 2.8, d, plank, w / 2, 1.4, 0, g);
nvgBox(0.6, 2.8, 0.2, plank, -w / 2 + 0.3, 1.4, d / 2, g);
nvgBox(0.6, 2.8, 0.2, plank, w / 2 - 0.3, 1.4, d / 2, g);
nvgBox(w, 0.5, 0.2, plank, 0, 2.55, d / 2, g);
var rf = nvgBox(w + 1.2, 0.18, d + 1.6, thatch, 0, 3.15, 0.2, g);
rf.rotation.x = 0.12;
for (var k = 0; k < 2; k++) {
var hm = wMesh(new THREE.CylinderGeometry(0.4, 0.4, w - 0.8, 10, 1, true, 0, Math.PI), canvas, 0, 1.25, -d / 2 + 0.8 + k * 1.2, g);
hm.rotation.z = Math.PI / 2;
hm.rotation.x = Math.PI;
}
nvgBox(1.4, 0.08, 0.8, plank, w / 2 - 1.2, 0.8, d / 2 - 1.4, g);
nvgBox(0.08, 0.75, 0.08, plank, w / 2 - 1.8, 0.4, d / 2 - 1.7, g);
nvgBox(0.08, 0.75, 0.08, plank, w / 2 - 0.6, 0.4, d / 2 - 1.1, g);
nvgBox(0.9, 0.55, 0.55, nvgSurf("wood", 0x6A4222, 1), -w / 2 + 0.8, 0.3, d / 2 - 1, g);
wBox(0.95, 0.06, 0.6, nvgC(0xC8A040), -w / 2 + 0.8, 0.6, d / 2 - 1, g);
var lb = wSign([label], 2.6, 0.5, "#2A1A0E", "#E8D8B0");
lb.position.set(0, 3.0, d / 2 + 0.12);
g.add(lb);
var c = Math.cos(ry), sn = Math.sin(ry);
function W(ax, az, hw, hd) { NV.solids.push({ x: hx + ax * c + az * sn, z: hz - ax * sn + az * c, hw: hw, hd: hd, rot: ry, h: 3.2, b: hy - 0.2 }); }
W(0, -d / 2, w / 2, 0.15);
W(-w / 2, 0, 0.15, d / 2);
W(w / 2, 0, 0.15, d / 2);
W(-w / 2 + 0.3, d / 2, 0.3, 0.15);
W(w / 2 - 0.3, d / 2, 0.3, 0.15);
return g;
}
var fa = Math.atan2(B.dx, B.dz), inward = fa + Math.PI;
[[-24, -10, "The Bo'sun's hut"], [-16, -26, "The Fo'c'sle hut"], [0, -30, "The Sail loft"], [16, -26, "The Gunners' hut"], [24, -10, "The Cook's hut"]].forEach(function (h, i) {
var c = Math.cos(fa), sn = Math.sin(fa), lx = h[0] * c + h[1] * sn, lz = -h[0] * sn + h[1] * c;
var ry = Math.atan2(-lx, -lz);
hut(lx, lz, ry, 6, 5, h[2]);
});
var tg = new THREE.Group();
tg.position.set(cx + 8, cy, cz + 12);
S.add(tg);
var tent = wMesh(new THREE.ConeGeometry(5, 4.2, 6, 1, true), canvas, 0, 2.1, 0, tg);
for (var tb = 0; tb < 3; tb++) {
var tbl = new THREE.Group();
tbl.position.set(Math.cos(tb * 2.1) * 2.4, 0, Math.sin(tb * 2.1) * 2.4);
tg.add(tbl);
wCyl(0.45, 0.45, 0.9, plank, 0, 0.45, 0, tbl, 10);
for (var cu = 0; cu < 2; cu++)
wCyl(0.07, 0.06, 0.16, nvgC(0x8A8A8A), cu * 0.2 - 0.1, 0.98, 0.1, tbl, 8);
}
var fg = new THREE.Group();
fg.position.set(cx - 10, cy, cz + 14);
S.add(fg);
nvgBox(2.2, 1, 1.6, stone, 0, 0.5, 0, fg);
var coals = wBox(1.2, 0.12, 0.8, wB(0xC8501A), 0, 1.03, 0, fg);
NVG.coals = coals;
nvgBox(0.6, 0.5, 0.3, nvgC(0x3A3A3A), 1.8, 0.6, 0.4, fg);
nvgBox(0.8, 0.6, 0.5, nvgSurf("bark", 0x7A6A5A, 1), 1.8, 0.3, 0.4, fg);
nvgCyl(0.1, 0.14, 2.6, stone, -0.6, 2.2, -0.5, fg, 6);
NV.solids.push({ x: cx - 10, z: cz + 14, r: 1.4 });
var pw = new THREE.Group();
pw.position.set(cx - 30 * Math.sin(fa), nvHeight(cx - 30 * Math.sin(fa), cz - 30 * Math.cos(fa)), cz - 30 * Math.cos(fa));
pw.rotation.y = fa;
S.add(pw);
nvgBox(4, 3, 4, stone, 0, 1.5, 0, pw);
var prf = nvgBox(4.4, 0.3, 4.4, stone, 0, 3.15, 0, pw);
nvgBox(1.2, 2, 0.1, plank, 0, 1, 2.02, pw);
nvgBox(1.6, 0.12, 0.12, nvgC(0x2A2A2A), 0, 1.1, 2.1, pw);
var pws = wSign(["POWDER", "No lights. No pipes. No boys."], 2.4, 0.8, "#3A1A0E", "#F0E0C0");
pws.position.set(0, 2.6, 2.08);
pw.add(pws);
NV.solids.push({ x: pw.position.x, z: pw.position.z, hw: 2.2, hd: 2.2, rot: fa });
nvgCyl(0.12, 0.18, 12, plank, cx, cy + 6, cz, S, 8);
var jr = wTex(128, 84, function (x, W, H) {
x.fillStyle = "#0A0A0A";
x.fillRect(0, 0, W, H);
x.fillStyle = "#F0ECE0";
x.beginPath();
x.arc(64, 34, 16, 0, 7);
x.fill();
x.fillRect(54, 40, 20, 12);
x.fillStyle = "#0A0A0A";
x.beginPath();
x.arc(57, 32, 4.5, 0, 7);
x.arc(71, 32, 4.5, 0, 7);
x.fill();
x.fillStyle = "#F0ECE0";
x.save();
x.translate(64, 64);
x.rotate(0.6);
x.fillRect(-30, -3, 60, 6);
x.rotate(-1.2);
x.fillRect(-30, -3, 60, 6);
x.restore();
});
var fl = wMesh(new THREE.PlaneGeometry(2.4, 1.6, 6, 3), new THREE.MeshLambertMaterial({ map: jr, side: THREE.DoubleSide }), cx + 1.2, cy + 11, cz, G);
NVG.flags.push(fl);
NV.solids.push({ x: cx, z: cz, r: 0.3 });
var kx = cx + 4, kz = cz - 6, ky = nvHeight(kx, kz);
for (var st = 0; st < 8; st++) {
var a2 = st / 8 * 6.283;
wSph(0.3, stone, kx + Math.cos(a2) * 1.1, ky + 0.15, kz + Math.sin(a2) * 1.1, S, 6);
}
var fire = wCone(0.5, 1.1, wB(0xFF8A2A, { fog: false }), kx, ky + 0.55, kz, G, 7);
NVG.fire = fire;
nvgCyl(0.05, 0.05, 2.2, nvgC(0x2A2A2A), kx, ky + 1.6, kz, S, 5).rotation.z = Math.PI / 2;
wSph(0.45, nvgC(0x2A2A2A), kx, ky + 1.1, kz, S, 10);
NVG.smokes.push(nvgSmoke(G, kx, ky + 1.6, kz));
for (var bi = 0; bi < (NVG.lite ? 10 : 22); bi++) {
var a3 = bi * 2.39, rr = 10 + (bi * 13) % 22, bx = cx + Math.cos(a3) * rr, bz = cz + Math.sin(a3) * rr, by = nvHeight(bx, bz);
if (bi % 3)
wCyl(0.34, 0.34, 0.85, plank, bx, by + 0.42, bz, S, 10);
else
nvgBox(0.8, 0.7, 0.8, plank, bx, by + 0.35, bz, S);
NV.solids.push({ x: bx, z: bz, r: 0.45 });
}
[[-1, 1], [1, 1]].forEach(function (p, i) {
var a4 = ga2 + p[0] * 0.22, x4 = cx + Math.cos(a4) * (R0 - 4), z4 = cz + Math.sin(a4) * (R0 - 4), y4 = nvHeight(x4, z4), cg = new THREE.Group();
cg.position.set(x4, y4, z4);
cg.rotation.y = Math.atan2(Math.cos(a4), Math.sin(a4)) + Math.PI / 2;
S.add(cg);
nvgBox(1, 0.4, 1.4, plank, 0, 0.3, 0, cg);
var br = wCyl(0.16, 0.22, 2, nvgC(0x2A2A2A), 0, 0.7, 0.4, cg, 10);
br.rotation.x = Math.PI / 2;
});
var lx2 = gx - Math.sin(ga2) * 9, lz2 = gz + Math.cos(ga2) * 9 - 0, ly2 = nvHeight(lx2, lz2);
[[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (c) { nvgCyl(0.15, 0.18, 7, log, lx2 + c[0] * 1.2, ly2 + 3.5, lz2 + c[1] * 1.2, S, 6); });
nvgBox(3, 0.2, 3, plank, lx2, ly2 + 7, lz2, S);
nvgBox(3, 0.8, 0.1, plank, lx2, ly2 + 7.5, lz2 + 1.5, S);
nvgBox(3, 0.8, 0.1, plank, lx2, ly2 + 7.5, lz2 - 1.5, S);
NVG.lookout = { x: lx2, z: lz2, y: ly2 + 7.1 };
var bx0 = B.x + B.dx * 10, bz0 = B.z + B.dz * 10, pr = nvShip();
pr.userData.decks = [];
pr.position.set(bx0, -1.1, bz0);
pr.rotation.order = "YZX";
pr.rotation.y = Math.atan2(B.dz, -B.dx);
pr.rotation.z = 0.62;
pr.scale.setScalar(0.8);
pr.children.forEach(function (c) { if (c.isMesh && c.material && c.material.color && c.material.color.getHex() === 0x3A2A1C) {
nvgUV(c.geometry);
c.material = nvgSurf("wood", 0x8A7A5A, 2.2);
} if (c.geometry && c.geometry.type === "PlaneGeometry")
c.visible = false; });
G.add(pr);
NVG.prize = pr;
NV.solids.push({ x: bx0, z: bz0, hw: 5, hd: 14, rot: pr.rotation.y });
[[-6, 4], [6, 6]].forEach(function (o) { var tx = B.x - B.dz * o[0] * 0.9 - B.dx * o[1] * 0.4, tz = B.z + B.dx * o[0] * 0.9 - B.dz * o[1] * 0.4, ty = nvHeight(tx, tz); wCyl(0.5, 0.4, 0.7, nvgC(0x1A1A1A), tx, ty + 0.35, tz, S, 10); wCone(0.3, 0.6, wB(0xFF7A2A, { fog: false }), tx, ty + 0.9, tz, S, 6); NVG.smokes.push(nvgSmoke(G, tx, ty + 1.1, tz, 1)); });
var cap = new THREE.Group(), capX = B.x - B.dx * 14, capZ = B.z - B.dz * 14;
cap.position.set(capX, nvHeight(capX, capZ), capZ);
S.add(cap);
nvgCyl(0.5, 0.7, 1.2, plank, 0, 0.6, 0, cap, 10);
for (var ba = 0; ba < 4; ba++) {
var bar2 = wCyl(0.06, 0.06, 3.4, plank, 0, 1.0, 0, cap, 5);
bar2.rotation.z = Math.PI / 2;
bar2.rotation.y = ba * Math.PI / 4;
}
var hp = [capX, cap.position.y + 1, capZ, bx0, 6, bz0], hg = new THREE.BufferGeometry();
hg.setAttribute("position", new THREE.Float32BufferAttribute(hp, 3));
G.add(new THREE.LineSegments(hg, new THREE.LineBasicMaterial({ color: 0x3A3020 })));
var jl = 30, jx = B.x + B.dx * 2, jz = B.z + B.dz * 2, jr = Math.atan2(B.dx, B.dz);
var jg = new THREE.Group();
jg.position.set(jx, 0, jz);
jg.rotation.y = jr;
G.add(jg);
NVG.jetty = { x: jx + B.dx * jl, z: jz + B.dz * jl, g: jg, len: jl };
nvgBox(3, 0.25, jl, plank, 0, 1.6, jl / 2, jg);
for (var jp = 0; jp <= jl; jp += 4) {
[-1, 1].forEach(function (sd) { nvgCyl(0.15, 0.17, 4, log, sd * 1.4, -0.2, jp, jg, 6); });
}
var sgJ = wSign(["Kidd's Creek", "The Pirate Shore"], 3.4, 1, "#2A1A0E", "#E8D8B0");
sgJ.position.set(0, 2.8, jl);
jg.add(sgJ);
NVG.floors.push({ x0: 0, x1: 0, cx: jx, cz: jz, ry: jr, hw: 1.5, hd: jl / 2, lz: jl / 2, y: 1.725 });
landBake(G, S);
},
function (G) {
if (!NVG.jetty || !NV.ship)
return;
var nb = NVG.lite ? 1 : 2;
for (var b = 0; b < nb; b++) {
var g = new THREE.Group();
var hull = wMesh(new THREE.SphereGeometry(1, 12, 6, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2), nvgSurf("wood", 0x6A4A2A, 1.2, { ds: true }), 0, 0.45, 0, g);
hull.scale.set(1.15, 0.7, 3.4);
nvgBox(2, 0.08, 0.3, nvgSurf("wood", 0x9A7A58, 1), 0, 0.4, -1, g);
nvgBox(2, 0.08, 0.3, nvgSurf("wood", 0x9A7A58, 1), 0, 0.4, 0.6, g);
var oars = [];
[-1, 1].forEach(function (sd) { [-1, 0.6].forEach(function (z) { var o = wCyl(0.04, 0.04, 3.4, nvgC(0xA88A60), sd * 1.4, 0.5, z, g, 5); o.rotation.z = sd * 1.25; oars.push({ o: o, sd: sd }); }); });
G.add(g);
var B = { g: g, oars: oars, t: b * 0.5, people: [] };
var rowers = NVG.lite ? 1 : 2;
for (var r = 0; r < rowers; r++) {
var P = nvgPut(G, "nvg_boat_" + b + "_" + r, nvgPirateLook(20 + b * 3 + r, { pose: "sit" }), 0, 0, null, null, 0, 0);
P.boat = B;
P.bz = r ? 0.6 : -1;
B.people.push(P);
}
NVG.boats.push(B);
}
},
function (dt, t) {
if (!NVG.boats.length || !NVG.jetty || !NV.ship)
return;
var J = NVG.jetty, s = NV.ship, wp = typeof nvgTW === "function" ? nvgTW(5, 30) : { x: s.position.x, z: s.position.z }, sx = wp.x, sz = wp.z;
var ax = J.x, az = J.z, l = Math.hypot(sx - ax, sz - az);
NVG.boats.forEach(function (B, i) {
var per = 200, u = ((t / per) + B.t) % 1, k, lay = 0;
if (u < 0.4)
k = u / 0.4;
else if (u < 0.5) {
k = 1;
lay = 1;
}
else if (u < 0.9)
k = 1 - (u - 0.5) / 0.4;
else {
k = 0;
lay = 1;
}
k = k * k * (3 - 2 * k);
var x = ax + (sx - ax) * k + (i ? 6 : -6) * Math.sin(k * Math.PI) * 0.4, z = az + (sz - az) * k;
var dir = u < 0.5 ? Math.atan2(sx - ax, sz - az) : Math.atan2(ax - sx, az - sz);
B.g.position.set(x, 0.1 + Math.sin(t * 1.1 + i) * 0.06, z);
B.g.rotation.y = dir + Math.PI;
var st = lay ? 0 : Math.sin(t * 1.6 + i);
B.oars.forEach(function (O) { O.o.rotation.y = st * 0.5; O.o.rotation.z = O.sd * (1.25 + (lay ? 0.2 : Math.max(0, Math.cos(t * 1.6 + i)) * 0.12)); });
B.people.forEach(function (P) { var lz = P.bz, cc = Math.cos(B.g.rotation.y), ss = Math.sin(B.g.rotation.y); P.g.position.set(x + lz * ss, B.g.position.y + 0.05, z + lz * cc); P.g.rotation.y = B.g.rotation.y; });
});
},
function (G) {
var cx = -1180, cz = -520, B = NVG.shore, n = NVG.lite ? 8 : NVG_SHORE.length, fa = Math.atan2(B.dx, B.dz), c = Math.cos(fa), sn = Math.sin(fa);
for (var i = 0; i < n; i++) {
var d = NVG_SHORE[i], x, z, y, w = null, pose = d[3] === "sit" ? "sit" : null;
if (d[3] === "look" && NVG.lookout) {
x = NVG.lookout.x;
z = NVG.lookout.z;
y = NVG.lookout.y;
}
else if (d[3] === "jetty" && NVG.jetty) {
x = NVG.jetty.x - B.dx * 2;
z = NVG.jetty.z - B.dz * 2;
y = 1.725;
pose = "sit";
}
else if (i < 2) {
x = B.x + B.dx * 4 - B.dz * d[2][0] * 0.6;
z = B.z + B.dz * 4 + B.dx * d[2][0] * 0.6;
}
else {
x = cx + d[2][0] * c + d[2][1] * sn;
z = cz - d[2][0] * sn + d[2][1] * c;
}
if (d[3] === "walk")
w = { r: 14, sp: 1.1 };
nvgPut(G, "nvg_shore_" + i, nvgPirateLook(i, pose ? { pose: pose } : null), x, z, { name: d[0], persona: NVG_PIRATE_P + "Right now you are " + d[1] + ".", greet: nvgShoreGreet(i) }, w, i * 1.3, y);
}
},
function (i) { return ["Barnacles. Thousands of 'em. Want a scraper?", "Stand back, it's hot and it sticks.", "A stitch in time, matey, saves nine. Or so the Captain says.", "Out o' the way, this cask's heavier than it looks.", "Stew's nearly ready. Don't ask what's in it.", "Cut the deck? No? Then sit down and lose politely.", "He's cheating. They're all cheating.", "Hah! Have at you, post!", "Ahoy! Is that... no. Just a gull. I thought it was Pan.", "WHAT? SPEAK UP!", "Reef knot, sheet bend, bowline, clove hitch...", "Say hello to the Admiral. Admiral, say hello.", "Shh. You'll frighten the fish. There aren't any, but still.", "Have you... have you really seen Peter Pan? Up close?", "Zzz... I'm awake. I'm awake!", "Avast belay, yo ho, heave to!"][i] || "Arr."; },
function (G) {
var A = NVG_AT.camp, h0 = nvHeight(A.x, A.z), S = new THREE.Group(), bark = nvgSurf("bark", 0xA8907A, 1.6), mat = nvgC(0x6A5236), hide = nvgC(0xB89A70, { ds: true });
for (var i = 0; i < 5; i++) {
var a = i / 5 * Math.PI * 2 + 0.3, r = 17, x = A.x + Math.cos(a) * r, z = A.z + Math.sin(a) * r, L = new THREE.Group();
L.position.set(x, nvHeight(x, z) - 0.1, z);
L.rotation.y = Math.PI / 2 - a;
S.add(L);
nvgLodge(L, bark, mat, x, z, Math.PI / 2 - a);
}
var fire = wCone(0.6, 1.3, wB(0xFF8A2A, { fog: false }), A.x, h0 + 0.65, A.z, G, 7);
NVG.campFire = fire;
for (var s = 0; s < 9; s++) {
var a2 = s / 9 * 6.283;
wSph(0.35, nvgSurf("stone", 0x9A9288, 1), A.x + Math.cos(a2) * 1.4, h0 + 0.15, A.z + Math.sin(a2) * 1.4, S, 6);
}
NVG.smokes.push(nvgSmoke(G, A.x, h0 + 1.4, A.z));
[[8, -6], [-9, 7], [3, 10]].forEach(function (p, i) {
var rg = new THREE.Group();
rg.position.set(A.x + p[0], nvHeight(A.x + p[0], A.z + p[1]), A.z + p[1]);
rg.rotation.y = i;
S.add(rg);
wCyl(0.07, 0.07, 2.4, mat, -1.3, 1.2, 0, rg, 5);
wCyl(0.07, 0.07, 2.4, mat, 1.3, 1.2, 0, rg, 5);
var bar = wCyl(0.05, 0.05, 2.8, mat, 0, 2.3, 0, rg, 5);
bar.rotation.z = Math.PI / 2;
for (var k = 0; k < 6; k++)
wBox(0.22, 0.6, 0.04, i === 1 ? hide : nvgC(0x9A8A7A), -1 + k * 0.4, 1.85, 0, rg);
});
var cn = new THREE.Group();
cn.position.set(A.x - 12, nvHeight(A.x - 12, A.z - 9), A.z - 9);
cn.rotation.y = 0.7;
S.add(cn);
var hull = wMesh(new THREE.SphereGeometry(1, 14, 6, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2), nvgSurf("bark", 0xC0A07A, 1.2, { ds: true }), 0, 0.55, 0, cn);
hull.scale.set(0.75, 0.5, 4.2);
wBox(0.2, 0.5, 0.2, mat, 0, 0.25, -3, cn);
wBox(0.2, 0.5, 0.2, mat, 0, 0.25, 3, cn);
landBake(G, S);
nvgSignAt(G, ["The hunting camp", "of the People of the Bluff"], A.x + 26, A.z + 10);
var jobs = [["Great Little Panther's sister", "a hunter and tracker, back from following a stag up toward the Never Mountains; you read every print on the island", [5, 4], 0],
["A canoe builder", "shaping a new canoe from a log with fire and an adze; you explain how, gladly", [-10, -8], 0],
["A storyteller", "an old storyteller who knows how the island came to be, and why it floats a little nearer when children dream of it", [-3, -3], "sit"],
["A young hunter", "practising with your bow at a target of bark, and very proud of your last arrow", [9, -10], 0],
["A woman drying fish", "drying fish from the pirate river on the racks and keeping the gulls off", [8, -4], 0],
["A boy of the camp", "a boy of the People of the Bluff who is friends with the Lost Boys and races them through the Never Wood", [-6, 9], "walk"]];
var n = NVG.lite ? 3 : jobs.length;
for (var j = 0; j < n; j++) {
var d = jobs[j];
nvgPut(G, "nvg_camp_" + j, { sex: j === 0 || j === 4 ? "f" : "m", child: j === 5, pose: d[3] === "sit" ? "sit" : null, look: { top: [0x8A6A48, 0x6A4A30, 0xA8884A, 0x5A4A3A][j % 4], topKind: j === 0 || j === 4 ? "dress" : "shirt", bottom: 0x6A5038, shoes: 0x5A3E26, skin: [0x9A6A48, 0x8A5A3A, 0xA8785A][j % 3], hair: 0x141414, hairStyle: j % 2 ? "braids" : "long", hat: "none" } }, A.x + d[2][0], A.z + d[2][1], { name: d[0], persona: NVG_BLUFF_P + "Right now you are " + d[1] + ".", greet: ["Fresh tracks, going north. Something big.", "Fire first, then the adze. Slowly.", "Sit. I will tell you how the island came.", "Did you see that shot? Dead centre.", "The gulls are bold today.", "Race you to the river!"][j] }, d[3] === "walk" ? { r: 18, sp: 1.6 } : null, j * 1.1);
}
},
function (L, bark, mat, wx, wz, ry) {
var lodge = wMesh(new THREE.SphereGeometry(4, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2), bark, 0, 0, 0, L);
lodge.scale.set(1, 0.8, 1.4);
lodge.material = bark.clone();
lodge.material.side = THREE.DoubleSide;
var door = wMesh(new THREE.PlaneGeometry(1.5, 2, 1, 1), wB(0x1A120A), 0, 1, -5.55, L);
door.rotation.y = Math.PI;
door.visible = false;
for (var b = 0; b < 5; b++) {
var zo = (b - 2) * 2.1, k = Math.sqrt(Math.max(0.05, 1 - Math.pow(zo / 5.6, 2)));
var rib = wMesh(new THREE.TorusGeometry(4 * k + 0.04, 0.08, 4, 18, Math.PI), mat, 0, 0, zo, L);
rib.scale.y = 0.8;
}
wBox(2.2, 0.08, 1.4, nvgC(0xB89A70), 1.6, 0.05, 1, L);
wBox(2.2, 0.08, 1.4, nvgC(0x9A7A58), -1.6, 0.05, 1, L);
for (var s = 0; s < 6; s++) {
var a = s / 6 * 6.283;
wSph(0.18, nvgC(0x7A7470), Math.cos(a) * 0.6, 0.1, -1.6 + Math.sin(a) * 0.6, L, 5);
}
var bow = wMesh(new THREE.TorusGeometry(0.8, 0.03, 4, 12, Math.PI * 0.8), nvgC(0x6A4A2A), 2.6, 1.4, 2.8, L);
bow.rotation.y = Math.PI / 2;
var c = Math.cos(ry), sn = Math.sin(ry);
for (var i = 0; i < 14; i++) {
var a2 = i / 14 * Math.PI * 2, lx = Math.sin(a2) * 3.9, lz = Math.cos(a2) * 5.4;
if (lz < -4.6 && Math.abs(lx) < 1.2)
continue;
NV.solids.push({ x: wx + lx * c + lz * sn, z: wz - lx * sn + lz * c, r: 0.9 });
}
},
function (G) {
var A = NVG_AT.glade, h0 = nvHeight(A.x, A.z), S = new THREE.Group(), R = wRand(1313);
for (var i = 0; i < 26; i++) {
var a = i / 26 * 6.283, x = A.x + Math.cos(a) * 9, z = A.z + Math.sin(a) * 9, y = nvHeight(x, z);
wCyl(0.08, 0.11, 0.35, nvgC(0xF0E8D8), x, y + 0.17, z, S, 6);
var cap = wSph(0.3, nvgC([0xC83A2A, 0xE8C878, 0xF0E8D8][i % 3]), x, y + 0.38, z, S, 8);
cap.scale.y = 0.5;
}
for (var t = 0; t < 6; t++) {
var a3 = t / 6 * 6.283 + 0.4, tx = A.x + Math.cos(a3) * 24, tz = A.z + Math.sin(a3) * 24, ty = nvHeight(tx, tz), g = new THREE.Group();
g.position.set(tx, ty, tz);
g.rotation.y = Math.atan2(A.x - tx, A.z - tz);
S.add(g);
nvgCyl(1.2, 1.7, 14, nvgSurf("bark", 0x8A7A6A, 1.4), 0, 7, 0, g, 9);
wSph(5.5, nvgLeafMat(0x3A7432), 0, 15, 0, g, NVG.lite ? 6 : 10);
for (var w = 0; w < 3; w++) {
var wy = 2 + w * 3.4;
wCyl(0.24, 0.24, 0.06, wB(0xFFD88A), 0, wy, 1.35 - w * 0.12, g, 10).rotation.x = Math.PI / 2;
var ld = wBox(0.6, 0.06, 0.5, nvgC(0x6A4A2A), 0, wy - 0.35, 1.6 - w * 0.12, g);
}
NV.solids.push({ x: tx, z: tz, r: 1.8 });
}
landBake(G, S);
NVG.fairies = [];
var n = NVG.lite ? 10 : 26;
for (var f = 0; f < n; f++) {
var gl = wGlow([0xFFE89A, 0xB8E8FF, 0xFFC8E8, 0xD8FFC8][f % 4], 0.5, 0.6);
gl.userData = { a: R() * 6.28, r: 3 + R() * 18, y: 1 + R() * 7, sp: 0.05 + R() * 0.08, ph: R() * 6 };
G.add(gl);
NVG.fairies.push(gl);
}
nvgSignAt(G, ["The fairies' glade", "Hush. Walk softly."], A.x + 16, A.z - 10);
NV.talkers.push({ x: A.x, z: A.z, r: 12, name: "The fairies", t: { name: "A fairy of the glade", persona: "You are a fairy of the Neverland, from J. M. Barrie's Peter and Wendy: tiny, proud, quick-tempered and kind by turns, and so small you have room for only one feeling at a time. Barrie says that when the first baby laughed for the first time, its laugh broke into a thousand pieces and that was the beginning of fairies; and that every time a child says 'I don't believe in fairies' a fairy somewhere falls down dead, so you are wary of grown-ups. You speak in tinkles: write *jingling sounds* and then a short translation in brackets. Keep it gentle and suitable for children.", greet: "*a tiny jingle, a little suspicious* (Do you believe in us? Say you do.)" } });
},
function (G) {
var A = NVG_AT.spring, y = nvHeight(A.x, A.z), S = new THREE.Group();
for (var i = 0; i < 16; i++) {
var a = i / 16 * 6.283, x = A.x + Math.cos(a) * (9 + (i % 3)), z = A.z + Math.sin(a) * (9 + (i % 3));
var r = wMesh(new THREE.DodecahedronGeometry(1.2 + (i % 4) * 0.5, 0), nvgSurf("stone", 0x9A9488, 2), x, nvHeight(x, z) + 0.3, z, S);
r.scale.y = 0.7;
}
landBake(G, S);
nvgSignAt(G, ["The spring of the pirate river", "It runs down to Kidd's Creek"], A.x + 14, A.z + 10);
},
function (G) {
var n = 0, max = NVG.lite ? 4 : 9, R = wRand(808);
NVG_ISLE.forEach(function (I, ii) {
for (var k = 0; k < 24 && n < max; k++) {
var a = k / 24 * 6.283 + ii, best = null;
for (var d = I.r * 0.4; d < I.r * 1.6; d += 1.5) {
var x = I.x + Math.cos(a) * d, z = I.z + Math.sin(a) * d, h = nvHeight(x, z);
if (h > 0.4 && h < 2.4) {
best = { x: x, z: z, h: h };
}
if (h < 0)
break;
}
var sit = best && (k % 3 === 0), swim = !sit && k % 4 === 1;
if (!sit && !swim)
continue;
var x0 = sit ? best.x : I.x + Math.cos(a) * (I.r * 1.25), z0 = sit ? best.z : I.z + Math.sin(a) * (I.r * 1.25), y0 = sit ? best.h + 0.35 : -0.7;
if (!sit && nvHeight(x0, z0) > -0.5)
continue;
var col = [0x2F8A7A, 0x3A6AB8, 0x7A4AA8, 0x2A9A6A, 0xC86A8A, 0x3A8AA8, 0x4A9A5A, 0x8A5AB8, 0x2A7A9A][n % 9];
var g = wPerson("nvg_mermaid_" + n, { sex: "f", look: { top: col, topKind: "shirt", hair: [0xC8402A, 0xE8C878, 0x1A1A1A, 0x6A3A1A, 0xE8E0D0, 0x2A6A3A, 0xD8A040, 0x3A2A1A, 0xB8D0C8][n % 9], hairStyle: "long", hat: "none" } });
g.position.set(x0, y0, z0);
g.rotation.y = Math.atan2(x0 - I.x, z0 - I.z);
if (sit)
g.userData.pose = "sit";
var tail = new THREE.Group(), tm = wM(col, { e: col, ei: 0.15 }), t1 = wMesh(new THREE.CylinderGeometry(0.2, 0.1, 1.1, 10), tm, 0, 0, 0, tail);
t1.rotation.x = Math.PI / 2;
t1.position.set(0, 0.42, 0.5);
var fin = wMesh(new THREE.ConeGeometry(0.32, 0.45, 3), tm, 0, 0.38, 1.12, tail);
fin.rotation.x = Math.PI / 2;
fin.scale.set(1.4, 1, 0.25);
if (sit)
g.add(tail);
else {
tail.position.set(0, 0.2, -0.6);
tail.rotation.x = 0.8;
g.add(tail);
}
g.userData.tail = tail;
g.userData.y0 = y0;
g.userData.sit = !!sit;
G.add(g);
NV.mermaids.push(g);
n++;
}
});
NV.talkers.push({ x: NVG_AT.rocks.x, z: NVG_AT.rocks.z, r: 90, name: "The mermaids of the Rocks", t: { name: "A mermaid of the Rocks", persona: "You are a mermaid of the Mermaid Rocks, out past Mermaids' Lagoon in the Neverland of J. M. Barrie's Peter and Wendy: proud, vain, teasing and a little cruel to anyone who is not Peter Pan. You comb your hair in the sun, you dive at the first sight of a stranger, and you know where every wreck on the coral lies. Speak in short, haughty, playful sentences. Keep it suitable for children.", greet: "*dives, then surfaces further off and laughs* You're not Peter." } });
},
function (x, z) {
if (NVG.inBelow)
return "below deck in the Jolly Roger";
if (typeof nvgTownK === "function" && nvgTownK(x, z) > 0.3) {
var tl = nvgTL(x, z);
return tl.lx < 26 ? "the wharf, where the Jolly Roger lies moored" : "the pirate town at Kidd's Creek";
}
if (Math.hypot(x + 1180, z + 520) < 60)
return "the Pirate Shore, in the stockade";
if (NVG.shore && Math.hypot(x - NVG.shore.x, z - NVG.shore.z) < 70)
return "the Pirate Shore, the careening beach";
if (Math.hypot(x + 1180, z + 520) < 260)
return "the Pirate Shore";
if (Math.hypot(x - NVG_AT.camp.x, z - NVG_AT.camp.z) < 70)
return "the hunting camp of the People of the Bluff";
if (Math.hypot(x - NVG_AT.glade.x, z - NVG_AT.glade.z) < 45)
return "the fairies' glade";
if (Math.hypot(x - NVG_AT.spring.x, z - NVG_AT.spring.z) < 60)
return "the spring of the pirate river";
var rv = nvgRiverNear(x, z);
if (rv && rv.d < rv.w + 30)
return "by the pirate river";
for (var i = 0; i < NVG_ISLE.length; i++)
if (Math.hypot(x - NVG_ISLE[i].x, z - NVG_ISLE[i].z) < NVG_ISLE[i].r + 40)
return "the Mermaid Rocks";
var h = nvHeight(x, z);
if (h > 140 && z < -1200)
return "the Never Mountains";
if (z < -800 && h > 0)
return "the Northlands";
if (x < -800 && z > -100 && h > 0)
return "the Wildwood";
if (x < -860 && z < -100 && z > -1000 && h > 0)
return "the Pirate Shore";
if (x < -640 && z < -100 && z > -900 && h <= 0)
return "Kidd's Creek";
return null;
},
function (G) {
var T = NVG_TREE_AT, h0 = nvHeight(T.x, T.z), bark = nvgSurf("bark", 0x8A7058, 1.6), g = new THREE.Group();
g.position.set(T.x, h0, T.z);
G.add(g);
NVG.treeG = g;
G.children.forEach(function (c) {
if (!c.isGroup || Math.abs(c.position.x - T.x) > 0.1 || Math.abs(c.position.z - T.z) > 0.1)
return;
c.children.forEach(function (m) {
var p = m.geometry && m.geometry.parameters;
if (!m.isMesh || !p)
return;
if (m.geometry.type === "BoxGeometry" && p.width === 1.6 && p.height === 2.4)
m.visible = false;
if (m.geometry.type === "CylinderGeometry" && m.material && m.material.color && m.material.color.getHex() === 0x5A3E26) {
nvgUV(m.geometry);
m.material = bark;
}
});
});
var fz = 4.05;
var sh = new THREE.Shape();
sh.moveTo(-1.1, 0);
sh.lineTo(-1.1, 2.4);
sh.quadraticCurveTo(-1.1, 3.6, 0, 3.8);
sh.quadraticCurveTo(1.1, 3.6, 1.1, 2.4);
sh.lineTo(1.1, 0);
sh.lineTo(-1.1, 0);
var arch = wMesh(new THREE.ShapeGeometry(sh, 10), wB(0x0E0804), 0, 0.02, fz + 0.38, g);
var inner = wMesh(new THREE.CylinderGeometry(1.15, 1.15, 3.8, 12, 1, true, -Math.PI / 2, Math.PI), new THREE.MeshLambertMaterial({ color: 0x3A2414, side: THREE.BackSide }), 0, 1.9, fz - 0.15, g);
var glow = wGlow(0xFFB86A, 2.4, 0.32);
glow.position.set(0, 0.6, fz - 0.2);
g.add(glow);
[-1, 1].forEach(function (sd) { var lip = nvgCyl(0.32, 0.5, 4, bark, sd * 1.25, 1.9, fz + 0.3, g, 7); lip.rotation.z = sd * 0.06; });
for (var r = 0; r < 9; r++) {
var a = r / 9 * Math.PI * 2 + 0.2;
if (Math.abs(Math.atan2(Math.sin(a - Math.PI / 2), Math.cos(a - Math.PI / 2))) < 0.45)
continue;
var rt = nvgCyl(0.35, 0.6, 4, bark, Math.cos(a) * 4.6, 0.35, Math.sin(a) * 4.6, g, 6);
rt.rotation.z = Math.PI / 2 - 0.25;
rt.rotation.y = -a;
}
var sg = wSign(["Peter's tree", "Walk in. Hold your breath. Down you go."], 3, 0.8, "#5A3A1A", "#FFF4D8");
sg.position.set(2.6, 2.4, fz + 1.2);
sg.rotation.y = -0.4;
g.add(sg);
NV.solids = NV.solids.filter(function (s) { return !(s.r === 4.5 && Math.abs(s.x - T.x) < 0.01 && Math.abs(s.z - T.z) < 0.01); });
for (var i = 0; i < 16; i++) {
var a2 = i / 16 * Math.PI * 2, dx = Math.cos(a2), dz = Math.sin(a2);
if (dz > 0.8)
continue;
NV.solids.push({ x: T.x + dx * 3.7, z: T.z + dz * 3.7, r: 1.0 });
}
NV.solids.push({ x: T.x, z: T.z - 0.8, r: 2.6 });
NVG.treeDoor = { x: T.x, z: T.z + fz + 0.1 };
},
function (dt, L) {
var D = NVG.treeDoor;
if (!D || NV.home || NVG.inBelow)
return;
if (typeof NVB !== "undefined" && NVB.room)
return;
NVG.treeCool = Math.max(0, (NVG.treeCool || 0) - dt);
var dx = L.x - D.x, dz = L.z - D.z, d = Math.hypot(dx, dz), gy = nvHeight(NVG_TREE_AT.x, NVG_TREE_AT.z);
if (d < 1.35 && L.y < gy + 4.5 && NVG.treeCool <= 0) {
NVG.treeCool = 2.5;
nvIntoHome();
setStatus("<b>Down the hollow tree</b>, the way the Lost Boys go: hold your breath, and down you slide. Back (or E by the tree's roots) to climb out.");
}
},
function () {
var V = NV.village;
if (!V)
return;
var x0 = V.position.x, z0 = V.position.z;
V.children.forEach(function (L) {
if (!L.isGroup)
return;
var lodge = null, door = null;
L.children.forEach(function (m) { if (!m.isMesh || !m.geometry)
return; if (m.geometry.type === "SphereGeometry" && !lodge)
lodge = m; if (m.geometry.type === "CircleGeometry")
door = m; });
if (!lodge || !door)
return;
lodge.material = lodge.material.clone();
lodge.material.side = THREE.DoubleSide;
door.visible = false;
var wx = x0 + L.position.x, wz = z0 + L.position.z, ry = L.rotation.y, c = Math.cos(ry), sn = Math.sin(ry);
NV.solids = NV.solids.filter(function (s) { return !(s.r === 4.6 && Math.abs(s.x - wx) < 0.05 && Math.abs(s.z - wz) < 0.05); });
for (var i = 0; i < 16; i++) {
var a = i / 16 * Math.PI * 2, lx = Math.sin(a) * 4.1, lz = Math.cos(a) * 6.1;
if (lz < -5.2 && Math.abs(lx) < 1.4)
continue;
NV.solids.push({ x: wx + lx * c + lz * sn, z: wz - lx * sn + lz * c, r: 0.9 });
}
wBox(2.4, 0.08, 1.5, nvgC(0xB89A70), 1.6, 0.05, 1.4, L);
wBox(2.4, 0.08, 1.5, nvgC(0x8A6A48), -1.6, 0.05, 1.4, L);
for (var s = 0; s < 6; s++) {
var a2 = s / 6 * 6.283;
wSph(0.18, nvgC(0x7A7470), Math.cos(a2) * 0.6, 0.1, -1.8 + Math.sin(a2) * 0.6, L, 5);
}
wCyl(0.4, 0.3, 0.5, nvgC(0xA8885A), 2.4, 0.25, 3.4, L, 10);
});
},
function (G) {
var B = NVG_BELOW, g = new THREE.Group();
g.position.set(B.x, B.y, B.z);
g.visible = false;
G.add(g);
NVG.below = { g: g, x: B.x, y: B.y, z: B.z, solids: [], lights: [] };
var plank = nvgSurf("wood", 0x9A7A58, 1.6), dark = nvgSurf("wood", 0x5A4030, 2), beam = nvgSurf("wood", 0x6A4A30, 1.4), iron = nvgC(0x2A2A2A), canvas = nvgC(0x9A8C72, { ds: true }), S = g.userData.solids = NVG.below.solids;
var W = B.w, D = B.d, H = B.h;
nvgBox(W, 0.12, D, plank, 0, -0.06, 0, g);
nvgBox(W, 0.12, D, dark, 0, H + 0.06, 0, g);
[-1, 1].forEach(function (sd) { var w = nvgBox(0.2, H, D, dark, sd * W / 2, H / 2, 0, g); });
nvgBox(W, H, 0.2, dark, 0, H / 2, D / 2, g);
nvgBox(W, H, 0.2, dark, 0, H / 2, -D / 2, g);
for (var z = -D / 2 + 1; z < D / 2; z += 1.4)
nvgBox(W, 0.22, 0.24, beam, 0, H - 0.11, z, g);
for (var z2 = -D / 2 + 2; z2 < D / 2 - 1; z2 += 4.6)
[-1, 1].forEach(function (sd) { nvgBox(0.3, H, 0.3, beam, sd * (W / 2 - 0.25), H / 2, z2, g); });
[-1, 1].forEach(function (sd) {
for (var k = 0; k < 6; k++) {
var gz = -6 + k * 2.6, c = new THREE.Group();
c.position.set(sd * (W / 2 - 1.1), 0, gz);
g.add(c);
nvgBox(0.9, 0.4, 1.3, beam, 0, 0.3, 0, c);
var br = wCyl(0.16, 0.22, 2, iron, sd * 0.5, 0.68, 0, c, 10);
br.rotation.z = Math.PI / 2;
[-0.4, 0.4].forEach(function (w) { var wh = wCyl(0.22, 0.22, 0.1, beam, 0, 0.22, w, c, 10); wh.rotation.x = Math.PI / 2; });
var port = wBox(0.05, 0.55, 0.6, wB(0xC8D8E8), sd * (W / 2 - 0.12), 0.95, gz, g);
for (var s = 0; s < 5; s++)
wSph(0.09, iron, sd * (W / 2 - 2), 0.1, gz - 0.5 + s * 0.22, g, 6);
S.push({ x: sd * (W / 2 - 1.1), z: gz, hw: 0.6, hd: 0.7 });
}
});
for (var hm = 0; hm < 10; hm++) {
var hx = (hm % 2 ? 1 : -1) * 1.3, hz = -5 + Math.floor(hm / 2) * 2.6, h = wMesh(new THREE.CylinderGeometry(0.4, 0.4, 2.2, 10, 1, true, 0, Math.PI), canvas, hx, 1.75, hz, g);
h.rotation.z = Math.PI / 2;
h.rotation.y = Math.PI / 2;
h.rotation.x = Math.PI;
}
nvgBox(1.2, 0.08, 3.6, plank, 0, 0.78, -8.2, g);
nvgBox(0.1, 0.74, 3.2, beam, 0, 0.38, -8.2, g);
[-1, 1].forEach(function (sd) { nvgBox(0.35, 0.06, 3.4, plank, sd * 1, 0.45, -8.2, g); });
for (var cu = 0; cu < 6; cu++)
wCyl(0.06, 0.05, 0.14, nvgC(0x8A8A8A), (cu % 2 ? 0.3 : -0.3), 0.9, -9.6 + cu * 0.55, g, 8);
S.push({ x: 0, z: -8.2, hw: 1.4, hd: 1.9 });
for (var c2 = 0; c2 < 14; c2++) {
var cx = (c2 % 3 - 1) * 2.2, cz = 9 + Math.floor(c2 / 3) * 1.1;
if (c2 % 4 === 3) {
nvgBox(0.9, 0.8, 0.9, plank, cx, 0.4, cz, g);
}
else {
var ck = wCyl(0.42, 0.42, 1, beam, cx, 0.5, cz, g, 10);
}
}
S.push({ x: 0, z: 11, hw: 3.4, hd: 2.6 });
var cable = wMesh(new THREE.TorusGeometry(0.8, 0.22, 8, 18), nvgC(0x9A8A6A), -2.6, 0.25, 6.2, g);
cable.rotation.x = Math.PI / 2;
S.push({ x: -2.6, z: 6.2, r: 1.1 });
nvgBox(W, H, 0.12, plank, -0, H / 2, -10.4, g).scale.x = 1;
var door = wBox(1, 2, 0.14, wB(0x140C06), 0, 1, -10.39, g);
door.visible = false;
S.push({ x: -2.4, z: -10.4, hw: 1.6, hd: 0.15 }, { x: 2.4, z: -10.4, hw: 1.6, hd: 0.15 });
nvgBox(2.2, 0.08, 1.2, nvgSurf("wood", 0x5A3018, 1), 0, 0.8, -12.3, g);
var chart = wBox(1.6, 0.01, 0.9, nvgC(0xE8D8B0), 0, 0.85, -12.3, g);
chart.rotation.y = 0.1;
for (var b = 0; b < 14; b++)
wBox(0.12, 0.4 + (b % 3) * 0.05, 0.32, nvgC([0x6A1A1A, 0x1A3A2A, 0x3A2A1A, 0x2A2A5A][b % 4]), -3.6, 0.55 + Math.floor(b / 7) * 0.6, -13.4 + (b % 7) * 0.16, g);
nvgBox(0.3, 1.4, 1.4, plank, -3.75, 0.7, -12.9, g);
nvgBox(1.4, 0.5, 2.4, nvgSurf("wood", 0x5A3018, 1), 2.9, 0.25, -12.6, g);
wBox(1.3, 0.15, 2.2, nvgC(0x8A1A22), 2.9, 0.58, -12.6, g);
wCyl(0.08, 0.12, 0.3, nvgC(0xC8C8D0), 0.6, 1.0, -12.1, g, 8);
var flame = wCone(0.05, 0.14, wB(0xFFD890), 0.6, 1.22, -12.1, g, 6);
for (var sw = 0; sw < 4; sw++)
wBox(0.9, 0.8, 0.05, wB(0xD8E8F0), -2.6 + sw * 1.75, 1.5, -13.95, g);
S.push({ x: 0, z: -12.3, hw: 1.2, hd: 0.7 }, { x: 2.9, z: -12.6, hw: 0.8, hd: 1.3 }, { x: -3.6, z: -12.9, hw: 0.4, hd: 0.8 });
var lad = new THREE.Group();
lad.position.set(0, 0, -3.5);
g.add(lad);
[-0.4, 0.4].forEach(function (x) { var r = nvgBox(0.08, 2.8, 0.08, beam, x, 1.3, 0, lad); r.rotation.x = -0.3; });
for (var st = 0; st < 6; st++) {
nvgBox(0.8, 0.06, 0.18, beam, 0, 0.3 + st * 0.42, 0.38 - st * 0.13, lad);
}
var shaft = wBox(1.5, 0.05, 1.5, wB(0xE8F0F4), 0, H + 0.13, -4, g);
[[0, -8.2], [0, -1], [0, 6], [0, -12.3]].forEach(function (p) { var l = new THREE.Group(); l.position.set(p[0], H - 0.5, p[1]); g.add(l); nvgCyl(0.12, 0.1, 0.3, nvgC(0xC8A040), 0, 0, 0, l, 8); wSph(0.1, wB(0xFFD890), 0, 0, 0, l, 8); var gw = wGlow(0xFFD890, 1.2, 0.4); l.add(gw); });
var L1 = new THREE.PointLight(0xFFC888, 0.55, 16);
L1.position.set(0, H - 0.6, -4);
g.add(L1);
var L2 = new THREE.PointLight(0xFFC888, 0.45, 14);
L2.position.set(0, H - 0.6, 6);
g.add(L2);
var L3 = new THREE.PointLight(0xFFC888, 0.45, 9);
L3.position.set(0, H - 0.6, -12.2);
g.add(L3);
NVG.below.lights = [L1, L2, L3];
var sg = wSign(["The gun deck", "Forward: the hold · Aft: the Captain's cabin"], 2.6, 0.7, "#2A1A0E", "#E8D8B0");
sg.position.set(0, 1.9, -3.0);
g.add(sg);
NVG.belowCrew = [];
if (!NVG.lite) {
[["A pirate off watch", "asleep in your hammock below deck, and furious at being woken", [1.3, 0.2], "sit", 1.5], ["The cook's mate", "peeling potatoes on the mess bench and singing under your breath", [1, -7.6], "sit", 0.45], ["A gunner", "polishing a long gun below deck and talking to it", [-2.2, 1.5], null, 0]].forEach(function (d, i) {
var o = nvgPirateLook(30 + i, d[3] ? { pose: d[3] } : null), p = wPerson("nvg_below_" + i, o);
if (d[3])
p.userData.pose = d[3];
p.position.set(d[2][0], d[4], d[2][1]);
p.rotation.y = i * 1.7;
g.add(p);
NVG.belowCrew.push({ g: p, t: { name: d[0], persona: NVG_PIRATE_P + "Right now you are " + d[1] + ".", greet: ["Whassat? Go 'way. Night watch.", "Potatoes. Always potatoes.", "Easy now, my beauty. Easy."][i] }, x: d[2][0], z: d[2][1] });
});
}
},
function () {
if (!NVG.below)
return;
var B = NVG.below;
NVG.inBelow = true;
B.g.visible = true;
if (NV.home)
NV.home = false;
camera.position.set(NV.base + B.x, B.y + 1.72, B.z - 4.6);
yaw = Math.PI;
pitch = 0;
if (typeof flyY !== "undefined")
flyY = B.y;
setStatus("<b>Below deck in the Jolly Roger.</b> Low beams, mind your head. The guns, the hammocks, the hold forward, the Captain's cabin aft. E at the ladder (or Back) to climb up.");
},
function () {
if (!NVG.below)
return;
NVG.inBelow = false;
NVG.below.g.visible = false;
var s = NV.ship;
if (!s) {
worldHome();
return;
}
var c = Math.cos(s.rotation.y), sn = Math.sin(s.rotation.y), lx = 0, lz = -1.8, x = s.position.x + lx * c + lz * sn, z = s.position.z - lx * sn + lz * c, y = nvDeckAt(x, z);
camera.position.set(NV.base + x, (y === null ? 4 : y) + 1.72, z);
yaw = -s.rotation.y;
pitch = 0;
if (typeof flyY !== "undefined")
flyY = (y === null ? 4 : y);
setStatus("Up the ladder and out on deck.");
},
function (dt, L) {
var B = NVG.below;
if (!B)
return null;
if (L.y > B.y + NVG_BELOW.h - 0.2) {
camera.position.y = B.y + NVG_BELOW.h - 0.2;
if (typeof flyY !== "undefined")
flyY = NVG_BELOW.h - 1.92;
}
var lx = L.x - B.x, lz = L.z - B.z;
if (Math.hypot(lx, lz + 3.5) < 1.6)
return { name: "The ladder", fn: nvgBelowOut, verb: "climb up on deck" };
var near = null, bd = 3;
NVG.belowCrew.forEach(function (C) { var d = Math.hypot(lx - C.x, lz - C.z); if (d < bd) {
bd = d;
near = { name: C.t.name, t: C.t };
} });
return near;
},
function (dt) {
if (!NVG.built)
return;
var L = worldLocal(), t = WLD.t;
nvgTreeTick(dt, L);
NVG.visAt -= dt;
if (NVG.visAt <= 0) {
NVG.visAt = 0.5;
var far = NVG.lite ? 700 : 1400, gfar = NVG.lite ? 2600 : 4200, under = NV.home || (typeof NVB !== "undefined" && NVB.room);
NVG.treeTiles.forEach(function (T) { var on = !under && Math.hypot(L.x - T.x, L.z - T.z) < far + 360; if (T.g.visible !== on)
T.g.visible = on; });
NVG.tiles.forEach(function (T) { var on = !under && Math.hypot(L.x - T.x, L.z - T.z) < gfar; if (T.g.visible !== on)
T.g.visible = on; });
var hide = false;
if (nvgBookOn()) {
try {
hide = nvbS().ch >= 11;
}
catch (e) { }
}
if (hide !== NVG.crewHidden) {
NVG.crewHidden = hide;
NVG.deck.forEach(function (P) { P.g.visible = !hide; });
NV.talkers.forEach(function (T) { if (T.p && T.p.nvgDeck)
T.r = hide ? 0 : 4; });
}
}
nvgBoatsTick(dt, t);
nvgKeepBoys();
if (NV.croc && NV.ship) {
var cr = NV.croc, ca = t * 0.05, ss = NV.ship, cc2 = Math.cos(ss.rotation.y), sn2 = Math.sin(ss.rotation.y), lx = -70 + Math.cos(ca) * 40, lz = Math.sin(ca * 1.3) * 70, wx = ss.position.x + lx * cc2 + lz * sn2, wz = ss.position.z - lx * sn2 + lz * cc2;
cr.rotation.y = Math.atan2(wx - cr.position.x, wz - cr.position.z);
cr.position.x = wx;
cr.position.z = wz;
}
NVG.smokes.forEach(function (S, j) { S.list.forEach(function (p, i) { var u = ((t * 0.35 + i * 0.6 + j * 0.3) % 3); p.position.set(S.x + Math.sin(t * 0.2 + i) * 0.3 * u, S.y + u * (S.small ? 1.2 : 2), S.z + u * 0.4); p.scale.setScalar(1 + u * 0.8); p.material.opacity = 0.28 * Math.sin(Math.PI * u / 3); }); });
[NVG.fire, NVG.campFire].forEach(function (f, i) { if (f)
f.scale.set(1, 0.9 + Math.sin(t * 1.3 + i) * 0.08, 1); });
NVG.flags.forEach(function (F, k) { var fp = F.geometry.attributes.position; for (var i = 0; i < fp.count; i++) {
var fx = fp.getX(i);
fp.setZ(i, Math.sin(fx * 2 + t * 3 + k) * 0.18 * (fx + 1.5) / 3);
} fp.needsUpdate = true; });
if (NVG.fairies.length && Math.hypot(L.x - NVG_AT.glade.x, L.z - NVG_AT.glade.z) < 160) {
var A = NVG_AT.glade, gy = nvHeight(A.x, A.z);
NVG.fairies.forEach(function (f) { var u = f.userData; u.a += dt * u.sp; f.position.set(A.x + Math.cos(u.a) * u.r, gy + u.y + Math.sin(t * 0.4 + u.ph) * 0.6, A.z + Math.sin(u.a) * u.r); f.material.opacity = 0.45 + 0.15 * Math.sin(t * 0.5 + u.ph); });
}
if (NVG.riverMesh)
NVG.riverMesh.offset.y = (NVG.riverMesh.offset.y - dt * 0.25) % 1;
if (!NVG.told.shore && Math.hypot(L.x + 1180, L.z + 520) < 120) {
NVG.told.shore = 1;
setStatus("<b>The Pirate Shore.</b> Hook's crew ashore: the careening beach, the stockade, the grog tent. Keep your head down, and if you hear a clock ticking, run.");
}
if (NV.ship && !NV.home && !(typeof NVB !== "undefined" && NVB.room)) {
var s = NV.ship, c = Math.cos(s.rotation.y), sn = Math.sin(s.rotation.y), hx = s.position.x - 4 * sn, hz = s.position.z - 4 * c;
if (Math.hypot(L.x - hx, L.z - hz) < 2 && L.y < s.position.y + 8)
worldPrompt("<b>The main hatch</b> · <b>press E</b> to go below deck", nvgBelowGo);
}
},
function (x, z) {
var T = NVG_TOWN, L = nvgTL(x, z);
if (L.lx < T.x0 - 6 || L.lx > T.x1 + 40 || L.lz < T.z0 - 40 || L.lz > T.z1 + 40)
return 0;
var nz = (wFbm(L.lx * 0.02 + 3, L.lz > 0 ? 7 : 1, 88, 2) - 0.5) * 44, kx = L.lx < T.x0 ? 0 : Math.min(1, (T.x1 + 40 - L.lx) / 40), kz = Math.min(1, (L.lz - (T.z0 - 40 + nz)) / 40, (T.z1 + 40 - nz - L.lz) / 40);
return Math.max(0, Math.min(kx, kz));
},
function (x, z, h) {
var T = NVG_TOWN, L = nvgTL(x, z);
if (L.lx < T.x0 - 6 || L.lx > T.x1 + 40 || L.lz < T.z0 - 40 || L.lz > T.z1 + 40)
return h;
if (L.lx < T.x0) {
var e = (T.x0 - L.lx) / 6;
if (L.lz > T.z0 && L.lz < T.z1)
return Math.min(h, T.y - e * 7);
return h;
}
var k = nvgS(0, 1, nvgTownK(x, z));
return h + (T.y - h) * k;
},
function (G) {
var T = NVG_TOWN, S = new THREE.Group();
S.name = "nvg-town";
var stone = nvgSurf("stone", 0xA8A090, 2.5), paving = nvgSurf("paving", 0xB0A48C, 2.4), plank = nvgSurf("wood", 0x9A7A58, 1.6), dark = nvgSurf("wood", 0x5A4030, 1.8), plaster = nvgSurf("plaster", 0xE8DCC0, 2.5), plaster2 = nvgSurf("plaster", 0xD8B890, 2.5), siding = nvgSurf("siding", 0x8A6A4A, 2.2), roofT = nvgSurf("tile", 0xA8543A, 2), roofS = nvgSurf("shingle", 0x5A4A40, 2), glass = nvgC(0xFFD890, { e: 0x7A5A20, ei: 0.6 }), iron = nvgC(0x2A2A2A);
var ry = T.ry, face = ry - Math.PI / 2;
function at(lx, lz, y) { var p = nvgTW(lx, lz); return new THREE.Vector3(p.x, y === undefined ? T.y : y, p.z); }
var qc = at(T.x0 - 0.5, 0, T.y - 2.6), qw = nvgBox(1.4, 5.6, T.z1 - T.z0, stone, qc.x, qc.y, qc.z, S);
qw.rotation.y = ry;
var qt = at(T.x0 + 1, 0, T.y - 0.05), qtop = nvgBox(3.4, 0.2, T.z1 - T.z0, paving, qt.x, qt.y, qt.z, S);
qtop.rotation.y = ry;
for (var bz = T.z0 + 8; bz < T.z1; bz += 16) {
var b = at(T.x0 + 0.6, bz);
nvgCyl(0.28, 0.34, 0.8, iron, b.x, T.y + 0.4, b.z, S, 8);
}
var WF = { lx0: 6.6, lx1: 12.6, lz0: -22, lz1: 22, y: 2.5 };
var wc = at((WF.lx0 + WF.lx1) / 2, 0, WF.y - 0.12), wd = nvgBox(WF.lx1 - WF.lx0, 0.24, WF.lz1 - WF.lz0, plank, wc.x, wc.y, wc.z, S);
wd.rotation.y = ry;
NVG.rects.push({ cx: wc.x, cz: wc.z, ry: ry, hw: (WF.lx1 - WF.lx0) / 2, hd: (WF.lz1 - WF.lz0) / 2, y: WF.y });
for (var pz = WF.lz0; pz <= WF.lz1; pz += 4)
[WF.lx0 + 0.3, WF.lx1 - 0.3].forEach(function (px) { var p = at(px, pz); nvgCyl(0.18, 0.2, 6, dark, p.x, WF.y - 3, p.z, S, 6); });
[-12, 12].forEach(function (lz) {
var pc = at((WF.lx1 + T.x0) / 2, lz, WF.y - 0.12), pr = nvgBox(T.x0 - WF.lx1 + 0.6, 0.24, 4, plank, pc.x, pc.y, pc.z, S);
pr.rotation.y = ry;
NVG.rects.push({ cx: pc.x, cz: pc.z, ry: ry, hw: (T.x0 - WF.lx1 + 0.6) / 2, hd: 2, y: WF.y });
for (var px2 = WF.lx1 + 2; px2 < T.x0; px2 += 4)
[lz - 1.8, lz + 1.8].forEach(function (z) { var p = at(px2, z); nvgCyl(0.16, 0.18, 6, dark, p.x, WF.y - 3, p.z, S, 6); });
});
var gp = at(5.2, 2, 3.2), gpl = nvgBox(3.2, 0.12, 1.1, plank, gp.x, gp.y, gp.z, S);
gpl.rotation.order = "YZX";
gpl.rotation.y = ry;
gpl.rotation.z = 0.5;
NVG.rects.push({ cx: gp.x, cz: gp.z, ry: ry, hw: 1.6, hd: 0.55, y: 3.25 });
var lines = [];
[[-14, -12.5], [14, 13.5]].forEach(function (q) { var bo = at(WF.lx0 + 0.8, q[0], WF.y + 0.4); nvgCyl(0.22, 0.28, 0.7, iron, bo.x, WF.y + 0.35, bo.z, S, 8); var sp = at(3.4, q[1], 4.6); lines.push(bo.x, bo.y, bo.z, sp.x, sp.y, sp.z); });
var lg = new THREE.BufferGeometry();
lg.setAttribute("position", new THREE.Float32BufferAttribute(lines, 3));
G.add(new THREE.LineSegments(lg, new THREE.LineBasicMaterial({ color: 0x3A3020 })));
for (var ci = 0; ci < 10; ci++) {
var cp = at(WF.lx1 - 1.2 - (ci % 2) * 1.1, -18 + ci * 3.6);
if (ci % 3)
wCyl(0.36, 0.36, 0.9, plank, cp.x, WF.y + 0.45, cp.z, S, 10);
else
nvgBox(0.9, 0.8, 0.9, plank, cp.x, WF.y + 0.4, cp.z, S);
NV.solids.push({ x: cp.x, z: cp.z, r: 0.5 });
}
[[T.x0 + 14, 0, 22, T.z1 - T.z0], [82, 0, 10, T.z1 - T.z0], [170, 0, 10, T.z1 - T.z0 - 20], [126, 0, 30, 60], [126, -66, 10, 70], [126, 66, 10, 70]].forEach(function (r) { var c = at(r[0], r[1], T.y + 0.03), st = nvgBox(r[2], 0.06, r[3], paving, c.x, c.y, c.z, S); st.rotation.y = ry; });
var wl = at(130, 0);
nvgCyl(1.3, 1.4, 1, stone, wl.x, T.y + 0.5, wl.z, S, 14);
[-1, 1].forEach(function (sd) { var p = at(130, sd * 1.1); nvgBox(0.18, 2.4, 0.18, dark, p.x, T.y + 1.2, p.z, S); });
var wr = at(130, 0);
var wro = nvgBox(0.3, 0.3, 2.6, dark, wr.x, T.y + 2.4, wr.z, S);
wro.rotation.y = ry;
NV.solids.push({ x: wl.x, z: wl.z, r: 1.5 });
[[118, -14, 0xB83A2A], [118, 14, 0x2A5A8A], [140, -16, 0xD8B04A], [140, 16, 0x3A7A3A]].forEach(function (m) {
var p = at(m[0], m[1]), g = new THREE.Group();
g.position.set(p.x, T.y, p.z);
g.rotation.y = face;
S.add(g);
nvgBox(2.6, 0.9, 1.2, plank, 0, 0.45, 0, g);
[-1.2, 1.2].forEach(function (x) { nvgBox(0.1, 2.4, 0.1, dark, x, 1.2, -0.5, g); nvgBox(0.1, 2.4, 0.1, dark, x, 1.2, 0.5, g); });
var aw = wBox(2.8, 0.06, 1.6, wM(m[2], { ds: true }), 0, 2.45, 0.1, g);
aw.rotation.x = 0.15;
for (var k = 0; k < 5; k++)
wSph(0.16, nvgC([0xE8A040, 0xC83A2A, 0x8AB84A, 0xE8D86A, 0x7A4A2A][k]), -0.9 + k * 0.45, 0.98, 0, g, 6);
NV.solids.push({ x: p.x, z: p.z, r: 1.5 });
});
var nb = at(122, -26), nbs = wSign(["WANTED", "PETER PAN", "for crimes against good form", "Reward: 100 doubloons. Apply J. Hook, Esq."], 2.4, 2, "#E8DCB8", "#2A1A0E");
nbs.position.set(nb.x, T.y + 1.8, nb.z);
nbs.rotation.y = face;
S.add(nbs);
nvgBox(0.12, 2.8, 0.12, dark, nb.x, T.y + 1.4, nb.z, S);
NVG.townGlows = [];
for (var lz = -112; lz <= 112; lz += 28) {
[T.x0 + 4, 84].forEach(function (lx) { var p = at(lx, lz + (lx > 50 ? 14 : 0)); nvgCyl(0.07, 0.09, 3.2, iron, p.x, T.y + 1.6, p.z, S, 6); var lb = wBox(0.32, 0.42, 0.32, glass, p.x, T.y + 3.3, p.z, S); });
}
[-120, -112, 112, 120].forEach(function (lz) { var p = at(T.x0 + 3, lz), g = new THREE.Group(); g.position.set(p.x, T.y, p.z); g.rotation.y = face; S.add(g); nvgBox(1, 0.4, 1.4, plank, 0, 0.3, 0, g); var br = wCyl(0.16, 0.22, 2.2, iron, 0, 0.72, 0.5, g, 10); br.rotation.x = Math.PI / 2; NV.solids.push({ x: p.x, z: p.z, r: 1 }); });
NVG_HOUSES.forEach(function (H) { try {
nvgHouse(S, H, face, { stone: stone, plank: plank, dark: dark, plaster: H[1] % 2 ? plaster : plaster2, siding: siding, roof: H[0] === 104 ? roofS : roofT, glass: glass, iron: iron });
}
catch (e) {
if (window.console)
console.warn("[nvg] house", H[5], e);
} });
landBake(G, S);
nvgSignAt(G, ["Kidd's Creek", "the pirate town · the Jolly Roger at the wharf"], nvgTW(T.x0 + 6, -18).x, nvgTW(T.x0 + 6, -18).z, face);
},
function (S, H, face, M) {
var T = NVG_TOWN, lx = H[0], lz = H[1], w = H[2], d = H[3], fl = H[4], kind = H[6], p = nvgTW(lx, lz), y0 = T.y, fh = 3.2, hh = fl * fh;
var g = new THREE.Group();
g.position.set(p.x, y0, p.z);
g.rotation.y = face;
S.add(g);
var wt = 0.3, dw = 1.8, dh = 2.6;
nvgBox(w, 0.6, d, M.stone, 0, 0.3, 0, g);
nvgBox((w - dw) / 2, fh, wt, M.plaster, -(w + dw) / 4, fh / 2, d / 2, g);
nvgBox((w - dw) / 2, fh, wt, M.plaster, (w + dw) / 4, fh / 2, d / 2, g);
nvgBox(dw, fh - dh, wt, M.plaster, 0, dh + (fh - dh) / 2, d / 2, g);
nvgBox(w, hh, wt, M.plaster, 0, hh / 2, -d / 2, g);
nvgBox(wt, hh, d, M.plaster, -w / 2, hh / 2, 0, g);
nvgBox(wt, hh, d, M.plaster, w / 2, hh / 2, 0, g);
if (fl > 1) {
nvgBox(w + 0.6, hh - fh, wt, M.plaster, 0, fh + (hh - fh) / 2, d / 2 + 0.3, g);
nvgBox(w + 0.6, 0.3, d + 0.6, M.dark, 0, fh, 0.15, g);
}
nvgBox(w, 0.2, d, M.plank, 0, 0.62, 0, g);
nvgBox(w, 0.2, d, M.dark, 0, fh - 0.1, 0, g);
for (var i = 0; i <= 4; i++) {
nvgBox(0.22, hh, 0.18, M.dark, -w / 2 + i * w / 4, hh / 2, d / 2 + (fl > 1 ? 0.48 : 0.18), g);
}
for (var f = 1; f <= fl; f++)
nvgBox(w, 0.22, 0.2, M.dark, 0, f * fh - 0.1, d / 2 + (fl > 1 ? 0.5 : 0.2), g);
var rw = d / 2 + 0.9, rh = 2.6, rl = Math.hypot(rw, rh), ang = Math.atan2(rh, rw);
[-1, 1].forEach(function (sd) { var r = nvgBox(w + 0.8, 0.22, rl, M.roof, 0, hh + rh / 2, sd * rw / 2, g); r.rotation.x = sd * ang; });
var gab = new THREE.Shape();
gab.moveTo(-d / 2, 0);
gab.lineTo(d / 2, 0);
gab.lineTo(0, rh);
gab.lineTo(-d / 2, 0);
[-1, 1].forEach(function (sd) { var gm = new THREE.Mesh(nvgUV(new THREE.ShapeGeometry(gab).toNonIndexed()), M.plaster); gm.geometry.computeVertexNormals(); gm.position.set(sd * w / 2, hh, 0); gm.rotation.y = Math.PI / 2; g.add(gm); });
nvgBox(0.9, 1.6, 0.9, M.stone, w / 4, hh + rh - 0.2, -d / 6, g);
for (var f2 = 0; f2 < fl; f2++)
for (var wi = 0; wi < 4; wi++) {
var wx = -w / 2 + w / 8 + wi * w / 4;
if (f2 === 0 && Math.abs(wx) < dw)
continue;
var wy = f2 * fh + 1.7, wz = d / 2 + (fl > 1 && f2 > 0 ? 0.48 : 0.18) + 0.03;
wBox(1.1, 1.2, 0.05, M.glass, wx, wy, wz, g);
nvgBox(1.3, 0.1, 0.15, M.dark, wx, wy - 0.65, wz + 0.05, g);
nvgBox(0.08, 1.2, 0.07, M.dark, wx, wy, wz + 0.03, g);
}
var sg = wSign([H[5]], 3.4, 0.7, "#2A1A0E", "#E8D0A0");
sg.position.set(0, dh + 0.7, d / 2 + (fl > 1 ? 0.62 : 0.32));
g.add(sg);
nvgInside(g, kind, w, d, M);
var c = Math.cos(face), s = Math.sin(face);
function W(ax, az, hw, hd) { NV.solids.push({ x: p.x + ax * c + az * s, z: p.z - ax * s + az * c, hw: hw, hd: hd, rot: face }); }
W(-(w + dw) / 4, d / 2, (w - dw) / 4, 0.2);
W((w + dw) / 4, d / 2, (w - dw) / 4, 0.2);
W(0, -d / 2, w / 2, 0.2);
W(-w / 2, 0, 0.2, d / 2);
W(w / 2, 0, 0.2, d / 2);
NVG.houses.push({ x: p.x, z: p.z, ry: face, w: w, d: d, name: H[5], kind: kind });
},
function (g, kind, w, d, M) {
var y = 0.72, tab = function (x, z) { nvgBox(1.6, 0.08, 0.9, M.plank, x, y + 0.75, z, g); nvgBox(0.1, 0.74, 0.1, M.dark, x - 0.7, y + 0.37, z - 0.35, g); nvgBox(0.1, 0.74, 0.1, M.dark, x + 0.7, y + 0.37, z + 0.35, g); nvgBox(0.1, 0.74, 0.1, M.dark, x - 0.7, y + 0.37, z + 0.35, g); nvgBox(0.1, 0.74, 0.1, M.dark, x + 0.7, y + 0.37, z - 0.35, g); };
var bar = function (n, col) { for (var i = 0; i < n; i++)
wCyl(0.34, 0.34, 0.85, M.plank, -w / 2 + 0.8, y + 0.43, -d / 2 + 0.9 + i * 0.8, g, 10); };
var shelves = function () { for (var r = 0; r < 3; r++) {
nvgBox(w - 1.4, 0.06, 0.5, M.plank, 0, y + 0.6 + r * 0.7, -d / 2 + 0.45, g);
for (var k = 0; k < 8; k++)
wBox(0.3, 0.4, 0.3, nvgC([0xC8A060, 0x8A5A3A, 0x5A6A8A, 0xA8A8A0][(k + r) % 4]), -w / 2 + 1.2 + k * (w - 2.4) / 7, y + 0.85 + r * 0.7, -d / 2 + 0.45, g);
} };
var counter = function () { nvgBox(w * 0.55, 1, 0.6, M.dark, 0, y + 0.5, -d / 2 + 2.2, g); };
var fire = function () { nvgBox(1.8, 1.6, 0.6, M.stone, w / 2 - 1.4, y + 0.8, -d / 2 + 0.4, g); wBox(0.9, 0.5, 0.1, wB(0xC8601A), w / 2 - 1.4, y + 0.4, -d / 2 + 0.72, g); };
var lamp = wSph(0.16, wB(0xFFD890), 0, 3, 0, g, 8);
if (kind === "tavern") {
counter();
bar(5);
fire();
tab(-3, 1.5);
tab(2, 2);
tab(-1, -1.5);
for (var m = 0; m < 6; m++)
wCyl(0.05, 0.04, 0.14, nvgC(0x9A9A9A), -1.6 + m * 0.6, y + 1.07, -d / 2 + 2.2, g, 8);
}
else if (kind === "shop" || kind === "sail" || kind === "map" || kind === "bank") {
counter();
shelves();
if (kind === "sail")
nvgBox(3, 0.04, 2, nvgC(0xE8DCC0), -2, y + 0.04, 2, g);
if (kind === "map") {
tab(2, 1.5);
wBox(1.4, 0.01, 0.8, nvgC(0xE8D8B0), 2, y + 0.8, 1.5, g);
}
if (kind === "bank") {
nvgBox(1, 0.9, 0.8, nvgSurf("metal", 0x3A3A3A, 1), w / 2 - 1.2, y + 0.45, -d / 2 + 0.8, g);
}
}
else if (kind === "cooper") {
for (var b = 0; b < 9; b++)
wCyl(0.38, 0.38, 0.9, M.plank, -w / 2 + 1.2 + (b % 3) * 1.1, y + 0.45, -d / 2 + 1 + Math.floor(b / 3) * 1.1, g, 10);
counter();
}
else if (kind === "gun" || kind === "smith") {
fire();
nvgBox(0.7, 0.5, 0.35, M.iron, 0, y + 0.8, 0, g);
nvgBox(0.8, 0.6, 0.5, nvgSurf("bark", 0x7A6A5A, 1), 0, y + 0.3, 0, g);
shelves();
}
else if (kind === "cook") {
counter();
fire();
tab(-2, 1.5);
tab(2, 1.5);
}
else if (kind === "hook") {
nvgBox(2.4, 0.08, 1.2, nvgSurf("wood", 0x5A3018, 1), 0, y + 0.8, -1, g);
nvgBox(0.8, 1.4, 0.7, nvgC(0x8A1A22), 0, y + 0.7, -2.2, g);
shelves();
var pt = wSign(["J. HOOK", "Eton"], 1.4, 1.8, "#1A120A", "#C8A040");
pt.position.set(0, y + 2, -d / 2 + 0.2);
g.add(pt);
}
else if (kind === "lodge" || kind === "home") {
nvgBox(2, 0.5, 1, M.dark, -w / 2 + 1.4, y + 0.25, -d / 2 + 0.9, g);
wBox(1.9, 0.15, 0.9, nvgC(0xB8A88A), -w / 2 + 1.4, y + 0.55, -d / 2 + 0.9, g);
if (kind === "lodge") {
nvgBox(2, 0.5, 1, M.dark, w / 2 - 1.4, y + 0.25, -d / 2 + 0.9, g);
}
tab(1, 1);
fire();
}
},
function (G) {
var n = NVG.lite ? 8 : NVG_TOWNFOLK.length;
for (var i = 0; i < n; i++) {
var d = NVG_TOWNFOLK[i], x, z, y, w = null, pose = d[4] === "sit" ? "sit" : null;
if (d[4] === "wharf") {
var p0 = nvgTW(d[2][0], d[2][1]);
x = p0.x;
z = p0.z;
y = 2.5;
}
else {
var H = null;
NVG.houses.forEach(function (Q) { var L = nvgTL(Q.x, Q.z); if (Math.abs(L.lx - d[2][0]) < 0.5 && Math.abs(L.lz - d[2][1]) < 0.5)
H = Q; });
if (H && (d[2][2] || d[2][3])) {
var c = Math.cos(H.ry), s = Math.sin(H.ry);
x = H.x + d[2][2] * c + d[2][3] * s;
z = H.z - d[2][2] * s + d[2][3] * c;
y = NVG_TOWN.y + 0.72;
}
else {
var p1 = nvgTW(d[2][0], d[2][1]);
x = p1.x;
z = p1.z;
}
}
if (d[4] === "walk")
w = { r: 12, sp: 1.1 };
var o = d[3] === "f" ? { sex: "f", look: { top: [0x8A3A3A, 0x3A5A8A, 0xC8A870, 0x5A7A4A][i % 4], topKind: "dress", bottom: 0x3A2A1A, shoes: 0x2A1A12, hair: [0x5A3A1A, 0x1A1A1A, 0xA8743A][i % 3], hairStyle: "long", hat: i % 2 ? "bonnet" : "none", hatColor: 0xE8DCC0 } } : nvgPirateLook(40 + i);
if (pose)
o.pose = pose;
var P = nvgPut(G, "nvg_town_" + i, o, x, z, { name: d[0], persona: NVG_TOWN_P + "You are " + d[1] + ".", greet: nvgTownGreet(i) }, w, NVG_TOWN.ry - Math.PI / 2 + (i % 3) * 0.6, y);
if (y !== undefined && !w)
P.fixY = y;
}
},
function (i) { return ["Welcome to the Tick-Tock! Don't mention the name to the Captain.", "Rope, tar, biscuit, lanterns. Cash, not promises.", "Mind the canvas, it's the Captain's new topsail.", "A pistol? Mended in the dark, I can.", "Pies! Hot pies! Don't ask.", "Hold still, you're standing on the Never Wood.", "Shh. The ledgers. One blot and he'll have me keelhauled.", "Move that stern line! Not you. Them.", "Heave! This one's full of rum. Or tea. Hard to say.", "Keep an ear out. Tick-tock means run.", "Admiral of the Fleet, me. Don't ask which fleet.", "Mangoes from the Never Wood! Sweetest on the island.", "Pretty Polly? No. Polly says 'Pan's a pest'.", "Have you seen him? Peter Pan? Really?", "Biscuit, fresh baked. Mind your teeth.", "Seven hooks, one for Sundays.", "...and the crocodile swallowed the clock, see, so you always hear it coming.", "Ngh! Best of three!"][i] || "Arr."; },
function () {
if (typeof NVB === "undefined" || !NVB.ambHid || NVB.room)
return;
var out = {};
Object.keys(NVB.cast || {}).forEach(function (k) { var C = NVB.cast[k]; if (C && C.on && C.g && C.g.visible && C.name)
out[C.name] = 1; });
var boys = /^(Peter Pan|Tootles|Nibs|Slightly|Curly|The (First|Second) Twin)$/;
NV.people.forEach(function (P) {
var n = P.talk && P.talk.name;
if (!n || !boys.test(n) || !P.nvbHid)
return;
var dup = false;
for (var m in out) {
if (m === n || m.indexOf(n) >= 0 || n.indexOf(m) >= 0 || (n === "Peter Pan" && /^Peter/.test(m)))
dup = true;
}
P.g.visible = !dup;
});
},
function (G) {
if (NVG.grass && NVG.grass.material) {
NVG.grass.material.userData.noReal = 1;
}
var cm = NVG.mats && NVG.mats["c" + 0xC8BCA0 + JSON.stringify({ ds: true })];
if (cm && !cm.userData.nvgToned) {
cm.userData.nvgToned = 1;
cm.color.setHex(0x9E9278);
var t = typeof texOf === "function" && texOf("plaster");
if (t) {
cm.map = t;
cm.needsUpdate = true;
}
cm.userData.noReal = 1;
}
if (typeof swkTree !== "function")
return;
var cx = -1180, cz = -520, gr = function (x, z) { return nvHeight(x, z); }, D = new THREE.Group();
D.name = "nvg-sweep";
G.add(D);
function at(x, z, ry) { return swkAt(D, cx + x, gr(cx + x, cz + z), cz + z, ry || 0); }
[[-10, -6], [-9, -7.2], [-11, -7.6], [-8.6, -5.4]].forEach(function (p, i) { if (swkKeep(i) || i < 2)
swkBarrel(D, cx + p[0], cz + p[1], { y: gr(cx + p[0], cz + p[1]), c: i % 2 ? 0x5A3A22 : 0x6A4A2C }); });
swkCrates(D, cx - 6, cz - 11, { y: gr(cx - 6, cz - 11), ry: 0.4 });
swkCrates(D, cx + 12, cz + 4, { y: gr(cx + 12, cz + 4), ry: -0.8 });
var ch = at(-3, -12, 0.3);
swkBox(ch, 1.0, 0.55, 0.6, swkM(0x5A3A22, "wood"), 0, 0.28, 0);
swkBox(ch, 1.04, 0.08, 0.64, swkM(0x8A6A2A, "metal"), 0, 0.58, 0);
var T = at(4, -6, 0.2), w = swkM(0x7A5A3A, "wood");
swkBox(T, 2.6, 0.08, 0.9, w, 0, 0.78, 0);
[-1.1, 1.1].forEach(function (e) { swkBox(T, 0.1, 0.78, 0.8, w, e, 0.39, 0); });
swkBox(T, 2.6, 0.06, 0.3, w, 0, 0.45, 0.75);
swkBox(T, 2.6, 0.06, 0.3, w, 0, 0.45, -0.75);
swkBox(T, 0.3, 0.12, 0.2, swkM(0x2A4A2A), 0.4, 0.86, 0);
swkCyl(T, 0.05, 0.05, 0.25, swkM(0x2A2A20), -0.5, 0.94, 0.1, 8);
var C = at(-14, 6, 1.2), iron = swkM(0x2A2A2A, "metal");
var bar = swkCyl(C, 0.18, 0.26, 2.4, iron, 0, 0.9, 0.4, 12);
bar.rotation.x = Math.PI / 2;
swkBox(C, 0.9, 0.5, 1.6, swkM(0x5A3A22, "wood"), 0, 0.45, 0);
[-1, 1].forEach(function (s) { var wh = swkCyl(C, 0.32, 0.32, 0.1, swkM(0x4A2E1A, "wood"), s * 0.5, 0.32, -0.4, 12); wh.rotation.z = Math.PI / 2; var wh2 = swkCyl(C, 0.32, 0.32, 0.1, swkM(0x4A2E1A, "wood"), s * 0.5, 0.32, 0.5, 12); wh2.rotation.z = Math.PI / 2; });
for (var b = 0; b < 6; b++)
swkBall(C, 0.13, iron, 1.0 + (b % 3) * 0.27, 0.13 + Math.floor(b / 3) * 0.22, -0.4 + (b % 2) * 0.1, 1);
var O = at(13, -4, -0.6);
swkBox(O, 2.2, 0.1, 0.1, w, 0, 1.6, 0);
swkBox(O, 0.1, 1.6, 0.1, w, -1.0, 0.8, 0);
swkBox(O, 0.1, 1.6, 0.1, w, 1.0, 0.8, 0);
for (var r = 0; r < 5; r++) {
var oar = swkBox(O, 0.07, 3.2, 0.12, swkM(0x9A7A50, "wood"), -0.8 + r * 0.4, 1.5, 0.15);
oar.rotation.x = -0.15;
}
var Gs = at(8, 8, 0);
var gs = swkCyl(Gs, 0.5, 0.5, 0.15, swkM(0x8A847A, "stone"), 0, 0.75, 0, 16);
gs.rotation.x = Math.PI / 2;
swkBox(Gs, 0.1, 0.75, 0.6, w, 0.15, 0.38, 0);
swkBox(Gs, 0.1, 0.75, 0.6, w, -0.15, 0.38, 0);
var P = [[3, -4.6, Math.PI, "pirate"], [5, -7.4, 0, "pirate"], [-12, 8, 0.8, "pirate", { walk: 4 }], [10, 6, -2, "pirate", { walk: 5 }], [-8, -4, 2.2, "pirate"]];
P.forEach(function (p) { p[0] += cx; p[1] += cz; p[4] = Object.assign({ look: { top: [0xE8DCC8, 0x8A2A2A, 0x2A3A5A][Math.abs(p[0] | 0) % 3], bottom: 0x3A3028, hat: "tricorn", hatColor: 0x1A1A1A } }, p[4] || {}); });
swkPeople(D, "nvg_stockade", P, gr);
}
];
});
