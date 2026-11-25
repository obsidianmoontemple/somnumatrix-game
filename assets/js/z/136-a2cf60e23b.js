/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(136, function () {
"use strict";
return [
function (mat, kind) {
var img = mat.map.image, key = (img.src || img.currentSrc || mat.map.uuid) + ":grey:" + kind + ":" + mat.map.encoding, T = HDF_GREY[key];
if (T)
return T;
var cv = document.createElement("canvas"), w = Math.min(img.width, 512), h = Math.min(img.height, 512);
cv.width = w;
cv.height = h;
var x = cv.getContext("2d", { willReadFrequently: true });
x.drawImage(img, 0, 0, w, h);
var d = x.getImageData(0, 0, w, h), p = d.data, sum = 0, n = 0, i, j, l;
if (kind === "skin") {
for (i = 0; i < p.length; i += 16) {
l = 0.3 * p[i] + 0.59 * p[i + 1] + 0.11 * p[i + 2];
if (l > 60) {
sum += l;
n++;
}
}
}
else {
for (i = 0; i < p.length; i += 16) {
sum += 0.3 * p[i] + 0.59 * p[i + 1] + 0.11 * p[i + 2];
n++;
}
}
var avg = kind === "skin" ? (n ? sum / n : 150) : Math.max(30, n ? sum / n : 128);
for (j = 0; j < p.length; j += 4) {
var L = (0.3 * p[j] + 0.59 * p[j + 1] + 0.11 * p[j + 2]) / avg;
if (kind !== "skin")
L = Math.pow(L, 0.6);
p[j] = p[j + 1] = p[j + 2] = Math.min(255, Math.round(127.5 * L));
}
x.putImageData(d, 0, 0);
T = new THREE.CanvasTexture(cv);
T.flipY = mat.map.flipY;
T.encoding = THREE.LinearEncoding;
T.wrapS = mat.map.wrapS;
T.wrapT = mat.map.wrapT;
T.__srgb = mat.map.encoding === THREE.sRGBEncoding;
return (HDF_GREY[key] = T);
},
function (M, mat, kind, col) {
var T = hdfGreyTex(mat, kind), c = new THREE.Color(col);
if (T.__srgb) {
M.onBeforeCompile = hdfGreyShaderSrgb;
M.customProgramCacheKey = function () { return "hdfGreyS"; };
}
else {
M.onBeforeCompile = hdfGreyShaderLin;
M.customProgramCacheKey = function () { return "hdfGreyL"; };
}
M.map = T;
M.color.copy(c);
if (!M.userData.hdfGrey) {
M.userData.hdfGrey = 1;
M.clone = hdfGreyClone;
}
},
function (mat, col) {
var key = mat.uuid + ":skin:" + col, M = HDF.mats[key];
if (M)
return M;
M = mat.clone();
M.skinning = mat.skinning;
var img = mat.map && mat.map.image;
if (img && img.width) {
try {
hdfGreyMat(M, mat, "skin", col);
}
catch (e) {
M.color.multiply(new THREE.Color(col));
}
}
else
M.color.multiply(new THREE.Color(col));
M.needsUpdate = true;
return (HDF.mats[key] = M);
},
function (mesh, L, part) {
var conv = function (m) {
var c = hdfColourFor(m.name, L);
if (c && c.skin !== undefined)
return hdfSkinMat(m, c.skin);
if (c && c.tint !== undefined)
return hdfTint(m, c.tint, c.k);
if (part) {
var col = /legs/.test(part) ? L.bottom : /feet/.test(part) ? L.shoes : /hood/.test(part) ? (L.hatColor != null ? L.hatColor : L.top) : L.top;
if (col != null)
return hdfTint(m, col, /feet/.test(part) ? 0.5 : 0.6);
}
return m;
};
mesh.material = Array.isArray(mesh.material) ? mesh.material.map(conv) : conv(mesh.material);
},
function (m) {
var G = m.geometry;
if (G.userData.hdfHead)
return G.userData.hdfHead;
var keepB = {};
m.skeleton.bones.forEach(function (b, i) { if (/^(Head|head|neck_01|neck)$/i.test(b.name))
keepB[i] = 1; });
var si = G.attributes.skinIndex, sw = G.attributes.skinWeight, ix = G.index, n = ix ? ix.count : G.attributes.position.count;
function headish(v) {
var w = 0;
if (keepB[si.getX(v)])
w += sw.getX(v);
if (keepB[si.getY(v)])
w += sw.getY(v);
if (keepB[si.getZ(v)])
w += sw.getZ(v);
if (keepB[si.getW(v)])
w += sw.getW(v);
return w > 0.5;
}
var out = [];
for (var t = 0; t < n; t += 3) {
var a = ix ? ix.getX(t) : t, b = ix ? ix.getX(t + 1) : t + 1, c = ix ? ix.getX(t + 2) : t + 2;
if (headish(a) || headish(b) || headish(c))
out.push(a, b, c);
}
var H = G.clone();
H.setIndex(out);
H.clearGroups();
H.addGroup(0, out.length, 0);
G.userData.hdfHead = H;
return H;
},
function (mesh, hb, headOnly) {
var G = mesh.geometry, key = hb.name + (headOnly ? ":skull" : ":all");
G.userData.hdfBox = G.userData.hdfBox || {};
if (G.userData.hdfBox[key] !== undefined)
return G.userData.hdfBox[key];
var box = null;
try {
var pos = G.attributes.position, ix = G.index, si = G.attributes.skinIndex, sw = G.attributes.skinWeight;
var hi = mesh.skeleton.bones.indexOf(hb), inv = new THREE.Matrix4().copy(hb.matrixWorld).invert(), v = new THREE.Vector3(), seen = {};
box = new THREE.Box3();
var n = ix ? ix.count : pos.count;
for (var t = 0; t < n; t++) {
var k = ix ? ix.getX(t) : t;
if (seen[k])
continue;
seen[k] = 1;
if (headOnly && hi >= 0) {
var w = 0;
if (si.getX(k) === hi)
w += sw.getX(k);
if (si.getY(k) === hi)
w += sw.getY(k);
if (si.getZ(k) === hi)
w += sw.getZ(k);
if (si.getW(k) === hi)
w += sw.getW(k);
if (w < 0.6)
continue;
}
v.fromBufferAttribute(pos, k);
mesh.boneTransform(k, v);
v.applyMatrix4(mesh.matrixWorld).applyMatrix4(inv);
box.expandByPoint(v);
}
if (box.isEmpty())
box = null;
}
catch (e) {
box = null;
}
return (G.userData.hdfBox[key] = box);
},
function (E) {
if (E.model) {
if (E.model.parent)
E.model.parent.remove(E.model);
HDF.shown = Math.max(0, HDF.shown - 1);
try {
E.model.traverse(function (m) { if (m.isSkinnedMesh && m.skeleton && m.skeleton.boneTexture)
m.skeleton.dispose(); });
}
catch (e) { }
}
if (E.mixer) {
E.mixer.stopAllAction();
try {
E.mixer.uncacheRoot(E.mixer.getRoot());
}
catch (e) { }
}
E.cur = null;
(E.hid || []).forEach(function (m) { m.visible = true; });
(E.hats || []).forEach(function (m) {
if (m.userData.hdfMat) {
m.material = m.userData.hdfMat;
m.userData.hdfMat = null;
}
var H = m.userData.hdfHat;
if (H) {
H.par.add(m);
m.position.copy(H.pos);
m.quaternion.copy(H.quat);
m.scale.copy(H.scale);
m.userData.hdfHat = null;
m.userData.hdfY = null;
return;
}
if (m.userData.hdfY != null) {
m.position.y = m.userData.hdfY;
m.userData.hdfY = null;
}
});
(E.backs || []).forEach(function (m) { var H = m.userData.hdfBack; if (H) {
H.par.add(m);
m.position.copy(H.pos);
m.quaternion.copy(H.quat);
m.scale.copy(H.scale);
m.userData.hdfBack = null;
} });
E.backs = null;
(E.icons || []).forEach(function (r) { r.parent.add(r.o); r.o.position.copy(r.pos); r.o.quaternion.copy(r.quat); r.o.scale.copy(r.scale); });
(E.robes || []).forEach(function (m) { if (m.userData.hdfRobe) {
m.scale.x /= 1.2;
m.scale.z /= 1.4;
m.userData.hdfRobe = 0;
} });
E.robes = null;
E.icons = null;
E.hats = null;
E.model = null;
E.mixer = null;
E.acts = null;
E.hid = null;
E.state = null;
E.asked = false;
E.shrink = null;
E.bshJ = null;
}
];
});
