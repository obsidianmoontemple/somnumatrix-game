/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var LOOK_OFF = (typeof window !== "undefined" && window.LOOK_OFF === true);
var LOOK = { exposure: 1.0, lights: [], fill: null, blobs: null, blobList: [], skyDone: false, on: true, lastFinish: null };
var LOOK_FOG_KNEE = "vec3 lookFogKnee( vec3 c ){ float l=dot( c, vec3( 0.2126, 0.7152, 0.0722 ) ); if( l<=0.42 ) return c; return c*( ( 0.42+( l-0.42 )*0.42 )/l ); }";
var LOOK_PHONE = (typeof GFX_PHONE !== "undefined") ? GFX_PHONE : /Android|iPhone|iPad|Mobile/i.test(navigator.userAgent || "");
function lookFinish() {
if (LOOK_PHONE)
return "standard";
var c = (typeof cfg === "function") ? cfg() : {};
return c.finish === "standard" ? "standard" : "high";
}
(function () {
if (LOOK_OFF)
return;
if (typeof THREE === "undefined" || !THREE.ShaderChunk)
return;
var F = "vec3 lookLin( vec3 c ){ return c*( c*( c*0.305306011+0.682171111 )+0.012522878 ); }\nvec3 lookAlb( vec3 c ){ return c*c; }\n";
var D0 = "vec4 diffuseColor = vec4( diffuse, opacity );", D1 = "vec4 diffuseColor = vec4( lookAlb( clamp( diffuse, 0.06, 0.96 ) ), opacity );";
var E0 = "vec3 totalEmissiveRadiance = emissive;", E1 = "vec3 totalEmissiveRadiance = lookLin( emissive );";
var C0 = "#ifdef USE_COLOR\n\tvColor *= color;\n#endif", C1 = "#ifdef USE_COLOR\n#if defined( USE_COLOR_ALPHA )\n\tvColor *= vec4( lookAlb( max( color.rgb, vec3( 0.05 ) ) ), color.a );\n#else\n\tvColor *= lookAlb( max( color.rgb, vec3( 0.05 ) ) );\n#endif\n#endif";
function fix(s) {
if (typeof s !== "string")
return s;
var t = s;
if (t.indexOf(D0) >= 0)
t = t.split(D0).join(D1);
if (t.indexOf(E0) >= 0)
t = t.split(E0).join(E1);
if (t !== s && t.indexOf("lookLin( vec3") < 0)
t = t.replace("#include <common>", "#include <common>\n" + F);
return t;
}
var KN = "vec3 lookKnee( vec3 c ){ float l=dot( c, vec3( 0.2126, 0.7152, 0.0722 ) ); if( l<=0.3 ) return c; return c*( ( 0.3+( l-0.3 )*0.35 )/l ); }\n";
var K0 = "#include <tonemapping_fragment>", K1 = "gl_FragColor.rgb = lookKnee( gl_FragColor.rgb );\n\t#include <tonemapping_fragment>";
var LIT = { meshlambert_frag: 1, meshphong_frag: 1, meshphysical_frag: 1, meshtoon_frag: 1, lambert: 1, phong: 1, standard: 1, physical: 1, toon: 1 };
function knee(s) {
if (typeof s !== "string" || s.indexOf(K0) < 0 || s.indexOf("lookKnee(") >= 0)
return s;
return s.replace(K0, K1).replace("#include <common>", "#include <common>\n" + KN);
}
var SC = THREE.ShaderChunk;
Object.keys(SC).forEach(function (k) { if (/_frag$/.test(k))
SC[k] = fix(SC[k]); });
Object.keys(LIT).forEach(function (k) { if (typeof SC[k] === "string")
SC[k] = knee(SC[k]); });
var FG0 = "gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );", FG1 = "gl_FragColor.rgb = mix( gl_FragColor.rgb, lookFogKnee( fogColor ), fogFactor );";
if (typeof SC.fog_fragment === "string" && SC.fog_fragment.indexOf(FG0) >= 0 && typeof SC.fog_pars_fragment === "string" && SC.fog_pars_fragment.indexOf("uniform vec3 fogColor;") >= 0) {
SC.fog_fragment = SC.fog_fragment.replace(FG0, FG1);
SC.fog_pars_fragment = SC.fog_pars_fragment.replace("uniform vec3 fogColor;", "uniform vec3 fogColor;\n\t" + LOOK_FOG_KNEE);
}
SC.color_vertex = SC.color_vertex.replace(C0, C1);
Object.keys(SC).forEach(function (k) { if (/_vert$/.test(k) && SC[k].indexOf("#include <color_vertex>") >= 0 && SC[k].indexOf("lookLin( vec3") < 0)
SC[k] = SC[k].replace("#include <common>", "#include <common>\n" + F); });
if (THREE.ShaderLib)
Object.keys(THREE.ShaderLib).forEach(function (k) {
var L = THREE.ShaderLib[k];
L.fragmentShader = fix(L.fragmentShader);
if (LIT[k])
L.fragmentShader = knee(L.fragmentShader);
if (typeof L.vertexShader === "string" && L.vertexShader.indexOf("#include <color_vertex>") >= 0 && L.vertexShader.indexOf("lookLin( vec3") < 0)
L.vertexShader = L.vertexShader.replace("#include <common>", "#include <common>\n" + F);
});
})();
function lookIsPicture(t) {
if (!t || !t.isTexture || t.isDataTexture || t.isCompressedTexture || t.isDepthTexture)
return false;
var im = t.image;
if (!im)
return false;
return (typeof HTMLCanvasElement !== "undefined" && im instanceof HTMLCanvasElement) || (typeof HTMLImageElement !== "undefined" && im instanceof HTMLImageElement) ||
(typeof ImageBitmap !== "undefined" && im instanceof ImageBitmap) || (typeof OffscreenCanvas !== "undefined" && im instanceof OffscreenCanvas) || (typeof HTMLVideoElement !== "undefined" && im instanceof HTMLVideoElement);
}
(function () {
if (LOOK_OFF)
return;
if (typeof THREE === "undefined" || !THREE.Object3D)
return;
THREE.Object3D.prototype.onBeforeRender = function (r, s, c, g, mat) {
if (!mat || mat.__lookChk)
return;
mat.__lookChk = 1;
if (mat.isShaderMaterial)
return;
var pic = false;
if (mat.map && lookIsPicture(mat.map)) {
mat.map.encoding = THREE.sRGBEncoding;
pic = true;
}
if (mat.emissiveMap && lookIsPicture(mat.emissiveMap)) {
mat.emissiveMap.encoding = THREE.sRGBEncoding;
pic = true;
}
if (pic)
mat.needsUpdate = true;
};
})();
(function () {
if (LOOK_OFF)
return;
if (typeof THREE === "undefined" || !THREE.MeshStandardMaterial)
return;
var S = THREE.MeshStandardMaterial;
THREE.MeshStandardMaterial = function (p) { var m = new S(p); if (!p || p.roughness === undefined)
m.roughness = 0.82; if (!p || p.metalness === undefined)
m.metalness = 0.02; return m; };
THREE.MeshStandardMaterial.prototype = S.prototype;
})();
function lookTrack(l) { if (l && LOOK.lights.indexOf(l) < 0) {
LOOK.lights.push(l);
} return l; }
["PointLight", "SpotLight", "HemisphereLight", "DirectionalLight", "AmbientLight"].forEach(function (n) {
if (LOOK_OFF)
return;
if (typeof THREE === "undefined" || !THREE[n])
return;
var K = THREE[n];
THREE[n] = function (a, b, c, d, e, f) { return lookTrack(new K(a, b, c, d, e, f)); };
THREE[n].prototype = K.prototype;
});
function lookLinHex(c, slot, obj) {
var h = c.getHex();
if (obj[slot] === h)
return;
c.convertSRGBToLinear();
obj[slot] = c.getHex();
}
function lookLightsTick() {
var L = LOOK.lights;
for (var i = L.length - 1; i >= 0; i--) {
var l = L[i];
if (!l.parent) {
if (l.__lookGone) {
L.splice(i, 1);
continue;
}
l.__lookGone = (l.__lookGone || 0) + 1;
if (l.__lookGone > 600)
L.splice(i, 1);
continue;
}
l.__lookGone = 0;
if (l.color)
lookLinHex(l.color, "__lookC", l);
if (l.groundColor)
lookLinHex(l.groundColor, "__lookG", l);
}
}
function lookRenderer() {
if (typeof renderer === "undefined" || !renderer)
return;
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = LOOK.exposure;
if (typeof hemi !== "undefined" && hemi)
lookTrack(hemi);
if (typeof sun !== "undefined" && sun)
lookTrack(sun);
if (!LOOK.fill && typeof scene !== "undefined" && scene) {
LOOK.fill = new THREE.DirectionalLight(0xB8C8E0, 0);
LOOK.fill.castShadow = false;
scene.add(LOOK.fill);
scene.add(LOOK.fill.target);
}
}
if (!LOOK_OFF && typeof initWorld === "function") {
var lookInitWorld = initWorld;
initWorld = function () { var r = lookInitWorld.apply(this, arguments); try {
lookRenderer();
lookSky();
lookSettings();
}
catch (e) {
if (window.console)
console.warn("look:", e);
} return r; };
}
if (!LOOK_OFF && typeof gfxBuild === "function") {
var lookGfxBuild = gfxBuild;
gfxBuild = function () {
var r = lookGfxBuild.apply(this, arguments);
try {
var C = GFX.composer;
if (C) {
[C.renderTarget1, C.renderTarget2, C.readBuffer, C.writeBuffer].forEach(function (t) { if (t && t.texture)
t.texture.encoding = THREE.sRGBEncoding; });
}
}
catch (e) { }
return r;
};
}
function lookSky() {
if (LOOK.skyDone || typeof sky === "undefined" || !sky || !sky.material || !sky.material.uniforms)
return;
LOOK.skyDone = true;
var m = sky.material;
m.uniforms.sunDir = { value: new THREE.Vector3(0, 1, 0) };
m.uniforms.sunCol = { value: new THREE.Color(0xFFD9A0) };
m.uniforms.glow = { value: 0 };
m.fragmentShader = [
"uniform vec3 top; uniform vec3 low; uniform vec3 sunDir; uniform vec3 sunCol; uniform float glow; varying vec3 vP;",
"void main(){",
"  vec3 d=normalize(vP); float h=clamp(d.y,0.0,1.0);",
"  vec3 col=mix(low,top,pow(h,0.5));",
"  col=mix(col,top*0.82,smoothstep(0.35,1.0,h)*0.5);",
"  col=mix(col,low*1.06+0.015,(1.0-smoothstep(0.0,0.16,h))*0.55);",
"  float s=max(dot(d,normalize(sunDir)),0.0);",
"  col+=sunCol*(pow(s,6.0)*0.22+pow(s,48.0)*0.25)*glow*(1.0-h*0.5);",
"  col=mix(col,low,step(d.y,0.0));",
"  gl_FragColor=vec4(lookFogKnee(col),1.0);",
"}"
].join("\n");
m.fragmentShader = LOOK_FOG_KNEE + "\n" + m.fragmentShader;
m.needsUpdate = true;
}
function lookSkyTick(dl) {
if (!LOOK.skyDone || typeof sky === "undefined" || !sky)
return;
var u = sky.material.uniforms;
if (typeof sunDir !== "undefined" && sunDir)
u.sunDir.value.set(sunDir.x, sunDir.y, sunDir.z);
var low = (typeof sunDisc !== "undefined" && sunDisc && sunDisc.visible);
u.glow.value = low ? Math.min(1, 0.35 + 0.65 * (1 - Math.min(1, Math.max(0, sunDir.y) * 1.6))) : 0;
if (typeof sunDisc !== "undefined" && sunDisc && sunDisc.userData.halo)
u.sunCol.value.copy(sunDisc.userData.halo.material.color);
}
var LOOK_T = { hemiK: 0.85, sunK: 1.6, moon: 0.3, bounce: 0.35, fillDay: 0.32, fillNight: 0.16, nightExp: 0.1, minHemi: 0.38, moonK: 0.9 };
function lookLightTick() {
if (typeof hemi === "undefined" || !hemi || typeof sun === "undefined" || !sun)
return;
var T = LOOK_T, inside = !!(store && store.inside) || (typeof MALL !== "undefined" && MALL && MALL.on) || (typeof UG2 !== "undefined" && UG2 && UG2.on);
var dl = (typeof daylight === "function" && typeof dreamHour === "function") ? daylight(dreamHour()) : 1, night = 1 - dl;
if (!inside && (hemi.color.getHex() !== hemi.__lookC || hemi.groundColor.getHex() !== hemi.__lookG)) {
if (hemi.color.getHex() !== hemi.__lookC)
hemi.color.setHex(blend(hemi.color.getHex(), 0x8FA4DA, night * T.moon));
if (hemi.groundColor.getHex() !== hemi.__lookG)
hemi.groundColor.setHex(blend(hemi.groundColor.getHex(), dl > 0.5 ? 0x7A6A50 : 0x30384E, T.bounce));
hemi.__lookC = hemi.__lookG = -1;
}
var io = inside ? 1 : 0;
if (LOOK.hIn !== io || LOOK.sIn !== io) {
LOOK.hOut = LOOK.sOut = null;
LOOK.hIn = LOOK.sIn = io;
}
if (hemi.intensity !== LOOK.hOut) {
if (!inside)
hemi.intensity = Math.max(hemi.intensity * T.hemiK, T.minHemi * night + 0.2);
LOOK.hOut = hemi.intensity;
}
if (sun.intensity !== LOOK.sOut) {
if (!inside)
sun.intensity = Math.min(sun.intensity * (dl > 0.02 ? T.sunK : T.moonK), 4);
LOOK.sOut = sun.intensity;
}
if (LOOK.fill) {
LOOK.fill.visible = !inside;
var sd = (typeof sunDir !== "undefined" && sunDir) ? sunDir : { x: -0.5, y: 0.8, z: 0.3 };
var P = camera.position;
LOOK.fill.position.set(P.x - sd.x * 100, P.y + 40, P.z - sd.z * 100);
LOOK.fill.target.position.set(P.x, P.y, P.z);
LOOK.fill.target.updateMatrixWorld();
LOOK.fill.intensity = inside ? 0 : (T.fillDay * dl + T.fillNight * night);
var fc = night > 0.5 ? 0x8EA6E0 : 0xC8D4E8;
if (LOOK.fillHex !== fc) {
LOOK.fillHex = fc;
LOOK.fill.color.setHex(fc);
}
}
renderer.toneMappingExposure = LOOK.exposure * (inside ? 1.0 : 1.0 + T.nightExp * night);
}
var LOOK_SH = { half: 70, map: 2048 };
if (typeof GFX_MAX !== "undefined" && GFX_MAX) {
LOOK_SH.half = 95;
LOOK_SH.map = 4096;
}
function lookShadows() {
if (typeof renderer === "undefined" || !renderer || typeof sun === "undefined" || !sun)
return;
var on = lookFinish() === "high" && !LOOK_PHONE && !(typeof LITE !== "undefined" && LITE);
renderer.shadowMap.enabled = on;
sun.castShadow = on;
if (!on)
return;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
var s = sun.shadow, c = s.camera;
if (s.mapSize.width !== LOOK_SH.map) {
s.mapSize.set(LOOK_SH.map, LOOK_SH.map);
if (s.map) {
s.map.dispose();
s.map = null;
}
}
c.left = -LOOK_SH.half;
c.right = LOOK_SH.half;
c.top = LOOK_SH.half;
c.bottom = -LOOK_SH.half;
c.near = 1;
c.far = 1400;
c.updateProjectionMatrix();
s.bias = -0.0004;
if ("normalBias" in s)
s.normalBias = 0.04;
if (sun.target && !sun.target.parent)
scene.add(sun.target);
}
if (!LOOK_OFF && typeof applyShadows === "function") {
var lookApplyShadows = applyShadows;
applyShadows = function () { var r = lookApplyShadows.apply(this, arguments); try {
lookShadows();
}
catch (e) { } return r; };
}
if (!LOOK_OFF && typeof followSun === "function") {
var lookFollowSun = followSun;
followSun = function () {
var r = lookFollowSun.apply(this, arguments);
if (!sun || !sun.target || !sun.castShadow)
return r;
var t = sun.target.position, p = sun.position, dx = p.x - t.x, dy = p.y - t.y, dz = p.z - t.z;
var step = 2 * LOOK_SH.half / LOOK_SH.map;
var f = new THREE.Vector3(-dx, -dy, -dz).normalize(), up = Math.abs(f.y) > 0.99 ? new THREE.Vector3(0, 0, 1) : new THREE.Vector3(0, 1, 0);
var rx = new THREE.Vector3().crossVectors(up, f).normalize(), ry = new THREE.Vector3().crossVectors(f, rx);
var a = t.x * rx.x + t.y * rx.y + t.z * rx.z, b = t.x * ry.x + t.y * ry.y + t.z * ry.z;
var da = Math.round(a / step) * step - a, db = Math.round(b / step) * step - b;
var ox = rx.x * da + ry.x * db, oy = rx.y * da + ry.y * db, oz = rx.z * da + ry.z * db;
t.x += ox;
t.y += oy;
t.z += oz;
p.x += ox;
p.y += oy;
p.z += oz;
sun.target.updateMatrixWorld();
return r;
};
}
var LOOK_BLOBTEX = null;
function lookBlobTex() {
if (LOOK_BLOBTEX)
return LOOK_BLOBTEX;
var c = document.createElement("canvas");
c.width = c.height = 64;
var x = c.getContext("2d");
var g = x.createRadialGradient(32, 32, 0, 32, 32, 31);
g.addColorStop(0, "rgba(0,0,0,1)");
g.addColorStop(0.35, "rgba(0,0,0,0.85)");
g.addColorStop(0.7, "rgba(0,0,0,0.33)");
g.addColorStop(1, "rgba(0,0,0,0)");
x.fillStyle = g;
x.fillRect(0, 0, 64, 64);
return (LOOK_BLOBTEX = new THREE.CanvasTexture(c));
}
var LOOK_CONTACT = null;
if (!LOOK_OFF && typeof contactShadow === "function") {
var lookContact = contactShadow;
contactShadow = function (r) {
var m = lookContact.apply(this, arguments);
try {
if (!LOOK_CONTACT) {
LOOK_CONTACT = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0.5, depthWrite: false, toneMapped: false,
map: lookBlobTex(), color: 0xffffff, polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -4 });
}
if (m.material && m.material !== LOOK_CONTACT)
m.material.dispose();
m.material = LOOK_CONTACT;
m.scale.multiplyScalar(1.35);
}
catch (e) { }
return m;
};
}
var LOOK_BLOB_N = 96;
function lookBlobsMake() {
if (LOOK.blobs || typeof scene === "undefined" || !scene)
return;
var geo = new THREE.PlaneGeometry(1, 1);
geo.rotateX(-Math.PI / 2);
var mat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.5, depthWrite: false, fog: true, toneMapped: false,
polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2 });
mat.map = lookBlobTex();
var im = new THREE.InstancedMesh(geo, mat, LOOK_BLOB_N);
im.frustumCulled = false;
im.renderOrder = 1;
im.count = 0;
im.raycast = function () { };
im.userData.look = 1;
im.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
scene.add(im);
LOOK.blobs = im;
}
function lookBlobAdd(g) {
if (!g || g.userData.__lookBlob)
return;
g.userData.__lookBlob = { r: 0, sx: 1, sz: 1 };
LOOK.blobList.push(g);
}
function lookBlobSize(g) { return __ZC(135, 0, this, arguments, new.target); }
var LOOK_M = null;
function lookBlobTick() {
if (!LOOK.blobs)
lookBlobsMake();
var im = LOOK.blobs;
if (!im)
return;
if (!LOOK_M)
LOOK_M = { m: new THREE.Matrix4(), near: [] };
var P = camera.position, L = LOOK.blobList, near = LOOK_M.near;
near.length = 0;
var inside = !!(store && store.inside);
for (var i = L.length - 1; i >= 0; i--) {
var g = L[i];
if (!g.parent) {
if (!g.userData.__lookKeep) {
g.userData.__lookKeep = 1;
}
else if (++g.userData.__lookKeep > 300) {
g.userData.__lookBlob = null;
L.splice(i, 1);
}
continue;
}
g.userData.__lookKeep = 0;
if (!g.visible || (g.parent !== scene && !g.parent.visible))
continue;
var e = g.matrixWorld.elements, dx = e[12] - P.x, dz = e[14] - P.z, d2 = dx * dx + dz * dz;
if (d2 > 4900)
continue;
near.push(d2, i);
}
var n = near.length / 2, idx = [];
for (var k = 0; k < n; k++)
idx.push(k);
if (n > LOOK_BLOB_N) {
idx.sort(function (a, b) { return near[a * 2] - near[b * 2]; });
idx.length = LOOK_BLOB_N;
}
var c = 0, M = LOOK_M.m;
for (var j = 0; j < idx.length; j++) {
var gg = L[near[idx[j] * 2 + 1]], bb = gg.userData.__lookBlob, ee = gg.matrixWorld.elements;
if (!lookBlobSize(gg))
continue;
var y = ee[13];
if (!inside && typeof terrainY === "function") {
var ty = terrainY(ee[12], ee[14]);
if (isFinite(ty) && Math.abs(ty - y) < 0.6)
y = ty;
}
M.copy(gg.matrixWorld);
var me = M.elements;
me[0] *= bb.sx;
me[1] = 0;
me[2] *= bb.sx;
me[4] = 0;
me[5] = 1;
me[6] = 0;
me[8] *= bb.sz;
me[9] = 0;
me[10] *= bb.sz;
me[13] = y + 0.05;
im.setMatrixAt(c++, M);
}
im.count = c;
im.visible = c > 0;
if (c)
im.instanceMatrix.needsUpdate = true;
im.material.opacity = (renderer.shadowMap.enabled ? 0.38 : 0.55);
}
if (!LOOK_OFF && typeof addMesh === "function") {
var lookAddMesh = addMesh;
addMesh = function (spec) {
var r = lookAddMesh.apply(this, arguments);
try {
if (spec && !spec.city && !spec.hub && typeof meshes !== "undefined") {
var g = meshes[spec.id];
if (g && !g.userData.__lookBlob)
lookBlobAdd(g);
}
}
catch (e) { }
return r;
};
}
if (!LOOK_OFF && typeof modelMat === "function") {
var lookModelMat = modelMat;
modelMat = function (m) {
var n = lookModelMat.apply(this, arguments);
try {
if (n.color)
n.color.convertLinearToSRGB();
if (n.emissive)
n.emissive.convertLinearToSRGB();
}
catch (e) { }
return n;
};
}
if (!LOOK_OFF && typeof gfxRender === "function") {
var lookGfxRender = gfxRender;
gfxRender = function () {
try {
if (renderer.outputEncoding !== THREE.sRGBEncoding)
lookRenderer();
if (!LOOK.skyDone)
lookSky();
var f = lookFinish();
if (f !== LOOK.lastFinish) {
LOOK.lastFinish = f;
lookShadows();
}
lookLightTick();
lookLightsTick();
var dl = (typeof daylight === "function") ? daylight(dreamHour()) : 1;
lookSkyTick(dl);
lookBlobTick();
}
catch (e) {
if (!LOOK.warned) {
LOOK.warned = 1;
if (window.console)
console.warn("look:", e);
}
}
return lookGfxRender.apply(this, arguments);
};
}
function lookSettings() {
if (document.getElementById("finish"))
return;
var ink = document.getElementById("ink");
if (!ink || !ink.parentNode)
return;
var lab = document.createElement("label");
lab.setAttribute("for", "finish");
lab.textContent = "Finish";
var sel = document.createElement("select");
sel.id = "finish";
[["high", "High — soft sun shadows (best on a computer)"], ["standard", "Standard — no sun shadows, faster"]].forEach(function (o) {
var op = document.createElement("option");
op.value = o[0];
op.textContent = o[1];
sel.appendChild(op);
});
if (LOOK_PHONE) {
sel.disabled = true;
lab.textContent = "Finish (phones always use Standard)";
}
sel.value = lookFinish();
sel.onchange = function () { var c = cfg(); c.finish = sel.value; setCfg(c); LOOK.lastFinish = null; };
var after = ink.nextSibling;
ink.parentNode.insertBefore(lab, after);
ink.parentNode.insertBefore(sel, after);
if (typeof openPanel === "function" && !openPanel.__look) {
var op2 = openPanel;
openPanel = function () { var r = op2.apply(this, arguments); var s = document.getElementById("finish"); if (s)
s.value = lookFinish(); return r; };
openPanel.__look = 1;
}
}
