/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(352, function () {
"use strict";
return [
function (sh, r) {
var u = this.userData.dyU;
for (var k in u)
sh.uniforms[k] = u[k];
sh.vertexShader = sh.vertexShader.replace("#include <common>", "#include <common>\n" + DYE_VS).replace("#include <begin_vertex>", "#include <begin_vertex>\n\tvDyY = position.y;");
if (typeof whShadowOut === "function")
whShadowOut(sh);
sh.fragmentShader = sh.fragmentShader.replace("#include <common>", "#include <common>\n" + DYE_FS).replace("#include <tonemapping_fragment>", DYE_FRAG + "\n\t#include <tonemapping_fragment>");
},
function (o) {
var tri = o.tri, kind = o.kind || "cloth", shine = kind === "metal" || kind === "gold" || kind === "gem";
var mk = o.mask || null, band = o.band || null;
var key = [tri.join(","), o.zone, kind, o.skin ? 1 : 0, o.map ? o.map.uuid : "", mk ? mk.tex.uuid + ":" + mk.perm.join("") : "", band ? band.map(function (v) { return +v.toFixed(4); }).join(",") : "", o.side == null ? "d" : o.side, dyeLinear() ? 1 : 0].join("|");
var M = DYE.mats[key];
if (M) {
M.userData.dyT = performance.now();
return M;
}
var P = { color: 0xFFFFFF, side: o.side == null ? THREE.DoubleSide : o.side };
if (o.map)
P.map = o.map;
M = shine ? new THREE.MeshPhongMaterial(Object.assign(P, { shininess: kind === "gem" ? 120 : kind === "gold" ? 80 : 40, specular: kind === "metal" ? 0x5A5A5A : 0x8A8A7A })) : new THREE.MeshLambertMaterial(P);
M.skinning = !!o.skin;
M.toneMapped = false;
M.defines = { DYE: "", DYE_MODE: mk ? 1 : 0 };
if (band)
M.defines.DYE_BAND = "";
if (shine)
M.defines.DYE_SPEC = "";
var C = [0, 1, 2].map(function (i) { return dyeCol(tri[i]); });
var zw = new THREE.Vector3(o.zone === 0 ? 1 : 0, o.zone === 1 ? 1 : 0, o.zone === 2 ? 1 : 0);
var means = new THREE.Vector3(0.5, 0.5, 0.5);
if (mk) {
C = mk.perm.map(function (z) { return dyeCol(tri[z]); });
means.set(mk.means[0], mk.means[1], mk.means[2]);
}
else if (o.map) {
var mm = dyeTexMean(o.map);
means.set(mm, mm, mm);
}
M.userData.dyU = { dyC0: { value: C[0] }, dyC1: { value: C[1] }, dyC2: { value: C[2] }, dyZw: { value: zw }, dyMeans: { value: means },
dyBand: { value: band ? new THREE.Vector4(band[0], band[1], band[2], band[3]) : new THREE.Vector4(0, 1, 0, 0) },
dyShade: { value: new THREE.Vector3(DYE.lo, DYE.hi, DYE.full) }, dySpec: { value: kind === "gold" || kind === "gem" ? 0.55 : 0.4 } };
if (mk)
M.userData.dyU.dyMask = { value: mk.tex };
M.onBeforeCompile = dyeCompile;
M.userData.dye = 1;
M.userData.dyT = performance.now();
M.name = "dye " + kind;
DYE.n++;
if (DYE.n % 16 === 0)
dyeTrim();
return (DYE.mats[key] = M);
},
function () {
var ks = Object.keys(DYE.mats);
if (ks.length <= DYE.keep * 4)
return;
ks.sort(function (a, b) { return DYE.mats[a].userData.dyT - DYE.mats[b].userData.dyT; });
var now = performance.now();
ks.slice(0, ks.length - DYE.keep * 3).forEach(function (k) { if (now - DYE.mats[k].userData.dyT > 60000)
delete DYE.mats[k]; });
},
function (tex, max) {
var im = tex && tex.image;
if (!im || !(im.width > 0))
return null;
var w = Math.min(im.width, max), h = Math.min(im.height, max), cv = document.createElement("canvas");
cv.width = w;
cv.height = h;
var x = cv.getContext("2d", { willReadFrequently: true });
try {
x.drawImage(im, 0, 0, w, h);
return { w: w, h: h, d: x.getImageData(0, 0, w, h).data };
}
catch (e) {
return null;
}
},
function (tex) {
if (DYE.means[tex.uuid] != null)
return DYE.means[tex.uuid];
var I = dyeImg(tex, 64), s = 0, n = 0;
if (!I)
return (DYE.means[tex.uuid] = 0.5);
var lin = tex.encoding === THREE.sRGBEncoding || (typeof lookIsPicture === "function" && lookIsPicture(tex));
for (var i = 0; i < I.d.length; i += 4) {
var r = I.d[i], g = I.d[i + 1], b = I.d[i + 2];
s += lin ? dyeLum(dyeLinV(r), dyeLinV(g), dyeLinV(b)) : dyeLum(r / 255, g / 255, b / 255);
n++;
}
return (DYE.means[tex.uuid] = Math.max(0.02, s / Math.max(1, n)));
},
function (tex, geo) {
var k = tex.uuid + ":" + geo.uuid;
if (DYE.masks[k] !== undefined)
return DYE.masks[k];
var phone = (typeof LITE !== "undefined" && LITE) || (typeof HDF_PHONE !== "undefined" && HDF_PHONE), S = phone ? 128 : 256;
var I = dyeImg(tex, S), uv = geo.attributes && geo.attributes.uv;
if (!I || !uv) {
DYE.masks[k] = null;
return null;
}
var W = I.w, H = I.h, N = W * H, flip = tex.flipY;
var cv0 = document.createElement("canvas");
cv0.width = W;
cv0.height = H;
var x0 = cv0.getContext("2d", { willReadFrequently: true });
x0.fillStyle = "#fff";
var idx = geo.index, n = idx ? idx.count : uv.count;
var arr = uv.array, uk = !uv.normalized ? 1 : arr instanceof Uint8Array ? 1 / 255 : arr instanceof Int8Array ? 1 / 127 : arr instanceof Uint16Array ? 1 / 65535 : arr instanceof Int16Array ? 1 / 32767 : 1;
function px(i) { var u = uv.getX(i) * uk, v = uv.getY(i) * uk; u -= Math.floor(u); v -= Math.floor(v); return [u * W, (flip ? 1 - v : v) * H]; }
x0.beginPath();
for (var t = 0; t + 2 < n; t += 3) {
var a = px(idx ? idx.getX(t) : t), b = px(idx ? idx.getX(t + 1) : t + 1), c = px(idx ? idx.getX(t + 2) : t + 2);
x0.moveTo(a[0], a[1]);
x0.lineTo(b[0], b[1]);
x0.lineTo(c[0], c[1]);
x0.closePath();
}
x0.fill();
var cov = x0.getImageData(0, 0, W, H).data;
var P = new Float32Array(N * 3), Lm = new Float32Array(N), use = [];
for (var i = 0; i < N; i++) {
var r = dyeLinV(I.d[i * 4]), g = dyeLinV(I.d[i * 4 + 1]), bl = dyeLinV(I.d[i * 4 + 2]);
P[i * 3] = Math.sqrt(r);
P[i * 3 + 1] = Math.sqrt(g);
P[i * 3 + 2] = Math.sqrt(bl);
Lm[i] = dyeLum(r, g, bl);
if (cov[i * 4] > 127)
use.push(i);
}
if (use.length < 16)
for (var u0 = 0; u0 < N; u0++)
use.push(u0);
var C = [], st = Math.max(1, Math.floor(use.length / 3000)), j0 = use[Math.floor(use.length / 2)];
C.push([P[j0 * 3], P[j0 * 3 + 1], P[j0 * 3 + 2]]);
while (C.length < 3) {
var best = -1, bi = j0;
for (var q = 0; q < use.length; q += st) {
var j = use[q], dm = 1e9;
C.forEach(function (cc) { var d = (P[j * 3] - cc[0]) * (P[j * 3] - cc[0]) + (P[j * 3 + 1] - cc[1]) * (P[j * 3 + 1] - cc[1]) + (P[j * 3 + 2] - cc[2]) * (P[j * 3 + 2] - cc[2]); if (d < dm)
dm = d; });
if (dm > best) {
best = dm;
bi = j;
}
}
C.push([P[bi * 3], P[bi * 3 + 1], P[bi * 3 + 2]]);
}
function near(i) { var bd = 1e9, bc = 0; for (var c = 0; c < 3; c++) {
var dr = P[i * 3] - C[c][0], dg = P[i * 3 + 1] - C[c][1], db = P[i * 3 + 2] - C[c][2], d2 = dr * dr + dg * dg + db * db;
if (d2 < bd) {
bd = d2;
bc = c;
}
} return bc; }
for (var it = 0; it < 10; it++) {
var Sm = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
for (var q2 = 0; q2 < use.length; q2++) {
var i2 = use[q2], l = near(i2);
Sm[l][0] += P[i2 * 3];
Sm[l][1] += P[i2 * 3 + 1];
Sm[l][2] += P[i2 * 3 + 2];
Sm[l][3]++;
}
for (var c2 = 0; c2 < 3; c2++)
if (Sm[c2][3])
C[c2] = [Sm[c2][0] / Sm[c2][3], Sm[c2][1] / Sm[c2][3], Sm[c2][2] / Sm[c2][3]];
}
var lab = new Uint8Array(N);
for (var p = 0; p < N; p++)
lab[p] = near(p);
var R = phone ? 1 : 2, lab2 = new Uint8Array(N);
for (var y = 0; y < H; y++)
for (var xx = 0; xx < W; xx++) {
var cnt = [0, 0, 0];
for (var dy = -R; dy <= R; dy++) {
var yy = Math.min(H - 1, Math.max(0, y + dy));
for (var dx = -R; dx <= R; dx++) {
var x2 = Math.min(W - 1, Math.max(0, xx + dx));
cnt[lab[yy * W + x2]]++;
}
}
lab2[y * W + xx] = cnt[0] >= cnt[1] && cnt[0] >= cnt[2] ? 0 : cnt[1] >= cnt[2] ? 1 : 2;
}
var cv = document.createElement("canvas");
cv.width = W;
cv.height = H;
var x = cv.getContext("2d"), out = x.createImageData(W, H), sum = [0, 0, 0], ct = [0, 0, 0], area = [0, 0, 0];
for (var p2 = 0; p2 < N; p2++) {
var l2 = lab2[p2];
out.data[p2 * 4] = l2 === 0 ? 255 : 0;
out.data[p2 * 4 + 1] = l2 === 1 ? 255 : 0;
out.data[p2 * 4 + 2] = l2 === 2 ? 255 : 0;
out.data[p2 * 4 + 3] = 255;
sum[l2] += Lm[p2];
ct[l2]++;
if (cov[p2 * 4] > 127)
area[l2]++;
}
x.putImageData(out, 0, 0);
var T = new THREE.CanvasTexture(cv);
T.flipY = flip;
T.wrapS = tex.wrapS;
T.wrapT = tex.wrapT;
T.generateMipmaps = false;
T.minFilter = THREE.LinearFilter;
T.magFilter = THREE.LinearFilter;
var covA = area.slice();
var pos = geo.attributes.position;
if (pos) {
area = [0, 0, 0];
var A = new THREE.Vector3(), B = new THREE.Vector3(), Cc = new THREE.Vector3();
for (var t2 = 0; t2 + 2 < n; t2 += 3) {
var ia = idx ? idx.getX(t2) : t2, ib = idx ? idx.getX(t2 + 1) : t2 + 1, ic = idx ? idx.getX(t2 + 2) : t2 + 2;
A.fromBufferAttribute(pos, ia);
B.fromBufferAttribute(pos, ib);
Cc.fromBufferAttribute(pos, ic);
B.sub(A);
Cc.sub(A);
var ar = B.cross(Cc).length();
var pa = px(ia), pb = px(ib), pc = px(ic), cx = Math.min(W - 1, Math.max(0, Math.floor((pa[0] + pb[0] + pc[0]) / 3))), cy = Math.min(H - 1, Math.max(0, Math.floor((pa[1] + pb[1] + pc[1]) / 3)));
area[lab2[cy * W + cx]] += ar;
}
}
var order = [0, 1, 2].sort(function (a2, b2) { return area[b2] - area[a2]; }), perm = [0, 0, 0];
order.forEach(function (c3, z) { perm[c3] = z; });
return (DYE.masks[k] = { tex: T, perm: perm, dbg: { cov: covA, area: area, C: C }, means: [0, 1, 2].map(function (i3) { return ct[i3] ? Math.max(0.02, sum[i3] / ct[i3]) : 0.5; }) });
},
function (geo) {
if (geo.userData.dyA != null)
return geo.userData.dyA;
var P = geo.attributes && geo.attributes.position, I = geo.index, a = 0;
if (!P)
return 0;
var A = new THREE.Vector3(), B = new THREE.Vector3(), C = new THREE.Vector3(), n = I ? I.count : P.count;
for (var i = 0; i + 2 < n; i += 3) {
var ia = I ? I.getX(i) : i, ib = I ? I.getX(i + 1) : i + 1, ic = I ? I.getX(i + 2) : i + 2;
A.fromBufferAttribute(P, ia);
B.fromBufferAttribute(P, ib);
C.fromBufferAttribute(P, ic);
B.sub(A);
C.sub(A);
a += B.cross(C).length() * 0.5;
}
return (geo.userData.dyA = a);
},
function (L) {
var out = [], W = typeof WEAR !== "undefined" ? WEAR : {};
function lab(k, dflt) { return (W[k] && W[k].label) || dflt || String(k); }
function add(slot, piece, label) { if (piece && piece !== "none")
out.push([slot + ":" + piece, slot, label]); }
function worn(slot, k) { return !!k && k !== "none" && (W[k] && W[k].slot === slot || slot === "hat" && /^(cap|brimmed|hood)$/.test(k)); }
var tk = L.topKind || "shirt";
add("top", tk, { shirt: "Your shirt", coat: "Your coat", dress: "Your dress", robe: "Your robe" }[tk] || "Your top");
if (worn("layer", L.layer))
add("layer", L.layer, lab(L.layer));
add("legs", L.bottomKind || "trousers", lab(L.bottomKind || "trousers", "Trousers"));
add("feet", L.shoeKind || "shoes", lab(L.shoeKind || "shoes", "Shoes"));
if (worn("hat", L.hat))
add("hat", L.hat, lab(L.hat, { cap: "Cap", brimmed: "Brimmed hat", hood: "Hood" }[L.hat]));
if (worn("back", L.back))
add("back", L.back, lab(L.back));
["face", "neck", "ears", "hands", "waist"].forEach(function (s) { if (worn(s, L[s]))
add(s, L[s], lab(L[s])); });
if (L.gear && L.gear !== "none")
add("gear", L.gear, { vest: "Vest", belt: "Belt", vestbelt: "Vest and belt", cloak: "Cloak" }[L.gear] || L.gear);
return out;
},
function (L, part) {
part = String(part || "");
if (/-(arms|body)\.glb$/.test(part))
return "top:" + (L.topKind || "shirt");
if (/-legs\.glb$/.test(part))
return "legs:" + (L.bottomKind || "trousers");
if (/-feet(-boots)?\.glb$/.test(part))
return "feet:" + (L.shoeKind || "shoes");
if (/head-hood\.glb$/.test(part))
return L.hat === "hood" ? "hat:hood" : null;
if (/acc-pauldrons?\.glb$/.test(part))
return L.layer === "armor" ? "layer:armor" : null;
return null;
},
function (L, m) {
var u = m.userData || {}, n = u.part === "worn" ? String(u.wk || "").replace(/[\d._]+/g, "") : String(u.part || "");
var slot = DYE_SIMPLE[n];
if (n === "belt")
slot = u.part === "worn" ? "waist" : "gear";
if (!slot)
return null;
if (slot === "hands" && L.hands !== "gloves")
return null;
var piece = slot === "top" ? (L.topKind || "shirt") : slot === "legs" ? (L.bottomKind || "trousers") : slot === "feet" ? (L.shoeKind || "shoes") : L[slot];
if (!piece || piece === "none")
return null;
return slot + ":" + piece;
},
function (mat) {
if (!mat)
return "cloth";
if (mat.isMeshPhongMaterial || mat.isMeshStandardMaterial) {
var sh = mat.shininess != null ? mat.shininess : (mat.metalness > 0.5 ? 60 : 0);
if (mat.metalness > 0.5 || sh >= 25) {
var c = mat.color, hsl = {};
if (c)
c.getHSL(hsl);
return sh >= 100 ? "gem" : (c && hsl.s > 0.3 && hsl.h > 0.08 && hsl.h < 0.17) ? "gold" : "metal";
}
}
return "cloth";
},
function (list) {
var by = {}, order = [];
list.forEach(function (x) { if (!by[x.sig]) {
by[x.sig] = { sig: x.sig, area: 0, dark: !!x.dark };
order.push(by[x.sig]);
} by[x.sig].area += x.area; });
order.sort(function (a, b) { return b.area - a.area; });
var base = order.filter(function (s) { return !s.dark; })[0] || order[0], rest = order.filter(function (s) { return s !== base; });
var trim = rest.filter(function (s) { return s.dark; })[0] || rest[0] || null, Z = {};
Z[base.sig] = 0;
if (trim)
Z[trim.sig] = 1;
rest.forEach(function (s) { if (s !== trim)
Z[s.sig] = 2; });
var band = !trim ? [0.12, 0.06] : rest.length < 2 ? [0, 0.07] : null;
return { z: Z, band: band };
},
function (mesh, L, part) {
var key = dyeHdfKey(L, part), tri = key && dyeOf(L, key);
if (!tri)
return;
var conv = function (m) {
var o = { tri: tri, zone: 0, kind: "cloth", skin: !!mesh.isSkinnedMesh, side: m.side }, map = m.map;
if (map) {
var M = dyeMask(map, mesh.geometry);
o.map = map;
if (M)
o.mask = M;
}
else
o.band = dyeBandOf(mesh.geometry, 0.12, 0.06);
return dyeMat(o);
};
mesh.material = Array.isArray(mesh.material) ? mesh.material.map(conv) : conv(mesh.material);
},
function (list, tri) {
var items = [];
list.forEach(function (m) {
var arr = Array.isArray(m.userData.dyFrom || m.material), mats = arr ? (m.userData.dyFrom || m.material) : [m.userData.dyFrom || m.material];
var s = m.getWorldScale(new THREE.Vector3()), k = Math.abs(s.x * s.y + s.y * s.z + s.x * s.z) / 3, G = m.geometry;
mats.forEach(function (src, mi) {
if (!src || !src.color || src.userData.dye)
return;
if (src.transparent && src.opacity < 0.9 || src.isMeshBasicMaterial || src.blending === THREE.AdditiveBlending || /eye/i.test(src.name || ""))
return;
var img = src.map && src.map.image, uv = G.attributes && G.attributes.uv;
if (img && img.width > 8 && uv) {
var M = dyeMask(src.map, G);
if (M) {
items.push({ m: m, mi: mi, arr: arr, src: src, mask: M });
return;
}
}
var area = dyeArea(G) * k;
if (arr && G.groups && G.groups.length) {
var tot = 0, mine = 0;
G.groups.forEach(function (gr) { tot += gr.count; if (gr.materialIndex === mi)
mine += gr.count; });
area *= tot ? mine / tot : 0;
}
items.push({ m: m, mi: mi, arr: arr, src: src, sig: src.color.getHexString() + "/" + dyeKindOf(src), area: area, dark: false });
});
});
if (!items.length)
return;
var Z = dyeZones(items.filter(function (x) { return !x.mask; }).concat(items.some(function (x) { return !x.mask; }) ? [] : [{ sig: "-", area: 1 }]));
items.forEach(function (x) {
var m = x.m, zone = x.mask ? 0 : (Z.z[x.sig] || 0);
var mat = dyeMat({ tri: tri, zone: zone, kind: dyeKindOf(x.src), skin: !!m.isSkinnedMesh, map: x.src.map || null, side: x.src.side, mask: x.mask || null,
band: !x.mask && zone === 0 && Z.band && !x.arr ? dyeBandOf(m.geometry, Z.band[0], Z.band[1]) : null });
if (!m.userData.dyFrom)
m.userData.dyFrom = m.material;
if (x.arr) {
if (!Array.isArray(m.material) || m.material === m.userData.dyFrom)
m.material = m.userData.dyFrom.slice();
m.material[x.mi] = mat;
}
else
m.material = mat;
});
},
function (g, tri) {
if (!g)
return;
if (!tri) {
if (g.userData.dyeTri) {
g.userData.dyeTri = null;
dyeRestore(g);
}
return;
}
g.userData.dyeTri = tri;
var list = [], kit = g.userData.modelled && g.userData.kitKids ? g.userData.kitKids : null;
g.traverseVisible(function (m) { if (!m.isMesh)
return; if (kit) {
var o = m;
while (o && o !== g) {
if (kit.indexOf(o) >= 0)
return;
o = o.parent;
}
} list.push(m); });
dyeMeshes(list, tri);
g.userData.dyeSig = tri.join(",") + ":" + list.length;
},
function (g, L) {
if (!L || !L.dye)
return;
var groups = {};
g.traverse(function (m) {
if (!m.isMesh || m.userData.hdf || m.userData.wearHd)
return;
var key = dyeSimpleKey(L, m);
if (!key || !dyeOf(L, key))
return;
var mat = Array.isArray(m.material) ? m.material[0] : m.material;
if (mat && mat.color && L.skin != null && mat.color.getHex() === L.skin && !/^hands:/.test(key))
return;
(groups[key] = groups[key] || []).push(m);
});
Object.keys(groups).forEach(function (k) { dyeMeshes(groups[k], dyeOf(L, k)); });
},
function (h) {
var mm = /^fgH(\d+)$/.exec(String(h || ""));
if (!mm || typeof FG === "undefined" || !FG.byId)
return null;
var it = FG.byId[mm[1]], R = it && typeof FG_RB !== "undefined" && FG_RB[it.recipe], A = R && R.x && typeof BW_ARMS !== "undefined" && BW_ARMS[R.x.arm];
if (!A || !A.held)
return null;
var P = typeof wgOf === "function" ? wgOf(it) : null;
return { base: A.held, tier: P ? "wgt_" + P.W.id : R.tier, colour: it.colour == null ? null : it.colour };
},
function () {
try {
if (typeof rebuildMe === "function")
rebuildMe();
}
catch (e) { }
try {
if (typeof showCarried === "function")
showCarried();
}
catch (e) { }
try {
if (typeof BW !== "undefined") {
if (BW.vm) {
scene.remove(BW.vm);
BW.vm = null;
BW.vmKey = null;
}
if (BW.vrHand) {
if (BW.vrHand.parent)
BW.vrHand.parent.remove(BW.vrHand);
BW.vrHand = null;
BW.vrHandKey = null;
}
if (typeof bwVmSet === "function")
bwVmSet();
}
}
catch (e) { }
},
function (L) {
var a = dyePieces(L).map(function (p) { return { key: p[0], label: p[2] }; });
var h = dyeHeldKeyNow();
if (h) {
var nm = "";
try {
var A = ARMS[carrying.archetype];
nm = (A && A.name) || carrying.name || "";
}
catch (e) { }
a.push({ key: "held:" + h, label: "In your hand" + (nm ? ": " + String(nm).replace(/^./, function (c) { return c.toUpperCase(); }) : "") });
}
if (typeof rideArch !== "undefined" && rideArch) {
var rn = "";
try {
var P = typeof WGEAR !== "undefined" && WGEAR.byKey && Object.keys(WGEAR.byKey).map(function (k) { return WGEAR.byKey[k]; }).filter(function (q) { return q.use === "mount" && q.x.arch === rideArch; })[0];
rn = P ? P.name : (KIT[rideArch] && KIT[rideArch].name) || rideArch;
}
catch (e) {
rn = rideArch;
}
a.push({ key: "ride:" + rideArch, label: "What you ride: " + String(rn).replace(/^./, function (c) { return c.toUpperCase(); }) });
}
return a;
},
function (key, zone, col) {
var L = meLook();
if (!L)
return;
if (zone == null) {
if (L.dye)
delete L.dye[key];
}
else {
if (!dyeOk(col))
return;
if (!L.dye || typeof L.dye !== "object")
L.dye = {};
var tri = dyeOf(L, key) || dyeStart(L, key);
tri = tri.slice();
tri[zone] = col;
L.dye[key] = tri;
var f = DYE_FIELD[key.split(":")[0]];
if (zone === 0 && f) {
L[f] = col;
L.src = L.src || {};
L.src[f] = "chosen";
}
var ks = Object.keys(L.dye);
if (ks.length > 40) {
var worn = {};
dyeList(L).forEach(function (p) { worn[p.key] = 1; });
ks.filter(function (k) { return !worn[k]; }).slice(0, ks.length - 40).forEach(function (k) { delete L.dye[k]; });
}
}
try {
var od = dreamer().offDuty;
if (od && od.look) {
od.look.dye = JSON.parse(JSON.stringify(L.dye || {}));
}
}
catch (e) { }
try {
save();
}
catch (e) { }
dyeRedrawMine();
},
function (L) {
var list = dyeList(L);
if (!DYE.sel || !list.some(function (p) { return p.key === DYE.sel; }))
DYE.sel = list.length ? list[0].key : null;
var h = '<p style="font-size:12px;color:var(--dim,#999);margin:0 0 8px;line-height:1.5">Every piece you wear takes three dyes: the <b>base</b> (most of it), the <b>trim</b> (edges, hems, lining, straps, grip) and the <b>accent</b> (buttons, buckles, clasps, gems). The colour you pick is the colour it shows, in any light, and everyone sees it.</p>';
h += '<div style="display:flex;flex-direction:column;gap:4px">';
list.forEach(function (p) {
var tri = dyeOf(L, p.key), on = p.key === DYE.sel;
h += '<button type="button" class="btn" data-dyp="' + p.key + '" style="display:flex;align-items:center;gap:8px;text-align:left;' + (on ? "border-color:var(--bone,#ddd);color:var(--bone,#ddd)" : "") + '">' +
'<span style="flex:1">' + (typeof esc === "function" ? esc(p.label) : p.label) + '</span>' +
(tri ? tri.map(function (c) { return '<span style="width:14px;height:14px;border-radius:2px;border:1px solid rgba(255,255,255,.35);background:' + dyeHex(c) + '"></span>'; }).join("") : '<span style="font-size:11px;opacity:.6">its own colours</span>') + '</button>';
});
h += '</div>';
if (DYE.sel) {
var tri = dyeOf(L, DYE.sel) || dyeStart(L, DYE.sel), z = DYE.zone || 0;
h += '<div style="display:flex;gap:6px;margin:12px 0 6px">' + DYE_ZONES.map(function (n, i) { return '<button type="button" class="btn" data-dyz="' + i + '" style="display:flex;align-items:center;gap:6px;' + (i === z ? "border-color:var(--bone,#ddd);color:var(--bone,#ddd)" : "") + '"><span style="width:14px;height:14px;border-radius:2px;border:1px solid rgba(255,255,255,.35);background:' + dyeHex(tri[i]) + '"></span>' + n + '</button>'; }).join("") + '</div>';
h += '<div class="swatches">' + DYE.pal.map(function (c, i) { return '<button type="button" class="sw' + (c === tri[z] ? " on" : "") + '" data-dyc="' + c + '" title="' + DYE_PAL_NAMES[i] + '" aria-label="' + DYE_PAL_NAMES[i] + '" style="background:' + dyeHex(c) + '"></button>'; }).join("") +
'<input type="color" class="lk-pick" data-dyk="1" value="' + dyeHex(tri[z]).toLowerCase() + '" aria-label="any colour"></div>';
h += '<div style="margin-top:8px;font-size:12px;color:var(--dim,#999)">' + DYE_ZONES[z] + ': <b style="color:var(--bone,#ddd)">' + dyeHex(tri[z]) + '</b>' +
(dyeOf(L, DYE.sel) ? ' &nbsp; <button type="button" class="btn" data-dyr="1" style="font-size:11.5px">Back to its own colours</button>' : '') + '</div>';
}
return h;
}
];
});
