/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(363, function () {
return [
function (n) {
return shcTex("face" + n, 128, 128, function (x, W, H) {
x.clearRect(0, 0, W, H);
var g = x.createRadialGradient(W / 2, H / 2, 4, W / 2, H / 2, W / 2);
g.addColorStop(0, "#FFF4A0");
g.addColorStop(0.6, "#FFB020");
g.addColorStop(1, "#E86A00");
x.fillStyle = g;
function tri(ax, ay, bx, by, cx, cy) { x.beginPath(); x.moveTo(ax, ay); x.lineTo(bx, by); x.lineTo(cx, cy); x.closePath(); x.fill(); }
if (n % 3 === 0) {
tri(26, 52, 46, 26, 54, 54);
tri(102, 52, 82, 26, 74, 54);
}
else if (n % 3 === 1) {
x.beginPath();
x.ellipse(40, 44, 12, 9, 0, 0, 7);
x.ellipse(88, 44, 12, 9, 0, 0, 7);
x.fill();
}
else {
tri(28, 36, 54, 48, 30, 58);
tri(100, 36, 74, 48, 98, 58);
}
tri(56, 72, 64, 60, 72, 72);
x.beginPath();
x.moveTo(20, 82);
for (var i = 0; i <= 8; i++) {
var px = 20 + i * 11, py = i % 2 ? 96 : 84 + (n % 2 ? 4 : 0);
x.lineTo(px, py);
}
x.lineTo(108, 82);
x.quadraticCurveTo(64, 122, 20, 82);
x.fill();
});
},
function () {
return shcTex("web", 256, 256, function (x, W, H) {
x.clearRect(0, 0, W, H);
x.strokeStyle = "rgba(240,240,236,.85)";
x.lineWidth = 1.6;
var spokes = 9;
for (var s = 0; s < spokes; s++) {
var a = s / (spokes - 1) * Math.PI / 2;
x.beginPath();
x.moveTo(0, 0);
x.lineTo(Math.cos(a) * W * 1.2, Math.sin(a) * H * 1.2);
x.stroke();
}
for (var r = 24; r < W * 1.2; r += 22) {
x.beginPath();
for (s = 0; s < spokes; s++) {
var b = s / (spokes - 1) * Math.PI / 2, rr = r - (s % 2 ? 5 : 0);
var px = Math.cos(b) * rr, py = Math.sin(b) * rr;
if (s === 0)
x.moveTo(px, py);
else
x.quadraticCurveTo(Math.cos(b - 0.09) * (rr - 7), Math.sin(b - 0.09) * (rr - 7), px, py);
}
x.stroke();
}
});
},
function (n) {
return shcTex("banner" + n, 128, 1024, function (x, W, H) {
var g = x.createLinearGradient(0, 0, 0, H);
g.addColorStop(0, n % 2 ? "#2A0E3A" : "#1A0E10");
g.addColorStop(1, n % 2 ? "#4A1A6A" : "#3A1408");
x.fillStyle = g;
x.fillRect(0, 0, W, H);
x.fillStyle = "#FF7A1A";
x.fillRect(0, 0, W, 18);
x.fillRect(0, H - 60, W, 6);
x.fillRect(8, 0, 4, H);
x.fillRect(W - 12, 0, 4, H);
x.beginPath();
x.moveTo(0, H - 40);
x.lineTo(W / 2, H);
x.lineTo(W, H - 40);
x.lineTo(W, H);
x.lineTo(0, H);
x.fill();
x.fillStyle = "#E86A00";
x.beginPath();
x.ellipse(W / 2, 150, 48, 40, 0, 0, 7);
x.fill();
x.fillStyle = "#3A6A20";
x.fillRect(W / 2 - 4, 100, 8, 14);
x.fillStyle = "#FFE070";
x.beginPath();
x.moveTo(W / 2 - 30, 140);
x.lineTo(W / 2 - 14, 124);
x.lineTo(W / 2 - 8, 146);
x.fill();
x.beginPath();
x.moveTo(W / 2 + 30, 140);
x.lineTo(W / 2 + 14, 124);
x.lineTo(W / 2 + 8, 146);
x.fill();
x.beginPath();
x.moveTo(W / 2 - 28, 160);
x.lineTo(W / 2 - 14, 172);
x.lineTo(W / 2, 162);
x.lineTo(W / 2 + 14, 172);
x.lineTo(W / 2 + 28, 160);
x.quadraticCurveTo(W / 2, 190, W / 2 - 28, 160);
x.fill();
x.save();
x.translate(W / 2, H / 2 + 90);
x.rotate(Math.PI / 2);
x.font = "bold 64px Georgia,serif";
x.textAlign = "center";
x.textBaseline = "middle";
x.fillStyle = "#FFB050";
x.fillText(n % 2 ? "SAMHAIN NIGHT" : "SOMNUCOR", 0, 0);
x.restore();
x.fillStyle = "#0A0608";
for (var b = 0; b < 4; b++) {
var by = H - 150 - b * 46, bx = W / 2 + (b % 2 ? -18 : 18);
x.beginPath();
x.moveTo(bx, by);
x.quadraticCurveTo(bx - 14, by - 14, bx - 26, by - 2);
x.quadraticCurveTo(bx - 16, by, bx - 12, by + 6);
x.quadraticCurveTo(bx, by + 2, bx, by + 8);
x.quadraticCurveTo(bx, by + 2, bx + 12, by + 6);
x.quadraticCurveTo(bx + 16, by, bx + 26, by - 2);
x.quadraticCurveTo(bx + 14, by - 14, bx, by);
x.fill();
}
});
},
function (title, sub, col) {
return shcTex("sign" + title, 512, 128, function (x, W, H) {
x.fillStyle = "#140C0A";
x.fillRect(0, 0, W, H);
x.strokeStyle = col;
x.lineWidth = 6;
x.strokeRect(5, 5, W - 10, H - 10);
hallText(x, title.toUpperCase(), W / 2, 48, W - 30, "bold 40px Georgia,serif", col);
hallText(x, sub || "", W / 2, 96, W - 40, "italic 24px Georgia,serif", "#F0E2C0");
});
},
function (k) {
if (SHC_GEO[k])
return SHC_GEO[k];
var g;
if (k === "pumpkin") {
g = new THREE.SphereGeometry(0.5, 14, 10);
var p = g.attributes.position, v = new THREE.Vector3();
for (var i = 0; i < p.count; i++) {
v.fromBufferAttribute(p, i);
var a = Math.atan2(v.z, v.x), rib = 1 + 0.07 * Math.cos(a * 8);
v.x *= rib;
v.z *= rib;
v.y *= 0.78;
p.setXYZ(i, v.x, v.y + 0.39, v.z);
}
g.computeVertexNormals();
}
else if (k === "stem") {
g = new THREE.CylinderGeometry(0.04, 0.07, 0.16, 5);
g.translate(0, 0.82, 0);
}
else if (k === "face") {
g = new THREE.PlaneGeometry(0.62, 0.62);
g.translate(0, 0.42, 0.505);
}
else if (k === "ghost") {
g = new THREE.LatheGeometry([[0, 1.15], [0.22, 1.1], [0.34, 0.92], [0.38, 0.6], [0.44, 0.2], [0.52, 0]].map(function (q) { return new THREE.Vector2(q[0], q[1]); }), 10);
}
else if (k === "bat") {
g = new THREE.BufferGeometry();
g.setAttribute("position", new THREE.Float32BufferAttribute([0, 0, 0.1, -0.8, 0.15, -0.1, -0.45, -0.05, -0.2, 0, 0, 0.1, 0.45, -0.05, -0.2, 0.8, 0.15, -0.1, 0, 0, 0.1, -0.45, -0.05, -0.2, 0, 0, -0.25, 0, 0, 0.1, 0, 0, -0.25, 0.45, -0.05, -0.2], 3));
g.computeVertexNormals();
}
else if (k === "shock") {
g = new THREE.ConeGeometry(0.42, 1.9, 7, 1, true);
g.translate(0, 0.95, 0);
}
else if (k === "bulb")
g = new THREE.SphereGeometry(0.11, 6, 4);
else if (k === "flame")
g = new THREE.SphereGeometry(0.12, 6, 4);
else if (k === "web") {
g = new THREE.PlaneGeometry(1, 1);
g.translate(0.5, -0.5, 0);
}
else if (k === "lantern") {
g = new THREE.CylinderGeometry(0.16, 0.2, 0.42, 6);
g.translate(0, 0.21, 0);
}
else if (k === "plane")
g = new THREE.PlaneGeometry(1, 1);
return (SHC_GEO[k] = g);
},
function (k) {
if (SHC_MAT[k])
return SHC_MAT[k];
var m;
if (k === "pumpkin")
m = new THREE.MeshLambertMaterial({ color: 0xE8701A, emissive: 0x2A0C00 });
else if (k === "stem")
m = new THREE.MeshLambertMaterial({ color: 0x4A5A20 });
else if (/^face/.test(k))
m = new THREE.MeshBasicMaterial({ map: shcFaceTex(+k.slice(4)), transparent: true, alphaTest: 0.4, fog: true });
else if (k === "ghost")
m = new THREE.MeshLambertMaterial({ color: 0xF4F2EA, emissive: 0x3A3C48, transparent: true, opacity: 0.82 });
else if (k === "bat")
m = new THREE.MeshBasicMaterial({ color: 0x0E0A0E, side: THREE.DoubleSide });
else if (k === "shock")
m = new THREE.MeshLambertMaterial({ color: 0xC8A860, side: THREE.DoubleSide });
else if (k === "web")
m = new THREE.MeshBasicMaterial({ map: shcWebTex(), transparent: true, depthWrite: false, side: THREE.DoubleSide, opacity: 0.8 });
else if (k === "flame")
m = new THREE.MeshBasicMaterial({ color: 0xFFB040 });
else if (k === "lantern")
m = new THREE.MeshBasicMaterial({ color: 0xFF9A30 });
else if (k === "bulb")
m = new THREE.MeshBasicMaterial({ color: 0xFFFFFF });
return (SHC_MAT[k] = m);
},
function (G, geo, mat, list, cols) {
if (!list.length)
return null;
var im = new THREE.InstancedMesh(geo, mat, list.length);
list.forEach(function (p, i) {
SHC_O.position.set(p[0], p[1], p[2]);
SHC_O.rotation.set(0, p[3] || 0, 0);
var s = p[4] || 1;
SHC_O.scale.set(s, s, s);
SHC_O.updateMatrix();
im.setMatrixAt(i, SHC_O.matrix);
if (cols) {
SHC_C.setHex(p[5] !== undefined ? p[5] : 0xFFFFFF);
im.setColorAt(i, SHC_C);
}
});
im.instanceMatrix.needsUpdate = true;
if (im.instanceColor)
im.instanceColor.needsUpdate = true;
im.raycast = function () { };
im.userData.shcOwn = true;
G.add(im);
return im;
},
function (G, file, want, list, gen, then) {
if (!list.length)
return;
if (typeof modelFile !== "function" || !(typeof modelsOn === "function" && modelsOn())) {
if (then)
then(false);
return;
}
var alive = typeof gen === "function" ? gen : function () { return !!(SHC.deco && SHC.deco.gen === gen); };
modelFile(file, function (F) {
if (!F || !F.scene || !alive() || !G.parent) {
if (then)
then(false);
return;
}
var sc = F.scene;
sc.updateMatrixWorld(true);
var box = new THREE.Box3().setFromObject(sc), k = want / Math.max(0.01, box.max.y - box.min.y), inv = new THREE.Matrix4().copy(sc.matrixWorld).invert();
var norm = new THREE.Matrix4().makeTranslation(0, -box.min.y * k, 0).multiply(new THREE.Matrix4().makeScale(k, k, k)), M = new THREE.Matrix4(), rel = new THREE.Matrix4();
sc.traverse(function (m) {
if (!m.isMesh)
return;
rel.copy(inv).multiply(m.matrixWorld);
var im = new THREE.InstancedMesh(m.geometry, m.material, list.length);
list.forEach(function (p, i) {
SHC_O.position.set(p[0], p[1], p[2]);
SHC_O.rotation.set(0, p[3] || 0, 0);
var s = p[4] || 1;
SHC_O.scale.set(s, s, s);
SHC_O.updateMatrix();
M.copy(SHC_O.matrix).multiply(norm).multiply(rel);
im.setMatrixAt(i, M);
});
im.instanceMatrix.needsUpdate = true;
im.raycast = function () { };
im.userData.shcOwn = true;
im.userData.shcShared = true;
im.castShadow = false;
im.receiveShadow = true;
G.add(im);
});
if (then)
then(true);
});
},
function (P) {
shcDecoDrop();
var lite = shcLite(), reach = lite ? 110 : 200, G = new THREE.Group();
G.name = "samhain streets";
scene.add(G);
var gen = (SHC.gen = (SHC.gen || 0) + 1), D = SHC.deco = { g: G, gen: gen, glows: [], ghosts: [] };
var dc = Math.hypot(P.x - ATLC.x, P.z - ATLC.z), ac = Math.atan2(P.z - ATLC.z, P.x - ATLC.x);
var bulbs = [], pump = [], tall = [], lant = [], cand = [], shock = [], hay = [], webs = [], graves = [[], [], []], fence = [], trees = [], doors = [];
function near(x, z) { return Math.hypot(x - P.x, z - P.z) <= reach; }
function add(L, x, z, rot, s) { L.push([x, shcY(x, z), z, rot || 0, s || 1]); }
var fest = typeof festOn === "function" && festOn();
shcStreets().forEach(function (rs) {
if (Math.abs(rs - dc) > reach + 20)
return;
[1, -1].forEach(function (side) {
var rk = rs + side * (ATL_ROAD + 1.5), span = reach / rk, step = lite ? 8 : 5, i0 = Math.ceil((ac - span) * rk / step), i1 = Math.floor((ac + span) * rk / step);
for (var i = i0; i <= i1; i++) {
var a = i * step / rk, x = ATLC.x + Math.cos(a) * rk, z = ATLC.z + Math.sin(a) * rk;
if (!near(x, z))
continue;
if (!atlClearAt(rk, a, 1, 1.5) || shcBlocked(x, z))
continue;
var h = shcHash(i, rs * 2 + (side > 0 ? 1 : 0)) % 100, rot = side > 0 ? rotIn(a) : rotOut(a);
if (h < 40)
add(pump, x, z, rot, 0.85 + (h % 5) * 0.08);
else if (h < 52)
add(tall, x, z, rot);
else if (h < 66)
add(lant, x, z, rot);
else if (h < 76) {
add(shock, x, z, rot);
add(pump, x + Math.cos(a + 1.4) * 0.9, z + Math.sin(a + 1.4) * 0.9, rot, 0.7);
}
else if (h < 84)
add(hay, x, z, rot + Math.PI / 2);
else if (h < 90 && !lite)
add(cand, x, z, rot);
}
if (fest || typeof evtPolesAndBunting !== "function")
return;
var rp = rs + side * (ATL_ROAD + 0.9), ps = 14, j0 = Math.ceil((ac - span) * rp / ps), j1 = Math.floor((ac + span) * rp / ps), poles = [];
for (var j = j0; j <= j1; j++) {
var b = (j + 0.5) * ps / rp, px = ATLC.x + Math.cos(b) * rp, pz = ATLC.z + Math.sin(b) * rp;
poles.push(near(px, pz) && atlClearAt(rp, b, 1, 2) && !shcBlocked(px, pz) ? [px, shcY(px, pz), pz] : null);
}
try {
evtPolesAndBunting(G, poles, [0xFF7A1A, 0x6A2AA8, 0x241A20, 0xE8A020], false);
}
catch (e) { }
});
});
if (typeof ATL_STAIRS !== "undefined")
ATL_STAIRS.forEach(function (s) {
var r0 = Math.max(146, dc - reach), r1 = dc + reach, st = lite ? 14 : 9;
for (var r = Math.ceil(r0 / st) * st; r <= r1; r += st) {
if (shcNearStreet(r, 3))
continue;
[1, -1].forEach(function (side) {
var a = s.a + side * (s.half + 0.7) / r, x = ATLC.x + Math.cos(a) * r, z = ATLC.z + Math.sin(a) * r;
if (near(x, z) && !shcBlocked(x, z))
add(lant, x, z, rotIn(a));
});
}
});
var rid = ATLC.id, bl = [], lamps = [], hide = [], obs = [];
store.objects.forEach(function (o) {
if (o.realm !== rid || !KIT[o.archetype])
return;
var dx = o.x - P.x, dz = o.z - P.z;
if (dx * dx + dz * dz > (reach + 30) * (reach + 30))
return;
var k = KIT[o.archetype], s = (o.attrs && o.attrs.s) || 1;
if (k.cat !== "being")
obs.push({ x: o.x, z: o.z, r: Math.max(k.size[0] * ((o.attrs && o.attrs.w) || 1), k.size[2] * ((o.attrs && o.attrs.d) || 1)) * s * 0.5 });
if (typeof PLANS !== "undefined" && PLANS[o.archetype] && o.archetype !== "somnucortower")
bl.push({ o: o, d: dx * dx + dz * dz });
else if (/^(ornatelamp|dimlamp|streetlight)$/.test(o.archetype))
lamps.push({ o: o, h: k.size[1] * s, d: dx * dx + dz * dz });
});
bl.sort(function (p, q) { return p.d - q.d; });
bl = bl.slice(0, lite ? 50 : 170);
bl.forEach(function (B, n) {
var o = B.o, W = o.__shcDoor;
if (!W) {
try {
W = o.__shcDoor = doorWorld(o);
}
catch (e) {
return;
}
}
if (!W || !near(W.x, W.z))
return;
var ox = W.out.x, oz = W.out.z, sx = oz, sz = -ox, rot = Math.atan2(ox, oz), hx = shcHash(Math.round(o.x), Math.round(o.z));
var lx = W.x + ox * 0.5 + sx * 1.5, lz = W.z + oz * 0.5 + sz * 1.5, rx = W.x + ox * 0.5 - sx * 1.5, rz = W.z + oz * 0.5 - sz * 1.5;
if (!shcBlocked(lx, lz))
add(hx % 3 ? pump : tall, lx, lz, rot, 0.8);
if (!shcBlocked(rx, rz))
add(pump, rx, rz, rot, hx % 2 ? 0.7 : 0.9);
if (hx % 3 === 0 && !shcBlocked(lx + sx * 0.9, lz + sz * 0.9))
add(shock, lx + sx * 0.9, lz + sz * 0.9, rot);
if (!lite || n < 20) {
var wy = shcY(W.x, W.z) + 2.9;
webs.push([W.x + ox * 0.1 + sx * 1.1 * (hx % 2 ? 1 : -1), wy, W.z + oz * 0.1 + sz * 1.1 * (hx % 2 ? 1 : -1), rot + (hx % 2 ? 0 : Math.PI), 1.5]);
}
var k = KIT[o.archetype], sc = (o.attrs && o.attrs.s) || 1, BW = Math.min(40, k.size[0] * sc * ((o.attrs && o.attrs.w) || 1)), BH = Math.min(60, k.size[1] * sc), BD = k.size[2] * sc * ((o.attrs && o.attrs.d) || 1);
var fx = o.x + ox * (BD / 2 + 0.25), fz = o.z + oz * (BD / 2 + 0.25), gy = shcY(W.x, W.z), ey = gy + Math.max(3.4, BH * 0.78);
if (bulbs.length < (lite ? 1500 : 7000) && BW > 2) {
var nb2 = Math.max(4, Math.round(BW / 0.7));
for (var q = 0; q <= nb2; q++) {
var u = -BW / 2 + BW * q / nb2, f = (q * 0.7) % 3 / 3, sag = Math.sin(f * Math.PI) * 0.45;
bulbs.push([fx + sx * u, ey - sag, fz + sz * u, 0, 1, SHC_BULB[(q + hx) % SHC_BULB.length]]);
}
for (var q2 = 0; q2 <= 10; q2++) {
var u2 = -1.6 + q2 * 0.32, sag2 = Math.sin(q2 / 10 * Math.PI) * 0.5;
bulbs.push([W.x + ox * 0.3 + sx * u2, gy + 3.3 - sag2, W.z + oz * 0.3 + sz * u2, 0, 1, SHC_BULB[(q2 + hx + 1) % SHC_BULB.length]]);
}
if (!lite || n < 25) {
var cx1 = fx + ox * 0.5 + sx * (BW / 2 - 0.6), cz1 = fz + oz * 0.5 + sz * (BW / 2 - 0.6), cx2 = fx + ox * 0.5 - sx * (BW / 2 - 0.6), cz2 = fz + oz * 0.5 - sz * (BW / 2 - 0.6);
if (!shcBlocked(cx1, cz1))
add(pump, cx1, cz1, rot, 1.1);
if (!shcBlocked(cx2, cz2))
add(pump, cx2, cz2, rot, 1.1);
}
}
if (n < (lite ? 4 : 12)) {
var key = "shc:d" + Math.round(o.x) + ":" + Math.round(o.z);
D.glows.push(key);
if (typeof nightGlowSpot === "function")
nightGlowSpot(key, { x: W.x + ox * 0.8, y: shcY(W.x, W.z) + 0.6, z: W.z + oz * 0.8, col: 0xFF8A2A, k: 0.9, r: 7, pri: 1.1 });
}
});
lamps.sort(function (p, q) { return p.d - q.d; });
lamps = lamps.slice(0, lite ? 40 : 140);
lamps.forEach(function (L, n) {
var o = L.o, r = o.rot || 0, x = o.x + Math.cos(r) * 0.6, z = o.z - Math.sin(r) * 0.6;
add(pump, x, z, r, 0.6);
if (o.archetype === "ornatelamp" && n % 2 === 0 && D.ghosts.length < (lite ? 8 : 32))
D.ghosts.push({ x: o.x, z: o.z, y: shcY(o.x, o.z) + Math.max(2.4, L.h * 0.7), ph: n * 1.7 });
});
var clusters = 0, cap = lite ? 5 : 14;
function free(x, z, r) { if (shcBlocked(x, z))
return false; for (var i = 0; i < obs.length; i++) {
var q = obs[i];
if (Math.hypot(q.x - x, q.z - z) < q.r + r)
return false;
} return true; }
SHC_GRASS.forEach(function (band) {
if (dc + reach < band[0] || dc - reach > band[1])
return;
for (var r = band[0] + 14; r < band[1] - 10 && clusters < cap; r += 26) {
if (shcNearStreet(r, 9))
continue;
var span = reach / r, k0 = Math.ceil((ac - span) * r / 26), k1 = Math.floor((ac + span) * r / 26);
for (var k = k0; k <= k1 && clusters < cap; k++) {
var a = k * 26 / r, h = shcHash(k, r);
if (h % 100 >= 11)
continue;
var x = ATLC.x + Math.cos(a) * r, z = ATLC.z + Math.sin(a) * r;
if (!near(x, z) || !atlClearAt(r, a, 7, 3) || !free(x, z, 6))
continue;
clusters++;
var rot = rotIn(a), c = Math.cos(rot), s = Math.sin(rot), kind = (h >>> 8) % 4;
var at = function (u, v) { return [x + u * c + v * s, z - u * s + v * c]; };
if (kind === 0) {
[[-2.2, 0, 0], [2.2, 0, 0], [0, -2.2, Math.PI / 2], [0, 2.2, Math.PI / 2]].forEach(function (f, i) { if (i === 0)
return; var p = at(f[0], f[1]); add(fence, p[0], p[1], rot + f[2]); });
[[-1, 0.6], [0.8, -0.4], [0.2, 1]].forEach(function (g, i) { var p = at(g[0], g[1]); add(graves[i % 3], p[0], p[1], rot + (i - 1) * 0.12); });
var pc = at(-2.6, 2.6);
add(cand, pc[0], pc[1], rot);
var pp = at(2.6, 2.8);
add(pump, pp[0], pp[1], rot);
}
else if (kind === 1) {
[[-1.2, 0], [1.2, 0.3], [0, -1]].forEach(function (g) { var p = at(g[0], g[1]); add(shock, p[0], p[1], rot); });
[[0.4, 1.4], [-0.8, 1.6], [1.6, 1.2], [2.2, -0.6]].forEach(function (g, i) { var p = at(g[0], g[1]); add(pump, p[0], p[1], rot + i, 0.7 + i * 0.12); });
var ph = at(-2.4, -0.8);
add(hay, ph[0], ph[1], rot);
}
else if (kind === 2) {
add(trees, x, z, h % 6);
for (var q = 0; q < 5; q++) {
var pa = q / 5 * Math.PI * 2 + h % 3, p2 = [x + Math.cos(pa) * 2.2, z + Math.sin(pa) * 2.2];
add(q % 2 ? pump : tall, p2[0], p2[1], pa + Math.PI);
}
}
else {
for (var q2 = 0; q2 < 7; q2++) {
var la = q2 / 7 * Math.PI * 2, p3 = [x + Math.cos(la) * 2.6, z + Math.sin(la) * 2.6];
add(lant, p3[0], p3[1], la);
}
add(cand, x, z, 0);
}
}
}
});
var gotTall = false;
shcPumpkins(G, pump);
shcModels(G, SHC_GY + "pumpkin-tall-carved.glb", 0.95, tall, gen, function (ok) { if (!ok && SHC.deco && SHC.deco.gen === gen)
shcPumpkins(G, tall.map(function (p) { return [p[0], p[1], p[2], p[3], 1.15]; })); });
shcModels(G, SHC_GY + "lantern-candle.glb", 0.75, lant, gen, function (ok) { if (!ok && SHC.deco && SHC.deco.gen === gen)
shcInst(G, shcGeo("lantern"), shcMat("lantern"), lant); });
shcModels(G, SHC_GY + "candle-multiple.glb", 0.5, cand, gen);
shcModels(G, SHC_GY + "hay-bale.glb", 0.9, hay, gen);
shcModels(G, SHC_GY + "iron-fence.glb", 1.4, fence, gen);
shcModels(G, SHC_GY + "gravestone-round.glb", 1.1, graves[0], gen);
shcModels(G, SHC_GY + "gravestone-cross.glb", 1.3, graves[1], gen);
shcModels(G, SHC_GY + "gravestone-decorative.glb", 1.3, graves[2], gen);
shcModels(G, "kaykit/halloween/tree_dead_large.glb", 6, trees, gen);
shcInst(G, shcGeo("shock"), shcMat("shock"), shock);
shcInst(G, shcGeo("web"), shcMat("web"), webs);
shcInst(G, shcGeo("bulb"), shcMat("bulb"), bulbs, true);
shcInst(G, shcGeo("flame"), shcMat("flame"), lant.map(function (p) { return [p[0], p[1] + 0.32, p[2], 0, 0.7]; }).concat(cand.map(function (p) { return [p[0], p[1] + 0.42, p[2], 0, 0.5]; })));
if (D.ghosts.length)
shcGhostBuild(G, D);
D.counts = { bulbs: bulbs.length, pumpkins: pump.length + tall.length, lanterns: lant.length, doors: bl.length, lamps: lamps.length, clusters: clusters, webs: webs.length };
},
function () {
shcMarksDrop();
var G = new THREE.Group();
G.name = "samhain tower and plaza";
scene.add(G);
var M = SHC.marks = { g: G, glows: [], bats: null }, lite = shcLite();
var cx = ATLC.x, cz = ATLC.z, y0 = shcY(cx, cz);
var bgeo = new THREE.PlaneGeometry(4.6, 104), bl = [[], []];
[0, 1, 2, 3].forEach(function (f) {
var a = f * Math.PI / 2, nx = Math.sin(a), nz = Math.cos(a), tx = Math.cos(a), tz = -Math.sin(a);
[-12.4, 12.4].forEach(function (u, i) { bl[(f + i) % 2].push([cx + nx * 15.75 + tx * u, y0 + 100, cz + nz * 15.75 + tz * u, a, 1]); });
});
bl.forEach(function (L, n) { var m = new THREE.MeshBasicMaterial({ map: shcBannerTex(n), color: 0xD8D0D0, side: THREE.DoubleSide, fog: true }); shcInst(G, bgeo, m, L).userData.shcMine = true; });
var crown = [];
for (var s = 0; s < 4; s++)
for (var k = 0; k < 10; k++) {
var u = -16.2 + k * 3.6, a2 = s * Math.PI / 2, nx2 = Math.sin(a2), nz2 = Math.cos(a2);
crown.push([cx + nx2 * 18.6 + Math.cos(a2) * u, y0 + 150.2, cz + nz2 * 18.6 - Math.sin(a2) * u, a2, 2.2]);
}
shcInst(G, shcGeo("lantern"), shcMat("lantern"), crown);
var web = shcMine(new THREE.Mesh(new THREE.PlaneGeometry(26, 26), new THREE.MeshBasicMaterial({ map: shcWebTex(), transparent: true, depthWrite: false, side: THREE.DoubleSide, opacity: 0.7, fog: true })));
web.position.set(cx + 14.2, y0 + 128, cz + 14.2);
web.rotation.y = Math.PI / 4;
G.add(web);
var nb = lite ? 18 : 48, bats = new THREE.InstancedMesh(shcGeo("bat"), shcMat("bat"), nb);
bats.raycast = function () { };
bats.userData.shcOwn = true;
G.add(bats);
M.bats = { im: bats, L: [] };
for (var b = 0; b < nb; b++)
M.bats.L.push({ r: 24 + (b * 7) % 24, y: y0 + 160 + (b * 13) % 46, a: b * 2.4, v: (0.12 + (b % 5) * 0.03) * (b % 3 ? 1 : -1), ph: b });
shcBatsTick();
var fr = (typeof KIT !== "undefined" && KIT.tierfountain ? Math.max(KIT.tierfountain.size[0], KIT.tierfountain.size[2]) * 1.5 / 2 : 5) + 0.9, heap = [];
[0.78, 2.36, 3.93, 5.5].forEach(function (fa, fi) {
var f = shcAt(88, fa), n = lite ? 10 : 18;
for (var i = 0; i < n; i++) {
var a = i / n * Math.PI * 2, x = f.x + Math.cos(a) * fr, z = f.z + Math.sin(a) * fr;
heap.push([x, shcY(x, z), z, a + Math.PI / 2 + Math.PI, 0.9 + ((i * 7) % 4) * 0.12]);
}
[0, 1, 2, 3].forEach(function (q) {
var a = q * Math.PI / 2 + fa + Math.PI / 4, R = fr + 2.2, bx = f.x + Math.cos(a) * R, bz = f.z + Math.sin(a) * R, yb = shcY(bx, bz), ro = a + Math.PI;
var c = Math.cos(a), sn = Math.sin(a), pos = [[-1, 0, 0], [0, 0, 0], [1, 0, 0], [-0.5, 0, 0.87], [0.5, 0, 0.87], [0, 0, 1.74], [-0.5, 0.85, 0.58], [0.5, 0.85, 0.58], [0, 0.85, 1.45], [0, 1.7, 0.97]];
pos.forEach(function (p) { var u = p[0] * 1.05, v = p[2] * 1.05 - 0.9; heap.push([bx + u * -sn + v * c, yb + p[1], bz + u * c + v * sn, ro, 1]); });
});
});
shcPumpkins(G, heap);
var J = shcJackSpot(), gj = { x: J.x, z: J.z }, gy = shcY(gj.x, gj.z), rot = rotIn(J.a);
shcPumpkins(G, [[gj.x, gy, gj.z, rot, 5.2]]);
M.glows.push("shc:greatjack");
if (typeof nightGlowSpot === "function")
nightGlowSpot("shc:greatjack", { x: gj.x + Math.sin(rot) * 3.2, y: gy + 2.4, z: gj.z + Math.cos(rot) * 3.2, col: 0xFF8A20, k: 2.2, r: 22, pri: 2 });
M.greatJack = { x: gj.x, z: gj.z };
var obs = shcPlazaObs(), rimL = [], rimP = [], poles = [], swag = [];
function clearAt(x, z, r) { for (var i = 0; i < obs.length; i++)
if (Math.hypot(obs[i].x - x, obs[i].z - z) < obs[i].r + r)
return false; return true; }
for (var ri = 0; ri < Math.PI * 2; ri += (lite ? 9 : 5) / 137) {
var rp = shcAt(137, ri);
if (!atlClearAt(137, ri, 0.6, 0.5) || !clearAt(rp.x, rp.z, 0.8))
continue;
var k3 = Math.round(ri * 137 / 5);
(k3 % 2 ? rimP : rimL).push([rp.x, shcY(rp.x, rp.z), rp.z, rotIn(ri), k3 % 2 ? 1 : 1]);
}
for (var pi = 0; pi < Math.PI * 2 - 0.001; pi += 13 / 78) {
var pp = shcAt(78, pi);
poles.push(atlClearAt(78, pi, 1, 1) && clearAt(pp.x, pp.z, 1.2) ? [pp.x, shcY(pp.x, pp.z), pp.z] : null);
}
if (typeof evtPolesAndBunting === "function")
try {
evtPolesAndBunting(G, poles, [0xFF7A1A, 0x6A2AA8, 0x241A20, 0xE8A020], true);
}
catch (e) { }
var ph = typeof KIT !== "undefined" && KIT.hubpillar ? KIT.hubpillar.size[1] : 9;
for (var p12 = 0; p12 < 12; p12++) {
var a1 = (p12 / 12) * Math.PI * 2 + 0.13, a2 = ((p12 + 1) / 12) * Math.PI * 2 + 0.13, A = shcAt(40.8, a1), B = shcAt(40.8, a2);
for (var q = 1; q < 24; q++) {
var f = q / 24;
swag.push([A.x + (B.x - A.x) * f, y0 + ph * 0.85 - Math.sin(f * Math.PI) * 2.2, A.z + (B.z - A.z) * f, 0, 1.4, SHC_BULB[q % SHC_BULB.length]]);
}
}
shcModels(G, SHC_GY + "lantern-candle.glb", 0.75, rimL, function () { return SHC.marks === M; }, function (ok) { if (!ok && SHC.marks === M)
shcInst(G, shcGeo("lantern"), shcMat("lantern"), rimL); });
shcInst(G, shcGeo("flame"), shcMat("flame"), rimL.map(function (p) { return [p[0], p[1] + 0.32, p[2], 0, 0.7]; }));
shcPumpkins(G, rimP);
shcInst(G, shcGeo("bulb"), shcMat("bulb"), swag, true);
if (typeof ATL_STAIRS !== "undefined") {
var mains = ATL_STAIRS.filter(function (s) { return s.main; }), R = 136, pil = [], beam = [], tops = [], lan = [];
mains.forEach(function (s) {
var w = s.half + 0.3, rot2 = rotAlong(s.a);
[-1, 1].forEach(function (sd) { var p = shcAt(R, s.a + sd * w / R); pil.push([p.x, shcY(p.x, p.z), p.z, rot2, 1]); lan.push([p.x, shcY(p.x, p.z) + 8.4, p.z, 0, 1.6]); });
var c = shcAt(R, s.a), yc = shcY(c.x, c.z);
beam.push([c.x, yc + 7.6, c.z, rotIn(s.a), 1]);
for (var k = -3; k <= 3; k++) {
var p2 = shcAt(R, s.a + k * 2.3 / R);
tops.push([p2.x, yc + 8.15, p2.z, rotIn(s.a) + Math.PI, 0.9]);
}
});
var stone = new THREE.MeshLambertMaterial({ color: 0x2A2228 });
shcInst(G, new THREE.BoxGeometry(0.9, 8.2, 0.9).translate(0, 4.1, 0), stone, pil).userData.shcMine = true;
var bm = shcInst(G, new THREE.BoxGeometry(2 * (mains[0] ? mains[0].half : 8) + 1.6, 1, 0.8), stone, beam);
if (bm)
bm.userData.shcMine = true;
shcPumpkins(G, tops);
shcInst(G, shcGeo("lantern"), shcMat("lantern"), lan);
var sm = new THREE.MeshBasicMaterial({ map: shcSignTex("Samhain Night", "in Somnucor · the Samhain Fair in the plaza", "#FF9A30"), side: THREE.DoubleSide, fog: true }), sg = new THREE.PlaneGeometry(9, 2.25);
mains.forEach(function (s) { var c = shcAt(R + 0.45, s.a), m = new THREE.Mesh(sg, sm); m.position.set(c.x, shcY(c.x, c.z) + 6.3, c.z); m.rotation.y = rotIn(s.a); shcMine(m); G.add(m); });
}
},
function () {
var M = SHC.marks;
if (!M || !M.bats)
return;
var t = performance.now() / 1000, B = M.bats;
B.L.forEach(function (b, i) {
var a = b.a + t * b.v;
SHC_O.position.set(ATLC.x + Math.cos(a) * b.r, b.y + Math.sin(t * 0.5 + b.ph) * 3, ATLC.z + Math.sin(a) * b.r);
SHC_O.rotation.set(0, -a + (b.v > 0 ? 0 : Math.PI), 0);
var f = 0.55 + 0.45 * Math.abs(Math.sin(t * 5 + b.ph));
SHC_O.scale.set(2 * f, 2, 2);
SHC_O.updateMatrix();
B.im.setMatrixAt(i, SHC_O.matrix);
});
B.im.instanceMatrix.needsUpdate = true;
},
function () {
if (SHC_DRESS.geo)
return SHC_DRESS;
var cone = new THREE.ConeGeometry(0.17, 0.42, 10);
cone.translate(0, 0.24, 0);
var brim = new THREE.CylinderGeometry(0.3, 0.3, 0.02, 14);
var mask = new THREE.PlaneGeometry(0.2, 0.08);
SHC_DRESS.geo = { cone: cone, brim: brim, mask: mask };
SHC_DRESS.mat = { black: new THREE.MeshLambertMaterial({ color: 0x16121A }), violet: new THREE.MeshLambertMaterial({ color: 0x4A2080 }), band: new THREE.MeshLambertMaterial({ color: 0xE87A1A }),
mask: new THREE.MeshBasicMaterial({ color: 0x111015, side: THREE.DoubleSide }), bone: new THREE.MeshBasicMaterial({ color: 0xEDE4D0, side: THREE.DoubleSide }) };
return SHC_DRESS;
},
function (kind) {
var K = shcDressKit(), g = new THREE.Group();
g.name = "samhain costume";
if (kind === 0 || kind === 2) {
var c = new THREE.Mesh(K.geo.cone, kind ? K.mat.violet : K.mat.black), b = new THREE.Mesh(K.geo.brim, kind ? K.mat.violet : K.mat.black), band = new THREE.Mesh(K.geo.brim, K.mat.band);
band.scale.set(0.58, 2, 0.58);
band.position.y = 0.04;
c.rotation.z = kind ? 0 : 0.12;
g.add(c);
g.add(b);
g.add(band);
}
else {
var m = new THREE.Mesh(K.geo.mask, kind === 1 ? K.mat.mask : K.mat.bone);
m.position.set(0, -0.14, 0.12);
g.add(m);
}
g.traverse(function (o) { o.raycast = function () { }; });
return g;
},
function (g) {
if (g.userData.shcTop !== undefined)
return g.userData.shcTop;
var hide = [];
g.children.forEach(function (c) { if (c.name === "samhain costume") {
hide.push(c);
g.remove(c);
} });
var b = new THREE.Box3().setFromObject(g), top = (b.max.y - g.position.y) / (g.scale.y || 1);
hide.forEach(function (c) { g.add(c); });
if (!(top > 0.6 && top < 4))
top = -1;
return (g.userData.shcTop = top);
},
function () {
if (SHC.pobs)
return SHC.pobs;
var obs = [];
store.objects.forEach(function (o) {
if (o.realm !== ATLC.id || !KIT[o.archetype] || KIT[o.archetype].cat === "being")
return;
var d = Math.hypot(o.x - ATLC.x, o.z - ATLC.z);
if (d > 140)
return;
var k = KIT[o.archetype], s = (o.attrs && o.attrs.s) || 1;
obs.push({ x: o.x, z: o.z, r: Math.max(k.size[0] * ((o.attrs && o.attrs.w) || 1), k.size[2] * ((o.attrs && o.attrs.d) || 1)) * s * 0.5 });
});
try {
if (typeof festLayout === "function")
festLayout().forEach(function (q) { obs.push({ x: q.x, z: q.z, r: q.rad + 1 }); });
}
catch (e) { }
try {
var S = shnPlazaSpots();
if (S) {
obs.push({ x: S.gate.x, z: S.gate.z, r: 8 });
obs.push({ x: S.tent.x, z: S.tent.z, r: 8 });
}
}
catch (e) { }
var sp = shcAt(58, -Math.PI / 2);
obs.push({ x: sp.x, z: sp.z, r: 12 });
if (obs.length > 20)
SHC.pobs = obs;
return obs;
},
function () {
if (SHC.jack)
return SHC.jack;
var obs = shcPlazaObs(), got = null;
for (var k = 0; k < 160 && !got; k++) {
var a = Math.PI + 0.17 + (k % 2 ? 1 : -1) * Math.ceil(k / 2) * 0.02, R = [97, 104, 90][Math.floor(k / 80) % 3], p = shcAt(R, a);
if (!atlClearAt(R, a, 3, 2))
continue;
var bad = false;
obs.forEach(function (o) { if (!bad && Math.hypot(o.x - p.x, o.z - p.z) < o.r + 3.2)
bad = true; });
if (!bad)
got = { x: p.x, z: p.z, a: a, r: R };
}
if (!got) {
var p2 = shcAt(97, Math.PI + 0.17);
got = { x: p2.x, z: p2.z, a: Math.PI + 0.17, r: 97 };
}
if (SHC.pobs)
SHC.jack = got;
return got;
},
function () {
if (SHC.spots)
return SHC.spots;
var obs = shcPlazaObs(), avoid = [], J = shcJackSpot(), gj = { x: J.x, z: J.z };
avoid.push({ x: gj.x, z: gj.z, r: 7 });
var c = [];
SHC_FAIR_R.forEach(function (r, ri) { for (var a = 0; a < Math.PI * 2; a += 0.02) {
var d = Math.abs(atlWrap(a - J.a));
c.push({ r: r, a: a, d: d + ri * 0.05 });
} });
c.sort(function (p, q) { return p.d - q.d; });
var got = [];
for (var i = 0; i < c.length && got.length < SHC_STALLS.length; i++) {
var q = c[i], p = shcAt(q.r, q.a);
if (!atlClearAt(q.r, q.a, 3.5, 2))
continue;
var bad = false;
obs.concat(avoid).forEach(function (o) { if (!bad && Math.hypot(o.x - p.x, o.z - p.z) < o.r + 3.4)
bad = true; });
if (bad)
continue;
got.forEach(function (g) { if (!bad && Math.hypot(g.x - p.x, g.z - p.z) < 11)
bad = true; });
if (bad)
continue;
got.push({ x: p.x, z: p.z, a: q.a, r: q.r });
}
got.sort(function (p, q) { return p.a - q.a; });
if (SHC.pobs)
SHC.spots = got;
return got;
},
function () {
shcFairDrop();
var spots = shcFairSpots();
if (!spots.length)
return;
var G = new THREE.Group();
G.name = "samhain fair";
scene.add(G);
var F = SHC.fair = { g: G, stalls: [], glows: [], flames: [], bubbles: [] }, lite = shcLite();
var wood = shcMine(new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshLambertMaterial({ color: 0x4A3020 }))), posts = [];
var dark = new THREE.MeshLambertMaterial({ color: 0x1A1418 });
SHC_STALLS.forEach(function (st, i) {
var p = spots[i];
if (!p)
return;
var g = new THREE.Group(), y = shcY(p.x, p.z), rot = rotIn(p.a);
g.position.set(p.x, y, p.z);
g.rotation.y = rot;
G.add(g);
var S = { k: st.k, st: st, x: p.x, z: p.z, y: y, rot: rot, g: g, fx: p.x + Math.sin(rot) * 3.4, fz: p.z + Math.cos(rot) * 3.4 };
F.stalls.push(S);
function box(w, h, d, mat, x, yy, z) { var m = new THREE.Mesh(wood.geometry, mat); m.scale.set(w, h, d); m.position.set(x, yy, z); m.raycast = function () { }; g.add(m); return m; }
var sign = new THREE.Mesh(new THREE.PlaneGeometry(4.2, 1.05), new THREE.MeshBasicMaterial({ map: shcSignTex(st.n, st.sub, st.col), fog: true }));
shcMine(sign);
sign.position.set(0, 3.75, 1.62);
g.add(sign);
if (st.fire) {
for (var s2 = 0; s2 < 10; s2++) {
var a = s2 / 10 * Math.PI * 2;
box(0.5, 0.32, 0.4, dark, Math.cos(a) * 1.3, 0.16, Math.sin(a) * 1.3).rotation.y = -a;
}
[[0, 2.8, 0], [2.6, 1.2, 1.2], [-2.6, 1.2, -1.2]].forEach(function (l) { var m = box(2.4, 0.42, 0.42, wood.material, l[0], 0.21, l[1]); m.rotation.y = l[2]; });
var fm = new THREE.MeshBasicMaterial({ color: 0xFF8A20, transparent: true, opacity: 0.85, depthWrite: false }), fg = new THREE.ConeGeometry(0.4, 1.4, 7);
fg.translate(0, 0.7, 0);
for (var f = 0; f < 4; f++) {
var fl = new THREE.Mesh(fg, fm);
fl.position.set(Math.cos(f * 1.6) * 0.3, 0.1, Math.sin(f * 1.6) * 0.3);
fl.raycast = function () { };
if (f === 0)
shcMine(fl);
g.add(fl);
F.flames.push({ m: fl, ph: f * 1.3 });
}
box(0.3, 3.2, 0.3, wood.material, -1.9, 1.6, 1.6);
box(0.3, 3.2, 0.3, wood.material, 1.9, 1.6, 1.6);
box(4.4, 0.3, 0.3, wood.material, 0, 3.2, 1.6);
sign.position.set(0, 3.75, 1.62);
var key = "shc:fire";
F.glows.push(key);
if (typeof nightGlowSpot === "function")
nightGlowSpot(key, { x: p.x, y: y + 1, z: p.z, col: 0xFF7A20, k: 1.8, r: 16, pri: 1.8 });
return;
}
box(3.6, 1.05, 0.8, wood.material, 0, 0.52, 1.1);
[[-1.8, 1.4], [1.8, 1.4], [-1.8, -1.4], [1.8, -1.4]].forEach(function (q) { posts.push([p.x + q[0] * Math.cos(rot) + q[1] * Math.sin(rot), y, p.z - q[0] * Math.sin(rot) + q[1] * Math.cos(rot), rot, 1]); });
var can = new THREE.Mesh(new THREE.BoxGeometry(4.2, 0.35, 3.4), new THREE.MeshLambertMaterial({ map: shcStripeTex(st.col) }));
shcMine(can);
can.position.set(0, 3.05, 0);
g.add(can);
var back = box(3.6, 2.6, 0.12, dark, 0, 1.3, -1.45);
if (st.k === "toss") {
var tp = [];
[-1, 0, 1].forEach(function (u) { box(0.12, 0.9 + Math.abs(u) * 0.3, 0.12, wood.material, u * 1.1, 0.45 + Math.abs(u) * 0.15, -0.6); tp.push([p.x, 0, p.z]); });
var pk = [];
[-1, 0, 1].forEach(function (u) { var lx = u * 1.1, lz = -0.6, ly = 0.95 + Math.abs(u) * 0.3; pk.push([p.x + lx * Math.cos(rot) + lz * Math.sin(rot), y + ly, p.z - lx * Math.sin(rot) + lz * Math.cos(rot), rot, 0.75]); });
shcPumpkins(G, pk);
var hm = new THREE.MeshLambertMaterial({ color: 0xE8C040 }), hg = new THREE.TorusGeometry(0.22, 0.03, 6, 16);
for (var h = 0; h < 5; h++) {
var ho = new THREE.Mesh(hg, hm);
ho.position.set(-1 + h * 0.5, 2.4, 1.45);
ho.raycast = function () { };
if (h === 0)
shcMine(ho);
g.add(ho);
}
}
else if (st.k === "cauldron") {
var pot = new THREE.Mesh(new THREE.SphereGeometry(0.75, 14, 10, 0, Math.PI * 2, 0.5, Math.PI - 0.5), new THREE.MeshLambertMaterial({ color: 0x16141A, side: THREE.DoubleSide }));
shcMine(pot);
pot.position.set(0, 0.75, -0.3);
g.add(pot);
var brew = new THREE.Mesh(new THREE.CircleGeometry(0.62, 18), new THREE.MeshBasicMaterial({ color: 0x5AE06A }));
shcMine(brew);
brew.rotation.x = -Math.PI / 2;
brew.position.set(0, 1.38, -0.3);
g.add(brew);
var bm = new THREE.MeshBasicMaterial({ color: 0xA8FFB0, transparent: true, opacity: 0.8 }), bg = new THREE.SphereGeometry(0.07, 6, 4);
for (var b2 = 0; b2 < 6; b2++) {
var bu = new THREE.Mesh(bg, bm);
bu.raycast = function () { };
if (b2 === 0)
shcMine(bu);
g.add(bu);
F.bubbles.push({ m: bu, ph: b2 * 0.9, x: Math.cos(b2 * 1.1) * 0.35, z: -0.3 + Math.sin(b2 * 1.1) * 0.35 });
}
var ck = "shc:cauldron";
F.glows.push(ck);
if (typeof nightGlowSpot === "function")
nightGlowSpot(ck, { x: p.x, y: y + 1.6, z: p.z, col: 0x5AE06A, k: 1.2, r: 9, pri: 1.3 });
}
else if (st.k === "fortune") {
var ball = new THREE.Mesh(new THREE.SphereGeometry(0.22, 16, 12), new THREE.MeshLambertMaterial({ color: 0xB890FF, emissive: 0x40206A, transparent: true, opacity: 0.8 }));
shcMine(ball);
ball.position.set(0, 1.27, 1.1);
g.add(ball);
F.ball = ball;
var cl = [];
[-1.3, 1.3].forEach(function (u) { cl.push([p.x + u * Math.cos(rot) + 1.1 * Math.sin(rot), y + 1.05, p.z - u * Math.sin(rot) + 1.1 * Math.cos(rot), rot, 1]); });
shcModels(G, SHC_GY + "candle-multiple.glb", 0.4, cl, function () { return SHC.fair === F; });
}
else if (st.k === "hunt") {
var hl = [];
for (var q = 0; q < 7; q++) {
var u2 = -1.8 + q * 0.6;
hl.push([p.x + u2 * Math.cos(rot) + 1.5 * Math.sin(rot), y + 2.55, p.z - u2 * Math.sin(rot) + 1.5 * Math.cos(rot), rot, 1]);
}
shcInst(G, shcGeo("lantern"), shcMat("lantern"), hl);
}
else if (st.k === "show") {
F.screenCv = document.createElement("canvas");
F.screenCv.width = 256;
F.screenCv.height = 160;
F.screenTex = new THREE.CanvasTexture(F.screenCv);
var scr = new THREE.Mesh(new THREE.PlaneGeometry(3.3, 2.1), new THREE.MeshBasicMaterial({ map: F.screenTex, fog: true }));
shcMine(scr);
scr.position.set(0, 1.75, -1.36);
g.add(scr);
F.screen = scr;
shcScreenDraw(0);
}
if (i === 0)
shcMine(back);
});
var pm = new THREE.MeshLambertMaterial({ color: 0x2A1A12 }), pg = new THREE.BoxGeometry(0.16, 3, 0.16);
pg.translate(0, 1.5, 0);
var pi = shcInst(G, pg, pm, posts);
if (pi)
pi.userData.shcMine = true;
G.add(wood);
wood.visible = false;
F.counts = { stalls: F.stalls.length };
},
function (t) {
var F = SHC.fair;
if (!F || !F.screenCv)
return;
var x = F.screenCv.getContext("2d"), W = 256, H = 160;
x.fillStyle = "#08070C";
x.fillRect(0, 0, W, H);
for (var i = 0; i < 6; i++) {
var sx = W / 2 + Math.sin(t * 0.3 + i) * 60, sy = H * 0.7 - ((t * 12 + i * 30) % 120), g = x.createRadialGradient(sx, sy, 2, sx, sy, 40);
g.addColorStop(0, "rgba(150,150,170,.18)");
g.addColorStop(1, "rgba(150,150,170,0)");
x.fillStyle = g;
x.fillRect(0, 0, W, H);
}
var ph = (t % 12) / 12, s = 0.4 + ph * 1.2, al = Math.sin(ph * Math.PI);
x.save();
x.globalAlpha = al * 0.8;
x.translate(W / 2, H / 2);
x.scale(s, s);
x.fillStyle = "#DCE4F0";
x.beginPath();
x.arc(0, -20, 22, Math.PI, 0);
x.lineTo(22, 24);
for (var k = 0; k < 5; k++)
x.quadraticCurveTo(18 - k * 9, 14, 13 - k * 9, 24);
x.closePath();
x.fill();
x.fillStyle = "#08070C";
x.beginPath();
x.ellipse(-8, -20, 4, 6, 0, 0, 7);
x.ellipse(8, -20, 4, 6, 0, 0, 7);
x.fill();
x.restore();
F.screenTex.needsUpdate = true;
},
function (dt) {
var F = SHC.fair;
if (!F)
return;
var t = performance.now() / 1000;
F.flames.forEach(function (f) { var s = 0.8 + 0.25 * Math.sin(t * 2.6 + f.ph) + 0.1 * Math.sin(t * 4.1 + f.ph * 2); f.m.scale.set(1, s, 1); });
F.bubbles.forEach(function (b) { var u = ((t * 0.5 + b.ph) % 1); b.m.position.set(b.x, 1.38 + u * 0.35, b.z); b.m.scale.setScalar(0.6 + u * 0.8); });
if (F.ball)
F.ball.material.emissive.setHSL(0.75, 0.6, 0.12 + 0.06 * Math.sin(t * 0.9));
if (F.screen) {
F.st = (F.st || 0) + dt;
var P = camera.position, near = F.stalls.some(function (S) { return S.k === "show" && Math.hypot(P.x - S.x, P.z - S.z) < 40; });
if (near && F.st > 0.15) {
F.st = 0;
shcScreenDraw(t);
}
}
},
function () {
var T = shcGame();
T.x = 0;
T.v = 1;
T.left = 5;
T.hit = 0;
T.iv = null;
T.last = "";
function bar() {
return "<div style='position:relative;height:40px;margin:10px 0;border-radius:6px;background:linear-gradient(90deg,#1A1014,#2A1A20,#1A1014)'>" +
[18, 50, 82].map(function (c) { return "<div style='position:absolute;left:" + (c - 5) + "%;width:10%;top:6px;bottom:6px;border-radius:50%;background:#E8701A;box-shadow:0 0 10px #FF9A30'></div>"; }).join("") +
"<div id='shc-hoop' style='position:absolute;top:2px;width:30px;height:30px;margin-left:-15px;border:4px solid #E8C040;border-radius:50%;left:0'></div></div>";
}
function html() {
return worldFacts("⭕ The Pumpkin Toss", "Throw when the hoop is over a pumpkin. Ring three of your five hoops to win.", [["Hoops left", String(T.left)], ["Ringers", String(T.hit)]], []) + bar() +
(T.last ? "<div style='margin:4px 0;color:#FFE7B0'>" + T.last + "</div>" : "") + worldBtn("throw", "⭕ Throw!", "");
}
function show() { worldCard(html(), { throw: thr }); }
function thr() {
if (T.left <= 0)
return;
T.left--;
var x = T.x * 100, ok = [18, 50, 82].some(function (c) { return Math.abs(x - c) < 4.5; });
if (ok) {
T.hit++;
T.last = "🎃 A ringer!";
}
else
T.last = "Clatter... it bounces off.";
if (T.hit >= 3) {
clearInterval(T.iv);
worldCard(null);
shcPay("toss", "⭕ <b>Three ringers at the Pumpkin Toss!</b> The stall keeper hands you a hoop to keep.");
return;
}
if (T.left <= 0) {
clearInterval(T.iv);
worldCard(worldFacts("⭕ The Pumpkin Toss", "Out of hoops: " + T.hit + " ringer" + (T.hit === 1 ? "" : "s") + ". Have another go?", [], []) + worldBtn("again", "Five more hoops", ""), { again: shcToss });
return;
}
show();
}
show();
T.iv = setInterval(function () {
if (!shcMine2(T) || !document.getElementById("shc-hoop")) {
clearInterval(T.iv);
return;
}
T.x += T.v * 0.012;
if (T.x > 1) {
T.x = 1;
T.v = -1;
}
if (T.x < 0) {
T.x = 0;
T.v = 1;
}
document.getElementById("shc-hoop").style.left = (T.x * 100) + "%";
}, 30);
},
function () {
var C = shcGame();
C.round = 0;
C.seq = [];
C.got = 0;
C.iv = null;
function begin() {
var n = 3 + C.round;
C.seq = [];
for (var i = 0; i < n; i++)
C.seq.push(Math.floor(Math.random() * SHC_BREW.length));
C.got = 0;
var k = -1;
function paint() {
worldCard(worldFacts("🧪 The Witches' Cauldron", "\"Double, double toil and trouble; fire burn and cauldron bubble.\" Watch what the witches drop in, round " + (C.round + 1) + " of 3.", [], []) +
"<div style='display:flex;flex-wrap:wrap;gap:6px;margin:10px 0'>" + C.seq.map(function (q, i) { var on = i === k; return "<div style='font-size:26px;padding:6px 8px;border-radius:6px;transition:background .5s;background:" + (on ? "rgba(90,224,106,.35)" : "rgba(255,255,255,.04)") + "'>" + (i <= k ? SHC_BREW[q][0] : "·") + "</div>"; }).join("") + "</div>" +
(k >= 0 && k < C.seq.length ? "<div style='color:#A8FFB0'>" + esc(SHC_BREW[C.seq[k]][1]) + "...</div>" : ""), {});
}
paint();
C.iv = setInterval(function () { if (!shcMine2(C)) {
clearInterval(C.iv);
return;
} k++; if (k < C.seq.length) {
paint();
if (typeof playTone === "function")
try {
playTone(220 + C.seq[k] * 40, 0.3);
}
catch (e) { }
}
else {
clearInterval(C.iv);
ask();
} }, 1100);
}
function ask() {
var fns = {}, b = "<div style='display:grid;grid-template-columns:1fr 1fr;gap:4px'>";
SHC_BREW.forEach(function (q, i) { b += worldBtn("i" + i, q[0] + " " + esc(q[1]), ""); fns["i" + i] = function () { pick(i); }; });
worldCard(worldFacts("🧪 Now you drop them in", "In the same order: " + C.got + " of " + C.seq.length + " so far.", [], []) + b + "</div>", fns);
}
function pick(i) {
if (C.seq[C.got] !== i) {
worldCard(worldFacts("🧪 The brew fizzles out", "Wrong one! The witches cackle and tip it out.", [], []) + worldBtn("again", "Start again", ""), { again: shcCauldron });
return;
}
C.got++;
if (C.got < C.seq.length) {
ask();
return;
}
C.round++;
if (C.round < 3) {
worldCard(worldFacts("🧪 It bubbles green!", "Round " + C.round + " brewed. Ready for a longer spell?", [], []) + worldBtn("go", "Next round", ""), { go: begin });
return;
}
worldCard(null);
shcPay("cauldron", "🧪 <b>\"Like a hell-broth boil and bubble!\"</b> Your brew is perfect, and the witches give you an eye of newt in a jar.");
}
begin();
},
function () {
shcGame();
var fns = {}, b = "";
SHC_FORTUNES.forEach(function (F, i) {
b += worldBtn("f" + i, "🔮 " + esc(F.n), esc(F.how));
fns["f" + i] = function () {
var out = F.out[Math.floor(Math.random() * F.out.length)];
worldCard(null);
shcPay("fortune", "🔮 <b>" + esc(F.n) + ".</b> " + esc(F.how) + " <b>" + esc(out) + "</b>");
};
});
worldCard(worldFacts("🔮 The Fortune Booth", "On Halloween night, Robert Burns wrote in 1785, the country people tried their fortunes in the old ways. Choose one.", [], []) + b, fns);
},
function () {
shcGame();
var fns = {}, b = "";
SHC_TALES.forEach(function (T, i) { b += worldBtn("t" + i, "📖 " + esc(T.n), esc(T.by)); fns["t" + i] = function () { shcTale(i, 0); }; });
worldCard(worldFacts("🔥 The Storyteller's Fire", "Pull up a log. The storyteller pokes the fire, and asks which tale you'd like tonight.", [], []) + b, fns);
},
function (i, pg) {
var T = SHC_TALES[i], last = pg >= T.pages.length - 1, fns = {};
var b = "<div style='margin:10px 0;line-height:1.55;font:15px Georgia,serif'>" + esc(T.pages[pg]) + "</div><div style='opacity:.6;font-size:12px'>Page " + (pg + 1) + " of " + T.pages.length + "</div>";
if (window.speechSynthesis) {
b += worldBtn("say", "🔊 Read it aloud", "");
fns.say = function () { shcSpeak(T.pages[pg]); };
}
if (!last) {
b += worldBtn("next", "Go on...", "");
fns.next = function () { shcTale(i, pg + 1); };
}
else {
b += worldBtn("end", "The fire crackles. The end.", "");
fns.end = function () { try {
if (window.speechSynthesis)
speechSynthesis.cancel();
}
catch (e) { } worldCard(null); shcPay("story", "🔥 <b>" + esc(T.n) + "</b>: the storyteller tosses a pinch of salt on the fire, and the flames turn blue for a moment. You keep an ember for luck."); };
}
worldCard(worldFacts("🔥 " + T.n, T.by, [], []) + b, fns);
},
function () {
if (document.getElementById("shc-show"))
return;
var el = document.createElement("div");
el.id = "shc-show";
el.style.cssText = "position:fixed;inset:0;z-index:90;background:#000;display:flex;flex-direction:column;align-items:center;justify-content:center";
el.innerHTML = "<canvas id='shc-show-cv' width='640' height='400' style='width:min(96vw,960px);max-height:72vh;background:#000'></canvas><div id='shc-show-say' style='max-width:720px;margin:14px 18px 0;color:#E8E0D0;font:17px Georgia,serif;text-align:center;min-height:52px;transition:opacity 1.5s'></div>" +
"<button class='btn' id='shc-show-x' style='margin-top:12px'>Leave the show</button>";
document.body.appendChild(el);
if (document.exitPointerLock)
document.exitPointerLock();
var cv = document.getElementById("shc-show-cv"), x = cv.getContext("2d"), t0 = performance.now(), line = -1, done = false;
function close() { done = true; if (el.parentNode)
el.parentNode.removeChild(el); }
document.getElementById("shc-show-x").onclick = close;
function figure(kind, s, al) {
x.save();
x.globalAlpha = al;
x.translate(320, 210);
x.scale(s, s);
x.fillStyle = "#DDE6F2";
x.strokeStyle = "#DDE6F2";
x.lineWidth = 4;
if (kind === "ghost") {
x.beginPath();
x.arc(0, -40, 40, Math.PI, 0);
x.lineTo(40, 60);
for (var k = 0; k < 6; k++)
x.quadraticCurveTo(34 - k * 14, 44, 27 - k * 14, 60);
x.closePath();
x.fill();
x.fillStyle = "#000";
x.beginPath();
x.ellipse(-14, -40, 7, 11, 0, 0, 7);
x.ellipse(14, -40, 7, 11, 0, 0, 7);
x.ellipse(0, -6, 8, 12, 0, 0, 7);
x.fill();
}
else if (kind === "skull") {
x.beginPath();
x.arc(0, -10, 46, Math.PI * 0.9, Math.PI * 2.1);
x.lineTo(24, 40);
x.lineTo(-24, 40);
x.closePath();
x.fill();
x.fillStyle = "#000";
x.beginPath();
x.ellipse(-18, -6, 12, 14, 0, 0, 7);
x.ellipse(18, -6, 12, 14, 0, 0, 7);
x.fill();
x.beginPath();
x.moveTo(0, 10);
x.lineTo(-6, 22);
x.lineTo(6, 22);
x.fill();
for (var tth = -3; tth <= 3; tth++)
x.fillRect(tth * 6 - 2, 32, 3, 8);
}
else if (kind === "raven") {
x.fillStyle = "#9AA4B8";
x.fillRect(-30, 30, 60, 50);
x.beginPath();
x.arc(0, 30, 30, Math.PI, 0);
x.fill();
x.fillStyle = "#DDE6F2";
x.beginPath();
x.ellipse(0, -10, 30, 18, 0.2, 0, 7);
x.fill();
x.beginPath();
x.arc(24, -26, 12, 0, 7);
x.fill();
x.beginPath();
x.moveTo(34, -28);
x.lineTo(52, -22);
x.lineTo(34, -20);
x.fill();
x.beginPath();
x.moveTo(-26, -6);
x.lineTo(-56, 6);
x.lineTo(-24, 4);
x.fill();
}
else if (kind === "rider") {
x.beginPath();
x.ellipse(0, 20, 60, 22, 0, 0, 7);
x.fill();
x.fillRect(46, -4, 12, 30);
x.beginPath();
x.ellipse(62, -8, 16, 9, -0.5, 0, 7);
x.fill();
[-40, -24, 30, 44].forEach(function (l, i) { x.beginPath(); x.moveTo(l, 30); x.lineTo(l + (i % 2 ? 10 : -10), 70); x.stroke(); });
x.fillRect(-12, -40, 22, 48);
x.beginPath();
x.moveTo(-6, -40);
x.lineTo(-30, -56);
x.stroke();
x.fillStyle = "#E8701A";
x.beginPath();
x.arc(-34, -60, 10, 0, 7);
x.fill();
}
else if (kind === "skeleton") {
x.beginPath();
x.arc(0, -70, 18, 0, 7);
x.fill();
x.fillRect(-3, -52, 6, 60);
for (var r = 0; r < 4; r++) {
x.fillRect(-20, -44 + r * 10, 40, 4);
}
x.beginPath();
x.moveTo(0, 8);
x.lineTo(-18, 60);
x.moveTo(0, 8);
x.lineTo(18, 60);
x.moveTo(-20, -40);
x.lineTo(-40, -6);
x.moveTo(20, -40);
x.lineTo(44, -60);
x.stroke();
x.fillStyle = "#000";
x.beginPath();
x.arc(-6, -72, 4, 0, 7);
x.arc(6, -72, 4, 0, 7);
x.fill();
}
x.restore();
}
(function frame() {
if (done)
return;
var t = (performance.now() - t0) / 1000;
x.fillStyle = "rgba(0,0,0,0.25)";
x.fillRect(0, 0, 640, 400);
for (var i = 0; i < 8; i++) {
var sx = 320 + Math.sin(t * 0.2 + i * 0.8) * 220, sy = 360 - ((t * 14 + i * 50) % 380), g = x.createRadialGradient(sx, sy, 4, sx, sy, 90);
g.addColorStop(0, "rgba(120,124,140,.05)");
g.addColorStop(1, "rgba(120,124,140,0)");
x.fillStyle = g;
x.fillRect(0, 0, 640, 400);
}
var cur = -1;
for (var j = 0; j < SHC_SHOW.length; j++)
if (t >= SHC_SHOW[j].t)
cur = j;
if (cur !== line) {
line = cur;
var sayEl = document.getElementById("shc-show-say");
if (sayEl) {
sayEl.style.opacity = "0";
setTimeout(function () { var s2 = document.getElementById("shc-show-say"); if (s2) {
s2.textContent = SHC_SHOW[line].say;
s2.style.opacity = "1";
} }, 700);
}
if (SHC_SHOW[cur].end) {
setTimeout(function () { if (!done) {
close();
shcPay("show", "🎞️ <b>The Phantasmagoria.</b> You come out blinking into the plaza, with a painted lantern slide to remember it by.");
} }, 6000);
}
}
var S = SHC_SHOW[cur];
if (S && S.draw && S.draw !== "smoke") {
var u = (t - S.t) / 12, s = 0.3 + u * 1.6, al = Math.max(0, Math.sin(Math.min(1, u) * Math.PI)) * 0.85;
figure(S.draw, s, al);
}
requestAnimationFrame(frame);
})();
},
function () {
var day = shcToday(), H = SHC.hunt;
if (H && H.day === day)
return H;
var seed = 0;
for (var i = 0; i < day.length; i++)
seed = (seed * 31 + day.charCodeAt(i)) >>> 0;
var rnd = wRand(seed * 7919 + 13), bands = (typeof ATL_RINGS !== "undefined" ? ATL_RINGS : []).filter(function (R) { return R.k !== "plaza" && R.k !== "wilds"; }), L = [];
for (var n = 0; n < 13 && bands.length; n++) {
var B = bands[n % bands.length], got = null;
for (var t = 0; t < 50 && !got; t++) {
var r = B.S + 10 + rnd() * (B.E - B.S - 20), a = rnd() * Math.PI * 2, p = shcAt(r, a);
if (!atlClearAt(r, a, 1, 1) || shcNearStreet(r, 1) || shcBlocked(p.x, p.z))
continue;
got = { x: p.x, z: p.z, r: r, i: n };
}
if (got)
L.push(got);
}
H = SHC.hunt = { day: day, L: L, m: {} };
return H;
},
function (s) {
var mine = shcHuntGot();
if (mine.got.indexOf(s.i) >= 0)
return;
mine.got.push(s.i);
shnSave();
var n = mine.got.length, H = SHC.hunt, g = H && H.m[s.i];
if (g) {
shcHuntLose(g);
delete H.m[s.i];
}
if (typeof playTone === "function")
try {
playTone(660 + n * 20, 0.25);
}
catch (e) { }
if (n >= 13)
shcPay("hunt", "🏮 <b>All thirteen lost lanterns!</b> The Lantern Keeper will be pleased: one of them is yours to keep.");
else
setStatus("🏮 <b>A lost lantern!</b> " + n + " of 13 found today. " + (13 - n) + " more somewhere in Somnucor (the Lantern Keeper at the Samhain Fair gives hints).");
},
function () {
var H = shcHuntSpots(), mine = shcHuntGot(), P = camera.position, left = H.L.filter(function (s) { return mine.got.indexOf(s.i) < 0; });
left.sort(function (a, b) { return Math.hypot(P.x - a.x, P.z - a.z) - Math.hypot(P.x - b.x, P.z - b.z); });
var rows = [["Found today", mine.got.length + " of 13"]], notes = ["Thirteen lanterns blew away on the Samhain wind and came down all over Somnucor, in every ring from the Civic Ring to the Harvest Ring. They float and glow, but you only see one when you are close.", "New places every day. Bring all thirteen back for the keepsake."];
if (left.length) {
var s = left[0], d = Math.round(Math.hypot(P.x - s.x, P.z - s.z));
rows.push(["The nearest", "In " + shcRingName(s.r) + ", " + shcWay(s.x - P.x, s.z - P.z) + " of you, about " + (d < 1000 ? Math.round(d / 10) * 10 + " m" : (d / 1000).toFixed(1) + " km") + " away"]);
}
else
rows.push(["Today", "You've found them all. Come back tomorrow: the wind blows them somewhere new."]);
worldCard(worldFacts("🏮 The Lantern Keeper", "The Great Lantern Hunt", rows, notes), {});
},
function () {
var keeper = typeof shnKeeper === "function" && shnKeeper(), on = typeof shnOn === "function" && shnOn(), b = "", fns = {}, mine = shcHuntGot(), d = new Date();
var mins = d.getMinutes(), proc = mins < 10 ? "Walking round the Tower Plaza now (until " + d.getHours() + ":10)" : "Next at " + ((d.getHours() + 1) % 24) + ":00, round the Tower Plaza";
var rows = [["The Tower", "Banners from the cornice, a crown of lanterns, a great cobweb across one corner, bats round the spire"],
["The Tower Plaza", "Pumpkins heaped round the four great fountains, the Great Jack by the Needle, lantern arches over the eight grand stairways, and the Samhain Fair"],
["Every street", "Bunting and warm bulbs, carved pumpkins and lanterns along the kerbs, corn shocks and hay; pumpkins and a cobweb at every door; ghosts round the lamps; boneyards and scarecrows on the lawns; mist at night"],
["The Samhain Fair", "By the Great Jack: the Lantern Keeper, the Pumpkin Toss, the Witches' Cauldron, the Fortune Booth, the Storyteller's Fire, the Phantasmagoria"],
["The Great Lantern Hunt", mine.got.length + " of 13 lost lanterns found today (anywhere in the city; new places every day)"],
["The Guisers' Procession", proc],
["Also", "The Samhain Drive-In in the Harvest Ring (grown-ups)"]];
if (!on && !keeper)
rows = [["Not just now", "Somnucor dresses for Samhain while Samhain Night is open."]];
if (shcCity() && (on || keeper) && SHC.spots && SHC.spots.length) {
b += worldBtn("fair", "🎪 Take me to the Samhain Fair", "Beside the Great Jack in the Tower Plaza");
fns.fair = function () { worldCard(null); var J = shcJackSpot(), gj = shcAt(J.r - 9, J.a); camera.position.set(gj.x, shcY(gj.x, gj.z) + 1.72, gj.z); if (typeof yaw !== "undefined")
yaw = Math.atan2(gj.x - J.x, gj.z - J.z); };
}
if (keeper) {
b += worldBtn("prev", SHC.prev ? "👁️ Keeper preview: on (turn off)" : "👁️ Keeper preview: off (turn on)", "See the city dressed even while Samhain Night is closed or a part is switched off (only you see it)");
fns.prev = function () { SHC.prev = !SHC.prev; SHC.cell = null; shcMenu(); };
}
worldCard(worldFacts("🎃 Samhain in Somnucor", "The city dressed top to bottom while Samhain Night is on", rows, keeper ? ["Keeper: admin > In the game > Samhain Night switches each part and each game on or off, and sets what the games pay."] : []) + b, fns);
},
function (force) {
if (SHCT.ask || (!force && Date.now() - SHCT.at < 60000))
return Promise.resolve(SHCT.st);
if (typeof cityRpc !== "function" || !(typeof signedIn === "function" && signedIn()))
return Promise.resolve(SHCT.st);
SHCT.ask = true;
SHCT.at = Date.now();
return cityRpc("samhain_candy_state", {}).then(function (d) { SHCT.ask = false; if (d && d.ok) {
SHCT.st = d;
SHCT.mine = d.mine || 0;
(d.doors || []).forEach(function (k) { SHCT.doors[k] = 1; });
} return SHCT.st; })
.catch(function () { SHCT.ask = false; return SHCT.st; });
},
function (P) {
SHCT.lt += 1;
if (SHCT.lt > 12 || !SHCT.list.length) {
SHCT.lt = 0;
var L = [], rid = typeof ATLC !== "undefined" && ATLC ? ATLC.id : null;
(store.objects || []).forEach(function (o) {
if (o.realm !== rid || typeof PLANS === "undefined" || !PLANS[o.archetype] || o.archetype === "somnucortower" || o.evbDoor)
return;
var dx = o.x - P.x, dz = o.z - P.z;
if (dx * dx + dz * dz > 70 * 70)
return;
var W = o.__shcDoor;
if (!W) {
try {
W = o.__shcDoor = doorWorld(o);
}
catch (e) {
return;
}
}
if (!W || !W.out)
return;
L.push({ k: "d:" + Math.round(o.x) + ":" + Math.round(o.z), x: W.x + W.out.x * 1.6, z: W.z + W.out.z * 1.6, o: o });
});
SHCT.list = L;
}
var best = null, bd = 1.9;
SHCT.list.forEach(function (D) { var d = Math.hypot(P.x - D.x, P.z - D.z); if (d < bd) {
bd = d;
best = D;
} });
return best;
},
function () {
if (typeof document === "undefined")
return;
if (!SHCT.chip) {
var e = SHCT.chip = document.createElement("div");
e.id = "shct-chip";
e.style.cssText = "position:fixed;right:12px;top:96px;z-index:40;padding:6px 10px;border-radius:16px;background:rgba(20,10,4,.85);border:1px solid #E87A1A;color:#FFE0B0;font:600 13px Georgia,serif;cursor:pointer";
e.onclick = function () { shctBoard(); };
document.body.appendChild(e);
}
var S = SHCT.st, rank = "";
if (S && S.board) {
S.board.forEach(function (r, i) { if (r.me)
rank = " · #" + (i + 1); });
}
var t = "🍬 " + SHCT.mine + " candy" + rank;
if (SHCT.chip.textContent !== t)
SHCT.chip.textContent = t;
shctChipPlace();
},
function () {
var e = SHCT.chip, n = Date.now();
if (!e || n - (SHCT.pl || 0) < 1000)
return;
SHCT.pl = n;
var m = document.getElementById("ps-menu"), r = m && getComputedStyle(m).display !== "none" ? m.getBoundingClientRect() : null;
if (!r || !r.width) {
e.style.left = "";
e.style.right = "12px";
e.style.top = "96px";
return;
}
e.style.top = Math.round(r.bottom + 8) + "px";
if (r.left + r.width / 2 < window.innerWidth / 2) {
e.style.right = "";
e.style.left = Math.round(r.left) + "px";
}
else {
e.style.left = "";
e.style.right = Math.round(window.innerWidth - r.right) + "px";
}
},
function (D) {
if (SHCT.doors[D.k]) {
shctCard("You've had candy from this door already. Try the next house!");
return;
}
if (typeof playTone === "function")
try {
playTone(392, 0.15);
setTimeout(function () { playTone(392, 0.15); }, 220);
setTimeout(function () { playTone(392, 0.15); }, 440);
}
catch (e) { }
var who = SHCT_DOOR[Math.floor(Math.random() * SHCT_DOOR.length)], trick = Math.random() < 0.15;
function say(n) {
var C = [];
for (var i = 0; i < n; i++)
C.push(SHCT_CANDY[Math.floor(Math.random() * SHCT_CANDY.length)]);
return "🚪 <i>Knock, knock, knock.</i> \"Trick or treat!\"<br><br>" + (trick ? SHCT_TRICK[Math.floor(Math.random() * SHCT_TRICK.length)] + " Then " + who.replace(/^A /, "a ").replace(/^An /, "an ") + " laughs and drops " : who + " drops ") + C.join(", ") + " into your bag. <b>+" + n + " candy</b>";
}
if (!(typeof signedIn === "function" && signedIn()) || typeof cityRpc !== "function") {
SHCT.doors[D.k] = 1;
var n0 = 1 + Math.floor(Math.random() * 3);
SHCT.mine += n0;
shctChip();
shctCard(say(n0) + "<br><br>Sign in, and your candy counts toward the Halloween Sceptre.");
return;
}
cityRpc("samhain_candy_knock", { p_door: D.k }).then(function (d) {
if (!d || d.ok === false) {
if (d && d.again)
SHCT.doors[D.k] = 1;
shctCard(otmEscSafe((d && d.say) || "Nobody answers. Try again in a moment."));
return;
}
SHCT.doors[D.k] = 1;
SHCT.mine = d.total || SHCT.mine + d.candy;
shctChip();
SHCT.at = 0;
shctFetch(true);
shctCard(say(d.candy) + "<br><br>Your bag: <b>" + SHCT.mine + " candy</b> from " + d.doors + " door" + (d.doors === 1 ? "" : "s") + ".");
}, function () { shctCard("The door won't open just now. Try again in a moment."); });
},
function (said) {
var T = shctTimes(), h = "<div style='font:600 17px var(--serif,Georgia);color:#FFB060'>🍬 Trick-or-Treat through Somnucor</div>" +
"<div style='opacity:.8;font-size:12.5px'>Most candy by " + shctClock(T.ends).split(", ")[1] + " (Arizona time) wins the Halloween Sceptre</div>" +
(said ? "<div style='margin:8px 0;padding:8px 10px;border-left:3px solid #E87A1A;background:rgba(232,122,26,.1)'>" + said + "</div>" : "");
worldCard(h + worldBtn("board", "🏆 Who has the most candy", "and the Halloween Sceptre"), { board: function () { shctBoard(); } });
},
function () {
var draw = function () {
var S = SHCT.st, T = shctTimes(), now = Date.now(), h = "", fns = {};
h += "<div style='font:600 17px var(--serif,Georgia);color:#FFB060'>🎃 The Halloween Sceptre</div>";
h += "<div style='opacity:.85;font-size:12.5px;margin:4px 0'>" + (now < T.starts ? "Trick-or-treating opens " + shctClock(T.starts) + ", Arizona time." : now < T.ends ? "Trick-or-treating is on until " + shctClock(T.ends).split(", ")[1] + ", Arizona time." : "This year's trick-or-treating is over.") +
" Knock at every door in Somnucor: stand on the doorstep and press E. Each door gives candy once. Whoever has the most candy when it ends holds the Halloween Sceptre for the year (if two are level, whoever got there first).</div>";
h += "<div style='font-size:12.5px;margin:6px 0;padding:8px;border:1px solid rgba(232,122,26,.4);border-radius:6px'>The Sceptre: a staff of black bog-oak bound in silver, crowned with a carved jack-o'-lantern that glows from inside, a silver crescent moon above it holding a great orange stone, and two silver bats at its shoulders. There is one in all the dream. It stands on show at the Little Moons' Samhain in the Kids Zone.</div>";
if (S && S.holder)
h += "<div style='margin:6px 0'>👑 <b>" + otmEscSafe(S.holder.name) + "</b> holds the Halloween Sceptre for " + S.year + ", with " + S.holder.candy + " candy." + (S.holder.me ? " <b>That's you!</b> It is in your Backpack." : "") + "</div>";
h += "<div style='margin:6px 0'><b>Your bag:</b> " + SHCT.mine + " candy</div>";
var B = (S && S.board) || [];
h += "<table style='width:100%;font-size:12.5px;border-collapse:collapse'>" + (B.length ? B.map(function (r, i) { return "<tr style='" + (r.me ? "background:rgba(232,122,26,.16)" : "") + "'><td style='padding:2px 6px'>" + (i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : (i + 1) + ".") + "</td><td>" + otmEscSafe(r.name) + "</td><td style='text-align:right'>🍬 " + r.candy + "</td></tr>"; }).join("") : "<tr><td style='opacity:.7'>" + (typeof signedIn === "function" && signedIn() ? "Nobody has knocked yet." : "Sign in to see the board.") + "</td></tr>") + "</table>";
if (typeof kzsSceptreGo === "function") {
h += worldBtn("see", "🎃 Go and see the Sceptre", "at the Little Moons' Samhain, in the Kids Zone");
fns.see = function () { worldCard(null); kzsSceptreGo(); };
}
if (shctKeeper()) {
h += worldBtn("ktry", SHCT.kTry ? "Keeper: stop trying the doors" : "Keeper: try the doors now", "only you; the server lets the Keeper knock any time");
fns.ktry = function () { SHCT.kTry = !SHCT.kTry; shctBoard(); };
}
worldCard(h, fns);
};
draw();
shctFetch(true).then(function () { if (WLD.card && WLD.card.style.display === "block" && /Halloween Sceptre/.test(WLD.card.innerHTML))
draw(); });
},
function () {
var g = new THREE.Group(), M = function (c, o) { o = o || {}; var m = new THREE.MeshPhongMaterial({ color: c, shininess: o.sh || 40, specular: o.sp || 0x333333 }); if (o.e !== undefined) {
m.emissive = new THREE.Color(o.e);
m.emissiveIntensity = o.ei || 1;
} return m; };
var oak = M(0x1A120E, { sh: 20 }), silver = M(0xD8DCE6, { sh: 90, sp: 0xFFFFFF }), gold = M(0xD8A030, { sh: 80, sp: 0xFFE8A0 });
var sh = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.045, 1.25, 10), oak);
sh.position.y = 0.62;
g.add(sh);
for (var i = 0; i < 5; i++) {
var rg = new THREE.Mesh(new THREE.TorusGeometry(0.048, 0.011, 6, 16), silver);
rg.rotation.x = Math.PI / 2;
rg.position.y = 0.12 + i * 0.27;
g.add(rg);
}
var sp = [];
for (var t = 0; t <= 60; t++) {
var a = t / 60 * Math.PI * 10;
sp.push(new THREE.Vector3(Math.cos(a) * 0.046, 0.1 + t / 60 * 1.1, Math.sin(a) * 0.046));
}
g.add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(sp), 120, 0.006, 5, false), silver));
var foot = new THREE.Mesh(new THREE.ConeGeometry(0.05, 0.12, 10), silver);
foot.rotation.x = Math.PI;
foot.position.y = 0.0;
g.add(foot);
for (var l = 0; l < 6; l++) {
var lf = new THREE.Mesh(new THREE.SphereGeometry(0.06, 8, 6), gold);
lf.scale.set(0.5, 1, 0.18);
var la = l / 6 * Math.PI * 2;
lf.position.set(Math.cos(la) * 0.07, 1.3, Math.sin(la) * 0.07);
lf.rotation.y = -la;
lf.rotation.z = 0.5;
g.add(lf);
}
var cv = document.createElement("canvas");
cv.width = cv.height = 128;
var c = cv.getContext("2d");
c.fillStyle = "#E8781A";
c.fillRect(0, 0, 128, 128);
c.globalAlpha = 0.25;
c.fillStyle = "#8A3A0A";
for (var r = 0; r < 8; r++)
c.fillRect(r * 16, 0, 3, 128);
c.globalAlpha = 1;
c.fillStyle = "#FFE070";
c.beginPath();
c.moveTo(40, 48);
c.lineTo(54, 30);
c.lineTo(60, 52);
c.fill();
c.beginPath();
c.moveTo(88, 48);
c.lineTo(74, 30);
c.lineTo(68, 52);
c.fill();
c.beginPath();
c.moveTo(30, 72);
for (var k = 0; k <= 8; k++)
c.lineTo(30 + k * 8.5, k % 2 ? 86 : 74);
c.lineTo(98, 72);
c.quadraticCurveTo(64, 112, 30, 72);
c.fill();
var tex = new THREE.CanvasTexture(cv), head = new THREE.Mesh(new THREE.SphereGeometry(0.14, 20, 14), new THREE.MeshPhongMaterial({ map: tex, emissive: new THREE.Color(0xFF7A10), emissiveMap: tex, emissiveIntensity: 0.6, shininess: 30 }));
head.scale.set(1, 0.82, 1);
head.position.y = 1.44;
head.rotation.y = -Math.PI / 2;
g.add(head);
var stem = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.026, 0.07, 6), M(0x3A5A1A));
stem.position.y = 1.57;
g.add(stem);
var moon = new THREE.Mesh(new THREE.TorusGeometry(0.11, 0.022, 8, 24, Math.PI * 1.35), silver);
moon.position.y = 1.74;
moon.rotation.z = Math.PI * 0.82;
g.add(moon);
var gem = new THREE.Mesh(new THREE.OctahedronGeometry(0.05, 1), M(0xFF8A1A, { e: 0xFF6A00, ei: 0.7, sh: 120, sp: 0xFFFFFF }));
gem.position.y = 1.74;
gem.scale.y = 1.3;
g.add(gem);
g.userData.gem = gem;
[-1, 1].forEach(function (s) {
var w = new THREE.Shape();
w.moveTo(0, 0);
w.quadraticCurveTo(0.06, 0.06, 0.13, 0.03);
w.lineTo(0.11, -0.005);
w.lineTo(0.09, 0.02);
w.lineTo(0.07, -0.01);
w.lineTo(0.05, 0.015);
w.lineTo(0.03, -0.015);
w.lineTo(0, 0);
var bat = new THREE.Mesh(new THREE.ShapeGeometry(w), new THREE.MeshPhongMaterial({ color: 0xC8CCD8, side: THREE.DoubleSide, shininess: 80 }));
bat.position.set(s * 0.12, 1.44, 0);
bat.scale.x = s;
bat.rotation.y = s * 0.3;
g.add(bat);
});
if (typeof wGlow === "function") {
var gl = wGlow(0xFF9A30, 1.2, 0.5);
gl.position.y = 1.5;
g.add(gl);
}
return g;
},
function () {
return shcTex("straw", 256, 256, function (x, W, H) {
x.clearRect(0, 0, W, H);
var seed = 7;
function rnd() { seed = (seed * 16807) % 2147483647; return seed / 2147483647; }
for (var i = 0; i < 1400; i++) {
var px = rnd() * W, len = H * (0.72 + rnd() * 0.3), w = 0.8 + rnd() * 1.6, l = 55 + rnd() * 25, h = 38 + rnd() * 12;
x.strokeStyle = "hsl(" + h + "," + (50 + rnd() * 25) + "%," + (l * 0.75) + "%)";
x.lineWidth = w;
x.beginPath();
x.moveTo(px, 0);
x.quadraticCurveTo(px + (rnd() - 0.5) * 8, len * 0.5, px + (rnd() - 0.5) * 14, len);
x.stroke();
}
x.fillStyle = "rgba(90,60,30,.85)";
x.fillRect(0, H * 0.08, W, 5);
});
},
function (n) {
return shcTex("gmask" + n, 128, 128, function (x, W, H) {
x.clearRect(0, 0, W, H);
var base = ["#EDE6D6", "#D9C9A4", "#1E1A18", "#F2F0EA", "#B8483A", "#E9D9B0"][n % 6], ink = n % 6 === 2 ? "#E8E0D0" : "#141010";
x.fillStyle = base;
x.beginPath();
x.ellipse(W / 2, H / 2, W * 0.44, H * 0.48, 0, 0, 7);
x.fill();
x.strokeStyle = "rgba(0,0,0,.35)";
x.lineWidth = 2;
x.stroke();
x.fillStyle = ink;
[[-1], [1]].forEach(function (k) { x.beginPath(); x.ellipse(W / 2 + k[0] * 24, H * 0.42, 15, n % 3 === 1 ? 9 : 12, k[0] * (n % 2 ? 0.25 : -0.2), 0, 7); x.fill(); });
x.fillStyle = "#050404";
[[-1], [1]].forEach(function (k) { x.beginPath(); x.ellipse(W / 2 + k[0] * 24, H * 0.42, 7, 6, 0, 0, 7); x.fill(); });
x.strokeStyle = ink;
x.lineWidth = 3;
x.beginPath();
x.moveTo(W / 2, H * 0.46);
x.lineTo(W / 2 - 5, H * 0.6);
x.lineTo(W / 2 + 4, H * 0.62);
x.stroke();
x.fillStyle = n % 6 === 4 ? "#141010" : "#9A1A1A";
if (n % 3 === 0) {
x.beginPath();
x.moveTo(W / 2 - 22, H * 0.72);
x.quadraticCurveTo(W / 2, H * 0.86, W / 2 + 22, H * 0.72);
x.quadraticCurveTo(W / 2, H * 0.78, W / 2 - 22, H * 0.72);
x.fill();
}
else if (n % 3 === 1) {
x.beginPath();
x.ellipse(W / 2, H * 0.76, 9, 12, 0, 0, 7);
x.fill();
}
else {
x.fillRect(W / 2 - 20, H * 0.74, 40, 5);
x.strokeStyle = "#141010";
x.lineWidth = 2;
for (var s = 0; s < 6; s++) {
x.beginPath();
x.moveTo(W / 2 - 18 + s * 7, H * 0.7);
x.lineTo(W / 2 - 18 + s * 7, H * 0.83);
x.stroke();
}
}
if (n % 2 === 0) {
x.fillStyle = "rgba(190,40,40,.45)";
x.beginPath();
x.arc(W / 2 - 32, H * 0.62, 9, 0, 7);
x.arc(W / 2 + 32, H * 0.62, 9, 0, 7);
x.fill();
}
if (n % 4 === 1) {
x.strokeStyle = "#2A6A3A";
x.lineWidth = 4;
x.beginPath();
x.moveTo(W / 2 - 38, H * 0.27);
x.quadraticCurveTo(W / 2, H * 0.14, W / 2 + 38, H * 0.27);
x.stroke();
}
});
},
function (n) {
return shcTex("tface" + n, 128, 128, function (x, W, H) {
x.clearRect(0, 0, W, H);
var g = x.createRadialGradient(W / 2, H / 2, 3, W / 2, H / 2, W / 2);
g.addColorStop(0, "#FFF6C0");
g.addColorStop(0.55, "#FFC24A");
g.addColorStop(1, "#E2741A");
x.fillStyle = g;
function tri(a, b, c, d, e, f) { x.beginPath(); x.moveTo(a, b); x.lineTo(c, d); x.lineTo(e, f); x.closePath(); x.fill(); }
if (n % 2) {
tri(30, 58, 50, 32, 58, 60);
tri(98, 58, 78, 32, 70, 60);
}
else {
x.beginPath();
x.ellipse(42, 48, 11, 13, 0, 0, 7);
x.ellipse(86, 48, 11, 13, 0, 0, 7);
x.fill();
}
x.beginPath();
x.moveTo(32, 84);
x.lineTo(44, 92);
x.lineTo(52, 84);
x.lineTo(64, 94);
x.lineTo(76, 84);
x.lineTo(84, 92);
x.lineTo(96, 84);
x.quadraticCurveTo(64, 118, 32, 84);
x.fill();
});
},
function () {
if (SHC_PR.kit)
return SHC_PR.kit;
var K = {}, lite = shcLite();
function lam(c, o) { var m = new THREE.MeshLambertMaterial(Object.assign({ color: c }, o || {})); return m; }
var straw = shcStrawTex();
straw.wrapS = THREE.RepeatWrapping;
K.straw = lam(0xFFFFFF, { map: straw, alphaTest: 0.45, side: THREE.DoubleSide });
function lathe(pts, seg) { return new THREE.LatheGeometry(pts.map(function (q) { return new THREE.Vector2(q[0], q[1]); }), seg); }
var seg = lite ? 10 : 16;
K.hatG = lathe([[0.31, 1.38], [0.3, 1.5], [0.27, 1.7], [0.22, 1.95], [0.15, 2.2], [0.07, 2.42], [0.02, 2.52]], seg);
K.capeG = lathe([[0.52, 0.86], [0.47, 1.02], [0.4, 1.2], [0.32, 1.36], [0.26, 1.44]], seg);
K.skirtG = lathe([[0.45, 0.42], [0.38, 0.65], [0.3, 0.9], [0.27, 1.06]], seg);
[K.hatG, K.capeG, K.skirtG].forEach(function (g) { var uv = g.attributes.uv; for (var i = 0; i < uv.count; i++)
uv.setXY(i, uv.getX(i) * 3, uv.getY(i)); });
K.ribbonG = new THREE.PlaneGeometry(0.035, 0.55);
K.ribbonG.translate(0, -0.275, 0);
K.ribbons = [0xC0202A, 0x2A7A3A, 0xF0EEE6, 0xE0A020, 0x3A4AA0].map(function (c) { return lam(c, { side: THREE.DoubleSide }); });
K.hoods = {};
K.hoodG = new THREE.LatheGeometry([[0.0, -0.2], [0.17, -0.19], [0.165, -0.1], [0.17, 0.0], [0.16, 0.09], [0.12, 0.17], [0.06, 0.21], [0.0, 0.22]].map(function (q) { return new THREE.Vector2(q[0], q[1]); }), 14);
K.maskG = new THREE.SphereGeometry(0.165, 14, 10, Math.PI * 0.14, Math.PI * 0.72, Math.PI * 0.2, Math.PI * 0.62);
K.masks = [0, 1, 2, 3, 4, 5].map(function (n) { return new THREE.MeshLambertMaterial({ map: shcMaskTex(n), alphaTest: 0.3, side: THREE.DoubleSide }); });
K.turnipG = new THREE.SphereGeometry(0.15, 14, 10);
(function (g) {
var p = g.attributes.position, c = [];
for (var i = 0; i < p.count; i++) {
var y = p.getY(i);
p.setY(i, y * (y < 0 ? 1.05 : 0.9));
var k = Math.max(0, Math.min(1, (y + 0.02) / 0.13));
c.push(0.95 - 0.4 * k, 0.9 - 0.62 * k, 0.66 - 0.1 * k);
}
g.setAttribute("color", new THREE.Float32BufferAttribute(c, 3));
g.computeVertexNormals();
})(K.turnipG);
K.turnip = new THREE.MeshLambertMaterial({ vertexColors: true, emissive: 0x6A3A0C });
K.faceG = new THREE.PlaneGeometry(0.22, 0.2);
K.faces = [0, 1].map(function (n) { return new THREE.MeshBasicMaterial({ map: shcTurnipFaceTex(n), transparent: true, depthWrite: false }); });
K.bailG = new THREE.TorusGeometry(0.11, 0.006, 4, 12, Math.PI);
K.wood = lam(0x3A2716);
K.iron = lam(0x1E1C1A);
K.halo = new THREE.SpriteMaterial({ map: shcHaloTex(), transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, opacity: 0.8 });
K.poolG = new THREE.CircleGeometry(1.3, 16);
K.poolG.rotateX(-Math.PI / 2);
K.pool = new THREE.MeshBasicMaterial({ map: shcHaloTex(), transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, opacity: 0.35 });
K.sheet = lam(0xFFFFFF, { map: shcSheetTex(), side: THREE.DoubleSide });
K.bone = lam(0xE6DCC2);
K.socket = new THREE.MeshBasicMaterial({ color: 0x0A0806 });
K.drumG = new THREE.CylinderGeometry(0.24, 0.24, 0.08, 20);
K.skin = lam(0xE8D6A8);
K.rim = lam(0x5A3A1E);
return (SHC_PR.kit = K);
},
function (parent, x, y, z, n, big) {
var K = shcProcKit(), L = new THREE.Group();
L.position.set(x, y, z);
if (big)
L.scale.setScalar(big);
parent.add(L);
L.userData.noBake = 1;
shcProcMesh(K.turnipG, K.turnip, L);
var f = shcProcMesh(K.faceG, K.faces[n % 2], L, 0, -0.005, 0.138);
var b = shcProcMesh(K.bailG, K.iron, L, 0, 0.05, 0);
b.rotation.y = Math.PI / 2;
var s = new THREE.Sprite(K.halo);
s.scale.set(0.9, 0.9, 0.9);
L.add(s);
L.userData.lamp = 1;
return L;
},
function (i, o) {
var L = (typeof randomLook === "function") ? randomLook("shc_guiser" + i, "human") : {};
L.sex = o.sex || (i % 3 ? "m" : "f");
L.age = "adult";
L.face = null;
L.glasses = null;
["top", "topKind", "bottom", "bottomKind", "layer", "layerColor", "hat", "hatColor", "back", "backColor", "neck", "shoes"].forEach(function (k) { if (o[k] !== undefined)
L[k] = o[k]; });
var spec = { id: "shc_guise" + i, archetype: "human", attrs: {}, look: L, solid: false, detail: shcLite() ? 3 : 4, nights: [], city: false };
var g = buildFigure(spec, 1);
g.traverse(function (m) { m.raycast = function () { }; m.castShadow = false; });
return g;
},
function (g, mat, hoodCol) {
var K = shcProcKit(), body = g.children[0], box = new THREE.Box3(), c = new THREE.Vector3();
g.updateMatrixWorld(true);
if (typeof HDF !== "undefined" && HDF.list)
HDF.list = HDF.list.filter(function (h) { return h.g !== g; });
body.traverse(function (m) { if (!m.isMesh)
return; box.setFromObject(m); box.getCenter(c); if (c.y > 1.5 && Math.abs(c.x) < 0.2)
m.visible = false; });
var hy = 1.68, hm = K.hoods[hoodCol] || (K.hoods[hoodCol] = new THREE.MeshLambertMaterial({ color: hoodCol }));
var hood = shcProcMesh(K.hoodG, hm, body, 0, hy, -0.01);
var m = shcProcMesh(K.maskG, mat, body, 0, hy - 0.01, 0.035);
return m;
},
function (i) {
var K = shcProcKit(), g = shcGuiseFig(i, { top: 0x5A4A30, topKind: "shirt", bottom: 0x3A3A40, hat: null, back: null, shoes: 0x2A1E14 });
var body = g.children[0];
var box = new THREE.Box3(), c = new THREE.Vector3();
g.updateMatrixWorld(true);
body.traverse(function (m) { if (!m.isMesh)
return; box.setFromObject(m); box.getCenter(c); if (c.y > 1.5 && Math.abs(c.x) < 0.3)
m.visible = false; });
shcProcMesh(K.hatG, K.straw, body);
shcProcMesh(K.capeG, K.straw, body);
shcProcMesh(K.skirtG, K.straw, body);
for (var r = 0; r < 3; r++) {
var rb = shcProcMesh(K.ribbonG, K.ribbons[(i + r) % K.ribbons.length], body, 0, 2.45, 0);
rb.rotation.set(0.35, r * 2.1 + i, 0.25);
rb.userData.noBake = 1;
rb.userData.rib = r + i;
}
g.userData.role = "straw";
return g;
},
function (i) {
var K = shcProcKit(), col = SHC_CLOAKS[i % SHC_CLOAKS.length];
var g = shcGuiseFig(i, { layer: null, top: col, topKind: "robe", bottom: col, hat: "hood", hatColor: col, back: "cloak", backColor: SHC_CLOAKS[(i + 2) % SHC_CLOAKS.length], shoes: 0x14100C });
var body = g.children[0];
shcMaskOn(g, K.masks[i % K.masks.length], col);
var lm = g.userData.limbs;
if (lm && lm.ra) {
shcTurnip(lm.ra, 0, -0.78, 0.04, i, 0.85);
}
g.userData.role = "mask";
return g;
},
function () {
var K = shcProcKit(), g = shcStrawboy(100);
var lm = g.userData.limbs;
if (lm && lm.ra) {
lm.ra.userData.hold = -2.2;
var p = shcProcMesh(new THREE.CylinderGeometry(0.022, 0.026, 1.8, 6), K.wood, lm.ra, 0, -1.0, 0.25);
p.rotation.x = -0.564;
p.userData.noBake = 1;
shcTurnip(lm.ra, 0, -1.6, 0.62, 1, 1.6);
}
g.userData.role = "captain";
return g;
},
function () {
var K = shcProcKit(), g = shcGuiseFig(201, { top: 0x2A3A2A, topKind: "shirt", layer: "vest", layerColor: 0x1A1A14, bottom: 0x24201A, hat: "brimmed", hatColor: 0x1E1A16 });
shcMaskOn(g, K.masks[1], 0x1E1A16);
var lm = g.userData.limbs;
if (lm && lm.la) {
lm.la.userData.hold = -0.9;
var d = new THREE.Group();
d.position.set(0.12, -0.5, 0.12);
d.rotation.set(Math.PI / 2, 0, 0.35);
lm.la.add(d);
d.userData.noBake = 1;
shcProcMesh(K.drumG, K.rim, d);
shcProcMesh(new THREE.CircleGeometry(0.235, 20), K.skin, d, 0, 0.041, 0).rotation.x = -Math.PI / 2;
}
if (lm && lm.ra) {
lm.ra.userData.beat = 1;
var st = shcProcMesh(new THREE.CylinderGeometry(0.012, 0.016, 0.3, 5), K.wood, lm.ra, 0, -0.62, 0.1);
st.rotation.x = 1.3;
}
g.userData.role = "drum";
return g;
},
function () {
var K = shcProcKit(), g = shcGuiseFig(202, { sex: "f", top: 0x3A1A2A, topKind: "robe", bottom: 0x3A1A2A, hat: "hood", hatColor: 0x2A1420, back: "cloak", backColor: 0x1A1018 });
shcMaskOn(g, K.masks[3], 0x2A1420);
var lm = g.userData.limbs;
["la", "ra"].forEach(function (k) { if (lm && lm[k]) {
lm[k].userData.hold = -1.25;
lm[k].rotation.z = k === "la" ? 0.4 : -0.4;
} });
var w = shcProcMesh(new THREE.CylinderGeometry(0.011, 0.011, 0.3, 6), K.iron, g.children[0], 0, 1.51, 0.24);
w.rotation.x = -0.9;
g.userData.role = "pipe";
return g;
},
function () {
var K = shcProcKit(), g = new THREE.Group(), body = new THREE.Group();
g.add(body);
var sh = new THREE.LatheGeometry([[0.5, 0.42], [0.47, 0.62], [0.43, 0.9], [0.4, 1.15], [0.36, 1.35], [0.3, 1.5], [0.2, 1.62], [0.08, 1.68], [0, 1.7]].map(function (q) { return new THREE.Vector2(q[0], q[1]); }), 20);
var p = sh.attributes.position;
for (var i = 0; i < p.count; i++) {
var x = p.getX(i), y = p.getY(i), z = p.getZ(i), an = Math.atan2(x, z), low = Math.max(0, (1.0 - y) / 0.6);
var fold = 1 + Math.sin(an * 7) * 0.05 * low;
p.setXYZ(i, x * fold, y + Math.sin(an * 5) * 0.03 * low, z * 1.25 * fold);
}
sh.computeVertexNormals();
var sm = shcProcMesh(sh, K.sheet, body, 0, 0, -0.05);
sm.rotation.x = 0.22;
var pole = shcProcMesh(new THREE.CylinderGeometry(0.03, 0.03, 0.9, 6), K.wood, body, 0, 1.55, 0.55);
pole.rotation.x = 0.6;
var head = new THREE.Group();
head.position.set(0, 1.92, 0.82);
head.scale.setScalar(0.85);
body.add(head);
head.userData.noBake = 1;
g.userData.head = head;
var cr = shcProcMesh(new THREE.SphereGeometry(0.16, 12, 10), K.bone, head, 0, 0.04, -0.12);
cr.scale.set(1, 0.95, 1.1);
var muz = shcProcMesh(new THREE.CylinderGeometry(0.075, 0.12, 0.5, 10), K.bone, head, 0, -0.02, 0.16);
muz.rotation.x = Math.PI / 2 + 0.25;
[-1, 1].forEach(function (k) {
var s = shcProcMesh(new THREE.SphereGeometry(0.05, 8, 6), K.socket, head, k * 0.105, 0.07, 0.0);
s.scale.set(0.9, 1, 0.7);
var ear = shcProcMesh(new THREE.ConeGeometry(0.04, 0.16, 6), K.bone, head, k * 0.09, 0.2, -0.18);
ear.rotation.z = -k * 0.3;
});
shcProcMesh(new THREE.SphereGeometry(0.03, 6, 5), K.socket, head, -0.03, -0.13, 0.4);
shcProcMesh(new THREE.SphereGeometry(0.03, 6, 5), K.socket, head, 0.03, -0.13, 0.4);
var jaw = new THREE.Group();
jaw.position.set(0, -0.08, -0.08);
head.add(jaw);
g.userData.jaw = jaw;
var jb = shcProcMesh(new THREE.BoxGeometry(0.13, 0.04, 0.46), K.bone, jaw, 0, -0.03, 0.2);
jb.rotation.x = 0.22;
for (var r = 0; r < 6; r++) {
var rb = shcProcMesh(K.ribbonG, K.ribbons[r % K.ribbons.length], head, (r % 2 ? -1 : 1) * 0.03, 0.14, -0.2 - r * 0.03);
rb.rotation.set(-0.5, 0, (r % 2 ? -1 : 1) * 0.15);
rb.userData.rib = r;
}
var legs = [];
[-1, 1].forEach(function (k) {
var piv = new THREE.Group();
piv.position.set(k * 0.13, 0.9, -0.1);
body.add(piv);
legs.push(piv);
shcProcMesh(new THREE.CylinderGeometry(0.07, 0.058, 0.84, 8), K.iron, piv, 0, -0.42, 0);
shcProcMesh(new THREE.BoxGeometry(0.11, 0.08, 0.24), K.wood, piv, 0, -0.86, 0.05);
});
g.userData.limbs = { ll: legs[0], rl: legs[1] };
if (typeof contactShadow === "function") {
try {
g.add(contactShadow(0.5));
}
catch (e) { }
}
g.userData.role = "mare";
return g;
},
function () {
if (SHC_PR.keep)
return SHC_PR.keep;
var lite = shcLite(), G = new THREE.Group();
G.name = "guisers' procession";
var items = [], s = 0, pairs = lite ? 3 : 10;
function put(o, ds, l) {
if (typeof scpBake === "function" && typeof SCP !== "undefined")
scpBake(o);
G.add(o);
var lamps = [];
o.traverse(function (m) { if (m.userData && m.userData.lamp)
lamps.push(m); });
var pool = null;
if (lamps.length) {
pool = new THREE.Mesh(shcProcKit().poolG, shcProcKit().pool);
pool.raycast = function () { };
pool.renderOrder = 1;
G.add(pool);
}
items.push({ o: o, s: s, l: l || 0, lamps: lamps, pool: pool, i: items.length });
s += ds || 0;
}
put(shcCaptain(), 2.6, 0);
put(shcDrummer(), 0, -0.7);
put(shcPiper(), 2.8, 0.7);
put(shcMare(), 3.4, 0);
for (var p = 0; p < pairs; p++) {
var a = p % 3 === 1 ? shcStrawboy(p * 2) : shcMasker(p * 2), b = p % 3 === 0 ? shcStrawboy(p * 2 + 1) : shcMasker(p * 2 + 1);
put(a, 0, -0.75);
put(b, 2.3, 0.75);
}
G.traverse(function (o) { o.raycast = function () { }; o.castShadow = false; });
return (SHC_PR.keep = { g: G, items: items, len: s });
},
function () {
if (SHC_GH.geo)
return SHC_GH.geo;
var lite = shcLite(), seg = lite ? 14 : 22, pos = [], av = [], as = [], at = [], idx = [];
var prof = [[0, 0.56], [0.18, 0.5], [0.42, 0.44], [0.7, 0.4], [0.98, 0.37], [1.2, 0.35], [1.34, 0.32], [1.42, 0.25], [1.5, 0.2], [1.6, 0.19], [1.7, 0.185], [1.8, 0.16], [1.88, 0.11], [1.93, 0.05], [1.95, 0]];
var base = 0;
for (var r = 0; r < prof.length; r++) {
var y = prof[r][0], rad = prof[r][1];
for (var s = 0; s <= seg; s++) {
var a = s / seg * Math.PI * 2, cx = Math.sin(a), cz = Math.cos(a);
var hood = y > 1.45 ? Math.max(0, cz) * 0.05 : 0;
pos.push(cx * rad, y, cz * rad + hood);
av.push(y / 1.95);
as.push(0);
at.push(0);
}
}
for (r = 0; r < prof.length - 1; r++)
for (s = 0; s < seg; s++) {
var i0 = base + r * (seg + 1) + s, i1 = i0 + 1, i2 = i0 + seg + 1, i3 = i2 + 1;
idx.push(i0, i2, i1, i1, i2, i3);
}
base = pos.length / 3;
var rows = lite ? 5 : 7, sr = lite ? 6 : 9;
[-1, 1].forEach(function (k) {
var b0 = pos.length / 3;
for (var q = 0; q <= rows; q++) {
var t = q / rows, px = k * (0.3 + 0.05 * t), py = 1.34 - 0.36 * t * t - 0.05 * t, pz = 0.04 + 0.55 * t, rad = 0.085 + 0.08 * t;
for (var s2 = 0; s2 <= sr; s2++) {
var b = s2 / sr * Math.PI * 2;
pos.push(px + Math.cos(b) * rad, py + Math.sin(b) * rad * 0.9, pz);
av.push(py / 1.95);
as.push(1);
at.push(t);
}
}
for (q = 0; q < rows; q++)
for (var s3 = 0; s3 < sr; s3++) {
var j0 = b0 + q * (sr + 1) + s3, j1 = j0 + 1, j2 = j0 + sr + 1, j3 = j2 + 1;
idx.push(j0, j1, j2, j1, j3, j2);
}
});
var g = new THREE.BufferGeometry();
g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
g.setAttribute("aV", new THREE.Float32BufferAttribute(av, 1));
g.setAttribute("aS", new THREE.Float32BufferAttribute(as, 1));
g.setAttribute("aT", new THREE.Float32BufferAttribute(at, 1));
g.setIndex(idx);
g.computeVertexNormals();
g.computeBoundingSphere();
g.boundingSphere.radius += 0.8;
return (SHC_GH.geo = g);
},
function () {
if (SHC_GH.mat)
return SHC_GH.mat;
var U = THREE.UniformsUtils.merge([THREE.UniformsLib.fog, { uT: { value: 0 }, uDay: { value: 0 } }]);
var m = new THREE.ShaderMaterial({ uniforms: U, fog: true, transparent: true, depthWrite: false, side: THREE.DoubleSide,
vertexShader: [
"attribute float aV; attribute float aS; attribute float aT; attribute float aPh;",
"uniform float uT; varying float vV; varying float vS; varying float vT; varying float vF; varying vec3 vL; varying float vA;",
THREE.ShaderChunk.fog_pars_vertex,
"void main(){",
"  vec3 p=position; vL=p; vV=aV; vS=aS; vT=aT; float ang=atan(p.x,p.z); vA=ang;",
"  float low=1.0-clamp(p.y/1.35,0.0,1.0); low*=(1.0-aS);",
"  float rip=sin(ang*5.0+uT*2.1+aPh)*0.07+sin(ang*9.0-uT*2.9+aPh*1.7)*0.035;",
"  p.xz*=1.0+rip*low;",
"  p.y+=sin(ang*7.0+uT*2.6+aPh)*0.06*low*low;",
"  p.z-=low*low*0.42; p.x+=sin(uT*1.3+aPh+p.y*2.2)*0.1*low;",
"  p.y+=aS*sin(uT*1.6+aPh+aT*2.0)*0.07*aT; p.x+=aS*sin(uT*1.1+aPh*2.0)*0.05*aT;",
"  vec4 wp=vec4(p,1.0);",
"  #ifdef USE_INSTANCING",
"  wp=instanceMatrix*wp; vec3 n=normalize(mat3(instanceMatrix)*normal);",
"  #else",
"  vec3 n=normal;",
"  #endif",
"  vec4 mvPosition=modelViewMatrix*wp;",
"  vec3 vn=normalize(normalMatrix*n); vec3 vd=normalize(-mvPosition.xyz);",
"  vF=1.0-abs(dot(vn,vd));",
"  gl_Position=projectionMatrix*mvPosition;",
THREE.ShaderChunk.fog_vertex,
"}"
].join("\n"),
fragmentShader: [
"uniform float uT; uniform float uDay; varying float vV; varying float vS; varying float vT; varying float vF; varying vec3 vL; varying float vA;",
THREE.ShaderChunk.fog_pars_fragment,
"void main(){",
"  float n=sin(vA*11.0+vV*17.0+uT*1.1)*0.5+0.5; n=n*0.6+(sin(vA*23.0-vV*9.0-uT*0.7)*0.5+0.5)*0.4;",
"  float hem=smoothstep(0.02,0.36,vV+(n-0.5)*0.22);",
"  float cuff=1.0-smoothstep(0.55,1.0,vT+(n-0.5)*0.3);",
"  float fade=mix(hem,cuff,vS);",
"  float f=pow(clamp(vF,0.0,1.0),1.6);",
"  float a=(0.14+0.62*f)*fade; if(!gl_FrontFacing) a*=0.55;",
"  float pulse=0.9+0.1*sin(uT*0.9+vV*3.0);",
"  vec3 core=vec3(0.80,0.90,1.0), rim=vec3(0.62,1.0,0.96);",
"  vec3 col=mix(core,rim,f)*pulse*(0.85+0.35*smoothstep(0.6,0.95,vV));",
"  float front=step(0.0,vL.z)*(1.0-vS)*(gl_FrontFacing?1.0:0.0);",
"  float e=length(vec2(abs(vL.x)-0.068,(vL.y-1.69)*0.75)); float eye=1.0-smoothstep(0.026,0.042,e);",
"  float mo=length(vec2(vL.x*1.35,(vL.y-1.565)*0.62)); float mouth=1.0-smoothstep(0.03,0.046,mo);",
"  float dark=max(eye,mouth)*front*step(1.45,vL.y);",
"  col=mix(col,vec3(0.02,0.03,0.06),dark); a=mix(a,0.88,dark);",
"  a*=mix(1.0,0.8,uDay);",
"  gl_FragColor=vec4(col,a);",
THREE.ShaderChunk.fog_fragment,
"}"
].join("\n") });
return (SHC_GH.mat = m);
},
function () {
if (!SHC_GH.halo) {
SHC_GH.halo = new THREE.PlaneGeometry(2.6, 3.2);
var t = shcTex("ghosthalo", 128, 128, function (x, W, H) { x.clearRect(0, 0, W, H); var g = x.createRadialGradient(W / 2, H / 2, 2, W / 2, H / 2, W / 2); g.addColorStop(0, "rgba(190,240,255,.55)"); g.addColorStop(0.45, "rgba(150,220,255,.18)"); g.addColorStop(1, "rgba(120,200,255,0)"); x.fillStyle = g; x.fillRect(0, 0, W, H); });
SHC_GH.haloMat = new THREE.MeshBasicMaterial({ map: t, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, fog: true });
}
return SHC_GH.halo;
},
function (G, D) {
var n = D.ghosts.length, geo = shcGhostGeo().clone(), ph = new Float32Array(n);
D.ghosts.forEach(function (g, i) { ph[i] = g.ph; });
geo.setAttribute("aPh", new THREE.InstancedBufferAttribute(ph, 1));
D.ghostIm = new THREE.InstancedMesh(geo, shcGhostMat(), n);
D.ghostIm.raycast = function () { };
D.ghostIm.userData.shcOwn = true;
D.ghostIm.userData.shcGeoOwn = geo;
D.ghostIm.frustumCulled = false;
D.ghostIm.renderOrder = 3;
D.ghostIm.castShadow = false;
G.add(D.ghostIm);
D.ghostHalo = new THREE.InstancedMesh(shcGhostHalo(), SHC_GH.haloMat, n);
D.ghostHalo.raycast = function () { };
D.ghostHalo.userData.shcOwn = true;
D.ghostHalo.frustumCulled = false;
D.ghostHalo.renderOrder = 2;
G.add(D.ghostHalo);
D.ghostIm.addEventListener("dispose", function () { try {
geo.dispose();
}
catch (e) { } });
shcGhostTick(0);
},
function (dt) {
var D = SHC.deco;
if (!D || !D.ghostIm)
return;
var t = performance.now() / 1000, P = camera.position, near = 1e9;
var M = SHC_GH.mat;
if (M) {
M.uniforms.uT.value = t;
var h = typeof cityHourNow === "function" ? cityHourNow() : 21;
M.uniforms.uDay.value = (typeof isNightHour === "function" && isNightHour(h)) ? 0 : 1;
}
D.ghosts.forEach(function (g, i) {
var a = t * 0.28 + g.ph, rr = 1.4 + 0.6 * Math.sin(t * 0.17 + g.ph * 1.3), x = g.x + Math.cos(a) * rr, z = g.z + Math.sin(a) * rr, y = g.y - 0.9 + Math.sin(t * 0.6 + g.ph) * 0.3;
SHC_O.position.set(x, y, z);
SHC_O.rotation.set(0.14, -a, Math.sin(t * 0.45 + g.ph) * 0.08, "YXZ");
SHC_O.scale.set(1, 1, 1);
SHC_O.updateMatrix();
D.ghostIm.setMatrixAt(i, SHC_O.matrix);
var d = Math.hypot(x - P.x, z - P.z);
if (d < near)
near = d;
if (D.ghostHalo) {
SHC_O.position.set(x, y + 1.25, z);
SHC_O.quaternion.copy(camera.quaternion);
var s = 1 + 0.06 * Math.sin(t * 0.8 + g.ph);
SHC_O.scale.set(s, s, s);
SHC_O.updateMatrix();
D.ghostHalo.setMatrixAt(i, SHC_O.matrix);
}
});
D.ghostIm.instanceMatrix.needsUpdate = true;
if (D.ghostHalo)
D.ghostHalo.instanceMatrix.needsUpdate = true;
if (near < 7)
shcGhostSigh();
},
function () {
var now = Date.now();
if (now - SHC_GH.said < 40000)
return;
SHC_GH.said = now;
if (typeof shcCity === "function" && !shcCity())
return;
if (typeof isNightHour === "function" && typeof cityHourNow === "function" && !isNightHour(cityHourNow()))
return;
if (typeof muted !== "undefined" && muted)
return;
try {
if (!SHC_GH.ac) {
var AC = window.AudioContext || window.webkitAudioContext;
if (!AC)
return;
SHC_GH.ac = new AC();
}
var c = SHC_GH.ac;
if (c.state === "suspended") {
c.resume();
return;
}
var T = c.currentTime, len = 3.2, buf = c.createBuffer(1, Math.floor(c.sampleRate * len), c.sampleRate), d = buf.getChannelData(0);
for (var i = 0; i < d.length; i++)
d[i] = Math.random() * 2 - 1;
var src = c.createBufferSource();
src.buffer = buf;
var bp = c.createBiquadFilter();
bp.type = "bandpass";
bp.Q.value = 9;
bp.frequency.setValueAtTime(520, T);
bp.frequency.linearRampToValueAtTime(330, T + len);
var o = c.createOscillator();
o.type = "sine";
o.frequency.setValueAtTime(300, T);
o.frequency.linearRampToValueAtTime(205, T + len);
var og = c.createGain();
og.gain.value = 0.25;
var v = c.createGain();
v.gain.setValueAtTime(0, T);
v.gain.linearRampToValueAtTime(0.05, T + 1.1);
v.gain.linearRampToValueAtTime(0, T + len);
src.connect(bp);
bp.connect(v);
o.connect(og);
og.connect(v);
v.connect(c.destination);
src.start(T);
src.stop(T + len);
o.start(T);
o.stop(T + len);
}
catch (e) { }
}
];
});
