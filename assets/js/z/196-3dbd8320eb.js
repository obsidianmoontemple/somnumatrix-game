/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(196, function () {
return [
function () {
if (RLF.m)
return RLF.m;
function cv(w, h, fn) { var c = document.createElement("canvas"); c.width = w; c.height = h; fn(c.getContext("2d"), w, h); var t = new THREE.CanvasTexture(c); t.wrapS = t.wrapT = THREE.RepeatWrapping; return t; }
var steel = cv(256, 256, function (x, W, H) {
var g = x.createLinearGradient(0, 0, W, H);
g.addColorStop(0, "#DCE6F0");
g.addColorStop(.5, "#C6D4E2");
g.addColorStop(1, "#D8E2EE");
x.fillStyle = g;
x.fillRect(0, 0, W, H);
for (var i = 0; i < 260; i++) {
x.strokeStyle = "rgba(255,255,255," + (0.05 + Math.random() * 0.08) + ")";
var y = Math.random() * H;
x.beginPath();
x.moveTo(0, y);
x.lineTo(W, y + Math.random() * 4 - 2);
x.stroke();
}
x.strokeStyle = "rgba(60,100,145,.28)";
x.lineWidth = 1.1;
function fern(px, py, a, len, d) {
if (d > 3 || len < 4)
return;
var ex = px + Math.cos(a) * len, ey = py + Math.sin(a) * len;
x.beginPath();
x.moveTo(px, py);
x.lineTo(ex, ey);
x.stroke();
for (var k = 1; k < 4; k++) {
var bx = px + (ex - px) * k / 4, by = py + (ey - py) * k / 4;
fern(bx, by, a - 0.75, len * 0.42, d + 1);
fern(bx, by, a + 0.75, len * 0.42, d + 1);
}
}
for (var j = 0; j < 4; j++) {
fern(W * (j % 2 ? 0.75 : 0.25), H * (j < 2 ? 0.3 : 0.8), -Math.PI / 2 + (j % 2 ? 0.3 : -0.3), 46, 0);
}
});
var bump = steel;
var fur = cv(128, 128, function (x, W, H) { x.fillStyle = "#EDEAE2"; x.fillRect(0, 0, W, H); for (var i = 0; i < 1400; i++) {
var px = Math.random() * W, py = Math.random() * H;
x.strokeStyle = "rgba(" + (Math.random() < .5 ? "255,255,255" : "190,186,176") + "," + (0.35 + Math.random() * 0.4) + ")";
x.beginPath();
x.moveTo(px, py);
x.lineTo(px + Math.random() * 3 - 1.5, py + 4 + Math.random() * 5);
x.stroke();
} });
var aur = cv(256, 512, function (x, W, H) {
var g = x.createLinearGradient(0, 0, 0, H);
g.addColorStop(0, "#0E1B3C");
g.addColorStop(.55, "#13275A");
g.addColorStop(1, "#1A1A48");
x.fillStyle = g;
x.fillRect(0, 0, W, H);
for (var c = 0; c < 9; c++) {
var cx = W * (c + 0.5) / 9 + (c % 2 ? 8 : -8), col = ["58,220,170", "70,200,220", "150,110,230"][c % 3];
var gr = x.createLinearGradient(0, H * 0.06, 0, H * 0.9);
gr.addColorStop(0, "rgba(" + col + ",0)");
gr.addColorStop(.3, "rgba(" + col + ",.55)");
gr.addColorStop(.75, "rgba(" + col + ",.25)");
gr.addColorStop(1, "rgba(" + col + ",0)");
x.fillStyle = gr;
x.beginPath();
x.moveTo(cx - 10, 0);
for (var y = 0; y <= H; y += 16)
x.lineTo(cx - 12 + Math.sin(y * 0.02 + c) * 9, y);
for (var y2 = H; y2 >= 0; y2 -= 16)
x.lineTo(cx + 12 + Math.sin(y2 * 0.02 + c) * 9, y2);
x.closePath();
x.fill();
}
for (var s = 0; s < 90; s++) {
x.fillStyle = "rgba(255,255,255," + (0.25 + Math.random() * 0.5) + ")";
x.fillRect(Math.random() * W, Math.random() * H * 0.7, 1.4, 1.4);
}
x.fillStyle = "#B8862A";
x.fillRect(0, H - 34, W, 34);
x.fillStyle = "#E8C060";
x.fillRect(0, H - 34, W, 3);
x.fillRect(0, H - 6, W, 3);
for (var k = 0; k < W; k += 21) {
x.fillStyle = "#F4DC90";
x.beginPath();
x.moveTo(k + 10, H - 29);
x.lineTo(k + 17, H - 18);
x.lineTo(k + 10, H - 9);
x.lineTo(k + 3, H - 18);
x.closePath();
x.fill();
x.fillStyle = "#3A78B0";
x.fillRect(k + 8, H - 20, 4, 4);
}
x.fillStyle = "#E8C060";
x.fillRect(0, 0, W, 5);
});
var M = {
steel: new THREE.MeshPhongMaterial({ color: 0x8EA6C4, map: steel, bumpMap: bump, bumpScale: 0.008, shininess: 110, specular: 0xF0F8FF, emissive: 0x060C16, side: THREE.DoubleSide }),
steelD: new THREE.MeshPhongMaterial({ color: 0x4E6C8E, shininess: 80, specular: 0xBFDFFF, emissive: 0x081220, side: THREE.DoubleSide }),
gold: new THREE.MeshPhongMaterial({ color: 0xD2A43C, shininess: 110, specular: 0xFFEAB0, emissive: 0x2E1C00, side: THREE.DoubleSide }),
crystal: new THREE.MeshPhongMaterial({ color: 0xD8F2FF, transparent: true, opacity: 0.93, shininess: 150, specular: 0xFFFFFF, emissive: 0x3C86C4, emissiveIntensity: 0.6, flatShading: true }),
gem: new THREE.MeshPhongMaterial({ color: 0xA8E4FF, shininess: 160, specular: 0xFFFFFF, emissive: 0x62BEF4, emissiveIntensity: 0.85, flatShading: true }),
fur: new THREE.MeshLambertMaterial({ color: 0xFFFFFF, map: fur }),
leather: new THREE.MeshPhongMaterial({ color: 0x26304C, shininess: 20, specular: 0x303848 }),
cape: new THREE.MeshLambertMaterial({ color: 0xFFFFFF, map: aur, side: THREE.FrontSide }),
lining: new THREE.MeshLambertMaterial({ color: 0x8090B8, side: THREE.BackSide })
};
RLF.m = M;
return M;
},
function (root) {
var out = [], v = new THREE.Vector3(), acc = new THREE.Vector3(), tv = new THREE.Vector3(), mt = new THREE.Matrix4();
root.updateMatrixWorld(true);
root.traverse(function (m) {
if (!m.isSkinnedMesh || !m.visible)
return;
var g = m.geometry, P = g.attributes.position, SI = g.attributes.skinIndex, SW = g.attributes.skinWeight;
if (!P || !SI || !SW)
return;
var bones = m.skeleton.bones, step = Math.max(1, Math.floor(P.count / 9000));
for (var i = 0; i < P.count; i += step) {
var bi = 0, bw = -1;
for (var k = 0; k < 4; k++) {
var w = rlC(SW, i, k);
if (w > bw) {
bw = w;
bi = rlC(SI, i, k);
}
}
var b = bones[bi];
if (!b)
continue;
v.fromBufferAttribute(P, i).applyMatrix4(m.bindMatrix);
acc.set(0, 0, 0);
for (var k2 = 0; k2 < 4; k2++) {
var w2 = rlC(SW, i, k2);
if (!w2)
continue;
var bb = bones[rlC(SI, i, k2)];
if (!bb)
continue;
mt.multiplyMatrices(bb.matrixWorld, m.skeleton.boneInverses[rlC(SI, i, k2)]);
acc.addScaledVector(tv.copy(v).applyMatrix4(mt), w2);
}
out.push({ p: acc.clone(), b: b.name });
}
});
return out;
},
function (G, M, pos, normal, s) {
var g = new THREE.Mesh(new THREE.OctahedronGeometry(s, 0), M.gem);
g.scale.set(1, 1.3, 0.6);
g.position.copy(pos);
g.lookAt(pos.clone().add(normal));
G.add(g);
var set = new THREE.Mesh(new THREE.TorusGeometry(s * 1.05, s * 0.28, 5, 12), M.gold);
set.position.copy(pos);
set.lookAt(pos.clone().add(normal));
G.add(set);
return g;
},
function (E, bones, body, verts, name, childRe, own, t0, t1, gap, prof, arc, M, mat, opt) {
var b = bones[name];
if (!b)
return null;
var ch = rlFitChild(b, childRe);
if (!ch)
return null;
var G = rlFitFrame(b, body);
G.name = "relic-" + name;
var O = new THREE.Vector3(), C = G.worldToLocal(ch.getWorldPosition(new THREE.Vector3())), L = C.length();
if (!(L > 0.02))
return null;
var ax = C.clone().normalize(), A = rlFitAxes(ax);
if (opt && opt.down) {
var dn = new THREE.Vector3(0, -1, 0);
dn.addScaledVector(ax, -dn.dot(ax)).normalize();
A.u = dn;
A.w = new THREE.Vector3().crossVectors(ax, dn).normalize();
}
if (opt && opt.front) {
var fr = new THREE.Vector3(0, 0, 1);
fr.addScaledVector(ax, -fr.dot(ax)).normalize();
A.u = fr;
A.w = new THREE.Vector3().crossVectors(ax, fr).normalize();
}
var pts = rlFitLocal(G, verts, function (n) { return own.test(n); });
if (pts.length < 12) {
b.remove(G);
return null;
}
var R = rlFitRadii(pts, O, ax, A.u, A.w, L, t0, t1, 9, 20, 0.03);
var geo = rlFitShell(O, ax, A.u, A.w, L, t0, t1, R, gap, prof, arc);
var m = new THREE.Mesh(geo, mat);
G.add(m);
return { G: G, geo: geo, O: O, ax: ax, u: A.u, w: A.w, L: L, R: R };
},
function (E, keys) {
var M = rlFitMats(), body = E.g.children[0], root = E.model, bones = {};
root.traverse(function (o) { if (o.isBone && !bones[o.name])
bones[o.name] = o; });
if (!bones.Head && !bones.head)
return null;
if (!bones.Head)
bones.Head = bones.head;
body.updateMatrixWorld(true);
var verts = rlFitVerts(root);
if (verts.length < 200)
return null;
var made = [], capes = [];
function keep(G) { if (!G)
return; G.traverse(function (m) { m.userData.hdf = 1; m.userData.relicFit = 1; if (m.isMesh) {
m.castShadow = true;
m.raycast = function () { };
} }); made.push(G); }
var TORSO = /^(spine_0[123]|pelvis)$/i;
function torsoRing(G, yA, yB, test) {
var pts = rlFitLocal(G, verts, test || function (n) { return TORSO.test(n); });
var cx = 0, cz = 0, n = 0;
pts.forEach(function (p) { if (p.y > yA && p.y < yB) {
cx += p.x;
cz += p.z;
n++;
} });
if (n) {
cx /= n;
cz /= n;
}
return { pts: pts, O: new THREE.Vector3(cx, yA, cz) };
}
function by(n) { var b = bones[n]; if (!b)
return null; var G = new THREE.Group(); return b; }
function yOf(n, G) { var b = bones[n]; return b ? G.worldToLocal(b.getWorldPosition(new THREE.Vector3())).y : null; }
keys.forEach(function (k) {
if (k === "frostplate" && bones.spine_02) {
var G = rlFitFrame(bones.spine_02, body);
G.name = "relic-cuirass";
var yW = yOf("spine_01", G) - 0.02, yArm = yOf("upperarm_l", G), yNeck = yOf("neck_01", G) || yOf("Head", G) - 0.12;
if (yArm == null)
yArm = yNeck - 0.08;
var yTop = Math.min(yArm + 0.02, yNeck - 0.05);
var T = torsoRing(G, yW, yTop);
var up = new THREE.Vector3(0, 1, 0), L = yTop - yW;
var R = rlFitRadii(T.pts, T.O, up, new THREE.Vector3(1, 0, 0), new THREE.Vector3(0, 0, 1), L, 0, 1, 10, 32, 0.08);
var prof = function (t, a) { var front = Math.max(0, Math.sin(a)); return 0.016 * Math.pow(front, 10) + 0.026 * front * front * Math.sin(Math.min(1, t * 1.2) * Math.PI * 0.85) - 0.01 * (1 - t); };
var g = rlFitShell(T.O, up, new THREE.Vector3(1, 0, 0), new THREE.Vector3(0, 0, 1), L, 0, 1, R, 0.024, prof);
G.add(new THREE.Mesh(g, M.steel));
G.add(rlFitRim(g.userData.ring(0, 0.006), 0.011, M.gold, true));
G.add(rlFitRim(g.userData.ring(1, 0.004), 0.009, M.gold, true));
G.add(rlFitRim(g.userData.ring(0.55, 0.003, Math.PI * 0.3, Math.PI * 0.7), 0.005, M.gold, false));
var N = torsoRing(G, yNeck - 0.02, yNeck + 0.06, function (n) { return /^neck_0\d$/i.test(n); });
var NR = rlFitRadii(N.pts.filter(function (p) { return p.y > yNeck - 0.03 && p.y < yNeck + 0.07; }), new THREE.Vector3(T.O.x, yNeck - 0.02, T.O.z), up, new THREE.Vector3(1, 0, 0), new THREE.Vector3(0, 0, 1), 0.08, 0, 1, 3, 32, 0.055);
NR = NR.map(function (row) { return row.map(function (r) { return Math.min(r, 0.085); }); });
var NA = 32, top = R[R.length - 1], pos = [], idx = [], ST = 5;
for (var s = 0; s <= ST; s++) {
var f = s / ST, yy = yTop + (yNeck + 0.0 - yTop) * f;
for (var j = 0; j <= NA; j++) {
var a = j / NA * Math.PI * 2, r0 = top[j % NA] + 0.03, r1 = NR[0][j % NA] + 0.035, r = r0 + (r1 - r0) * (1 - Math.cos(f * Math.PI / 2));
pos.push(T.O.x + Math.cos(a) * r, yy + Math.sin(f * Math.PI) * 0.012, T.O.z + Math.sin(a) * r);
}
}
for (var s2 = 0; s2 < ST; s2++)
for (var j2 = 0; j2 < NA; j2++) {
var a0 = s2 * (NA + 1) + j2, c0 = a0 + NA + 1;
idx.push(a0, c0, a0 + 1, a0 + 1, c0, c0 + 1);
}
var yg = new THREE.BufferGeometry();
yg.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
yg.setAttribute("uv", new THREE.Float32BufferAttribute(pos.map(function (v, i) { return i % 3 === 0 ? v * 3 : i % 3 === 1 ? v * 3 : 0; }).filter(function (v, i) { return i % 3 !== 2; }), 2));
yg.setIndex(idx);
yg.computeVertexNormals();
G.add(new THREE.Mesh(yg, M.steel));
var gR = NR[0];
for (var l = 0; l < 3; l++) {
var ring = [];
for (var q = 0; q <= 40; q++) {
var a3 = q / 40 * Math.PI * 2, r3 = gR[Math.round(q / 40 * NA) % NA] + 0.036 - l * 0.006;
ring.push(new THREE.Vector3(T.O.x + Math.cos(a3) * r3, yNeck + l * 0.022, T.O.z + Math.sin(a3) * r3));
}
G.add(rlFitRim(ring, l === 2 ? 0.007 : 0.011, l === 2 ? M.gold : M.steel, true));
}
var fz = T.O.z + R[6][8] + 0.042, fy = yW + L * 0.62;
rlGemAt(G, M, new THREE.Vector3(T.O.x, fy, fz), new THREE.Vector3(0, 0.15, 1), 0.03);
for (var sp = 0; sp < 4; sp++) {
var ray = new THREE.Mesh(new THREE.ConeGeometry(0.011, 0.07, 4), M.gold);
var ang = sp * Math.PI / 2 + Math.PI / 4;
ray.position.set(T.O.x + Math.cos(ang) * 0.05, fy + Math.sin(ang) * 0.05, fz - 0.004);
ray.rotation.z = ang - Math.PI / 2;
G.add(ray);
}
keep(G);
if (bones.pelvis) {
var Gp = rlFitFrame(bones.pelvis, body);
Gp.name = "relic-faulds";
var yP = yOf("spine_01", Gp) - 0.02;
var Pp = torsoRing(Gp, yP - 0.2, yP + 0.02, function (n) { return /^(pelvis|spine_01|thigh_[lr])$/i.test(n); });
var PR = rlFitRadii(Pp.pts, new THREE.Vector3(Pp.O.x, yP - 0.2, Pp.O.z), up, new THREE.Vector3(1, 0, 0), new THREE.Vector3(0, 0, 1), 0.22, 0, 1, 6, 32, 0.1);
for (var fl = 0; fl < 3; fl++) {
var t0 = 0.62 - fl * 0.24, t1 = t0 + 0.3;
var fg = rlFitShell(new THREE.Vector3(Pp.O.x, yP - 0.2, Pp.O.z), up, new THREE.Vector3(1, 0, 0), new THREE.Vector3(0, 0, 1), 0.22, t0, t1, PR.slice(Math.round(t0 * 5), Math.round(t0 * 5) + 2).concat([PR[Math.min(5, Math.round(t1 * 5))]]), 0.026 + fl * 0.007, function (t, a) { return (1 - (t - t0) / 0.3) * 0.008; });
Gp.add(new THREE.Mesh(fg, M.steel));
Gp.add(rlFitRim(fg.userData.ring(t0, 0.004), 0.006, M.gold, true));
}
keep(Gp);
}
["l", "r"].forEach(function (sd) {
var nm = "upperarm_" + sd;
if (!bones[nm])
return;
var own = new RegExp("^upperarm_" + sd + "$", "i");
var lames = [[-0.1, 0.12, 0.03], [0.06, 0.26, 0.024], [0.2, 0.38, 0.018]];
lames.forEach(function (lm, li) {
var P = rlFitLimb(E, bones, body, verts, nm, /lowerarm/i, own, lm[0], lm[1], lm[2], function (t, a) { var c = Math.cos(a); return 0.014 * Math.max(0, -c) + (li === 0 ? 0.014 * (1 - (t - lm[0]) / (lm[1] - lm[0])) : 0); }, [Math.PI * 0.32, Math.PI * 1.68], M, M.steel, { down: true });
if (!P)
return;
P.G.add(rlFitRim(P.geo.userData.ring(lm[1], 0.004, Math.PI * 0.32, Math.PI * 1.68), 0.008, M.gold, false));
if (li === 0) {
var tipR = P.R[0], c0 = new THREE.Vector3().copy(P.O).addScaledVector(P.ax, lm[0] * P.L);
var cap = new THREE.Mesh(new THREE.SphereGeometry(1, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2), M.steel);
var rr = Math.min(0.085, Math.max.apply(null, tipR)) + lm[2] + 0.012;
cap.scale.set(rr, rr * 0.7, rr);
cap.position.copy(c0);
cap.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), P.u.clone().negate());
P.G.add(cap);
var spike = new THREE.Mesh(new THREE.ConeGeometry(0.022, 0.12, 5), M.crystal);
var top2 = c0.clone().addScaledVector(P.u, -rr * 0.72).addScaledVector(P.ax, 0.03);
spike.position.copy(top2);
spike.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), P.u.clone().negate().addScaledVector(P.ax, 0.35).normalize());
P.G.add(spike);
rlGemAt(P.G, M, c0.clone().addScaledVector(P.w, (sd === "l" ? 1 : -1) * 0).addScaledVector(P.u, -rr * 0.2).addScaledVector(P.ax, P.L * 0.05 + rr * 0.65), P.ax.clone(), 0.014);
}
keep(P.G);
});
var lo = "lowerarm_" + sd;
var V = rlFitLimb(E, bones, body, verts, lo, /hand/i, new RegExp("^lowerarm_" + sd + "$", "i"), 0.2, 0.88, 0.016, function (t) { return 0.012 * (t - 0.2); }, null, M, M.steel, { down: true });
if (V) {
V.G.add(rlFitRim(V.geo.userData.ring(0.2, 0.004), 0.007, M.gold, true));
V.G.add(rlFitRim(V.geo.userData.ring(0.88, 0.004), 0.008, M.gold, true));
var top3 = new THREE.Vector3().copy(V.O).addScaledVector(V.ax, 0.55 * V.L).addScaledVector(V.u, -(Math.max.apply(null, V.R[4]) + 0.03));
rlGemAt(V.G, M, top3, V.u.clone().negate(), 0.012);
keep(V.G);
}
});
}
if (k === "longsnowboots")
["l", "r"].forEach(function (sd) {
var cn = "calf_" + sd, fn = "foot_" + sd;
var Gv = rlFitLimb(E, bones, body, verts, cn, /foot/i, new RegExp("^calf_" + sd + "$", "i"), 0.12, 0.97, 0.014, function (t, a) { return 0.008 * Math.sin(t * Math.PI) + 0.012 * Math.max(0, Math.cos(a)) * (t < 0.4 ? 1 : 0.4); }, null, M, M.steel, { front: true });
if (Gv) {
var cuff = Gv.geo.userData.ring(0.12, 0.012);
Gv.G.add(rlFitRim(cuff, 0.026, M.fur, true));
Gv.G.add(rlFitRim(Gv.geo.userData.ring(0.6, 0.004, -Math.PI * 0.45, Math.PI * 0.45), 0.006, M.gold, false));
var kc = new THREE.Vector3().copy(Gv.O).addScaledVector(Gv.ax, 0.02 * Gv.L).addScaledVector(Gv.u, Math.max(Gv.R[0][0], Gv.R[1][0]) + 0.03);
var cop = new THREE.Mesh(new THREE.SphereGeometry(0.065, 14, 8, 0, Math.PI * 2, 0, Math.PI / 2), M.steel);
cop.scale.set(1, 0.6, 1);
cop.position.copy(kc);
cop.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), Gv.u);
Gv.G.add(cop);
var kr = new THREE.Mesh(new THREE.TorusGeometry(0.065, 0.007, 5, 16), M.gold);
kr.position.copy(kc);
kr.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), Gv.u);
Gv.G.add(kr);
rlGemAt(Gv.G, M, kc.clone().addScaledVector(Gv.u, 0.04), Gv.u.clone(), 0.013);
keep(Gv.G);
}
var Gf = rlFitLimb(E, bones, body, verts, fn, /ball/i, new RegExp("^(foot_" + sd + "|ball_" + sd + ")$", "i"), -0.15, 1.25, 0.012, function (t, a) { return t > 1.0 ? -(t - 1.0) * 0.12 : 0; }, null, M, M.steel, { down: true });
if (Gf) {
Gf.G.add(rlFitRim(Gf.geo.userData.ring(-0.15, 0.004), 0.009, M.gold, true));
var ring = Gf.geo.userData.ring(1.25, 0), tip = new THREE.Vector3().copy(Gf.O).addScaledVector(Gf.ax, 1.32 * Gf.L).addScaledVector(Gf.u, 0.01);
var tp = [tip.x, tip.y, tip.z], ti = [];
ring.forEach(function (p) { tp.push(p.x, p.y, p.z); });
for (var q = 1; q < ring.length; q++)
ti.push(0, q, q + 1 >= ring.length ? 1 : q + 1);
var tg = new THREE.BufferGeometry();
tg.setAttribute("position", new THREE.Float32BufferAttribute(tp, 3));
tg.setIndex(ti);
tg.computeVertexNormals();
Gf.G.add(new THREE.Mesh(tg, M.steel));
keep(Gf.G);
}
});
if (k === "polecrown") {
var Gh = rlFitFrame(bones.Head, body);
Gh.name = "relic-crown";
var hp = rlFitLocal(Gh, verts, function (n) { return /^head$/i.test(n); });
if (hp.length > 20) {
var ymax = -1e9;
hp.forEach(function (p) { if (p.y > ymax)
ymax = p.y; });
var yb = ymax - 0.075, cx2 = 0, cz2 = 0, n2 = 0;
hp.forEach(function (p) { if (p.y > yb - 0.02 && p.y < yb + 0.04) {
cx2 += p.x;
cz2 += p.z;
n2++;
} });
if (n2) {
cx2 /= n2;
cz2 /= n2;
}
var O2 = new THREE.Vector3(cx2, yb, cz2), up2 = new THREE.Vector3(0, 1, 0);
var HR = rlFitRadii(hp, O2, up2, new THREE.Vector3(1, 0, 0), new THREE.Vector3(0, 0, 1), 0.05, 0, 1, 3, 24, 0.07);
var cg = rlFitShell(O2, up2, new THREE.Vector3(1, 0, 0), new THREE.Vector3(0, 0, 1), 0.05, 0, 1, HR, 0.006, function (t) { return t * 0.006; });
Gh.add(new THREE.Mesh(cg, M.gold));
Gh.add(rlFitRim(cg.userData.ring(0, 0.003), 0.006, M.gold, true));
Gh.add(rlFitRim(cg.userData.ring(1, 0.004), 0.005, M.gold, true));
var NAc = 24;
for (var q2 = 0; q2 < 12; q2++) {
var a4 = q2 / 12 * Math.PI * 2, j4 = Math.round(q2 / 12 * NAc) % NAc, r4 = HR[1][j4] + 0.01;
var fr = Math.cos(a4 - Math.PI / 2);
var h = 0.05 + 0.07 * Math.max(0, fr) * Math.max(0, fr) + (q2 % 2 ? 0 : 0.025);
var spn = new THREE.Mesh(new THREE.ConeGeometry(0.014 + (q2 % 2 ? 0 : 0.004), h, 4), M.crystal);
spn.position.set(O2.x + Math.cos(a4) * r4, yb + 0.05 + h / 2 - 0.005, O2.z + Math.sin(a4) * r4);
spn.rotation.y = -a4;
Gh.add(spn);
if (q2 % 2 === 0) {
var bead = new THREE.Mesh(new THREE.SphereGeometry(0.009, 8, 6), M.gold);
bead.position.set(O2.x + Math.cos(a4) * (r4 + 0.002), yb + 0.05, O2.z + Math.sin(a4) * (r4 + 0.002));
Gh.add(bead);
rlGemAt(Gh, M, new THREE.Vector3(O2.x + Math.cos(a4) * (r4 + 0.003), yb + 0.025, O2.z + Math.sin(a4) * (r4 + 0.003)), new THREE.Vector3(Math.cos(a4), 0, Math.sin(a4)), 0.008);
}
}
var fj = Math.round(0.25 * NAc) % NAc, fzr = HR[1][fj] + 0.012, sy = yb + 0.05 + 0.15;
var star = new THREE.Shape();
for (var p5 = 0; p5 < 8; p5++) {
var aa = p5 / 8 * Math.PI * 2, rr2 = p5 % 2 ? 0.012 : 0.034;
if (p5 === 0)
star.moveTo(Math.sin(aa) * rr2, Math.cos(aa) * rr2);
else
star.lineTo(Math.sin(aa) * rr2, Math.cos(aa) * rr2);
}
star.closePath();
var sm = new THREE.Mesh(new THREE.ExtrudeGeometry(star, { depth: 0.008, bevelEnabled: true, bevelThickness: 0.004, bevelSize: 0.003, bevelSegments: 1 }), M.gem);
sm.position.set(O2.x, sy, O2.z + fzr - 0.004);
Gh.add(sm);
keep(Gh);
}
else
bones.Head.remove(Gh);
}
if (k === "auroramantle" && bones.spine_03) {
var Gc = rlFitFrame(bones.spine_03, body);
Gc.name = "relic-mantle";
var yN = yOf("neck_01", Gc) || yOf("Head", Gc) - 0.1, yS = (yOf("upperarm_l", Gc) != null ? yOf("upperarm_l", Gc) : yN - 0.08);
var Tc = torsoRing(Gc, yS - 0.12, yS + 0.04);
var ups = new THREE.Vector3(0, 1, 0);
var CR = rlFitRadii(Tc.pts, new THREE.Vector3(Tc.O.x, yS - 0.12, Tc.O.z), ups, new THREE.Vector3(1, 0, 0), new THREE.Vector3(0, 0, 1), 0.16, 0, 1, 4, 32, 0.09);
var shR = CR[3], plate = !!(keys.indexOf("frostplate") >= 0), add = plate ? 0.07 : 0.035;
var yHem = (yOf("calf_l", Gc) != null ? yOf("calf_l", Gc) - 0.18 : yS - 1.0);
var cols = 18, rows = 14, a0c = Math.PI * 1.08, a1c = Math.PI * 1.92;
var a0s = Math.PI * 0.97, a1s = Math.PI * 2.03;
var cpos = [], cuv = [], cidx = [], base = [];
for (var rI = 0; rI <= rows; rI++) {
var f2 = rI / rows, yy2 = yS + 0.02 + (yHem - yS - 0.02) * f2;
for (var cI = 0; cI <= cols; cI++) {
var g2 = cI / cols, a5 = (a0s + (a1s - a0s) * g2) * (1 - Math.min(1, f2 * 2.2)) + (a0c + (a1c - a0c) * g2) * Math.min(1, f2 * 2.2);
var jj = Math.round(((a5 % (Math.PI * 2)) / (Math.PI * 2)) * 32) % 32, rr3 = shR[jj] + add + f2 * 0.08 + Math.pow(f2, 2) * 0.05;
var x5 = Tc.O.x + Math.cos(a5) * rr3, z5 = Tc.O.z + Math.sin(a5) * rr3;
var fold = Math.sin(g2 * Math.PI * 6) * 0.022 * f2;
x5 += Math.cos(a5) * fold;
z5 += Math.sin(a5) * fold;
cpos.push(x5, yy2, z5);
base.push(x5, yy2, z5);
cuv.push(g2, 1 - f2);
}
}
for (var r2 = 0; r2 < rows; r2++)
for (var c2 = 0; c2 < cols; c2++) {
var A0 = r2 * (cols + 1) + c2, C0 = A0 + cols + 1;
cidx.push(A0, A0 + 1, C0, A0 + 1, C0 + 1, C0);
}
var capeG = new THREE.BufferGeometry();
capeG.setAttribute("position", new THREE.Float32BufferAttribute(cpos, 3));
capeG.setAttribute("uv", new THREE.Float32BufferAttribute(cuv, 2));
capeG.setIndex(cidx);
capeG.computeVertexNormals();
var pivot = new THREE.Group();
pivot.position.set(Tc.O.x, yS + 0.02, Tc.O.z);
Gc.add(pivot);
var cm1 = new THREE.Mesh(capeG, M.cape), cm2 = new THREE.Mesh(capeG, M.lining);
cm1.position.set(-Tc.O.x, -(yS + 0.02), -Tc.O.z);
cm2.position.copy(cm1.position);
pivot.add(cm1);
pivot.add(cm2);
capes.push({ geo: capeG, base: base, cols: cols, rows: rows, pivot: pivot, ph: Math.random() * 6, cx: Tc.O.x, cz: Tc.O.z, lean: 0 });
var col1 = [], jN = 32;
for (var q3 = 0; q3 <= 40; q3++) {
var a6 = q3 / 40 * Math.PI * 2, j6 = Math.round(q3 / 40 * jN) % jN, r6 = shR[j6] * 0.9 + add * 0.6;
col1.push(new THREE.Vector3(Tc.O.x + Math.cos(a6) * r6, yS + 0.035, Tc.O.z + Math.sin(a6) * r6));
}
Gc.add(rlFitRim(col1, 0.032, M.fur, true));
var col2 = col1.map(function (p) { return new THREE.Vector3(Tc.O.x + (p.x - Tc.O.x) * 0.85, p.y + 0.03, Tc.O.z + (p.z - Tc.O.z) * 0.88); });
Gc.add(rlFitRim(col2, 0.022, M.fur, true));
[-1, 1].forEach(function (sx) {
var a7 = Math.PI / 2 + sx * 0.55, j7 = Math.round((a7 / (Math.PI * 2)) * 32) % 32, r7 = shR[j7] * 0.82 + add * 0.6 + 0.04;
var cp = new THREE.Vector3(Tc.O.x + Math.cos(a7) * r7, yS + 0.03, Tc.O.z + Math.sin(a7) * r7);
var disc = new THREE.Mesh(new THREE.CylinderGeometry(0.032, 0.032, 0.012, 16), M.gold);
disc.position.copy(cp);
disc.rotation.x = Math.PI / 2;
disc.rotation.z = -sx * 0.5;
Gc.add(disc);
rlGemAt(Gc, M, cp.clone().add(new THREE.Vector3(Math.cos(a7), 0, Math.sin(a7)).multiplyScalar(0.008)), new THREE.Vector3(Math.cos(a7), 0.1, Math.sin(a7)), 0.014);
});
var ch1 = new THREE.CatmullRomCurve3([0, 1, 2, 3, 4].map(function (i5) { var s5 = -1 + i5 / 2, a8 = Math.PI / 2 + s5 * 0.55, j8 = Math.round((a8 / (Math.PI * 2)) * 32) % 32, r8 = shR[j8] * 0.82 + add * 0.6 + 0.05; return new THREE.Vector3(Tc.O.x + Math.cos(a8) * r8, yS + 0.03 - 0.04 * (1 - s5 * s5), Tc.O.z + Math.sin(a8) * r8); }));
Gc.add(new THREE.Mesh(new THREE.TubeGeometry(ch1, 20, 0.004, 5, false), M.gold));
keep(Gc);
}
});
return { made: made, capes: capes };
},
function (key) {
var M = rlFitMats(), g = new THREE.Group();
function lathe(prof, mat, seg) { var pts = prof.map(function (p) { return new THREE.Vector2(p[0], p[1]); }); var m = new THREE.Mesh(new THREE.LatheGeometry(pts, seg || 12), mat); g.add(m); return m; }
function ext(shape, depth, mat, bev) { var m = new THREE.Mesh(new THREE.ExtrudeGeometry(shape, { depth: depth, bevelEnabled: true, bevelThickness: bev || depth * 0.6, bevelSize: bev || depth * 0.6, bevelSegments: 2, curveSegments: 10 }), mat); m.geometry.translate(0, 0, -depth / 2); g.add(m); return m; }
function shp(pts) { var s = new THREE.Shape(); pts.forEach(function (p, i) { if (i)
s.lineTo(p[0], p[1]);
else
s.moveTo(p[0], p[1]); }); s.closePath(); return s; }
function grip(y0, y1, r, mat) {
lathe([[0, y0], [r * 1.05, y0], [r, y0 + 0.01], [r * 0.92, (y0 + y1) / 2], [r, y1 - 0.01], [r * 1.05, y1], [0, y1]], mat || M.leather, 10);
for (var i = 0; i < 6; i++) {
var t = new THREE.Mesh(new THREE.TorusGeometry(r * 1.02, r * 0.18, 4, 10), M.gold);
t.rotation.x = Math.PI / 2;
t.position.y = y0 + 0.015 + (y1 - y0 - 0.03) * i / 5;
t.rotation.y = i * 0.4;
g.add(t);
}
}
function gem(x, y, z, s, ry) { var o = new THREE.Mesh(new THREE.OctahedronGeometry(s, 0), M.gem); o.position.set(x, y, z); o.scale.set(1, 1.25, 0.7); if (ry)
o.rotation.y = ry; g.add(o); return o; }
if (key === "frostbrand") {
grip(-0.1, 0.12, 0.019);
lathe([[0, -0.17], [0.03, -0.155], [0.036, -0.13], [0.024, -0.105], [0, -0.1]], M.gold, 12);
gem(0, -0.135, 0.03, 0.014);
gem(0, -0.135, -0.03, 0.014);
var wing = shp([[0, -0.02], [0.06, -0.015], [0.15, 0.01], [0.2, 0.06], [0.16, 0.04], [0.09, 0.03], [0, 0.03]]);
var w1 = ext(wing, 0.02, M.steel, 0.006);
w1.position.y = 0.13;
var w2 = ext(wing, 0.02, M.steel, 0.006);
w2.scale.x = -1;
w2.position.y = 0.13;
gem(0, 0.145, 0.016, 0.018);
gem(0, 0.145, -0.016, 0.018);
var blade = shp([[-0.04, 0], [0.04, 0], [0.036, 0.7], [0.024, 0.86], [0, 0.98], [-0.024, 0.86], [-0.036, 0.7]]);
var b1 = ext(blade, 0.012, M.crystal, 0.006);
b1.position.y = 0.16;
var ful = shp([[-0.009, 0.02], [0.009, 0.02], [0.007, 0.72], [0, 0.8], [-0.007, 0.72]]);
var f1 = ext(ful, 0.016, M.gem, 0.002);
f1.position.y = 0.16;
}
else if (key === "hoarfang") {
lathe([[0, -0.62], [0.022, -0.6], [0.017, -0.55], [0.016, 1.25], [0, 1.25]], M.steelD, 10);
for (var i = 0; i < 5; i++) {
var r = new THREE.Mesh(new THREE.TorusGeometry(0.019, 0.006, 5, 12), M.gold);
r.rotation.x = Math.PI / 2;
r.position.y = -0.3 + i * 0.35;
g.add(r);
}
grip(0.0, 0.3, 0.02);
lathe([[0, 1.22], [0.03, 1.24], [0.036, 1.3], [0.024, 1.34], [0, 1.34]], M.gold, 10);
gem(0, 1.29, 0.033, 0.012);
var head = shp([[0, 0], [0.055, 0.07], [0.045, 0.24], [0, 0.46], [-0.045, 0.24], [-0.055, 0.07]]);
var h1 = ext(head, 0.014, M.crystal, 0.008);
h1.position.y = 1.32;
var h2 = ext(head, 0.014, M.crystal, 0.008);
h2.position.y = 1.32;
h2.rotation.y = Math.PI / 2;
h2.scale.set(0.6, 0.85, 1);
var lug = shp([[0, 0], [0.09, 0.05], [0.12, 0.12], [0.05, 0.07], [0, 0.06]]);
var l1 = ext(lug, 0.01, M.steel, 0.004);
l1.position.y = 1.3;
var l2 = ext(lug, 0.01, M.steel, 0.004);
l2.position.y = 1.3;
l2.scale.x = -1;
}
else if (key === "aurorabow") {
grip(-0.07, 0.07, 0.022);
[1, -1].forEach(function (s) {
var pts = [];
for (var i = 0; i <= 16; i++) {
var t = i / 16;
pts.push(new THREE.Vector3(-0.02 - Math.sin(t * Math.PI * 0.9) * 0.13 + (t > 0.85 ? (t - 0.85) * 0.6 : 0), s * (0.07 + t * 0.58), 0));
}
var c = new THREE.CatmullRomCurve3(pts);
var limb = new THREE.Mesh(new THREE.TubeGeometry(c, 24, 0.014, 6, false), M.crystal);
g.add(limb);
var core = new THREE.Mesh(new THREE.TubeGeometry(c, 24, 0.006, 5, false), M.gem);
g.add(core);
var tip = new THREE.Mesh(new THREE.ConeGeometry(0.014, 0.06, 5), M.gold);
tip.position.copy(pts[16]);
tip.position.y += s * 0.025;
if (s < 0)
tip.rotation.z = Math.PI;
g.add(tip);
var cap = new THREE.Mesh(new THREE.TorusGeometry(0.02, 0.006, 5, 10), M.gold);
cap.rotation.x = Math.PI / 2;
cap.position.y = s * 0.075;
g.add(cap);
});
var st = new THREE.Mesh(new THREE.CylinderGeometry(0.0025, 0.0025, 1.36, 4), new THREE.MeshBasicMaterial({ color: 0xEAF6FF }));
st.position.set(0.035, 0, 0);
g.add(st);
gem(-0.03, 0, 0, 0.016);
g.rotation.z = 0;
g.position.y = 0;
var hold = new THREE.Group();
hold.add(g);
hold.position.y = 0.2;
return hold;
}
else if (key === "glacierfall") {
lathe([[0, -0.12], [0.03, -0.11], [0.03, -0.09], [0.02, -0.08], [0.019, 0.62], [0, 0.62]], M.steelD, 10);
grip(-0.08, 0.2, 0.022);
lathe([[0, -0.15], [0.03, -0.13], [0.034, -0.11], [0, -0.1]], M.gold, 10);
var hd = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.32, 8), M.iceHammer || M.crystal);
hd.rotation.z = Math.PI / 2;
hd.position.y = 0.66;
g.add(hd);
[-0.13, -0.05, 0.05, 0.13].forEach(function (x) { var b = new THREE.Mesh(new THREE.CylinderGeometry(0.106, 0.106, 0.022, 8), M.gold); b.rotation.z = Math.PI / 2; b.position.set(x, 0.66, 0); g.add(b); });
[-1, 1].forEach(function (s) { var f = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.1, 0.03, 8), M.steel); f.rotation.z = Math.PI / 2; f.position.set(s * 0.175, 0.66, 0); g.add(f); gem(s * 0.192, 0.66, 0, 0.026, Math.PI / 2); });
var sp = new THREE.Mesh(new THREE.ConeGeometry(0.035, 0.16, 6), M.crystal);
sp.position.y = 0.83;
g.add(sp);
}
else if (key === "longnight") {
var pts = [];
for (var i = 0; i <= 20; i++) {
var t = i / 20;
pts.push(new THREE.Vector3(Math.sin(t * 9) * 0.008, -0.35 + t * 1.6, Math.cos(t * 9) * 0.008));
}
g.add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 40, 0.02, 8, false), M.steelD));
for (var k2 = 0; k2 < 2; k2++) {
var sp2 = [];
for (var i2 = 0; i2 <= 40; i2++) {
var t2 = i2 / 40;
sp2.push(new THREE.Vector3(Math.cos(t2 * Math.PI * 10 + k2 * Math.PI) * 0.023, -0.3 + t2 * 1.5, Math.sin(t2 * Math.PI * 10 + k2 * Math.PI) * 0.023));
}
g.add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(sp2), 120, 0.004, 4, false), M.gold));
}
lathe([[0, -0.4], [0.02, -0.36], [0.028, -0.34], [0, -0.33]], M.gold, 10);
lathe([[0, 1.22], [0.03, 1.23], [0.045, 1.27], [0.03, 1.3], [0, 1.3]], M.gold, 12);
for (var c3 = 0; c3 < 4; c3++) {
var a = c3 / 4 * Math.PI * 2, cl = [];
for (var i3 = 0; i3 <= 10; i3++) {
var t3 = i3 / 10;
var r3 = 0.03 + Math.sin(t3 * Math.PI) * 0.075;
cl.push(new THREE.Vector3(Math.cos(a) * r3, 1.28 + t3 * 0.24, Math.sin(a) * r3));
}
g.add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(cl), 16, 0.009, 5, false), M.crystal));
}
var orb = new THREE.Mesh(new THREE.IcosahedronGeometry(0.06, 1), M.gem);
orb.position.y = 1.4;
g.add(orb);
var halo = new THREE.Mesh(new THREE.SphereGeometry(0.075, 16, 12), new THREE.MeshPhongMaterial({ color: 0xCFF0FF, transparent: true, opacity: 0.25, shininess: 150, specular: 0xFFFFFF, depthWrite: false }));
halo.position.y = 1.4;
g.add(halo);
}
else if (key === "dragontooth") {
grip(-0.06, 0.07, 0.017, M.leather);
lathe([[0, -0.1], [0.024, -0.09], [0.026, -0.075], [0.016, -0.062], [0, -0.06]], M.gold, 10);
gem(0, -0.08, 0.024, 0.01);
var gd = shp([[0, -0.012], [0.06, -0.01], [0.08, 0.012], [0.05, 0.004], [0, 0.014]]);
var g1 = ext(gd, 0.016, M.gold, 0.004);
g1.position.y = 0.075;
var g2 = ext(gd, 0.016, M.gold, 0.004);
g2.position.y = 0.075;
g2.scale.x = -1;
var tooth = new THREE.Shape();
tooth.moveTo(-0.028, 0);
tooth.quadraticCurveTo(-0.04, 0.17, 0.02, 0.33);
tooth.quadraticCurveTo(0.01, 0.16, 0.03, 0);
tooth.closePath();
var tm = new THREE.Mesh(new THREE.ExtrudeGeometry(tooth, { depth: 0.016, bevelEnabled: true, bevelThickness: 0.008, bevelSize: 0.006, bevelSegments: 3, curveSegments: 16 }), new THREE.MeshPhongMaterial({ color: 0xF2EAD6, shininess: 70, specular: 0xFFFFFF, emissive: 0x1A1810 }));
tm.geometry.translate(0, 0, -0.008);
tm.position.y = 0.085;
g.add(tm);
}
else if (key === "dragonshield") {
var sh = new THREE.Shape();
sh.moveTo(0, 0.34);
sh.quadraticCurveTo(0.27, 0.36, 0.28, 0.2);
sh.quadraticCurveTo(0.27, -0.12, 0, -0.36);
sh.quadraticCurveTo(-0.27, -0.12, -0.28, 0.2);
sh.quadraticCurveTo(-0.27, 0.36, 0, 0.34);
var face = new THREE.Mesh(new THREE.ExtrudeGeometry(sh, { depth: 0.03, bevelEnabled: true, bevelThickness: 0.012, bevelSize: 0.016, bevelSegments: 2, curveSegments: 14 }), M.steel);
face.geometry.translate(0, 0, -0.015);
var P = face.geometry.attributes.position;
for (var i4 = 0; i4 < P.count; i4++) {
var x = P.getX(i4);
P.setZ(i4, P.getZ(i4) - x * x * 0.7);
}
face.geometry.computeVertexNormals();
g.add(face);
var rim = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(sh.getSpacedPoints(48).map(function (p) { return new THREE.Vector3(p.x * 1.04, p.y * 1.04, 0.034 - p.x * p.x * 0.7); }), true), 96, 0.012, 6, true), M.gold);
g.add(rim);
var dr = shp([[0, 0.2], [0.03, 0.13], [0.2, 0.2], [0.12, 0.08], [0.18, 0.02], [0.07, 0.0], [0.03, -0.2], [0, -0.26], [-0.03, -0.2], [-0.07, 0.0], [-0.18, 0.02], [-0.12, 0.08], [-0.2, 0.2], [-0.03, 0.13]]);
var dm = ext(dr, 0.012, M.gold, 0.004);
dm.position.z = 0.05;
var P2 = dm.geometry.attributes.position;
for (var i5 = 0; i5 < P2.count; i5++) {
var x2 = P2.getX(i5);
P2.setZ(i5, P2.getZ(i5) - x2 * x2 * 0.7);
}
dm.geometry.computeVertexNormals();
gem(0, 0.13, 0.07, 0.024);
gem(-0.012, 0.155, 0.066, 0.006);
gem(0.012, 0.155, 0.066, 0.006);
var hold2 = new THREE.Group();
g.position.set(0, 0.2, 0.06);
hold2.add(g);
return hold2;
}
return g;
},
function (E, mesh) {
var hand = null, body = E.g.children[0];
E.model.traverse(function (o) { if (!hand && o.isBone && /^hand_r$/i.test(o.name))
hand = o; });
if (!hand)
return;
var carryMesh = mesh;
var G = rlFitFrame(hand, body);
G.userData.hdf = 1;
var ch = rlFitChild(hand, /middle/i), f = ch ? G.worldToLocal(ch.getWorldPosition(new THREE.Vector3())).normalize() : new THREE.Vector3(-1, 0, 0);
var fwd = new THREE.Vector3(0, 0, 1);
fwd.addScaledVector(f, -fwd.dot(f)).normalize();
var palm = new THREE.Vector3().crossVectors(f, fwd).normalize();
if (palm.y > 0)
palm.negate();
var holder = new THREE.Group();
holder.position.copy(f).multiplyScalar(0.075).addScaledVector(palm, 0.025);
try {
if (E.mixer)
E.mixer.update(0);
E.model.updateMatrixWorld(true);
var want = new THREE.Vector3(-0.25, 0.55, 0.8).normalize().applyQuaternion(body.getWorldQuaternion(new THREE.Quaternion()));
var gq = G.getWorldQuaternion(new THREE.Quaternion()).invert();
fwd = want.applyQuaternion(gq).normalize();
}
catch (e) { }
holder.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), fwd);
G.add(holder);
if (carryMesh.parent)
carryMesh.parent.remove(carryMesh);
carryMesh.position.set(0, 0, 0);
holder.add(carryMesh);
carryMesh.userData.inHand = G;
carryMesh.traverse(function (m) { m.userData.hdf = 1; if (m.isMesh)
m.castShadow = true; });
}
];
});
