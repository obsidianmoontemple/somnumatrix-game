/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(307, function () {
"use strict";
return [
function () {
if (SHIP_DRESS.sail)
return SHIP_DRESS.sail;
var c = document.createElement("canvas");
c.width = 256;
c.height = 256;
var x = c.getContext("2d");
x.fillStyle = "#D9CFB4";
x.fillRect(0, 0, 256, 256);
var R = rng(hash("sailcloth"));
for (var i = 0; i < 2600; i++) {
var v = 200 + R() * 30 | 0;
x.fillStyle = "rgba(" + v + "," + (v - 8) + "," + (v - 28) + ",0.18)";
x.fillRect(R() * 256, R() * 256, 1 + R() * 3, 1);
}
for (var k = 1; k < 8; k++) {
x.fillStyle = "rgba(120,104,74,0.32)";
x.fillRect(k * 32 - 1, 0, 2, 256);
}
x.strokeStyle = "rgba(96,80,56,0.55)";
x.lineWidth = 6;
x.strokeRect(3, 3, 250, 250);
x.fillStyle = "rgba(150,132,100,0.35)";
x.fillRect(0, 46, 256, 6);
x.fillStyle = "rgba(80,66,46,0.7)";
for (var p = 8; p < 256; p += 16)
x.fillRect(p, 44, 2, 10);
var g = x.createLinearGradient(0, 0, 0, 256);
g.addColorStop(0, "rgba(0,0,0,0)");
g.addColorStop(1, "rgba(90,70,40,0.14)");
x.fillStyle = g;
x.fillRect(0, 0, 256, 256);
var t = new THREE.CanvasTexture(c);
t.anisotropy = 4;
return (SHIP_DRESS.sail = t);
},
function (g) {
var hull = null, sail = null;
g.traverse(function (o) {
if (!o.isMesh)
return;
if (!hull && o.geometry && o.geometry.type === "BoxGeometry" && o.geometry.parameters && o.geometry.parameters.depth === 34)
hull = o;
if (o.geometry && o.geometry.type === "PlaneGeometry" && o.material && o.material.side === THREE.DoubleSide && !o.material.map && o.material.color && o.material.color.getHex() === 0xD8CCB0)
sail = o.material;
});
if (sail) {
sail.map = shipSailTex();
sail.color.setHex(0xFFFFFF);
sail.needsUpdate = true;
}
if (hull) {
var hg = hull.geometry.clone(), P = hg.attributes.position, N = hg.attributes.normal, uv = hg.attributes.uv;
for (var i = 0; i < P.count; i++) {
var nx = Math.abs(N.getX(i)), ny = Math.abs(N.getY(i));
if (ny > 0.7)
uv.setXY(i, P.getX(i), P.getZ(i));
else
uv.setXY(i, P.getZ(i) * (nx > 0.3 ? 1 : 0) + P.getX(i) * (nx > 0.3 ? 0 : 1), P.getY(i));
}
uv.needsUpdate = true;
hull.geometry = hg;
hull.userData.phtSeen = 1;
var wood = texOf("wood");
if (wood) {
var hm = hull.material.clone();
hm.map = wood;
hm.needsUpdate = true;
hull.material = hm;
}
}
function hw(z) { var k = z / 17; return 4.5 * (1 - Math.pow(Math.abs(k), 2.2) * (k > 0 ? 0.85 : 0.45)); }
function top(z) { var k = z / 17; return 4 + Math.pow(Math.abs(k), 2) * 2.2; }
var pts = [], masts = [[-8, 22], [2, 26], [11, 19]];
masts.forEach(function (m) {
var ty = 4 + m[1] * 0.88;
[-1, 1].forEach(function (sd) { for (var k = 0; k < 4; k++) {
var z = m[0] - 1.6 + k * 0.9;
pts.push(0, ty, m[0], sd * hw(z) * 0.96, top(z) + 0.1, z);
} });
});
pts.push(0, 4 + 26 * 0.97, 2, 0, 4 + 22 * 0.97, -8);
pts.push(0, 4 + 26 * 0.97, 2, 0, 4 + 19 * 0.97, 11);
pts.push(0, 4 + 19 * 0.97, 11, 0, 6 + Math.cos(1.15) * 6 + 0.6, 21 + Math.sin(1.15) * 5.4);
pts.push(0, 4 + 22 * 0.97, -8, 0, 7, -16.4);
var lg = new THREE.BufferGeometry();
lg.setAttribute("position", new THREE.Float32BufferAttribute(pts, 3));
var lines = new THREE.LineSegments(lg, new THREE.LineBasicMaterial({ color: 0x2A2016 }));
lines.userData.noPhoto = 1;
g.add(lines);
var post = new THREE.CylinderGeometry(0.06, 0.08, 0.9, 5), pm = new THREE.MeshLambertMaterial({ color: 0x6A4A2A }), list = [];
for (var z = -9.5; z <= 10.5; z += 1.25)
[-1, 1].forEach(function (sd) { list.push([sd * (hw(z) - 0.2), top(z) + 0.45, z]); });
var im = new THREE.InstancedMesh(post, pm, list.length), m4 = new THREE.Matrix4();
list.forEach(function (q, i) { m4.makeTranslation(q[0], q[1], q[2]); im.setMatrixAt(i, m4); });
im.instanceMatrix.needsUpdate = true;
im.userData.noPhoto = 1;
g.add(im);
[-1, 1].forEach(function (sd) {
for (var z = -9.5; z < 10.5; z += 2.5) {
var z2 = z + 2.5, a = [sd * (hw(z) - 0.2), top(z) + 0.92, z], b = [sd * (hw(z2) - 0.2), top(z2) + 0.92, z2];
var len = Math.hypot(b[0] - a[0], b[1] - a[1], b[2] - a[2]), r = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.1, len), pm);
r.position.set((a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2);
r.lookAt(new THREE.Vector3(b[0], b[1], b[2]));
r.userData.phtSeen = 1;
g.add(r);
}
});
[[3.35, 0x9A7A3A, 0.32], [1.9, 0x1E140C, 0.26]].forEach(function (w) {
var wm = new THREE.MeshLambertMaterial({ color: w[1] });
[-1, 1].forEach(function (sd) {
for (var z = -15; z < 15; z += 1.5) {
var z2 = z + 1.5, a = [sd * (hw(z) * (w[0] < 2 ? 0.93 : 1) + 0.04), w[0], z], b = [sd * (hw(z2) * (w[0] < 2 ? 0.93 : 1) + 0.04), w[0], z2];
var len = Math.hypot(b[0] - a[0], b[2] - a[2]) + 0.04, m = new THREE.Mesh(new THREE.BoxGeometry(0.1, w[2], len), wm);
m.position.set((a[0] + b[0]) / 2, w[0], (a[2] + b[2]) / 2);
m.lookAt(new THREE.Vector3(b[0], w[0], b[2]));
m.userData.phtSeen = 1;
g.add(m);
}
});
});
return g;
},
function (key, w, h, paint, ru, rv) {
if (STN_DRESS[key])
return STN_DRESS[key];
var c = document.createElement("canvas");
c.width = w;
c.height = h;
var x = c.getContext("2d");
paint(x, w, h, rng(hash("stn" + key)));
var t = new THREE.CanvasTexture(c);
t.wrapS = t.wrapT = THREE.RepeatWrapping;
t.anisotropy = 4;
if (ru)
t.repeat.set(ru, rv);
return (STN_DRESS[key] = t);
},
function () {
return stnCanvas("wall", 256, 384, function (x, w, h, R) {
x.fillStyle = "#C4CAD3";
x.fillRect(0, 0, w, h);
stnGrain(x, w, h, R, 1800, 0.05);
[[0, 0, 256, 190], [0, 194, 256, 190]].forEach(function (r, i) {
x.fillStyle = "rgba(0,0,0,0.42)";
x.fillRect(r[0], r[1] + r[3] - 3, r[2], 3);
x.fillRect(r[0] + r[2] - 3, r[1], 3, r[3]);
x.fillStyle = "rgba(255,255,255,0.35)";
x.fillRect(r[0], r[1], r[2], 2);
x.fillRect(r[0], r[1], 2, r[3]);
x.strokeStyle = "rgba(60,66,78,0.35)";
x.lineWidth = 2;
x.strokeRect(r[0] + 14, r[1] + 14, r[2] - 28, r[3] - 28);
[[10, 10], [r[2] - 10, 10], [10, r[3] - 10], [r[2] - 10, r[3] - 10]].forEach(function (b) { x.fillStyle = "#7A828E"; x.beginPath(); x.arc(r[0] + b[0], r[1] + b[1], 3, 0, 7); x.fill(); x.fillStyle = "rgba(255,255,255,0.5)"; x.fillRect(r[0] + b[0] - 1, r[1] + b[1] - 2, 2, 1); });
if (i === 1) {
x.fillStyle = "#5A626E";
x.fillRect(70, r[1] + 120, 116, 40);
x.fillStyle = "#2A3038";
for (var k = 0; k < 7; k++)
x.fillRect(76, r[1] + 124 + k * 5, 104, 2);
}
else {
x.fillStyle = "#3A6AB8";
x.fillRect(24, r[1] + 30, 60, 8);
x.fillStyle = "rgba(0,0,0,0.3)";
x.fillRect(150, r[1] + 60, 70, 90);
x.fillStyle = "#B4BAC4";
x.fillRect(152, r[1] + 62, 66, 86);
x.fillStyle = "#6A727E";
x.fillRect(206, r[1] + 100, 6, 14);
}
});
}, 1 / 2, 1 / 3);
},
function () {
return stnCanvas("floor", 256, 256, function (x, w, h, R) {
x.fillStyle = "#3A414D";
x.fillRect(0, 0, w, h);
stnGrain(x, w, h, R, 2400, 0.08);
for (var yy = 6; yy < h; yy += 12)
for (var xx = 6 + ((yy / 12) % 2) * 6; xx < w; xx += 12) {
x.fillStyle = "rgba(150,160,175,0.18)";
x.fillRect(xx, yy, 5, 2);
}
x.fillStyle = "#1E232B";
x.fillRect(0, 126, w, 4);
x.fillRect(126, 0, 4, h);
x.fillRect(0, 0, w, 2);
x.fillRect(0, 0, 2, h);
[[8, 8], [118, 8], [8, 118], [118, 118]].forEach(function (b) { [[0, 0], [128, 0], [0, 128], [128, 128]].forEach(function (o) { x.fillStyle = "#646C7A"; x.beginPath(); x.arc(o[0] + b[0] + 2, o[1] + b[1] + 2, 2.5, 0, 7); x.fill(); }); });
}, 1 / 4, 1 / 4);
},
function (k) {
return stnCanvas("scr" + k, 256, 150, function (x, w, h, R) {
x.fillStyle = "#08131F";
x.fillRect(0, 0, w, h);
x.strokeStyle = "#1C3A56";
x.lineWidth = 1;
for (var gx = 0; gx < w; gx += 16) {
x.beginPath();
x.moveTo(gx, 0);
x.lineTo(gx, h);
x.stroke();
}
for (var gy = 0; gy < h; gy += 16) {
x.beginPath();
x.moveTo(0, gy);
x.lineTo(w, gy);
x.stroke();
}
x.fillStyle = "#7FC8F0";
x.font = "bold 11px sans-serif";
x.fillText(["ORBIT", "LIFE SUPPORT", "DOCKING", "POWER", "COMMS", "CARGO"][k % 6], 8, 14);
if (k % 3 === 0) {
x.strokeStyle = "#4FA8E0";
x.lineWidth = 2;
x.beginPath();
x.arc(128, 82, 26, 0, 7);
x.stroke();
x.strokeStyle = "#7AD8A8";
x.beginPath();
x.ellipse(128, 82, 90, 40, -0.2, 0, 7);
x.stroke();
x.fillStyle = "#F0D27A";
x.beginPath();
x.arc(206, 64, 4, 0, 7);
x.fill();
}
else if (k % 3 === 1) {
for (var b = 0; b < 6; b++) {
var v = 0.35 + R() * 0.6;
x.fillStyle = "#183048";
x.fillRect(12, 26 + b * 19, 170, 11);
x.fillStyle = v > 0.85 ? "#E0B860" : "#5AC89A";
x.fillRect(12, 26 + b * 19, 170 * v, 11);
x.fillStyle = "#9FC8E8";
x.font = "10px monospace";
x.fillText((v * 100 | 0) + "%", 190, 35 + b * 19);
}
}
else {
x.strokeStyle = "#6AD0F0";
x.lineWidth = 2;
x.beginPath();
for (var t = 0; t < w; t += 4) {
var yv = 90 - Math.sin(t * 0.05 + k) * 22 - R() * 8;
if (t === 0)
x.moveTo(t, yv);
else
x.lineTo(t, yv);
}
x.stroke();
x.fillStyle = "#9FC8E8";
x.font = "10px monospace";
x.fillText("> all hatches sealed", 8, 126);
x.fillText("> shuttle bay clear", 8, 140);
}
});
},
function (G) {
var wallT = stnWallTex(), floorT = stnFloorTex(), ceilT = stnCeilTex();
G.traverse(function (o) {
if (!o.isMesh || !o.material || !o.material.color || o.material.map)
return;
var hx = o.material.color.getHex(), t = o.geometry && o.geometry.type;
if (t !== "BoxGeometry")
return;
var tex = hx === 0xB8C0CC ? wallT : hx === 0x2E3440 ? floorT : (hx === 0x5A6474 && o.material.emissive && o.material.emissive.getHex() === 0x30363F) ? ceilT : null;
if (!tex)
return;
if (typeof phtMetre === "function")
o.geometry = phtMetre(o.geometry);
if (!o.material.userData.stnDressed) {
o.material.map = tex;
o.material.color.setHex(tex === wallT ? 0xA4AAB4 : 0xE0E0E0);
o.material.userData.stnDressed = 1;
o.material.needsUpdate = true;
}
o.userData.phtSeen = 1;
});
var pipeM = [new THREE.MeshLambertMaterial({ color: 0x7A828E }), new THREE.MeshLambertMaterial({ color: 0x9A6A42 }), new THREE.MeshLambertMaterial({ color: 0x3A5A8A })], brM = new THREE.MeshLambertMaterial({ color: 0x2E3440 });
[-1, 1].forEach(function (sd) {
[[5.05, 0.16, 0], [4.7, 0.11, 1], [5.35, 0.09, 2]].forEach(function (q, i) { var c = new THREE.Mesh(new THREE.CylinderGeometry(q[1], q[1], 65, 8), pipeM[q[2]]); c.rotation.x = Math.PI / 2; c.position.set(sd * (26.2 - i * 0.12), q[0], -2.5); c.userData.phtSeen = 1; G.add(c); });
for (var z = -32; z <= 29; z += 4) {
var b = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.9, 0.12), brM);
b.position.set(sd * 26.3, 5.0, z + 2);
b.userData.phtSeen = 1;
G.add(b);
}
});
var spots = { "1": [-30, -18, -2, 6, 14], "-1": [-30, -18, -6, 6, 22] }, n = 0;
[-1, 1].forEach(function (sd) {
spots[sd].forEach(function (z) {
var fr = new THREE.Mesh(new THREE.BoxGeometry(0.08, 1.6, 2.7), brM);
fr.position.set(sd * 26.74, 3.1, z);
G.add(fr);
var sc = new THREE.Mesh(new THREE.PlaneGeometry(2.5, 1.42), new THREE.MeshBasicMaterial({ map: stnScreenTex(n++), color: 0xC8C8C8 }));
sc.position.set(sd * 26.69, 3.1, z);
sc.rotation.y = -sd * Math.PI / 2;
G.add(sc);
});
});
var k = 0;
G.traverse(function (o) {
if (o.isMesh && o.geometry && o.geometry.type === "BoxGeometry" && o.geometry.parameters && o.geometry.parameters.width === 4.4 && o.geometry.parameters.height === 0.05) {
o.material = new THREE.MeshBasicMaterial({ map: stnScreenTex(3 + (k++)), color: 0xC8C8C8 });
}
});
},
function () {
if (WAVES.tex)
return WAVES.tex;
var N = 256, h = new Float32Array(N * N), R = rng(hash("waves")), comps = [];
for (var k = 0; k < 18; k++) {
var a = R() * 6.283, f = 3 + Math.floor(R() * 12);
comps.push([Math.round(Math.cos(a) * f), Math.round(Math.sin(a) * f), R() * 6.283, 1 / (1 + f * 0.35)]);
}
for (var y = 0; y < N; y++)
for (var x = 0; x < N; x++) {
var v = 0;
for (var c = 0; c < comps.length; c++) {
var q = comps[c];
v += Math.sin((q[0] * x + q[1] * y) / N * 6.283 + q[2]) * q[3];
}
h[y * N + x] = v;
}
var cv = document.createElement("canvas");
cv.width = cv.height = N;
var ctx = cv.getContext("2d"), img = ctx.createImageData(N, N), d = img.data;
for (var y2 = 0; y2 < N; y2++)
for (var x2 = 0; x2 < N; x2++) {
var dx = h[y2 * N + (x2 + 1) % N] - h[y2 * N + (x2 + N - 1) % N], dy = h[((y2 + 1) % N) * N + x2] - h[((y2 + N - 1) % N) * N + x2];
var nx = -dx * 2.2, ny = -dy * 2.2, nz = 1, l = Math.hypot(nx, ny, nz), i = (y2 * N + x2) * 4;
d[i] = (nx / l * 0.5 + 0.5) * 255;
d[i + 1] = (ny / l * 0.5 + 0.5) * 255;
d[i + 2] = (nz / l * 0.5 + 0.5) * 255;
d[i + 3] = 255;
}
ctx.putImageData(img, 0, 0);
var t = new THREE.CanvasTexture(cv);
t.wrapS = t.wrapT = THREE.RepeatWrapping;
return (WAVES.tex = t);
},
function (mesh, size, strength) {
if (!mesh || !mesh.material || mesh.userData.waves)
return;
var t = wavesTex().clone();
t.needsUpdate = true;
t.repeat.set(size / WAVES.tile, size / WAVES.tile);
var m = mesh.material;
if (m.userData && m.userData.toon && typeof TOON !== "undefined" && TOON && TOON.Phong) {
var pm = new TOON.Phong({ color: m.color.getHex(), shininess: 55, specular: 0x34465A, transparent: m.transparent, opacity: m.opacity });
if (m.emissive)
pm.emissive = m.emissive.clone();
mesh.material = m = pm;
}
m.normalMap = t;
m.normalScale = new THREE.Vector2(strength || 0.55, strength || 0.55);
m.needsUpdate = true;
mesh.userData.waves = 1;
WAVES.list.push({ m: mesh, t: t });
},
function () {
return stnCanvas("cabin", 256, 256, function (x, w, h, R) {
x.fillStyle = "#CDD1D7";
x.fillRect(0, 0, w, h);
stnGrain(x, w, h, R, 1400, 0.04);
x.fillStyle = "rgba(0,0,0,0.22)";
x.fillRect(0, 0, w, 2);
x.fillRect(0, 0, 2, h);
x.fillStyle = "rgba(255,255,255,0.3)";
x.fillRect(2, 2, w - 2, 1);
x.strokeStyle = "rgba(90,98,110,0.25)";
x.lineWidth = 2;
x.strokeRect(20, 20, w - 40, h - 40);
}, 1 / 1.2, 1 / 1.2);
},
function () {
return stnCanvas("fabric", 128, 128, function (x, w, h, R) {
x.fillStyle = "#2A3A66";
x.fillRect(0, 0, w, h);
for (var yy = 0; yy < h; yy += 2) {
x.fillStyle = "rgba(0,0,0," + (0.08 + R() * 0.06) + ")";
x.fillRect(0, yy, w, 1);
}
for (var xx = 0; xx < w; xx += 2) {
x.fillStyle = "rgba(255,255,255," + (0.03 + R() * 0.04) + ")";
x.fillRect(xx, 0, 1, h);
}
x.fillStyle = "rgba(140,170,230,0.18)";
for (var k = 0; k < 16; k++)
for (var j = 0; j < 16; j++)
if ((k + j) % 2 === 0)
x.fillRect(k * 8 + 3, j * 8 + 3, 2, 2);
}, 4, 4);
},
function () {
return stnCanvas("carpet", 128, 128, function (x, w, h, R) {
x.fillStyle = "#34416A";
x.fillRect(0, 0, w, h);
stnGrain(x, w, h, R, 3000, 0.12);
x.strokeStyle = "rgba(200,180,120,0.35)";
x.lineWidth = 2;
for (var k = 0; k < 4; k++) {
x.beginPath();
x.moveTo(0, k * 32 + 16);
for (var t = 0; t <= w; t += 16)
x.lineTo(t, k * 32 + 16 + ((t / 16) % 2 ? 6 : -6));
x.stroke();
}
}, 1, 1 / 2);
},
function (G) {
var cabin = orbCabinTex(), fab = orbFabricTex(), carpet = orbCarpetTex(), seatMat = null, done = {};
G.traverse(function (o) {
if (!o.isMesh || !o.geometry || o.geometry.type !== "BoxGeometry" || !o.material || !o.material.color)
return;
var hx = o.material.color.getHex(), P = o.geometry.parameters;
if ((hx === 0xE4E8EE || hx === 0xC8CED8) && !o.material.map) {
o.geometry = phtMetre(o.geometry);
if (!done[o.material.uuid]) {
o.material.map = cabin;
o.material.color.setHex(hx === 0xE4E8EE ? 0xD4D8DE : 0xB4BAC4);
o.material.needsUpdate = true;
done[o.material.uuid] = 1;
}
o.userData.phtSeen = 1;
}
else if (hx === 0x24335E && P && Math.abs(P.width - 0.54) < 0.01) {
if (!seatMat) {
seatMat = o.material;
seatMat.map = fab;
seatMat.color.setHex(0xFFFFFF);
seatMat.needsUpdate = true;
}
o.material = seatMat;
o.geometry = phtMetre(o.geometry);
o.userData.phtSeen = 1;
}
else if (hx === 0x3A4A7A && P && Math.abs(P.width - 0.9) < 0.01) {
o.material = o.material.clone();
o.material.map = carpet;
o.material.color.setHex(0xFFFFFF);
carpet.repeat.set(1, 18.5 / 2);
o.material.needsUpdate = true;
}
});
var binM = new THREE.MeshLambertMaterial({ color: 0xBEC4CC, map: cabin }), lipM = new THREE.MeshLambertMaterial({ color: 0x5A6474 }), lamp = new THREE.MeshBasicMaterial({ color: 0xE8E2D2 });
[-1, 1].forEach(function (sd) {
for (var z = -8.7; z < 10.2; z += 1.95) {
var bin = new THREE.Mesh(geo("box", [0.56, 0.42, 1.9]), binM);
bin.position.set(sd * 1.78, 2.28, z + 0.97);
bin.userData.phtSeen = 1;
G.add(bin);
var dr = new THREE.Mesh(geo("box", [0.04, 0.46, 1.88]), binM);
dr.position.set(sd * 1.5, 2.27, z + 0.97);
dr.rotation.z = sd * 0.22;
dr.userData.phtSeen = 1;
G.add(dr);
var lip = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.04, 1.86), lipM);
lip.position.set(sd * 1.47, 2.06, z + 0.97);
G.add(lip);
[0.35, -0.35].forEach(function (dz) { var l = new THREE.Mesh(new THREE.CircleGeometry(0.05, 10), lamp); l.rotation.x = Math.PI / 2; l.position.set(sd * 1.75, 2.065, z + 0.97 + dz); G.add(l); });
}
});
},
function () {
return stnCanvas("hull", 256, 256, function (x, w, h, R) {
x.fillStyle = "#BFC4CB";
x.fillRect(0, 0, w, h);
stnGrain(x, w, h, R, 2000, 0.06);
for (var i = 0; i < 26; i++) {
var v = 170 + R() * 50 | 0;
x.fillStyle = "rgb(" + v + "," + (v + 3) + "," + (v + 8) + ")";
x.fillRect(Math.floor(R() * 8) * 32, Math.floor(R() * 8) * 32, 32 * (1 + Math.floor(R() * 2)), 32);
}
x.strokeStyle = "rgba(40,46,56,0.55)";
x.lineWidth = 1.5;
for (var g = 0; g <= w; g += 32) {
x.beginPath();
x.moveTo(g, 0);
x.lineTo(g, h);
x.stroke();
x.beginPath();
x.moveTo(0, g);
x.lineTo(w, g);
x.stroke();
}
x.fillStyle = "#3A6AB8";
x.fillRect(70, 10, 40, 6);
x.fillStyle = "#B8483A";
x.fillRect(200, 140, 24, 5);
x.fillStyle = "rgba(30,34,40,0.6)";
for (var k = 0; k < 5; k++)
x.fillRect(140 + k * 8, 200, 4, 20);
}, 1, 1);
},
function () {
return stnCanvas("solar", 128, 128, function (x, w, h, R) {
x.fillStyle = "#C8CCD4";
x.fillRect(0, 0, w, h);
for (var yy = 0; yy < 4; yy++)
for (var xx = 0; xx < 4; xx++) {
var v = R() * 16 | 0;
x.fillStyle = "rgb(" + (26 + v) + "," + (40 + v) + "," + (96 + v) + ")";
x.fillRect(xx * 32 + 2, yy * 32 + 2, 28, 28);
x.fillStyle = "rgba(180,200,240,0.18)";
x.fillRect(xx * 32 + 2, yy * 32 + 15, 28, 1);
x.fillRect(xx * 32 + 15, yy * 32 + 2, 1, 28);
}
}, 1, 1);
},
function (g) {
var wheel = g.userData.wheel, hullT = spHullTex(), solT = spSolarTex(), seen = {};
g.traverse(function (o) {
if (!o.isMesh || !o.material || !o.material.color)
return;
var m = o.material, hx = m.color.getHex(), t = o.geometry.type;
if (hx === 0xD8DCE2) {
var key = m.uuid + t;
if (!seen[key]) {
seen[key] = m.clone();
var tx = hullT.clone();
tx.needsUpdate = true;
if (t === "TorusGeometry")
tx.repeat.set(40, 3);
else if (t === "CylinderGeometry")
tx.repeat.set(o.geometry.parameters.radiusTop > 5 ? 10 : 2, o.geometry.parameters.height / 6);
seen[key].map = tx;
seen[key].color.setHex(0x8C929A);
}
o.material = seen[key];
}
else if (t === "CylinderGeometry" && o.geometry.parameters.radiusTop === 4 && o.geometry.parameters.height === 22) {
var am = m.clone(), at = hullT.clone();
at.needsUpdate = true;
at.repeat.set(3, 4);
am.map = at;
am.color.multiplyScalar(0.62);
o.material = am;
}
else if (o.userData.solar) {
var sm = m.clone(), st = solT.clone();
st.needsUpdate = true;
st.repeat.set(30, 7);
sm.map = st;
sm.color.setHex(0xFFFFFF);
sm.emissive && sm.emissive.setHex(0x05070E);
o.material = sm;
}
});
g.children.forEach(function (o) { if (o.isSprite && o.material && o.material.blending === THREE.AdditiveBlending)
o.material.opacity = Math.min(o.material.opacity, 0.22); });
var rad = new THREE.MeshLambertMaterial({ color: 0x7E848C, map: spHullTex() }), dark = new THREE.MeshLambertMaterial({ color: 0x4A505A });
[-1, 1].forEach(function (s) { for (var f = 0; f < 3; f++) {
var fin = new THREE.Mesh(new THREE.BoxGeometry(0.3, 16, 6), rad);
fin.position.set(s * (11 + f * 0.9), 0, -4 + f * 7);
g.add(fin);
} });
var dish = new THREE.Mesh(new THREE.SphereGeometry(6, 16, 8, 0, Math.PI * 2, 0, Math.PI / 3), new THREE.MeshLambertMaterial({ color: 0x9AA0A8, side: THREE.DoubleSide }));
dish.position.set(0, 12, -8);
dish.rotation.x = -0.6;
g.add(dish);
var feed = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 5, 6), dark);
feed.position.set(0, 13.5, -6.5);
feed.rotation.x = -0.6;
g.add(feed);
[[-5, 14], [5, 14]].forEach(function (q) { var m = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.35, 12, 6), dark); m.position.set(q[0], -q[1], 0); g.add(m); });
},
function () {
return stnCanvas("foil", 256, 256, function (x, w, h, R) {
x.fillStyle = "#C6A45A";
x.fillRect(0, 0, w, h);
for (var i = 0; i < 420; i++) {
var cx = R() * w, cy = R() * h, s = 8 + R() * 26, v = R(), r = 170 + v * 80 | 0, g = 140 + v * 80 | 0, b = 70 + v * 70 | 0;
x.fillStyle = "rgba(" + r + "," + g + "," + b + "," + (0.25 + R() * 0.3) + ")";
x.beginPath();
x.moveTo(cx, cy);
for (var k = 0; k < 4; k++) {
var a = k * 1.57 + R() * 0.9;
x.lineTo(cx + Math.cos(a) * s, cy + Math.sin(a) * s);
}
x.closePath();
x.fill();
}
x.strokeStyle = "rgba(80,60,24,0.2)";
x.lineWidth = 1;
for (var j = 0; j < 50; j++) {
var px = R() * w, py = R() * h;
x.beginPath();
x.moveTo(px, py);
for (var q = 0; q < 3; q++) {
px += (R() - 0.5) * 40;
py += (R() - 0.5) * 40;
x.lineTo(px, py);
}
x.stroke();
}
x.strokeStyle = "rgba(240,214,140,0.25)";
for (var m = 0; m < 50; m++) {
var ax = R() * w, ay = R() * h;
x.beginPath();
x.moveTo(ax, ay);
x.lineTo(ax + (R() - 0.5) * 30, ay + (R() - 0.5) * 30);
x.stroke();
}
}, 1, 1);
},
function () {
return stnCanvas("regolith", 256, 256, function (x, w, h, R) {
x.fillStyle = "#D6D6D6";
x.fillRect(0, 0, w, h);
for (var i = 0; i < 60; i++) {
var v = 190 + R() * 50 | 0;
x.fillStyle = "rgba(" + v + "," + v + "," + v + ",0.35)";
x.beginPath();
x.ellipse(R() * w, R() * h, 8 + R() * 30, 6 + R() * 20, R() * 3, 0, 7);
x.fill();
}
stnGrain(x, w, h, R, 5000, 0.12);
for (var c = 0; c < 6; c++) {
var cx = R() * w, cy = R() * h, r = 3 + R() * 9;
x.fillStyle = "rgba(100,100,100,0.14)";
x.beginPath();
x.arc(cx, cy, r, 0, 7);
x.fill();
x.strokeStyle = "rgba(255,255,255,0.25)";
x.lineWidth = 1.5;
x.beginPath();
x.arc(cx, cy, r, 3.6, 5.8);
x.stroke();
x.strokeStyle = "rgba(60,60,60,0.35)";
x.beginPath();
x.arc(cx, cy, r, 0.5, 2.6);
x.stroke();
}
for (var p = 0; p < 160; p++) {
var pv = R() < 0.5 ? 110 : 235;
x.fillStyle = "rgba(" + pv + "," + pv + "," + pv + ",0.5)";
x.fillRect(R() * w, R() * h, 1 + R() * 2, 1 + R() * 2);
}
}, 1, 1);
},
function () {
if (SF_ROCKS)
return SF_ROCKS;
SF_ROCKS = [];
for (var v = 0; v < 3; v++) {
var g = new THREE.IcosahedronGeometry(1, 1), p = g.attributes.position, R = rng(hash("rock" + v)), seen = {};
for (var i = 0; i < p.count; i++) {
var k = p.getX(i).toFixed(3) + "," + p.getY(i).toFixed(3) + "," + p.getZ(i).toFixed(3);
var s = seen[k] || (seen[k] = 0.72 + R() * 0.42);
p.setXYZ(i, p.getX(i) * s, p.getY(i) * s * (p.getY(i) < -0.2 ? 0.6 : 1), p.getZ(i) * s);
}
g.computeVertexNormals();
SF_ROCKS.push(g);
}
return SF_ROCKS;
},
function () {
var g = new THREE.Group(), V = THREE.Vector3;
var foil = new THREE.MeshLambertMaterial({ color: 0xD8CCB2, map: sfFoilTex() }), legM = new THREE.MeshLambertMaterial({ color: 0xA8925A }), blackFoil = new THREE.MeshLambertMaterial({ color: 0x34322E, map: sfFoilTex() });
var hullT = spHullTex().clone();
hullT.needsUpdate = true;
hullT.repeat.set(0.8, 0.8);
var hull = new THREE.MeshLambertMaterial({ color: 0x9EA2A8, map: hullT }), dark = new THREE.MeshLambertMaterial({ color: 0x2C2E32 }), metal = new THREE.MeshLambertMaterial({ color: 0x8E9298 }), glass = new THREE.MeshPhongMaterial({ color: 0x10141C, specular: 0x3A4A5A, shininess: 70 });
var ds = new THREE.Mesh(new THREE.CylinderGeometry(2, 2, 1.6, 8), foil);
ds.position.y = 1.95;
ds.rotation.y = Math.PI / 8;
g.add(ds);
for (var f = 0; f < 4; f++) {
var a = f * Math.PI / 2 + Math.PI / 4, pn = new THREE.Mesh(new THREE.BoxGeometry(1.2, 1.3, 0.04), blackFoil);
pn.position.set(Math.sin(a) * 1.86, 1.95, Math.cos(a) * 1.86);
pn.rotation.y = a;
g.add(pn);
}
var plate = new THREE.Mesh(new THREE.CylinderGeometry(1.95, 1.9, 0.12, 8), dark);
plate.position.y = 1.12;
plate.rotation.y = Math.PI / 8;
g.add(plate);
var bell = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.78, 0.9, 16, 1, true), new THREE.MeshLambertMaterial({ color: 0x3A3836, side: THREE.DoubleSide }));
bell.position.y = 0.65;
g.add(bell);
[[0, 1], [1, 0], [0, -1], [-1, 0]].forEach(function (q, i) {
var top = new V(q[0] * 1.75, 2.55, q[1] * 1.75), pad = new V(q[0] * 3.0, 0.2, q[1] * 3.0), knee = new V(q[0] * 2.55, 0.95, q[1] * 2.55);
sfStrut(top, pad, 0.09, legM, g);
sfStrut(new V(q[0] * 1.9 + q[1] * 0.7, 1.25, q[1] * 1.9 + q[0] * 0.7), knee, 0.045, metal, g);
sfStrut(new V(q[0] * 1.9 - q[1] * 0.7, 1.25, q[1] * 1.9 - q[0] * 0.7), knee, 0.045, metal, g);
var fp = new THREE.Mesh(new THREE.CylinderGeometry(0.46, 0.36, 0.14, 14), foil);
fp.position.copy(pad).setY(0.08);
g.add(fp);
if (i !== 0) {
var pr = sfStrut(new V(q[0] * 3.0, 0.02, q[1] * 3.0), new V(q[0] * 3.25, 0.02, q[1] * 3.25), 0.02, metal, g);
}
});
var lt = new V(0, 2.5, 2.05), lb = new V(0, 0.45, 2.85), side = new V(0.32, 0, 0);
sfStrut(lt.clone().add(side), lb.clone().add(side), 0.03, metal, g);
sfStrut(lt.clone().sub(side), lb.clone().sub(side), 0.03, metal, g);
for (var r = 1; r < 9; r++) {
var t = r / 9, c = lt.clone().lerp(lb, t);
sfStrut(c.clone().add(side), c.clone().sub(side), 0.02, metal, g);
}
var porch = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.06, 0.6), metal);
porch.position.set(0, 2.78, 2.05);
g.add(porch);
var cab = new THREE.Mesh(new THREE.CylinderGeometry(1.35, 1.5, 1.7, 8), hull);
cab.position.y = 3.6;
cab.rotation.y = Math.PI / 8;
g.add(cab);
var nose = new THREE.Mesh(new THREE.BoxGeometry(2.0, 1.3, 0.9), hull);
nose.position.set(0, 3.75, 1.15);
g.add(nose);
var brow = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.5, 0.7), hull);
brow.position.set(0, 4.5, 1.0);
brow.rotation.x = -0.5;
g.add(brow);
[-1, 1].forEach(function (s) {
var w = new THREE.Mesh(new THREE.CircleGeometry(0.34, 3), glass);
w.position.set(s * 0.5, 4.12, 1.61);
w.rotation.set(-0.15, 0, s > 0 ? Math.PI / 2 : -Math.PI / 2 + Math.PI);
g.add(w);
var tk = new THREE.Mesh(new THREE.SphereGeometry(0.62, 12, 8), hull);
tk.position.set(s * 1.45, 3.45, -0.25);
tk.scale.set(0.7, 1, 1);
g.add(tk);
});
var hatch = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.8, 0.05), dark);
hatch.position.set(0, 3.4, 1.61);
g.add(hatch);
var hframe = new THREE.Mesh(new THREE.BoxGeometry(0.92, 0.92, 0.03), metal);
hframe.position.set(0, 3.4, 1.6);
g.add(hframe);
var tun = new THREE.Mesh(new THREE.CylinderGeometry(0.48, 0.52, 0.5, 14), hull);
tun.position.y = 4.7;
g.add(tun);
var tunTop = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.4, 0.06, 14), dark);
tunTop.position.y = 4.97;
g.add(tunTop);
[[1, 1], [1, -1], [-1, 1], [-1, -1]].forEach(function (q) {
var bx = q[0] * 1.45, bz = q[1] * 1.05;
var arm = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.22, 0.22), dark);
arm.position.set(bx, 4.05, bz);
g.add(arm);
[[1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0]].forEach(function (d) {
var n = new THREE.Mesh(new THREE.ConeGeometry(0.07, 0.2, 6), metal);
n.position.set(bx + d[0] * 0.18, 4.05 + d[1] * 0.18, bz);
n.quaternion.setFromUnitVectors(new V(0, 1, 0), new V(d[0], d[1], 0));
n.rotateX(Math.PI);
g.add(n);
});
});
var mast = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.7, 5), metal);
mast.position.set(0.55, 4.85, 0.95);
g.add(mast);
var dish = new THREE.Mesh(new THREE.SphereGeometry(0.34, 12, 6, 0, Math.PI * 2, 0, Math.PI / 2.6), new THREE.MeshLambertMaterial({ color: 0xB8B8B4, side: THREE.DoubleSide }));
dish.position.set(0.55, 5.2, 1.0);
dish.rotation.x = 1.1;
g.add(dish);
var mast2 = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.9, 5), metal);
mast2.position.set(-1.0, 4.9, -0.6);
g.add(mast2);
var dish2 = new THREE.Mesh(new THREE.SphereGeometry(0.42, 12, 6, 0, Math.PI * 2, 0, Math.PI / 2.6), dish.material);
dish2.position.set(-1.0, 5.35, -0.6);
dish2.rotation.set(0.6, 0, 0.5);
g.add(dish2);
var aft = new THREE.Mesh(new THREE.BoxGeometry(1.6, 1.0, 0.7), blackFoil);
aft.position.set(0, 3.55, -1.45);
g.add(aft);
return g;
},
function (G, k) {
var foil = null, rocks = sfRockGeos(), n = 0;
G.traverse(function (o) {
if (!o.isMesh || !o.material)
return;
var gt = o.geometry && o.geometry.type;
if (gt === "DodecahedronGeometry" && o.geometry.parameters.radius === 1 && !o.geometry.parameters.detail) {
o.geometry = rocks[(n++) % 3];
if (!o.material.userData.sfRock && typeof texOf === "function") {
var st = texOf("stone");
if (st) {
o.material.map = st;
o.material.color.lerp(new THREE.Color(0xFFFFFF), 0.12);
o.material.userData.sfRock = 1;
o.material.needsUpdate = true;
}
}
return;
}
if (o.material.color && o.material.color.getHex() === 0xD8A838 && !o.material.map) {
if (!foil) {
foil = o.material;
foil.map = sfFoilTex();
foil.color.setHex(0xD8CCB2);
foil.emissive && foil.emissive.setHex(0x1A1204);
foil.needsUpdate = true;
}
o.material = foil;
}
});
if (SF.ground && SF.ground.material && !SF.ground.material.userData.sfRego) {
SF.ground.material.userData.sfRego = 1;
var t = sfRegolithTex().clone();
t.needsUpdate = true;
t.repeat.set(1900 / 11, 1900 / 11);
SF.ground.material.map = t;
SF.ground.material.needsUpdate = true;
}
},
function (len, w, leaf) {
var key = len + "|" + w + "|" + (leaf ? 1 : 0);
if (BLADE.geo[key])
return BLADE.geo[key];
var s = new THREE.Shape(), h = w / 2;
if (leaf) {
s.moveTo(-h * 0.5, 0);
s.quadraticCurveTo(-h * 1.3, len * 0.45, 0, len);
s.quadraticCurveTo(h * 1.3, len * 0.45, h * 0.5, 0);
}
else {
s.moveTo(-h, 0);
s.lineTo(-h * 0.82, len * 0.82);
s.quadraticCurveTo(-h * 0.6, len * 0.94, 0, len);
s.quadraticCurveTo(h * 0.6, len * 0.94, h * 0.82, len * 0.82);
s.lineTo(h, 0);
}
s.closePath();
var g = new THREE.ExtrudeGeometry(s, { depth: 0.003, bevelEnabled: true, bevelThickness: Math.min(0.008, w * 0.14), bevelSize: w * 0.2, bevelSegments: 1, curveSegments: 6 });
g.translate(0, 0, -0.0015);
g.computeVertexNormals();
return (BLADE.geo[key] = g);
},
function (g, len, r, y, col) {
var leather = new THREE.MeshLambertMaterial({ color: col || 0x3A2618 }), wrap = new THREE.MeshLambertMaterial({ color: 0x22160E });
var grip = new THREE.Mesh(new THREE.CylinderGeometry(r * 0.9, r, len, 8), leather);
grip.position.y = y;
g.add(grip);
for (var i = 1; i < 5; i++) {
var rg = new THREE.Mesh(new THREE.TorusGeometry(r * 1.02, r * 0.18, 4, 10), wrap);
rg.rotation.x = Math.PI / 2;
rg.position.y = y - len / 2 + len * i / 5;
g.add(rg);
}
},
function (o) {
var g = new THREE.Group(), steel = bladeSteel(), dark = new THREE.MeshLambertMaterial({ color: 0x4A4E56 }), brass = new THREE.MeshPhongMaterial({ color: o.guardCol || 0x8A7448, specular: 0x4A3A1A, shininess: 30 });
var b = new THREE.Mesh(bladeGeo(o.len, o.w), steel);
b.position.y = o.base;
g.add(b);
[-1, 1].forEach(function (s) { var f = new THREE.Mesh(new THREE.BoxGeometry(o.w * 0.16, o.len * 0.62, 0.002), dark); f.position.set(0, o.base + o.len * 0.36, s * (Math.min(0.008, o.w * 0.14) + 0.0012)); g.add(f); });
var gd = new THREE.Mesh(new THREE.BoxGeometry(o.guard, o.w * 0.45, o.w * 0.6), brass);
gd.position.y = o.base - 0.01;
g.add(gd);
[-1, 1].forEach(function (s) { var q = new THREE.Mesh(new THREE.SphereGeometry(o.w * 0.32, 8, 6), brass); q.position.set(s * o.guard / 2, o.base - 0.01, 0); g.add(q); });
bladeGrip(g, o.grip, o.gr, o.base - 0.03 - o.grip / 2, o.gripCol);
var pm = new THREE.Mesh(new THREE.SphereGeometry(o.gr * 1.9, 10, 8), brass);
pm.position.y = o.base - 0.05 - o.grip;
pm.scale.set(1, 0.8, 0.8);
g.add(pm);
return g;
},
function () {
return stnCanvas("gdetail", 256, 256, function (x, w, h, R) {
x.fillStyle = "#E6E6E6";
x.fillRect(0, 0, w, h);
for (var i = 0; i < 90; i++) {
var v = 200 + R() * 55 | 0;
x.fillStyle = "rgba(" + v + "," + v + "," + v + ",0.3)";
x.beginPath();
x.ellipse(R() * w, R() * h, 6 + R() * 26, 4 + R() * 16, R() * 3, 0, 7);
x.fill();
}
stnGrain(x, w, h, R, 6000, 0.1);
for (var s = 0; s < 700; s++) {
var px = R() * w, py = R() * h, a = R() * 6.28, l = 2 + R() * 5, v2 = R() < 0.6 ? 150 : 250;
x.strokeStyle = "rgba(" + v2 + "," + v2 + "," + v2 + ",0.28)";
x.lineWidth = 1;
x.beginPath();
x.moveTo(px, py);
x.lineTo(px + Math.cos(a) * l, py + Math.sin(a) * l);
x.stroke();
}
for (var p = 0; p < 120; p++) {
var pv = R() < 0.5 ? 140 : 245;
x.fillStyle = "rgba(" + pv + "," + pv + "," + pv + ",0.45)";
x.beginPath();
x.arc(R() * w, R() * h, 0.8 + R() * 1.6, 0, 7);
x.fill();
}
}, 1, 1);
}
];
});
