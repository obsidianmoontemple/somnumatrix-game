/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var MODELS = { base: "assets/models/", man: null, asked: false, failed: false, loader: null, loaderWait: null, files: {} };
function modelsOn() { var c = (typeof cfg === "function") ? cfg() : {}; return c.models !== "off" && !MODELS.failed; }
function modelsManifest(cb) {
if (MODELS.man)
return cb(MODELS.man);
if (MODELS.failed)
return;
(MODELS.manWait || (MODELS.manWait = [])).push(cb);
if (MODELS.asked)
return;
MODELS.asked = true;
if (location.protocol === "file:") {
MODELS.failed = true;
MODELS.manWait = null;
return;
}
fetch(MODELS.base + "manifest.json").then(function (r) { if (!r.ok)
throw new Error(r.status); return r.json(); })
.then(function (j) { MODELS.man = j; var w = MODELS.manWait; MODELS.manWait = null; w.forEach(function (f) { try {
f(j);
}
catch (e) { } }); })
.catch(function () { MODELS.failed = true; MODELS.manWait = null; });
}
function modelsLoader(cb) {
if (MODELS.loader)
return cb(MODELS.loader);
if (THREE.GLTFLoader) {
MODELS.loader = new THREE.GLTFLoader();
return cb(MODELS.loader);
}
if (MODELS.loaderWait) {
MODELS.loaderWait.push(cb);
return;
}
MODELS.loaderWait = [cb];
var srcs = [MODELS.base + "GLTFLoader.js", "https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/loaders/GLTFLoader.js"];
(function next() {
var src = srcs.shift();
if (!src) {
MODELS.failed = true;
MODELS.loaderWait = null;
return;
}
var s = document.createElement("script");
s.src = src;
s.async = true;
s.onload = function () {
if (!THREE.GLTFLoader) {
next();
return;
}
MODELS.loader = new THREE.GLTFLoader();
var w = MODELS.loaderWait;
MODELS.loaderWait = null;
w.forEach(function (f) { try {
f(MODELS.loader);
}
catch (e) { } });
};
s.onerror = next;
document.head.appendChild(s);
})();
}
function modelMat(m) {
var o = { color: m.color ? m.color.clone() : new THREE.Color(0xffffff), side: m.side };
if (m.map) {
o.map = m.map;
}
if (m.vertexColors)
o.vertexColors = true;
if (m.transparent || m.opacity < 1) {
o.transparent = true;
o.opacity = m.opacity;
}
if (m.alphaTest)
o.alphaTest = m.alphaTest;
if (m.emissive && (m.emissive.r + m.emissive.g + m.emissive.b) > 0.05) {
o.emissive = m.emissive.clone();
if (m.emissiveMap)
o.emissiveMap = m.emissiveMap;
}
var n = new THREE.MeshLambertMaterial(o);
n.name = m.name || "";
return n;
}
function modelFile(file, cb) {
var F = MODELS.files[file];
if (F) {
if (F.scene)
cb(F);
else if (!F.bad)
F.wait.push(cb);
return;
}
F = MODELS.files[file] = { scene: null, bad: false, wait: [cb] };
modelsLoader(function (L) {
L.load(MODELS.base + file, function (gl) {
var sc = gl.scene, mats = {};
sc.traverse(function (m) {
if (!m.isMesh)
return;
var conv = function (x) { return mats[x.uuid] || (mats[x.uuid] = modelMat(x)); };
m.material = Array.isArray(m.material) ? m.material.map(conv) : conv(m.material);
m.castShadow = true;
m.receiveShadow = true;
m.userData.model = 1;
});
F.scene = sc;
var w = F.wait;
F.wait = [];
w.forEach(function (f) { try {
f(F);
}
catch (e) {
if (window.console)
console.warn("[models]", file, e);
} });
}, undefined, function () { F.bad = true; F.wait = []; });
});
}
function modelPick(e, spec) {
var f = e.f;
if (!Array.isArray(f))
return f;
var a0 = spec && spec.attrs || {};
if (a0.tc !== undefined || a0.rc !== undefined || a0.mc !== undefined)
for (var bi = 0; bi < f.length; bi++)
if (/_blue\.glb$/.test(f[bi]))
return f[bi];
var h = 0, s = String(spec.id || "");
for (var i = 0; i < s.length; i++)
h = (h * 31 + s.charCodeAt(i)) >>> 0;
return f[h % f.length];
}
function modelEntry(spec) {
var M = MODELS.man;
if (!M || !M.a)
return null;
return M.a[spec.archetype] || null;
}
function modelWanted(spec) {
if (!spec || !spec.archetype || !modelsOn())
return false;
if (spec.city || spec.hub || spec.__me || spec.id === "__me")
return false;
if (typeof isHidden === "function" && isHidden(spec))
return false;
if (typeof isPerson === "function" && isPerson(spec))
return false;
if (spec.archetype === "crowd" || spec.archetype === "deity" || spec.deityTemple)
return false;
if (spec.attrs && spec.attrs.noModel)
return false;
return true;
}
function modelHide(g, e) {
var hide = [];
(g.userData.kitKids || []).forEach(function (c) {
if (c.parent !== g) {
var hp = c.parent;
if (hp && hp.parent === g && hp.userData && hp.userData.side !== undefined && hide.indexOf(hp) < 0)
hide.push(hp);
return;
}
if (c.userData.contact || c.userData.model || c === g.userData.pool || c === g.userData.seat)
return;
if (e.all) {
hide.push(c);
return;
}
if (c.userData.opening) {
hide.push(c);
return;
}
if (c.isMesh && c.geometry && c.geometry.userData && c.geometry.userData.kit)
hide.push(c);
});
return hide;
}
function modelBoxOf(g, list) {
var p = g.position.clone(), r = g.rotation.clone(), s = g.scale.clone(), par = g.parent;
g.position.set(0, 0, 0);
g.rotation.set(0, 0, 0);
g.scale.set(1, 1, 1);
g.updateMatrixWorld(true);
var inv = new THREE.Matrix4().copy(g.matrixWorld).invert();
var b = new THREE.Box3(), v = new THREE.Vector3();
list.forEach(function (c) {
c.traverse(function (m) {
if (!m.isMesh || !m.geometry || m.userData.contact)
return;
var pos = m.geometry.attributes && m.geometry.attributes.position;
if (!pos)
return;
for (var i = 0; i < pos.count; i++) {
v.fromBufferAttribute(pos, i).applyMatrix4(m.matrixWorld).applyMatrix4(inv);
b.expandByPoint(v);
}
});
});
g.position.copy(p);
g.rotation.copy(r);
g.scale.copy(s);
g.updateMatrixWorld(true);
return b;
}
function modelTurn(o, e) { o.rotation.set(e.rx || 0, e.r || 0, e.rz || 0, "YXZ"); }
function modelSize(F, e) {
var k = (e.r || 0) + ":" + (e.rx || 0) + ":" + (e.rz || 0);
F.box = F.box || {};
if (F.box[k])
return F.box[k];
var h = new THREE.Group(), c = F.scene.clone();
modelTurn(c, e);
h.add(c);
h.updateMatrixWorld(true);
var b = new THREE.Box3(), v = new THREE.Vector3();
h.traverse(function (m) {
var pos = m.isMesh && m.geometry.attributes.position;
if (!pos)
return;
for (var i = 0; i < pos.count; i++) {
v.fromBufferAttribute(pos, i).applyMatrix4(m.matrixWorld);
b.expandByPoint(v);
}
});
return (F.box[k] = b);
}
var MODEL_BLUE_SHEET = [[1, 1], [0, 3]], MODEL_ROOF_TEX = {};
function modelRoofSheet(map, col) { return __ZC(133, 0, this, arguments, new.target); }
function modelTint(m, col, k) {
var c = new THREE.Color(col), w = new THREE.Color(0xffffff).lerp(c, k);
m.color.multiply(w);
}
function modelSwap(g, spec, e, F) {
if (g.userData.modelled || !modelsOn())
return;
var hide = modelHide(g, e);
if (!hide.length)
return;
var B = modelBoxOf(g, hide);
if (B.isEmpty())
return;
var bs = new THREE.Vector3();
B.getSize(bs);
var MB = modelSize(F, e), ms = new THREE.Vector3();
MB.getSize(ms);
if (ms.x <= 0 || ms.y <= 0 || ms.z <= 0)
return;
var fit = e.fit || "contain", sx, sy, sz;
if (fit === "stretch") {
sx = bs.x / ms.x;
sy = bs.y / ms.y;
sz = bs.z / ms.z;
}
else if (fit === "soft") {
var rx = bs.x / ms.x, ry = bs.y / ms.y, rz = bs.z / ms.z, u0 = Math.min(rx, ry, rz), lim = u0 * (e.k || 1.5);
sx = Math.min(rx, lim);
sy = Math.min(ry, lim);
sz = Math.min(rz, lim);
}
else {
var u = fit === "height" ? bs.y / ms.y : fit === "foot" ? Math.min(bs.x / ms.x, bs.z / ms.z) : fit === "width" ? bs.x / ms.x : fit === "depth" ? bs.z / ms.z : Math.min(bs.x / ms.x, bs.y / ms.y, bs.z / ms.z);
sx = sy = sz = u;
}
var k = e.s || 1;
sx *= k;
sy *= k;
sz *= k;
var inner = F.scene.clone();
modelTurn(inner, e);
var root = new THREE.Group();
root.add(inner);
root.scale.set(sx, sy, sz);
var cx = (B.min.x + B.max.x) / 2, cz = (B.min.z + B.max.z) / 2, mcx = (MB.min.x + MB.max.x) / 2, mcz = (MB.min.z + MB.max.z) / 2;
root.position.set(cx - mcx * sx, B.min.y - MB.min.y * sy + (e.y || 0) * bs.y, cz - mcz * sz);
root.userData.model = 1;
root.name = "model";
var a = spec.attrs || {}, f = (typeof seenFidelity === "function") ? seenFidelity(spec) : 1;
var tint = e.t && a.c !== undefined && a.c !== null, ghost = f < 0.99;
var cast = hide.some(function (c) { var s = false; c.traverse(function (m) { if (m.castShadow)
s = true; }); return s; });
if (tint || ghost) {
var done = {};
inner.traverse(function (m) {
if (!m.isMesh)
return;
var conv = function (x) {
if (done[x.uuid])
return done[x.uuid];
var n = x.clone();
if (tint && (!e.tm || e.tm.indexOf(x.name) > -1))
modelTint(n, a.c, e.t === true || e.t === 1 ? 0.75 : e.t);
if (ghost) {
n.color.lerp(new THREE.Color(0x7C93B8), (1 - f) * 0.6);
n.transparent = true;
n.opacity = 0.2 + 0.8 * f;
n.depthWrite = n.opacity > 0.24;
}
return (done[x.uuid] = n);
};
m.material = Array.isArray(m.material) ? m.material.map(conv) : conv(m.material);
});
}
var roofCol = a.tc !== undefined ? a.tc : a.rc !== undefined ? a.rc : a.mc;
if (roofCol !== undefined && roofCol !== null && MODEL_BLUE_SHEET) {
var file = null;
for (var fk in MODELS.files)
if (MODELS.files[fk] === F) {
file = fk;
break;
}
if (file && /_blue\.glb$/.test(file)) {
var rd = {};
inner.traverse(function (m) {
if (!m.isMesh)
return;
var conv2 = function (x) {
if (!x.map)
return x;
if (rd[x.uuid])
return rd[x.uuid];
var t = modelRoofSheet(x.map, roofCol);
if (!t)
return x;
var n = x.clone();
n.map = t;
n.needsUpdate = true;
return (rd[x.uuid] = n);
};
m.material = Array.isArray(m.material) ? m.material.map(conv2) : conv2(m.material);
});
}
}
inner.traverse(function (m) { if (m.isMesh) {
m.castShadow = cast;
m.receiveShadow = true;
} });
hide.forEach(function (c) { c.visible = false; c.userData.modelHidden = 1; });
g.add(root);
g.userData.modelled = root;
}
function modelUnswap(g) {
var r = g && g.userData.modelled;
if (!r)
return;
g.remove(r);
g.userData.modelled = null;
g.children.forEach(function (c) { if (c.userData.modelHidden) {
c.visible = true;
c.userData.modelHidden = 0;
} });
}
function modelDress(g, spec) {
if (!g || !modelWanted(spec))
return;
if (!g.userData.kitKids)
g.userData.kitKids = g.children.slice();
modelsManifest(function () {
var e = modelEntry(spec);
if (!e || !e.f)
return;
modelFile(modelPick(e, spec), function (F) { if (F.scene)
modelSwap(g, spec, e, F); });
});
}
(function () {
if (typeof geo !== "function")
return;
var g0 = geo;
geo = function (kind, s) { var G = g0.apply(this, arguments); if (G && G.userData)
G.userData.kit = 1; return G; };
})();
(function () {
if (typeof addOpenings !== "function")
return;
var a0 = addOpenings;
addOpenings = function (g) {
var n = g.children.length, r = a0.apply(this, arguments);
for (var i = n; i < g.children.length; i++)
g.children[i].userData.opening = 1;
return r;
};
})();
(function () {
if (typeof build !== "function")
return;
var b0 = build;
build = function (spec) {
var g = b0.apply(this, arguments);
try {
if (g && g.userData && modelWanted(spec)) {
g.userData.kitKids = g.children.slice();
modelDress(g, spec);
}
}
catch (e) {
if (window.console)
console.warn("[models]", e);
}
return g;
};
})();
(function () {
if (typeof HELD !== "object" || !HELD)
return;
Object.keys(HELD).forEach(function (k) {
var h0 = HELD[k];
if (typeof h0 !== "function")
return;
HELD[k] = function () {
var g = h0.apply(this, arguments);
try {
if (g && g.isObject3D) {
g.userData.kitKids = g.children.slice();
modelDress(g, { archetype: "held:" + k, id: k });
}
}
catch (e) { }
return g;
};
});
})();
function modelsApply() { return __ZC(133, 1, this, arguments, new.target); }
function modelsSetting() {
var lite = document.getElementById("lite");
if (!lite || document.getElementById("models-on"))
return;
var lab = document.createElement("label");
lab.setAttribute("for", "models-on");
lab.textContent = "Detailed models — hand-made shapes for houses, trees, animals and things";
var sel = document.createElement("select");
sel.id = "models-on";
sel.innerHTML = '<option value="on">On</option><option value="off">Off — the simple shapes</option>';
sel.value = (cfg().models === "off") ? "off" : "on";
sel.addEventListener("change", function () { var c = cfg(); c.models = this.value === "off" ? "off" : null; setCfg(c); modelsApply(); });
var lab0 = lite.previousElementSibling;
var at = (lab0 && lab0.tagName === "LABEL") ? lab0 : lite;
at.parentNode.insertBefore(lab, at);
at.parentNode.insertBefore(sel, at);
}
(function () {
if (typeof openPanel === "function") {
var o0 = openPanel;
openPanel = function () { var r = o0.apply(this, arguments); try {
modelsSetting();
var s = document.getElementById("models-on");
if (s)
s.value = cfg().models === "off" ? "off" : "on";
}
catch (e) { } return r; };
}
if (document.readyState !== "loading")
modelsSetting();
else
document.addEventListener("DOMContentLoaded", modelsSetting);
if (modelsOn())
setTimeout(function () { modelsManifest(function () { }); }, 1500);
})();
