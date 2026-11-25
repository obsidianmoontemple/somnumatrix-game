/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(133, function () {
"use strict";
return [
function (map, col) {
var img = map && map.image;
if (!img || !img.width)
return null;
var key = (map.uuid || "") + ":" + col;
if (MODEL_ROOF_TEX[key])
return MODEL_ROOF_TEX[key];
try {
var W = img.width, H = img.height, cv = document.createElement("canvas");
cv.width = W;
cv.height = H;
var x = cv.getContext("2d", { willReadFrequently: true });
x.drawImage(img, 0, 0);
var cw = W / 8, ch = H / 4, tr = (col >> 16) & 255, tg = (col >> 8) & 255, tb = col & 255;
MODEL_BLUE_SHEET.forEach(function (c) {
var x0 = Math.round(c[0] * cw), y0 = Math.round(c[1] * ch), w = Math.round(cw), h = Math.round(ch);
var d = x.getImageData(x0, y0, w, h), A = d.data, rows = [];
for (var yy = 0; yy < h; yy++) {
var q = (yy * w + (w >> 1)) * 4;
rows.push(0.299 * A[q] + 0.587 * A[q + 1] + 0.114 * A[q + 2]);
}
var mid = rows[h >> 1] || 1;
for (var y = 0; y < h; y++) {
var k = Math.max(0.45, Math.min(1.45, rows[y] / mid));
for (var xx = 0; xx < w; xx++) {
var i = (y * w + xx) * 4;
A[i] = Math.min(255, tr * k);
A[i + 1] = Math.min(255, tg * k);
A[i + 2] = Math.min(255, tb * k);
}
}
x.putImageData(d, x0, y0);
});
var t = new THREE.CanvasTexture(cv);
t.flipY = map.flipY;
t.encoding = map.encoding;
t.wrapS = map.wrapS;
t.wrapT = map.wrapT;
t.magFilter = map.magFilter;
t.minFilter = map.minFilter;
t.anisotropy = map.anisotropy;
return (MODEL_ROOF_TEX[key] = t);
}
catch (e) {
return null;
}
},
function () {
if (typeof meshes === "undefined" || typeof store === "undefined" || !store.objects)
return;
store.objects.forEach(function (o) {
var g = meshes[o.id];
if (!g)
return;
if (!modelsOn())
modelUnswap(g);
else if (!g.userData.modelled)
modelDress(g, o);
});
try {
if (typeof carrying !== "undefined" && carrying && typeof showCarried === "function")
showCarried();
}
catch (e) { }
}
];
});
