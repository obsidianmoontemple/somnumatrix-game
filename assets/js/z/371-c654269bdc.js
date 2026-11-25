/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(371, function () {
return [
function (name, mpt, nrm) {
var k = "ph:" + name + ":" + mpt + (nrm ? ":n" : "");
if (EBS.tex[k])
return EBS.tex[k];
var own = name.slice(0, 2) === "b:", nm = own ? name.slice(2) : name, lite = ebsLiteNow();
var url = own ? "assets/textures/bundles/" + nm + (nrm ? "_n" : (lite ? "" : "-1k")) + ".jpg" : "assets/textures/photo/" + nm + (lite ? "" : "-1k") + ".jpg";
var t = new THREE.TextureLoader().load(url);
t.wrapS = t.wrapT = THREE.RepeatWrapping;
t.repeat.set(1 / mpt, 1 / mpt);
try {
t.anisotropy = Math.min(lite ? 2 : 8, renderer.capabilities.getMaxAnisotropy());
}
catch (e) { }
if (!nrm && THREE.sRGBEncoding && typeof renderer !== "undefined" && renderer && renderer.outputEncoding === THREE.sRGBEncoding)
t.encoding = THREE.sRGBEncoding;
return (EBS.tex[k] = t);
},
function (name, col, mpt, o) {
o = o || {};
var k = "s|" + name + "|" + col + "|" + (mpt || 0) + "|" + JSON.stringify(o);
if (EBS.mats[k])
return EBS.mats[k];
var own = name.slice(0, 2) === "b:", map = ebsPhotoTex(name, mpt || 2), m;
if (ebsLiteNow())
m = new THREE.MeshLambertMaterial({ color: col, map: map });
else {
m = new THREE.MeshPhongMaterial({ color: col, map: map, shininess: o.shine || (own ? 14 : 6), specular: o.spec || (own ? 0x2A2620 : 0x141210) });
if (own) {
m.normalMap = ebsPhotoTex(name, mpt || 2, true);
var nn = o.n === undefined ? 1 : o.n;
m.normalScale = new THREE.Vector2(nn, nn);
}
}
if (o.e !== undefined) {
m.emissive = new THREE.Color(o.e);
m.emissiveIntensity = o.ei || 0.6;
}
if (o.op !== undefined) {
m.transparent = true;
m.opacity = o.op;
m.depthWrite = false;
}
if (o.ds)
m.side = THREE.DoubleSide;
m.userData.noPhoto = 1;
m.userData.ldShared = 1;
return (EBS.mats[k] = m);
},
function (k) {
switch (k) {
case "black": return ebsS("b:marble", 0x3A383C, 3, { shine: 40, spec: 0x403C44 });
case "white": return ebsS("b:marble", 0xF0EEE8, 3, { shine: 30, spec: 0x3A3A3A });
case "grey": return ebsS("b:limestone", 0x8A8680, 3);
case "ashlar": return ebsS("b:ashlar", 0x7A7670, 3);
case "dark": return ebsS("b:ashlar", 0x3E3A3A, 3);
case "rock": return ebsS("b:strata", 0x6A625C, 6);
case "cave": return ebsS("b:cave", 0x5E5650, 5);
case "slate": return ebsS("b:slate", 0x4A4A50, 2);
case "tile": return ebsS("b:darktile", 0x6A6460, 2);
case "terracotta": return ebsS("b:terracotta", 0xB86A4A, 1.6);
case "cotto": return ebsS("b:cotto", 0xA86A50, 2);
case "bronze": return ebsS("b:brass", 0xA0703A, 1.2, { shine: 70, spec: 0x9A7A4A, n: 0.4 });
case "gold": return ebsS("b:brass", 0xE8B84A, 1.2, { shine: 90, spec: 0xFFE0A0, n: 0.3 });
case "silver": return ebsS("b:iron", 0xD8DCE4, 1.4, { shine: 90, spec: 0xFFFFFF, n: 0.3 });
case "iron": return ebsS("b:iron", 0x4A4A52, 1.4, { shine: 40, spec: 0x5A5A6A, n: 0.6 });
case "oak": return ebsS("b:oak", 0x6A4A30, 1.5);
case "planks": return ebsS("b:planks", 0x5A4430, 2);
case "deck": return ebsS("b:deck", 0x4A3A2A, 2);
case "velvet": return ebsS("b:velvet", 0x5A1A2A, 1);
case "damask": return ebsS("b:damask", 0x3A2A4A, 1.2);
case "moss": return ebsS("b:moss", 0x5A6A4A, 3);
case "stucco": return ebsS("plaster", 0xD8CCB8, 3);
case "earth": return ebsS("earth", 0x5A4E44, 4);
case "sand": return ebsS("sand", 0xD8C8A0, 4);
case "grass": return ebsS("grass", 0x6A8A4A, 3);
}
return ebsS("b:ashlar", 0x7A7670, 3);
},
function (col, o) {
o = o || {};
var k = "l" + col + "|" + (o.e || "") + "|" + (o.ds ? 1 : 0) + "|" + (o.op || "") + "|" + (o.map || "");
return ebsM(k, function () { var m = new THREE.MeshLambertMaterial({ color: col }); if (o.e !== undefined)
m.emissive = new THREE.Color(o.e); if (o.ds)
m.side = THREE.DoubleSide; if (o.op !== undefined) {
m.transparent = true;
m.opacity = o.op;
m.depthWrite = false;
} if (o.map)
m.map = o.map; m.userData.noPhoto = 1; return m; });
},
function (fg, bg) {
return ebsCanvas("meander" + fg + bg, 256, 32, function (x, W, H) {
x.fillStyle = bg;
x.fillRect(0, 0, W, H);
x.strokeStyle = fg;
x.lineWidth = 3;
for (var i = 0; i < 8; i++) {
var o = i * 32;
x.beginPath();
x.moveTo(o + 2, H - 6);
x.lineTo(o + 2, 6);
x.lineTo(o + 26, 6);
x.lineTo(o + 26, 22);
x.lineTo(o + 10, 22);
x.lineTo(o + 10, 14);
x.lineTo(o + 18, 14);
x.stroke();
}
x.fillStyle = fg;
x.fillRect(0, 0, W, 2);
x.fillRect(0, H - 2, W, 2);
});
},
function (kind) {
var P = { red: ["#7A1E14", "#C89A6A", "#2A120C"], black: ["#141012", "#7A6A4A", "#3A2A1E"], blue: ["#1A2A4A", "#C8B888", "#0E1424"], green: ["#2A4A2A", "#E8D8A8", "#14240E"], gold: ["#6A4A1A", "#F0D890", "#2A1A0A"] }[kind] || ["#3A2A20", "#C8B080", "#1A120C"];
return ebsCanvas("fresco" + kind, 256, 256, function (x, W, H) {
var r = wRand(kind.length * 31 + 7);
x.fillStyle = P[1];
x.fillRect(0, 0, W, H);
x.fillStyle = P[0];
x.fillRect(0, H * 0.68, W, H * 0.32);
x.fillRect(0, 0, W, H * 0.12);
x.fillStyle = P[2];
x.fillRect(0, H * 0.66, W, 4);
x.fillRect(0, H * 0.12, W, 3);
x.strokeStyle = P[0];
x.lineWidth = 3;
x.strokeRect(18, H * 0.2, W - 36, H * 0.4);
x.fillStyle = P[2];
for (var i = 0; i < 5; i++) {
var cx = 36 + i * 46, cy = H * 0.47;
x.beginPath();
x.arc(cx, cy - 26, 6, 0, 7);
x.fill();
x.beginPath();
x.moveTo(cx - 9, cy - 18);
x.lineTo(cx + 9, cy - 18);
x.lineTo(cx + 12, cy + 18);
x.lineTo(cx - 12, cy + 18);
x.closePath();
x.fill();
x.fillRect(cx + (r() < 0.5 ? 8 : -12), cy - 16, 4, 22);
}
x.fillStyle = "rgba(0,0,0,.12)";
for (i = 0; i < 300; i++)
x.fillRect(r() * W, r() * H, 2, 2);
});
},
function () {
return ebsCanvas("fireflow", 256, 256, function (x, W, H) {
var r = wRand(91);
x.fillStyle = "#5A0E04";
x.fillRect(0, 0, W, H);
for (var i = 0; i < 60; i++) {
var gx = r() * W, gy = r() * H, rr = 10 + r() * 40, gr = x.createRadialGradient(gx, gy, 0, gx, gy, rr);
gr.addColorStop(0, "rgba(255,220,120,.9)");
gr.addColorStop(0.4, "rgba(255,120,20,.6)");
gr.addColorStop(1, "rgba(160,20,0,0)");
x.fillStyle = gr;
x.fillRect(gx - rr, gy - rr, rr * 2, rr * 2);
}
x.strokeStyle = "rgba(255,240,180,.55)";
x.lineWidth = 2;
for (i = 0; i < 16; i++) {
x.beginPath();
var px = r() * W;
x.moveTo(px, 0);
for (var y = 0; y <= H; y += 16)
x.lineTo(px + Math.sin(y / 30 + i) * 14, y);
x.stroke();
}
});
},
function () {
return ebsCanvas("ripple", 256, 256, function (x, W, H) {
var r = wRand(97);
x.fillStyle = "#808080";
x.fillRect(0, 0, W, H);
for (var i = 0; i < 140; i++) {
x.strokeStyle = "rgba(" + (r() < 0.5 ? "255,255,255" : "0,0,0") + "," + (0.06 + r() * 0.12) + ")";
x.lineWidth = 1 + r() * 2;
var px = r() * W, py = r() * H, L = 20 + r() * 60;
x.beginPath();
x.moveTo(px, py);
x.bezierCurveTo(px + L * 0.3, py - 3, px + L * 0.6, py + 3, px + L, py);
x.stroke();
}
});
},
function () {
return ebsCanvas("veins", 512, 512, function (x, W, H) {
var r = wRand(101);
x.fillStyle = "#060406";
x.fillRect(0, 0, W, H);
for (var i = 0; i < 900; i++) {
x.fillStyle = "rgba(" + (160 + r() * 90 | 0) + "," + (90 + r() * 80 | 0) + "," + (70 + r() * 60 | 0) + "," + (0.15 + r() * 0.5) + ")";
x.fillRect(r() * W, r() * H, 1 + r() * 1.5, 1 + r() * 1.5);
}
x.lineWidth = 1.2;
for (i = 0; i < 40; i++) {
x.strokeStyle = "rgba(255," + (120 + r() * 80 | 0) + ",60," + (0.1 + r() * 0.25) + ")";
var px = r() * W, py = r() * H;
x.beginPath();
x.moveTo(px, py);
for (var k = 0; k < 8; k++) {
px += (r() - 0.5) * 60;
py += (r() - 0.5) * 60;
x.lineTo(px, py);
}
x.stroke();
}
});
},
function () {
return ebsCanvas("asph", 64, 128, function (x, W, H) {
x.clearRect(0, 0, W, H);
x.strokeStyle = "#5A6A50";
x.lineWidth = 2.5;
x.beginPath();
x.moveTo(W / 2, H);
x.lineTo(W / 2, H * 0.18);
x.stroke();
x.strokeStyle = "#4A5A44";
x.lineWidth = 2;
for (var l = 0; l < 4; l++) {
x.beginPath();
x.moveTo(W / 2, H);
x.quadraticCurveTo(W / 2 + (l - 1.5) * 16, H * 0.7, W / 2 + (l - 1.5) * 24, H * 0.62);
x.stroke();
}
var r = wRand(5);
for (var i = 0; i < 26; i++) {
var y = H * 0.16 + i * H * 0.018, s = 2.4 + r() * 1.4, ox = (r() - 0.5) * 14 * (1 - i / 30);
x.fillStyle = "rgba(240,238,228,.95)";
x.beginPath();
for (var p = 0; p < 6; p++) {
var a = p / 6 * 6.283;
x.lineTo(W / 2 + ox + Math.cos(a) * s, y + Math.sin(a) * s);
}
x.fill();
x.fillStyle = "rgba(150,110,90,.9)";
x.fillRect(W / 2 + ox - 0.6, y - 0.6, 1.2, 1.2);
}
});
},
function (x, z, feet) {
var g = EBS.sgrid;
if (!g)
return false;
var L = g[Math.floor(x / EBS_CELL) + "," + Math.floor(z / EBS_CELL)];
if (!L)
return false;
for (var i = 0; i < L.length; i++) {
var S = L[i];
if (S.off || feet >= S.y1 - 0.4 || feet + 1.7 <= S.y0)
continue;
var dx = x - S.x, dz = z - S.z;
if (S.r !== undefined) {
if (dx * dx + dz * dz < S.r * S.r)
return true;
continue;
}
var lx = dx * S.c - dz * S.s, lz = dx * S.s + dz * S.c;
if (Math.abs(lx) < S.hw && Math.abs(lz) < S.hd)
return true;
}
return false;
},
function (dt, L, full) {
if (!EBS.pool)
return;
if (full) {
var y = camera.position.y, here = EBS_LSRC.filter(function (S) { return !S.off && Math.abs(S.x - L.x) < S.dist * 2.5 && Math.abs(S.z - L.z) < S.dist * 2.5; });
here.forEach(function (S) { S.d = Math.hypot(S.x - L.x, S.z - L.z, (S.y - y) * 0.5) / Math.max(8, S.dist); });
here.sort(function (a, b) { return a.d - b.d; });
EBS.pool.forEach(function (P, i) { var S = here[i] || null; P.src = S; if (S) {
P.L.position.set(S.x, S.y, S.z);
P.L.color.setHex(S.col);
P.L.distance = S.dist;
}
else {
P.L.intensity = 0;
} });
}
EBS.pool.forEach(function (P) { var S = P.src; if (!S)
return; S.ph += dt; var w = S.flick ? 0.84 + 0.09 * Math.sin(S.ph * 6.1) + 0.05 * Math.sin(S.ph * 9.7 + 1.3) + 0.03 * Math.sin(S.ph * 2.3) : 1; P.L.intensity = S.k * w; });
},
function (g, x, y, z, s, col) {
var cols = col ? [col, col, 0xFFE0A0] : [0xFF5A10, 0xFF9A30, 0xFFD070], out = [];
for (var j = 0; j < 3; j++) {
var f = wCone((0.22 - j * 0.05) * s, (0.7 - j * 0.12) * s, ebsGlowM(cols[j], 0.75 - j * 0.15, true), x + (j - 1) * 0.03 * s, y + (0.3 - j * 0.03) * s, z, g, 7);
f.userData.keep = 1;
out.push(f);
EBS.flames.push({ m: f, s: 1, ph: Math.random() * 9 + j });
}
var gl = wGlow(cols[1], 2.6 * s, 0.45);
gl.position.set(x, y + 0.35 * s, z);
g.add(gl);
return out;
},
function (g, x, y, z, s, wx, wz, col) {
s = s || 1;
var br = ebsStone("bronze");
for (var i = 0; i < 3; i++) {
var a = i / 3 * Math.PI * 2, l = wCyl(0.03 * s, 0.04 * s, 1.1 * s, br, x + Math.cos(a) * 0.22 * s, y + 0.55 * s, z + Math.sin(a) * 0.22 * s, g, 5);
l.rotation.z = Math.cos(a) * 0.18;
l.rotation.x = -Math.sin(a) * 0.18;
}
wCyl(0.42 * s, 0.2 * s, 0.28 * s, br, x, y + 1.18 * s, z, g, 12);
wCyl(0.36 * s, 0.36 * s, 0.04 * s, ebsGlowM(0xFF6A20), x, y + 1.3 * s, z, g, 12);
ebsFlame(g, x, y + 1.28 * s, z, s * 1.4, col);
if (wx !== undefined)
ebsLightSrc(wx, y + 2.2 * s, wz, col || 0xFF8A40, 1.6 * s, 22 * s);
},
function (g, x, y, z, ry, wx, wz, col) {
var tg = new THREE.Group();
tg.position.set(x, y, z);
tg.rotation.y = ry || 0;
g.add(tg);
var arm = wBox(0.06, 0.06, 0.4, ebsStone("iron"), 0, 0, 0.2, tg);
var st = wCyl(0.04, 0.03, 0.6, ebsStone("oak"), 0, 0.2, 0.4, tg, 6);
st.rotation.x = 0.35;
ebsFlame(tg, 0, 0.48, 0.5, 0.7, col);
if (wx !== undefined)
ebsLightSrc(wx, y + 0.6, wz, col || 0xFF9A50, 1.2, 16);
},
function (g, col, op) {
col = col || 0xA8C0E8;
var c = new THREE.Color(col);
g.traverse(function (m) {
if (!m.isMesh || !m.material)
return;
var ms = Array.isArray(m.material) ? m.material : [m.material];
var nm = ms.map(function (mt) { var q = mt.clone(); q.transparent = true; q.opacity = op || 0.55; q.depthWrite = false; if (q.color)
q.color.lerp(c, 0.55); if (q.emissive) {
q.emissive = c.clone().multiplyScalar(0.35);
} q.userData.noPhoto = 1; return q; });
m.material = Array.isArray(m.material) ? nm : nm[0];
m.castShadow = false;
});
var gl = wGlow(col, 2.4, 0.22);
gl.position.y = 1.1;
g.add(gl);
return g;
},
function () {
if (EBS_SHADE_GEO)
return EBS_SHADE_GEO;
var parts = [], robe = new THREE.CylinderGeometry(0.16, 0.42, 1.5, 9, 1, true);
robe.translate(0, 0.85, 0);
parts.push(robe);
var head = new THREE.SphereGeometry(0.15, 9, 7);
head.translate(0, 1.72, 0);
parts.push(head);
var hood = new THREE.ConeGeometry(0.21, 0.42, 9, 1, true);
hood.translate(0, 1.8, -0.02);
parts.push(hood);
var arms = new THREE.CylinderGeometry(0.06, 0.09, 0.7, 5);
arms.rotateZ(1.2);
arms.translate(0, 1.25, 0.1);
parts.push(arms);
EBS_SHADE_GEO = gwMerge(parts.map(function (p) { return p.index ? p.toNonIndexed() : p; }));
EBS_SHADE_GEO.userData.shared = 1;
return EBS_SHADE_GEO;
},
function (cx, cz, r, n, yfn, col, op, seed) {
if (EBS.lite)
n = Math.ceil(n * 0.4);
var m = new THREE.InstancedMesh(ebsShadeGeo(), ebsGlowM(col || 0xA8BCE0, op || 0.32, true), n), R = wRand(seed || 1), list = [];
var M = new THREE.Matrix4(), q = new THREE.Quaternion(), s = new THREE.Vector3(1, 1, 1), p = new THREE.Vector3(), up = new THREE.Vector3(0, 1, 0);
for (var i = 0; i < n; i++) {
var a = R() * 6.283, d = Math.sqrt(R()) * r, x = cx + Math.cos(a) * d, z = cz + Math.sin(a) * d, y = yfn(x, z), ry = R() * 6.283, sc = 0.85 + R() * 0.3;
list.push({ x: x, z: z, y: y, ry: ry, sc: sc, ph: R() * 20, sp: 0.2 + R() * 0.4, a: R() * 6.283 });
q.setFromAxisAngle(up, ry);
s.set(sc, sc, sc);
p.set(x, y, z);
M.compose(p, q, s);
m.setMatrixAt(i, M);
}
m.instanceMatrix.needsUpdate = true;
m.frustumCulled = false;
m.userData.keep = 1;
EBS.G.add(m);
var C = { m: m, list: list, cx: cx, cz: cz, r: r, yfn: yfn, t: 0 };
EBS.crowds.push(C);
return C;
},
function (C, dt, L) {
var on = Math.hypot(L.x - C.cx, L.z - C.cz) < C.r + (EBS.lite ? 500 : 900);
if (C.m.visible !== on)
C.m.visible = on;
if (!on)
return;
C.t += dt;
if (C.t < (EBS.lite ? 0.12 : 0.05))
return;
var st = C.t;
C.t = 0;
var M = new THREE.Matrix4(), q = new THREE.Quaternion(), s = new THREE.Vector3(), p = new THREE.Vector3(), up = new THREE.Vector3(0, 1, 0);
for (var i = 0; i < C.list.length; i++) {
var S = C.list[i];
S.ph += st;
S.a += st * 0.05 * S.sp;
var x = S.x + Math.cos(S.a + S.ph * 0.1) * 3, z = S.z + Math.sin(S.a + S.ph * 0.1) * 3, y = S.y + 0.25 + Math.sin(S.ph * 0.8) * 0.18;
q.setFromAxisAngle(up, S.ry + Math.sin(S.ph * 0.2) * 0.6);
s.set(S.sc, S.sc, S.sc);
p.set(x, y, z);
M.compose(p, q, s);
C.m.setMatrixAt(i, M);
}
C.m.instanceMatrix.needsUpdate = true;
},
function (cx, cz, r, n, yfn, seed, col) {
if (EBS.lite)
n = Math.ceil(n * 0.35);
var a = new THREE.PlaneGeometry(0.5, 1.0);
a.translate(0, 0.5, 0);
var b = a.clone();
b.rotateY(Math.PI / 2);
var geo = gwMerge([a.toNonIndexed(), b.toNonIndexed()]);
var mat = ebsM("asphMat" + (col || 0), function () { var m = new THREE.MeshLambertMaterial({ map: ebsAsphTex(), transparent: true, alphaTest: 0.4, side: THREE.DoubleSide, color: col || 0xFFFFFF }); m.userData.noPhoto = 1; return m; });
var m = new THREE.InstancedMesh(geo, mat, n), R = wRand(seed || 3), M = new THREE.Matrix4(), q = new THREE.Quaternion(), s = new THREE.Vector3(), p = new THREE.Vector3(), up = new THREE.Vector3(0, 1, 0), k = 0;
for (var i = 0; i < n; i++) {
var t = R() * 6.283, d = Math.sqrt(R()) * r, x = cx + Math.cos(t) * d, z = cz + Math.sin(t) * d;
if (ebsWaterAt(x, z) !== null)
continue;
var y = yfn(x, z), sc = 0.7 + R() * 0.8;
q.setFromAxisAngle(up, R() * 3);
s.set(sc, sc * (0.8 + R() * 0.6), sc);
p.set(x, y, z);
M.compose(p, q, s);
m.setMatrixAt(k++, M);
}
m.count = k;
m.instanceMatrix.needsUpdate = true;
m.userData.keep = 1;
m.frustumCulled = false;
EBS.G.add(m);
EBS.fields = (EBS.fields || []);
EBS.fields.push({ m: m, x: cx, z: cz, r: r });
return m;
},
function (g, x, y, z, rx, ry, rz, col, flat) {
var c = wSph(1, ebsLam(col), x, y, z, g, EBS.lite ? 6 : 8);
c.scale.set(rx, ry, rz);
if (!EBS.lite && typeof leafGeo === "function" && typeof leafMat === "function") {
try {
var R0 = Math.max(rx, rz), rq = Math.max(1, Math.round(R0 * 1.15 * 2) / 2), gk = "leafg" + rq;
var lg = EBS.tex[gk] || (EBS.tex[gk] = leafGeo(rq));
lg.userData.shared = 1;
var lm = ebsM("leafm" + col, function () { var q = leafMat(col); q.userData.noPhoto = 1; return q; });
var L = new THREE.Mesh(lg, lm);
L.position.set(x, y, z);
L.scale.set(R0 * 1.15 / rq, ry * 1.15 / rq, R0 * 1.15 / rq);
L.castShadow = false;
g.add(L);
}
catch (e) { }
}
return c;
},
function (kind, g, x, y, z, s, seed) {
var r = wRand(seed || 1), t = new THREE.Group();
t.position.set(x, y, z);
t.rotation.y = r() * 6.28;
g.add(t);
s = s || 1;
var bark = ebsS("bark", kind === "cypressw" ? 0xC8C4BC : 0x4A3E34, 2);
if (kind === "poplar") {
wCyl(0.18 * s, 0.32 * s, 9 * s, bark, 0, 4.5 * s, 0, t, 7);
ebsCrown(t, 0, 11 * s, 0, 2.2 * s, 7 * s, 2.2 * s, 0x1E2A1C);
}
else if (kind === "willow") {
var tr = wCyl(0.3 * s, 0.5 * s, 5 * s, bark, 0, 2.5 * s, 0, t, 7);
tr.rotation.z = (r() - 0.5) * 0.2;
ebsCrown(t, 0, 6.4 * s, 0, 4.2 * s, 2.4 * s, 4.2 * s, 0x2A3A26);
var dm = ebsLam(0x24341E, { ds: true });
for (var i = 0; i < (EBS.lite ? 6 : 12); i++) {
var a = i / 12 * 6.28, f = wCone(0.7 * s, 4.2 * s, dm, Math.cos(a) * 3.4 * s, 4.6 * s, Math.sin(a) * 3.4 * s, t, 5);
f.rotation.x = Math.PI;
}
}
else if (kind === "cypress" || kind === "cypressw") {
var wh = kind === "cypressw";
wCyl(0.15 * s, 0.25 * s, 3 * s, bark, 0, 1.5 * s, 0, t, 6);
var cm = wh ? ebsLam(0xE8ECF0, { e: 0x2A3038 }) : ebsLam(0x1A2A1A), cc = wCone(1.3 * s, 11 * s, cm, 0, 7.5 * s, 0, t, EBS.lite ? 7 : 10);
cc.scale.x = cc.scale.z = 1;
if (wh) {
var gl = wGlow(0xDDE8FF, 9 * s, 0.18);
gl.position.y = 7 * s;
t.add(gl);
}
}
else if (kind === "myrtle") {
wCyl(0.1 * s, 0.16 * s, 1.6 * s, bark, 0, 0.8 * s, 0, t, 5);
ebsCrown(t, 0, 2.2 * s, 0, 1.8 * s, 1.4 * s, 1.8 * s, 0x2A4A2E);
ebsCrown(t, 0.9 * s, 1.6 * s, 0.4 * s, 1.1 * s, 0.9 * s, 1.1 * s, 0x2E5232);
}
else if (kind === "pomegranate") {
wCyl(0.14 * s, 0.22 * s, 2.4 * s, bark, 0, 1.2 * s, 0, t, 6);
ebsCrown(t, 0, 3.2 * s, 0, 2.2 * s, 1.6 * s, 2.2 * s, 0x2E5A2A);
var fm = ebsS("b:velvet", 0xB0182A, 0.6, { shine: 50 });
for (var k = 0; k < (EBS.lite ? 6 : 14); k++) {
var aa = r() * 6.28, hh = 2.6 + r() * 1.4;
wSph(0.14 * s, fm, Math.cos(aa) * 2.0 * s, hh * s, Math.sin(aa) * 2.0 * s, t, 7);
}
}
else if (kind === "laurel") {
wCyl(0.16 * s, 0.26 * s, 3 * s, bark, 0, 1.5 * s, 0, t, 6);
ebsCrown(t, 0, 4.4 * s, 0, 2.6 * s, 2.4 * s, 2.6 * s, 0x3A7A2E);
}
else if (kind === "holmoak") {
var to = wCyl(0.4 * s, 0.6 * s, 5 * s, bark, 0, 2.5 * s, 0, t, 7);
to.rotation.z = 0.08;
ebsCrown(t, 0, 6.6 * s, 0, 4.6 * s, 3 * s, 4.6 * s, 0x182418);
ebsCrown(t, 2.4 * s, 5.6 * s, 1 * s, 2.4 * s, 1.8 * s, 2.4 * s, 0x1A281A);
}
else if (kind === "elm") {
wCyl(1.8 * s, 2.8 * s, 14 * s, bark, 0, 7 * s, 0, t, 10);
for (var b = 0; b < 7; b++) {
var ab = b / 7 * 6.28 + r() * 0.4, br = wCyl(0.5 * s, 0.9 * s, 13 * s, bark, Math.cos(ab) * 5 * s, 15 * s, Math.sin(ab) * 5 * s, t, 7);
br.rotation.z = Math.cos(ab) * 0.9;
br.rotation.x = -Math.sin(ab) * 0.9;
ebsCrown(t, Math.cos(ab) * 11 * s, 21 * s, Math.sin(ab) * 11 * s, 6 * s, 3.6 * s, 6 * s, 0x2A3424);
}
ebsCrown(t, 0, 24 * s, 0, 9 * s, 5 * s, 9 * s, 0x26301F);
}
else {
wCyl(0.25 * s, 0.4 * s, 4 * s, bark, 0, 2 * s, 0, t, 6);
ebsCrown(t, 0, 5 * s, 0, 2.6 * s, 2.2 * s, 2.6 * s, 0x2A3A26);
}
var sr = { poplar: 0.5, willow: 0.7, cypress: 0.4, cypressw: 0.4, myrtle: 0.4, pomegranate: 0.4, laurel: 0.45, holmoak: 0.8, elm: 3.2 }[kind] || 0.5;
ebsRound(x, z, sr * s, -5, 30 * s);
return t;
},
function (g, x, y, z, s, seed) {
var r = wRand(seed || 1), m = ebsS("bark", 0x2A2420, 2), t = new THREE.Group();
t.position.set(x, y, z);
g.add(t);
var tr = wCyl(0.16 * s, 0.4 * s, 6 * s, m, 0, 3 * s, 0, t, 6);
tr.rotation.z = (r() - 0.5) * 0.2;
for (var i = 0; i < (EBS.lite ? 3 : 6); i++) {
var b = wCyl(0.03 * s, 0.1 * s, (2.2 + r() * 2) * s, m, 0, 0, 0, t, 4), a = r() * 6.28, up = 0.5 + r() * 0.7;
b.position.set(Math.cos(a) * 0.7 * s, (3.6 + r() * 2.4) * s, Math.sin(a) * 0.7 * s);
b.rotation.z = Math.cos(a) * up;
b.rotation.x = -Math.sin(a) * up;
}
ebsRound(x, z, 0.4 * s, -5, 8 * s);
return t;
},
function (g, x, y, z, s, seed, mat) {
var geo = new THREE.IcosahedronGeometry(1, EBS.lite ? 0 : 1), pos = geo.attributes.position, r = wRand(seed || 1);
for (var i = 0; i < pos.count; i++) {
var k = 0.75 + r() * 0.5;
pos.setXYZ(i, pos.getX(i) * k, pos.getY(i) * k * 0.75, pos.getZ(i) * k);
}
geo.computeVertexNormals();
var m = new THREE.Mesh(geo, mat || ebsStone("rock"));
m.position.set(x, y + s * 0.3, z);
m.scale.setScalar(s);
m.rotation.y = r() * 6;
g.add(m);
return m;
},
function (g, x, y, z, h, r, mat, capMat) {
var seg = EBS.lite ? 10 : 18;
wCyl(r * 1.3, r * 1.4, r * 0.5, mat, x, y + r * 0.25, z, g, seg);
wCyl(r * 0.85, r, h - r * 1.4, mat, x, y + r * 0.5 + (h - r * 1.4) / 2, z, g, seg);
var cm = capMat || mat;
wBox(r * 2.6, r * 0.35, r * 1.4, cm, x, y + h - r * 0.6, z, g);
[-1, 1].forEach(function (sd) { var v = new THREE.Mesh(new THREE.TorusGeometry(r * 0.36, r * 0.14, 6, 12), cm); v.position.set(x + sd * r * 1.2, y + h - r * 0.75, z); g.add(v); });
wBox(r * 2.4, r * 0.25, r * 2.4, cm, x, y + h - r * 0.15, z, g);
},
function (g, x, y, z, w, h, dep, mat, ry) {
var sh = new THREE.Shape();
sh.moveTo(-w / 2, 0);
sh.lineTo(w / 2, 0);
sh.lineTo(0, h);
sh.lineTo(-w / 2, 0);
var geo = new THREE.ExtrudeGeometry(sh, { depth: dep, bevelEnabled: false });
geo.translate(0, 0, -dep / 2);
var m = new THREE.Mesh(geo, mat);
m.position.set(x, y, z);
if (ry)
m.rotation.y = ry;
g.add(m);
return m;
},
function (G, o) {
var g = new THREE.Group();
g.position.set(o.x, o.y, o.z);
g.rotation.y = o.rot || 0;
G.add(g);
var mat = o.mat || ebsStone("white"), cm = o.colMat || mat, n = o.steps === undefined ? 3 : o.steps, st = 0.42, top = n * st;
ebsSteps(G, { x: o.x, y: o.y, z: o.z, rot: o.rot }, o.w, o.d, n, st, o.baseMat || mat);
var H = o.colH || 9, r = Math.max(0.45, H / 14), nx = o.nx || 6, nz = o.nz || Math.max(4, Math.round(nx * o.d / o.w)), w2 = o.w / 2 - r * 1.4, d2 = o.d / 2 - r * 1.4;
for (var i = 0; i < nx; i++) {
var cx = -w2 + i * (2 * w2 / (nx - 1));
[d2, -d2].forEach(function (cz) { (o.ionic ? ebsIonic : ebsColumn)(g, cx, top, cz, H, r, cm, o.capMat); var P = ebsW(o, cx, cz); ebsRound(P[0], P[1], r * 1.05, o.y - 2, o.y + top + H); });
}
for (var j = 1; j < nz - 1; j++) {
var cz2 = -d2 + j * (2 * d2 / (nz - 1));
[w2, -w2].forEach(function (cx2) { (o.ionic ? ebsIonic : ebsColumn)(g, cx2, top, cz2, H, r, cm, o.capMat); var P2 = ebsW(o, cx2, cz2); ebsRound(P2[0], P2[1], r * 1.05, o.y - 2, o.y + top + H); });
}
var y0 = top + H;
wBox(o.w - 0.4, r * 1.1, o.d - 0.4, mat, 0, y0 + r * 0.55, 0, g);
var fr = new THREE.MeshLambertMaterial({ map: ebsMeander(o.friezeFg || "#D8B860", o.friezeBg || "#1A1412"), color: 0xFFFFFF });
fr.map = fr.map.clone();
fr.map.needsUpdate = true;
fr.map.repeat.set(Math.round(o.w / 4), 1);
fr.userData.noPhoto = 1;
[o.d / 2 - 0.15, -o.d / 2 + 0.15].forEach(function (fz) { var f = wBox(o.w - 0.3, r * 0.9, 0.1, fr, 0, y0 + r * 1.55, fz, g); });
[o.w / 2 - 0.15, -o.w / 2 + 0.15].forEach(function (fx) { var f = wBox(0.1, r * 0.9, o.d - 0.3, fr, fx, y0 + r * 1.55, 0, g); });
wBox(o.w - 0.2, r * 0.9, o.d - 0.2, mat, 0, y0 + r * 1.55, 0, g);
wBox(o.w + 0.6, r * 0.45, o.d + 0.6, mat, 0, y0 + r * 2.2, 0, g);
var ph = o.w * 0.14;
ebsPediment(g, 0, y0 + r * 2.4, o.d / 2 - 0.2, o.w + 0.4, ph, 0.6, mat);
ebsPediment(g, 0, y0 + r * 2.4, -o.d / 2 + 0.2, o.w + 0.4, ph, 0.6, mat);
ebsRoof(g, 0, y0 + r * 2.4, 0, o.w + 0.6, o.d + 0.4, ph, o.roofMat || ebsStone("terracotta"));
if (!EBS.lite)
for (var k = 0; k < 5; k++) {
var fx2 = (k - 2) * o.w * 0.12, fh = ph * (0.8 - Math.abs(k - 2) * 0.22);
var fig = wBox(o.w * 0.05, fh, 0.4, o.friezeMat || mat, fx2, y0 + r * 2.4 + fh / 2 + 0.1, o.d / 2 + 0.12, g);
}
if (!o.noCella) {
var cw = o.w - r * 6.5, cd = o.d - r * 6.5, ch = H + r * 0.2, wm = o.cellaMat || mat, dw = (o.door && o.door[0]) || Math.min(4, cw * 0.3), dh = (o.door && o.door[1]) || Math.min(ch * 0.72, 7);
wBox(cw, ch, 0.7, wm, 0, top + ch / 2, -cd / 2, g);
wBox(0.7, ch, cd, wm, -cw / 2, top + ch / 2, 0, g);
wBox(0.7, ch, cd, wm, cw / 2, top + ch / 2, 0, g);
wBox((cw - dw) / 2, ch, 0.7, wm, -(cw + dw) / 4, top + ch / 2, cd / 2, g);
wBox((cw - dw) / 2, ch, 0.7, wm, (cw + dw) / 4, top + ch / 2, cd / 2, g);
wBox(dw, ch - dh, 0.7, wm, 0, top + dh + (ch - dh) / 2, cd / 2, g);
var dk = wBox(dw, dh, 0.2, ebsGlowM(o.dark || 0x07060A), 0, top + dh / 2, cd / 2 - 0.2, g);
var br = o.doorMat || ebsStone("bronze");
wBox(dw + 0.5, 0.4, 0.9, br, 0, top + dh + 0.2, cd / 2, g);
wBox(0.3, dh, 0.9, br, -dw / 2 - 0.15, top + dh / 2, cd / 2, g);
wBox(0.3, dh, 0.9, br, dw / 2 + 0.15, top + dh / 2, cd / 2, g);
[-1, 1].forEach(function (sd) { var lf = wBox(dw / 2, dh - 0.1, 0.14, br, sd * (dw / 2 + dw / 4 * 0.2), top + dh / 2, cd / 2 + dw / 4, g); lf.rotation.y = sd * 1.25; lf.position.x = sd * (dw / 2 + 0.1); lf.position.z = cd / 2 + dw / 4 * 0.9; });
var C0 = ebsW(o, 0, 0);
ebsSolid(C0[0], C0[1], cw + 0.7, cd + 0.7, o.y - 2, o.y + top + ch, o.rot);
var D = ebsW(o, 0, cd / 2 + 1.6);
if (o.room)
ebsDoor(D[0], D[1], 3.2, o.name || "the doorway", o.room, o.y + top);
if (o.lamps !== false) {
var T1 = ebsW(o, -dw / 2 - 1.2, cd / 2 + 0.5), T2 = ebsW(o, dw / 2 + 1.2, cd / 2 + 0.5);
ebsTorch(g, -dw / 2 - 1.2, top + dh * 0.65, cd / 2 + 0.4, 0, T1[0], T1[1], o.torchCol);
ebsTorch(g, dw / 2 + 1.2, top + dh * 0.65, cd / 2 + 0.4, 0, T2[0], T2[1], o.torchCol);
}
}
return g;
},
function (G, o) {
var g = new THREE.Group();
g.position.set(o.x, o.y, o.z);
g.rotation.y = o.rot || 0;
G.add(g);
var mat = o.mat || ebsStone("ashlar"), w = o.w, d = o.d, h = o.h || 8, dw = o.dw || 3.2, dh = o.dh || Math.min(h * 0.7, 5.5);
wBox(w + 1, 0.6, d + 1, o.baseMat || mat, 0, 0.3, 0, g);
ebsFloor(o.x, o.z, w + 1, d + 1, o.y + 0.6, { rot: o.rot });
wBox(w, h, 0.8, mat, 0, 0.6 + h / 2, -d / 2, g);
wBox(0.8, h, d, mat, -w / 2, 0.6 + h / 2, 0, g);
wBox(0.8, h, d, mat, w / 2, 0.6 + h / 2, 0, g);
wBox((w - dw) / 2, h, 0.8, mat, -(w + dw) / 4, 0.6 + h / 2, d / 2, g);
wBox((w - dw) / 2, h, 0.8, mat, (w + dw) / 4, 0.6 + h / 2, d / 2, g);
wBox(dw, h - dh, 0.8, mat, 0, 0.6 + dh + (h - dh) / 2, d / 2, g);
wBox(w + 0.8, 0.5, d + 0.8, o.trimMat || mat, 0, 0.6 + h + 0.25, 0, g);
if (o.gable)
ebsRoof(g, 0, 0.6 + h + 0.5, 0, w + 1.2, d + 1, w * 0.16, o.roofMat || ebsStone("terracotta"));
else
wBox(w + 0.4, 0.5, d + 0.4, o.roofMat || ebsStone("slate"), 0, 0.6 + h + 0.75, 0, g);
wBox(dw, dh, 0.2, ebsGlowM(o.dark || 0x07060A), 0, 0.6 + dh / 2, d / 2 - 0.25, g);
var br = o.doorMat || ebsStone("bronze");
wBox(dw + 0.5, 0.35, 1, br, 0, 0.6 + dh + 0.18, d / 2, g);
wBox(0.28, dh, 1, br, -dw / 2 - 0.14, 0.6 + dh / 2, d / 2, g);
wBox(0.28, dh, 1, br, dw / 2 + 0.14, 0.6 + dh / 2, d / 2, g);
if (o.porch !== false) {
var pr = 0.45;
[-dw / 2 - 1.6, dw / 2 + 1.6].forEach(function (px) { ebsColumn(g, px, 0.6, d / 2 + 2.6, h * 0.8, pr, o.colMat || mat); var P = ebsW(o, px, d / 2 + 2.6); ebsRound(P[0], P[1], pr, o.y - 2, o.y + h); });
wBox(dw + 5, 0.6, 3.4, o.trimMat || mat, 0, 0.6 + h * 0.8 + 0.3, d / 2 + 1.7, g);
}
var C0 = ebsW(o, 0, 0);
ebsSolid(C0[0], C0[1], w + 0.8, d + 0.8, o.y - 2, o.y + h + 1, o.rot);
var D = ebsW(o, 0, d / 2 + 1.4);
if (o.room)
ebsDoor(D[0], D[1], 3, o.name || "the door", o.room, o.y + 0.6);
if (o.lamps !== false) {
var T1 = ebsW(o, -dw / 2 - 0.9, d / 2 + 0.5), T2 = ebsW(o, dw / 2 + 0.9, d / 2 + 0.5);
ebsTorch(g, -dw / 2 - 0.9, 0.6 + dh * 0.7, d / 2 + 0.45, 0, T1[0], T1[1], o.torchCol);
ebsTorch(g, dw / 2 + 0.9, 0.6 + dh * 0.7, d / 2 + 0.45, 0, T2[0], T2[1], o.torchCol);
}
return g;
},
function (g, x0, z0, x1, z1, y, h, th, mat, crenel) {
var L = Math.hypot(x1 - x0, z1 - z0), a = Math.atan2(x1 - x0, z1 - z0), cx = (x0 + x1) / 2, cz = (z0 + z1) / 2;
var w = wBox(th, h, L, mat, cx, y + h / 2, cz, g);
w.rotation.y = a;
if (crenel && !EBS.lite) {
var n = Math.floor(L / 3);
for (var i = 0; i < n; i++) {
var t = (i + 0.5) / n, m = wBox(th + 0.2, 1.2, 1.4, mat, x0 + (x1 - x0) * t, y + h + 0.6, z0 + (z1 - z0) * t, g);
m.rotation.y = a;
}
}
ebsSolid(cx, cz, th + 0.4, L, y - 20, y + h, a);
return w;
},
function (g, x, y, z, r, h, mat, capMat) {
wCyl(r, r * 1.08, h, mat, x, y + h / 2, z, g, EBS.lite ? 10 : 16);
wCyl(r * 1.15, r * 1.15, 1.2, capMat || mat, x, y + h + 0.6, z, g, EBS.lite ? 10 : 16);
if (!EBS.lite)
for (var i = 0; i < 10; i++) {
var a = i / 10 * 6.28;
wBox(1, 1.4, 0.8, capMat || mat, x + Math.cos(a) * r * 1.08, y + h + 1.9, z + Math.sin(a) * r * 1.08, g).rotation.y = -a;
}
ebsRound(x, z, r * 1.1, y - 20, y + h + 3);
},
function (g, x, y, z, s, mat, o) {
o = o || {};
var t = new THREE.Group();
t.position.set(x, y, z);
t.rotation.y = o.ry || 0;
g.add(t);
s = s || 1;
if (o.plinth !== false) {
wBox(1.3 * s, 1.0 * s, 1.3 * s, o.plinthMat || ebsStone("grey"), 0, 0.5 * s, 0, t);
wBox(1.5 * s, 0.15 * s, 1.5 * s, o.plinthMat || ebsStone("grey"), 0, 1.02 * s, 0, t);
}
var b = o.plinth === false ? 0 : 1.1 * s, pts = [];
for (var i = 0; i <= 10; i++) {
var hh = i / 10, rr = (0.42 - 0.2 * hh + 0.03 * Math.sin(hh * 30)) * (o.robe || 1);
pts.push(new THREE.Vector2(Math.max(0.05, rr) * s, hh * 1.45 * s));
}
var robe = new THREE.Mesh(new THREE.LatheGeometry(pts, EBS.lite ? 9 : 16), mat);
robe.position.y = b;
t.add(robe);
wSph(0.24 * s, mat, 0, b + 1.62 * s, 0, t, 10).scale.y = 0.85;
wSph(0.15 * s, mat, 0, b + 1.82 * s, 0, t, 10);
var head = wSph(0.13 * s, mat, 0, b + 1.98 * s, 0.01 * s, t, 10);
if (o.veil) {
var vl = wCone(0.2 * s, 0.5 * s, mat, 0, b + 2.02 * s, -0.03 * s, t, 10);
}
var armL = wCyl(0.06 * s, 0.07 * s, 0.7 * s, mat, -0.3 * s, b + 1.32 * s, 0.08 * s, t, 6), armR = wCyl(0.06 * s, 0.07 * s, 0.7 * s, mat, 0.3 * s, b + 1.32 * s, 0.08 * s, t, 6);
if (o.pose === "raise") {
armR.rotation.z = 2.4;
armR.position.set(0.42 * s, b + 1.85 * s, 0);
}
else if (o.pose === "grief") {
armL.rotation.x = -1.9;
armR.rotation.x = -1.9;
armL.position.set(-0.12 * s, b + 1.75 * s, 0.22 * s);
armR.position.set(0.12 * s, b + 1.75 * s, 0.22 * s);
}
else {
armL.rotation.z = 0.18;
armR.rotation.z = -0.18;
}
if (o.holds === "torch") {
var tc = wCyl(0.03 * s, 0.04 * s, 0.9 * s, ebsStone("bronze"), 0.45 * s, b + 2.05 * s, 0, t, 5);
ebsFlame(t, 0.45 * s, b + 2.45 * s, 0, 0.7 * s);
}
else if (o.holds === "sceptre")
wCyl(0.025 * s, 0.025 * s, 2.2 * s, ebsStone("gold"), 0.42 * s, b + 1.1 * s, 0.1 * s, t, 5);
else if (o.holds === "sickle") {
var sk = new THREE.Mesh(new THREE.TorusGeometry(0.22 * s, 0.025 * s, 4, 10, Math.PI), ebsStone("iron"));
sk.position.set(0.46 * s, b + 1.9 * s, 0.1 * s);
t.add(sk);
}
else if (o.holds === "poppies")
for (var p = 0; p < 4; p++)
wSph(0.05 * s, ebsGlowM(0xB01818), -0.4 * s + p * 0.04 * s, b + 1.5 * s + p * 0.03 * s, 0.22 * s, t, 5);
if (o.solid !== false)
ebsRound(o.wx === undefined ? x : o.wx, o.wz === undefined ? z : o.wz, 0.8 * s, y - 2, y + 3 * s);
return t;
},
function (g, x, y, z, ry, title, sub, facts, wx, wz) {
var t = new THREE.Group();
t.position.set(x, y, z);
t.rotation.y = ry || 0;
g.add(t);
wBox(1.2, 2.1, 0.3, ebsStone("white"), 0, 1.05, 0, t);
var top = new THREE.Mesh(new THREE.CylinderGeometry(0.6, 0.6, 0.3, 12, 1, false, 0, Math.PI), ebsStone("white"));
top.rotation.x = Math.PI / 2;
top.rotation.z = Math.PI / 2;
top.position.y = 2.1;
t.add(top);
var sg = wSign([title.toUpperCase(), "press E to read"], 1.0, 0.6, "#E8E2D4", "#3A2A1A");
sg.position.set(0, 1.4, 0.16);
t.add(sg);
var X = wx === undefined ? x : wx, Z = wz === undefined ? z : wz;
ebsRound(X, Z, 0.7, y - 2, y + 2.4);
ebsSpot(X + Math.sin(ry || 0) * 1.4, Z + Math.cos(ry || 0) * 1.4, 2.4, title, "read", function () { worldCard(worldFacts(title, sub, [], facts)); }, y);
},
function (x, z, P, m) {
var b = EBS_PBOX.get(P);
if (!b || b.n !== P.length) {
b = { n: P.length, x0: 1e9, x1: -1e9, z0: 1e9, z1: -1e9 };
for (var i = 0; i < P.length; i++) {
var q = P[i];
if (q[0] < b.x0)
b.x0 = q[0];
if (q[0] > b.x1)
b.x1 = q[0];
if (q[1] < b.z0)
b.z0 = q[1];
if (q[1] > b.z1)
b.z1 = q[1];
}
EBS_PBOX.set(P, b);
}
return x < b.x0 - m || x > b.x1 + m || z < b.z0 - m || z > b.z1 + m;
},
function (x, z) {
for (var k in EBS_RIVERS) {
var R = EBS_RIVERS[k], hw = R.w / 2;
if (ebsPathFar(x, z, R.pts, hw + 26))
continue;
var d = ebsPathD(x, z, R.pts);
if (d < hw + 26) {
var k2 = d < hw ? 1 : ebsSm(d - hw, 26);
EBS._bed = Math.min(EBS._bed, R.lvl - 3.5 - (d < hw ? (1 - d / hw) * 3 : 0));
EBS._bk = Math.max(EBS._bk, k2);
}
}
var Pr = EBS_PHLEG_RING, dr = Math.abs(Math.hypot(x - Pr.x, z - Pr.z) - Pr.r);
if (dr < Pr.w / 2 + 26) {
var k3 = dr < Pr.w / 2 ? 1 : ebsSm(dr - Pr.w / 2, 26);
EBS._bed = Math.min(EBS._bed, -1.6 - 3.5 - (dr < Pr.w / 2 ? (1 - dr / (Pr.w / 2)) * 3 : 0));
EBS._bk = Math.max(EBS._bk, k3);
}
},
function (x, z) {
var h = wFbm(x * 0.0022 + 20, z * 0.0022 + 20, 7, 4) * 16 - 8 + wFbm(x * 0.018, z * 0.018, 11, 2) * 1.6;
var A = EBS_AT;
if (z > 3420) {
var cl = 240 * ebsSm(Math.max(0, 3800 - z), 330) * (Math.abs(x) < 1800 ? 1 : ebsSm(Math.abs(x) - 1800, 600));
h = h * (1 - cl / 240) + cl + wFbm(x * 0.01, z * 0.01, 5, 3) * 12 * (cl / 240);
if (Math.abs(x) < 40 && z > 3460 && z < 4180) {
var sy = ebsStairY(z);
if (sy !== null) {
var wv = Math.abs(x) < 14 ? 1 : ebsSm(Math.abs(x) - 14, 26);
h = h * (1 - wv) + (sy - 0.6) * wv;
}
}
}
if (z > 4172 && z < 4300 && Math.abs(x) < 30)
h = Math.max(h, 250);
h += ebsRimH(x, z) * ebsRimKeep(x, z);
var dp = Math.hypot(x - A.palace.x, z - A.palace.z), kp = ebsSm(Math.max(0, dp - 220), 300);
if (dp < 220)
kp = 1;
h = h * (1 - kp) + A.palace.h * kp;
h += 70 * ebsSm(Math.hypot(x - 3420, z + 3420), 360);
var dt = Math.hypot(x - A.tmouth.x, z - A.tmouth.z);
if (dt < 520) {
var ring = ebsSm(Math.abs(dt - 470), 60) * 6;
h = h * (1 - ebsSm(Math.max(0, dt - 470), 40)) + ring;
if (dt < 430)
h = -Math.min(420, (430 - dt) * 3.2);
}
[[A.cross, 90, 0], [A.gate, 70, 0.5], [A.landS, 50, 0.6], [A.landN, 50, 0.6], [A.judge, 70, 0.2], [A.vest, 140, 0.2], [A.lethe, 40, null], [A.memory, 60, null]].forEach(function (F) { var k = ebsSm(Math.hypot(x - F[0].x, z - F[0].z), F[1]); if (k > 0)
h = h * (1 - k) + (F[2] === null ? h : F[2]) * k; });
EBS._bed = 1e9;
EBS._bk = 0;
ebsRiverCut(x, z);
if (EBS._bk > 0)
h = h * (1 - EBS._bk) + Math.min(h, EBS._bed) * EBS._bk;
var ld = ebsLakeD(x, z);
if (ld < 40) {
var kl = ld < 0 ? 1 : ebsSm(ld, 40);
h = h * (1 - kl) + (-8 - (ld < 0 ? Math.min(6, -ld * 0.03) : 0)) * kl;
}
return h;
},
function (x, z) {
for (var k in EBS_RIVERS) {
var R = EBS_RIVERS[k];
if (!ebsPathFar(x, z, R.pts, R.w / 2) && ebsPathD(x, z, R.pts) < R.w / 2)
return { lvl: R.lvl, k: k };
}
var Pr = EBS_PHLEG_RING;
if (Math.abs(Math.hypot(x - Pr.x, z - Pr.z) - Pr.r) < Pr.w / 2)
return { lvl: -1.6, k: "phleg" };
if (ebsLakeD(x, z) < 0)
return { lvl: -2.4, k: "lake" };
return null;
},
function (x, z) {
var lx = x - EBS_TAE_X, d = Math.hypot(lx * 0.8, (z - 120) * 1.1), h = 60 * ebsSm(d, 900) - 14 + wFbm(lx * 0.006, z * 0.006, 23, 4) * 18;
h += 110 * ebsSm(Math.hypot(lx, z + 260), 330);
var ty = ebsSm(Math.hypot(lx, z - 200), 70);
h = h * (1 - ty) + 40 * ty;
var ky = ebsSm(Math.hypot(lx, z + 80), 40);
h = h * (1 - ky) + 44 * ky;
return h;
},
function (x, z) {
var lx = x - EBS_TAR_X, T = EBS_TT, h = wFbm(lx * 0.004 + 50, z * 0.004 + 50, 31, 4) * 24 - 10;
var q = Math.hypot(lx / 1900, z / 1900);
if (q > 0.9)
h += Math.pow(q - 0.9, 1.3) * 9000;
h += T.sis.h * ebsSm(Math.hypot(lx - T.sis.x, z - T.sis.z), T.sis.r);
var dh = Math.hypot(lx - T.hydra.x, z - T.hydra.z);
if (dh < T.hydra.r + 60)
h = h * (1 - ebsSm(Math.max(0, dh - T.hydra.r), 60)) - 30 * ebsSm(dh, T.hydra.r + 60);
var dtn = Math.hypot(lx - T.tant.x, z - T.tant.z);
if (dtn < T.tant.r + 30)
h = Math.min(h, -3 + dtn * 0.02);
[[T.arrive, 90], [T.prison, 260], [T.danaids, 60], [T.ixion, 40], [T.tower, 60]].forEach(function (F) { var k = ebsSm(Math.hypot(lx - F[0].x, z - F[0].z), F[1]); h = h * (1 - k) + 0 * k; });
var fd = Math.min(ebsPathD(lx, z, [[-1600, 300], [-800, 420], [0, 250], [600, 380], [1500, 200]]), ebsPathD(lx, z, [[400, -500], [900, -900], [1300, -1300]]));
if (fd < 10)
h -= 6 * (1 - fd / 10);
return h;
},
function (x, z) {
var lx = x - EBS_TAR_X, T = EBS_TT;
if (Math.hypot(lx - T.tant.x, z - T.tant.z) < T.tant.r)
return { lvl: -1, k: "tantalus" };
var fd = Math.min(ebsPathD(lx, z, [[-1600, 300], [-800, 420], [0, 250], [600, 380], [1500, 200]]), ebsPathD(lx, z, [[400, -500], [900, -900], [1300, -1300]]));
if (fd < 6)
return { lvl: -2.5, k: "fire" };
return null;
},
function (x, z) {
var lx = x - EBS_ELY_X, E = EBS_EL, h = wFbm(lx * 0.003 + 70, z * 0.003 + 70, 41, 4) * 14 - 5;
var q = Math.hypot(lx / 1900, (z + 200) / 1950);
if (q > 0.92)
h += Math.pow(q - 0.92, 1.3) * 6000;
if (z < E.sea)
h = Math.min(h, -8 - (E.sea - z) * 0.02);
else if (z < E.sea + 60)
h = h * ebsSm(Math.max(0, E.sea + 60 - z), 60) + (z - E.sea) * 0.05 * (1 - ebsSm(Math.max(0, E.sea + 60 - z), 60));
var di = Math.hypot(lx - E.isle.x, z - E.isle.z);
if (di < E.isle.r + 80)
h = Math.max(h, (30 * ebsSm(di, E.isle.r) + (di < E.isle.r + 80 ? -8 + 8 * ebsSm(Math.max(0, di - E.isle.r), 80) * 0 : 0)));
if (Math.abs(lx) < 6 && z < E.sea + 40 && z > E.isle.z + E.isle.r - 20)
h = Math.max(h, 1.5);
h -= 18 * ebsSm(Math.hypot(lx - E.valley.x, z - E.valley.z), E.valley.r);
[[E.arrive, 80], [E.stadium, 170], [E.hall, 70], [E.odeion, 70], [E.temple, 80]].forEach(function (F) { var k = ebsSm(Math.hypot(lx - F[0].x, z - F[0].z), F[1]); h = h * (1 - k) + 1 * k; });
var rd = ebsPathD(lx, z, EBS_ERID);
if (rd < 30) {
var kk = rd < 18 ? 1 : ebsSm(rd - 18, 12);
h = h * (1 - kk) + Math.min(h, -3.5) * kk;
}
var lt = Math.hypot(lx - E.valley.x, z - E.valley.z);
if (lt < 70)
h = Math.min(h, -21);
return h;
},
function (x, z, h) {
var A = EBS_AT, c = 0x5A5250;
if (h > 40 && !(z > 3460 && Math.abs(x) < 16))
return h > 140 ? 0x3A3634 : 0x4A4440;
if (z > 2560)
c = 0x4A4442;
var dp = Math.hypot(x - A.palace.x, z - A.palace.z);
if (dp < 260)
c = 0x3A3A34;
if (Math.hypot(x - A.mourn.x, z - A.mourn.z) < A.mourn.r)
c = 0x3A4A38;
if (Math.hypot(x - A.grove.x, z - A.grove.z) < A.grove.r)
c = 0x2E3A2A;
if (Math.hypot(x - A.asph.x, z - A.asph.z) < A.asph.r && z < 1700)
c = 0x6A6A5E;
var dt = Math.hypot(x - A.tmouth.x, z - A.tmouth.z);
if (dt < 700)
c = dt < 600 ? 0x4A2A22 : 0x5A3A30;
if (x < -2700 && z < -1500)
c = 0x2A3038;
if (x > 2000 && z < -2600)
c = 0x3A3448;
if (h < -1)
c = 0x2A2622;
return c;
},
function (x, z, h) {
var r = ebsRegion(x);
if (r === "main")
return ebsColMain(x, z, h);
if (r === "taenarum")
return h < 1 ? 0xC8B890 : h > 70 ? 0x8A8478 : 0x8A9A5A;
if (r === "tartarus")
return h > 60 ? 0x6A4A44 : h < -2 ? 0xFF6A2A : 0x8A5248;
if (r === "elysium")
return h < 0 ? 0xC8C0A0 : h > 40 ? 0x8A9A78 : 0x6A9448;
if (r === "path")
return 0x3A3638;
return 0x444444;
},
function (G, cx, cz, size, cells, mat, fine) {
var g = new THREE.PlaneGeometry(size, size, cells, cells);
g.rotateX(-Math.PI / 2);
var p = g.attributes.position, cols = new Float32Array(p.count * 3), c = new THREE.Color(), F = EBS.fineBox;
for (var i = 0; i < p.count; i++) {
var x = p.getX(i) + cx, z = p.getZ(i) + cz, h = ebsLand(x, z);
if (!fine && F && x > F.x0 + 24 && x < F.x1 - 24 && z > F.z0 + 24 && z < F.z1 - 24)
h -= 60;
p.setY(i, h);
c.setHex(ebsColRegion(x, z, h));
var n = 0.78 + wNoise(x * 0.08, z * 0.08, 9) * 0.26 + wNoise(x * 0.006, z * 0.006, 4) * 0.14;
cols[i * 3] = c.r * n;
cols[i * 3 + 1] = c.g * n;
cols[i * 3 + 2] = c.b * n;
}
g.setAttribute("color", new THREE.BufferAttribute(cols, 3));
g.computeVertexNormals();
var m = new THREE.Mesh(g, mat);
m.position.set(cx, 0, cz);
m.receiveShadow = true;
m.userData.keep = 1;
G.add(m);
var T = { g: m, x: cx, z: cz, r: size * 0.71, region: ebsRegion(cx) };
EBS.tiles.push(T);
return T;
},
function (G) {
var lite = EBS.lite, ts = 2300, cells = lite ? 64 : 112;
EBS.fineBox = { x0: -320, x1: 320, z0: 3380, z1: 4300 };
for (var i = 0; i < 4; i++)
for (var j = 0; j < 4; j++)
ebsTile(G, -3450 + i * ts, -3450 + j * ts, ts, cells, ebsGroundMat("main"));
var fm = ebsM("groundFine", function () { var m = new THREE.MeshLambertMaterial({ vertexColors: true, map: ebsPhotoTex("b:strata", 14), polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2 }); m.userData.noPhoto = 1; return m; });
var F = EBS.fineBox, fs = Math.max(F.x1 - F.x0, F.z1 - F.z0);
ebsTile(G, (F.x0 + F.x1) / 2, (F.z0 + F.z1) / 2, fs, lite ? 110 : 184, fm, true);
[[EBS_TAE_X, 0, 2400, lite ? 72 : 120, "taenarum"], [EBS_TAR_X, 0, 4200, lite ? 84 : 150, "tartarus"], [EBS_ELY_X, -200, 4200, lite ? 84 : 150, "elysium"], [EBS_PATH_X, 0, 1000, lite ? 80 : 140, "path"]].forEach(function (R) { ebsTile(G, R[0], R[1], R[2], R[3], ebsGroundMat(R[4])); });
},
function (pts, w, y) {
var dense = [pts[0]];
for (var i = 1; i < pts.length; i++) {
var a = pts[i - 1], b = pts[i], L = Math.hypot(b[0] - a[0], b[1] - a[1]), n = Math.max(1, Math.ceil(L / 24));
for (var k = 1; k <= n; k++)
dense.push([a[0] + (b[0] - a[0]) * k / n, a[1] + (b[1] - a[1]) * k / n]);
}
var pos = [], uv = [], idx = [], run = 0;
dense.forEach(function (p, i) {
var q = dense[Math.min(i + 1, dense.length - 1)], o = dense[Math.max(i - 1, 0)], dx = q[0] - o[0], dz = q[1] - o[1], L = Math.hypot(dx, dz) || 1, nx = -dz / L * w / 2, nz = dx / L * w / 2;
if (i > 0)
run += Math.hypot(p[0] - dense[i - 1][0], p[1] - dense[i - 1][1]);
pos.push(p[0] + nx, y, p[1] + nz, p[0] - nx, y, p[1] - nz);
uv.push(0, run / w, 1, run / w);
if (i > 0) {
var b = (i - 1) * 2;
idx.push(b, b + 2, b + 1, b + 1, b + 2, b + 3);
}
});
var g = new THREE.BufferGeometry();
g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
g.setIndex(idx);
g.computeVertexNormals();
return g;
},
function (col, fire, op) {
return ebsM("water" + col + (fire ? "f" : ""), function () {
var m;
if (fire) {
var t = ebsFireTex().clone();
t.needsUpdate = true;
t.wrapS = t.wrapT = THREE.RepeatWrapping;
m = new THREE.MeshBasicMaterial({ map: t, color: 0xFFFFFF });
m.userData.flow = t;
}
else {
var r = ebsRippleTex().clone();
r.needsUpdate = true;
r.wrapS = r.wrapT = THREE.RepeatWrapping;
m = new THREE.MeshPhongMaterial({ color: col, map: r, shininess: 90, specular: 0x6A7A8A, transparent: true, opacity: op || 0.9 });
m.userData.flow = r;
}
m.userData.noPhoto = 1;
return m;
});
},
function (G) {
for (var k in EBS_RIVERS) {
var R = EBS_RIVERS[k], m = new THREE.Mesh(ebsRibbon(R.pts, R.w + 6, R.lvl), ebsWaterMat(R.col, R.fire, k === "lethe" ? 0.82 : 0.92));
m.userData.keep = 1;
G.add(m);
EBS.flows.push({ m: m.material, sp: R.fire ? 0.05 : k === "styx" ? 0.012 : 0.02 });
if (R.fire) {
ebsDim(R.pts, function (x, z) { var gl = wGlow(0xFF7A2A, 60, 0.35); gl.position.set(x, R.lvl + 4, z); G.add(gl); ebsLightSrc(x, R.lvl + 6, z, 0xFF6A20, 2.2, 70, true); }, 150);
}
if (k === "cocytus" || k === "styx")
ebsMistAlong(G, R.pts, R.w, R.lvl, k === "styx" ? 0x6A7A9A : 0x8A94A4);
}
var Pr = EBS_PHLEG_RING, ring = [];
for (var i = 0; i <= 72; i++) {
var a = i / 72 * Math.PI * 2;
ring.push([Pr.x + Math.cos(a) * Pr.r, Pr.z + Math.sin(a) * Pr.r]);
}
var rm = new THREE.Mesh(ebsRibbon(ring, Pr.w + 6, -1.6), ebsWaterMat(0xFF6A1A, true));
rm.userData.keep = 1;
G.add(rm);
for (var j = 0; j < 12; j++) {
var a2 = j / 12 * Math.PI * 2, gx = Pr.x + Math.cos(a2) * Pr.r, gz = Pr.z + Math.sin(a2) * Pr.r, gl2 = wGlow(0xFF6A20, 70, 0.4);
gl2.position.set(gx, 3, gz);
G.add(gl2);
ebsLightSrc(gx, 6, gz, 0xFF5A1A, 2.4, 80, true);
}
var A = EBS_AT.lake, lg = new THREE.CircleGeometry(A.r + 30, 64);
lg.rotateX(-Math.PI / 2);
var lm = new THREE.Mesh(lg, ebsWaterMat(0x3A4A44));
lm.position.set(A.x, -2.4, A.z);
lm.userData.keep = 1;
G.add(lm);
var east = new THREE.Mesh(new THREE.PlaneGeometry(2200, 640), ebsWaterMat(0x3A4A44));
east.rotation.x = -Math.PI / 2;
east.position.set(A.x + 1100, -2.4, A.z);
east.userData.keep = 1;
G.add(east);
},
function (G, pts, w, lvl, col) {
var t = ebsMistTex().clone();
t.needsUpdate = true;
t.wrapS = t.wrapT = THREE.RepeatWrapping;
t.repeat.set(1, 0.08);
[1.2, 3.4].forEach(function (h, i) {
var m = new THREE.MeshBasicMaterial({ map: i ? t.clone() : t, color: col, transparent: true, opacity: i ? 0.35 : 0.55, depthWrite: false, side: THREE.DoubleSide });
m.userData.noPhoto = 1;
m.userData.flow = m.map;
m.map.needsUpdate = true;
var r = new THREE.Mesh(ebsRibbon(pts, w * 1.5, lvl + h), m);
r.userData.keep = 1;
G.add(r);
EBS.flows.push({ m: m, sp: i ? 0.004 : -0.003 });
});
},
function (G) {
var F = EBS_AT.fall, top = ebsLand(F.x, F.z - 60), t = ebsRippleTex().clone();
t.needsUpdate = true;
t.wrapS = t.wrapT = THREE.RepeatWrapping;
t.repeat.set(1, 6);
var m = new THREE.MeshPhongMaterial({ color: 0x8AA0C8, map: t, transparent: true, opacity: 0.8, shininess: 60, emissive: 0x1A2440, side: THREE.DoubleSide });
m.userData.noPhoto = 1;
var h = Math.max(80, top + 10), fall = new THREE.Mesh(new THREE.PlaneGeometry(26, h), m);
fall.position.set(F.x, h / 2 - 3, F.z - 30);
G.add(fall);
EBS.flows.push({ m: m, sp: -0.35 });
var spray = wGlow(0xB8C8F0, 60, 0.3);
spray.position.set(F.x, 6, F.z - 20);
G.add(spray);
},
function () {
return ebsCanvas("vault", 512, 512, function (x, W, H) {
var r = wRand(102);
x.fillStyle = "#3A3036";
x.fillRect(0, 0, W, H);
for (var i = 0; i < 260; i++) {
var cx = r() * W, cy = r() * H, rr = 10 + r() * 60, g = x.createRadialGradient(cx, cy, 0, cx, cy, rr), l = r() < 0.5;
g.addColorStop(0, l ? "rgba(120,104,110,.35)" : "rgba(10,6,10,.45)");
g.addColorStop(1, "rgba(0,0,0,0)");
x.fillStyle = g;
x.fillRect(cx - rr, cy - rr, rr * 2, rr * 2);
}
for (i = 0; i < 1600; i++) {
x.fillStyle = "rgba(" + (r() < 0.5 ? "255,255,255" : "0,0,0") + "," + (r() * 0.15) + ")";
x.fillRect(r() * W, r() * H, 1 + r() * 2, 1 + r() * 2);
}
x.lineWidth = 1.6;
for (i = 0; i < 34; i++) {
x.strokeStyle = "rgba(255," + (110 + r() * 90 | 0) + "," + (50 + r() * 60 | 0) + "," + (0.25 + r() * 0.35) + ")";
var px = r() * W, py = r() * H;
x.beginPath();
x.moveTo(px, py);
for (var k = 0; k < 9; k++) {
px += (r() - 0.5) * 60;
py += (r() - 0.5) * 60;
x.lineTo(px, py);
}
x.stroke();
}
for (i = 0; i < 18; i++) {
x.strokeStyle = "rgba(" + (120 + r() * 60 | 0) + ",160,255," + (0.2 + r() * 0.3) + ")";
var qx = r() * W, qy = r() * H;
x.beginPath();
x.moveTo(qx, qy);
for (k = 0; k < 6; k++) {
qx += (r() - 0.5) * 50;
qy += (r() - 0.5) * 50;
x.lineTo(qx, qy);
}
x.stroke();
}
});
},
function (G) {
var t = ebsVaultTex().clone();
t.needsUpdate = true;
t.wrapS = t.wrapT = THREE.RepeatWrapping;
t.repeat.set(14, 5);
var m = new THREE.MeshLambertMaterial({ map: t, color: 0xC8B8B8, emissive: 0x1A1218, side: THREE.BackSide });
m.userData.noPhoto = 1;
var v = new THREE.Mesh(new THREE.SphereGeometry(EBS_VR, EBS.lite ? 32 : 56, EBS.lite ? 12 : 20, 0, Math.PI * 2, 0, Math.PI / 2), m);
v.scale.y = EBS_VS;
v.position.set(0, -40, 0);
G.add(v);
EBS.vault = v;
var sg = new THREE.ConeGeometry(1, 1, 7, 3);
sg.rotateX(Math.PI);
sg.translate(0, -0.5, 0);
var n = EBS.lite ? 90 : 520, im = new THREE.InstancedMesh(sg, ebsStone("cave"), n), R = wRand(808), M = new THREE.Matrix4(), q = new THREE.Quaternion(), sc = new THREE.Vector3(), p = new THREE.Vector3(), e = new THREE.Euler(), k = 0;
for (var i = 0; i < n * 3 && k < n; i++) {
var x = (R() - 0.5) * 9000, z = (R() - 0.5) * 9000;
if (Math.abs(x) > 4300 || Math.abs(z) > 4300)
continue;
var L = R() < 0.25 ? 160 + R() * 260 : 40 + R() * 120, w = L * (0.08 + R() * 0.06);
e.set((R() - 0.5) * 0.08, R() * 6, (R() - 0.5) * 0.08);
q.setFromEuler(e);
sc.set(w, L, w);
p.set(x, ebsVaultY(x, z) + L * 0.05, z);
M.compose(p, q, sc);
im.setMatrixAt(k++, M);
}
im.count = k;
im.instanceMatrix.needsUpdate = true;
im.frustumCulled = false;
im.userData.keep = 1;
G.add(im);
EBS.stal = im;
var mt = new THREE.MeshLambertMaterial({ map: t, color: 0xD07060, emissive: 0x2A0804, side: THREE.BackSide });
mt.userData.noPhoto = 1;
var vt = new THREE.Mesh(new THREE.SphereGeometry(3200, 32, 12, 0, Math.PI * 2, 0, Math.PI / 2), mt);
vt.scale.y = 0.3;
vt.position.set(EBS_TAR_X, -60, 0);
G.add(vt);
var sun = new THREE.Mesh(new THREE.SphereGeometry(70, 20, 12), new THREE.MeshBasicMaterial({ color: 0xFFF0C0, fog: false }));
sun.position.set(EBS_ELY_X + 1800, 700, -2600);
G.add(sun);
var sg = wGlow(0xFFE8A0, 900, 0.55);
sg.position.copy(sun.position);
G.add(sg);
var stars = wPoints(EBS.lite ? 120 : 300, function (i) { var r = wRand(500 + i), a = r() * 6.28, e = 0.3 + r() * 1.1; return [EBS_ELY_X + Math.cos(a) * Math.cos(e) * 3000, Math.sin(e) * 3000, -200 + Math.sin(a) * Math.cos(e) * 3000]; }, 0xFFFFFF, 2.2, false);
stars.material.opacity = 0.7;
G.add(stars);
var sky = new THREE.Mesh(new THREE.SphereGeometry(2600, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2), new THREE.MeshBasicMaterial({ color: 0x6AA8E8, side: THREE.BackSide, fog: false }));
sky.position.set(EBS_TAE_X, -20, 0);
G.add(sky);
var tsun = new THREE.Mesh(new THREE.SphereGeometry(40, 16, 10), new THREE.MeshBasicMaterial({ color: 0xFFFBE8, fog: false }));
tsun.position.set(EBS_TAE_X + 1200, 1300, 900);
G.add(tsun);
},
function (dt) {
var z = EBS.zone, R = EBS.room, base;
if (z === "inside" && R)
base = R.env || EBS_ENV.palace;
else if (EBS.region === "taenarum")
base = EBS_ENV.taenarum;
else if (EBS.region === "tartarus")
base = EBS_ENV.tartarus;
else if (EBS.region === "elysium")
base = EBS_ENV.elysium;
else if (EBS.region === "path")
base = EBS_ENV.path;
else
base = EBS_ENV[z] || EBS_ENV[{ phleg: "phleg", twall: "phleg", styx: "styx", night: "night", palace: "palace", descent: "descent" }[z]] || EBS_ENV.main;
var E = {};
for (var k in base)
E[k] = base[k];
if (EBS.lite && E.fogD)
E.fogD *= 1.5;
if (EBS.region === "path") {
var t = ebsOrphT(camera.position.z);
E.fogD = 0.008 - 0.004 * t;
E.hemi = 0.8 + 0.5 * t * t;
E.low = t > 0.85 ? 0xC8C0B0 : E.low;
}
return E;
},
function (g, pts, r, mat, eye) {
var curve = new THREE.CatmullRomCurve3(pts.map(function (p) { return new THREE.Vector3(p[0], p[1], p[2]); }));
var m = new THREE.Mesh(new THREE.TubeGeometry(curve, EBS.lite ? 8 : 16, r, EBS.lite ? 4 : 6, false), mat);
g.add(m);
var e = pts[pts.length - 1], e2 = pts[pts.length - 2], hd = new THREE.Mesh(new THREE.SphereGeometry(r * 1.5, 7, 5), mat);
hd.position.set(e[0], e[1], e[2]);
hd.scale.set(1, 0.7, 1.5);
hd.lookAt(new THREE.Vector3(e[0] * 2 - e2[0], e[1] * 2 - e2[1], e[2] * 2 - e2[2]));
g.add(hd);
if (eye !== false && !EBS.lite) {
var em = ebsGlowM(0xFF3A1A);
[-1, 1].forEach(function (s) { var ey = new THREE.Mesh(new THREE.SphereGeometry(r * 0.4, 4, 3), em); ey.position.set(r * 0.7 * s, r * 0.5, r * 0.9); hd.add(ey); });
}
return m;
},
function () {
var g = new THREE.Group(), fur = ebsS("b:velvet", 0x2A2624, 0.8, { shine: 20, n: 1.4 }), dark = ebsS("b:velvet", 0x161414, 0.8, { shine: 10 }), claw = ebsLam(0x1A1612), eye = ebsGlowM(0xFF3010), tooth = ebsLam(0xE8E0D0);
var body = new THREE.Group();
g.add(body);
var trunk = wSph(1, fur, 0, 3.1, 0, body, EBS.lite ? 10 : 16);
trunk.scale.set(1.45, 1.25, 2.7);
var chest = wSph(1, fur, 0, 3.35, 1.6, body, EBS.lite ? 10 : 16);
chest.scale.set(1.7, 1.55, 1.35);
var haunch = wSph(1, fur, 0, 2.95, -1.7, body, EBS.lite ? 10 : 16);
haunch.scale.set(1.5, 1.35, 1.3);
var legs = [];
[[0.95, 1.8, 1], [-0.95, 1.8, 1], [0.95, -1.9, 0], [-0.95, -1.9, 0]].forEach(function (L) {
var lg = new THREE.Group();
lg.position.set(L[0], 2.6, L[1]);
body.add(lg);
var up = wCyl(0.42, 0.36, 1.7, fur, 0, -0.7, L[2] ? 0 : -0.2, lg, 8);
up.rotation.x = L[2] ? 0.05 : 0.35;
var lo = wCyl(0.32, 0.26, 1.5, dark, 0, -1.9, L[2] ? 0.05 : 0.15, lg, 8);
lo.rotation.x = L[2] ? -0.05 : -0.3;
var paw = wSph(0.42, dark, 0, -2.5, 0.25, lg, 8);
paw.scale.set(1, 0.55, 1.35);
for (var c = 0; c < 4; c++) {
var cl = wCone(0.06, 0.22, claw, -0.24 + c * 0.16, -2.58, 0.78, lg, 4);
cl.rotation.x = 1.8;
}
legs.push(lg);
});
var heads = [];
[-1, 0, 1].forEach(function (s, i) {
var nk = new THREE.Group();
nk.position.set(s * 0.85, 3.9, 2.3);
body.add(nk);
nk.rotation.z = -s * 0.35;
nk.rotation.x = -0.5;
var neck = wCyl(0.55, 0.75, 2.0, fur, 0, 0.9, 0, nk, 10);
var hd = new THREE.Group();
hd.position.set(0, 2.0, 0.25);
nk.add(hd);
var skull = wSph(0.7, fur, 0, 0, 0, hd, 12);
skull.scale.set(0.95, 0.85, 1.05);
var snout = wCyl(0.32, 0.42, 0.95, fur, 0, -0.12, 0.85, hd, 10);
snout.rotation.x = Math.PI / 2;
wSph(0.17, ebsLam(0x0A0808), 0, -0.02, 1.32, hd, 8);
var jaw = new THREE.Group();
jaw.position.set(0, -0.38, 0.3);
hd.add(jaw);
var jw = wBox(0.56, 0.16, 0.95, dark, 0, 0, 0.5, jaw);
for (var t = 0; t < 6; t++) {
var tt = wCone(0.04, 0.14, tooth, -0.2 + (t % 3) * 0.2, 0.12, 0.25 + Math.floor(t / 3) * 0.6, jaw, 4);
}
[-1, 1].forEach(function (e) { var ear = wCone(0.22, 0.6, dark, e * 0.42, 0.62, -0.1, hd, 5); ear.rotation.z = -e * 0.35; var ey = wSph(0.09, eye, e * 0.3, 0.18, 0.52, hd, 6); });
if (!EBS.lite) {
var gl = wGlow(0xFF4020, 1.2, 0.35);
gl.position.set(0, 0.2, 0.6);
hd.add(gl);
}
heads.push({ nk: nk, hd: hd, jaw: jaw, ph: i * 2.1 });
});
var sm = ebsScales(0x2A3A1E), mane = new THREE.Group();
body.add(mane);
var R = wRand(13);
for (var k = 0; k < (EBS.lite ? 8 : 20); k++) {
var a = k / (EBS.lite ? 8 : 20) * Math.PI * 2, bx = Math.cos(a) * 1.3, bz = 1.4 + Math.sin(a) * 0.8, by = 3.9 + R() * 0.6;
ebsSnake(mane, [[bx, by, bz], [bx * 1.3, by + 0.5 + R() * 0.4, bz + 0.2], [bx * 1.4 + R() * 0.3, by + 1 + R() * 0.5, bz + R() * 0.6], [bx * 1.5, by + 1.3, bz + 0.6 + R() * 0.4]], 0.07, sm);
}
var tail = new THREE.Group();
tail.position.set(0, 3.4, -2.8);
body.add(tail);
ebsSnake(tail, [[0, 0, 0], [0, 0.6, -1], [0.3, 1.6, -1.6], [0.6, 2.8, -1.4], [0.4, 3.6, -0.6], [0.2, 3.8, 0.1]], 0.22, ebsScales(0x1E2A16));
g.userData.cerb = { body: body, heads: heads, tail: tail, legs: legs, t: 0 };
return g;
},
function (g, dt, awake, look) {
var C = g.userData.cerb;
if (!C)
return;
C.t += dt;
C.body.scale.y = 1 + Math.sin(C.t * (awake ? 2.2 : 0.8)) * 0.012;
C.heads.forEach(function (H, i) {
var sl = awake ? 1 : 0.25;
H.nk.rotation.y = Math.sin(C.t * 0.6 + H.ph) * 0.35 * sl + (look || 0) * 0.4;
H.hd.rotation.x = Math.sin(C.t * 0.9 + H.ph) * 0.12 * sl + (awake ? 0 : 0.6);
H.jaw.rotation.x = awake ? Math.max(0, Math.sin(C.t * 1.3 + H.ph * 1.7)) * 0.35 : 0.02;
});
C.tail.rotation.y = Math.sin(C.t * 0.7) * 0.4;
C.tail.rotation.x = Math.sin(C.t * 0.45) * 0.1;
},
function () {
var g = new THREE.Group(), wood = ebsS("b:planks", 0x3A2E24, 1.2), dark = ebsS("b:planks", 0x241C16, 1.2), sh = new THREE.Shape(), L = 4.8, W = 1.25;
sh.moveTo(0, L);
sh.quadraticCurveTo(W, L * 0.4, W, 0);
sh.quadraticCurveTo(W, -L * 0.5, 0, -L);
sh.quadraticCurveTo(-W, -L * 0.5, -W, 0);
sh.quadraticCurveTo(-W, L * 0.4, 0, L);
var hull = new THREE.Mesh(new THREE.ExtrudeGeometry(sh, { depth: 1.0, bevelEnabled: true, bevelSize: 0.12, bevelThickness: 0.2, bevelSegments: 2, curveSegments: EBS.lite ? 6 : 12 }), wood);
hull.rotation.x = Math.PI / 2;
hull.position.y = 0.95;
g.add(hull);
var deck = new THREE.Mesh(new THREE.ShapeGeometry(sh, 8), dark);
deck.rotation.x = -Math.PI / 2;
deck.position.y = 0.62;
deck.scale.set(0.88, 0.88, 1);
g.add(deck);
[-2.2, -0.6, 1.0].forEach(function (z) { wBox(2.0, 0.12, 0.42, wood, 0, 0.82, z, g); });
var prow = wCyl(0.08, 0.14, 2.6, dark, 0, 1.6, 4.6, g, 6);
prow.rotation.x = -0.35;
var post = wCyl(0.05, 0.05, 1.6, ebsStone("iron"), 0, 1.8, 4.2, g, 5);
var lan = new THREE.Group();
lan.position.set(0, 2.7, 4.4);
g.add(lan);
wBox(0.28, 0.36, 0.28, ebsStone("bronze"), 0, 0, 0, lan);
wBox(0.22, 0.28, 0.22, ebsGlowM(0xFFC070), 0, 0, 0, lan);
var gl = wGlow(0xFFB060, 3.2, 0.6);
lan.add(gl);
g.userData.lantern = lan;
return g;
},
function (seed) {
var p = wPerson("ebs_charon" + (seed || ""), { sex: "m", look: { skin: 0xA8A098, hair: 0x8A8A88, beard: "full", topKind: "robe", top: 0x2A2A2C, bottom: 0x2A2A2C, hat: "hood", hatColor: 0x1E1E20, shoes: 0x141414, layer: "longcoat", layerColor: 0x3A342A } });
var pole = wCyl(0.04, 0.05, 6.4, ebsStone("oak"), 0.45, 2.2, 0.15, p, 6);
pole.rotation.z = 0.12;
var eyes = ebsGlowM(0xFF8A30);
[-0.04, 0.04].forEach(function (o) { wSph(0.014, eyes, o, 1.66, 0.11, p, 4); });
return p;
},
function (seed, name) {
var col = { Alecto: 0x1A1418, Megaera: 0x241018, Tisiphone: 0x2A0A0A }[name] || 0x1A1418;
var p = wPerson("ebs_fury" + seed, { sex: "f", look: { skin: 0x8A7E78, hair: 0x1A2A14, hairStyle: "long", topKind: "dress", top: col, bottom: col, shoes: 0x0A0A0A, layer: "longcoat", layerColor: 0x0E0A0C } });
var sm = ebsScales(0x2A4A1E), hair = new THREE.Group();
hair.position.set(0, 1.72, -0.02);
p.add(hair);
var R = wRand(seed * 7 + 3);
for (var k = 0; k < (EBS.lite ? 6 : 12); k++) {
var a = k / (EBS.lite ? 6 : 12) * Math.PI * 2;
var bx = Math.cos(a) * 0.1, bz = Math.sin(a) * 0.1;
ebsSnake(hair, [[bx, 0, bz], [bx * 2.2, 0.12 + R() * 0.08, bz * 2.2], [bx * 3 + R() * 0.06, 0.08 + R() * 0.1, bz * 3], [bx * 3.6, 0.18, bz * 3.4]], 0.018, sm, false);
}
var wm = ebsLam(0x1A0E10, { ds: true });
[-1, 1].forEach(function (s) {
var sh = new THREE.Shape();
sh.moveTo(0, 0);
sh.lineTo(1.3, 0.5);
sh.lineTo(1.0, -0.2);
sh.lineTo(1.2, -0.7);
sh.lineTo(0.6, -0.4);
sh.lineTo(0.5, -0.9);
sh.lineTo(0, -0.3);
var w = new THREE.Mesh(new THREE.ShapeGeometry(sh), wm);
w.position.set(s * 0.12, 1.45, -0.15);
w.scale.x = s;
w.rotation.y = s * 0.5;
p.add(w);
});
var tc = wCyl(0.025, 0.03, 0.7, ebsStone("oak"), 0.32, 1.2, 0.18, p, 5);
tc.rotation.z = -0.2;
ebsFlame(p, 0.38, 1.52, 0.18, 0.55);
[-0.035, 0.035].forEach(function (o) { wSph(0.012, ebsGlowM(0xFF2010), o, 1.65, 0.105, p, 4); });
return p;
},
function (seed) {
var p = wPerson("ebs_hermes" + (seed || ""), { sex: "m", look: { skin: 0xD8A880, hair: 0x5A3A1A, topKind: "robe", top: 0xE8E0D0, bottom: 0xE8E0D0, shoes: 0xA8803A, hat: "brimmed", hatColor: 0xA88A5A, back: "cape", backColor: 0x8A2A2A } });
var fm = ebsLam(0xF8F4EC, { ds: true });
[-1, 1].forEach(function (s) { var w = wBox(0.02, 0.12, 0.22, fm, s * 0.16, 1.86, -0.02, p); w.rotation.z = s * 0.5; var w2 = wBox(0.02, 0.07, 0.14, fm, s * 0.11, 0.08, -0.04, p); w2.rotation.z = s * 0.6; });
var st = new THREE.Group();
st.position.set(0.38, 0, 0.12);
p.add(st);
var gold = ebsStone("gold");
wCyl(0.02, 0.02, 1.6, gold, 0, 0.95, 0, st, 6);
wSph(0.05, gold, 0, 1.78, 0, st, 8);
var sm = ebsScales(0x3A5A2A);
for (var i = 0; i < 2; i++) {
var t = new THREE.Mesh(new THREE.TorusGeometry(0.06, 0.012, 4, 10), sm);
t.position.set(0, 1.3 + i * 0.14, 0);
t.rotation.x = Math.PI / 2;
st.add(t);
}
[-1, 1].forEach(function (s) { var w = wBox(0.16, 0.05, 0.01, fm, s * 0.09, 1.72, 0, st); w.rotation.z = s * 0.3; });
return p;
},
function () {
var g = new THREE.Group(), sk = ebsScales(0x1A2A14), belly = ebsS("b:moss", 0x5A6A3A, 0.8, { shine: 30 }), eye = ebsGlowM(0xFFE040), tooth = ebsLam(0xE8E0C8);
var b = wSph(1, sk, 0, 3, 0, g, EBS.lite ? 10 : 16);
b.scale.set(4.4, 3.2, 5.4);
var bl = wSph(1, belly, 0, 2.4, 1.2, g, 12);
bl.scale.set(3.6, 2.4, 4);
ebsSnake(g, [[0, 3, -4.8], [1.5, 2, -8], [-1.5, 1.4, -11], [1, 1, -14], [3, 1.2, -15]], 0.9, sk, false);
var necks = [], N = EBS.lite ? 5 : 9;
for (var i = 0; i < N; i++) {
var a = (i / (N - 1) - 0.5) * 2.4, big = i === Math.floor(N / 2), seg = [], ng = new THREE.Group();
ng.position.set(Math.sin(a) * 2.4, 5, Math.cos(a) * 2.4 + 1.4);
g.add(ng);
var n = EBS.lite ? 5 : 8, r0 = big ? 0.95 : 0.7;
for (var k = 0; k < n; k++) {
var s = wSph(r0 * (1 - k / n * 0.45), sk, 0, 0, 0, ng, EBS.lite ? 6 : 9);
seg.push(s);
}
var hd = new THREE.Group();
ng.add(hd);
var sku = wSph(big ? 1.1 : 0.8, sk, 0, 0, 0, hd, 10);
sku.scale.set(0.9, 0.7, 1.4);
var jaw = wBox(big ? 1.2 : 0.85, 0.2, big ? 1.4 : 1.0, belly, 0, -0.4, 0.7, hd);
jaw.rotation.x = 0.25;
for (var t = 0; t < 6; t++)
wCone(0.06, 0.25, tooth, -0.3 + (t % 3) * 0.3, -0.25, 0.6 + Math.floor(t / 3) * 0.6, hd, 4).rotation.x = Math.PI;
[-1, 1].forEach(function (e) { wSph(big ? 0.16 : 0.12, eye, e * 0.4, 0.3, 0.6, hd, 6); });
necks.push({ g: ng, seg: seg, hd: hd, a: a, len: big ? 11 : 8.5, ph: i * 0.9, big: big });
}
g.userData.hydra = { necks: necks, t: 0, hit: 0 };
return g;
},
function (g, dt, rage) {
var H = g.userData.hydra;
if (!H)
return;
H.t += dt;
var t = H.t, sp = rage ? 1.8 : 0.7;
H.necks.forEach(function (N) {
var n = N.seg.length;
for (var k = 0; k < n; k++) {
var u = (k + 1) / n, sw = Math.sin(t * sp + N.ph + u * 2.4) * 1.6 * u, x = Math.sin(N.a) * u * 3 + sw, y = u * N.len + Math.sin(t * sp * 0.7 + N.ph) * 0.8 * u, z = Math.cos(N.a) * u * 3 + Math.cos(t * sp * 0.6 + N.ph + u) * 1.2 * u;
N.seg[k].position.set(x, y, z);
}
var e = N.seg[n - 1].position;
N.hd.position.set(e.x, e.y + 0.4, e.z + 0.6);
N.hd.rotation.x = 0.3 + Math.sin(t * sp * 1.3 + N.ph) * 0.25;
N.hd.rotation.y = Math.sin(t * sp * 0.5 + N.ph) * 0.4;
});
},
function (arch, s) {
var g = null;
try {
g = buildCreature({ id: "ebs_m_" + arch, archetype: arch, attrs: {}, solid: false, detail: 3, nights: [], city: true }, 1);
}
catch (e) {
g = null;
}
if (!g) {
g = new THREE.Group();
var b = wSph(1, ebsLam(0x1A1020), 0, 1.4, 0, g, 8);
b.scale.set(1, 1.4, 1);
}
if (s)
g.scale.multiplyScalar(s);
ebsShadeify(g, 0x5A3A7A, 0.4);
return g;
},
function () {
return ebsCanvas("steps", 128, 256, function (x, W, H) {
x.fillStyle = "#2A2628";
x.fillRect(0, 0, W, H);
var r = wRand(7);
for (var i = 0; i < 2600; i++) {
x.fillStyle = "rgba(" + (r() < 0.5 ? "255,255,255" : "0,0,0") + "," + (r() * 0.12) + ")";
x.fillRect(r() * W, r() * H, 2, 2);
}
for (var s = 0; s < 8; s++) {
x.fillStyle = "rgba(0,0,0,.55)";
x.fillRect(0, s * H / 8, W, 5);
x.fillStyle = "rgba(255,240,220,.08)";
x.fillRect(0, s * H / 8 + 5, W, 3);
}
});
},
function (G) {
var g = ebsDistrict(G, 0, 3820, 400, true), stone = ebsStone("dark"), sm = ebsM("stepsMat", function () { var t = ebsStepTex().clone(); t.needsUpdate = true; t.wrapS = t.wrapT = THREE.RepeatWrapping; var m = new THREE.MeshLambertMaterial({ map: t }); m.userData.noPhoto = 1; return m; });
var shape = 0;
EBS_STAIR.forEach(function (S, i) {
if (S.k === "flight") {
var L = S.z1 - S.z0, rise = S.y1 - S.y0, len = Math.hypot(L, rise), a = Math.atan2(rise, L);
var slab = wBox(18, 1.2, len, sm, 0, (S.y0 + S.y1) / 2 - 0.6, (S.z0 + S.z1) / 2, g);
slab.rotation.x = a;
slab.material.map.repeat.set(1, Math.round(len / 2.4));
ebsRamp(0, (S.z0 + S.z1) / 2, 18, L, S.y0, S.y1, 0);
[-9.6, 9.6].forEach(function (sx) { var w = wBox(1, 1.4, len, stone, sx, (S.y0 + S.y1) / 2 + 0.4, (S.z0 + S.z1) / 2, g); w.rotation.x = a; ebsSolid(sx, (S.z0 + S.z1) / 2, 1.2, L, S.y0 - 50, S.y1 + 3); });
}
else {
var Ld = S.z1 - S.z0, cz = (S.z0 + S.z1) / 2;
wBox(24, 1.6, Ld, stone, 0, S.y - 0.8, cz, g);
ebsFloor(0, cz, 24, Ld, S.y);
if (S.y > 0 && S.y < 240) {
[-10.4, 10.4].forEach(function (sx) { ebsBrazier(g, sx, S.y, cz, 1.1, sx, cz); ebsSolid(sx, cz, 1.4, 1.4, S.y - 2, S.y + 2); });
for (var k = 0; k < 2 && shape < EBS_SHAPES.length; k++) {
var Sh = EBS_SHAPES[shape++], sx = k ? 7.6 : -7.6, mat = Sh[0] === "Death" || Sh[0] === "Sleep" ? ebsStone("black") : ebsStone("grey");
ebsStatue(g, sx, S.y, cz, 1.3, mat, { ry: k ? -Math.PI / 2 : Math.PI / 2, pose: Sh[2] === "sickle" || Sh[2] === "poppies" ? "stand" : Sh[2], holds: Sh[2] === "sickle" ? "sickle" : Sh[2] === "poppies" ? "poppies" : null, veil: Sh[0] === "Grief" || Sh[0] === "Old Age" });
(function (Sh, sx, y, cz) { ebsSpot(sx, cz, 2.8, Sh[0] + " (" + Sh[1] + ")", "look", function () { worldCard(worldFacts(Sh[0], Sh[1] + ", one of the shapes in the jaws of the underworld", [], [Sh[3], "Virgil, Aeneid book 6: Aeneas and the Sibyl passed them on the way down, 'through the empty halls of Dis and his insubstantial kingdom, like a path through woods by the grudging light of a fitful moon'."])); }, y); })(Sh, sx, S.y, cz);
}
}
}
});
var top = EBS_AT.top, ar = new THREE.Group();
ar.position.set(0, 240, 4176);
g.add(ar);
var arch = new THREE.Mesh(new THREE.TorusGeometry(9, 3, 8, 18, Math.PI), ebsStone("cave"));
arch.position.y = 7;
ar.add(arch);
wBox(6, 16, 6, ebsStone("cave"), -11, 8, 0, ar);
wBox(6, 16, 6, ebsStone("cave"), 11, 8, 0, ar);
wBox(16, 15, 1, ebsGlowM(0x050304), 0, 7.5, 1.5, ar);
ebsSolid(0, 4182, 26, 6, 200, 280);
ebsTorch(ar, -7, 6, -1.4, Math.PI, -7, 4174.6);
ebsTorch(ar, 7, 6, -1.4, Math.PI, 7, 4174.6);
ebsSpot(0, 4166, 4, "The cave back up to the light", "climb up to Cape Taenarum", function () { ebsGoTae(); }, 240);
ebsStele(g, 12, 240, 4150, Math.PI, "Facilis descensus", "Virgil, Aeneid 6.126", ["\"Easy is the way down to the underworld: the door of black Dis stands open night and day. But to retrace your steps and come out to the upper air, that is the task, that is the labour.\"", "The Sibyl of Cumae says this to Aeneas before they go down. Every step of this stair is a step down; every step back up is a step against the dark."], 12, 4150);
},
function (G) {
var A = EBS_AT, g = ebsDistrict(G, A.vest.x, A.vest.z, 320);
var E = A.elm, ey = ebsY(E.x, E.z);
ebsTree("elm", g, E.x, ey, E.z, 1.5, 77);
for (var i = 0; i < (EBS.lite ? 14 : 36); i++) {
var r = wRand(300 + i), a = r() * 6.28, d = 4 + r() * 16, gl = wGlow([0xB8A8F0, 0x8AC8F0, 0xF0A8D8][i % 3], 1.4 + r() * 1.4, 0.5);
gl.position.set(E.x + Math.cos(a) * d, ey + 22 + r() * 10, E.z + Math.sin(a) * d);
g.add(gl);
EBS.fx.push({ k: "hang", m: gl, y0: gl.position.y, ph: r() * 9 });
}
var fd = ["You are back at school, and there is an exam in a subject you never took.", "Your teeth are made of sugar and it is raining.", "You can fly, but only a hand's breadth off the ground, and only on Tuesdays.", "Every door in your house opens onto the same corridor.", "You have won a race you do not remember entering.", "Someone you have never met is waiting for you with a key."];
ebsSpot(E.x, E.z + 9, 8, "The Elm of False Dreams", "look up into its leaves", function () {
var f = fd[Math.floor(Math.random() * fd.length)];
worldCard(worldFacts("The Elm of False Dreams", "Virgil, Aeneid 6.282-284", [], ["\"In the midst an elm, shadowy and huge, spreads its boughs and aged arms: the seat, they say, where false Dreams cling, under every leaf.\"", "One drifts down and settles on your shoulder. For a moment you dream it: " + f, "It is a false one. They always are, here: true dreams come out of the gate of horn, far in the north-east."]));
}, ey);
ebsStatue(g, E.x + 28, ebsY(E.x + 28, E.z + 10), E.z + 10, 1.4, ebsStone("black"), { ry: -0.6, pose: "raise", wx: E.x + 28, wz: E.z + 10 });
ebsStele(g, E.x + 24, ebsY(E.x + 24, E.z + 16), E.z + 16, -0.6, "Discordia", "Mad Discord", ["\"...and mad Discord, her snaky hair bound up with bloody ribbons.\" (Aeneid 6.280)", "Strife (Eris, to the Greeks) threw the golden apple that began the Trojan War."], E.x + 24, E.z + 16);
var I = A.iron;
ebsHall(g, { x: I.x, y: ebsY(I.x, I.z), z: I.z, rot: 0.35, w: 22, d: 18, h: 11, mat: ebsStone("iron"), trimMat: ebsStone("black"), roofMat: ebsStone("iron"), colMat: ebsStone("iron"), room: "iron", name: "the Iron Chambers of the Furies", torchCol: 0xFF4A1A });
var S = A.sibyl, sp = ebsPerson("sibyl", S.x, S.z, ebsY(S.x, S.z), { sex: "f", look: { skin: 0xC8A888, hair: 0xD8D8D8, hairStyle: "long", topKind: "robe", top: 0x5A4A3A, bottom: 0x5A4A3A, hat: "hood", hatColor: 0x4A3A2A, shoes: 0x2A1A10 } }, Math.PI);
ebsFlame(sp.g, 0.36, 1.55, 0.2, 0.6);
ebsLightSrc(S.x, ebsY(S.x, S.z) + 2.5, S.z, 0xFF9A50, 1.3, 18);
ebsTalk(sp, "The Sibyl of Cumae", null, null, 3.4, function () { ebsSibyl(); });
var M = A.monsters, my = ebsY(M.x, M.z), list = [["centaur", 1.3, "Centaurs"], ["kraken", 0.35, "Scylla"], ["giant", 1.1, "Briareus, the hundred-handed"], ["seaserpent", 0.5, "the Hydra of Lerna"], ["chimera", 1.3, "the Chimaera"], ["gorgon", 1.15, "the Gorgons"], ["harpy", 1.1, "the Harpies"], ["giant", 1.25, "Geryon, three-bodied"]];
EBS.monsters = [];
list.forEach(function (L, i) { var x = M.x - 56 + i * 16, z = M.z + ((i % 2) ? 6 : -4), m = ebsMonsterShade(L[0], L[1]); m.position.set(x, ebsY(x, z), z); m.rotation.y = Math.PI; m.userData.keep = 1; g.add(m); EBS.monsters.push({ g: m, n: L[2], x: x, z: z }); });
ebsSpot(M.x, M.z + 12, 14, "The shapes of monsters", "draw your sword on them", function () { ebsMonstersStrike(); }, my);
for (var t = 0; t < (EBS.lite ? 10 : 24); t++) {
var R = wRand(400 + t), a2 = R() * 6.28, d2 = 80 + R() * 180, x2 = A.vest.x + Math.cos(a2) * d2, z2 = A.vest.z + Math.sin(a2) * d2 * 0.7;
if (Math.abs(x2) < 26)
continue;
ebsDeadTree(g, x2, ebsY(x2, z2), z2, 1 + R() * 0.8, 500 + t);
}
for (var k = 0; k < (EBS.lite ? 8 : 20); k++) {
var R2 = wRand(600 + k), x3 = A.vest.x + (R2() - 0.5) * 560, z3 = A.vest.z + (R2() - 0.5) * 360;
if (Math.abs(x3) < 30)
continue;
ebsRock(g, x3, ebsY(x3, z3), z3, 2 + R2() * 5, 700 + k);
ebsRound(x3, z3, 2.5, -5, 8);
}
ebsRoad(g, [[0, 3470], [0, 3150], [0, 2900], [0, 2600], [0, 2420]], 7, true);
},
function (g, pts, w, lamps, col) {
ebsRoadNote(pts, w);
var m = ebsM("road" + (col || 0), function () { var q = new THREE.MeshLambertMaterial({ map: ebsPhotoTex("paving", 3), color: col || 0x7A7068, polygonOffset: true, polygonOffsetFactor: -3, polygonOffsetUnits: -3 }); q.userData.noPhoto = 1; return q; });
var dense = [pts[0]];
for (var i = 1; i < pts.length; i++) {
var a = pts[i - 1], b = pts[i], L = Math.hypot(b[0] - a[0], b[1] - a[1]), n = Math.max(1, Math.ceil(L / 8));
for (var k = 1; k <= n; k++)
dense.push([a[0] + (b[0] - a[0]) * k / n, a[1] + (b[1] - a[1]) * k / n]);
}
var pos = [], uv = [], idx = [], run = 0;
dense.forEach(function (p, i) {
var q = dense[Math.min(i + 1, dense.length - 1)], o = dense[Math.max(i - 1, 0)], dx = q[0] - o[0], dz = q[1] - o[1], L = Math.hypot(dx, dz) || 1, nx = -dz / L * w / 2, nz = dx / L * w / 2;
if (i > 0)
run += Math.hypot(p[0] - dense[i - 1][0], p[1] - dense[i - 1][1]);
pos.push(p[0] + nx, ebsY(p[0] + nx, p[1] + nz) + 0.12, p[1] + nz, p[0] - nx, ebsY(p[0] - nx, p[1] - nz) + 0.12, p[1] - nz);
uv.push(0, run / 3, w / 3, run / 3);
if (i > 0) {
var b = (i - 1) * 2;
idx.push(b, b + 2, b + 1, b + 1, b + 2, b + 3);
}
});
var geo = new THREE.BufferGeometry();
geo.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
geo.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
geo.setIndex(idx);
geo.computeVertexNormals();
var mesh = new THREE.Mesh(geo, m);
g.add(mesh);
if (lamps)
ebsDim(pts, function (x, z) { var a = 0; [-1, 1].forEach(function (sd) { var bx = x + sd * (w / 2 + 1.6); ebsBrazier(g, bx, ebsY(bx, z), z, 0.9, bx, z); ebsRound(bx, z, 0.6, -5, 4); }); }, 90);
return mesh;
},
function (G) {
var A = EBS_AT, g = ebsDistrict(G, 0, 2400, 420);
ebsCrowd(0, 2500, 320, 240, ebsY, 0xA8BCE0, 0.3, 11);
ebsCrowd(-900, 2460, 260, 120, ebsY, 0xA8BCE0, 0.28, 12);
[["Palinurus", -40, 2470, "Palinurus, Aeneas's helmsman, who fell asleep at the tiller and fell into the sea; his body lay unburied on the shore of Velia, so he must wait here. Speaks of the stars, the sea, the night he fell. Gentle, wistful, asks to be remembered.", "I steered by the stars, and Sleep came and pushed me from the stern. My body lies on the sand at Velia. Will anyone think of me?"],
["Elpenor", 38, 2480, "Elpenor, the youngest of Odysseus's crew (Odyssey 10-11), who fell from Circe's roof asleep after drinking and broke his neck; unburied, he asks Odysseus to burn him with his armour and set up his oar on the barrow by the sea. Rueful, a little comic about his fate.", "I fell off a roof. Of all the ways. Tell them to burn me with my armour and plant my oar on the mound, the oar I pulled with my friends."]].forEach(function (W, i) {
var P = ebsPerson("unb" + i, W[1], W[2], ebsY(W[1], W[2]), { sex: "m", look: { topKind: "robe", top: 0x7A8A9A, bottom: 0x6A7A8A } }, Math.PI);
ebsShadeify(P.g, 0xA8C0E8, 0.6);
ebsTalk(P, W[0], W[3], W[4]);
});
var wood = ebsStone("deck"), L = A.landS;
[[L.z - 6, L.z - 96, 0], [2160, 2252, 1]].forEach(function (J) {
var z0 = Math.min(J[0], J[1]), z1 = Math.max(J[0], J[1]), cz = (z0 + z1) / 2, len = z1 - z0;
wBox(6, 0.5, len, wood, 0, 0.8, cz, g);
ebsFloor(0, cz, 6, len, 1.05);
for (var p = 0; p < len / 6; p++) {
[-2.8, 2.8].forEach(function (px) { wCyl(0.22, 0.22, 6, ebsStone("oak"), px, -1.6, z0 + p * 6 + 3, g, 6); });
}
});
ebsSpot(0, 2352, 5, "Charon's ferry", "pay your obol and cross the Acheron", function () { ebsFerry(1); }, 1.05);
ebsSpot(0, 2250, 5, "Charon's ferry", "cross back over the Acheron", function () { ebsFerry(-1); }, 1.05);
var B = ebsBoat();
B.position.set(0, -2.4, 2341);
B.rotation.y = 0;
B.userData.keep = 1;
G.add(B);
EBS.boat = { g: B, ch: null };
var C = ebsCharon();
C.position.set(0, 0.62, -2.4);
C.rotation.y = Math.PI;
C.userData.limbs = 1;
B.add(C);
EBS.boat.ch = C;
EBS.talk.push({ p: { g: { position: { x: 0, y: -1.8, z: 2341 }, visible: true } }, r: 6, name: "Charon", fn: function () { ebsCharonTalk(); } });
EBS_LSRC.push(EBS.boat.lsrc = { x: 0, y: 1.5, z: 2345, col: 0xFFB060, k: 1.4, dist: 22, flick: true, ph: 0 });
var H = A.boathouse;
ebsHall(g, { x: H.x, y: ebsY(H.x, H.z), z: H.z, rot: Math.PI, w: 20, d: 14, h: 7, mat: ebsStone("ashlar"), trimMat: ebsStone("oak"), roofMat: ebsStone("terracotta"), gable: true, porch: false, room: "boathouse", name: "Charon's boathouse", dw: 4, dh: 4.4 });
ebsStele(g, -18, ebsY(-18, 2430), 2430, 0, "The Acheron", "The river of woe", ["Charon keeps the ferry here. Virgil: 'a terrible ferryman, filthy, a mass of grey beard on his chin, his eyes standing out in flame, a dirty cloak knotted at his shoulder'.", "The dead pay him an obol. Those never buried must wander this bank a hundred years before he takes them.", "Aristophanes' Dionysus rowed himself across, with Charon shouting the stroke and the frogs of the lake singing."], -18, 2430);
var K = A.lake, rm = ebsLam(0x5A6A3A), pad = ebsLam(0x3A6A2A), frog = ebsS("b:moss", 0x4A7A2A, 0.4, { shine: 40 });
for (var i2 = 0; i2 < (EBS.lite ? 40 : 120); i2++) {
var r = wRand(800 + i2), a = r() * 6.28, d = K.r - 10 + r() * 30, x = K.x + Math.cos(a) * d, z = K.z + Math.sin(a) * d;
if (x > K.x + 200)
continue;
for (var s = 0; s < 4; s++) {
var rd = wCyl(0.03, 0.05, 2 + r() * 1.5, rm, x + (r() - 0.5) * 2, -1.5, z + (r() - 0.5) * 2, g, 4);
rd.rotation.z = (r() - 0.5) * 0.3;
}
}
EBS.frogs = [];
for (var f = 0; f < (EBS.lite ? 8 : 20); f++) {
var r2 = wRand(900 + f), a2 = 2.2 + r2() * 1.8, d2 = K.r - 30 - r2() * 60, fx = K.x + Math.cos(a2) * d2, fz = K.z + Math.sin(a2) * d2;
var pd = wCyl(0.7, 0.7, 0.04, pad, fx, -2.36, fz, g, 10);
var fg = new THREE.Group();
fg.position.set(fx, -2.3, fz);
g.add(fg);
fg.userData.keep = 1;
var bd = wSph(0.16, frog, 0, 0.1, 0, fg, 8);
bd.scale.set(1.1, 0.7, 1.3);
[-1, 1].forEach(function (e) { wSph(0.05, ebsLam(0xE8E040), e * 0.07, 0.2, 0.1, fg, 5); });
EBS.frogs.push({ g: fg, ph: r2() * 9 });
}
ebsSpot(K.x - K.r + 30, K.z + 120, 30, "The frogs of the lake", "listen to the frogs", function () { ebsFrogs(); }, -1);
},
function (G) {
var A = EBS_AT, g = ebsDistrict(G, A.grove.x, A.grove.z, A.grove.r + 120);
var n = EBS.lite ? 60 : 150, R = wRand(31);
for (var i = 0; i < n; i++) {
var a = R() * 6.28, d = 40 + Math.sqrt(R()) * (A.grove.r - 40), x = A.grove.x + Math.cos(a) * d, z = A.grove.z + Math.sin(a) * d * 0.8;
if (ebsWaterAt(x, z) !== null || Math.hypot(x - A.bough.x, z - A.bough.z) < 14 || Math.hypot(x - A.pit.x, z - A.pit.z) < 20)
continue;
ebsTree(R() < 0.6 ? "poplar" : "willow", g, x, ebsY(x, z), z, 0.9 + R() * 0.5, 1000 + i);
}
var Bo = A.bough;
ebsTree("holmoak", g, Bo.x, ebsY(Bo.x, Bo.z), Bo.z, 1.1, 2001);
var dv = ebsLam(0xF8F8F4);
[[Bo.x + 11, Bo.z - 6], [Bo.x + 12, Bo.z - 5]].forEach(function (p, i) { var d = new THREE.Group(); d.position.set(p[0], ebsY(p[0], p[1]) + 7.6 + i * 0.4, p[1]); g.add(d); d.userData.keep = 1; var b = wSph(0.16, dv, 0, 0, 0, d, 8); b.scale.set(0.8, 0.8, 1.3); wSph(0.09, dv, 0, 0.1, 0.16, d, 6); EBS.fx.push({ k: "bob", m: d, y0: d.position.y, ph: i * 2 }); });
ebsTree("poplar", g, Bo.x + 11, ebsY(Bo.x + 11, Bo.z - 6), Bo.z - 6, 0.8, 2002);
var Rk = A.rock;
ebsRock(g, Rk.x, ebsY(Rk.x, Rk.z) - 6, Rk.z, 26, 41, ebsStone("rock"));
ebsRound(Rk.x, Rk.z, 24, -10, 40);
ebsStele(g, Rk.x + 34, ebsY(Rk.x + 34, Rk.z + 30), Rk.z + 30, 0.8, "The Rock of the Two Rivers", "Odyssey 10.513-515", ["Circe told Odysseus: beach your ship by the deep-eddying Ocean and go on to the dank house of Hades, 'where Pyriphlegethon and Cocytus, a branch of the water of the Styx, flow into Acheron; and there is a rock, and the meeting of the two roaring rivers'.", "There he dug a pit a cubit square and poured offerings for all the dead: milk and honey, then sweet wine, then water, and sprinkled white barley."], Rk.x + 34, Rk.z + 30);
var Pt = A.pit, py = ebsY(Pt.x, Pt.z);
wBox(1.6, 0.3, 1.6, ebsLam(0x1A1410), Pt.x, py + 0.05, Pt.z, g);
[[-1.2, 0], [1.2, 0], [0, -1.2], [0, 1.2]].forEach(function (o) { wBox(o[0] ? 0.3 : 2.6, 0.5, o[0] ? 2.6 : 0.3, ebsStone("grey"), Pt.x + o[0], py + 0.25, Pt.z + o[1], g); });
ebsSolid(Pt.x, Pt.z, 2.8, 2.8, py - 2, py + 0.5);
var T = ebsPerson("tiresias", Pt.x + 3, Pt.z - 4, py, { sex: "m", look: { skin: 0xC8B8A8, hair: 0xE8E8E8, beard: "long", topKind: "robe", top: 0xD8D0C0, bottom: 0xD8D0C0 } }, Math.PI * 0.8);
ebsShadeify(T.g, 0xC8D8F8, 0.7);
wCyl(0.03, 0.04, 1.8, ebsStone("gold"), 0.32, 0.9, 0.1, T.g, 5);
ebsTalk(T, "Tiresias", "Tiresias of Thebes, the blind prophet, who alone among the dead kept his mind (Odyssey 10.494), with his golden staff. Tells Odysseus (and you) of the way home, Poseidon's anger, the cattle of the Sun, and that death will come gently 'from the sea'. Speaks in riddling, kindly prophecy; never frightening.", "Son of Laertes... no. Another traveller who is not yet dead. Let me drink from the offering, and I will tell you true things.");
var An = ebsPerson("anticleia", Pt.x - 4, Pt.z - 3, py, { sex: "f", look: { skin: 0xD8B8A0, hair: 0xA8A8A8, hairStyle: "bun", topKind: "robe", top: 0x8A9AB0, bottom: 0x8A9AB0 } }, Math.PI * 1.2);
ebsShadeify(An.g, 0xA8C0E8, 0.55);
ebsTalk(An, "Anticleia", "Anticleia, mother of Odysseus, who died of longing for her son while he was away at Troy (Odyssey 11). Three times he tried to embrace her, and three times she slipped through his arms like a shadow or a dream; she explained this is how it is with the dead. Loving, sorrowful, gentle.", "Child, how did you come here, alive, under the misty dark? You cannot hold me: we are shadows here, and the sinews do not hold the flesh and bones.");
},
function (G) {
var A = EBS_AT, g = ebsDistrict(G, 0, 1780, 400), far = ebsDistrict(G, 0, 1760, 4800, true), stone = ebsStone("dark"), Gz = A.gate.z;
var runs = [[-4700, -9], [9, 4700]];
runs.forEach(function (Rn) {
var x0 = Rn[0], x1 = Rn[1];
for (var x = x0; x < x1; x += 600) {
var xe = Math.min(x1, x + 600);
ebsWallLine(far, x, Gz, xe, Gz, ebsY((x + xe) / 2, Gz) - 6, 32, 8, stone, true);
if (xe < x1)
ebsTower(far, xe, ebsY(xe, Gz) - 6, Gz, 8, 42, stone);
}
});
var gy = ebsY(0, Gz);
[-16, 16].forEach(function (tx) { ebsTower(g, tx, gy - 2, Gz, 9, 48, stone, ebsStone("bronze")); ebsTorch(g, tx + (tx < 0 ? 6 : -6), gy + 9, Gz + 9.4, 0, tx + (tx < 0 ? 6 : -6), Gz + 9.4, 0xFF8A40); });
wBox(16, 3, 10, stone, 0, gy + 30, Gz, g);
var lint = wBox(18, 1.2, 11, ebsStone("bronze"), 0, gy + 28.4, Gz, g);
var ad = ebsS("b:iron", 0x3A4A5A, 1.6, { shine: 120, spec: 0xA8C8E8, n: 0.5 });
[-1, 1].forEach(function (sd) {
var lf = new THREE.Group();
lf.position.set(sd * 8, gy, Gz - 3);
g.add(lf);
var p = wBox(8, 26, 0.8, ad, -sd * 4, 13, 0, lf);
lf.rotation.y = sd * 1.35;
for (var b = 0; b < 5; b++)
wBox(8, 0.5, 0.9, ebsStone("bronze"), -sd * 4, 3 + b * 5, 0, lf);
});
wBox(16, 0.4, 10, ebsStone("bronze"), 0, gy + 0.2, Gz, g);
ebsFloor(0, Gz, 16, 10, gy + 0.4);
ebsSolid(-8.5, Gz, 1, 10, gy - 5, gy + 40);
ebsSolid(8.5, Gz, 1, 10, gy - 5, gy + 40);
var Cb = ebsCerberus();
Cb.position.set(0, gy, Gz + 30);
Cb.rotation.y = 0;
Cb.userData.keep = 1;
g.add(Cb);
EBS.cerb = { g: Cb, block: ebsSolid(0, Gz, 16.6, 10, gy - 5, gy + 40), asleep: 0 };
if (ebsData().passed || ebsKeeper())
ebsSolidOff(EBS.cerb.block);
EBS.talk.push({ p: { g: { position: { x: 0, y: gy, z: Gz + 38 }, visible: true } }, r: 12, name: "Cerberus", fn: function () { ebsCerbTalk(); } });
EBS_LSRC.push({ x: 0, y: gy + 6, z: Gz + 36, col: 0xFF5A2A, k: 1.1, dist: 20, flick: true, ph: 0 });
var D = A.den, dy = ebsY(D.x, D.z);
ebsRock(g, D.x + 6, dy - 4, D.z - 6, 16, 51, ebsStone("cave"));
ebsRound(D.x + 6, D.z - 6, 14, -10, 20);
var dm = new THREE.Mesh(new THREE.CircleGeometry(4, 16, 0, Math.PI), ebsGlowM(0x060404));
dm.position.set(D.x, dy, D.z + 1.6);
g.add(dm);
for (var k = 0; k < (EBS.lite ? 4 : 10); k++) {
var r = wRand(1300 + k);
var bn = wCyl(0.08, 0.1, 0.9, ebsLam(0xD8D0B8), D.x - 4 + r() * 8, dy + 0.1, D.z + 4 + r() * 4, g, 5);
bn.rotation.z = Math.PI / 2;
bn.rotation.y = r() * 3;
}
ebsDoor(D.x, D.z + 4, 3, "Cerberus's den", "den", dy);
var H = A.gatehouse;
ebsHall(g, { x: H.x, y: ebsY(H.x, H.z), z: H.z, rot: 0, w: 18, d: 14, h: 10, mat: stone, trimMat: ebsStone("bronze"), roofMat: ebsStone("slate"), room: "gatehouse", name: "the Gatehouse of Hades" });
var Ae = ebsPerson("aeacus", H.x + 12, H.z + 10, ebsY(H.x + 12, H.z + 10), { sex: "m", look: { skin: 0xC8A080, hair: 0xD8D8D8, beard: "full", topKind: "robe", top: 0xE8E0D0, bottom: 0xE8E0D0, layer: "longcoat", layerColor: 0x2A2A4A, hat: "crown", hatColor: 0x8A7A3A } }, Math.PI);
ebsTalk(Ae, "Aeacus, keeper of the keys", "Aeacus, son of Zeus and the nymph Aegina, king of Aegina, so just in life that he became one of the three judges of the dead; later writers say he keeps the keys of Hades. Judges souls from Europe (Plato). Courteous, solemn, likes explaining the rules of the underworld: the obol, the gate, Cerberus who lets in but not out.", "The keys of Hades are in my keeping. The gate stands open for all who come in. Going out is another matter; ask the dog.");
ebsStele(g, 24, gy, Gz + 16, 0, "The Gate of Hades", "Pylai Haidao", ["Homer speaks of the gates of Hades as a byword for death itself: 'hateful to me as the gates of Hades is the man who hides one thing in his heart and speaks another' (Iliad 9).", "Hesiod: before the house of Hades 'a fearful hound keeps guard, pitiless, with an evil trick: those who go in, he fawns on with his tail and both his ears; but he will not let them out again'.", "Virgil gives him three throats and snakes bristling on his neck; the Sibyl threw him a honey cake laced with sleep."], 24, Gz + 16);
},
function (arch, seed, s, tint) {
var g = null;
try {
g = buildCreature({ id: "ebs_b_" + arch + "_" + seed, archetype: arch, attrs: {}, solid: false, detail: EBS.lite ? 2 : 3, nights: [], city: true }, 1);
}
catch (e) {
g = null;
}
if (!g) {
g = new THREE.Group();
var b = wBox(0.8, 0.9, 2, ebsLam(tint || 0x2A2020), 0, 1.2, 0, g);
}
if (tint)
g.traverse(function (o) { if (o.isMesh && o.material && o.material.color) {
o.material = o.material.clone();
o.material.color.lerp(new THREE.Color(tint), 0.75);
} });
if (s)
g.scale.multiplyScalar(s);
g.userData.keep = 1;
return g;
},
function (g, x, y, z, r, waterCol, rimMat, glow) {
var rim = new THREE.Mesh(new THREE.TorusGeometry(r, 0.45, 6, Math.max(16, Math.round(r * 4))), rimMat || ebsStone("white"));
rim.rotation.x = Math.PI / 2;
rim.position.set(x, y + 0.35, z);
g.add(rim);
var wm = ebsWaterMat(waterCol, false, 0.92);
var w = new THREE.Mesh(new THREE.CircleGeometry(r, Math.max(16, Math.round(r * 4))), wm);
w.rotation.x = -Math.PI / 2;
w.position.set(x, y + 0.2, z);
g.add(w);
if (glow) {
var gl = wGlow(glow, r * 1.6, 0.35);
gl.position.set(x, y + 0.6, z);
g.add(gl);
}
ebsRound(x, z, r + 0.2, y - 3, y + 0.9);
return w;
},
function (G) {
var A = EBS_AT;
var M = A.mourn, g = ebsDistrict(G, M.x, M.z, 380), R = wRand(51);
for (var i = 0; i < (EBS.lite ? 50 : 130); i++) {
var a = R() * 6.28, d = 30 + Math.sqrt(R()) * 330, x = M.x + Math.cos(a) * d, z = M.z + Math.sin(a) * d * 0.7;
if (ebsWaterAt(x, z) !== null)
continue;
ebsTree(R() < 0.75 ? "myrtle" : "cypress", g, x, ebsY(x, z), z, 0.8 + R() * 0.5, 3000 + i);
}
ebsCrowd(M.x, M.z, 240, EBS.lite ? 40 : 90, ebsY, 0xD8B8E8, 0.26, 21);
[["Dido", M.x + 30, M.z + 20, "Dido, queen of Carthage, who loved Aeneas and died when he left her (Aeneid 4 and 6). When Aeneas meets her here she will not speak to him: she turns away, eyes on the ground, and goes back to the shady grove where her first husband Sychaeus returns her love. With a visitor who is not Aeneas she is regal, sad and dignified, speaks of Carthage she founded, never of how she died.", "..."],
["Laodamia", M.x - 40, M.z - 30, "Laodamia, wife of Protesilaus, the first Greek to leap ashore at Troy and the first to die. The gods let him come back to her for three hours. She speaks of waiting, of ships, of three hours being both too long and not long enough. Tender, wistful.", "Three hours. They gave me three hours with him, and then the shadows came back for him. I followed."],
["Eurydice's empty seat", M.x - 6, M.z - 60, null, null]].forEach(function (W, i) {
if (!W[3])
return;
var P = ebsPerson("mourn" + i, W[1], W[2], ebsY(W[1], W[2]), { sex: "f", look: { hairStyle: i ? "braids" : "long", hair: i ? 0x6A4A2A : 0x2A1A10, topKind: "dress", top: i ? 0xA8A0C8 : 0x6A2A4A, bottom: i ? 0xA8A0C8 : 0x6A2A4A, hat: i ? null : "tiara", hatColor: 0xD8B860 } }, i ? 0.4 : Math.PI * 1.1);
ebsShadeify(P.g, 0xD8B8F0, 0.6);
ebsTalk(P, W[0], W[3], W[4] === "..." ? "(She turns her face away and looks at the ground, saying nothing; then, slowly, she speaks to you, because you are not the man who left her.) You walk among the dead as if you belonged with the living. Carthage is far." : W[4]);
});
ebsStele(g, M.x + 60, ebsY(M.x + 60, M.z + 80), M.z + 80, 0.3, "The Fields of Mourning", "Lugentes campi (Aeneid 6.440-476)", ["\"Here those whom hard love has consumed with its cruel wasting are hidden in secret paths, and a myrtle wood covers them all round: even in death their cares do not leave them.\"", "Aeneas meets Dido here, and weeps; she will not answer him, and goes back into the shade to Sychaeus."], M.x + 60, M.z + 80);
var W = A.wardead, h = ebsDistrict(G, W.x, W.z, 380), bronze = ebsStone("bronze");
ebsCrowd(W.x, W.z, 260, EBS.lite ? 50 : 120, ebsY, 0xE8D8B8, 0.3, 22);
for (var t = 0; t < (EBS.lite ? 6 : 14); t++) {
var R2 = wRand(1400 + t), a2 = R2() * 6.28, d2 = 60 + R2() * 240, x2 = W.x + Math.cos(a2) * d2, z2 = W.z + Math.sin(a2) * d2 * 0.7, y2 = ebsY(x2, z2), tr = new THREE.Group();
tr.position.set(x2, y2, z2);
tr.rotation.y = R2() * 6;
h.add(tr);
wCyl(0.12, 0.14, 3.4, ebsStone("oak"), 0, 1.7, 0, tr, 6);
var arm = wBox(1.6, 0.14, 0.14, ebsStone("oak"), 0, 2.7, 0, tr);
var cu = wBox(0.9, 1.1, 0.4, bronze, 0, 2.2, 0, tr);
var hl = wSph(0.3, bronze, 0, 3.5, 0, tr, 8);
hl.scale.y = 1.2;
var sh = wCyl(0.7, 0.7, 0.1, bronze, 0.6, 1.6, 0.22, tr, 16);
sh.rotation.x = Math.PI / 2;
ebsRound(x2, z2, 0.5, y2 - 2, y2 + 4);
}
[["Deiphobus", W.x - 30, W.z + 10, "Deiphobus, prince of Troy, son of Priam, who married Helen after Paris died; on Troy's last night he was horribly cut down in his bed (Aeneid 6.494-534). He tells the story of the wooden horse and the last night of Troy plainly, without gore, and urges the visitor on: 'Go, our glory, go; enjoy a better fate'.", "Who brings a living face among us? I knew Troy's walls when they stood. Go on, friend: the time for talk is short down here."],
["Tydeus", W.x + 40, W.z - 20, "Tydeus, one of the Seven against Thebes, small in body but a great fighter (Iliad 4, 5), father of Diomedes. Gruff, proud of his son, tells of the war of the Seven.", "My son fought at Troy better than I fought at Thebes. You may tell him I said so, if you see him."],
["Adrastus", W.x + 10, W.z + 50, "Adrastus, king of Argos, who led the Seven against Thebes and was the only one to come home, saved by his swift horse Arion. Pale, old and thoughtful; speaks of the cost of war.", "I led seven to Thebes, and came home alone on a horse faster than grief. I came down here like everyone else, in the end."]].forEach(function (V, i) {
var P = ebsPerson("war" + i, V[1], V[2], ebsY(V[1], V[2]), { sex: "m", look: { beard: i === 2 ? "long" : "short", hair: i === 2 ? 0xD8D8D8 : 0x3A2A1A, layer: "armor", layerColor: 0xA87A3A, topKind: "robe", top: 0x8A2A2A, bottom: 0x8A2A2A, hat: "helmet", hatColor: 0xB8883A } }, Math.PI * (0.8 + i * 0.2));
ebsShadeify(P.g, 0xF0E0C0, 0.65);
ebsTalk(P, V[0], V[3], V[4]);
});
ebsStele(h, W.x - 60, ebsY(W.x - 60, W.z + 80), W.z + 80, -0.3, "The fields of the war-dead", "Arva ultima (Aeneid 6.477-547)", ["The furthest fields, set apart for those famous in war. The Trojans crowd round Aeneas; the Greek leaders, seeing his armour flash in the dark, turn and run, 'some as once they ran to the ships', some raising a thin cry that dies in their open mouths."], W.x - 60, W.z + 80);
},
function (G) {
var A = EBS_AT, C = A.cross, g = ebsDistrict(G, C.x, C.z, 420), cy = ebsY(C.x, C.z);
var pv = new THREE.Mesh(new THREE.CircleGeometry(48, 40), ebsM("crossPave", function () { var q = new THREE.MeshLambertMaterial({ map: ebsPhotoTex("paving", 3), color: 0x8A8078, polygonOffset: true, polygonOffsetFactor: -3, polygonOffsetUnits: -3 }); q.userData.noPhoto = 1; return q; }));
pv.rotation.x = -Math.PI / 2;
pv.position.set(C.x, cy + 0.1, C.z);
g.add(pv);
[["To Tartarus", "the left-hand road, down to the place of punishment", -0.7], ["To Elysium", "the right-hand road, under the walls of Dis to the fields of the blessed", 0.7], ["To the Palace", "straight on, to the house of Hades and Persephone", 0]].forEach(function (S, i) {
var px = [-44, 44, 12][i], pz = [720, 760, 710][i];
var p = wBox(1.2, 4.6, 1.2, ebsStone("grey"), px, cy + 2.3, pz, g);
ebsSignAt(S[0], px, cy + 4.9, pz, g);
ebsRound(px, pz, 0.8, cy - 2, cy + 5);
});
ebsStele(g, C.x + 34, cy, C.z + 30, 0.6, "Where the road divides", "Aeneid 6.540-543; Plato, Gorgias 524a", ["\"This is the place where the road splits in two: on the right it runs under the walls of great Dis, our way to Elysium; but the left takes the wicked to their punishment, and sends them to godless Tartarus.\"", "Plato: the judges sit 'in the meadow, at the crossroads from which the two roads lead, one to the Isles of the Blessed and the other to Tartarus'."], C.x + 34, C.z + 30);
var Hk = A.hecate, hy = ebsY(Hk.x, Hk.z), sh = new THREE.Group();
sh.position.set(Hk.x, hy, Hk.z);
g.add(sh);
wCyl(4.2, 4.6, 0.8, ebsStone("black"), 0, 0.4, 0, sh, 24);
wCyl(1, 1.1, 2.2, ebsStone("white"), 0, 1.9, 0, sh, 12);
for (var k = 0; k < 3; k++) {
var a3 = k * Math.PI * 2 / 3;
ebsStatue(sh, Math.sin(a3) * 0.5, 3, Math.cos(a3) * 0.5, 0.9, ebsStone("white"), { ry: a3, plinth: false, robe: true, holds: "torch", veil: k === 1 });
}
for (var k2 = 0; k2 < 3; k2++) {
var a4 = k2 * Math.PI * 2 / 3 + Math.PI / 3;
ebsBrazier(sh, Math.sin(a4) * 3.4, 0.8, Math.cos(a4) * 3.4, 0.8, Hk.x + Math.sin(a4) * 3.4, Hk.z + Math.cos(a4) * 3.4, 0x9A6AFF);
}
[[-6, 4], [6, 5]].forEach(function (o, i) { var d = ebsBeast("hellhound", "hk" + i, 0.7, 0x101014); d.position.set(o[0], 0, o[1]); d.rotation.y = i ? -0.6 : 0.6; sh.add(d); });
ebsRound(Hk.x, Hk.z, 4.4, hy - 2, hy + 6);
ebsSpot(Hk.x, Hk.z + 6, 6, "Hecate of the crossroads", "leave her a supper", function () { worldCard(worldFacts("Hecate", "Hekate Trioditis, of the three ways", [], ["Goddess of the crossroads, of torches and the night. Her images stood where three roads met, three faces looking down each road; at each new moon people left 'Hecate's suppers' there.", "Hesiod honours her above almost every other god (Theogony 411-452). She carried torches to help Demeter look for Persephone, and became Persephone's companion in the underworld (Homeric Hymn to Demeter).", "In Virgil it is Hecate who set the Sibyl over the groves of Avernus and showed her Tartarus."])); }, hy);
var J = A.judge;
ebsTemple(g, { x: J.x, y: ebsY(J.x, J.z), z: J.z, rot: Math.PI / 2, w: 40, d: 56, colH: 13, nx: 8, mat: ebsStone("dark"), colMat: ebsStone("black"), capMat: ebsStone("gold"), roofMat: ebsStone("slate"), room: "judge", name: "the Hall of Judgement", friezeFg: "#E8C870", steps: 4, torchCol: 0xFFB060 });
var Mn = ebsPerson("minos_out", J.x + 36, J.z + 8, ebsY(J.x + 36, J.z + 8), { sex: "m", look: { layer: "armor", layerColor: 0x2A2A2A, topKind: "robe", top: 0x8A6A2A, bottom: 0x8A6A2A, beard: "short" } }, Math.PI / 2);
ebsShadeify(Mn.g, 0xE8D8B0, 0.6);
ebsTalk(Mn, "A herald of Minos", "A herald who calls the dead in to be judged by Minos. Formal, fair, a little weary after thousands of years; explains that inside, the visitor can stand before the judges and answer for themselves.", "The judges are sitting. Go in when you are ready to give an account of yourself; they have heard every excuse there is.");
ebsRoad(g, [[0, 1740], [0, 1400], [0, 1100], [0, 810]], 8, true);
ebsRoad(g, [[-36, 742], [-500, 600], [-1000, 320], [-1420, 60], [-1560, 20]], 7, true, 0x6A5A50);
ebsRoad(g, [[0, 712], [0, 300], [0, -200], [0, -700], [0, -1100], [0, -1300]], 10, true);
ebsRoad(g, [[36, 742], [600, 560], [1400, 340], [2400, 120], [3400, -160], [4200, -360]], 7, true, 0x9A9080);
},
function (G) {
var A = EBS_AT, P = A.asph, g = ebsDistrict(G, P.x, P.z, P.r + 200, true), near = ebsDistrict(G, P.x, P.z, P.r);
ebsAsphodel(P.x, P.z, P.r, EBS.lite ? 1400 : 5200, ebsY, 61);
ebsAsphodel(-1200, -200, 700, EBS.lite ? 500 : 1800, ebsY, 62);
ebsCrowd(P.x, P.z, P.r * 0.8, EBS.lite ? 120 : 360, ebsY, 0xB8C8E0, 0.25, 31);
ebsCrowd(-900, -400, 500, EBS.lite ? 50 : 140, ebsY, 0xB8C8E0, 0.25, 32);
var S = [["Achilles", P.x - 200, P.z + 150, { beard: null, hair: 0xD8A850, hairStyle: "long", layer: "armor", layerColor: 0xD8B04A, topKind: "robe", top: 0xF0E8D8, bottom: 0xF0E8D8 }, "Achilles, greatest of the Greeks at Troy, who chose a short glorious life over a long quiet one. When Odysseus tells him he rules among the dead, he answers: 'I would rather be a hired hand on earth, working for a poor man with little to live on, than lord over all the dead.' He then asks eagerly for news of his son Neoptolemus and his father Peleus, and strides off glad across the asphodel when told his son was brave. Proud, honest, quick to joy and grief.", "Don't make light of death to me. I would rather work the fields of a poor man, up there in the sun, than be king of all these dead. Tell me: have you news of my son?"],
["Ajax", P.x - 120, P.z + 260, { beard: "full", hair: 0x2A1A10, layer: "armor", layerColor: 0x8A6A3A, topKind: "robe", top: 0x4A3A2A, bottom: 0x4A3A2A }, "Ajax son of Telamon, the giant bulwark of the Greeks, who killed himself after the armour of Achilles was given to Odysseus instead of him. In the Odyssey he will not speak to Odysseus and walks away into the dark. With a visitor he is very few words, deep-voiced, still wounded in pride.", "(He looks at you for a long time.) The armour went to the clever man. Not to the strong one. Go and talk to someone else."],
["Agamemnon", P.x + 80, P.z + 200, { beard: "full", hair: 0x6A5A4A, layer: "longcoat", layerColor: 0x6A1A2A, topKind: "robe", top: 0x8A2A3A, bottom: 0x8A2A3A, hat: "crown", hatColor: 0xD8B04A }, "Agamemnon, king of Mycenae, leader of the Greeks at Troy, killed on the day of his homecoming in his own house. Bitter about his homecoming, warns the visitor to come home quietly and trust carefully; asks for news of his son Orestes. Kingly, sorrowful.", "I came home from ten years of war, and did not live to see the evening. When you go home, traveller, go quietly."],
["Orion", P.x + 380, P.z - 120, { beard: "short", hair: 0x2A1A10, layer: "tunic", layerColor: 0x5A4A2A, topKind: "robe", top: 0x3A3A2A, bottom: 0x3A3A2A }, "Orion the giant hunter, whom Odysseus saw 'driving together across the meadow of asphodel the beasts he had killed in the lonely hills, holding a club all of bronze, never to be broken' (Odyssey 11.572-575). Big, cheerful, talks only about hunting and the stars he became.", "Ho! A living one. Have you seen a stag go by? No? They are all shadows now, and so am I, but the chase is still the chase."],
["Heracles (his phantom)", P.x + 260, P.z + 320, { beard: "full", hair: 0x3A2A1A, layer: "longcoat", layerColor: 0xB88A3A, topKind: "robe", top: 0x5A4A2A, bottom: 0x5A4A2A, back: "cape" }, "The phantom of Heracles; Homer says the hero himself feasts with the gods on Olympus and this is only his image, dark as night, bow drawn, arrow on the string, glaring about him, with a terrible golden belt carved with bears, boars, lions, battles and murders (Odyssey 11.601-627). He recognises a fellow sufferer of labours; speaks of the twelve labours, especially fetching Cerberus.", "You too, poor wretch, carry some hard labour on you, as I did under the sun? They sent me down here once to fetch the dog. I brought him up, too."]];
S.forEach(function (V, i) {
var P2 = ebsPerson("asph" + i, V[1], V[2], ebsY(V[1], V[2]), { sex: "m", look: V[3] }, wRand(80 + i)() * 6.28);
ebsShadeify(P2.g, 0xC8D8F8, 0.62);
ebsTalk(P2, V[0], V[4], V[5]);
if (i === 4) {
var bw = new THREE.Mesh(new THREE.TorusGeometry(0.6, 0.03, 4, 16, Math.PI), ebsStone("oak"));
bw.position.set(0.4, 1.3, 0.2);
bw.rotation.y = Math.PI / 2;
P2.g.add(bw);
}
if (i === 3)
wCyl(0.06, 0.12, 1.6, ebsStone("bronze"), 0.36, 1, 0.1, P2.g, 6);
});
for (var b = 0; b < (EBS.lite ? 2 : 5); b++) {
var bs = ebsBeast(b % 2 ? "boar" : "bear", "or" + b, 0.9);
var bx = P.x + 420 + b * 14, bz = P.z - 150 + b * 9;
bs.position.set(bx, ebsY(bx, bz), bz);
bs.rotation.y = -1;
ebsShadeify(bs, 0xA8B8D8, 0.35);
near.add(bs);
EBS.fx.push({ k: "drift", m: bs, x0: bx, z0: bz, ph: b });
}
ebsStele(near, P.x - 260, ebsY(P.x - 260, P.z + 340), P.z + 340, 0.4, "The Meadow of Asphodel", "Asphodelos leimon (Odyssey 11, 24)", ["Homer's dead walk 'the meadow of asphodel', a pale flower that grows on poor ground in Greece, grey-white on tall stems.", "Later writers made it the home of ordinary souls: neither wicked enough for Tartarus nor heroic enough for Elysium. Most of the dead, they said, were here.", "Achilles told Odysseus he would rather be a poor man's hired hand on earth than king of all the dead."], P.x - 260, P.z + 340);
},
function (G) {
var A = EBS_AT, P = A.palace, g = ebsDistrict(G, P.x, P.z, P.r + 260, true), py = P.h, blk = ebsStone("black"), gold = ebsStone("gold");
ebsTemple(g, { x: P.x, y: py, z: P.z, rot: 0, w: 96, d: 70, colH: 20, nx: 12, mat: blk, colMat: ebsStone("dark"), capMat: gold, roofMat: ebsStone("bronze"), room: "palace", name: "the Palace of Hades", friezeFg: "#E8C060", friezeBg: "#0A0808", steps: 6, door: [7, 12], torchCol: 0xFFA040 });
ebsHall(g, { x: P.x - 74, y: py, z: P.z + 6, rot: 0, w: 40, d: 50, h: 14, mat: blk, trimMat: gold, roofMat: ebsStone("bronze"), colMat: ebsStone("dark"), room: "persephone", name: "Persephone's rooms", torchCol: 0xFFB080 });
ebsHall(g, { x: P.x + 74, y: py, z: P.z + 6, rot: 0, w: 40, d: 50, h: 14, mat: blk, trimMat: gold, roofMat: ebsStone("bronze"), colMat: ebsStone("dark"), room: "shades", name: "the Hall of Shades", torchCol: 0x9AB0FF });
var cz = P.z + 150, yc = py;
ebsFloor(P.x, cz, 200, 190, yc + 0.05);
ebsWallLine(g, P.x - 100, P.z + 245, P.x - 12, P.z + 245, yc, 7, 2, blk, false);
ebsWallLine(g, P.x + 12, P.z + 245, P.x + 100, P.z + 245, yc, 7, 2, blk, false);
ebsWallLine(g, P.x - 100, P.z + 245, P.x - 100, P.z + 40, yc, 7, 2, blk, false);
ebsWallLine(g, P.x + 100, P.z + 245, P.x + 100, P.z + 40, yc, 7, 2, blk, false);
ebsTemple(g, { x: P.x, y: yc, z: P.z + 245, rot: 0, w: 24, d: 10, colH: 10, nx: 4, nz: 2, mat: blk, colMat: ebsStone("dark"), capMat: gold, roofMat: ebsStone("bronze"), noCella: true, steps: 2 });
var pl = new THREE.Mesh(new THREE.PlaneGeometry(12, 120), ebsWaterMat(0x0A1A2A, false, 0.95));
pl.rotation.x = -Math.PI / 2;
pl.position.set(P.x, yc + 0.15, cz);
g.add(pl);
[-6.4, 6.4].forEach(function (sx) { wBox(0.8, 0.6, 121, ebsStone("white"), P.x + sx, yc + 0.3, cz, g); });
ebsSolid(P.x, cz, 13.6, 121, yc - 3, yc + 0.6);
for (var k = 0; k < (EBS.lite ? 6 : 12); k++) {
var tz = P.z + 90 + k * 12;
[-22, 22].forEach(function (tx) { ebsTree("pomegranate", g, P.x + tx, yc, tz, 0.9, 3100 + k * 2 + (tx > 0)); ebsRound(P.x + tx, tz, 0.5, yc - 2, yc + 4); });
}
ebsStatue(g, P.x - 22, yc, P.z + 52, 2.6, blk, { ry: 0, holds: "sceptre", robe: true, solid: true, wx: P.x - 22, wz: P.z + 52 });
ebsStatue(g, P.x + 22, yc, P.z + 52, 2.4, ebsStone("white"), { ry: 0, holds: "poppies", veil: true, robe: true, solid: true, wx: P.x + 22, wz: P.z + 52 });
ebsStele(g, P.x - 12, yc, P.z + 70, 0, "The House of Hades", "Domos Aidao", ["Hades (the Unseen), son of Kronos, drew the underworld when he and his brothers Zeus and Poseidon cast lots for the world (Iliad 15.187-193). He is stern but just; Homer calls him 'Zeus of the underworld'.", "Persephone, daughter of Demeter, is his queen. He carried her off; she ate pomegranate seeds below, so she must spend part of every year here, and the earth is bare until she returns (Homeric Hymn to Demeter).", "His helmet, the Helm of Darkness made by the Cyclopes, makes its wearer unseen."], P.x - 12, P.z + 70);
var gx = P.x - 190, gz = P.z + 100;
for (var i = 0; i < (EBS.lite ? 10 : 24); i++) {
var R = wRand(3200 + i);
var tx2 = gx - 60 + R() * 120, tz2 = gz - 60 + R() * 120;
ebsTree(R() < 0.5 ? "cypress" : "pomegranate", g, tx2, ebsY(tx2, tz2), tz2, 0.8 + R() * 0.4, 3300 + i);
}
ebsAsphodel(gx, gz, 70, EBS.lite ? 120 : 360, ebsY, 63, 0xE8E0F8);
ebsPool(g, gx, ebsY(gx, gz), gz, 5, 0x2A3A5A, ebsStone("white"), 0x8AA8FF);
ebsStatue(g, gx, ebsY(gx, gz) + 0.6, gz, 1.1, ebsStone("white"), { ry: Math.PI, holds: "poppies", veil: true, plinth: true });
ebsSpot(gx + 7, gz, 6, "Persephone's garden", "pick a pomegranate", function () { worldCard(worldFacts("A pomegranate", "From Persephone's garden", [], ["You turn it in your hand and leave it on the tree. Anyone who eats food in the underworld must stay; Persephone ate a few seeds (four, or six, or seven, the stories differ) and so she spends that many months of the year here.", "When she goes back up to her mother, the earth flowers; when she comes down, winter comes. That is how the Greeks explained the seasons."])); }, ebsY(gx, gz));
var St = A.stables;
ebsHall(g, { x: St.x, y: ebsY(St.x, St.z), z: St.z, rot: -Math.PI / 2, w: 36, d: 22, h: 9, mat: ebsStone("ashlar"), trimMat: ebsStone("oak"), roofMat: ebsStone("slate"), gable: true, room: "stables", name: "the stables of Hades" });
var chx = St.x - 30, chz = St.z + 10, chy = ebsY(chx, chz), ch = new THREE.Group();
ch.position.set(chx, chy, chz);
ch.rotation.y = -Math.PI / 2;
g.add(ch);
wBox(1.8, 1, 1.4, gold, 0, 1.1, 0, ch);
[-1, 1].forEach(function (sd) { var wh = new THREE.Mesh(new THREE.TorusGeometry(0.7, 0.08, 6, 16), gold); wh.position.set(sd * 1, 0.75, 0); wh.rotation.y = Math.PI / 2; ch.add(wh); });
wBox(0.12, 0.12, 4, ebsStone("oak"), 0, 0.9, 2.6, ch);
for (var hn = 0; hn < 4; hn++) {
var hs = ebsBeast("horse", "hd" + hn, 1.05, 0x0C0A0A);
hs.position.set(-1.8 + hn * 1.2, 0, 4.6);
ch.add(hs);
}
ebsRound(chx, chz, 3, chy - 2, chy + 3);
ebsSolid(chx - 5.2, chz, 5, 6, chy - 2, chy + 3);
},
function (G) {
var A = EBS_AT;
var L = A.lethe, gl = ebsDistrict(G, L.x, L.z, 160), ly = ebsY(L.x, L.z);
ebsTree("cypressw", gl, L.x - 10, ly, L.z - 8, 1.3, 3401);
ebsPool(gl, L.x, ly, L.z, 7, 0xC8D8E8, ebsStone("white"), 0xD8E8FF);
ebsCrowd(L.x, L.z, 40, EBS.lite ? 12 : 30, ebsY, 0xE8F0F8, 0.2, 41);
ebsSpot(L.x, L.z + 9, 8, "The pool by the white cypress", "look into the water", function () { ebsSpring("lethe"); }, ly);
var Mm = A.memory, gm = ebsDistrict(G, Mm.x, Mm.z, 180), my = ebsY(Mm.x, Mm.z);
ebsPool(gm, Mm.x, my, Mm.z, 9, 0x1A3A6A, ebsStone("black"), 0x4A8AFF);
wBox(16, 6, 2, ebsStone("dark"), Mm.x, my + 3, Mm.z - 11, gm);
var ln = wSph(0.7, ebsStone("gold"), Mm.x, my + 3.4, Mm.z - 9.8, gm, 10);
var st = wCyl(0.12, 0.2, 3, ebsWaterMat(0x8AB8F0, false, 0.6), Mm.x, my + 1.8, Mm.z - 9.4, gm, 8);
ebsSolid(Mm.x, Mm.z - 11, 16, 2, my - 2, my + 6);
[-7, 7].forEach(function (gx, i) {
var Gd = ebsPerson("guard" + i, Mm.x + gx, Mm.z + 11, my, { sex: i ? "f" : "m", look: { layer: "armor", layerColor: 0x2A3A5A, topKind: "robe", top: 0x1A2A4A, bottom: 0x1A2A4A, hat: "helmet", hatColor: 0xC8C8D8 } }, Math.PI);
wCyl(0.04, 0.04, 2.6, ebsStone("silver"), 0.35, 1.3, 0, Gd.g, 5);
ebsTalk(Gd, "A guardian of the spring", "One of the guardians who stand before the spring of the Lake of Memory, as the Orphic gold tablets describe. They ask every soul: 'What are you seeking in the darkness of misty Hades?' and give water only to the one who answers 'I am a child of Earth and starry Sky; I am parched with thirst and perishing: give me quickly cold water flowing from the Lake of Memory.' Grave, unhurried; offers the visitor the chance to try.", "What are you seeking, in the darkness of misty Hades?", 3.2, function () { ebsSpring("memory"); });
});
ebsStele(gm, Mm.x + 16, my, Mm.z + 14, -0.4, "The Lake of Memory", "The Orphic gold tablets (Petelia, Hipponion, 4th century BC)", ["Small sheets of gold, folded up and buried with the dead in southern Italy, Thessaly and Crete, carry instructions for the soul.", "\"You will find on the left of the house of Hades a spring, and by it a white cypress. Do not go near this spring. You will find another, cold water flowing from the Lake of Memory, and guardians before it.\"", "Drinking from Forgetfulness (Lethe) wipes away your past; drinking from Memory (Mnemosyne) lets you keep it."], Mm.x + 16, Mm.z + 14);
var O = A.orph, oy = ebsY(O.x, O.z), go = ebsDistrict(G, O.x, O.z, 120);
var Or = ebsPerson("orpheus", O.x, O.z, oy, { sex: "m", look: { hair: 0x6A3A1A, hairStyle: "curly", beard: "short", topKind: "robe", top: 0xE8E0C8, bottom: 0xE8E0C8, layer: "longcoat", layerColor: 0x6A2A5A, hat: "flowercrown", hatColor: 0x6A9A3A } }, Math.PI);
var ly2 = new THREE.Group();
ly2.position.set(0.3, 1.2, 0.25);
Or.g.add(ly2);
wBox(0.3, 0.1, 0.05, ebsStone("gold"), 0, 0.45, 0, ly2);
[-0.15, 0.15].forEach(function (lx) { var a = wBox(0.04, 0.5, 0.04, ebsStone("gold"), lx, 0.2, 0, ly2); a.rotation.z = lx > 0 ? -0.15 : 0.15; });
var Eu = ebsPerson("eurydice", O.x - 3, O.z - 2, oy, { sex: "f", look: { hair: 0xC89A5A, hairStyle: "long", topKind: "dress", top: 0xE8F0F8, bottom: 0xE8F0F8, hat: "flowercrown", hatColor: 0xE8E0F8 } }, Math.PI);
ebsShadeify(Eu.g, 0xD8E8FF, 0.55);
ebsTalk(Or, "Orpheus", "Orpheus of Thrace, son of the Muse Calliope, the greatest singer who ever lived; his lyre made trees and stones follow him. His wife Eurydice died of a snakebite; he came down and sang until even Hades wept iron tears, and Persephone let her go on one condition: that he not look back until they reached the light. At the very edge he looked back, and lost her (Virgil, Georgics 4; Ovid, Metamorphoses 10). He offers to let the visitor try the walk: lead Eurydice up the path without looking back. Gentle, musical, haunted.", "Will you walk the path for me? She will follow behind you. You must not look back, not once, until you see the sky.", 3.4, function () { ebsOrpheusOffer(); });
ebsTalk(Eu, "Eurydice", "Eurydice, a dryad, wife of Orpheus. She speaks softly about the meadow where the snake bit her, about Orpheus's singing, and does not blame him for looking back: 'What could I complain of, except that I was loved?' (Ovid). Kind, quiet.", "He looked back because he loved me. What could I complain of, except that I was loved?");
var cl = new THREE.Mesh(new THREE.CircleGeometry(4.5, 16, 0, Math.PI), ebsGlowM(0x020203));
cl.position.set(O.x, oy, O.z - 14);
go.add(cl);
ebsRock(go, O.x - 9, oy - 2, O.z - 16, 9, 3501, ebsStone("cave"));
ebsRock(go, O.x + 9, oy - 2, O.z - 16, 9, 3502, ebsStone("cave"));
ebsRound(O.x - 9, O.z - 16, 7, oy - 3, oy + 14);
ebsRound(O.x + 9, O.z - 16, 7, oy - 3, oy + 14);
},
function (G) {
var A = EBS_AT, S = A.styx, g = ebsDistrict(G, S.x, S.z, 400, true), sy = ebsY(S.x, S.z), silver = ebsStone("silver");
var hx = S.x, hz = S.z, hs = new THREE.Group();
hs.position.set(hx, sy, hz);
hs.rotation.y = Math.PI / 2;
g.add(hs);
wBox(34, 1, 26, ebsStone("rock"), 0, 0.5, 0, hs);
ebsFloor(hx, hz, 26, 34, sy + 1);
for (var i = 0; i < 8; i++) {
var cx = -15 + i * 30 / 7;
[12, -12].forEach(function (cz) { ebsColumn(hs, cx, 1, cz, 15, 0.8, silver, silver); var P = ebsW({ x: hx, z: hz, rot: Math.PI / 2 }, cx, cz); ebsRound(P[0], P[1], 0.8, sy - 2, sy + 16); });
}
[-15, 15].forEach(function (cx) { for (var j = 1; j < 5; j++) {
var cz2 = -12 + j * 24 / 5;
ebsColumn(hs, cx, 1, cz2, 15, 0.8, silver, silver);
var P2 = ebsW({ x: hx, z: hz, rot: Math.PI / 2 }, cx, cz2);
ebsRound(P2[0], P2[1], 0.8, sy - 2, sy + 16);
} });
for (var r = 0; r < (EBS.lite ? 4 : 9); r++) {
ebsRock(hs, -14 + r * 3.4, 17 + (r % 3) * 1.6, (r % 2 ? 4 : -4), 5 + ((r * 7) % 3), 3600 + r, ebsStone("rock"));
}
wBox(32, 1.6, 26, ebsStone("rock"), 0, 16.6, 0, hs);
ebsHall(g, { x: hx, y: sy + 1, z: hz, rot: Math.PI / 2, w: 16, d: 12, h: 8, mat: ebsStone("dark"), trimMat: silver, roofMat: ebsStone("rock"), room: "styxhouse", name: "the house of Styx", porch: false, torchCol: 0x8AB0FF });
var Sx = ebsPerson("styx", hx + 12, hz + 3, sy + 1, { sex: "f", look: { skin: 0xB8C8D8, hair: 0x0A1020, hairStyle: "long", topKind: "dress", top: 0x0A1A3A, bottom: 0x0A1A3A, layer: "longcoat", layerColor: 0x1A2A4A, hat: "tiara", hatColor: 0xC8D8E8 } }, Math.PI / 2);
ebsTalk(Sx, "Styx", "Styx, eldest daughter of Ocean, goddess of the river of the unbreakable oath. She sided with Zeus first of all the gods against the Titans, bringing her children Victory, Power, Force and Rivalry; so Zeus made her the great oath of the gods. A god who swears by her water and breaks the oath lies breathless for a year and is cut off from the gods for nine more (Theogony 775-806). Thetis dipped baby Achilles in this river (a later story). Cold, majestic, absolutely truthful.", "Swear nothing by my water that you do not mean. Even the gods are afraid of it.", 3.6, function () { ebsOath(); });
ebsStele(g, hx + 22, sy, hz + 16, Math.PI / 2, "The River Styx", "Stygos hydor, 'the water of hate'", ["Hesiod: 'a tenth part of Ocean' that flows from a high sheer rock, and 'the great oath of the gods'.", "When the gods swear, Iris carries a golden jug of this cold water from far away, and the god pours it as he swears. If he breaks his word, he lies a year without breath, nectar or ambrosia, then nine years cut off from the councils of the gods.", "There is a real Styx in Arcadia: a waterfall off a cliff of Mount Chelmos, its water said to be deadly and to break any cup but one made of a horse's hoof."], hx + 22, hz + 16);
ebsRoad(g, [[-60, -1680], [-1400, -2300], [-2600, -2900], [-3000, -3300], [S.x + 24, S.z]], 6, true, 0x5A6A7A);
},
function (G) {
var A = EBS_AT, T = A.tmouth, g = ebsDistrict(G, T.x, T.z, T.r + 500, true), bronze = ebsStone("bronze"), iron = ebsStone("iron");
var n = EBS.lite ? 20 : 40, R = 470;
var half = Math.PI / n, gap = 11 / R;
for (var i = 0; i < n; i++) {
var a0 = (i - 0.5) / n * Math.PI * 2, a1 = (i + 0.5) / n * Math.PI * 2;
if (i === 0) {
[[gap, half], [-half, -gap]].forEach(function (A2) {
for (var w2 = 0; w2 < 3; w2++) {
var r2 = R - w2 * 9, x0b = T.x + Math.cos(A2[0]) * r2, z0b = T.z + Math.sin(A2[0]) * r2, x1b = T.x + Math.cos(A2[1]) * r2, z1b = T.z + Math.sin(A2[1]) * r2;
ebsWallLine(g, x0b, z0b, x1b, z1b, ebsY((x0b + x1b) / 2, (z0b + z1b) / 2) - 8, 30 + w2 * 10, 4, w2 === 1 ? iron : bronze, w2 === 2);
}
});
continue;
}
for (var w = 0; w < 3; w++) {
var rr = R - w * 9, hh = 30 + w * 10, x0 = T.x + Math.cos(a0) * rr, z0 = T.z + Math.sin(a0) * rr, x1 = T.x + Math.cos(a1) * rr, z1 = T.z + Math.sin(a1) * rr;
ebsWallLine(g, x0, z0, x1, z1, ebsY((x0 + x1) / 2, (z0 + z1) / 2) - 8, hh, 4, w === 1 ? iron : bronze, w === 2);
}
if (i % 5 === 0) {
var tx = T.x + Math.cos(a0) * R, tz = T.z + Math.sin(a0) * R;
ebsTower(g, tx, ebsY(tx, tz) - 8, tz, 7, 48, bronze);
}
}
var gx = T.x + R, gz = T.z, gy = ebsY(gx + 30, gz), ad = ebsS("b:iron", 0x3A4A5A, 1.6, { shine: 120, spec: 0xA8C8E8, n: 0.5 });
[-10, 10].forEach(function (o) { var c = wCyl(3, 3.2, 46, ad, gx, gy + 23, gz + o, g, 16); ebsRound(gx, gz + o, 3.2, gy - 5, gy + 50); });
wBox(10, 6, 26, ad, gx, gy + 48, gz, g);
[-1, 1].forEach(function (sd) { var lf = wBox(1, 34, 8, ad, gx - 2, gy + 17, gz + sd * 4, g); });
ebsSolid(gx - 2, gz, 2, 18, gy - 5, gy + 40);
var Pr = EBS_PHLEG_RING, b0 = T.x + Pr.r - Pr.w - 8, b1 = T.x + Pr.r + Pr.w + 8;
wBox(b1 - b0, 1, 9, bronze, (b0 + b1) / 2, gy + 1.5, gz, g);
ebsFloor((b0 + b1) / 2, gz, b1 - b0, 9, gy + 2);
[-4.6, 4.6].forEach(function (o) { wBox(b1 - b0, 1.2, 0.4, bronze, (b0 + b1) / 2, gy + 2.6, gz + o, g); ebsSolid((b0 + b1) / 2, gz + o, b1 - b0, 0.6, gy, gy + 4); });
var tx2 = gx + 16, tz2 = gz - 26, ty = ebsY(tx2, tz2);
ebsTower(g, tx2, ty - 4, tz2, 8, 64, iron, ebsStone("black"));
var Ti = ebsFury("tisiphone", "Tisiphone");
Ti.position.set(tx2, ty + 60.6, tz2);
Ti.rotation.y = Math.PI / 2;
Ti.scale.multiplyScalar(1.4);
Ti.userData.keep = 1;
g.add(Ti);
EBS.fx.push({ k: "fury", m: Ti, y0: Ti.position.y, ph: 0 });
ebsLightSrc(tx2, ty + 63, tz2, 0xFF3A1A, 1.6, 40);
ebsDoor(tx2 + 9, tz2, 3, "the iron tower", "tower", ty);
ebsSpot(gx + 10, gz, 8, "The gate of Tartarus", "go through, down into Tartarus", function () { ebsTarGate(); }, gy + 2);
ebsStele(g, gx + 40, ebsY(gx + 40, gz + 20), gz + 20, Math.PI / 2, "Tartarus", "Hesiod, Theogony 720-819; Aeneid 6.548-627", ["\"As far beneath the earth as heaven is above it\": a bronze anvil dropped from heaven falls nine days and nights and reaches earth on the tenth; dropped from earth, it falls nine more to Tartarus.", "The Titans are locked in there behind bronze gates Poseidon made, guarded by the Hundred-Handed giants.", "Virgil's Aeneas only looks: 'no pure soul may set foot on the threshold of crime'. The Sibyl tells him what is inside instead."], gx + 40, gz + 20);
EBS.tarGate = { x: gx, z: gz };
},
function (G) {
var A = EBS_AT, Gd0 = A.dreamgates, N = A.night, g = ebsDistrict(G, N.x, N.z, 360, true), ny = ebsY(N.x, N.z), blk = ebsStone("black");
ebsHall(g, { x: N.x, y: ny, z: N.z, rot: 0, w: 44, d: 36, h: 20, mat: blk, trimMat: ebsStone("bronze"), roofMat: blk, colMat: blk, room: "night", name: "the House of Night", dw: 6, dh: 10, torchCol: 0x6A7AFF, dark: 0x000002 });
wBox(10, 0.5, 4, ebsStone("bronze"), N.x, ny + 0.85, N.z + 20.4, g);
for (var c = 0; c < (EBS.lite ? 6 : 16); c++) {
var R = wRand(3700 + c), gl = wGlow(0x05060C, 30 + R() * 20, 0.65);
gl.position.set(N.x - 40 + R() * 80, ny + 24 + R() * 16, N.z - 30 + R() * 50);
g.add(gl);
EBS.fx.push({ k: "hang", m: gl, y0: gl.position.y, ph: R() * 9 });
}
var ax = N.x, az = N.z + 70, ay = ebsY(ax, az), at = new THREE.Group();
at.position.set(ax, ay, az);
g.add(at);
ebsStatue(at, 0, 0, 0, 7, ebsStone("grey"), { ry: Math.PI, pose: "raise", robe: false, plinth: true });
var sky = new THREE.Mesh(new THREE.SphereGeometry(9, 24, 16), ebsM("atlasSky", function () { var t = ebsCanvas("atlasstars", 256, 128, function (x, W, H) { x.fillStyle = "#0A1240"; x.fillRect(0, 0, W, H); var r = wRand(9); for (var i = 0; i < 300; i++) {
x.fillStyle = "rgba(255,255,240," + (0.4 + r() * 0.6) + ")";
x.fillRect(r() * W, r() * H, 1 + r() * 1.5, 1 + r() * 1.5);
} x.strokeStyle = "rgba(216,184,96,.6)"; x.lineWidth = 2; x.beginPath(); x.moveTo(0, H / 2); x.lineTo(W, H / 2); x.stroke(); }); var m = new THREE.MeshBasicMaterial({ map: t }); m.userData.noPhoto = 1; return m; }));
sky.position.set(0, 19, 0);
at.add(sky);
ebsRound(ax, az, 6, ay - 2, ay + 28);
ebsStele(g, ax + 14, ay, az + 8, 0, "Atlas holds up the sky", "Theogony 744-757", ["\"There, in front of it, the son of Iapetus stands and holds the wide sky on his head and tireless arms, where Night and Day come near and greet each other as they pass the great bronze threshold: one goes in as the other comes out, and the house never holds them both.\"", "Night's children live here too: Sleep and Death, terrible gods. The sun never looks on them."], ax + 14, az + 8);
var Ny = ebsPerson("nyx", N.x + 8, N.z + 26, ny, { sex: "f", look: { skin: 0x8A8AA8, hair: 0x02020A, hairStyle: "long", topKind: "dress", top: 0x02030C, bottom: 0x02030C, layer: "longcoat", layerColor: 0x0A0A2A, back: "cloak", hat: "tiara", hatColor: 0x8A9AD8 } }, Math.PI);
ebsRoad(g, [[60, -1640], [900, -2300], [1800, -2900], [N.x + 40, N.z + 60], [3000, -3500], [Gd0.x, Gd0.z + 24]], 7, true, 0x4A4A6A);
ebsTalk(Ny, "Nyx, Night", "Nyx, Night herself, born of Chaos (Theogony 123). Even Zeus feared to anger her (Iliad 14.258-261). Mother of Sleep, Death, Dreams, the Fates, and many others. Ancient, slow, starry, kind to sleepers; speaks of every night the visitor has ever slept through.", "I have covered you every night of your life, little one. You never thanked me. No one does.");
},
function (G) {
var A = EBS_AT, S = A.sleep, g = ebsDistrict(G, S.x, S.z, 360), sy = ebsY(S.x, S.z);
var face = new THREE.Group();
face.position.set(S.x, sy, S.z);
face.rotation.y = Math.atan2(-(S.x - 3420), -(S.z + 3420));
g.add(face);
var mo = new THREE.Mesh(new THREE.CircleGeometry(7, 20, 0, Math.PI), ebsGlowM(0x020206));
mo.position.set(0, 0, 0.5);
face.add(mo);
ebsRock(face, -11, -2, -3, 12, 3801, ebsStone("cave"));
ebsRock(face, 11, -2, -3, 12, 3802, ebsStone("cave"));
ebsRock(face, 0, 10, -5, 11, 3803, ebsStone("cave"));
var D = ebsW({ x: S.x, z: S.z, rot: face.rotation.y }, 0, 3);
ebsDoor(D[0], D[1], 4, "the Cave of Sleep", "sleep", sy);
[[-11, -3], [11, -3]].forEach(function (o) { var P = ebsW({ x: S.x, z: S.z, rot: face.rotation.y }, o[0], o[1]); ebsRound(P[0], P[1], 10, sy - 4, sy + 20); });
var pm = ebsLam(0xD8281A), pw = ebsLam(0xF0E8E0), stem = ebsLam(0x3A5A2A), R = wRand(39), n = EBS.lite ? 120 : 420, geo = new THREE.SphereGeometry(0.14, 6, 4), sg = new THREE.CylinderGeometry(0.015, 0.015, 0.6, 3);
var mR = new THREE.InstancedMesh(geo, pm, n), mW = new THREE.InstancedMesh(geo, pw, n), mS = new THREE.InstancedMesh(sg, stem, n), d = new THREE.Object3D(), iR = 0, iW = 0;
for (var i = 0; i < n; i++) {
var a = R() * 6.28, r = 8 + Math.sqrt(R()) * 70, x = S.x + Math.cos(a) * r, z = S.z + Math.sin(a) * r, y = ebsY(x, z);
d.position.set(x, y + 0.3, z);
d.scale.set(1, 1, 1);
d.rotation.set(0, 0, 0);
d.updateMatrix();
mS.setMatrixAt(i, d.matrix);
d.position.y = y + 0.62;
d.scale.set(1, 0.6, 1);
d.updateMatrix();
if (R() < 0.7)
mR.setMatrixAt(iR++, d.matrix);
else
mW.setMatrixAt(iW++, d.matrix);
}
mR.count = iR;
mW.count = iW;
[mR, mW, mS].forEach(function (m) { m.instanceMatrix.needsUpdate = true; m.frustumCulled = false; g.add(m); });
ebsStele(g, S.x - 30, ebsY(S.x - 30, S.z + 40), S.z + 40, Math.PI * 0.75, "The Cave of Sleep", "Ovid, Metamorphoses 11.592-649", ["\"No watchful crested bird calls up the dawn, no dog or goose breaks the silence; no beast, no cattle, no branch moving in the wind, no human voice. Silent rest lives there.\"", "\"From the bottom of the rock flows the stream of Lethe, whose waves, murmuring over the pebbles, invite sleep.\"", "Inside, on an ebony couch, lies the god Sleep (Hypnos), and round him the empty dreams, as many as ears of corn at harvest. His sons are Morpheus (who takes human shapes), Icelos or Phobetor (beasts), and Phantasos (things)."], S.x - 30, S.z + 40);
var Gd = A.dreamgates, gg = ebsDistrict(G, Gd.x, Gd.z, 200), gy = ebsY(Gd.x, Gd.z);
[[-14, "horn", 0xC89A5A], [14, "ivory", 0xF4ECD8]].forEach(function (V) {
var gx = Gd.x + V[0], m = ebsS(V[1] === "horn" ? "b:oak" : "b:marble", V[2], 2, { shine: V[1] === "horn" ? 40 : 90 });
var gt = new THREE.Group();
gt.position.set(gx, gy, Gd.z);
gg.add(gt);
wBox(2, 14, 2, m, -5, 7, 0, gt);
wBox(2, 14, 2, m, 5, 7, 0, gt);
wBox(13, 2.2, 2.4, m, 0, 15, 0, gt);
var arc = new THREE.Mesh(new THREE.TorusGeometry(4, 0.6, 8, 18, Math.PI), m);
arc.position.y = 10;
gt.add(arc);
var veil = wBox(8, 10, 0.2, ebsGlowM(V[1] === "horn" ? 0xE8B860 : 0xE8E8FF, 0.35, true), 0, 5, 0, gt);
EBS.fx.push({ k: "pulse", m: veil, ph: V[0] });
ebsRound(gx - 5, Gd.z, 1.4, gy - 2, gy + 16);
ebsRound(gx + 5, Gd.z, 1.4, gy - 2, gy + 16);
(function (kind, gx) { ebsSpot(gx, Gd.z + 3, 4, "The Gate of " + (kind === "horn" ? "Horn" : "Ivory"), "step through", function () { ebsDreamGate(kind); }, gy); })(V[1], gx);
});
ebsStele(gg, Gd.x, gy, Gd.z + 14, 0, "The Gates of Horn and Ivory", "Odyssey 19.562-567", ["Penelope: \"Two gates there are for fleeting dreams, one made of horn and one of ivory. Those that come through the sawn ivory deceive us, bringing words that come to nothing; but those that come out through the polished horn come true, when a mortal sees them.\"", "Virgil sends Aeneas back to the upper world through the ivory gate, and no one has ever agreed why."], Gd.x, Gd.z + 14);
},
function (G) {
var E = EBS_AT.egate, g = ebsDistrict(G, E.x, E.z, 260), ey = ebsY(E.x, E.z), gold = ebsStone("gold"), wh = ebsStone("white");
ebsTemple(g, { x: E.x, y: ey, z: E.z, rot: -Math.PI / 2, w: 22, d: 14, colH: 12, nx: 4, nz: 3, mat: wh, colMat: wh, capMat: gold, roofMat: gold, noCella: true, steps: 3, ionic: true, friezeFg: "#E8C860", friezeBg: "#F4F0E8" });
var lt = new THREE.Mesh(new THREE.PlaneGeometry(8, 12), ebsGlowM(0xFFF0C0, 0.55, true));
lt.position.set(E.x, ey + 7.3, E.z);
lt.rotation.y = Math.PI / 2;
g.add(lt);
EBS.fx.push({ k: "pulse", m: lt, ph: 2 });
ebsLightSrc(E.x, ey + 6, E.z, 0xFFE8A0, 1.4, 40, false);
for (var i = 0; i < (EBS.lite ? 6 : 14); i++) {
var R = wRand(3900 + i), tz = E.z - 60 + R() * 120, tx = E.x - 60 - R() * 80;
ebsTree(R() < 0.5 ? "laurel" : "myrtle", g, tx, ebsY(tx, tz), tz, 0.9 + R() * 0.4, 4000 + i);
}
ebsPool(g, E.x - 26, ey, E.z + 18, 2.4, 0x8AC8F0, wh, 0xC8E8FF);
ebsSpot(E.x - 26, E.z + 21, 3.6, "Fresh water", "sprinkle yourself, as Aeneas did", function () { worldBanner("You sprinkle yourself with fresh water. The air smells of laurel.", 3); }, ey);
ebsSpot(E.x - 4, E.z, 7, "The gate of Elysium", "go through, into Elysium", function () { ebsElyGate(); }, ey + 1.3);
ebsStele(g, E.x - 14, ey, E.z - 16, -Math.PI / 2, "Elysium", "Odyssey 4.561-569; Pindar, Olympian 2; Aeneid 6.637-678", ["Homer: the Elysian plain at the ends of the earth, where life is easiest for men: 'no snow, no great storm, never any rain, but always Ocean sends up breezes of the West Wind to refresh them'.", "Pindar: the Isles of the Blessed, where ocean breezes blow round, and golden flowers blaze.", "Virgil: 'they have their own sun, and their own stars'. They wrestle on the grass, dance, sing, and Orpheus plays for them in his long robe."], E.x - 14, E.z - 16);
},
function (x, z, yawTo, msg, y, after) {
var v = ebsVeil();
v.style.opacity = "1";
worldCard(null);
worldPrompt(null);
EBS.moving = true;
setTimeout(function () {
if (WLD.on !== EBS_KEY) {
v.style.opacity = "0";
EBS.moving = false;
return;
}
if (EBS.ride && !EBS.ride.keep)
ebsRideOff(true);
if (after && after.before)
try {
after.before();
}
catch (e) { }
var gy = y !== undefined && y !== null ? y : ebsGround(x, z);
camera.position.set(EBS.base + x, gy + 1.72, z);
if (yawTo !== undefined && yawTo !== null)
yaw = yawTo;
pitch = 0;
if (typeof flyY !== "undefined")
flyY = 0;
EBS.region = ebsRegion(x);
EBS.room = ebsInAt(x);
if (msg)
setStatus(msg);
if (after && after.fn)
try {
after.fn();
}
catch (e) { }
setTimeout(function () { v.style.opacity = "0"; EBS.moving = false; }, 140);
}, 640);
},
function (I) {
if (I.built)
return;
var grp = new THREE.Group();
grp.name = "ebs-in-" + I.key;
EBS.G.add(grp);
I.grp = grp;
EBS.curGrp = grp;
try {
I.build(grp, I);
}
catch (e) {
if (window.console)
console.warn("[erebos] inside " + I.key, e);
}
EBS.curGrp = null;
I.built = true;
if (typeof gwBake === "function")
try {
gwBake(grp);
}
catch (e) { }
},
function (key, alt) {
var I = EBS_IN[key];
if (!I) {
worldBanner("The door is barred.", 2);
return;
}
if (!EBS.room) {
var c = worldLocal();
EBS.outside = { x: c.x, z: c.z, y: camera.position.y - 1.72, yaw: yaw + Math.PI };
}
ebsInBuild(I);
var A = alt && I[alt] ? I[alt] : I.arrive;
ebsMove(I.x + A[0], I.z + A[1], A[2], I.say || ("<b>" + I.name + ".</b>"), 0);
},
function () {
for (var k in EBS_IN) {
var I = EBS_IN[k];
if (!I.built || EBS.room === I)
continue;
if (!EBS.lite && !(typeof wlgHeavy === "function" && wlgHeavy()))
continue;
if (I.grp) {
EBS.G.remove(I.grp);
I.grp.traverse(function (m) { if (m.geometry && !m.geometry.userData.shared)
m.geometry.dispose(); });
}
var x0 = I.x - 195, x1 = I.x + 195, out = function (px) { return px < x0 || px > x1; };
EBS.floors = EBS.floors.filter(function (f) { return out(f.x); });
EBS.spots = EBS.spots.filter(function (s) { return out(s.x); });
EBS.talk = EBS.talk.filter(function (t) { return out(t.p.g.position.x); });
EBS.people = EBS.people.filter(function (p) { return out(p.g.position.x); });
EBS_LSRC = EBS_LSRC.filter(function (s) { return out(s.x); });
EBS.fx = EBS.fx.filter(function (f) { return !f.m || out(f.m.position.x + (f.m.parent && f.m.parent.position ? f.m.parent.position.x : 0)); });
EBS.solids = EBS.solids.filter(function (s) { return out(s.x); });
var g = EBS.sgrid;
if (g)
for (var c in g) {
var cx = +c.split(",")[0] * EBS_CELL;
if (cx >= x0 - EBS_CELL && cx <= x1 + EBS_CELL)
g[c] = g[c].filter(function (s) { return out(s.x); });
}
I.built = false;
I.grp = null;
}
},
function (grp, x0, z0, x1, z1, h, mat, gaps, y) {
y = y || 0;
var l = Math.hypot(x1 - x0, z1 - z0), a = Math.atan2(z1 - z0, x1 - x0), cuts = [0].concat((gaps || []).reduce(function (acc, g) { return acc.concat([g[0] - g[1] / 2, g[0] + g[1] / 2]); }, [])).concat([l]);
for (var i = 0; i < cuts.length; i += 2) {
var s = cuts[i], e = cuts[i + 1];
if (e - s < 0.05)
continue;
var m = (s + e) / 2, px = x0 + Math.cos(a) * m, pz = z0 + Math.sin(a) * m;
var w = wBox(e - s, h, 0.5, mat, px, y + h / 2, pz, grp);
w.rotation.y = -a;
ebsSolid(px, pz, e - s, 0.7, y - 2, y + h + 1, -a);
}
(gaps || []).forEach(function (g) { var gh = g[2] || Math.min(h - 0.5, 4.2), m2 = g[0], px2 = x0 + Math.cos(a) * m2, pz2 = z0 + Math.sin(a) * m2; if (gh < h) {
var lt = wBox(g[1], h - gh, 0.5, mat, px2, y + gh + (h - gh) / 2, pz2, grp);
lt.rotation.y = -a;
} });
},
function (grp, cx, cz, w, d, h, o) {
o = o || {};
var y = o.y || 0, wall = o.wall || ebsStone("ashlar"), fl = o.floor || ebsStone("tile");
ebsInFloor(grp, cx, cz, w, d, y, fl);
if (o.ceil !== false)
wBox(w, 0.4, d, o.ceilM || ebsStone("dark"), cx, y + h + 0.2, cz, grp);
var G2 = o.gaps || {};
ebsIWall(grp, cx - w / 2, cz - d / 2, cx + w / 2, cz - d / 2, h, wall, G2.n, y);
ebsIWall(grp, cx - w / 2, cz + d / 2, cx + w / 2, cz + d / 2, h, wall, G2.s, y);
ebsIWall(grp, cx - w / 2, cz - d / 2, cx - w / 2, cz + d / 2, h, wall, G2.w, y);
ebsIWall(grp, cx + w / 2, cz - d / 2, cx + w / 2, cz + d / 2, h, wall, G2.e, y);
if (o.fresco) {
var fm = ebsM("frescoM" + o.fresco, function () { var m = new THREE.MeshLambertMaterial({ map: ebsFresco(o.fresco) }); m.map.wrapS = THREE.RepeatWrapping; m.userData.noPhoto = 1; return m; }), fh = Math.min(3.2, h * 0.4);
[[cx, cz - d / 2 + 0.3, 0, w], [cx, cz + d / 2 - 0.3, Math.PI, w], [cx - w / 2 + 0.3, cz, Math.PI / 2, d], [cx + w / 2 - 0.3, cz, -Math.PI / 2, d]].forEach(function (F) {
var gap = (F[2] === Math.PI && G2.s) || (F[2] === 0 && G2.n) || (F[2] === Math.PI / 2 && G2.w) || (F[2] === -Math.PI / 2 && G2.e);
if (gap)
return;
var p = new THREE.Mesh(new THREE.PlaneGeometry(F[3] - 0.8, fh), fm.clone());
p.material.map = fm.map.clone();
p.material.map.needsUpdate = true;
p.material.map.repeat.set(Math.max(1, Math.round(F[3] / fh / 1.2)), 1);
p.position.set(F[0], y + 1.2 + fh / 2, F[1]);
p.rotation.y = F[2];
grp.add(p);
});
}
if (o.lamps !== false) {
var n = Math.max(1, Math.round(w / 14)), col = o.lamps || 0xFF9A50;
for (var i = 0; i < n; i++) {
var lx = cx - w / 2 + (i + 0.5) * w / n;
ebsLamp(grp, lx, y + h - 1.2, cz, col);
}
}
},
function (grp, x, z, ry, label) {
var g = new THREE.Group();
g.position.set(x, 0, z);
g.rotation.y = ry || 0;
grp.add(g);
wBox(3, 4.4, 0.2, ebsGlowM(0x0A0C18), 0, 2.2, 0, g);
wBox(3.6, 0.4, 0.6, ebsStone("bronze"), 0, 4.6, 0, g);
wBox(0.3, 4.4, 0.6, ebsStone("bronze"), -1.65, 2.2, 0, g);
wBox(0.3, 4.4, 0.6, ebsStone("bronze"), 1.65, 2.2, 0, g);
var P = ebsW({ x: x, z: z, rot: ry || 0 }, 0, 1.8);
ebsSpot(P[0], P[1], 2.8, label || "The way out", "go back outside", function () { ebsLeaveRoom(); }, 0);
},
function (grp, x, y, z, ry, s, mat, trim) {
var g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = ry || 0;
g.scale.setScalar(s || 1);
grp.add(g);
mat = mat || ebsStone("black");
trim = trim || ebsStone("gold");
wBox(1.6, 0.5, 1.4, mat, 0, 0.25, 0, g);
wBox(1.4, 0.5, 1.2, mat, 0, 0.75, 0.05, g);
wBox(1.5, 0.12, 1.3, ebsStone("velvet"), 0, 1.06, 0.05, g);
wBox(1.5, 2.4, 0.24, mat, 0, 2.1, -0.55, g);
[-0.72, 0.72].forEach(function (sx) { wBox(0.16, 0.7, 1.2, trim, sx, 1.35, 0.05, g); wSph(0.12, trim, sx, 1.75, 0.6, g, 8); });
wBox(1.7, 0.24, 0.34, trim, 0, 3.3, -0.55, g);
return g;
},
function (grp, x, y, z, w, d, ry, mat) {
var g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = ry || 0;
grp.add(g);
mat = mat || ebsStone("oak");
wBox(w, 0.12, d, mat, 0, 0.78, 0, g);
[[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (c) { wCyl(0.05, 0.06, 0.74, mat, c[0] * (w / 2 - 0.15), 0.37, c[1] * (d / 2 - 0.12), g, 6); });
var P = ebsW({ x: x, z: z, rot: ry || 0 }, 0, 0);
ebsSolid(P[0], P[1], w, d, y - 1, y + 0.9, ry || 0);
return g;
},
function (grp, x, y, z, ry, mat) {
var g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = ry || 0;
grp.add(g);
mat = mat || ebsStone("oak");
wBox(2.2, 0.14, 0.9, mat, 0, 0.62, 0, g);
wBox(2.1, 0.18, 0.82, ebsStone("velvet"), 0, 0.78, 0, g);
wBox(0.2, 0.5, 0.9, mat, -1.05, 0.95, 0, g);
var pl = wBox(0.5, 0.2, 0.6, ebsLam(0xD8C8A8), -0.8, 0.96, 0, g);
[[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (c) { wCyl(0.05, 0.04, 0.6, mat, c[0] * 1, 0.3, c[1] * 0.38, g, 6); });
var P = ebsW({ x: x, z: z, rot: ry || 0 }, 0, 0);
ebsSolid(P[0], P[1], 2.2, 0.9, y - 1, y + 1, ry || 0);
return g;
},
function (grp, x, y, z, s, col) {
var pts = [];
for (var i = 0; i <= 12; i++) {
var t = i / 12;
pts.push(new THREE.Vector2(0.05 + Math.sin(Math.min(1, t * 1.15) * Math.PI) * 0.28 + (t > 0.85 ? 0.04 : 0), t * 1.1));
}
var m = new THREE.Mesh(new THREE.LatheGeometry(pts, 10), ebsM("amph" + (col || 0), function () { var q = new THREE.MeshLambertMaterial({ map: ebsCanvas("amphtex" + (col || 0), 128, 64, function (x, W, H) { x.fillStyle = col ? "#" + col.toString(16).padStart(6, "0") : "#B8582A"; x.fillRect(0, 0, W, H); x.fillStyle = "#141010"; x.fillRect(0, H * 0.38, W, H * 0.3); x.fillStyle = col ? "#141010" : "#B8582A"; for (var k = 0; k < 6; k++) {
x.beginPath();
x.arc(k * W / 6 + 10, H * 0.53, 6, 0, 6.28);
x.fill();
} x.fillStyle = "#141010"; x.fillRect(0, H * 0.12, W, 3); x.fillRect(0, H * 0.8, W, 3); }) }); q.userData.noPhoto = 1; return q; }));
m.position.set(x, y, z);
m.scale.setScalar(s || 1);
grp.add(m);
return m;
},
function (grp, x, y, z, ry, mat, open) {
var g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = ry || 0;
grp.add(g);
mat = mat || ebsStone("oak");
wBox(1.2, 0.6, 0.7, mat, 0, 0.3, 0, g);
var lid = wBox(1.24, 0.12, 0.74, mat, 0, 0.66, 0, g);
if (open) {
lid.rotation.x = -1.1;
lid.position.set(0, 0.95, -0.38);
}
[-0.4, 0.4].forEach(function (bx) { wBox(0.08, 0.62, 0.72, ebsStone("bronze"), bx, 0.31, 0, g); });
if (open) {
for (var i = 0; i < 8; i++) {
var c = wCyl(0.06, 0.06, 0.02, ebsStone("gold"), -0.4 + (i % 4) * 0.26, 0.62, -0.15 + Math.floor(i / 4) * 0.3, g, 8);
}
}
var P = ebsW({ x: x, z: z, rot: ry || 0 }, 0, 0);
ebsSolid(P[0], P[1], 1.2, 0.7, y - 1, y + 0.8, ry || 0);
return g;
},
function (grp, x, y, z, w, h, ry) {
var g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = ry || 0;
grp.add(g);
var wood = ebsStone("oak"), pap = ebsLam(0xE8D8B0), R = wRand((x * 7 + z * 3) | 0);
wBox(w, h, 0.6, wood, 0, h / 2, -0.1, g);
var cols = Math.round(w / 0.5), rows = Math.round(h / 0.5);
for (var i = 0; i < cols; i++)
for (var j = 0; j < rows; j++) {
if (R() < 0.15)
continue;
for (var k = 0; k < 3; k++) {
var s = wCyl(0.05, 0.05, 0.42, pap, -w / 2 + 0.25 + i * (w / cols) + (k - 1) * 0.1, 0.25 + j * (h / rows) + (k % 2) * 0.08, 0.25, g, 6);
s.rotation.x = Math.PI / 2;
}
}
var P = ebsW({ x: x, z: z, rot: ry || 0 }, 0, 0);
ebsSolid(P[0], P[1], w, 0.8, y - 1, y + h, ry || 0);
return g;
},
function (grp, x, y, z, r, col) {
wCyl(r, r + 0.2, 0.5, ebsStone("grey"), x, y + 0.25, z, grp, 20);
wCyl(r - 0.4, r - 0.4, 0.52, ebsLam(0x1A1210), x, y + 0.27, z, grp, 20);
ebsFlame(grp, x, y + 0.5, z, r * 0.9, col);
ebsLightSrc(x, y + 1.6, z, col || 0xFF8A30, 1.6, 30);
ebsRound(x, z, r + 0.2, y - 1, y + 1.5);
var gl = wGlow(col || 0xFF8A30, r * 4, 0.35);
gl.position.set(x, y + 1.5, z);
grp.add(gl);
},
function (grp, x, y, z, ry, clothCol) {
var g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = ry || 0;
grp.add(g);
var wood = ebsStone("oak");
[-1, 1].forEach(function (s) { var u = wBox(0.12, 2.4, 0.12, wood, s * 0.9, 1.2, 0, g); u.rotation.x = -0.12; });
wBox(2, 0.14, 0.14, wood, 0, 2.3, -0.14, g);
var cl = wBox(1.7, 1, 0.03, ebsM("cloth" + (clothCol || 0), function () { var q = new THREE.MeshLambertMaterial({ map: ebsMeander("#E8C860", "#" + (clothCol || 0x6A1A3A).toString(16).padStart(6, "0")), side: THREE.DoubleSide }); q.userData.noPhoto = 1; return q; }), 0, 1.75, -0.08, g);
cl.rotation.x = -0.12;
for (var i = 0; i < 14; i++) {
var t = wBox(0.01, 0.9, 0.01, ebsLam(0xE8E0D0), -0.8 + i * 0.123, 0.85, 0.05, g);
t.rotation.x = -0.12;
wBox(0.06, 0.1, 0.06, ebsLam(0x8A6A4A), -0.8 + i * 0.123, 0.38, 0.11, g);
}
var P = ebsW({ x: x, z: z, rot: ry || 0 }, 0, 0);
ebsSolid(P[0], P[1], 2, 0.6, y - 1, y + 2.4, ry || 0);
return g;
},
function (grp, I) {
var X = I.x, Z = I.z, iron = ebsStone("iron");
ebsInRoom(grp, X, Z, 40, 36, 14, { wall: iron, floor: ebsStone("black"), ceilM: iron, gaps: { s: [[20, 3.4]] }, lamps: 0xFF3A1A });
ebsInDoorOut(grp, X, Z + 17.6, Math.PI);
for (var i = -3; i <= 3; i++) {
[-17.6, 17.6].forEach(function (z) { wBox(0.6, 14, 0.6, ebsStone("black"), X + i * 5.6, 7, Z + z, grp); });
}
for (var c = 0; c < (EBS.lite ? 6 : 14); c++) {
var R = wRand(4100 + c), cx = X - 16 + R() * 32, cz = Z - 14 + R() * 20, len = 3 + R() * 5;
for (var l = 0; l < len / 0.4; l++) {
var lk = new THREE.Mesh(new THREE.TorusGeometry(0.14, 0.04, 4, 8), iron);
lk.position.set(cx, 14 - l * 0.4, cz);
lk.rotation.y = l % 2 ? Math.PI / 2 : 0;
grp.add(lk);
}
}
wBox(24, 0.6, 8, ebsStone("black"), X, 0.3, Z - 12, grp);
wBox(18, 0.6, 5, ebsStone("black"), X, 0.9, Z - 13.5, grp);
ebsFloor(X, Z - 12, 24, 8, 0.6, { inside: true });
ebsFloor(X, Z - 13.5, 18, 5, 1.2, { inside: true });
[["Alecto", -6], ["Megaera", 0], ["Tisiphone", 6]].forEach(function (F, i) { ebsThrone(grp, X + F[1], 1.2, Z - 15, 0, 1.3, iron, ebsStone("bronze")); ebsBrazier(grp, X + F[1] + 3, 1.2, Z - 13, 0.8, X + F[1] + 3, Z - 13, 0xFF3A1A); });
var Al = ebsInFury(grp, "alecto", "Alecto", X - 6, Z - 14.2, 0);
Al.g.position.y = 1.85;
var Me = ebsInFury(grp, "megaera", "Megaera", X, Z - 14.2, 0);
Me.g.position.y = 1.85;
ebsTalk(Al, "Alecto, the Unceasing", "Alecto, one of the three Erinyes (Furies), daughters of Earth born from the blood of Ouranos (Hesiod) or of Night (Aeschylus). She never rests. In the Aeneid, Juno sends her to stir up war in Italy. Speaks coldly and precisely, never shouts, takes oaths and family wrongs very seriously. Explains that Tisiphone's seat is empty because she keeps the iron tower at Tartarus's gate. Never describes violence in detail.", "Who comes into the iron rooms with a living heart? Sit, if you dare, and tell us whether you have wronged your own.", 3.6);
ebsTalk(Me, "Megaera, the Grudging", "Megaera, the jealous one, second of the Erinyes. Snake-haired, carries a torch and a whip. Grudging, sharp, sarcastic about mortals' excuses. Knows the story of Orestes and how Athena's court in Athens tamed the Furies into the Eumenides, the Kindly Ones (Aeschylus, Eumenides). Never describes violence.", "Every mortal says he had his reasons. Orestes had reasons. Athena still made us sit and listen to a jury. We have been patient ever since.", 3.6);
ebsLook(X + 6, Z - 11, 2.4, "Tisiphone's seat", "empty", ["Tisiphone, the avenger of murder, is not here: she sits on the iron tower at the gate of Tartarus, sleepless, in a blood-red robe, guarding the entrance night and day (Aeneid 6.555-556)."], 1.2);
ebsSpot(X, Z - 6, 4, "Stand trial before the Furies", "stand on the iron mark", function () { ebsFuriesTrial(); }, 0);
var mk = new THREE.Mesh(new THREE.RingGeometry(1.4, 1.8, 24), ebsGlowM(0xFF3A1A, 0.7, true));
mk.rotation.x = -Math.PI / 2;
mk.position.set(X, 0.05, Z - 6);
grp.add(mk);
ebsLessonAt(X - 15, Z + 12, "furies");
ebsStatue(grp, X + 15, 0, Z + 12, 1, ebsStone("white"), { ry: -Math.PI / 2, holds: "sceptre" });
ebsLook(X + 13, Z + 12, 2.4, "Athena, who tamed the Furies", "Aeschylus, Eumenides (458 BC)", ["Orestes, hunted by the Furies, fled to Athens. Athena set up the first court, a jury of citizens on the Areopagus, to try him. The votes were equal, and her own vote freed him.", "She then persuaded the Furies to stay in Athens as honoured goddesses, the Eumenides, the Kindly Ones. Revenge became justice."]);
},
function (grp, I) {
var X = I.x, Z = I.z, wood = ebsStone("planks");
ebsInRoom(grp, X, Z, 28, 22, 8, { wall: ebsStone("ashlar"), floor: ebsStone("deck"), ceilM: ebsStone("oak"), gaps: { s: [[14, 3.4]] }, lamps: 0xFFB060 });
ebsInDoorOut(grp, X, Z + 10.6, Math.PI);
for (var b = -12; b <= 12; b += 4)
wBox(0.4, 0.5, 22, ebsStone("oak"), X + b, 7.6, Z, grp);
var sw = new THREE.Mesh(new THREE.PlaneGeometry(10, 12), ebsWaterMat(0x2A3A34, false, 0.95));
sw.rotation.x = -Math.PI / 2;
sw.position.set(X - 6, 0.02, Z - 4);
grp.add(sw);
ebsSolid(X - 6, Z - 4, 10, 12, -1, 1);
var bt = ebsBoat();
bt.position.set(X - 6, -0.6, Z - 4);
bt.scale.setScalar(0.8);
grp.add(bt);
for (var p = 0; p < 6; p++)
wBox(0.2, 0.08, 5, wood, X + 4 + p * 0.25, 0.05 + p * 0.08, Z - 8, grp);
for (var o = 0; o < 8; o++) {
var oa = wCyl(0.05, 0.05, 5, ebsStone("oak"), X + 12.6, 2.6, Z - 8 + o * 0.8, grp, 5);
oa.rotation.z = 0.1;
wBox(0.08, 0.9, 0.3, ebsStone("oak"), X + 12.6, 0.5, Z - 8 + o * 0.8, grp);
}
ebsSolid(X + 12.6, Z - 5, 1, 7, -1, 5);
var nm = ebsM("net", function () { var t = ebsCanvas("nettex", 64, 64, function (x, W, H) { x.clearRect(0, 0, W, H); x.strokeStyle = "#B8A880"; x.lineWidth = 1.5; for (var i = 0; i < W; i += 8) {
x.beginPath();
x.moveTo(i, 0);
x.lineTo(i, H);
x.stroke();
x.beginPath();
x.moveTo(0, i);
x.lineTo(W, i);
x.stroke();
} }); t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(4, 3); var m = new THREE.MeshLambertMaterial({ map: t, transparent: true, side: THREE.DoubleSide, alphaTest: 0.3 }); m.userData.noPhoto = 1; return m; });
var nt = new THREE.Mesh(new THREE.PlaneGeometry(8, 4), nm);
nt.position.set(X + 4, 4, Z - 10.7);
grp.add(nt);
var bx = X + 6, bz = Z + 2;
wCyl(1.6, 1.2, 1, ebsStone("bronze"), bx, 0.5, bz, grp, 20);
var coins = wCyl(1.5, 1.5, 0.1, ebsS("b:gold", 0xC8C8C8, 0.5, { shine: 90 }), bx, 1.02, bz, grp, 20);
ebsRound(bx, bz, 1.6, -1, 1.2);
for (var k = 0; k < 20; k++) {
var R = wRand(4200 + k);
var cn = wCyl(0.08, 0.08, 0.02, ebsStone("silver"), bx + (R() - 0.5) * 2.4, 1.1 + R() * 0.3, bz + (R() - 0.5) * 2.4, grp, 8);
cn.rotation.x = R() * 0.6;
}
ebsLook(bx, bz + 2.4, 2.6, "The obols of the dead", "Charon's fee", ["An obol was a small silver coin: six made a drachma, a day's pay for a craftsman.", "Greeks laid one with the dead, often in the mouth, so the soul could pay the ferryman. Archaeologists have found coins in the mouths of skulls in graves all over the Greek world.", "Those buried without one, or not buried at all, had to wait on the bank for a hundred years (Virgil)."]);
wBox(3, 0.4, 1.6, ebsLam(0x6A6A3A), X - 10, 0.2, Z + 8, grp);
var ck = wBox(2.6, 0.1, 1.4, ebsLam(0x3A3A3A), X - 10, 0.45, Z + 8, grp);
ebsSolid(X - 10, Z + 8, 3, 1.6, -1, 0.5);
ebsLook(X - 10, Z + 6, 2.4, "Charon's bed", "a heap of rushes", ["Charon is old, but Virgil says 'a god's old age is green and hardy'. He takes the living across only very rarely: Heracles, Theseus, Orpheus, Aeneas (with the golden bough), Psyche (with a coin in her mouth), and Odysseus never needed him."]);
ebsLessonAt(X + 10, Z + 8, "obol");
},
function (grp, I) {
var X = I.x, Z = I.z, cave = ebsStone("cave");
ebsInRoom(grp, X, Z, 34, 30, 12, { wall: cave, floor: ebsStone("earth"), ceilM: cave, gaps: { s: [[17, 4]] }, lamps: false });
ebsInDoorOut(grp, X, Z + 14.6, Math.PI, "The mouth of the den");
for (var r = 0; r < (EBS.lite ? 8 : 18); r++) {
var R = wRand(4300 + r), a = R() * 6.28, rx = X + Math.cos(a) * (13 + R() * 3), rz = Z + Math.sin(a) * (11 + R() * 3);
if (rz > Z + 11)
continue;
ebsRock(grp, rx, -1, rz, 2 + R() * 3, 4300 + r, cave);
}
ebsBrazier(grp, X - 10, 0, Z + 8, 1, X - 10, Z + 8, 0xFF6A2A);
ebsBrazier(grp, X + 10, 0, Z + 8, 1, X + 10, Z + 8, 0xFF6A2A);
for (var f = 0; f < 6; f++) {
var R2 = wRand(4400 + f);
var fl = wSph(1.4, ebsLam([0xE8E0D0, 0x8A7A6A, 0x3A3028][f % 3]), X - 4 + R2() * 8, 0.2, Z - 8 + R2() * 4, grp, 8);
fl.scale.set(1, 0.25, 0.8);
}
for (var b = 0; b < (EBS.lite ? 10 : 26); b++) {
var R3 = wRand(4500 + b);
var bn = wCyl(0.08, 0.12, 0.9 + R3() * 0.6, ebsLam(0xD8D0B8), X - 12 + R3() * 24, 0.1, Z - 10 + R3() * 20, grp, 5);
bn.rotation.z = Math.PI / 2;
bn.rotation.y = R3() * 3;
}
var Cb = ebsCerberus();
Cb.position.set(X, 0, Z - 7);
Cb.scale.setScalar(0.85);
Cb.userData.keep = 1;
grp.add(Cb);
EBS.denCerb = Cb;
for (var l = 0; l < 30; l++) {
var lk = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.08, 5, 10), ebsStone("iron"));
lk.position.set(X + 8 + Math.cos(l * 0.5) * (1.4 + l * 0.05), 0.2 + l * 0.02, Z - 2 + Math.sin(l * 0.5) * (1.4 + l * 0.05));
lk.rotation.set(Math.PI / 2, 0, l % 2 ? Math.PI / 2 : 0);
grp.add(lk);
}
ebsLook(X + 8, Z, 2.6, "The great chain", "Heracles's twelfth labour", ["King Eurystheus set Heracles his last labour: bring up Cerberus. Hades agreed, if he could master the dog without weapons. Heracles gripped him round the throat, though the serpent tail bit him, and dragged him up through the cave at Taenarum (Apollodorus 2.5.12).", "When Eurystheus saw the dog, he hid in a bronze jar. Heracles took Cerberus back down again.", "Ovid says where the foam from the dog's jaws fell on the earth, the poisonous plant aconite grew."]);
ebsSpot(X, Z - 1, 4, "Cerberus", "wrestle him bare-handed (the twelfth labour)", function () { ebsLabour(); }, 0);
ebsLessonAt(X - 12, Z + 10, "heracles");
},
function (grp, I) {
var X = I.x, Z = I.z;
ebsInRoom(grp, X, Z, 26, 22, 10, { wall: ebsStone("dark"), floor: ebsStone("tile"), ceilM: ebsStone("oak"), gaps: { s: [[13, 3.4]] }, fresco: "black", lamps: 0xFFB060 });
ebsInDoorOut(grp, X, Z + 10.6, Math.PI);
for (var k = 0; k < 7; k++) {
var kg = new THREE.Group();
kg.position.set(X - 6 + k * 2, 4.6, Z - 10.6);
grp.add(kg);
var br = ebsStone("bronze");
wCyl(0.06, 0.06, 1.6, br, 0, -0.6, 0, kg, 6);
var bow = new THREE.Mesh(new THREE.TorusGeometry(0.22, 0.05, 5, 12), br);
kg.add(bow);
wBox(0.3, 0.08, 0.06, br, 0.12, -1.35, 0, kg);
wBox(0.08, 0.2, 0.06, br, 0.24, -1.3, 0, kg);
}
ebsLook(X, Z - 8.6, 3, "The keys of Hades", "in Aeacus's keeping", ["Aeacus, king of Aegina and son of Zeus, was so just that when Greece was dying in a drought, his prayer brought the rain. After death he became a judge of the dead.", "Later writers make him the gatekeeper who holds the keys. In Aristophanes' comedy The Frogs (405 BC), the god Dionysus, dressed up as Heracles, knocks on his door, and Aeacus, furious that 'Heracles' stole Cerberus, threatens him with every monster in Hades."]);
ebsTable(grp, X + 6, 0, Z - 4, 3, 1.4, 0);
var sc = new THREE.Group();
sc.position.set(X + 6, 0.84, Z - 4);
grp.add(sc);
wCyl(0.04, 0.04, 1, ebsStone("bronze"), 0, 0.5, 0, sc, 5);
wBox(1.4, 0.04, 0.04, ebsStone("bronze"), 0, 1, 0, sc);
[-0.68, 0.68].forEach(function (px) { wCyl(0.2, 0.16, 0.04, ebsStone("bronze"), px, 0.6, 0, sc, 10); });
for (var bn = 0; bn < 3; bn++) {
wBox(6, 0.5, 0.8, ebsStone("oak"), X - 6, 0.45, Z - 2 + bn * 3.4, grp);
ebsSolid(X - 6, Z - 2 + bn * 3.4, 6, 0.8, -1, 0.7);
}
for (var s = 0; s < 5; s++) {
var Sh = ebsInPerson(grp, "wait" + s, X - 8 + s * 1.2, Z - 1.4 + (s % 3) * 3.4, { topKind: "robe", top: 0x7A8A9A, bottom: 0x7A8A9A }, Math.PI * 0.5, 0xA8C0E8);
Sh.g.position.y = 0.2;
}
ebsAmphora(grp, X + 11, 0, Z - 9, 1.2);
ebsAmphora(grp, X + 11.8, 0, Z - 8, 1);
ebsChest(grp, X + 10, 0, Z + 6, Math.PI / 2);
},
function (grp, I) {
var X = I.x, Z = I.z, blk = ebsStone("black"), gold = ebsStone("gold");
ebsInRoom(grp, X, Z, 44, 56, 18, { wall: ebsStone("dark"), floor: ebsStone("black"), ceilM: ebsStone("dark"), gaps: { s: [[22, 4]] }, fresco: "gold", lamps: 0xFFC080 });
ebsInDoorOut(grp, X, Z + 27.6, Math.PI);
for (var c = 0; c < 6; c++) {
[-14, 14].forEach(function (cx) { ebsColumn(grp, X + cx, 0, Z - 20 + c * 8, 17, 0.9, blk, gold); ebsRound(X + cx, Z - 20 + c * 8, 0.9, -1, 18); });
}
wBox(20, 1.2, 8, blk, X, 0.6, Z - 22, grp);
ebsFloor(X, Z - 22, 20, 8, 1.2, { inside: true });
wBox(16, 0.6, 2, blk, X, 0.3, Z - 17, grp);
ebsThrone(grp, X, 1.2, Z - 24, 0, 1.6, blk, gold);
ebsThrone(grp, X - 6, 1.2, Z - 23, 0.2, 1.4, blk, ebsStone("silver"));
ebsThrone(grp, X + 6, 1.2, Z - 23, -0.2, 1.4, blk, ebsStone("bronze"));
var Mn = ebsInPerson(grp, "minos", X, Z - 23.4, { beard: "full", hair: 0x8A8A8A, topKind: "robe", top: 0xE8E0D0, bottom: 0xE8E0D0, layer: "longcoat", layerColor: 0x4A1A2A, hat: "crown", hatColor: 0xD8B04A }, 0, 0xF0E8D0);
Mn.g.position.y = 1.9;
wCyl(0.04, 0.05, 2, gold, 0.4, 1, 0.2, Mn.g, 6);
wSph(0.1, gold, 0.4, 2.05, 0.2, Mn.g, 8);
var Rh = ebsInPerson(grp, "rhadam", X - 6, Z - 22.4, { beard: "long", hair: 0xD8D8D8, topKind: "robe", top: 0xD8D0C0, bottom: 0xD8D0C0, layer: "longcoat", layerColor: 0x1A2A4A, hat: "crown", hatColor: 0xC8C8D8 }, 0.2, 0xE8E8F0);
Rh.g.position.y = 1.9;
ebsTalk(Mn, "Minos", "Minos, king of Crete, son of Zeus and Europa, the lawgiver who talked with Zeus every nine years. Homer saw him in the underworld 'holding a golden sceptre, giving judgement to the dead, seated, while they asked the king for justice' (Odyssey 11.568-571). Plato says he decides when the other two are in doubt. Stern, fair, unhurried; invites the visitor to stand on the bronze disc and be judged.", "Every soul stands where you stand. Speak truly: the dead cannot lie to us, and it would be unwise for the living to try.", 4);
ebsTalk(Rh, "Rhadamanthus", "Rhadamanthus, brother of Minos, so just that he was made a judge of the dead; Homer puts him in the Elysian plain; Virgil makes him the judge of Tartarus who forces the guilty to confess (Aeneid 6.566-569). Plato: he judges souls from Asia, Aeacus those from Europe, Minos settles doubts. Severe but kindly to the honest.", "Hm. Living. You will want to know how it is done. We look at the soul, stripped bare of its fine clothes and name, and see the marks on it.", 4);
ebsLook(X + 6, Z - 20, 2.6, "Aeacus's seat", "empty", ["Aeacus judges the souls who come from Europe (Plato, Gorgias 524a). Right now he is at the Gatehouse by the great gate, where he keeps the keys."], 1.2);
var disc = wCyl(2.2, 2.2, 0.12, ebsStone("bronze"), X, 0.06, Z - 10, grp, 32);
var ring = new THREE.Mesh(new THREE.RingGeometry(2.3, 2.6, 32), ebsGlowM(0xFFD070, 0.5, true));
ring.rotation.x = -Math.PI / 2;
ring.position.set(X, 0.14, Z - 10);
grp.add(ring);
ebsSpot(X, Z - 10, 3, "The bronze disc", "stand and be judged", function () { ebsJudge(); }, 0);
[[-16, "The left-hand door", "Down, to Tartarus", 0x5A1A0A], [16, "The right-hand door", "Up, to Elysium", 0xF0D890]].forEach(function (D) {
var dx = X + D[0];
wBox(4, 7, 0.3, ebsGlowM(D[3], 0.8), dx, 3.5, Z - 27.6, grp);
wBox(4.6, 0.5, 0.6, gold, dx, 7.2, Z - 27.6, grp);
ebsSignAt(D[2], dx, 8.2, Z - 27.2, grp);
ebsLook(dx, Z - 25.6, 2.6, D[1], D[2], ["Plato, Republic book 10 (the Myth of Er): the judges 'sat between the openings; when they had given judgement, they told the just to go to the right and up through the sky, with signs of their judgement fastened on in front; the unjust, to the left and downward, wearing the signs of all they had done, behind'."]);
});
ebsLessonAt(X - 18, Z + 22, "judges");
var sc = new THREE.Group();
sc.position.set(X + 18, 0, Z + 20);
grp.add(sc);
wCyl(0.14, 0.2, 5, gold, 0, 2.5, 0, sc, 8);
wBox(4, 0.14, 0.14, gold, 0, 5, 0, sc);
[-1.9, 1.9].forEach(function (px) { for (var k = 0; k < 3; k++) {
var ch = wCyl(0.01, 0.01, 2, gold, px + (k - 1) * 0.3, 4, 0, sc, 3);
} wCyl(0.7, 0.5, 0.1, gold, px, 3, 0, sc, 14); });
ebsRound(X + 18, Z + 20, 1, -1, 5);
},
function (grp, I) {
var X = I.x, Z = I.z, blk = ebsStone("black"), gold = ebsStone("gold"), dk = ebsStone("dark");
ebsInRoom(grp, X, Z, 60, 44, 22, { wall: blk, floor: ebsStone("black"), ceilM: dk, gaps: { s: [[30, 5]], w: [[22, 4.4]], e: [[22, 4.4]], n: [[30, 5]] }, fresco: "black", lamps: 0x9AB0FF });
ebsInDoorOut(grp, X, Z + 21.6, Math.PI, "The palace doors");
[[-8, -8], [8, -8], [-8, 8], [8, 8]].forEach(function (c) { ebsColumn(grp, X + c[0], 0, Z + c[1], 21, 1.2, blk, gold); ebsRound(X + c[0], Z + c[1], 1.2, -1, 22); });
ebsHearth(grp, X, 0, Z, 3.4, 0x8AB0FF);
wBox(18, 1.4, 8, blk, X, 0.7, Z - 17, grp);
ebsFloor(X, Z - 17, 18, 8, 1.4, { inside: true });
ebsThrone(grp, X - 3, 1.4, Z - 19, 0, 2, blk, gold);
ebsThrone(grp, X + 3, 1.4, Z - 19, 0, 1.8, blk, ebsStone("silver"));
var Hd = ebsInPerson(grp, "hades", X - 3, Z - 18.6, { beard: "full", hair: 0x0A0A0A, skin: 0xC8B0A0, topKind: "robe", top: 0x0A0A12, bottom: 0x0A0A12, layer: "longcoat", layerColor: 0x1A0A1A, back: "cloak", hat: "crown", hatColor: 0x2A2A2A }, 0);
Hd.g.position.y = 2.2;
Hd.g.scale.setScalar(1.25);
wCyl(0.05, 0.06, 2.4, gold, 0.45, 1.2, 0.2, Hd.g, 6);
var bid = wBox(0.5, 0.06, 0.06, gold, 0.45, 2.4, 0.2, Hd.g);
ebsTalk(Hd, "Hades, the Unseen King", "Hades (Aides, 'the unseen'), son of Kronos and Rhea, eldest brother of Zeus and Poseidon; when they drew lots for the world he won the misty dark. Also called Plouton, 'the rich one', because the wealth of the earth (grain, metals) comes from below. Stern, solemn, just, rarely leaves his realm, keeps his word, not evil. Proud of his queen Persephone; remembers Orpheus's song with emotion; does not like people trying to leave. Refers the visitor to the treasury, the Helm of Darkness, and the Hall of Orpheus.", "Few come into my hall with breath in them. Heracles, who took my dog. Orpheus, who made me weep. Theseus, who sits in my chairs still. Which are you?", 4.4);
ebsLook(X + 3, Z - 16, 2.8, "Persephone's throne", "empty", ["The queen is in her rooms, through the eastern door of the forecourt (outside, to the left of the palace steps). She spends part of each year here, and part above with her mother Demeter."], 1.4);
ebsInRoom(grp, X - 50, Z, 40, 30, 12, { wall: dk, floor: ebsStone("cotto"), ceilM: dk, gaps: { e: [[15, 4.4]], n: [[20, 3.4]] }, fresco: "red", lamps: 0xFFB060 });
for (var k = 0; k < 10; k++) {
var a = k / 10 * Math.PI * 2, kx = X - 50 + Math.cos(a) * 11, kz = Z + Math.sin(a) * 8;
ebsKline(grp, kx, 0, kz, -a + Math.PI / 2);
ebsTable(grp, X - 50 + Math.cos(a) * 8.6, 0, Z + Math.sin(a) * 6, 1, 0.6, -a);
var bw = wSph(0.3, ebsStone("bronze"), X - 50 + Math.cos(a) * 8.6, 0.9, Z + Math.sin(a) * 6, grp, 8);
bw.scale.y = 0.4;
for (var p = 0; p < 3; p++)
wSph(0.09, ebsLam(0xA8181A), X - 50 + Math.cos(a) * 8.6 + (p - 1) * 0.1, 1.0, Z + Math.sin(a) * 6, grp, 6);
}
for (var am = 0; am < 6; am++)
ebsAmphora(grp, X - 68, 0, Z - 12 + am * 4.6, 1.3);
ebsLook(X - 50, Z, 4, "The banquet of the dead", "eat nothing here", ["The tables are laid, but the living must not eat: whoever tastes the food of the dead must stay. Persephone ate a few pomegranate seeds, and so she must come back every year.", "In the Orphic hymns and in Plato, the blessed dead are pictured at an everlasting feast; Plato jokes that some people think the best reward for virtue is 'to be drunk for ever'."]);
ebsInRoom(grp, X - 50, Z - 27, 20, 24, 10, { wall: blk, floor: ebsStone("slate"), ceilM: dk, gaps: { s: [[10, 3.4]] }, lamps: 0x8A9AFF });
ebsThrone(grp, X - 54, 0, Z - 33, 0.3, 1.2, ebsStone("grey"), ebsStone("grey"));
ebsThrone(grp, X - 46, 0, Z - 33, -0.3, 1.2, ebsStone("grey"), ebsStone("grey"));
for (var sn = 0; sn < 2; sn++) {
var sx = sn ? X - 46 : X - 54;
ebsSnake(grp, [[sx - 0.9, 0.6, Z - 32.6], [sx - 0.4, 1.4, Z - 32.2], [sx + 0.4, 1.0, Z - 32.2], [sx + 0.9, 0.6, Z - 32.6]], 0.07, ebsScales(0x2A3A2A), false);
}
var Th = ebsInPerson(grp, "theseus", X - 54, Z - 32.6, { beard: "short", hair: 0xC89A5A, layer: "armor", layerColor: 0xB8883A, topKind: "robe", top: 0x2A3A6A, bottom: 0x2A3A6A }, 0.3);
Th.g.position.y = 0.4;
var Pi = ebsInPerson(grp, "pirithous", X - 46, Z - 32.6, { beard: "full", hair: 0x2A1A10, layer: "armor", layerColor: 0x8A6A3A, topKind: "robe", top: 0x6A2A2A, bottom: 0x6A2A2A }, -0.3);
Pi.g.position.y = 0.4;
ebsTalk(Th, "Theseus", "Theseus of Athens, slayer of the Minotaur, who came down with his friend Pirithous to carry off Persephone as Pirithous's bride. Hades welcomed them politely and offered them seats: the Chairs of Forgetfulness, which held them fast, coiled with serpents (Apollodorus, Epitome 1.24). Heracles, coming for Cerberus, pulled Theseus free; Pirithous could not be freed. Rueful, honest about his foolishness, loyal to his friend.", "Do not sit down. Whatever he offers, do not sit. We sat, and forgot why we came, and the chairs grew into us.", 3.2);
ebsTalk(Pi, "Pirithous", "Pirithous, king of the Lapiths, best friend of Theseus; it was his idea to steal Persephone. Still held fast in the chair; Heracles tried to free him and the earth shook, so he stayed (Apollodorus). Wry, brave, has accepted it; jokes darkly about being the guest who outstayed his welcome.", "They say a good guest knows when to leave. I am not a good guest.", 3.2);
ebsSpot(X - 50, Z - 23, 3, "An empty chair beside them", "sit down", function () { worldBanner("You start to sit, and Theseus shouts 'No!' You straighten up again. The seat is cold and you have already half forgotten why you wanted it.", 4); }, 0);
ebsInRoom(grp, X + 47, Z, 34, 24, 10, { wall: dk, floor: ebsStone("black"), ceilM: dk, gaps: { w: [[12, 4.4]] }, lamps: 0xFFD080 });
for (var t = 0; t < 8; t++) {
var R = wRand(4600 + t);
ebsChest(grp, X + 36 + (t % 4) * 6.6, 0, Z - 9.4 + Math.floor(t / 4) * 18.8, t < 4 ? 0 : Math.PI, t % 2 ? ebsStone("oak") : ebsStone("bronze"), t % 3 === 0);
}
for (var gp = 0; gp < (EBS.lite ? 3 : 6); gp++) {
var R2 = wRand(4700 + gp), hx = X + 38 + R2() * 18, hz = Z - 5 + R2() * 10;
var hp = wCone(1 + R2() * 0.6, 0.9, ebsS("b:gold", 0xE8C050, 0.5, { shine: 110 }), hx, 0.45, hz, grp, 10);
ebsRound(hx, hz, 1.2, -1, 1);
for (var g2 = 0; g2 < 4; g2++)
wSph(0.12, ebsLam([0xC81A3A, 0x1A8A4A, 0x2A4AC8, 0xE8E8F8][g2]), hx + (g2 - 1.5) * 0.3, 0.9, hz + 0.3, grp, 6);
}
var ped = wCyl(0.8, 1, 1.4, blk, X + 60, 0.7, Z, grp, 12);
ebsRound(X + 60, Z, 1, -1, 1.6);
var hel = new THREE.Group();
hel.position.set(X + 60, 1.4, Z);
grp.add(hel);
var hm = ebsS("b:iron", 0x1A1A22, 1, { shine: 60 });
var dome = wSph(0.5, hm, 0, 0.5, 0, hel, 14);
dome.scale.set(1, 1.15, 1.1);
wBox(0.08, 0.5, 0.9, hm, 0, 1.1, 0, hel);
wBox(0.7, 0.5, 0.12, hm, 0, 0.25, 0.42, hel);
var hg = wGlow(0x2A1A4A, 3, 0.6);
hg.position.set(X + 60, 2, Z);
grp.add(hg);
EBS.fx.push({ k: "pulse", m: hg, ph: 1 });
ebsSpot(X + 57.6, Z, 3, "The Helm of Darkness", "look at it", function () { worldCard(worldFacts("The Helm of Darkness", "Kunee Aidos, the cap of Hades", [], ["The Cyclopes made three gifts when Zeus freed them: the thunderbolt for Zeus, the trident for Poseidon, and for Hades a helmet that makes its wearer invisible (Apollodorus 1.2.1).", "Athena wore it in the Iliad (5.845) so that Ares could not see her; Perseus borrowed it to escape the Gorgons.", "You lift it a hand's breadth. Your own fingers fade from sight. You set it down again quickly: it is not a thing to take."])); }, 0);
ebsLook(X + 40, Z, 3, "The riches of the earth", "Plouton, the rich one", ["Hades was also called Plouton (Pluto to the Romans), 'wealth', because the grain that grows from the soil and the metals in the ground come from below.", "In paintings he often holds a cornucopia, the horn of plenty."]);
ebsInRoom(grp, X, Z - 44, 40, 44, 16, { wall: blk, floor: ebsStone("white"), ceilM: dk, gaps: { s: [[20, 5]] }, fresco: "blue", lamps: 0xC8D8FF });
for (var row = 0; row < 5; row++) {
wBox(32 - row * 2, 0.6, 1.6, ebsStone("white"), X, 0.3 + row * 0.6, Z - 34 - row * 1.8, grp);
ebsFloor(X, Z - 34 - row * 1.8, 32 - row * 2, 1.6, 0.6 + row * 0.6, { inside: true });
}
var st = new THREE.Group();
st.position.set(X, 0, Z - 56);
grp.add(st);
wCyl(1.6, 1.8, 0.6, ebsStone("white"), 0, 0.3, 0, st, 16);
ebsRound(X, Z - 56, 1.8, -1, 0.6);
var ly = new THREE.Group();
ly.position.set(0, 1.2, 0);
st.add(ly);
wBox(0.8, 0.2, 0.1, gold, 0, 1.3, 0, ly);
[-0.4, 0.4].forEach(function (lx) { var a2 = wBox(0.1, 1.4, 0.1, gold, lx, 0.6, 0, ly); a2.rotation.z = lx > 0 ? -0.2 : 0.2; });
var sb = wSph(0.4, ebsStone("oak"), 0, 0, 0, ly, 10);
sb.scale.set(1, 0.5, 0.5);
for (var s2 = 0; s2 < 7; s2++)
wCyl(0.006, 0.006, 1.2, ebsLam(0xF0E8D0), -0.24 + s2 * 0.08, 0.65, 0.06, ly, 3);
ebsSpot(X, Z - 53, 3, "Orpheus's lyre", "play it", function () { ebsLyrePlay(false); }, 0);
ebsLook(X - 14, Z - 60, 3, "What happened when he sang", "Ovid, Metamorphoses 10.40-48", ["\"As he sang, the bloodless spirits wept; Tantalus stopped reaching for the water that ran away from him; Ixion's wheel stood still; the vultures stopped tearing Tityos's liver; the Danaids left their urns; and you, Sisyphus, sat down on your stone.\"", "\"Then for the first time, they say, the cheeks of the Furies were wet with tears, conquered by the song.\""]);
ebsLessonAt(X + 14, Z - 60, "orpheus");
for (var sh = 0; sh < (EBS.lite ? 4 : 10); sh++) {
var R3 = wRand(4800 + sh);
var Sd = ebsInPerson(grp, "listen" + sh, X - 12 + R3() * 24, Z - 36 - R3() * 6, { topKind: "robe", top: 0x8A9AB8, bottom: 0x8A9AB8 }, Math.PI, 0xB8C8F0);
Sd.g.position.y = 0.6 + Math.floor(R3() * 3) * 0.6;
}
},
function (grp, I) {
var X = I.x, Z = I.z;
ebsInRoom(grp, X, Z, 36, 30, 12, { wall: ebsStone("stucco"), floor: ebsStone("terracotta"), ceilM: ebsStone("dark"), gaps: { s: [[18, 3.4]] }, fresco: "green", lamps: 0xFFC8A0 });
ebsInDoorOut(grp, X, Z + 14.6, Math.PI);
var Pe = ebsInPerson(grp, "persephone", X, Z - 8, { sex: "f", hair: 0x4A2A1A, hairStyle: "long", skin: 0xE8C8B0, topKind: "dress", top: 0xE8E0F0, bottom: 0xE8E0F0, layer: "longcoat", layerColor: 0x4A1A3A, hat: "tiara", hatColor: 0xD8B04A }, 0);
var tr = wBox(0.08, 0.4, 0.08, ebsStone("gold"), 0.38, 1.2, 0.2, Pe.g);
var fr = wSph(0.09, ebsLam(0xB81A2A), 0.38, 1.42, 0.2, Pe.g, 8);
ebsTalk(Pe, "Persephone, queen of the dead", "Persephone (Kore, 'the maiden'), daughter of Demeter and Zeus, queen of the underworld. Hades carried her off while she picked a narcissus in a meadow; her mother searched the earth with torches and let nothing grow until Zeus made Hades let her go. But she had eaten pomegranate seeds, so she spends part of each year below (Homeric Hymn to Demeter). She is not a victim here: she is a respected, compassionate and powerful queen; she let Eurydice go, helped Heracles, gave Psyche a box of beauty. Gracious, warm with a touch of iron; misses sunlight and her mother; speaks of spring coming when she goes up.", "You smell of sunlight. It has been a long winter for my mother, I think. Sit with me a little, and tell me what is flowering up there.", 3.6);
ebsLoom(grp, X - 12, 0, Z - 11, 0.3, 0x2A1A4A);
var bed = ebsKline(grp, X + 11, 0, Z - 10, 0);
bed.scale.set(1.8, 1, 2.2);
ebsSolid(X + 11, Z - 10, 4, 2, -1, 1);
for (var c = 0; c < 4; c++) {
var cx = X + 11 + (c % 2 ? 2.2 : -2.2), cz = Z - 10 + (c < 2 ? -1.4 : 1.4);
wCyl(0.06, 0.06, 3.4, ebsStone("gold"), cx, 1.7, cz, grp, 6);
}
wBox(4.6, 0.1, 3, ebsLam(0x4A1A3A), X + 11, 3.4, Z - 10, grp);
var fc = [0xF0E870, 0x8A4AC8, 0xE8A0E0, 0x4A6AE8, 0xE83A4A, 0xF8F8F0];
for (var k = 0; k < 6; k++) {
var kx = X - 14 + k * 2.6, kz = Z + 8;
wBox(2, 0.8, 1.2, ebsStone("oak"), kx, 0.4, kz, grp);
ebsSolid(kx, kz, 2, 1.2, -1, 0.9);
for (var f = 0; f < 10; f++) {
var R = wRand(4900 + k * 10 + f);
wSph(0.12, ebsLam(fc[k]), kx - 0.8 + R() * 1.6, 0.95 + R() * 0.2, kz - 0.4 + R() * 0.8, grp, 6);
wCyl(0.01, 0.01, 0.4, ebsLam(0x3A6A2A), kx - 0.8 + R() * 1.6, 0.9, kz - 0.4 + R() * 0.8, grp, 3);
}
}
ebsLook(X - 8, Z + 6.4, 3, "The flowers of the meadow", "Homeric Hymn to Demeter 1-20", ["She was playing with the daughters of Ocean, gathering roses, crocuses, violets, irises and hyacinths, 'and the narcissus, which Earth made to grow at the will of Zeus as a snare for the bloom-like girl'. As she reached for it, the earth opened and Hades came up in his golden chariot."]);
ebsTable(grp, X + 4, 0, Z - 2, 1.6, 1, 0);
var bw = wSph(0.4, ebsStone("silver"), X + 4, 0.92, Z - 2, grp, 10);
bw.scale.y = 0.4;
for (var p = 0; p < 14; p++) {
var R2 = wRand(5000 + p);
wSph(0.05, ebsS("b:velvet", 0xC8102A, 0.3, { shine: 120 }), X + 4 + (R2() - 0.5) * 0.5, 1.02, Z - 2 + (R2() - 0.5) * 0.5, grp, 5);
}
ebsSpot(X + 4, Z, 2.4, "The pomegranate seeds", "count them", function () { worldCard(worldFacts("The pomegranate seeds", "Why winter comes", [], ["The Hymn to Demeter says Hades 'secretly gave her a pomegranate seed to eat, sweet as honey', so that she would not stay for ever above with her mother.", "So she spends a third of the year (in the Hymn) below, and the rest above. Ovid says she ate seven seeds, and spends half the year with each.", "When she goes down, Demeter grieves and nothing grows: winter. When she comes back up, the earth flowers: spring."])); ebsLesson("seasons"); }, 0);
var sh = new THREE.Group();
sh.position.set(X + 15, 0, Z + 4);
grp.add(sh);
wBox(1.2, 1, 1.2, ebsStone("white"), 0, 0.5, 0, sh);
for (var w = 0; w < 20; w++) {
var R3 = wRand(5100 + w);
var st = wCyl(0.01, 0.01, 1, ebsLam(0xD8B84A), (R3() - 0.5) * 0.4, 1.5, (R3() - 0.5) * 0.4, sh, 3);
st.rotation.z = (R3() - 0.5) * 0.3;
wBox(0.04, 0.14, 0.04, ebsLam(0xE8C860), st.position.x, 2.02, st.position.z, sh);
}
ebsSolid(X + 15, Z + 4, 1.2, 1.2, -1, 1);
ebsLook(X + 15, Z + 6, 2.4, "Demeter's wheat", "a shrine to her mother", ["Demeter, goddess of the grain. At Eleusis near Athens the Mysteries were held in her and Persephone's honour for nearly two thousand years; those who were initiated believed they would have a happier lot after death."]);
var ow = new THREE.Group();
ow.position.set(X - 15, 2.6, Z + 4);
ow.userData.keep = 1;
grp.add(ow);
wCyl(0.05, 0.05, 2.6, ebsStone("oak"), 0, -1.3, 0, ow, 5);
wBox(0.8, 0.08, 0.08, ebsStone("oak"), 0, 0, 0, ow);
var ob = wSph(0.24, ebsLam(0x8A6A4A), 0, 0.3, 0, ow, 10);
ob.scale.set(0.9, 1.2, 0.9);
wSph(0.18, ebsLam(0x8A6A4A), 0, 0.62, 0.02, ow, 10);
[-0.07, 0.07].forEach(function (e) { wSph(0.05, ebsLam(0xF0C020), e, 0.66, 0.16, ow, 6); });
EBS.fx.push({ k: "owl", m: ow, ph: 0 });
ebsLook(X - 15, Z + 5.4, 2.4, "Ascalaphus the owl", "the gardener who told", ["Ascalaphus, Hades' gardener, saw Persephone eat the pomegranate seeds and told. She (or Demeter) turned him into a screech owl, a bird of ill omen (Ovid, Metamorphoses 5.533-550)."]);
ebsChest(grp, X + 15, 0, Z - 3, -Math.PI / 2, ebsStone("gold"));
ebsLook(X + 13.6, Z - 3, 2.2, "A little golden chest", "do not open", ["Aphrodite once gave baby Adonis to Persephone in a chest to keep, and Persephone loved him and would not give him back; Zeus decided he should spend part of the year with each (Apollodorus 3.14.4).", "Psyche was sent down to ask Persephone for a box of her beauty for Venus; she opened it on the way back and fell into a deathly sleep (Apuleius)."]);
},
function (grp, I) {
var X = I.x, Z = I.z, blk = ebsStone("black");
ebsInRoom(grp, X, Z, 30, 46, 14, { wall: blk, floor: ebsStone("slate"), ceilM: blk, gaps: { s: [[15, 3.4]] }, lamps: 0x9AB0FF });
ebsInDoorOut(grp, X, Z + 22.6, Math.PI);
var pl = new THREE.Mesh(new THREE.PlaneGeometry(8, 32), ebsWaterMat(0x050A14, false, 0.98));
pl.rotation.x = -Math.PI / 2;
pl.position.set(X, 0.1, Z - 2);
grp.add(pl);
[-4.3, 4.3].forEach(function (sx) { wBox(0.6, 0.5, 33, ebsStone("white"), X + sx, 0.25, Z - 2, grp); });
ebsSolid(X, Z - 2, 9, 33, -1, 0.6);
for (var i = 0; i < 6; i++) {
[-12, 12].forEach(function (sx) { ebsColumn(grp, X + sx, 0, Z - 18 + i * 6.4, 13, 0.6, blk, ebsStone("silver")); ebsRound(X + sx, Z - 18 + i * 6.4, 0.6, -1, 14); });
}
for (var s = 0; s < (EBS.lite ? 6 : 14); s++) {
var R = wRand(5200 + s);
var Sd = ebsInPerson(grp, "hshade" + s, X + (R() < 0.5 ? -7 : 7) + (R() - 0.5) * 3, Z - 16 + R() * 30, { sex: R() < 0.6 ? "f" : "m", topKind: "robe", top: 0x8A9AB8, bottom: 0x8A9AB8 }, R() * 6, 0xB8C8F0);
EBS.fx.push({ k: "drift", m: Sd.g, x0: Sd.g.position.x, z0: Sd.g.position.z, ph: s });
}
ebsSpot(X, Z + 13, 4, "The dark pool", "touch the water and call a shade", function () {
var H = EBS_HEROINES[Math.floor(Math.random() * EBS_HEROINES.length)];
worldCard(worldFacts(H[0], "rises from the pool to drink", [], ["A pale shape gathers over the water: " + H[0] + ", " + H[1], "Homer's 'catalogue of women' in Odyssey 11 lists the great queens and mothers of the old stories who came up to Odysseus's offering, one by one, each telling her lineage."]));
}, 0);
ebsStele(grp, X - 12, 0, Z + 18, Math.PI / 2, "The catalogue of the dead", "Odyssey 11", ["Odysseus at the edge of the world saw his mother, the prophet Tiresias, the great queens of old, his comrades from Troy (Agamemnon, Achilles, Patroclus, Antilochus, Ajax), then Minos judging, Orion hunting, and the great sinners Tityos, Tantalus and Sisyphus, and the phantom of Heracles.", "Then 'the dead came thronging in their thousands with an eerie cry', and pale fear took him, and he ran back to his ship."], X - 12, Z + 18);
},
function (grp, I) {
var X = I.x, Z = I.z;
ebsInRoom(grp, X, Z, 36, 26, 9, { wall: ebsStone("ashlar"), floor: ebsStone("earth"), ceilM: ebsStone("oak"), gaps: { s: [[18, 3.4]] }, lamps: 0xFFB060 });
ebsInDoorOut(grp, X, Z + 12.6, Math.PI);
[["Orphnaeus", "the dark one"], ["Aethon", "the blazing one"], ["Nycteus", "the night one"], ["Alastor", "the avenger"]].forEach(function (N, i) {
var sx = X - 12 + i * 8;
[-4, 4].forEach(function (o) { wBox(0.3, 2, 8, ebsStone("oak"), sx + o, 1, Z - 8, grp); ebsSolid(sx + o, Z - 8, 0.4, 8, -1, 2); });
var h = ebsBeast("horse", "st" + i, 1.1, 0x0A0808);
h.position.set(sx, 0, Z - 9);
h.rotation.y = Math.PI;
grp.add(h);
ebsRound(sx, Z - 9, 1.2, -1, 2);
wBox(2, 0.6, 0.6, ebsStone("grey"), sx, 0.3, Z - 11.6, grp);
wBox(1.6, 0.6, 1, ebsLam(0xC8A84A), sx + 2, 0.3, Z - 11.2, grp);
ebsSignAt(N[0], sx, 2.6, Z - 3.8, grp);
ebsLook(sx, Z - 3, 2.4, N[0], N[1], ["One of the four horses of Hades named by the poet Claudian in The Rape of Proserpina (about AD 400): Orphnaeus, Aethon, Nycteus and Alastor. They are fed on the grass of Cocytus and drink of the river Lethe, he says."]);
});
var Gr = ebsInPerson(grp, "groom", X + 10, Z + 4, { topKind: "robe", top: 0x5A4A3A, bottom: 0x5A4A3A, layer: "apron", layerColor: 0x3A2A1A }, Math.PI * 1.3, 0xB8C8E0);
ebsTalk(Gr, "A groom of the dead", "A shade who was a horse-groom in life and still is, in Hades' stables. Knows each horse's temper; talks about the day the golden chariot burst up through the earth at the meadow of Nysa. Friendly, earthy, a bit superstitious.", "Don't stand behind Alastor. He kicks the living. The others only kick the dead, and the dead don't mind.");
var hn = new THREE.Group();
hn.position.set(X + 14, 1.6, Z - 1);
grp.add(hn);
for (var k = 0; k < 4; k++) {
var hr = new THREE.Mesh(new THREE.TorusGeometry(0.5, 0.06, 5, 14), ebsStone("oak"));
hr.position.set(0, 0, k * 1.2);
hr.rotation.y = Math.PI / 2;
hn.add(hr);
}
for (var hy = 0; hy < (EBS.lite ? 4 : 8); hy++) {
var R = wRand(5300 + hy);
var b = wBox(1.2, 0.8, 0.8, ebsLam(0xC8A84A), X - 14 + R() * 6, 0.4 + Math.floor(hy / 4) * 0.8, Z + 8 + R() * 2, grp);
}
},
function (grp, I) {
var X = I.x, Z = I.z, silver = ebsStone("silver");
ebsInRoom(grp, X, Z, 26, 22, 12, { wall: ebsStone("dark"), floor: ebsStone("slate"), ceilM: ebsStone("rock"), gaps: { s: [[13, 3.4]] }, lamps: 0x8AB0FF });
ebsInDoorOut(grp, X, Z + 10.6, Math.PI);
for (var i = 0; i < 4; i++)
[-10, 10].forEach(function (sx) { ebsColumn(grp, X + sx, 0, Z - 8 + i * 5, 11.5, 0.5, silver, silver); ebsRound(X + sx, Z - 8 + i * 5, 0.5, -1, 12); });
var fl = wBox(2, 9, 0.2, ebsWaterMat(0x8AB8E8, false, 0.7), X, 6, Z - 10.6, grp);
ebsPool(grp, X, 0, Z - 8.6, 2.6, 0x0A1A3A, silver, 0x6A9AFF);
var jg = new THREE.Mesh(new THREE.LatheGeometry([new THREE.Vector2(0.01, 0), new THREE.Vector2(0.3, 0.1), new THREE.Vector2(0.4, 0.5), new THREE.Vector2(0.2, 0.9), new THREE.Vector2(0.14, 1.1), new THREE.Vector2(0.22, 1.2)], 12), ebsStone("gold"));
jg.position.set(X + 4, 1, Z - 6);
grp.add(jg);
wCyl(0.6, 0.7, 1, ebsStone("white"), X + 4, 0.5, Z - 6, grp, 12);
ebsRound(X + 4, Z - 6, 0.7, -1, 1);
ebsLook(X + 4, Z - 4.4, 2.4, "Iris's golden jug", "Theogony 782-787", ["When a god is suspected of lying, Zeus sends Iris, the rainbow, to bring 'the great oath of the gods in a golden jug from far away: the famous cold water that trickles down from a high, sheer rock'."]);
var os = wBox(2, 1.6, 1.4, ebsStone("black"), X - 4, 0.8, Z - 6, grp);
ebsSolid(X - 4, Z - 6, 2, 1.4, -1, 1.6);
ebsSpot(X - 4, Z - 4.4, 2.4, "The stone of oaths", "swear an oath by the Styx", function () { ebsOath(); }, 0);
[["Nike", "Victory", "raise"], ["Kratos", "Power", "stand"], ["Bia", "Force", "stand"], ["Zelos", "Rivalry", "raise"]].forEach(function (C, i) { var cx = X - 9 + i * 6, cz = Z + 6; ebsStatue(grp, cx, 0, cz, 1.1, silver, { ry: Math.PI, pose: C[2] }); ebsLook(cx, cz - 1.8, 2.2, C[0] + " (" + C[1] + ")", "a child of Styx", ["Styx brought her four children to Zeus first of all the gods when he called for allies against the Titans; so they live with him always, and wherever he goes, they go (Theogony 383-403)."]); });
ebsLessonAt(X + 11, Z + 8, "rivers");
},
function (grp, I) {
var X = I.x, Z = I.z, iron = ebsStone("iron");
ebsInRoom(grp, X, Z, 18, 18, 20, { wall: iron, floor: iron, ceilM: iron, gaps: { s: [[9, 3]] }, lamps: 0xFF3A1A });
ebsInDoorOut(grp, X, Z + 8.6, Math.PI);
for (var s = 0; s < 24; s++) {
var a = s / 24 * Math.PI * 2 * 1.5, sx = X + Math.cos(a) * 6.6, sz = Z + Math.sin(a) * 6.6;
var st = wBox(2.4, 0.3, 1.2, iron, sx, 0.4 + s * 0.7, sz, grp);
st.rotation.y = -a;
}
ebsLook(X, Z, 3, "The stair", "it goes up and up", ["The stair winds up into the dark to the tower's top, where Tisiphone sits in her blood-red robe, sleepless, watching the gate (Aeneid 6.555)."]);
for (var w = 0; w < 3; w++) {
var wx = X - 8.6, wz = Z - 5 + w * 5;
wBox(0.3, 1.6, 0.3, ebsGlowM(0xFF4A1A, 0.9), wx, 4, wz, grp);
}
ebsSpot(X - 7, Z, 3, "The arrow slits", "look down into Tartarus", function () { worldCard(worldFacts("Down in Tartarus", "What the Sibyl told Aeneas (Aeneid 6.580-627)", [], ["The Titans, thrown down by the thunderbolt, writhe in the depths; the twin giants Otus and Ephialtes who tried to tear down the sky; Salmoneus, who drove a bronze chariot over a bronze bridge to imitate Zeus's thunder.", "Tityos, a giant whose body covers nine acres, and a vulture at him; the Lapiths Ixion and Pirithous; those who hated their brothers, struck their fathers, cheated their clients; misers; traitors.", "'If I had a hundred tongues and a hundred mouths and a voice of iron, I could not name all the kinds of crime, or the punishments.'", "You can go and see some of it for yourself: through the great gate, if you are thirteen or older. It is dangerous in there."])); }, 0);
for (var k = 0; k < 5; k++) {
var wh = wCyl(0.03, 0.02, 2, ebsLam(0x2A1A10), X + 8.4, 3, Z - 4 + k * 1.6, grp, 4);
wh.rotation.z = 0.1;
wBox(0.2, 0.3, 0.2, ebsStone("iron"), X + 8.6, 4, Z - 4 + k * 1.6, grp);
}
},
function (grp, I) {
var X = I.x, Z = I.z, blk = ebsStone("black");
ebsInRoom(grp, X, Z, 48, 48, 20, { wall: blk, floor: ebsStone("black"), ceil: false, gaps: { s: [[24, 6]] }, lamps: false });
ebsInDoorOut(grp, X, Z + 23.6, Math.PI, "The bronze threshold");
var sky = new THREE.Mesh(new THREE.PlaneGeometry(48, 48), ebsM("nightCeil", function () { var t = ebsCanvas("nightceil", 512, 512, function (x, W, H) { x.fillStyle = "#020310"; x.fillRect(0, 0, W, H); var r = wRand(77); for (var i = 0; i < 900; i++) {
var s = r() * 1.8 + 0.3;
x.fillStyle = "rgba(255,250,235," + (0.3 + r() * 0.7) + ")";
x.beginPath();
x.arc(r() * W, r() * H, s, 0, 6.28);
x.fill();
} }); var m = new THREE.MeshBasicMaterial({ map: t, side: THREE.DoubleSide }); m.userData.noPhoto = 1; return m; }));
sky.rotation.x = Math.PI / 2;
sky.position.set(X, 20, Z);
grp.add(sky);
for (var l = 0; l < (EBS.lite ? 3 : 6); l++) {
ebsBrazier(grp, X - 18 + l * (36 / ((EBS.lite ? 3 : 6) - 1)), 0, Z + 16, 0.9, X - 18 + l * (36 / ((EBS.lite ? 3 : 6) - 1)), Z + 16, 0x6A7AFF);
}
[["Clotho", "the spinner", "spins the thread of each life"], ["Lachesis", "the allotter", "measures how long it will be"], ["Atropos", "she who cannot be turned", "cuts it"]].forEach(function (F, i) {
var fx = X - 8 + i * 8, fz = Z - 12;
ebsThrone(grp, fx, 0, fz - 1, 0, 1.1, blk, ebsStone("silver"));
var P = ebsInPerson(grp, "fate" + i, fx, fz - 0.6, { sex: "f", hair: [0x2A1A10, 0x8A8A8A, 0xE8E8E8][i], hairStyle: "long", topKind: "robe", top: 0xF0F0F0, bottom: 0xF0F0F0, hat: "hood", hatColor: 0xE8E8F0 }, 0);
P.g.position.y = 0.55;
ebsTalk(P, F[0] + ", " + F[1], F[0] + ", one of the three Moirai, the Fates, daughters of Night (Hesiod, Theogony 217) or of Zeus and Themis. She " + F[2] + ". Even the gods cannot change what the Fates allot. In Plato's Myth of Er they sit around the Spindle of Necessity singing: Lachesis of the past, Clotho of the present, Atropos of the future. Calm, ancient, not cruel; speaks in short sentences about time, threads and choices; never tells the visitor when they will die.", ["The wool is soft today. Yours is a good colour.", "I measure. I do not choose. You choose, more than you think.", "Not yet. Not for a long while. Go on."][i], 3.2);
});
var th = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3([new THREE.Vector3(X - 8, 1.4, Z - 11), new THREE.Vector3(X - 4, 1.8, Z - 10), new THREE.Vector3(X, 1.4, Z - 11), new THREE.Vector3(X + 4, 1.6, Z - 10), new THREE.Vector3(X + 8, 1.4, Z - 11)]), 40, 0.02, 4), ebsGlowM(0xFFE8A0, 0.9, true));
grp.add(th);
ebsSpot(X, Z - 8, 3.6, "The thread", "watch the Fates at work", function () { worldCard(worldFacts("The thread of life", "The Moirai", [], ["Clotho spins, Lachesis measures, Atropos cuts. The Greeks said a person's 'moira', their portion, was given at birth.", "Homer's Zeus himself would not overrule fate, even to save his own son Sarpedon (Iliad 16).", "The thread glints as it runs between their fingers. Lachesis smiles at you and shakes her head: not yours, not today."])); }, 0);
var Th = ebsInPerson(grp, "thanatos", X + 16, Z - 4, { hair: 0x0A0A0A, beard: "short", skin: 0xB8B0B0, topKind: "robe", top: 0x0A0A0A, bottom: 0x0A0A0A, back: "cloak" }, -Math.PI / 2);
var wm = ebsLam(0x141418, { ds: true });
[-1, 1].forEach(function (s) { var wg = new THREE.Mesh(new THREE.PlaneGeometry(1.6, 2.2), wm); wg.position.set(s * 0.8, 1.6, -0.25); wg.rotation.y = s * 0.5; Th.g.add(wg); });
ebsTalk(Th, "Thanatos, Death", "Thanatos, Death, son of Night and twin brother of Sleep. Hesiod: 'his heart is iron, his spirit bronze and pitiless'; but in art (the Sarpedon vase) he is a gentle bearded winged man carrying the fallen hero home with Sleep. Heracles wrestled him at a tomb to win back Alcestis (Euripides). Sisyphus once chained him up so nobody died. Quiet, courteous, unhurried, never threatening; not interested in the visitor today.", "Do not be afraid. I am not here for you. I am only resting, between journeys.", 3.4);
ebsLook(X - 16, Z + 6, 3, "The children of Night", "Theogony 211-225", ["Night bore, without a father: Doom, black Fate, Death, Sleep and the tribe of Dreams; Blame and Woe; the Hesperides who guard the golden apples; the Fates; Nemesis; Deceit, Friendship, Old Age, and Strife.", "Day and Night take turns in this house: one comes in as the other goes out over the bronze threshold, and the house never holds them both at once."]);
ebsLessonAt(X + 18, Z + 18, "er");
},
function (grp, I) {
var X = I.x, Z = I.z, cave = ebsStone("cave");
ebsInRoom(grp, X, Z, 40, 36, 12, { wall: cave, floor: ebsStone("moss"), ceilM: cave, gaps: { s: [[20, 4]] }, lamps: false });
ebsInDoorOut(grp, X, Z + 17.6, Math.PI, "The cave mouth");
for (var r = 0; r < (EBS.lite ? 6 : 14); r++) {
var R = wRand(5400 + r), a = R() * 6.28;
ebsRock(grp, X + Math.cos(a) * 17, -1, Z + Math.sin(a) * 15 - 2, 2 + R() * 3, 5400 + r, cave);
}
var ch = new THREE.Mesh(new THREE.PlaneGeometry(2.4, 36), ebsWaterMat(0xBCCCD4, false, 0.8));
ch.rotation.x = -Math.PI / 2;
ch.position.set(X + 12, 0.06, Z);
grp.add(ch);
ebsSolid(X + 12, Z, 2.4, 36, -1, 0.3);
ebsLook(X + 10, Z + 6, 2.6, "The stream of Lethe", "Ovid, Metamorphoses 11.602-604", ["\"From the bottom of the rock comes the stream of Lethe, whose water, sliding and murmuring over the pebbles, invites sleep.\"", "Drink of it and you forget. Virgil says souls drink it before they are born again, so they do not remember their past lives."]);
var cg = new THREE.Group();
cg.position.set(X, 0, Z - 10);
grp.add(cg);
wCyl(0.4, 0.6, 1, ebsLam(0x0A0606), 0, 0.5, 0, cg, 10);
wBox(4, 0.4, 1.8, ebsLam(0x0A0606), 0, 1.1, 0, cg);
wBox(4, 0.3, 1.8, ebsLam(0x1A1A24), 0, 1.4, 0, cg);
ebsSolid(X, Z - 10, 4, 1.8, -1, 1.6);
for (var f = 0; f < 16; f++) {
var R2 = wRand(5500 + f);
var fe = wBox(0.08, 0.02, 0.5, ebsLam(0x0A0A12), X - 1.8 + R2() * 3.6, 1.58, Z - 10.6 + R2() * 1.2, grp);
fe.rotation.y = R2() * 3;
}
var Hy = ebsInPerson(grp, "hypnos", X, Z - 10, { hair: 0x6A4A2A, hairStyle: "curly", topKind: "robe", top: 0x2A2A4A, bottom: 0x2A2A4A }, 0);
Hy.g.rotation.z = Math.PI / 2;
Hy.g.position.set(X - 0.9, 1.8, Z - 10);
var wm = ebsLam(0x2A2A3A, { ds: true });
var hw = new THREE.Mesh(new THREE.PlaneGeometry(0.5, 0.3), wm);
hw.position.set(0.2, 1.7, 0);
Hy.g.add(hw);
ebsSpot(X, Z - 7.6, 3, "Sleep (Hypnos)", "try to wake him", function () { worldCard(worldFacts("Hypnos, Sleep", "Ovid, Metamorphoses 11.618-623", [], ["When Iris came to him with a message from Juno, the light of her robe lit up the cave, and 'the god, hardly lifting his heavy eyes, falling back again and again, his nodding chin striking his breast, at last shook himself free of himself'.", "He hardly stirs for you. A poppy head falls from his hand.", "Homer says Sleep once put Zeus himself to sleep for Hera, and fled to Night to hide from his anger (Iliad 14)."])); }, 0);
for (var d = 0; d < (EBS.lite ? 14 : 40); d++) {
var R3 = wRand(5600 + d), gl = wGlow([0xB8A8F0, 0x8AC8F0, 0xF0A8D8, 0xF0E8A0][d % 4], 0.6 + R3() * 0.8, 0.5);
gl.position.set(X - 16 + R3() * 32, 3 + R3() * 8, Z - 14 + R3() * 24);
grp.add(gl);
EBS.fx.push({ k: "hang", m: gl, y0: gl.position.y, ph: R3() * 9 });
}
var Mo = ebsInPerson(grp, "morpheus", X - 8, Z - 4, { hair: 0x3A2A1A, topKind: "robe", top: 0x4A3A6A, bottom: 0x4A3A6A }, 0.6, 0xC8B8F0);
ebsTalk(Mo, "Morpheus", "Morpheus, son of Sleep, who appears in dreams in human form, copying any person's walk, face and voice perfectly (Ovid, Metamorphoses 11.633-638). His brother Icelos, called Phobetor by the gods, takes the shapes of beasts and birds; Phantasos becomes earth, rocks, water, trees. Morpheus is playful, gentle, keeps changing who he sounds like, loves talking about the visitor's dreams and the dream journal.", "Whose face would you like me to wear? Your grandmother's? Your teacher's? I can be anyone. I am very good at it.", 3.2);
var pm = ebsLam(0xD8281A);
for (var p = 0; p < (EBS.lite ? 30 : 80); p++) {
var R4 = wRand(5700 + p);
var px = X - 16 + R4() * 24, pz = Z + 4 + R4() * 10;
wCyl(0.01, 0.01, 0.6, ebsLam(0x3A5A2A), px, 0.3, pz, grp, 3);
var hd = wSph(0.12, pm, px, 0.62, pz, grp, 6);
hd.scale.y = 0.6;
}
ebsLook(X - 10, Z + 12, 2.6, "Poppies at the door", "Ovid, Metamorphoses 11.605-607", ["\"Before the cave's door grow poppies in plenty and countless herbs, from whose juices Night gathers sleep and sprinkles it over the darkened lands.\""]);
},
function (G) {
var g = ebsDistrict(G, EBS_TAE_X, 0, 1500, true), X = EBS_TAE_X, ty = ebsY(X, 200), wh = ebsStone("white");
ebsTemple(g, { x: X, y: ty, z: 200, rot: Math.PI, w: 20, d: 32, colH: 9, nx: 6, mat: wh, colMat: wh, capMat: wh, roofMat: ebsStone("terracotta"), room: "poseidon", name: "the temple of Poseidon", friezeFg: "#2A4A8A", friezeBg: "#E8E0D0" });
var ky = ebsY(X, -80), cv = new THREE.Group();
cv.position.set(X, ky, -80);
g.add(cv);
var mo = new THREE.Mesh(new THREE.CircleGeometry(6, 18, 0, Math.PI), ebsGlowM(0x030204));
mo.position.z = 0.5;
mo.rotation.y = Math.PI;
cv.add(mo);
ebsRock(cv, -10, -2, -2, 10, 6001, ebsStone("rock"));
ebsRock(cv, 10, -2, -2, 10, 6002, ebsStone("rock"));
ebsRock(cv, 0, 9, -4, 10, 6003, ebsStone("rock"));
ebsRound(X - 10, -82, 8, ky - 4, ky + 18);
ebsRound(X + 10, -82, 8, ky - 4, ky + 18);
ebsTorch(cv, -5, 4, -1, 0, X - 5, -81);
ebsTorch(cv, 5, 4, -1, 0, X + 5, -81);
ebsSpot(X, -76, 5, "The cave of Taenarum", "go down into the underworld", function () { ebsMove(0, 4160, Math.PI, "<b>Down the cave, down the long stair.</b> Easy is the way down.", 240); }, ky);
ebsRoad(g, [[X, 180], [X, 100], [X, 20], [X, -60]], 5, false, 0xB8A888);
for (var i = 0; i < (EBS.lite ? 20 : 60); i++) {
var R = wRand(6100 + i), a = R() * 6.28, d = 120 + R() * 500, x = X + Math.cos(a) * d, z = 120 + Math.sin(a) * d * 0.8, y = ebsY(x, z);
if (y < 2 || Math.abs(x - X) < 14)
continue;
ebsTree(R() < 0.6 ? "holmoak" : "cypress", g, x, y, z, 0.7 + R() * 0.4, 6200 + i);
}
var Pr = ebsPerson("taepriest", X + 8, 184, ty, { beard: "long", hair: 0xD8D8D8, topKind: "robe", top: 0xF0F0E8, bottom: 0xF0F0E8, layer: "longcoat", layerColor: 0x2A4A8A, hat: "flowercrown", hatColor: 0x6A8A3A }, Math.PI);
ebsTalk(Pr, "The priest of Poseidon", "An old priest of the temple of Poseidon at Taenarum, the southernmost point of mainland Greece (Cape Matapan). Pausanias saw the temple 'like a cave' and the cave Heracles came up through with Cerberus. The priest knows the cave's stories (Heracles, Orpheus, the shrine where people called up the dead), gives every visitor an obol for Charon, and warns them to bring it back up if they can.", "Going down? Then take this: an obol for the ferryman. Hold it in your mouth, or in your hand if you prefer. And come back up the way you went.", 3.4, function () { ebsObol(); });
var Hm = ebsHermes("tae");
Hm.position.set(X - 6, ebsY(X - 6, -60), -60);
Hm.rotation.y = 0;
g.add(Hm);
var HP = { g: Hm, y: Hm.position.y };
EBS.people.push(HP);
ebsTalk(HP, "Hermes, guide of souls", "Hermes Psychopompos, son of Zeus and Maia, messenger of the gods, who leads the souls of the dead down to Hades with his golden wand (Odyssey 24.1-14: the suitors' souls follow him 'gibbering like bats'). Quick, witty, kind, a born storyteller and a bit of a trickster; offers to guide the visitor on a tour of the twelve great places of the underworld, with a story at each.", "Ah, a living one! Splendid. I have taken a great many souls down this cave and very few of them were good company. Shall I show you round? Twelve places, twelve stories.", 3.6, function () { ebsTourOffer(); });
ebsStele(g, X + 16, ty, 170, Math.PI, "Cape Taenarum", "Tainaron, the southern tip of Greece", ["Strabo and Pausanias tell of a cave beside the temple of Poseidon here, which the Greeks said was a way down to Hades. Heracles dragged Cerberus up through it.", "Orpheus went down this way to fetch Eurydice (Ovid, Metamorphoses 10.13: 'he dared to go down to the Styx through the gate of Taenarus').", "The cape is still there: Cape Matapan, with the ruined temple and a sea cave."], X + 16, 170);
},
function (grp, I) {
var X = I.x, Z = I.z, wh = ebsStone("white");
ebsInRoom(grp, X, Z, 22, 28, 10, { wall: wh, floor: ebsStone("white"), ceilM: ebsStone("oak"), gaps: { s: [[11, 3.4]] }, fresco: "blue", lamps: 0xFFE0B0 });
ebsInDoorOut(grp, X, Z + 13.6, Math.PI);
ebsStatue(grp, X, 0, Z - 10, 2.2, ebsStone("bronze"), { ry: 0, pose: "raise", holds: "sceptre", robe: false, solid: true, wx: X, wz: Z - 10 });
var tr = new THREE.Group();
tr.position.set(X + 1.6, 2.4 + 3.2, Z - 10);
grp.add(tr);
[-0.3, 0, 0.3].forEach(function (px) { wCone(0.06, 0.5, ebsStone("bronze"), px, 0.25, 0, tr, 5); });
wBox(0.7, 0.08, 0.08, ebsStone("bronze"), 0, 0, 0, tr);
for (var k = 0; k < 4; k++) {
var dg = new THREE.Group();
dg.position.set(X - 9, 1.2 + k * 0.9, Z - 6 + k * 2.6);
grp.add(dg);
var b = wSph(0.4, ebsStone("bronze"), 0, 0, 0, dg, 8);
b.scale.set(0.5, 0.5, 1.4);
}
for (var s = 0; s < 3; s++) {
var sh = new THREE.Group();
sh.position.set(X + 9, 1, Z - 6 + s * 4);
grp.add(sh);
wBox(0.3, 0.3, 2, ebsStone("oak"), 0, 0, 0, sh);
wBox(0.04, 1, 0.8, ebsLam(0xE8E0D0), 0, 0.6, 0.2, sh);
wBox(0.4, 0.4, 0.6, ebsStone("white"), 0, -0.6, 0, sh);
}
ebsLook(X - 9, Z - 2, 2.6, "Offerings", "bronze dolphins and model ships", ["Sailors rounding this dangerous cape left offerings to Poseidon for a safe voyage. Herodotus tells how the singer Arion, thrown overboard by greedy sailors, rode a dolphin to Taenarum, and a bronze of a man on a dolphin was set up here."]);
ebsLook(X, Z - 4, 3, "Poseidon", "the Earth-shaker", ["Brother of Zeus and Hades, lord of the sea and of earthquakes, maker of horses. When the brothers cast lots, Zeus won the sky, Poseidon the sea, and Hades the misty dark."]);
ebsLook(X + 8, Z + 10, 2.6, "The oracle of the dead", "psychomanteion", ["Plutarch says there was a 'psychopompeion' at Taenarum where people came to call up the souls of the dead: the Spartan Callondas came here to make peace with the spirit of the poet Archilochus, whom he had killed in battle."]);
},
function (G) {
var T = EBS_TT, g = ebsDistrict(G, EBS_TAR_X, 0, 2000, true), bronze = ebsStone("bronze"), iron = ebsStone("iron");
var ax = ebsTX(T.tower.x), az = T.tower.z, ay = ebsY(ax, az);
ebsTower(g, ax - 20, ay - 2, az, 10, 60, bronze, iron);
ebsTower(g, ax + 20, ay - 2, az, 10, 60, bronze, iron);
wBox(30, 40, 3, ebsS("b:iron", 0x3A4A5A, 1.6, { shine: 120, spec: 0xA8C8E8, n: 0.5 }), ax, ay + 20, az, g);
ebsSolid(ax, az, 50, 4, ay - 5, ay + 60);
ebsSpot(ax, az - 6, 6, "The bronze gate", "climb back out of Tartarus", function () { ebsMove(EBS.tarGate ? EBS.tarGate.x + 40 : -1600, EBS.tarGate ? EBS.tarGate.z : 20, Math.PI / 2, "<b>Out through the gate of Tartarus,</b> back over the bridge of the burning moat."); }, ay);
ebsStele(g, ax + 10, ay, az - 14, 0, "Tartarus", "Theogony 726-745", ["\"Round it runs a fence of bronze, and Night spreads in three rows round its neck; above grow the roots of earth and the unharvested sea.\"", "\"There the Titans are hidden under misty gloom, by the will of Zeus, in a dank place at the ends of the huge earth.\"", "Here you can be attacked. Furies, hungry shades and worse hunt the plain. Stay on your guard."], ax + 10, az - 14);
[[[-1600, 300], [-800, 420], [0, 250], [600, 380], [1500, 200]], [[400, -500], [900, -900], [1300, -1300]]].forEach(function (P) {
var pts = P.map(function (p) { return [ebsTX(p[0]), p[1]]; });
var m = new THREE.Mesh(ebsRibbon(pts, 14, -2.4), ebsWaterMat(0xFF6A1A, true));
m.userData.keep = 1;
g.add(m);
EBS.flows.push({ m: m.material, sp: 0.06 });
ebsDim(pts, function (x, z) { var gl = wGlow(0xFF5A1A, 40, 0.4); gl.position.set(x, 2, z); g.add(gl); ebsLightSrc(x, 4, z, 0xFF5A1A, 2, 60); }, 180);
});
var P = T.prison, px = ebsTX(P.x), py = ebsY(px, P.z);
for (var i = 0; i < (EBS.lite ? 16 : 28); i++) {
var n = EBS.lite ? 16 : 28, a0 = i / n * Math.PI * 2, a1 = (i + 1) / n * Math.PI * 2;
if (i === Math.round(n / 4))
continue;
var r = 220;
ebsWallLine(g, px + Math.cos(a0) * r, P.z + Math.sin(a0) * r, px + Math.cos(a1) * r, P.z + Math.sin(a1) * r, py - 4, 46, 6, bronze, true);
}
ebsHall(g, { x: px, y: py, z: P.z + 170, rot: 0, w: 30, d: 24, h: 22, mat: bronze, trimMat: iron, roofMat: iron, colMat: bronze, room: "titans", name: "the prison of the Titans", dw: 6, dh: 12, torchCol: 0xFF5A1A });
[-1, 1].forEach(function (sd, i) {
var hh = new THREE.Group();
hh.position.set(px + sd * 24, py, P.z + 196);
g.add(hh);
ebsStatue(hh, 0, 0, 0, 4, ebsStone("dark"), { ry: 0, pose: "raise", plinth: true });
for (var k = 0; k < 8; k++) {
var arm = wCyl(0.25, 0.3, 4, ebsStone("dark"), 0, 8 + k * 0.6, 0, hh, 6);
arm.rotation.z = (k % 2 ? 1 : -1) * (0.6 + k * 0.12);
arm.rotation.y = k * 0.8;
}
ebsRound(px + sd * 24, P.z + 196, 3, py - 2, py + 14);
});
var Br = ebsPerson("briareus", px + 12, P.z + 200, py, { beard: "full", hair: 0x3A2A1A, topKind: "robe", top: 0x4A3A2A, bottom: 0x4A3A2A, layer: "armor", layerColor: 0x6A5A3A }, Math.PI);
Br.g.scale.setScalar(2.4);
ebsTalk(Br, "Briareus, the hundred-handed", "Briareus (Obriareus), one of the three Hecatoncheires, the Hundred-Handed giants with fifty heads each, sons of Earth and Sky; with his brothers Cottus and Gyges he hurled three hundred rocks at a time at the Titans and won the war for Zeus, and now they are the faithful guards of the Titans' prison (Theogony 147-153, 713-735, 815-819). Homer: Thetis once called him up to Olympus to stop the gods tying up Zeus. Enormous, slow, booming, loyal, surprisingly gentle with small visitors.", "HO. Small one. Living. Do not go too near the walls. The Titans are still angry, after all these ages.", 6);
var S = T.sis, sx = ebsTX(S.x), sy = ebsY(sx, S.z);
var stone = wSph(4, ebsStone("rock"), 0, 0, 0, g, 10);
stone.position.set(sx + S.r * 0.9, ebsY(sx + S.r * 0.9, S.z) + 4, S.z);
stone.userData.keep = 1;
EBS.sisStone = { m: stone, t: 0 };
var Si = ebsPerson("sisyphus", sx + S.r * 0.9 + 6, S.z + 2, ebsY(sx + S.r * 0.9 + 6, S.z + 2), { beard: "short", hair: 0x5A4A3A, topKind: "robe", top: 0x6A5A4A, bottom: 0x6A5A4A }, -Math.PI / 2);
ebsShadeify(Si.g, 0xE8C8A8, 0.75);
ebsTalk(Si, "Sisyphus", "Sisyphus, king of Corinth, the cleverest of men, who cheated death twice: he chained up Death himself, and later tricked Persephone into letting him go back to the upper world. His punishment is to roll a huge stone up a hill; just as it reaches the top it rolls back down (Odyssey 11.593-600). Cunning, chatty, sardonic, never gives up; invites the visitor to help push.", "Give me a hand? Just to the top. It will stay this time, I'm sure of it. I was sure yesterday, too.", 3.6, function () { ebsSisyphus(); });
ebsStele(g, sx + S.r + 20, ebsY(sx + S.r + 20, S.z + 20), S.z + 20, -Math.PI / 2, "Sisyphus", "Odyssey 11.593-600", ["\"I saw Sisyphus in agony, pushing a monstrous stone with both hands: bracing his feet, he shoved it up the hill, but just as he was about to heave it over the top, its weight turned it back, and the pitiless stone rolled down again to the plain.\""], sx + S.r + 20, S.z + 20);
var Tn = T.tant, tx = ebsTX(Tn.x), tz = Tn.z;
var pool = new THREE.Mesh(new THREE.CircleGeometry(Tn.r, 36), ebsWaterMat(0x2A4A5A, false, 0.9));
pool.rotation.x = -Math.PI / 2;
pool.position.set(tx, -1, tz);
g.add(pool);
for (var f = 0; f < (EBS.lite ? 6 : 12); f++) {
var a = f / 12 * Math.PI * 2, fx = tx + Math.cos(a) * (Tn.r + 8), fz = tz + Math.sin(a) * (Tn.r + 8);
ebsTree(["pomegranate", "pomegranate", "laurel", "holmoak"][f % 4], g, fx, ebsY(fx, fz), fz, 1.4, 6300 + f);
}
var Ta = ebsPerson("tantalus", tx, tz + Tn.r - 14, -1.9, { beard: "full", hair: 0x4A3A2A, topKind: "robe", top: 0x6A3A5A, bottom: 0x6A3A5A, hat: "crown", hatColor: 0xB89A3A }, Math.PI);
ebsShadeify(Ta.g, 0xE8C8A8, 0.75);
ebsFloor(tx, tz + Tn.r - 14, 3, 3, -1.9);
wBox(2, 0.4, Tn.r * 0.4, ebsStone("rock"), tx, -0.8, tz + Tn.r * 0.8, g);
ebsFloor(tx, tz + Tn.r * 0.8, 2, Tn.r * 0.4 + 2, -0.6);
ebsTalk(Ta, "Tantalus", "Tantalus, king of Sipylus, son of Zeus, who dined with the gods and abused their trust (he stole nectar and ambrosia and told the gods' secrets, in Pindar). He stands in a pool up to his chin; whenever he bends to drink, the water drains away; fruit trees hang over him, and whenever he reaches up, the wind tosses the branches out of reach (Odyssey 11.582-592). Our word 'tantalise' comes from him. Hungry, thirsty, bitter, a bit pompous; complains of his torment without describing it gruesomely.", "Water. Water all round me and not a drop... Don't look at me like that. Pass me a pear, would you? No. Of course. The branch moves.", 3.6, function () { ebsTantalus(); });
var Ix = T.ixion, ix = ebsTX(Ix.x), iy = ebsY(ix, Ix.z), wg = new THREE.Group();
wg.position.set(ix, iy + 16, Ix.z);
g.add(wg);
wg.userData.keep = 1;
var rim = new THREE.Mesh(new THREE.TorusGeometry(7, 0.5, 8, 32), bronze);
wg.add(rim);
for (var sp = 0; sp < 8; sp++) {
var spk = wBox(14, 0.4, 0.4, bronze, 0, 0, 0, wg);
spk.rotation.z = sp * Math.PI / 8;
}
for (var fl = 0; fl < (EBS.lite ? 4 : 8); fl++) {
var a2 = fl / 8 * Math.PI * 2;
ebsFlame(wg, Math.cos(a2) * 7, Math.sin(a2) * 7, 0, 1.4, 0xFF6A1A);
}
var ixp = new THREE.Group();
wg.add(ixp);
var ixm = wPerson("ebs_ixion", { sex: "m", look: { beard: "short", topKind: "robe", top: 0x5A2A2A, bottom: 0x5A2A2A } });
ixm.position.set(0, -0.9, 0.6);
ixp.add(ixm);
ebsShadeify(ixm, 0xFFC8A8, 0.8);
EBS.ixion = wg;
ebsLightSrc(ix, iy + 16, Ix.z, 0xFF6A1A, 2, 50);
wCyl(0.6, 0.8, 9, iron, ix, iy + 4.5, Ix.z - 1.2, g, 8);
ebsRound(ix, Ix.z, 2, iy - 2, iy + 9);
ebsStele(g, ix + 14, iy, Ix.z + 14, 0, "Ixion's wheel", "Pindar, Pythian 2.21-48", ["Ixion, king of the Lapiths, the first man to murder a relative, was pardoned by Zeus and invited to Olympus, where he repaid him by trying to seduce Hera.", "Zeus bound him to a fiery winged wheel that spins through the sky for ever, crying out to mortals: 'repay your benefactor with kindness'. Only Orpheus's song ever made it stop."], ix + 14, Ix.z + 14);
var D = T.danaids, dx = ebsTX(D.x), dy = ebsY(dx, D.z);
ebsHall(g, { x: dx, y: dy, z: D.z, rot: -0.5, w: 34, d: 26, h: 12, mat: ebsStone("terracotta"), trimMat: ebsStone("dark"), roofMat: ebsStone("slate"), colMat: ebsStone("dark"), room: "danaids", name: "the Danaids' hall", torchCol: 0xFF8A4A });
var Ti = T.tityos, tix = ebsTX(Ti.x), tiy = ebsY(tix, Ti.z), tg = new THREE.Group();
tg.position.set(tix, tiy, Ti.z);
g.add(tg);
var giant = wPerson("ebs_tityos", { sex: "m", look: { beard: "full", hair: 0x2A1A10, topKind: "robe", top: 0x4A3A2A, bottom: 0x4A3A2A } });
giant.rotation.x = -Math.PI / 2;
giant.scale.setScalar(26);
giant.position.y = 2;
tg.add(giant);
ebsShadeify(giant, 0xC8A898, 0.7);
ebsSolid(tix, Ti.z + 22, 14, 48, tiy - 2, tiy + 8);
EBS.vultures = [];
for (var v = 0; v < (EBS.lite ? 3 : 6); v++) {
var vg = new THREE.Group();
var vb = wBox(0.6, 0.3, 1.2, ebsLam(0x1A1210), 0, 0, 0, vg);
var vw = wBox(4, 0.08, 0.9, ebsLam(0x1A1210), 0, 0.1, 0, vg);
vg.position.set(tix, tiy + 60 + v * 6, Ti.z + 20);
g.add(vg);
vg.userData.keep = 1;
EBS.vultures.push({ g: vg, cx: tix, cz: Ti.z + 20, r: 30 + v * 8, y: tiy + 60 + v * 6, ph: v });
}
ebsStele(g, tix + 30, ebsY(tix + 30, Ti.z), Ti.z, -Math.PI / 2, "Tityos", "Odyssey 11.576-581", ["A giant, son of Earth, who attacked the goddess Leto; Apollo and Artemis shot him down. Homer saw him 'lying on the ground, and he covered nine acres', with vultures to torment him for ever.", "Lucretius said Tityos is really a picture of a person eaten up by worry or desire, in this life."], tix + 30, Ti.z);
var Sa = T.salm, sax = ebsTX(Sa.x), say = ebsY(sax, Sa.z);
wBox(80, 1.4, 8, bronze, sax, say + 8, Sa.z, g);
for (var bp = -3; bp <= 3; bp++) {
wCyl(0.8, 1, 8, bronze, sax + bp * 12, say + 4, Sa.z, g, 8);
ebsRound(sax + bp * 12, Sa.z, 1, say - 2, say + 8);
}
var cg = new THREE.Group();
cg.position.set(sax, say + 8.7, Sa.z);
cg.userData.keep = 1;
g.add(cg);
wBox(1.8, 1, 1.4, bronze, 0, 0.5, 0, cg);
var Sl = wPerson("ebs_salm", { sex: "m", look: { beard: "full", topKind: "robe", top: 0x8A6A2A, bottom: 0x8A6A2A, hat: "crown", hatColor: 0xB89A3A } });
Sl.position.set(0, 0.6, 0);
Sl.rotation.y = Math.PI / 2;
cg.add(Sl);
ebsShadeify(Sl, 0xE8D8A8, 0.75);
EBS.salm = { g: cg, x0: sax, z: Sa.z };
ebsStele(g, sax, say, Sa.z + 14, 0, "Salmoneus", "Aeneid 6.585-594", ["\"I saw Salmoneus too, paying cruel penalties for imitating the fire of Jupiter and the thunder of Olympus\": he drove his four-horse chariot over a bronze bridge to make thunder, and hurled torches for lightning, demanding to be worshipped as a god.", "Jupiter answered with a real thunderbolt."], sax, Sa.z + 14);
var Hy = T.hydra, hx = ebsTX(Hy.x), hyY = ebsY(hx, Hy.z);
var H = ebsHydra();
H.position.set(hx, hyY, Hy.z);
H.scale.setScalar(1.6);
H.userData.keep = 1;
g.add(H);
EBS.hydra = { g: H, x: hx, z: Hy.z, y: hyY, hp: 0, on: false };
ebsLightSrc(hx, hyY + 10, Hy.z, 0x6AFF8A, 1.4, 60);
ebsStele(g, hx + Hy.r + 40, ebsY(hx + Hy.r + 40, Hy.z), Hy.z, -Math.PI / 2, "The Hydra's pit", "Aeneid 6.576-577; Hesiod, Theogony 313-318", ["\"Inside, the monstrous Hydra, with fifty black gaping mouths, more savage still, has her seat.\"", "Heracles killed the Hydra of Lerna as his second labour: for every head he cut off, two grew back, until his nephew Iolaus seared each neck with a torch.", "Go down into the pit if you want to fight her. Everyone in Tartarus can help. She is very strong."], hx + Hy.r + 40, Hy.z);
ebsSpot(hx, Hy.z + Hy.r - 10, 14, "The Hydra", "wake her and fight", function () { ebsHydraWake(); }, null);
for (var t = 0; t < (EBS.lite ? 20 : 60); t++) {
var R = wRand(6400 + t), x = (R() - 0.5) * 3400, z = (R() - 0.5) * 3400;
if (Math.hypot(x, z) > 1700)
continue;
var wx = ebsTX(x);
if (ebsWaterAt(wx, z))
continue;
if (R() < 0.5)
ebsDeadTree(g, wx, ebsY(wx, z), z, 1 + R(), 6500 + t);
else
ebsRock(g, wx, ebsY(wx, z), z, 3 + R() * 6, 6600 + t, ebsStone("black"));
}
ebsRoad(g, [[ax, az - 12], [ebsTX(0), 1200], [ebsTX(0), 700], [ebsTX(-200), 300], [ebsTX(0), -100], [ebsTX(0), -880]], 8, true, 0x4A2A20);
},
function (grp, I) {
var X = I.x, Z = I.z, bronze = ebsStone("bronze"), iron = ebsStone("iron");
ebsInRoom(grp, X, Z, 70, 56, 30, { wall: ebsStone("black"), floor: ebsStone("rock"), ceil: false, gaps: { s: [[35, 6]] }, lamps: false });
ebsInDoorOut(grp, X, Z + 27.6, Math.PI, "The bronze gates");
for (var b = 0; b < 6; b++)
ebsBrazier(grp, X - 30 + b * 12, 0, Z + 20, 1.3, X - 30 + b * 12, Z + 20, 0xFF4A1A);
[["Kronos", "the youngest Titan, who ate his children and was overthrown by his son Zeus", 0, -18], ["Iapetus", "father of Atlas and Prometheus", -22, -12], ["Hyperion", "the Titan of light, father of the Sun, Moon and Dawn", 22, -12], ["Koios", "the Titan of the axis of heaven, grandfather of Apollo and Artemis", -26, 4], ["Krios", "a Titan of the constellations", 26, 4]].forEach(function (T, i) {
var tg = new THREE.Group();
tg.position.set(X + T[2], 0, Z + T[3]);
grp.add(tg);
var p = wPerson("ebs_titan" + i, { sex: "m", look: { beard: "long", hair: i ? 0x5A4A3A : 0xD8D8D8, topKind: "robe", top: 0x3A2A2A, bottom: 0x3A2A2A } });
p.scale.setScalar(i ? 4 : 5);
tg.add(p);
ebsShadeify(p, 0xFFB8A0, 0.85);
for (var c = 0; c < 4; c++) {
var ch = wCyl(0.12, 0.12, 8, iron, (c < 2 ? -1 : 1) * 2.4, 4 + (c % 2) * 3, -1, tg, 4);
ch.rotation.z = (c < 2 ? 1 : -1) * 0.8;
}
wBox(4, 12, 1, ebsStone("black"), 0, 6, -2.4, tg);
ebsSolid(X + T[2], Z + T[3] - 1, 6, 4, -1, i ? 8 : 10);
ebsLook(X + T[2], Z + T[3] + 4, 4, T[0], "a Titan", [T[0] + ", " + T[1] + ".", "The Titans fought the gods for ten years (the Titanomachy) until Zeus freed the Cyclopes and the Hundred-Handed, who gave him the thunderbolt and buried the Titans under rocks. They were sent down to Tartarus, 'as far below the earth as heaven is above it' (Theogony 617-735)."]);
});
var Kr = ebsLook(X, Z - 12, 5, "Kronos speaks", "from his chains", ["\"The child of Rhea... and now a mortal comes to stare. Look, then. I once ruled the Golden Age, when men lived like gods, without toil or grief. Ask the poets.\"", "Hesiod says Kronos ruled in the Golden Age; Pindar says Zeus eventually freed him and made him king of the Isles of the Blessed, where his tower stands."], 0, "listen");
ebsLessonAt(X + 30, Z + 22, "tartarus");
},
function (grp, I) {
var X = I.x, Z = I.z;
ebsInRoom(grp, X, Z, 34, 26, 12, { wall: ebsStone("terracotta"), floor: ebsStone("cotto"), ceilM: ebsStone("dark"), gaps: { s: [[17, 3.4]] }, fresco: "red", lamps: 0xFF9A50 });
ebsInDoorOut(grp, X, Z + 12.6, Math.PI);
var pts = [];
for (var i = 0; i <= 14; i++) {
var t = i / 14;
pts.push(new THREE.Vector2(0.4 + Math.sin(Math.min(1, t * 1.1) * Math.PI) * 2 + (t > 0.86 ? 0.4 : 0), t * 5));
}
var big = new THREE.Mesh(new THREE.LatheGeometry(pts, 18), ebsStone("terracotta"));
big.position.set(X, 0, Z - 6);
grp.add(big);
ebsRound(X, Z - 6, 2.6, -1, 5);
var wl = wCyl(1.6, 1.6, 0.1, ebsWaterMat(0x3A5A7A, false, 0.9), X, 0.15, Z - 6, grp, 16);
ebsPool(grp, X + 12, 0, Z + 2, 2.4, 0x3A6A8A, ebsStone("white"), 0x6A9AFF);
var sp = wCyl(0.1, 0.1, 2, ebsWaterMat(0x8AB8F0, false, 0.6), X + 12, 1, Z + 2, grp, 6);
for (var d = 0; d < (EBS.lite ? 4 : 8); d++) {
var a = d / 8 * Math.PI * 2, Dn = ebsInPerson(grp, "danaid" + d, X + Math.cos(a) * 6, Z - 2 + Math.sin(a) * 4, { sex: "f", hairStyle: d % 2 ? "bun" : "long", topKind: "dress", top: 0xD8C8B0, bottom: 0xD8C8B0 }, -a + Math.PI, 0xE8D0C0);
ebsAmphora(Dn.g, 0.3, 1.4, 0.2, 0.6);
EBS.fx.push({ k: "drift", m: Dn.g, x0: Dn.g.position.x, z0: Dn.g.position.z, ph: d });
}
ebsSpot(X, Z - 2, 4, "The jar without a bottom", "help carry water", function () { ebsDanaids(); }, 0);
ebsLook(X - 12, Z + 8, 3, "The daughters of Danaus", "Horace, Odes 3.11; Plato, Gorgias 493b", ["Danaus had fifty daughters, forced to marry their fifty cousins. On the wedding night all but one, Hypermnestra, obeyed their father and killed their husbands.", "Their punishment in the underworld: to fill a great jar with water carried in sieves or leaking jars, for ever.", "Plato uses the leaky jar as a picture of a greedy soul that can never be filled."]);
},
function (G) {
var E = EBS_EL, g = ebsDistrict(G, EBS_ELY_X, 0, 2000, true), wh = ebsStone("white"), gold = ebsStone("gold");
var ax = ebsEX(E.arrive.x), az = E.arrive.z + 80, ay = ebsY(ax, az);
ebsTemple(g, { x: ax, y: ay, z: az, rot: 0, w: 22, d: 10, colH: 12, nx: 4, nz: 2, mat: wh, colMat: wh, capMat: gold, roofMat: gold, noCella: true, ionic: true, steps: 3, friezeFg: "#E8C860", friezeBg: "#F4F0E8" });
ebsSpot(ax, az + 4, 6, "The gate of Elysium", "go back to the underworld", function () { ebsMove(EBS_AT.egate.x - 14, EBS_AT.egate.z, -Math.PI / 2, "<b>Back through the gate,</b> into the grey dark of the underworld."); }, ay);
var m = new THREE.Mesh(ebsRibbon(EBS_ERID.map(function (p) { return [ebsEX(p[0]), p[1]]; }), 40, -1.2), ebsWaterMat(0x4A9AC8, false, 0.85));
m.userData.keep = 1;
g.add(m);
EBS.flows.push({ m: m.material, sp: 0.03 });
var bx = ebsEX(0), bz = 200;
wBox(10, 1, 46, wh, bx, 0.8, bz, g);
ebsFloor(bx, bz, 10, 46, 1.3);
[-4.6, 4.6].forEach(function (o) { wBox(0.5, 1.2, 46, wh, bx + o, 1.9, bz, g); ebsSolid(bx + o, bz, 0.6, 46, -1, 3); });
ebsAsphodel(ebsEX(0), 400, 1500, EBS.lite ? 900 : 3200, ebsY, 71, 0xF8D84A);
ebsAsphodel(ebsEX(-400), -200, 900, EBS.lite ? 400 : 1400, ebsY, 72, 0xF0F0FF);
for (var t = 0; t < (EBS.lite ? 50 : 150); t++) {
var R = wRand(7000 + t), x = (R() - 0.5) * 3400, z = (R() - 0.5) * 3400 - 200;
if (Math.hypot(x, z + 200) > 1700 || z < E.sea + 40)
continue;
var wx = ebsEX(x);
if (ebsWaterAt(wx, z))
continue;
if (Math.hypot(x - E.stadium.x, z - E.stadium.z) < 200)
continue;
ebsTree(["laurel", "myrtle", "poplar", "pomegranate", "cypress"][t % 5], g, wx, ebsY(wx, z), z, 0.9 + R() * 0.6, 7100 + t);
}
ebsCrowd(ebsEX(0), 300, 1200, EBS.lite ? 80 : 260, ebsY, 0xFFF0D0, 0.35, 73);
var S = E.stadium, sx = ebsEX(S.x), sy = ebsY(sx, S.z);
var tr = new THREE.Mesh(new THREE.PlaneGeometry(36, 200), ebsM("track", function () { var q = new THREE.MeshLambertMaterial({ map: ebsPhotoTex("sand", 4), color: 0xD8B888, polygonOffset: true, polygonOffsetFactor: -3, polygonOffsetUnits: -3 }); q.userData.noPhoto = 1; return q; }));
tr.rotation.x = -Math.PI / 2;
tr.position.set(sx, sy + 0.1, S.z);
g.add(tr);
[-20, 20].forEach(function (o) { for (var r = 0; r < 5; r++) {
wBox(2, 0.6, 200, wh, sx + o + (o > 0 ? r * 2 : -r * 2), sy + 0.3 + r * 0.6, S.z, g);
ebsFloor(sx + o + (o > 0 ? r * 2 : -r * 2), S.z, 2, 200, sy + 0.6 + r * 0.6);
} });
[-96, 96].forEach(function (o) { wBox(36, 0.3, 0.6, wh, sx, sy + 0.15, S.z + o, g); wCyl(0.3, 0.3, 2, wh, sx - 17, sy + 1, S.z + o, g, 8); wCyl(0.3, 0.3, 2, wh, sx + 17, sy + 1, S.z + o, g, 8); });
ebsSpot(sx, S.z + 96, 8, "The starting line", "run a race against the heroes", function () { ebsRaceStart(); }, sy);
var dg = new THREE.Group();
dg.position.set(sx + 70, ebsY(sx + 70, S.z), S.z);
g.add(dg);
wCyl(1.25, 1.25, 0.2, wh, 0, 0.1, 0, dg, 20);
EBS.discusAt = { x: sx + 70, z: S.z };
ebsSpot(sx + 70, S.z + 2, 3, "The discus circle", "throw the discus", function () { ebsDiscus(); }, ebsY(sx + 70, S.z));
ebsStele(g, sx + 30, sy, S.z + 110, 0, "Games in Elysium", "Aeneid 6.642-644", ["\"Some exercise their limbs in the grassy wrestling-ground, compete in sport and wrestle on the yellow sand; some dance in a ring and sing songs.\"", "Pindar says the blessed 'take delight in horses and exercises, some in draughts, some in lyres'."], sx + 30, S.z + 110);
var Hh = E.hall;
ebsTemple(g, { x: ebsEX(Hh.x), y: ebsY(ebsEX(Hh.x), Hh.z), z: Hh.z, rot: Math.PI * 0.9, w: 34, d: 48, colH: 12, nx: 8, mat: wh, colMat: wh, capMat: gold, roofMat: ebsStone("terracotta"), room: "heroes", name: "the Hall of Heroes", ionic: true, friezeFg: "#C8402A", friezeBg: "#F4ECD8", torchCol: 0xFFD080 });
var O = E.odeion, ox = ebsEX(O.x), oy = ebsY(ox, O.z);
ebsHall(g, { x: ox, y: oy, z: O.z, rot: 0, w: 32, d: 32, h: 12, mat: wh, trimMat: gold, roofMat: ebsStone("terracotta"), gable: false, room: "odeion", name: "the odeion (music hall)", colMat: wh, torchCol: 0xFFD080 });
var Tm = E.temple;
ebsTemple(g, { x: ebsEX(Tm.x), y: ebsY(ebsEX(Tm.x), Tm.z), z: Tm.z, rot: Math.PI, w: 30, d: 30, colH: 14, nx: 6, mat: wh, colMat: wh, capMat: ebsStone("silver"), roofMat: ebsStone("silver"), room: "necessity", name: "the Temple of Necessity", friezeFg: "#8AA8D8", friezeBg: "#F4F0E8", torchCol: 0xC8D8FF });
var V = E.valley, vx = ebsEX(V.x);
var lk = new THREE.Mesh(new THREE.CircleGeometry(62, 36), ebsWaterMat(0xBCCCD4, false, 0.85));
lk.rotation.x = -Math.PI / 2;
lk.position.set(vx, -19.5, V.z);
g.add(lk);
ebsCrowd(vx, V.z, V.r * 0.6, EBS.lite ? 60 : 180, ebsY, 0xF0F8FF, 0.3, 74);
var An = ebsPerson("anchises", vx + 90, V.z + 30, ebsY(vx + 90, V.z + 30), { beard: "long", hair: 0xE8E8E8, topKind: "robe", top: 0xF4F0E8, bottom: 0xF4F0E8, layer: "longcoat", layerColor: 0x6A1A2A }, -2.2);
ebsTalk(An, "Anchises", "Anchises, father of Aeneas, a Trojan prince loved by Aphrodite. In Aeneid 6.679-892 he waits in a green valley in Elysium, counting the souls who will one day be born as Romans; he explains that souls drink the water of Lethe to forget their past lives before being reborn, and shows Aeneas the parade of future heroes. Warm, fatherly, philosophical; explains the cycle of souls (a Pythagorean idea).", "They come to the river for a thousand years' forgetting, and then they go back up to live again. Look at them. Each one is a life not yet lived.");
ebsSpot(vx + 62, V.z, 8, "The river of forgetting", "watch the souls drink", function () { worldCard(worldFacts("The valley of Lethe", "Aeneid 6.703-751", [], ["\"Souls owed second bodies by fate drink the soothing water of the Lethe stream and long forgetfulness.\"", "After a thousand years, Virgil says, the god calls them in a great crowd to the river, 'so that they may revisit the vault of heaven, remembering nothing, and begin to wish to return to bodies'.", "The idea that souls are born again comes from Pythagoras and Plato. You do not drink. You want to remember this."])); }, ebsY(vx + 62, V.z));
var I = E.isle, ix = ebsEX(I.x), iy = ebsY(ix, I.z);
var sea = new THREE.Mesh(new THREE.PlaneGeometry(3800, 1200), ebsWaterMat(0x2A7AB8, false, 0.92));
sea.rotation.x = -Math.PI / 2;
sea.position.set(ebsEX(0), -1, E.sea - 600);
g.add(sea);
sea.userData.keep = 1;
var cz0 = E.sea + 40, cz1 = I.z + I.r - 20;
wBox(12, 1.6, cz0 - cz1, wh, ix, 0.6, (cz0 + cz1) / 2, g);
ebsFloor(ix, (cz0 + cz1) / 2, 12, cz0 - cz1, 1.5);
ebsTower(g, ix, iy, I.z, 14, 46, wh, gold);
ebsDoor(ix, I.z + 16, 4, "the Tower of Kronos", "kronos", iy);
for (var k = 0; k < (EBS.lite ? 12 : 30); k++) {
var R2 = wRand(7400 + k), a = R2() * 6.28, d = 40 + R2() * (I.r - 60), tx = ix + Math.cos(a) * d, tz = I.z + Math.sin(a) * d;
if (Math.abs(tx - ix) < 10 && tz > I.z)
continue;
ebsTree(R2() < 0.5 ? "laurel" : "pomegranate", g, tx, ebsY(tx, tz), tz, 1 + R2() * 0.4, 7500 + k);
}
ebsAsphodel(ix, I.z, I.r - 20, EBS.lite ? 200 : 600, ebsY, 75, 0xFFD040);
ebsStele(g, ix + 10, ebsY(ix + 10, cz0 - 10), cz0 - 10, 0, "The Isles of the Blessed", "Pindar, Olympian 2.68-80; Hesiod, Works and Days 170-173", ["\"Those who have kept their souls pure from all wrong three times on each side of death travel the road of Zeus to the tower of Kronos, where ocean breezes blow round the Isles of the Blessed, and flowers of gold blaze.\"", "Pindar names Peleus, Cadmus and Achilles among them, with Rhadamanthus as judge."], ix + 10, cz0 - 10);
ebsRoad(g, [[ax, az - 8], [ebsEX(0), 1200], [ebsEX(-100), 700], [ebsEX(0), 226], [ebsEX(0), 174], [ebsEX(-150), -200], [ebsEX(0), -700], [ix, cz0]], 7, false, 0xE8D8B0);
},
function (grp, I) {
var X = I.x, Z = I.z, wh = ebsStone("white");
ebsInRoom(grp, X, Z, 40, 48, 14, { wall: wh, floor: ebsStone("white"), ceilM: ebsStone("oak"), gaps: { s: [[20, 4]] }, fresco: "red", lamps: 0xFFE0A0 });
ebsInDoorOut(grp, X, Z + 23.6, Math.PI);
for (var k = 0; k < 12; k++) {
var sd = k < 6 ? -1 : 1, kz = Z - 18 + (k % 6) * 6.6;
ebsKline(grp, X + sd * 13, 0, kz, sd > 0 ? Math.PI / 2 : -Math.PI / 2);
ebsTable(grp, X + sd * 10.6, 0, kz, 1.2, 0.7, 0);
ebsAmphora(grp, X + sd * 10.6, 0.84, kz, 0.4, 0x141010);
}
[["Cadmus", "Cadmus, prince of Tyre, who came to Greece looking for his sister Europa, killed a dragon, sowed its teeth (armed men sprang up), founded Thebes, and brought the alphabet to the Greeks (Herodotus 5.58). Pindar puts him on the Isles of the Blessed. Courtly, scholarly, delighted to talk about letters and writing; fond of his wife Harmonia.", "Do you know your letters? I brought them over the sea from Phoenicia. Alpha, beta, gamma... Every word you read, I had a hand in."],
["Peleus", "Peleus, king of Phthia, father of Achilles, who married the sea-goddess Thetis; all the gods came to the wedding (and Eris threw the golden apple). Pindar names him among the blessed. A cheerful old warrior, proud of his son, tells of wrestling Thetis while she changed into fire, water, a lion and a serpent.", "My wife was a goddess. She turned into fire in my arms, and a lion, and water, and I held on. That is the secret of marriage, young one: hold on."],
["Musaeus", "Musaeus, the legendary singer and pupil of Orpheus; Virgil has him lead Aeneas to Anchises, 'for the great crowd circles round him, standing taller by the shoulders' (Aeneid 6.666-678). Kind, poetic, knows every path in Elysium.", "There are no fixed homes here. We live in shady groves, on soft riverbanks and in meadows fresh with streams. Come, I will show you the way."]].forEach(function (H, i) {
var P = ebsInPerson(grp, "hero" + i, X + (i - 1) * 8, Z - 20, { beard: i === 2 ? "short" : "full", hair: i === 1 ? 0xD8D8D8 : 0x4A3A2A, topKind: "robe", top: [0x6A1A4A, 0x2A3A6A, 0xE8E0C8][i], bottom: [0x6A1A4A, 0x2A3A6A, 0xE8E0C8][i], hat: "flowercrown", hatColor: 0x6A9A3A }, 0);
ebsTalk(P, H[0], H[1], H[2], 3.2);
});
ebsLessonAt(X + 16, Z + 20, "elysium");
},
function (grp, I) {
var X = I.x, Z = I.z, wh = ebsStone("white");
ebsInRoom(grp, X, Z, 30, 30, 12, { wall: wh, floor: ebsStone("white"), ceilM: ebsStone("oak"), gaps: { s: [[15, 3.4]] }, fresco: "blue", lamps: 0xFFE0A0 });
ebsInDoorOut(grp, X, Z + 14.6, Math.PI);
for (var r = 0; r < 4; r++) {
var ring = new THREE.Mesh(new THREE.TorusGeometry(6 + r * 2, 0.5, 4, 24, Math.PI), wh);
ring.rotation.x = -Math.PI / 2;
ring.rotation.z = Math.PI;
ring.position.set(X, 0.3 + r * 0.5, Z);
grp.add(ring);
}
var Or = ebsInPerson(grp, "orpheus_e", X, Z - 6, { hair: 0x6A3A1A, hairStyle: "curly", beard: "short", topKind: "robe", top: 0xF4F0E8, bottom: 0xF4F0E8, layer: "longcoat", layerColor: 0x6A2A5A, hat: "flowercrown", hatColor: 0x6A9A3A }, 0);
ebsTalk(Or, "Orpheus, in Elysium", "Orpheus as he is in Elysium (Virgil, Aeneid 6.645-647: 'the Thracian priest in his long robe accompanies the dance with the seven notes of his lyre'); here at last he has found Eurydice again, in Ovid's ending (Metamorphoses 11.61-66), and they walk together and he may look back at her as often as he likes. Joyful, musical, kind; offers to teach the visitor his tune.", "Here I may look back at her as much as I like. Come, sit. I will teach you the tune that softened Hades.", 3.4, function () { ebsLyrePlay(true); });
var Eu = ebsInPerson(grp, "eurydice_e", X + 2, Z - 6.4, { sex: "f", hair: 0xC89A5A, hairStyle: "long", topKind: "dress", top: 0xF8F8FF, bottom: 0xF8F8FF, hat: "flowercrown", hatColor: 0xE8E0F8 }, -0.3);
for (var s = 0; s < (EBS.lite ? 4 : 10); s++) {
var R = wRand(7600 + s), a = Math.PI * (0.1 + R() * 0.8);
var Sd = ebsInPerson(grp, "aud" + s, X + Math.cos(a) * (6 + Math.floor(R() * 4) * 2), Z + Math.sin(a) * (6 + Math.floor(R() * 4) * 2) * 0.9, { sex: R() < 0.5 ? "f" : "m", topKind: "robe", top: 0xF0E8D8, bottom: 0xF0E8D8, hat: "flowercrown", hatColor: 0x6A9A3A }, Math.PI - a, 0xFFF4E0);
}
},
function (grp, I) {
var X = I.x, Z = I.z, wh = ebsStone("white");
ebsInRoom(grp, X, Z, 30, 30, 16, { wall: wh, floor: ebsStone("white"), ceilM: ebsStone("dark"), gaps: { s: [[15, 3.4]] }, lamps: 0xC8D8FF });
ebsInDoorOut(grp, X, Z + 14.6, Math.PI);
ebsThrone(grp, X, 0, Z - 10, 0, 2, wh, ebsStone("silver"));
var Nc = ebsInPerson(grp, "ananke", X, Z - 9.6, { sex: "f", hair: 0xD8D8D8, hairStyle: "long", topKind: "robe", top: 0xE8E8F0, bottom: 0xE8E8F0, hat: "hood", hatColor: 0xE8E8F0 }, 0);
Nc.g.scale.setScalar(1.6);
Nc.g.position.y = 1;
var sp = new THREE.Group();
sp.position.set(X, 6, Z - 6);
sp.userData.keep = 1;
grp.add(sp);
EBS.spindle = sp;
wCyl(0.06, 0.06, 10, ebsStone("silver"), 0, 0, 0, sp, 6);
var cols = [0xE8E0D0, 0xC8A050, 0xF0E8C8, 0xE8D888, 0xD8B860, 0xF4F4F8, 0xC84A2A, 0xF0E0B0];
for (var w = 0; w < 8; w++) {
var ring = new THREE.Mesh(new THREE.TorusGeometry(1 + w * 0.55, 0.12, 5, 32), ebsGlowM(cols[w], 0.85));
ring.rotation.x = Math.PI / 2;
ring.userData.spin = (w % 2 ? 1 : -1) * (0.2 + w * 0.05);
sp.add(ring);
}
ebsLightSrc(X, 6, Z - 6, 0xE8E8FF, 1.4, 30, false);
ebsSpot(X, Z - 2, 4, "The Spindle of Necessity", "choose your next life", function () { ebsEr(); }, 0);
ebsLessonAt(X + 12, Z + 12, "er");
},
function (grp, I) {
var X = I.x, Z = I.z, wh = ebsStone("white"), gold = ebsStone("gold");
ebsInRoom(grp, X, Z, 24, 20, 14, { wall: wh, floor: ebsStone("white"), ceilM: gold, gaps: { s: [[12, 3.4]] }, fresco: "gold", lamps: 0xFFE0A0 });
ebsInDoorOut(grp, X, Z + 9.6, Math.PI);
ebsThrone(grp, X, 0, Z - 7, 0, 1.8, gold, wh);
var Kr = ebsInPerson(grp, "kronos_e", X, Z - 6.6, { beard: "long", hair: 0xE8E8E8, topKind: "robe", top: 0xE8D8A0, bottom: 0xE8D8A0, hat: "crown", hatColor: 0xD8B04A }, 0);
Kr.g.position.y = 0.6;
wCyl(0.04, 0.04, 1.6, gold, 0.4, 0.9, 0.2, Kr.g, 5);
var sk = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.04, 4, 10, Math.PI), gold);
sk.position.set(0.4, 1.7, 0.2);
Kr.g.add(sk);
ebsTalk(Kr, "Kronos, king of the Blessed", "Kronos, the Titan who ruled in the Golden Age when men lived like gods, without toil or old age (Hesiod, Works and Days 109-120). He swallowed his children and was overthrown by Zeus; in Pindar and Hesiod's Works and Days, Zeus later set him free to rule the Isles of the Blessed. Mellow now, wistful, gentle; carries his sickle; talks of the Golden Age and of time.", "In my day, nobody worked and nobody grew old. Then I was sent below. Now I am here, and it is a little like my day again. Sit; there is honey.", 3.4);
ebsLook(X - 9, Z + 5, 2.6, "The Golden Age", "Hesiod, Works and Days 109-126", ["\"First the immortals made a golden race of mortal men, who lived in the time of Kronos when he was king in heaven. They lived like gods, without sorrow of heart, without toil or grief; miserable old age did not come on them... The fruitful earth bore fruit for them of itself.\""]);
},
function (G) {
var g = ebsDistrict(G, EBS_PATH_X, 0, 600, true), X = EBS_PATH_X;
for (var i = 0; i < EBS_OP.length - 1; i++) {
var a = EBS_OP[i], b = EBS_OP[i + 1], len = Math.hypot(b[0] - a[0], b[1] - a[1]);
for (var k = 0; k < len / 30; k++) {
var t = k * 30 / len, px = X + a[0] + (b[0] - a[0]) * t, pz = a[1] + (b[1] - a[1]) * t, py = ebsY(px, pz);
[-1, 1].forEach(function (s) { ebsRock(g, px + s * (8 + wRand(i * 31 + k)() * 4), py + 4, pz, 6 + wRand(i * 17 + k)() * 4, 9000 + i * 40 + k + (s > 0 ? 20 : 0), ebsStone("cave")); });
}
}
var top = EBS_OP[EBS_OP.length - 1], ly = ebsY(X + top[0], top[1]);
var gl = wGlow(0xFFFFFF, 80, 0.9);
gl.position.set(X + top[0], ly + 10, top[1] - 30);
g.add(gl);
var ws = new THREE.Mesh(new THREE.CircleGeometry(10, 20), ebsGlowM(0xFFFFF0, 1));
ws.position.set(X + top[0], ly + 6, top[1] - 12);
g.add(ws);
EBS.orphTop = { x: X + top[0], z: top[1] };
},
function () {
worldCard(worldFacts("The gate of Tartarus", "Danger: Deadly (4)", [], ["Through here is Tartarus, the deepest pit, where the Titans are chained and the great sinners are punished. Furies, hungry shades and the Hydra hunt there, and they will attack you. If you fall, you lose any relics you carry.", "Hesiod says a bronze anvil would fall nine days and nights to reach it."]), [["Go through", function () { worldCard(null); ebsMove(ebsTX(EBS_TT.arrive.x), EBS_TT.arrive.z, Math.PI, "🔥 <b>You fall a long, long way...</b> and land on the burning plain of Tartarus. Danger: Deadly. Stay on your guard."); }], ["Not now", function () { worldCard(null); }]]);
},
function () {
var D = ebsData();
if (!ebsKeeper() && !D.judged) {
worldCard(worldFacts("The gate of Elysium", "shut to you, for now", [], ["The light beyond the arch is warm and golden, but you cannot pass: only those judged worthy go into Elysium.", "Go back to the Hall of Judgement at the Crossroads, stand on the bronze disc, and answer the judges. (Aeneas had the golden bough; most need a verdict.)"]));
return;
}
ebsMove(ebsEX(EBS_EL.arrive.x), EBS_EL.arrive.z + 60, Math.PI, "🌞 <b>Elysium.</b> 'They have their own sun here, and their own stars.' Golden flowers, laurel groves, the blessed at their games.");
},
function (kind) {
var P = EBS_PAY[kind], R = EBS.rules && EBS.rules[kind], gold = R && R.gold !== undefined ? R.gold : (P ? P[1] : 0);
if (R && R.on === false)
return "The Keeper has closed the purse for this one just now (the keepsake still comes).";
return "Grown-up dreamers who pay their dues get <b>" + gold + " gold</b> for this, once a day (150 a day at most in Erebos), and a keepsake for the 🎒 Backpack.";
},
function (kind, say) {
var K = EBS_KEEP[kind];
if (K)
ebsKeep(K[2], K[1], EBS_PAY[kind] ? EBS_PAY[kind][0] : "");
var d = ebsData();
d.done[kind] = (d.done[kind] || 0) + 1;
ebsSave();
var tail = K ? " <b>" + esc(K[2] + " " + K[1]) + "</b> is in your 🎒 Backpack." : "";
if (EBS.busy || !ebsSignedIn()) {
setStatus(say + tail);
return;
}
EBS.busy = true;
cityRpc("erebos_done", { p_kind: kind }).then(function (o) { EBS.busy = false; setStatus(say + tail + (o && o.say ? " " + esc(o.say) : "") + (o && o.gold ? " <b>+" + o.gold + " gold</b> from the Treasury." : "")); })
.catch(function () { EBS.busy = false; setStatus(say + tail); });
},
function () { if (!ebsSignedIn())
return; cityRpc("erebos_state", {}).then(function (o) { if (o && o.ok !== false) {
EBS.state = o;
var R = {}, off = o.off || [];
Object.keys(EBS_PAY).forEach(function (k) { R[k] = { on: o.on !== false && off.indexOf(k) < 0, gold: o.gold && o.gold[k] !== undefined ? +o.gold[k] : EBS_PAY[k][1] }; });
EBS.rules = R;
} }).catch(function () { }); },
function (f, dur, type, vol, when) {
var A = ebsAudio();
if (!A)
return;
try {
if (A.state === "suspended")
A.resume();
var t = A.currentTime + (when || 0), o = A.createOscillator(), g = A.createGain();
o.type = type || "triangle";
o.frequency.setValueAtTime(f, t);
g.gain.setValueAtTime(0.0001, t);
g.gain.exponentialRampToValueAtTime(vol || 0.18, t + 0.01);
g.gain.exponentialRampToValueAtTime(0.0001, t + (dur || 0.6));
o.connect(g);
g.connect(A.destination);
o.start(t);
o.stop(t + (dur || 0.6) + 0.05);
}
catch (e) { }
},
function () {
var d = ebsData();
ebsChoose("🔥 The Sibyl of Cumae", ["\"Easy is the way down. You have come down it; now the work begins.\"", "\"Charon will want his obol. The dog at the gate will want something, too: I give him honey cake with a sleeping draught in it. Or play him a tune. Or wrestle him, if you are Heracles.\"", "\"Aeneas carried a golden bough to show he was meant to be here. It grows somewhere in the Grove of Persephone, west across the shore, and only one may carry it at a time.\""], [[d.obol ? "🪙 I have an obol already" : "🪙 Ask for an obol for the ferryman", function () { if (!d.obol) {
d.obol = 1;
ebsSave();
} worldCard(null); setStatus("🪙 The Sibyl presses a small silver <b>obol</b> into your hand. Charon is down the road, at the river."); }],
[d.honey ? "🍯 I have a honey cake already" : "🍯 Ask for a honey cake for Cerberus", function () { if (!d.honey) {
d.honey = 1;
ebsSave();
} worldCard(null); setStatus("🍯 The Sibyl gives you a <b>honey cake</b>, sticky and smelling of poppies. Cerberus guards the gate beyond the river."); }],
["📜 Tell me about this place", function () { ebsLookoutCard(); }], ["Thank you", function () { worldCard(null); }]]);
},
function () {
worldCard(null);
(EBS.monsters || []).forEach(function (M) { M.flick = 1.2; });
ebsTone(320, 0.3, "sawtooth", 0.08);
setStatus("⚔️ You draw on the shapes of monsters, and your blade passes straight through them like smoke. <b>The Sibyl catches your arm:</b> 'They are empty, thin lives without bodies, flitting under a hollow image of form' (Aeneid 6.290-294).");
},
function () {
worldCard(worldFacts("The underworld, from above", "Erebos: the Greek kingdom of the dead", [], ["South: the long stair down, the Vestibule with the Elm of False Dreams, the Iron Chambers of the Furies, and the shore of the Acheron where Charon keeps his ferry. Safe.", "Beyond the river: the Gate of Hades and Cerberus; the Fields of Mourning; the Crossroads, where the judges sit; the Asphodel Meadow; the Palace of Hades and Persephone. Safe.", "West: the Pools of Forgetfulness and Memory, the house of Styx and her falls, and the burning Phlegethon round the walls of Tartarus. The banks of fire and the walls are Dangerous (3). Inside Tartarus it is Deadly (4).", "East: the House of Night with Atlas, the Cave of Sleep, the Gates of Horn and Ivory, and the golden gate of Elysium, for those judged worthy. Safe.", "Up the cave behind you: Cape Taenarum, in the sunlight."]));
},
function () {
var c = worldLocal(), south = c.z > 2300;
ebsChoose("⛵ Charon", ["A terrible old ferryman, filthy, a grey beard tangled on his chin, his eyes like flames (Virgil). He leans on his pole and holds out a bony hand.", "\"Living. I do not take the living. Not without the coin. Not without leave.\""], [[south ? "🪙 Pay the obol and cross" : "⛵ Cross back over", function () { ebsFerry(south ? 1 : -1); }], ["What is this river?", function () { worldCard(worldFacts("The Acheron", "the river of woe", [], ["One of the five rivers of the underworld. Homer says the Pyriphlegethon and the Cocytus flow into it.", "Charon ferries only the buried dead. The unburied wander the bank for a hundred years.", "There is a real Acheron in north-west Greece, with a famous oracle of the dead (the Necromanteion) beside it."])); }], ["Never mind", function () { worldCard(null); }]]);
},
function (dir) {
if (EBS.cine)
return;
var d = ebsData(), keeper = ebsKeeper(), bough = ebsHasBough();
if (dir > 0 && !keeper && !d.obol && !bough) {
ebsChoose("⛵ Charon", ["He looks at your empty hand and turns away. \"No coin, no crossing.\"", "(The Sibyl, at the Vestibule up the road, will give you an obol. So will the priest at Cape Taenarum.)"], [["All right", function () { worldCard(null); }]]);
return;
}
worldCard(null);
var paid = false;
if (dir > 0 && !keeper) {
if (bough)
setStatus("🌿 You lift the <b>golden bough</b>. Charon stares at it a long moment, and lets you aboard without a word. (Virgil: 'he wondered at the sacred gift of the fated branch, so long unseen'.)");
else {
d.obol = 0;
ebsSave();
paid = true;
}
}
var z0 = dir > 0 ? 2341 : 2262, z1 = dir > 0 ? 2262 : 2341;
EBS.cine = { k: "ferry", t: 0, dur: EBS.lite ? 12 : 18, z0: z0, z1: z1, dir: dir, paid: paid };
if (EBS.boat) {
EBS.boat.g.position.z = z0;
EBS.boat.g.rotation.y = dir > 0 ? 0 : Math.PI;
}
ebsMove(0, z0, dir > 0 ? 0 : Math.PI, "⛵ <b>Charon pushes off.</b> The boat sinks low in the water under a living weight; the pole creaks; mist on the grey river.", 0.4);
},
function (C, dt) {
C.t += dt;
var k = Math.min(1, C.t / C.dur), e = k * k * (3 - 2 * k), z = C.z0 + (C.z1 - C.z0) * e, B = EBS.boat;
if (B) {
B.g.position.z = z;
B.g.position.y = -2.4 + Math.sin(C.t * 1.6) * 0.06;
if (B.ch)
B.ch.rotation.x = Math.sin(C.t * 1.4) * 0.15;
if (B.lsrc) {
B.lsrc.z = z + 4;
}
}
camera.position.set(EBS.base + 0, 1.72 - 0.2 + Math.sin(C.t * 1.6) * 0.06, z + (C.dir > 0 ? 1.2 : -1.2));
if (Math.random() < dt * 0.4)
ebsTone(80 + Math.random() * 30, 0.5, "sine", 0.04);
if (k >= 1) {
EBS.cine = null;
var lz = C.dir > 0 ? 2246 : 2356;
camera.position.set(EBS.base, 1.05 + 1.72, lz);
if (C.dir > 0)
ebsReward("ferry", "⛵ <b>Across the Acheron.</b> " + (C.paid ? "Charon takes the obol from your hand. " : "") + "The Gate of Hades is ahead, and something with three heads is lying in front of it.");
else
setStatus("⛵ <b>Back on the near shore.</b>");
}
},
function () {
var d = ebsData();
if (d.passed || ebsKeeper()) {
if (EBS.cerb)
ebsSolidOff(EBS.cerb.block);
ebsChoose("🐕 Cerberus", ["He thumps his serpent tail on the ground and all three heads watch you pass. Hesiod: he fawns on all who come in, but lets nobody out again.", "(You have passed him. The gate is open to you.)"], [["Pat the middle head", function () { worldCard(null); ebsGrowl(); setStatus("🐕 The middle head allows it. The left head growls. The right head licks your ear."); }], ["Go on", function () { worldCard(null); }]]);
return;
}
ebsGrowl();
ebsChoose("🐕 Cerberus", ["Three heads, a mane of snakes, a serpent for a tail, and a growl like an earthquake. He lies across the gate. Nobody gets by without getting past him first.", "Three ways have worked before:"], [[d.honey ? "🍯 Throw him the Sibyl's honey cake" : "🍯 Throw a honey cake (the Sibyl has them)", function () { if (!d.honey) {
worldCard(null);
setStatus("🍯 You have no honey cake. Go back over the river to the Sibyl at the Vestibule.");
return;
} d.honey = 0; ebsSave(); ebsCerbPass("honey", "🍯 <b>All three heads snap at the honey cake.</b> The draught in it works quickly: he slumps across the threshold, snoring, and you step over him, as Aeneas did (Aeneid 6.417-423)."); }],
["🎵 Play him Orpheus's tune", function () { ebsLyrePlay(false, function () { ebsCerbPass("lyre", "🎵 <b>The music reaches him.</b> One head lies down, then the next, then the third. His tail stops lashing. He lets you by, as he let Orpheus by."); }); }],
["💪 Wrestle him bare-handed (in his den)", function () { worldCard(null); setStatus("💪 Heracles mastered him without weapons. His den is a cave in the black rocks just east of the gate: go in and try the twelfth labour."); }],
["Back away slowly", function () { worldCard(null); }]]);
},
function () {
var S = { n: 0, miss: 0 };
function round() {
var heads = ["left", "middle", "right"], h = Math.floor(Math.random() * 3), until = Date.now() + (EBS.lite ? 1800 : 1500);
ebsGrowl();
ebsChoose("💪 The twelfth labour", ["Round " + (S.n + 1) + " of 3. <b>The " + heads[h] + " head lunges!</b> Grip it, quick!"], heads.map(function (n, i) { return ["Grip the " + n + " head", function () { if (i === h && Date.now() < until) {
S.n++;
ebsTone(300 + S.n * 80, 0.2, "square", 0.08);
if (S.n >= 3)
win();
else
round();
}
else {
S.miss++;
ebsChoose("💪 The twelfth labour", [i === h ? "Too slow! He shakes you off and sits on you." : "Wrong head! The " + heads[h] + " one gets you by the sleeve.", "Cerberus licks your face, very pleased with himself."], [["Try again", function () { S.n = 0; round(); }], ["Give up for now", function () { worldCard(null); }]]);
} }]; }));
}
function win() { ebsCerbPass("labour", "💪 <b>You have him!</b> Gripping his throats as Heracles did, you hold on while the serpent tail lashes, until all three heads go quiet. He follows you to the gate meek as a puppy. The twelfth labour."); }
ebsChoose("💪 The twelfth labour", ["Hades told Heracles he could take the dog if he mastered him without weapons. Three rounds: when a head lunges, grip that head, fast.", ebsPayLine("labour")], [["Begin", round], ["Not now", function () { worldCard(null); }]]);
},
function (teach, onWin) {
var tune = EBS_TUNE, played = [], d = ebsData();
function card(msg) {
var h = EBS_H + "🎵 Orpheus's lyre</div><div style='opacity:.9;margin:6px 0;line-height:1.45'>" + msg + "</div><div style='margin:6px 0'>Played: " + (played.length ? played.map(function (n) { return "♪" + n; }).join(" ") : "(nothing yet)") + "</div>", fns = {};
h += worldBtn("listen", "👂 Listen to the tune", "");
fns.listen = function () { tune.forEach(function (n, i) { ebsPluck(EBS_LYRE[n - 1], i * 0.55); }); };
for (var s = 1; s <= 7; s++)
(function (s) {
h += worldBtn("s" + s, "String " + s, "");
fns["s" + s] = function () {
ebsPluck(EBS_LYRE[s - 1]);
played.push(s);
var i = played.length - 1;
if (played[i] !== tune[i]) {
played = [];
card("That note jars. Start again: listen, then play the five notes in order.");
return;
}
if (played.length === tune.length) {
d.tune = 1;
ebsSave();
worldCard(null);
if (onWin)
onWin();
else
setStatus("🎵 <b>You play Orpheus's tune.</b> Even here the shades stop to listen. " + (teach ? "Orpheus claps. 'Now you could charm the dog himself.'" : "Cerberus would like that."));
return;
}
card("Good. Keep going.");
};
})(s);
h += worldBtn("x", "Stop", "");
fns.x = function () { worldCard(null); };
worldCard(h, fns);
}
card((d.tune ? "You know this tune. " : "") + "Orpheus's tune is five notes. Press <b>Listen</b>, then play it back on the strings, in order." + (onWin ? " " + ebsPayLine("lyre") : ""));
},
function () {
var d = ebsData(), pick = ebsShuffle(EBS_JUDGE.map(function (q, i) { return i; })).slice(0, 3), S = { i: 0, ok: 0 };
function q() { if (S.i >= 3) {
done();
return;
} var Q = EBS_JUDGE[pick[S.i]]; ebsAsk("⚖️ Question " + (S.i + 1) + " of 3", Q[0], Q[1], Q[2], function () { S.ok++; S.i++; q(); }, function () { S.i++; q(); }); }
function done() {
if (S.ok >= 3) {
d.judged = 1;
ebsSave();
worldCard(null);
ebsTone(523, 0.6, "sine", 0.12);
ebsTone(659, 0.6, "sine", 0.12, 0.2);
ebsTone(784, 0.9, "sine", 0.12, 0.4);
ebsReward("judge", "⚖️ <b>Minos lifts his golden sceptre: the right-hand road.</b> A token is fastened on your chest. The golden gate of Elysium, far to the east along the right-hand road, will open for you.");
}
else
ebsChoose("⚖️ The verdict", ["Minos and Rhadamanthus confer. \"Not wicked. Not yet wise. The Meadow of Asphodel, for now.\" (" + S.ok + " of 3.)", "You may stand before them again whenever you like."], [["Try again", function () { ebsJudge(); }], ["Later", function () { worldCard(null); }]]);
}
ebsChoose("⚖️ The Hall of Judgement", ["Stand on the bronze disc. The judges will ask three questions. Answer all three well and you are judged worthy of Elysium.", d.judged ? "<b>You have already been judged worthy.</b>" : "", ebsPayLine("judge")], [["Be judged", q], ["Not yet", function () { worldCard(null); }]]);
},
function () {
var steps = [
["The Furies circle you. \"Orestes killed his mother to avenge his father. Blood for blood! He is ours!\" What do you say?", ["Let the case be heard before a court, with a jury", "Hand him to the Furies", "Set him free, no questions"], 0, "\"A court?\" Alecto's snakes hiss. But she does not say no."],
["Apollo says he ordered it; the Furies say the old law is blood for blood. Who should decide?", ["Citizens on oath, hearing both sides", "Whoever is strongest", "The one who shouts loudest"], 0, "Athena smiles: twelve citizens of Athens take their seats on the Areopagus."],
["The votes are equal. The Furies are furious; they threaten to blight the land. What should Athena offer them?", ["Honour and a home in Athens, as protectors of justice", "Nothing: drive them out", "A bigger whip"], 0, "The Furies fall silent... and accept. They will be the Eumenides, the Kindly Ones."]
], S = { i: 0 };
function step() {
if (S.i >= steps.length) {
worldCard(null);
ebsReward("furies", "🔥 <b>The Furies are made kindly.</b> As in Aeschylus's Eumenides, revenge gives way to a court and a jury: the first trial by jury in the stories of the Greeks.");
return;
}
var St = steps[S.i];
ebsAsk("⛓️ The trial (" + (S.i + 1) + " of 3)", St[0], St[1], St[2], function () { setStatus(St[3]); S.i++; step(); }, function () { ebsChoose("⛓️ The trial", ["Megaera laughs. \"That is how the endless killing goes on.\" Think again: what would break the chain of revenge?"], [["Try again", function () { S.i = 0; step(); }], ["Leave", function () { worldCard(null); }]]); });
}
ebsChoose("⛓️ Stand trial before the Furies", ["You take Athena's part in the oldest trial of all: Orestes, hunted by the Furies (Aeschylus, Oresteia, 458 BC).", ebsPayLine("furies")], [["Begin", step], ["Not now", function () { worldCard(null); }]]);
},
function (kind) {
var d = ebsData();
if (kind === "lethe") {
ebsChoose("💧 The pool by the white cypress", ["The water is pale and very still. Shades crowd round it, drinking, and their faces go smooth and blank.", "The gold tablets say: do not go near this spring."], [["Drink", function () { worldCard(null); setStatus("💧 You cup the water... and for a long, strange moment cannot remember your own name, or why you came. It comes back slowly. (That was the Lethe: Forgetfulness. Better not to again.)"); }], ["Step away", function () { worldCard(null); }]]);
return;
}
ebsAsk("💧 The guardian of the spring", "\"What are you seeking, in the darkness of misty Hades?\"", ["\"I am a child of Earth and starry Sky; I am parched with thirst: give me cold water from the Lake of Memory.\"", "\"Just a drink, please.\"", "\"Let me pass or I'll fight you.\""], 0, function () {
d.memory = 1;
ebsSave();
worldCard(null);
ebsTone(880, 0.8, "sine", 0.1);
ebsReward("springs", "💧 <b>The guardians step aside.</b> You drink from the Lake of Memory: cold and clear, and everything you have ever learned is bright in you. (The words come from the Orphic gold tablets, buried with the dead 2,400 years ago.)");
}, function () { ebsChoose("💧 The guardian", ["The guardian does not move. \"That is not the answer.\"", "(The words are written on the stone beside the pool.)"], [["Try again", function () { ebsSpring("memory"); }], ["Leave", function () { worldCard(null); }]]); }, [ebsPayLine("springs")]);
},
function () { ebsChoose("🎵 Orpheus", ["\"Walk the path up to the light. Eurydice will follow behind you; you will hear her steps. You must not look back. Not once. Not even if she calls.\"", "(Keep facing up the path. Turning round, even a little too far, ends it.)", ebsPayLine("orpheus")], [["Walk the path", function () { worldCard(null); ebsOrpheusStart(); }], ["Not now", function () { worldCard(null); }]]); },
function () {
var a = EBS_OP[0];
ebsMove(EBS_PATH_X + a[0], a[1], 0, "🎵 <b>The steep path.</b> Dark, narrow, climbing. Behind you, soft steps. <b>Do not look back.</b>", null, { fn: function () {
if (!EBS.eury) {
var P = ebsPerson("eurywalk", EBS_PATH_X, a[1] + 6, ebsY(EBS_PATH_X, a[1] + 6), { sex: "f", look: { hair: 0xC89A5A, hairStyle: "long", topKind: "dress", top: 0xE8F0F8, bottom: 0xE8F0F8 } }, 0);
ebsShadeify(P.g, 0xD8E8FF, 0.5);
EBS.eury = P;
}
EBS.eury.g.visible = true;
EBS.run = { k: "orpheus", t: 0, said: 0 };
} });
},
function (R, dt) {
var c = worldLocal(), E = EBS.eury;
R.t += dt;
if (ebsRegion(c.x) !== "path") {
EBS.run = null;
if (E)
E.g.visible = false;
return;
}
if (E) {
var bx = c.x - Math.sin(yaw) * 0 + 0, bz = c.z + 6;
E.g.position.x += (c.x - E.g.position.x) * Math.min(1, dt * 2);
E.g.position.z += (bz - E.g.position.z) * Math.min(1, dt * 2);
E.g.position.y = ebsY(E.g.position.x, E.g.position.z);
E.g.rotation.y = Math.PI;
}
if (R.t > R.said + 9) {
R.said = R.t;
var w = ["(Behind you: \"Are you still there? I can't hear your steps.\")", "(Behind you, a soft stumble, and a gasp.)", "(\"Won't you even look at me?\")", "(Silence behind you. Are her steps still there?)"];
setStatus("🎵 <i>" + w[Math.floor(Math.random() * w.length)] + "</i> <b>Don't look back.</b>");
}
var a = Math.atan2(Math.sin(yaw), Math.cos(yaw));
if (Math.abs(a) > 1.75) {
EBS.run = null;
if (E)
E.g.visible = false;
ebsTone(220, 1.2, "sine", 0.1);
ebsChoose("🎵 You looked back", ["She is there, just behind you, and as you see her she is already slipping away, back down into the dark. \"Farewell,\" she says, \"farewell.\" (Ovid: 'what could she complain of, except that she was loved?')"], [["Try again", function () { worldCard(null); ebsOrpheusStart(); }], ["Go back down", function () { worldCard(null); ebsMove(EBS_AT.orph.x + 4, EBS_AT.orph.z + 8, Math.PI); }]]);
return;
}
if (c.z < EBS_OP[EBS_OP.length - 1][1] + 30) {
EBS.run = null;
ebsTone(523, 0.5, "sine", 0.12);
ebsTone(784, 1, "sine", 0.12, 0.25);
ebsReward("orpheus", "☀️ <b>You reach the light, and only then turn round.</b> Eurydice steps out after you, blinking, real, laughing. You did what Orpheus could not.");
setTimeout(function () { if (E)
E.g.visible = false; ebsMove(EBS_AT.orph.x + 4, EBS_AT.orph.z + 8, Math.PI, "Back by Orpheus, who weeps for joy that someone managed it."); }, 4000);
}
},
function () {
var oaths = ["to write in my dream journal every morning this week", "to be kind to someone who is having a hard day", "to keep a promise I have been putting off", "to learn the names of three new stars", "to tell the truth, even when it is awkward"];
ebsChoose("💧 An oath by the Styx", ["The gods swore their unbreakable oaths by this water. You may swear one too; only you will know if you keep it."].concat([]), oaths.map(function (o) { return ["I swear " + o, function () { var d = ebsData(); d.oath = o; ebsSave(); worldCard(null); ebsTone(196, 1.5, "sine", 0.12); setStatus("💧 You pour a little of the cold water and swear <b>" + esc(o) + "</b>. The water is so cold it aches. Styx nods once. (Your oath is noted in your 🎒 Backpack.)"); }]; }).concat([["Swear nothing", function () { worldCard(null); }]]));
},
function () {
var S = { p: 0 };
function card() {
var bar = "<div style='height:12px;background:#2A1A14;border-radius:6px;overflow:hidden;margin:8px 0'><div style='height:100%;width:" + Math.round(S.p) + "%;background:#C86A3A'></div></div>";
var h = EBS_H + "🪨 Push the stone</div><div style='opacity:.9;margin:6px 0'>Push! Each push moves it a little up the hill. Sisyphus pushes beside you.</div>" + bar, fns = {};
h += worldBtn("p", "💪 Push!", "");
fns.p = function () {
S.p = Math.min(100, S.p + (EBS.lite ? 9 : 7) + Math.random() * 4);
ebsTone(110, 0.12, "square", 0.05);
if (EBS.sisStone)
EBS.sisStone.t = S.p / 100;
if (S.p >= 100) {
worldCard(null);
if (EBS.sisStone)
EBS.sisStone.roll = 1;
ebsTone(70, 2, "sawtooth", 0.08);
ebsReward("sisyphus", "🪨 <b>The top! For one moment it balances...</b> and then its weight turns it, and it thunders back down to the plain. Sisyphus sighs, and walks down after it. (Albert Camus: 'One must imagine Sisyphus happy.')");
return;
}
card();
};
h += worldBtn("x", "Let go", "");
fns.x = function () { worldCard(null); if (EBS.sisStone)
EBS.sisStone.roll = 1; };
worldCard(h, fns);
}
card();
},
function () { ebsChoose("🍐 Tantalus", ["He stands up to his chin in water, fruit hanging just over his head."], [["Hand him a pear", function () { worldCard(null); setStatus("🍐 You reach for a pear, and a gust tosses the branch up out of reach, just as Homer said. It drops back the moment you stop trying."); }], ["Cup some water for him", function () { worldCard(null); setStatus("💧 You scoop up water, and it drains away through the black earth before your hands reach him. 'Tantalising', we still say."); }], ["Leave him", function () { worldCard(null); }]]); },
function () {
var S = { w: 0, n: 0 };
function card() {
var h = EBS_H + "🏺 Fill the great jar</div><div style='opacity:.9;margin:6px 0'>Carry water from the fountain and pour it in. Water in the jar: <b>" + Math.round(S.w) + "%</b></div>", fns = {};
h += worldBtn("c", "🏺 Carry a jar of water", "");
fns.c = function () {
S.n++;
S.w = Math.max(0, S.w + 12 - Math.random() * 4);
ebsTone(400, 0.2, "sine", 0.05);
setTimeout(function () { S.w = Math.max(0, S.w - 10); }, 600);
if (S.n >= 8) {
worldCard(null);
setStatus("🏺 Eight jars, and the great jar is as empty as when you started: it has no bottom, and your jar leaks too. The daughters of Danaus smile sadly and go on carrying. Plato used them as a picture of a greedy soul: however much you pour in, it is never full.");
return;
}
card();
};
h += worldBtn("x", "Put the jar down", "");
fns.x = function () { worldCard(null); };
worldCard(h, fns);
}
card();
},
function () {
var H = EBS.hydra;
if (!H)
return;
if (H.B && DGB.on.indexOf(H.B) > -1) {
setStatus("🐍 The Hydra is already awake! Strike (<b>E</b>/<b>F</b>, or <b>Strike</b> on a phone).");
return;
}
if (H.restT > 0) {
setStatus("🐍 The Hydra is sleeping off the last fight. Come back in a little while.");
return;
}
ebsChoose("🐍 The Hydra", ["Nine necks coil in the pit, each head as long as a horse. She is the strongest thing in Tartarus. Your abilities, charms and strikes all hurt her; so does everyone else's. If she beats you, you lose any relics you carry.", ebsPayLine("hydra")], [["Wake her", function () { worldCard(null); ebsHydraSpawn(); }], ["Leave her sleeping", function () { worldCard(null); }]]);
},
function () {
var H = EBS.hydra, K = typeof DGB_KINDS !== "undefined" ? DGB_KINDS.ebs_hydra : null;
if (!H || !K || typeof DGB === "undefined")
return;
var seq = ++DGB.seq, B = { id: seq, kind: "ebs_hydra", k: K, g: H.g, x: H.x, z: H.z, y: H.y, yaw: 0, hp: K.hp, max: K.hp, st: "come", t: 0, cool: 1.5, wind: 0, wob: 0, wg: EBS.G, leaveT: 0, ebs: 1 };
DGB.on.push(B);
H.B = B;
H.rage = 1;
DGB.force = true;
ebsGrowl();
ebsTone(60, 1.6, "sawtooth", 0.12, 0.3);
setStatus("🐍 <b>The Hydra wakes!</b> Nine heads rise hissing out of the pit. Strike (<b>E</b> or <b>F</b>, the headset's trigger, or <b>Strike</b> on a phone), use your abilities, call your friends.");
},
function (dt) {
var H = EBS.hydra;
if (!H)
return;
if (H.restT > 0)
H.restT -= dt;
if (H.B) {
var B = H.B;
if (DGB.on.indexOf(B) < 0 || B.st === "dead") {
var won = B.hp <= 0;
if (B.st === "dead" && DGB.on.indexOf(B) > -1)
return;
H.B = null;
H.rage = 0;
DGB.force = false;
if (!H.g.parent)
EBS.G.add(H.g);
H.g.position.set(H.x, H.y, H.z);
H.g.visible = true;
if (won) {
H.restT = 300;
ebsReward("hydra", "🐍 <b>The Hydra of Tartarus falls!</b> The heads sink back into the pit, one by one. She will rise again in a while; she always does.");
}
}
}
ebsHydraTick(H.g, dt, H.rage);
},
function () {
var S = EBS_EL.stadium, sx = EBS_ELY_X + S.x;
ebsChoose("🏃 The Elysian footrace", ["One length of the stadium (a stade, about 190 metres) against the swift shades. Start at this line and run to the far one; you have 40 seconds.", ebsPayLine("race")], [["Ready... go!", function () {
worldCard(null);
EBS.run = { k: "race", t: 0, z1: S.z - 96, sx: sx };
ebsTone(660, 0.3, "square", 0.1);
if (!EBS.racers) {
EBS.racers = [];
for (var i = 0; i < 3; i++) {
var P = ebsPerson("racer" + i, sx - 10 + i * 10, S.z + 94, ebsY(sx, S.z), { sex: i === 1 ? "f" : "m", look: { topKind: "robe", top: 0xF0E8D8, bottom: 0xF0E8D8, hat: "flowercrown", hatColor: 0x6A9A3A } }, Math.PI);
ebsShadeify(P.g, 0xFFF4E0, 0.7);
EBS.racers.push({ P: P, v: 4.4 + i * 0.35 });
}
}
EBS.racers.forEach(function (r, i) { r.P.g.position.set(sx - 10 + i * 10, ebsY(sx, S.z + 94), S.z + 94); r.P.g.visible = true; });
setStatus("🏃 <b>Go!</b> Run down the track to the far line!");
}], ["Not now", function () { worldCard(null); }]]);
},
function (R, dt) {
var c = worldLocal();
R.t += dt;
(EBS.racers || []).forEach(function (r) { var g = r.P.g; if (g.position.z > R.z1)
g.position.z -= r.v * dt; g.position.y = ebsY(g.position.x, g.position.z); });
if (c.z <= R.z1 && Math.abs(c.x - R.sx) < 22) {
EBS.run = null;
var ahead = (EBS.racers || []).filter(function (r) { return r.P.g.position.z <= R.z1; }).length;
if (R.t <= 40)
ebsReward("race", "🏃 <b>Across the line in " + R.t.toFixed(1) + " seconds" + (ahead ? ", " + ["", "second", "third", "fourth"][ahead] + " place" : ", first!") + "</b> The blessed cheer and a laurel crown is set on your head.");
else
setStatus("🏃 Across the line in " + R.t.toFixed(1) + " seconds: too slow for a crown this time. Try again!");
return;
}
if (R.t > 70) {
EBS.run = null;
setStatus("🏃 The race is over. Come back to the starting line to run again.");
}
},
function () {
var S = { p: 0, dir: 1, iv: null };
function stop() { if (S.iv) {
clearInterval(S.iv);
S.iv = null;
} }
function card() {
var h = EBS_H + "🥏 The discus</div><div style='opacity:.9;margin:6px 0'>Spin, and let go when the power is at its highest. (The famous athlete Phayllus threw about 29 metres.)</div><div id='ebs-dpow' style='height:12px;background:#1A2A14;border-radius:6px;overflow:hidden;margin:8px 0'><div id='ebs-dbar' style='height:100%;width:0%;background:#C8A040'></div></div>", fns = {};
h += worldBtn("t", "🥏 Let go!", "");
fns.t = function () {
stop();
var m = Math.round(8 + S.p * 0.27 + Math.random() * 2);
worldCard(null);
ebsTone(500, 0.3, "sine", 0.08);
if (m >= 28)
ebsReward("discus", "🥏 <b>" + m + " metres!</b> As far as Phayllus himself. The shades murmur.");
else
setStatus("🥏 <b>" + m + " metres.</b> Not bad. 28 or more wins the bronze discus; try again.");
};
h += worldBtn("x", "Put it down", "");
fns.x = function () { stop(); worldCard(null); };
worldCard(h, fns);
stop();
S.iv = setInterval(function () { S.p += S.dir * (EBS.lite ? 3 : 4); if (S.p >= 100) {
S.p = 100;
S.dir = -1;
} if (S.p <= 0) {
S.p = 0;
S.dir = 1;
} var b = document.getElementById("ebs-dbar"); if (b)
b.style.width = S.p + "%";
else
stop(); }, 40);
}
card();
},
function () {
var lot = 1 + Math.floor(Math.random() * 8), lives = ebsShuffle(EBS_LIVES).slice(0, 5);
ebsChoose("🌀 The lots of Lachesis", ["A herald takes lots from the lap of Lachesis and scatters them. Yours lands at your feet: <b>number " + lot + "</b>. Then the patterns of lives are laid out on the ground, more lives than there are souls. \"The blame is the chooser's; the god is blameless\" (Plato, Republic 617e).", "Choose:", ebsPayLine("er")], lives.map(function (L) { return [esc(L[0]), function () { worldCard(null); ebsChoose("🌀 You chose", ["<b>" + esc(L[0]) + "</b>.", esc(L[1]), "Then every soul passes under the throne of Necessity, crosses the burning Plain of Forgetfulness, drinks from the River of Unmindfulness, and is carried up to birth like a shooting star. Er alone did not drink, and woke on his funeral pyre to tell the story."], [["Done", function () { worldCard(null); ebsReward("er", "🌀 <b>A lot from the lap of Lachesis.</b> Plato's lesson: learn to tell a good life from a bad one, and choose wisely."); }]]); }]; }));
},
function (kind) {
worldCard(null);
if (kind === "horn")
ebsMove(EBS_TAE_X, -66, Math.PI, "📯 <b>Through the Gate of Horn,</b> the gate of true dreams, and out into the sunlight at Cape Taenarum. (Your next dream, they say, will come true.)", null, { fn: function () { ebsReward("horn", "📯 <b>You left by the Gate of Horn.</b>"); } });
else
ebsMove(EBS_TAE_X, -66, Math.PI, "🦴 <b>Through the Gate of Ivory,</b> the gate of false dreams, the way Virgil sent Aeneas home. You blink in the sunlight at Cape Taenarum. Was any of it real?");
},
function (k) {
if (k === "taenarum")
return { x: EBS_TAE_X, z: -60, y: null };
var A = EBS_AT[k];
if (!A)
return { x: 0, z: 4100 };
var off = { elm: [0, 14], monsters: [0, 16], landS: [0, 40], gate: [10, 40], mourn: [30, 40], judge: [40, 14], asph: [-200, 240], palace: [0, 170], lethe: [10, 14], tgate: [60, 0], sleep: [-20, 30] }[k] || [0, 14];
return { x: A.x + off[0], z: A.z + off[1] };
},
function () {
var d = ebsData();
ebsChoose("🪶 Hermes", ["\"Twelve places, twelve stories, and I'll whisk you between them. Or, if you have been paying attention, sit my examination: ten questions, eight to pass, and you'll be a Psychopomp, a guide of souls, like me.\"", ebsPayLine("tour")], [["Take the tour", function () { worldCard(null); ebsTourStop(0); }], [d.psychopomp ? "Sit the examination again" : "Sit the examination", function () { ebsExam(); }], ["The lessons", function () { ebsLessonList(); }], ["Later", function () { worldCard(null); }]]);
},
function (i) {
var S = EBS_TOUR[i];
if (!S) {
ebsReward("tour", "🪶 <b>The end of Hermes's tour.</b> \"That's the lot. Mind how you go; and if you see my uncle, say I was polite.\"");
return;
}
var P = ebsTourAt(S.at);
ebsMove(P.x, P.z, null, null, null, { fn: function () { ebsChoose("🪶 " + (i + 1) + " of " + EBS_TOUR.length + ": " + esc(S.n), ["<i>Hermes:</i> " + esc(S.t)], [[i + 1 < EBS_TOUR.length ? "Next stop" : "Finish", function () { worldCard(null); ebsTourStop(i + 1); }], ["Stay here", function () { worldCard(null); setStatus("🪶 Hermes tips his winged cap. \"Find me at Cape Taenarum when you want to go on.\""); }]]); } });
},
function (x, z, k) {
var L = null;
EBS_LESSONS.forEach(function (l) { if (l.k === k)
L = l; });
if (!L)
return;
var g = new THREE.Group();
g.position.set(x, 0, z);
(EBS.curGrp || EBS.G).add(g);
wBox(1.2, 1.1, 0.2, ebsStone("oak"), 0, 1.2, 0, g);
wBox(1, 0.8, 0.05, ebsLam(0xE8D8A8), 0, 1.25, 0.12, g);
wCyl(0.05, 0.05, 1.2, ebsStone("oak"), 0, 0.6, 0, g, 5);
ebsSpot(x, z + 1.6, 2.4, "A lesson: " + L.n, "read the tablet", function () { ebsLesson(k); }, 0);
},
function (k) {
var L = null;
EBS_LESSONS.forEach(function (l) { if (l.k === k)
L = l; });
if (!L)
return;
var d = ebsData(), Q = L.q;
var lines = L.f.map(esc);
if (d.lessons[k]) {
ebsChoose("📝 " + esc(L.n), lines.concat(["<span style='color:#BFE8B0'>✅ You have learned this one.</span>"]), [["All the lessons", function () { ebsLessonList(); }], ["Close", function () { worldCard(null); }]]);
return;
}
ebsAsk("📝 " + esc(L.n), Q[0], Q[1], Q[2], function () { d.lessons[k] = 1; ebsSave(); worldCard(null); ebsReward("lesson", "📝 <b>Lesson learned: " + esc(L.n) + ".</b> (" + Object.keys(d.lessons).length + " of " + EBS_LESSONS.length + ".)"); }, function () { setStatus("Not quite. Read the tablet again."); }, lines.concat(["<b>Question:</b>"]));
},
function () {
var d = ebsData();
ebsChoose("📝 The lessons", ["Learned: <b>" + Object.keys(d.lessons).length + " of " + EBS_LESSONS.length + "</b>. Tablets with these lessons stand all over the underworld; you can also read them here.", ebsPayLine("lesson")], EBS_LESSONS.map(function (L) { return [(d.lessons[L.k] ? "✅ " : "") + esc(L.n), function () { ebsLesson(L.k); }]; }).concat([["Close", function () { worldCard(null); }]]));
},
function () {
var pool = EBS_LESSONS.map(function (L) { return L.q; }).concat(EBS_JUDGE.slice(1, 4).concat([EBS_JUDGE[5]]).map(function (J) { return [J[0], J[1], J[2]]; })), pick = ebsShuffle(pool).slice(0, 10), S = { i: 0, ok: 0 }, d = ebsData();
function q() {
if (S.i >= 10) {
var pass = S.ok >= 8;
if (pass) {
d.psychopomp = 1;
ebsSave();
worldCard(null);
ebsReward("exam", "🔱 <b>" + S.ok + " of 10: you are a Psychopomp,</b> a guide of souls. Hermes hands you a staff.");
}
else
ebsChoose("🔱 Not this time", [S.ok + " of 10. Eight are needed. Read the lesson tablets and try again."], [["Close", function () { worldCard(null); }]]);
return;
}
var Q = pick[S.i];
ebsAsk("🔱 Question " + (S.i + 1) + " of 10", Q[0], Q[1], Q[2], function () { S.ok++; S.i++; q(); }, function () { S.i++; q(); });
}
q();
},
function () {
for (var i = 0; i < 8; i++)
ebsCroak(i * 0.35);
worldCard(worldFacts("The frogs of the lake", "Aristophanes, The Frogs (405 BC)", [], ["\"Brekekekex koax koax! Brekekekex koax koax!\"", "In Aristophanes' comedy, the god Dionysus has to row Charon's boat across this lake himself, while a chorus of frogs sings at him the whole way, and he tries to out-croak them.", "He went down to bring back the dead playwright Euripides, because Athens had no good poets left, and came back with Aeschylus instead."]));
},
function (x, z) {
var r = ebsRegion(x);
if (r !== "main")
return r;
var A = EBS_AT, P = EBS_RIVERS.phleg, Pr = EBS_PHLEG_RING, dt = Math.hypot(x - Pr.x, z - Pr.z);
if (dt < Pr.r + 110)
return "twall";
if (ebsPathD(x, z, P.pts) < 120)
return "phleg";
if (z > 3300)
return "descent";
if (x < -2600 && z < -1200)
return "styx";
if (x > 1900 && z < -2700)
return "night";
if (Math.hypot(x - A.palace.x, z - A.palace.z) < 720)
return "palace";
return "main";
},
function (L) {
var r = ebsRegion(L.x);
if (r === "inside") {
var I = ebsInAt(L.x);
return I ? I.name : "inside";
}
if (r === "taenarum")
return "Cape Taenarum";
if (r === "path")
return "the steep path";
if (r === "tartarus")
return "Tartarus";
if (r === "elysium")
return "Elysium";
var best = "the underworld", bd = 1e9;
EBS_PLACES.forEach(function (P) { var A = EBS_AT[P[0]]; if (!A)
return; var d = Math.hypot(L.x - A.x, L.z - A.z); if (d < P[1] && d / P[1] < bd) {
bd = d / P[1];
best = P[2];
} });
return best;
},
function (x, z, feet) {
if (EBS.cine)
return true;
var r = ebsRegion(x);
if (r === "inside") {
if (ebsSolidAt(x, z, feet))
return true;
return !ebsInsideWalk(x, z);
}
if (r === "main") {
if (Math.abs(x) > EBS_BOUND || Math.abs(z) > EBS_BOUND)
return true;
}
else if (r === "taenarum") {
if (Math.hypot(x - EBS_TAE_X, z - 120) > 1300)
return true;
}
else if (r === "tartarus") {
if (Math.hypot(x - EBS_TAR_X, z) > 1850)
return true;
}
else if (r === "elysium") {
if (Math.hypot(x - EBS_ELY_X, z + 200) > 1850)
return true;
}
else if (r === "path") {
if (ebsPathD(x - EBS_PATH_X, z, EBS_OP) > 5)
return true;
}
var fl = ebsFloorAt(x, z, feet);
if (fl === null) {
if (ebsWaterAt(x, z) !== null)
return true;
if (ebsLand(x, z) > feet + 3.2)
return true;
}
return ebsSolidAt(x, z, feet);
},
function (dt, L) {
var t = EBS.t;
EBS.fx.forEach(function (f) {
var m = f.m;
if (!m)
return;
f.ph = (f.ph || 0) + dt;
if (f.k === "hang") {
m.position.y = f.y0 + Math.sin(f.ph * 0.6) * 0.8;
}
else if (f.k === "bob") {
m.position.y = f.y0 + Math.sin(f.ph * 1.3) * 0.08;
m.rotation.y = Math.sin(f.ph * 0.4) * 0.6;
}
else if (f.k === "pulse") {
if (m.material)
m.material.opacity = 0.35 + 0.2 * Math.sin(f.ph * 1.2);
}
else if (f.k === "drift") {
m.position.x = f.x0 + Math.sin(f.ph * 0.13) * 3;
m.position.z = f.z0 + Math.cos(f.ph * 0.11) * 3;
}
else if (f.k === "fury") {
m.rotation.y = Math.PI / 2 + Math.sin(f.ph * 0.3) * 0.9;
}
else if (f.k === "owl") {
m.rotation.y = Math.sin(f.ph * 0.5) > 0.7 ? 1.2 : 0;
}
});
(EBS.monsters || []).forEach(function (M) { if (M.flick > 0) {
M.flick -= dt;
M.g.visible = true;
} });
(EBS.frogs || []).forEach(function (F) { F.ph += dt; F.g.scale.y = 1 + Math.max(0, Math.sin(F.ph * 3)) * 0.1; });
if (EBS.cerb) {
var near = Math.hypot(L.x - EBS.cerb.g.position.x, L.z - EBS.cerb.g.position.z) < 60;
if (near)
ebsCerbTick(EBS.cerb.g, dt, !EBS.cerb.asleep && !ebsData().passed, Math.max(-1, Math.min(1, (L.x - EBS.cerb.g.position.x) * 0.05)));
}
if (EBS.denCerb && EBS.room && EBS.room.key === "den")
ebsCerbTick(EBS.denCerb, dt, true, 0);
if (EBS.boat && !EBS.cine) {
EBS.boat.g.position.y = -2.4 + Math.sin(t * 0.9) * 0.05;
}
if (EBS.ixion) {
EBS.ixion.rotation.z += dt * 0.9;
}
if (EBS.salm) {
var S = EBS.salm;
S.g.position.x = S.x0 + Math.sin(t * 0.25) * 36;
S.g.rotation.y = Math.cos(t * 0.25) > 0 ? 0 : Math.PI;
if (Math.abs(Math.cos(t * 0.25)) > 0.98 && Math.random() < dt && Math.abs(L.x - S.x0) < 200)
ebsTone(60, 0.6, "sawtooth", 0.05);
}
(EBS.vultures || []).forEach(function (V) { V.ph += dt * 0.2; V.g.position.set(V.cx + Math.cos(V.ph) * V.r, V.y, V.cz + Math.sin(V.ph) * V.r); V.g.rotation.y = -V.ph; });
if (EBS.sisStone) {
var St = EBS.sisStone, T = EBS_TT.sis, sx = EBS_TAR_X + T.x;
if (St.roll) {
St.t = Math.max(0, St.t - dt * 0.35);
if (St.t <= 0)
St.roll = 0;
}
var d = T.r * 0.9 * (1 - St.t), px = sx + d, y = ebsLand(px, T.z) + 4;
St.m.position.set(px, y, T.z);
St.m.rotation.z += (St.roll ? 1 : -0.2) * dt * 0.5;
}
if (EBS.spindle)
EBS.spindle.children.forEach(function (c) { if (c.userData.spin)
c.rotation.z += dt * c.userData.spin; });
if (EBS.flows)
EBS.flows.forEach(function (F) { var tx = F.m && F.m.userData && F.m.userData.flow; if (tx && tx.offset)
tx.offset.y -= dt * F.sp; });
},
function (L) {
var r = ebsRegion(L.x), far = EBS.lite ? 1500 : 3200;
EBS.districts.forEach(function (D) { var on = r !== "inside" && Math.hypot(L.x - D.x, L.z - D.z) < D.r + (D.far ? far * 1.6 : far); if (D.g.visible !== on)
D.g.visible = on; });
EBS.tiles.forEach(function (T) { var on = r !== "inside" && (T.region === r || (r === "main" && T.region === "main")) && Math.hypot(L.x - T.x, L.z - T.z) < T.r + (EBS.lite ? 2600 : 5200); if (T.g.visible !== on)
T.g.visible = on; });
(EBS.outGroups || []).forEach(function (g) { if (g.userData.dist)
return; var on = r === "main"; if (g.userData.region)
on = g.userData.region === r; if (g.visible !== on)
g.visible = on; });
if (EBS.vault) {
EBS.vault.visible = r === "main";
if (EBS.stal)
EBS.stal.visible = r === "main";
}
for (var k in EBS_IN) {
var I = EBS_IN[k];
if (I.grp) {
var on2 = r === "inside" && Math.abs(L.x - I.x) < 200;
if (I.grp.visible !== on2)
I.grp.visible = on2;
}
}
},
function (dt) {
var L = worldLocal();
EBS.t += dt;
if (!EBS.built || EBS.moving)
return;
var feet = camera.position.y - 1.72, zone = ebsZoneAt(L.x, L.z);
EBS.region = ebsRegion(L.x);
EBS.room = ebsInAt(L.x);
if (zone !== EBS.zone) {
var was = EBS.zone, dz = ebsDangerZone(zone), dw = ebsDangerZone(was);
EBS.zone = zone;
if (dz > dw)
setStatus(dz >= 4 ? "🔥 <b>Tartarus.</b> Danger: <b>Deadly</b>. Furies, hungry shades and worse hunt here. Strike back, or go back through the bronze gate." : "🔥 <b>The burning banks.</b> Danger: <b>Dangerous</b>. Hellhounds and fire-spirits roam near the Phlegethon and the walls of Tartarus.");
else if (dw && !dz && zone !== "inside")
setStatus("🛡️ <b>Safe</b> again.");
}
var wake = EBS.region === "tartarus" ? { x: EBS_TAR_X + EBS_TT.arrive.x, z: EBS_TT.arrive.z } : { x: EBS_AT.foot.x, z: EBS_AT.foot.z + 10 };
if (!WLD.arrive || WLD.arrive.x !== wake.x || WLD.arrive.z !== wake.z)
WLD.arrive = wake;
if (EBS.cine && EBS.cine.k === "ferry")
ebsFerryTick(EBS.cine, dt);
if (EBS.run) {
if (EBS.run.k === "orpheus")
ebsOrpheusTick(EBS.run, dt);
else if (EBS.run.k === "race")
ebsRaceTick(EBS.run, dt);
}
ebsFxTick(dt, L);
ebsFlameTick(dt);
EBS.crowds.forEach(function (C) { ebsCrowdTick(C, dt, L); });
if (EBS.region === "tartarus")
ebsHydraTickAll(dt);
EBS.lt = (EBS.lt || 0) + dt;
ebsLightPoolTick(dt, L, EBS.lt > 0.3);
if (EBS.lt > 0.3)
EBS.lt = 0;
EBS.vt += dt;
if (EBS.vt > 0.4) {
EBS.vt = 0;
ebsVisTick(L);
}
EBS.dt2 = (EBS.dt2 || 0) + dt;
if (EBS.dt2 > 6) {
EBS.dt2 = 0;
ebsInDrop();
}
var dl = ebsDangerZone(zone), tag = dl >= 4 ? " · 🔥 Deadly" : dl >= 3 ? " · 🔥 Dangerous" : "";
worldBanner("<b>🔱 " + EBS_NAME + "</b> · " + esc(ebsPlaceName(L)) + tag + (EBS.cine ? " · crossing with Charon" : "") + (EBS.run && EBS.run.k === "orpheus" ? " · don't look back" : ""));
EBS.pt += dt;
if (EBS.pt < 0.15)
return;
EBS.pt = 0;
if (WLD.card && WLD.card.style.display === "block") {
worldPrompt(null);
return;
}
if (EBS.cine) {
worldPrompt(null);
return;
}
var best = null, bd = 1e9;
function cand(x, z, r, fn, html) { var d = Math.hypot(L.x - x, L.z - z); if (d < r && d / r < bd) {
bd = d / r;
best = { fn: fn, html: html };
} }
EBS.talk.forEach(function (T) {
var g = T.p.g, p = g.position;
if (g.visible === false)
return;
var wp = p;
if (g.parent && g.parent !== EBS.G && g.parent.position && g.getWorldPosition) {
wp = g.getWorldPosition(new THREE.Vector3());
wp.x -= EBS.base;
}
if (Math.abs(wp.x - L.x) > T.r + 1 || Math.abs(wp.z - L.z) > T.r + 1)
return;
if (Math.abs(wp.y - feet) > 4)
return;
cand(wp.x, wp.z, T.r, T.fn || function () { if (T.t && typeof wTalk === "function")
wTalk(T.t); }, "<b>" + esc(T.name) + "</b> · <b>press E</b> to talk");
});
EBS.spots.forEach(function (s) {
if (Math.abs(s.x - L.x) > s.r + 1 || Math.abs(s.z - L.z) > s.r + 1)
return;
var sy = s.y !== undefined && s.y !== null ? s.y : ebsGround(s.x, s.z);
if (Math.abs(sy - feet) > 3.4)
return;
cand(s.x, s.z, s.r, s.fn, "<b>" + esc(s.name) + "</b> · <b>press E</b> to " + esc(s.verb));
});
if (best)
worldPrompt(best.html, best.fn);
else
worldPrompt(null);
},
function (D) {
if (typeof gwBake !== "function")
return;
function hasLimbs(o) { var y = false; o.traverse(function (c) { if (c.userData.limbs)
y = true; }); return y; }
D.children.slice().forEach(function (c) { if (c.isGroup && !c.userData.keep && !hasLimbs(c)) {
try {
gwBake(c);
}
catch (e) { }
c.userData.keep = 1;
c.userData.baked = 1;
} });
try {
gwBake(D);
}
catch (e) {
if (window.console)
console.warn("[erebos] bake", e);
}
},
function (G) {
EBS.G = G;
EBS.lite = typeof LITE !== "undefined" && !!LITE;
EBS.solids = [];
EBS.sgrid = {};
EBS.floors = [];
EBS.spots = [];
EBS.talk = [];
EBS.people = [];
EBS.fx = [];
EBS.flames = [];
EBS.districts = [];
EBS.tiles = [];
EBS.crowds = [];
EBS.flows = [];
EBS_LSRC.length = 0;
EBS_DOORS.length = 0;
EBS.cine = null;
EBS.run = null;
EBS.monsters = [];
EBS.frogs = [];
EBS.vultures = [];
EBS.hydra = null;
EBS.cerb = null;
EBS.boat = null;
EBS.eury = null;
EBS.racers = null;
EBS.sisStone = null;
EBS.ixion = null;
EBS.salm = null;
EBS.spindle = null;
EBS.denCerb = null;
for (var k in EBS_IN) {
EBS_IN[k].built = false;
EBS_IN[k].grp = null;
}
function step(name, fn) { try {
fn();
}
catch (e) {
if (window.console)
console.warn("[erebos] " + name, e);
} }
step("light", function () { ebsLightPool(G); EBS.pool.forEach(function (P) { P.L.userData.dist = 1; }); });
step("terrain", function () { ebsTerrain(G); });
step("rivers", function () { ebsRivers(G); });
step("falls", function () { ebsFalls(G); });
step("vault", function () { ebsVault(G); });
EBS_ROADS.length = 0;
step("places", function () { ebsBuild(G); });
step("taenarum", function () { ebsTaenarum(G); });
step("tartarus", function () { ebsTartarus(G); });
step("elysium", function () { ebsElysium(G); });
step("path", function () { ebsOrphPath(G); });
step("dress", function () { ebsDress(G); });
EBS.districts.forEach(function (D) { ebsBakeTree(D.g); D.g.userData.dist = 1; });
EBS.tiles.forEach(function (T) { T.g.userData.dist = 1; });
EBS.outGroups = G.children.slice();
EBS.outGroups.forEach(function (g) { if (!g.userData.dist && g.position) {
var rg = ebsRegion(g.position.x);
if (rg !== "main")
g.userData.region = rg;
} });
EBS.built = true;
},
function (opt) {
opt = opt || {};
var A = opt.at || { x: 0, z: 4160, y: 240, yaw: 0 };
EBS.zone = "descent";
EBS.region = ebsRegion(A.x);
EBS.room = null;
EBS.moving = false;
EBS.outside = EBS.outside || null;
camera.position.set(EBS.base + A.x, (A.y !== undefined ? A.y : ebsGround(A.x, A.z)) + 1.72, A.z);
yaw = A.yaw || 0;
pitch = 0;
ebsStateFetch();
setStatus("🔱 <b>" + EBS_NAME + ",</b> the Greek underworld. You stand at the head of a great stair going down into the dark: the rivers glow far below, red with fire, grey with mist. The <b>Sibyl</b> waits at the foot, <b>Charon</b> at the river, <b>Cerberus</b> at the gate. Most of it is Safe; the fires round Tartarus are not. (🔱 Erebos in the Menu for the map.)");
},
function () {
for (var k in EBS.mats) {
var m = EBS.mats[k];
if (m && m.dispose)
try {
m.dispose();
}
catch (e) { }
}
for (var t in EBS.tex) {
var x = EBS.tex[t];
if (x && x.dispose)
try {
x.dispose();
}
catch (e) { }
}
EBS.mats = {};
EBS.tex = {};
EBS.solids = [];
EBS.sgrid = null;
EBS.floors = [];
EBS.spots = [];
EBS.talk = [];
EBS.people = [];
EBS.fx = [];
EBS.flames = [];
EBS.districts = [];
EBS.tiles = [];
EBS.crowds = [];
EBS.flows = [];
EBS.outside = null;
EBS.G = null;
EBS.built = false;
EBS.pool = null;
EBS_LSRC.length = 0;
EBS_SHADE_GEO = null;
for (var i in EBS_IN) {
EBS_IN[i].built = false;
EBS_IN[i].grp = null;
}
},
function () {
ebsChoose("🔱 The Mouth of Erebos", ["A cleft in the black rock, cold air breathing up out of it, and a stair cut into the stone going down and down. Far below, faint lights: red, grey, gold.", "This is the way down to <b>Erebos</b>, the whole Greek underworld as the ancient poets told it: the rivers, Charon's ferry, Cerberus at the gate, the judges, the palace of Hades, Tartarus and Elysium. Most of it is Safe; the fires round Tartarus are Dangerous, and Tartarus itself is Deadly."], [["Go down", function () { worldCard(null); var P = camera.position; ebsGo({ from: { here: store.here || 0, x: P.x, y: P.y, z: P.z + 3, yaw: yaw + Math.PI, name: "the Underworld" } }); }], ["Not now", function () { worldCard(null); }]]);
},
function (where) {
var P = { top: { x: 0, z: 4160, y: 240, yaw: 0 }, foot: { x: 0, z: 3450, yaw: 0 }, gate: { x: 10, z: 1700, yaw: 0 }, cross: { x: 20, z: 700, yaw: 0 }, palace: { x: 0, z: -1300, yaw: 0 }, tar: { x: EBS_TAR_X + EBS_TT.arrive.x, z: EBS_TT.arrive.z, yaw: Math.PI }, ely: { x: EBS_ELY_X + EBS_EL.arrive.x, z: EBS_EL.arrive.z + 60, yaw: Math.PI }, tae: { x: EBS_TAE_X, z: -60, yaw: Math.PI } }[where] || { x: 0, z: 4160, y: 240, yaw: 0 };
if (WLD.on === EBS_KEY)
ebsMove(P.x, P.z, P.yaw, null, P.y);
else
ebsGo({ at: P });
},
function () {
var keeper = ebsKeeper(), b = "", fns = {}, d = ebsData();
var rows = [["Where", "Below the Underworld land in the Hall of Doors: the Mouth of Erebos at the end of the eastern path (or ask Charon there). Cape Taenarum above, the Descent, the Acheron, the Gate, the Crossroads, the Asphodel Meadow, the Palace, the Pools, the Styx, Night and Sleep, Tartarus, Elysium"],
["To do", "Cross with Charon; pass Cerberus three ways; be judged; the Furies' trial; the Pool of Memory; lead Eurydice up the path; Sisyphus and the Hydra in Tartarus; the race, discus and the Myth of Er in Elysium; Hermes's tour; 12 lessons and the Psychopomp's exam"],
["Danger", "Safe everywhere except the Phlegethon's banks and the walls of Tartarus (Dangerous) and Tartarus itself (Deadly)"],
["Yours so far", Object.keys(d.lessons).length + " of " + EBS_LESSONS.length + " lessons" + (d.passed ? ", past Cerberus" : "") + (d.judged ? ", judged worthy of Elysium" : "") + (d.memory ? ", drunk from Memory" : "") + (d.psychopomp ? ", a Psychopomp" : "")]];
if (WLD.on === EBS_KEY) {
if (EBS.room) {
b += worldBtn("out", "Go back outside", "Out of " + esc(EBS.room.name));
fns.out = function () { worldCard(null); ebsLeaveRoom(); };
}
b += worldBtn("map", "🗺️ The map and the danger", "What is where, and how dangerous");
fns.map = function () { ebsLookoutCard(); };
b += worldBtn("les", "📝 The lessons", "Twelve tablets");
fns.les = function () { ebsLessonList(); };
b += worldBtn("top", "Back to the head of the stair", "");
fns.top = function () { worldCard(null); ebsTravel("top"); };
if (keeper) {
[["gate", "Keeper: the Gate"], ["cross", "Keeper: the Crossroads"], ["palace", "Keeper: the Palace"], ["tar", "Keeper: Tartarus"], ["ely", "Keeper: Elysium"], ["tae", "Keeper: Cape Taenarum"]].forEach(function (K) { b += worldBtn("k" + K[0], K[1], ""); fns["k" + K[0]] = function () { worldCard(null); ebsTravel(K[0]); }; });
}
b += worldBtn("home", "Leave " + EBS_NAME, "Back to where you came from");
fns.home = function () { worldCard(null); ebsHome(); };
}
else {
if (!WLD.on && typeof toHall === "function") {
b += worldBtn("hall", "Take me to the Hall of Doors", "Then the Underworld's door, and the Mouth of Erebos at the end of its eastern path");
fns.hall = function () { worldCard(null); toHall(); };
}
if (!WLD.on) {
b += worldBtn("go", "Go straight down to " + EBS_NAME, "Arrive at the head of the great stair");
fns.go = function () { worldCard(null); ebsGo({}); };
}
if (keeper) {
b += worldBtn("kgo", "Go now (Keeper)", "The head of the stair");
fns.kgo = function () { worldCard(null); ebsGo({}); };
}
}
worldCard(worldFacts("🔱 " + EBS_NAME, "The Greek underworld, from Homer, Hesiod, Virgil, Ovid and Plato", rows, []) + b, fns);
},
function (x, z, r) {
if (ebsWaterAt(x, z) !== null)
return false;
if (ebsNearRoad(x, z, r + 3))
return false;
var y = ebsLand(x, z);
if (ebsSolidAt(x, z, y) || ebsSolidAt(x + r, z, y) || ebsSolidAt(x - r, z, y) || ebsSolidAt(x, z + r, y) || ebsSolidAt(x, z - r, y))
return false;
for (var i = 0; i < EBS.floors.length; i++) {
var F = EBS.floors[i];
if (!F.inside && Math.abs(x - F.x) < F.hw + r + 2 && Math.abs(z - F.z) < F.hd + r + 2)
return false;
}
return true;
},
function (geo, mat, n, place, o) {
o = o || {};
if (EBS.lite)
n = Math.ceil(n * (o.lite || 0.11));
var m = new THREE.InstancedMesh(geo, mat, n), R = wRand(o.seed || 9), M = new THREE.Matrix4(), q = new THREE.Quaternion(), e = new THREE.Euler(), s = new THREE.Vector3(), p = new THREE.Vector3(), k = 0, tries = 0;
while (k < n && tries < n * 6) {
tries++;
var P = place(R);
if (!P)
continue;
var y = P.y !== undefined ? P.y : ebsLand(P.x, P.z);
e.set(P.tx || 0, P.ry || 0, P.tz || 0);
q.setFromEuler(e);
s.set(P.s, P.sy || P.s, P.sz || P.s);
p.set(P.x, y + (P.dy || 0), P.z);
M.compose(p, q, s);
m.setMatrixAt(k++, M);
if (P.solid)
ebsRound(P.x, P.z, P.solid, y - 5, y + P.s * (P.sy ? P.sy / P.s : 1) * 1.2);
}
m.count = k;
m.instanceMatrix.needsUpdate = true;
m.frustumCulled = false;
m.userData.keep = 1;
if (o.region)
m.userData.region = o.region;
EBS.G.add(m);
return m;
},
function (seed, detail) {
var g = new THREE.IcosahedronGeometry(1, detail), p = g.attributes.position, r = wRand(seed);
var cache = {};
for (var i = 0; i < p.count; i++) {
var key = p.getX(i).toFixed(3) + "," + p.getY(i).toFixed(3) + "," + p.getZ(i).toFixed(3);
var k = cache[key] || (cache[key] = 0.72 + r() * 0.5);
p.setXYZ(i, p.getX(i) * k, p.getY(i) * k * 0.7, p.getZ(i) * k);
}
g.computeVertexNormals();
return g;
},
function (seed, h) {
var g = new THREE.ConeGeometry(1, h || 1, 7, 4), p = g.attributes.position, r = wRand(seed), cache = {};
for (var i = 0; i < p.count; i++) {
var key = p.getX(i).toFixed(3) + "," + p.getY(i).toFixed(3) + "," + p.getZ(i).toFixed(3);
var k = cache[key] || (cache[key] = 0.75 + r() * 0.5);
p.setX(i, p.getX(i) * k);
p.setZ(i, p.getZ(i) * k);
}
g.translate(0, (h || 1) / 2, 0);
g.computeVertexNormals();
return g;
},
function () {
var parts = [], d = new THREE.CylinderGeometry(0.55, 0.6, 3.2, 14);
d.translate(0, 1.6, 0);
parts.push(d.toNonIndexed());
var b = new THREE.BoxGeometry(1.5, 0.4, 1.5);
b.translate(0, 0.2, 0);
parts.push(b.toNonIndexed());
var f = new THREE.CylinderGeometry(0.55, 0.55, 2.4, 14);
f.rotateZ(Math.PI / 2);
f.translate(2.2, 0.55, 0.8);
parts.push(f.toNonIndexed());
return gwMerge(parts);
},
function () {
var parts = [], r = wRand(31);
var t = new THREE.CylinderGeometry(0.12, 0.32, 5.5, 6);
t.translate(0, 2.75, 0);
parts.push(t.toNonIndexed());
for (var i = 0; i < 6; i++) {
var b = new THREE.CylinderGeometry(0.03, 0.09, 1.8 + r() * 1.8, 4), a = r() * 6.28, up = 0.5 + r() * 0.7;
b.translate(0, 0.9, 0);
b.rotateZ(Math.cos(a) * up);
b.rotateX(-Math.sin(a) * up);
b.translate(0, 3 + r() * 2.4, 0);
parts.push(b.toNonIndexed());
}
return gwMerge(parts);
},
function () {
return ebsCanvas("mist", 256, 256, function (x, W, H) {
x.clearRect(0, 0, W, H);
var r = wRand(19);
for (var i = 0; i < 40; i++) {
var cx = r() * W, cy = r() * H, rr = 30 + r() * 70, g = x.createRadialGradient(cx, cy, 0, cx, cy, rr);
g.addColorStop(0, "rgba(255,255,255," + (0.1 + r() * 0.12) + ")");
g.addColorStop(1, "rgba(255,255,255,0)");
x.fillStyle = g;
x.fillRect(0, 0, W, H);
}
});
},
function (G) {
var rock = ebsStone("rock"), cave = ebsStone("cave"), dark = ebsStone("dark"), grey = ebsStone("grey"), white = ebsStone("white"), bark = ebsS("bark", 0x2A2420, 2);
var D1 = EBS.lite ? 0 : 1, bg = ebsBoulderGeo(5, D1);
ebsMany(bg, rock, 2600, function (R) { var P = ebsMainSpot(R, 0, 3); if (!P)
return null; var big = R() < 0.12, s = big ? 3 + R() * 7 : 0.5 + R() * 1.8; P.s = s; P.sy = s * (0.6 + R() * 0.5); P.ry = R() * 6; P.dy = -s * 0.15; if (big)
P.solid = s * 0.8; return P; }, { seed: 11 });
ebsMany(ebsBoulderGeo(6, D1), cave, 900, function (R) { var a = R() * 6.283, c = Math.cos(a), sn = Math.sin(a), u = Math.pow(Math.pow(Math.abs(c), 4) + Math.pow(Math.abs(sn), 4), 0.25), d = 4420 * (0.92 + R() * 0.06) / u, x = c * d, z = sn * d; if (ebsRegion(x) !== "main")
return null; if (!ebsFreeAt(x, z, 4))
return null; var s = 5 + R() * 14; return { x: x, z: z, s: s, sy: s * (0.7 + R() * 0.6), ry: R() * 6, dy: -s * 0.2, solid: s * 0.8 }; }, { seed: 12 });
var sp = ebsSpireGeo(8, 1);
ebsMany(sp, cave, 1100, function (R) { var P = ebsMainSpot(R, 0, 4); if (!P)
return null; var tall = R() < 0.18, h = tall ? 30 + R() * 90 : 4 + R() * 16; P.s = h * (tall ? 0.12 : 0.18); P.sy = h; P.sz = P.s; P.ry = R() * 6; P.tx = (R() - 0.5) * 0.08; P.dy = -1; P.solid = P.s * 0.9; return P; }, { seed: 13 });
var cg = ebsCrystalGeo();
[[0x8A6AF0, 0x3A1A8A, 14], [0x5AB0F0, 0x0A3A6A, 15], [0xF07A3A, 0x6A1A04, 16]].forEach(function (C) {
ebsMany(cg, ebsLam(C[0], { e: C[1] }), 420, function (R) { var P = ebsMainSpot(R, 0, 2); if (!P)
return null; var s = 0.8 + R() * 2.6; P.s = s; P.ry = R() * 6; P.tx = (R() - 0.5) * 0.6; P.tz = (R() - 0.5) * 0.6; return P; }, { seed: C[2] });
});
var pg = ebsPoplarGeo(), pT = ebsMany(pg[0], bark, 700, poplarAt, { seed: 17 }), pC = ebsMany(pg[1], ebsLam(0x1E2A22), 700, poplarAt, { seed: 17 });
function poplarAt(R) { for (var t = 0; t < 6; t++) {
var x = (R() - 0.5) * 8000, z = (R() - 0.5) * 8000;
var near = false;
for (var k in EBS_RIVERS) {
if (ebsPathD(x, z, EBS_RIVERS[k].pts) < EBS_RIVERS[k].w / 2 + 60) {
near = true;
break;
}
}
if (!near)
continue;
if (!ebsFreeAt(x, z, 2))
continue;
var s = 0.9 + R() * 0.9;
return { x: x, z: z, s: s, sy: s * (0.9 + R() * 0.5), ry: R() * 6, solid: 0.4 };
} return null; }
ebsMany(ebsDeadGeo(), bark, 900, function (R) { var P = ebsMainSpot(R, 0, 2); if (!P)
return null; var s = 0.7 + R() * 1.3; P.s = s; P.ry = R() * 6; P.tz = (R() - 0.5) * 0.15; P.solid = 0.35 * s; return P; }, { seed: 18 });
ebsMany(ebsStoneSlabGeo(), grey, EBS.lite ? 300 : 700, function (R) { var x = (R() - 0.5) * 2600, z = 2380 + R() * 700; if (Math.abs(x) < 30)
return null; if (!ebsFreeAt(x, z, 1.5))
return null; var s = 0.7 + R() * 0.6; return { x: x, z: z, s: s, ry: (R() - 0.5) * 0.8, tx: (R() - 0.5) * 0.25, tz: (R() - 0.5) * 0.2, dy: -0.2 }; }, { seed: 19, lite: 0.5 });
ebsMany(ebsBoulderGeo(9, 0), grey, 600, function (R) { var x = (R() - 0.5) * 2600, z = 2380 + R() * 700; if (!ebsFreeAt(x, z, 1))
return null; var s = 0.3 + R() * 0.5; return { x: x, z: z, s: s, ry: R() * 6 }; }, { seed: 20 });
ebsMany(ebsBrokenColGeo(), grey, 260, function (R) { var P = ebsMainSpot(R, 0, 5); if (!P)
return null; var s = 0.8 + R() * 0.6; P.s = s; P.sy = s * (0.4 + R() * 0.8); P.ry = R() * 6; P.tx = (R() - 0.5) * 0.12; P.solid = 1.2 * s; return P; }, { seed: 21 });
var mt = ebsCanvas("mistSheet", 256, 256, function (x, W, H) { x.clearRect(0, 0, W, H); var r = wRand(23); for (var i = 0; i < 34; i++) {
var a = r() * 6.283, d = r() * 70, cx = W / 2 + Math.cos(a) * d, cy = H / 2 + Math.sin(a) * d, rr = 24 + r() * 30, g = x.createRadialGradient(cx, cy, 0, cx, cy, rr);
g.addColorStop(0, "rgba(255,255,255," + (0.12 + r() * 0.12) + ")");
g.addColorStop(1, "rgba(255,255,255,0)");
x.fillStyle = g;
x.fillRect(0, 0, W, H);
} });
var mm = new THREE.MeshBasicMaterial({ map: mt, color: 0x8A88A8, transparent: true, opacity: 0.22, depthWrite: false, fog: true });
mm.userData.noPhoto = 1;
var mg = new THREE.PlaneGeometry(1, 1);
mg.rotateX(-Math.PI / 2);
ebsMany(mg, mm, EBS.lite ? 60 : 220, function (R) { var x = (R() - 0.5) * 8000, z = (R() - 0.5) * 8000; if (ebsRegion(x) !== "main")
return null; if (ebsRimQ(x, z) > 0.93)
return null; var s = 60 + R() * 140; return { x: x, z: z, s: s, sy: 1, sz: s * (0.6 + R() * 0.6), ry: R() * 6, dy: 1.2 + R() * 2 }; }, { seed: 22, lite: 0.27 });
var obs = ebsS("b:marble", 0x4A3A3C, 3, { shine: 90, spec: 0x8A5A4A });
function tarSpot(R, mg2) { for (var t = 0; t < 4; t++) {
var lx = (R() - 0.5) * 5600, z = (R() - 0.5) * 5600, x = EBS_TAR_X + lx;
if (Math.hypot(lx, z) > 1650)
continue;
if (!ebsFreeAt(x, z, mg2 || 3))
continue;
return { x: x, z: z };
} return null; }
ebsMany(ebsSpireGeo(23, 1), obs, 900, function (R) { var P = tarSpot(R, 4); if (!P)
return null; var h = R() < 0.2 ? 40 + R() * 80 : 5 + R() * 20; P.s = h * 0.14; P.sy = h; P.sz = P.s * (0.6 + R() * 0.6); P.ry = R() * 6; P.tx = (R() - 0.5) * 0.35; P.tz = (R() - 0.5) * 0.35; P.dy = -1; P.solid = P.s * 0.8; return P; }, { seed: 23, region: "tartarus" });
ebsMany(ebsBoulderGeo(24, D1), ebsS("b:strata", 0x8A5A4A, 6), 1200, function (R) { var P = tarSpot(R, 2); if (!P)
return null; var s = 0.6 + R() * (R() < 0.15 ? 8 : 2); P.s = s; P.sy = s * 0.6; P.ry = R() * 6; P.dy = -s * 0.15; if (s > 3)
P.solid = s * 0.8; return P; }, { seed: 24, region: "tartarus" });
var crack = new THREE.PlaneGeometry(1, 1);
crack.rotateX(-Math.PI / 2);
var cm = new THREE.MeshBasicMaterial({ map: ebsFireTex(), color: 0xFF7A30, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending, depthWrite: false });
cm.userData.noPhoto = 1;
ebsMany(crack, cm, 700, function (R) { var P = tarSpot(R, 1); if (!P)
return null; var s = 2 + R() * 10; P.s = s * 0.25; P.sy = 1; P.sz = s; P.ry = R() * 6; P.dy = 0.08; return P; }, { seed: 25, region: "tartarus" });
function elySpot(R, mg3) { for (var t = 0; t < 4; t++) {
var lx = (R() - 0.5) * 3600, z = (R() - 0.5) * 3600 - 200, x = EBS_ELY_X + lx;
if (Math.hypot(lx, z + 200) > 1750)
continue;
if (!ebsFreeAt(x, z, mg3 || 2))
continue;
return { x: x, z: z };
} return null; }
var sh = new THREE.IcosahedronGeometry(1, D1);
ebsMany(sh, ebsLam(0x3A7A2A), 1600, function (R) { var P = elySpot(R, 1); if (!P)
return null; var s = 0.6 + R() * 1.4; P.s = s; P.sy = s * 0.7; P.ry = R() * 6; P.dy = s * 0.2; return P; }, { seed: 26, region: "elysium" });
ebsMany(sh, ebsLam(0x5A8A3A), 900, function (R) { var P = elySpot(R, 1); if (!P)
return null; var s = 0.4 + R() * 0.9; P.s = s; P.sy = s * 0.8; P.ry = R() * 6; P.dy = s * 0.2; return P; }, { seed: 27, region: "elysium" });
ebsMany(ebsBoulderGeo(28, D1), white, 500, function (R) { var P = elySpot(R, 1); if (!P)
return null; var s = 0.4 + R() * 1.6; P.s = s; P.sy = s * 0.6; P.ry = R() * 6; return P; }, { seed: 28, region: "elysium" });
var bench = new THREE.BoxGeometry(2.4, 0.18, 0.7);
bench.translate(0, 0.5, 0);
var legs = [-0.9, 0.9].map(function (o) { var l = new THREE.BoxGeometry(0.2, 0.5, 0.6); l.translate(o, 0.25, 0); return l.toNonIndexed(); });
ebsMany(gwMerge([bench.toNonIndexed()].concat(legs)), white, 160, function (R) { var P = elySpot(R, 3); if (!P)
return null; P.s = 1; P.ry = R() * 6; return P; }, { seed: 29, region: "elysium", lite: 0.5 });
},
function (G, cx, cz, r0, r1, n, seed) {
var R = wRand(seed), lite = EBS.lite;
n = lite ? Math.ceil(n / 2) : n;
var stalk = new THREE.CylinderGeometry(0.012, 0.02, 1, 4);
stalk.translate(0, 0.5, 0);
var leaf = new THREE.ConeGeometry(0.12, 1, 4, 1, true);
leaf.translate(0, 0.5, 0);
var star = new THREE.IcosahedronGeometry(0.05, 0);
var mS = new THREE.InstancedMesh(stalk, ebsLam(0x6A7A5A), n), mL = new THREE.InstancedMesh(leaf, ebsLam(0x5A6A4E, { ds: 1 }), n), mF = new THREE.InstancedMesh(star, ebsLam(0xE8E4DA, { e: 0x2A2824 }), n * 5);
var M = new THREE.Matrix4(), q = new THREE.Quaternion(), e = new THREE.Euler(), s = new THREE.Vector3(), p = new THREE.Vector3(), k = 0, f = 0;
for (var t = 0; k < n && t < n * 4; t++) {
var a = R() * 6.283, d = r0 + Math.sqrt(R()) * (r1 - r0), x = cx + Math.cos(a) * d, z = cz + Math.sin(a) * d, y = ebsLand(x, z);
if (typeof ebsNearRoad === "function" && ebsNearRoad(x, z, 0.8))
continue;
if (ebsSolidAt(x, z, y + 0.2))
continue;
var h = 0.6 + R() * 0.6;
e.set(0, R() * 6, 0);
q.setFromEuler(e);
s.set(1, h, 1);
p.set(x, y, z);
M.compose(p, q, s);
mS.setMatrixAt(k, M);
s.set(1.2, 0.35 + R() * 0.2, 1.2);
M.compose(p, q, s);
mL.setMatrixAt(k, M);
for (var j = 0; j < 5; j++) {
s.set(1, 1, 1);
p.set(x + (R() - 0.5) * 0.12, y + h * (0.7 + j * 0.07), z + (R() - 0.5) * 0.12);
M.compose(p, q, s);
mF.setMatrixAt(f++, M);
}
k++;
}
[mS, mL, mF].forEach(function (m, i) { m.count = i === 2 ? f : k; m.instanceMatrix.needsUpdate = true; m.frustumCulled = false; m.userData.keep = 1; G.add(m); });
},
function (G, cx, cz, r0, r1, n, seed, col) {
var R = wRand(seed);
n = Math.min(EBS.lite ? 2 : 4, n);
for (var i = 0, t = 0; i < n && t < n * 12; t++) {
var a = R() * 6.283, d = r0 + R() * (r1 - r0), x = cx + Math.cos(a) * d, z = cz + Math.sin(a) * d, y = ebsLand(x, z);
if (!ebsSwFree(x, z, y, 0.6))
continue;
var grp = R() < 0.5 ? 2 : 1;
for (var g = 0; g < grp && i < n; g++) {
var px = x + g * 0.9, pz = z + g * 0.4;
try {
var P = ebsPerson("sw" + seed + "_" + i, px, pz, ebsLand(px, pz), { sex: R() < 0.5 ? "f" : "m", look: { topKind: "robe", top: 0x8A8A90, bottom: 0x6A6A70, hat: R() < 0.4 ? "hood" : "none", hatColor: 0x5A5A60 } }, Math.atan2(cx - px, cz - pz) + (R() - 0.5));
ebsShadeify(P.g, col || 0xA8C0E8, 0.5);
}
catch (e) { }
i++;
}
}
},
function (G, x, z, y, rot, seed) {
var g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = rot;
G.add(g);
var st = ebsStone(seed % 2 ? "grey" : "white"), R = wRand(seed);
wBox(0.9, 0.25, 0.4, st, 0, 0.12, 0, g);
var s = wBox(0.7, 1.6, 0.16, st, 0, 1.05, 0, g);
s.rotation.z = (R() - 0.5) * 0.08;
var top = wCyl(0.35, 0.35, 0.16, st, 0, 1.85, 0, g, 10);
top.rotation.x = Math.PI / 2;
top.scale.set(1, 1, 0.5);
ebsSolid(x, z, 1.0, 0.5, y - 2, y + 2, rot);
},
function (G, x, z, y, rot, seed) {
var g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = rot;
G.add(g);
var st = ebsStone("grey"), clay = ebsLam(0x8A5A3A), R = wRand(seed);
wBox(1.4, 0.12, 0.8, st, 0, 0.8, 0, g);
[-0.55, 0.55].forEach(function (sx) { wBox(0.18, 0.8, 0.6, st, sx, 0.4, 0, g); });
for (var i = 0; i < 3; i++) {
var b = wCyl(0.16, 0.08, 0.1, clay, -0.4 + i * 0.4, 0.91, (R() - 0.5) * 0.3, g, 10);
}
[[-0.5, 0.25], [0.5, -0.2]].forEach(function (p) { var l = wSph(0.07, clay, p[0], 0.9, p[1], g, 8); l.scale.set(1.4, 0.6, 1); var fl = wSph(0.035, wB(0xFFC070), p[0] + 0.08, 0.97, p[1], g, 6); fl.scale.y = 1.8; });
var gl = wGlow(0xFFA050, 1.6, 0.35);
gl.position.set(0, 1.0, 0);
g.add(gl);
ebsSolid(x, z, 1.5, 0.9, y - 2, y + 1.2, rot);
},
function (G, x, z, y, rot) {
var g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = rot;
G.add(g);
var ir = ebsLam(0x3A3634);
[-1.2, 1.2].forEach(function (sx) { wCyl(0.1, 0.13, 2.2, ir, sx, 1.1, 0, g, 6); });
for (var i = 0; i < 14; i++) {
var t = i / 13, l = new THREE.Mesh(new THREE.TorusGeometry(0.07, 0.018, 4, 8), ir);
l.position.set(-1.2 + t * 2.4, 1.9 - Math.sin(t * Math.PI) * 0.6, 0);
l.rotation.y = i % 2 ? Math.PI / 2 : 0;
g.add(l);
}
ebsSolid(x, z, 2.6, 0.4, y - 2, y + 2.4, rot);
},
function (G, cx, cz, o, seed) {
var R = wRand(seed), n = EBS.lite ? Math.ceil(o.things / 2) : o.things;
for (var i = 0, t = 0; i < n && t < n * 20; t++) {
var a = R() * 6.283, d = o.r0 + R() * (o.r1 - o.r0), x = cx + Math.cos(a) * d, z = cz + Math.sin(a) * d, y = ebsLand(x, z);
if (!ebsSwFree(x, z, y, 1.6))
continue;
var face = Math.atan2(cx - x, cz - z);
if (o.tartarus)
ebsSwChains(G, x, z, y, face + Math.PI / 2);
else if (i % 3 === 2)
ebsSwOffering(G, x, z, y, face, seed + i);
else
ebsSwStele(G, x, z, y, face, seed + i);
i++;
}
if (!o.tartarus)
ebsSwAsphodel(EBS.G, cx, cz, o.r0, o.r1 + 15, o.flowers || 500, seed + 5);
ebsSwShades(G, cx, cz, o.r0, o.r1, o.shades || 6, seed + 9, o.col);
},
function (G0) {
var A = EBS_AT, G = new THREE.Group();
G.name = "ebs-sweep";
G0.add(G);
ebsSwPlace(G, A.monsters.x, A.monsters.z, { r0: 12, r1: 45, things: 8, shades: 8 }, 2841);
ebsSwPlace(G, 0, 3947, { r0: 6, r1: 30, things: 5, shades: 5, flowers: 300 }, 3947);
ebsSwPlace(G, A.top.x, A.top.z, { r0: 5, r1: 22, things: 4, shades: 4, flowers: 200 }, 4167);
ebsSwPlace(G, A.pit.x, A.pit.z, { r0: 6, r1: 35, things: 7, shades: 10, flowers: 450 }, 2517);
ebsSwPlace(G, A.cross.x, A.cross.z - 760, { r0: 10, r1: 45, things: 8, shades: 8 }, 1);
ebsSwPlace(G, A.cross.x, A.cross.z, { r0: 10, r1: 40, things: 6, shades: 6 }, 760);
ebsSwPlace(G, A.memory.x, A.memory.z, { r0: 10, r1: 40, things: 7, shades: 7, col: 0xC8D8F0 }, 1610);
ebsSwPlace(G, A.tgate.x, A.tgate.z, { r0: 12, r1: 45, things: 6, shades: 6, tartarus: true, col: 0xE8A080 }, 1674);
if (typeof EBS_TAR_X !== "undefined")
ebsSwPlace(G, EBS_TAR_X - 700, -1095, { r0: 10, r1: 50, things: 8, shades: 6, tartarus: true, col: 0xE8A080 }, 30700);
if (typeof gwBake === "function")
try {
gwBake(G);
}
catch (e) { }
G.userData.keep = 1;
}
];
});
