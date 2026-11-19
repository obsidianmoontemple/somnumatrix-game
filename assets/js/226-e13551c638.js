/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
var PCU = { far: 260, wide: 0.82, bigR: 5, tall: 65, tallFar: 900, xrFar: 0.75, xrTall: 480, units: [], built: 0, sig: "", t: 0, on: false, haze: 0.003, hidden: 0, ms: 0, tex: 0, texSaved: 0, pr: 0, dts: [], last: 0, eased: 0 };
function pcuSkip(o) {
if (!o || o.isCamera || o.isLight || o.isPoints || o.isSprite)
return true;
if (o.userData && (o.userData.phlChunk || o.userData.sky || o.userData.noCull))
return true;
if (typeof INT !== "undefined" && INT && INT.root === o)
return true;
return false;
}
var PCU_BOX = new THREE.Box3(), PCU_V = new THREE.Vector3(), PCU_S = new THREE.Vector3(), PCU_B2 = new THREE.Box3();
function pcuBoxOf(o, box) {
box.makeEmpty();
o.updateWorldMatrix(false, true);
o.traverse(function (m) {
if (!m.geometry)
return;
if (m.isInstancedMesh && typeof instBounds === "function") {
PCU_B2.copy(instBounds(m).box).applyMatrix4(m.matrixWorld);
box.union(PCU_B2);
return;
}
var g = m.geometry;
if (!g.boundingBox)
g.computeBoundingBox();
if (!g.boundingBox)
return;
PCU_B2.copy(g.boundingBox).applyMatrix4(m.matrixWorld);
box.union(PCU_B2);
});
return box;
}
function pcuCollect(o, out, depth) {
if (pcuSkip(o))
return;
pcuBoxOf(o, PCU_BOX);
if (PCU_BOX.isEmpty())
return;
PCU_BOX.getSize(PCU_S);
var span = Math.max(PCU_S.x, PCU_S.z);
if (span > 260 && o.children && o.children.length && depth < 6) {
for (var i = 0; i < o.children.length; i++)
pcuCollect(o.children[i], out, depth + 1);
return;
}
if (span > 900)
return;
PCU_BOX.getCenter(PCU_V);
o.updateMatrixWorld();
var e = o.matrixWorld.elements;
out.push({ o: o, dx: PCU_V.x - e[12], dz: PCU_V.z - e[14], r: span / 2, tall: PCU_S.y > PCU.tall || (span >= 150 && PCU_S.y >= 25), h: false, own: !!(o.userData && o.userData.pcuOwn), ib: o.isInstancedMesh ? instBounds(o) : null });
}
function pcuSig() { var n = scene.children.length, m = 0, k = 0; for (var i = 0; i < scene.children.length; i++) {
var c = scene.children[i];
m += c.children.length;
k = (k * 31 + c.id) % 1000000007;
} return n + ":" + m + ":" + k; }
function pcuRebuild() {
var t0 = performance.now();
PCU.units.forEach(function (u) { if (u.h) {
u.o.visible = true;
u.h = false;
} });
var out = [];
for (var i = 0; i < scene.children.length; i++)
pcuCollect(scene.children[i], out, 0);
PCU.units = out;
PCU.built = performance.now();
PCU.sig = pcuSig();
pcuClearTall(out);
PCU.ms = performance.now() - t0;
}
function pcuClearTall(units) {
var small = new Set(), tall = new Set();
units.forEach(function (u) { var into = u.tall ? tall : small; u.o.traverse(function (m) { if (!m.material)
return; (Array.isArray(m.material) ? m.material : [m.material]).forEach(function (x) { if (x)
into.add(x); }); }); });
tall.forEach(function (x) { if (!small.has(x) && x.fog !== false) {
x.fog = false;
x.needsUpdate = true;
} });
}
function pcuShrinkTextures() {
var keys = ["map", "normalMap", "roughnessMap", "metalnessMap", "emissiveMap", "aoMap", "bumpMap"], seen = new Set();
scene.traverse(function (o) {
var ms = o.material ? (Array.isArray(o.material) ? o.material : [o.material]) : [];
for (var i = 0; i < ms.length; i++) {
var m = ms[i];
if (!m)
continue;
for (var j = 0; j < keys.length; j++) {
var t = m[keys[j]];
if (!t || seen.has(t))
continue;
seen.add(t);
pcuShrink(t);
}
}
});
}
function pcuShrink(t) {
var im = t.image;
if (!im || t.__pcuDown || t.isDataTexture || t.isCompressedTexture || t.isVideoTexture)
return;
var bitmap = (typeof ImageBitmap !== "undefined" && im instanceof ImageBitmap) || (typeof HTMLImageElement !== "undefined" && im instanceof HTMLImageElement);
if (!bitmap)
return;
var w = im.width || 0, h = im.height || 0, cap = PCU.texMax || 512;
if (Math.max(w, h) <= cap)
return;
var k = cap / Math.max(w, h), c = document.createElement("canvas");
c.width = Math.max(1, Math.round(w * k));
c.height = Math.max(1, Math.round(h * k));
try {
c.getContext("2d").drawImage(im, 0, 0, c.width, c.height);
}
catch (e) {
return;
}
t.__pcuDown = true;
t.image = c;
t.needsUpdate = true;
PCU.tex++;
PCU.texSaved += (w * h - c.width * c.height) * 4 * 1.33;
if (im.close)
try {
im.close();
}
catch (e) { }
}
function pcuPace(now) {
if (PCU.last) {
var dt = now - PCU.last;
if (dt < 1000)
PCU.dts.push(dt);
}
PCU.last = now;
if (PCU.dts.length < 90)
return;
var a = PCU.dts.slice().sort(function (x, y) { return x - y; }), med = a[a.length >> 1];
PCU.dts.length = 0;
PCU.med = med;
if (typeof INT !== "undefined" && INT)
return;
if (med > 45 && PCU.eased === 0 && renderer.getPixelRatio() > 1) {
PCU.eased = 1;
PCU.pr = 1;
if (typeof GFX !== "undefined")
GFX.prSet = false;
}
else if (med > 45 && PCU.eased === 0) {
PCU.eased = 1;
}
else if (med > 50 && PCU.eased === 1) {
PCU.eased = 2;
PCU.far = 200;
PCU.t = 0;
}
}
function pcuTick() {
if (!PCU.on)
return;
var now = performance.now();
if (now - PCU.t < 400)
return;
PCU.t = now;
if (!(now - (PCU.texAt || 0) < 5000)) {
PCU.texAt = now;
pcuShrinkTextures();
}
var inside = typeof INT !== "undefined" && INT;
if (inside)
return;
if (now - PCU.built > 4000 && pcuSig() !== PCU.sig)
pcuRebuild();
var cx = camera.position.x, cz = camera.position.z, n = 0;
var far = PCU.far * ((typeof GFX_PHONE !== "undefined" && GFX_PHONE && innerWidth > innerHeight * 1.25) ? PCU.wide : 1);
var xr = !!(renderer && renderer.xr && renderer.xr.isPresenting), tallFar = xr ? PCU.xrTall : PCU.tallFar;
if (xr)
far *= PCU.xrFar;
for (var i = 0; i < PCU.units.length; i++) {
var u = PCU.units[i], o = u.o;
if (!o.parent || u.own) {
continue;
}
if (u.ib) {
var ib = instBounds(o);
if (ib !== u.ib) {
u.ib = ib;
pcuBoxOf(o, PCU_BOX);
PCU_BOX.getCenter(PCU_V);
PCU_BOX.getSize(PCU_S);
u.dx = PCU_V.x - o.matrixWorld.elements[12];
u.dz = PCU_V.z - o.matrixWorld.elements[14];
u.r = Math.max(PCU_S.x, PCU_S.z) / 2;
}
if (ib.moving) {
if (u.h) {
o.visible = true;
u.h = false;
}
continue;
}
}
var e = o.matrixWorld.elements, x = e[12] + u.dx, z = e[14] + u.dz;
var d = Math.sqrt((x - cx) * (x - cx) + (z - cz) * (z - cz)) - u.r, lim = u.tall ? tallFar : far + (PCU.lift ? (u.r >= PCU.bigR ? PCU.lift : PCU.lift * 0.25) : 0);
if (!u.h) {
if (d > lim && o.visible) {
o.visible = false;
u.h = true;
}
}
else if (d < lim - 25) {
o.visible = true;
u.h = false;
}
else if (o.visible) {
u.h = false;
u.own = true;
o.userData.pcuOwn = 1;
}
if (u.h)
n++;
}
PCU.hidden = n;
if (n > 40 && scene.fog && scene.fog.isFogExp2 && scene.fog.density < PCU.haze)
scene.fog.density = PCU.haze;
}
(function () {
if (typeof LITE === "undefined" || !LITE)
return;
PCU.on = true;
window.BAKE_REACH = 0.6;
if (typeof BAKE !== "undefined" && BAKE)
BAKE.lodNear = 130;
if (typeof gfxPixelRatio === "function") {
var gp = gfxPixelRatio;
gfxPixelRatio = function () { var r = gp.apply(this, arguments); return PCU.pr ? Math.min(r, PCU.pr) : r; };
}
var hook = function () { try {
pcuPace(performance.now());
pcuTick();
}
catch (e) {
if (window.console)
console.warn("[phone-cull]", e);
} };
if (typeof renderer !== "undefined" && renderer && renderer.render) {
var rr = renderer.render.bind(renderer);
renderer.render = function (sc, cam) { if (sc === scene)
hook(); return rr(sc, cam); };
}
else {
var iv = setInterval(function () { if (typeof renderer !== "undefined" && renderer && renderer.render && !renderer.__pcu) {
renderer.__pcu = 1;
var rr2 = renderer.render.bind(renderer);
renderer.render = function (sc, cam) { if (sc === scene)
hook(); return rr2(sc, cam); };
clearInterval(iv);
} }, 500);
}
})();
var LCITY = { on: false, applied: null, base: null };
function lcityWant() {
var v = "auto";
try {
v = localStorage.getItem("somnu.lightcity") || "auto";
}
catch (e) { }
if (v === "on")
return true;
if (v === "off")
return false;
if (typeof LITE === "undefined" || !LITE)
return false;
if (/OculusBrowser|Quest|Pico|Wolvic/.test(navigator.userAgent || ""))
return false;
var sd = 0;
try {
sd = Math.min(screen.width || 0, screen.height || 0);
}
catch (e) { }
return navigator.maxTouchPoints > 0 && sd >= 600;
}
function lcityApply() {
var on = lcityWant();
LCITY.on = on;
if (!LCITY.base)
LCITY.base = { reach: window.BAKE_REACH || 1, near: LITE_NEAR, far: PCU.far, tallFar: PCU.tallFar, haze: PCU.haze };
var B = LCITY.base;
window.BAKE_REACH = on ? B.reach * 0.6 : B.reach;
LITE_NEAR = on ? 170 : B.near;
if (PCU.eased < 2)
PCU.far = on ? 170 : B.far;
else
PCU.far = on ? 150 : 200;
PCU.tallFar = on ? 650 : B.tallFar;
PCU.haze = on ? 0.0045 : B.haze;
PCU.t = 0;
if (typeof BAKE !== "undefined" && BAKE)
BAKE.cullAt = 0;
LCITY.applied = on;
}
(function () {
try {
lcityApply();
}
catch (e) { }
if (typeof pcuPace === "function") {
var pp = pcuPace;
pcuPace = function () { var e0 = PCU.eased; var r = pp.apply(this, arguments); if (LCITY.on && PCU.eased !== e0 && PCU.eased === 2)
PCU.far = 150; return r; };
}
function wire() {
var el = document.getElementById("lightcity");
if (!el)
return;
var v = "auto";
try {
v = localStorage.getItem("somnu.lightcity") || "auto";
}
catch (e) { }
el.value = v;
el.addEventListener("change", function () {
try {
localStorage.setItem("somnu.lightcity", el.value);
}
catch (e) { }
lcityApply();
if (typeof setStatus === "function")
setStatus(LCITY.on ? "<b>Lighter city on.</b> The far city fades sooner; everything near you is the same." : "<b>Lighter city off.</b> The whole city, as far as the fog allows.");
});
}
if (document.readyState === "loading")
document.addEventListener("DOMContentLoaded", wire);
else
wire();
})();
function softWant() {
var v = "auto";
try {
v = localStorage.getItem("somnu.softscreen") || "auto";
}
catch (e) { }
if (v === "off")
return false;
if (typeof GFX_PHONE === "undefined" || !GFX_PHONE)
return v === "on" && navigator.maxTouchPoints > 0;
if (v === "on")
return true;
if (/OculusBrowser|Quest|Pico|Wolvic/.test(navigator.userAgent || ""))
return false;
var sd = 0;
try {
sd = Math.min(screen.width || 0, screen.height || 0);
}
catch (e) { }
return navigator.maxTouchPoints > 0 && sd >= 600;
}
var SOFT_PIXELS = 520000;
(function () {
if (typeof gfxPixelRatio === "function") {
var gp = gfxPixelRatio;
gfxPixelRatio = function () {
var r = gp.apply(this, arguments);
if (!softWant())
return r;
var area = Math.max(1, (window.innerWidth || 1) * (window.innerHeight || 1));
return Math.min(r, Math.max(0.6, Math.sqrt(SOFT_PIXELS / area)));
};
}
function wire() {
var el = document.getElementById("softscreen");
if (!el)
return;
var v = "auto";
try {
v = localStorage.getItem("somnu.softscreen") || "auto";
}
catch (e) { }
el.value = v;
el.addEventListener("change", function () {
try {
localStorage.setItem("somnu.softscreen", el.value);
}
catch (e) { }
if (typeof GFX !== "undefined")
GFX.prSet = false;
if (typeof setStatus === "function")
setStatus(softWant() ? "<b>Softer screen.</b> Fewer dots drawn each frame, for a smoother game." : "<b>Full sharpness.</b> Every dot of the screen.");
});
}
if (document.readyState === "loading")
document.addEventListener("DOMContentLoaded", wire);
else
wire();
})();
