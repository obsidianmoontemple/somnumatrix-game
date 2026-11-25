/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(101, function () {
"use strict";
return [
function () {
this.enabled = true;
this.needsSwap = true;
this.clear = false;
this.renderToScreen = false;
this.uniforms = THREE.UniformsUtils.clone(INK_SHADER.uniforms);
this.material = new THREE.ShaderMaterial({ uniforms: this.uniforms, vertexShader: INK_SHADER.vertexShader, fragmentShader: INK_SHADER.fragmentShader, depthTest: false, depthWrite: false });
this.quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), this.material);
this.qs = new THREE.Scene();
this.qc = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
this.qs.add(this.quad);
},
function (r, writeBuffer, readBuffer) {
var u = this.uniforms;
u.tDiffuse.value = readBuffer.texture;
u.tDepth.value = readBuffer.depthTexture;
u.near.value = camera.near;
u.far.value = camera.far;
u.isLog.value = r.capabilities.logarithmicDepthBuffer ? 1 : 0;
u.logF.value = Math.log2(camera.far + 1);
r.setRenderTarget(this.renderToScreen ? null : writeBuffer);
r.render(this.qs, this.qc);
},
function () {
if (typeof scene === "undefined" || !scene)
return;
var show = walkMode && !store.inside;
if (!GFX.motes) {
var n = 420, pos = new Float32Array(n * 3), seed = new Float32Array(n);
for (var i = 0; i < n; i++) {
pos[i * 3] = (Math.random() - 0.5) * 90;
pos[i * 3 + 1] = Math.random() * 22;
pos[i * 3 + 2] = (Math.random() - 0.5) * 90;
seed[i] = Math.random() * 6.28;
}
var g = new THREE.BufferGeometry();
g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
var c = document.createElement("canvas");
c.width = c.height = 32;
var x = c.getContext("2d"), gr = x.createRadialGradient(16, 16, 0, 16, 16, 16);
gr.addColorStop(0, "rgba(255,255,255,1)");
gr.addColorStop(0.4, "rgba(255,240,210,.5)");
gr.addColorStop(1, "rgba(255,240,210,0)");
x.fillStyle = gr;
x.fillRect(0, 0, 32, 32);
var mat = new THREE.PointsMaterial({ size: 0.35, map: new THREE.CanvasTexture(c), transparent: true, opacity: 0.6, depthWrite: false, blending: THREE.AdditiveBlending, color: 0xFFE8C0 });
var pts = new THREE.Points(g, mat);
pts.frustumCulled = false;
pts.raycast = function () { };
scene.add(pts);
GFX.motes = { pts: pts, seed: seed, base: pos.slice(0), cx: 0, cz: 0 };
}
var M = GFX.motes;
M.pts.visible = show;
if (!show)
return;
var P = camera.position, t = performance.now() / 1000, a = M.pts.geometry.attributes.position.array, gy = (typeof terrainY === "function") ? terrainY(P.x, P.z) : 0;
for (var k = 0; k < M.seed.length; k++) {
var s = M.seed[k], bx = M.base[k * 3], bz = M.base[k * 3 + 2];
var rx = ((bx - P.x) % 90 + 135) % 90 - 45, rz = ((bz - P.z) % 90 + 135) % 90 - 45;
a[k * 3] = P.x + rx + Math.sin(t * 0.3 + s) * 1.5;
a[k * 3 + 1] = gy + M.base[k * 3 + 1] + Math.sin(t * 0.5 + s * 2) * 0.8;
a[k * 3 + 2] = P.z + rz + Math.cos(t * 0.27 + s) * 1.5;
}
M.pts.geometry.attributes.position.needsUpdate = true;
var night = (typeof daylight === "function") ? 1 - daylight(dreamHour()) : 0;
M.pts.material.opacity = 0.25 + 0.5 * night;
M.pts.material.color.setHex(night > 0.5 ? 0xBFD8FF : 0xFFE8C0);
}
];
});
