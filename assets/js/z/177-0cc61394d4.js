/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(177, function () {
"use strict";
return [
function (add) {
var red = wdrMat(0xB8141C), fur = wdrMat(0xFAFAFA, { r: 1 }), black = wdrMat(0x141414, { r: 0.4 }), gold = wdrMat(0xE0B040, { r: 0.3, m: 0.7 });
var hat = new THREE.Group();
var c = new THREE.Mesh(new THREE.ConeGeometry(0.135, 0.36, 14), red);
c.position.set(0, 0.17, -0.03);
c.rotation.x = -0.45;
hat.add(c);
var pom = new THREE.Mesh(new THREE.SphereGeometry(0.05, 10, 8), fur);
pom.position.set(0, 0.33, -0.12);
hat.add(pom);
var band = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.145, 0.07, 16), fur);
band.position.set(0, 0.0, 0);
hat.add(band);
add("Head", [0, 0.16, -0.01], hat);
add("Head", [0, 0.075, 0.105], wdrSpecs(gold));
var belly = new THREE.Mesh(new THREE.SphereGeometry(0.2, 16, 12), red);
belly.scale.set(1.05, 0.95, 0.75);
add("spine_01", [0, 0.05, 0.07], belly);
var belt = new THREE.Mesh(new THREE.CylinderGeometry(0.21, 0.21, 0.075, 18), black);
belt.scale.z = 0.85;
add("spine_01", [0, -0.02, 0.01], belt);
var buckle = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.08, 0.02), gold);
add("spine_01", [0, -0.02, 0.2], buckle);
var hem = new THREE.Mesh(new THREE.CylinderGeometry(0.235, 0.25, 0.07, 18), fur);
hem.scale.z = 0.85;
add("pelvis", [0, -0.16, 0], hem);
var front = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.5, 0.03), fur);
add("spine_02", [0, -0.05, 0.17], front);
[-1, 1].forEach(function (s) { var cuff = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.055, 0.07, 10), fur); cuff.rotation.z = Math.PI / 2; add(s < 0 ? "lowerarm_l" : "lowerarm_r", [0, 0, 0], cuff, true); });
},
function (add) {
var white = wdrMat(0xFBF8F0, { r: 1 }), lace = wdrMat(0xFFFFFF, { r: 1 }), gold = wdrMat(0xE0B040, { r: 0.3, m: 0.7 }), pink = wdrMat(0xF0A0A0, { r: 0.9 });
var apron = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.55, 0.02), white);
apron.rotation.x = 0.12;
add("spine_01", [0, -0.24, 0.135], apron);
var bib = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.18, 0.02), white);
add("spine_03", [0, -0.06, 0.13], bib);
var frill = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.045, 0.03), lace);
frill.rotation.x = 0.12;
add("spine_01", [0, -0.51, 0.165], frill);
var tie = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.04, 18), white);
tie.scale.z = 0.82;
add("spine_01", [0, 0.08, 0], tie);
var cap = new THREE.Mesh(new THREE.SphereGeometry(0.13, 16, 10, 0, Math.PI * 2, 0, Math.PI / 2), lace);
cap.scale.y = 0.55;
add("Head", [0, 0.15, -0.02], cap);
var capb = new THREE.Mesh(new THREE.TorusGeometry(0.13, 0.02, 6, 18), lace);
capb.rotation.x = Math.PI / 2;
add("Head", [0, 0.15, -0.02], capb);
add("Head", [0, 0.075, 0.105], wdrSpecs(gold));
[-1, 1].forEach(function (s) { var ch = new THREE.Mesh(new THREE.SphereGeometry(0.022, 8, 6), pink); add("Head", [s * 0.055, 0.035, 0.1], ch); });
},
function (add, c, E) {
var hat = new THREE.Group();
var cone = new THREE.Mesh(new THREE.ConeGeometry(0.13, 0.42, 12), wdrMat(c.hat));
cone.position.set(0.04, 0.2, -0.03);
cone.rotation.z = -0.35;
cone.rotation.x = -0.2;
hat.add(cone);
var band = new THREE.Mesh(new THREE.CylinderGeometry(0.135, 0.14, 0.05, 14), wdrMat(0xF4F0E8, { r: 1 }));
hat.add(band);
var bell = new THREE.Mesh(new THREE.SphereGeometry(0.035, 8, 6), wdrMat(0xF0C040, { r: 0.3, m: 0.8 }));
bell.position.set(0.12, 0.4, -0.08);
hat.add(bell);
add("Head", [0, 0.15, 0], hat);
var skin = (E.spec.look && E.spec.look.skin != null) ? E.spec.look.skin : 0xF0C8A0;
[-1, 1].forEach(function (s) { var ear = new THREE.Mesh(new THREE.ConeGeometry(0.028, 0.13, 6), wdrMat(skin, { r: 0.9 })); ear.rotation.z = s * -1.15; add("Head", [s * 0.1, 0.08, -0.01], ear); });
var belt = new THREE.Mesh(new THREE.CylinderGeometry(0.19, 0.19, 0.06, 16), wdrMat(0x1A1410, { r: 0.4 }));
belt.scale.z = 0.82;
add("spine_01", [0, -0.03, 0], belt);
var buckle = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.06, 0.02), wdrMat(0xE0B040, { r: 0.3, m: 0.7 }));
add("spine_01", [0, -0.03, 0.16], buckle);
var collar = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.2, 0.06, 8), wdrMat(c.hat));
add("spine_03", [0, 0.12, 0], collar);
},
function (add, c, E) {
var tail = wdrTail(c.tail);
add("pelvis", [0, 0.02, 0], tail.g);
tail.g.userData.sit = !!E.g.userData.sit;
WDR.tails.push(tail.g);
var sh = wdrMat(0xF4E0D0, { r: 0.5, m: 0.2 }), male = E.spec.look && E.spec.look.sex === "m";
if (!male)
[-1, 1].forEach(function (s) { var shell = new THREE.Mesh(new THREE.SphereGeometry(0.06, 10, 6, 0, Math.PI * 2, 0, Math.PI / 2), sh); shell.rotation.x = Math.PI / 2; add("spine_03", [s * 0.075, -0.02, 0.12], shell); });
var u = E.g.userData;
u.tailed = 1;
if (u.tail)
u.tail.visible = false;
if (u.tail2)
u.tail2.visible = false;
},
function (E, bones, body, name, off, obj, keepTurn) {
var b = bones[name];
if (!b)
return;
body.updateMatrixWorld(true);
var bp = b.getWorldPosition(new THREE.Vector3());
body.worldToLocal(bp);
var p = bp.add(new THREE.Vector3(off[0], off[1], off[2]));
body.localToWorld(p);
b.add(obj);
b.updateMatrixWorld(true);
obj.position.copy(b.worldToLocal(p));
var bq = b.getWorldQuaternion(new THREE.Quaternion()), oq = body.getWorldQuaternion(new THREE.Quaternion());
if (!keepTurn)
obj.quaternion.copy(bq.invert().multiply(oq));
var bs = b.getWorldScale(new THREE.Vector3()), os = body.getWorldScale(new THREE.Vector3());
obj.scale.multiply(new THREE.Vector3(os.x / bs.x, os.y / bs.y, os.z / bs.z));
obj.traverse(function (m) { m.userData.hdf = 1; if (m.isMesh) {
m.castShadow = true;
m.raycast = function () { };
} });
},
function (t) {
if (!t || !t.image || !WDR_PALE)
return null;
var got = WDR_PALE.get(t);
if (got)
return got;
try {
var im = t.image, w = im.width || im.videoWidth, h = im.height || im.videoHeight;
if (!w || !h)
return null;
var sc = Math.min(1, 512 / Math.max(w, h)), c = document.createElement("canvas");
c.width = Math.max(1, w * sc | 0);
c.height = Math.max(1, h * sc | 0);
var x = c.getContext("2d", { willReadFrequently: true });
x.drawImage(im, 0, 0, c.width, c.height);
var d = x.getImageData(0, 0, c.width, c.height), a = d.data, sum = 0, n = 0;
for (var i = 0; i < a.length; i += 4) {
if (a[i + 3] > 8) {
sum += a[i] * 0.3 + a[i + 1] * 0.59 + a[i + 2] * 0.11;
n++;
}
}
var avg = n ? sum / n : 128;
for (var j = 0; j < a.length; j += 4) {
var l = (a[j] * 0.3 + a[j + 1] * 0.59 + a[j + 2] * 0.11) / Math.max(1, avg), v = Math.max(70, Math.min(255, 215 * l));
a[j] = a[j + 1] = a[j + 2] = v;
}
x.putImageData(d, 0, 0);
var nt = new THREE.CanvasTexture(c);
nt.flipY = t.flipY;
nt.wrapS = t.wrapS;
nt.wrapT = t.wrapT;
if (t.encoding !== undefined)
nt.encoding = t.encoding;
if (t.colorSpace !== undefined)
nt.colorSpace = t.colorSpace;
nt.needsUpdate = true;
WDR_PALE.set(t, nt);
return nt;
}
catch (e) {
return null;
}
},
function (E) {
var W = E.spec.wCostume, c0 = W.c, c = Object.assign({}, c0, c0.pick ? c0.pick(W.seed, E) : {});
var body = E.g.children[0], bones = {}, root = E.model;
root.traverse(function (o) { if (o.isBone && !bones[o.name])
bones[o.name] = o; });
root.traverse(function (m) {
if (!m.isSkinnedMesh)
return;
var n = m.name || "", col = null;
if (m.userData.hdfHair)
col = c.hair != null ? c.hair : null;
else if (/Belt/i.test(n)) {
m.visible = false;
return;
}
else if (/Bracer/i.test(n))
col = c.arms;
else if (/Legs/i.test(n))
col = c.legs;
else if (/Feet|Boots/i.test(n))
col = c.feet;
else if (/Arms/i.test(n))
col = c.arms;
else if (/Body/i.test(n) && !/Superhero/i.test(n))
col = c.body;
else if (/beard/i.test(n))
col = c.hair;
if (c.hideLegs && /Legs|Feet|Boots/i.test(n)) {
m.visible = false;
return;
}
if (c.hideArms && /Arms|Bracer/i.test(n)) {
m.visible = false;
return;
}
if (col == null)
return;
var conv = function (x) { var y = x.clone(); y.skinning = x.skinning; y.map = wdrPaleMap(x.map); y.color = new THREE.Color(col); if (y.roughness !== undefined)
y.roughness = 0.8; y.needsUpdate = true; return y; };
m.userData.wdrOrig = m.material;
m.material = Array.isArray(m.material) ? m.material.map(conv) : conv(m.material);
});
var keep = [];
if (!c.ownHead) {
if (E.hatTodo)
keep = keep.concat(E.hatTodo.hats || []);
keep = keep.concat(E.hats || []);
}
else {
E.hatTodo = null;
E.backTodo = null;
}
E.hid = E.hid || [];
body.traverse(function (m) {
if (!m.isMesh || m.userData.hdf || m.userData.contact || !m.visible)
return;
for (var p = m; p; p = p.parent) {
if (p.userData && p.userData.hdfRoot)
return;
if (p === body)
break;
}
if (keep.indexOf(m) >= 0)
return;
m.visible = false;
E.hid.push(m);
});
if (c.hideLegs) {
E.shrink = [];
root.traverse(function (b) { if (b.isBone && /^thigh_[lr]$/i.test(b.name))
E.shrink.push(b); });
}
if (c.props)
c.props(function (name, off, obj, keep) { wdrAdd(E, bones, body, name, off, obj, keep); }, c, E);
if (typeof NP !== "undefined")
NP.people.forEach(function (P) { if (P.g === E.g)
P.hatted = 1; });
},
function (G) {
var R = wRand(9191), sol = NP.solids;
function at(x, z) { return npHeight(x, z); }
var walls = [0xF4D8A0, 0xA8D0E8, 0xF0B8C8, 0xC8E0B0, 0xF8E8C0, 0xD8C0E8, 0xF0C8A0, 0xB8E0D8, 0xF4E0E0, 0xE0D0B0, 0xC0D8F0, 0xF8D0B0];
var roofs = [0xB82A2A, 0x2A6A3A, 0x2A4A8A, 0x8A3A6A];
var spots = [];
for (var i = 0; i < 14; i++) {
var a = -0.35 + i / 13 * (Math.PI + 0.7), d = 80 + (i % 2) * 14;
var x = Math.cos(a) * d, z = 18 + Math.sin(a) * d * 0.85;
spots.push([x, z, Math.atan2(-x, -(z - 18))]);
}
spots.forEach(function (s, i) {
var x = s[0], z = s[1];
if (Math.hypot(x - 52, z - 2) < 14 || Math.hypot(x + 62, z + 14) < 18 || Math.hypot(x - 48, z + 56) < 14)
return;
var g = new THREE.Group();
g.position.set(x, at(x, z), z);
g.rotation.y = s[2];
G.add(g);
var w = 5 + (i % 3), d = 4.5, h = 3.2;
wBox(w, h, d, wM(walls[i % walls.length]), 0, h / 2, 0, g);
for (var k = 0; k < 4; k++)
wBox(0.18, h, 0.18, wM(0x6A4A2E), (k % 2 ? 1 : -1) * w / 2, h / 2, (k < 2 ? 1 : -1) * d / 2, g);
wdrSnowRoof(g, w, d, h, roofs[i % roofs.length]);
var door = wMesh(new THREE.CylinderGeometry(0.6, 0.6, 0.12, 16, 1, false, 0, Math.PI), wM(0x7A3A1E), 0, 1.1, d / 2 + 0.05, g);
door.rotation.x = Math.PI / 2;
door.rotation.z = Math.PI / 2;
wBox(1.2, 1.1, 0.1, wM(0x7A3A1E), 0, 0.55, d / 2 + 0.05, g);
wSph(0.06, wM(0xE0B040), 0.35, 0.8, d / 2 + 0.13, g, 6);
[-1, 1].forEach(function (sd) { wMesh(new THREE.PlaneGeometry(0.9, 0.8), wB(0xFFD890), sd * (w / 2 - 1), 1.8, d / 2 + 0.06, g); wBox(1.05, 0.08, 0.12, wM(0xF4F0E8), sd * (w / 2 - 1), 1.36, d / 2 + 0.08, g); });
var ch = wBox(0.7, 1.6, 0.7, wM(0x8A5A4A), w / 4, h + 1.6, -d / 6, g);
var wr = wMesh(new THREE.TorusGeometry(0.28, 0.09, 6, 14), wM(0x1E5A3A), 0, 2.25, d / 2 + 0.12, g);
wSph(0.07, wM(0xC82A2A), 0, 1.98, d / 2 + 0.2, g, 6);
var heap = wSph(1.2, wM(0xF6FAFF), w / 2 + 0.4, 0, d / 2 - 0.4, g, 8);
heap.scale.set(1, 0.4, 0.8);
sol.push({ x: x, z: z, r: Math.max(w, d) / 2 + 0.4 });
});
(function () {
var x = -34, z = 58, g = new THREE.Group();
g.position.set(x, at(x, z), z);
g.rotation.y = 0.5;
G.add(g);
var gb = wM(0xA8642E), icing = wM(0xFFFFFF), cand = [0xE83A3A, 0x3AC86A, 0xF0D040, 0x4A8AF0, 0xF08AD0];
wBox(7, 4, 6, gb, 0, 2, 0, g);
[-1, 1].forEach(function (s) { var r = wBox(7.8, 0.35, 4, gb, 0, 5.1, s * 1.5, g); r.rotation.x = s * 0.75; var ic = wBox(7.9, 0.15, 0.3, icing, 0, 0, 0, g); ic.position.set(0, 4.95, s * 3.0); });
for (var k = 0; k < 14; k++) {
wSph(0.22, wM(cand[k % 5]), -3.2 + k * 0.5, 3.95, 3.05, g, 8);
}
wBox(1.5, 2.4, 0.15, wM(0x6A3A1A), 0, 1.2, 3.05, g);
[-2.3, 2.3].forEach(function (px) { wBox(1.3, 1.3, 0.12, wM(0xFFE8A0), px, 2.4, 3.05, g); wBox(1.5, 0.12, 0.15, icing, px, 3.1, 3.08, g); });
for (var c = 0; c < 2; c++) {
var cc = new THREE.Group();
cc.position.set(c ? 2.8 : -2.8, 0, 4.2);
g.add(cc);
wCyl(0.12, 0.12, 2.6, new THREE.MeshLambertMaterial({ map: npStripes() }), 0, 1.3, 0, cc, 8);
var hk = wMesh(new THREE.TorusGeometry(0.3, 0.12, 6, 10, Math.PI), new THREE.MeshLambertMaterial({ map: npStripes() }), -0.3, 2.6, 0, cc);
}
var sg = wSign(["The Gingerbread House", "Please don't eat the walls"], 4.2, 1, "#6A3A1A", "#FFF4D8");
sg.position.set(0, 4.5, 3.3);
g.add(sg);
sol.push({ x: x, z: z, r: 4.6 });
})();
for (var c = 0; c < 9; c++) {
[-1, 1].forEach(function (s) {
var x = s * 4.2, z = 48 - c * 3.4;
var p = new THREE.Group();
p.position.set(x, at(x, z), z);
G.add(p);
var st = new THREE.MeshLambertMaterial({ map: npStripes() });
wCyl(0.1, 0.1, 1.6, st, 0, 0.8, 0, p, 8);
var hk = wMesh(new THREE.TorusGeometry(0.22, 0.1, 6, 10, Math.PI), st, s * 0.22, 1.6, 0, p);
});
}
var cols = [0xFF3A3A, 0xFFD24A, 0x3A8AFF, 0x4AE07A, 0xF08AF0];
for (var lp = 0; lp < 12; lp++) {
var a1 = lp / 12 * 6.283, a2 = (lp + 1) / 12 * 6.283, x1 = Math.cos(a1) * 38, z1 = 18 + Math.sin(a1) * 38, x2 = Math.cos(a2) * 38, z2 = 18 + Math.sin(a2) * 38, y1 = npHeight(x1, z1) + 4, y2 = npHeight(x2, z2) + 4;
for (var b = 1; b < 12; b++) {
var t = b / 12, x = x1 + (x2 - x1) * t, z = z1 + (z2 - z1) * t, y = y1 + (y2 - y1) * t - Math.sin(t * Math.PI) * 1.2;
var bl = wSph(0.14, wB(cols[(b + lp) % 5], { fog: false }), x, y, z, G, 6);
NP.lights.push(bl);
}
}
(function () {
var x = 38, z = 58, y = at(x, z);
var ice = wMesh(new THREE.CircleGeometry(13, 40), new THREE.MeshStandardMaterial({ color: 0xBFE4F4, roughness: 0.15, metalness: 0.1 }), x, y + 0.05, z, G);
ice.rotation.x = -Math.PI / 2;
var rim = wMesh(new THREE.TorusGeometry(13, 0.5, 6, 40), wM(0xF6FAFF), x, y + 0.15, z, G);
rim.rotation.x = Math.PI / 2;
var sg = wSign(["Frost Pond", "Skating every day"], 3, 0.8, "#2A4A6A", "#FFF4D8");
sg.position.set(x - 14, y + 1.6, z);
sg.rotation.y = Math.PI / 2;
G.add(sg);
for (var k = 0; k < 3; k++) {
var e = wPerson("elf_sk" + k, { elf: 1, sex: k % 2 ? "f" : "m" });
e.position.set(x + 8, y + 0.06, z);
G.add(e);
WDR.skaters.push({ g: e, cx: x, cz: z, y: y + 0.06, r: 5 + k * 2.5, a: k * 2.1, sp: 0.5 + k * 0.12 });
}
})();
[[-18, 40], [22, 36], [-48, 22], [62, 30], [-8, 70], [16, 74], [-70, 60], [80, 60]].forEach(function (q, i) {
var x = q[0], z = q[1], g = new THREE.Group();
g.position.set(x, at(x, z), z);
g.rotation.y = R() * 6;
G.add(g);
var sn = wM(0xF8FBFF);
wSph(0.8, sn, 0, 0.7, 0, g, 12);
wSph(0.58, sn, 0, 1.75, 0, g, 12);
wSph(0.4, sn, 0, 2.5, 0, g, 12);
var nose = wCone(0.07, 0.35, wM(0xF08A2A), 0, 2.5, 0.5, g, 6);
nose.rotation.x = Math.PI / 2;
[-1, 1].forEach(function (s) { wSph(0.05, wM(0x141414), s * 0.13, 2.62, 0.35, g, 6); var arm = wCyl(0.03, 0.03, 1, wM(0x5A3A22), s * 0.75, 1.9, 0, g, 5); arm.rotation.z = s * 1.1; });
var sc = wCyl(0.45, 0.45, 0.15, wM([0xC82A2A, 0x2A6A3A, 0x2A4A8A][i % 3]), 0, 2.15, 0, g, 12);
if (i % 2) {
wCyl(0.32, 0.32, 0.06, wM(0x141414), 0, 2.85, 0, g, 12);
wCyl(0.22, 0.22, 0.45, wM(0x141414), 0, 3.1, 0, g, 12);
}
sol.push({ x: x, z: z, r: 0.9 });
});
(function () {
var x = -82, z = 40, g = new THREE.Group();
g.position.set(x, at(x, z), z);
g.rotation.y = 1.2;
G.add(g);
var ice = wM(0xEAF4FF);
var dome = wMesh(new THREE.SphereGeometry(3.4, 18, 10, 0, Math.PI * 2, 0, Math.PI / 2), ice, 0, 0, 0, g);
for (var r = 1; r < 5; r++) {
var ring = wMesh(new THREE.TorusGeometry(3.4 * Math.cos(r * 0.33), 0.04, 4, 24), wM(0xC8D8EA), 0, 3.4 * Math.sin(r * 0.33), 0, g);
ring.rotation.x = Math.PI / 2;
}
var tun = wMesh(new THREE.CylinderGeometry(1.1, 1.1, 2.2, 12, 1, false, 0, Math.PI), ice, 0, 0, 3.6, g);
tun.rotation.x = Math.PI / 2;
tun.rotation.y = Math.PI / 2;
tun.rotation.order = "YXZ";
wMesh(new THREE.CircleGeometry(0.85, 12, 0, Math.PI), wB(0x1A2A3A), 0, 0.02, 4.72, g);
sol.push({ x: x, z: z, r: 3.6 });
})();
for (var p = 0; p < 16; p++) {
var x = (R() - 0.5) * 14, z = -24 + R() * 5, s = 0.5 + R() * 0.7, g = new THREE.Group();
g.position.set(x, at(x, z), z);
g.rotation.y = R() * 3;
G.add(g);
wBox(s, s, s, wM([0xC83A3A, 0x3A7AC8, 0x3AA85A, 0xE8C83A, 0xA84AC8][p % 5]), 0, s / 2, 0, g);
wBox(s + 0.02, s + 0.02, 0.1, wM(0xF4F0E8), 0, s / 2, 0, g);
wBox(0.1, s + 0.02, s + 0.02, wM(0xF4F0E8), 0, s / 2, 0, g);
}
[-9, 9].forEach(function (x) {
var z = -25, g = new THREE.Group();
g.position.set(x, at(x, z), z);
G.add(g);
wCyl(0.32, 0.32, 1.1, wM(0x1A2A6A), 0, 1.3, 0, g, 10);
wCyl(0.33, 0.33, 0.15, wM(0xF4F0E8), 0, 1.2, 0, g, 10);
wBox(0.25, 0.8, 0.3, wM(0xF4F4F4), -0.12, 0.4, 0, g);
wBox(0.25, 0.8, 0.3, wM(0xF4F4F4), 0.12, 0.4, 0, g);
wSph(0.24, wM(0xF0C8A8), 0, 2.05, 0, g, 10);
wCyl(0.26, 0.26, 0.7, wM(0x141414), 0, 2.5, 0, g, 10);
wSph(0.05, wM(0xE83A3A), 0.2, 2.05, 0.1, g, 6);
wSph(0.05, wM(0xE83A3A), -0.2, 2.05, 0.1, g, 6);
wCyl(0.03, 0.03, 1.8, wM(0x8A8A8A), 0.5, 1.4, 0, g, 5);
sol.push({ x: x, z: z, r: 0.6 });
});
for (var m = 0; m < 26; m++) {
var a = m / 26 * 6.283 + R() * 0.1, d = 900 + R() * 250, x = Math.cos(a) * d, z = Math.sin(a) * d, h = 120 + R() * 160, r = 150 + R() * 120;
var mt = new THREE.Group();
mt.position.set(x, -5, z);
G.add(mt);
wCone(r, h, wM(0xB8C8DC), 0, h / 2, 0, mt, 7);
wCone(r * 0.42, h * 0.42, wM(0xF6FAFF), 0, h * 0.79, 0, mt, 7);
}
},
function (G) {
G.children.forEach(function (c) { if (c.isGroup && Math.abs(c.position.x + 44) < 0.01 && Math.abs(c.position.z - 14) < 0.01)
SLE.parked = c; });
var g = SLE.parked ? SLE.parked.clone() : new THREE.Group();
g.position.set(0, 0, 0);
g.rotation.set(0, 0, 0);
var ride = new THREE.Group();
ride.add(g);
ride.visible = false;
G.add(ride);
SLE.g = ride;
var names = ["Rudolph", "Dasher", "Dancer", "Prancer", "Vixen", "Comet", "Cupid", "Donner", "Blitzen"], gold = wM(0xE8C040, { e: 0x3A2A08, ei: 0.4 }), strap = wM(0x8A2A1A);
SLE.team = [];
names.forEach(function (n, i) { var rd = npReindeer(n, n === "Rudolph"), row = i === 0 ? 4 : Math.ceil(i / 2) - 1, x = i === 0 ? 0 : (i % 2 ? -0.75 : 0.75); rd.position.set(x, 0.2, 4.4 + (4 - row) * 2.5 + (i === 0 ? 0.6 : 0)); rd.scale.setScalar(0.9); ride.add(rd); SLE.team.push({ g: rd, ph: i * 0.9 }); });
[-0.75, 0.75].forEach(function (x) { var r = wBox(0.06, 0.06, 12.2, strap, x, 1.35, 8.7, ride); for (var b = 0; b < 10; b++)
wSph(0.07, gold, x, 1.42, 3 + b * 1.2, ride, 6); });
var l = new THREE.PointLight(0xFFD890, 1.2, 40, 1.5);
l.position.set(0, 3, 2.2);
ride.add(l);
},
function () {
if (!SLE.g)
return;
SLE.on = true;
SLE.x = -44;
SLE.z = 14;
SLE.y = npHeight(-44, 14);
SLE.h = -0.4 + Math.PI;
SLE.sp = 0;
SLE.vy = 0;
SLE.t = 0;
yaw = SLE.h - Math.PI;
pitch = 0.02;
if (SLE.parked)
SLE.parked.visible = false;
SLE.g.visible = true;
worldPrompt(null);
worldCard(null);
setStatus("<b>Up you get!</b> “On, Dasher! On, Dancer! On, Prancer and Vixen!” Look where you want to go (or A and D), W for faster, S for slower, Space to climb, C to dive. E (or Back) near the ground to land.");
},
function () {
SLE.on = false;
if (SLE.g)
SLE.g.visible = false;
if (SLE.parked)
SLE.parked.visible = true;
camera.position.set(NP.base - 40.5, npHeight(-40.5, 17.5) + 1.72, 17.5);
yaw = -0.4;
pitch = 0;
setStatus("<b>Down safe in the snow,</b> by the stable. The reindeer stamp and steam. Come back for another go any time.");
if (typeof NP !== "undefined" && NP.talkers)
NP.talkers.forEach(function (T) { if (T.read)
try {
T.read();
}
catch (e) { } });
},
function (dt) {
if (!SLE.on || !SLE.g)
return;
SLE.t += dt;
dt = Math.min(dt, 0.05);
var turn = (keys["KeyA"] ? 1 : 0) - (keys["KeyD"] ? 1 : 0);
if (turn)
yaw += turn * dt * 0.9;
SLE.h = yaw + Math.PI;
var want = keys["KeyW"] ? 34 : keys["KeyS"] ? 6 : 18;
if (SLE.t < 2.5)
want = Math.min(want, SLE.t * 7);
SLE.sp += (want - SLE.sp) * Math.min(1, dt * 0.8);
var gnd = npHeight(SLE.x, SLE.z);
var climb = (keys["Space"] ? 1 : 0) - (keys["KeyC"] ? 1 : 0);
if (SLE.t < 4 && !climb)
climb = 0.6;
SLE.vy += (climb * 9 - SLE.vy) * Math.min(1, dt * 1.5);
SLE.x += -Math.sin(yaw) * SLE.sp * dt;
SLE.z += -Math.cos(yaw) * SLE.sp * dt;
SLE.y += SLE.vy * dt;
var R = Math.hypot(SLE.x, SLE.z - 18);
if (R > 700) {
SLE.x *= 700 / R;
SLE.z = 18 + (SLE.z - 18) * 700 / R;
yaw += dt * 0.8;
}
if (SLE.y < gnd) {
SLE.y = gnd;
SLE.vy = Math.max(0, SLE.vy);
}
if (SLE.y > gnd + 260)
SLE.y = gnd + 260;
var g = SLE.g;
g.position.set(SLE.x, SLE.y + (SLE.y > gnd + 0.5 ? Math.sin(SLE.t * 2) * 0.25 : 0), SLE.z);
g.rotation.set(0, SLE.h, 0);
g.rotateX(-Math.max(-0.25, Math.min(0.25, SLE.vy * 0.03)));
g.rotateZ(-turn * 0.18);
var air = SLE.y > gnd + 0.5;
SLE.team.forEach(function (d) {
var L = d.g.userData.legs || [];
L.forEach(function (l, k) { l.rotation.x = Math.sin(SLE.t * (air ? 7 : 9) + d.ph + (k % 2 ? Math.PI : 0) + (k > 1 ? Math.PI / 2 : 0)) * (SLE.sp > 1 ? 0.7 : 0.1); });
d.g.position.y = 0.2 + (air ? Math.sin(SLE.t * 7 + d.ph) * 0.15 : 0);
if (d.g.userData.nose)
d.g.userData.nose.material.color.setHSL(0, 1, 0.6);
});
var sx = 0, sy = 3.3, sz = -0.6, c = Math.cos(SLE.h), sn = Math.sin(SLE.h);
camera.position.set(NP.base + SLE.x + sx * c + sz * sn, SLE.y + sy, SLE.z - sx * sn + sz * c);
if (typeof flyY !== "undefined")
flyY = SLE.y;
if (SLE.sp > 2 && SLE.t - SLE.bells > 0.45 && typeof AudioContext !== "undefined") {
SLE.bells = SLE.t;
try {
sleBell();
}
catch (e) { }
}
var alt = Math.round(SLE.y - gnd);
worldBanner("<b>Santa's sleigh</b> · " + (air ? alt + " m up" : "on the snow") + " · " + Math.round(SLE.sp * 3.6) + " km/h");
if (!air || alt < 6)
worldPrompt("<b>Land here?</b> · <b>press E</b> to bring the sleigh down by the stable", sleLand);
else
worldPrompt(null);
},
function () {
if (typeof audio === "undefined" || !audio.on || !audio.ctx)
return;
var ac = audio.ctx, t = ac.currentTime;
[2637, 3136, 3520].forEach(function (f, i) {
var o = ac.createOscillator(), v = ac.createGain();
o.type = "sine";
o.frequency.value = f * (0.98 + Math.random() * 0.04);
v.gain.setValueAtTime(0.0001, t + i * 0.04);
v.gain.exponentialRampToValueAtTime(0.03, t + i * 0.04 + 0.005);
v.gain.exponentialRampToValueAtTime(0.0001, t + i * 0.04 + 0.35);
o.connect(v);
v.connect(audio.master || ac.destination);
o.start(t + i * 0.04);
o.stop(t + i * 0.04 + 0.4);
});
}
];
});
