/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(266, function () {
"use strict";
return [
function () {
return whCanvas("tartan", 128, 128, function (x, W, H) {
x.fillStyle = "#ddd";
x.fillRect(0, 0, W, H);
[[0, 24, "rgba(0,0,0,0.35)"], [40, 10, "rgba(0,0,0,0.25)"], [70, 4, "rgba(255,255,255,0.45)"], [90, 16, "rgba(0,0,0,0.3)"]].forEach(function (b) { x.fillStyle = b[2]; x.fillRect(b[0], 0, b[1], H); x.fillRect(0, b[0], W, b[1]); });
});
},
function (a, b) {
var pos = [], idx = [], uv = [], n = Math.min(a.length, b.length);
for (var i = 0; i < n; i++) {
pos.push(a[i].x, a[i].y, a[i].z, b[i].x, b[i].y, b[i].z);
uv.push(i / n, 0, i / n, 1);
if (i < n - 1) {
var p = i * 2;
idx.push(p, p + 1, p + 2, p + 2, p + 1, p + 3);
}
}
var g = new THREE.BufferGeometry();
g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
g.setIndex(idx);
g.computeVertexNormals();
return g;
},
function (D, cloak) {
var s = D.s, yN = (whLm(D, "neck") || {}).y, ua = whLm(D, "upperarm_l"), cf = whLm(D, "calf_l"), yW = (whLm(D, "waist") || {}).y;
if (yN == null || !ua || yW == null)
return null;
var yS = Math.min(ua.y, yN - 0.06 * s), pts = whPts(D, function (q) { return q.r === "torso" || /^upperarm_/.test(q.r) && q.y > yS - 0.1 * s; });
var T = whTube(D, pts, yS - 0.12 * s, yS + 0.04 * s, 0, null, 0, 4);
if (!T)
return null;
var shR = T.R[3], add = 0.04 * s, yHem = cf ? cf.y - (cloak ? 0.28 : 0.18) * s : yS - 1.05 * s;
var cols = 18, rows = 14, a0c = Math.PI * 1.08, a1c = Math.PI * 1.92, a0s = Math.PI * 0.96, a1s = Math.PI * 2.04;
var cpos = [], cuv = [], cidx = [];
for (var r = 0; r <= rows; r++) {
var f = r / rows, yy = yS + 0.02 * s + (yHem - yS - 0.02 * s) * f;
for (var c = 0; c <= cols; c++) {
var g2 = c / cols, mix = Math.min(1, f * 2.2), a = (a0s + (a1s - a0s) * g2) * (1 - mix) + (a0c + (a1c - a0c) * g2) * mix;
var rr = whRAt(shR, a) + add + f * 0.09 * s + Math.pow(f, 2) * 0.05 * s, fold = Math.sin(g2 * Math.PI * 6) * 0.02 * s * f;
cpos.push(T.O.x + Math.cos(a) * (rr + fold), yy, T.O.z + Math.sin(a) * (rr + fold));
cuv.push(g2 * 2, (1 - f) * 2);
}
}
for (var r2 = 0; r2 < rows; r2++)
for (var c2 = 0; c2 < cols; c2++) {
var A = r2 * (cols + 1) + c2, C = A + cols + 1;
cidx.push(A, A + 1, C, A + 1, C + 1, C);
}
var G = new THREE.BufferGeometry();
G.setAttribute("position", new THREE.Float32BufferAttribute(cpos, 3));
G.setAttribute("uv", new THREE.Float32BufferAttribute(cuv, 2));
G.setIndex(cidx);
G.computeVertexNormals();
var col = whTubeAlong(whRingPts(T.O.x, yS + 0.035 * s, T.O.z, shR.map(function (v) { return v * 0.92; }), add * 0.6, Math.PI * 0.9, Math.PI * 2.1), 0.016 * s, false);
var clasps = [];
[-1, 1].forEach(function (sd) { var a = Math.PI / 2 + sd * 0.6, r = whRAt(shR, a) * 0.86 + add * 0.6 + 0.02 * s, d = new THREE.CylinderGeometry(0.024 * s, 0.024 * s, 0.01 * s, 14); d.rotateX(Math.PI / 2); d.translate(T.O.x + Math.cos(a) * r, yS + 0.03 * s, T.O.z + Math.sin(a) * r); clasps.push(d); });
return { geo: G, cols: cols, rows: rows, pivot: new THREE.Vector3(T.O.x, yS + 0.02 * s, T.O.z), collar: col, clasps: whMerge(clasps), bone: whBone(D, "chest") };
},
function (m) {
var H = m.geometry;
if (H.userData.whLegs)
return H.userData.whLegs;
var keep = {};
m.skeleton.bones.forEach(function (b, i) { var r = whRegion(b.name); if (r === "head" || r === "neck" || /^(thigh|calf|foot)_/.test(r) || /^pelvis$/i.test(b.name))
keep[i] = 1; });
var si = H.attributes.skinIndex, sw = H.attributes.skinWeight, P = H.attributes.position, n = P.count, out = [];
var src = null;
try {
Object.keys(HDF.files).forEach(function (f) { var F = HDF.files[f]; if (!src && F && F.scene)
F.scene.traverse(function (o) { if (!src && o.isSkinnedMesh && o.geometry && o.geometry.userData.hdfHead === H)
src = o.geometry; }); });
}
catch (e) { }
if (!src || !src.index)
return null;
var I = src.index;
function ok(v) { var w = 0; if (keep[si.getX(v)])
w += sw.getX(v); if (keep[si.getY(v)])
w += sw.getY(v); if (keep[si.getZ(v)])
w += sw.getZ(v); if (keep[si.getW(v)])
w += sw.getW(v); return w > 0.5; }
for (var t = 0; t < I.count; t += 3) {
var a = I.getX(t), b = I.getX(t + 1), c = I.getX(t + 2);
if (ok(a) && ok(b) && ok(c))
out.push(a, b, c);
}
var G = H.clone();
G.setIndex(out);
G.clearGroups();
G.addGroup(0, out.length, 0);
return (H.userData.whLegs = G);
},
function (E, C, D, bones, L) {
var cl = L.back === "cloak", ck = "cape" + (cl ? "c" : ""), B = C.g[ck];
if (!B) {
B = C.g[ck] = whCapeBuild(D, cl);
if (B) {
whLetGoOfMeasure(B.geo);
whLetGoOfMeasure(B.collar);
whLetGoOfMeasure(B.clasps);
}
}
if (!B || !B.bone)
return;
var bone = bones[B.bone], body = E.g.children[0], i = D.idx[B.bone];
if (!bone || !body || i == null)
return;
if (E.mixer)
E.mixer.update(0);
E.g.updateMatrixWorld(true);
var G = rlFitFrame(bone, body);
G.name = "worn cape";
var M = new THREE.Matrix4().copy(G.matrixWorld).invert().multiply(bone.matrixWorld).multiply(D.inv[i]);
var geo = B.geo.clone();
geo.applyMatrix4(M);
geo.computeVertexNormals();
var pv = B.pivot.clone().applyMatrix4(M);
var col = whCol("back", L), outer = WH.mats["cape:" + col] || (WH.mats["cape:" + col] = (function () { var o = whRigidMat("cloth", col).clone(); o.side = THREE.FrontSide; return o; })());
var inner = WH.mats["lining:" + col] || (WH.mats["lining:" + col] = new THREE.MeshLambertMaterial({ color: wshade(col, 0.62), side: THREE.BackSide }));
var dyc = typeof dyeOf === "function" ? dyeOf(L, "back:" + L.back) : null;
if (dyc) {
outer = dyeMat({ tri: dyc, zone: 0, kind: "cloth", side: THREE.FrontSide });
inner = dyeMat({ tri: dyc, zone: 1, kind: "cloth", side: THREE.BackSide });
}
var pivot = new THREE.Group();
pivot.position.copy(pv);
G.add(pivot);
var m1 = new THREE.Mesh(geo, outer), m2 = new THREE.Mesh(geo, inner);
[m1, m2].forEach(function (m) { m.position.copy(pv).negate(); m.castShadow = true; m.raycast = WH_NORAY; m.userData.hdf = 1; pivot.add(m); });
var cg = B.collar.clone();
cg.applyMatrix4(M);
var cm = new THREE.Mesh(cg, dyc ? dyeMat({ tri: dyc, zone: 1, kind: "cloth" }) : whRigidMat("cloth", wshade(col, 0.75)));
G.add(cm);
if (B.clasps) {
var kg = B.clasps.clone();
kg.applyMatrix4(M);
G.add(new THREE.Mesh(kg, dyc ? dyeMat({ tri: dyc, zone: 2, kind: "gold" }) : whRigidMat("gold", 0xC9A04A)));
}
G.traverse(function (o) { o.userData.hdf = 1; if (o.isMesh) {
o.castShadow = true;
o.raycast = WH_NORAY;
} });
var base = Array.prototype.slice.call(geo.attributes.position.array);
var cap = { geo: geo, base: base, cols: B.cols, rows: B.rows, pivot: pivot, ph: Math.random() * 6, cx: pv.x, cz: pv.z, lean: 0, E: E };
if (typeof RLF !== "undefined")
RLF.capes.push(cap);
E.wh.rigid.push(G);
E.wh.capes.push(cap);
},
function (E) {
var st = E && E.wh;
if (!st)
return;
E.wh = null;
st.meshes.forEach(function (m) { if (m.parent)
m.parent.remove(m); });
st.rigid.forEach(function (m) { if (m.parent)
m.parent.remove(m); });
st.hid.forEach(function (m) { m.visible = true; });
(st.headGeo || []).forEach(function (q) { q[0].geometry = q[1]; });
if (st.feetMat)
st.feetMat[0].material = st.feetMat[1];
(st.mats || []).forEach(function (q) { q[0].material = q[1]; });
if (typeof RLF !== "undefined")
st.capes.forEach(function (c) { var i = RLF.capes.indexOf(c); if (i >= 0)
RLF.capes.splice(i, 1); c.geo.dispose(); });
}
];
});
