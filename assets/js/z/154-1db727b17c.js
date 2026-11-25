/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(154, function () {
"use strict";
return [
function (mat, col) {
var key = mat.uuid + ":dye:" + col, M = HDF.mats[key];
if (M)
return M;
M = mat.clone();
M.skinning = mat.skinning;
var img = mat.map && mat.map.image;
if (img && img.width) {
try {
hdfGreyMat(M, mat, "dye", col);
}
catch (e) {
M.color.setHex(col);
}
}
else
M.color.setHex(col);
M.needsUpdate = true;
return (HDF.mats[key] = M);
},
function (t) {
if (typeof presenceOthers === "undefined" || !t.home)
return false;
var now = Date.now();
for (var id in presenceOthers) {
var p = presenceOthers[id];
if (!p || !p.group)
continue;
if (p.seen && now - p.seen > (typeof PRESENCE_STALE !== "undefined" ? PRESENCE_STALE : 20000))
continue;
var q = p.group.position;
if (Math.hypot(q.x - t.home.x, q.z - t.home.z) < 28)
return true;
}
return false;
},
function (text) {
if (LIVE_SIGNS[text])
return LIVE_SIGNS[text];
var c = document.createElement("canvas");
c.width = 256;
c.height = 140;
var x = c.getContext("2d");
x.fillStyle = "#E9DDBF";
x.fillRect(0, 0, 256, 140);
x.strokeStyle = "#5A3A22";
x.lineWidth = 10;
x.strokeRect(5, 5, 246, 130);
x.fillStyle = "#3A2416";
x.textAlign = "center";
x.textBaseline = "middle";
var words = String(text).split(" "), lines = [], cur = "";
x.font = "700 34px Georgia, serif";
words.forEach(function (w) { var t = cur ? cur + " " + w : w; if (x.measureText(t).width > 220 && cur) {
lines.push(cur);
cur = w;
}
else
cur = t; });
if (cur)
lines.push(cur);
var size = lines.length > 2 ? 24 : 34;
x.font = "700 " + size + "px Georgia, serif";
lines.slice(0, 3).forEach(function (l, i) { x.fillText(l, 128, 70 + (i - (Math.min(3, lines.length) - 1) / 2) * size * 1.1); });
var tex = new THREE.CanvasTexture(c);
tex.anisotropy = 4;
LIVE_SIGNS[text] = tex;
return tex;
},
function (I) {
if (!I || !I.root || typeof texOf !== "function")
return;
var root = I.root, spec = I.spec || {}, what = String(spec.archetype || "") + " " + String(spec.workplace || "") + " " + String(spec.name || "");
var cosy = LIVE_COSY.test(what) && !LIVE_GRAND.test(what), grand = LIVE_GRAND.test(what);
var plaster = texOf("plaster"), wood = texOf("wood"), marble = texOf("marble");
var panelMat = new THREE.MeshLambertMaterial({ color: grand ? 0xD8D2C6 : 0x6A4428, map: grand ? marble : wood });
var railMat = new THREE.MeshLambertMaterial({ color: grand ? 0xB89A5A : 0x4A2E1A, map: wood });
var top = null, walls = [], floors = [];
root.children.forEach(function (m) {
if (!m.isMesh || !m.geometry || m.geometry.type !== "BoxGeometry" || m.userData.furn || m.userData.liveDone)
return;
var p = m.geometry.parameters, w = p.width, h = p.height, d = p.depth;
if (Math.abs(w - 1.7) < 0.01 && Math.abs(h - 2.25) < 0.01)
return;
if (h <= 0.45 && w > 3 && d > 3) {
floors.push(m);
if (!top || m.position.y > top.position.y)
top = m;
return;
}
if (h >= 0.6 && Math.min(w, d) <= 0.3)
walls.push(m);
});
floors.forEach(function (m) {
if (m === top && m.position.y > 2)
return;
var mat = m.material;
if (!mat || !mat.color)
return;
if (mat.map) {
if (liveUnmetred(m.geometry)) {
var q = m.geometry.parameters;
metreUVs(m.geometry, "box", [q.width, q.height, q.depth]);
}
return;
}
var kind = null, c = mat.color.getHex();
Object.keys(FLOORCOL).forEach(function (k) { if (FLOORCOL[k] === c)
kind = k; });
var tx = texOf((kind === "checker" || kind === "tile") ? "floortile" : kind === "carpet" ? "plaster" : kind || "wood");
if (!tx)
return;
var p = m.geometry.parameters;
metreUVs(m.geometry, "box", [p.width, p.height, p.depth]);
mat.map = tx;
mat.needsUpdate = true;
});
var wallMats = {};
walls.forEach(function (m) {
var p = m.geometry.parameters, w = p.width, h = p.height, d = p.depth, base = m.position.y - h / 2;
metreUVs(m.geometry, "box", [w, h, d]);
var mat = m.material;
if (mat && !mat.map && mat.color) {
if (!wallMats[mat.uuid]) {
mat.map = plaster;
mat.needsUpdate = true;
wallMats[mat.uuid] = 1;
}
}
var fh = I.floor || 3.5, rel = base - Math.floor(base / fh + 1e-6) * fh;
if (rel > 1.5)
return;
var horiz = w > d, len = horiz ? w : d, ph = Math.min(1.05, h * 0.4);
var px = horiz ? len : w + 0.05, pz = horiz ? d + 0.05 : len, pg = new THREE.BoxGeometry(px, ph, pz);
metreUVs(pg, "box", [px, ph, pz]);
var panel = new THREE.Mesh(pg, panelMat);
panel.position.set(m.position.x, base + ph / 2, m.position.z);
panel.userData.liveDone = 1;
panel.receiveShadow = true;
root.add(panel);
var rail = new THREE.Mesh(new THREE.BoxGeometry(horiz ? len : w + 0.1, 0.06, horiz ? d + 0.1 : len), railMat);
rail.position.set(m.position.x, base + ph + 0.03, m.position.z);
rail.userData.liveDone = 1;
root.add(rail);
});
if (top && top.position.y > 2) {
var tp = top.geometry.parameters, tm = top.material;
metreUVs(top.geometry, "box", [tp.width, tp.height, tp.depth]);
if (tm && tm.color) {
tm.color.setHex(cosy ? 0xE6DCC8 : 0xF0ECE4);
tm.map = plaster;
tm.needsUpdate = true;
}
var y0 = top.position.y - tp.height / 2;
if (cosy) {
var bm = new THREE.MeshLambertMaterial({ color: 0x5A3A22, map: wood }), n = Math.max(2, Math.round(tp.depth / 2.6));
for (var i = 1; i < n; i++) {
var z = -tp.depth / 2 + i * tp.depth / n;
var g = new THREE.BoxGeometry(tp.width - 1.2, 0.22, 0.26);
metreUVs(g, "box", [tp.width - 1.2, 0.22, 0.26]);
var b = new THREE.Mesh(g, bm);
b.position.set(top.position.x, y0 - 0.11, top.position.z + z);
b.userData.liveDone = 1;
root.add(b);
}
}
else {
var cm = new THREE.MeshLambertMaterial({ color: grand ? 0xC9A868 : 0xD8D2C6 });
[[0, -1], [0, 1], [-1, 0], [1, 0]].forEach(function (s) {
var W2 = tp.width - 1.2, D2 = tp.depth - 1.2, along = s[0] === 0;
var c = new THREE.Mesh(new THREE.BoxGeometry(along ? W2 : 0.18, 0.16, along ? 0.18 : D2), cm);
c.position.set(top.position.x + s[0] * (W2 / 2 - 0.09), y0 - 0.08, top.position.z + s[1] * (D2 / 2 - 0.09));
c.userData.liveDone = 1;
root.add(c);
});
}
}
}
];
});
