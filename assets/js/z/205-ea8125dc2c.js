/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(205, function () {
return [
function () {
if (BD.mat)
return BD.mat;
BD.mat = {
horn: new THREE.MeshStandardMaterial({ color: 0xF3E8CC, roughness: 0.35, metalness: 0.12 }),
band: new THREE.MeshStandardMaterial({ color: 0xD8B45C, roughness: 0.3, metalness: 0.55 }),
fea: new THREE.MeshLambertMaterial({ color: 0xF8F6F0, side: THREE.DoubleSide }),
fea2: new THREE.MeshLambertMaterial({ color: 0xEDE8DC, side: THREE.DoubleSide }),
fea3: new THREE.MeshLambertMaterial({ color: 0xE2DCCD, side: THREE.DoubleSide })
};
return BD.mat;
},
function (g, root) {
var p = g.position.clone(), r = g.rotation.clone(), s = g.scale.clone();
g.position.set(0, 0, 0);
g.rotation.set(0, 0, 0);
g.scale.set(1, 1, 1);
g.updateMatrixWorld(true);
var b = new THREE.Box3(), v = new THREE.Vector3(), pts = [];
root.traverse(function (m) {
var pos = m.isMesh && m.geometry && m.geometry.attributes.position;
if (!pos)
return;
for (var i = 0; i < pos.count; i += 2) {
v.fromBufferAttribute(pos, i).applyMatrix4(m.matrixWorld);
b.expandByPoint(v);
pts.push(v.x, v.y, v.z);
}
});
var head = null;
root.traverse(function (n) { if (!head && n.name === "Head")
head = n; });
var hp = head ? head.getWorldPosition(new THREE.Vector3()) : null;
g.position.copy(p);
g.rotation.copy(r);
g.scale.copy(s);
g.updateMatrixWorld(true);
if (b.isEmpty())
return null;
var c = b.getCenter(new THREE.Vector3()), sz = b.getSize(new THREE.Vector3());
var ax = sz.x >= sz.z ? "x" : "z", f = 1;
if (hp)
f = (hp[ax] - c[ax]) >= 0 ? 1 : -1;
else {
var hiE = -1e9, hiAt = 0;
for (var i = 0; i < pts.length; i += 3) {
if (pts[i + 1] > hiE) {
hiE = pts[i + 1];
hiAt = ax === "x" ? pts[i] : pts[i + 2];
}
}
f = hiAt >= c[ax] ? 1 : -1;
}
return { b: b, c: c, sz: sz, ax: ax, f: f, hp: hp, pts: pts };
},
function (g, M) {
var H = M.sz.y, A = M.ax, f = M.f, L = Math.max(M.sz.x, M.sz.z), mt = bdMats();
var hy = M.hp ? M.hp.y : M.b.max.y - H * 0.15, best = -1e9, mu = null, P = M.pts;
for (var i = 0; i < P.length; i += 3) {
if (P[i + 1] < hy - H * 0.25)
continue;
var d = (A === "x" ? P[i] : P[i + 2]) * f;
if (d > best) {
best = d;
mu = [P[i], P[i + 1], P[i + 2]];
}
}
var hp = M.hp || new THREE.Vector3(mu[0] - (A === "x" ? f * L * 0.12 : 0), hy, mu[2] - (A === "z" ? f * L * 0.12 : 0));
var fx = hp.x + (mu[0] - hp.x) * 0.3, fz = hp.z + (mu[2] - hp.z) * 0.3, fy = bdTop(M, fx, fz, H * 0.06);
var len = H * 0.2, rad = H * 0.032;
var horn = new THREE.Group();
horn.name = "bd-horn";
var cone = new THREE.Mesh(new THREE.ConeGeometry(rad, len, 18, 1), mt.horn);
cone.position.y = len / 2;
horn.add(cone);
var pts = [];
for (var k = 0; k <= 60; k++) {
var t = k / 60, y = t * len * 0.92, rr = rad * (1 - y / len) * 1.04 + 0.002, a = t * Math.PI * 2 * 4.5;
pts.push(new THREE.Vector3(Math.cos(a) * rr, y, Math.sin(a) * rr));
}
var band = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 120, rad * 0.12, 5, false), mt.band);
horn.add(band);
horn.position.set(fx, fy - rad * 0.6, fz);
if (A === "x")
horn.rotation.z = -f * 0.62;
else
horn.rotation.x = f * 0.62;
horn.traverse(function (m) { if (m.isMesh) {
m.castShadow = true;
m.receiveShadow = true;
} });
g.add(horn);
return horn;
},
function (S) {
var mt = bdMats(), w = new THREE.Group();
function feather(len, wid, mat) {
var sh = new THREE.Shape();
sh.moveTo(0, 0);
sh.quadraticCurveTo(wid * 0.62, len * 0.42, wid * 0.18, len);
sh.quadraticCurveTo(0, len * 1.02, -wid * 0.18, len);
sh.quadraticCurveTo(-wid * 0.5, len * 0.4, 0, 0);
var gm = new THREE.ShapeGeometry(sh, 6);
gm.rotateX(-Math.PI / 2);
return new THREE.Mesh(gm, mat);
}
var rows = [{ n: 14, l0: 0.52, l1: 0.95, w: 0.2, y: 0, m: mt.fea }, { n: 12, l0: 0.34, l1: 0.5, w: 0.19, y: 0.012, m: mt.fea2 }, { n: 10, l0: 0.2, l1: 0.28, w: 0.18, y: 0.024, m: mt.fea3 }];
rows.forEach(function (R) {
for (var i = 0; i < R.n; i++) {
var t = (i + 0.5) / R.n, ln = S * (R.l0 + (R.l1 - R.l0) * Math.pow(t, 1.4));
var q = feather(ln, S * R.w, R.m);
q.position.set(t * S, R.y * S, 0);
q.rotation.y = -t * t * 0.4;
w.add(q);
}
});
var arm = new THREE.Mesh(new THREE.CylinderGeometry(S * 0.028, S * 0.04, S, 8), mt.fea2);
arm.rotation.z = Math.PI / 2;
arm.position.set(S / 2, S * 0.02, S * 0.02);
w.add(arm);
w.traverse(function (m) { if (m.isMesh) {
m.castShadow = true;
m.receiveShadow = true;
} });
return w;
},
function (g, M) {
var H = M.sz.y, A = M.ax, f = M.f, L = Math.max(M.sz.x, M.sz.z), W = Math.min(M.sz.x, M.sz.z);
var wx = M.c.x + (A === "x" ? f * L * 0.12 : 0), wz = M.c.z + (A === "z" ? f * L * 0.12 : 0), wy = bdTop(M, wx, wz, H * 0.08);
var root = new THREE.Group();
root.name = "bd-wings";
root.position.set(wx, wy - H * 0.03, wz);
root.rotation.y = A === "z" ? (f > 0 ? 0 : Math.PI) : (f > 0 ? Math.PI / 2 : -Math.PI / 2);
var S = H * 0.78;
[-1, 1].forEach(function (sd) {
var hinge = new THREE.Group();
hinge.position.set(sd * W * 0.22, 0, 0);
var wing = bdWing(S);
if (sd < 0) {
wing.scale.x = -1;
}
hinge.add(wing);
hinge.rotation.set(0, sd * 0.38, sd * 0.95, "YXZ");
root.add(hinge);
});
g.add(root);
return root;
},
function (o, b, margin, ang) {
var cx = (b.min.x + b.max.x) / 2, cz = (b.min.z + b.max.z) / 2, hx = (b.max.x - b.min.x) / 2, hz = (b.max.z - b.min.z) / 2;
var dx = o.x - cx, dz = o.z - cz, d = Math.hypot(dx, dz);
if (d < 0.3) {
var a = ang == null ? 0.7 : ang;
dx = Math.cos(a);
dz = Math.sin(a);
d = 1;
}
dx /= d;
dz /= d;
var t = Math.min(Math.abs(dx) > 1e-3 ? hx / Math.abs(dx) : 1e9, Math.abs(dz) > 1e-3 ? hz / Math.abs(dz) : 1e9);
o.x = cx + dx * (t + margin);
o.z = cz + dz * (t + margin);
},
function (chunk, had) {
try {
var low = String(chunk || "").toLowerCase(), sens = low.split(/[.!?;]+/), ch = 0;
var fresh = store.objects.filter(function (o) { return !had[o.id] && bdIsBeast(o); });
if (!fresh.length)
return;
var things = store.objects.filter(function (o) { return !bdIsBeast(o) && meshes[o.id] && !/^(meadow|grass|field|flowers|lake|sea|river|pond)$/.test(o.archetype || ""); });
fresh.forEach(function (o) {
var lab = String(o.label || o.archetype || "").toLowerCase(), word = lab.split(/\s+/).pop().replace(/s$/, "");
var sen = "";
for (var i = 0; i < sens.length; i++) {
if (sens[i].indexOf(word) > -1) {
sen = sens[i];
break;
}
}
var me = bdBox(o), r = me ? Math.max(me.max.x - me.min.x, me.max.z - me.min.z) / 2 : 1;
var after = sen.slice(Math.max(0, sen.indexOf(word))), m = BD_BY.exec(after), T = null;
if (m) {
var ws = m[1].split(/\s+/).reverse();
for (var w = 0; w < ws.length && !T; w++) {
var q = ws[w].replace(/s$/, "");
if (q.length < 3)
continue;
T = things.filter(function (t) { var tl = String(t.label || "").toLowerCase(); return t !== o && (t.archetype === q || tl === q || tl.split(/\s+/).pop().replace(/s$/, "") === q); })[0] || null;
}
}
var moved = false;
if (T) {
var tb = bdBox(T);
if (tb) {
bdOutside(o, tb, r * 1.3 + 3, Math.atan2(o.z - (tb.min.z + tb.max.z) / 2, o.x - (tb.min.x + tb.max.x) / 2));
moved = true;
}
}
for (var k = 0; k < things.length; k++) {
var t = things[k], K = KIT[t.archetype], b;
if (!K || !/^(structure|vehicle|infra)$/.test(K.cat) || BD_WALK.test(t.archetype || ""))
continue;
var tw = String(t.label || t.archetype || "").toLowerCase().split(/\s+/).pop().replace(/s$/, "");
if (new RegExp("\\b(?:in|inside|within|into|on|upon|atop|onto)\\s+(?:[a-z'-]+\\s+){0,3}" + tw.replace(/[^a-z'-]/g, "")).test(sen))
continue;
b = bdBox(t);
if (!b)
continue;
if (b.max.y - b.min.y < 0.6)
continue;
if (o.x > b.min.x - r * 0.5 && o.x < b.max.x + r * 0.5 && o.z > b.min.z - r * 0.5 && o.z < b.max.z + r * 0.5 && (b.max.x - b.min.x) < 120) {
bdOutside(o, b, r + 1.2);
moved = true;
}
}
if (moved) {
refresh(o);
ch++;
}
});
if (ch && typeof save === "function")
save();
}
catch (e) {
if (window.console)
console.warn("beast-dress place:", e);
}
}
];
});
