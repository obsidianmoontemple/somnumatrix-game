/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var GFX = { mode: null, composer: null, bloom: null, ink: null, fxaa: null, loading: false, failed: false, size: null, aniso: 1, sweepAt: 0, motes: null };
function gfxWanted() {
var c = (typeof cfg === "function") ? cfg() : {};
if (c.gfx === "high" || c.gfx === "standard")
return GFX_STYLE === "stylized" ? "stylized" : c.gfx;
return (typeof GFX_STYLE !== "undefined" && GFX_STYLE) || "high";
}
var GFX_LIBS = ["postprocessing/EffectComposer.js", "shaders/CopyShader.js", "postprocessing/ShaderPass.js", "postprocessing/RenderPass.js",
"shaders/LuminosityHighPassShader.js", "postprocessing/UnrealBloomPass.js", "shaders/FXAAShader.js"];
function gfxLoad() {
if (GFX.loading || GFX.failed || GFX.composer)
return;
if (THREE.EffectComposer && THREE.UnrealBloomPass && THREE.FXAAShader) {
gfxBuild();
return;
}
GFX.loading = true;
var bases = ["assets/vendor/three-examples/", "https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/"], b = 0, i = 0;
(function next() {
if (i >= GFX_LIBS.length) {
GFX.loading = false;
gfxBuild();
return;
}
var s = document.createElement("script");
s.src = bases[b] + GFX_LIBS[i];
s.async = false;
s.onload = function () { i++; next(); };
s.onerror = function () { if (++b < bases.length)
next();
else {
GFX.loading = false;
GFX.failed = true;
} };
document.head.appendChild(s);
})();
}
var INK_SHADER = {
uniforms: { tDiffuse: { value: null }, tDepth: { value: null }, res: { value: new THREE.Vector2(1, 1) }, near: { value: 0.1 }, far: { value: 6000 },
logF: { value: 0 }, isLog: { value: 0 }, thick: { value: 1 }, strength: { value: 0.85 }, inkColor: { value: new THREE.Color(0x0A0A12) } },
vertexShader: "varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }",
fragmentShader: [
"uniform sampler2D tDiffuse; uniform sampler2D tDepth; uniform vec2 res; uniform float near; uniform float far;",
"uniform float logF; uniform float isLog; uniform float thick; uniform float strength; uniform vec3 inkColor; varying vec2 vUv;",
"float lin(vec2 uv){ float d=texture2D(tDepth,uv).x;",
"  if(isLog>0.5) return exp2(d*logF)-1.0;",
"  float z=d*2.0-1.0; return (2.0*near*far)/(far+near-z*(far-near)); }",
"void main(){",
"  vec4 base=texture2D(tDiffuse,vUv);",
"  vec2 px=thick/res;",
"  float zc=lin(vUv), zl=lin(vUv-vec2(px.x,0.0)), zr=lin(vUv+vec2(px.x,0.0)), zu=lin(vUv+vec2(0.0,px.y)), zd=lin(vUv-vec2(0.0,px.y));",
"  float ic=1.0/max(zc,0.001), il=1.0/max(zl,0.001), ir=1.0/max(zr,0.001), iu=1.0/max(zu,0.001), id=1.0/max(zd,0.001);",
"  float lap=abs(il+ir-2.0*ic)+abs(iu+id-2.0*ic);",
"  float m=max(max(ic,il),max(max(ir,iu),id));",
"  float e=smoothstep(0.04,0.12,lap/max(m,1e-6));",
"  float zmin=min(zc,min(min(zl,zr),min(zu,zd)));",
"  e*=1.0-smoothstep(260.0,900.0,zmin);",
"  vec3 ink=mix(base.rgb*0.22,inkColor,0.55);",
"  gl_FragColor=vec4(mix(base.rgb,ink,e*strength),base.a);",
"}"
].join("\n")
};
function InkPass() { return __ZC(100, 0, this, arguments, new.target); }
InkPass.prototype.setSize = function (w, h) { this.uniforms.res.value.set(w, h); };
InkPass.prototype.render = function (r, writeBuffer, readBuffer) { return __ZC(100, 1, this, arguments, new.target); };
function gfxBuild() {
try {
var w = innerWidth, h = innerHeight, pr = renderer.getPixelRatio(), C;
if (GFX.mode === "stylized") {
function rt() {
var t = new THREE.WebGLRenderTarget(w * pr, h * pr, { minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, format: THREE.RGBAFormat });
t.depthTexture = new THREE.DepthTexture();
t.depthTexture.type = THREE.UnsignedIntType;
return t;
}
C = new THREE.EffectComposer(renderer, rt());
C.renderTarget2.dispose();
C.renderTarget2 = rt();
C.readBuffer = C.renderTarget1;
C.writeBuffer = C.renderTarget2;
C.setPixelRatio(pr);
C.setSize(w, h);
C.addPass(new THREE.RenderPass(scene, camera));
GFX.ink = new InkPass();
GFX.ink.setSize(w * pr, h * pr);
C.addPass(GFX.ink);
var B = new THREE.UnrealBloomPass(new THREE.Vector2(w, h), 0.5, 0.45, 0.82);
C.addPass(B);
GFX.fxaa = new THREE.ShaderPass(THREE.FXAAShader);
GFX.fxaa.material.uniforms.resolution.value.set(1 / (w * pr), 1 / (h * pr));
C.addPass(GFX.fxaa);
GFX.bloom = B;
}
else {
var rtm = null;
if (renderer.capabilities && renderer.capabilities.isWebGL2 && THREE.WebGLMultisampleRenderTarget) {
rtm = new THREE.WebGLMultisampleRenderTarget(w * pr, h * pr, { format: THREE.RGBAFormat });
rtm.samples = GFX_MAX ? Math.max(4, Math.min(8, renderer.capabilities.maxSamples || 4)) : 4;
}
C = rtm ? new THREE.EffectComposer(renderer, rtm) : new THREE.EffectComposer(renderer);
C.setPixelRatio(pr);
C.setSize(w, h);
C.addPass(new THREE.RenderPass(scene, camera));
GFX.bloom = new THREE.UnrealBloomPass(new THREE.Vector2(w, h), 0.5, 0.45, 0.82);
C.addPass(GFX.bloom);
}
GFX.composer = C;
GFX.size = [w, h];
}
catch (e) {
GFX.failed = true;
GFX.composer = null;
if (window.console)
console.warn("graphics:", e);
}
}
var GFX_PHONE = (function () {
var ua = (typeof navigator !== "undefined" && navigator.userAgent) || "";
return /Android|iPhone|iPad|iPod|Mobile/i.test(ua) || (typeof navigator !== "undefined" && navigator.maxTouchPoints > 1 && /Macintosh/.test(ua)) || (typeof TOUCH_ONLY !== "undefined" && TOUCH_ONLY);
})();
function gfxPixelRatio() {
var dpr = window.devicePixelRatio || 1, cap = 2;
if (GFX_PHONE)
cap = 1.5;
if (typeof LITE !== "undefined" && LITE)
cap = Math.min(cap, 1.25);
if (GFX_PHONE) {
var area = Math.max(1, (window.innerWidth || 1) * (window.innerHeight || 1));
cap = Math.min(cap, Math.max(1, Math.sqrt(GFX_TOUCH_PIXELS / area)));
}
return Math.min(dpr, cap);
}
var GFX_TOUCH_PIXELS = 900000;
var GFX_MAX = (function () {
if (GFX_PHONE)
return false;
var c = {};
try {
c = JSON.parse(localStorage.getItem(/[?&]test=1\b/.test(location.search) ? "dreamwalker.testcfg" : "dreamwalker.cfg2") || "{}") || {};
}
catch (e) { }
if (c.lite === "on")
return false;
if (/OculusBrowser|Quest|Pico|Wolvic|\bVR\b/.test(navigator.userAgent || ""))
return false;
var mem = navigator.deviceMemory;
if (mem && mem <= 2 && c.lite !== "off")
return false;
return true;
})();
function gfxApply() {
if (!GFX.prSet) {
GFX.prSet = true;
var pr = gfxPixelRatio();
if (renderer.getPixelRatio() !== pr) {
renderer.setPixelRatio(pr);
renderer.setSize(innerWidth, innerHeight);
}
}
var want = gfxWanted();
if (want !== GFX.mode) {
GFX.mode = want;
if (want !== "standard")
gfxLoad();
if (renderer.capabilities && renderer.capabilities.getMaxAnisotropy)
GFX.aniso = Math.min(GFX_MAX ? 16 : 8, renderer.capabilities.getMaxAnisotropy());
}
if (GFX.mode === "stylized") {
gfxSweep();
motesTick();
}
else if (GFX.mode === "high" && GFX_MAX)
gfxSweep();
}
function gfxRender() {
if (GFX.mode !== "standard" && GFX.composer) {
if (GFX.size[0] !== innerWidth || GFX.size[1] !== innerHeight) {
var pr = renderer.getPixelRatio();
GFX.composer.setSize(innerWidth, innerHeight);
GFX.bloom.setSize(innerWidth, innerHeight);
GFX.size = [innerWidth, innerHeight];
if (GFX.ink)
GFX.ink.setSize(innerWidth * pr, innerHeight * pr);
if (GFX.fxaa)
GFX.fxaa.material.uniforms.resolution.value.set(1 / (innerWidth * pr), 1 / (innerHeight * pr));
}
var night = (typeof daylight === "function") ? 1 - daylight(dreamHour()) : 0;
GFX.bloom.strength = 0.22 + 0.55 * night;
GFX.bloom.threshold = 0.9 - 0.18 * night;
if (store.inside) {
GFX.bloom.strength = 0.1;
GFX.bloom.threshold = 0.985;
}
if (typeof WLD !== "undefined" && WLD.w && WLD.w.softBloom) {
GFX.bloom.strength = 0.12;
GFX.bloom.threshold = 0.96;
}
if (GFX.ink) {
var ik = ((typeof cfg === "function" ? cfg() : {}).ink) || "off";
GFX.ink.enabled = ik !== "off";
GFX.ink.uniforms.thick.value = Math.max(1, renderer.getPixelRatio());
GFX.ink.uniforms.strength.value = ik === "strong" ? (store.inside ? 0.7 : 0.85) : (store.inside ? 0.26 : 0.32);
}
if (typeof TOON !== "undefined" && TOON) {
TOON.rim.rimStrength.value = 0.22 + 0.22 * night;
TOON.rim.rimColor.value.setHex(night > 0.5 ? 0xB8C8FF : 0xFFF2DC);
}
GFX.composer.passes[0].camera = camera;
GFX.composer.render();
}
else
renderer.render(scene, camera);
}
var GFX_SEEN = new WeakSet();
function gfxSweep() {
var now = performance.now();
if (now - GFX.sweepAt < 2500)
return;
GFX.sweepAt = now;
var A = GFX.aniso;
scene.traverse(function (o) {
var m = o.material;
if (!m)
return;
(Array.isArray(m) ? m : [m]).forEach(function (mt) {
var t = mt.map;
if (!t || GFX_SEEN.has(t))
return;
GFX_SEEN.add(t);
if (t === ((typeof TOON !== "undefined" && TOON) ? TOON.gradient : null))
return;
if (t.magFilter !== THREE.NearestFilter) {
t.magFilter = THREE.LinearFilter;
if (t.generateMipmaps !== false)
t.minFilter = THREE.LinearMipmapLinearFilter;
}
if (t.anisotropy < A) {
t.anisotropy = A;
if (t.image)
t.needsUpdate = true;
}
});
});
}
function motesTick() { return __ZC(100, 2, this, arguments, new.target); }
(function () {
if (typeof GFX_STYLE === "undefined" || typeof fg !== "function")
return;
if (GFX_STYLE !== "stylized" && !(GFX_STYLE === "high" && GFX_MAX))
return;
var orig = fg;
fg = function (key, make) {
if (FIGGEO[key])
return FIGGEO[key];
var g = make(), p = g.parameters;
if (g.type === "CylinderGeometry" && p && p.radialSegments < 16)
g = new THREE.CylinderGeometry(p.radiusTop, p.radiusBottom, p.height, Math.max(16, p.radialSegments * 2), p.heightSegments, p.openEnded, p.thetaStart, p.thetaLength);
else if (g.type === "SphereGeometry" && p && p.widthSegments < 24)
g = new THREE.SphereGeometry(p.radius, Math.max(24, p.widthSegments * 2), Math.max(16, p.heightSegments * 2), p.phiStart, p.phiLength, p.thetaStart, p.thetaLength);
else if (g.type === "ConeGeometry" && p && p.radialSegments < 16)
g = new THREE.ConeGeometry(p.radius, p.height, Math.max(16, p.radialSegments * 2), p.heightSegments, p.openEnded, p.thetaStart, p.thetaLength);
FIGGEO[key] = g;
return g;
};
})();
var ACC_COLS = [0x7A2A26, 0x2E4A6A, 0x3E6A3A, 0xC9A868, 0x6A4A7A, 0xD8CFB8, 0x2A2A30, 0xB8622E, 0x5A7A8A];
function accessorize(g, spec) {
var L = spec.look || {};
if (L.acc === false)
return;
var h = hash(String(spec.id) + "acc"), head = null, torso = null;
g.traverse(function (m) { if (m.userData.part === "head")
head = m; if (m.userData.part === "torso" && !torso)
torso = m; });
if (!head || !torso)
return;
var body = head.parent, hy = head.position.y, col = ACC_COLS[(h >>> 4) % ACC_COLS.length], mat = new THREE.MeshLambertMaterial({ color: col });
var dark = new THREE.MeshLambertMaterial({ color: 0x1A1A20 });
function add(geo, m, x, y, z, rx, ry, rz) { var o = new THREE.Mesh(geo, m); o.position.set(x, y, z); if (rx || ry || rz)
o.rotation.set(rx || 0, ry || 0, rz || 0); o.userData.acc = 1; body.add(o); return o; }
var pick = h % 20;
if (pick < 3) {
[-1, 1].forEach(function (sd) { add(fg("specring", function () { return new THREE.TorusGeometry(0.026, 0.005, 6, 16); }), dark, sd * 0.042, hy + 0.012, 0.104); });
add(fg("specbridge", function () { return new THREE.BoxGeometry(0.03, 0.006, 0.006); }), dark, 0, hy + 0.014, 0.108);
}
else if (pick < 7) {
add(fg("scarf", function () { return new THREE.TorusGeometry(0.075, 0.03, 8, 20); }), mat, 0, hy - 0.135, 0, Math.PI / 2);
add(fg("scarftail", function () { return new THREE.BoxGeometry(0.06, 0.24, 0.025); }), mat, 0.05, hy - 0.26, 0.08, 0.15, 0, 0.12);
}
else if (pick < 11) {
add(fg("bagbox", function () { return new THREE.BoxGeometry(0.2, 0.16, 0.07); }), mat, 0.2, hy - 0.75, 0.03);
add(fg("bagstrap", function () { return new THREE.BoxGeometry(0.025, 0.66, 0.012); }), dark, 0.02, hy - 0.4, 0.1, 0, 0, 0.62);
}
else if (pick < 13) {
add(fg("satchel", function () { return new THREE.BoxGeometry(0.24, 0.28, 0.1); }), mat, 0, hy - 0.45, -0.17);
}
else if (pick < 15) {
add(fg("flower", function () { return new THREE.SphereGeometry(0.022, 10, 8); }), new THREE.MeshLambertMaterial({ color: [0xE84A6A, 0xF2D04A, 0xF4F0E6][h % 3] }), -0.09, hy - 0.24, 0.13);
}
else if (pick < 17 && !(L.topKind === "dress" || L.topKind === "robe")) {
add(fg("apron", function () { return new THREE.BoxGeometry(0.26, 0.5, 0.015); }), new THREE.MeshLambertMaterial({ color: [0xF0EADC, 0x6A4A30, 0x2E4A6A][h % 3] }), 0, hy - 0.6, 0.17);
}
}
(function () {
if (typeof buildFigure !== "function")
return;
var bf = buildFigure;
buildFigure = function (spec, f) {
var g = bf.apply(this, arguments);
if (spec && (spec.city || spec.filler || spec.hub || /^presence_/.test(String(spec.id))) && spec.archetype !== "deity")
try {
accessorize(g, spec);
}
catch (e) { }
return g;
};
})();
(function () {
if (!GFX_PHONE || typeof applyShadows !== "function")
return;
var as = applyShadows;
applyShadows = function () { as.apply(this, arguments); if (typeof renderer !== "undefined" && renderer && renderer.shadowMap)
renderer.shadowMap.enabled = false; if (typeof sun !== "undefined" && sun)
sun.castShadow = false; };
})();
