/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(202, function () {
"use strict";
return [
function (style, col, img) {
var W = 512, H = 512, cv = document.createElement("canvas");
cv.width = W;
cv.height = H;
var x = cv.getContext("2d"), R = nlRand(style.length * 131 + col % 997);
if (img && style !== "plain" && style !== "fur" && style !== "bandage") {
try {
x.drawImage(img, 0, 0, W, H);
}
catch (e) {
x.fillStyle = nlHex(col);
x.fillRect(0, 0, W, H);
}
}
else {
x.fillStyle = nlHex(col);
x.fillRect(0, 0, W, H);
}
var i;
if (style === "wart" || style === "mutant") {
x.globalCompositeOperation = "multiply";
for (i = 0; i < 90; i++) {
x.fillStyle = "rgba(" + (90 + R() * 60 | 0) + "," + (100 + R() * 60 | 0) + "," + (70 + R() * 40 | 0) + ",0.35)";
x.beginPath();
x.ellipse(R() * W, R() * H, 10 + R() * 40, 8 + R() * 30, R() * 3, 0, 7);
x.fill();
}
x.globalCompositeOperation = "source-over";
for (i = 0; i < 420; i++) {
var wx = R() * W, wy = R() * H, wr = 1 + R() * 4;
x.fillStyle = "rgba(30,34,20,0.35)";
x.beginPath();
x.arc(wx + 1, wy + 1, wr, 0, 7);
x.fill();
x.fillStyle = "rgba(200,210,160,0.25)";
x.beginPath();
x.arc(wx - 0.5, wy - 0.5, wr * 0.7, 0, 7);
x.fill();
}
}
else if (style === "weather") {
x.globalCompositeOperation = "multiply";
for (i = 0; i < 60; i++) {
x.fillStyle = "rgba(150,110,80,0.25)";
x.beginPath();
x.ellipse(R() * W, R() * H, 20 + R() * 50, 10 + R() * 30, R() * 3, 0, 7);
x.fill();
}
x.globalCompositeOperation = "source-over";
x.strokeStyle = "rgba(70,40,25,0.25)";
x.lineWidth = 1.5;
for (i = 0; i < 120; i++) {
var lx = R() * W, ly = R() * H;
x.beginPath();
x.moveTo(lx, ly);
x.quadraticCurveTo(lx + R() * 30 - 15, ly + R() * 10, lx + R() * 40 - 20, ly + R() * 14 - 7);
x.stroke();
}
}
else if (style === "frost") {
x.globalCompositeOperation = "source-over";
x.strokeStyle = "rgba(240,250,255,0.55)";
x.lineWidth = 1.2;
for (i = 0; i < 90; i++) {
var fx = R() * W, fy = R() * H, a = R() * 6.28;
for (var s2 = 0; s2 < 6; s2++) {
var nx = fx + Math.cos(a) * 12, ny = fy + Math.sin(a) * 12;
x.beginPath();
x.moveTo(fx, fy);
x.lineTo(nx, ny);
x.stroke();
fx = nx;
fy = ny;
a += R() * 1.4 - 0.7;
}
}
for (i = 0; i < 600; i++) {
x.fillStyle = "rgba(255,255,255," + (0.2 + R() * 0.4) + ")";
x.fillRect(R() * W, R() * H, 1.5, 1.5);
}
x.strokeStyle = "rgba(40,70,110,0.4)";
x.lineWidth = 2;
for (i = 0; i < 30; i++) {
var cx = R() * W, cy = R() * H;
x.beginPath();
x.moveTo(cx, cy);
for (var c2 = 0; c2 < 5; c2++) {
cx += R() * 30 - 15;
cy += R() * 30 - 15;
x.lineTo(cx, cy);
}
x.stroke();
}
}
else if (style === "wrinkle") {
x.strokeStyle = "rgba(40,36,30,0.35)";
x.lineWidth = 1.3;
for (i = 0; i < 260; i++) {
var wx2 = R() * W, wy2 = R() * H;
x.beginPath();
x.moveTo(wx2, wy2);
x.quadraticCurveTo(wx2 + 10, wy2 + R() * 6 - 3, wx2 + 20 + R() * 14, wy2 + R() * 8 - 4);
x.stroke();
}
for (i = 0; i < 70; i++) {
x.fillStyle = "rgba(80,60,40,0.3)";
x.beginPath();
x.arc(R() * W, R() * H, 2 + R() * 5, 0, 7);
x.fill();
}
}
else if (style === "vein") {
x.globalCompositeOperation = "multiply";
x.fillStyle = "rgba(200,205,220,1)";
x.fillRect(0, 0, W, H);
x.globalCompositeOperation = "source-over";
x.strokeStyle = "rgba(70,90,170,0.35)";
x.lineWidth = 1.1;
for (i = 0; i < 50; i++) {
var vx = R() * W, vy = R() * H, va = R() * 6.28;
for (var k = 0; k < 10; k++) {
var vx2 = vx + Math.cos(va) * 9, vy2 = vy + Math.sin(va) * 9;
x.beginPath();
x.moveTo(vx, vy);
x.lineTo(vx2, vy2);
x.stroke();
vx = vx2;
vy = vy2;
va += R() * 0.9 - 0.45;
}
}
for (i = 0; i < 40; i++) {
x.fillStyle = "rgba(60,40,70,0.18)";
x.beginPath();
x.ellipse(R() * W, R() * H, 14 + R() * 20, 6 + R() * 10, R() * 3, 0, 7);
x.fill();
}
}
else if (style === "fur") {
for (i = 0; i < 9000; i++) {
var hx = R() * W, hy = R() * H, l = 4 + R() * 9, sh = 0.55 + R() * 0.9;
x.strokeStyle = nlHex(col, sh);
x.globalAlpha = 0.55;
x.lineWidth = 1 + R();
x.beginPath();
x.moveTo(hx, hy);
x.lineTo(hx + R() * 3 - 1.5, hy + l);
x.stroke();
}
x.globalAlpha = 1;
}
else if (style === "rot") {
x.globalCompositeOperation = "multiply";
for (i = 0; i < 70; i++) {
var pc = ["rgba(110,120,80,0.5)", "rgba(120,100,70,0.45)", "rgba(90,100,90,0.5)"][i % 3];
x.fillStyle = pc;
x.beginPath();
x.ellipse(R() * W, R() * H, 14 + R() * 44, 10 + R() * 30, R() * 3, 0, 7);
x.fill();
}
x.globalCompositeOperation = "source-over";
for (i = 0; i < 26; i++) {
var rx = R() * W, ry = R() * H, rr = 4 + R() * 12;
var gr = x.createRadialGradient(rx, ry, 0, rx, ry, rr);
gr.addColorStop(0, "rgba(60,12,10,0.85)");
gr.addColorStop(0.6, "rgba(90,30,20,0.6)");
gr.addColorStop(1, "rgba(90,30,20,0)");
x.fillStyle = gr;
x.beginPath();
x.arc(rx, ry, rr, 0, 7);
x.fill();
}
x.strokeStyle = "rgba(40,50,30,0.4)";
x.lineWidth = 1.2;
for (i = 0; i < 40; i++) {
var sx = R() * W, sy = R() * H;
x.beginPath();
x.moveTo(sx, sy);
x.lineTo(sx + R() * 24 - 12, sy + R() * 24 - 12);
x.stroke();
}
}
else if (style === "bandage") {
x.fillStyle = "#BFB294";
x.fillRect(0, 0, W, H);
for (var b = 0; b < 46; b++) {
var y0 = b * 12 - 20 + R() * 6, ang = (R() - 0.5) * 0.5;
x.save();
x.translate(W / 2, y0);
x.rotate(ang);
var gl = x.createLinearGradient(0, -7, 0, 7);
gl.addColorStop(0, "#9A8E70");
gl.addColorStop(0.3, "#E2D8BC");
gl.addColorStop(0.7, "#D6CAAA");
gl.addColorStop(1, "#8A7E60");
x.fillStyle = gl;
x.fillRect(-W, -7, W * 2, 14);
x.strokeStyle = "rgba(90,80,60,0.35)";
x.lineWidth = 1;
for (var f2 = 0; f2 < 12; f2++) {
var fx2 = R() * W * 2 - W;
x.beginPath();
x.moveTo(fx2, -6);
x.lineTo(fx2 + R() * 6, 6);
x.stroke();
}
x.restore();
}
for (i = 0; i < 30; i++) {
x.fillStyle = "rgba(110,85,50,0.25)";
x.beginPath();
x.ellipse(R() * W, R() * H, 10 + R() * 30, 5 + R() * 14, R() * 3, 0, 7);
x.fill();
}
}
else if (style === "char") {
x.globalCompositeOperation = "multiply";
for (i = 0; i < 70; i++) {
x.fillStyle = "rgba(" + (70 + R() * 60 | 0) + ",30,25,0.45)";
x.beginPath();
x.ellipse(R() * W, R() * H, 14 + R() * 40, 10 + R() * 30, R() * 3, 0, 7);
x.fill();
}
x.globalCompositeOperation = "source-over";
x.strokeStyle = "rgba(20,8,6,0.5)";
x.lineWidth = 1.6;
for (i = 0; i < 60; i++) {
var qx = R() * W, qy = R() * H;
x.beginPath();
x.moveTo(qx, qy);
for (var q2 = 0; q2 < 4; q2++) {
qx += R() * 20 - 10;
qy += R() * 20 - 10;
x.lineTo(qx, qy);
}
x.stroke();
}
}
else if (style === "scale") {
for (var sy2 = 0; sy2 < H; sy2 += 10)
for (var sx2 = ((sy2 / 10) % 2) * 7; sx2 < W; sx2 += 14) {
var sg = x.createRadialGradient(sx2, sy2 + 4, 1, sx2, sy2, 9);
sg.addColorStop(0, "rgba(255,255,255,0.18)");
sg.addColorStop(0.8, "rgba(0,0,0,0.05)");
sg.addColorStop(1, "rgba(0,0,0,0.35)");
x.fillStyle = sg;
x.beginPath();
x.arc(sx2, sy2, 8, 0, Math.PI);
x.fill();
}
}
else if (style === "clown") {
x.globalCompositeOperation = "screen";
x.fillStyle = "rgba(240,236,230,0.75)";
x.fillRect(0, 0, W, H);
x.globalCompositeOperation = "source-over";
for (i = 0; i < 40; i++) {
x.fillStyle = "rgba(120,110,100,0.18)";
x.beginPath();
x.arc(R() * W, R() * H, 3 + R() * 8, 0, 7);
x.fill();
}
}
return cv;
},
function (mat, kind, cfg, bare) {
var key = kind + ":" + (bare ? "bare:" : "") + mat.uuid, M = NL.mats[key];
if (M)
return M;
M = mat.clone();
M.skinning = mat.skinning;
M.name = mat.name;
var img = bare ? null : (mat.map && mat.map.image);
var cv = nlSkinCanvas(cfg.skin, cfg.col, img), T = new THREE.CanvasTexture(cv);
if (mat.map) {
T.flipY = mat.map.flipY;
T.encoding = mat.map.encoding;
T.wrapS = mat.map.wrapS;
T.wrapT = mat.map.wrapT;
}
M.map = T;
M.color && M.color.setHex(0xffffff);
if (M.roughness !== undefined)
M.roughness = cfg.skin === "scale" || cfg.skin === "frost" ? 0.55 : 0.9;
M.needsUpdate = true;
return (NL.mats[key] = M);
},
function (mat, kind, cfg) {
var key = kind + ":rag:" + mat.uuid, M = NL.mats[key];
if (M)
return M;
M = mat.clone();
M.skinning = mat.skinning;
M.name = mat.name;
if (cfg.wrap) {
var cv = nlSkinCanvas("bandage", cfg.col, null), T = new THREE.CanvasTexture(cv);
if (mat.map) {
T.flipY = mat.map.flipY;
T.wrapS = mat.map.wrapS;
T.wrapT = mat.map.wrapT;
}
M.map = T;
M.color && M.color.setHex(0xffffff);
}
else if (cfg.garb != null && M.color) {
M.color.setHex(cfg.garb);
if (M.map) {
M.map = nlGreyTex(M.map);
M.color.multiplyScalar(1.5);
}
if (cfg.rags === 2)
M.color.lerp(new THREE.Color(0x4A5038), 0.2);
}
else if (M.color) {
var k = cfg.rags === 2 ? 0.45 : 0.6;
var hsl = {};
M.color.getHSL(hsl);
M.color.setHSL(hsl.h, hsl.s * 0.55, hsl.l * k);
if (cfg.rags === 2)
M.color.lerp(new THREE.Color(0x4A5038), 0.25);
}
if (M.roughness !== undefined)
M.roughness = 1;
M.needsUpdate = true;
return (NL.mats[key] = M);
},
function (T) {
var k = "grey:" + T.uuid;
if (NL.tex[k])
return NL.tex[k];
var im = T.image;
if (!im || !im.width)
return T;
try {
var w = Math.min(im.width, 512), h = Math.round(im.height * w / im.width), cv = document.createElement("canvas");
cv.width = w;
cv.height = h;
var x = cv.getContext("2d", { willReadFrequently: true });
x.drawImage(im, 0, 0, w, h);
var d = x.getImageData(0, 0, w, h), a = d.data;
for (var i = 0; i < a.length; i += 4) {
var l = a[i] * 0.3 + a[i + 1] * 0.59 + a[i + 2] * 0.11;
l = Math.min(255, l * 1.25);
a[i] = a[i + 1] = a[i + 2] = l;
}
x.putImageData(d, 0, 0);
var G = new THREE.CanvasTexture(cv);
G.flipY = T.flipY;
G.wrapS = T.wrapS;
G.wrapT = T.wrapT;
if (T.encoding !== undefined)
G.encoding = T.encoding;
if (T.colorSpace !== undefined)
G.colorSpace = T.colorSpace;
return (NL.tex[k] = G);
}
catch (e) {
return T;
}
},
function (mat, col) {
var key = "eye:" + col + ":" + mat.uuid, M = NL.mats[key];
if (M)
return M;
M = mat.clone();
M.skinning = mat.skinning;
M.name = mat.name;
if (M.color)
M.color.setHex(col).multiplyScalar(0.6);
if (M.emissive) {
M.emissive.setHex(col);
M.emissiveIntensity = 1.2;
}
M.map = null;
M.needsUpdate = true;
return (NL.mats[key] = M);
},
function (col, o) {
o = o || {};
var M = new THREE.MeshStandardMaterial({ color: col, roughness: o.r === undefined ? 0.85 : o.r, metalness: 0 });
if (o.e !== undefined) {
M.emissive = new THREE.Color(o.e);
M.emissiveIntensity = o.ei || 1;
}
if (o.map)
M.map = o.map;
if (o.op !== undefined) {
M.transparent = true;
M.opacity = o.op;
M.depthWrite = false;
}
if (o.ds)
M.side = THREE.DoubleSide;
return M;
},
function (len, rad, col, curl, out) {
var g = new THREE.Group(), m = nlStd(col, { r: 0.6 }), n = 7, p = new THREE.Vector3(0, 0, 0), dir = new THREE.Vector3(out, 1, 0).normalize();
for (var i = 0; i < n; i++) {
var t = i / n, r0 = rad * (1 - t * 0.85), r1 = rad * (1 - (t + 1 / n) * 0.85), seg = len / n;
var c = new THREE.Mesh(new THREE.CylinderGeometry(Math.max(0.002, r1), r0, seg, 10), i > n - 3 ? nlStd(0x2A2420, { r: 0.5 }) : m);
var q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);
c.quaternion.copy(q);
c.position.copy(p).addScaledVector(dir, seg / 2);
g.add(c);
p.addScaledVector(dir, seg);
dir.applyAxisAngle(new THREE.Vector3(0, 0, 1), -curl * out * 0.18).applyAxisAngle(new THREE.Vector3(1, 0, 0), -curl * 0.12).normalize();
}
return g;
},
function (col, eyes) {
var g = new THREE.Group(), fur = nlStd(0xffffff, { map: nlFurTex(col), r: 1 }), dark = nlStd(0x1A1412, { r: 0.6 }), mouth = nlStd(0x3A0E0C, { r: 0.7 });
var cr = new THREE.Mesh(new THREE.SphereGeometry(0.13, 24, 18), fur);
cr.scale.set(1, 0.92, 1.08);
g.add(cr);
var brow = new THREE.Mesh(new THREE.SphereGeometry(0.1, 18, 12), fur);
brow.scale.set(1.15, 0.5, 0.8);
brow.position.set(0, 0.05, 0.07);
g.add(brow);
var sn = new THREE.Mesh(new THREE.CylinderGeometry(0.048, 0.078, 0.19, 18), fur);
sn.rotation.x = Math.PI / 2;
sn.position.set(0, -0.025, 0.16);
g.add(sn);
var tip = new THREE.Mesh(new THREE.SphereGeometry(0.05, 16, 12), fur);
tip.position.set(0, -0.02, 0.25);
g.add(tip);
var nose = new THREE.Mesh(new THREE.SphereGeometry(0.03, 14, 10), dark);
nose.scale.set(1.2, 0.8, 1);
nose.position.set(0, -0.002, 0.29);
g.add(nose);
var jaw = new THREE.Mesh(new THREE.BoxGeometry(0.085, 0.03, 0.17), fur);
jaw.position.set(0, -0.085, 0.15);
jaw.rotation.x = 0.18;
g.add(jaw);
var inner = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.03, 0.15), mouth);
inner.position.set(0, -0.063, 0.15);
inner.rotation.x = 0.09;
g.add(inner);
[-1, 1].forEach(function (s) {
var f1 = nlFang(0.045, 0.008, false);
f1.position.set(s * 0.028, -0.065, 0.24);
g.add(f1);
var f2 = nlFang(0.035, 0.007, true);
f2.position.set(s * 0.025, -0.075, 0.225);
g.add(f2);
var ear = new THREE.Mesh(new THREE.ConeGeometry(0.045, 0.13, 10), fur);
ear.position.set(s * 0.075, 0.14, -0.02);
ear.rotation.z = -s * 0.3;
ear.rotation.x = -0.15;
g.add(ear);
var ie = new THREE.Mesh(new THREE.ConeGeometry(0.028, 0.09, 8), nlStd(0x4A2A28));
ie.position.set(s * 0.074, 0.135, -0.004);
ie.rotation.z = -s * 0.3;
ie.rotation.x = -0.15;
g.add(ie);
var ey = new THREE.Mesh(new THREE.SphereGeometry(0.017, 12, 10), new THREE.MeshBasicMaterial({ color: eyes }));
ey.position.set(s * 0.052, 0.035, 0.115);
g.add(ey);
var gs = nlGlowSprite(eyes, 0.09, 0.55);
gs.position.set(s * 0.052, 0.035, 0.13);
g.add(gs);
});
var ruff = new THREE.Mesh(new THREE.SphereGeometry(0.16, 20, 14), fur);
ruff.scale.set(1.3, 0.75, 1.15);
ruff.position.set(0, -0.13, -0.03);
g.add(ruff);
return g;
},
function (col, eyes) {
var g = new THREE.Group(), fur = nlStd(0xffffff, { map: nlFurTex(col), r: 1 }), dark = nlStd(0x1A1210, { r: 0.6 });
var cr = new THREE.Mesh(new THREE.SphereGeometry(0.15, 24, 18), fur);
cr.scale.set(1.15, 0.95, 1.05);
g.add(cr);
var mz = new THREE.Mesh(new THREE.SphereGeometry(0.11, 20, 14), fur);
mz.scale.set(1.1, 0.8, 1.1);
mz.position.set(0, -0.08, 0.13);
g.add(mz);
var lip = new THREE.Mesh(new THREE.SphereGeometry(0.085, 18, 12), nlStd(0x3A2A24, { r: 0.7 }));
lip.scale.set(1.2, 0.6, 0.7);
lip.position.set(0, -0.1, 0.22);
g.add(lip);
[-1, 1].forEach(function (s) {
var ns = new THREE.Mesh(new THREE.SphereGeometry(0.018, 10, 8), dark);
ns.position.set(s * 0.035, -0.085, 0.275);
g.add(ns);
var horn = nlHorn(0.34, 0.04, 0xE8DCC0, 1.2, s);
horn.position.set(s * 0.13, 0.08, 0.02);
horn.rotation.z = -s * 1.25;
g.add(horn);
var ear = new THREE.Mesh(new THREE.SphereGeometry(0.05, 12, 8), fur);
ear.scale.set(1.6, 0.5, 0.8);
ear.position.set(s * 0.19, 0.02, -0.01);
g.add(ear);
var ey = new THREE.Mesh(new THREE.SphereGeometry(0.018, 12, 10), new THREE.MeshBasicMaterial({ color: eyes }));
ey.position.set(s * 0.085, 0.03, 0.12);
g.add(ey);
var gs = nlGlowSprite(eyes, 0.09, 0.55);
gs.position.set(s * 0.085, 0.03, 0.135);
g.add(gs);
});
var ring = new THREE.Mesh(new THREE.TorusGeometry(0.03, 0.006, 8, 20), nlStd(0xC8A040, { r: 0.3 }));
ring.position.set(0, -0.125, 0.27);
g.add(ring);
var tuft = new THREE.Mesh(new THREE.SphereGeometry(0.1, 16, 10), fur);
tuft.scale.set(1.2, 0.55, 0.9);
tuft.position.set(0, 0.12, 0.04);
g.add(tuft);
var neck = new THREE.Mesh(new THREE.SphereGeometry(0.18, 20, 14), fur);
neck.scale.set(1.3, 0.8, 1.1);
neck.position.set(0, -0.17, -0.05);
g.add(neck);
return g;
},
function (col, sd) {
var g = new THREE.Group(), boneM = nlStd(0x1A1010, { r: 0.6 }), skin = nlStd(col, { r: 0.75, ds: true });
var W = [0.55, 0.38], tips = [[1.15, 0.62], [1.28, 0.12], [1.05, -0.4], [0.62, -0.62]], root = [0.04, -0.66];
var sh = new THREE.Shape();
sh.moveTo(0, 0);
sh.lineTo(W[0], W[1]);
sh.lineTo(tips[0][0], tips[0][1]);
for (var i = 1; i < tips.length; i++) {
var a = tips[i - 1], b = tips[i], mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2, dx = mx - W[0], dy = my - W[1], L = Math.hypot(dx, dy);
sh.quadraticCurveTo(mx - dx / L * 0.16, my - dy / L * 0.16, b[0], b[1]);
}
var a2 = tips[tips.length - 1];
sh.quadraticCurveTo((a2[0] + root[0]) / 2 + 0.05, (a2[1] + root[1]) / 2 + 0.12, root[0], root[1]);
sh.lineTo(0, 0);
var mem = new THREE.Mesh(new THREE.ShapeGeometry(sh, 12), skin);
g.add(mem);
function rod(p, q, r) {
var A = new THREE.Vector3(p[0], p[1], 0.004), B = new THREE.Vector3(q[0], q[1], 0.004), d = B.clone().sub(A), m = new THREE.Mesh(new THREE.CylinderGeometry(r * 0.6, r, d.length(), 6), boneM);
m.position.copy(A).addScaledVector(d, 0.5);
m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), d.normalize());
g.add(m);
}
rod([0, 0], W, 0.022);
tips.forEach(function (t) { rod(W, t, 0.012); });
var cl = new THREE.Mesh(new THREE.ConeGeometry(0.014, 0.07, 6), nlStd(0x0E0A08, { r: 0.4 }));
cl.position.set(W[0] + 0.01, W[1] + 0.05, 0);
g.add(cl);
if (sd < 0)
g.scale.x = -1;
return g;
},
function (E) {
var kind = E.spec && E.spec.archetype, cfg = NL_FOLK[kind];
if (!cfg || !E.model || E.plan.type !== "human")
return;
var body = E.g.children[0], root = E.model.children[0];
if (!body || !root)
return;
var B = nlBones(root), hb = B.Head;
if (!hb)
return;
var headMesh = null, eyesMesh = null, browMesh = null;
root.traverse(function (m) {
if (!m.isMesh)
return;
if (/Superhero|SuperHero/.test(m.name))
headMesh = m;
if (/^Eyes/.test(m.name))
eyesMesh = m;
if (/^Eyebrows/.test(m.name))
browMesh = m;
var conv = function (x) {
var n = String(x.name || "");
if (/Superhero|Regular/i.test(n))
return nlSkinMat(x, kind, cfg);
if (/Eyes/i.test(n))
return cfg.eyes ? nlEyeMat(x, cfg.eyes) : x;
if (/Hair/i.test(n))
return x;
if (cfg.bare && /Body|Arms/i.test(m.name) && !/Legs|Feet/i.test(m.name))
return nlSkinMat(x, kind, cfg, true);
if (cfg.rags || cfg.wrap || cfg.garb != null)
return nlRagMat(x, kind, cfg);
return x;
};
m.material = Array.isArray(m.material) ? m.material.map(conv) : conv(m.material);
});
E.nlHid = [];
body.children.forEach(function (m) {
if (m.userData.hdf || m.userData.part || !m.visible)
return;
if (E.g.userData.hdfKit && E.g.userData.hdfKit.has(m))
return;
var y = m.position.y, ax = Math.abs(m.position.x);
var held = m.position.z > 0.15 && m.position.z < 0.35 && y > 0.85 && y < 1.2 && ax > 0.18;
if (!cfg.keepHat && !held && !m.userData.wing && !m.userData.flap && y > 1.3) {
m.visible = false;
E.nlHid.push(m);
}
});
if (!cfg.keepHat)
(E.icons || []).forEach(function (r) { var o = r.o; if (o.visible && o.parent && /head/i.test(o.parent.name || "")) {
o.visible = false;
E.nlHid.push(o);
} });
if (cfg.head || cfg.horns || cfg.tusks || cfg.fangs)
(E.hats || []).forEach(function (m) { if (!m.userData.part && m.visible) {
m.visible = false;
E.nlHid.push(m);
} });
if (body.rotation.x) {
E.nlRx = body.rotation.x;
body.rotation.x = 0;
}
if (E.mixer)
E.mixer.update(0);
body.updateMatrixWorld(true);
var inv = new THREE.Matrix4().copy(body.matrixWorld).invert();
var Hd = (typeof hfHead === "function") ? hfHead(E) : null, skull = null, eyeBox = null;
if (Hd) {
skull = new THREE.Box3();
(Hd.face.length ? Hd.face : Hd.pts).forEach(function (p) { skull.expandByPoint(p); });
if (Hd.eyes.length) {
eyeBox = new THREE.Box3();
Hd.eyes.forEach(function (p) { eyeBox.expandByPoint(p); });
}
}
function put(m, p) { Hd.G.add(m); m.position.copy(p); m.traverse(function (x) { x.userData.hdf = 1; if (x.isMesh) {
x.castShadow = true;
x.raycast = function () { };
} }); }
if (skull) {
var c = skull.getCenter(new THREE.Vector3()), s = skull.getSize(new THREE.Vector3());
if (cfg.head === "wolf" || cfg.head === "bull") {
if (headMesh)
headMesh.visible = false;
if (eyesMesh)
eyesMesh.visible = false;
if (browMesh)
browMesh.visible = false;
root.traverse(function (m) { if (m.isMesh && m.userData.hdfHair)
m.visible = false; });
var H = cfg.head === "wolf" ? nlWolfHead(cfg.col, cfg.eyes) : nlBullHead(cfg.col, cfg.eyes);
H.scale.setScalar(s.y / 0.27);
put(H, new THREE.Vector3(c.x, c.y + s.y * 0.02, c.z - s.z * 0.05));
}
else if (cfg.head === "blank") {
if (eyesMesh)
eyesMesh.visible = false;
if (browMesh)
browMesh.visible = false;
root.traverse(function (m) { if (m.isMesh && m.userData.hdfHair)
m.visible = false; });
var fc = new THREE.Mesh(new THREE.SphereGeometry(0.5, 28, 20), nlStd(cfg.col, { r: 0.45 }));
fc.scale.set(s.x * 0.98, s.y * 1.02, s.z * 0.95);
put(fc, new THREE.Vector3(c.x, c.y + s.y * 0.02, c.z + s.z * 0.03));
if (cfg.eyes) {
[-1, 1].forEach(function (sd) { var gs = nlGlowSprite(cfg.eyes, s.x * 0.5, 0.5); put(gs, new THREE.Vector3(c.x + sd * s.x * 0.2, c.y + s.y * 0.06, skull.max.z + s.z * 0.04)); });
}
}
else {
if (cfg.eyes && eyeBox) {
var ec = eyeBox.getCenter(new THREE.Vector3()), ew = eyeBox.max.x - eyeBox.min.x;
[-1, 1].forEach(function (sd) { var gs = nlGlowSprite(cfg.eyes, s.x * 0.42, 0.5); put(gs, new THREE.Vector3(ec.x + sd * ew * 0.3, ec.y, eyeBox.max.z + 0.012)); });
}
if (cfg.fangs)
[-1, 1].forEach(function (sd) { var f = nlFang(s.y * 0.11, s.x * 0.035, false); put(f, new THREE.Vector3(c.x + sd * s.x * 0.1, c.y - s.y * 0.27, skull.max.z - s.z * 0.1)); });
if (cfg.tusks)
[-1, 1].forEach(function (sd) { var t = nlFang(s.y * 0.2, s.x * 0.06, true); t.rotation.z = -sd * 0.25; put(t, new THREE.Vector3(c.x + sd * s.x * 0.24, c.y - s.y * 0.26, skull.max.z - s.z * 0.14)); });
}
if (cfg.bald)
root.traverse(function (m) { if (m.isMesh && m.userData.hdfHair && m.visible) {
m.visible = false;
E.nlHid.push(m);
} });
if (cfg.ears) {
var em = NL.mats[kind + ":ear"] || (NL.mats[kind + ":ear"] = nlSkinMat(nlStd(cfg.col), kind, cfg));
[-1, 1].forEach(function (sd) {
var e = new THREE.Mesh(new THREE.ConeGeometry(s.y * 0.09, s.y * 0.42 * cfg.ears, 6), em);
e.scale.z = 0.35;
e.rotation.z = -sd * 1.15;
e.rotation.y = sd * 0.35;
put(e, new THREE.Vector3(c.x + sd * (s.x * 0.5 + s.y * 0.14 * cfg.ears), c.y + s.y * 0.12, c.z - s.z * 0.08));
});
}
if (cfg.horns) {
var big = cfg.horns === "big";
[-1, 1].forEach(function (sd) {
var h = nlHorn(s.y * (big ? 0.95 : 0.45), s.x * (big ? 0.13 : 0.08), big ? 0x2A2220 : 0x3A2A24, big ? 1 : 0.6, sd);
h.rotation.z = -sd * 0.5;
put(h, new THREE.Vector3(c.x + sd * s.x * 0.3, skull.max.y - s.y * 0.18, c.z + s.z * 0.05));
});
}
}
if (cfg.claws) {
["l", "r"].forEach(function (sd) {
["thumb", "index", "middle", "ring", "pinky"].forEach(function (f) {
var b3 = B[f + "_03_" + sd], b4 = B[f + "_04_leaf_" + sd];
if (!b3 || !b4)
return;
var p3 = b3.getWorldPosition(new THREE.Vector3()).applyMatrix4(inv), p4 = b4.getWorldPosition(new THREE.Vector3()).applyMatrix4(inv);
var d = p4.clone().sub(p3);
if (d.lengthSq() < 1e-8)
return;
d.normalize();
var cl = new THREE.Mesh(new THREE.ConeGeometry(0.009, 0.065, 8), nlStd(0x1E1A16, { r: 0.4 }));
cl.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), d);
nlAt(E, body, cl, p4.clone().addScaledVector(d, 0.022), b3);
});
});
}
if (cfg.wings && B.spine_03) {
body.children.forEach(function (m) { if (m.userData.hdf || m.userData.part || !m.visible || m.isMesh)
return; if (m.position.z < 0.05 && m.children.some(function (c) { return c.geometry && c.geometry.type === "PlaneGeometry"; })) {
m.visible = false;
E.nlHid.push(m);
} });
var sp = B.spine_03.getWorldPosition(new THREE.Vector3()).applyMatrix4(inv);
E.nlWings = [];
[-1, 1].forEach(function (sd) {
var piv = new THREE.Group(), w = nlBatWing(cfg.wings, sd);
piv.add(w);
w.rotation.y = -sd * 0.15;
nlAt(E, body, piv, new THREE.Vector3(sp.x + sd * 0.1, sp.y + 0.05, sp.z - 0.14), B.spine_03);
piv.userData.base = piv.quaternion.clone();
E.nlWings.push({ p: piv, s: sd });
});
}
if (cfg.bulk) {
E.model.scale.x *= cfg.bulk;
E.model.scale.z *= cfg.bulk * 0.95;
}
if (cfg.thin) {
E.model.scale.x *= cfg.thin;
E.model.scale.z *= cfg.thin;
}
if (cfg.hunch) {
var bq = body.getWorldQuaternion(new THREE.Quaternion()), side = new THREE.Vector3(1, 0, 0).applyQuaternion(bq);
var P = [["spine_01", cfg.hunch * 0.3], ["spine_02", cfg.hunch * 0.35], ["spine_03", cfg.hunch * 0.35], ["neck_01", -cfg.hunch * 0.45], ["Head", -cfg.hunch * 0.4]];
E.nlPose = P.map(function (q) {
var b = B[q[0]];
if (!b)
return null;
var wq = b.getWorldQuaternion(new THREE.Quaternion()).invert();
var ax = side.clone().applyQuaternion(wq).normalize();
return { b: b, q: new THREE.Quaternion().setFromAxisAngle(ax, q[1]) };
}).filter(Boolean);
}
var mx = E.mixer;
if (mx && !mx.nlWrapped) {
mx.nlWrapped = true;
var up = mx.update, T0 = performance.now() / 1000, Qw = new THREE.Quaternion(), Ay = new THREE.Vector3(0, 1, 0);
mx.update = function (d) {
var r = up.call(this, d);
if (E.nlPose && E.model)
E.nlPose.forEach(function (p) { p.b.quaternion.multiply(p.q); });
if (E.nlWings && E.model) {
var t = performance.now() / 1000 - T0;
E.nlWings.forEach(function (W) { W.p.quaternion.copy(W.p.userData.base).multiply(Qw.setFromAxisAngle(Ay, W.s * (0.55 + Math.sin(t * 0.9) * 0.18))); });
}
return r;
};
}
},
function (spec, o, V) {
var g = new THREE.Group(), body = new THREE.Group();
g.add(body);
var prof = [[0.56, 0.02], [0.47, 0.3], [0.39, 0.6], [0.34, 0.95], [0.32, 1.18], [0.28, 1.34], [0.2, 1.42], [0.12, 1.47], [0.02, 1.49]];
var geo = new THREE.LatheGeometry(prof.map(function (p) { return new THREE.Vector2(p[0], p[1]); }), 48);
var pa = geo.attributes.position;
for (var i = 0; i < pa.count; i++) {
var x = pa.getX(i), y = pa.getY(i), z = pa.getZ(i);
if (y < 0.4) {
var a = Math.atan2(z, x), k = (0.4 - y) / 0.4, jag = Math.sin(a * 7) * 0.5 + Math.sin(a * 13 + 1) * 0.3 + Math.sin(a * 23 + 2) * 0.2;
pa.setY(i, y + k * jag * 0.16 + k * 0.05);
var fl = 1 + k * 0.12 * (0.5 + 0.5 * Math.sin(a * 5));
pa.setX(i, x * fl);
pa.setZ(i, z * fl);
}
else if (y > 0.5 && y < 1.3) {
var a2 = Math.atan2(z, x), fold = 1 + Math.sin(a2 * 9) * 0.03;
pa.setX(i, x * fold);
pa.setZ(i, z * fold);
}
}
geo.computeVertexNormals();
var robeM = nlStd(V.col, { r: 1, e: V.col, ei: V.ei, op: V.op, ds: true });
body.add(new THREE.Mesh(geo, robeM));
if (V.glow) {
var ig = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ color: V.col, transparent: true, opacity: 0.1, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide }));
ig.scale.set(0.9, 0.98, 0.9);
body.add(ig);
}
var hood = new THREE.Mesh(new THREE.SphereGeometry(0.2, 28, 18, Math.PI / 2 + 0.75, Math.PI * 2 - 1.5, 0, Math.PI * 0.72), robeM);
hood.scale.set(1, 1.18, 1.12);
hood.position.set(0, 1.55, -0.01);
body.add(hood);
var peak = new THREE.Mesh(new THREE.ConeGeometry(0.1, 0.22, 14), robeM);
peak.position.set(0, 1.72, -0.11);
peak.rotation.x = -0.7;
body.add(peak);
var voidM = new THREE.Mesh(new THREE.SphereGeometry(0.15, 20, 14), new THREE.MeshBasicMaterial({ color: 0x050508 }));
voidM.scale.set(1, 1.1, 0.9);
voidM.position.set(0, 1.53, 0.01);
body.add(voidM);
[-1, 1].forEach(function (s) {
var ey = new THREE.Mesh(new THREE.SphereGeometry(0.018, 12, 10), new THREE.MeshBasicMaterial({ color: V.eyes }));
ey.position.set(s * 0.05, 1.56, 0.13);
body.add(ey);
var gs = nlGlowSprite(V.eyes, 0.16, 0.6);
gs.position.set(s * 0.05, 1.56, 0.15);
body.add(gs);
});
if (V.mouth) {
var mo = new THREE.Mesh(new THREE.CircleGeometry(0.035, 16), new THREE.MeshBasicMaterial({ color: 0x020204 }));
mo.scale.set(0.8, 1.5, 1);
mo.position.set(0, 1.47, 0.145);
body.add(mo);
}
var arms = [];
[-1, 1].forEach(function (s) {
var arm = new THREE.Group();
arm.position.set(s * 0.26, 1.33, 0.02);
body.add(arm);
var sl = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.12, 0.55, 16, 1, true), robeM);
sl.position.set(0, -0.22, 0.05);
sl.rotation.x = 0.2;
arm.add(sl);
var hand = new THREE.Group();
hand.position.set(0, -0.5, 0.12);
arm.add(hand);
var bone = nlStd(V.col === 0x1C1E26 ? 0xC8C0B0 : 0xE8EEF4, { r: 0.6, op: V.glow ? 0.75 : undefined });
var palm = new THREE.Mesh(new THREE.SphereGeometry(0.035, 10, 8), bone);
palm.scale.set(1, 0.6, 1.3);
hand.add(palm);
for (var f = 0; f < 4; f++) {
var fg = new THREE.Mesh(new THREE.CylinderGeometry(0.006, 0.009, 0.12, 6), bone);
fg.position.set((f - 1.5) * 0.018, -0.05, 0.03);
fg.rotation.x = 0.5 + f * 0.05;
hand.add(fg);
}
arm.rotation.x = -0.9;
arm.rotation.z = s * 0.12;
arms.push({ g: arm, s: s });
});
var wisps = [];
function ribbon(w, h, col, op) {
var G = new THREE.PlaneGeometry(w, h, 1, 12);
G.translate(0, -h / 2, 0);
var M = new THREE.Mesh(G, new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: op, depthWrite: false, side: THREE.DoubleSide, blending: V.glow ? THREE.AdditiveBlending : THREE.NormalBlending }));
M.userData.base = Float32Array.from(G.attributes.position.array);
return M;
}
for (var w = 0; w < 6; w++) {
var a = w / 6 * Math.PI * 2 + 0.3, r = ribbon(0.14, 0.9 + ((w * 37) % 5) * 0.08, V.col, V.glow ? 0.14 : 0.35);
r.position.set(Math.cos(a) * 0.4, 0.12, Math.sin(a) * 0.4);
r.rotation.y = -a;
body.add(r);
wisps.push({ m: r, ph: w * 1.3, amp: 0.08 });
}
if (V.hair)
for (var hh = 0; hh < 7; hh++) {
var hr = ribbon(0.07, 1.1, 0xF2F6FA, 0.42);
hr.position.set((hh - 3) * 0.04, 1.66, -0.1 - Math.abs(hh - 3) * 0.01);
hr.rotation.x = 0.35;
body.add(hr);
wisps.push({ m: hr, ph: hh * 0.7, amp: 0.06, hair: 1 });
}
addAura(g, V.col === 0x1C1E26 ? "darkaura" : "smoke");
var au = featVal(o, "aura");
if (au && au[0] !== "smoke" && au[0] !== "darkaura")
addAura(g, au[0]);
var prev = g.userData.anim, seed = (typeof hash === "function" ? hash(spec.id) : 7) % 10;
g.userData.anim = function (t, dt) {
if (prev)
prev(t, dt);
body.position.y = 0.35 + Math.sin(t * 0.9 + seed) * 0.14;
body.rotation.y = Math.sin(t * 0.25 + seed) * 0.3;
arms.forEach(function (A) { A.g.rotation.x = -0.9 + Math.sin(t * 0.7 + A.s) * 0.1; });
wisps.forEach(function (W) {
var G = W.m.geometry, p = G.attributes.position, b = W.m.userData.base;
for (var i = 0; i < p.count; i++) {
var y = b[i * 3 + 1];
p.setX(i, b[i * 3] + Math.sin(t * 0.9 + W.ph + y * 3) * W.amp * (-y));
p.setZ(i, b[i * 3 + 2] + Math.cos(t * 0.7 + W.ph + y * 2) * W.amp * 0.6 * (-y));
}
p.needsUpdate = true;
});
};
return g;
},
function (mat, cfg, role) {
var key = "coat:" + cfg.coat + ":" + role + ":" + mat.uuid, M = NL.mats[key];
if (M)
return M;
M = mat.clone();
M.skinning = true;
M.name = mat.name;
var n = String(mat.name || ""), base = mat.color ? mat.color.clone() : new THREE.Color(1, 1, 1), hsl = {};
base.getHSL(hsl);
if (/Eye_White/i.test(n)) {
M.color.setHex(cfg.eyes);
if (M.emissive) {
M.emissive.setHex(cfg.eyes);
M.emissiveIntensity = 1.1;
}
}
else if (/Eye_Black/i.test(n)) {
M.color.setHex(0x0A0404);
}
else if (/Hair/i.test(n) && cfg.mane != null) {
M.color.setHex(cfg.mane);
if (cfg.maneGlow && M.emissive) {
M.emissive.setHex(cfg.maneGlow);
M.emissiveIntensity = 0.55;
}
}
else if (/Hooves/i.test(n)) {
M.color.setHex(0x141010);
}
else if (M.color) {
var c = new THREE.Color(cfg.coat);
c.multiplyScalar(0.6 + hsl.l * 0.8);
M.color.copy(c);
}
if (M.roughness !== undefined)
M.roughness = 0.85;
M.map = null;
M.needsUpdate = true;
return (NL.mats[key] = M);
},
function (m, i, out) {
var g = m.geometry, P = g.attributes.position, SI = g.attributes.skinIndex, SW = g.attributes.skinWeight, bones = m.skeleton.bones;
var v = NL.v || (NL.v = new THREE.Vector3()), tv = NL.tv || (NL.tv = new THREE.Vector3()), mt = NL.mt || (NL.mt = new THREE.Matrix4());
v.fromBufferAttribute(P, i).applyMatrix4(m.bindMatrix);
out.set(0, 0, 0);
for (var k = 0; k < 4; k++) {
var w = k === 0 ? SW.getX(i) : k === 1 ? SW.getY(i) : k === 2 ? SW.getZ(i) : SW.getW(i);
if (!w)
continue;
var bi = k === 0 ? SI.getX(i) : k === 1 ? SI.getY(i) : k === 2 ? SI.getZ(i) : SI.getW(i), b = bones[bi];
if (!b)
continue;
mt.multiplyMatrices(b.matrixWorld, m.skeleton.boneInverses[bi]);
out.addScaledVector(tv.copy(v).applyMatrix4(mt), w);
}
return out;
},
function (m, bone, toFrame) {
var g = m.geometry, SI = g.attributes.skinIndex, SW = g.attributes.skinWeight, hi = m.skeleton.bones.indexOf(bone);
if (hi < 0)
return null;
var box = new THREE.Box3(), p = new THREE.Vector3();
for (var i = 0; i < g.attributes.position.count; i++) {
var bi = 0, bw = -1;
for (var k = 0; k < 4; k++) {
var w = k === 0 ? SW.getX(i) : k === 1 ? SW.getY(i) : k === 2 ? SW.getZ(i) : SW.getW(i);
if (w > bw) {
bw = w;
bi = k === 0 ? SI.getX(i) : k === 1 ? SI.getY(i) : k === 2 ? SI.getZ(i) : SI.getW(i);
}
}
if (bi !== hi)
continue;
nlSkinPos(m, i, p).applyMatrix4(toFrame);
box.expandByPoint(p);
}
return box.isEmpty() ? null : box;
},
function (root, ginv) {
var out = [];
root.updateMatrixWorld(true);
root.traverse(function (m) {
if (!m.isMesh || !m.visible)
return;
var G = m.geometry.index ? m.geometry.toNonIndexed() : m.geometry, A = G.attributes.position, M = new THREE.Matrix4().multiplyMatrices(ginv, m.matrixWorld);
out.push({ m: m, G: G, M: M, A: A });
});
return out;
},
function (root, ginv, noFlip) {
var V = nlBeastVerts(root, ginv);
if (!V.length)
return null;
var bx = new THREE.Box3(), v = new THREE.Vector3();
V.forEach(function (e) { for (var i = 0; i < e.A.count; i++) {
v.fromBufferAttribute(e.A, i).applyMatrix4(e.M);
bx.expandByPoint(v);
} });
var sz = bx.getSize(new THREE.Vector3()), front = 0, back = 0;
V.forEach(function (e) { for (var i = 0; i < e.A.count; i++) {
v.fromBufferAttribute(e.A, i).applyMatrix4(e.M);
if (v.y > bx.max.y - sz.y * 0.12) {
if (v.z > (bx.min.z + bx.max.z) / 2)
front++;
else
back++;
}
} });
return { V: V, box: bx, size: sz, flip: !noFlip && back > front };
},
function (root, ginv, P, wrap) {
var bx = P.box, sz = P.size, v = new THREE.Vector3(), cz = (bx.min.z + bx.max.z) / 2;
var legY = bx.min.y + sz.y * 0.36, headZ = bx.max.z - sz.z * 0.24, headY = bx.min.y + sz.y * 0.58, tailZ = bx.min.z + sz.z * 0.13, tailY = bx.min.y + sz.y * 0.42;
var bins = { body: [], head: [], tail: [], fl: [], fr: [], bl: [], br: [] };
function bin(c) { if (c.z > headZ && c.y > headY)
return "head"; if (c.z < tailZ && c.y > tailY)
return "tail"; if (c.y < legY)
return (c.z > cz ? "f" : "b") + (c.x > 0 ? "l" : "r"); return "body"; }
var mats = [];
P.V.forEach(function (e) {
var mt = Array.isArray(e.m.material) ? e.m.material : [e.m.material], grp = e.G.groups && e.G.groups.length ? e.G.groups : [{ start: 0, count: e.A.count, materialIndex: 0 }];
var nm = new THREE.Matrix3().getNormalMatrix(e.M), N = e.G.attributes.normal, U = e.G.attributes.uv, a = new THREE.Vector3(), b = new THREE.Vector3(), c = new THREE.Vector3(), n = new THREE.Vector3();
grp.forEach(function (gr) {
var mat = mt[gr.materialIndex || 0], mi = mats.indexOf(mat);
if (mi < 0) {
mi = mats.length;
mats.push(mat);
}
for (var t = gr.start; t < gr.start + gr.count; t += 3) {
a.fromBufferAttribute(e.A, t).applyMatrix4(e.M);
b.fromBufferAttribute(e.A, t + 1).applyMatrix4(e.M);
c.fromBufferAttribute(e.A, t + 2).applyMatrix4(e.M);
var cen = a.clone().add(b).add(c).multiplyScalar(1 / 3), k = bin(cen), tri = { p: [a.clone(), b.clone(), c.clone()], n: [], uv: [], mi: mi };
for (var q = 0; q < 3; q++) {
if (N) {
n.fromBufferAttribute(N, t + q).applyMatrix3(nm).normalize();
tri.n.push(n.clone());
}
if (U)
tri.uv.push(U.getX(t + q), U.getY(t + q));
}
bins[k].push(tri);
}
});
e.m.visible = false;
});
function make(list, pivot) {
var G = new THREE.BufferGeometry(), pos = [], nor = [], uv = [];
list.sort(function (x, y) { return x.mi - y.mi; });
var groups = [], cur = -1;
list.forEach(function (tri, i) {
if (tri.mi !== cur) {
groups.push({ start: i * 3, count: 0, mi: tri.mi });
cur = tri.mi;
}
groups[groups.length - 1].count += 3;
tri.p.forEach(function (p, q) { pos.push(p.x - pivot.x, p.y - pivot.y, p.z - pivot.z); if (tri.n[q])
nor.push(tri.n[q].x, tri.n[q].y, tri.n[q].z); });
if (tri.uv.length)
uv.push.apply(uv, tri.uv);
});
G.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
if (nor.length === pos.length)
G.setAttribute("normal", new THREE.Float32BufferAttribute(nor, 3));
else
G.computeVertexNormals();
if (uv.length === pos.length / 3 * 2)
G.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
groups.forEach(function (gr, i) { G.addGroup(gr.start, gr.count, i); });
var m = new THREE.Mesh(G, groups.map(function (gr) { return mats[gr.mi]; }));
m.castShadow = true;
m.frustumCulled = false;
m.userData.hdf = 1;
m.raycast = function () { };
var piv = new THREE.Group();
piv.position.copy(pivot);
piv.add(m);
piv.userData.hdf = 1;
wrap.add(piv);
return { b: piv, rest: piv.quaternion.clone() };
}
var R = {}, legX = sz.x * 0.18;
R.body = make(bins.body, new THREE.Vector3(0, 0, 0));
["fl", "fr", "bl", "br"].forEach(function (k) {
var hz = k[0] === "f" ? bx.max.z - sz.z * 0.3 : bx.min.z + sz.z * 0.3, hx = k[1] === "l" ? legX : -legX;
var L = bins[k];
if (!L.length)
return;
var lb = new THREE.Box3();
L.forEach(function (t) { t.p.forEach(function (p) { lb.expandByPoint(p); }); });
R[k] = make(L, new THREE.Vector3((lb.min.x + lb.max.x) / 2, legY, (lb.min.z + lb.max.z) / 2));
});
var hb = new THREE.Box3();
bins.head.forEach(function (t) { t.p.forEach(function (p) { hb.expandByPoint(p); }); });
if (hb.isEmpty())
hb.set(new THREE.Vector3(-0.1, headY, headZ), new THREE.Vector3(0.1, bx.max.y, bx.max.z));
R.head = make(bins.head, new THREE.Vector3((hb.min.x + hb.max.x) / 2, headY, headZ));
R.headBox = hb;
if (bins.tail.length)
R.tail = make(bins.tail, new THREE.Vector3(0, tailY + sz.y * 0.15, tailZ));
return R;
},
function (g, spec, cfg) {
var body = g.children[0];
if (!body || !g.parent)
return;
hdfUtils(function () {
hdfFile(cfg.file, function (F) {
if (g.userData.nlModel || !g.parent)
return;
var root = HDF.utils.clone(F.scene);
g.updateMatrixWorld(true);
var ginv = new THREE.Matrix4().copy(g.matrixWorld).invert(), kb = new THREE.Box3();
body.traverse(function (m) { if (!m.isMesh || !m.visible)
return; if (!m.geometry.boundingBox)
m.geometry.computeBoundingBox(); kb.union(m.geometry.boundingBox.clone().applyMatrix4(m.matrixWorld).applyMatrix4(ginv)); });
if (kb.isEmpty())
return;
var mb = hdfFitScale(root), ms = mb.getSize(new THREE.Vector3()), ks = kb.getSize(new THREE.Vector3());
var wrap = new THREE.Group();
wrap.userData.hdf = 1;
wrap.add(root);
var alongX = ms.x > ms.z * 1.15;
if (alongX)
root.rotation.y = -Math.PI / 2;
var len = alongX ? ms.x : ms.z, k = Math.min(ks.z / len, ks.y / ms.y * 1.1) * 0.98;
root.scale.setScalar(k);
root.updateMatrixWorld(true);
var b2 = hdfFitScale(root);
root.position.set(-(b2.min.x + b2.max.x) / 2, -b2.min.y, -(b2.min.z + b2.max.z) / 2);
root.traverse(function (m) {
m.userData.hdf = 1;
if (m.isMesh) {
m.frustumCulled = false;
m.castShadow = true;
m.raycast = function () { };
var conv = function (x) { return nlCoatMat(x, cfg, "c"); };
m.material = Array.isArray(m.material) ? m.material.map(conv) : conv(m.material);
}
});
g.add(wrap);
body.visible = false;
g.children.forEach(function (c) { if (c.isMesh && c.geometry && c.geometry.type === "ConeGeometry")
c.visible = false; });
if (cfg.embers) {
var eg = nlGlowSprite(cfg.embers, Math.max(ks.x, ks.z) * 1.4, 0.35);
eg.position.set(0, ks.y * 0.12, 0);
g.add(eg);
}
g.updateMatrixWorld(true);
var P = nlBeastPieces(root, ginv);
if (!P) {
g.userData.nlModel = { wrap: wrap, R: null, ph: 0, last: null, sp: 0 };
return;
}
if (P.flip) {
root.rotation.y += Math.PI;
root.updateMatrixWorld(true);
var b3 = hdfFitScale(wrap);
root.position.x -= (b3.min.x + b3.max.x) / 2;
root.position.z -= (b3.min.z + b3.max.z) / 2;
g.updateMatrixWorld(true);
P = nlBeastPieces(root, ginv, true);
}
var R = nlBeastCut(root, ginv, P, wrap);
var hb = R.headBox, hc = hb.getCenter(new THREE.Vector3()), hs = hb.getSize(new THREE.Vector3());
function eyes(par, cx) {
[-1, 1].forEach(function (s) {
var at = new THREE.Vector3(cx + s * hs.x * 0.2, hc.y + hs.y * 0.12, hb.max.z - hs.z * 0.3);
var ey = new THREE.Mesh(new THREE.SphereGeometry(Math.max(0.015, hs.x * 0.06), 10, 8), new THREE.MeshBasicMaterial({ color: cfg.eyes }));
ey.userData.hdf = 1;
var gs = nlGlowSprite(cfg.eyes, hs.x * 0.5, 0.5);
[ey, gs].forEach(function (m) { m.position.copy(at).sub(par.position); par.add(m); });
});
}
if (!/horse/.test(cfg.file))
eyes(R.head.b, hc.x);
if (cfg.heads === 3) {
R.heads = [];
[-1, 1].forEach(function (s) {
var h = new THREE.Group();
h.position.copy(R.head.b.position);
h.position.x += s * hs.x * 0.95;
h.position.y -= hs.y * 0.08;
h.position.z -= hs.z * 0.12;
var c = R.head.b.children[0].clone();
c.position.copy(R.head.b.children[0].position);
h.add(c);
h.rotation.y = s * 0.35;
wrap.add(h);
eyes(h, h.position.x);
R.heads.push({ b: h, rest: h.quaternion.clone(), s: s });
});
}
g.userData.nlModel = { wrap: wrap, R: R, ph: 0, last: null, sp: 0 };
});
});
},
function (g, t, dt) {
var M = g.userData.nlModel;
if (!M || !M.R)
return;
var p = g.getWorldPosition(new THREE.Vector3());
if (M.last && dt > 0) {
var v = p.distanceTo(M.last) / dt;
M.sp += (Math.min(v, 12) - M.sp) * Math.min(1, dt * 4);
}
M.last = p;
var a = Math.min(1, M.sp / 2.5) * 0.5;
M.ph += dt * (2 + M.sp * 1.6);
var X = new THREE.Vector3(1, 0, 0), Y = new THREE.Vector3(0, 1, 0), Q = new THREE.Quaternion();
function set(r, ax, ang) { if (!r)
return; r.b.quaternion.copy(r.rest).multiply(Q.setFromAxisAngle(ax, ang)); }
var s = Math.sin(M.ph), c = -s, R = M.R;
set(R.fl, X, s * a);
set(R.fr, X, c * a);
set(R.bl, X, c * a);
set(R.br, X, s * a);
set(R.head, X, Math.sin(t * 0.6) * 0.05 + Math.sin(M.ph * 2) * a * 0.08);
(R.heads || []).forEach(function (h, i) { h.b.quaternion.copy(h.rest).multiply(Q.setFromAxisAngle(X, Math.sin(t * 0.7 + i * 2) * 0.07)); });
set(R.tail, Y, Math.sin(t * 1.4) * (0.25 + a * 0.2));
M.wrap.position.y = Math.abs(Math.sin(M.ph)) * a * 0.04;
}
];
});
