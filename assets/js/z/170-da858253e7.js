/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(170, function () {
"use strict";
return [
function (game, score) {
if (festSigned()) {
return cityRpc("fest_play", { p_game: game, p_score: Math.round(score || 0) }).then(function (o) {
if (o && o.ok && FEST.st) {
FEST.st.tickets = o.tickets;
}
return o || { ok: false, say: "The booth did not answer." };
}).catch(function (e) { return { ok: false, say: /function|404|PGRST/i.test(String(e && e.message)) ? "The Midway opens soon." : String(e && e.message || e) }; });
}
var L = festLocal(), d = new Date().toDateString(), t = 0, r = Math.random();
if (L.day !== d) {
L.day = d;
L.today = 0;
}
if (game === "rings")
t = Math.min(score, 5) * 3;
else if (game === "lanterns")
t = Math.min(score, 30);
else if (game === "hammer")
t = score >= 100 ? 25 : score >= 90 ? 15 : score >= 70 ? 8 : score >= 40 ? 4 : 1;
else if (game === "wheel")
t = r < 0.02 ? 100 : r < 0.1 ? 40 : r < 0.3 ? 20 : r < 0.65 ? 10 : 5;
else if (game === "ducks")
t = r < 0.05 ? 50 : r < 0.25 ? 15 : 5;
else if (game === "fortune")
t = 5;
else if (game === "parade")
t = 10;
t = Math.max(0, Math.min(t, 600 - L.today));
L.tickets += t;
L.today += t;
festLocalSave();
return Promise.resolve({ ok: true, won: t, rolled: t, tickets: L.tickets, say: t + " tickets (kept on this device: sign in to keep them for prizes)." });
},
function () {
return store.objects.filter(function (o) { return o.realm === ATLC.id && o.city && KIT[o.archetype] && KIT[o.archetype].cat !== "being" && Math.hypot(o.x - ATLC.x, o.z - ATLC.z) < 170; })
.map(function (o) { var k = KIT[o.archetype], s = (o.attrs && o.attrs.s) || 1; return { x: o.x, z: o.z, r: Math.max(k.size[0] * (o.attrs && o.attrs.w || 1), k.size[2] * (o.attrs && o.attrs.d || 1)) * s * 0.5 }; });
},
function () {
if (FEST.layout)
return FEST.layout;
var stand = festStand(), got = [], radii = [96, 110, 82, 122, 70, 132];
FEST_PIECES.forEach(function (p, i) {
var rad = p[1], best = null;
for (var ri = 0; ri < radii.length && !best; ri++) {
var R = radii[ri], steps = Math.floor(2 * Math.PI * R / 4);
for (var k = 0; k < steps && !best; k++) {
var a = 0.6 + i * 0.83 + k * (2 * Math.PI / steps);
var x = ATLC.x + Math.cos(a) * R, z = ATLC.z + Math.sin(a) * R;
if (R + rad > 128 && !atlClearAt(R, a, rad, 3))
continue;
var ok = true;
for (var s = 0; s < stand.length && ok; s++) {
var q = stand[s];
if (Math.hypot(q.x - x, q.z - z) < q.r + rad + 1.5)
ok = false;
}
for (var g = 0; g < got.length && ok; g++) {
if (Math.hypot(got[g].x - x, got[g].z - z) < got[g].rad + rad + 2.5)
ok = false;
}
if (ok && typeof blockedAt === "function" && blockedAt(x, z, 0))
ok = false;
if (ok)
best = { kind: p[0], x: x, z: z, a: a, R: R, rad: rad, rot: rotIn(a), i: i };
}
}
if (best)
got.push(best);
});
FEST.layout = got;
return got;
},
function (list, parent) {
if (!list.length)
return null;
var mat = new THREE.MeshBasicMaterial({ color: 0xFFFFFF });
var IM = new THREE.InstancedMesh(fBulb(), mat, list.length), o = new THREE.Object3D(), c = new THREE.Color();
list.forEach(function (b, i) { o.position.set(b[0], b[1], b[2]); o.scale.setScalar(b[4] || 1); o.updateMatrix(); IM.setMatrixAt(i, o.matrix); c.setHex(b[3]); IM.setColorAt(i, c); });
IM.instanceMatrix.needsUpdate = true;
if (IM.instanceColor)
IM.instanceColor.needsUpdate = true;
IM.userData.festBulbs = list;
IM.frustumCulled = false;
IM.raycast = function () { };
parent.add(IM);
var pos = new Float32Array(list.length * 3), col = new Float32Array(list.length * 3);
list.forEach(function (b, i) { pos[i * 3] = b[0]; pos[i * 3 + 1] = b[1]; pos[i * 3 + 2] = b[2]; c.setHex(b[3]); col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b; });
var hg = new THREE.BufferGeometry();
hg.setAttribute("position", new THREE.BufferAttribute(pos, 3));
hg.setAttribute("color", new THREE.BufferAttribute(col, 3));
var hm = new THREE.PointsMaterial({ size: 1.5, map: festGlowTex(), vertexColors: true, transparent: true, opacity: FEST.haloK || 0, depthWrite: false, blending: THREE.AdditiveBlending, sizeAttenuation: true });
var H = new THREE.Points(hg, hm);
H.frustumCulled = false;
H.raycast = function () { };
H.renderOrder = 3;
H.visible = hm.opacity > 0.02;
parent.add(H);
festBulbTick(IM, 0, !!FEST.haloK);
IM.userData.halo = H;
FEST.halos.push(H);
return IM;
},
function () {
return FEST.glowTex || (FEST.glowTex = hallCanvas(64, 64, function (g, w, h) { var gr = g.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w / 2); gr.addColorStop(0, "rgba(255,255,255,1)"); gr.addColorStop(0.25, "rgba(255,255,255,0.55)"); gr.addColorStop(1, "rgba(255,255,255,0)"); g.fillStyle = gr; g.fillRect(0, 0, w, h); }).tex);
},
function (night) {
var k = night ? 0.95 : 0;
FEST.halos = FEST.halos.filter(function (H) { var o = H; while (o.parent)
o = o.parent; return o === scene; });
FEST.halos.forEach(function (H) { H.material.opacity += (k - H.material.opacity) * 0.08; H.visible = H.material.opacity > 0.02; });
FEST.haloK = FEST.halos.length ? FEST.halos[0].material.opacity : k;
},
function (IM, t, night) {
var L = IM.userData.festBulbs, c = new THREE.Color(), k = night ? 1 : 0.55;
for (var i = 0; i < L.length; i++) {
var b = L[i], on = night ? (0.55 + 0.45 * Math.max(0, Math.sin(t * 3 - i * 0.55 + (b[5] || 0)))) : 1;
c.setHex(b[3]);
c.multiplyScalar(k * on + (night ? 0.25 : 0));
IM.setColorAt(i, c);
}
if (IM.instanceColor)
IM.instanceColor.needsUpdate = true;
},
function (txt, sub, w, h, bg, fg) {
return hallCanvas(w || 1024, h || 256, function (g, cw, ch) {
var gr = g.createLinearGradient(0, 0, cw, 0);
gr.addColorStop(0, bg || "#4A1A6A");
gr.addColorStop(0.5, "#8A2A5A");
gr.addColorStop(1, bg || "#4A1A6A");
g.fillStyle = gr;
g.fillRect(0, 0, cw, ch);
g.strokeStyle = "#FFD040";
g.lineWidth = 10;
g.strokeRect(6, 6, cw - 12, ch - 12);
for (var i = 0; i < 28; i++) {
g.fillStyle = i % 2 ? "#FFE070" : "#FF6A8A";
g.beginPath();
g.arc(20 + i * (cw - 40) / 27, 16, 6, 0, 7);
g.fill();
g.beginPath();
g.arc(20 + i * (cw - 40) / 27, ch - 16, 6, 0, 7);
g.fill();
}
festFit(g, txt, cw / 2, sub ? ch * 0.42 : ch / 2, cw - 70, "bold ", Math.round(ch * 0.3), "px Georgia,serif", fg || "#FFF4D0");
if (sub)
festFit(g, sub, cw / 2, ch * 0.74, cw - 90, "italic ", Math.round(ch * 0.15), "px Georgia,serif", "#FFE0A0");
});
},
function (root, skip) {
skip = skip || [];
root.updateMatrixWorld(true);
var inv = new THREE.Matrix4().copy(root.matrixWorld).invert(), rel = new THREE.Matrix4(), nm = new THREE.Matrix3(), list = [];
(function walk(o) {
if (o !== root && skip.indexOf(o) >= 0)
return;
if (o.isMesh && !o.isInstancedMesh) {
var mt = o.material;
if (mt && !Array.isArray(mt) && !mt.map && !mt.transparent && mt.side === THREE.FrontSide && mt.color && !(mt.emissive && mt.emissive.getHex()) && o.geometry && o.geometry.attributes.position)
list.push(o);
}
o.children.forEach(walk);
})(root);
if (list.length < 2)
return null;
var pos = [], nor = [], col = [];
list.forEach(function (m) {
var g = m.geometry.index ? m.geometry.toNonIndexed() : m.geometry;
if (!g.attributes.normal)
g.computeVertexNormals();
rel.multiplyMatrices(inv, m.matrixWorld);
nm.getNormalMatrix(rel);
var P = g.attributes.position, N = g.attributes.normal, c = m.material.color, v = new THREE.Vector3();
for (var i = 0; i < P.count; i++) {
v.fromBufferAttribute(P, i).applyMatrix4(rel);
pos.push(v.x, v.y, v.z);
v.fromBufferAttribute(N, i).applyMatrix3(nm).normalize();
nor.push(v.x, v.y, v.z);
col.push(c.r, c.g, c.b);
}
if (g !== m.geometry)
g.dispose();
m.parent.remove(m);
});
var geo = new THREE.BufferGeometry();
geo.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
geo.setAttribute("normal", new THREE.Float32BufferAttribute(nor, 3));
geo.setAttribute("color", new THREE.Float32BufferAttribute(col, 3));
geo.computeBoundingSphere();
var out = new THREE.Mesh(geo, FEST.vcMat || (FEST.vcMat = new THREE.MeshLambertMaterial({ color: 0xFFFFFF, vertexColors: true })));
out.name = "ride parts";
root.add(out);
return out;
},
function (P) {
var g = new THREE.Group(), R = 15, hub = R + 3, iron = fM(0xE8E0D0), bulbs = [];
[-1.4, 1.4].forEach(function (s) {
[-1, 1].forEach(function (f) { var leg = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.35, hub * 1.08, 8), iron); leg.position.set(f * 4.6, hub / 2, s); leg.rotation.z = f * 0.27; g.add(leg); });
});
var axle = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 3.4, 12), fM(0xC9A040));
axle.rotation.x = Math.PI / 2;
axle.position.y = hub;
g.add(axle);
var wheel = new THREE.Group();
wheel.position.y = hub;
g.add(wheel);
[-1.1, 1.1].forEach(function (s) {
var rim = new THREE.Mesh(new THREE.TorusGeometry(R, 0.18, 6, 64), iron);
rim.position.z = s;
wheel.add(rim);
var rim2 = new THREE.Mesh(new THREE.TorusGeometry(R * 0.55, 0.12, 6, 48), iron);
rim2.position.z = s;
wheel.add(rim2);
for (var k = 0; k < 16; k++) {
var a = k / 16 * Math.PI * 2, sp = new THREE.Mesh(new THREE.BoxGeometry(0.12, R, 0.12), iron);
sp.position.set(Math.cos(a) * R / 2, Math.sin(a) * R / 2, s);
sp.rotation.z = a - Math.PI / 2;
wheel.add(sp);
for (var b = 1; b <= 10; b++)
bulbs.push([Math.cos(a) * R * b / 10, Math.sin(a) * R * b / 10, s, FEST_COLS[k % FEST_COLS.length], 1, b * 0.4]);
}
for (var m = 0; m < 96; m++) {
var am = m / 96 * Math.PI * 2;
bulbs.push([Math.cos(am) * R, Math.sin(am) * R, s + 0.05 * (s > 0 ? 1 : -1), FEST_COLS[(m >> 2) % FEST_COLS.length], 1.2, m * 0.3]);
}
});
var wb = festBulbs(bulbs, wheel);
var cars = [];
for (var c = 0; c < 16; c++) {
var a2 = c / 16 * Math.PI * 2, car = new THREE.Group();
var cab = new THREE.Mesh(new THREE.CylinderGeometry(0.9, 1.1, 1.2, 8), fM(FEST_COLS[c % 6]));
cab.position.y = -1.4;
car.add(cab);
var roof = new THREE.Mesh(new THREE.ConeGeometry(1.15, 0.6, 8), fM(0xFFFFFF));
roof.position.y = -0.5;
car.add(roof);
var hang = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.9, 4), iron);
hang.position.y = -0.1;
car.add(hang);
car.userData.a = a2;
car.position.set(Math.cos(a2) * R, Math.sin(a2) * R, 0);
wheel.add(car);
cars.push(car);
}
var sign = festSignMesh("THE GREAT WHEEL", "ride it: thirty metres over Somnucor", 9, 2.25);
sign.position.set(0, 2.6, 3.2);
g.add(sign);
var deck = new THREE.Mesh(new THREE.BoxGeometry(6, 0.5, 4), fM(0x7A2A4A));
deck.position.set(0, 0.25, 3);
g.add(deck);
cars.forEach(function (cc) { festMergeVC(cc); });
festMergeVC(wheel, cars);
festMergeVC(g, [wheel, sign]);
P.wheel = { wheel: wheel, cars: cars, R: R, hub: hub, bulbs: wb };
FEST.anim.push(function (t, dt, night) { wheel.rotation.z += dt * 0.06; cars.forEach(function (cc) { cc.rotation.z = -wheel.rotation.z; }); if (wb && (FEST.fr % 3 === 0))
festBulbTick(wb, t, night); });
return g;
},
function (P) {
var g = new THREE.Group(), R = 7, bulbs = [];
var base = new THREE.Mesh(new THREE.CylinderGeometry(R, R + 0.3, 0.6, 32), fM(0xC9A040));
base.position.y = 0.3;
g.add(base);
var plat = new THREE.Group();
plat.position.y = 0.6;
g.add(plat);
var floor = new THREE.Mesh(new THREE.CylinderGeometry(R - 0.2, R - 0.2, 0.1, 32), fM(0x7A2A3A));
plat.add(floor);
var pole = new THREE.Mesh(new THREE.CylinderGeometry(0.9, 0.9, 5.2, 16), fM(0xE8C8E8));
pole.position.y = 2.6;
plat.add(pole);
var tex = festStripes("#E83A5A", "#FFF0E0", 16);
tex.repeat.set(2, 1);
var roof = new THREE.Mesh(new THREE.ConeGeometry(R + 0.8, 3.2, 32, 1, true), new THREE.MeshLambertMaterial({ map: tex, side: THREE.DoubleSide }));
roof.position.y = 6.9;
g.add(roof);
var val = new THREE.Mesh(new THREE.CylinderGeometry(R + 0.8, R + 0.8, 0.8, 32, 1, true), new THREE.MeshLambertMaterial({ map: tex, side: THREE.DoubleSide }));
val.position.y = 5.0;
g.add(val);
var top = new THREE.Mesh(new THREE.SphereGeometry(0.5, 10, 8), fM(0xFFD040));
top.position.y = 8.7;
g.add(top);
var horses = [];
for (var k = 0; k < 12; k++) {
var a = k / 12 * Math.PI * 2, r = k % 2 ? R - 1.6 : R - 3.4, hg = new THREE.Group();
hg.position.set(Math.cos(a) * r, 0, Math.sin(a) * r);
hg.rotation.y = -a;
var rod = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 4.6, 6), fM(0xFFD040));
rod.position.y = 2.3;
hg.add(rod);
var h = new THREE.Group();
h.position.y = 1.3;
hg.add(h);
var col = [0xFFFFFF, 0xF0D8A8, 0x6A4A3A, 0xE8B8D8][k % 4];
var body = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.55, 1.4), fM(col));
h.add(body);
var neck = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.7, 0.35), fM(col));
neck.position.set(0, 0.45, 0.6);
neck.rotation.x = -0.4;
h.add(neck);
var head = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.3, 0.6), fM(col));
head.position.set(0, 0.8, 0.85);
h.add(head);
var mane = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.6, 0.5), fM([0xFF6A9A, 0x3AA8FF, 0xFFD040, 0x8A3AE8][k % 4]));
mane.position.set(0, 0.6, 0.5);
mane.rotation.x = -0.4;
h.add(mane);
if (k % 3 === 0) {
var horn = new THREE.Mesh(new THREE.ConeGeometry(0.05, 0.4, 6), fM(0xFFD040));
horn.position.set(0, 1.05, 1.05);
horn.rotation.x = 0.9;
h.add(horn);
}
var saddle = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.08, 0.5), fM(0xC83A3A));
saddle.position.y = 0.3;
h.add(saddle);
[[-0.18, 0.5], [0.18, 0.5], [-0.18, -0.5], [0.18, -0.5]].forEach(function (l) { var leg = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.6, 0.1), fM(col)); leg.position.set(l[0], -0.5, l[1]); leg.rotation.x = l[1] > 0 ? -0.6 : 0.6; h.add(leg); });
hg.userData.h = h;
hg.userData.p = k * 0.7;
plat.add(hg);
horses.push(hg);
}
for (var b = 0; b < 64; b++) {
var ab = b / 64 * Math.PI * 2;
bulbs.push([Math.cos(ab) * (R + 0.82), 5.0, Math.sin(ab) * (R + 0.82), FEST_COLS[b % FEST_COLS.length], 1.1, b * 0.5]);
bulbs.push([Math.cos(ab) * (R + 0.8) * 0.98, 5.42, Math.sin(ab) * (R + 0.8) * 0.98, 0xFFE8A0, 0.9, b * 0.5 + 1]);
}
for (var b2 = 0; b2 < 24; b2++) {
var a3 = b2 / 24 * Math.PI * 2;
for (var j = 1; j < 5; j++)
bulbs.push([Math.cos(a3) * (R + 0.8) * (1 - j / 5), 5.4 + 3.2 * j / 5, Math.sin(a3) * (R + 0.8) * (1 - j / 5), 0xFFE8A0, 0.8, j]);
}
var cb = festBulbs(bulbs, g);
var hs = horses.map(function (hg) { festMergeVC(hg.userData.h); return hg.userData.h; });
festMergeVC(plat, hs);
festMergeVC(g, [plat]);
P.carousel = { plat: plat, R: R, horses: horses };
FEST.anim.push(function (t, dt, night) { plat.rotation.y += dt * 0.35; horses.forEach(function (hg) { hg.userData.h.position.y = 1.3 + Math.sin(t * 2.2 + hg.userData.p) * 0.35; }); if (cb && (FEST.fr % 3 === 1))
festBulbTick(cb, t, night); });
return g;
},
function () {
var g = new THREE.Group(), tex = festStripes("#C8283A", "#FFF4E0", 24);
tex.repeat.set(3, 1);
var wall = new THREE.Mesh(new THREE.CylinderGeometry(12, 12, 5, 40, 1, true), new THREE.MeshLambertMaterial({ map: tex, side: THREE.DoubleSide }));
wall.position.y = 2.5;
g.add(wall);
var roof = new THREE.Mesh(new THREE.ConeGeometry(13, 8, 40, 1, true), new THREE.MeshLambertMaterial({ map: tex, side: THREE.DoubleSide }));
roof.position.y = 9;
g.add(roof);
var pole = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.25, 15, 8), fM(0xC9A040));
pole.position.y = 7.5;
g.add(pole);
var flag = new THREE.Mesh(new THREE.PlaneGeometry(2, 1.2), fM(0xFFD040, "ds"));
flag.position.set(1, 14.4, 0);
g.add(flag);
var door = new THREE.Mesh(new THREE.PlaneGeometry(4, 4.4), fM(0x1A0A10, "ds"));
door.position.set(0, 2.2, 12.05);
g.add(door);
var sign = festSignMesh("THE CIRCUS OF WONDERS", "the big top · three o'clock", 8, 2);
sign.position.set(0, 6, 12.6);
sign.rotation.x = -0.2;
g.add(sign);
var bulbs = [];
for (var i = 0; i < 80; i++) {
var a = i / 80 * Math.PI * 2;
bulbs.push([Math.cos(a) * 12.1, 5.05, Math.sin(a) * 12.1, FEST_COLS[i % 7], 1.1, i * 0.4]);
}
for (var k = 0; k < 20; k++) {
var a2 = k / 20 * Math.PI * 2;
for (var j = 0; j < 8; j++)
bulbs.push([Math.cos(a2) * 12.4 * (1 - j / 8), 5.1 + 8 * j / 8, Math.sin(a2) * 12.4 * (1 - j / 8), 0xFFE8A0, 0.9, j * 0.6]);
}
var b = festBulbs(bulbs, g);
FEST.anim.push(function (t, dt, night) { flag.rotation.y = Math.sin(t * 2) * 0.3; if (b && (FEST.fr % 3 === 2))
festBulbTick(b, t, night); });
return g;
},
function (P) {
var g = new THREE.Group();
var deck = new THREE.Mesh(new THREE.BoxGeometry(12, 1.2, 7), fM(0x3A2418));
deck.position.y = 0.6;
g.add(deck);
var back = new THREE.Mesh(new THREE.BoxGeometry(12, 6, 0.3), fM(0x5A1A4A));
back.position.set(0, 4.2, -3.4);
g.add(back);
var tex = festStripes("#8A1A4A", "#FFD040", 12);
tex.repeat.set(2, 1);
var val = new THREE.Mesh(new THREE.BoxGeometry(12.4, 1, 0.4), new THREE.MeshLambertMaterial({ map: tex }));
val.position.set(0, 7.4, 3.3);
g.add(val);
[-6, 6].forEach(function (x) { var p = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 7.4, 8), fM(0xC9A040)); p.position.set(x, 3.7, 3.3); g.add(p); });
var sign = festSignMesh("THE BACCHANAL STAGE", "music · fire dancers · every night", 8, 2);
sign.position.set(0, 5.2, -3.2);
g.add(sign);
var bulbs = [];
for (var i = 0; i < 40; i++)
bulbs.push([-6 + i * 12 / 39, 7.95, 3.3, FEST_COLS[i % 7], 1.1, i * 0.5]);
for (var j = 0; j < 24; j++) {
bulbs.push([-6, 0.5 + j * 0.3, 3.5, 0xFFE8A0, 0.9, j]);
bulbs.push([6, 0.5 + j * 0.3, 3.5, 0xFFE8A0, 0.9, j]);
}
var b = festBulbs(bulbs, g);
var fire = [];
for (var d = 0; d < 3; d++) {
var fx = new THREE.Group();
fx.position.set(-3.5 + d * 3.5, 2.4, 0.5);
g.add(fx);
for (var q = 0; q < 2; q++) {
var ball = new THREE.Mesh(new THREE.SphereGeometry(0.18, 8, 6), new THREE.MeshBasicMaterial({ color: 0xFF8A2A, transparent: true, opacity: 0.95 }));
fx.add(ball);
}
fire.push(fx);
}
P.stage = { fire: fire, g: g };
FEST.anim.push(function (t, dt, night) {
var h = dreamHour(), on = night && h >= 20 && h < 23;
fire.forEach(function (fx, i) { fx.visible = on; if (on)
fx.children.forEach(function (ball, k) { var a = t * (5 + i) + k * Math.PI; ball.position.set(Math.cos(a) * 0.8, Math.sin(a) * 0.8, 0); }); });
if (b && (FEST.fr % 3 === 0))
festBulbTick(b, t, night);
});
return g;
},
function (kind) {
var B = FEST_BOOTHS[kind], g = new THREE.Group();
if (kind === "fortune") {
var tex = festStripes("#3A1A5A", "#C8A0E8", 12);
tex.repeat.set(2, 1);
var tent = new THREE.Mesh(new THREE.ConeGeometry(3, 4.4, 12, 1, true), new THREE.MeshLambertMaterial({ map: tex, side: THREE.DoubleSide }));
tent.position.y = 2.2;
g.add(tent);
var orb = new THREE.Mesh(new THREE.SphereGeometry(0.35, 14, 10), new THREE.MeshBasicMaterial({ color: 0xC8A0FF, transparent: true, opacity: 0.8 }));
orb.position.set(0, 1.1, 2.4);
g.add(orb);
var tb = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 0.8, 10), fM(0x2A1A3A));
tb.position.set(0, 0.4, 2.4);
g.add(tb);
FEST.anim.push(function (t) { orb.material.opacity = 0.55 + 0.35 * Math.sin(t * 2); });
}
else {
var c1 = B[2], tex2 = festStripes(c1, "#FFF4E0", 10);
var counter = new THREE.Mesh(new THREE.BoxGeometry(4.2, 1.1, 1), fM(0x6A4A2A));
counter.position.set(0, 0.55, 1.1);
g.add(counter);
var back = new THREE.Mesh(new THREE.BoxGeometry(4.2, 3, 0.2), fM(0x5A3A22));
back.position.set(0, 1.5, -1.4);
g.add(back);
[-2, 2].forEach(function (x) { [-1.4, 1.5].forEach(function (z) { var p = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 3.2, 6), fM(0xFFF4E0)); p.position.set(x, 1.6, z); g.add(p); }); });
var aw = new THREE.Mesh(new THREE.BoxGeometry(4.6, 0.12, 3.4), new THREE.MeshLambertMaterial({ map: tex2 }));
aw.position.set(0, 3.25, 0.05);
aw.rotation.x = 0.18;
g.add(aw);
for (var sc = 0; sc < 9; sc++) {
var sl = new THREE.Mesh(new THREE.ConeGeometry(0.26, 0.4, 3), fM(sc % 2 ? 0xFFF4E0 : parseInt(c1.slice(1), 16)));
sl.position.set(-2.1 + sc * 0.52, 2.98, 1.75);
sl.rotation.x = Math.PI;
g.add(sl);
}
if (kind === "rings") {
for (var i = 0; i < 10; i++) {
var bt = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.1, 0.4, 8), fM(FEST_COLS[i % 5]));
bt.position.set(-1.6 + (i % 5) * 0.8, 1.3 + (i > 4 ? 0.6 : 0), -1.0 + (i > 4 ? -0.15 : 0));
g.add(bt);
}
}
if (kind === "lanterns") {
for (var j = 0; j < 6; j++) {
var ln = new THREE.Mesh(new THREE.SphereGeometry(0.22, 8, 6), new THREE.MeshBasicMaterial({ color: FEST_COLS[j % 6] }));
ln.position.set(-1.6 + j * 0.64, 2.1, -1.2);
ln.userData.keep = 1;
g.add(ln);
(function (m, k) { FEST.anim.push(function (t) { m.position.y = 2.0 + Math.sin(t * 1.5 + k) * 0.25; }); })(ln, j);
}
}
if (kind === "hammer") {
var tw = new THREE.Mesh(new THREE.BoxGeometry(0.4, 6, 0.3), fM(0xE8E0D0));
tw.position.set(1.2, 3, -1.6);
g.add(tw);
var bell = new THREE.Mesh(new THREE.SphereGeometry(0.4, 10, 8, 0, Math.PI * 2, 0, Math.PI / 2), fM(0xFFD040));
bell.position.set(1.2, 6.2, -1.6);
g.add(bell);
for (var m = 0; m < 10; m++) {
var mk = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.08, 0.32), fM(m < 4 ? 0x3AE85A : m < 7 ? 0xFFD040 : 0xFF3A3A));
mk.position.set(1.2, 0.8 + m * 0.55, -1.45);
g.add(mk);
}
}
if (kind === "wheelw") {
var ww = new THREE.Group();
ww.userData.keep = 1;
ww.position.set(0, 1.9, -1.2);
g.add(ww);
for (var s = 0; s < 12; s++) {
var seg = new THREE.Mesh(new THREE.CylinderGeometry(1.1, 1.1, 0.08, 12, 1, false, s / 12 * Math.PI * 2, Math.PI * 2 / 12), fM(FEST_COLS[s % 7]));
seg.rotation.x = Math.PI / 2;
ww.add(seg);
}
FEST.anim.push(function (t) { ww.rotation.z = t * 0.4; });
}
if (kind === "ducks") {
var pond = new THREE.Mesh(new THREE.CylinderGeometry(1.3, 1.3, 0.5, 20), fM(0x2A7AB8));
pond.position.set(0, 0.9, -0.3);
g.add(pond);
for (var d = 0; d < 8; d++) {
var dk = new THREE.Mesh(new THREE.SphereGeometry(0.14, 8, 6), fM(0xFFE03A));
dk.userData.a = d / 8 * Math.PI * 2;
dk.userData.keep = 1;
g.add(dk);
(function (m) { FEST.anim.push(function (t) { var a = m.userData.a + t * 0.5; m.position.set(Math.cos(a) * 0.95, 1.2, -0.3 + Math.sin(a) * 0.95); }); })(dk);
}
}
if (kind === "prizes") {
for (var p = 0; p < 9; p++) {
var pr = new THREE.Mesh(p % 3 === 0 ? new THREE.SphereGeometry(0.26, 8, 6) : new THREE.BoxGeometry(0.4, 0.4, 0.4), fM(FEST_COLS[p % 7]));
pr.position.set(-1.6 + (p % 5) * 0.8, 1.35 + (p > 4 ? 0.7 : 0), -1.1);
g.add(pr);
}
var dr = new THREE.Mesh(new THREE.SphereGeometry(0.45, 10, 8), fM(0x3AA85A));
dr.position.set(0, 2.5, -1.1);
dr.scale.set(1, 0.8, 1.4);
g.add(dr);
}
}
var sign = festSignMesh(B[0], B[1], 3.8, 0.95);
sign.position.set(0, kind === "fortune" ? 4.6 : 3.9, kind === "fortune" ? 0 : 1.75);
g.add(sign);
var bulbs = [];
if (kind !== "fortune")
for (var k = 0; k < 14; k++)
bulbs.push([-2.2 + k * 4.4 / 13, 3.42, 1.72, FEST_COLS[k % 7], 1, k * 0.6]);
else
for (var k2 = 0; k2 < 24; k2++) {
var a = k2 / 24 * Math.PI * 2;
bulbs.push([Math.cos(a) * 3.02, 0.15, Math.sin(a) * 3.02, FEST_COLS[k2 % 7], 1, k2]);
}
var b = festBulbs(bulbs, g);
if (b)
FEST.anim.push(function (t, dt, night) { if (FEST.fr % 4 === 0)
festBulbTick(b, t, night); });
if (typeof gwBake === "function")
try {
gwBake(g);
}
catch (e) { }
return g;
},
function (i) {
var g = new THREE.Group(), cols = [["#E8503A", "CANDY FLOSS"], ["#3A8AE8", "TOFFEE APPLES"], ["#E8B83A", "HOT CHESTNUTS"]][i % 3];
var cart = new THREE.Mesh(new THREE.BoxGeometry(2.2, 1, 1.2), fM(parseInt(cols[0].slice(1), 16)));
cart.position.y = 0.9;
g.add(cart);
[-0.8, 0.8].forEach(function (x) { var w = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.4, 0.1, 12), fM(0x2A2A2A)); w.rotation.x = Math.PI / 2; w.position.set(x, 0.4, 0.62); g.add(w); });
var um = new THREE.Mesh(new THREE.ConeGeometry(1.6, 0.7, 10, 1, true), new THREE.MeshLambertMaterial({ map: festStripes(cols[0], "#FFF4E0", 10), side: THREE.DoubleSide }));
um.position.y = 2.9;
g.add(um);
var po = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 2.2, 6), fM(0xFFF4E0));
po.position.y = 1.9;
g.add(po);
var s = festSignMesh(cols[1], null, 1.8, 0.45);
s.position.set(0, 1.6, 0.62);
g.add(s);
if (i % 3 === 0) {
for (var k = 0; k < 4; k++) {
var cf = new THREE.Mesh(new THREE.SphereGeometry(0.2, 8, 6), fM(0xFFB8D8));
cf.position.set(-0.6 + k * 0.4, 1.75, 0);
g.add(cf);
}
}
return g;
},
function () {
var g = new THREE.Group();
for (var i = 0; i < 14; i++) {
var b = new THREE.Mesh(new THREE.SphereGeometry(0.42, 10, 8), fM(FEST_COLS[i % 6]));
b.scale.y = 1.2;
var a = i / 14 * Math.PI * 2, r = 0.5 + (i % 3) * 0.35;
b.position.set(Math.cos(a) * r, 3.4 + (i % 4) * 0.45, Math.sin(a) * r);
g.add(b);
var st = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.008, b.position.y, 3), fM(0xEEEEEE));
st.position.set(b.position.x / 2, b.position.y / 2, b.position.z / 2);
g.add(st);
}
FEST.anim.push(function (t) { g.rotation.y = Math.sin(t * 0.4) * 0.3; });
return g;
},
function () {
if (FEST.mid)
return;
var lay = festLayout(), G = new THREE.Group();
G.name = "the Midway";
scene.add(G);
FEST.mid = G;
FEST.pieces = {};
lay.forEach(function (p) {
var o = null;
if (p.kind === "wheel")
o = festWheel(FEST.pieces);
else if (p.kind === "carousel")
o = festCarousel(FEST.pieces);
else if (p.kind === "bigtop")
o = festBigTop();
else if (p.kind === "stage")
o = festStage(FEST.pieces);
else if (p.kind === "food")
o = festFood(p.i);
else if (p.kind === "balloons")
o = festBalloons();
else
o = festBooth(p.kind);
var y = terrainY(p.x, p.z);
o.position.set(p.x, y, p.z);
o.rotation.y = p.rot;
o.traverse(function (m) { if (m.isMesh && !m.isInstancedMesh) {
m.castShadow = false;
} if (!m.isInstancedMesh)
m.raycast = function () { }; });
o.userData.festKind = p.kind;
G.add(o);
p.obj = o;
p.y = y;
if (p.kind !== "balloons")
(FEST.solids = FEST.solids || []).push({ x: p.x, z: p.z, r: p.kind === "wheel" ? 5 : p.kind === "carousel" ? 7.4 : p.kind === "bigtop" ? 12.2 : p.kind === "stage" ? 5.5 : p.kind === "food" ? 1.2 : 2 });
if (FEST_BOOTHS[p.kind] || p.kind === "carousel" || p.kind === "wheel")
festKeeper(p);
if (typeof nightGlowSpot === "function")
nightGlowSpot("fest:" + p.kind + p.i, { x: p.x, y: y + 4, z: p.z, col: FEST_COLS[p.i % FEST_COLS.length], k: 1.4, r: p.rad * 1.8, pri: 1.6 });
});
ATL_STAIRS.filter(function (s) { return s.main; }).forEach(function (s, i) {
var R = 136, x = ATLC.x + Math.cos(s.a) * R, z = ATLC.z + Math.sin(s.a) * R, y = terrainY(x, z);
var arch = festArch(s.half * 2 + 2, "SOMNUCOR EXTRAVAGANZA", i === 0 ? "THE GRAND OPENING · CARNIVAL BACCHANAL" : "CARNIVAL BACCHANAL · TWO WEEKS · ALL WELCOME");
arch.position.set(x, y, z);
arch.rotation.y = rotIn(s.a);
G.add(arch);
});
FEST.search = [];
for (var k = 0; k < 4; k++) {
var a = k / 4 * Math.PI * 2 + 0.6, R2 = 128, sx = ATLC.x + Math.cos(a) * R2, sz = ATLC.z + Math.sin(a) * R2, sy = terrainY(sx, sz);
var beam = new THREE.Mesh(new THREE.CylinderGeometry(4, 0.4, 260, 16, 1, true), new THREE.MeshBasicMaterial({ color: [0xC8D8FF, 0xFFC8E8, 0xC8FFE8, 0xFFE8B8][k], transparent: true, opacity: 0.12, side: THREE.DoubleSide, depthWrite: false, blending: THREE.AdditiveBlending }));
beam.geometry.translate(0, 130, 0);
var piv = new THREE.Group();
piv.position.set(sx, sy + 1, sz);
piv.add(beam);
G.add(piv);
beam.raycast = function () { };
var lamp = new THREE.Mesh(new THREE.CylinderGeometry(0.9, 1.1, 1.2, 12), fM(0x3A3A3E));
lamp.position.set(sx, sy + 0.6, sz);
G.add(lamp);
FEST.search.push({ piv: piv, beam: beam, p: k * 1.7 });
}
FEST.lanternG = new THREE.Group();
G.add(FEST.lanternG);
FEST.lanterns = [];
var lm = new THREE.MeshBasicMaterial({ color: 0xFFB050, transparent: true, opacity: 0.95 });
for (var l = 0; l < 70; l++) {
var ln = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.28, 0.6, 8), lm);
ln.raycast = function () { };
FEST.lanternG.add(ln);
FEST.lanterns.push({ m: ln, t: Math.random() * 60, a: Math.random() * 6.283, r: 20 + Math.random() * 100 });
}
festFireworksMake();
},
function (w, txt, sub) {
var g = new THREE.Group(), h = 11, bulbs = [], wh = fM(0xFFF4E0);
[-1, 1].forEach(function (s) {
var p = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.55, h, 10), fM(0x8A2A6A));
p.position.set(s * w / 2, h / 2, 0);
g.add(p);
var top = new THREE.Mesh(new THREE.SphereGeometry(0.8, 12, 10), fM(0xFFD040));
top.position.set(s * w / 2, h + 0.6, 0);
g.add(top);
for (var k = 0; k < 22; k++)
bulbs.push([s * w / 2, 0.5 + k * h / 22, 0.5, FEST_COLS[k % 7], 1.2, k * 0.5]);
});
var curve = new THREE.Mesh(new THREE.TorusGeometry(w / 2, 0.35, 8, 40, Math.PI), fM(0x8A2A6A));
curve.position.y = h;
g.add(curve);
for (var c = 0; c <= 40; c++) {
var a = c / 40 * Math.PI;
bulbs.push([Math.cos(a) * w / 2, h + Math.sin(a) * w / 2, 0.4, FEST_COLS[c % 7], 1.3, c * 0.4]);
}
var s1 = festSignMesh(txt, sub, w * 0.86, w * 0.86 / 4);
s1.position.set(0, h + w * 0.18, 0.3);
g.add(s1);
var b = festBulbs(bulbs, g);
if (b) {
var fa = function (t, dt, night) { if (FEST.fr % 3 === 1)
festBulbTick(b, t, night); };
fa.own = g;
FEST.anim.push(fa);
}
return g;
},
function (p) {
if (typeof buildFigure !== "function")
return;
var id = "fest_k_" + p.kind + p.i, h = (typeof hash === "function") ? hash(id) : p.i * 977, f = (h >>> 3) % 2 === 0;
var L = (typeof randomLook === "function") ? randomLook(id, "human") : {};
L.sex = f ? "f" : "m";
L.top = [0xC8283A, 0x2A5AC8, 0x8A2AC8, 0x2A8A3A][p.i % 4];
L.bottom = 0x1A1A22;
L.layer = "vest";
L.layerColor = 0xFFD040;
L.hat = "tophat";
L.hatColor = 0x1A1A22;
L.neck = "bowtie";
L.accColor = 0xFFD040;
L.back = null;
if (p.kind === "fortune") {
L.top = 0x5A1A6A;
L.layer = "tunic";
L.layerColor = 0x3A1A5A;
L.hat = "hood";
L.hatColor = 0x3A1A5A;
L.neck = null;
L.back = "cloak";
L.backColor = 0x3A1A5A;
}
var g = buildFigure({ id: "__" + id, archetype: "human", attrs: {}, look: L, solid: false, detail: (typeof LITE !== "undefined" && LITE) ? 2 : 3, nights: [], city: true }, 1);
var lx = 0, lz = p.kind === "fortune" ? 1.4 : p.kind === "wheel" ? 6.2 : p.kind === "carousel" ? 8.4 : -0.3;
var c = Math.cos(p.rot), s = Math.sin(p.rot);
g.position.set(p.x + lx * c + lz * s, p.y, p.z - lx * s + lz * c);
g.rotation.y = p.rot;
var name = (typeof TEMP_GIVEN_F !== "undefined") ? ((f ? TEMP_GIVEN_F : TEMP_GIVEN_M)[(h >>> 5) % 20]) : "Barker";
var tag = makeTag(name + " · " + (p.kind === "wheel" ? "Wheel operator" : p.kind === "carousel" ? "Carousel operator" : p.kind === "fortune" ? "Fortune teller" : p.kind === "prizes" ? "Prize keeper" : "Barker"), false);
tag.position.y = 2.2;
tag.visible = false;
g.add(tag);
g.userData.tag = tag;
g.traverse(function (m) { m.raycast = function () { }; });
FEST.mid.add(g);
},
function (OLD) {
OLD.traverse(function (m) {
try {
if (m.isPoints && m.material && m.material.blending === THREE.AdditiveBlending) {
m.geometry.dispose();
m.material.dispose();
}
else if (m.isInstancedMesh && m.userData.festBulbs && m.material)
m.material.dispose();
if (m.geometry && m.geometry !== FEST.bulbGeo && m.geometry !== FEST.bannerGeo)
m.geometry.dispose();
var mt = m.material;
if (mt && mt.map && mt.map !== FEST.bannerTex && mt.map !== FEST.glowTex && !m.isPoints) {
mt.map.dispose();
mt.dispose();
}
}
catch (e) { }
});
FEST.halos = FEST.halos.filter(function (H) { var o = H; while (o.parent)
o = o.parent; return o !== OLD; });
FEST.anim = FEST.anim.filter(function (f) { if (!f.own)
return true; var o = f.own; while (o.parent)
o = o.parent; return o !== OLD; });
if (typeof HDF !== "undefined" && HDF.list)
for (var i = HDF.list.length - 1; i >= 0; i--) {
var E = HDF.list[i], g = E.g || (E.gw && E.gw.deref()), o = g;
while (o && o.parent)
o = o.parent;
if (o === OLD) {
if (E.model && typeof hdfDetach === "function")
hdfDetach(E);
HDF.list.splice(i, 1);
}
}
},
function (P) {
if (FEST.street && FEST.street.parent)
FEST.street.parent.remove(FEST.street);
if (FEST.street)
festDropStreet(FEST.street);
var G = new THREE.Group();
G.name = "festival streets";
scene.add(G);
FEST.street = G;
var lite = typeof LITE !== "undefined" && LITE, reach = lite ? 120 : 220, step = 18;
var dc = Math.hypot(P.x - ATLC.x, P.z - ATLC.z), ac = Math.atan2(P.z - ATLC.z, P.x - ATLC.x);
var poles = [], bulbs = [], flags = [], banners = [];
FEST_RINGS.forEach(function (rs) {
if (Math.abs(rs - dc) > reach + 30)
return;
[1, -1].forEach(function (side) {
var rk = rs + side * (ATL_ROAD + 1.4), span = reach / rk, i0 = Math.ceil((ac - span) * rk / step), i1 = Math.floor((ac + span) * rk / step), prev = null;
for (var i = i0; i <= i1; i++) {
var a = i * step / rk, x = ATLC.x + Math.cos(a) * rk, z = ATLC.z + Math.sin(a) * rk;
if (!atlClearAt(rk, a, 1, 2) || (typeof blockedAt === "function" && blockedAt(x, z, 0))) {
prev = null;
continue;
}
var y = terrainY(x, z), top = y + 6.2;
poles.push([x, y, z, i]);
if (prev) {
for (var k = 1; k < 10; k++) {
var f = k / 10, sag = Math.sin(f * Math.PI) * 1.3;
bulbs.push([prev[0] + (x - prev[0]) * f, prev[1] + (top - prev[1]) * f - sag, prev[2] + (z - prev[2]) * f, FEST_COLS[(i * 3 + k) % FEST_COLS.length], 1.25, k * 0.7 + i]);
}
for (var q = 1; q < 12; q++) {
var f2 = q / 12, sag2 = Math.sin(f2 * Math.PI) * 1.6;
flags.push([prev[0] + (x - prev[0]) * f2, prev[1] - 0.9 + (top - prev[1]) * f2 - sag2, prev[2] + (z - prev[2]) * f2, FEST_COLS[(i + q) % 6], Math.atan2(x - prev[0], z - prev[2])]);
}
}
if ((i % 3 + 3) % 3 === 0)
banners.push([x, y, z, a, side]);
prev = [x, top, z];
}
});
});
if (poles.length) {
var PM = new THREE.InstancedMesh(new THREE.CylinderGeometry(0.09, 0.12, 6.3, 6), new THREE.MeshLambertMaterial({ color: 0xFFFFFF }), poles.length), o = new THREE.Object3D(), c = new THREE.Color();
poles.forEach(function (p, i) { o.position.set(p[0], p[1] + 3.15, p[2]); o.updateMatrix(); PM.setMatrixAt(i, o.matrix); c.setHex(i % 2 ? 0xE8D040 : 0xC83A6A); PM.setColorAt(i, c); });
PM.instanceMatrix.needsUpdate = true;
if (PM.instanceColor)
PM.instanceColor.needsUpdate = true;
PM.raycast = function () { };
G.add(PM);
var tops = poles.map(function (p, i) { return [p[0], p[1] + 6.45, p[2], 0xFFD040, 2.6, i]; });
festBulbs(tops, G);
}
var SB = festBulbs(bulbs, G);
FEST.streetBulbs = SB;
if (flags.length) {
var tri = new THREE.BufferGeometry();
tri.setAttribute("position", new THREE.Float32BufferAttribute([-0.32, 0, 0, 0.32, 0, 0, 0, -0.62, 0], 3));
tri.computeVertexNormals();
var FM = new THREE.InstancedMesh(tri, new THREE.MeshBasicMaterial({ color: 0xFFFFFF, side: THREE.DoubleSide }), flags.length), o2 = new THREE.Object3D(), c2 = new THREE.Color();
flags.forEach(function (q, i) { o2.position.set(q[0], q[1], q[2]); o2.rotation.set(0, q[4] + Math.PI / 2, 0); o2.updateMatrix(); FM.setMatrixAt(i, o2.matrix); c2.setHex(q[3]); FM.setColorAt(i, c2); });
FM.instanceMatrix.needsUpdate = true;
if (FM.instanceColor)
FM.instanceColor.needsUpdate = true;
FM.raycast = function () { };
G.add(FM);
}
var bsc = FEST.bannerTex || (FEST.bannerTex = hallCanvas(128, 320, function (g, w, h) {
var gr = g.createLinearGradient(0, 0, 0, h);
gr.addColorStop(0, "#5A1A7A");
gr.addColorStop(1, "#C83A6A");
g.fillStyle = gr;
g.fillRect(0, 0, w, h);
g.fillStyle = "#FFD040";
g.beginPath();
g.moveTo(0, h);
g.lineTo(w / 2, h - 30);
g.lineTo(w, h);
g.fill();
g.save();
g.translate(w / 2, h / 2 - 14);
g.rotate(-Math.PI / 2);
hallText(g, "EXTRAVAGANZA", 0, -12, h - 60, "bold 30px Georgia,serif", "#FFF4D0");
hallText(g, "GRAND OPENING", 0, 24, h - 80, "italic 20px Georgia,serif", "#FFE0A0");
g.restore();
}).tex);
var bm = new THREE.MeshBasicMaterial({ map: bsc });
banners.slice(0, 60).forEach(function (b) {
var m = festTwoFace(FEST.bannerGeo || (FEST.bannerGeo = new THREE.PlaneGeometry(0.9, 2.3)), bm);
var off = 0.5;
m.position.set(b[0] + Math.cos(b[3]) * off * b[4], b[1] + 4.2, b[2] + Math.sin(b[3]) * off * b[4]);
m.rotation.y = rotIn(b[3]) + Math.PI / 2;
m.raycast = function () { };
G.add(m);
});
ATL_STAIRS.filter(function (s) { return s.main; }).forEach(function (s, i) {
FEST_RINGS.forEach(function (rs, ri) {
var R = rs - ATL_ROAD - 6;
if (R < 200)
return;
var x = ATLC.x + Math.cos(s.a) * R, z = ATLC.z + Math.sin(s.a) * R;
if (Math.hypot(x - P.x, z - P.z) > reach + 40)
return;
var arch = festArch(s.half * 2 + 2, "EXTRAVAGANZA", "TO THE MIDWAY AT THE TOWER · ALL WELCOME");
arch.position.set(x, terrainY(x, z), z);
arch.rotation.y = rotIn(s.a);
arch.scale.setScalar(0.8);
G.add(arch);
});
});
FEST.streetN = poles.length;
},
function () {
var N = 2400, pos = new Float32Array(N * 3), col = new Float32Array(N * 3);
for (var i = 0; i < N; i++) {
pos[i * 3 + 1] = -9999;
}
var g = new THREE.BufferGeometry();
g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
g.setAttribute("color", new THREE.BufferAttribute(col, 3));
var m = new THREE.PointsMaterial({ size: 2.2, vertexColors: true, transparent: true, opacity: 1, depthWrite: false, blending: THREE.AdditiveBlending, map: (typeof dotTexture === "function") ? dotTexture() : null, sizeAttenuation: true });
var P = new THREE.Points(g, m);
P.frustumCulled = false;
P.raycast = function () { };
scene.add(P);
FEST.fwP = P;
FEST.fwN = N;
FEST.fwV = new Float32Array(N * 3);
FEST.fwL = new Float32Array(N);
FEST.fwC = new Float32Array(N * 3);
FEST.fwNext = 0;
},
function (x, y, z, big) {
var N = FEST.fwN, n = big ? 260 : 140, c1 = new THREE.Color(FEST_COLS[Math.floor(Math.random() * FEST_COLS.length)]), c2 = new THREE.Color(FEST_COLS[Math.floor(Math.random() * FEST_COLS.length)]);
var kind = Math.floor(Math.random() * 4), sp = big ? 34 : 24, pos = FEST.fwP.geometry.attributes.position.array;
for (var k = 0; k < n; k++) {
var i = FEST.fwNext;
FEST.fwNext = (FEST.fwNext + 1) % N;
var u = Math.random() * 2 - 1, th = Math.random() * Math.PI * 2, r = Math.sqrt(1 - u * u), s = sp * (kind === 1 ? 1 : (0.7 + Math.random() * 0.3));
var vx = r * Math.cos(th) * s, vy = u * s, vz = r * Math.sin(th) * s;
if (kind === 2) {
vy = Math.abs(vy) * 0.3 + 8;
}
if (kind === 3 && k % 2) {
vx *= 0.5;
vy *= 0.5;
vz *= 0.5;
}
pos[i * 3] = x;
pos[i * 3 + 1] = y;
pos[i * 3 + 2] = z;
FEST.fwV[i * 3] = vx;
FEST.fwV[i * 3 + 1] = vy;
FEST.fwV[i * 3 + 2] = vz;
FEST.fwL[i] = 1.6 + Math.random() * (kind === 2 ? 1.8 : 0.8);
var c = (k % 3 === 0) ? c2 : c1;
FEST.fwC[i * 3] = c.r;
FEST.fwC[i * 3 + 1] = c.g;
FEST.fwC[i * 3 + 2] = c.b;
}
},
function (dt) {
if (!FEST.fwP)
return;
var show = festOn() && careInCityLoose() ? festShow() : 0;
FEST.fwAt -= dt;
if (show && FEST.fwAt <= 0) {
var big = show === 2, tx = ATLC.x, tz = ATLC.z, base = terrainY(tx, tz);
var n = big ? (festFinale() ? 3 : 2) : 1;
for (var b = 0; b < n; b++) {
var a = Math.random() * 6.283, r = Math.random() * 70;
festBurst(tx + Math.cos(a) * r, base + 110 + Math.random() * 90, tz + Math.sin(a) * r, big && Math.random() < 0.5);
}
FEST.fwAt = big ? (festFinale() ? 0.35 : 0.7) : 3.5 + Math.random() * 3;
}
var pos = FEST.fwP.geometry.attributes.position.array, col = FEST.fwP.geometry.attributes.color.array, any = false;
for (var i = 0; i < FEST.fwN; i++) {
if (FEST.fwL[i] <= 0) {
if (pos[i * 3 + 1] > -9000) {
pos[i * 3 + 1] = -9999;
}
continue;
}
any = true;
FEST.fwL[i] -= dt;
FEST.fwV[i * 3 + 1] -= 9 * dt;
FEST.fwV[i * 3] *= 0.985;
FEST.fwV[i * 3 + 1] *= 0.985;
FEST.fwV[i * 3 + 2] *= 0.985;
pos[i * 3] += FEST.fwV[i * 3] * dt;
pos[i * 3 + 1] += FEST.fwV[i * 3 + 1] * dt;
pos[i * 3 + 2] += FEST.fwV[i * 3 + 2] * dt;
var k = Math.max(0, Math.min(1, FEST.fwL[i] / 1.2)), tw = 1;
col[i * 3] = FEST.fwC[i * 3] * k * tw;
col[i * 3 + 1] = FEST.fwC[i * 3 + 1] * k * tw;
col[i * 3 + 2] = FEST.fwC[i * 3 + 2] * k * tw;
}
FEST.fwP.visible = any;
if (any) {
FEST.fwP.geometry.attributes.position.needsUpdate = true;
FEST.fwP.geometry.attributes.color.needsUpdate = true;
}
},
function (when) {
var g = new THREE.Group();
g.name = "parade";
scene.add(g);
var R = festParadeRadius(), walkers = [];
var roles = ["drum", "dance", "dance", "stilt", "drum", "dance", "juggle", "stilt", "dance", "drum", "dance", "dance", "stilt", "dance", "drum", "dance", "dance", "juggle"];
roles.forEach(function (rl, i) {
var id = "fest_p" + i, L = (typeof randomLook === "function") ? randomLook(id, "human") : {};
var f = i % 2 === 0;
L.sex = f ? "f" : "m";
L.top = FEST_COLS[i % 6];
L.bottom = [0xFFFFFF, 0x1A1A22, 0xFFD040][i % 3];
L.layer = rl === "drum" ? "uniform" : "tunic";
L.layerColor = rl === "drum" ? 0xC8283A : FEST_COLS[(i + 2) % 6];
L.hat = rl === "drum" ? "cap" : rl === "stilt" ? "tophat" : (i % 3 === 0 ? "crown" : null);
L.hatColor = rl === "drum" ? 0xC8283A : 0xFFD040;
L.back = rl === "dance" ? "cape" : null;
L.backColor = FEST_COLS[(i + 3) % 6];
var fg = buildFigure({ id: "__" + id, archetype: "human", attrs: rl === "stilt" ? { s: 1.5 } : {}, look: L, solid: false, detail: 3, nights: [], city: true }, 1);
if (rl === "stilt")
fg.scale.setScalar(1.45);
if (rl === "drum") {
var dr = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.28, 0.32, 12), fM(0xF4ECD8));
dr.position.set(0, 1.0, 0.32);
dr.rotation.x = Math.PI / 2;
fg.add(dr);
}
if (rl === "juggle") {
for (var b = 0; b < 3; b++) {
var ball = new THREE.Mesh(new THREE.SphereGeometry(0.08, 8, 6), fM(FEST_COLS[b]));
ball.userData.jb = b;
fg.add(ball);
}
}
fg.traverse(function (m) { m.raycast = function () { }; });
g.add(fg);
walkers.push({ g: fg, drum: rl === "drum", wave: rl === "dance" && i % 2, role: rl });
});
var dragon = [];
for (var k = 0; k < 16; k++) {
var seg = new THREE.Group();
var s = k === 0 ? 1.3 : 1 - k * 0.03;
var body = new THREE.Mesh(new THREE.SphereGeometry(0.9 * s, 12, 10), fM(k % 2 ? 0xC8283A : 0xE8B030));
body.scale.set(1, 0.9, 1.4);
seg.add(body);
if (k === 0) {
var jaw = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.4, 1.4), fM(0xC8283A));
jaw.position.set(0, -0.5, 0.9);
seg.add(jaw);
[-0.5, 0.5].forEach(function (x) { var e = new THREE.Mesh(new THREE.SphereGeometry(0.22, 8, 6), fM(0xFFFFFF)); e.position.set(x, 0.4, 0.9); seg.add(e); var hn = new THREE.Mesh(new THREE.ConeGeometry(0.15, 0.9, 6), fM(0xFFD040)); hn.position.set(x, 1.1, 0.1); hn.rotation.x = -0.5; seg.add(hn); });
var wh = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.12, 0.12), fM(0xFFD040));
wh.position.set(0, -0.2, 1.7);
seg.add(wh);
}
var fin = new THREE.Mesh(new THREE.ConeGeometry(0.25 * s, 0.7, 4), fM(0xFFD040));
fin.position.y = 0.95 * s;
seg.add(fin);
var pole = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 2.2, 4), fM(0x5A3A22));
pole.position.y = -1.6;
seg.add(pole);
seg.traverse(function (m) { m.raycast = function () { }; });
g.add(seg);
dragon.push(seg);
}
FEST.parade = { g: g, walkers: walkers, dragon: dragon, R: R, a0: (when === "noon" ? 0.3 : 2.4), near: false, when: when };
},
function () {
if (FEST.paradeR)
return FEST.paradeR;
var stand = festStand(), best = 60, bestBad = 1e9;
[46, 52, 58, 64, 72, 88, 104, 118].forEach(function (R) {
var bad = 0;
for (var k = 0; k < 90; k++) {
var a = k / 90 * Math.PI * 2, x = ATLC.x + Math.cos(a) * R, z = ATLC.z + Math.sin(a) * R;
stand.forEach(function (q) { if (Math.hypot(q.x - x, q.z - z) < q.r + 1)
bad++; });
(FEST.layout || []).forEach(function (q) { if (Math.hypot(q.x - x, q.z - z) < q.rad + 1)
bad++; });
}
if (bad < bestBad) {
bestBad = bad;
best = R;
}
});
return (FEST.paradeR = best);
},
function () {
if (FEST.masks)
return FEST.masks;
var out = [], plan = [[100, 0.4], [245, 1.3], [300, 4.1], [430, 2.2], [565, 5.3], [650, 0.9], [740, 3.3], [880, 4.8], [1080, 1.7], [1280, 5.9], [1420, 2.8], [1620, 0.2], [1790, 3.9]];
plan.forEach(function (p, i) {
var R = p[0], a = p[1], tries = 0, x, z;
while (tries < 60) {
var rr = R + (R >= 245 && FEST_RINGS.indexOf(R) >= 0 ? ATL_ROAD + 3 : 0);
x = ATLC.x + Math.cos(a) * rr;
z = ATLC.z + Math.sin(a) * rr;
if (atlClearAt(rr, a, 1, 2) && !(typeof blockedAt === "function" && blockedAt(x, z, 0)))
break;
a += 0.013;
tries++;
}
out.push({ n: i + 1, x: x, z: z, ring: (typeof decorQuarterAt === "function" ? decorQuarterAt(R) : "") });
});
FEST.masks = out;
return out;
},
function () {
var g = new THREE.Group(), gold = new THREE.MeshBasicMaterial({ color: 0xFFD040 });
var face = new THREE.Mesh(new THREE.SphereGeometry(0.45, 16, 10, 0, Math.PI * 2, 0, Math.PI / 2), gold);
face.rotation.x = Math.PI / 2;
face.scale.set(1.2, 0.5, 0.7);
g.add(face);
[-0.2, 0.2].forEach(function (x) { var e = new THREE.Mesh(new THREE.SphereGeometry(0.09, 8, 6), new THREE.MeshBasicMaterial({ color: 0x1A0A2A })); e.position.set(x, 0.05, 0.2); e.scale.set(1.4, 0.8, 0.5); g.add(e); });
for (var k = 0; k < 5; k++) {
var fe = new THREE.Mesh(new THREE.ConeGeometry(0.06, 0.6, 4), new THREE.MeshBasicMaterial({ color: FEST_COLS[k] }));
fe.position.set(-0.3 + k * 0.15, 0.45, -0.05);
fe.rotation.z = (k - 2) * 0.3;
g.add(fe);
}
var halo = new THREE.Mesh(new THREE.TorusGeometry(0.75, 0.03, 6, 24), new THREE.MeshBasicMaterial({ color: 0xFFE890, transparent: true, opacity: 0.6 }));
g.add(halo);
g.userData.halo = halo;
g.traverse(function (m) { m.raycast = function () { }; });
return g;
},
function (m) {
FEST.maskBusy = true;
function done(o) {
FEST.maskBusy = false;
if (o && o.ok) {
setStatus("<b>" + esc(o.say) + "</b>");
if (typeof pwBurst === "function") {
var P = camera.position;
pwBurst(m.x, P.y - 0.5, m.z, 0xFFD040, 80, [1, 1.6, 1], 1.6, "swirl", 0.2);
}
festPaint();
}
else if (o && o.say) {
setStatus(esc(o.say));
}
}
if (festSigned()) {
cityRpc("fest_mask", { p_n: m.n }).then(function (o) { if (o && o.ok && FEST.st) {
FEST.st.masks = (FEST.st.masks || []).concat([m.n]);
FEST.st.tickets = o.tickets;
}
else if (o && /already/.test(o.say || "") && FEST.st) {
FEST.st.masks = (FEST.st.masks || []).concat([m.n]);
} done(o); })
.catch(function (e) { FEST.maskBusy = false; });
}
else {
var L = festLocal();
if (L.masks.indexOf(m.n) < 0) {
L.masks.push(m.n);
L.tickets += 25;
festLocalSave();
}
done({ ok: true, say: "A golden mask: " + L.masks.length + " of 13 found (kept on this device: sign in to keep it)." + (L.masks.length === 13 ? " All thirteen! Sign in to claim the Golden Mask of the Bacchanal." : "") });
}
},
function (kind) {
var p = (FEST.layout || []).filter(function (q) { return q.kind === kind; })[0];
if (!p || !FEST.pieces)
return;
FEST.ride = { kind: kind, p: p, t: 0, len: kind === "wheel" ? 80 : 45, back: { x: camera.position.x, y: camera.position.y, z: camera.position.z }, seat: kind === "wheel" ? 0 : Math.floor(Math.random() * 12) };
if (typeof flyY !== "undefined")
flyY = 0;
setStatus("<b>" + (kind === "wheel" ? "Up you go on the great wheel." : "Round and round on the carousel.") + "</b> Look about with the mouse; it lets you off at the end. <a href='#' data-festoff='1' style='color:#FFD040'>Get off now</a>.");
festGameClose();
},
function (dt) {
var R = FEST.ride;
if (!R)
return;
R.t += dt;
var p = R.p, P = camera.position, w = new THREE.Vector3();
if (R.kind === "wheel") {
var car = FEST.pieces.wheel.cars[R.seat];
car.visible = false;
car.getWorldPosition(w);
P.set(w.x, w.y - 1.15, w.z);
}
else {
var hg = FEST.pieces.carousel.horses[R.seat];
hg.userData.h.getWorldPosition(w);
P.set(w.x, w.y + 1.25, w.z);
}
if (R.t >= R.len)
festRideOff();
},
function () {
var R = FEST.ride;
if (!R)
return;
FEST.ride = null;
if (R.kind === "wheel" && FEST.pieces && FEST.pieces.wheel)
FEST.pieces.wheel.cars[R.seat].visible = true;
var p = R.p, c = Math.cos(p.rot), s = Math.sin(p.rot), off = p.kind === "wheel" ? 9 : 10.5;
camera.position.set(p.x + off * s, p.y + 1.72, p.z + off * c);
setStatus("<b>Off you get.</b> " + (R.kind === "wheel" ? "The whole of Somnucor, from thirty metres up." : "Dizzy?"));
},
function () {
var el = document.getElementById("fest-game");
if (!el) {
el = document.createElement("div");
el.id = "fest-game";
el.style.cssText = "position:fixed;inset:0;z-index:9000;display:none;align-items:flex-start;justify-content:center;background:rgba(10,4,16,.66);padding:14px;overflow-y:auto;-webkit-overflow-scrolling:touch";
el.addEventListener("click", function (e) { if (e.target === el)
festGameClose(); });
document.body.appendChild(el);
}
return el;
},
function (title, col, inner) {
return '<div style="margin:auto 0;width:min(440px,100%);background:#160C1E;border:2px solid ' + col + ';border-radius:8px;padding:14px 16px;color:#FFF4E0;font:14px var(--sans,sans-serif);box-shadow:0 0 50px ' + col + '55">' +
'<div style="display:flex;justify-content:space-between;align-items:center"><b style="font:700 19px Georgia,serif;color:#FFD040">' + title + '</b><button class="btn" data-fgx="1">Close</button></div>' + inner + '</div>';
},
function (o) { var el = document.getElementById("fg-res"); if (el)
el.innerHTML = o && o.ok ? '<b style="color:#9AFFA0">You won ' + o.won + ' ticket' + (o.won === 1 ? '' : 's') + '!</b> <span style="color:#C8B8D8">' + (festSigned() ? "You have " + o.tickets + "." : esc(o.say)) + '</span>' : '<span style="color:#FFB89A">' + esc((o && o.say) || "The booth did not answer.") + '</span>'; festPaint(); },
function (kind) {
festGameClose();
if (document.exitPointerLock)
try {
document.exitPointerLock();
}
catch (e) { }
var el = festGameEl(), B = FEST_BOOTHS[kind];
el.style.display = "flex";
var G = FEST.game = { kind: kind, stop: null };
if (kind === "rings") {
el.innerHTML = festBox("Ring of Stars", B[2], '<p style="margin:6px 0">Five rings. Click (or tap) to throw as the ring swings over a bottle. A ringer is three tickets.</p><canvas id="fg-c" width="400" height="220" style="width:100%;background:#24123A;border-radius:4px;cursor:pointer"></canvas><div id="fg-res" style="min-height:22px;margin-top:6px"></div>');
var cv = document.getElementById("fg-c"), g = cv.getContext("2d"), throws = 0, hits = 0, x = 0, run = true, last = 0, flying = null, pegs = [60, 130, 200, 270, 340];
function draw(t) {
if (!run)
return;
var dt = last ? (t - last) / 1000 : 0;
last = t;
x = 200 + Math.sin(t / 380) * 175;
g.fillStyle = "#24123A";
g.fillRect(0, 0, 400, 220);
g.fillStyle = "#5A2A4A";
g.fillRect(0, 170, 400, 50);
pegs.forEach(function (px, i) { g.fillStyle = ["#FF3A5A", "#FFC83A", "#3AE8FF", "#8AFF5A", "#C86AFF"][i]; g.fillRect(px - 7, 128, 14, 42); g.beginPath(); g.arc(px, 128, 7, 0, 7); g.fill(); });
if (flying) {
flying.t += dt;
var k = Math.min(1, flying.t / 0.5);
g.strokeStyle = "#FFD040";
g.lineWidth = 4;
g.beginPath();
g.ellipse(flying.x, 30 + k * 104, 18 * (1 - k * 0.3), 6, 0, 0, 7);
g.stroke();
if (k >= 1) {
var hit = pegs.some(function (px) { return Math.abs(px - flying.x) < 9; });
if (hit)
hits++;
flying = null;
if (throws >= 5)
finish();
}
}
else if (throws < 5) {
g.strokeStyle = "#FFD040";
g.lineWidth = 4;
g.beginPath();
g.ellipse(x, 30, 18, 6, 0, 0, 7);
g.stroke();
}
g.fillStyle = "#FFF4E0";
g.font = "15px Georgia";
g.fillText("Ringers: " + hits + "   Rings left: " + (5 - throws), 12, 205);
requestAnimationFrame(draw);
}
cv.onclick = function () { if (flying || throws >= 5)
return; throws++; flying = { x: x, t: 0 }; };
function finish() { setTimeout(function () { festPlay("rings", hits).then(festResult); var r = document.getElementById("fg-res"); if (r)
r.innerHTML = "Counting…"; }, 300); }
requestAnimationFrame(draw);
G.stop = function () { run = false; };
}
else if (kind === "lanterns") {
el.innerHTML = festBox("The Lantern Gallery", B[2], '<p style="margin:6px 0">Twenty seconds. Pop as many lanterns as you can. A ticket a lantern.</p><canvas id="fg-c" width="400" height="260" style="width:100%;background:#0E0A24;border-radius:4px;cursor:crosshair"></canvas><div id="fg-res" style="min-height:22px;margin-top:6px"></div>');
var cv2 = document.getElementById("fg-c"), g2 = cv2.getContext("2d"), L = [], pop = 0, t0 = 0, run2 = true, spawn = 0, lastT = 0, ended = false;
function frame(t) {
if (!run2)
return;
if (!t0)
t0 = t;
var dt = lastT ? (t - lastT) / 1000 : 0;
lastT = t;
var left = Math.max(0, 20 - (t - t0) / 1000);
spawn -= dt;
if (spawn <= 0 && left > 0) {
L.push({ x: 30 + Math.random() * 340, y: 280, v: 40 + Math.random() * 50, c: ["#FF3A5A", "#FFC83A", "#3AE8FF", "#8AFF5A", "#C86AFF"][Math.floor(Math.random() * 5)], w: Math.random() * 6 });
spawn = 0.45;
}
g2.fillStyle = "#0E0A24";
g2.fillRect(0, 0, 400, 260);
for (var s = 0; s < 40; s++) {
g2.fillStyle = "rgba(255,255,255,.5)";
g2.fillRect((s * 97) % 400, (s * 53) % 200, 1.5, 1.5);
}
L.forEach(function (l) { l.y -= l.v * dt; l.x += Math.sin(t / 500 + l.w) * 0.4; g2.fillStyle = l.c; g2.beginPath(); g2.ellipse(l.x, l.y, 13, 16, 0, 0, 7); g2.fill(); g2.fillStyle = "#FFF4C0"; g2.fillRect(l.x - 3, l.y + 14, 6, 5); });
L = L.filter(function (l) { return l.y > -30 && !l.dead; });
g2.fillStyle = "#FFF4E0";
g2.font = "15px Georgia";
g2.fillText("Popped: " + pop + "   Time: " + left.toFixed(1), 12, 250);
if (left <= 0 && !ended) {
ended = true;
festPlay("lanterns", pop).then(festResult);
var r = document.getElementById("fg-res");
if (r)
r.innerHTML = "Counting…";
}
requestAnimationFrame(frame);
}
cv2.onclick = function (e) {
var b = cv2.getBoundingClientRect(), mx = (e.clientX - b.left) * 400 / b.width, my = (e.clientY - b.top) * 260 / b.height;
L.forEach(function (l) { if (!l.dead && !ended && Math.hypot(l.x - mx, l.y - my) < 20) {
l.dead = true;
pop++;
} });
};
requestAnimationFrame(frame);
G.stop = function () { run2 = false; };
}
else if (kind === "hammer") {
el.innerHTML = festBox("The Dragon's Hammer", B[2], '<p style="margin:6px 0">Three swings. Strike when the power is at the top, and ring the bell!</p><canvas id="fg-c" width="400" height="260" style="width:100%;background:#16241A;border-radius:4px;cursor:pointer"></canvas><div id="fg-res" style="min-height:22px;margin-top:6px"></div>');
var cv3 = document.getElementById("fg-c"), g3 = cv3.getContext("2d"), sw = 0, best = 0, pow = 0, puck = null, run3 = true;
function fr3(t) {
if (!run3)
return;
pow = Math.abs(Math.sin(t / (260 - sw * 30))) * 100;
g3.fillStyle = "#16241A";
g3.fillRect(0, 0, 400, 260);
g3.fillStyle = "#E8E0D0";
g3.fillRect(250, 20, 26, 220);
g3.fillStyle = "#FFD040";
g3.beginPath();
g3.arc(263, 18, 16, Math.PI, 0);
g3.fill();
for (var m = 0; m < 10; m++) {
g3.fillStyle = m < 4 ? "#3AE85A" : m < 7 ? "#FFD040" : "#FF3A3A";
g3.fillRect(278, 230 - m * 21, 10, 18);
}
if (puck) {
puck.t += 0.016;
var top = puck.v / 100, k = Math.sin(Math.min(1, puck.t / 0.9) * Math.PI);
var py = 232 - k * top * 212;
g3.fillStyle = "#C83A3A";
g3.fillRect(252, py - 8, 22, 12);
if (puck.t >= 0.9) {
if (puck.v >= 100) {
g3.fillStyle = "#FFF";
}
puck = null;
if (sw >= 3)
end3();
}
}
g3.fillStyle = "#2A2A2A";
g3.fillRect(40, 30, 30, 200);
g3.fillStyle = pow > 95 ? "#FF3A3A" : pow > 70 ? "#FFD040" : "#3AE85A";
g3.fillRect(40, 230 - pow * 2, 30, pow * 2);
g3.fillStyle = "#FFF4E0";
g3.font = "15px Georgia";
g3.fillText("Swings left: " + (3 - sw) + "   Best: " + Math.round(best), 90, 250);
requestAnimationFrame(fr3);
}
cv3.onclick = function () { if (puck || sw >= 3)
return; sw++; var v = pow > 97 ? 100 : pow; best = Math.max(best, v); puck = { v: v, t: 0 }; };
function end3() { festPlay("hammer", Math.round(best)).then(festResult); var r = document.getElementById("fg-res"); if (r)
r.innerHTML = best >= 100 ? "DING! Counting…" : "Counting…"; }
requestAnimationFrame(fr3);
G.stop = function () { run3 = false; };
}
else if (kind === "wheelw") {
el.innerHTML = festBox("Wheel of Wonders", B[2], '<p style="margin:6px 0">Spin the wheel. Five tickets at the least, a hundred at the most.</p><canvas id="fg-c" width="300" height="300" style="display:block;margin:0 auto;width:min(300px,100%);cursor:pointer"></canvas><div style="text-align:center;margin-top:6px"><button class="btn" id="fg-spin">Spin!</button></div><div id="fg-res" style="min-height:22px;margin-top:6px"></div>');
var cv4 = document.getElementById("fg-c"), g4 = cv4.getContext("2d"), segs = [5, 10, 20, 5, 40, 10, 5, 20, 10, 100, 5, 10], ang = 0, vel = 0, target = null, run4 = true, spun = false;
function dw() {
if (!run4)
return;
g4.clearRect(0, 0, 300, 300);
g4.save();
g4.translate(150, 150);
g4.rotate(ang);
segs.forEach(function (v, i) {
g4.fillStyle = ["#FF3A5A", "#FFC83A", "#3AE8FF", "#8AFF5A", "#C86AFF", "#FF8A2A"][i % 6];
g4.beginPath();
g4.moveTo(0, 0);
g4.arc(0, 0, 140, i / 12 * Math.PI * 2, (i + 1) / 12 * Math.PI * 2);
g4.fill();
g4.save();
g4.rotate((i + 0.5) / 12 * Math.PI * 2);
g4.fillStyle = "#1A0A1A";
g4.font = "bold 18px Georgia";
g4.fillText(String(v), 92, 6);
g4.restore();
});
g4.restore();
g4.fillStyle = "#FFF4E0";
g4.beginPath();
g4.moveTo(150, 4);
g4.lineTo(140, 26);
g4.lineTo(160, 26);
g4.fill();
var now = performance.now(), dt = Math.min(1, (now - (G.last || now)) / 1000);
G.last = now;
if (vel > 0) {
ang += vel * dt;
vel *= Math.pow(0.4, dt);
if (target !== null && vel < 0.6) {
var want = -((target + 0.5) / 12 * Math.PI * 2) - Math.PI / 2;
var d = ((want - ang) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2), stp = Math.max(0.05, dt * 4);
if (d <= stp) {
ang = want;
vel = 0;
target = null;
festResult(G.res);
}
else
ang += stp;
}
}
setTimeout(dw, 16);
}
document.getElementById("fg-spin").onclick = function () { if (spun)
return; spun = true; vel = 18; festPlay("wheel", 0).then(function (o) { G.res = o; var v = o && o.ok ? o.rolled : 5; var idx = []; segs.forEach(function (s, i) { if (s === v)
idx.push(i); }); target = idx.length ? idx[Math.floor(Math.random() * idx.length)] : 0; if (!(o && o.ok)) {
vel = 0;
target = null;
festResult(o);
} }); };
setTimeout(dw, 16);
G.stop = function () { run4 = false; };
}
else if (kind === "ducks") {
el.innerHTML = festBox("The Duck Pond", B[2], '<p style="margin:6px 0">Pick a duck. Every duck wins: look underneath to see how much.</p><div id="fg-ducks" style="display:flex;flex-wrap:wrap;gap:8px;justify-content:center;padding:10px;background:#1A4A7A;border-radius:40px"></div><div id="fg-res" style="min-height:22px;margin-top:6px"></div>');
var box = document.getElementById("fg-ducks"), picked = false;
for (var d = 0; d < 12; d++) {
var bt = document.createElement("button");
bt.textContent = "🦆";
bt.style.cssText = "font-size:28px;background:none;border:0;cursor:pointer;transition:transform .3s";
bt.onclick = function () { if (picked)
return; picked = true; this.style.transform = "rotate(180deg) scale(1.3)"; festPlay("ducks", 0).then(festResult); };
box.appendChild(bt);
}
}
else if (kind === "fortune") {
var fo = FEST_FORTUNES[Math.floor(Math.random() * FEST_FORTUNES.length)];
el.innerHTML = festBox("Madame Zelda", B[2], '<p style="margin:8px 0;color:#D8C8F0">Madame Zelda turns a card, and looks into the crystal ball…</p><div style="margin:10px auto;width:220px;padding:22px 14px;background:linear-gradient(#3A1A5A,#1A0A2A);border:2px solid #C8A0E8;border-radius:8px;text-align:center;font:italic 16px Georgia,serif;color:#FFF4E0">' + esc(fo) + '</div><div id="fg-res" style="min-height:22px;margin-top:6px">Counting…</div>');
festPlay("fortune", 0).then(function (o) { if (o && !o.ok && /moment/.test(o.say || ""))
o.say = "Madame Zelda reads one fortune for you every ten minutes. This one is free."; festResult(o); });
}
else if (kind === "prizes") {
festPrizes(el, B);
}
else if (kind === "tickets") {
FEST.open = true;
FEST.tab = "today";
festPaint();
festGameClose();
}
},
function (el, B) {
var list = (FEST.st && FEST.st.prizes) || [{ id: 1, name: "A cloud of candy floss", tickets: 15 }, { id: 3, name: "Extravaganza ribbon", tickets: 40 }, { id: 5, name: "Carnival mask", tickets: 120 }, { id: 8, name: "Plush dragon", tickets: 320 }, { id: 10, name: "Grand Opening medal", tickets: 700 }, { id: 12, name: "Carousel unicorn", tickets: 3500 }];
var tk = festTickets();
el.innerHTML = festBox("The Prize Booth", B[2], '<p style="margin:6px 0">You have <b style="color:#FFD040">' + tk + ' tickets</b>.' + (festSigned() ? '' : ' <span style="color:#FFB89A">Sign in to trade tickets for prizes.</span>') + '</p>' +
list.map(function (p) { return '<div style="display:flex;justify-content:space-between;align-items:center;gap:8px;padding:6px 0;border-top:1px solid #3A2A4A"><span><b>' + esc(p.name) + '</b><br><span style="color:#C8B8D8;font-size:12px">' + esc(p.note || "") + '</span></span><button class="btn" data-fprize="' + p.id + '"' + (tk < p.tickets || !festSigned() ? ' disabled' : '') + '>' + p.tickets + ' tickets</button></div>'; }).join("") +
'<div id="fg-res" style="min-height:22px;margin-top:6px"></div><div style="text-align:right;margin-top:6px"><button class="btn" data-fgx="1">Back out</button></div>');
},
function () {
var el = document.getElementById("fest-panel");
if (!el) {
if (!FEST.open || !document.body)
return;
el = document.createElement("div");
el.id = "fest-panel";
el.style.cssText = "position:fixed;right:12px;bottom:calc(184px + env(safe-area-inset-bottom,0px));z-index:47;width:min(420px,calc(100vw - 24px));max-height:min(70vh,620px);overflow:auto;background:linear-gradient(#1A0A26,#0E0614);border:1px solid #FFD040;border-radius:6px;padding:12px 14px;font:13px var(--sans);color:#FFF4E0;line-height:1.45;box-shadow:0 0 40px rgba(200,60,160,.3)";
document.body.appendChild(el);
}
if (!FEST.open) {
el.style.display = "none";
return;
}
el.style.display = "block";
var on = festOn(), day = festDay(), keeper = typeof amKeeper === "function" && amKeeper();
var h = '<div style="display:flex;justify-content:space-between;align-items:flex-start;gap:8px"><div><div style="font:700 18px Georgia,serif;color:#FFD040;letter-spacing:.02em">The Grand Opening Somnucor Extravaganza</div>' +
'<div style="font:italic 13px Georgia,serif;color:#FFB8D8">the Carnival Bacchanal · open to everyone</div></div><button class="btn" data-fest="close">Close</button></div>';
if (on) {
h += '<div style="margin:8px 0;padding:8px 10px;background:rgba(255,208,64,.08);border-radius:4px">Day <b>' + day + '</b> of ' + FEST.days + ': <b style="color:#FFD040">' + esc(FEST_THEMES[(day - 1) % FEST_THEMES.length]) + '</b><br><span style="color:#C8B8D8">' + festDur(festLeft()) + ' of the Extravaganza left.</span></div>';
}
else {
h += '<div style="margin:8px 0;color:#C8B8D8">The Extravaganza is not on' + (FEST.start && festNow() < FEST.start.getTime() ? ': it opens in ' + festDur(FEST.start.getTime() - festNow()) + '.' : '.') + '</div>';
}
var tabs = [["today", "Today"], ["sched", "Schedule"], ["games", "Games"], ["hunt", "Hunt"], ["masks", "Masks"], ["board", "Top players"]].concat(keeper ? [["prizes", "Prize board"]] : []);
h += '<div style="display:flex;flex-wrap:wrap;gap:6px;margin:6px 0 8px">' + tabs.map(function (t) { return '<button class="btn" data-fest="tab:' + t[0] + '"' + (FEST.tab === t[0] ? ' style="border-color:#FFD040;color:#FFD040"' : '') + '>' + t[1] + '</button>'; }).join("") + '</div>';
if (FEST.tab === "today") {
var nx = festNext();
h += '<div><b>Every day</b> <span style="color:#C8B8D8">(city time)</span></div>' + (function () { var ni = festNowItem(); return FEST_PROGRAM.map(function (p) { var now = p === ni; return '<div style="padding:2px 0' + (now ? ';color:#FFD040' : '') + '"><b style="display:inline-block;width:46px">' + festHM(p[0]) + '</b>' + esc(p[1]) + '</div>'; }).join(""); })();
if (festFinale())
h += '<div style="margin-top:6px;color:#FFD040"><b>Tonight is the Grand Finale:</b> half an hour of fireworks at nine.</div>';
if (nx)
h += '<div style="margin-top:6px;color:#C8B8D8">Next: ' + esc(nx.p[1]) + ' in ' + festDur(nx.d * 3600000) + '.</div>';
if ((FEST.parade && FEST.parade.near) || (typeof festRingNear === "function" && festRingNear()))
h += '<div style="margin-top:8px"><button class="btn" data-fest="cheer" style="border-color:#FFD040">Cheer the parade!</button></div>';
if (typeof festMusicLine === "function")
h += festMusicLine();
h += '<div style="margin-top:8px"><button class="btn" data-fest="go">Take me to the Midway</button></div>';
}
else if (FEST.tab === "games") {
h += '<div>You have <b style="color:#FFD040">' + festTickets() + ' tickets</b>' + (festSigned() ? '' : ' <span style="color:#FFB89A">(on this device; sign in to keep them for prizes)</span>') + '.</div>' +
'<div style="color:#C8B8D8;margin:4px 0 6px">Walk up to a booth on the Midway to play. Or from here:</div><div style="display:flex;flex-wrap:wrap;gap:6px">' +
[["rings", "Ring of Stars"], ["lanterns", "Lantern Gallery"], ["hammer", "Dragon's Hammer"], ["wheelw", "Wheel of Wonders"], ["ducks", "Duck Pond"], ["fortune", "Madame Zelda"], ["prizes", "Prize Booth"]].map(function (g) { return '<button class="btn" data-fplay="' + g[0] + '">' + g[1] + '</button>'; }).join("") + '</div>' +
'<div style="margin-top:6px;color:#C8B8D8;font-size:12px">The great wheel and the carousel are ridden at the Midway itself. Up to ' + ((FEST.st && FEST.st.cap) || 600) + ' tickets can be won a day.</div>';
}
else if (FEST.tab === "masks") {
var have = festMasks(), spots = festMaskSpots && ATLC ? festMaskSpots() : [];
h += '<div>Thirteen golden masks are hidden about the city. You have found <b style="color:#FFD040">' + have.length + ' of 13</b>. Find all thirteen for the <b>Golden Mask of the Bacchanal</b>.</div><div style="margin-top:6px">' +
spots.map(function (m) { var got = have.indexOf(m.n) >= 0; return '<span style="display:inline-block;margin:2px 4px 2px 0;padding:2px 7px;border-radius:10px;border:1px solid ' + (got ? "#FFD040" : "#5A4A6A") + ';color:' + (got ? "#FFD040" : "#C8B8D8") + '">' + m.n + (got ? " ✓" : " · " + esc(FEST_QNAME[m.ring] || m.ring)) + '</span>'; }).join("") + '</div>' +
'<div style="color:#C8B8D8;margin-top:6px;font-size:12px">They glow gold and float by the kerb. Walk right up to one to take it.</div>';
}
else if (FEST.tab === "board") {
var bd = (FEST.st && FEST.st.board) || [];
h += bd.length ? bd.map(function (r, i) { return '<div style="padding:2px 0"><b style="display:inline-block;width:22px;color:#FFD040">' + (i + 1) + '</b>' + esc(r.name) + ' <span style="color:#C8B8D8">· ' + r.earned + ' tickets won</span></div>'; }).join("") : '<div style="color:#C8B8D8">Nobody has won a ticket yet. Be the first!</div>';
}
else if (typeof festMoreTab === "function")
h += festMoreTab(FEST.tab);
if (keeper) {
h += '<div style="margin-top:10px;padding-top:8px;border-top:1px solid #3A2A4A"><b style="color:var(--gold,#C9A868)">Keeper</b> ' +
'<button class="btn" data-fest="restart">Start the two weeks from today</button> <button class="btn" data-fest="off">Switch it off</button> <button class="btn" data-fest="preview">' + (FEST.preview ? "Stop the preview" : "Preview it now") + '</button>' +
(FEST.msg ? '<div style="color:#C8B8D8;margin-top:4px">' + esc(FEST.msg) + '</div>' : '') + '</div>';
}
el.innerHTML = h;
},
function () {
if (!FEST.layout || !careInCityLoose()) {
festNearPanel(null);
return;
}
var P = camera.position, best = null, bd = 1e9;
FEST.layout.forEach(function (p) {
if (!(FEST_BOOTHS[p.kind] || p.kind === "wheel" || p.kind === "carousel"))
return;
var c = Math.cos(p.rot), s = Math.sin(p.rot), off = p.kind === "wheel" ? 7 : p.kind === "carousel" ? 8.5 : p.kind === "fortune" ? 3.2 : 2.6;
var fx = p.x + off * s, fz = p.z + off * c, d = Math.hypot(fx - P.x, fz - P.z);
if (d < (p.kind === "wheel" || p.kind === "carousel" ? 5 : 3.6) && d < bd) {
bd = d;
best = p;
}
});
festNearPanel(best);
}
];
});
