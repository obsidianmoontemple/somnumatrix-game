/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(447, function () {
"use strict";
return [
function (key, w, h, paint, rep) {
if (ILF.tex[key])
return ILF.tex[key];
var c = document.createElement("canvas");
c.width = w;
c.height = h;
var g = c.getContext("2d");
try {
paint(g, w, h, ilfRng(key));
}
catch (e) { }
var t = new THREE.CanvasTexture(c);
if (typeof renderer !== "undefined" && renderer && renderer.outputEncoding === THREE.sRGBEncoding)
t.encoding = THREE.sRGBEncoding;
if (rep) {
t.wrapS = t.wrapT = THREE.RepeatWrapping;
}
t.anisotropy = 4;
t.userData = { shared: true };
return ILF.tex[key] = t;
},
function (c, o) {
o = o || {};
var mk = typeof o.map === "string" ? o.map : (o.map ? o.map.uuid : "");
var key = c + "|" + mk + "|" + (o.glow ? 1 : 0) + "|" + (o.ds ? 1 : 0) + "|" + (o.op || 1) + "|" + (o.shine || 0) + "|" + (o.add ? 1 : 0);
if (ILF.mat[key])
return ILF.mat[key];
var map = typeof o.map === "string" ? ((typeof texOf === "function") ? texOf(o.map) : null) : (o.map || null), m;
if (o.glow)
m = new THREE.MeshBasicMaterial({ color: c, map: map, transparent: (o.op || 1) < 1 || !!o.add, opacity: o.op || 1, depthWrite: !(o.op < 1 || o.add),
blending: o.add ? THREE.AdditiveBlending : THREE.NormalBlending, side: o.ds ? THREE.DoubleSide : THREE.FrontSide });
else if (o.shine)
m = new THREE.MeshPhongMaterial({ color: c, map: map, shininess: o.shine, specular: 0x444038, side: o.ds ? THREE.DoubleSide : THREE.FrontSide });
else
m = new THREE.MeshLambertMaterial({ color: c, map: map, side: o.ds ? THREE.DoubleSide : THREE.FrontSide, transparent: (o.op || 1) < 1, opacity: o.op || 1 });
m.userData.ilf = 1;
m.userData.metres = !!(typeof o.map === "string");
return ILF.mat[key] = m;
},
function (I, name, parent) {
var g = new THREE.Group();
g.name = "ilf " + (name || "");
(parent || I.root).add(g);
var M = new THREE.Matrix4(), stack = [], buckets = new Map(), tmpM = new THREE.Matrix4(), q = new THREE.Quaternion(), e = new THREE.Euler(), v = new THREE.Vector3(), s = new THREE.Vector3();
var lv = I.ilfLevel || 0, base = I.ilfBaseY || 0;
var K = { I: I, g: g, lite: ilfLite(), tris: 0 };
function put(geo, mat, x, y, z, sx, sy, sz, ry, rx, rz) {
e.set(rx || 0, ry || 0, rz || 0, "YXZ");
q.setFromEuler(e);
v.set(x || 0, y || 0, z || 0);
s.set(sx, sy, sz);
tmpM.compose(v, q, s).premultiply(M);
if (!mat) {
if (!ILF.badMat) {
ILF.badMat = 1;
if (window.console)
console.warn("[interior-life] no material", new Error().stack.split("\n").slice(2, 5).join(" | "));
}
return;
}
var list = buckets.get(mat);
if (!list) {
list = [];
buckets.set(mat, list);
}
list.push([geo, tmpM.clone(), sx, sy, sz]);
}
K.geo = function (geo, mat, x, y, z, sx, sy, sz, ry, rx, rz) { put(geo, mat, x, y, z, sx || 1, sy || 1, sz || 1, ry, rx, rz); };
K.box = function (w, h, d, mat, x, y, z, ry, rx, rz) { put(ilfBox(), mat, x, (y || 0) + h / 2, z, w, h, d, ry, rx, rz); };
K.boxc = function (w, h, d, mat, x, y, z, ry, rx, rz) { put(ilfBox(), mat, x, y, z, w, h, d, ry, rx, rz); };
K.cyl = function (r, h, mat, x, y, z, seg, rx, rz) { put(ilfCyl(seg), mat, x, (y || 0) + h / 2, z, r * 2, h, r * 2, 0, rx, rz); };
K.cylc = function (r, h, mat, x, y, z, seg, ry, rx, rz) { put(ilfCyl(seg), mat, x, y, z, r * 2, h, r * 2, ry, rx, rz); };
K.cone = function (r, h, mat, x, y, z, seg) { put(ilfCone(seg), mat, x, (y || 0) + h / 2, z, r * 2, h, r * 2); };
K.taper = function (r0, r1, h, mat, x, y, z, seg) { put(ilfTaper(r0 / r1, seg), mat, x, (y || 0) + h / 2, z, r1 * 2, h, r1 * 2); };
K.sph = function (r, mat, x, y, z, sx, sy, sz, seg) { put(ilfSph(seg), mat, x, y, z, r * 2 * (sx || 1), r * 2 * (sy || 1), r * 2 * (sz || 1)); };
K.turned = function (r, h, mat, x, y, z) { put(ilfTurned(), mat, x, (y || 0) + h / 2, z, r * 2, h, r * 2); };
K.plane = function (w, h, mat, x, y, z, ry, rx) { put(ilfPlane(), mat, x, y, z, w, h, 1, ry, rx); };
K.shape = function (geo, w, h, mat, x, y, z, ry) { put(geo, mat, x, y, z, w, h, 1, ry); };
K.ring = function (r, t, mat, x, y, z, ry, rx, arc) { put(ilfTor(arc, 24), mat, x, y, z, r * 2, r * 2, t / 0.08 * r * 2, ry, rx); };
K.at = function (x, y, z, ry, fn, sc) {
stack.push(M.clone());
e.set(0, ry || 0, 0);
q.setFromEuler(e);
v.set(x || 0, y || 0, z || 0);
var S = sc || 1;
s.set(S, S, S);
M.multiply(tmpM.compose(v, q, s));
try {
fn();
}
finally {
M.copy(stack.pop());
}
};
K.solid = function (x, z, hw, hd, h) {
v.set(x, 0, z).applyMatrix4(M);
var ang = Math.atan2(M.elements[8], M.elements[10]);
var c = Math.abs(Math.cos(ang)), sn = Math.abs(Math.sin(ang)), W = hw * c + hd * sn, D = hw * sn + hd * c;
I.walls.push({ x: I.root.position.x + v.x, z: I.root.position.z + v.z, rot: 0, hw: W, hd: D, h: h || 1.2, level: lv, ilf: 1 });
};
K.lamp = function (x, z) { v.set(x, 0, z).applyMatrix4(M); if (I.lightSpots)
I.lightSpots.push({ x: v.x, z: v.z, y: base, ilf: 1 }); };
K.mesh = function (geo, mat, x, y, z, ry) { var m = new THREE.Mesh(geo, mat); v.set(x, y, z).applyMatrix4(M); m.position.copy(v); m.rotation.y = (ry || 0) + Math.atan2(M.elements[8], M.elements[10]); g.add(m); return m; };
K.done = function () {
buckets.forEach(function (list, mat) {
var n = 0;
list.forEach(function (p) { n += p[0].attributes.position.count; });
var pos = new Float32Array(n * 3), nor = new Float32Array(n * 3), uv = new Float32Array(n * 2), o = 0, nm = new THREE.Matrix3(), a = new THREE.Vector3(), metres = mat.userData && mat.userData.metres;
list.forEach(function (p) {
var G = p[0], P = G.attributes.position, N = G.attributes.normal, U = G.attributes.uv, m4 = p[1];
nm.getNormalMatrix(m4);
for (var i = 0; i < P.count; i++) {
a.fromBufferAttribute(P, i).applyMatrix4(m4);
pos[(o + i) * 3] = a.x;
pos[(o + i) * 3 + 1] = a.y;
pos[(o + i) * 3 + 2] = a.z;
a.fromBufferAttribute(N, i).applyMatrix3(nm).normalize();
nor[(o + i) * 3] = a.x;
nor[(o + i) * 3 + 1] = a.y;
nor[(o + i) * 3 + 2] = a.z;
if (U) {
var u = U.getX(i), w = U.getY(i);
if (metres && G === ILF.geo.box) {
var f = Math.floor(i / 6), sx = p[2], sy = p[3], sz = p[4], d = [[sz, sy], [sz, sy], [sx, sz], [sx, sz], [sx, sy], [sx, sy]][f] || [1, 1];
u *= d[0];
w *= d[1];
}
else if (metres) {
u *= p[2];
w *= p[3];
}
uv[(o + i) * 2] = u;
uv[(o + i) * 2 + 1] = w;
}
}
o += P.count;
});
var geo = new THREE.BufferGeometry();
geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
geo.setAttribute("normal", new THREE.BufferAttribute(nor, 3));
geo.setAttribute("uv", new THREE.BufferAttribute(uv, 2));
geo.computeBoundingSphere();
var mesh = new THREE.Mesh(geo, mat);
mesh.matrixAutoUpdate = false;
mesh.updateMatrix();
mesh.userData.ilf = 1;
mesh.receiveShadow = true;
if (mat.transparent)
mesh.renderOrder = 2;
g.add(mesh);
K.tris += n / 3;
});
buckets.clear();
ILF.n++;
return g;
};
return K;
},
function () {
if (ILF.M)
return ILF.M;
var M = {};
M.oak = ilfM(0x7A5232, { map: "wood" });
M.oakD = ilfM(0x4A2E1A, { map: "wood" });
M.walnut = ilfM(0x3A2414, { map: "wood" });
M.pine = ilfM(0xB08A5A, { map: "wood" });
M.mahog = ilfM(0x5A2418, { map: "wood" });
M.ebony = ilfM(0x241A16, { map: "wood" });
M.stone = ilfM(0xB8B0A0, { map: "stone" });
M.stoneD = ilfM(0x8A8276, { map: "stone" });
M.marble = ilfM(0xE8E2D6, { map: "marble" });
M.marbleD = ilfM(0x5A5450, { map: "marble" });
M.plaster = ilfM(0xEDE4D0, { map: "plaster" });
M.iron = ilfM(0x2A2A2E, { shine: 30 });
M.brass = ilfM(0xC9A040, { shine: 60 });
M.gold = ilfM(0xD8B048, { shine: 80 });
M.silver = ilfM(0xC8CCD2, { shine: 80 });
M.pewter = ilfM(0x8A8C90, { shine: 40 });
M.wax = ilfM(0xF2EAD2);
M.flame = ilfM(0xFFC060, { glow: 1 });
M.flameCore = ilfM(0xFFF4C8, { glow: 1 });
M.halo = ilfM(0xFFB860, { glow: 1, op: 0.22, add: 1 });
M.paper = ilfM(0xF2EAD6);
M.parch = ilfM(0xE8D8B0);
M.ink = ilfM(0x14141C, { shine: 60 });
M.quill = ilfM(0xF4F0E6);
M.linen = ilfM(0xF4F0E6);
M.velvetR = ilfM(0x7A1A22);
M.velvetB = ilfM(0x1A2A5A);
M.velvetG = ilfM(0x1E4A2A);
M.velvetP = ilfM(0x4A1E5A);
M.leather = ilfM(0x5A3020);
M.leaf = ilfM(0x3A6A2E);
M.leafD = ilfM(0x2A4A22);
M.soil = ilfM(0x3A2A1E);
M.terra = ilfM(0xA85A3A);
M.ceramic = ilfM(0xE8E4DA, { shine: 50 });
M.glassG = ilfM(0x7AB8A0, { op: 0.55, shine: 90 });
M.glassB = ilfM(0x6A8AC8, { op: 0.55, shine: 90 });
M.glassR = ilfM(0xC85A6A, { op: 0.55, shine: 90 });
M.glassA = ilfM(0xD8A040, { op: 0.55, shine: 90 });
M.black = ilfM(0x18181C);
M.chalk = ilfM(0x2A3A30);
M.white = ilfM(0xF4F2EC);
M.red = ilfM(0xA82A2A);
M.blue = ilfM(0x2A4A9A);
M.green = ilfM(0x2A7A4A);
M.yellow = ilfM(0xE8C040);
M.orange = ilfM(0xE07A2A);
M.purple = ilfM(0x6A3A9A);
M.food = [ilfM(0xC8803A), ilfM(0xB83A2A), ilfM(0x7AA83A), ilfM(0xE8C870), ilfM(0x8A4A2A), ilfM(0xD8D0B8)];
return ILF.M = M;
},
function (mesh, o) {
o = o || {};
var src = mesh.material;
if (!src || Array.isArray(src) || src.userData.ilfAshlar)
return;
var mat = src.clone();
mat.userData = Object.assign({}, src.userData, { ilfAshlar: 1 });
var bh = (o.h || 0.34).toFixed(3), bl = (o.l || 0.68).toFixed(3);
mat.onBeforeCompile = function (sh) {
sh.vertexShader = sh.vertexShader.replace("#include <common>", "#include <common>\nvarying vec3 vAsW; varying vec3 vAsN;")
.replace("#include <project_vertex>", "#include <project_vertex>\n vAsW=(modelMatrix*vec4(transformed,1.0)).xyz; vAsN=normalize(mat3(modelMatrix)*objectNormal);");
sh.fragmentShader = sh.fragmentShader.replace("#include <common>", "#include <common>\nvarying vec3 vAsW; varying vec3 vAsN;\n" +
"float asH(vec2 p){ return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453); }\n" +
"float asN(vec2 p){ vec2 i=floor(p), f=fract(p); f=f*f*(3.0-2.0*f); return mix(mix(asH(i),asH(i+vec2(1,0)),f.x),mix(asH(i+vec2(0,1)),asH(i+vec2(1,1)),f.x),f.y); }")
.replace("#include <color_fragment>", "#include <color_fragment>\n { vec3 n=normalize(vAsN); if(abs(n.y)<0.35){ float u=abs(n.x)>abs(n.z)?vAsW.z:vAsW.x; float row=floor(vAsW.y/" + bh + ");\n" +
"  vec2 q=vec2(u/" + bl + "+row*0.5+asH(vec2(row,3.0))*0.3,vAsW.y/" + bh + "); vec2 f=fract(q); vec2 id=floor(q);\n" +
"  float edge=min(min(f.x,1.0-f.x)*" + bl + ",min(f.y,1.0-f.y)*" + bh + "); float mortar=smoothstep(0.004,0.016,edge);\n" +
"  float tint=0.84+0.2*asH(id)+0.08*(asN(vec2(u,vAsW.y)*6.0)-0.5)+0.05*(asN(vec2(u,vAsW.y)*40.0)-0.5);\n" +
"  diffuseColor.rgb*=mix(0.62,tint,mortar)*mix(vec3(1.0),vec3(1.04,1.0,0.94),asH(id+7.0)); } }");
};
mat.customProgramCacheKey = function () { return "ilfAshlar" + bh + bl; };
mat.needsUpdate = true;
mesh.material = mat;
},
function (v) {
return ilfCanvasTex("spines" + (v || 0), 512, 128, function (g, w, h, R) {
g.fillStyle = "#1A120C";
g.fillRect(0, 0, w, h);
var cols = ["#6A1A1E", "#1E3A6A", "#2A5A32", "#5A3A1A", "#3A1E4A", "#8A6A2A", "#2A2A2A", "#7A2E1A", "#1A4A4A", "#4A3A2A", "#8A1A2A", "#C8B890", "#2E4A7A", "#5A1A3A"];
var x = 0;
while (x < w) {
if (R() < 0.05) {
x += 10 + R() * 24;
continue;
}
var bw = 10 + R() * 18, bh = h * (0.62 + R() * 0.34), c = cols[(R() * cols.length) | 0], lean = R() < 0.06 ? (R() - 0.5) * 0.25 : 0;
g.save();
g.translate(x + bw / 2, h);
g.rotate(lean);
var gr = g.createLinearGradient(-bw / 2, 0, bw / 2, 0);
gr.addColorStop(0, ilfShade(c, -0.45));
gr.addColorStop(0.35, ilfShade(c, 0.12));
gr.addColorStop(1, ilfShade(c, -0.5));
g.fillStyle = gr;
g.fillRect(-bw / 2, -bh, bw, bh);
g.fillStyle = "rgba(214,180,90,0.85)";
var nb = R() < 0.7 ? 2 : 1;
for (var i = 0; i < nb; i++) {
var by = -bh * (0.12 + i * 0.7);
g.fillRect(-bw / 2 + 1, by, bw - 2, 2);
g.fillRect(-bw / 2 + 1, by + 4, bw - 2, 1);
}
if (bw > 14 && R() < 0.6) {
g.fillStyle = "rgba(230,200,120,0.75)";
g.fillRect(-bw / 4, -bh * 0.62, bw / 2, bh * 0.22);
}
g.restore();
x += bw + 0.6;
}
var sh = g.createLinearGradient(0, 0, 0, h * 0.35);
sh.addColorStop(0, "rgba(0,0,0,0.75)");
sh.addColorStop(1, "rgba(0,0,0,0)");
g.fillStyle = sh;
g.fillRect(0, 0, w, h * 0.35);
});
},
function (v) {
var P = [["#7A1A1E", "#1E2A4A", "#D8B870", "#E8DCC0"], ["#1E2E5A", "#7A1E22", "#D8B870", "#E8DCC0"], ["#2A4A32", "#5A1A1A", "#C8A060", "#E0D4B8"], ["#4A1E4A", "#1A2A3A", "#D8B060", "#E8DCC0"], ["#8A5A2A", "#2A1E1A", "#E8C880", "#F0E4C8"]][v % 5];
return ilfCanvasTex("rug" + v, 512, 512, function (g, w, h, R) {
g.fillStyle = P[0];
g.fillRect(0, 0, w, h);
g.fillStyle = P[1];
g.fillRect(0, 0, w, 40);
g.fillRect(0, h - 40, w, 40);
g.fillRect(0, 0, 40, h);
g.fillRect(w - 40, 0, 40, h);
g.strokeStyle = P[2];
g.lineWidth = 4;
g.strokeRect(44, 44, w - 88, h - 88);
g.strokeRect(16, 16, w - 32, h - 32);
g.fillStyle = P[2];
for (var i = 0; i < w; i += 26) {
[[i, 20], [i, h - 20], [20, i], [w - 20, i]].forEach(function (p) { g.beginPath(); g.moveTo(p[0], p[1] - 7); g.lineTo(p[0] + 7, p[1]); g.lineTo(p[0], p[1] + 7); g.lineTo(p[0] - 7, p[1]); g.fill(); });
}
g.globalAlpha = 0.55;
for (var y = 70; y < h - 60; y += 36)
for (var x = 70; x < w - 60; x += 36) {
g.fillStyle = ((x + y) / 36) % 2 ? P[3] : P[2];
g.beginPath();
g.arc(x, y, 4, 0, 7);
g.fill();
g.strokeStyle = P[1];
g.lineWidth = 2;
g.beginPath();
g.moveTo(x - 9, y);
g.lineTo(x, y - 9);
g.lineTo(x + 9, y);
g.lineTo(x, y + 9);
g.closePath();
g.stroke();
}
g.globalAlpha = 1;
g.fillStyle = P[1];
g.beginPath();
g.ellipse(w / 2, h / 2, 120, 90, 0, 0, 7);
g.fill();
g.strokeStyle = P[2];
g.lineWidth = 5;
g.stroke();
g.fillStyle = P[3];
g.beginPath();
g.ellipse(w / 2, h / 2, 64, 46, 0, 0, 7);
g.fill();
g.fillStyle = P[0];
g.beginPath();
g.ellipse(w / 2, h / 2, 30, 22, 0, 0, 7);
g.fill();
for (var k = 0; k < 8; k++) {
var a = k / 8 * Math.PI * 2;
g.fillStyle = P[2];
g.beginPath();
g.arc(w / 2 + Math.cos(a) * 92, h / 2 + Math.sin(a) * 68, 9, 0, 7);
g.fill();
}
for (var n = 0; n < 1800; n++) {
g.fillStyle = "rgba(0,0,0," + (R() * 0.12) + ")";
g.fillRect(R() * w, R() * h, 2, 2);
}
});
},
function (v, col) {
var bg = col || ["#5A1A22", "#1E2A4A", "#2A4A30", "#4A2A50", "#6A4A1A"][v % 5];
return ilfCanvasTex("tap" + v + bg, 256, 384, function (g, w, h, R) {
g.fillStyle = bg;
g.fillRect(0, 0, w, h);
g.strokeStyle = "#D8B060";
g.lineWidth = 6;
g.strokeRect(10, 10, w - 20, h - 30);
g.fillStyle = "#D8B060";
for (var i = 18; i < w - 10; i += 16) {
g.fillRect(i, h - 22, 6, 22);
}
var cx = w / 2, cy = h * 0.45, kind = v % 5;
g.fillStyle = "#E8D8A8";
g.strokeStyle = "#E8D8A8";
g.lineWidth = 5;
if (kind === 0) {
g.fillRect(cx - 8, cy, 16, 110);
for (var b = 0; b < 26; b++) {
var a = -Math.PI * 0.95 + R() * Math.PI * 0.9, r = 30 + R() * 70;
g.beginPath();
g.arc(cx + Math.cos(a) * r, cy - 10 + Math.sin(a) * r * 0.9, 9 + R() * 10, 0, 7);
g.fill();
}
}
else if (kind === 1) {
g.beginPath();
for (var k = 0; k < 16; k++) {
var rr = k % 2 ? 26 : 72, aa = k / 16 * Math.PI * 2;
g.lineTo(cx + Math.cos(aa) * rr, cy + Math.sin(aa) * rr);
}
g.closePath();
g.fill();
g.beginPath();
g.arc(cx, cy + 120, 30, 0, 7);
g.fill();
g.fillStyle = bg;
g.beginPath();
g.arc(cx + 12, cy + 112, 28, 0, 7);
g.fill();
}
else if (kind === 2) {
g.beginPath();
g.moveTo(cx - 60, cy - 70);
g.lineTo(cx + 60, cy - 70);
g.lineTo(cx + 60, cy + 10);
g.quadraticCurveTo(cx + 56, cy + 70, cx, cy + 96);
g.quadraticCurveTo(cx - 56, cy + 70, cx - 60, cy + 10);
g.closePath();
g.fill();
g.fillStyle = bg;
g.beginPath();
g.moveTo(cx - 54, cy + 10);
g.lineTo(cx, cy - 30);
g.lineTo(cx + 54, cy + 10);
g.lineTo(cx + 54, cy + 30);
g.lineTo(cx, cy - 10);
g.lineTo(cx - 54, cy + 30);
g.fill();
[[cx - 30, cy - 50], [cx + 30, cy - 50], [cx, cy + 44]].forEach(function (p) { g.beginPath(); g.arc(p[0], p[1], 9, 0, 7); g.fill(); });
}
else if (kind === 3) {
g.beginPath();
g.ellipse(cx, cy + 20, 48, 26, 0, 0, 7);
g.fill();
g.beginPath();
g.arc(cx + 50, cy - 12, 16, 0, 7);
g.fill();
g.beginPath();
g.moveTo(cx - 10, cy + 5);
g.lineTo(cx - 70, cy - 70);
g.lineTo(cx - 20, cy - 40);
g.lineTo(cx + 10, cy - 80);
g.lineTo(cx + 20, cy + 5);
g.fill();
g.beginPath();
g.moveTo(cx - 44, cy + 30);
g.quadraticCurveTo(cx - 100, cy + 60, cx - 80, cy + 100);
g.stroke();
[-30, -5, 20, 40].forEach(function (dx) { g.fillRect(cx + dx, cy + 38, 7, 32); });
}
else {
g.beginPath();
g.moveTo(cx, cy + 20);
g.quadraticCurveTo(cx - 50, cy - 10, cx - 90, cy + 10);
g.lineTo(cx - 90, cy + 70);
g.quadraticCurveTo(cx - 50, cy + 50, cx, cy + 80);
g.quadraticCurveTo(cx + 50, cy + 50, cx + 90, cy + 70);
g.lineTo(cx + 90, cy + 10);
g.quadraticCurveTo(cx + 50, cy - 10, cx, cy + 20);
g.fill();
g.lineWidth = 3;
g.beginPath();
g.moveTo(cx + 30, cy - 80);
g.quadraticCurveTo(cx + 60, cy - 40, cx + 10, cy + 10);
g.stroke();
}
for (var y = 0; y < h; y += 3) {
g.fillStyle = "rgba(0,0,0," + (0.06 + R() * 0.05) + ")";
g.fillRect(0, y, w, 1);
}
});
},
function (v) {
return ilfCanvasTex("paint" + v, 256, 320, function (g, w, h, R) {
var k = v % 4;
if (k === 0 || k === 3) {
var sky = g.createLinearGradient(0, 0, 0, h * 0.6);
sky.addColorStop(0, ["#2A3A6A", "#3A5A8A"][k % 2]);
sky.addColorStop(1, ["#E8A060", "#C8D8E8"][k % 2]);
g.fillStyle = sky;
g.fillRect(0, 0, w, h);
if (k === 0) {
g.fillStyle = "#4A5A3A";
g.beginPath();
g.moveTo(0, h * 0.6);
for (var x = 0; x <= w; x += 16)
g.lineTo(x, h * 0.55 - Math.sin(x * 0.03 + v) * 26 - R() * 8);
g.lineTo(w, h);
g.lineTo(0, h);
g.fill();
g.fillStyle = "#2A3A22";
g.beginPath();
g.moveTo(0, h * 0.75);
for (var x2 = 0; x2 <= w; x2 += 12)
g.lineTo(x2, h * 0.7 - Math.sin(x2 * 0.05) * 14);
g.lineTo(w, h);
g.lineTo(0, h);
g.fill();
for (var t = 0; t < 6; t++) {
var tx = 20 + R() * (w - 40), ty = h * 0.68;
g.fillStyle = "#1A2A16";
g.beginPath();
g.ellipse(tx, ty - 24, 14, 26, 0, 0, 7);
g.fill();
}
g.fillStyle = "#E8D0A0";
g.beginPath();
g.arc(w * 0.72, h * 0.32, 14, 0, 7);
g.fill();
g.fillStyle = "#8A6A4A";
g.fillRect(w * 0.3, h * 0.5, 18, 14);
g.beginPath();
g.moveTo(w * 0.3 - 3, h * 0.5);
g.lineTo(w * 0.3 + 9, h * 0.44);
g.lineTo(w * 0.3 + 21, h * 0.5);
g.fill();
}
else {
g.fillStyle = "#1E3A5A";
g.fillRect(0, h * 0.6, w, h);
for (var wv = 0; wv < 40; wv++) {
g.fillStyle = "rgba(255,255,255,0.25)";
g.fillRect(R() * w, h * 0.6 + R() * h * 0.4, 10, 2);
}
g.fillStyle = "#3A2A1A";
g.beginPath();
g.moveTo(w * 0.25, h * 0.62);
g.lineTo(w * 0.75, h * 0.62);
g.lineTo(w * 0.68, h * 0.7);
g.lineTo(w * 0.32, h * 0.7);
g.fill();
g.fillStyle = "#F0E8D8";
[[0.4, 0.25, 0.2], [0.55, 0.2, 0.24], [0.66, 0.3, 0.14]].forEach(function (s) { g.beginPath(); g.moveTo(w * s[0], h * 0.6); g.lineTo(w * s[0], h * s[1]); g.lineTo(w * (s[0] + s[2] * 0.5), h * 0.58); g.fill(); });
g.fillStyle = "#2A1A10";
g.fillRect(w * 0.4 - 1, h * 0.22, 3, h * 0.4);
g.fillRect(w * 0.55 - 1, h * 0.18, 3, h * 0.44);
}
}
else if (k === 1) {
var bg = g.createRadialGradient(w / 2, h * 0.4, 10, w / 2, h * 0.4, h * 0.7);
bg.addColorStop(0, "#5A4A3A");
bg.addColorStop(1, "#1A140E");
g.fillStyle = bg;
g.fillRect(0, 0, w, h);
var robe = ["#3A1E4A", "#1E2A4A", "#5A1A1A", "#1E3A2A"][(v >> 2) % 4];
g.fillStyle = robe;
g.beginPath();
g.moveTo(w * 0.18, h);
g.quadraticCurveTo(w * 0.2, h * 0.55, w * 0.5, h * 0.5);
g.quadraticCurveTo(w * 0.8, h * 0.55, w * 0.82, h);
g.fill();
g.fillStyle = "#D8B060";
g.fillRect(w * 0.47, h * 0.55, w * 0.06, h * 0.45);
var skin = ["#E8C8A8", "#C8966A", "#8A5A3A", "#F0D8C0"][(v >> 3) % 4];
g.fillStyle = skin;
g.beginPath();
g.ellipse(w / 2, h * 0.36, w * 0.13, h * 0.12, 0, 0, 7);
g.fill();
g.fillStyle = ["#3A2A1A", "#D8D0C0", "#1A1410", "#8A6A3A"][(v >> 1) % 4];
g.beginPath();
g.ellipse(w / 2, h * 0.27, w * 0.15, h * 0.07, 0, Math.PI, 0);
g.fill();
if (v % 3 === 0) {
g.fillStyle = "#E8E0D0";
g.beginPath();
g.moveTo(w * 0.42, h * 0.42);
g.quadraticCurveTo(w / 2, h * 0.62, w * 0.58, h * 0.42);
g.fill();
}
g.fillStyle = "rgba(0,0,0,0.45)";
g.beginPath();
g.arc(w * 0.45, h * 0.35, 3, 0, 7);
g.arc(w * 0.55, h * 0.35, 3, 0, 7);
g.fill();
}
else {
g.fillStyle = "#2A2018";
g.fillRect(0, 0, w, h);
g.fillStyle = "#4A3A2A";
g.fillRect(0, h * 0.62, w, h);
g.fillStyle = "#A8B8C0";
g.beginPath();
g.moveTo(w * 0.3, h * 0.62);
g.lineTo(w * 0.34, h * 0.3);
g.lineTo(w * 0.46, h * 0.3);
g.lineTo(w * 0.5, h * 0.62);
g.fill();
[["#B83A2A", 0.6, 0.56], ["#E8C040", 0.7, 0.58], ["#7AA83A", 0.56, 0.6], ["#8A2A4A", 0.66, 0.52]].forEach(function (f) { g.fillStyle = f[0]; g.beginPath(); g.arc(w * f[1], h * f[2], 14, 0, 7); g.fill(); });
g.fillStyle = "#C8A060";
g.beginPath();
g.ellipse(w * 0.22, h * 0.6, 26, 8, 0, 0, 7);
g.fill();
}
for (var n = 0; n < 900; n++) {
g.fillStyle = "rgba(" + (R() < 0.5 ? "0,0,0" : "255,240,200") + "," + (R() * 0.06) + ")";
g.fillRect(R() * w, R() * h, 3, 1);
}
var vg = g.createRadialGradient(w / 2, h / 2, h * 0.3, w / 2, h / 2, h * 0.75);
vg.addColorStop(0, "rgba(0,0,0,0)");
vg.addColorStop(1, "rgba(0,0,0,0.45)");
g.fillStyle = vg;
g.fillRect(0, 0, w, h);
});
},
function (v, day) {
return ilfCanvasTex("stain" + v + (day ? "d" : "n"), 256, 512, function (g, w, h, R) {
var J = ["#B81E2A", "#1E3A9A", "#E8B830", "#2A8A4A", "#7A2A9A", "#E86A2A", "#3A9AC8", "#C8C8E8"];
var dim = day ? 1 : 0.55;
g.fillStyle = "#141010";
g.fillRect(0, 0, w, h);
for (var y = 0; y < h; y += 28)
for (var x = (y / 28 % 2) * 14; x < w; x += 28) {
var c = J[(R() * J.length) | 0];
if (R() < 0.45)
c = ["#9AB0C8", "#B8C8D8", "#A8B8A0"][(R() * 3) | 0];
g.fillStyle = ilfShade(c, (R() * 0.3 - 0.15) * dim - (1 - dim) * 0.5);
g.beginPath();
g.moveTo(x, y - 14);
g.lineTo(x + 13, y);
g.lineTo(x, y + 14);
g.lineTo(x - 13, y);
g.closePath();
g.fill();
}
var cx = w / 2, cy = h * 0.42, k = v % 3;
g.fillStyle = ilfShade("#E8D8A0", -(1 - dim) * 0.5);
g.beginPath();
g.arc(cx, cy, 92, 0, 7);
g.fill();
g.fillStyle = ilfShade(J[v % J.length], -(1 - dim) * 0.5);
g.beginPath();
g.arc(cx, cy, 84, 0, 7);
g.fill();
if (k === 0) {
for (var p = 0; p < 12; p++) {
var a = p / 12 * Math.PI * 2;
g.fillStyle = ilfShade(J[(p + v) % J.length], -(1 - dim) * 0.45);
g.beginPath();
g.moveTo(cx, cy);
g.arc(cx, cy, 80, a, a + Math.PI / 6);
g.closePath();
g.fill();
}
g.fillStyle = ilfShade("#F0D060", -(1 - dim) * 0.5);
g.beginPath();
g.arc(cx, cy, 22, 0, 7);
g.fill();
}
else if (k === 1) {
g.fillStyle = ilfShade("#F0D060", -(1 - dim) * 0.5);
g.beginPath();
g.arc(cx, cy - 40, 24, 0, 7);
g.fill();
g.fillStyle = ilfShade("#E8C8A0", -(1 - dim) * 0.5);
g.beginPath();
g.arc(cx, cy - 40, 14, 0, 7);
g.fill();
g.fillStyle = ilfShade("#1E3A9A", -(1 - dim) * 0.5);
g.beginPath();
g.moveTo(cx - 34, cy + 76);
g.lineTo(cx - 18, cy - 24);
g.lineTo(cx + 18, cy - 24);
g.lineTo(cx + 34, cy + 76);
g.fill();
g.fillStyle = ilfShade("#B81E2A", -(1 - dim) * 0.5);
g.fillRect(cx - 6, cy - 20, 12, 90);
}
else {
g.fillStyle = ilfShade("#F4F4FA", -(1 - dim) * 0.5);
g.beginPath();
g.ellipse(cx, cy - 10, 30, 14, 0, 0, 7);
g.fill();
g.beginPath();
g.moveTo(cx - 6, cy - 14);
g.lineTo(cx - 50, cy - 60);
g.lineTo(cx + 8, cy - 20);
g.fill();
g.beginPath();
g.moveTo(cx + 6, cy - 14);
g.lineTo(cx + 52, cy - 56);
g.lineTo(cx + 12, cy - 8);
g.fill();
g.fillStyle = ilfShade("#2A6AC8", -(1 - dim) * 0.5);
g.fillRect(cx - 70, cy + 40, 140, 30);
}
g.strokeStyle = "#141010";
g.lineWidth = 3;
for (var y2 = 0; y2 < h; y2 += 28)
for (var x2 = (y2 / 28 % 2) * 14; x2 < w; x2 += 28) {
g.beginPath();
g.moveTo(x2, y2 - 14);
g.lineTo(x2 + 13, y2);
g.lineTo(x2, y2 + 14);
g.lineTo(x2 - 13, y2);
g.closePath();
g.stroke();
}
g.lineWidth = 6;
g.beginPath();
g.arc(cx, cy, 92, 0, 7);
g.stroke();
g.beginPath();
g.arc(cx, cy, 84, 0, 7);
g.stroke();
g.lineWidth = 8;
g.strokeRect(4, 4, w - 8, h - 8);
g.beginPath();
g.moveTo(0, h * 0.72);
g.lineTo(w, h * 0.72);
g.stroke();
});
},
function (day) {
return ilfCanvasTex("leaded" + (day ? "d" : "n"), 128, 256, function (g, w, h, R) {
var sky = g.createLinearGradient(0, 0, 0, h);
if (day) {
sky.addColorStop(0, "#C8DCF0");
sky.addColorStop(1, "#E8F0F4");
}
else {
sky.addColorStop(0, "#1A2448");
sky.addColorStop(1, "#3A4870");
}
g.fillStyle = sky;
g.fillRect(0, 0, w, h);
for (var n = 0; n < 120; n++) {
g.fillStyle = "rgba(255,255,255," + (R() * 0.12) + ")";
g.fillRect(R() * w, R() * h, 6, 6);
}
g.strokeStyle = day ? "#4A4A50" : "#141420";
g.lineWidth = 2;
for (var i = -h; i < w + h; i += 16) {
g.beginPath();
g.moveTo(i, 0);
g.lineTo(i + h, h);
g.stroke();
g.beginPath();
g.moveTo(i, h);
g.lineTo(i + h, 0);
g.stroke();
}
g.lineWidth = 6;
g.strokeRect(3, 3, w - 6, h - 6);
g.beginPath();
g.moveTo(w / 2, 0);
g.lineTo(w / 2, h);
g.stroke();
});
},
function () {
return ilfCanvasTex("beam", 64, 256, function (g, w, h) {
var a = g.createLinearGradient(0, 0, 0, h);
a.addColorStop(0, "rgba(255,240,200,0.55)");
a.addColorStop(1, "rgba(255,240,200,0)");
g.fillStyle = a;
g.fillRect(0, 0, w, h);
var e = g.createLinearGradient(0, 0, w, 0);
e.addColorStop(0, "rgba(0,0,0,1)");
e.addColorStop(0.25, "rgba(0,0,0,0)");
e.addColorStop(0.75, "rgba(0,0,0,0)");
e.addColorStop(1, "rgba(0,0,0,1)");
g.globalCompositeOperation = "destination-out";
g.fillStyle = e;
g.fillRect(0, 0, w, h);
});
},
function (lines, seed) {
return ilfCanvasTex("chalk" + seed + lines.join("|"), 512, 256, function (g, w, h, R) {
g.fillStyle = "#24382C";
g.fillRect(0, 0, w, h);
for (var n = 0; n < 400; n++) {
g.fillStyle = "rgba(255,255,255," + (R() * 0.05) + ")";
g.fillRect(R() * w, R() * h, R() * 30, R() * 3);
}
g.fillStyle = "#EEF0E8";
g.textAlign = "left";
g.textBaseline = "top";
lines.forEach(function (l, i) { g.font = (i === 0 ? "bold 34px" : "24px") + " 'Comic Sans MS','Segoe Print',cursive"; g.fillText(l, 26, 18 + i * (i === 0 ? 0 : 36) + (i ? 24 : 0)); });
g.strokeStyle = "rgba(238,240,232,0.8)";
g.lineWidth = 2;
g.beginPath();
g.moveTo(26, 58);
g.lineTo(26 + g.measureText(lines[0] || "").width * 1.2, 58);
g.stroke();
if (seed % 2 === 0) {
g.beginPath();
g.arc(w - 90, h - 80, 42, 0, 7);
g.stroke();
g.beginPath();
g.moveTo(w - 132, h - 80);
g.lineTo(w - 48, h - 80);
g.moveTo(w - 90, h - 122);
g.lineTo(w - 90, h - 38);
g.stroke();
}
});
},
function (k) {
var P = {
abc: function (g, w, h) {
g.fillStyle = "#FFF6D8";
g.fillRect(0, 0, w, h);
var L = "ABCDEFGHIJKLMNOPQRSTUVWXYZ", C = ["#E0402A", "#2A7AD8", "#2AA84A", "#E8A020", "#9A3AC8"];
for (var i = 0; i < 26; i++) {
g.fillStyle = C[i % 5];
g.font = "bold 40px Arial";
g.textAlign = "center";
g.textBaseline = "middle";
g.fillText(L[i] + L[i].toLowerCase(), (i % 13 + 0.5) * w / 13, i < 13 ? h * 0.28 : h * 0.72);
}
},
nums: function (g, w, h) {
g.fillStyle = "#E8F4FF";
g.fillRect(0, 0, w, h);
for (var i = 1; i <= 10; i++) {
g.fillStyle = ["#E0402A", "#2A7AD8", "#2AA84A", "#E8A020", "#9A3AC8"][i % 5];
g.font = "bold 54px Arial";
g.textAlign = "center";
g.textBaseline = "middle";
g.fillText(String(i), (i - 0.5) * w / 10, h * 0.4);
for (var d = 0; d < i; d++) {
g.beginPath();
g.arc((i - 0.5) * w / 10 - 14 + (d % 2) * 28, h * 0.62 + Math.floor(d / 2) * 12, 5, 0, 7);
g.fill();
}
}
},
world: function (g, w, h) {
g.fillStyle = "#3A7AC8";
g.fillRect(0, 0, w, h);
g.fillStyle = "#7AB85A";
[[0.2, 0.35, 0.12, 0.18], [0.28, 0.65, 0.07, 0.16], [0.5, 0.3, 0.08, 0.1], [0.53, 0.58, 0.09, 0.17], [0.72, 0.35, 0.16, 0.14], [0.82, 0.72, 0.06, 0.07]].forEach(function (c) { g.beginPath(); g.ellipse(w * c[0], h * c[1], w * c[2], h * c[3], 0.3, 0, 7); g.fill(); });
g.strokeStyle = "rgba(255,255,255,0.3)";
for (var i = 1; i < 6; i++) {
g.beginPath();
g.moveTo(0, h * i / 6);
g.lineTo(w, h * i / 6);
g.stroke();
g.beginPath();
g.moveTo(w * i / 6, 0);
g.lineTo(w * i / 6, h);
g.stroke();
}
g.fillStyle = "#FFF";
g.font = "bold 26px Arial";
g.textAlign = "center";
g.fillText("OUR WORLD", w / 2, 30);
},
planets: function (g, w, h) {
g.fillStyle = "#0A0E24";
g.fillRect(0, 0, w, h);
for (var s = 0; s < 80; s++) {
g.fillStyle = "#FFF";
g.fillRect(Math.random() * w, Math.random() * h, 1.5, 1.5);
}
[["#F8C830", 40], ["#A89A8A", 8], ["#E8C88A", 12], ["#3A7AD8", 13], ["#D85A3A", 10], ["#D8B88A", 28], ["#E8D8A8", 24], ["#9AD8E8", 18], ["#3A5AD8", 17]].forEach(function (p, i) { g.fillStyle = p[0]; g.beginPath(); g.arc(30 + i * (w - 50) / 8.5, h * 0.55, p[1] * 0.9, 0, 7); g.fill(); });
g.fillStyle = "#FFF";
g.font = "bold 24px Arial";
g.textAlign = "center";
g.fillText("THE SOLAR SYSTEM", w / 2, 28);
},
read: function (g, w, h) {
g.fillStyle = "#FFE8F0";
g.fillRect(0, 0, w, h);
g.fillStyle = "#C83A6A";
g.font = "bold 46px Georgia";
g.textAlign = "center";
g.textBaseline = "middle";
g.fillText("READ", w / 2, h * 0.28);
g.font = "bold 30px Georgia";
g.fillText("every day!", w / 2, h * 0.48);
g.fillStyle = "#2A7AD8";
g.fillRect(w * 0.3, h * 0.62, w * 0.4, h * 0.24);
g.fillStyle = "#FFF";
g.fillRect(w * 0.32, h * 0.64, w * 0.17, h * 0.2);
g.fillRect(w * 0.51, h * 0.64, w * 0.17, h * 0.2);
},
kind: function (g, w, h) { g.fillStyle = "#E8FFE0"; g.fillRect(0, 0, w, h); g.fillStyle = "#2A8A3A"; g.font = "bold 32px Arial"; g.textAlign = "center"; g.textBaseline = "middle"; g.fillText("BE KIND", w / 2, h * 0.25); g.font = "22px Arial"; g.fillStyle = "#333"; ["Listen", "Share", "Help", "Try your best"].forEach(function (t, i) { g.fillText("★ " + t, w / 2, h * (0.45 + i * 0.13)); }); },
periodic: function (g, w, h) {
g.fillStyle = "#F4F4F0";
g.fillRect(0, 0, w, h);
var C = ["#E87A6A", "#E8C86A", "#8AD87A", "#7AB8E8", "#B89AE8", "#E89AC8"];
for (var r = 0; r < 7; r++)
for (var c = 0; c < 18; c++) {
if (r === 0 && c > 0 && c < 17)
continue;
if (r < 3 && c > 1 && c < 12)
continue;
g.fillStyle = C[(c + r) % 6];
g.fillRect(8 + c * (w - 16) / 18, 30 + r * (h - 40) / 7, (w - 16) / 18 - 2, (h - 40) / 7 - 2);
}
g.fillStyle = "#222";
g.font = "bold 18px Arial";
g.textAlign = "center";
g.fillText("PERIODIC TABLE", w / 2, 18);
},
math: function (g, w, h) {
g.fillStyle = "#EAF0FF";
g.fillRect(0, 0, w, h);
g.fillStyle = "#1E3A8A";
g.font = "bold 30px Georgia";
g.textAlign = "center";
g.fillText("a² + b² = c²", w / 2, h * 0.25);
g.strokeStyle = "#C83A2A";
g.lineWidth = 4;
g.beginPath();
g.moveTo(w * 0.3, h * 0.85);
g.lineTo(w * 0.7, h * 0.85);
g.lineTo(w * 0.3, h * 0.42);
g.closePath();
g.stroke();
g.font = "22px Georgia";
g.fillText("π ≈ 3.14159", w / 2, h * 0.95);
},
arts: function (g, w, h) {
g.fillStyle = "#FFF8E8";
g.fillRect(0, 0, w, h);
["#E0402A", "#2A7AD8", "#E8C020", "#2AA84A", "#9A3AC8", "#E87A2A"].forEach(function (c, i) { g.fillStyle = c; g.beginPath(); g.arc(w * 0.5 + Math.cos(i) * w * 0.25, h * 0.55 + Math.sin(i) * h * 0.25, 26, 0, 7); g.fill(); });
g.fillStyle = "#333";
g.font = "bold 26px Arial";
g.textAlign = "center";
g.fillText("COLOUR WHEEL", w / 2, 30);
}
};
return ilfCanvasTex("poster" + k, 256, 192, P[k] || P.read);
},
function (v) {
return ilfCanvasTex("pin" + v, 512, 256, function (g, w, h, R) {
g.fillStyle = "#B8885A";
g.fillRect(0, 0, w, h);
for (var n = 0; n < 2000; n++) {
g.fillStyle = "rgba(60,30,10," + (R() * 0.2) + ")";
g.fillRect(R() * w, R() * h, 2, 2);
}
var C = ["#FFFFFF", "#FFF6A8", "#A8E8FF", "#FFC8D8", "#C8FFB8"];
for (var i = 0; i < 11; i++) {
var x = 20 + R() * (w - 120), y = 14 + R() * (h - 110), pw = 70 + R() * 40, ph = 60 + R() * 40, a = (R() - 0.5) * 0.15;
g.save();
g.translate(x + pw / 2, y + ph / 2);
g.rotate(a);
g.fillStyle = "rgba(0,0,0,0.25)";
g.fillRect(-pw / 2 + 3, -ph / 2 + 3, pw, ph);
g.fillStyle = C[i % 5];
g.fillRect(-pw / 2, -ph / 2, pw, ph);
if (i % 3 === 0) {
g.fillStyle = "#3A7AD8";
g.fillRect(-pw / 2, ph / 4, pw, ph / 4);
g.fillStyle = "#F8C830";
g.beginPath();
g.arc(pw / 4, -ph / 4, 10, 0, 7);
g.fill();
g.fillStyle = "#2AA84A";
g.beginPath();
g.moveTo(-pw / 2 + 8, ph / 4);
g.lineTo(-pw / 4, -ph / 6);
g.lineTo(0, ph / 4);
g.fill();
}
else if (i % 3 === 1) {
g.fillStyle = "#333";
for (var l = 0; l < 5; l++)
g.fillRect(-pw / 2 + 8, -ph / 2 + 10 + l * 10, pw - 16 - R() * 20, 2);
}
else {
g.fillStyle = "#E0402A";
g.beginPath();
g.arc(0, -4, 14, 0, 7);
g.fill();
g.fillStyle = "#333";
g.fillRect(-1, 10, 2, 18);
g.fillRect(-12, 16, 24, 2);
}
g.fillStyle = ["#E0402A", "#2A7AD8", "#2AA84A"][i % 3];
g.beginPath();
g.arc(0, -ph / 2 + 5, 4, 0, 7);
g.fill();
g.restore();
}
g.strokeStyle = "#6A4A2A";
g.lineWidth = 12;
g.strokeRect(0, 0, w, h);
});
},
function (k) {
return ilfCanvasTex("chart" + k, 256, 256, function (g, w, h, R) {
if (k === "stars") {
g.fillStyle = "#141A3A";
g.fillRect(0, 0, w, h);
g.strokeStyle = "#D8C890";
g.lineWidth = 2;
g.beginPath();
g.arc(w / 2, h / 2, w * 0.46, 0, 7);
g.stroke();
g.beginPath();
g.arc(w / 2, h / 2, w * 0.3, 0, 7);
g.stroke();
for (var s = 0; s < 160; s++) {
g.fillStyle = "#F0E8C8";
var r = R() * 1.8 + 0.4;
g.beginPath();
g.arc(R() * w, R() * h, r, 0, 7);
g.fill();
}
g.strokeStyle = "rgba(216,200,144,0.7)";
g.lineWidth = 1;
for (var c = 0; c < 6; c++) {
g.beginPath();
var x = R() * w, y = R() * h;
g.moveTo(x, y);
for (var p = 0; p < 4; p++) {
x += (R() - 0.5) * 60;
y += (R() - 0.5) * 60;
g.lineTo(x, y);
g.arc(x, y, 2, 0, 7);
}
g.stroke();
}
for (var z = 0; z < 12; z++) {
var a = z / 12 * Math.PI * 2;
g.beginPath();
g.moveTo(w / 2 + Math.cos(a) * w * 0.3, h / 2 + Math.sin(a) * h * 0.3);
g.lineTo(w / 2 + Math.cos(a) * w * 0.46, h / 2 + Math.sin(a) * h * 0.46);
g.stroke();
}
}
else if (k === "map") {
g.fillStyle = "#E0CC98";
g.fillRect(0, 0, w, h);
g.fillStyle = "#8AB0C8";
g.fillRect(0, 0, w, h * 0.15);
g.fillRect(w * 0.8, 0, w * 0.2, h);
g.fillStyle = "#C8B078";
for (var m = 0; m < 14; m++) {
var mx = R() * w * 0.7 + 10, my = h * 0.2 + R() * h * 0.7;
g.beginPath();
g.moveTo(mx - 10, my);
g.lineTo(mx, my - 14);
g.lineTo(mx + 10, my);
g.fill();
}
g.fillStyle = "#6A8A4A";
for (var t = 0; t < 30; t++) {
g.beginPath();
g.arc(R() * w * 0.75, h * 0.2 + R() * h * 0.75, 4, 0, 7);
g.fill();
}
g.strokeStyle = "#5A3A1A";
g.setLineDash([4, 4]);
g.lineWidth = 2;
g.beginPath();
g.moveTo(20, h - 20);
g.bezierCurveTo(w * 0.3, h * 0.5, w * 0.5, h * 0.9, w * 0.7, h * 0.3);
g.stroke();
g.setLineDash([]);
g.strokeStyle = "#5A3A1A";
g.lineWidth = 2;
g.beginPath();
g.arc(w * 0.7, h * 0.3, 8, 0, 7);
g.stroke();
g.strokeRect(4, 4, w - 8, h - 8);
g.fillStyle = "#5A3A1A";
g.font = "italic 18px Georgia";
g.textAlign = "center";
g.fillText("The Dream Lands", w * 0.4, h * 0.95);
}
else if (k === "anatomy") {
g.fillStyle = "#E8DCC0";
g.fillRect(0, 0, w, h);
g.strokeStyle = "#5A3A2A";
g.lineWidth = 3;
g.beginPath();
g.arc(w / 2, h * 0.18, 20, 0, 7);
g.stroke();
g.beginPath();
g.moveTo(w / 2, h * 0.26);
g.lineTo(w / 2, h * 0.62);
g.moveTo(w * 0.3, h * 0.36);
g.lineTo(w * 0.7, h * 0.36);
g.moveTo(w / 2, h * 0.62);
g.lineTo(w * 0.38, h * 0.92);
g.moveTo(w / 2, h * 0.62);
g.lineTo(w * 0.62, h * 0.92);
g.stroke();
g.fillStyle = "#B83A2A";
g.beginPath();
g.arc(w * 0.47, h * 0.4, 7, 0, 7);
g.fill();
g.font = "12px Georgia";
g.fillStyle = "#5A3A2A";
g.textAlign = "left";
["cor", "pulmo", "os", "vena"].forEach(function (t, i) { g.fillText(t, w * 0.72, h * (0.3 + i * 0.12)); });
}
else {
g.fillStyle = "#D8C8A0";
g.fillRect(0, 0, w, h);
g.strokeStyle = "#4A2A1A";
g.lineWidth = 2;
var RU = "ᚠᚢᚦᚨᚱᚲᚷᚹᚺᚾᛁᛃᛇᛈᛉᛊᛏᛒᛖᛗᛚᛜᛞᛟ";
g.fillStyle = "#4A2A1A";
g.font = "26px serif";
for (var i = 0; i < 24; i++) {
g.fillText(RU[i], 18 + (i % 6) * 38, 40 + Math.floor(i / 6) * 52);
}
g.beginPath();
g.arc(w / 2, h * 0.86, 22, 0, 7);
g.stroke();
g.strokeRect(4, 4, w - 8, h - 8);
}
for (var n = 0; n < 500; n++) {
g.fillStyle = "rgba(80,50,20," + (R() * 0.08) + ")";
g.fillRect(R() * w, R() * h, 3, 3);
}
});
},
function (K, x, y, z, arms) {
var M = ilfMats();
arms = arms || 3;
K.cyl(0.09, 0.03, M.brass, x, y, z, 12);
K.turned(0.04, 0.42, M.brass, x, y + 0.03, z);
for (var i = 0; i < arms; i++) {
var dx = arms === 1 ? 0 : (i / (arms - 1) - 0.5) * 0.36;
if (dx)
K.boxc(Math.abs(dx), 0.02, 0.02, M.brass, x + dx / 2, y + 0.42, z);
K.cyl(0.03, 0.04, M.brass, x + dx, y + 0.42, z, 8);
ilfCandle(K, x + dx, y + 0.46, z, 0.18);
}
},
function (K, x, y, z, n, ry) {
var M = ilfMats(), C = [M.velvetR, M.velvetB, M.velvetG, M.leather, M.velvetP], yy = y;
for (var i = 0; i < (n || 3); i++) {
var w = 0.22 - i * 0.015, d = 0.16 - i * 0.01, t = 0.035 + ((i * 7) % 3) * 0.008;
K.box(w, t, d, C[(((i + ((x * 7) | 0)) % C.length) + C.length) % C.length], x, yy, z, (ry || 0) + (i % 2 ? 0.12 : -0.08));
K.box(w - 0.02, t - 0.008, 0.004, M.paper, x, yy + 0.004, z + d / 2 - 0.004, (ry || 0) + (i % 2 ? 0.12 : -0.08));
yy += t;
}
},
function (K, o) {
o = o || {};
var M = ilfMats(), w = o.w || 1.2, d = o.d || 0.62, h = 0.76, wood = o.wood || M.oak;
K.box(w, 0.05, d, wood, 0, h - 0.05, 0);
K.box(w - 0.12, 0.12, d - 0.1, o.dark || M.oakD, 0, h - 0.17, 0);
[[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (s) { K.turned(0.05, h - 0.05, wood, s[0] * (w / 2 - 0.06), 0, s[1] * (d / 2 - 0.06)); });
K.box(0.3, 0.08, 0.01, wood, 0, h - 0.16, d / 2 - 0.045);
K.sph(0.015, M.brass, 0, h - 0.12, d / 2 - 0.035, 1, 1, 1, 6);
K.solid(0, 0, w / 2, d / 2, h);
if (o.bare)
return;
var r = ilfRng("desk" + (o.seed || 0));
ilfOpenBook(K, -0.1, h, 0.05, (r() - 0.5) * 0.4);
if (!K.lite || r() < 0.4)
ilfInkQuill(K, w / 2 - 0.2, h, -0.12);
if (!K.lite && r() < 0.75)
ilfBookStack(K, -w / 2 + 0.18, h, -0.12, 2 + ((r() * 3) | 0));
if (o.candle !== false && (!K.lite || r() < 0.5))
ilfCandlestick(K, w / 2 - 0.12, h, 0.16, 0.14);
if (!K.lite && r() < 0.4)
K.box(0.2, 0.004, 0.28, M.parch, 0.22, h, 0.12, 0.4);
},
function (K, o) {
o = o || {};
var M = ilfMats(), wood = o.wood || M.oakD, s = 0.44;
[[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (q) { K.box(0.04, 0.45, 0.04, wood, q[0] * (s / 2 - 0.03), 0, q[1] * (s / 2 - 0.03)); });
K.box(s, 0.04, s, wood, 0, 0.45, 0);
if (o.cushion)
K.box(s - 0.04, 0.04, s - 0.04, o.cushion, 0, 0.49, 0);
K.box(0.04, 0.5, 0.04, wood, -s / 2 + 0.03, 0.49, -s / 2 + 0.03);
K.box(0.04, 0.5, 0.04, wood, s / 2 - 0.03, 0.49, -s / 2 + 0.03);
K.box(s, 0.07, 0.03, wood, 0, 0.9, -s / 2 + 0.03);
for (var i = -1; i <= 1; i++)
K.box(0.05, 0.36, 0.02, wood, i * 0.11, 0.52, -s / 2 + 0.03);
},
function (K, o) {
o = o || {};
var M = ilfMats(), w = o.w || 1.6, h = o.h || 2.4, d = o.d || 0.4, wood = o.wood || M.walnut, n = Math.max(3, Math.round((h - 0.3) / 0.38));
K.box(0.05, h, d, wood, -w / 2 + 0.025, 0, 0);
K.box(0.05, h, d, wood, w / 2 - 0.025, 0, 0);
K.box(w, 0.02, d, wood, 0, 0, -d / 2 + 0.01);
K.box(w + 0.06, 0.08, d + 0.04, wood, 0, h, 0);
K.box(w + 0.1, 0.05, d + 0.08, wood, 0, h + 0.08, 0);
K.box(w, 0.12, d, wood, 0, 0, 0);
K.box(w, h, 0.02, o.back || M.ebony, 0, 0, -d / 2 + 0.01);
var sh = (h - 0.2) / n;
for (var i = 0; i < n; i++) {
var y = 0.12 + i * sh;
K.box(w - 0.1, 0.025, d - 0.02, wood, 0, y, 0);
if (o.empty)
continue;
var v = (i + (o.seed || 0)) % 3, sp = ilfTexMat(ilfSpinesTex(v));
K.box(w - 0.12, sh * 0.82, d * 0.55, M.ebony, 0, y + 0.025, -d * 0.12);
K.plane(w - 0.12, sh * 0.82, sp, 0, y + 0.025 + sh * 0.41, -d * 0.12 + d * 0.275 + 0.002, 0);
}
K.solid(0, 0, w / 2, d / 2, h);
},
function (K, y, top, o) {
o = o || {};
var M = ilfMats(), r = o.r || 0.9, n = o.n || (K.lite ? 6 : 10), tiers = o.tiers || 1;
K.cyl(0.015, Math.max(0.05, top - y - 0.3), M.iron, 0, y + 0.3, 0, 6);
for (var t = 0; t < tiers; t++) {
var rr = r * (1 - t * 0.42), yy = y + t * 0.38;
K.ring(rr, 0.03, M.iron, 0, yy, 0, 0, Math.PI / 2);
for (var i = 0; i < n; i++) {
var a = i / n * Math.PI * 2 + t * 0.3, cx = Math.cos(a) * rr, cz = Math.sin(a) * rr;
K.cyl(0.04, 0.03, M.iron, cx, yy, cz, 8);
ilfCandle(K, cx, yy + 0.03, cz, 0.16, 0.022);
if (t === 0)
K.boxc(0.012, 0.32, 0.012, M.iron, cx * 0.5, yy + 0.15, cz * 0.5, 0, Math.atan2(cz, 0.3) * 0.0, 0);
}
}
K.sph(0.07, M.iron, 0, y - 0.04, 0);
K.cone(0.05, 0.14, M.iron, 0, y - 0.22, 0);
K.lamp(0, 0);
},
function (K, w, h, y, v) {
var M = ilfMats(), f = 0.08;
K.plane(w, h, ilfTexMat(ilfPaintingTex(v || 0)), 0, y + h / 2, 0.035, 0);
K.box(w + f * 2, f, 0.06, M.gold, 0, y - f, 0.0);
K.box(w + f * 2, f, 0.06, M.gold, 0, y + h, 0.0);
K.box(f, h, 0.06, M.gold, -w / 2 - f / 2, y, 0.0);
K.box(f, h, 0.06, M.gold, w / 2 + f / 2, y, 0.0);
K.box(w + f * 0.8, 0.015, 0.065, M.brass, 0, y - 0.02, 0.0);
K.box(w + f * 0.8, 0.015, 0.065, M.brass, 0, y + h + 0.005, 0.0);
},
function (K, w, h, y, o) {
o = o || {};
var M = ilfMats(), arch = o.round ? ilfRound() : ilfLancet(), stone = o.stone || M.stone;
var day = o.day !== false, glass = o.stained ? ilfTexMat(ilfStainedTex(o.v || 0, day), { glow: 1 }) : ilfTexMat(ilfLeadedTex(day), { glow: 1 });
K.shape(arch, w, h, glass, 0, y + h / 2, 0.03);
K.box(0.16, h * 0.78, 0.16, stone, -w / 2 - 0.06, y, 0.04);
K.box(0.16, h * 0.78, 0.16, stone, w / 2 + 0.06, y, 0.04);
K.box(w + 0.4, 0.1, 0.32, stone, 0, y - 0.1, 0.1);
K.geo(ilfTor(Math.PI, 16), stone, 0, y + h * 0.62, 0.05, w * 1.08, h * 0.5, 0.6);
if (o.beam && !K.lite) {
var bm = ilfTexMat(ilfBeamTex(), { glow: 1, add: 1, op: o.beamOp || 0.35, ds: true, col: o.beamCol || 0xFFE8C0 });
K.plane(w * 1.1, o.beamLen || 6, bm, 0, y + h * 0.4 - 0.1, (o.beamLen || 6) * 0.42, 0, -1.0);
}
},
function (K, s, o) {
o = o || {};
var M = ilfMats();
s = s || 1;
var pot = o.pot || M.terra, r = ilfRng("plant" + s + (o.seed || 0));
K.taper(0.16 * s, 0.11 * s, 0.32 * s, pot, 0, 0, 0, 12);
K.cyl(0.165 * s, 0.03 * s, pot, 0, 0.3 * s, 0, 12);
K.cyl(0.14 * s, 0.02 * s, M.soil, 0, 0.29 * s, 0, 10);
var n = K.lite ? 5 : 9;
for (var i = 0; i < n; i++) {
var a = i / n * Math.PI * 2 + r(), lift = 0.25 + r() * 0.55, out = 0.08 + r() * 0.18;
K.sph(0.12 * s, i % 2 ? M.leaf : M.leafD, Math.cos(a) * out * s, (0.32 + lift) * s, Math.sin(a) * out * s, 0.9, 0.35 + r() * 0.3, 1.6, 8);
}
K.solid(0, 0, 0.18 * s, 0.18 * s, 0.8 * s);
},
function (K, col) {
var M = ilfMats();
K.geo(ilfHemi(), M.iron, 0, 0.7, 0, 0.9, -0.75, 0.9);
K.ring(0.45, 0.04, M.iron, 0, 0.7, 0, 0, Math.PI / 2);
for (var i = 0; i < 3; i++) {
var a = i / 3 * Math.PI * 2;
K.box(0.06, 0.4, 0.06, M.iron, Math.cos(a) * 0.3, 0, Math.sin(a) * 0.3);
}
K.cylc(0.41, 0.01, ilfM(col || 0x7AE8A0, { glow: 1 }), 0, 0.66, 0, 16);
K.box(0.5, 0.12, 0.5, ilfM(0x3A2A1E), 0, 0, 0);
K.sph(0.12, ilfM(0xFF7A2A, { glow: 1 }), 0, 0.14, 0, 1.4, 0.5, 1.4, 8);
K.solid(0, 0, 0.5, 0.5, 0.9);
},
function (K, w) {
var M = ilfMats(), cols = [M.glassG, M.glassB, M.glassR, M.glassA, ilfM(0x9A6AC8, { op: 0.6, shine: 90 })], r = ilfRng("potion" + w);
K.box(w, 0.04, 0.32, M.oakD, 0, 0.9, 0);
K.box(w, 0.04, 0.32, M.oakD, 0, 1.4, 0);
K.box(w, 0.04, 0.32, M.oakD, 0, 1.9, 0);
K.box(0.04, 2.0, 0.32, M.oakD, -w / 2, 0, 0);
K.box(0.04, 2.0, 0.32, M.oakD, w / 2, 0, 0);
K.box(w, 0.9, 0.3, M.oakD, 0, 0, 0);
[0.94, 1.44, 1.94].forEach(function (y) {
for (var x = -w / 2 + 0.12; x < w / 2 - 0.08; x += 0.13 + r() * 0.06) {
var c = cols[(r() * cols.length) | 0], k = r();
if (k < 0.4) {
K.cyl(0.045, 0.16, c, x, y, 0, 8);
K.cyl(0.015, 0.07, c, x, y + 0.16, 0, 6);
K.cyl(0.018, 0.02, M.oakD, x, y + 0.23, 0, 6);
}
else if (k < 0.7) {
K.sph(0.06, c, x, y + 0.06, 0, 1, 1, 1, 8);
K.cyl(0.015, 0.08, c, x, y + 0.1, 0, 6);
}
else {
K.cyl(0.055, 0.12, ilfM(0xD8CCB0), x, y, 0, 8);
K.cyl(0.058, 0.02, M.oakD, x, y + 0.12, 0, 8);
}
}
});
K.solid(0, 0, w / 2, 0.16, 2);
},
function (K, x, y, z, o) {
o = o || {};
var M = ilfMats(), r = ilfRng("fl" + x + z);
K.taper(0.06, 0.1, 0.26, o.vase || M.ceramic, x, y, z, 10);
var C = [ilfM(0xE8406A), ilfM(0xF4F0E8), ilfM(0xF0C040), ilfM(0xC85AE8), ilfM(0xE8783A)];
for (var i = 0; i < (K.lite ? 4 : 8); i++) {
var a = r() * 6.28, rr = 0.04 + r() * 0.08;
K.boxc(0.008, 0.3, 0.008, M.leaf, x + Math.cos(a) * rr * 0.5, y + 0.36, z + Math.sin(a) * rr * 0.5, 0, Math.sin(a) * 0.3, Math.cos(a) * 0.3);
K.sph(0.035 + r() * 0.02, C[(r() * C.length) | 0], x + Math.cos(a) * rr, y + 0.48 + r() * 0.12, z + Math.sin(a) * rr, 1, 0.7, 1, 6);
}
},
function (K, x, y, z, seed) {
var M = ilfMats(), r = ilfRng("pt" + seed);
K.cyl(0.24, 0.03, M.silver, x, y, z, 14);
if (r() < 0.5) {
K.sph(0.13, ilfM(0xA8642A), x, y + 0.1, z, 1.5, 0.8, 1, 10);
K.cylc(0.015, 0.16, M.paper, x + 0.2, y + 0.12, z, 6, 0, 0, 0.6);
}
else
for (var i = 0; i < 7; i++) {
K.sph(0.05, M.food[(r() * 6) | 0], x + (r() - 0.5) * 0.26, y + 0.06, z + (r() - 0.5) * 0.26, 1, 1, 1, 6);
}
K.sph(0.08, ilfM(0xC89A5A), x + 0.32, y + 0.05, z + 0.1, 1.6, 0.8, 1, 8);
},
function (K, len, o) {
o = o || {};
var M = ilfMats(), wood = o.wood || M.oakD;
K.box(len, 0.05, 0.42, wood, 0, 0.44, 0.02);
K.box(len, 0.62, 0.04, wood, 0, 0.46, -0.2, 0, -0.12);
K.box(len, 0.04, 0.12, wood, 0, 1.08, -0.22);
[-1, 1].forEach(function (s) {
K.box(0.07, 0.9, 0.5, wood, s * (len / 2 + 0.035), 0, 0);
K.cylc(0.25, 0.07, wood, s * (len / 2 + 0.035), 0.9, 0, 12, 0, 0, Math.PI / 2);
K.sph(0.05, wood, s * (len / 2 + 0.035), 1.18, 0, 1, 1, 1, 8);
});
K.box(len, 0.1, 0.18, o.cushion || M.velvetR, 0, 0.08, -0.48);
K.box(len, 0.03, 0.14, wood, 0, 0.82, -0.31);
if (!K.lite && !o.nobooks)
for (var x = -len / 2 + 0.4; x < len / 2 - 0.2; x += 0.9)
K.box(0.14, 0.04, 0.1, o.book || M.velvetR, x, 0.85, -0.31, 0.1);
K.solid(0, -0.05, len / 2 + 0.07, 0.3, 1.1);
},
function (K, o) {
o = o || {};
var M = ilfMats(), w = o.w || 2.4;
K.box(w, 0.95, 0.9, M.marble, 0, 0, 0);
K.box(w + 0.12, 0.06, 1.0, M.marble, 0, 0.95, 0);
K.box(w + 0.1, 0.01, 1.02, M.linen, 0, 1.01, 0);
K.box(w + 0.14, 0.5, 0.01, M.linen, 0, 0.52, 0.505);
K.box(w * 0.42, 0.48, 0.012, o.frontal || M.velvetR, 0, 0.53, 0.51);
K.box(w * 0.42, 0.04, 0.014, M.gold, 0, 0.98, 0.512);
ilfCandlestick(K, -w / 2 + 0.25, 1.02, 0, 0.38);
ilfCandlestick(K, w / 2 - 0.25, 1.02, 0, 0.38);
if (o.cross !== false) {
K.box(0.24, 0.08, 0.18, M.gold, 0, 1.02, -0.2);
K.at(0, 1.1, -0.2, 0, function () { ilfCross(K, 0.6); });
}
ilfFlowers(K, -w / 2 + 0.6, 1.02, -0.15);
ilfFlowers(K, w / 2 - 0.6, 1.02, -0.15);
ilfOpenBook(K, 0.45, 1.03, 0.18, 0.2);
K.solid(0, 0, w / 2 + 0.1, 0.5, 1.1);
},
function (K, w, h) {
var M = ilfMats(), n = Math.max(3, Math.round(w / 1.1) | 1), pw = w / n;
K.box(w + 0.3, h, 0.25, M.walnut, 0, 0, 0);
K.box(w + 0.5, 0.2, 0.35, M.gold, 0, h, 0);
for (var i = 0; i < n; i++) {
var x = -w / 2 + pw * (i + 0.5), ph = (i === (n >> 1) ? h * 0.78 : h * 0.62);
K.plane(pw * 0.72, ph * 0.8, ilfTexMat(ilfPaintingTex(1 + i * 4)), x, 0.4 + ph * 0.4, 0.13, 0);
K.geo(ilfTor(Math.PI, 12), M.gold, x, 0.4 + ph * 0.8, 0.14, pw * 0.74, pw * 0.5, 0.5);
K.box(0.06, ph * 0.82, 0.06, M.gold, x - pw * 0.39, 0.38, 0.14);
K.box(0.06, ph * 0.82, 0.06, M.gold, x + pw * 0.39, 0.38, 0.14);
K.cone(0.09, 0.5, M.gold, x + pw / 2, h + 0.2, 0.0, 6);
}
K.cone(0.09, 0.5, M.gold, -w / 2, h + 0.2, 0, 6);
},
function (K, w) {
var M = ilfMats(), n = Math.round(w / 0.16), mid = (n - 1) / 2;
K.box(w + 0.3, 1.2, 0.8, M.walnut, 0, 0, 0);
K.box(w * 0.6, 0.06, 0.5, ilfM(0xF0EAD8), 0, 1.0, 0.3);
for (var i = 0; i < n; i++) {
var h = 1.6 + (1 - Math.abs(i - mid) / mid) * 2.2 + ((i % 2) * 0.15), x = -w / 2 + i * w / (n - 1);
K.cyl(0.065, h, M.silver, x, 1.2, 0.05, 10);
K.cone(0.065, 0.14, M.silver, x, 1.2 + h - 0.02, 0.05, 10);
K.box(0.07, 0.05, 0.02, M.black, x, 1.42, 0.11);
}
K.box(w + 0.3, 0.18, 0.4, M.walnut, 0, 1.2 + 4.0, -0.1);
K.solid(0, 0, w / 2 + 0.2, 0.45, 1.3);
},
function (K, w) {
var M = ilfMats();
w = w || 1.2;
K.box(w, 0.9, 0.4, M.iron, 0, 0, 0);
K.box(w + 0.1, 0.03, 0.5, M.brass, 0, 0.9, 0);
for (var r = 0; r < 3; r++)
for (var x = -w / 2 + 0.08; x < w / 2 - 0.05; x += 0.1) {
if (((x * 31 + r * 7) | 0) % 4 === 0)
continue;
var y = 0.93 + r * 0.05, z = -0.15 + r * 0.13;
K.cyl(0.025, 0.03, ilfM(0xC83A2A, { op: 0.7 }), x, y, z, 8);
if (!K.lite)
K.geo(ilfCone(5), M.flame, x, y + 0.05, z, 0.02, 0.04, 0.02);
}
K.solid(0, 0, w / 2, 0.25, 1);
},
function (K, o) {
o = o || {};
var M = ilfMats(), w = o.w || 0.7, d = 0.5, h = o.small ? 0.6 : 0.72, steel = ilfM(0x8A9098, { shine: 40 }), top = o.top || ilfM(0xD8C8A8, { map: "wood" });
K.box(w, 0.03, d, top, 0, h - 0.03, 0);
K.box(w, 0.08, d - 0.06, steel, 0, h - 0.13, -0.02);
[[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (s) { K.box(0.03, h - 0.03, 0.03, steel, s[0] * (w / 2 - 0.04), 0, s[1] * (d / 2 - 0.04)); });
var ch = o.chair || [M.blue, M.red, M.green, M.yellow, M.orange][(o.seed || 0) % 5], cs = o.small ? 0.36 : 0.42, sh = o.small ? 0.36 : 0.44;
K.at(0, 0, 0.45, 0, function () {
[[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (q) { K.box(0.025, sh, 0.025, steel, q[0] * (cs / 2 - 0.03), 0, q[1] * (cs / 2 - 0.03)); });
K.box(cs, 0.03, cs, ch, 0, sh, 0);
K.box(cs, 0.32, 0.03, ch, 0, sh + 0.12, cs / 2 - 0.02, 0, 0.08);
});
if (o.bare)
return;
var r = ilfRng("pd" + (o.seed || 0));
if (r() < 0.7)
K.box(0.21, 0.008, 0.28, M.paper, (r() - 0.5) * 0.2, h, 0.04, (r() - 0.5) * 0.5);
if (r() < 0.5)
K.boxc(0.15, 0.008, 0.008, [M.yellow, M.blue, M.red][(r() * 3) | 0], 0.15, h + 0.006, 0.1, r() * 3);
if (!K.lite && r() < 0.45)
ilfBookStack(K, -w / 2 + 0.14, h, -0.12, 1 + ((r() * 2) | 0));
if (!K.lite && r() < 0.3) {
K.box(0.32, 0.38, 0.16, [M.red, M.blue, M.purple, M.green][(r() * 4) | 0], w / 2 + 0.1, 0, 0.38);
}
K.solid(0, 0.2, w / 2, 0.5, h);
},
function (K, n, col) {
var M = ilfMats(), C = col || ilfM(0x3A6AA8, { shine: 40 }), w = 0.38;
for (var i = 0; i < n; i++) {
var x = (i - (n - 1) / 2) * w;
K.box(w - 0.01, 1.8, 0.45, C, x, 0.1, 0);
for (var v = 0; v < 4; v++)
K.box(w * 0.5, 0.012, 0.004, M.black, x, 1.5 + v * 0.04, 0.226);
K.box(0.02, 0.12, 0.02, M.silver, x + w * 0.32, 0.95, 0.23);
}
K.box(n * w, 0.1, 0.45, M.black, 0, 0, 0);
K.solid(0, 0, n * w / 2, 0.23, 1.9);
},
function (K, w) {
var M = ilfMats(), wood = ilfM(0xC8A878, { map: "wood" }), C = [M.red, M.blue, M.green, M.yellow, M.purple, M.orange];
K.box(w, 1.1, 0.4, wood, 0, 0, 0);
for (var c = 0; c < Math.floor(w / 0.36); c++)
for (var r = 0; r < 2; r++) {
var x = -w / 2 + 0.2 + c * 0.36, y = 0.12 + r * 0.5;
K.box(0.3, 0.4, 0.02, ilfM(0x6A5038), x, y, 0.18);
if ((c + r) % 3 !== 2)
K.box(0.24, 0.3, 0.14, C[(c * 2 + r) % 6], x, y + 0.02, 0.2);
}
K.solid(0, 0, w / 2, 0.2, 1.1);
},
function (K, o) {
o = o || {};
var M = ilfMats(), w = 1.6, d = 0.75, h = 0.76, top = ilfM(0x8A6A4A, { map: "wood" });
K.box(w, 0.04, d, top, 0, h - 0.04, 0);
K.box(0.45, h - 0.04, d - 0.04, top, -w / 2 + 0.24, 0, 0);
K.box(0.04, h - 0.04, d - 0.04, top, w / 2 - 0.03, 0, 0);
K.box(w - 0.5, 0.5, 0.02, top, 0.2, 0.2, -d / 2 + 0.04);
K.sph(0.045, ilfM(0xC82A2A), 0.5, h + 0.045, 0.15, 1, 0.95, 1, 10);
K.boxc(0.005, 0.03, 0.005, M.leafD, 0.5, h + 0.1, 0.15);
K.cyl(0.04, 0.1, ilfM(0xF4F0E8, { shine: 40 }), -0.5, h, 0.18, 10);
K.cyl(0.032, 0.002, ilfM(0x3A2010), -0.5, h + 0.098, 0.18, 10);
K.box(0.24, 0.04, 0.32, M.paper, 0, h, 0.05, 0.2);
K.box(0.24, 0.04, 0.32, ilfM(0xF8E8A8), 0.04, h + 0.04, 0.05, -0.1);
K.box(0.5, 0.32, 0.03, M.black, -0.15, h + 0.12, -0.2);
K.box(0.06, 0.12, 0.06, M.black, -0.15, h, -0.2);
K.plane(0.46, 0.28, ilfM(0x2A4A7A, { glow: 1 }), -0.15, h + 0.28, -0.184, 0);
ilfBookStack(K, 0.6, h, -0.22, 3);
K.solid(0, 0, w / 2, d / 2, h);
K.at(0, 0, -0.7, Math.PI, function () { ilfChair(K, { cushion: ilfM(0x2A3A5A) }); });
},
function (K, w) {
var M = ilfMats();
K.box(w, 0.9, 0.5, M.walnut, 0, 0, 0);
K.box(w, 1.2, 0.04, ilfM(0x1A2A4A), 0, 0.9, -0.23);
for (var i = 0; i < 6; i++) {
var x = -w / 2 + 0.3 + i * (w - 0.6) / 5, y = i % 2 ? 1.4 : 0.92;
K.cyl(0.07, 0.03, M.black, x, y, 0, 10);
K.taper(1.6, 0.5, 0.22, M.gold, x, y + 0.08, 0, 10);
K.box(0.04, 0.06, 0.04, M.gold, x, y + 0.03, 0);
}
K.box(w, 0.03, 0.48, ilfM(0xDCE8F0, { op: 0.3 }), 0, 1.35, 0);
K.box(w, 0.03, 0.48, M.walnut, 0, 2.1, 0);
K.box(w, 1.2, 0.01, ilfM(0xDCE8F0, { op: 0.18, shine: 90 }), 0, 0.9, 0.245);
K.solid(0, 0, w / 2, 0.25, 2.1);
},
function (id, who, col) {
var child = who === "child" || who === "pupil", L = (typeof randomLook === "function") ? randomLook(id, child ? "child" : "human") : {};
L.hat = "none";
if (who === "student" || who === "robed") {
L.topKind = "robe";
L.top = col || [0x2A1E3A, 0x1E2A4A, 0x3A1E22, 0x1E3A2A][ilfHash(id) % 4];
L.bottom = 0x2A2A30;
}
else if (who === "priest") {
L.topKind = "robe";
L.top = 0x1A1A1E;
L.bottom = 0x1A1A1E;
L.sex = "m";
}
else if (who === "vicar") {
L.topKind = "robe";
L.top = 0xF2EEE6;
L.bottom = 0x1A1A1E;
}
else if (who === "worshipper") {
L.top = [0x2A3A5A, 0x5A2A2A, 0x3A3A3A, 0x4A5A3A, 0x6A5A4A, 0x2A2A2A][ilfHash(id) % 6];
if (L.topKind === "robe")
L.topKind = "coat";
}
else if (who === "teacher") {
if (L.topKind === "robe")
L.topKind = "shirt";
}
if (col && who !== "student" && who !== "robed")
L.top = col;
return L;
},
function (I, room, s, i) {
var id = "__ilf_" + (I.spec && I.spec.id || "in") + "_" + room.key + "_" + i, child = s.who === "child" || s.who === "pupil";
var g = buildFigure({ id: id, archetype: child ? "child" : "human", attrs: {}, look: ilfLookFor(id, s.who, s.col), solid: false, detail: 2, nights: [], city: true }, 1);
g.position.set(s.x, (s.y || 0) + 0.02, s.z);
g.rotation.y = s.ry || 0;
if (s.sit) {
g.userData.seated = true;
g.userData.pose = "sit";
var lm = g.userData.limbs;
if (lm)
[lm.ll, lm.rl].forEach(function (l) { if (l) {
l.rotation.x = -1.45;
l.rotation.z = 0;
} });
g.position.y = (s.y || 0) - 0.02;
}
else if (s.pose)
g.userData.pose = s.pose;
g.userData.ilfFig = 1;
g.traverse(function (m) { m.raycast = function () { }; });
return g;
},
function (I, r) {
var ox = I.root.position.x, gone = [];
(function walk(o) {
o.children.slice().forEach(function (m) {
if (m.isMesh && m.geometry && m.geometry.parameters && m.geometry.type === "BoxGeometry") {
var p = m.geometry.parameters;
if (Math.abs(p.height - 0.75) < 0.001 && ((Math.abs(p.width - 1.6) < 0.001 && Math.abs(p.depth - 0.8) < 0.001) || (Math.abs(p.width - 0.8) < 0.001 && Math.abs(p.depth - 1.6) < 0.001)) &&
m.position.x > r.x0 && m.position.x < r.x1 && m.position.z > r.z0 && m.position.z < r.z1) {
gone.push({ x: m.position.x, z: m.position.z, rot: p.width < 1 });
o.remove(m);
}
}
else if (m.isGroup && m.name !== "spb-wing")
walk(m);
});
})(I.root);
if (gone.length)
I.walls = I.walls.filter(function (w) { return !gone.some(function (g) { return Math.abs(ox + g.x - w.x) < 0.05 && Math.abs(g.z - w.z) < 0.05; }); });
return gone;
},
function (K, r, o) {
o = o || {};
var M = ilfMats(), sd = ilfAcSide(r), H = o.H || 10, r0 = ilfRng("acw" + r.id), lite = K.lite;
var a0 = Math.min(sd.out, sd.inn) + (sd.west ? 3.4 : 2.8), a1 = Math.max(sd.out, sd.inn) - (sd.west ? 2.8 : 3.4);
[["z0", r.z0, 0], ["z1", r.z1, Math.PI]].forEach(function (wl, wi) {
var z = wl[1], ry = wl[2], dz = wi ? -1 : 1, skip = (o.skip && o.skip[wl[0]]) || [];
function free(x, hw) { return !skip.some(function (sp) { return x + hw > sp[0] && x - hw < sp[1]; }); }
if (!o.noCases)
for (var x = a0 + 0.8, i = 0; x <= a1 - 0.8; x += lite ? 3.4 : 1.75, i++) {
if (!free(x, 0.85))
continue;
if (o.caseEvery && i % o.caseEvery)
continue;
K.at(x, 0, z + dz * 0.47, ry, function () { ilfBookcase(K, { w: 1.6, h: o.caseH || 3.0, seed: i + wi, wood: M.walnut }); });
}
var n = 0;
for (var hx = a0 + 1.6; hx <= a1 - 1.4; hx += lite ? 6 : 3.6, n++) {
(function (hx, n) {
K.at(hx, 0, z + dz * 0.27, ry, function () { if (n % 2 === 0)
ilfTapestry(K, 1.6, 2.6, (o.caseH || 3.0) + 0.6, (n + wi + r0() * 5) | 0, ilfHex(ILF_HOUSES[(n + wi) % 4]).replace("#", "#"));
else
ilfPainting(K, 1.3, 1.6, (o.caseH || 3.0) + 1.0, (n * 3 + wi + (r.id.length * 5)) | 0); });
})(hx, n);
}
});
},
function (K, r, kinds) {
var M = ilfMats(), C = [[r.x0 + 1, r.z0 + 1], [r.x1 - 1, r.z0 + 1], [r.x0 + 1, r.z1 - 1], [r.x1 - 1, r.z1 - 1]];
C.forEach(function (c, i) {
var k = kinds[i % kinds.length];
if (!k)
return;
K.at(c[0], 0, c[1], (i % 2 ? -1 : 1) * 0.6, function () {
if (k === "plant")
ilfPlant(K, 1.5, { pot: M.stoneD, seed: i });
else if (k === "globe")
ilfGlobe(K);
else if (k === "trunk")
ilfTrunk(K, i % 2 ? M.leather : M.velvetB);
else if (k === "stand") {
K.box(0.4, 0.04, 0.4, M.iron, 0, 0, 0);
K.cyl(0.03, 1.5, M.iron, 0, 0, 0, 6);
ilfCandelabra(K, 0, 1.5, 0, 3);
K.solid(0, 0, 0.2, 0.2, 1.8);
}
else if (k === "ball")
ilfCrystalBall(K);
else if (k === "scrolls")
ilfScrollRack(K, 1.2);
else if (k === "cauldron")
ilfCauldron(K, 0x9AE8A0);
else if (k === "potions")
ilfPotionShelf(K, 1.4);
});
});
},
function (K, r, gone, seats, o) {
var M = ilfMats(), sd = ilfAcSide(r), face = sd.west ? -Math.PI / 2 : Math.PI / 2;
gone.forEach(function (g, i) {
var along = g.rot ? 1 : 0;
[-0.42, 0.42].forEach(function (off, j) {
var x = g.x + (along ? 0 : off), z = g.z + (along ? off : 0);
K.at(x, 0, z, face + Math.PI, function () { ilfDesk(K, { w: 0.8, d: 0.55, seed: i * 2 + j, candle: j === 0 }); K.at(0, 0, 0.55, Math.PI, function () { ilfChair(K, { cushion: ilfM(ILF_HOUSES[(i + j) % 4]) }); }); });
var dx = sd.west ? 0.55 : -0.55;
seats.push({ x: x + (along ? dx : 0), z: z + (along ? 0 : 0), ry: face, sit: 1, who: "student", col: ILF_HOUSES[(i + j) % 4], y: 0.02 });
});
});
},
function (K, r, seats, n) {
var sd = ilfAcSide(r), cx = (r.x0 + r.x1) / 2 + (sd.west ? 3 : -3), cz = (r.z0 + r.z1) / 2, face = sd.west ? -Math.PI / 2 : Math.PI / 2, west = sd.west;
for (var a = 0; a < (n || 2); a++)
for (var b = 0; b < 3; b++) {
var bx = cx + (west ? 1 : -1) * (a * 2.4 - 1), bz = cz - 4 + b * 4, dx = bx + (west ? -0.75 : 0.75);
K.at(dx, 0, bz, face + Math.PI, function () { ilfDesk(K, { w: 2.4, d: 0.55, seed: a * 3 + b, bare: false }); });
[-0.7, 0, 0.7].forEach(function (o, k) { if ((a + b + k) % 2)
seats.push({ x: bx, z: bz + o, ry: face, sit: 1, who: "student", col: ILF_HOUSES[(a + b + k) % 4], y: 0.02 }); });
}
},
function (I) {
var M = ilfMats(), Ad = I.academy, lite = ilfLite(), H = typeof AC_H !== "undefined" ? AC_H : 10, WH = typeof SPB_H !== "undefined" ? SPB_H : 9;
var G = Ad && Ad.spbG, castleK = ilfCtx(I, "academy castle"), wingK = G ? ilfCtx(I, "academy wing", G.wing) : null;
if (G && G.wing && G.wing.parent)
G.wing.parent.children.concat(G.wing.children).forEach(function (m) { var mt = m.material; if (!m.isMesh || m.userData.ilf || !mt || Array.isArray(mt) || !mt.isMeshLambertMaterial || mt.map || mt.vertexColors)
return; var c = mt.color, l = (c.r + c.g + c.b) / 3; if (l > 0.4 && l < 0.95)
ilfAshlar(m); });
if (Ad && Ad.anim)
Ad.anim.push(function () { var lz = camera.position.z - (I.root.position.z || 0), inC = lz >= -100 && lz <= 100; if (castleK.g.visible !== inC)
castleK.g.visible = inC; });
function R(id) { return typeof AC_ROOM !== "undefined" ? AC_ROOM[id] : null; }
var seatsOf = {};
function seats(id) { return seatsOf[id] || (seatsOf[id] = []); }
var classes = { flight: { skip: {}, corners: ["stand", "trunk", "plant", "stand"], noChand: 1 }, passage: { corners: ["plant", "stand", "globe", "scrolls"] },
veils: { corners: ["ball", "stand", "ball", "plant"] }, transfig: { corners: ["trunk", "stand", "plant", null] },
duel: { skip: { z1: [22, 50] }, corners: ["stand", null, "trunk", "stand"], noCases: 1 }, healing: { skip: { z0: [34, 40] }, corners: ["potions", null, "potions", null] },
conj: { corners: ["stand", "scrolls", "stand", "ball"] } };
Object.keys(classes).forEach(function (id) {
var r = R(id);
if (!r)
return;
var o = classes[id], K = castleK;
ilfAcWalls(K, r, { H: H, skip: o.skip, noCases: o.noCases });
ilfAcBeams(K, r, H);
ilfAcCorners(K, r, o.corners);
if (!o.noChand) {
var cz = (r.z0 + r.z1) / 2;
[r.x0 + (r.x1 - r.x0) * 0.3, r.x0 + (r.x1 - r.x0) * 0.7].forEach(function (x) { K.at(x, 0, cz, 0, function () { ilfChandelier(K, H - 3.2, H, { r: 1.1, tiers: 2 }); }); });
}
var gone = ilfAcClearDesks(I, r);
ilfAcDesks(K, r, gone, seats(id));
var sd = ilfAcSide(r), mx = (r.x0 + r.x1) / 2 + (sd.west ? -2 : 2);
seats(id).push({ x: mx + 3, z: r.z0 + 1.3, ry: Math.PI, who: "student", col: ILF_HOUSES[1] }, { x: mx - 3, z: r.z1 - 1.3, ry: 0, who: "student", col: ILF_HOUSES[2] });
if (id === "flight") {
seats(id).push({ x: (r.x0 + r.x1) / 2, z: (r.z0 + r.z1) / 2 + 3, ry: 0.4, who: "student", col: ILF_HOUSES[0], must: 1 }, { x: (r.x0 + r.x1) / 2 + 2, z: (r.z0 + r.z1) / 2 - 2, ry: -2, who: "student", col: ILF_HOUSES[3], must: 1 });
}
if (id === "duel") {
var dcx = (r.x0 + r.x1) / 2, dcz = (r.z0 + r.z1) / 2;
seats(id).push({ x: dcx - 5, z: dcz, ry: Math.PI / 2, who: "student", col: ILF_HOUSES[0], must: 1 }, { x: dcx + 5, z: dcz, ry: -Math.PI / 2, who: "student", col: ILF_HOUSES[2], must: 1 });
for (var b = 0; b < 6; b++)
seats(id).push({ x: dcx - 7.5 + b * 3, z: dcz + 4.2, ry: Math.PI, who: "student", col: ILF_HOUSES[b % 4] });
}
if (id === "flight" || id === "duel") {
var bx = (r.x0 + r.x1) / 2, bz = r.z0 + 1.15;
[-4.5, 4.5].forEach(function (o, bi) { K.at(bx + o, 0, bz, 0, function () { ilfBench(K, 4, {}); }); for (var q = 0; q < 4; q++)
if ((q + bi) % 2 === 0)
seats(id).push({ x: bx + o - 1.5 + q, z: bz, ry: 0, sit: 1, who: "student", col: ILF_HOUSES[(q + bi) % 4] }); });
K.at(bx, 0, r.z0 + 1.0, 0, function () {
K.box(3.2, 0.08, 0.12, M.oakD, 0, 1.5, 0);
K.box(3.2, 0.08, 0.12, M.oakD, 0, 0.2, 0);
K.box(0.1, 1.6, 0.12, M.oakD, -1.6, 0, 0);
K.box(0.1, 1.6, 0.12, M.oakD, 1.6, 0, 0);
for (var k = 0; k < 8; k++) {
var x = -1.4 + k * 0.4;
if (id === "flight") {
K.cyl(0.022, 1.5, M.oak, x, 0.35, 0.1, 6);
K.cone(0.09, 0.45, ilfM(0xB89A5A), x, 0.0, 0.12, 8);
K.box(0.12, 0.04, 0.12, M.brass, x, 0.42, 0.1);
}
else {
K.cyl(0.025, 1.7, [M.walnut, M.oak, M.ebony][k % 3], x, 0.05, 0.08, 6);
K.sph(0.05, [M.glassB, M.glassR, M.glassG, M.glassA][k % 4], x, 1.78, 0.08);
}
}
K.solid(0, 0, 1.7, 0.2, 1.7);
});
}
if (id === "healing") {
seats(id).push({ x: r.x1 - 2, z: r.z0 + 2.5, ry: -Math.PI / 2, sit: 1, who: "student", col: ILF_HOUSES[1], y: 0.35, must: 1 });
}
ilfRoom(I, id, r.x0, r.x1, r.z0, r.z1, seats(id), { max: lite ? 3 : 8 });
});
(function () {
var r = R("hall");
if (!r)
return;
var K = castleK, s = seats("hall"), rr = ilfRng("feast");
[-10.5, -3.5, 3.5, 10.5].forEach(function (x, ti) {
K.box(1.72, 0.015, 34.1, M.linen, x, 0.815, 8);
K.box(0.4, 0.004, 34.1, ilfM(ILF_HOUSES[ti]), x, 0.831, 8);
[-1, 1].forEach(function (sd) { K.box(0.012, 0.33, 34.1, M.linen, x + sd * 0.866, 0.5, 8); });
for (var z = -8.4; z <= 24.4; z += lite ? 2.4 : 1.2) {
[-1, 1].forEach(function (sd) { if (lite && rr() < 0.3)
return; ilfPlace(K, x + sd * 0.5, 0.836, z, ti * 100 + z * 10 + sd); });
}
for (var pz = -7; pz <= 23; pz += lite ? 10 : 5) {
ilfPlatter(K, x, 0.836, pz, ti * 10 + pz);
ilfCandelabra(K, x, 0.836, pz + 2.5, lite ? 1 : 3);
}
for (var sz = -8; sz <= 24; sz += 1.5) {
[-1, 1].forEach(function (sd) { s.push({ x: x + sd * 1.25, z: sz, ry: -sd * Math.PI / 2, sit: 1, who: "student", col: ILF_HOUSES[ti], y: 0.0 }); });
}
});
[-1, 1].forEach(function (sd) {
K.at(sd * 15.6, 0, 8.5, -sd * Math.PI / 2, function () {
K.box(4.6, 0.3, 1.2, M.stoneD, 0, 0, 0.3);
K.box(0.6, 3.4, 1.0, M.stone, -1.9, 0, 0.2);
K.box(0.6, 3.4, 1.0, M.stone, 1.9, 0, 0.2);
K.box(4.8, 0.7, 1.3, M.stone, 0, 3.2, 0.25);
K.box(5.2, 0.2, 1.5, M.stoneD, 0, 3.9, 0.3);
K.box(3.2, 3.0, 0.2, ilfM(0x140C08), 0, 0.3, -0.2);
K.box(1.8, 0.25, 0.25, M.oakD, 0, 0.3, 0.2, 0.2);
K.box(1.6, 0.22, 0.22, M.oakD, 0.1, 0.5, 0.25, -0.3);
K.cone(0.5, 1.0, ilfM(0xFF8A2A, { glow: 1 }), 0, 0.45, 0.25, 6);
K.cone(0.3, 0.7, M.flame, 0.4, 0.45, 0.2, 6);
K.at(0, 4.4, 0.1, 0, function () { ilfPainting(K, 2.4, 1.6, 0, 4); });
K.solid(0, 0.3, 2.4, 0.7, 4);
K.lamp(0, 1.4);
});
});
for (var hx = -8; hx <= 8; hx += lite ? 4 : 2)
if (Math.abs(hx) > 1)
ilfCandelabra(K, hx, 1.445, -15.6, lite ? 1 : 3);
K.box(20.1, 0.01, 1.5, M.linen, 0, 1.445, -15.6);
K.box(20.2, 0.4, 0.01, M.linen, 0, 1.05, -14.88);
ilfRoom(I, "hall", r.x0, r.x1, r.z0, r.z1, s, { max: lite ? 4 : 14 });
})();
(function () {
var r = R("entrance");
if (!r)
return;
var K = castleK, s = seats("entrance");
K.at(0, 0, 38, 0, function () { ilfRug(K, 9, 6, 0); });
[[-15, 33], [15, 33], [-15, 44], [15, 44]].forEach(function (p, i) { K.at(p[0], 0, p[1], 0, function () { ilfPlant(K, 1.8, { pot: M.stoneD, seed: i }); }); });
[[-4, 34, 0.4], [4, 34, -0.4], [0, 43, Math.PI], [-6, 42, 2.6], [6, 41.5, -2.8]].forEach(function (p, i) { s.push({ x: p[0], z: p[1], ry: p[2], who: "student", col: ILF_HOUSES[i % 4] }); });
ilfRoom(I, "entrance", r.x0, r.x1, r.z0, r.z1, s, { max: lite ? 2 : 5 });
})();
["wgal", "egal"].forEach(function (id, gi) {
var r = R(id);
if (!r)
return;
var K = castleK, s = seats(id), cx = (r.x0 + r.x1) / 2;
K.at(cx, 0, 3, 0, function () { K.plane(2.2, 80, ilfM(ILF_HOUSES[gi * 2]), 0, 0.012, 0, 0, -Math.PI / 2); K.plane(2.5, 80, M.gold, 0, 0.009, 0, 0, -Math.PI / 2); });
for (var z = -34; z <= 40; z += 12) {
s.push({ x: cx + (z % 24 ? 0.6 : -0.6), z: z, ry: (z % 24 ? 0 : Math.PI), who: "student", col: ILF_HOUSES[(z + 40) / 12 % 4 | 0] });
}
for (var pz = -30; pz <= 36; pz += 22) {
K.at(cx + (gi ? -1 : 1) * 2.4, 0, pz + 5, (gi ? 1 : -1) * Math.PI / 2, function () { ilfBench(K, 1.8); });
}
ilfRoom(I, id, r.x0, r.x1, r.z0, r.z1, s, { max: lite ? 2 : 4 });
});
(function () {
var r = R("library");
if (!r)
return;
var K = castleK, s = seats("library");
[[-3, -30.5], [3, -30.5], [0, -44]].forEach(function (t, i) {
[-0.8, 0.8].forEach(function (o, j) {
K.at(t[0] + o, 0, t[1] + 1.0, Math.PI, function () { ilfChair(K, { cushion: M.velvetG }); });
s.push({ x: t[0] + o, z: t[1] + 1.0, ry: Math.PI, sit: 1, who: "student", col: ILF_HOUSES[(i + j) % 4] });
K.at(t[0] + o, 0, t[1] - 1.0, 0, function () { ilfChair(K, { cushion: M.velvetG }); });
});
ilfOpenBook(K, t[0] - 0.6, 0.78, t[1] + 0.2, 0.2);
ilfBookStack(K, t[0] + 0.3, 0.78, t[1] - 0.3, 4);
ilfCandelabra(K, t[0] - 0.1, 0.78, t[1] - 0.2, 1);
});
K.at(-13, 0, -29.4, 0.4, function () { ilfGlobe(K); });
K.at(13, 0, -29.4, -0.4, function () { ilfGlobe(K); });
K.at(0, 0, -34, 0, function () { ilfRug(K, 6, 4, 1); });
for (var lx = -12; lx <= 12; lx += 8)
K.at(lx, 0, -37, 0, function () { ilfChandelier(K, H - 3, H, { r: 0.8 }); });
s.push({ x: -6, z: -33, ry: Math.PI / 2, who: "student", col: ILF_HOUSES[3] }, { x: 7, z: -41, ry: -Math.PI / 2, who: "student", col: ILF_HOUSES[0] });
ilfRoom(I, "library", r.x0, r.x1, r.z0, r.z1, s, { max: lite ? 3 : 7 });
})();
(function () {
var r = R("common");
if (!r)
return;
var K = castleK, s = seats("common"), cx = (r.x0 + r.x1) / 2, cz = (r.z0 + r.z1) / 2;
ilfAcWalls(K, r, { H: H, skip: { z0: [22, 50] } });
ilfAcBeams(K, r, H);
ilfAcCorners(K, r, ["plant", "globe", "trunk", "stand"]);
[[r.x1 - 5, cz - 3.4, -1.2], [r.x1 - 5, cz + 3.4, -1.9]].forEach(function (p) { K.at(p[0], 0, p[1], p[2], function () { ilfChair(K, { cushion: M.velvetR }); }); s.push({ x: p[0], z: p[1], ry: p[2], sit: 1, who: "student", col: ILF_HOUSES[0] }); });
[[cx - 7, cz - 4], [cx - 7, cz + 4]].forEach(function (t, i) {
K.at(t[0], 0, t[1], 0, function () {
K.cyl(0.55, 0.05, M.oak, 0, 0.72, 0, 16);
K.turned(0.12, 0.72, M.oakD, 0, 0, 0);
K.box(0.5, 0.01, 0.5, ilfTexMat(ilfCanvasTex("chess", 64, 64, function (g) { for (var a = 0; a < 8; a++)
for (var b = 0; b < 8; b++) {
g.fillStyle = (a + b) % 2 ? "#2A1A10" : "#E8DCC0";
g.fillRect(a * 8, b * 8, 8, 8);
} })), 0, 0.77, 0);
for (var p = 0; p < 8; p++) {
K.cyl(0.018, 0.05, p % 2 ? M.black : M.white, -0.2 + p * 0.06, 0.78, (p % 2 ? -0.18 : 0.18), 6);
}
K.solid(0, 0, 0.55, 0.55, 0.8);
[[0.95, 0, -Math.PI / 2], [-0.95, 0, Math.PI / 2]].forEach(function (c) { K.at(c[0], 0, c[1], c[2], function () { ilfChair(K, { cushion: M.velvetR }); }); });
});
s.push({ x: t[0] + 0.95, z: t[1], ry: -Math.PI / 2, sit: 1, who: "student", col: ILF_HOUSES[1 + i] }, { x: t[0] - 0.95, z: t[1], ry: Math.PI / 2, sit: 1, who: "student", col: ILF_HOUSES[2 + i] });
});
K.at(cx + 2, 0, cz, 0, function () { ilfChandelier(K, H - 3.4, H, { r: 1.2, tiers: 2 }); });
s.push({ x: cx + 2, z: cz + 1.2, ry: Math.PI / 2, sit: 1, who: "student", col: ILF_HOUSES[2], y: 0.0, must: 1 }, { x: cx + 2, z: cz - 1.2, ry: Math.PI / 2, sit: 1, who: "student", col: ILF_HOUSES[3], y: 0.0 });
ilfRoom(I, "common", r.x0, r.x1, r.z0, r.z1, s, { max: lite ? 3 : 7 });
})();
["astro", "clock", "study", "crypt", "pool"].forEach(function (id) {
var r = R(id);
if (!r)
return;
var K = castleK, s = seats(id), cx = (r.x0 + r.x1) / 2, cz = (r.z0 + r.z1) / 2;
if (id === "study") {
ilfAcCorners(K, r, ["globe", "plant", "stand", "trunk"]);
K.at(cx, 0, cz + 2, 0, function () { ilfRug(K, 8, 6, 3); });
for (var bx = r.x0 + 2.5; bx < r.x1 - 5; bx += 1.8)
K.at(bx, 0, r.z0 + 0.47, 0, function () { ilfBookcase(K, { w: 1.6, h: 3.4, seed: bx | 0, wood: M.mahog }); });
K.at(cx - 6, 0, r.z1 - 0.27, Math.PI, function () { ilfPainting(K, 2, 2.6, 2.2, 1); });
K.at(cx, 0, cz, 0, function () { ilfChandelier(K, H - 3.4, H, { r: 1, tiers: 2 }); });
}
if (id === "astro") {
for (var i = 0; i < 3; i++)
K.at(r.x0 + 3 + i * 3, 0, r.z1 - 1.6, Math.PI, function () { K.turned(0.3, 0.9, M.brass, 0, 0, 0); K.cylc(0.12, 1.6, M.brass, 0, 1.3, 0.3, 10, 0, -0.9); K.solid(0, 0, 0.3, 0.3, 1); });
K.at(r.x1 - 0.27, 0, cz, -Math.PI / 2, function () { K.plane(3, 3, ilfTexMat(ilfChartTex("stars")), 0, 3, 0.03, 0); });
for (var k = 0; k < 6; k++)
if (k % 2)
s.push({ x: cx - 5 + k * 2, z: cz + 5, ry: Math.PI, sit: 1, who: "student", col: ILF_HOUSES[k % 4], y: 0.15 });
}
if (id === "clock") {
ilfAcCorners(K, r, ["stand", "trunk", "stand", "plant"]);
s.push({ x: cx - 3, z: cz + 3, ry: Math.PI, who: "student", col: ILF_HOUSES[2] }, { x: cx + 3, z: cz + 3.5, ry: Math.PI + 0.4, who: "student", col: ILF_HOUSES[0] });
}
if (id === "crypt") {
for (var c = 0; c < 4; c++)
K.at(r.x0 + 2 + c * 7, 0, r.z1 - 1, Math.PI, function () { ilfVotive(K, 1.2); });
ilfAcCorners(K, r, ["stand", "stand", "stand", "stand"]);
s.push({ x: cx, z: cz + 6, ry: Math.PI, who: "student", col: ILF_HOUSES[2] });
}
if (id === "pool") {
for (var p = 0; p < 6; p++)
K.at(r.x0 + 2 + p * 5.6, 0, r.z1 - 1.2, 0, function () { ilfPlant(K, 1.7, { pot: M.stoneD, seed: p }); });
s.push({ x: cx - 4, z: r.z1 - 3, ry: Math.PI, who: "student", col: ILF_HOUSES[1] }, { x: cx + 5, z: r.z1 - 3.4, ry: Math.PI - 0.5, who: "student", col: ILF_HOUSES[3] });
}
ilfRoom(I, id, r.x0, r.x1, r.z0, r.z1, s, { max: lite ? 2 : 5 });
});
if (wingK) {
var WK = wingK;
var wing = { wards: { corners: ["stand", "scrolls", "plant", "stand"], desks: 2, skip: { z1: [-28, -16] } }, winds: { corners: ["plant", "stand", "plant", "stand"], desks: 2, noChand: 1, skip: { z0: [-36, -8] } },
enchant: { corners: ["trunk", "stand", "plant", "stand"], skip: { z0: [-28, -16], z1: [-26, -18] } }, runes: { corners: ["scrolls", "stand", "scrolls", "plant"], skip: { z1: [-26, -18] } },
scry: { corners: ["ball", "stand", "ball", "plant"], noChand: 1, skip: { z0: [-28, -14] } }, alchemy: { corners: ["potions", "cauldron", "potions", "plant"], noCases: 1 },
stores: { corners: ["trunk", "plant", null, null], noCases: 1, noChand: 1 }, dorm: { corners: ["trunk", "plant", "trunk", "plant"], noCases: 1 },
masters: { corners: ["globe", "plant", "stand", "plant"], skip: { z0: [14, 30] } }, wandgal: { corners: ["plant", "stand", "plant", "stand"], noCases: 1 } };
Object.keys(wing).forEach(function (id) {
var r = R(id);
if (!r)
return;
var o = wing[id], s = seats(id), cx = (r.x0 + r.x1) / 2, cz = (r.z0 + r.z1) / 2;
ilfAcWalls(WK, r, { H: WH, skip: o.skip, noCases: o.noCases, caseH: 2.8 });
ilfAcBeams(WK, r, WH);
ilfAcCorners(WK, r, o.corners);
if (!o.noChand)
[r.x0 + (r.x1 - r.x0) * 0.3, r.x0 + (r.x1 - r.x0) * 0.7].forEach(function (x) { WK.at(x, 0, cz, 0, function () { ilfChandelier(WK, WH - 3, WH, { r: 1, tiers: 2 }); }); });
if (o.desks)
ilfAcBenchDesks(WK, r, s, o.desks);
if (id === "alchemy") {
[-5, 0, 5].forEach(function (dx, i) { s.push({ x: cx + dx, z: cz - 0.9, ry: Math.PI, who: "student", col: ILF_HOUSES[i % 4], must: i === 1 }); });
s.push({ x: cx - 4, z: cz + 5.2, ry: Math.PI, who: "student", col: ILF_HOUSES[3] });
}
if (id === "enchant") {
s.push({ x: cx - 2, z: cz + 1.4, ry: Math.PI, who: "student", col: ILF_HOUSES[0], must: 1 }, { x: cx + 2, z: cz + 1.4, ry: Math.PI, who: "student", col: ILF_HOUSES[2] });
}
if (id === "runes" || id === "scry" || id === "winds") {
s.push({ x: cx + 2.5, z: cz + 2.5, ry: Math.PI * 0.8, who: "student", col: ILF_HOUSES[1], must: 1 }, { x: cx - 2.5, z: cz - 2.5, ry: -0.3, who: "student", col: ILF_HOUSES[3] });
}
if (id === "dorm") {
for (var b = 0; b < 4; b++)
s.push({ x: r.x0 + 4 + b * 4 + 0.2, z: r.z0 + 2.4, ry: 0, sit: 1, who: "student", col: ILF_HOUSES[b % 4], y: 0.12 });
WK.at(cx, 0, r.z1 - 0.27, Math.PI, function () { ilfPainting(WK, 1.6, 1.2, 2.2, 6); });
}
if (id === "masters") {
s.push({ x: r.x1 - 4.6, z: cz - 2, ry: -Math.PI / 2 + 0.4, sit: 1, who: "robed", col: 0x2A1E3A, must: 1 }, { x: r.x1 - 4.6, z: cz + 2, ry: -Math.PI / 2 - 0.4, sit: 1, who: "robed", col: 0x3A2A1A, must: 1 }, { x: cx - 2, z: cz, ry: Math.PI / 2, sit: 1, who: "robed", col: 0x1E2A3A });
WK.at(cx, 0, cz, 0, function () { ilfChandelier(WK, WH - 3.2, WH, { r: 1.1, tiers: 2 }); });
}
if (id === "wandgal") {
s.push({ x: cx - 4, z: r.z0 + 3.6, ry: Math.PI, who: "student", col: ILF_HOUSES[0], must: 1 }, { x: cx + 3, z: r.z1 - 3.6, ry: 0, who: "student", col: ILF_HOUSES[2] });
}
if (id === "stores") {
for (var k = 0; k < 6; k++)
WK.at(r.x0 + 3 + k * 4, 0, cz + 2.6, (k % 3) * 0.7, function () { WK.box(0.5, 0.6, 0.4, ilfM(0xB89A6A), 0, 0, 0); WK.sph(0.24, ilfM(0xC8A870), 0, 0.6, 0, 1, 0.6, 0.9); });
}
if (id === "wards" || id === "winds" || id === "runes")
s.push({ x: cx, z: r.z1 - 1.4, ry: 0, who: "student", col: ILF_HOUSES[2] });
ilfRoom(I, id, r.x0, r.x1, r.z0, r.z1, s, { max: lite ? 3 : 8 });
});
var sw = R("swhall");
if (sw) {
var ws = seats("swhall");
for (var z = -140; z >= -216; z -= 19)
ws.push({ x: (z % 38 ? 1.2 : -1.2), z: z, ry: (z % 38 ? Math.PI : 0), who: "student", col: ILF_HOUSES[((-z / 19) | 0) % 4] });
ilfRoom(I, "swhall", sw.x0, sw.x1, sw.z0, sw.z1, ws, { max: lite ? 2 : 4 });
}
["herbs", "moon", "shed", "menag", "aviary"].forEach(function (id, i) {
var r = R(id);
if (!r)
return;
var s = seats(id), cx = (r.x0 + r.x1) / 2, cz = (r.z0 + r.z1) / 2;
s.push({ x: cx - 3, z: cz + 2, ry: 0.6, who: "student", col: ILF_HOUSES[i % 4], must: 1 }, { x: cx + 4, z: cz - 3, ry: -2.4, who: "student", col: ILF_HOUSES[(i + 1) % 4] }, { x: cx + 1, z: cz + 5, ry: 3, who: "student", col: ILF_HOUSES[(i + 2) % 4] });
ilfRoom(I, id, r.x0, r.x1, r.z0, r.z1, s, { max: lite ? 2 : 3 });
});
WK.done();
}
castleK.done();
},
function (I, kinds, within) {
var gone = [], ox = I.root.position.x, oz = I.root.position.z;
I.root.children.slice().forEach(function (m) {
var k = m.userData && m.userData.furn;
if (!k || !kinds[k])
return;
if (within && !within(m.position))
return;
gone.push({ x: ox + m.position.x, z: oz + m.position.z });
I.root.remove(m);
});
if (gone.length)
I.walls = I.walls.filter(function (w) { return !gone.some(function (p) { return Math.abs(p.x - w.x) < 0.05 && Math.abs(p.z - w.z) < 0.05; }); });
return gone.length;
},
function (I, o) {
o = o || {};
var root = I.root, hide = {}, done = {};
(I.winMats || []).concat(I.winGlints || []).forEach(function (m) { hide[m.uuid] = 1; });
var stone = ilfM(o.wall || 0xC8BCA6, { map: o.map || "stone" }), top = null;
root.children.forEach(function (m) {
if (!m.isMesh || m.userData.ilf)
return;
if (m.material && hide[m.material.uuid]) {
m.visible = false;
return;
}
var p = m.geometry && m.geometry.parameters;
if (!p || m.geometry.type !== "BoxGeometry" || m.userData.furn)
return;
if (p.height >= 2 && Math.min(p.width, p.depth) <= 0.3 && !m.userData.liveDone) {
m.material = stone;
}
if (p.height <= 0.45 && p.width > 3 && p.depth > 3 && (!top || m.position.y > top.position.y))
top = m;
});
if (top && top.position.y > 2 && o.ceil)
top.material = ilfM(o.ceil, { map: "wood" });
},
function (I, o) {
o = o || {};
var M = ilfMats(), W = I.W, D = I.D, H = I.ceilH || 4, day = ilfDayNow(), lite = ilfLite(), grand = o.grand || W >= 20;
var keep = !!I.wpSaved, IN = 0.14;
if (!keep)
ilfClearFurn(I, ILF_CHURCH_OLD);
ilfStoneWalls(I, { wall: 0xC8BCA6, ceil: 0x4A3220 });
var K = ilfCtx(I, "church"), seats = [], back = -D / 2, front = D / 2;
K.plane(W - 0.4, 5.4, ilfM(0xE8E2D6, { map: "marble" }), 0, 0.008, back + 2.7, 0, -Math.PI / 2);
if (!keep) {
K.at(0, 0, back + 1.5, 0, function () { ilfAltar(K, { w: grand ? 3.2 : 2.4, frontal: grand ? M.velvetP : M.velvetR }); });
K.at(0, 0, back + 0.2, 0, function () { ilfReredos(K, Math.min(W - 4, grand ? 9 : 6), Math.min(H - 1.2, grand ? 6 : 3.6)); });
[-1, 1].forEach(function (s) {
var x0 = s * 0.9, x1 = s * (W / 2 - 2.6), len = Math.abs(x1 - x0), cx = (x0 + x1) / 2;
K.box(len, 0.06, 0.18, M.oakD, cx, 0.86, back + 4.2);
K.box(len, 0.12, 0.4, M.velvetR, cx, 0, back + 4.5);
for (var x = Math.min(x0, x1); x <= Math.max(x0, x1) + 0.01; x += 0.32)
K.turned(0.04, 0.86, M.oakD, x, 0, back + 4.2);
K.solid(cx, back + 4.2, len / 2, 0.1, 1);
});
K.at(-W / 2 + 1.5, 0, back + 3.0, 0.9, function () {
K.box(1.4, 1.1, 1.4, M.oakD, 0, 0, 0);
K.cyl(0.7, 1.1, M.walnut, 0, 1.1, 0, 8);
K.box(1.5, 0.08, 1.5, M.oakD, 0, 2.2, 0);
K.cyl(0.85, 0.12, M.oakD, 0, 3.6, 0, 8);
K.cone(0.85, 0.7, M.oakD, 0, 3.72, 0, 8);
K.box(0.08, 1.4, 0.08, M.oakD, -0.6, 2.2, -0.5);
K.box(0.4, 0.04, 0.3, M.velvetR, 0, 2.0, 0.45, 0, -0.3);
K.solid(0, 0, 0.8, 0.8, 2.4);
});
K.at(W / 2 - 1.5, 0, back + 3.0, -0.9, function () { ilfLecternEagle(K); });
seats.push({ x: 0, z: back + 2.6, ry: 0, who: grand ? "vicar" : "priest", must: 1 });
}
var aisle = grand ? 2.6 : 2.0, pl = W / 2 - aisle / 2 - 1.3, z0 = back + 6.6, z1 = front - 4.6, row = 1.12;
if (!keep) {
K.plane(aisle - 0.5, z1 - z0 + 6, ilfM(0x8A1E26), 0, 0.01, (z0 + z1) / 2 - 1.5, 0, -Math.PI / 2);
K.plane(aisle - 0.35, z1 - z0 + 6, M.gold, 0, 0.008, (z0 + z1) / 2 - 1.5, 0, -Math.PI / 2);
var r = ilfRng("pews" + W + D);
for (var z = z0, ri = 0; z <= z1; z += row, ri++)
[-1, 1].forEach(function (s) {
var cx = s * (aisle / 2 + pl / 2 + 0.1);
K.at(cx, 0, z, Math.PI, function () { ilfPew(K, pl, { wood: M.oak, cushion: grand ? M.velvetB : M.velvetR }); });
for (var p = 0; p < Math.floor(pl / 0.75); p++) {
if (r() < 0.45)
continue;
seats.push({ x: cx - pl / 2 + 0.4 + p * 0.75, z: z + 0.02, ry: Math.PI, sit: 1, who: "worshipper" });
}
});
}
var winH = Math.min(H - 2.2, grand ? 5.2 : 3.4), winW = grand ? 1.6 : 1.2, wy = Math.max(1.4, (H - winH) / 2), bay = grand ? 5 : 4;
for (var wz = back + 3, b = 0; wz < front - 2; wz += bay, b++) {
[-1, 1].forEach(function (s) {
K.at(s * (W / 2 - IN), 0, wz, -s * Math.PI / 2, function () { ilfWindow(K, winW, winH, wy, { stained: 1, v: b * 2 + (s > 0 ? 1 : 0), day: day, beam: day && b % 2 === 0, beamLen: Math.min(W * 0.5, 6), beamOp: 0.22 }); });
if (wz + bay / 2 < front - 2) {
K.at(s * (W / 2 - IN - 0.32), 0, wz + bay / 2, -s * Math.PI / 2, function () { ilfColumn(K, 0.28, H - 0.05, M.stone); });
if (!lite)
K.at(s * (W / 2 - IN - 0.6), 0, wz + bay / 2, -s * Math.PI / 2, function () {
K.box(0.12, 0.3, 0.14, M.iron, 0, 2.3, 0.08);
ilfCandle(K, 0, 2.6, 0.12, 0.18);
K.lamp(0, 0.6);
});
}
});
}
if (H > 6 && W > 9)
K.at(0, 0, back + IN, 0, function () { K.geo(ilfG("rose", function () { return new THREE.CircleGeometry(0.5, 32); }), ilfTexMat(ilfStainedTex(5, day), { glow: 1 }), 0, H - 1.6, 0.02, 2.4, 2.4, 1); K.ring(1.25, 0.12, M.stone, 0, H - 1.6, 0.04, 0, 0); });
if (!lite || grand)
for (var tz = back + 1; tz < front; tz += grand ? 4 : 3.2) {
K.box(W - 0.2, 0.28, 0.3, M.walnut, 0, H - 0.6, tz);
K.boxc(W * 0.32, 0.18, 0.24, M.walnut, -W * 0.32, H - 0.82, tz, 0, 0, -0.5);
K.boxc(W * 0.32, 0.18, 0.24, M.walnut, W * 0.32, H - 0.82, tz, 0, 0, 0.5);
K.box(0.22, 0.6, 0.22, M.walnut, 0, H - 0.6, tz);
}
K.box(0.3, 0.25, D - 0.4, M.walnut, 0, H - 0.3, 0);
var nCh = grand ? 3 : 2;
for (var c = 0; c < nCh; c++) {
var cz = z0 + (z1 - z0) * (c + 0.5) / nCh;
K.at(0, 0, cz, 0, function () { ilfChandelier(K, Math.max(3, H - 2.2), H, { r: grand ? 1.2 : 0.85, tiers: grand ? 2 : 1 }); });
}
K.at(W / 2 - 3.2, 0, front - 2.4, 0, function () { ilfFont(K); });
if (!keep) {
K.at(-W / 2 + IN + 0.45, 0, front - 2.6, Math.PI / 2, function () { ilfOrgan(K, Math.min(2.4, D * 0.1)); });
K.at(W / 2 - IN - 0.3, 0, front - 3.4, -Math.PI / 2, function () { ilfVotive(K, 1.3); });
seats.push({ x: W / 2 - 1.2, z: front - 3.4, ry: Math.PI / 2, who: "worshipper", must: 1 }, { x: -W / 2 + 2.2, z: front - 2.6, ry: -Math.PI / 2, sit: 1, who: "worshipper", y: 0.1 });
}
K.at(-W / 2 + 0.8, 0, front - 1.0, 0, function () { ilfPlant(K, 1.2, { pot: M.stoneD }); });
K.at(W / 2 - 0.8, 0, back + 5.4, 0, function () { ilfPlant(K, 1.1, { pot: M.stoneD, seed: 2 }); });
if (!lite) {
K.at(-W / 2 + 0.8, 0, back + 5.4, 0, function () { ilfFlowers(K, 0, 0, 0, { vase: M.stone }); K.box(0.4, 0.7, 0.4, M.stone, 0, 0, 0); });
[-1, 1].forEach(function (s) { K.at(s * (W / 2 - IN), 0, front - 1.4 - bay * 0.1, -s * Math.PI / 2, function () { ilfTapestry(K, 1.2, 2.2, 1.4, s > 0 ? 1 : 4, s > 0 ? "#5A1A22" : "#1E2A4A"); }); });
}
K.done();
ilfRoom(I, "nave", -W / 2, W / 2, back, front, seats);
return K;
},
function (lines, key) {
return ilfCanvasTex("wb" + key, 512, 160, function (g, w, h) {
g.clearRect(0, 0, w, h);
g.textAlign = "left";
g.textBaseline = "top";
lines.forEach(function (l, i) { g.fillStyle = i === 0 ? "#1E3A8A" : (i === 1 ? "#2A2A2A" : "#B83A2A"); g.font = (i === 0 ? "bold 34px" : "28px") + " 'Comic Sans MS','Segoe Print',cursive"; g.fillText(l, 18, 8 + i * 48); });
});
},
function (K, x0, x1, z, y) {
var M = ilfMats(), C = [M.red, M.yellow, M.blue, M.green, M.orange, M.purple], n = Math.floor(Math.abs(x1 - x0) / 0.35);
for (var i = 0; i < n; i++) {
var t = i / (n - 1), x = x0 + (x1 - x0) * t, sag = Math.sin(t * Math.PI) * 0.35;
K.geo(ilfCone(3), C[i % 6], x, y - sag - 0.12, z, 0.24, 0.24, 0.02, 0, Math.PI, 0);
}
K.boxc(Math.abs(x1 - x0), 0.01, 0.01, M.white, (x0 + x1) / 2, y - 0.18, z);
},
function (K, r) {
var M = ilfMats(), cx = (r.x0 + r.x1) / 2, cz = (r.z0 + r.z1) / 2, side = r.side, ow = side ? r.x1 : r.x0, inn = side ? r.x0 : r.x1, inw = side ? -1 : 1;
var gi = EDU_GRADES.indexOf(r.grade), el = gi < 6, small = gi < 3, sub = r.subj || "ela", band = el ? "el" : "hs";
var B = (ILF_BOARD[sub] || ILF_BOARD.ela)[band];
K.plane(1.56, 0.86, ilfTexMat(ilfBoardTex((r.ci || 0) % 4)), cx, 1.55, r.z1 - 0.17, Math.PI);
var P = ILF_POSTERS[sub] || ILF_POSTERS.ela;
[r.z0 + 1.6, r.z0 + 3.4].forEach(function (z, i) { K.at(inn - inw * 0.12, 0, z, -inw * Math.PI / 2, function () { ilfPoster(K, P[i], 0.95, 1.3); }); });
if (el)
K.at(inn - inw * 0.12, 0, r.z0 + 5.3, -inw * Math.PI / 2, function () { ilfPoster(K, "kind", 0.8, 1.4); });
if (!K.lite)
[-2.2, 0.4, 2.6].forEach(function (o, i) { K.at(ow + inw * 0.25, 0.98, cz + o, 0, function () { ilfPlant(K, 0.35, { seed: i + (r.ci || 0) }); }); });
if (el && !K.lite) {
ilfBunting(K, r.x0 + 0.6, r.x1 - 0.6, r.z0 + 3, 3.4);
ilfBunting(K, r.x0 + 0.6, r.x1 - 0.6, r.z0 + 6, 3.4);
}
if (sub === "sci" && !K.lite) {
[0xF8C830, 0x3A7AD8, 0xD85A3A, 0xD8B88A].forEach(function (c, i) { K.boxc(0.006, 0.6, 0.006, M.white, cx - 1.5 + i, 3.3, cz); K.sph(0.12 + (i === 0 ? 0.08 : 0), ilfM(c), cx - 1.5 + i, 3.0, cz); });
}
},
function (K, h) {
var M = ilfMats(), xc = h.xc, zE = h.z0, el = h.el, gi = EDU_GRADES.indexOf(h.grade);
var col = [M.red, M.blue, M.green, M.purple, M.orange, M.yellow][gi % 6];
for (var z = -5; z > zE + 2; z -= 6) {
K.boxc(3.8, 0.02, 0.02, M.white, xc, 3.2, z);
for (var p = 0; p < 9; p++)
K.geo(ilfCone(3), p % 2 ? col : M.white, xc - 1.7 + p * 0.42, 3.05, z, 0.3, 0.3, 0.02, 0, Math.PI, 0);
}
if (!el) {
[0, 1].forEach(function (side) {
var x = side ? xc + 2 - 0.12 : xc - 2 + 0.12, ry = side ? -Math.PI / 2 : Math.PI / 2;
for (var z2 = -4; z2 > zE + 2; z2 -= 8) {
var nearDoor = EDU_ROOMS.some(function (r) { return r.hall === h.id && r.side === side && Math.abs(r.door.z - z2) < 1.4; });
if (nearDoor)
continue;
K.at(x, 0, z2, ry, function () { ilfPoster(K, ["read", "kind", "world", "math", "planets", "arts"][((-z2) | 0) % 6], 0.8, 2.15); });
}
});
}
else {
[0, 1].forEach(function (side) {
var x = side ? xc + 2 - 0.12 : xc - 2 + 0.12, ry = side ? -Math.PI / 2 : Math.PI / 2;
for (var z3 = -9; z3 > zE + 2; z3 -= 8) {
K.at(x, 0, z3, ry, function () { K.plane(1.8, 0.9, ilfTexMat(ilfBoardTex(((-z3) | 0) % 4)), 0, 2.2, 0.02, 0); });
}
});
}
K.at(xc, 0, zE + 0.5, 0, function () { ilfPlant(K, 1.3, { seed: gi }); });
},
function (I) {
var Sd = I.school;
if (!Sd || typeof EDU_ROOMS === "undefined")
return;
try {
ilfSchoolFurniture(I);
}
catch (e) {
if (window.console)
console.warn("[interior-life] furniture", e);
}
try {
ilfSchoolSurfaces(I);
}
catch (e) {
if (window.console)
console.warn("[interior-life] surfaces", e);
}
var M = ilfMats(), lite = ilfLite();
Sd.ilfHalls = {};
if (typeof eduHallDress === "function" && !ILF.eduWrapped) {
ILF.eduWrapped = 1;
var hd = eduHallDress;
eduHallDress = function (h) { var r = hd.apply(this, arguments); try {
ilfSchoolHallBuild(h);
}
catch (e) {
if (window.console)
console.warn("[interior-life] hall", e);
} return r; };
}
var K = ilfCtx(I, "school core"), R = function (id) { return EDU_ROOM[id]; }, s;
(function () {
var r = R("atrium");
if (!r)
return;
s = [];
for (var i = 0; i < 6; i++)
K.at(-11.88, 0, 8 + i * 5.5, Math.PI / 2, function () { K.plane(1.2, 2.6, ilfTexMat(ilfTapestryTex(2, ["#1E3A6A", "#8A1E22"][i % 2])), 0, 4.2, 0.02, 0); });
for (var j = 0; j < 6; j++)
K.at(11.88, 0, 8 + j * 5.5, -Math.PI / 2, function () { if (j !== 2 && j !== 3)
K.plane(1.2, 2.6, ilfTexMat(ilfTapestryTex(2, ["#8A1E22", "#1E3A6A"][j % 2])), 0, 4.2, 0.02, 0); });
[10, 20, 46].forEach(function (z, i) {
[-1, 1].forEach(function (sd) {
K.at(sd * 9.6, 0, z, 0, function () {
K.box(1.4, 0.6, 1.4, M.oak, 0, 0, 0);
K.box(1.3, 0.04, 1.3, M.soil, 0, 0.58, 0);
K.cyl(0.07, 1.8, ilfM(0x5A4030, { map: "wood" }), 0, 0.6, 0, 7);
for (var b = 0; b < 6; b++) {
var a = b * 1.05 + i;
K.sph(0.55, b % 2 ? M.leaf : M.leafD, Math.cos(a) * 0.45, 2.2 + ((b * 3) % 4) * 0.18, Math.sin(a) * 0.45, 1, 0.8, 1, 8);
}
K.sph(0.6, M.leaf, 0, 2.75, 0, 1, 0.8, 1, 8);
K.solid(0, 0, 0.7, 0.7, 0.6);
});
});
});
K.at(11.88, 0, 30, -Math.PI / 2, function () { ilfBoard(K, 3.2, 1.6, 1.2, ilfBoardTex(1)); });
s.push({ x: -6.5, z: 40, ry: 0, sit: 1, who: "child", must: 1 }, { x: 5.5, z: 16, ry: Math.PI, sit: 1, who: "teacher" }, { x: 6.5, z: 16, ry: Math.PI, sit: 1, who: "child" });
for (var k = 0; k < 6; k++) {
var a = k * 1.05;
s.push({ x: Math.sin(a) * 6.5, z: 28 + Math.cos(a) * 9, ry: a + Math.PI, who: k % 3 ? "child" : "teacher" });
}
ilfRoom(I, "atrium", r.x0, r.x1, r.z0, r.z1, s, { max: lite ? 2 : 6 });
})();
(function () {
var r = R("library");
if (!r)
return;
s = [];
K.at(-43.85, 0, 18.5, Math.PI / 2, function () { ilfPoster(K, "read", 1.4, 2.0); });
[[-22, 8], [-22, 14], [-16, 8], [-16, 14]].forEach(function (q, i) {
s.push({ x: q[0] - 0.6, z: q[1] + 1.0, ry: Math.PI, sit: 1, who: "child" }, { x: q[0] + 0.6, z: q[1] - 1.0, ry: 0, sit: 1, who: i % 2 ? "child" : "teacher" });
ilfOpenBook(K, q[0] - 0.5, 0.76, q[1] + 0.3, 0.2);
ilfBookStack(K, q[0] + 0.5, 0.76, q[1] - 0.2, 3);
});
K.at(-19, 0, 11, 0, function () { ilfRug(K, 9, 9.5, 3); });
[[-22, 8], [-22, 14], [-16, 8], [-16, 14]].forEach(function (q) {
K.cyl(0.07, 0.02, M.brass, q[0] + 0.7, 0.77, q[1], 10);
K.cyl(0.012, 0.32, M.brass, q[0] + 0.7, 0.77, q[1], 6);
K.boxc(0.36, 0.1, 0.14, ilfM(0x1E5A3A, { shine: 70 }), q[0] + 0.7, 1.1, q[1], 0, 0.25, 0);
K.sph(0.03, M.flameCore, q[0] + 0.7, 1.05, q[1]);
});
K.at(-26.5, 0, 20, 0, function () { ilfGlobe(K); });
K.at(-36.5, 0, 21.5, 0, function () {
[-1, 1].forEach(function (sd) { K.at(sd * 1.0, 0, 0, -sd * 0.5, function () { K.box(0.9, 0.42, 0.85, M.velvetG, 0, 0, 0); K.box(0.9, 0.5, 0.2, M.velvetG, 0, 0.42, -0.33); K.box(0.16, 0.25, 0.85, M.velvetG, -0.37, 0.42, 0); K.box(0.16, 0.25, 0.85, M.velvetG, 0.37, 0.42, 0); }); });
K.cyl(0.25, 0.55, M.walnut, 0, 0, -0.6, 10);
ilfBookStack(K, 0, 0.55, -0.6, 2);
K.cyl(0.015, 1.5, M.brass, 0, 0, -1.2, 6);
K.cone(0.25, 0.3, ilfM(0xE8D8B0, { glow: 1 }), 0, 1.4, -1.2, 10);
K.lamp(0, 1.3);
});
[[-12.8, 3], [-12.8, 33], [-43.2, 3], [-43.2, 18]].forEach(function (q, i) { K.at(q[0], 0, q[1], 0, function () { ilfPlant(K, 1.3, { seed: i }); }); });
s.push({ x: -37.5, z: 21.5, ry: 0.5, sit: 1, who: "child", y: 0.05 }, { x: -35.5, z: 21.5, ry: -0.5, sit: 1, who: "teacher", y: 0.05 });
s.push({ x: -30, z: 29.2, ry: 0.3, sit: 1, who: "child", y: 0.1, must: 1 }, { x: -36.5, z: 32.2, ry: Math.PI, sit: 1, who: "child" }, { x: -18, z: 22.9, ry: 0, who: "teacher", must: 1 });
ilfRoom(I, "library", r.x0, r.x1, r.z0, r.z1, s, { max: lite ? 2 : 7 });
})();
(function () {
var r = R("cafeteria");
if (!r)
return;
s = [];
var rr = ilfRng("caf");
for (var ct = 0; ct < 3; ct++)
for (var cr = 0; cr < 4; cr++) {
var tx = 16 + ct * 5.6, tz = 5 + cr * 5.5;
for (var zz = tz - 1.3; zz <= tz + 1.31; zz += 1.3) {
if (rr() < 0.35)
continue;
[-0.33, 0.33].forEach(function (o) { K.box(0.3, 0.02, 0.42, ilfM(0xC8C8C0), tx + o, 0.74, zz); K.sph(0.06, M.food[(rr() * 6) | 0], tx + o, 0.79, zz - 0.05, 1.2, 0.5, 1); K.cyl(0.03, 0.1, ilfM(0xF4F4F0), tx + o, 0.76, zz + 0.12, 8); });
s.push({ x: tx - 0.95, z: zz, ry: Math.PI / 2, sit: 1, who: "child" }, { x: tx + 0.95, z: zz, ry: -Math.PI / 2, sit: 1, who: "child" });
}
}
s.push({ x: 32.2, z: 14, ry: -Math.PI / 2, who: "teacher", must: 1 });
ilfRoom(I, "cafeteria", r.x0, r.x1, r.z0, r.z1, s, { max: lite ? 3 : 9 });
})();
(function () {
var r = R("gym");
if (!r)
return;
s = [];
for (var i = 0; i < 6; i++)
K.at(-40 + i * 9, 0, -39.88, 0, function () { K.plane(2, 3, ilfTexMat(ilfTapestryTex(1 + i % 4, ["#1E3A6A", "#8A1E22", "#2A5A32", "#C8963A"][i % 4])), 0, 5.6, 0.02, 0); });
s.push({ x: -20, z: -20, ry: 0.5, who: "child", must: 1 }, { x: -14, z: -16, ry: -2.6, who: "child", must: 1 }, { x: -24, z: -12, ry: 1.6, who: "child" }, { x: -6, z: -24, ry: -1, who: "teacher" });
ilfRoom(I, "gym", r.x0, r.x1, r.z0, r.z1, s, { max: lite ? 2 : 5 });
})();
(function () {
var r = R("auditorium");
if (!r)
return;
s = [];
var ra = ilfRng("aud");
for (var ar = 1; ar < 10; ar++) {
var az = -38 + ar * 2.2;
[[12, 18], [20, 34], [36, 42]].forEach(function (q) { for (var x = q[0] + 0.4; x < q[1]; x += 0.62) {
if (ra() < 0.8)
continue;
s.push({ x: x, z: az, ry: Math.PI, sit: 1, who: ra() < 0.75 ? "child" : "teacher" });
} });
}
ilfRoom(I, "auditorium", r.x0, r.x1, r.z0, r.z1, s, { max: lite ? 3 : 9 });
})();
(function () {
var r = R("lounge");
if (!r)
return;
s = [{ x: 56.8, z: 13, ry: 0, sit: 1, who: "teacher", must: 1 }, { x: 59.2, z: 15, ry: Math.PI, sit: 1, who: "teacher" }, { x: 62, z: 28.6, ry: Math.PI, who: "teacher" }];
K.at(65.85, 0, 16, -Math.PI / 2, function () { ilfBoard(K, 2.4, 1.2, 1.2, ilfBoardTex(3)); });
for (var c = 0; c < 3; c++) {
K.cyl(0.04, 0.1, ilfM(0xF4F0E8, { shine: 40 }), 56.8 + c * 1.2, 0.76, 13.6, 10);
K.box(0.24, 0.03, 0.32, M.paper, 57.4 + c * 1.2, 0.76, 14.4, 0.3);
}
ilfRoom(I, "lounge", r.x0, r.x1, r.z0, r.z1, s, { max: lite ? 2 : 3 });
})();
(function () {
var r = R("corridor");
if (!r)
return;
s = [];
for (var x = -160; x <= 190; x += 25)
s.push({ x: x, z: (x % 50 ? 0.8 : -0.8), ry: (x % 50 ? Math.PI / 2 : -Math.PI / 2), who: Math.abs(x) % 3 ? "child" : "teacher" });
ilfRoom(I, "corridor", r.x0, r.x1, r.z0, r.z1, s, { max: lite ? 2 : 5 });
})();
K.done();
},
function (h) {
var I = INT, Sd = I && I.school;
if (!Sd || !Sd.ilfHalls || Sd.ilfHalls[h.id])
return;
var K = ilfCtx(I, "school " + h.id);
ilfSchoolHall(K, h);
EDU_ROOMS.forEach(function (r) { if (r.hall === h.id && r.kind === "class")
ilfSchoolClass(K, r); });
K.done();
Sd.ilfHalls[h.id] = K.g;
var set = Sd.sets && Sd.sets[h.id];
if (set && set.push)
set.push(K.g);
},
function (I) {
var mat = null;
I.root.traverse(function (o) { if (!mat && o.isInstancedMesh && /^school /.test(o.name || "") && o.material && o.material.isMeshLambertMaterial && !o.material.transparent)
mat = o.material; });
if (mat)
ilfSchoolSurfaceMat(mat);
I.root.traverse(function (m) {
var mt = m.material;
if (!m.isMesh || m.isInstancedMesh || m.userData.ilf || !mt || Array.isArray(mt) || !mt.isMeshLambertMaterial || mt.map || !mt.vertexColors || mt.transparent)
return;
if (!m.geometry.boundingBox)
m.geometry.computeBoundingBox();
var bs = m.geometry.boundingBox;
if (Math.max(bs.max.x - bs.min.x, bs.max.z - bs.min.z) < 4)
return;
if (!mt.userData.ilfSurf) {
var c = mt.clone();
c.userData = Object.assign({}, mt.userData);
ilfSchoolSurfaceMat(c);
m.material = c;
}
});
},
function (mat) {
if (!mat || mat.userData.ilfSurf)
return;
mat.userData.ilfSurf = 1;
var prev = mat.onBeforeCompile, has = prev && prev !== THREE.Material.prototype.onBeforeCompile;
mat.onBeforeCompile = function (sh, r) {
if (has)
prev.call(this, sh, r);
sh.vertexShader = sh.vertexShader.replace("#include <common>", "#include <common>\nvarying vec3 vIlfW; varying vec3 vIlfN; varying vec3 vIlfS;")
.replace("#include <project_vertex>", "#include <project_vertex>\n vec4 ilfP=vec4(transformed,1.0); vec3 ilfNo=normal; vIlfS=vec3(1.0);\n#ifdef USE_INSTANCING\n ilfP=instanceMatrix*ilfP; ilfNo=mat3(instanceMatrix)*ilfNo; vIlfS=vec3(length(instanceMatrix[0].xyz),length(instanceMatrix[1].xyz),length(instanceMatrix[2].xyz));\n#endif\n vIlfW=(modelMatrix*ilfP).xyz; vIlfN=normalize(mat3(modelMatrix)*ilfNo);");
sh.fragmentShader = sh.fragmentShader.replace("#include <common>", "#include <common>\nvarying vec3 vIlfW; varying vec3 vIlfN; varying vec3 vIlfS;\n" +
"float ilfH(vec2 p){ return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453); }\n" +
"float ilfNz(vec2 p){ vec2 i=floor(p), f=fract(p); f=f*f*(3.0-2.0*f); return mix(mix(ilfH(i),ilfH(i+vec2(1,0)),f.x),mix(ilfH(i+vec2(0,1)),ilfH(i+vec2(1,1)),f.x),f.y); }\n" +
"float ilfLine(float v,float w){ float d=abs(fract(v)-0.5); return smoothstep(0.5-w,0.5-w*0.4,d); }\n" +
"float ilfSurf(vec3 c){ vec3 n=normalize(vIlfN), p=vIlfW; float m=1.0;\n" +
" if(n.y>0.7&&p.y<0.35){\n" +
"  if(c.r>c.g+0.1&&c.g>c.b+0.1&&c.r>0.5){ vec2 q=vec2(p.x/0.14,p.z/2.4+floor(p.x/0.14)*0.37); vec2 id=floor(q); m=0.8+0.28*ilfH(id)+0.12*(ilfNz(vec2(p.x*70.0,p.z*1.5+id.x*3.0))-0.5)+0.05*(ilfNz(vec2(p.x*12.0,p.z*0.6))-0.5); m*=1.0-0.35*ilfLine(q.x,0.05)-0.3*ilfLine(q.y,0.006); }\n" +
"  else if((max(c.r,max(c.g,c.b))-min(c.r,min(c.g,c.b)))>0.2*max(c.r,max(c.g,c.b))){ m=0.9+0.12*ilfNz(p.xz*40.0)+0.06*ilfNz(p.xz*3.0); }\n" +
"  else { vec2 q=p.xz/0.6; m=0.93+0.1*ilfH(floor(q))+0.05*(ilfNz(p.xz*9.0)-0.5); m*=1.0-0.22*max(ilfLine(q.x,0.02),ilfLine(q.y,0.02)); }\n" +
" } else if(n.y<-0.7&&p.y>2.2){ vec2 q=p.xz/0.6; m=0.95+0.07*ilfNz(p.xz*60.0); m*=1.0-0.3*max(ilfLine(q.x,0.025),ilfLine(q.y,0.025)); }\n" +
" else if(abs(n.y)<0.3&&vIlfS.y>2.0){ float u=abs(n.x)>0.5?p.z:p.x; vec2 q=vec2(u/0.4+floor(p.y/0.2)*0.5,p.y/0.2); m=0.96+0.05*ilfH(floor(q))+0.04*(ilfNz(vec2(u,p.y)*30.0)-0.5); m*=1.0-0.1*max(ilfLine(q.x,0.03),ilfLine(q.y,0.05)); m*=0.9+0.1*smoothstep(0.0,1.2,p.y); }\n" +
" else { m=0.95+0.08*ilfNz((p.xz+p.y)*12.0); }\n" +
" return m; }")
.replace("#include <color_fragment>", "#include <color_fragment>\n#ifdef USE_COLOR\n diffuseColor.rgb*=ilfSurf(vColor);\n#else\n diffuseColor.rgb*=ilfSurf(diffuseColor.rgb);\n#endif");
};
var pk = mat.customProgramCacheKey, defK = THREE.Material.prototype.customProgramCacheKey;
mat.customProgramCacheKey = function () { return "ilfSchoolSurf|" + (pk === defK ? (has ? prev.toString() : "") : pk.call(this)); };
mat.needsUpdate = true;
},
function (I) {
var vmat = new THREE.MeshLambertMaterial({ color: 0xFFFFFF, vertexColors: true });
vmat.userData.ilfSchoolV = 1;
var mtx = new THREE.Matrix4(), P = new THREE.Vector3(), Q = new THREE.Quaternion(), Sc = new THREE.Vector3(), E = new THREE.Euler(), zero = new THREE.Matrix4().makeScale(0, 0, 0), col = new THREE.Color(), made = 0;
I.root.children.slice().forEach(function (im) {
if (!im.isInstancedMesh || !/^school /.test(im.name || "") || /lights|windows|glass/.test(im.name) || !im.instanceColor)
return;
var parts = [];
function part(w, h, d, x, y, z, ry, c) { parts.push([w, h, d, x, y, z, ry, c]); }
for (var i = 0; i < im.count; i++) {
im.getMatrixAt(i, mtx);
mtx.decompose(P, Q, Sc);
E.setFromQuaternion(Q, "YXZ");
var ry = E.y, w = Sc.x, h = Sc.y, d = Sc.z, bot = P.y - h / 2;
if (Math.abs(E.x) > 0.01 || Math.abs(E.z) > 0.01)
continue;
im.getColorAt(i, col);
var c = col.getHex();
var cs = Math.cos(ry), sn = Math.sin(ry);
function at(lx, lz) { return [P.x + lx * cs + lz * sn, P.z - lx * sn + lz * cs]; }
var kind = null;
if (Math.abs(bot) < 0.04 && h >= 0.68 && h <= 0.8 && Math.min(w, d) >= 0.7 && Math.max(w, d) <= 4.2)
kind = "table";
else if (Math.abs(bot) < 0.04 && h >= 0.38 && h <= 0.5 && Math.min(w, d) >= 0.28 && Math.min(w, d) <= 0.55 && Math.max(w, d) >= 1.0 && Math.max(w, d) <= 4.2)
kind = "bench";
else if (Math.abs(bot - 0.02) < 0.02 && Math.abs(h - 0.7) < 0.03 && Math.min(w, d) >= 0.4)
kind = "pedestal";
if (!kind)
continue;
im.setMatrixAt(i, zero);
made++;
var lg = kind === "bench" ? 0.05 : 0.055, top = kind === "table" ? 0.05 : (kind === "bench" ? 0.05 : 0), H = kind === "pedestal" ? h + 0.02 : h, ix = w / 2 - lg * 1.4, iz = d / 2 - lg * 1.4;
var legC = kind === "pedestal" ? c : (kind === "table" ? 0x6A6E74 : 0x4A4E54);
if (top)
part(w, top, d, P.x, H - top, P.z, ry, c);
[[-ix, -iz], [ix, -iz], [-ix, iz], [ix, iz]].forEach(function (q) { var a = at(q[0], q[1]); part(lg, H - top - (kind === "pedestal" ? 0.02 : 0), lg, a[0], kind === "pedestal" ? 0.02 : 0, a[1], ry, legC); });
var rl = kind === "pedestal" ? 0.02 : 0;
part(w - lg * 2.4, 0.07, 0.025, at(0, -iz)[0], H - top - 0.08 - rl, at(0, -iz)[1], ry, legC);
part(w - lg * 2.4, 0.07, 0.025, at(0, iz)[0], H - top - 0.08 - rl, at(0, iz)[1], ry, legC);
part(0.025, 0.07, d - lg * 2.4, at(-ix, 0)[0], H - top - 0.08 - rl, at(-ix, 0)[1], ry, legC);
part(0.025, 0.07, d - lg * 2.4, at(ix, 0)[0], H - top - 0.08 - rl, at(ix, 0)[1], ry, legC);
if (Math.max(w, d) > 2.2) {
var lx = w > d;
part(lx ? w - lg * 2.4 : 0.03, 0.03, lx ? 0.03 : d - lg * 2.4, P.x, 0.12, P.z, ry, legC);
}
}
if (!parts.length)
return;
im.instanceMatrix.needsUpdate = true;
var box = new THREE.BoxGeometry(1, 1, 1).toNonIndexed(), bp = box.attributes.position, bn = box.attributes.normal, n = bp.count;
var pos = new Float32Array(parts.length * n * 3), nor = new Float32Array(parts.length * n * 3), cl = new Float32Array(parts.length * n * 3), m = new THREE.Matrix4(), nm = new THREE.Matrix3(), v = new THREE.Vector3(), cc = new THREE.Color();
parts.forEach(function (p, k) {
m.compose(new THREE.Vector3(p[3], p[4] + p[1] / 2, p[5]), new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), p[6]), new THREE.Vector3(p[0], p[1], p[2]));
nm.getNormalMatrix(m);
cc.setHex(p[7]);
for (var j = 0; j < n; j++) {
var o = (k * n + j) * 3;
v.fromBufferAttribute(bp, j).applyMatrix4(m);
pos[o] = v.x;
pos[o + 1] = v.y;
pos[o + 2] = v.z;
v.fromBufferAttribute(bn, j).applyMatrix3(nm).normalize();
nor[o] = v.x;
nor[o + 1] = v.y;
nor[o + 2] = v.z;
cl[o] = cc.r;
cl[o + 1] = cc.g;
cl[o + 2] = cc.b;
}
});
box.dispose();
var g = new THREE.BufferGeometry();
g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
g.setAttribute("normal", new THREE.BufferAttribute(nor, 3));
g.setAttribute("color", new THREE.BufferAttribute(cl, 3));
g.computeBoundingSphere();
var mesh = new THREE.Mesh(g, vmat);
mesh.name = "ilf school furniture";
mesh.userData.ilf = 1;
mesh.matrixAutoUpdate = false;
mesh.updateMatrix();
im.add(mesh);
});
ilfSchoolSurfaceMat(vmat);
return made;
},
function (v) {
return ilfCanvasTex("tile" + v, 256, 256, function (g, w, h) {
var C = [["#F2EEE4", "#1E4A8A", "#2E7AA8", "#C8A040"], ["#F4F0E8", "#1E6A6A", "#2E4A8A", "#B83A2A"]][v % 2];
g.fillStyle = C[0];
g.fillRect(0, 0, w, h);
for (var y = 0; y < 2; y++)
for (var x = 0; x < 2; x++) {
var cx = x * 128 + 64, cy = y * 128 + 64;
g.save();
g.translate(cx, cy);
g.fillStyle = C[1];
g.fillRect(-40, -40, 80, 80);
g.rotate(Math.PI / 4);
g.fillRect(-40, -40, 80, 80);
g.rotate(-Math.PI / 4);
g.fillStyle = C[0];
g.beginPath();
g.arc(0, 0, 26, 0, 7);
g.fill();
g.fillStyle = C[2];
for (var p = 0; p < 8; p++) {
g.rotate(Math.PI / 4);
g.beginPath();
g.ellipse(0, -14, 6, 12, 0, 0, 7);
g.fill();
}
g.fillStyle = C[3];
g.beginPath();
g.arc(0, 0, 6, 0, 7);
g.fill();
g.restore();
}
g.fillStyle = C[2];
[[0, 0], [128, 0], [0, 128], [128, 128], [256, 0], [0, 256], [256, 256], [256, 128], [128, 256]].forEach(function (q) { g.beginPath(); g.arc(q[0], q[1], 14, 0, 7); g.fill(); });
g.strokeStyle = "rgba(0,0,0,0.18)";
g.lineWidth = 2;
for (var k = 0; k <= 256; k += 64) {
g.beginPath();
g.moveTo(k, 0);
g.lineTo(k, 256);
g.moveTo(0, k);
g.lineTo(256, k);
g.stroke();
}
}, true);
},
function () {
return ilfCanvasTex("prayer", 512, 256, function (g, w, h, r) {
g.fillStyle = "#7A1A20";
g.fillRect(0, 0, w, h);
for (var i = 0; i < 4; i++) {
var x = i * 128;
g.fillStyle = "#9A2A2A";
g.fillRect(x + 8, 16, 112, 224);
g.fillStyle = "#5A1218";
g.beginPath();
g.moveTo(x + 20, 236);
g.lineTo(x + 20, 90);
g.quadraticCurveTo(x + 20, 40, x + 64, 24);
g.quadraticCurveTo(x + 108, 40, x + 108, 90);
g.lineTo(x + 108, 236);
g.closePath();
g.fill();
g.strokeStyle = "#D8B060";
g.lineWidth = 4;
g.stroke();
g.fillStyle = "#2A4A6A";
g.beginPath();
g.arc(x + 64, 120, 18, 0, 7);
g.fill();
g.fillStyle = "#D8B060";
g.beginPath();
g.arc(x + 64, 120, 7, 0, 7);
g.fill();
g.strokeStyle = "rgba(216,176,96,0.6)";
g.lineWidth = 2;
g.strokeRect(x + 12, 20, 104, 216);
for (var k = 0; k < 14; k++) {
g.fillStyle = "rgba(0,0,0," + (r() * 0.08) + ")";
g.fillRect(x + r() * 120, r() * 256, 2 + r() * 8, 1 + r() * 3);
}
}
g.fillStyle = "#D8B060";
g.fillRect(0, 0, w, 6);
g.fillRect(0, h - 6, w, 6);
}, true);
},
function (day) {
return ilfCanvasTex("lattice" + (day ? 1 : 0), 256, 256, function (g, w, h) {
g.fillStyle = day ? "#F8E8B8" : "#2A3048";
g.fillRect(0, 0, w, h);
g.strokeStyle = "#C8B898";
g.lineWidth = 7;
for (var y = 0; y <= 256; y += 64)
for (var x = 0; x <= 256; x += 64) {
g.save();
g.translate(x, y);
g.strokeRect(-22, -22, 44, 44);
g.rotate(Math.PI / 4);
g.strokeRect(-22, -22, 44, 44);
g.restore();
}
g.lineWidth = 4;
for (var k = 0; k <= 256; k += 32) {
g.beginPath();
g.moveTo(k, 0);
g.lineTo(k - 256, 256);
g.moveTo(k, 0);
g.lineTo(k + 256, 256);
g.stroke();
}
}, false);
},
function (K, y, top, r, n) {
var M = ilfMats(), glass = [M.glassG, M.glassB, M.glassR, M.glassA];
K.cyl(0.012, Math.max(0.05, top - y - 0.2), M.iron, 0, y + 0.2, 0, 5);
K.ring(r, 0.03, M.brass, 0, y, 0, 0, Math.PI / 2);
for (var i = 0; i < n; i++) {
var a = i / n * Math.PI * 2, x = Math.cos(a) * r, z = Math.sin(a) * r;
K.cyl(0.006, 0.5, M.iron, x, y, z, 4);
K.turned(0.08, 0.2, glass[i % 4], x, y - 0.22, z);
K.sph(0.035, M.flameCore, x, y - 0.12, z);
}
if (!K.lite)
K.lamp(0, y - 0.2);
},
function (I) {
var M = ilfMats(), W = I.W, D = I.D, H = I.ceilH || 4, day = ilfDayNow(), lite = ilfLite(), IN = 0.14, back = -D / 2, front = D / 2, seats = [];
ilfClearFurn(I, { rug: 1, table: 1, lamp: 1, chair: 1, sofa: 1, plant: 1, tv: 1, desk: 1, bookshelf: 1, bed: 1, chandelier: 1, candles: 1, pew: 1, altarinside: 1, pulpit: 1, runner: 1 });
ilfStoneWalls(I, { wall: 0xE8E0CE, map: "plaster", ceil: 0x6A4A2A });
var K = ilfCtx(I, "mosque");
var ct = ilfPrayerTex(), cm = ilfTexMat(ct);
ct.repeat.set(Math.max(1, Math.round((W - 1) / 2.4)), Math.max(1, Math.round((D - 4) / 1.3)));
K.plane(W - 0.6, D - 3.4, cm, 0, 0.012, back + 0.3 + (D - 3.4) / 2, 0, -Math.PI / 2);
var tm = ilfTexMat(ilfTileTex(0)), tm2 = ilfTexMat(ilfTileTex(1));
[-1, 1].forEach(function (s) { for (var z = back + 0.5; z < front - 0.5; z += 1.2)
K.at(s * (W / 2 - IN), 0, z + 0.6, -s * Math.PI / 2, function () { K.plane(1.2, 1.2, tm, 0, 0.7, 0.01, 0); }); });
for (var x = -W / 2 + 0.6; x < W / 2 - 0.6; x += 1.2) {
K.at(x + 0.6, 0, back + IN, 0, function () { K.plane(1.2, 1.2, tm, 0, 0.7, 0.01, 0); });
}
K.box(W - 0.3, 0.08, 0.06, M.gold, 0, 1.32, back + IN + 0.02);
K.at(0, 0, back + IN, 0, function () {
K.box(3.4, 0.12, 0.3, M.marble, 0, 0, 0.1);
K.shape(ilfHorseshoe(), 2.6, 4.0, ilfM(0x1E3A6A), 0, 2.1, 0.015);
K.shape(ilfHorseshoe(), 2.2, 3.5, tm2, 0, 1.95, 0.025);
K.shape(ilfHorseshoe(), 1.4, 2.6, ilfM(0x14284A), 0, 1.6, 0.035);
K.geo(ilfTor(Math.PI + 0.4, 24), M.gold, 0, 2.6, 0.04, 2.7, 2.7, 0.5, 0, 0, -0.2);
K.box(0.22, 2.4, 0.24, M.marble, -1.36, 0, 0.1);
K.box(0.22, 2.4, 0.24, M.marble, 1.36, 0, 0.1);
K.box(0.3, 0.16, 0.3, M.gold, -1.36, 2.4, 0.1);
K.box(0.3, 0.16, 0.3, M.gold, 1.36, 2.4, 0.1);
});
[-2.4, 2.4].forEach(function (x) { K.at(x, 0, back + 0.7, 0, function () { K.box(0.3, 1.0, 0.3, M.marble, 0, 0, 0); ilfCandle(K, 0, 1.0, 0.3, 0.06); K.lamp(0, 1.4); }); });
K.at(2.9, 0, back + 2.2, 0, function () {
for (var st = 0; st < 7; st++)
K.box(0.9, 0.22, 0.42, M.oakD, 0, st * 0.22, 1.4 - st * 0.36);
K.box(0.06, 1.0, 2.6, M.walnut, -0.48, 0, 0.4, 0, 0.62, 0);
K.box(0.06, 1.0, 2.6, M.walnut, 0.48, 0, 0.4, 0, 0.62, 0);
K.box(1.0, 1.6, 0.9, M.walnut, 0, 0, -0.95);
K.box(1.0, 0.06, 0.9, M.oakD, 0, 1.6, -0.95);
[-0.45, 0.45].forEach(function (xx) { K.box(0.08, 1.4, 0.08, M.oakD, xx, 1.6, -1.35); K.box(0.08, 1.4, 0.08, M.oakD, xx, 1.6, -0.55); });
K.cone(0.62, 0.9, M.gold, 0, 3.0, -0.95, 8);
K.at(0, 0, -1.4, 0, function () { K.shape(ilfHorseshoe(), 0.7, 1.1, ilfM(0x1E3A6A), 0, 0.9, -0.03); });
K.solid(0, 0.4, 0.55, 1.4, 3.5);
});
var ax = Math.min(W / 2 - 3.2, W * 0.28), bay = Math.max(3.4, (D - 6) / 5);
for (var z = back + 4; z < front - 3; z += bay) {
[-1, 1].forEach(function (s) { K.at(s * ax, 0, z, 0, function () { ilfColumn(K, 0.3, H - 0.05, M.marble); K.solid(0, 0, 0.32, 0.32, H); }); });
if (z + bay < front - 3)
[-1, 1].forEach(function (s) {
K.at(s * ax, 0, z + bay / 2, Math.PI / 2, function () {
var aw = bay - 0.6, ah = Math.min(H - 0.8, aw * 1.1);
K.geo(ilfTor(Math.PI + 0.4, 20), M.stone, 0, H - 0.6 - ah * 0.5 + 0.1, 0, aw, aw * 1.05, 1.6, 0, 0, -0.2);
K.box(bay, 0.6, 0.3, M.stone, 0, H - 0.6, 0);
});
});
}
var lw = ilfTexMat(ilfLatticeTex(day), { glow: 1 });
for (var wz = back + 3; wz < front - 2; wz += bay)
[-1, 1].forEach(function (s) {
K.at(s * (W / 2 - IN), 0, wz, -s * Math.PI / 2, function () {
K.shape(ilfHorseshoe(), 1.3, 2.2, lw, 0, Math.min(H - 1.4, 3.6), 0.02);
K.geo(ilfTor(Math.PI + 0.4, 16), M.stone, 0, Math.min(H - 1.4, 3.6) + 0.4, 0.04, 1.45, 1.5, 0.6, 0, 0, -0.2);
if (day && !lite)
K.plane(1.4, 4.5, ilfTexMat(ilfBeamTex(), { glow: 1, add: 1, op: 0.18, ds: true, col: 0xFFE8C0 }), 0, Math.min(H - 1.4, 3.6) - 0.6, 1.8, 0, -1.0);
});
});
var rows = lite ? 1 : 2, cols = lite ? 2 : 3;
for (var lr = 0; lr < rows; lr++)
for (var lc = 0; lc < cols; lc++) {
var lx = (lc - (cols - 1) / 2) * (W / cols), lz = back + 5 + (lr + 0.5) * (D - 9) / rows;
K.at(lx, 0, lz, 0, function () { ilfLampRing(K, Math.max(2.9, H - 3.4), H, lite ? 0.7 : 1.0, lite ? 8 : 14); });
}
[-1, 1].forEach(function (s) {
for (var z = back + 5; z < front - 4; z += 4.5)
K.at(s * (W / 2 - 1.4), 0, z, -s * Math.PI / 2, function () {
ilfReadingStand(K);
K.box(0.5, 0.12, 0.5, M.velvetB, 0, 0, 0.55);
});
});
[-1, 1].forEach(function (s) {
K.at(s * (W / 2 - IN - 0.2), 0, back + 8, -s * Math.PI / 2, function () {
K.box(2.0, 1.8, 0.36, M.walnut, 0, 0, 0);
for (var sh = 0; sh < 4; sh++) {
K.box(1.9, 0.03, 0.32, M.oakD, 0, 0.1 + sh * 0.44, 0.02);
K.geo(ilfPlane(), ilfTexMat(ilfSpinesTex(sh + s + 2)), 0, 0.33 + sh * 0.44, 0.19, 1.8, 0.38, 1);
}
});
});
[-1, 1].forEach(function (s) {
K.at(s * (W / 2 - 2.2), 0, front - 0.6, Math.PI, function () {
K.box(2.4, 0.9, 0.4, M.oak, 0, 0, 0);
for (var sh = 0; sh < 3; sh++)
K.box(2.3, 0.03, 0.38, M.oakD, 0, 0.05 + sh * 0.3, 0.01);
var rr = ilfRng("shoes" + s);
for (var k = 0; k < 8; k++)
K.box(0.12, 0.08, 0.26, ilfM([0x2A2A2E, 0x5A3A22, 0x8A6A4A, 0x3A3A5A][(rr() * 4) | 0]), -1.0 + k * 0.28, 0.08 + ((k % 3) * 0.3), 0.02);
});
});
K.at(-W / 2 + 0.9, 0, front - 1.5, 0, function () { ilfPlant(K, 1.3, { pot: M.ceramic }); });
K.at(W / 2 - 0.9, 0, front - 1.5, 0, function () { ilfPlant(K, 1.3, { pot: M.ceramic, seed: 3 }); });
K.done();
seats.push({ x: 0, z: back + 2.6, ry: 0, who: "priest", sit: 1, y: 0, must: 1 });
var rr = ilfRng("rows" + W);
for (var row = 0; row < 4; row++)
for (var p = -5; p <= 5; p++) {
if (rr() < 0.55)
continue;
seats.push({ x: p * 0.85, z: back + 4.2 + row * 1.3, ry: 0, sit: 1, who: "worshipper" });
}
seats.push({ x: -(W / 2 - 1.4) + 0.55, z: back + 5, ry: -Math.PI / 2, sit: 1, who: "worshipper", must: 1 });
ilfRoom(I, "prayer hall", -W / 2, W / 2, back, front, seats, { max: lite ? 3 : 9 });
return K;
},
function (I) {
var sp = I.spec || {};
if (I.academy)
return "academy";
if (I.school)
return "school";
if (I.walls && I.W && I.D && typeof planOf === "function") {
var pl = planOf(sp);
if (pl && pl.mode === "hall" && pl.fill === "church")
return "church";
if (pl && pl.mode === "hall" && pl.fill === "mosque")
return "mosque";
if (pl && pl.mode === "hall" && (String(pl.fill || "").indexOf("tr:") === 0 || pl.fill === "court") && (I.winMats || []).length)
return "civic";
}
return null;
},
function (I) {
if (!ILF.on || !I || !I.root || I.ilfDone)
return;
I.ilfDone = 1;
var k = ilfWhich(I);
if (!k)
return;
if (k === "church")
ilfChurch(I, { grand: (planOf(I.spec).w || 0) >= 20 });
else if (k === "civic" && typeof ilfCivic === "function")
ilfCivic(I);
else if (k === "mosque" && typeof ilfMosque === "function")
ilfMosque(I);
else if (k === "academy" && typeof ilfAcademy === "function")
ilfAcademy(I);
else if (k === "school" && typeof ilfSchool === "function")
ilfSchool(I);
},
function (I) {
var M = ilfMats(), day = ilfDayNow(), lite = ilfLite(), sp = I.spec || {}, clinical = ILF_CLINICAL.test(sp.workplace || "");
var hide = {};
(I.winMats || []).forEach(function (m) { hide[m.uuid] = 1; });
var glass = ilfTexMat(ilfLeadedTex(day), { glow: 1 }), K = ilfCtx(I, "civic"), wood = clinical ? M.white : M.oakD, n = 0;
var curt = [M.velvetR, M.velvetG, M.velvetB][ilfHash(sp.id || "x") % 3];
I.root.children.slice().forEach(function (m) {
if (!m.isMesh || !m.material || !hide[m.material.uuid] || m.geometry.type !== "PlaneGeometry")
return;
var p = m.geometry.parameters, w = p.width * (m.scale.x || 1), h = p.height * (m.scale.y || 1);
if (w < 0.4 || h < 0.4)
return;
m.material = glass;
n++;
var y0 = m.position.y - h / 2, ry = m.rotation.y;
K.at(m.position.x, 0, m.position.z, ry, function () {
K.box(w + 0.16, 0.08, 0.06, wood, 0, y0 + h, 0.03);
K.box(w + 0.16, 0.06, 0.06, wood, 0, y0 - 0.06, 0.03);
K.box(0.08, h, 0.06, wood, -w / 2 - 0.04, y0, 0.03);
K.box(0.08, h, 0.06, wood, w / 2 + 0.04, y0, 0.03);
K.box(0.04, h, 0.04, wood, 0, y0, 0.02);
K.box(w, 0.04, 0.04, wood, 0, y0 + h * 0.62, 0.02);
K.box(w + 0.3, 0.05, 0.2, clinical ? M.white : M.stone, 0, y0 - 0.11, 0.1);
if (!lite || n % 2 === 0) {
[-1, 1].forEach(function (s) { K.box(0.32, h + 0.35, 0.06, curt, s * (w / 2 + 0.18), Math.max(0.02, y0 - 0.25), 0.12); });
K.box(w + 0.9, 0.24, 0.1, curt, 0, y0 + h + 0.14, 0.14);
K.box(w + 0.9, 0.03, 0.12, M.brass, 0, y0 + h + 0.38, 0.14);
}
});
});
var H = I.ceilH || 3.2, L = Math.max(1, I.levels || 1), W = I.W, D = I.D, step = lite ? 4.2 : 3.0;
if (H <= 4.2 && W && D)
for (var lv = 0; lv < L; lv++) {
var y = lv * (H + 0.2) + H - 0.17;
for (var z = -D / 2 + step / 2; z < D / 2 - 0.3; z += step)
K.box(W - 0.3, 0.17, 0.2, clinical ? M.white : M.walnut, 0, y, z);
if (!lite && !clinical)
[-1, 1].forEach(function (s) { K.box(0.2, 0.17, D - 0.3, M.walnut, s * (W / 2 - 0.25), y, 0); });
}
K.done();
return n;
}
];
});
