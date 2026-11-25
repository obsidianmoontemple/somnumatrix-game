/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var GLG = { on: true, f: 0, now: 0, reg: new Set(), wait: 0, near: 0, every: 3000, cap: 0, n: { geo: 0, tex: 0, back: 0 }, last: null,
KEYS: ["map", "lightMap", "aoMap", "emissiveMap", "bumpMap", "normalMap", "displacementMap", "roughnessMap", "metalnessMap", "alphaMap", "envMap", "specularMap", "gradientMap", "clearcoatMap", "clearcoatNormalMap", "clearcoatRoughnessMap", "transmissionMap", "sheenColorMap", "matcap"] };
(function () {
function lite() { return typeof LITE !== "undefined" && !!LITE; }
function hook() {
if (!window.THREE || !THREE.EventDispatcher) {
return setTimeout(hook, 30);
}
var P = THREE.EventDispatcher.prototype, add = P.addEventListener, disp = P.dispatchEvent;
P.addEventListener = function (t, f) { if (t === "dispose" && (this.isBufferGeometry || this.isTexture) && !GLG.reg.has(this)) {
GLG.reg.add(this);
this.__gt = GLG.now || performance.now();
if (this.__glg) {
this.__glg = 0;
GLG.n.back++;
}
} return add.apply(this, arguments); };
P.dispatchEvent = function (e) { if (e && e.type === "dispose")
GLG.reg.delete(this); return disp.apply(this, arguments); };
wrap();
}
function stampMat(m, now) {
if (!m)
return;
for (var i = 0, K = GLG.KEYS; i < K.length; i++) {
var t = m[K[i]];
if (t)
t.__gt = now;
}
var u = m.uniforms;
if (u)
for (var k in u) {
var v = u[k] && u[k].value;
if (v && v.isTexture)
v.__gt = now;
else if (Array.isArray(v))
for (var j = 0; j < v.length && j < 8; j++) {
if (v[j] && v[j].isTexture)
v[j].__gt = now;
}
}
}
function wrap() {
if (!window.renderer || !renderer.renderBufferDirect) {
return setTimeout(wrap, 100);
}
if (renderer.__glg)
return;
renderer.__glg = 1;
var rbd = renderer.renderBufferDirect, rnd = renderer.render;
renderer.render = function (sc) {
GLG.now = performance.now();
GLG.f++;
if (sc) {
var b = sc.background, e = sc.environment;
if (b && b.isTexture)
b.__gt = GLG.now;
if (e && e.isTexture)
e.__gt = GLG.now;
}
return rnd.apply(this, arguments);
};
renderer.renderBufferDirect = function (cam, sc, geo, mat, obj, grp) {
var now = GLG.now;
if (geo)
geo.__gt = now;
if (Array.isArray(mat))
for (var i = 0; i < mat.length; i++)
stampMat(mat[i], now);
else
stampMat(mat, now);
if (obj && obj.skeleton && obj.skeleton.boneTexture)
obj.skeleton.boneTexture.__gt = now;
return rbd.apply(this, arguments);
};
setInterval(sweep, GLG.every);
share();
}
var IMG = new WeakMap(), imgN = 0;
function imgId(im) { var i = IMG.get(im); if (!i) {
i = ++imgN;
IMG.set(im, i);
} return i; }
function shareKey(t) {
if (t.__glgKv === t.version && t.__glgKi === t.image)
return t.__glgK;
var k = null;
if (!t.isCubeTexture && !t.isDataTexture3D && !t.isDataTexture2DArray && !t.isCompressedTexture && plainPicture(t) && t.image && typeof t.image === "object" && !Array.isArray(t.image))
k = [imgId(t.image), t.wrapS, t.wrapT, t.magFilter, t.minFilter, t.format, t.type, t.anisotropy, t.flipY ? 1 : 0, t.premultiplyAlpha ? 1 : 0, t.unpackAlignment, t.encoding, t.generateMipmaps ? 1 : 0, t.internalFormat || ""].join("|");
t.__glgK = k;
t.__glgKv = t.version;
t.__glgKi = t.image;
return k;
}
function share() {
var Pr = renderer.properties, gl = renderer.getContext && renderer.getContext();
if (!Pr || !gl || Pr.__glg)
return;
Pr.__glg = 1;
var REC = new Map(), REF = new Map(), get = Pr.get, del = gl.deleteTexture.bind(gl);
GLG.shared = function () { var n = 0; REF.forEach(function (r) { if (r.n > 1)
n += r.n - 1; }); return n; };
gl.deleteTexture = function (tx) { var r = REF.get(tx); if (r) {
if (--r.n > 0)
return;
REF.delete(tx);
if (REC.get(r.k) === r)
REC.delete(r.k);
} return del(tx); };
function leave(t, p) { var tx = p.__webglTexture; delete p.__webglInit; delete p.__webglTexture; delete p.__version; p.__glgShared = 0; t.removeEventListener("dispose", onGone); if (tx)
gl.deleteTexture(tx); }
function onGone(e) { var t = e.target, p = get.call(Pr, t); if (p.__glgShared)
leave(t, p); Pr.remove(t); }
Pr.get = function (o) {
var p = get.call(Pr, o);
if (!o || !o.isTexture || !GLG.on)
return p;
var k = shareKey(o);
if (p.__webglInit) {
if (p.__glgK !== k) {
var r = REF.get(p.__webglTexture);
if (p.__glgShared)
leave(o, p);
else if (r && r.n > 1) {
r.n--;
if (REC.get(r.k) === r)
REC.delete(r.k);
delete p.__webglInit;
delete p.__webglTexture;
delete p.__version;
}
else if (r) {
REF.delete(p.__webglTexture);
if (REC.get(r.k) === r)
REC.delete(r.k);
}
p.__glgK = k;
}
else if (k && !p.__glgShared && p.__version === o.version && !REC.has(k) && !REF.has(p.__webglTexture)) {
var rr = { k: k, n: 1, tx: p.__webglTexture, mip: p.__maxMipLevel };
REC.set(k, rr);
REF.set(rr.tx, rr);
}
return p;
}
if (!k || !(o.version > 0))
return p;
var rec = REC.get(k);
if (!rec) {
p.__glgK = k;
return p;
}
rec.n++;
p.__webglInit = true;
p.__webglTexture = rec.tx;
p.__version = o.version;
p.__maxMipLevel = rec.mip;
p.__glgShared = 1;
p.__glgK = k;
o.addEventListener("dispose", onGone);
return p;
};
}
function markNear(far, now) {
var cx = camera.position.x, cy = camera.position.y, cz = camera.position.z, f2 = far * far, n = 0;
(function walk(o) {
if (!o.visible)
return;
var g = o.geometry, m = o.material;
if (g && (o.isMesh || o.isLine || o.isPoints || o.isSprite)) {
n++;
var e = o.matrixWorld.elements, dx = e[12] - cx, dy = e[13] - cy, dz = e[14] - cz, r = g.boundingSphere ? g.boundingSphere.radius * Math.max(o.scale.x, o.scale.y, o.scale.z) + Math.hypot(g.boundingSphere.center.x, g.boundingSphere.center.y, g.boundingSphere.center.z) : 0;
if (dx * dx + dy * dy + dz * dz < (far + r) * (far + r)) {
g.__gt = now;
if (Array.isArray(m))
for (var i = 0; i < m.length; i++)
stampMat(m[i], now);
else
stampMat(m, now);
if (o.skeleton && o.skeleton.boneTexture)
o.skeleton.boneTexture.__gt = now;
}
}
var c = o.children;
for (var j = 0; j < c.length; j++)
walk(c[j]);
})(scene);
return n;
}
function plainPicture(t) {
if (t.isVideoTexture || t.isRenderTargetTexture || t.isDepthTexture || t.isCompressedTexture && !t.mipmaps)
return false;
if (!(t.version > 0))
return false;
var im = t.image;
if (!im)
return false;
if (Array.isArray(im))
return im.length && im.every(function (x) { return x && (x.width || x.data); });
return !!(im.data || im.nodeName || typeof ImageBitmap !== "undefined" && im instanceof ImageBitmap || typeof OffscreenCanvas !== "undefined" && im instanceof OffscreenCanvas);
}
function plainShape(g) {
if (g.userData && g.userData.keepOnChip)
return false;
if (g.index && !g.index.array)
return false;
for (var k in g.attributes) {
var a = g.attributes[k];
if (!a || !(a.array || a.data && a.data.array))
return false;
}
for (var m in g.morphAttributes) {
var L = g.morphAttributes[m];
for (var i = 0; i < L.length; i++)
if (!L[i] || !L[i].array)
return false;
}
return true;
}
GLG.canLetGo = function (x) { return x.isTexture ? plainPicture(x) : plainShape(x); };
function heavy() { try {
var m = performance.memory;
return !!(m && m.usedJSHeapSize > (GLG.cap || (lite() ? 450 : 900)) * 1048576);
}
catch (e) {
return false;
} }
function sweep() {
if (!GLG.on || !window.camera || document.hidden && !GLG.f)
return;
var now = performance.now(), hv = heavy(), wait = GLG.wait || (hv ? 6000 : (lite() ? 20000 : 45000)), far = GLG.near || Math.max(400, (camera.far || 1000));
if (typeof WLD !== "undefined" && WLD.on && WLD.w && WLD.w.far)
far = Math.max(far, WLD.w.far);
if (hv && typeof WLG !== "undefined" && typeof WORLDS !== "undefined" && typeof worldLetGo === "function")
for (var wk in WLG.t) {
var W = WORLDS[wk];
if (W && W.g && WLD.on !== wk) {
clearTimeout(WLG.t[wk]);
delete WLG.t[wk];
try {
worldLetGo(wk);
}
catch (e) { }
}
}
var due = 0;
GLG.reg.forEach(function (x) {
if (x.isTexture ? !plainPicture(x) : !plainShape(x)) {
GLG.reg.delete(x);
return;
}
if (now - (x.__gt || 0) >= wait)
due++;
});
if (!due) {
GLG.last = { at: Math.round(now), out: 0, held: GLG.reg.size, heavy: hv };
return;
}
markNear(far, now);
var out = [], left = 800;
GLG.reg.forEach(function (x) { if (left > 0 && now - (x.__gt || 0) >= wait) {
out.push(x);
left--;
} });
for (var i = 0; i < out.length; i++) {
var x = out[i];
try {
x.__glg = 1;
x.dispose();
if (x.isTexture)
GLG.n.tex++;
else
GLG.n.geo++;
}
catch (e) { }
}
GLG.last = { at: Math.round(now), out: out.length, held: GLG.reg.size, heavy: hv };
}
hook();
})();
