/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var HUB = { g: null, ppl: null, on: false, t: 0, warned: 0, ph: null,
X0: -14, X1: 14, Z0: 94, Z1: 124,
DX: 10, DZ1: 156,
pads: [[-5, 106], [5, 106], [-5, 116], [5, 116]], padNext: 0,
sols: [], anim: [], mats: [], tex: [], board: null, boardAt: 0, log: [], seen: {}, people: [], doors: [], talkAt: { x: -10.6, z: 100 } };
function hubOk() { return typeof ATLC !== "undefined" && !!ATLC; }
function hubH() { return hubOk() && typeof terrainY === "function" ? terrainY(ATLC.x, ATLC.z + 109) : 200; }
function hubLocal(x, z) { return { x: x - ATLC.x, z: z - ATLC.z }; }
function hubInHall(lx, lz) { return lx > HUB.X0 && lx < HUB.X1 && lz > HUB.Z0 && lz < HUB.Z1; }
function hubOnDeck(lx, lz) { return Math.abs(lx) < HUB.DX && lz >= HUB.Z1 - 0.4 && lz < HUB.DZ1; }
function hubM(col, o) {
o = o || {};
var m;
if (o.basic) {
m = new THREE.MeshBasicMaterial({ color: col });
}
else if (o.shiny) {
m = new THREE.MeshPhongMaterial({ color: col, specular: new THREE.Color(o.spec || 0x888888), shininess: o.shiny });
}
else
m = new THREE.MeshLambertMaterial({ color: col });
if (o.e !== undefined && m.emissive)
m.emissive = new THREE.Color(o.e);
if (o.op !== undefined) {
m.transparent = true;
m.opacity = o.op;
m.depthWrite = !!o.dw;
}
if (o.add)
m.blending = THREE.AdditiveBlending;
if (o.ds)
m.side = THREE.DoubleSide;
if (o.map)
m.map = o.map;
HUB.mats.push(m);
return m;
}
function hubMesh(geo, m, x, y, z, G) { var me = new THREE.Mesh(geo, m); me.position.set(x, y, z); (G || HUB.g).add(me); return me; }
function hubBox(w, h, d, m, x, y, z, G) { return hubMesh(new THREE.BoxGeometry(w, h, d), m, x, y, z, G); }
function hubCyl(rt, rb, h, m, x, y, z, G, seg) { return hubMesh(new THREE.CylinderGeometry(rt, rb, h, seg || 16), m, x, y, z, G); }
function hubSolid(x, z, hw, hd, h, b) { var S = { x: x, z: z, hw: hw, hd: hd, h: h === undefined ? 6 : h }; if (b !== undefined)
S.b = b; HUB.sols.push(S); return S; }
function hubCanvas(w, h, paint) {
var c = document.createElement("canvas");
c.width = w;
c.height = h;
paint(c.getContext("2d"), w, h);
var t = new THREE.CanvasTexture(c);
t.anisotropy = 4;
HUB.tex.push(t);
t.userData = { c: c };
return t;
}
function hubSignTex(lines, w, h, o) {
o = o || {};
return hubCanvas(w, h, function (x, W, H) {
var g = x.createLinearGradient(0, 0, 0, H);
g.addColorStop(0, o.bg0 || "#0A1424");
g.addColorStop(1, o.bg1 || "#05080F");
x.fillStyle = g;
x.fillRect(0, 0, W, H);
x.fillStyle = o.rule || "#3FE0FF";
x.fillRect(0, H - Math.max(4, H * 0.05), W, Math.max(4, H * 0.05));
x.fillRect(0, 0, W, Math.max(2, H * 0.02));
x.textAlign = "center";
x.textBaseline = "middle";
var n = lines.length;
lines.forEach(function (l, i) {
var big = i === 0;
x.font = (big ? "600 " : "400 ") + Math.round(H / (n + 0.9) * (big ? 0.62 : 0.36)) + "px 'Segoe UI', Helvetica, Arial, sans-serif";
x.fillStyle = big ? (o.fg || "#FFFFFF") : (o.fg2 || "#9FE8FF");
if (big && x.letterSpacing !== undefined)
x.letterSpacing = Math.round(H * 0.04) + "px";
x.fillText(l, W / 2, H * (i + 0.75) / (n + 0.5));
if (x.letterSpacing !== undefined)
x.letterSpacing = "0px";
});
});
}
function hubPlane(w, h, m, x, y, z, ry, G) { var p = hubMesh(new THREE.PlaneGeometry(w, h), m, x, y, z, G); p.rotation.y = ry || 0; return p; }
function hubClearSpot() {
if (!hubOk())
return;
var gone = { herostatue: 1, flowerbed: 1, topiary: 1, bench: 1, bannerpole: 1, crystalbrazier: 1, ornatelamp: 1, tierfountain: 1 };
for (var i = store.objects.length - 1; i >= 0; i--) {
var o = store.objects[i];
if (o.realm !== ATLC.id || !gone[o.archetype])
continue;
var lx = o.x - ATLC.x, lz = o.z - ATLC.z;
if (!(lx > HUB.X0 - 2.5 && lx < HUB.X1 + 2.5 && lz > HUB.Z0 - 3 && lz < HUB.DZ1 + 2))
continue;
o._gone = true;
if (typeof BAKE !== "undefined" && typeof bakeChunkKey === "function" && typeof bakeUnbake === "function") {
try {
var bk = bakeChunkKey(o), ch = BAKE.chunks[bk];
if (ch && ch.meshes && ch.meshes.length) {
bakeUnbake(bk);
if (BAKE.queue.indexOf(bk) < 0)
BAKE.queue.unshift(bk);
}
}
catch (e) { }
}
if (meshes[o.id]) {
scene.remove(meshes[o.id]);
delete meshes[o.id];
}
store.objects.splice(i, 1);
}
if (typeof wallsAt !== "undefined")
wallsAt = 0;
}
function hubGateDress(G, lite, white, steel, dark, cyan, cyanSoft) {
var gx = 13.1, gz = 111, hw = 2.2, top = 7.25, oh = 6.2;
hubBox(0.5, top, 0.6, white, gx - 0.2, top / 2 + 0.2, gz - hw - 0.3);
hubBox(0.5, top, 0.6, white, gx - 0.2, top / 2 + 0.2, gz + hw + 0.3);
hubBox(0.6, top - oh - 0.2, hw * 2 + 1.2, white, gx - 0.2, (top + oh + 0.2) / 2 + 0.2, gz);
hubBox(0.3, top - 0.4, hw * 2 + 0.4, dark, gx + 0.55, (top - 0.4) / 2 + 0.2, gz);
var ft = hubCanvas(128, 512, function (x, W, H) {
var g = x.createLinearGradient(0, 0, 0, H);
g.addColorStop(0, "#0A3A6A");
g.addColorStop(0.5, "#3FE0FF");
g.addColorStop(1, "#0A3A6A");
x.fillStyle = g;
x.fillRect(0, 0, W, H);
x.globalAlpha = 0.35;
x.fillStyle = "#FFFFFF";
for (var i = 0; i < 40; i++) {
var px = (i * 37) % W, py = (i * 97) % H;
x.fillRect(px, py, 2, 30 + (i % 5) * 14);
}
});
ft.wrapS = ft.wrapT = THREE.RepeatWrapping;
var fm = hubM(0xFFFFFF, { basic: true, map: ft, op: 0.5, add: true, ds: true });
fm.depthWrite = false;
var film = hubPlane(hw * 2, oh, fm, gx - 0.1, oh / 2 + 0.22, gz, -Math.PI / 2);
film.userData.keep = true;
var fm2 = hubM(0x8AF4FF, { basic: true, op: 0.18, add: true, ds: true });
fm2.depthWrite = false;
var film2 = hubPlane(hw * 2 - 0.3, oh - 0.3, fm2, gx - 0.35, oh / 2 + 0.22, gz, -Math.PI / 2);
film2.userData.keep = true;
var edge = hubM(0x3FE0FF, { basic: true, op: 0.75, add: true });
hubBox(0.08, oh, 0.1, edge, gx - 0.48, oh / 2 + 0.22, gz - hw + 0.05);
hubBox(0.08, oh, 0.1, edge, gx - 0.48, oh / 2 + 0.22, gz + hw - 0.05);
hubBox(0.08, 0.1, hw * 2 - 0.1, edge, gx - 0.48, oh + 0.2, gz);
hubBox(1.4, 0.04, hw * 2, hubM(0x9FEFFF, { basic: true, op: 0.55, add: true }), gx - 0.9, 0.22, gz);
var nt = hubSignTex(["THE HALL OF DOORS", "a door for every world · press E at the gate"], 1024, 160);
hubPlane(4.6, 0.72, hubM(0xFFFFFF, { basic: true, map: nt }), gx - 0.52, (top + oh + 0.2) / 2 + 0.2, gz, -Math.PI / 2);
hubBox(9.0, 0.02, 0.12, cyan, 6.4, 0.21, gz - 1.2);
hubBox(9.0, 0.02, 0.12, cyan, 6.4, 0.21, gz + 1.2);
var chev = [];
for (var c = 0; c < (lite ? 3 : 5); c++) {
var cm = hubM(0x3FE0FF, { basic: true, op: 0.5, add: true }), cx = 3.0 + c * (lite ? 2.6 : 1.6);
var g = new THREE.Group();
g.position.set(cx, 0.22, gz);
G.add(g);
[-1, 1].forEach(function (sd) { var bar = new THREE.Mesh(new THREE.PlaneGeometry(1.1, 0.22), cm); bar.rotation.x = -Math.PI / 2; bar.rotation.z = Math.PI / 2 - sd * 0.6; bar.position.set(0.3, 0, sd * 0.42); g.add(bar); });
chev.push(cm);
}
HUB.anim.push(function (t) {
edge.opacity = 0.5 + 0.3 * (0.5 + 0.5 * Math.sin(t * 0.9));
fm.opacity = 0.42 + 0.12 * (0.5 + 0.5 * Math.sin(t * 0.6));
ft.offset.y = -(t * 0.05) % 1;
chev.forEach(function (m, i) { m.opacity = 0.3 + 0.3 * (0.5 + 0.5 * Math.sin(t * 1.2 - i * 0.7)); });
hubGateTick();
});
hubSolid(gx + 0.55, gz, 0.3, hw + 0.6, top);
}
function hubGateTick() {
if (typeof meshes === "undefined")
return;
if (!HUB.gateId) {
var gt = typeof atlHallGate === "function" ? atlHallGate() : null;
if (!gt)
return;
HUB.gateId = gt.id;
}
var m = meshes[HUB.gateId];
if (m && m.visible) {
m.visible = false;
HUB.gateHid = HUB.gateId;
}
}
function hubBuild() {
if (HUB.on || !hubOk())
return;
var lite = typeof LITE !== "undefined" && LITE;
hubClearSpot();
HUB.on = true;
HUB.sols = [];
HUB.anim = [];
HUB.mats = [];
HUB.tex = [];
HUB.people = [];
HUB.doors = [];
var H = hubH(), G = new THREE.Group();
G.name = "arrival-hub";
G.position.set(ATLC.x, H, ATLC.z);
HUB.g = G;
HUB.H = H;
var X0 = HUB.X0, X1 = HUB.X1, Z0 = HUB.Z0, Z1 = HUB.Z1, W = X1 - X0, D = Z1 - Z0, CZ = (Z0 + Z1) / 2, WALL = 7.4;
var white = hubM(0xF2F4F8, { shiny: 60, spec: 0x9AA4B0, e: 0x3A4250 }), steel = hubM(0xB8C0CC, { shiny: 80, spec: 0xFFFFFF }), dark = hubM(0x1C2230, { shiny: 90, spec: 0x5A6A80 }), floorM = hubM(0x222A38, { shiny: 120, spec: 0x8090A8 }), deckM = hubM(0x3A4252, { shiny: 40, spec: 0x506070 }), glass = hubM(0x9FD8FF, { op: 0.24, shiny: 120, spec: 0xFFFFFF, ds: true, e: 0x0E2A3A }), roofGlass = hubM(0xB8E6FF, { op: 0.22, shiny: 120, spec: 0xFFFFFF, ds: true, e: 0x10283A }), cyan = hubM(0x3FE0FF, { basic: true }), cyanSoft = hubM(0x3FE0FF, { basic: true, op: 0.55, add: true }), warm = hubM(0xFFE2A8, { basic: true }), green = hubM(0x3E7A34), green2 = hubM(0x5A9A44), soil = hubM(0x3A2A1E), wood = hubM(0x8A5A32), seat = hubM(0x2E5A8A, { shiny: 30 });
hubBox(W + 0.6, 0.2, D + 0.6, floorM, 0, 0.1, CZ);
[[-5, 94.3, 113], [5, 94.3, 113]].forEach(function (l) { hubBox(0.12, 0.02, l[2] - l[1], cyan, l[0], 0.21, (l[1] + l[2]) / 2); });
hubBox(10.12, 0.02, 0.12, cyan, 0, 0.21, 101);
hubBox(4.12, 0.02, 0.12, cyan, 0, 0.21, 121);
hubBox(0.12, 0.02, 8, cyan, 0, 0.21, 118);
for (var cz = Z0; cz <= Z1 + 0.01; cz += 3) {
[X0, X1].forEach(function (cx) { hubCyl(0.2, 0.24, WALL, white, cx, WALL / 2 + 0.2, cz, null, 10); });
}
[X0, X1].forEach(function (cx) {
var gp = hubPlane(D, WALL - 0.4, glass, cx, WALL / 2, CZ, Math.PI / 2);
hubBox(0.18, 0.14, D, steel, cx, 2.4, CZ);
hubBox(0.25, 0.35, D + 0.4, white, cx, WALL + 0.2, CZ);
hubBox(0.06, 0.06, D, cyan, cx + (cx < 0 ? 0.16 : -0.16), WALL, CZ);
hubSolid(cx, CZ, 0.35, D / 2 + 0.3, WALL + 1);
});
[[X0, -4], [4, X1]].forEach(function (s) {
var w = s[1] - s[0], mx = (s[0] + s[1]) / 2;
hubPlane(w, WALL - 0.4, glass, mx, WALL / 2, Z0, 0);
hubBox(w, 0.14, 0.18, steel, mx, 2.4, Z0);
hubSolid(mx, Z0, w / 2, 0.35, WALL + 1);
for (var mxx = s[0] + 1.75; mxx < s[1] - 0.5; mxx += 1.75)
hubBox(0.08, WALL - 0.4, 0.12, steel, mxx, WALL / 2, Z0);
});
hubBox(W + 0.4, 0.35, 0.3, white, 0, WALL + 0.2, Z0);
hubBox(8.4, 0.5, 0.4, white, 0, 4.6, Z0);
hubBox(8, 0.06, 0.06, cyan, 0, 4.33, Z0 - 0.2);
[[X0, -2], [2, X1]].forEach(function (s) {
var w = s[1] - s[0], mx = (s[0] + s[1]) / 2;
hubPlane(w, WALL - 0.4, glass, mx, WALL / 2, Z1, 0);
hubBox(w, 0.14, 0.18, steel, mx, 2.4, Z1);
hubSolid(mx, Z1, w / 2, 0.35, WALL + 1);
});
hubBox(W + 0.4, 0.35, 0.3, white, 0, WALL + 0.2, Z1);
hubBox(4.4, 0.5, 0.4, white, 0, 3.6, Z1);
function slider(cx, cz, half, hgt) {
var L = hubBox(half, hgt, 0.08, glass, cx - half / 2, hgt / 2 + 0.2, cz), R = hubBox(half, hgt, 0.08, glass, cx + half / 2, hgt / 2 + 0.2, cz);
[L, R].forEach(function (p) { var e = new THREE.Mesh(new THREE.BoxGeometry(0.06, hgt, 0.12), steel); e.position.set(0, 0, 0); p.add(e); e.position.x = (p === L ? half / 2 : -half / 2); });
HUB.doors.push({ L: L, R: R, cx: cx, cz: cz, half: half, open: 0 });
}
slider(0, Z0, 4, 4.1);
slider(0, Z1, 2, 3.1);
var sag = 5, R = (Math.pow(W / 2, 2) + sag * sag) / (2 * sag), half = Math.asin((W / 2) / R), cy = WALL + 0.35 + sag - R;
var vg = new THREE.CylinderGeometry(R, R, D + 1.2, lite ? 20 : 32, 1, true, -half, half * 2);
vg.rotateX(-Math.PI / 2);
var vault = new THREE.Mesh(vg, roofGlass);
vault.position.set(0, cy, CZ);
G.add(vault);
for (var rz = Z0; rz <= Z1 + 0.01; rz += lite ? 6 : 3) {
var rib = new THREE.Mesh(new THREE.TorusGeometry(R, 0.14, 6, lite ? 18 : 28, half * 2), white);
rib.rotation.z = Math.PI / 2 - half;
rib.position.set(0, cy, rz);
G.add(rib);
}
for (var lz2 = Z0 + 1.5; lz2 < Z1; lz2 += 3)
hubBox(W * 0.3, 0.05, 0.18, warm, 0, cy + R - 0.6, lz2);
[-1, 0, 1].forEach(function (k) { var a = k * half * 0.55; hubBox(0.12, 0.12, D + 0.6, steel, Math.sin(a) * R, cy + Math.cos(a) * R, CZ); });
hubBox(0.3, 0.12, D + 1.2, cyan, 0, cy + R + 0.12, CZ);
hubBox(18, 0.5, 7, white, 0, 7.4, Z0 - 3.2);
hubBox(17.6, 0.04, 6.6, cyanSoft, 0, 7.13, Z0 - 3.2);
[-7.6, 7.6].forEach(function (sx) { var st = hubCyl(0.14, 0.18, 7.8, steel, sx, 3.8, Z0 - 5.6, null, 10); st.rotation.x = -0.42; });
var arrTex = hubSignTex(["ARRIVALS", "Somnucor Arrival Hub · the Tower Plaza"], 1024, 128);
hubPlane(17.4, 2.1, hubM(0xFFFFFF, { basic: true, map: arrTex }), 0, 8.85, Z0 - 6.72, Math.PI);
var totTex = hubSignTex(["ARRIVAL HUB", "everyone who comes to Somnucor", "lands here"], 256, 768, {});
hubBox(1.8, 7, 0.6, dark, 8.5, 3.7, Z0 - 8);
hubPlane(1.6, 6.6, hubM(0xFFFFFF, { basic: true, map: totTex }), 8.5, 3.7, Z0 - 8.31, Math.PI);
hubBox(1.84, 0.08, 0.64, cyan, 8.5, 7.24, Z0 - 8);
hubSolid(8.5, Z0 - 8, 1, 0.4, 7.2);
var hy = cy + R + 6, halo1 = new THREE.Mesh(new THREE.TorusGeometry(7.5, 0.22, 8, lite ? 40 : 72), hubM(0x7AF0FF, { basic: true })), halo2 = new THREE.Mesh(new THREE.TorusGeometry(5.6, 0.16, 8, lite ? 32 : 60), hubM(0xFFFFFF, { basic: true }));
halo1.position.set(0, hy, CZ);
halo2.position.set(0, hy + 1.4, CZ);
G.add(halo1);
G.add(halo2);
var mast = hubCyl(0.12, 0.2, 6, steel, 0, cy + R + 3, CZ, null, 8);
var orb = new THREE.Mesh(new THREE.SphereGeometry(0.55, 16, 12), hubM(0xBFF6FF, { basic: true }));
orb.position.set(0, hy + 0.7, CZ);
G.add(orb);
HUB.anim.push(function (t) { halo1.rotation.x = Math.PI / 2 + Math.sin(t * 0.21) * 0.18; halo1.rotation.z = t * 0.25; halo2.rotation.x = Math.PI / 2 + Math.cos(t * 0.17) * 0.25; halo2.rotation.y = -t * 0.32; });
var padBase = hubM(0x8A94A4, { shiny: 100, spec: 0xFFFFFF }), padTop = hubM(0x101824, { shiny: 120, spec: 0x6AD8FF });
HUB.pads.forEach(function (p, i) {
hubCyl(2.3, 2.45, 0.22, padBase, p[0], 0.31, p[1], null, lite ? 24 : 40);
hubCyl(2.0, 2.0, 0.06, padTop, p[0], 0.44, p[1], null, lite ? 24 : 40);
var ring = new THREE.Mesh(new THREE.TorusGeometry(1.85, 0.07, 6, lite ? 32 : 56), cyan);
ring.rotation.x = Math.PI / 2;
ring.position.set(p[0], 0.48, p[1]);
G.add(ring);
var gm = hubM(0x6AE8FF, { basic: true, op: 0.4, add: true }), glow = new THREE.Mesh(new THREE.CircleGeometry(1.75, lite ? 24 : 40), gm);
glow.rotation.x = -Math.PI / 2;
glow.position.set(p[0], 0.475, p[1]);
G.add(glow);
var cm = hubM(0x8AF0FF, { basic: true, op: 0.08, add: true, ds: true }), col = new THREE.Mesh(new THREE.CylinderGeometry(1.6, 1.75, 5, lite ? 20 : 32, 1, true), cm);
col.position.set(p[0], 3, p[1]);
G.add(col);
var rings = [];
for (var k = 0; k < (lite ? 1 : 2); k++) {
var rm = hubM(0xBFF8FF, { basic: true, op: 0.5, add: true }), rr = new THREE.Mesh(new THREE.TorusGeometry(1.5, 0.03, 4, lite ? 24 : 40), rm);
rr.rotation.x = Math.PI / 2;
rr.position.set(p[0], 0.6, p[1]);
G.add(rr);
rings.push(rr);
}
HUB.anim.push(function (t) {
var ph = t * 0.5 + i * 1.3;
gm.opacity = 0.3 + 0.12 * Math.sin(ph);
rings.forEach(function (rr, k) { var f = ((t * 0.18 + k * 0.5 + i * 0.21) % 1); rr.position.y = 0.6 + f * 4.2; rr.material.opacity = 0.5 * (1 - f); rr.scale.setScalar(1 - f * 0.25); });
});
var nt = hubSignTex(["PAD " + (i + 1)], 256, 96, { bg0: "#0A1424", bg1: "#0A1424" }), np = hubPlane(1.4, 0.52, hubM(0xFFFFFF, { basic: true, map: nt }), p[0], 0.23, p[1] - 2.85, 0);
np.rotation.x = -Math.PI / 2;
np.rotation.z = Math.PI;
});
hubCyl(0.9, 1.1, 0.9, white, 0, 0.65, 111, null, 24);
hubCyl(0.8, 0.8, 0.05, cyan, 0, 1.12, 111, null, 24);
var globe = new THREE.Mesh(new THREE.IcosahedronGeometry(0.95, lite ? 1 : 2), hubM(0x7AF0FF, { basic: true, op: 0.55, add: true }));
globe.material.wireframe = true;
globe.position.set(0, 2.9, 111);
G.add(globe);
var core = new THREE.Mesh(new THREE.SphereGeometry(0.28, 16, 12), hubM(0xBFF6FF, { basic: true }));
core.position.set(0, 2.9, 111);
G.add(core);
var orbit = new THREE.Mesh(new THREE.TorusGeometry(1.35, 0.025, 4, 48), hubM(0xFFE2A8, { basic: true, op: 0.7, add: true }));
orbit.position.set(0, 2.9, 111);
G.add(orbit);
HUB.anim.push(function (t) { globe.rotation.y = t * 0.3; orbit.rotation.x = 1.1 + Math.sin(t * 0.3) * 0.2; orbit.rotation.y = t * 0.5; });
core.userData.keep = true;
HUB.globe = [globe, core, orbit];
hubSolid(0, 111, 1.15, 1.15, 3.4);
hubGateDress(G, lite, white, steel, dark, cyan, cyanSoft);
if (typeof hubHoloBuild === "function")
try {
hubHoloBuild(G, lite);
}
catch (e) {
if (window.console)
console.warn("[arrival-hub] hologram", e);
}
hubBox(10.6, 3.4, 0.3, dark, 0, 5.0, Z1 - 0.4);
HUB.board = hubCanvas(1024, 320, function () { });
hubBoardDraw();
hubPlane(10.2, 3.0, hubM(0xFFFFFF, { basic: true, map: HUB.board }), 0, 5.0, Z1 - 0.56, Math.PI);
hubBox(10.6, 0.06, 0.34, cyan, 0, 3.27, Z1 - 0.4);
var desk = new THREE.Mesh(new THREE.CylinderGeometry(2.6, 2.6, 1.1, lite ? 16 : 28, 1, false, Math.PI * 0.15, Math.PI * 0.7), white);
desk.position.set(-11.2, 0.75, 100);
desk.rotation.y = Math.PI / 2;
G.add(desk);
var edge = new THREE.Mesh(new THREE.TorusGeometry(2.62, 0.04, 4, lite ? 16 : 28, Math.PI * 0.7), cyan);
edge.rotation.x = Math.PI / 2;
edge.rotation.z = -Math.PI * 0.35;
edge.position.set(-11.2, 1.32, 100);
G.add(edge);
var dTex = hubSignTex(["WELCOME", "the concierge · ask anything"], 512, 128);
hubBox(3.6, 1.0, 0.12, dark, -12.2, 3.2, 96.4);
hubPlane(3.4, 0.9, hubM(0xFFFFFF, { basic: true, map: dTex }), -12.2, 3.2, 96.33, Math.PI);
hubSolid(-11.2, 100, 1.6, 2.7, 1.2);
[[11.6, 102], [11.6, 120]].forEach(function (b, k) {
hubBox(1.1, 0.12, 3.2, seat, b[0], 0.75, b[1]);
hubBox(0.22, 0.9, 3.2, seat, b[0] + 0.5, 1.15, b[1]);
hubBox(0.9, 0.5, 0.2, steel, b[0], 0.45, b[1] - 1.3);
hubBox(0.9, 0.5, 0.2, steel, b[0], 0.45, b[1] + 1.3);
hubSolid(b[0], b[1], 0.65, 1.7, 1.0);
});
[[-12.4, 122.2], [12.4, 122.2], [-12.4, 95.8], [12.4, 95.8], [-8, 122.4], [8, 122.4]].forEach(function (p2, k) {
hubCyl(0.75, 0.6, 1.0, white, p2[0], 0.7, p2[1], null, 16);
hubCyl(0.68, 0.68, 0.05, soil, p2[0], 1.2, p2[1], null, 16);
var n = lite ? 3 : 6;
for (var j = 0; j < n; j++) {
var a = j / n * 6.283 + k;
var b = new THREE.Mesh(new THREE.IcosahedronGeometry(0.45 + (j % 3) * 0.12, 0), j % 2 ? green : green2);
b.position.set(p2[0] + Math.cos(a) * 0.35, 1.55 + (j % 3) * 0.35, p2[1] + Math.sin(a) * 0.35);
G.add(b);
}
var tr = hubCyl(0.06, 0.08, 1.2, wood, p2[0], 1.6, p2[1], null, 6);
hubSolid(p2[0], p2[1], 0.8, 0.8, 2.4);
});
[[-6.5, 96.2], [6.5, 96.2]].forEach(function (k2, i) {
hubBox(0.9, 2.4, 0.5, dark, k2[0], 1.4, k2[1]);
var kt = hubSignTex(i ? ["THIS WAY", "the Tower · trams · the Underground", "the Hall of Doors: east wall, in here"] : ["HALL OF DOORS", "its gate is in here", "on the east wall, by the pads"], 256, 512);
hubPlane(0.8, 1.6, hubM(0xFFFFFF, { basic: true, map: kt }), k2[0], 1.65, k2[1] - 0.26, Math.PI);
hubSolid(k2[0], k2[1], 0.55, 0.35, 2.6);
});
var DZ0 = Z1, DZ1 = HUB.DZ1, DX = HUB.DX, dd = DZ1 - DZ0, dcz = (DZ0 + DZ1) / 2;
hubBox(DX * 2, 0.4, dd, deckM, 0, 0.0, dcz);
hubBox(DX * 2 + 0.2, 0.06, dd + 0.1, hubM(0x5A6474, { shiny: 30 }), 0, 0.22, dcz);
for (var dz = DZ0 + 2; dz < DZ1; dz += 4)
hubBox(DX * 2 - 0.6, 0.02, 0.06, cyan, 0, 0.26, dz);
[[-DX, 0], [DX, 0]].forEach(function (s) {
hubPlane(dd, 1.1, glass, s[0], 0.8, dcz, Math.PI / 2);
hubBox(0.12, 0.08, dd, steel, s[0], 1.38, dcz);
hubBox(0.05, 0.05, dd, cyan, s[0], 0.28, dcz);
hubSolid(s[0], dcz, 0.3, dd / 2, 1.4);
});
hubPlane(DX * 2, 1.1, glass, 0, 0.8, DZ1, 0);
hubBox(DX * 2, 0.08, 0.12, steel, 0, 1.38, DZ1);
hubSolid(0, DZ1, DX, 0.3, 1.4);
for (var px = -DX; px <= DX + 0.01; px += 4) {
hubCyl(0.05, 0.05, 1.2, steel, px, 0.8, DZ1, null, 6);
}
[-6, 6].forEach(function (sx) { var st = hubCyl(0.35, 0.45, 24, steel, sx, -9, DZ1 - 8, null, 10); st.rotation.x = -0.62; });
hubBox(DX * 2, 1.2, 1.0, steel, 0, -0.6, DZ1 - 0.5);
[[-6, DZ1 - 1.4], [6, DZ1 - 1.4]].forEach(function (tp) { hubCyl(0.08, 0.1, 1.1, steel, tp[0], 0.75, tp[1], null, 8); var sc = hubCyl(0.14, 0.2, 0.8, dark, tp[0], 1.4, tp[1] + 0.15, null, 10); sc.rotation.x = 1.2; hubSolid(tp[0], tp[1], 0.3, 0.3, 1.6); });
hubBox(4, 0.12, 1.0, seat, 0, 0.75, DZ1 - 6);
hubBox(0.2, 0.5, 0.2, steel, -1.6, 0.45, DZ1 - 6);
hubBox(0.2, 0.5, 0.2, steel, 1.6, 0.45, DZ1 - 6);
hubSolid(0, DZ1 - 6, 2.1, 0.6, 1.0);
var ovTex = hubSignTex(["THE OVERLOOK", "all of Somnucor below you"], 512, 128);
hubPlane(3.6, 0.9, hubM(0xFFFFFF, { basic: true, map: ovTex }), 0, 4.6, Z1 + 0.25, 0);
var chev = [];
for (var c = 0; c < (lite ? 5 : 9); c++) {
var cm2 = hubM(0x3FE0FF, { basic: true, op: 0.5, add: true }), zc = Z0 - 9 - c * (lite ? 4.4 : 2.6);
var gch = new THREE.Group();
gch.position.set(0, 0.06, zc);
G.add(gch);
[-1, 1].forEach(function (s) { var bar = new THREE.Mesh(new THREE.PlaneGeometry(1.6, 0.28), cm2); bar.rotation.x = -Math.PI / 2; bar.rotation.z = s * 0.6; bar.position.set(s * 0.62, 0, 0.45); gch.add(bar); });
chev.push(cm2);
}
HUB.anim.push(function (t) { chev.forEach(function (m, i) { m.opacity = 0.35 + 0.3 * (0.5 + 0.5 * Math.sin(t * 1.2 + i * 0.7)); }); });
if (typeof gwBake === "function")
try {
gwBake(G);
}
catch (e) {
if (window.console)
console.warn("[arrival-hub] bake", e);
}
if (typeof shadowsFor === "function")
shadowsFor(G, false);
scene.add(G);
HUB.ppl = new THREE.Group();
HUB.ppl.name = "arrival-hub people";
HUB.ppl.position.copy(G.position);
scene.add(HUB.ppl);
if (typeof wPerson === "function") {
var folk = [
{ k: "conc", at: [-12.4, 100], face: [0, 100], o: { title: "Concierge", place: "hotel", sex: "female" }, still: true },
{ k: "att1", at: [0, 104.5], face: [0, 96], o: { title: "Flight Attendant", place: "airport" }, still: true },
{ k: "att2", at: [-9.5, 118], face: [-5, 116], o: { title: "Station Attendant", place: "station", sex: "male" }, still: true },
{ k: "tr1", at: [4, 100], o: { title: "Traveller" }, r: 5 },
{ k: "tr2", at: [8.5, 110], o: { title: "Businesswoman", sex: "female" }, r: 4 },
{ k: "tr3", at: [-4, 121], o: { title: "Tourist" }, r: 4 },
{ k: "tr4", at: [2, 135], o: { title: "Artist", sex: "female" }, r: 5 },
{ k: "tr5", at: [11.4, 108], face: [0, 108], o: { title: "Student" }, sit: true },
{ k: "tr6", at: [-3, 140], o: { title: "Pensioner", sex: "male" }, r: 4 }
];
folk.forEach(function (f, i) {
if (lite && i > 4)
return;
try {
var g = wPerson("hub_" + f.k, f.o);
g.position.set(f.at[0], f.sit ? 0.28 : 0.2, f.at[1]);
if (f.face)
g.rotation.y = Math.atan2(f.face[0] - f.at[0], f.face[1] - f.at[1]);
else
g.rotation.y = i * 1.7;
HUB.ppl.add(g);
HUB.people.push({ g: g, f: f });
}
catch (e) {
if (window.console && HUB.warned++ < 5)
console.warn("[arrival-hub] person", e);
}
});
}
}
function hubBoardDraw() {
var t = HUB.board;
if (!t)
return;
var c = t.userData.c, x = c.getContext("2d"), W = c.width, H = c.height;
var g = x.createLinearGradient(0, 0, 0, H);
g.addColorStop(0, "#0B1830");
g.addColorStop(1, "#050A16");
x.fillStyle = g;
x.fillRect(0, 0, W, H);
x.fillStyle = "#3FE0FF";
x.fillRect(0, 0, W, 6);
x.fillRect(0, H - 6, W, 6);
x.textBaseline = "middle";
x.textAlign = "left";
x.fillStyle = "#FFFFFF";
x.font = "600 46px 'Segoe UI', Helvetica, Arial, sans-serif";
x.fillText("ARRIVALS", 34, 46);
x.fillStyle = "#9FE8FF";
x.font = "400 24px 'Segoe UI', Helvetica, Arial, sans-serif";
x.fillText("Somnucor · the Tower Plaza", 290, 50);
var clock = "";
try {
var hr = typeof dreamHour === "function" ? dreamHour() : null;
if (hr !== null) {
var hh = Math.floor(hr) % 24, mm = Math.floor((hr % 1) * 60);
clock = (hh < 10 ? "0" : "") + hh + ":" + (mm < 10 ? "0" : "") + mm;
}
}
catch (e) { }
x.textAlign = "right";
x.fillStyle = "#FFE2A8";
x.font = "600 40px 'Courier New', monospace";
x.fillText(clock, W - 34, 46);
x.fillStyle = "rgba(63,224,255,.25)";
x.fillRect(30, 82, W - 60, 2);
var rows = HUB.log.slice(0, 4);
if (!rows.length)
rows = [{ n: "Welcome to Somnucor", w: "", at: "" }];
rows.forEach(function (r, i) {
var y = 122 + i * 50;
x.textAlign = "left";
x.fillStyle = "#FFE2A8";
x.font = "600 32px 'Courier New', monospace";
x.fillText(r.at || "", 34, y);
x.fillStyle = "#FFFFFF";
x.font = "600 36px 'Segoe UI', Helvetica, Arial, sans-serif";
x.fillText(String(r.n).slice(0, 24), 170, y);
x.textAlign = "right";
x.fillStyle = r.w === "ARRIVED" ? "#7AF0B0" : "#9FE8FF";
x.font = "600 30px 'Segoe UI', Helvetica, Arial, sans-serif";
x.fillText(r.w || "", W - 34, y);
});
t.needsUpdate = true;
}
function hubLogArrival(name, pad) {
var at = "";
try {
var hr = typeof dreamHour === "function" ? dreamHour() : null;
if (hr !== null) {
var hh = Math.floor(hr) % 24, mm = Math.floor((hr % 1) * 60);
at = (hh < 10 ? "0" : "") + hh + ":" + (mm < 10 ? "0" : "") + mm;
}
}
catch (e) { }
HUB.log.unshift({ n: name, w: pad ? "PAD " + pad + " · ARRIVED" : "ARRIVED", at: at });
if (HUB.log.length > 8)
HUB.log.length = 8;
HUB.boardAt = 0;
}
function hubDrop() { return __ZC(454, 0, this, arguments, new.target); }
function hubInCity() {
return hubOk() && typeof store !== "undefined" && (store.here || 0) === ATLC.id && !store.inside &&
!(typeof WLD !== "undefined" && WLD.on) && !(typeof INT !== "undefined" && INT);
}
function hubMyName() { var n = ""; try {
n = typeof dreamer === "function" ? String(dreamer().name || "").trim() : "";
}
catch (e) { } return n || "A dreamer"; }
function hubArrive() {
if (!hubOk() || typeof camera === "undefined" || !camera)
return false;
if (!HUB.on)
try {
hubBuild();
}
catch (e) {
if (window.console)
console.warn("[arrival-hub] build", e);
}
var k = HUB.padNext++ % HUB.pads.length, p = HUB.pads[k], H = HUB.on ? HUB.H : hubH();
camera.position.set(ATLC.x + p[0], H + 0.47 + 1.72, ATLC.z + p[1]);
yaw = 0;
pitch = 0.04;
if (typeof flyY !== "undefined")
flyY = H + 0.47;
hubLogArrival(hubMyName(), k + 1);
HUB.arrivedAt = performance.now();
return true;
}
var HUB_SAY = "<b>Somnucor · the Arrival Hub.</b> Everyone who comes to the city lands here. The gate to the Hall of Doors is right here, on the east wall between the pads; the hologram over the map plays short tutorials through the day. Walk out through the doors ahead and the Tower is straight in front of you. The concierge at the desk on your left will help with anything, and the Overlook is behind you.";
(function () {
if (typeof arriveInSomnucor === "function") {
var ar0 = arriveInSomnucor;
arriveInSomnucor = function () { if (hubArrive()) {
if (typeof setStatus === "function")
setStatus(HUB_SAY);
return;
} return ar0.apply(this, arguments); };
}
if (typeof toSomnucor === "function") {
var ts0 = toSomnucor;
toSomnucor = function () {
var r = ts0.apply(this, arguments);
try {
if (typeof walkMode !== "undefined" && walkMode && !store.inside && hubOk() && performance.now() - (HUB.arrivedAt || 0) > 800) {
if (hubArrive() && typeof setStatus === "function")
setStatus(HUB_SAY);
}
else if (hubOk() && performance.now() - (HUB.arrivedAt || 0) <= 800 && typeof setStatus === "function")
setStatus(HUB_SAY);
}
catch (e) { }
return r;
};
}
if (typeof backToMyDoor === "function") {
var bd0 = backToMyDoor;
backToMyDoor = function (msg) {
var r = bd0.apply(this, arguments);
try {
if (!(typeof myDoor !== "undefined" && myDoor) && hubArrive() && typeof setStatus === "function")
setStatus(msg + " You wake on a pad in the Arrival Hub. (Take a door of your own in the Hall and it is there you will wake.)");
}
catch (e) { }
return r;
};
}
if (typeof blockedAt === "function") {
var ba = blockedAt;
blockedAt = function (x, z, feet) {
if (HUB.on && hubInCity()) {
var lx = x - ATLC.x, lz = z - ATLC.z;
if (lx > -17 && lx < 17 && lz > 80 && lz < HUB.DZ1 + 3) {
var f = (feet === undefined ? HUB.H : feet) - HUB.H;
if (worldSolidAt(HUB.sols, lx, lz, f))
return true;
if (hubOnDeck(lx, lz) && f > -1.5)
return false;
}
}
return ba.apply(this, arguments);
};
}
if (typeof atlBlocks === "function") {
var ab = atlBlocks;
atlBlocks = function (x0, z0, x1, z1, feet) {
if (HUB.on && hubInCity() && hubOnDeck(x1 - ATLC.x, z1 - ATLC.z) && feet > HUB.H - 1.5)
return false;
return ab.apply(this, arguments);
};
}
if (typeof supportAt === "function") {
var sa = supportAt;
supportAt = function (x, z, feet) {
if (HUB.on && hubInCity()) {
var lx = x - ATLC.x, lz = z - ATLC.z;
if ((hubInHall(lx, lz) || hubOnDeck(lx, lz)) && feet > HUB.H - 3 && feet < HUB.H + 4) {
for (var i = 0; i < HUB.pads.length; i++) {
var p = HUB.pads[i];
if ((lx - p[0]) * (lx - p[0]) + (lz - p[1]) * (lz - p[1]) < 2.3 * 2.3)
return HUB.H + 0.47;
}
return HUB.H + 0.2;
}
}
return sa.apply(this, arguments);
};
}
if (typeof festStand === "function") {
var fs0 = festStand;
festStand = function () {
var L = fs0.apply(this, arguments);
try {
if (hubOk()) {
[[0, 98, 22], [0, 118, 20], [0, 140, 12], [0, 80, 8], [0, 70, 6]].forEach(function (c) { L.push({ x: ATLC.x + c[0], z: ATLC.z + c[1], r: c[2] }); });
}
}
catch (e) { }
return L;
};
}
if (typeof wxInCity === "function") {
var wi = wxInCity;
wxInCity = function () { if (hubUnderRoof())
return true; return wi.apply(this, arguments); };
}
if (typeof cwxHere === "function") {
var ch = cwxHere;
cwxHere = function () { if (hubUnderRoof())
return false; return ch.apply(this, arguments); };
}
if (typeof transitTick === "function") {
var tt = transitTick;
transitTick = function (dt) { tt(dt); try {
hubArrTick(dt);
}
catch (e) {
if (window.console && (HUB.warned++) < 5)
console.warn("[arrival-hub]", e);
} };
}
})();
function hubUnderRoof() {
if (!HUB.on || !hubInCity() || typeof camera === "undefined" || !camera)
return false;
var P = camera.position, lx = P.x - ATLC.x, lz = P.z - ATLC.z;
return lx > HUB.X0 - 1 && lx < HUB.X1 + 1 && lz > HUB.Z0 - 7 && lz < HUB.Z1 + 0.5 && P.y < HUB.H + 14;
}
function hubPrompt(html, fn) { if (html === HUB.ph)
return; HUB.ph = html; if (typeof worldPromptCity === "function")
worldPromptCity(html, fn); }
function hubTalk() { return __ZC(454, 1, this, arguments, new.target); }
function hubArrTick(dt) {
HUB.t += dt;
var under = hubUnderRoof();
if (under !== !!HUB.under) {
HUB.under = under;
if (typeof wxApply === "function")
try {
wxApply();
}
catch (e) { }
}
if (!hubOk() || !hubInCity()) {
if (HUB.on && !(typeof store !== "undefined" && store.inside))
hubDrop();
else if (HUB.ph)
hubPrompt(null);
return;
}
var P = camera.position, lx = P.x - ATLC.x, lz = P.z - ATLC.z, d = Math.hypot(lx, lz - 112);
if (!HUB.on) {
if (d < 420)
hubBuild();
return;
}
if (d > 650) {
hubDrop();
return;
}
if (typeof presenceOthers !== "undefined" && presenceOthers) {
for (var id in presenceOthers) {
if (HUB.seen[id])
continue;
HUB.seen[id] = 1;
var po = presenceOthers[id], nm = (po && (po.name || (po.row && po.row.name))) || "A dreamer";
if (HUB.t > 3)
hubLogArrival(String(nm).replace(/ ·.*$/, ""), 0);
}
}
if (d > 220) {
if (HUB.ph)
hubPrompt(null);
return;
}
for (var i = 0; i < HUB.anim.length; i++)
HUB.anim[i](HUB.t);
HUB.doors.forEach(function (D) {
var near = Math.hypot(lx - D.cx, lz - D.cz) < 6.5;
if (!near)
for (var k = 0; k < HUB.people.length && !near; k++) {
var g = HUB.people[k].g;
if (Math.hypot(g.position.x - D.cx, g.position.z - D.cz) < 3)
near = true;
}
D.open += ((near ? 1 : 0) - D.open) * Math.min(1, dt * 3.2);
D.L.position.x = D.cx - D.half / 2 - D.open * D.half * 0.95;
D.R.position.x = D.cx + D.half / 2 + D.open * D.half * 0.95;
});
HUB.people.forEach(function (q) {
if (q.f.still || q.f.sit || typeof wWander !== "function")
return;
var g = q.g, ox = g.position.x, oz = g.position.z;
wWander(g, dt, null, { r: q.f.r || 4, sp: 1.1 });
var inHall = hubInHall(g.position.x, g.position.z), onDeck = hubOnDeck(g.position.x, g.position.z) && g.position.z > HUB.Z1 + 1;
if ((!inHall && !onDeck) || worldSolidAt(HUB.sols, g.position.x, g.position.z, 0)) {
g.position.x = ox;
g.position.z = oz;
if (g.userData.wan)
g.userData.wan.wait = 1 + Math.random() * 3;
}
});
HUB.boardAt -= dt;
if (HUB.boardAt <= 0) {
HUB.boardAt = 20;
hubBoardDraw();
}
if (Math.hypot(lx - HUB.talkAt.x, lz - HUB.talkAt.z) < 3.2)
hubPrompt("<b>Ione, the Arrivals Concierge</b> · <b>press E</b> or tap to talk", function () { hubPrompt(null); hubTalk(); });
else if (HUB.ph)
hubPrompt(null);
}
"use strict";
var HUB_TUTS = [
["Welcome to Somnucor", "You came in on one of the four pads. The doors ahead open on the Tower Plaza; the whole city falls away below it in nine rings."],
["Walking", "W A S D to walk, Shift to run, click and move the mouse to look round. On a phone: left thumb to walk, drag to look. Esc goes back."],
["Using things", "Walk up to a door, a person or a booth and a line comes up at the bottom. Press E, click the line, or tap Use on a phone. Doors never open by walking into them."],
["The Hall of Doors", "Its gate is right here, on the east wall between the pads. Every world has a door in the Hall, and every dreamer can take a door of their own."],
["Your own door", "Menu, then My door: choose its size, its shape and its type, then dress it as you like. It stands in the Hall for everyone to see."],
["Talking to people", "The people of Somnucor talk back. Walk up to someone and press E to speak. Ione, at the desk by the doors, will help with anything."],
["Telling a dream", "Press the circle and talk, or type. A sentence is enough: the Atlas builds only what you dreamt, and what you left out stays faint."],
["Changing what is wrong", "Tap anything in your dream to open it: its colours, its materials, its windows and doors, who lives there. All of it yours to correct."],
["Getting home", "From anywhere, Menu then My dream takes you back to your own dream. The land, in the Menu, lists every place you can go."],
["Your dreams are yours", "They stay on your device. Keep them to your account and they are locked first, with a phrase only you know."],
["The Overlook", "Out of the back of this hub the deck reaches over the water: all of Somnucor below you. A good place to get your bearings."]
];
var HOLO = { g: null, fig: null, beam: null, rings: [], panel: null, tex: null, cv: null, mat: null, shown: "", k: -1, local: null, a: 0, said: null, fn: null };
var HOLO_EVERY = 300, HOLO_EACH = 14, HOLO_RISE = 3, HOLO_N = 4;
function hubHoloBuild(G, lite) {
var H = new THREE.Group();
H.name = "arrival-hub hologram";
H.position.set(0, 0, 111);
H.userData.keep = true;
G.add(H);
HOLO.g = H;
HOLO.mat = hubM(0x38D8FF, { basic: true, op: 0 });
HOLO.mat.depthWrite = false;
HOLO.wire = hubM(0xD8FBFF, { basic: true, op: 0, add: true });
HOLO.wire.wireframe = true;
HOLO.wire.depthWrite = false;
var fig = null;
try {
if (typeof wPerson === "function")
fig = wPerson("hub_holo_vela", { title: "Guide", place: "airport", sex: "female" });
}
catch (e) {
fig = null;
}
if (!fig) {
fig = new THREE.Group();
var body = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.32, 1.5, 12), HOLO.mat);
body.position.y = 0.75;
fig.add(body);
var head = new THREE.Mesh(new THREE.SphereGeometry(0.16, 12, 10), HOLO.mat);
head.position.y = 1.68;
fig.add(head);
}
hubHoloLight(fig);
fig.scale.setScalar(1.2);
fig.userData.keep = true;
H.add(fig);
HOLO.fig = fig;
var bm = hubM(0x3FE0FF, { basic: true, op: 0, add: true, ds: true });
bm.depthWrite = false;
HOLO.beam = new THREE.Mesh(new THREE.CylinderGeometry(0.85, 1.05, 4.2, lite ? 16 : 28, 1, true), bm);
HOLO.beam.position.y = 3.25;
H.add(HOLO.beam);
for (var i = 0; i < (lite ? 2 : 4); i++) {
var rm = hubM(0xBFF6FF, { basic: true, op: 0, add: true });
rm.depthWrite = false;
var r = new THREE.Mesh(new THREE.TorusGeometry(0.95, 0.02, 4, lite ? 24 : 40), rm);
r.rotation.x = Math.PI / 2;
H.add(r);
HOLO.rings.push(r);
}
HOLO.tex = hubCanvas(1024, 420, function () { });
HOLO.cv = HOLO.tex.userData.c;
var pm = hubM(0xFFFFFF, { basic: true, map: HOLO.tex, op: 0, ds: true });
pm.depthWrite = false;
HOLO.panel = new THREE.Mesh(new THREE.PlaneGeometry(4.4, 1.8), pm);
HOLO.panel.position.y = 5.0;
H.add(HOLO.panel);
HOLO.shown = "";
HOLO.k = -1;
HUB.anim.push(hubHoloTick);
}
function hubHoloLight(fig) {
fig.traverse(function (m) {
if (!(m.isMesh || m.isSkinnedMesh) || m.userData.holoWire)
return;
if (m.material !== HOLO.mat) {
m.material = HOLO.mat;
m.castShadow = false;
m.receiveShadow = false;
m.raycast = function () { };
if (!m.isSkinnedMesh && !m.userData.holoWired && m.geometry) {
m.userData.holoWired = true;
var w = new THREE.Mesh(m.geometry, HOLO.wire);
w.userData.holoWire = true;
w.raycast = function () { };
m.add(w);
}
}
});
}
function hubHoloNow() {
var now = Date.now() / 1000, L = HOLO.local;
var len = HOLO_RISE * 2 + HOLO_EACH * HOLO_N;
if (L) {
var e = now - L.t0;
if (e < HOLO_RISE * 2 + HOLO_EACH * L.n)
return hubHoloAt(e, L.k, L.n);
HOLO.local = null;
}
var slot = Math.floor(now / HOLO_EVERY), e2 = now - slot * HOLO_EVERY;
if (e2 >= len)
return null;
return hubHoloAt(e2, (slot * HOLO_N) % HUB_TUTS.length, HOLO_N);
}
function hubHoloAt(e, k0, n) {
var end = HOLO_RISE * 2 + HOLO_EACH * n, f = Math.min(1, e / HOLO_RISE, (end - e) / HOLO_RISE);
var i = Math.max(0, Math.min(n - 1, Math.floor((e - HOLO_RISE) / HOLO_EACH)));
return { k: (k0 + i) % HUB_TUTS.length, f: Math.max(0, f), i: i, n: n, left: end - e };
}
function hubHoloDraw(k, i, n) {
var T = HUB_TUTS[k], c = HOLO.cv, x = c.getContext("2d"), W = c.width, H = c.height;
x.clearRect(0, 0, W, H);
var g = x.createLinearGradient(0, 0, 0, H);
g.addColorStop(0, "rgba(10,40,60,0.85)");
g.addColorStop(1, "rgba(4,16,28,0.85)");
x.fillStyle = g;
x.fillRect(0, 0, W, H);
x.fillStyle = "#3FE0FF";
x.fillRect(0, 0, W, 6);
x.fillRect(0, H - 6, W, 6);
x.fillStyle = "#8AF4FF";
x.font = "600 30px sans-serif";
x.textAlign = "left";
x.fillText("ARRIVAL HUB · TUTORIAL " + (i + 1) + " OF " + n, 40, 58);
x.fillStyle = "#FFFFFF";
x.font = "bold 64px sans-serif";
x.fillText(T[0], 40, 138);
x.fillStyle = "#DFF8FF";
x.font = "38px sans-serif";
var words = T[1].split(" "), line = "", y = 208;
words.forEach(function (w) { var t = line ? line + " " + w : w; if (x.measureText(t).width > W - 80) {
x.fillText(line, 40, y);
y += 50;
line = w;
}
else
line = t; });
if (line)
x.fillText(line, 40, y);
HOLO.tex.needsUpdate = true;
}
function hubHoloTick(t) {
if (!HOLO.g || !HOLO.fig)
return;
var S = hubHoloNow(), f = S ? S.f : 0;
if (HUB.globe)
HUB.globe.forEach(function (m) { m.visible = f < 0.05; });
HOLO.g.visible = f > 0.001;
if (f > 0.001) {
var key = S.k + "|" + S.i;
if (key !== HOLO.shown) {
HOLO.shown = key;
hubHoloDraw(S.k, S.i, S.n);
}
var flick = 0.82 + 0.06 * Math.sin(t * 3.1) + 0.04 * Math.sin(t * 7.3);
HOLO.lt = (HOLO.lt || 0) + 1;
if (HOLO.lt % 20 === 1)
hubHoloLight(HOLO.fig);
HOLO.mat.opacity = 0.62 * f * flick;
HOLO.wire.opacity = 0.2 * f;
HOLO.fig.position.y = 1.15 - (1 - f) * 1.9;
HOLO.fig.rotation.y = Math.sin(t * 0.4) * 0.5;
HOLO.beam.material.opacity = 0.2 * f;
HOLO.rings.forEach(function (r, i) { var p = ((t * 0.35 + i / HOLO.rings.length) % 1); r.position.y = 1.15 + p * 4.0; r.material.opacity = 0.35 * f * (1 - p); });
var pf = Math.max(0, Math.min(1, (f - 0.5) * 2));
HOLO.panel.material.opacity = 0.95 * pf;
if (typeof camera !== "undefined" && camera && HUB.g) {
var wx = HUB.g.position.x, wz = HUB.g.position.z + 111;
HOLO.panel.rotation.y = Math.atan2(camera.position.x - wx, camera.position.z - wz);
}
}
hubHoloPrompt(S);
}
function hubHoloPrompt(S) {
if (!hubOk() || typeof camera === "undefined")
return;
var P = camera.position, near = Math.hypot(P.x - ATLC.x, P.z - (ATLC.z + 111)) < 3.4 && !(typeof store !== "undefined" && store.inside);
var on = typeof WCITY !== "undefined" && !!HOLO.fn && WCITY.fn === HOLO.fn;
if (!near) {
if (on)
worldPromptCity(null);
HOLO.fn = null;
HOLO.said = null;
return;
}
var html = S ? "✦ <b>Vela, the hologram guide</b> · <b>press E</b> for the next tutorial" : "✦ <b>The tutorial hologram</b> · <b>press E</b> to watch a tutorial now";
if (on && HOLO.said === html)
return;
if (!on && typeof WCITY !== "undefined" && WCITY.fn)
return;
HOLO.said = html;
HOLO.fn = function () { hubHoloPlay(); };
if (typeof worldPromptCity === "function")
worldPromptCity(html, HOLO.fn);
}
function hubHoloPlay() {
var S = hubHoloNow(), now = Date.now() / 1000;
var k = S ? (S.k + 1) % HUB_TUTS.length : (HOLO.a++ % HUB_TUTS.length);
HOLO.local = { t0: S ? now - HOLO_RISE : now, k: k, n: 1 };
HOLO.said = null;
}
(function () {
if (typeof hubDrop !== "function")
return;
var hd = hubDrop;
hubDrop = function () {
var r = hd.apply(this, arguments);
HOLO.g = null;
HOLO.fig = null;
HOLO.beam = null;
HOLO.rings = [];
HOLO.panel = null;
HOLO.tex = null;
HOLO.cv = null;
if (HOLO.fn && typeof WCITY !== "undefined" && WCITY.fn === HOLO.fn)
worldPromptCity(null);
HOLO.fn = null;
HUB.globe = null;
return r;
};
})();
